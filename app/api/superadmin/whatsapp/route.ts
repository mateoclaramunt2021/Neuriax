import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(url, key);
}

// GET - WhatsApp messages, config & leads
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone');

    // Get config
    const { data: config } = await supabase
      .from('whatsapp_config')
      .select('*')
      .single();

    // Get all leads
    const { data: leads } = await supabase
      .from('whatsapp_leads')
      .select('*')
      .order('updated_at', { ascending: false });

    const leadsMap: Record<string, any> = {};
    (leads || []).forEach((l: any) => { leadsMap[l.phone_number] = l; });

    if (phone) {
      const { data: messages } = await supabase
        .from('whatsapp_messages')
        .select('*')
        .eq('phone_number', phone)
        .order('created_at', { ascending: true })
        .limit(100);

      return NextResponse.json({
        config,
        messages: messages || [],
        lead: leadsMap[phone] || null,
      });
    }

    // Get all conversations (grouped by phone)
    const { data: allMessages } = await supabase
      .from('whatsapp_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500);

    const conversations: Record<string, {
      phone: string;
      name: string;
      lastMessage: string;
      lastTime: string;
      unread: number;
      totalMessages: number;
      lead: any;
    }> = {};

    allMessages?.forEach((msg: any) => {
      if (!conversations[msg.phone_number]) {
        conversations[msg.phone_number] = {
          phone: msg.phone_number,
          name: msg.contact_name || msg.phone_number,
          lastMessage: msg.content || '',
          lastTime: msg.created_at,
          unread: 0,
          totalMessages: 0,
          lead: leadsMap[msg.phone_number] || null,
        };
      }
      conversations[msg.phone_number].totalMessages++;
      if (msg.direction === 'inbound' && msg.status !== 'read') {
        conversations[msg.phone_number].unread++;
      }
    });

    // Pipeline stats
    const pipeline: Record<string, number> = {
      nuevo: 0,
      cualificando: 0,
      cualificado: 0,
      no_cualificado: 0,
      llamada_agendada: 0,
      no_responde: 0,
    };
    (leads || []).forEach((l: any) => {
      if (l.estado && l.estado in pipeline) {
        pipeline[l.estado as keyof typeof pipeline]++;
      }
    });

    // Enhanced stats
    const now = Date.now();
    const oneDayAgo = now - 24 * 60 * 60 * 1000;
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
    const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);

    const todayMessages = allMessages?.filter((m: any) => new Date(m.created_at).getTime() >= todayStart.getTime()).length || 0;
    const botMessages7d = allMessages?.filter((m: any) => m.is_bot && new Date(m.created_at).getTime() >= sevenDaysAgo).length || 0;
    const manualMessages7d = allMessages?.filter((m: any) => !m.is_bot && m.direction === 'outbound' && new Date(m.created_at).getTime() >= sevenDaysAgo).length || 0;
    const unreadCount = Object.values(conversations).reduce((acc, c) => acc + c.unread, 0);
    const firstContact7d = (leads || []).filter((l: any) => new Date(l.created_at).getTime() >= sevenDaysAgo).length;

    // Pending follow-ups: leads with last_inbound_at > 24h ago, followup_count < 2, not paused, estado nuevo/cualificando
    const pendingFollowups = (leads || []).filter((l: any) => {
      if (l.bot_paused) return false;
      if (!['nuevo', 'cualificando'].includes(l.estado)) return false;
      if (!l.last_inbound_at) return false;
      const lastInbound = new Date(l.last_inbound_at).getTime();
      if (lastInbound > oneDayAgo) return false;
      if (l.followup_count >= 2) return false;
      return true;
    });

    // Response rate: leads that have at least 2 inbound messages / total leads
    const leadsWithResponse = Object.values(conversations).filter(c => {
      const lead = c.lead;
      if (!lead) return false;
      return lead.negocio || lead.necesidad; // they engaged enough to share info
    }).length;
    const responseRate = Object.keys(conversations).length > 0
      ? Math.round((leadsWithResponse / Object.keys(conversations).length) * 100)
      : 0;

    // Recent bot activity (last 15 actions)
    const recentActivity = (allMessages || [])
      .filter((m: any) => m.is_bot || m.direction === 'outbound')
      .slice(0, 15)
      .map((m: any) => ({
        phone: m.phone_number,
        name: m.contact_name || m.phone_number,
        content: m.content?.substring(0, 80) || '',
        status: m.status,
        is_bot: m.is_bot,
        created_at: m.created_at,
      }));

    const stats = {
      totalConversations: Object.keys(conversations).length,
      totalMessages: allMessages?.length || 0,
      botMessages: allMessages?.filter((m: any) => m.is_bot).length || 0,
      humanMessages: allMessages?.filter((m: any) => !m.is_bot && m.direction === 'outbound').length || 0,
      todayMessages,
      unreadCount,
      botMessages7d,
      manualMessages7d,
      firstContact7d,
      responseRate,
      pendingFollowups: pendingFollowups.length,
      pendingFollowupPhones: pendingFollowups.map((l: any) => l.phone_number),
      pipeline,
      recentActivity,
    };

    return NextResponse.json({
      config,
      conversations: Object.values(conversations).sort((a, b) =>
        new Date(b.lastTime).getTime() - new Date(a.lastTime).getTime()
      ),
      leads: leads || [],
      stats,
    });
  } catch (error) {
    console.error('WhatsApp API error:', error);
    return NextResponse.json({ error: 'Error cargando datos de WhatsApp' }, { status: 500 });
  }
}

// PUT - Update WhatsApp config
export async function PUT(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const config = await request.json();

    // Check if config exists
    const { data: existing } = await supabase
      .from('whatsapp_config')
      .select('id')
      .single();

    if (existing) {
      await supabase
        .from('whatsapp_config')
        .update({ ...config, updated_at: new Date().toISOString() })
        .eq('id', existing.id);
    } else {
      await supabase.from('whatsapp_config').insert(config);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('WhatsApp config error:', error);
    return NextResponse.json({ error: 'Error guardando configuración' }, { status: 500 });
  }
}

// POST - Send a WhatsApp message (manual from panel)
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const { phone, message } = await request.json();

    if (!phone || !message) {
      return NextResponse.json({ error: 'Teléfono y mensaje requeridos' }, { status: 400 });
    }

    // Try to send via WhatsApp Business API
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
    let sent = false;

    if (phoneNumberId && accessToken) {
      try {
        const waRes = await fetch(
          `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messaging_product: 'whatsapp',
              to: phone.replace(/[^0-9]/g, ''),
              type: 'text',
              text: { body: message },
            }),
          }
        );
        sent = waRes.ok;
      } catch (e) {
        console.error('WhatsApp API send error:', e);
      }
    }

    // Log the message
    await supabase.from('whatsapp_messages').insert({
      phone_number: phone,
      direction: 'outbound',
      content: message,
      status: sent ? 'sent' : 'pending',
      is_bot: false,
    });

    return NextResponse.json({ 
      success: true, 
      sent,
      note: sent ? 'Mensaje enviado por WhatsApp' : 'Mensaje registrado. Configura la API de WhatsApp Business para envío real.' 
    });
  } catch (error) {
    console.error('Send WhatsApp error:', error);
    return NextResponse.json({ error: 'Error enviando mensaje' }, { status: 500 });
  }
}

// PATCH - Toggle bot pause, update estado, send follow-up, discard lead
export async function PATCH(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const body = await request.json();
    const { phone, bot_paused, estado, action } = body;

    if (!phone) {
      return NextResponse.json({ error: 'Teléfono requerido' }, { status: 400 });
    }

    // ─── FOLLOW-UP ACTION ───
    if (action === 'followup' || action === 'followup_mass') {
      const phones = action === 'followup_mass' ? (body.phones || [phone]) : [phone];
      let sent = 0;
      let failed = 0;

      for (const p of phones) {
        const { data: lead } = await supabase
          .from('whatsapp_leads')
          .select('*')
          .eq('phone_number', p)
          .single();

        if (!lead || lead.bot_paused || lead.followup_count >= 2) continue;

        const attempt = (lead.followup_count || 0) + 1;
        const message = await generateFollowupMessage(lead, attempt);

        const wasSent = await sendWAMessage(p, message);
        if (wasSent) {
          await supabase.from('whatsapp_leads').update({
            followup_count: attempt,
            followup_sent_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }).eq('phone_number', p);

          await supabase.from('whatsapp_messages').insert({
            phone_number: p,
            contact_name: lead.contact_name || 'Desconocido',
            direction: 'outbound',
            message_type: 'text',
            content: message,
            status: 'sent',
            is_bot: true,
          });
          sent++;
        } else {
          failed++;
        }

        // Delay between mass sends
        if (action === 'followup_mass' && phones.length > 1) {
          await new Promise(r => setTimeout(r, 2000 + Math.random() * 2000));
        }
      }

      return NextResponse.json({ success: true, sent, failed });
    }

    // ─── DISCARD ACTION ───
    if (action === 'discard') {
      await supabase.from('whatsapp_leads').update({
        estado: 'no_cualificado',
        updated_at: new Date().toISOString(),
      }).eq('phone_number', phone);
      return NextResponse.json({ success: true });
    }

    // ─── NORMAL UPDATE ───
    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (bot_paused !== undefined) updates.bot_paused = bot_paused;
    if (estado !== undefined) updates.estado = estado;

    // Upsert: create lead if it doesn't exist
    const { data: existing } = await supabase
      .from('whatsapp_leads')
      .select('id')
      .eq('phone_number', phone)
      .single();

    if (existing) {
      await supabase
        .from('whatsapp_leads')
        .update(updates)
        .eq('phone_number', phone);
    } else {
      await supabase.from('whatsapp_leads').insert({
        phone_number: phone,
        bot_paused: bot_paused ?? false,
        estado: estado ?? 'nuevo',
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('WhatsApp PATCH error:', error);
    return NextResponse.json({ error: 'Error actualizando lead' }, { status: 500 });
  }
}

// ─── Helper: Generate follow-up message with AI ────────────────────────────
async function generateFollowupMessage(lead: Record<string, unknown>, attempt: number): Promise<string> {
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
    ? `Genera un mensaje de follow-up CORTO (2-3 líneas) para WhatsApp. El lead no ha respondido en +24h. Sé casual, cercano, no insistente. Usa 1-2 emojis. NO des precios. ${context.length > 0 ? 'Personaliza con esta info: ' + context.join('. ') : 'No sabemos mucho del lead, sé genérico pero amigable.'} Solo devuelve el mensaje, sin comillas.`
    : `Genera un SEGUNDO follow-up CORTO (2-3 líneas) para WhatsApp. Ya se le envió un primer follow-up y no respondió. Sé muy suave, sin presión. Usa 1 emoji. NO des precios. ${context.length > 0 ? 'Info del lead: ' + context.join('. ') : ''} Solo devuelve el mensaje, sin comillas.`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: 'Eres Neuri, el asistente de IA de Neuriax. Generas mensajes de follow-up naturales para WhatsApp. Nunca des precios.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 150,
        temperature: 0.8,
      }),
    });
    if (!response.ok) throw new Error();
    const data = await response.json();
    return data.choices[0]?.message?.content?.trim() || 'Ey! Te escribí hace un rato, si necesitas algo estamos por aquí 👍';
  } catch {
    return attempt === 1
      ? '¡Ey! Te escribí hace un rato, no sé si lo viste. Si tienes alguna duda aquí estoy 😊'
      : 'Buenas! Solo quería saber si al final os interesa. Si no, sin problema 💪';
  }
}

// ─── Helper: Send WhatsApp message ──────────────────────────────────────────
async function sendWAMessage(to: string, message: string): Promise<boolean> {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  if (!phoneNumberId || !accessToken) return false;
  try {
    const res = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
      body: JSON.stringify({ messaging_product: 'whatsapp', to, type: 'text', text: { body: message } }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
