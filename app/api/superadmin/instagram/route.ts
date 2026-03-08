import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(url, key);
}

// ─── Cold DM templates (same as cold-outreach cron) ───
const COLD_DM_TEMPLATES: Record<string, string[]> = {
  restaurante: [
    'ey! vi vuestro perfil y tiene muy buena pinta el sitio 🔥 tenéis web propia o tiráis con insta y google maps?',
    'buenas! me salió vuestro perfil y mola mucho, cómo os va con los clientes nuevos? llegáis bien por redes o tiráis más de boca a boca?',
    'hola! vi vuestro restaurante por aquí y flipé con las fotos jaja tenéis página web para reservas o usáis solo apps tipo eltenedor?',
    'ey qué tal! vi vuestro perfil y se ve muy bien, estáis captando clientes nuevos por insta o más offline?',
    'buenas! muy buena pinta vuestro sitio, tenéis web donde la gente pueda ver carta y reservar o vais más a pelo?',
  ],
  clinica_estetica: [
    'hola! vi vuestra clínica por aquí y se ve muy pro, cómo lleváis el tema de captar pacientes nuevos por internet?',
    'ey! vi vuestro perfil y los resultados que mostráis están genial, tenéis web propia o trabajáis más con redes?',
    'buenas! me salió vuestro perfil y me llamó la atención, estáis usando algo para que os encuentren online tipo web o google ads?',
    'hola! vi vuestra clínica y tiene buena pinta, cómo os va el tema digital? web, redes, eso',
    'ey qué tal! vi vuestros trabajos por aquí y molan bastante, tenéis web donde la gente pueda pedir cita?',
  ],
  barberia: [
    'buenas! vi vuestra barbería por aquí y tiene muy buen rollo, los clientes nuevos os llegan por insta o más por el barrio?',
    'ey! vi vuestro perfil y los cortes están brutales, tenéis web propia o tiráis solo con redes?',
    'hola! me salió vuestro perfil y me mola mucho el estilo, cómo lleváis el tema reservas? app, whatsapp, o a pelo?',
    'ey qué tal! vi vuestra barber y se ve muy guay, estáis captando clientes nuevos online o más boca a boca?',
    'buenas! vuestros cortes molan bastante, tenéis alguna web donde la gente reserve o tira todo por insta/whats?',
  ],
  clinica_salud: [
    'hola! vi vuestra clínica por aquí, cómo os va el tema de captar pacientes nuevos? tiráis más de google o boca a boca?',
    'ey! vi vuestro perfil y se ve muy profesional, tenéis web propia o estáis en lo de montar una?',
    'buenas! me salió vuestra clínica y tiene buena pinta, los pacientes os encuentran fácil por internet o mejoraríais algo?',
    'hola! vi vuestro perfil y mola, estáis usando algo para captar pacientes online tipo web o google ads?',
    'ey qué tal! vi vuestra clínica por aquí, tenéis página web con reserva de citas o lo hacéis por teléfono/whatsapp?',
  ],
  general: [
    'ey qué tal! vi vuestro perfil y me mola, tenéis presencia online tipo web o tiráis solo con redes?',
    'buenas! me salió vuestro perfil por aquí y tiene buena pinta, cómo os va el tema digital?',
    'hola! vi vuestro negocio y se ve interesante, estáis captando clientes por internet o más offline?',
  ],
};

function pickTemplate(sector: string): string {
  const templates = COLD_DM_TEMPLATES[sector] || COLD_DM_TEMPLATES.general;
  return templates[Math.floor(Math.random() * templates.length)];
}

// ─── Send DM via Instagram API ───
async function sendInstagramDM(username: string, message: string, accessToken: string): Promise<boolean> {
  try {
    // First, try to find the user's IGSID by searching conversations
    let recipientId = username;

    // Try to find via conversations API
    try {
      const convRes = await fetch(
        `https://graph.instagram.com/v21.0/me/conversations?platform=instagram&fields=participants&limit=50`,
        { headers: { 'Authorization': `Bearer ${accessToken}` } }
      );
      if (convRes.ok) {
        const convData = await convRes.json();
        for (const conv of convData.data || []) {
          for (const p of conv.participants?.data || []) {
            if (p.username?.toLowerCase() === username.toLowerCase()) {
              recipientId = p.id;
              break;
            }
          }
          if (recipientId !== username) break;
        }
      }
    } catch { /* proceed with username */ }

    const response = await fetch(
      `https://graph.instagram.com/v21.0/me/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          recipient: { id: recipientId },
          message: { text: message },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.json();
      console.error('Cold DM send error:', err, 'username:', username, 'recipientId:', recipientId);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Cold DM exception:', error);
    return false;
  }
}

// IGSID resolution: webhook sender IDs are truncated vs API participant IDs
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

// GET - Instagram config, conversations, stats, quick replies
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const { searchParams } = new URL(request.url);
    const senderId = searchParams.get('sender');
    const section = searchParams.get('section');

    // Get config
    const { data: config } = await supabase
      .from('instagram_config')
      .select('*')
      .single();

    // Quick replies section
    if (section === 'quick_replies') {
      const { data: quickReplies } = await supabase
        .from('instagram_quick_replies')
        .select('*')
        .eq('active', true)
        .order('sort_order', { ascending: true });
      return NextResponse.json({ quickReplies: quickReplies || [] });
    }

    // Followers/labels section
    if (section === 'followers') {
      const { data: followers } = await supabase
        .from('instagram_followers')
        .select('*')
        .order('first_seen_at', { ascending: false })
        .limit(200);
      return NextResponse.json({ followers: followers || [] });
    }

    // Token log section
    if (section === 'token_log') {
      const { data: logs } = await supabase
        .from('instagram_token_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
      return NextResponse.json({ logs: logs || [] });
    }

    // ─── Cold leads / Prospecting section ───
    if (section === 'cold_leads') {
      const status = searchParams.get('status') || 'all';
      const sector = searchParams.get('sector') || 'all';

      let query = supabase
        .from('instagram_cold_leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);

      if (status !== 'all') query = query.eq('status', status);
      if (sector !== 'all') query = query.eq('sector', sector);

      const { data: coldLeads, error: coldError } = await query;

      // Stats
      const { count: totalLeads } = await supabase.from('instagram_cold_leads').select('id', { count: 'exact', head: true });
      const { count: newLeads } = await supabase.from('instagram_cold_leads').select('id', { count: 'exact', head: true }).eq('status', 'new');
      const { count: contactedLeads } = await supabase.from('instagram_cold_leads').select('id', { count: 'exact', head: true }).eq('status', 'contacted');
      const { count: respondedLeads } = await supabase.from('instagram_cold_leads').select('id', { count: 'exact', head: true }).eq('responded', true);
      const { count: noResponseLeads } = await supabase.from('instagram_cold_leads').select('id', { count: 'exact', head: true }).eq('status', 'no_response');
      const { count: convertedLeads } = await supabase.from('instagram_cold_leads').select('id', { count: 'exact', head: true }).eq('converted', true);

      // Sector breakdown
      const sectorCounts: Record<string, number> = {};
      for (const s of ['restaurante', 'clinica_estetica', 'barberia', 'clinica_salud']) {
        const { count } = await supabase.from('instagram_cold_leads').select('id', { count: 'exact', head: true }).eq('sector', s);
        sectorCounts[s] = count || 0;
      }

      return NextResponse.json({
        coldLeads: coldLeads || [],
        coldLeadsError: coldError?.message || null,
        coldStats: {
          total: totalLeads || 0,
          new: newLeads || 0,
          contacted: contactedLeads || 0,
          responded: respondedLeads || 0,
          noResponse: noResponseLeads || 0,
          converted: convertedLeads || 0,
          responseRate: (contactedLeads || 0) > 0 ? Math.round(((respondedLeads || 0) / (contactedLeads || 0)) * 100) : 0,
          sectors: sectorCounts,
        },
      });
    }

    if (senderId) {
      // Get conversation with specific sender
      const { data: messages } = await supabase
        .from('instagram_messages')
        .select('*')
        .eq('sender_id', senderId)
        .order('created_at', { ascending: true })
        .limit(100);

      // Get sender label
      const { data: follower } = await supabase
        .from('instagram_followers')
        .select('*')
        .eq('instagram_user_id', senderId)
        .single();

      // Mark messages as read
      await supabase
        .from('instagram_messages')
        .update({ status: 'read' })
        .eq('sender_id', senderId)
        .eq('direction', 'inbound')
        .neq('status', 'read');

      return NextResponse.json({ config, messages: messages || [], follower });
    }

    // Get all messages for conversation grouping
    const { data: allMessages } = await supabase
      .from('instagram_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500);

    // Group by sender_id
    const conversations: Record<string, {
      senderId: string;
      name: string;
      lastMessage: string;
      lastTime: string;
      unread: number;
      totalMessages: number;
      label: string;
    }> = {};

    allMessages?.forEach((msg: any) => {
      const key = msg.sender_id;
      if (!conversations[key]) {
        conversations[key] = {
          senderId: key,
          name: msg.sender_name || key,
          lastMessage: msg.content || '',
          lastTime: msg.created_at,
          unread: 0,
          totalMessages: 0,
          label: 'nuevo',
        };
      }
      conversations[key].totalMessages++;
      if (msg.direction === 'inbound' && msg.status !== 'read') {
        conversations[key].unread++;
      }
    });

    // Get labels from followers table
    const senderIds = Object.keys(conversations);
    if (senderIds.length > 0) {
      const { data: followers } = await supabase
        .from('instagram_followers')
        .select('instagram_user_id, label, username')
        .in('instagram_user_id', senderIds);

      followers?.forEach((f: any) => {
        if (conversations[f.instagram_user_id]) {
          conversations[f.instagram_user_id].label = f.label || 'nuevo';
          if (f.username && conversations[f.instagram_user_id].name === f.instagram_user_id) {
            conversations[f.instagram_user_id].name = f.username;
          }
        }
      });
    }

    // Compute stats
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const todayMessages = allMessages?.filter((m: any) => m.created_at >= today) || [];
    const weekMessages = allMessages?.filter((m: any) => m.created_at >= weekAgo) || [];

    const stats = {
      totalConversations: Object.keys(conversations).length,
      totalMessages: allMessages?.length || 0,
      botMessages: allMessages?.filter((m: any) => m.is_bot).length || 0,
      humanMessages: allMessages?.filter((m: any) => !m.is_bot && m.direction === 'outbound').length || 0,
      todayMessages: todayMessages.length,
      weekMessages: weekMessages.length,
      unreadTotal: Object.values(conversations).reduce((sum, c) => sum + c.unread, 0),
      avgResponseTime: '< 5s',
      storyMentions: allMessages?.filter((m: any) => m.message_type === 'story_mention').length || 0,
      firstContacts: allMessages?.filter((m: any) => m.message_type === 'first_contact').length || 0,
      labelCounts: {
        lead: Object.values(conversations).filter(c => c.label === 'lead').length,
        cliente: Object.values(conversations).filter(c => c.label === 'cliente').length,
        interesado: Object.values(conversations).filter(c => c.label === 'interesado').length,
        spam: Object.values(conversations).filter(c => c.label === 'spam').length,
        nuevo: Object.values(conversations).filter(c => c.label === 'nuevo').length,
      },
    };

    // Get quick replies for the chat
    const { data: quickReplies } = await supabase
      .from('instagram_quick_replies')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true });

    return NextResponse.json({
      config: config || {
        bot_enabled: false,
        auto_reply_enabled: false,
        auto_reply_message: 'Hola! Gracias por escribirnos. Te responderemos pronto.',
        welcome_dm_enabled: true,
        welcome_message: '¡Hola! 👋 Gracias por seguirnos en Instagram!\nSoy el asistente de Neuriax. ¿En qué puedo ayudarte? 🚀',
      },
      connected: !!(config?.access_token || process.env.INSTAGRAM_ACCESS_TOKEN),
      conversations: Object.values(conversations).sort((a, b) =>
        new Date(b.lastTime).getTime() - new Date(a.lastTime).getTime()
      ),
      stats,
      quickReplies: quickReplies || [],
    });
  } catch (error) {
    console.error('Instagram API error:', error);
    return NextResponse.json({ error: 'Error cargando datos de Instagram' }, { status: 500 });
  }
}

// PUT - Update Instagram config or labels
export async function PUT(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const body = await request.json();

    // Update label for a conversation
    if (body.action === 'update_label') {
      await supabase
        .from('instagram_followers')
        .upsert({
          instagram_user_id: body.senderId,
          label: body.label,
        }, { onConflict: 'instagram_user_id' });
      return NextResponse.json({ success: true });
    }

    // ─── Cold lead actions ───

    // Add a manual lead
    if (body.action === 'add_lead') {
      const { username, sector, full_name, notes, sendTiming, scheduledAt } = body;
      if (!username || !sector) {
        return NextResponse.json({ error: 'Username y sector son obligatorios' }, { status: 400 });
      }
      const cleanUsername = username.replace(/^@/, '').trim().toLowerCase();

      // Check if lead already exists
      const { data: existing } = await supabase
        .from('instagram_cold_leads')
        .select('id, status')
        .eq('username', cleanUsername)
        .maybeSingle();

      if (existing) {
        return NextResponse.json({ error: `@${cleanUsername} ya existe como lead (estado: ${existing.status})` }, { status: 409 });
      }

      const { error } = await supabase.from('instagram_cold_leads').insert({
        username: cleanUsername,
        instagram_user_id: cleanUsername, // Will be resolved when DM is sent
        sector,
        full_name: full_name || null,
        notes: notes || null,
        source_hashtag: 'manual',
        status: 'new',
        blacklisted: false,
        converted: false,
        responded: false,
      });

      if (error) {
        console.error('Error adding lead:', error);
        return NextResponse.json({ error: 'Error al añadir lead' }, { status: 500 });
      }

      // ─── Handle send timing ───
      const timing = sendTiming || 'now';

      // For scheduled sends, store the scheduled time in notes as a prefix
      if (timing === 'scheduled' && scheduledAt) {
        await supabase
          .from('instagram_cold_leads')
          .update({
            notes: `[SCHEDULED:${scheduledAt}]${notes || ''}`,
            updated_at: new Date().toISOString(),
          })
          .eq('username', cleanUsername);
      }

      // For 'none' → just return, lead stays as 'new' but cron won't auto-send (we mark it)
      if (timing === 'none') {
        await supabase
          .from('instagram_cold_leads')
          .update({
            source_hashtag: 'manual_no_dm',
            updated_at: new Date().toISOString(),
          })
          .eq('username', cleanUsername);
        return NextResponse.json({ success: true, message: `@${cleanUsername} añadido (sin DM)`, dmSent: false });
      }

      // For 'next_cron' → leave as 'new', the daily cron will pick it up
      if (timing === 'next_cron') {
        return NextResponse.json({ success: true, message: `@${cleanUsername} añadido — DM mañana 10 AM`, dmSent: false });
      }

      // For 'scheduled' → leave as 'new' with scheduled prefix, cron will check
      if (timing === 'scheduled') {
        return NextResponse.json({ success: true, message: `@${cleanUsername} añadido — DM programado`, dmSent: false });
      }

      // timing === 'now' → send immediately
      let dmSent = false;
      let dmMessage = '';
      try {
        const { data: config } = await supabase
          .from('instagram_config')
          .select('access_token, cold_outreach_enabled')
          .single();

        const accessToken = config?.access_token || process.env.INSTAGRAM_ACCESS_TOKEN;

        if (accessToken && config?.cold_outreach_enabled !== false) {
          dmMessage = pickTemplate(sector);
          dmSent = await sendInstagramDM(cleanUsername, dmMessage, accessToken);

          if (dmSent) {
            // Update lead → contacted
            await supabase
              .from('instagram_cold_leads')
              .update({
                status: 'contacted',
                first_dm_sent_at: new Date().toISOString(),
                first_dm_message: dmMessage,
                updated_at: new Date().toISOString(),
              })
              .eq('username', cleanUsername);

            // Save in messages for CRM
            await supabase.from('instagram_messages').insert({
              sender_id: cleanUsername,
              sender_name: cleanUsername,
              direction: 'outbound',
              content: dmMessage,
              status: 'sent',
              is_bot: true,
              message_type: 'cold_dm',
            });

            // Add to followers for CRM tracking
            await supabase.from('instagram_followers').upsert({
              instagram_user_id: cleanUsername,
              username: cleanUsername,
              label: 'lead',
              welcome_sent: true,
              welcome_sent_at: new Date().toISOString(),
            }, { onConflict: 'instagram_user_id' });
          } else {
            // DM failed — mark it
            await supabase
              .from('instagram_cold_leads')
              .update({
                status: 'dm_failed',
                notes: (notes || '') + ' | Primer DM falló al enviar',
                updated_at: new Date().toISOString(),
              })
              .eq('username', cleanUsername);
          }
        }
      } catch (e) {
        console.error('Error sending immediate DM:', e);
      }

      return NextResponse.json({
        success: true,
        message: dmSent
          ? `@${cleanUsername} añadido y primer DM enviado ✅`
          : `@${cleanUsername} añadido como lead (DM pendiente)`,
        dmSent,
        dmMessage: dmSent ? dmMessage : undefined,
      });
    }

    if (body.action === 'blacklist_lead') {
      await supabase
        .from('instagram_cold_leads')
        .update({ blacklisted: true, status: 'blacklisted', updated_at: new Date().toISOString() })
        .eq('id', body.leadId);
      return NextResponse.json({ success: true });
    }

    if (body.action === 'convert_lead') {
      await supabase
        .from('instagram_cold_leads')
        .update({ converted: true, status: 'converted', updated_at: new Date().toISOString() })
        .eq('id', body.leadId);
      return NextResponse.json({ success: true });
    }

    if (body.action === 'update_lead_status') {
      await supabase
        .from('instagram_cold_leads')
        .update({ status: body.status, updated_at: new Date().toISOString() })
        .eq('id', body.leadId);
      return NextResponse.json({ success: true });
    }

    if (body.action === 'update_lead_notes') {
      await supabase
        .from('instagram_cold_leads')
        .update({ notes: body.notes, updated_at: new Date().toISOString() })
        .eq('id', body.leadId);
      return NextResponse.json({ success: true });
    }

    if (body.action === 'toggle_cold_outreach') {
      const { data: existing } = await supabase
        .from('instagram_config')
        .select('id')
        .single();
      if (existing) {
        await supabase
          .from('instagram_config')
          .update({ cold_outreach_enabled: body.enabled, updated_at: new Date().toISOString() })
          .eq('id', existing.id);
      }
      return NextResponse.json({ success: true });
    }

    // Update a quick reply
    if (body.action === 'update_quick_reply') {
      if (body.id) {
        await supabase
          .from('instagram_quick_replies')
          .update({ label: body.label, message: body.message, icon: body.icon })
          .eq('id', body.id);
      } else {
        await supabase.from('instagram_quick_replies').insert({
          label: body.label,
          message: body.message,
          icon: body.icon || '💬',
          sort_order: body.sort_order || 99,
        });
      }
      return NextResponse.json({ success: true });
    }

    // Delete a quick reply
    if (body.action === 'delete_quick_reply') {
      await supabase
        .from('instagram_quick_replies')
        .delete()
        .eq('id', body.id);
      return NextResponse.json({ success: true });
    }

    // Default: update config
    const config = body;
    const { data: existing } = await supabase
      .from('instagram_config')
      .select('id')
      .single();

    if (existing) {
      await supabase
        .from('instagram_config')
        .update({ ...config, updated_at: new Date().toISOString() })
        .eq('id', existing.id);
    } else {
      await supabase.from('instagram_config').insert(config);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Instagram config error:', error);
    return NextResponse.json({ error: 'Error guardando configuración' }, { status: 500 });
  }
}

// POST - Send Instagram DM (manual from panel)
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const { senderId, message } = await request.json();

    if (!senderId || !message) {
      return NextResponse.json({ error: 'ID de destinatario y mensaje requeridos' }, { status: 400 });
    }

    // Try config token first, fallback to env
    const { data: config } = await supabase
      .from('instagram_config')
      .select('access_token')
      .single();

    const accessToken = config?.access_token || process.env.INSTAGRAM_ACCESS_TOKEN || process.env.WHATSAPP_ACCESS_TOKEN;
    let sent = false;

    if (accessToken) {
      try {
        // Resolve the correct IGSID (webhook IDs are truncated)
        const resolvedId = await resolveIGSID(senderId, accessToken);
        const igRes = await fetch(
          `https://graph.instagram.com/v21.0/me/messages`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              recipient: { id: resolvedId },
              message: { text: message },
            }),
          }
        );
        sent = igRes.ok;
        if (!igRes.ok) {
          const err = await igRes.json();
          console.error('Instagram API error:', err, 'resolvedId:', resolvedId);
        }
      } catch (e) {
        console.error('Instagram API send error:', e);
      }
    }

    await supabase.from('instagram_messages').insert({
      sender_id: senderId,
      direction: 'outbound',
      content: message,
      status: sent ? 'sent' : 'pending',
      is_bot: false,
    });

    return NextResponse.json({
      success: true,
      sent,
      note: sent ? 'Mensaje enviado por Instagram' : 'Mensaje registrado. Configura la API de Instagram para envío real.',
    });
  } catch (error) {
    console.error('Send Instagram error:', error);
    return NextResponse.json({ error: 'Error enviando mensaje' }, { status: 500 });
  }
}
