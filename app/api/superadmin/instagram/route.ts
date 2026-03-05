import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(url, key);
}

// GET - Instagram config, conversations & stats
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const { searchParams } = new URL(request.url);
    const senderId = searchParams.get('sender');

    // Get config
    const { data: config } = await supabase
      .from('instagram_config')
      .select('*')
      .single();

    if (senderId) {
      // Get conversation with specific sender
      const { data: messages } = await supabase
        .from('instagram_messages')
        .select('*')
        .eq('sender_id', senderId)
        .order('created_at', { ascending: true })
        .limit(100);

      return NextResponse.json({ config, messages: messages || [] });
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
        };
      }
      conversations[key].totalMessages++;
      if (msg.direction === 'inbound' && msg.status !== 'read') {
        conversations[key].unread++;
      }
    });

    const stats = {
      totalConversations: Object.keys(conversations).length,
      totalMessages: allMessages?.length || 0,
      botMessages: allMessages?.filter((m: any) => m.is_bot).length || 0,
      humanMessages: allMessages?.filter((m: any) => !m.is_bot && m.direction === 'outbound').length || 0,
    };

    return NextResponse.json({
      config: config || {
        bot_enabled: false,
        auto_reply_enabled: false,
        auto_reply_message: 'Hola! Gracias por escribirnos. Te responderemos pronto.',
      },
      connected: !!(config?.access_token || process.env.INSTAGRAM_ACCESS_TOKEN),
      conversations: Object.values(conversations).sort((a, b) =>
        new Date(b.lastTime).getTime() - new Date(a.lastTime).getTime()
      ),
      stats,
    });
  } catch (error) {
    console.error('Instagram API error:', error);
    return NextResponse.json({ error: 'Error cargando datos de Instagram' }, { status: 500 });
  }
}

// PUT - Update Instagram config
export async function PUT(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const config = await request.json();

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

    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN || process.env.WHATSAPP_ACCESS_TOKEN;
    const igAccountId = process.env.INSTAGRAM_ACCOUNT_ID;
    let sent = false;

    if (accessToken && igAccountId) {
      try {
        const igRes = await fetch(
          `https://graph.facebook.com/v21.0/${igAccountId}/messages`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              recipient: { id: senderId },
              message: { text: message },
            }),
          }
        );
        sent = igRes.ok;
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
