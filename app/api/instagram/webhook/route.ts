import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const INSTAGRAM_SYSTEM_PROMPT = `Eres Neuri, el asistente virtual de Neuriax por Instagram. Tu objetivo es AYUDAR al cliente, resolver dudas y generar leads.

## TU ROL
1. Resolver dudas sobre servicios, precios, tiempos
2. Ser cercano, joven y profesional (es Instagram, tono más casual)
3. Si el cliente muestra interés → invitarle a agendar llamada
4. NUNCA presionar

## SERVICIOS Y PRECIOS

**WEBS:**
- Web básica: desde 790€ (10-15 días)
- Web con reservas: desde 990€
- E-commerce: desde 1.500€

**AUTOMATIZACIÓN & IA:**
- Chatbot WhatsApp IA: desde 300€
- Chatbot web IA: desde 200€
- Automatización de leads: desde 500€

**TIEMPOS:**
- Web básica: 10-15 días
- Chatbot: 1 semana
- Automatización: 2-4 semanas

## ESTILO
1. Respuestas cortas (2-4 líneas) - es DM de Instagram
2. Tono casual pero profesional
3. Emojis moderados
4. Si preguntan algo muy técnico → "Te lo explica mejor Mateo en una llamada gratuita 📞 https://calendly.com/neuriax/30min"

## DATOS
- Mateo, fundador de Neuriax
- Web: neuriax.com
- Email: hola@neuriax.com

## PROHIBIDO
- NO digas que eres IA/ChatGPT
- NO inventes datos`;

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(url, key);
}

async function getAIResponse(userMessage: string, history: Array<{role: string; content: string}>) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return '¡Hola! Gracias por escribirnos 😊 Mateo te responderá pronto. Si quieres, agenda una llamada: https://calendly.com/neuriax/30min';

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
          { role: 'system', content: INSTAGRAM_SYSTEM_PROMPT },
          ...history.slice(-10),
          { role: 'user', content: userMessage },
        ],
        max_tokens: 250,
        temperature: 0.7,
      }),
    });

    if (!response.ok) throw new Error('Groq error');
    const data = await response.json();
    return data.choices[0]?.message?.content || '¡Hola! Escríbenos a hola@neuriax.com 😊';
  } catch {
    return '¡Hola! Tenemos un problemilla técnico. Escríbenos a hola@neuriax.com o agenda llamada: https://calendly.com/neuriax/30min';
  }
}

async function sendInstagramMessage(recipientId: string, message: string) {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN || process.env.WHATSAPP_ACCESS_TOKEN;
  const igAccountId = process.env.INSTAGRAM_ACCOUNT_ID;

  if (!accessToken || !igAccountId) {
    console.error('Instagram credentials not configured');
    return false;
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${igAccountId}/messages`,
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
      console.error('Instagram send error:', err);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Instagram send error:', error);
    return false;
  }
}

// GET - Webhook verification
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'neuriax-webhook-2026';

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Instagram webhook verified');
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

// POST - Receive DMs
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = getSupabase();

    const entries = body.entry || [];
    for (const entry of entries) {
      const messaging = entry.messaging || [];
      
      for (const event of messaging) {
        // Only process text messages (not echoes)
        if (!event.message || event.message.is_echo) continue;

        const senderId = event.sender?.id;
        const messageText = event.message?.text || '';

        if (!senderId || !messageText) continue;

        // Save inbound message
        await supabase.from('instagram_messages').insert({
          sender_id: senderId,
          direction: 'inbound',
          content: messageText,
          status: 'received',
          is_bot: false,
        });

        // Check if bot is enabled
        const { data: config } = await supabase
          .from('instagram_config')
          .select('*')
          .limit(1)
          .single();

        const botEnabled = config?.bot_enabled !== false;

        if (botEnabled) {
          // Get conversation history
          const { data: history } = await supabase
            .from('instagram_messages')
            .select('direction, content')
            .eq('sender_id', senderId)
            .order('created_at', { ascending: true })
            .limit(20);

          const conversationHistory = (history || []).map((m: { direction: string; content: string }) => ({
            role: m.direction === 'inbound' ? 'user' : 'assistant',
            content: m.content,
          }));

          // Get AI response
          const aiResponse = await getAIResponse(messageText, conversationHistory);

          // Send response
          const sent = await sendInstagramMessage(senderId, aiResponse);

          // Save outbound message
          await supabase.from('instagram_messages').insert({
            sender_id: senderId,
            direction: 'outbound',
            content: aiResponse,
            status: sent ? 'sent' : 'failed',
            is_bot: true,
          });
        }
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Instagram webhook error:', error);
    return NextResponse.json({ status: 'ok' });
  }
}
