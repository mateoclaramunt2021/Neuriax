import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const INSTAGRAM_SYSTEM_PROMPT = `Eres Neuri, del equipo de Neuriax. Contestas DMs de Instagram como una persona real — rápido, corto, natural.

CÓMO ESCRIBES:
- Mensajes de 1-2 líneas máximo. Esto es un DM, no un email.
- Escribe como habla la gente por insta: sin mayúsculas innecesarias, sin puntuaciones perfectas, a veces empiezas sin mayúscula
- Usa "jaja", "buah", "uff", "ostia", "mola", "guay" cuando encaje
- Un emoji máximo por mensaje, y no siempre
- Nada de listas, bullets ni párrafos
- Cero lenguaje corporativo. Nada de "le informo", "estimado", "sin duda alguna", "no dude en"
- NO suenes como chatgpt. Nada de "¡Genial!", "¡Excelente pregunta!", "¡Por supuesto!", "con gusto"
- Varía cómo empiezas los mensajes. No repitas la misma estructura

EJEMPLOS DE CÓMO DEBES SONAR:
- "ey qué tal! en qué andas?"
- "ah mola, y ahora mismo tenéis web o vais a pelo?"
- "jaja sí eso pasa mucho, la gente busca y si no te encuentra online pues nada"
- "mira te dejo esto y lo veis tranquilos 👇 neuriax.com/contacto/formulario"
- "depende un poco del proyecto pero por darte una idea entre 790-3000 aprox"
- "qué tipo de negocio es?"

EJEMPLOS DE CÓMO NO DEBES SONAR (PROHIBIDO):
- "¡Hola! 😊 Muchas gracias por contactarnos. ¿En qué podemos ayudarte hoy?"
- "¡Excelente! Estaremos encantados de ayudarte con eso."
- "Sin duda, te comento: en Neuriax ofrecemos soluciones de IA..."
- "¡Perfecto! Te invito a rellenar nuestro formulario para agendar una llamada personalizada"

TU OBJETIVO:
Que el lead acabe rellenando el formulario: https://www.neuriax.com/contacto/formulario
Pero no lo sueltes de primeras. Primero pregunta qué hace, qué necesita, cómo le va. Cuando veas que hay interés real (3-4 mensajes), suelta el link de forma casual tipo "mira rellena esto rápido y mateo te monta algo → neuriax.com/contacto/formulario"

FLUJO NATURAL:
1. Pregunta qué hace / de qué va su negocio
2. Muestra curiosidad real, haz alguna pregunta de seguimiento
3. Cuando tenga sentido, menciona que hacéis cosas parecidas
4. Suelta el link del formulario como algo casual, no como un pitch

SI PREGUNTA PRECIOS:
- Webs: "pues mira depende bastante pero tira entre 790 y 3000 aprox"
- Chatbots: "eso suele ir por 200-500 depende de lo que necesites"
- "pero vamos para darte un precio real lo mejor es que rellenes el form y mateo te dice exacto"

SI DICE QUE ES CARO: "ya te entiendo, pero piensa en los clientes que pierdes sin tenerlo"
SI DICE "YA LO MIRO": "guay te lo dejo por aquí → neuriax.com/contacto/formulario"
SI NO CONTESTA: cuando vuelva a escribir sigue la conversación normal, sin reprochar

DATOS:
- Mateo = fundador de Neuriax, agencia de IA en España
- Hacemos webs, chatbots con IA, automatización
- Form: https://www.neuriax.com/contacto/formulario

PROHIBIDO:
- Decir que eres IA/bot/chatgpt — eres "del equipo de neuriax"
- Mensajes largos (más de 2 líneas = MAL)
- Inventar casos con nombres reales
- Dar precios cerrados
- Usar Calendly
- Sonar como un asistente virtual`;

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
  if (!apiKey) return 'ey! ahora mismo mateo no está disponible pero si rellenas esto te contesta rápido → neuriax.com/contacto/formulario';

  const systemPrompt = isFirstMessage
    ? INSTAGRAM_SYSTEM_PROMPT + '\n\nEste es su primer mensaje. Saluda corto y natural tipo "ey qué tal!" y pregunta algo sobre su negocio. NO hagas bienvenida formal.'
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
        max_tokens: 120,
        temperature: 0.8,
      }),
    });

    if (!response.ok) throw new Error('Groq error');
    const data = await response.json();
    return data.choices[0]?.message?.content || 'ey! escríbenos a hola@neuriax.com';
  } catch {
    return 'uy perdona, algo ha fallado por aquí jaja escríbenos a hola@neuriax.com';
  }
}

// ─── IGSID Resolution ───
// Instagram webhook sends truncated sender IDs (15 digits) that differ from
// the full API participant IDs (16 digits). We resolve the correct ID via
// the Conversations API and cache it.
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
          // The full API ID starts with the webhook's truncated ID
          if (p.id.startsWith(webhookSenderId)) {
            igsidCache[webhookSenderId] = p.id;
            console.log(`IGSID resolved: ${webhookSenderId} → ${p.id} (@${p.username})`);
            return p.id;
          }
        }
      }
    }
  } catch (error) {
    console.error('IGSID resolution error:', error);
  }

  // Fallback: try appending digits 0-9 and sending until one works
  console.warn(`IGSID: no match found for ${webhookSenderId}, trying brute-force`);
  for (let d = 0; d <= 9; d++) {
    const candidate = webhookSenderId + d;
    try {
      const testRes = await fetch(
        `https://graph.instagram.com/v21.0/me/messages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            recipient: { id: candidate },
            message: { text: '.' }, // minimal test — will be followed by real message
          }),
        }
      );
      if (testRes.ok) {
        igsidCache[webhookSenderId] = candidate;
        console.log(`IGSID brute-force: ${webhookSenderId} → ${candidate}`);
        return candidate;
      }
    } catch { /* continue */ }
  }

  return webhookSenderId; // absolute fallback
}

async function sendInstagramMessage(recipientId: string, message: string, accessToken: string) {
  // Log every step to Supabase so we can see the EXACT error in production
  const debugLog: string[] = [];
  const supabaseForLog = getSupabase();

  debugLog.push(`START: recipientId=${recipientId}, hasToken=${!!accessToken}, tokenLen=${accessToken?.length || 0}`);

  if (!accessToken) {
    debugLog.push('FAIL: no access token');
    await supabaseForLog.from('instagram_token_log').insert({ action: 'send_debug', details: JSON.stringify(debugLog) });
    return false;
  }

  // Resolve the correct IGSID (webhook IDs are truncated)
  let resolvedId = recipientId;
  try {
    resolvedId = await resolveIGSID(recipientId, accessToken);
    debugLog.push(`IGSID resolved: ${recipientId} -> ${resolvedId}`);
  } catch (e) {
    debugLog.push(`IGSID error: ${e}`);
  }

  try {
    const url = `https://graph.instagram.com/v21.0/me/messages`;
    const body = JSON.stringify({
      recipient: { id: resolvedId },
      message: { text: message },
    });
    debugLog.push(`FETCH: ${url} body=${body.substring(0, 200)}`);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body,
    });

    debugLog.push(`RESPONSE: status=${response.status}`);

    if (!response.ok) {
      const errText = await response.text();
      debugLog.push(`ERROR_BODY: ${errText}`);
      await supabaseForLog.from('instagram_token_log').insert({ action: 'send_debug', details: JSON.stringify(debugLog) });
      return false;
    }

    const okData = await response.json();
    debugLog.push(`SUCCESS: ${JSON.stringify(okData)}`);
    await supabaseForLog.from('instagram_token_log').insert({ action: 'send_debug', details: JSON.stringify(debugLog) });
    return true;
  } catch (error) {
    debugLog.push(`EXCEPTION: ${error instanceof Error ? error.message + ' ' + error.stack : String(error)}`);
    await supabaseForLog.from('instagram_token_log').insert({ action: 'send_debug', details: JSON.stringify(debugLog) });
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
              replyMsg = '📅 ¡Genial! Rellena el formulario (2 min) y Mateo te prepara una propuesta personalizada gratis:\nhttps://www.neuriax.com/contacto/formulario';
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

        // ─── Check if this sender is a cold lead who responded ───
        try {
          const { data: coldLead } = await supabase
            .from('instagram_cold_leads')
            .select('id, status, sector')
            .eq('instagram_user_id', senderId)
            .in('status', ['contacted', 'dm_failed'])
            .single();

          if (coldLead) {
            // Cold lead responded! Update status
            await supabase
              .from('instagram_cold_leads')
              .update({
                status: 'responded',
                responded: true,
                responded_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              })
              .eq('id', coldLead.id);

            // Update label to interesado
            await supabase
              .from('instagram_followers')
              .upsert({
                instagram_user_id: senderId,
                label: 'interesado',
              }, { onConflict: 'instagram_user_id' });

            console.log(`Cold lead ${senderId} responded! Sector: ${coldLead.sector}`);
          }
        } catch {
          // Table might not exist yet, skip silently
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
