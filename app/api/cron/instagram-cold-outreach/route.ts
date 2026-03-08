import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(url, key);
}

// ─── Mensajes de primer DM por sector ───
// Cada sector tiene múltiples templates para rotar y no repetir
const COLD_DM_TEMPLATES: Record<string, string[]> = {
  restaurante: [
    'ey! vi vuestro perfil y tiene muy buena pinta el sitio 🔥 lleváis mucho tiempo con el restaurante?',
    'buenas! me salió vuestro perfil y mola mucho, esas fotos de platos son 🔥 cómo os va el negocio?',
    'hola! vi vuestro restaurante por aquí y flipé con las fotos jaja en qué zona estáis?',
    'ey qué tal! vi vuestro perfil y se ve muy bien, qué onda con el local? se ve un buen concepto 👏',
    'buenas! muy buena pinta vuestro sitio, os va bien de clientes nuevos o la zona es complicada?',
  ],
  clinica_estetica: [
    'hola! vi vuestra clínica por aquí y se ve muy pro 💪 lleváis mucho en el sector?',
    'ey! vi vuestro perfil y los resultados que mostráis están genial, qué tratamientos hacéis más?',
    'buenas! me salió vuestro perfil y me llamó la atención, se ve un trabajo brutal 🔥 cómo os va?',
    'hola! vi vuestra clínica y tiene buena pinta, en qué zona estáis? se ve un sitio top',
    'ey qué tal! vi vuestros trabajos por aquí y molan bastante, lleváis mucho con la clínica?',
  ],
  barberia: [
    'buenas! vi vuestra barbería por aquí y tiene muy buen rollo 🔥 lleváis mucho abiertos?',
    'ey! vi vuestro perfil y los cortes están brutales 💈 cómo os va el negocio?',
    'hola! me salió vuestro perfil y me mola mucho el estilo, sois de qué zona?',
    'ey qué tal! vi vuestra barber y se ve muy guay, os va bien de clientes? el perfil mola 👏',
    'buenas! vuestros cortes molan bastante, tenéis un estilo muy definido, cómo os va?',
  ],
  clinica_salud: [
    'hola! vi vuestra clínica por aquí, se ve muy profesional, en qué os especializáis?',
    'ey! vi vuestro perfil y se ve muy currado, lleváis mucho tiempo con la clínica?',
    'buenas! me salió vuestra clínica y tiene buena pinta, cómo os va el tema de pacientes nuevos?',
    'hola! vi vuestro perfil y mola, en qué zona estáis? se ve un centro top 💪',
    'ey qué tal! vi vuestra clínica por aquí, qué tal os va? se ve muy profesional',
  ],
  inmobiliaria: [
    'ey! vi vuestro perfil y tenéis propiedades muy chulas 🏠 cómo os va el sector por vuestra zona?',
    'buenas! me salió vuestro perfil, tenéis un catálogo interesante, lleváis mucho en el sector?',
    'hola! vi vuestra inmobiliaria y se ve muy pro, cómo estáis captando propietarios nuevos?',
  ],
  gym: [
    'ey! vi vuestro gym por aquí y se ve brutal 💪 lleváis mucho abiertos?',
    'buenas! vi vuestro perfil y mola, cómo os va con los socios nuevos? se ve un buen sitio',
    'hola! me salió vuestro gym y tiene buena pinta, en qué zona estáis?',
  ],
  tienda: [
    'ey! vi vuestra tienda por aquí y mola mucho, cómo os va el negocio? 🔥',
    'buenas! me salió vuestro perfil y tenéis productos muy chulos, lleváis mucho con la tienda?',
    'hola! vi vuestro perfil y se ve interesante, vendéis más online o en local?',
  ],
  general: [
    'ey qué tal! vi vuestro perfil y me mola, a qué os dedicáis exactamente? se ve interesante 🤔',
    'buenas! me salió vuestro perfil por aquí y tiene buena pinta, cómo os va el negocio?',
    'hola! vi vuestro perfil y se ve interesante, lleváis mucho con esto? 💪',
  ],
};

// ─── IGSID Resolution ───
const igsidCache: Record<string, string> = {};
async function resolveIGSID(webhookSenderId: string, accessToken: string): Promise<string> {
  if (igsidCache[webhookSenderId]) return igsidCache[webhookSenderId];
  try {
    const res = await fetch(
      `https://graph.instagram.com/v21.0/me/conversations?platform=instagram&fields=participants&limit=50`,
      { headers: { 'Authorization': `Bearer ${accessToken}` } }
    );
    if (res.ok) {
      const data = await res.json();
      for (const conv of data.data || []) {
        for (const p of conv.participants?.data || []) {
          if (p.id.startsWith(webhookSenderId)) {
            igsidCache[webhookSenderId] = p.id;
            return p.id;
          }
        }
      }
    }
  } catch { /* ignore */ }
  return webhookSenderId;
}

// ─── Send cold DM ───
async function sendColdDM(recipientId: string, message: string, accessToken: string): Promise<boolean> {
  try {
    const resolvedId = await resolveIGSID(recipientId, accessToken);
    const response = await fetch(
      `https://graph.instagram.com/v21.0/me/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          recipient: { id: resolvedId },
          message: { text: message },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.json();
      console.error('Cold DM send error:', err, 'recipientId:', resolvedId);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Cold DM exception:', error);
    return false;
  }
}

// ─── Pick a random template for the sector ───
function pickTemplate(sector: string): string {
  const templates = COLD_DM_TEMPLATES[sector] || COLD_DM_TEMPLATES.general;
  return templates[Math.floor(Math.random() * templates.length)];
}

// ─── GET: Main cron handler — sends cold DMs ───
export async function GET() {
  try {
    const supabase = getSupabase();

    // Get config
    const { data: config } = await supabase
      .from('instagram_config')
      .select('*')
      .single();

    const accessToken = config?.access_token || process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json({ error: 'Instagram not configured' }, { status: 400 });
    }

    // Check if cold outreach is enabled
    if (config?.cold_outreach_enabled === false) {
      return NextResponse.json({ skipped: true, reason: 'Cold outreach disabled' });
    }

    // Max DMs per day (safety limit)
    const maxPerRun = config?.cold_dm_daily_limit || 8;

    // Get leads that haven't been contacted yet, not blacklisted
    // Excludes 'manual_no_dm' leads (user chose not to send DM)
    const { data: allNewLeads } = await supabase
      .from('instagram_cold_leads')
      .select('*')
      .eq('status', 'new')
      .eq('blacklisted', false)
      .neq('source_hashtag', 'manual_no_dm')
      .order('created_at', { ascending: true })
      .limit(maxPerRun);

    // Filter out scheduled leads whose time hasn't arrived yet
    const now = new Date();
    const newLeads = (allNewLeads || []).filter(lead => {
      if (lead.notes && lead.notes.startsWith('[SCHEDULED:')) {
        const match = lead.notes.match(/^\[SCHEDULED:([^\]]+)\]/);
        if (match) {
          const scheduledTime = new Date(match[1]);
          if (now < scheduledTime) return false; // Not yet time
          // Time has passed, strip the prefix from notes before sending
          lead.notes = lead.notes.replace(/^\[SCHEDULED:[^\]]+\]/, '').trim() || null;
        }
      }
      return true;
    });

    if (!newLeads || newLeads.length === 0) {
      return NextResponse.json({ processed: 0, message: 'No new leads to contact' });
    }

    let sentCount = 0;
    let failedCount = 0;
    const contacted: string[] = [];

    for (const lead of newLeads) {
      // Pick a personalized template
      const message = pickTemplate(lead.sector);

      // Send the DM
      const sent = await sendColdDM(lead.instagram_user_id, message, accessToken);

      if (sent) {
        // Update lead status
        await supabase
          .from('instagram_cold_leads')
          .update({
            status: 'contacted',
            first_dm_sent_at: new Date().toISOString(),
            first_dm_message: message,
            updated_at: new Date().toISOString(),
          })
          .eq('id', lead.id);

        // Also save in instagram_messages for the CRM inbox
        await supabase.from('instagram_messages').insert({
          sender_id: lead.instagram_user_id,
          sender_name: lead.username || lead.instagram_user_id,
          direction: 'outbound',
          content: message,
          status: 'sent',
          is_bot: true,
          message_type: 'cold_dm',
        });

        // Record in followers table for CRM tracking
        await supabase.from('instagram_followers').upsert({
          instagram_user_id: lead.instagram_user_id,
          username: lead.username || lead.instagram_user_id,
          label: 'lead',
          welcome_sent: true,
          welcome_sent_at: new Date().toISOString(),
        }, { onConflict: 'instagram_user_id' });

        sentCount++;
        contacted.push(lead.username || lead.instagram_user_id);
      } else {
        failedCount++;

        // Mark as failed so we can retry later or skip
        await supabase
          .from('instagram_cold_leads')
          .update({
            status: 'dm_failed',
            notes: 'First DM failed to send',
            updated_at: new Date().toISOString(),
          })
          .eq('id', lead.id);
      }

      // Random delay between 3-7 seconds to look natural
      const delay = 3000 + Math.random() * 4000;
      await new Promise(r => setTimeout(r, delay));
    }

    // Log the run
    await supabase.from('instagram_token_log').insert({
      action: 'cold_outreach_cron',
      details: JSON.stringify({
        attempted: newLeads.length,
        sent: sentCount,
        failed: failedCount,
        contacted,
        timestamp: new Date().toISOString(),
      }),
    });

    return NextResponse.json({
      success: true,
      attempted: newLeads.length,
      sent: sentCount,
      failed: failedCount,
      contacted,
    });
  } catch (error) {
    console.error('Cold outreach cron error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
