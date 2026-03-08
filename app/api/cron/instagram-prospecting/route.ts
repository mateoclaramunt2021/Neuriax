import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ─── Hashtags por sector para descubrir leads ───
const SECTOR_HASHTAGS: Record<string, string[]> = {
  restaurante: [
    'restaurantemadrid', 'restaurantebarcelona', 'restaurantevalencia',
    'restauranteespana', 'gastronomiaespañola', 'restaurantenuevo',
    'comidacasera', 'chefespanol', 'negociosgastronomicos',
    'restaurantespain', 'cocinaespañola', 'foodiespain',
  ],
  clinica_estetica: [
    'clinicaestetica', 'medicinaestetica', 'clinicaesteticamadrid',
    'clinicaesteticabarcelona', 'tratamientofacial', 'esteticaavanzada',
    'bellezaespana', 'clinicadebelleza', 'rejuvenecimientofacial',
    'botoxespaña', 'acido hialuronico', 'tratamientoscorporales',
  ],
  barberia: [
    'barberiamadrid', 'barberiabarcelona', 'barberiaespana',
    'barbershopspain', 'barberiamoderna', 'cortedepelo',
    'barberlife', 'barberoespanol', 'barberiaurbana',
    'degradadoperfecto', 'peluqueriamasculina', 'fadehaircut',
  ],
  clinica_salud: [
    'clinicasalud', 'fisioterapia', 'clinicafisioterapia',
    'dentista', 'clinicadental', 'podologia', 'nutricionista',
    'psicologomadrid', 'fisioterapiamadrid', 'clinicamedica',
    'saludybienestar', 'medicoespana',
  ],
};

const SECTOR_LABELS: Record<string, string> = {
  restaurante: '🍽️ Restaurante',
  clinica_estetica: '💆 Clínica Estética',
  barberia: '💈 Barbería',
  clinica_salud: '🏥 Clínica Salud',
};

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(url, key);
}

// ─── Ensure table exists ───
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function ensureTable(supabase: any) {
  const { error } = await supabase.from('instagram_cold_leads').select('id').limit(1);
  if (error?.message?.includes('does not exist')) {
    console.error('Table instagram_cold_leads does not exist. Create it in Supabase Dashboard.');
    return false;
  }
  return true;
}

// ─── Discover leads via Instagram Hashtag Search API ───
async function discoverLeadsByHashtag(
  hashtag: string,
  sector: string,
  igAccountId: string,
  accessToken: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any
): Promise<number> {
  let found = 0;

  try {
    // Step 1: Search for the hashtag ID
    const hashtagRes = await fetch(
      `https://graph.facebook.com/v21.0/ig_hashtag_search?q=${encodeURIComponent(hashtag)}&user_id=${igAccountId}&access_token=${accessToken}`
    );

    if (!hashtagRes.ok) {
      const err = await hashtagRes.text();
      console.error(`Hashtag search failed for #${hashtag}:`, err);
      return 0;
    }

    const hashtagData = await hashtagRes.json();
    const hashtagId = hashtagData.data?.[0]?.id;
    if (!hashtagId) return 0;

    // Step 2: Get top media for this hashtag
    const mediaRes = await fetch(
      `https://graph.facebook.com/v21.0/${hashtagId}/top_media?user_id=${igAccountId}&fields=id,caption,permalink,timestamp&limit=20&access_token=${accessToken}`
    );

    if (!mediaRes.ok) {
      console.error(`Top media failed for #${hashtag}`);
      return 0;
    }

    const mediaData = await mediaRes.json();
    const posts = mediaData.data || [];

    for (const post of posts) {
      try {
        // Step 3: Get the media owner
        const ownerRes = await fetch(
          `https://graph.facebook.com/v21.0/${post.id}?fields=owner{id,username,name,biography,followers_count}&access_token=${accessToken}`
        );

        if (!ownerRes.ok) continue;

        const ownerData = await ownerRes.json();
        const owner = ownerData.owner;
        if (!owner?.id || !owner?.username) continue;

        // Skip our own account
        if (owner.id === igAccountId) continue;

        // Check if already in DB (cold_leads or followers)
        const { data: existing } = await supabase
          .from('instagram_cold_leads')
          .select('id')
          .eq('instagram_user_id', owner.id)
          .single();

        if (existing) continue;

        // Also check if they already messaged us (in instagram_followers)
        const { data: existingFollower } = await supabase
          .from('instagram_followers')
          .select('id')
          .eq('instagram_user_id', owner.id)
          .single();

        if (existingFollower) continue;

        // Save the new lead
        await supabase.from('instagram_cold_leads').insert({
          instagram_user_id: owner.id,
          username: owner.username,
          full_name: owner.name || null,
          sector,
          bio: owner.biography || null,
          followers_count: owner.followers_count || 0,
          source_hashtag: hashtag,
          status: 'new',
        });

        found++;
      } catch {
        // Skip individual post errors
      }

      // Small delay to respect rate limits
      await new Promise(r => setTimeout(r, 500));
    }
  } catch (error) {
    console.error(`Discover error for #${hashtag}:`, error);
  }

  return found;
}

// ─── Alternative: Discover via Instagram Search (for when hashtag API has limits) ───
async function discoverViaConversations(
  sector: string,
  accessToken: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any
): Promise<number> {
  // Fallback: use the IG business discovery API to search known usernames
  // This requires knowing usernames upfront, so we use seed accounts per sector
  const seedAccounts: Record<string, string[]> = {
    restaurante: ['restaurantes_madrid', 'mejoresrestaurantes'],
    clinica_estetica: ['clinicasesteticas', 'medicinaesteticasp'],
    barberia: ['barberias_espana', 'barbershopspaña'],
    clinica_salud: ['clinicasespana', 'fisioterapia_es'],
  };

  const seeds = seedAccounts[sector] || [];
  let found = 0;

  for (const username of seeds) {
    try {
      const res = await fetch(
        `https://graph.instagram.com/v21.0/me?fields=business_discovery.fields(id,username,name,biography,followers_count).username(${username})&access_token=${accessToken}`
      );
      if (!res.ok) continue;

      const data = await res.json();
      const biz = data.business_discovery;
      if (!biz?.id) continue;

      const { data: existing } = await supabase
        .from('instagram_cold_leads')
        .select('id')
        .eq('instagram_user_id', biz.id)
        .single();

      if (!existing) {
        await supabase.from('instagram_cold_leads').insert({
          instagram_user_id: biz.id,
          username: biz.username,
          full_name: biz.name || null,
          sector,
          bio: biz.biography || null,
          followers_count: biz.followers_count || 0,
          source_hashtag: 'business_discovery',
          status: 'new',
        });
        found++;
      }
    } catch { /* skip */ }
  }

  return found;
}

// ─── GET: Main cron handler ───
export async function GET() {
  try {
    const supabase = getSupabase();

    // Check table exists
    const tableOk = await ensureTable(supabase);
    if (!tableOk) {
      return NextResponse.json({ error: 'Table instagram_cold_leads does not exist' }, { status: 500 });
    }

    // Get config
    const { data: config } = await supabase
      .from('instagram_config')
      .select('*')
      .single();

    const accessToken = config?.access_token || process.env.INSTAGRAM_ACCESS_TOKEN;
    const igAccountId = config?.instagram_account_id || process.env.INSTAGRAM_ACCOUNT_ID;

    if (!accessToken || !igAccountId) {
      return NextResponse.json({ error: 'Instagram not configured' }, { status: 400 });
    }

    // Check if prospecting is enabled
    if (config?.cold_outreach_enabled === false) {
      return NextResponse.json({ skipped: true, reason: 'Cold outreach disabled' });
    }

    const results: Record<string, number> = {};
    let totalFound = 0;

    // Pick 2 random sectors per run to stay under rate limits
    const sectors = Object.keys(SECTOR_HASHTAGS);
    const shuffled = sectors.sort(() => Math.random() - 0.5);
    const selectedSectors = shuffled.slice(0, 2);

    for (const sector of selectedSectors) {
      const hashtags = SECTOR_HASHTAGS[sector];
      // Pick 2 random hashtags per sector
      const selectedHashtags = hashtags
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);

      let sectorTotal = 0;

      for (const hashtag of selectedHashtags) {
        const found = await discoverLeadsByHashtag(hashtag, sector, igAccountId, accessToken, supabase);
        sectorTotal += found;

        // Delay between hashtag searches
        await new Promise(r => setTimeout(r, 2000));
      }

      // If hashtag search didn't find much, try business discovery fallback
      if (sectorTotal < 3) {
        const fallback = await discoverViaConversations(sector, accessToken, supabase);
        sectorTotal += fallback;
      }

      results[sector] = sectorTotal;
      totalFound += sectorTotal;
    }

    // Log the run
    await supabase.from('instagram_token_log').insert({
      action: 'prospecting_cron',
      details: JSON.stringify({
        sectors: selectedSectors,
        results,
        totalFound,
        timestamp: new Date().toISOString(),
      }),
    });

    // Get current totals
    const { count: totalLeads } = await supabase
      .from('instagram_cold_leads')
      .select('id', { count: 'exact', head: true });

    const { count: newLeads } = await supabase
      .from('instagram_cold_leads')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'new');

    return NextResponse.json({
      success: true,
      sectorsSearched: selectedSectors.map(s => SECTOR_LABELS[s] || s),
      newLeadsFound: totalFound,
      totalLeadsInDB: totalLeads,
      pendingOutreach: newLeads,
      details: results,
    });
  } catch (error) {
    console.error('Prospecting cron error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
