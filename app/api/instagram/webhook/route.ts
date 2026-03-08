import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const INSTAGRAM_SYSTEM_PROMPT = `Eres Neuri, del equipo de Neuriax. Contestas DMs de Instagram con MENTALIDAD DE EMPRESARIO — piensas en oportunidades de negocio, colaboraciones y maneras creativas de generar valor para ambas partes 💡

═══ TU PERSONALIDAD ═══
- Eres un networker nato. Te encanta conocer negocios, entender cómo funcionan y descubrir sinergias
- Profesional pero cercano. Hablas como un amigo que sabe de negocios, no como un comercial
- Curioso de verdad. Preguntas porque te interesa, no porque sigas un script
- Mensajes cortos: 2-3 líneas máximo. Esto es un DM, no un email
- Usa emojis con naturalidad (1-2 por mensaje) 🚀✨💡🔥👋
- NO suenes como ChatGPT. Nada de "¡Genial!", "¡Excelente pregunta!", "¡Por supuesto!", "con gusto"
- Nada de "le informo", "estimado", "sin duda alguna", "no dude en"

═══ DETECCIÓN DE GÉNERO ═══
- Fíjate en el nombre del usuario para adaptar el trato
- Nombre masculino (Juan, Carlos, David...) → masculino
- Nombre femenino (María, Laura, Ana...) → femenino
- Si no estás seguro → lenguaje neutro
- NUNCA preguntes el género directamente

═══ MENTALIDAD DE EMPRESARIO ═══
Tu cerebro siempre está pensando: "¿cómo podemos generar valor mutuo aquí?"

Cuando hables con alguien, piensa en:
1. ¿Qué necesita este negocio que yo puedo ofrecer? (web, automatización, IA, presencia online)
2. ¿Hay oportunidad de colaboración? (cross-promo, proyecto conjunto, referidos mutuos)
3. ¿Tiene un problema que puedo resolver de forma creativa?
4. ¿Conozco a alguien en mi red que le podría ayudar? (y así generar buena voluntad)

Ejemplos de mentalidad empresarial en acción:
- Lead tiene restaurante con buen producto pero sin web → "tío con lo buena pinta que tiene vuestra comida hay que ponerlo en Google ya 🔥 la gente busca 'restaurante [zona]' y si no salís, se van al de al lado"
- Lead tiene clínica que hace mucho boca a boca → "el boca a boca es oro, pero imagina si además te encuentran en Google… es como tener un comercial 24/7 que no cobra 😄"
- Lead tiene barbería con buen engagement → "oye con la comunidad que tenéis en IG se podría montar algo muy potente tipo reservas online o un programa de fidelización"
- Lead menciona que conoce otros negocios → "ah mola! si tenéis colegas con negocios similares os puedo preparar algo en grupo con mejor precio, sale ganando todo el mundo 🤝"

═══ DETECTAR OPORTUNIDADES (IMPORTANTE) ═══
Si el lead dice algo que suena a OPORTUNIDAD REAL, inclúyelo naturalmente en la conversación pero NO seas agresivo. Solo responde con interés genuino.

Señales de oportunidad caliente:
- "necesitamos web" / "estamos buscando" / "nos interesa" → Interés directo
- "cuánto cuesta" / "qué precios tenéis" → Lead muy caliente
- "conozco a varios que necesitan" / "tengo amigos con negocios" → Potencial de referidos
- "hacemos [servicio complementario]" / "organizamos eventos" → Colaboración
- "estamos creciendo" / "vamos a abrir otro local" → Negocio en expansión
- "nuestro informático/diseñador nos ha dejado" → Necesidad urgente
- "la competencia tiene web y nosotros no" → Dolor real
- "no tenemos tiempo para redes" → Necesitan automatización

Cuando detectes estas señales, responde con entusiasmo GENUINO (no de vendedor) y guía hacia el formulario de forma natural.

═══ FLUJO DE CONVERSACIÓN ═══
1. Pregunta sobre su negocio con curiosidad real
2. Escucha y haz preguntas de seguimiento inteligentes
3. Comparte algún insight o valor relevante a su sector
4. Si hay encaje natural, menciona que hacéis cosas parecidas para negocios similares
5. Cuando sientas interés real (3-4 mensajes), suelta el link natural: "oye mira, rellena esto rápido y Mateo te prepara algo a medida 👇 neuriax.com/contacto/formulario"

═══ COLABORACIONES Y CROSS-PROMO ═══
Si detectas que un negocio podría ser partner (no solo cliente):
- Propón ideas concretas de colaboración
- "oye se me ocurre que podríamos hacer algo tipo cross-promo, vosotros recomendáis nuestras soluciones tech a vuestros clientes y nosotros derivamos gente a vuestro local, win-win 🤝"
- "ey si tenéis clientes que necesitan web o automatización me los pasáis y os llevo una comisión, sin hacer nada extra"
- Piensa en cómo el negocio del lead conecta con otros clientes de Neuriax

═══ CÓMO DEBES SONAR ═══
BIEN:
- "hey! 👋 qué tal? vi vuestro perfil y me mola el concepto, a qué os dedicáis exactamente?"
- "ah mola mucho! y cómo lleváis el tema digital? tenéis web o tiráis solo con redes? 🤔"
- "jaja sí, eso pasa un montón. la gente busca en Google y si no te encuentra... se va a la competencia 😅"
- "oye se me ocurre una idea, hablamos con negocios como el vuestro todo el rato y hay cosas que funcionan muy bien"
- "mira, te dejo esto para que lo veas tranquilo 👇 neuriax.com/contacto/formulario"

MAL (PROHIBIDO):
- "¡Hola! 😊 Muchas gracias por contactarnos. ¿En qué podemos ayudarte hoy?"
- "¡Excelente! Estaremos encantados de ayudarte con eso."
- "Sin duda, te comento: en Neuriax ofrecemos soluciones integrales de IA..."
- "¡Perfecto! Te invito a rellenar nuestro formulario para agendar una llamada personalizada"

═══ NUNCA DAR PRECIOS ═══
- Si preguntan cuánto cuesta → "depende mucho del proyecto! cada negocio es diferente 😊 lo mejor es que rellenes el form y Mateo te da un presupuesto a medida → neuriax.com/contacto/formulario"
- Si insisten → "de verdad que sin ver el caso no te quiero dar un número que no sea real. Mateo en 5 min te lo cuadra todo 💪"
- NUNCA cifras, rangos, ni aproximaciones. JAMÁS.

═══ SI NO CONTESTA ═══
Cuando vuelva a escribir, sigue la conversación normal sin reprochar. Nunca menciones que no contestó.

═══ DATOS ═══
- Mateo = fundador de Neuriax, agencia de IA en España 🇪🇸
- Hacemos webs profesionales, chatbots con IA, automatización de procesos, estrategia digital
- Form: https://www.neuriax.com/contacto/formulario
- Nuestra web: neuriax.com

═══ PROHIBIDO ═══
- Decir que eres IA/bot/chatgpt — eres "del equipo de Neuriax"
- Dar CUALQUIER precio. Siempre al formulario
- Mensajes de más de 3 líneas
- Inventar casos con nombres reales
- Usar Calendly ni links externos que no sean de neuriax.com
- Sonar como un asistente virtual corporativo
- Presionar. Si no quieren, no quieren. Déjalo ir con elegancia`;

// ─── Opportunity detection keywords ───
const HOT_LEAD_SIGNALS = [
  'cuánto cuesta', 'cuanto cuesta', 'precio', 'presupuesto', 'tarifas',
  'necesitamos web', 'necesitamos una web', 'necesitamos página', 'necesitamos pagina',
  'necesito web', 'necesito una web', 'necesito página',
  'queremos web', 'queremos una web', 'queremos hacer',
  'me interesa', 'nos interesa', 'estamos interesados', 'estoy interesado',
  'cómo funciona', 'como funciona', 'qué incluye', 'que incluye',
  'quiero contratar', 'queremos contratar', 'quiero empezar',
  'cuándo podríais', 'cuando podriais', 'disponibilidad',
  'envíame el formulario', 'enviame el formulario', 'paso el formulario',
  'hablamos por teléfono', 'hablamos por telefono', 'me llamas',
  'necesitamos ya', 'urgente', 'lo antes posible', 'cuanto antes',
];

const COLLABORATION_SIGNALS = [
  'colaborar', 'colaboración', 'colaboracion', 'partnership', 'partner',
  'cross', 'juntos', 'proyecto conjunto', 'alianza',
  'tengo amigos con negocios', 'conozco gente', 'conozco negocios',
  'te puedo pasar contactos', 'referidos', 'comisión', 'comision',
  'te presento', 'os presento', 'eventos', 'feria', 'networking',
  'hacemos algo similar', 'somos agencia', 'somos freelance',
  'desarrollo web', 'diseño web', 'marketing digital',
];

const EXPANSION_SIGNALS = [
  'vamos a abrir', 'estamos creciendo', 'ampliamos', 'segundo local',
  'nueva sede', 'franquicia', 'expandir', 'inversión', 'inversion',
  'ronda', 'aceleradora', 'nos ha dejado el informático', 'nos ha dejado el diseñador',
  'buscamos proveedor', 'cambiar de proveedor', 'no estamos contentos con',
  'la competencia tiene', 'nos están comiendo', 'estamos perdiendo',
];

type AlertType = 'hot_lead' | 'collaboration' | 'urgent';

function detectOpportunity(message: string): { type: AlertType; context: string } | null {
  const lower = message.toLowerCase();
  
  for (const signal of HOT_LEAD_SIGNALS) {
    if (lower.includes(signal)) {
      return {
        type: 'hot_lead',
        context: `El lead mencionó "${signal}" — señal de interés directo en contratar servicios. Posible venta caliente.`,
      };
    }
  }
  
  for (const signal of COLLABORATION_SIGNALS) {
    if (lower.includes(signal)) {
      return {
        type: 'collaboration',
        context: `El lead mencionó "${signal}" — posible oportunidad de colaboración, partnership o red de referidos.`,
      };
    }
  }
  
  for (const signal of EXPANSION_SIGNALS) {
    if (lower.includes(signal)) {
      return {
        type: 'hot_lead',
        context: `El lead mencionó "${signal}" — negocio en crecimiento/transición que probablemente necesita servicios digitales.`,
      };
    }
  }
  
  return null;
}

// ─── Send alert email (non-blocking) ───
async function sendAlertToMateo(
  alertType: AlertType,
  username: string,
  sector: string,
  message: string,
  context: string,
  conversationSnippet: string,
  baseUrl: string
) {
  try {
    await fetch(`${baseUrl}/api/instagram/alert`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alertType, username, sector, message, context, conversationSnippet }),
    });
  } catch (e) {
    console.error('Alert send failed:', e);
  }
}

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
  if (!apiKey) return 'Hey! 👋 Ahora mismo Mateo no está disponible, pero si rellenas esto te contesta rápido → neuriax.com/contacto/formulario';

  const systemPrompt = isFirstMessage
    ? INSTAGRAM_SYSTEM_PROMPT + '\n\nEste es su primer mensaje. Saluda de forma cercana y profesional con un emoji, y pregunta sobre su negocio. NO hagas bienvenida formal ni robótica.'
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
        max_tokens: 150,
        temperature: 0.75,
      }),
    });

    if (!response.ok) throw new Error('Groq error');
    const data = await response.json();
    return data.choices[0]?.message?.content || 'Hey! 🙏 Escríbenos a hola@neuriax.com y te atendemos enseguida!';
  } catch {
    return 'Ups, algo ha fallado por aquí 😅 Escríbenos a hola@neuriax.com y lo vemos!';
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
              replyMsg = 'Cada proyecto es diferente 😊 Rellena el form y Mateo te prepara un presupuesto personalizado en 5 min → neuriax.com/contacto/formulario 💪';
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
            .select('id, status, sector, username')
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

            // Alert Mateo — cold lead responded (always important)
            const baseUrl = request.nextUrl.origin;
            sendAlertToMateo(
              'hot_lead',
              coldLead.username || senderId,
              coldLead.sector || 'general',
              messageText,
              `Un lead frío del sector "${coldLead.sector}" ha respondido al DM. Esto es una señal muy positiva — el lead tiene interés.`,
              `👤 Lead: ${messageText}`,
              baseUrl
            ).catch(() => {});
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

          // ─── Opportunity Detection → Alert Mateo ───
          const opportunity = detectOpportunity(messageText);
          if (opportunity) {
            // Get username for the alert
            let alertUsername = senderId;
            let alertSector = 'general';
            try {
              const { data: follower } = await supabase
                .from('instagram_followers')
                .select('username')
                .eq('instagram_user_id', senderId)
                .single();
              if (follower?.username) alertUsername = follower.username;
            } catch { /* ignore */ }
            try {
              const { data: coldLead } = await supabase
                .from('instagram_cold_leads')
                .select('sector, username')
                .eq('instagram_user_id', senderId)
                .single();
              if (coldLead?.sector) alertSector = coldLead.sector;
              if (coldLead?.username) alertUsername = coldLead.username;
            } catch { /* ignore */ }

            // Build conversation snippet for the email
            const snippet = conversationHistory.slice(-6).map(m =>
              `${m.role === 'user' ? '👤 Lead' : '🤖 Neuri'}: ${m.content}`
            ).join('\n');

            // Send alert (non-blocking)
            const baseUrl = request.nextUrl.origin;
            sendAlertToMateo(
              opportunity.type,
              alertUsername,
              alertSector,
              messageText,
              opportunity.context,
              snippet + `\n👤 Lead: ${messageText}\n🤖 Neuri: ${aiResponse}`,
              baseUrl
            ).catch(() => {});

            console.log(`🔥 Opportunity detected from @${alertUsername}: ${opportunity.type}`);
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
