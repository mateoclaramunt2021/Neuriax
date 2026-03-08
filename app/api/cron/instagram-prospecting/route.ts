import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ═══════════════════════════════════════════════════════════════════
//  SISTEMA DE PROSPECCIÓN — Descubrimiento de leads por sector
//  Usa business_discovery API (funciona con permisos básicos)
// ═══════════════════════════════════════════════════════════════════

// ─── Base de datos de negocios españoles por sector ───
// Cada ejecución prueba un batch aleatorio. Se van rotando.
const SEED_ACCOUNTS: Record<string, string[]> = {
  restaurante: [
    // Madrid
    'streetxo', 'asadordeboroa', 'lateral_restaurantes', 'grupolamina',
    'el_club_allard', 'coquemadrid', 'restaurantesmadrid', 'labarraca_madrid',
    'tabernalaelisa', 'lakasa_restaurante', 'santceloni_restaurant', 'puntomx_madrid',
    'restaurantetriciclo', 'smoked_room', 'numa_pompilio', 'bacira_restaurant',
    'saladesalarestaurante', 'tipicoitalianomadrid', 'yokaloka_madrid', 'cenmejoresrestaurantes',
    // Barcelona
    'tickets_restaurant', 'disfrutarbcn', 'compartirbarcelona', 'hojasanta_mexico',
    'canculleretes', 'laserenabcn', 'alkimia_restaurant', 'ciutatcomtal',
    'lospescadores_bcn', 'restaurantenet', 'cerveceriamontana', 'flax_kale',
    'naparestaurant', 'gresca_restaurant', 'bodega1900', 'brunch_and_cake',
    // Valencia
    'riffrestaurante', 'restaurante_navarro', 'lienzo_restaurante', 'myscandinavianteam',
    'canalla_bistro', 'turianova', 'lafermata.vlc', 'copenhagen.vlc',
    // Sevilla / Sur
    'restaurante_abantal', 'aznarsevilla', 'contenidorcoworking', 'tradevomalaga',
    // Varias ciudades
    'elcellerdecannoca', 'mugaritz', 'martinberasategui_rest', 'azurmendi_rest',
    'cenadordeamos', 'cocinarocook', 'restaurantemaui', 'grupodanigarcia',
  ],
  clinica_estetica: [
    // Madrid
    'clinicacirugiaestetica', 'clinicamenorcamadrid', 'institutodermoestetica',
    'dorsiamadrid', 'clinicadrsebastian', 'clinicagomezbravo', 'clinicaiml',
    'clinicaravello', 'centrodermoestetico', 'medicinaesteticamadrid_',
    'clinica_estetica_madrid', 'drjosemariaserrano', 'clinicasglobalderm',
    'institutomedicodelsur', 'clinicakossti', 'clinicarealclinics',
    // Barcelona
    'clinicaesteticabarcelona_', 'iderma_clinica', 'teknon_barcelona',
    'institutgregorio', 'clinicasantane', 'centrodermabcn', 'dermatologicabcn',
    'clinica_tres_torres', 'institutbauza',
    // Valencia
    'clinicaesteticavalencia_', 'drdanielgomez', 'clinicapriego',
    // Varias
    'clinicaesteticajesusjimenez', 'dorsia.es', 'grupokvera', 'centromedicoestetico_',
    'clinicalasamericas', 'clinicalucq', 'sveltia_clinica', 'medicos_esteticos_es',
    'doctoramolinas', 'drjuliantresguerres', 'clinicaisabelcano_', 'elenaruizbeauty',
  ],
  barberia: [
    // Madrid
    'beigehaberdashery', 'captaincokmadrid', 'thebarberist_madrid', 'nobuhairsalon',
    'barberiadistinto', 'labarberiademateo', 'barberiaelkinze', 'theblackbirdmadrid',
    'barberia_capitol', 'oldschool_barbershop_madrid', 'kingsman_barber_madrid',
    'barberialuismiguel', 'lacursamadrid', 'theoldbarbersmadrid', 'labarberiabarrio',
    // Barcelona
    'bcnbarbers', 'kinki_bcn', 'theoldbarbersbcn', 'barberiacaballeros',
    'thebarberist_bcn', 'barbesgroupmontjuic', 'moustache_barbershop_bcn',
    'barberiaelputoamo', 'kingshairbcn', 'oldschoolbarbershopbcn_',
    // Valencia
    'labarberiaoriginal_vlc', 'barberosvalencia', 'barberia_el_rey_vlc',
    'theoldbarbersvlc', 'barberia_kings_vlc',
    // Varias
    'barberosdeespana', 'barberos_pro', 'barberia_classic', 'barberosurbanos',
    'barberiamodern', 'barberia_elegance', 'labarberiaoriginal', 'topbarbers_spain',
    'elartedelbarbero', 'barberias_de_espana', 'barberlifestyleofficial',
  ],
  clinica_salud: [
    // Fisioterapia
    'fisiolution', 'fisiocampus', 'fisioyoga_madrid', 'physiummadrid',
    'fisioneuroactiva', 'fisiospain', 'fisioneural', 'clinicafisioterapiamadrid_',
    'fisiobcn_centro', 'fisiovalencia_', 'fisioterapia_deportiva_mad',
    // Dental
    'clinicadentalgalvan', 'asisa_dental', 'clinicadentalmadrid_', 'clinicdents',
    'dentalcompany_oficial', 'clinicarequenadental', 'centromedicoidaemadrid',
    'clinicdent_bcn', 'sonrisasdeldrperez', 'clinicadentalvelazquez_',
    'vivadensclinica', 'boadent_clinicadental', 'cleardent_', 'clinicalopezdental',
    // Nutrición & Psicología
    'nutricionistaenmadrid', 'nutricion_bcn', 'psicologomadrid_oficial',
    'psicotools_bcn', 'mindfulpracticemadrid', 'nutriendotusalud_', 'mentesaludable_es',
    // Podología
    'clinicadelpod', 'podologosmadrid_', 'podologiabcn_profesional',
    // Varias
    'clinicasdentalix', 'centromedicosalud_es', 'centrofisiovita',
    'fisioterapeutas_espana', 'saludintegralcentro', 'clinicasaludbcn_',
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

// ─── Discover a single lead via business_discovery API ───
async function discoverByUsername(
  username: string,
  sector: string,
  accessToken: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any
): Promise<boolean> {
  try {
    const res = await fetch(
      `https://graph.instagram.com/v21.0/me?fields=business_discovery.fields(id,username,name,biography,followers_count,media_count,profile_picture_url).username(${username})&access_token=${accessToken}`
    );

    if (!res.ok) {
      const errText = await res.text();
      // Log specific errors for debugging
      if (errText.includes('not found') || errText.includes('does not exist')) {
        console.log(`[Prospecting] @${username} not found (not business/creator account)`);
      } else {
        console.error(`[Prospecting] API error for @${username}:`, errText.substring(0, 200));
      }
      return false;
    }

    const data = await res.json();
    const biz = data.business_discovery;
    if (!biz?.id || !biz?.username) return false;

    // Skip if already in cold_leads
    const { data: existingLead } = await supabase
      .from('instagram_cold_leads')
      .select('id')
      .eq('username', biz.username)
      .single();
    if (existingLead) return false;

    // Skip if already in instagram_followers (they already DM'd us)
    const { data: existingFollower } = await supabase
      .from('instagram_followers')
      .select('id')
      .or(`username.eq.${biz.username},instagram_user_id.eq.${biz.id}`)
      .single();
    if (existingFollower) return false;

    // Save new lead
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

    console.log(`[Prospecting] ✅ New lead: @${biz.username} (${sector}) — ${biz.followers_count || 0} followers`);
    return true;
  } catch (error) {
    console.error(`[Prospecting] Error discovering @${username}:`, error);
    return false;
  }
}

// ─── GET: Main cron handler ───
export async function GET() {
  try {
    const supabase = getSupabase();

    // Check table exists
    const { error: tableErr } = await supabase.from('instagram_cold_leads').select('id').limit(1);
    if (tableErr?.message?.includes('does not exist')) {
      return NextResponse.json({ error: 'Table instagram_cold_leads does not exist' }, { status: 500 });
    }

    // Get config
    const { data: config } = await supabase
      .from('instagram_config')
      .select('*')
      .single();

    const accessToken = config?.access_token || process.env.INSTAGRAM_ACCESS_TOKEN;
    if (!accessToken) {
      return NextResponse.json({ error: 'Instagram not configured' }, { status: 400 });
    }

    // Check if prospecting is enabled
    if (config?.cold_outreach_enabled === false) {
      return NextResponse.json({ skipped: true, reason: 'Cold outreach disabled' });
    }

    const results: Record<string, number> = {};
    const errors: Record<string, number> = {};
    let totalFound = 0;
    let totalTried = 0;

    // Pick 2 random sectors per run
    const sectors = Object.keys(SEED_ACCOUNTS);
    const shuffled = [...sectors].sort(() => Math.random() - 0.5);
    const selectedSectors = shuffled.slice(0, 2);

    for (const sector of selectedSectors) {
      const allUsernames = SEED_ACCOUNTS[sector] || [];
      // Pick 8 random usernames per sector
      const selectedUsernames = [...allUsernames]
        .sort(() => Math.random() - 0.5)
        .slice(0, 8);

      let sectorFound = 0;
      let sectorErrors = 0;

      for (const username of selectedUsernames) {
        totalTried++;
        const found = await discoverByUsername(username, sector, accessToken, supabase);
        if (found) {
          sectorFound++;
          totalFound++;
        } else {
          sectorErrors++;
        }

        // Delay between API calls (respect rate limits)
        await new Promise(r => setTimeout(r, 1500));
      }

      results[sector] = sectorFound;
      errors[sector] = sectorErrors;
    }

    // Log the run
    await supabase.from('instagram_token_log').insert({
      action: 'prospecting_cron',
      details: JSON.stringify({
        sectors: selectedSectors,
        results,
        errors,
        totalFound,
        totalTried,
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
      totalTried,
      totalLeadsInDB: totalLeads,
      pendingOutreach: newLeads,
      details: results,
      notFound: errors,
    });
  } catch (error) {
    console.error('Prospecting cron error:', error);
    return NextResponse.json({ error: 'Internal error', details: String(error) }, { status: 500 });
  }
}
