import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(url, key);
}

// GET - WhatsApp messages & config
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

    if (phone) {
      // Get conversation with specific phone
      const { data: messages } = await supabase
        .from('whatsapp_messages')
        .select('*')
        .eq('phone_number', phone)
        .order('created_at', { ascending: true })
        .limit(100);

      return NextResponse.json({ config, messages: messages || [] });
    }

    // Get all conversations (grouped by phone)
    const { data: allMessages } = await supabase
      .from('whatsapp_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500);

    // Group by phone number
    const conversations: Record<string, {
      phone: string;
      name: string;
      lastMessage: string;
      lastTime: string;
      unread: number;
      totalMessages: number;
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
        };
      }
      conversations[msg.phone_number].totalMessages++;
      if (msg.direction === 'inbound' && msg.status !== 'read') {
        conversations[msg.phone_number].unread++;
      }
    });

    // Stats
    const stats = {
      totalConversations: Object.keys(conversations).length,
      totalMessages: allMessages?.length || 0,
      botMessages: allMessages?.filter((m: any) => m.is_bot).length || 0,
      humanMessages: allMessages?.filter((m: any) => !m.is_bot && m.direction === 'outbound').length || 0,
    };

    return NextResponse.json({
      config,
      conversations: Object.values(conversations).sort((a, b) => 
        new Date(b.lastTime).getTime() - new Date(a.lastTime).getTime()
      ),
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
