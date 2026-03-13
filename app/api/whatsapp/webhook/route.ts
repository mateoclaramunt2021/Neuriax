import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const WHATSAPP_SYSTEM_PROMPT = `Eres Neuri, el asistente virtual de Neuriax por WhatsApp. Tu objetivo es AYUDAR al cliente, resolver dudas y generar leads.

## TU ROL
1. Resolver dudas sobre servicios y qué hacemos
2. Ser cercano y profesional
3. Si el cliente muestra interés → invitarle a agendar llamada con Mateo
4. NUNCA presionar, solo ayudar

## SERVICIOS (lo que hacemos)
- Webs profesionales (landing pages, e-commerce, webs con reservas)
- Chatbots con IA (WhatsApp, web)
- Automatización de procesos y leads
- Estrategia digital y presencia online

## NUNCA DAR PRECIOS
- JAMÁS des cifras, rangos, ni aproximaciones de precio
- Si preguntan por precio, siempre redirige: "depende mucho del proyecto! lo mejor es que hables con Mateo en una llamada gratuita de 15 min → calendly.com/neuriax/30min 📅"
- NUNCA digas "desde X€", "a partir de", ni ningún número
- Cada proyecto es diferente y se presupuesta a medida

## ESTILO
1. Respuestas cortas (2-5 líneas)
2. Usa "tú", sé amable y directo
3. Usa emojis con moderación (1-2 por mensaje)
4. Si no sabes algo → "Eso te lo puede explicar mejor Mateo en una llamada gratuita de 15 min"

## AGENDAR LLAMADA
Si el cliente quiere más info o está interesado:
"¡Genial! Puedes agendar una llamada gratuita de 15 min con Mateo aquí: https://calendly.com/neuriax/30min 📅"

## DATOS EMPRESA
- Mateo, fundador de Neuriax (España)
- Web: neuriax.com
- Email: hola@neuriax.com

## PROHIBIDO
- NO digas que eres ChatGPT/OpenAI/IA (di que eres "el asistente de Neuriax")
- NO inventes datos
- NO seas agresivo con la venta
- NO des NINGÚN precio, cifra, rango ni aproximación — JAMÁS`;

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(url, key);
}

async function getAIResponse(userMessage: string, conversationHistory: Array<{role: string; content: string}>) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return '¡Hola! Gracias por escribirnos. Mateo te responderá pronto. Si quieres, puedes agendar una llamada: https://calendly.com/neuriax/30min';

  const messages = [
    { role: 'system', content: WHATSAPP_SYSTEM_PROMPT },
    ...conversationHistory.slice(-10), // Last 10 messages for context
    { role: 'user', content: userMessage },
  ];

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) throw new Error('Groq API error');
    const data = await response.json();
    return data.choices[0]?.message?.content || 'Disculpa, no pude procesar tu mensaje. ¿Puedes repetirlo?';
  } catch {
    return '¡Hola! Tenemos un pequeño problema técnico. Puedes escribir a hola@neuriax.com o agendar una llamada: https://calendly.com/neuriax/30min';
  }
}

async function sendWhatsAppMessage(to: string, message: string) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

  if (!phoneNumberId || !accessToken) {
    console.error('WhatsApp credentials not configured');
    return false;
  }

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

    if (!response.ok) {
      const err = await response.json();
      console.error('WhatsApp send error:', err);
      return false;
    }
    return true;
  } catch (error) {
    console.error('WhatsApp send error:', error);
    return false;
  }
}

// GET - Webhook verification (Meta requires this)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'neuriax-webhook-2026';

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('WhatsApp webhook verified');
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

// POST - Receive messages
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = getSupabase();

    // Process each entry
    const entries = body.entry || [];
    for (const entry of entries) {
      const changes = entry.changes || [];
      for (const change of changes) {
        if (change.field !== 'messages') continue;

        const value = change.value;
        const messages = value.messages || [];

        for (const message of messages) {
          const from = message.from; // Phone number
          const contactName = value.contacts?.[0]?.profile?.name || 'Desconocido';
          const messageText = message.text?.body || '';
          const messageType = message.type || 'text';

          // Only process text messages
          if (messageType !== 'text' || !messageText) continue;

          // Save inbound message
          await supabase.from('whatsapp_messages').insert({
            phone_number: from,
            contact_name: contactName,
            direction: 'inbound',
            message_type: 'text',
            content: messageText,
            status: 'received',
            is_bot: false,
          });

          // Check if bot is enabled
          const { data: config } = await supabase
            .from('whatsapp_config')
            .select('*')
            .limit(1)
            .single();

          const botEnabled = config?.bot_enabled !== false;

          if (botEnabled) {
            // Get conversation history for context
            const { data: history } = await supabase
              .from('whatsapp_messages')
              .select('direction, content')
              .eq('phone_number', from)
              .order('created_at', { ascending: true })
              .limit(20);

            const conversationHistory = (history || []).map((m: { direction: string; content: string }) => ({
              role: m.direction === 'inbound' ? 'user' : 'assistant',
              content: m.content,
            }));

            // Get AI response
            const aiResponse = await getAIResponse(messageText, conversationHistory);

            // Send response via WhatsApp
            const sent = await sendWhatsAppMessage(from, aiResponse);

            // Save outbound message
            await supabase.from('whatsapp_messages').insert({
              phone_number: from,
              contact_name: contactName,
              direction: 'outbound',
              message_type: 'text',
              content: aiResponse,
              status: sent ? 'sent' : 'failed',
              is_bot: true,
            });

            // Auto-create CRM lead if new contact
            const { data: existingContact } = await supabase
              .from('contact_forms')
              .select('id')
              .eq('telefono', from)
              .limit(1)
              .single();

            if (!existingContact) {
              const { data: newContact } = await supabase
                .from('contact_forms')
                .insert({
                  nombre: contactName,
                  email: `wa_${from}@whatsapp.local`,
                  telefono: from,
                  mensaje: `[WhatsApp] ${messageText}`,
                })
                .select('id')
                .single();

              if (newContact) {
                await supabase.from('client_status').insert({
                  contact_id: newContact.id,
                  status: 'nuevo',
                  source: 'whatsapp',
                  priority: 'normal',
                });
              }
            }
          }
        }
      }
    }

    // Always return 200 to Meta
    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    return NextResponse.json({ status: 'ok' });
  }
}
