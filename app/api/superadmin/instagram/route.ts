import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(url, key);
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
