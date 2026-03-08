import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const INSTAGRAM_SYSTEM_PROMPT = `Eres Neuri, el asistente virtual de Neuriax por Instagram. Tu objetivo es AYUDAR al cliente, resolver dudas y generar leads.

## TU ROL
1. Resolver dudas sobre servicios, precios, tiempos
2. Ser cercano, joven y profesional (es Instagram, tono más casual)
3. Si el cliente muestra interés → invitarle a agendar llamada
4. NUNCA presionar
5. Si es la PRIMERA vez que alguien te escribe, da la bienvenida de forma cálida

## SERVICIOS Y PRECIOS

**WEBS:**
- Web básica: desde 790€ (10-15 días) - dominio + hosting 1 año incluido
- Web con reservas: desde 990€
- E-commerce: desde 1.500€
- Extras: Multiidioma +200€, Blog +150€

**AUTOMATIZACIÓN & IA:**
- Chatbot WhatsApp IA: desde 300€
- Chatbot web IA: desde 200€
- Automatización de leads: desde 500€
- Proyecto completo CRM+IA: desde 1.500€

**TIEMPOS:**
- Web básica: 10-15 días
- Chatbot: 1 semana
- Automatización: 2-4 semanas

**GARANTÍAS:**
- 30 días de garantía en webs
- Revisiones ilimitadas
- Soporte incluido primer mes

## ESTILO
1. Respuestas cortas (2-4 líneas) - es DM de Instagram
2. Tono casual pero profesional
3. Emojis moderados (1-2 por mensaje)
4. Si preguntan algo muy técnico → "Te lo explica mejor Mateo en una llamada gratuita 📞 https://calendly.com/neuriax/30min"

## AGENDAR LLAMADA
Si el cliente quiere más info o está interesado:
"¡Genial! Puedes agendar una llamada gratuita de 15 min con Mateo aquí: https://calendly.com/neuriax/30min 📅"

## DATOS
- Mateo, fundador de Neuriax (España)
- Web: neuriax.com
- Email: hola@neuriax.com

## PROHIBIDO
- NO digas que eres IA/ChatGPT (di que eres "el asistente de Neuriax")
- NO inventes datos
- NO seas agresivo con la venta`;

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(url, key);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getAccessToken(supabase: any) {
  // Try config first (auto-refreshed tokens), then fallback to env
  const { data: config } = await supabase
    .from('instagram_config')
    .select('access_token')
    .single();
  return (config as any)?.access_token || process.env.INSTAGRAM_ACCESS_TOKEN || process.env.WHATSAPP_ACCESS_TOKEN;
}

async function getAIResponse(userMessage: string, history: Array<{role: string; content: string}>, isFirstMessage: boolean) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return '¡Hola! Gracias por escribirnos 😊 Mateo te responderá pronto. Si quieres, agenda una llamada: https://calendly.com/neuriax/30min';

  const systemPrompt = isFirstMessage
    ? INSTAGRAM_SYSTEM_PROMPT + '\n\n## CONTEXTO ESPECIAL\nEste es el PRIMER mensaje de este usuario. Dale una bienvenida cálida y preguntale en qué le puedes ayudar.'
    : INSTAGRAM_SYSTEM_PROMPT;

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
          { role: 'system', content: systemPrompt },
          ...history.slice(-10),
          { role: 'user', content: userMessage },
        ],
        max_tokens: 300,
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

async function sendInstagramMessage(recipientId: string, message: string, accessToken: string) {
  const igAccountId = process.env.INSTAGRAM_ACCOUNT_ID;

  if (!accessToken || !igAccountId) {
    console.error('Instagram credentials not configured');
    return false;
  }

  try {
    const response = await fetch(
      `https://graph.instagram.com/v21.0/${igAccountId}/messages`,
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function recordSenderProfile(supabase: any, senderId: string, accessToken: string) {
  // Check if we already have this user
  const { data: existing } = await supabase
    .from('instagram_followers')
    .select('id')
    .eq('instagram_user_id', senderId)
    .single();

  if (!existing) {
    // Try to get profile info
    let username = senderId;
    try {
      const res = await fetch(
        `https://graph.instagram.com/v21.0/${senderId}?fields=name,username&access_token=${accessToken}`
      );
      if (res.ok) {
        const profile = await res.json();
        username = profile.username || profile.name || senderId;
      }
    } catch { /* ignore */ }

    await supabase.from('instagram_followers').insert({
      instagram_user_id: senderId,
      username: username,
      welcome_sent: true, // They initiated, so we consider them welcomed
      welcome_sent_at: new Date().toISOString(),
    });
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

// POST - Receive DMs, Story Mentions, Comments
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = getSupabase();
    const accessToken = await getAccessToken(supabase);

    const entries = body.entry || [];
    for (const entry of entries) {
      // Handle DMs (messaging events)
      const messaging = entry.messaging || [];
      for (const event of messaging) {
        // Handle story mentions
        if (event.message?.attachments?.[0]?.type === 'story_mention') {
          const senderId = event.sender?.id;
          if (senderId && accessToken) {
            const thankYouMsg = '¡Gracias por mencionarnos en tu story! 💜🙏 ¿Necesitas algo? Estoy aquí para ayudarte 😊';
            const sent = await sendInstagramMessage(senderId, thankYouMsg, accessToken);
            
            await supabase.from('instagram_messages').insert({
              sender_id: senderId,
              direction: 'inbound',
              content: '[📷 Story Mention]',
              status: 'received',
              is_bot: false,
              message_type: 'story_mention',
            });
            
            await supabase.from('instagram_messages').insert({
              sender_id: senderId,
              direction: 'outbound',
              content: thankYouMsg,
              status: sent ? 'sent' : 'failed',
              is_bot: true,
              message_type: 'story_reply',
            });
          }
          continue;
        }

        // Handle postback (button clicks)
        if (event.postback) {
          const senderId = event.sender?.id;
          const payload = event.postback.payload;
          if (senderId && accessToken) {
            let replyMsg = '¡Gracias! ¿En qué puedo ayudarte?';
            if (payload === 'GET_PRICES') {
              replyMsg = '💰 Nuestros precios:\n\n🌐 Web básica: desde 790€\n🛒 E-commerce: desde 1.500€\n🤖 Chatbot IA: desde 200€\n⚡ Automatización: desde 500€\n\n¿Te interesa alguno?';
            } else if (payload === 'SCHEDULE_CALL') {
              replyMsg = '📅 ¡Genial! Agenda una llamada gratuita de 15 min con Mateo:\nhttps://calendly.com/neuriax/30min';
            } else if (payload === 'VIEW_PORTFOLIO') {
              replyMsg = '🎨 Mira nuestro portfolio en:\nhttps://www.neuriax.com/webs\n\n¿Quieres algo similar?';
            }
            
            const sent = await sendInstagramMessage(senderId, replyMsg, accessToken);
            
            await supabase.from('instagram_messages').insert({
              sender_id: senderId,
              direction: 'outbound',
              content: replyMsg,
              status: sent ? 'sent' : 'failed',
              is_bot: true,
              message_type: 'postback_reply',
            });
          }
          continue;
        }

        // Regular DMs - only process text messages (not echoes)
        if (!event.message || event.message.is_echo) continue;

        const senderId = event.sender?.id;
        const messageText = event.message?.text || '';
        const attachments = event.message?.attachments;

        if (!senderId) continue;

        // Handle image/media messages
        if (!messageText && attachments) {
          await supabase.from('instagram_messages').insert({
            sender_id: senderId,
            direction: 'inbound',
            content: `[📎 ${attachments[0]?.type || 'media'}]`,
            status: 'received',
            is_bot: false,
            message_type: 'media',
          });

          if (accessToken) {
            const mediaReply = '¡Gracias por compartir! 😊 Si necesitas ayuda con algo, escríbeme y te respondo al momento.';
            const sent = await sendInstagramMessage(senderId, mediaReply, accessToken);
            await supabase.from('instagram_messages').insert({
              sender_id: senderId,
              direction: 'outbound',
              content: mediaReply,
              status: sent ? 'sent' : 'failed',
              is_bot: true,
            });
          }
          continue;
        }

        if (!messageText) continue;

        // Record sender profile (non-blocking)
        if (accessToken) {
          recordSenderProfile(supabase, senderId, accessToken).catch(() => {});
        }

        // Check if this is the first message from this user
        const { count: previousMessages } = await supabase
          .from('instagram_messages')
          .select('id', { count: 'exact', head: true })
          .eq('sender_id', senderId)
          .eq('direction', 'inbound');

        const isFirstMessage = (previousMessages || 0) === 0;

        // Save inbound message
        await supabase.from('instagram_messages').insert({
          sender_id: senderId,
          direction: 'inbound',
          content: messageText,
          status: 'received',
          is_bot: false,
          message_type: isFirstMessage ? 'first_contact' : 'message',
        });

        // Update sender name if available
        if (event.sender?.username || event.sender?.name) {
          await supabase
            .from('instagram_messages')
            .update({ sender_name: event.sender.username || event.sender.name })
            .eq('sender_id', senderId)
            .is('sender_name', null);
        }

        // Check if bot is enabled
        const { data: config } = await supabase
          .from('instagram_config')
          .select('*')
          .limit(1)
          .single();

        const botEnabled = config?.bot_enabled !== false;

        if (botEnabled && accessToken) {
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

          // Get AI response (with first-message context)
          const aiResponse = await getAIResponse(messageText, conversationHistory, isFirstMessage);

          // Send response
          const sent = await sendInstagramMessage(senderId, aiResponse, accessToken);

          // Save outbound message
          await supabase.from('instagram_messages').insert({
            sender_id: senderId,
            direction: 'outbound',
            content: aiResponse,
            status: sent ? 'sent' : 'failed',
            is_bot: true,
          });

          // Auto-label first contacts as 'lead'
          if (isFirstMessage) {
            await supabase
              .from('instagram_followers')
              .update({ label: 'lead' })
              .eq('instagram_user_id', senderId);
          }
        }
      }

      // Handle comment events (changes field)
      const changes = entry.changes || [];
      for (const change of changes) {
        if (change.field === 'comments' && change.value) {
          const comment = change.value;
          await supabase.from('instagram_messages').insert({
            sender_id: comment.from?.id || 'unknown',
            sender_name: comment.from?.username,
            direction: 'inbound',
            content: `[💬 Comentario] ${comment.text || ''}`,
            status: 'received',
            is_bot: false,
            message_type: 'comment',
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
