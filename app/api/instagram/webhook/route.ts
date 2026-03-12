import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ═══════════════════════════════════════════════════════════════
// ENTERPRISE SYSTEM PROMPT — Nivel humano, coherente, con memoria
// ═══════════════════════════════════════════════════════════════
const INSTAGRAM_SYSTEM_PROMPT = `Eres Neuri, del equipo de Neuriax. Contestas DMs de Instagram como un HUMANO REAL con mentalidad empresarial. Eres inteligente, empático y estratégico 💡

═══ REGLAS DE ORO (OBLIGATORIO) ═══
1. LEE TODO EL HISTORIAL antes de responder. NUNCA repitas una pregunta que ya hiciste o que ya te respondieron.
2. Si alguien te dice "hola", "buenas", "hey", "qué tal" o cualquier saludo → SIEMPRE devuelve el saludo de forma cálida y natural ANTES de cualquier otra cosa. Sé educado.
3. Si ya saludaste Y el lead ya respondió al saludo, NO vuelvas a saludar. Ve directo al punto.
4. Si el lead ya te dijo a qué se dedica, su sector, su ciudad, etc. — NUNCA preguntes de nuevo. Usa esa info.
5. Adapta tu tono al momento: si acaban de decir "gracias" no respondas con una nueva pregunta agresiva.
6. SOLO usa neuriax.com como link de la web. NUNCA escribas "www.neuriax.com", "neuriax.com/webs", "la web de Neuriax", "nuestra web", "https://neuriax.com". Solo: neuriax.com
7. El link de agendar llamada es: calendly.com/neuriax/30min

═══ TU PERSONALIDAD ═══
- Networker nato. Curioso de verdad sobre negocios.
- Profesional pero cercano. Hablas como un colega que entiende de negocios.
- Mensajes cortos: 2-3 líneas máximo. Esto es un DM, no un email.
- Emojis naturales (1-2 por mensaje) 🚀✨💡🔥👋
- NUNCA suenes como ChatGPT/IA. Prohibido: "¡Genial!", "¡Excelente!", "¡Por supuesto!", "con gusto", "le informo", "estimado", "sin duda alguna"
- Varía tu forma de empezar. No empieces siempre con "hey" o "buenas". Sé creativo y natural.

═══ INTELIGENCIA EMOCIONAL (CRÍTICO) ═══
Detecta el MOOD del lead y adapta tu respuesta:

→ Si dice "gracias", "muchas gracias", "perfecto", "genial":
  Responde breve y cálido. "de nada! cualquier cosa aquí estamos 💪" o "nada, cuando quieras hablamos!"
  NO hagas una nueva pregunta de negocio.

→ Si dice algo corto tipo "ok", "vale", "sí", "bueno":
  Haz seguimiento suave, no cambies de tema bruscamente.
  "guay! pues cuando te apetezca lo vemos más en detalle 😊"

→ Si está entusiasmado ("qué pasada", "mola mucho", "me encanta"):
  Aprovecha el momentum. Es buen momento para proponer algo concreto.

→ Si está frío, cortante o no interesado ("ya veremos", "ahora no", "no gracias"):
  NO insistas. "sin problema! si en algún momento os surge algo, aquí estamos 🤙"
  Déjalo ir con elegancia.

→ Si manda un audio o imagen:
  Responde reconociendo lo que envió, no cambies de tema.

═══ DETECCIÓN DE GÉNERO ═══
- Fíjate en el nombre para adaptar el trato (masculino/femenino/neutro)
- NUNCA preguntes el género directamente

═══ MENTALIDAD DE EMPRESARIO ═══
Tu cerebro siempre piensa: "¿cómo generamos valor mutuo aquí?"

1. ¿Qué necesita este negocio? (web, automatización, IA, presencia online)
2. ¿Hay oportunidad de colaboración? (cross-promo, referidos)
3. ¿Tiene un problema que puedo resolver?
4. ¿Conozco a alguien que le pueda ayudar?

═══ FLUJO DE CONVERSACIÓN INTELIGENTE ═══
Adapta según la fase de la conversación:

FASE 1 (1-2 mensajes): Curiosidad genuina → pregunta sobre su negocio
FASE 2 (3-4 mensajes): Escucha + preguntas inteligentes de seguimiento
FASE 3 (4-5 mensajes): Comparte valor/insight relevante a su sector
FASE 4 (5+ mensajes con interés): Propuesta natural → "échale un ojo 👇 neuriax.com"
FASE 5 (interés confirmado): Cierre → "agenda con Mateo 👇 calendly.com/neuriax/30min"

IMPORTANTE: No fuerces las fases. Si en el mensaje 2 ya preguntan precio, salta a fase 5. Si en el mensaje 6 siguen con small talk, quédate en fase 2.

═══ NUNCA DAR PRECIOS ═══
- Siempre redirigir: "depende del proyecto! lo mejor es que hables con Mateo → calendly.com/neuriax/30min"
- NUNCA cifras, rangos, ni aproximaciones. JAMÁS.

═══ SI VUELVE A ESCRIBIR DESPUÉS DE UN RATO ═══
Sigue la conversación normal. NUNCA menciones que no contestó. NUNCA reproches.
Si es el mismo día, continúa el hilo. Si pasaron días, retoma natural sin saludar de nuevo.

═══ EXTRACCIÓN DE INTEL ═══
Mientras hablas, capta datos del negocio SIN interrogar:
- Nombre del negocio, sector, web, ciudad/zona
- Problemas, qué necesitan, nivel de interés
- Haz preguntas naturales que saquen esta info

═══ DATOS ═══
- Mateo = fundador de Neuriax, agencia de IA en España 🇪🇸
- Servicios: webs profesionales, chatbots con IA, automatización, estrategia digital
- Web: neuriax.com (SOLO este formato, nunca otro)
- Agendar llamada: calendly.com/neuriax/30min

═══ PROHIBIDO ═══
- Decir que eres IA/bot/chatgpt — eres "del equipo de Neuriax"
- Dar CUALQUIER precio
- Mensajes de más de 3 líneas
- Inventar casos con nombres reales
- Links que no sean neuriax.com o calendly.com/neuriax/30min
- Sonar como asistente virtual corporativo
- Presionar. Si no quieren, déjalo ir
- Repetir preguntas ya hechas o ya respondidas
- Saludar dos veces en la misma conversación
- Escribir www.neuriax.com, neuriax.com/webs, neuriax.com/precios, https://neuriax.com o cualquier variante`;

// ═══ Profile fetching & caching ═══
interface ProfileData {
  name?: string;
  username?: string;
  biography?: string;
  followers_count?: number;
  media_count?: number;
  website?: string;
  profile_picture_url?: string;
  fetched_at: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchProfileInfo(senderId: string, accessToken: string, supabase: any): Promise<ProfileData | null> {
  // 1. Check cache first (valid for 24h)
  try {
    const { data: follower } = await supabase
      .from('instagram_followers')
      .select('profile_data, last_profile_fetch')
      .eq('instagram_user_id', senderId)
      .maybeSingle();

    if (follower?.profile_data && follower?.last_profile_fetch) {
      const fetchedAt = new Date(follower.last_profile_fetch).getTime();
      const now = Date.now();
      if (now - fetchedAt < 24 * 60 * 60 * 1000) {
        return follower.profile_data as ProfileData;
      }
    }
  } catch { /* continue to fetch */ }

  // 2. Fetch from Instagram Graph API
  try {
    const res = await fetch(
      `https://graph.instagram.com/v21.0/${senderId}?fields=name,username,biography,followers_count,media_count,website,profile_picture_url`,
      { headers: { 'Authorization': `Bearer ${accessToken}` } }
    );

    if (res.ok) {
      const data = await res.json();
      const profileData: ProfileData = {
        name: data.name || undefined,
        username: data.username || undefined,
        biography: data.biography || undefined,
        followers_count: data.followers_count || undefined,
        media_count: data.media_count || undefined,
        website: data.website || undefined,
        profile_picture_url: data.profile_picture_url || undefined,
        fetched_at: new Date().toISOString(),
      };

      // 3. Cache in DB
      await supabase
        .from('instagram_followers')
        .upsert({
          instagram_user_id: senderId,
          username: data.username || senderId,
          profile_data: profileData,
          last_profile_fetch: new Date().toISOString(),
        }, { onConflict: 'instagram_user_id' });

      return profileData;
    }
  } catch (e) {
    console.error('Profile fetch error:', e);
  }

  return null;
}

// ═══ Conversation context builder — anti-repetition + coherence ═══
interface ConversationContext {
  alreadyGreetedToday: boolean;
  isOngoingConversation: boolean;
  minutesSinceLastMessage: number;
  totalExchanges: number;
  contextBlock: string;
}

function buildConversationContext(
  history: Array<{ direction: string; content: string; created_at: string }>,
  profileData: ProfileData | null,
  leadIntel: Record<string, unknown> | null,
): ConversationContext {
  const now = Date.now();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  // Check if we already greeted today
  const outboundToday = history.filter(m =>
    m.direction === 'outbound' &&
    new Date(m.created_at).getTime() > todayStart.getTime()
  );
  const greetingPatterns = /^(hey|hola|buenas|ey|qué tal|que tal|👋|holi)/i;
  const alreadyGreetedToday = outboundToday.some(m => greetingPatterns.test(m.content.trim()));

  // Time since last message (any direction)
  const lastMsg = history.length > 0 ? history[history.length - 1] : null;
  const minutesSinceLastMessage = lastMsg
    ? Math.floor((now - new Date(lastMsg.created_at).getTime()) / 60000)
    : 9999;

  const isOngoingConversation = minutesSinceLastMessage < 120; // <2 hours
  const totalExchanges = history.length;

  // Build dynamic context block
  const lines: string[] = ['═══ CONTEXTO DE ESTA CONVERSACIÓN ═══'];

  // Profile info
  if (profileData) {
    const parts = [];
    if (profileData.username) parts.push(`@${profileData.username}`);
    if (profileData.biography) parts.push(`Bio: "${profileData.biography.substring(0, 120)}"`);
    if (profileData.followers_count) parts.push(`${profileData.followers_count.toLocaleString()} seguidores`);
    if (profileData.website) parts.push(`Web: ${profileData.website}`);
    if (parts.length > 0) lines.push(`- Perfil: ${parts.join(' | ')}`);
  } else {
    lines.push('- No tienes datos de su perfil de Instagram. Si no sabes a qué se dedica, pregúntale de forma natural.');
  }

  // Lead intel (previously extracted)
  if (leadIntel) {
    const intel = leadIntel as Record<string, unknown>;
    const intelParts: string[] = [];
    if (intel.nombre_negocio) intelParts.push(`Negocio: ${intel.nombre_negocio}`);
    if (intel.sector) intelParts.push(`Sector: ${intel.sector}`);
    if (intel.ciudad) intelParts.push(`Ciudad: ${intel.ciudad}`);
    if (intel.tiene_web) intelParts.push(`Tiene web: ${intel.tiene_web}`);
    if (intel.nivel_interes) intelParts.push(`Interés: ${intel.nivel_interes}`);
    if (intelParts.length > 0) {
      lines.push(`- Intel del lead: ${intelParts.join(' | ')}`);
      lines.push('- IMPORTANTE: Ya tienes estos datos. NO vuelvas a preguntar lo que ya sabes.');
    }
    if (intel.problemas && Array.isArray(intel.problemas) && intel.problemas.length > 0) {
      lines.push(`- Problemas mencionados: ${(intel.problemas as string[]).join(', ')}`);
    }
    if (intel.necesidades && Array.isArray(intel.necesidades) && intel.necesidades.length > 0) {
      lines.push(`- Necesidades: ${(intel.necesidades as string[]).join(', ')}`);
    }
  }

  // Greeting status
  if (alreadyGreetedToday) {
    lines.push('- ⚠️ YA saludaste hoy en esta conversación. NO vuelvas a saludar. Ve directo al punto.');
  }

  // Conversation momentum
  if (isOngoingConversation && totalExchanges > 2) {
    lines.push(`- Conversación EN CURSO (hace ${minutesSinceLastMessage}min). Sigue el hilo, no te presentes de nuevo.`);
  } else if (totalExchanges > 0 && minutesSinceLastMessage > 1440) {
    lines.push('- Hace más de 1 día que no habláis. Retoma natural sin saludar formalmente ni reprochar.');
  }

  // Exchanges count → phase recommendation
  if (totalExchanges <= 2) {
    lines.push('- Fase 1: Pocos mensajes. Muestra curiosidad genuina por su negocio.');
  } else if (totalExchanges <= 6) {
    lines.push('- Fase 2-3: Ya habéis cruzado varios mensajes. Haz preguntas de seguimiento inteligentes.');
  } else if (totalExchanges <= 10) {
    lines.push('- Fase 4: Lleváis bastantes mensajes. Si hay interés, es buen momento para mencionar neuriax.com.');
  } else {
    lines.push('- Fase 5: Conversación larga. Si hay interés real, propón agendar llamada. Si no, no insistas.');
  }

  // Last message sentiment detection
  if (history.length > 0) {
    const lastInbound = [...history].reverse().find(m => m.direction === 'inbound');
    if (lastInbound) {
      const lower = lastInbound.content.toLowerCase();
      if (/gracias|muchas gracias|thank|thx|grax/.test(lower)) {
        lines.push('- 💡 El último mensaje es de agradecimiento. Responde cálido y breve. NO hagas nueva pregunta.');
      } else if (/^(ok|vale|sí|si|bueno|genial|perfecto|claro)$/i.test(lower.trim())) {
        lines.push('- 💡 El último mensaje es corto/asentimiento. Haz seguimiento suave, no cambies de tema.');
      } else if (/no gracias|no me interesa|ya veremos|ahora no|no puedo/.test(lower)) {
        lines.push('- 💡 El lead no parece interesado. NO insistas. Cierra con elegancia.');
      }
    }
  }

  // Questions already asked (anti-repetition) — scan outbound messages
  const askedAboutBusiness = history.some(m =>
    m.direction === 'outbound' && /a qué (os|te) dedicáis|qué hacéis|cuál es (tu|vuestro) negocio|de qué va|a qué se dedica/i.test(m.content)
  );
  if (askedAboutBusiness) {
    lines.push('- ⚠️ Ya preguntaste a qué se dedican. NO lo preguntes de nuevo.');
  }

  const askedAboutWeb = history.some(m =>
    m.direction === 'outbound' && /tenéis web|tienes web|tenéis página|tienen web|lleváis.*online|tema digital/i.test(m.content)
  );
  if (askedAboutWeb) {
    lines.push('- ⚠️ Ya preguntaste si tienen web. NO lo preguntes de nuevo.');
  }

  const askedAboutCity = history.some(m =>
    m.direction === 'outbound' && /de (dónde|donde) sois|qué zona|en qué ciudad|sois de/i.test(m.content)
  );
  if (askedAboutCity) {
    lines.push('- ⚠️ Ya preguntaste la zona/ciudad. NO lo preguntes de nuevo.');
  }

  const sentLink = history.some(m =>
    m.direction === 'outbound' && /neuriax\.com/i.test(m.content)
  );
  if (sentLink) {
    lines.push('- Ya enviaste el link de neuriax.com. No lo repitas a menos que lo pida de nuevo.');
  }

  const sentCalendly = history.some(m =>
    m.direction === 'outbound' && /calendly/i.test(m.content)
  );
  if (sentCalendly) {
    lines.push('- Ya enviaste el link de Calendly. No lo repitas a menos que lo pida de nuevo.');
  }

  return {
    alreadyGreetedToday,
    isOngoingConversation,
    minutesSinceLastMessage,
    totalExchanges,
    contextBlock: lines.join('\n'),
  };
}

// ═══ Response sanitizer — force clean links ═══
function sanitizeResponse(text: string): string {
  let clean = text;
  // Fix neuriax URLs — only allow neuriax.com clean
  clean = clean.replace(/https?:\/\/(www\.)?neuriax\.com(\/[^\s)]*)?/gi, 'neuriax.com');
  clean = clean.replace(/www\.neuriax\.com(\/[^\s)]*)?/gi, 'neuriax.com');
  clean = clean.replace(/neuriax\.com\/[^\s)]+/gi, 'neuriax.com');
  // Keep calendly intact
  // Remove any stray https:// from neuriax
  clean = clean.replace(/https?:\/\/neuriax\.com/gi, 'neuriax.com');
  return clean;
}

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

// ─── Lead Intel Extraction (non-blocking) ───
async function extractLeadIntel(
  senderId: string,
  conversationHistory: Array<{ role: string; content: string }>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any
) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey || conversationHistory.length < 3) return; // Need at least a few exchanges

  try {
    const convoText = conversationHistory.map(m =>
      `${m.role === 'user' ? 'Lead' : 'Neuri'}: ${m.content}`
    ).join('\n');

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `Analiza esta conversación de Instagram DM y extrae la información de negocio del lead. Responde SOLO con JSON válido, sin texto extra. Si no tienes datos para un campo, pon null. Formato exacto:
{
  "nombre_negocio": "string o null",
  "sector": "string o null (restaurante, barbería, clínica, tienda, inmobiliaria, gym, hotel, etc.)",
  "tiene_web": "sí/no/null",
  "url_web": "string o null",
  "ciudad": "string o null",
  "zona_barrio": "string o null",
  "redes_sociales": "string o null (instagram, tiktok, etc.)",
  "num_empleados": "string o null",
  "anos_abierto": "string o null",
  "problemas": ["lista de problemas mencionados"],
  "necesidades": ["lista de lo que necesitan: web, SEO, redes, chatbot, etc."],
  "nivel_interes": "frío/tibio/caliente/muy_caliente/null",
  "tiene_competencia_online": "sí/no/null",
  "notas_extra": "string o null (cualquier dato relevante extra)",
  "resumen": "1-2 frases resumen del lead para Mateo"
}`
          },
          { role: 'user', content: convoText },
        ],
        max_tokens: 500,
        temperature: 0.3,
      }),
    });

    if (!response.ok) return;
    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content || '';
    
    // Parse JSON from response (handle markdown code blocks)
    let intel;
    try {
      const jsonStr = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      intel = JSON.parse(jsonStr);
    } catch {
      console.error('Intel parse error:', raw.substring(0, 200));
      return;
    }

    // Save to cold_leads table if this sender is a cold lead
    const { data: coldLead } = await supabase
      .from('instagram_cold_leads')
      .select('id, notes')
      .eq('instagram_user_id', senderId)
      .maybeSingle();

    if (coldLead) {
      // Try saving to lead_intel column first, fallback to notes
      const { error: colErr } = await supabase
        .from('instagram_cold_leads')
        .update({
          lead_intel: intel,
          updated_at: new Date().toISOString(),
        })
        .eq('id', coldLead.id);

      if (colErr && colErr.message.includes('does not exist')) {
        // Column not yet added — store in notes as JSON
        const notesPrefix = coldLead.notes ? coldLead.notes.replace(/\[INTEL:[\s\S]*$/, '').trim() : '';
        await supabase
          .from('instagram_cold_leads')
          .update({
            notes: `${notesPrefix}\n[INTEL:${JSON.stringify(intel)}]`.trim(),
            updated_at: new Date().toISOString(),
          })
          .eq('id', coldLead.id);
      }
    }

    // Also try matching by username (manual leads use username as ID)
    if (!coldLead) {
      const { data: coldLeadByUser } = await supabase
        .from('instagram_cold_leads')
        .select('id, notes')
        .eq('username', senderId)
        .maybeSingle();

      if (coldLeadByUser) {
        const { error: colErr2 } = await supabase
          .from('instagram_cold_leads')
          .update({
            lead_intel: intel,
            updated_at: new Date().toISOString(),
          })
          .eq('id', coldLeadByUser.id);

        if (colErr2 && colErr2.message.includes('does not exist')) {
          const notesPrefix = coldLeadByUser.notes ? coldLeadByUser.notes.replace(/\[INTEL:[\s\S]*$/, '').trim() : '';
          await supabase
            .from('instagram_cold_leads')
            .update({
              notes: `${notesPrefix}\n[INTEL:${JSON.stringify(intel)}]`.trim(),
              updated_at: new Date().toISOString(),
            })
            .eq('id', coldLeadByUser.id);
        }
      }
    }

    // Also save intel in followers table for non-cold-lead conversations
    const { error: fErr } = await supabase
      .from('instagram_followers')
      .update({ lead_intel: intel })
      .eq('instagram_user_id', senderId);
    if (fErr) console.log('Followers intel save skipped (column may not exist)');


    console.log(`📊 Intel extracted for ${senderId}:`, intel.resumen || 'no summary');
  } catch (e) {
    console.error('Intel extraction error:', e);
  }
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

async function getAIResponse(
  userMessage: string,
  history: Array<{role: string; content: string}>,
  isFirstMessage: boolean,
  conversationCtx?: ConversationContext
) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return 'Hey! 👋 Ahora mismo Mateo no está disponible, pero agenda llamada aquí → calendly.com/neuriax/30min';

  // Build the final system prompt with dynamic context
  let systemPrompt = INSTAGRAM_SYSTEM_PROMPT;

  // Inject conversation context
  if (conversationCtx?.contextBlock) {
    systemPrompt += '\n\n' + conversationCtx.contextBlock;
  }

  // Build messages array for the AI
  const messages: Array<{role: string; content: string}> = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-20),
  ];

  // First message: inject a SEPARATE system reminder right before user message
  // (LLMs pay most attention to the last system message before user input)
  if (isFirstMessage && !conversationCtx?.alreadyGreetedToday) {
    messages.push({
      role: 'system',
      content: `⚠️ INSTRUCCIÓN CRÍTICA — PRIMER CONTACTO ⚠️
Esta persona te escribe POR PRIMERA VEZ. Es vuestra primera interacción NUNCA.

Tu respuesta DEBE:
1. EMPEZAR con un saludo cálido y natural ("ey! qué tal? 👋" o "buenas! 😊" o "hola! qué tal?")
2. Después del saludo, hacer UNA pregunta casual sobre a qué se dedica
3. Máximo 2 líneas, tono cercano

Ejemplo perfecto: "ey! qué tal? 👋 a qué te dedicas? vi tu perfil y me llamó la atención"
Otro ejemplo: "buenas! 😊 encantado, a qué os dedicáis?"

NUNCA respondas sin saludar primero. SIEMPRE sé educado y cálido.`
    });
  } else if (!isFirstMessage) {
    // Ongoing conversation: remind to greet back if they greet
    const userLower = userMessage.toLowerCase().trim();
    const isGreeting = /^(hola|buenas|hey|ey|qué tal|que tal|hi|hello|buenos días|buenas tardes|buenas noches|holi|saludos|👋)/.test(userLower);
    if (isGreeting) {
      messages.push({
        role: 'system',
        content: '⚠️ El usuario te está saludando. Sé EDUCADO: devuelve el saludo de forma cálida antes de cualquier otra cosa. No saltes directamente a preguntas de negocio.'
      });
    }
  }

  messages.push({ role: 'user', content: userMessage });

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
        max_tokens: 200,
        temperature: 0.8,
      }),
    });

    if (!response.ok) throw new Error('Groq error');
    const data = await response.json();
    const rawResponse = data.choices[0]?.message?.content || 'Hey! 🙏 Escríbenos a hola@neuriax.com y te atendemos enseguida!';
    
    // Sanitize links before sending
    return sanitizeResponse(rawResponse);
  } catch {
    return 'Ups, algo ha fallado por aquí 😅 Escríbenos a hola@neuriax.com y lo vemos!';
  }
}

// ─── Message deduplication (Instagram retries webhooks) ───
const processedMids = new Set<string>();
const MAX_MID_CACHE = 200;
function trackMid(mid: string): boolean {
  if (processedMids.has(mid)) return true; // already processed
  processedMids.add(mid);
  if (processedMids.size > MAX_MID_CACHE) {
    const first = processedMids.values().next().value;
    if (first) processedMids.delete(first);
  }
  return false;
}

// ─── Comment deduplication ───
const processedCommentIds = new Set<string>();
const MAX_COMMENT_CACHE = 100;
function trackComment(commentId: string): boolean {
  if (processedCommentIds.has(commentId)) return true;
  processedCommentIds.add(commentId);
  if (processedCommentIds.size > MAX_COMMENT_CACHE) {
    const first = processedCommentIds.values().next().value;
    if (first) processedCommentIds.delete(first);
  }
  return false;
}

// ─── Separate AI for comment replies (lightweight, fast) ───
async function getCommentReply(commentText: string, commenterUsername: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return 'gracias! 🙏 escríbenos por DM si necesitas algo 😊';

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
          {
            role: 'system',
            content: `Eres el community manager de Neuriax (agencia de IA y webs). Respondes comentarios de Instagram.

REGLAS:
- Máximo 1 línea, breve y natural
- Tono cercano y profesional, como un colega
- Si es un halago → agradece con naturalidad
- Si es una pregunta → responde breve y si es compleja invita a DM
- Si son solo emojis (🔥❤️👏) → responde con emojis + algo breve
- Si preguntan precio → "escríbenos por DM y te contamos! 💡"
- NUNCA suenes como bot/IA
- NUNCA uses: "¡Genial!", "¡Excelente!", "¡Por supuesto!", "con gusto"
- Usa 1-2 emojis máximo
- Es un comentario PÚBLICO, sé profesional`
          },
          { role: 'user', content: `@${commenterUsername} comenta: "${commentText}"` },
        ],
        max_tokens: 80,
        temperature: 0.7,
      }),
    });

    if (!response.ok) throw new Error('Groq error');
    const data = await response.json();
    return data.choices[0]?.message?.content || 'gracias! 🙏';
  } catch {
    return 'gracias! 🙏 escríbenos por DM si necesitas algo 😊';
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

  // Fallback: use the webhook sender ID as-is (works for replying to received messages)
  console.warn(`IGSID: no match found for ${webhookSenderId}, using original ID`);
  return webhookSenderId;
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

        // Handle messaging_referral (user came from ad/link/story)
        if (event.referral) {
          const senderId = event.sender?.id;
          const ref = event.referral;
          console.log(`📎 Referral from ${senderId}: source=${ref.source}, type=${ref.type}, ref=${ref.ref}`);
          if (senderId) {
            await supabase.from('instagram_messages').insert({
              sender_id: senderId,
              direction: 'inbound',
              content: `[📎 Referral] source: ${ref.source || 'unknown'}, type: ${ref.type || 'unknown'}, ref: ${ref.ref || ''}`,
              status: 'received',
              is_bot: false,
              message_type: 'referral',
            });
            // Tag follower with referral source
            await supabase.from('instagram_followers').upsert({
              instagram_user_id: senderId,
              label: 'referral',
            }, { onConflict: 'instagram_user_id' });
          }
          // Don't continue — let it fall through to process the message if there is one
        }

        // Handle postback (button clicks / ice breaker taps)
        if (event.postback) {
          const senderId = event.sender?.id;
          const payload = event.postback.payload;
          if (senderId && accessToken) {
            let replyMsg = 'ey! en qué te puedo ayudar? 😊';
            if (payload === 'ICE_SERVICES' || payload === 'GET_SERVICES') {
              replyMsg = 'en Neuriax diseñamos webs y automatizamos negocios con IA 🚀 desde chatbots hasta webs completas. a qué te dedicas tú? así te cuento qué podría encajarte';
            } else if (payload === 'ICE_AUTOMATE' || payload === 'GET_AUTOMATE') {
              replyMsg = 'buena elección! 💡 la automatización con IA es lo que más impacto tiene en un negocio. desde chatbots hasta flujos automáticos. a qué se dedica tu negocio?';
            } else if (payload === 'ICE_PRICES' || payload === 'GET_PRICES') {
              replyMsg = 'depende del proyecto 😊 pero para que te hagas una idea: webs desde 500€ y automatizaciones desde 300€/mes. quieres que Mateo te haga un presupuesto? → calendly.com/neuriax/30min';
            } else if (payload === 'ICE_CALL' || payload === 'SCHEDULE_CALL') {
              replyMsg = 'perfecto! agenda aquí con Mateo, os preparamos una propuesta gratis 💪\n\ncalendly.com/neuriax/30min';
            } else if (payload === 'ICE_PORTFOLIO' || payload === 'VIEW_PORTFOLIO') {
              replyMsg = 'mira nuestros proyectos en neuriax.com 🎨 quieres algo parecido?';
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

        // Deduplication: skip if we already processed this message
        const mid = event.message?.mid;
        if (mid && trackMid(mid)) {
          console.log(`⏭️ Duplicate message skipped: ${mid}`);
          continue;
        }

        let senderId = event.sender?.id;
        const messageText = event.message?.text || '';
        const attachments = event.message?.attachments;

        if (!senderId) continue;

        // Normalize sender ID: resolve full IGSID early so all DB records are consistent
        if (accessToken) {
          try {
            const resolvedId = await resolveIGSID(senderId, accessToken);
            if (resolvedId !== senderId) {
              console.log(`📎 Sender ID normalized: ${senderId} → ${resolvedId}`);
              senderId = resolvedId;
            }
          } catch { /* use original */ }
        }

        // Handle image/media messages — let AI respond with context
        if (!messageText && attachments) {
          const mediaType = attachments[0]?.type || 'media';
          const mediaLabel = mediaType === 'image' ? '📸 Imagen' : mediaType === 'video' ? '🎬 Video' : mediaType === 'audio' ? '🎤 Audio' : `📎 ${mediaType}`;

          await supabase.from('instagram_messages').insert({
            sender_id: senderId,
            direction: 'inbound',
            content: `[${mediaLabel}]`,
            status: 'received',
            is_bot: false,
            message_type: 'media',
          });

          if (accessToken) {
            // Check bot enabled
            const { data: mediaConfig } = await supabase
              .from('instagram_config')
              .select('bot_enabled')
              .limit(1)
              .single();

            if (mediaConfig?.bot_enabled !== false) {
              // Get history for context
              const { data: mediaHistory } = await supabase
                .from('instagram_messages')
                .select('direction, content, created_at')
                .eq('sender_id', senderId)
                .order('created_at', { ascending: true })
                .limit(20);

              const mediaConvoHistory = (mediaHistory || []).slice(0, -1).map((m: { direction: string; content: string }) => ({
                role: m.direction === 'inbound' ? 'user' as const : 'assistant' as const,
                content: m.content,
              }));

              const mediaPrompt = `El usuario ha enviado un/a ${mediaLabel.replace(/[\[\]]/g, '')}. No puedes ver el contenido, pero responde de forma natural reconociendo que lo has visto. Si tenéis conversación previa, sigue el hilo. Si no, pregunta de qué se trata.`;
              const mediaAiResponse = await getAIResponse(mediaPrompt, mediaConvoHistory, mediaConvoHistory.length === 0);
              const sent = await sendInstagramMessage(senderId, mediaAiResponse, accessToken);

              await supabase.from('instagram_messages').insert({
                sender_id: senderId,
                direction: 'outbound',
                content: mediaAiResponse,
                status: sent ? 'sent' : 'failed',
                is_bot: true,
              });
            }
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
          // Get conversation history (with timestamps for context building)
          const { data: history } = await supabase
            .from('instagram_messages')
            .select('direction, content, created_at')
            .eq('sender_id', senderId)
            .order('created_at', { ascending: true })
            .limit(30);

          const historyWithTime = (history || []) as Array<{ direction: string; content: string; created_at: string }>;

          // Exclude the current message from history (it gets added separately in getAIResponse)
          const historyWithoutCurrent = historyWithTime.slice(0, -1);

          const conversationHistory = historyWithoutCurrent.map((m) => ({
            role: m.direction === 'inbound' ? 'user' : 'assistant',
            content: m.content,
          }));

          // ─── Fetch profile + build context (enterprise features) ───
          let profileData: ProfileData | null = null;
          let leadIntel: Record<string, unknown> | null = null;

          // Fetch Instagram profile (cached, non-blocking on failure)
          try {
            profileData = await fetchProfileInfo(senderId, accessToken, supabase);
          } catch { /* non-critical */ }

          // Get existing lead intel from DB
          try {
            const { data: follower } = await supabase
              .from('instagram_followers')
              .select('lead_intel')
              .eq('instagram_user_id', senderId)
              .maybeSingle();
            if (follower?.lead_intel) leadIntel = follower.lead_intel;
          } catch { /* non-critical */ }

          // If no intel in followers, try cold_leads
          if (!leadIntel) {
            try {
              const { data: cl } = await supabase
                .from('instagram_cold_leads')
                .select('lead_intel')
                .eq('instagram_user_id', senderId)
                .maybeSingle();
              if (cl?.lead_intel) leadIntel = cl.lead_intel;
            } catch { /* non-critical */ }
          }

          // Build conversation context for coherence
          const conversationCtx = buildConversationContext(historyWithTime, profileData, leadIntel);

          // Get AI response (with context)
          const aiResponse = await getAIResponse(messageText, conversationHistory, isFirstMessage, conversationCtx);

          // Update last greeting timestamp if the response contains a greeting
          if (/^(hey|hola|buenas|ey|qué tal|que tal|👋|holi)/i.test(aiResponse.trim())) {
            Promise.resolve(
              supabase
                .from('instagram_followers')
                .upsert({
                  instagram_user_id: senderId,
                  last_greeting_at: new Date().toISOString(),
                }, { onConflict: 'instagram_user_id' })
            ).catch(() => {});
          }

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

          // ─── Lead Intel Extraction (non-blocking, every 3 messages) ───
          const totalMsgs = conversationHistory.length + 2; // +2 for current exchange
          if (totalMsgs >= 3 && totalMsgs % 2 === 0) {
            const fullHistory = [
              ...conversationHistory,
              { role: 'user', content: messageText },
              { role: 'assistant', content: aiResponse },
            ];
            extractLeadIntel(senderId, fullHistory, supabase).catch(() => {});
          }
        }
      }

      // Handle changes (comments, mentions, etc.)
      const changes = entry.changes || [];
      let commentRepliesThisBatch = 0;

      // Get our own account ID to avoid replying to ourselves
      const { data: igConfig } = await supabase
        .from('instagram_config')
        .select('instagram_account_id, bot_enabled')
        .single();
      const ourAccountId = igConfig?.instagram_account_id || process.env.INSTAGRAM_ACCOUNT_ID || '';

      for (const change of changes) {
        // ─── Comments: auto-reply with AI ───
        if (change.field === 'comments' && change.value) {
          const comment = change.value;
          const commenterId = comment.from?.id || 'unknown';
          const commenterUsername = comment.from?.username || 'unknown';
          const commentText = comment.text || '';
          const mediaId = comment.media?.id;
          const commentId = comment.id;

          // Skip our own comments
          if (commenterId === ourAccountId) {
            console.log(`💬 Skipping own comment: ${commentText.substring(0, 50)}`);
            continue;
          }

          // Deduplication: skip if already processed
          if (commentId && trackComment(commentId)) {
            console.log(`⏭️ Duplicate comment skipped: ${commentId}`);
            continue;
          }

          // Log the comment
          await supabase.from('instagram_messages').insert({
            sender_id: commenterId,
            sender_name: commenterUsername,
            direction: 'inbound',
            content: `[💬 Comentario] ${commentText}`,
            status: 'received',
            is_bot: false,
            message_type: 'comment',
          });

          // Limit: max 5 comment replies per webhook call
          if (commentRepliesThisBatch >= 5) continue;

          // Auto-reply to comment if bot is enabled and we have the comment ID
          if (accessToken && commentId && commentText.length > 1) {
            try {
              if (igConfig?.bot_enabled !== false) {
                // Generate AI reply with lightweight comment-specific function
                const commentReply = await getCommentReply(commentText, commenterUsername);

                // Reply to the comment via Instagram API
                const replyRes = await fetch(
                  `https://graph.instagram.com/v21.0/${commentId}/replies`,
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({ message: commentReply }),
                  }
                );

                const replySent = replyRes.ok;
                if (!replySent) {
                  const errBody = await replyRes.text();
                  console.error('Comment reply error:', errBody);
                }

                // Log the reply
                await supabase.from('instagram_messages').insert({
                  sender_id: commenterId,
                  sender_name: commenterUsername,
                  direction: 'outbound',
                  content: `[💬 Respuesta comentario] ${commentReply}`,
                  status: replySent ? 'sent' : 'failed',
                  is_bot: true,
                  message_type: 'comment_reply',
                });

                commentRepliesThisBatch++;
                console.log(`💬 Comment reply ${replySent ? 'sent' : 'failed'} to @${commenterUsername} on media ${mediaId}`);
              }
            } catch (e) {
              console.error('Comment auto-reply error:', e);
            }
          }
        }

        // ─── Mentions: already handled via messaging story_mention above ───
        if (change.field === 'mentions' && change.value) {
          const mention = change.value;
          console.log(`📢 Mention from @${mention.sender?.username || 'unknown'} on media ${mention.media_id}`);
        }
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Instagram webhook error:', error);
    return NextResponse.json({ status: 'ok' });
  }
}
