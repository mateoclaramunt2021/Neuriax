import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(url, key);
}

// ─── Follow-up messages (casual, short, not pushy) ───
const FOLLOWUP_TEMPLATES: Record<string, string[]> = {
  restaurante: [
    'ey! te escribí el otro día, no sé si lo viste 😊 si os interesa mejorar la parte online del restaurante me decís!',
    'buenas! solo quería saber si visteis mi mensaje, si no os interesa sin problema eh!',
    'hola! os escribí hace un par de días, si os mola la idea de tener web propia me decís y os cuento rápido 👍',
  ],
  clinica_estetica: [
    'hola! os escribí hace unos días, no sé si lo visteis, si os interesa el tema web/digital me decís!',
    'ey! solo hacía follow up del mensaje que os mandé, si no os interesa cero problema 😊',
    'buenas! quería saber si visteis mi mensaje anterior, si necesitáis algo de presencia online estamos por aquí!',
  ],
  barberia: [
    'ey! os escribí el otro día, no sé si lo visteis jaja si os interesa el tema web o reservas online me decís!',
    'buenas! solo quería hacer follow up, si necesitáis algo para captar más clientes online estamos aquí 👍',
    'hola! os mandé un mensaje hace unos días, si os mola tener web o sistema de reservas me decís!',
  ],
  clinica_salud: [
    'hola! os escribí hace un par de días, si os interesa mejorar el tema digital de la clínica me decís!',
    'ey! hacía follow up de mi mensaje anterior, si no os interesa sin problema, pero si queréis web o más pacientes online aquí estamos!',
    'buenas! solo quería saber si visteis el mensaje que os mandé, si os interesa captar pacientes online me decís 😊',
  ],
  general: [
    'ey! os escribí hace unos días, no sé si lo visteis, si os interesa el tema digital me decís!',
    'buenas! solo quería hacer follow up, si necesitáis algo estamos por aquí 👍',
  ],
};

// ─── IGSID Resolution ───
const igsidCache: Record<string, string> = {};
async function resolveIGSID(senderId: string, accessToken: string): Promise<string> {
  if (igsidCache[senderId]) return igsidCache[senderId];
  try {
    const res = await fetch(
      `https://graph.instagram.com/v21.0/me/conversations?platform=instagram&fields=participants&limit=50`,
      { headers: { 'Authorization': `Bearer ${accessToken}` } }
    );
    if (res.ok) {
      const data = await res.json();
      for (const conv of data.data || []) {
        for (const p of conv.participants?.data || []) {
          if (p.id.startsWith(senderId)) {
            igsidCache[senderId] = p.id;
            return p.id;
          }
        }
      }
    }
  } catch { /* ignore */ }
  return senderId;
}

async function sendFollowup(recipientId: string, message: string, accessToken: string): Promise<boolean> {
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
      console.error('Follow-up send error:', err);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

// ─── GET: Follow-up cron ───
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

    if (config?.cold_outreach_enabled === false) {
      return NextResponse.json({ skipped: true, reason: 'Cold outreach disabled' });
    }

    // Get leads that were contacted 48+ hours ago, haven't responded, and haven't had a followup
    const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();

    const { data: leadsToFollowup } = await supabase
      .from('instagram_cold_leads')
      .select('*')
      .eq('status', 'contacted')
      .eq('responded', false)
      .eq('blacklisted', false)
      .is('followup_sent_at', null)
      .lt('first_dm_sent_at', twoDaysAgo)
      .order('first_dm_sent_at', { ascending: true })
      .limit(5);

    if (!leadsToFollowup || leadsToFollowup.length === 0) {
      // Also check for leads that got a follow-up 72h+ ago and still no response → mark as no_response
      const threeDaysAgo = new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString();
      const { data: staleLeads } = await supabase
        .from('instagram_cold_leads')
        .select('id')
        .eq('status', 'contacted')
        .eq('responded', false)
        .not('followup_sent_at', 'is', null)
        .lt('followup_sent_at', threeDaysAgo);

      if (staleLeads && staleLeads.length > 0) {
        await supabase
          .from('instagram_cold_leads')
          .update({ status: 'no_response', updated_at: new Date().toISOString() })
          .in('id', staleLeads.map(l => l.id));
      }

      return NextResponse.json({
        processed: 0,
        staleMarked: staleLeads?.length || 0,
        message: 'No leads to follow up',
      });
    }

    let sentCount = 0;
    let failedCount = 0;

    for (const lead of leadsToFollowup) {
      // Pick a follow-up template
      const templates = FOLLOWUP_TEMPLATES[lead.sector] || FOLLOWUP_TEMPLATES.general;
      const message = templates[Math.floor(Math.random() * templates.length)];

      const sent = await sendFollowup(lead.instagram_user_id, message, accessToken);

      if (sent) {
        await supabase
          .from('instagram_cold_leads')
          .update({
            followup_sent_at: new Date().toISOString(),
            followup_message: message,
            updated_at: new Date().toISOString(),
          })
          .eq('id', lead.id);

        // Save in messages for CRM
        await supabase.from('instagram_messages').insert({
          sender_id: lead.instagram_user_id,
          sender_name: lead.username || lead.instagram_user_id,
          direction: 'outbound',
          content: message,
          status: 'sent',
          is_bot: true,
          message_type: 'cold_followup',
        });

        sentCount++;
      } else {
        failedCount++;
      }

      // Random delay 3-6 seconds
      const delay = 3000 + Math.random() * 3000;
      await new Promise(r => setTimeout(r, delay));
    }

    // Mark old leads with followup but no response as no_response
    const threeDaysAgo = new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString();
    const { data: staleLeads } = await supabase
      .from('instagram_cold_leads')
      .select('id')
      .eq('status', 'contacted')
      .eq('responded', false)
      .not('followup_sent_at', 'is', null)
      .lt('followup_sent_at', threeDaysAgo);

    if (staleLeads && staleLeads.length > 0) {
      await supabase
        .from('instagram_cold_leads')
        .update({ status: 'no_response', updated_at: new Date().toISOString() })
        .in('id', staleLeads.map(l => l.id));
    }

    // Log
    await supabase.from('instagram_token_log').insert({
      action: 'followup_cron',
      details: JSON.stringify({
        attempted: leadsToFollowup.length,
        sent: sentCount,
        failed: failedCount,
        stale_marked: staleLeads?.length || 0,
        timestamp: new Date().toISOString(),
      }),
    });

    return NextResponse.json({
      success: true,
      attempted: leadsToFollowup.length,
      sent: sentCount,
      failed: failedCount,
      staleMarked: staleLeads?.length || 0,
    });
  } catch (error) {
    console.error('Follow-up cron error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
