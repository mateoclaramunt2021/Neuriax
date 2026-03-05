import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(url, key);
}

// Send a manual message from the SuperAdmin panel
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const { to, message } = await request.json();

    if (!to || !message) {
      return NextResponse.json({ error: 'Missing to or message' }, { status: 400 });
    }

    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

    if (!phoneNumberId || !accessToken) {
      return NextResponse.json({ error: 'WhatsApp no configurado' }, { status: 500 });
    }

    // Send via WhatsApp API
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

    const result = await response.json();

    if (!response.ok) {
      console.error('WhatsApp send error:', result);
      return NextResponse.json({ error: 'Error enviando mensaje', details: result }, { status: 500 });
    }

    // Save to database
    await supabase.from('whatsapp_messages').insert({
      phone_number: to,
      direction: 'outbound',
      message_type: 'text',
      content: message,
      status: 'sent',
      is_bot: false, // Manual message from admin
    });

    return NextResponse.json({ success: true, messageId: result.messages?.[0]?.id });
  } catch (error) {
    console.error('WhatsApp send error:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
