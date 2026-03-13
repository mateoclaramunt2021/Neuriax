import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(url, key);
}

// ─── Generate personalized follow-up with AI ────────────────────────────────
async function generateFollowup(lead: Record<string, unknown>, attempt: number): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return attempt === 1
      ? '¡Ey! Te escribí hace un rato, no sé si lo viste. Si tienes alguna duda sobre automatización, webs o lo que sea, aquí estoy 😊'
      : 'Buenas! Solo quería saber si al final os interesa lo que hablamos. Si no, sin problema, aquí estaremos cuando lo necesitéis 💪';
  }

  const context = [];
  if (lead.negocio) context.push(`Su negocio: ${lead.negocio}`);
  if (lead.sector) context.push(`Sector: ${lead.sector}`);
  if (lead.necesidad) context.push(`Necesita: ${lead.necesidad}`);
  if (lead.contact_name) context.push(`Se llama: ${lead.contact_name}`);

  const prompt = attempt === 1
    ? `Genera un mensaje de follow-up CORTO (2-3 líneas) para WhatsApp. El lead no ha respondido en +24h. Sé casual, cercano, no insistente. Usa 1-2 emojis. NO des precios. ${context.length > 0 ? 'Personaliza con esta info: ' + context.join('. ') : 'No sabemos mucho del lead, sé genérico pero amigable.'} Solo devuelve el mensaje, sin comillas ni explicación.`
    : `Genera un SEGUNDO mensaje de follow-up CORTO (2-3 líneas) para WhatsApp. Ya se le envió un primer follow-up y no respondió. Sé muy suave, sin presión, deja claro que no pasa nada si no le interesa. Usa 1 emoji. NO des precios. ${context.length > 0 ? 'Info del lead: ' + context.join('. ') : ''} Solo devuelve el mensaje, sin comillas ni explicación.`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: 'Eres Neuri, el asistente de IA de Neuriax. Generas mensajes de follow-up naturales para WhatsApp. Nunca des precios. Sé cercano y casual.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 150,
        temperature: 0.8,
      }),
    });

    if (!response.ok) throw new Error('Groq API error');
    const data = await response.json();
    return data.choices[0]?.message?.content?.trim() || (attempt === 1
      ? '¡Ey! Te escribí hace un rato, no sé si lo viste. Si tienes alguna duda sobre automatización, webs o lo que sea, aquí estoy 😊'
      : 'Buenas! Solo quería saber si al final os interesa lo que hablamos. Si no, sin problema, aquí estaremos cuando lo necesitéis 💪');
  } catch {
    return attempt === 1
      ? '¡Ey! Te escribí hace un rato, no sé si lo viste. Si tienes alguna duda sobre automatización, webs o lo que sea, aquí estoy 😊'
      : 'Buenas! Solo quería saber si al final os interesa lo que hablamos. Si no, sin problema, aquí estaremos cuando lo necesitéis 💪';
  }
}

// ─── Send WhatsApp message ──────────────────────────────────────────────────
async function sendWhatsAppMessage(to: string, message: string): Promise<boolean> {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  if (!phoneNumberId || !accessToken) return false;

  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to,
          type: 'text',
          text: { body: message },
        }),
      }
    );
    return response.ok;
  } catch {
    return false;
  }
}

// ─── GET: WhatsApp follow-up cron ───────────────────────────────────────────
export async function GET() {
  try {
    const supabase = getSupabase();

    // Check if bot is enabled globally
    const { data: config } = await supabase
      .from('whatsapp_config')
      .select('bot_enabled')
      .single();

    if (config?.bot_enabled === false) {
      return NextResponse.json({ skipped: true, reason: 'Bot disabled' });
    }

    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();

    // ─── FIRST FOLLOW-UP: leads with no response for 24h+, followup_count = 0 ───
    const { data: firstFollowups } = await supabase
      .from('whatsapp_leads')
      .select('*')
      .in('estado', ['nuevo', 'cualificando'])
      .eq('bot_paused', false)
      .lt('last_inbound_at', oneDayAgo)
      .eq('followup_count', 0)
      .not('last_inbound_at', 'is', null)
      .order('last_inbound_at', { ascending: true })
      .limit(10);

    // ─── SECOND FOLLOW-UP: leads with 1 follow-up 48h+ ago, still no response ───
    const { data: secondFollowups } = await supabase
      .from('whatsapp_leads')
      .select('*')
      .in('estado', ['nuevo', 'cualificando'])
      .eq('bot_paused', false)
      .eq('followup_count', 1)
      .lt('followup_sent_at', twoDaysAgo)
      .not('followup_sent_at', 'is', null)
      .order('followup_sent_at', { ascending: true })
      .limit(5);

    // ─── MARK AS NO_RESPONDE: leads with 2 follow-ups, 72h+ since last ───
    const threeDaysAgo = new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString();
    const { data: staleLeads } = await supabase
      .from('whatsapp_leads')
      .select('id')
      .in('estado', ['nuevo', 'cualificando'])
      .gte('followup_count', 2)
      .lt('followup_sent_at', threeDaysAgo)
      .not('followup_sent_at', 'is', null);

    if (staleLeads && staleLeads.length > 0) {
      await supabase
        .from('whatsapp_leads')
        .update({ estado: 'no_responde', updated_at: new Date().toISOString() })
        .in('id', staleLeads.map(l => l.id));
    }

    const allLeads = [
      ...(firstFollowups || []).map(l => ({ ...l, attempt: 1 })),
      ...(secondFollowups || []).map(l => ({ ...l, attempt: 2 })),
    ];

    let sentCount = 0;
    let failedCount = 0;

    for (const lead of allLeads) {
      const message = await generateFollowup(lead, lead.attempt);
      const sent = await sendWhatsAppMessage(lead.phone_number, message);

      if (sent) {
        await supabase
          .from('whatsapp_leads')
          .update({
            followup_count: lead.attempt,
            followup_sent_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('phone_number', lead.phone_number);

        // Save message in DB
        await supabase.from('whatsapp_messages').insert({
          phone_number: lead.phone_number,
          contact_name: lead.contact_name || 'Desconocido',
          direction: 'outbound',
          message_type: 'text',
          content: message,
          status: 'sent',
          is_bot: true,
        });

        sentCount++;
      } else {
        failedCount++;
      }

      // Random delay 3-5s between sends
      const delay = 3000 + Math.random() * 2000;
      await new Promise(r => setTimeout(r, delay));
    }

    return NextResponse.json({
      success: true,
      firstFollowups: firstFollowups?.length || 0,
      secondFollowups: secondFollowups?.length || 0,
      sent: sentCount,
      failed: failedCount,
      markedNoResponse: staleLeads?.length || 0,
    });
  } catch (error) {
    console.error('WhatsApp follow-up cron error:', error);
    return NextResponse.json({ error: 'Cron error' }, { status: 500 });
  }
}
