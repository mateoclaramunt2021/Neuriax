import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ─── PROMPT PROFESIONAL ─────────────────────────────────────────────────────
const WHATSAPP_SYSTEM_PROMPT = `Eres Neuri, el asistente de inteligencia artificial de Neuriax por WhatsApp. Eres profesional, cercano, natural y estratégico. Tu misión es tener una CONVERSACIÓN REAL con el cliente, entender su negocio y cualificarlo sin que se sienta interrogado.

## TU IDENTIDAD
- Eres "Neuri, el asistente de inteligencia artificial de Neuriax"
- En tu PRIMER mensaje, preséntate de forma llamativa: di que eres un agente de IA, que puedes resolver todas sus dudas sobre webs, chatbots, automatización y estrategia digital, y que estás ahí para guiarle en lo que necesite
- Tu tono es cercano, natural y de WhatsApp: tuteas, usas emojis con moderación, hablas como una persona real
- Respuestas CORTAS: 2-5 líneas por mensaje. No seas pesado

## FORMATO DE MENSAJES — MUY IMPORTANTE
Tienes la capacidad de enviar 1 o 2 mensajes. Adáptate al contexto:
- Si quieres reaccionar a algo que dijo el lead Y ADEMÁS hacer una pregunta → separa con "|||" para enviar 2 mensajes. Ejemplo: "Ostras, eso suena genial! El sector salud está avanzando mucho con la digitalización 🚀|||Y dime, ¿sois un equipo grande o más bien pequeño?"
- Si con un solo mensaje natural es suficiente → NO uses "|||". Solo escribe el mensaje.
- NO siempre tienen que ser 2. A veces 1 basta. A veces 2 queda mejor. Sé natural.
- NUNCA pongas "|||" al principio ni al final, solo entre 2 mensajes.

## ESTILO DE CONVERSACIÓN — SÉ HUMANO
- NO seas un robot que pregunta-respuesta-pregunta. Eso es un formulario, no una conversación.
- A veces SOLO reacciona y comenta sin preguntar nada. La siguiente pregunta puede venir 1-2 mensajes después.
- Reacciona con CONTEXTO al sector del lead. Si dice "tengo una clínica dental" → comenta algo relevante sobre el sector, no un genérico "¡Genial!"
- Usa expresiones naturales de WhatsApp: "ostras", "mira", "te cuento", "qué guay", "la verdad es que..."
- NUNCA respondas con frases robóticas tipo "Perfecto. Ahora dime..." o "Entendido. La siguiente pregunta es..."
- Las preguntas de cualificación deben fluir NATURALMENTE cada 2-3 intercambios, no en cada respuesta

## SERVICIOS DE NEURIAX (solo mencionar nombres, JAMÁS precios)
- Webs profesionales (landing pages, e-commerce, webs con reservas online)
- Chatbots con IA (WhatsApp, web, Instagram)
- Automatización de procesos, leads y tareas repetitivas
- Estrategia digital y presencia online
- Integraciones con herramientas existentes del cliente

## ⚠️ REGLA CRÍTICA — NUNCA DAR PRECIOS ⚠️
Esta es tu regla MÁS IMPORTANTE. JAMÁS la rompas:
- NUNCA des cifras, rangos, estimaciones ni aproximaciones de precio de NINGÚN servicio
- NUNCA digas "desde X€", "a partir de X€", "cuesta X€", "entre X y Y", ni NINGÚN número económico
- Si preguntan "¿cuánto cuesta?", "¿qué precio tiene?" → SIEMPRE responde: "Cada proyecto es diferente y se presupuesta a medida. Lo mejor es hablarlo con Mateo en una llamada gratuita de 15 min 📅"
- Esto incluye chatbots, webs, automatizaciones, TODO. No des NINGÚN precio JAMÁS
- La ÚNICA cifra que puedes mencionar es "600€" y SOLO en la pregunta final de presupuesto del flujo de cualificación

## FLUJO DE CUALIFICACIÓN (OBLIGATORIO — SIGUE ESTE ORDEN)
Antes de ofrecer Calendly, DEBES conseguir estas 5 respuestas en ORDEN. Pero hazlo de forma NATURAL dentro de la conversación. NO te saltes ninguna. NO ofrezcas Calendly hasta tener al menos 4 de las 5:

1. **NEGOCIO**: "¿A qué se dedica tu empresa?" / "Cuéntame un poco sobre tu negocio"
2. **EMPLEADOS**: "¿Sois un equipo grande o más bien pequeño?" / "¿Cuántas personas sois?"
3. **NECESIDAD**: "¿Qué te gustaría mejorar o automatizar?" / "¿Qué es lo que más os frena ahora mismo?"
4. **URGENCIA**: "¿Es algo que necesitáis ya o estáis mirando opciones?" / "¿Para cuándo lo necesitaríais?"
5. **PRESUPUESTO** (SOLO AL FINAL): "Para que te hagas una idea, nuestros servicios van desde los 600€. ¿Tendrías ese capital mínimo para invertir?"

### ⚠️ REGLAS DEL FLUJO:
- NUNCA hagas la pregunta 5 (presupuesto) sin haber tenido respuesta a las preguntas 1-4
- NUNCA ofrezcas el link de Calendly antes de tener al menos 4 respuestas
- Si el cliente pide agendar una llamada al principio → "¡Claro! Antes de la llamada me gustaría entender un poco tu caso para que Mateo pueda prepararse. ¿A qué se dedica tu empresa?"
- Si insiste mucho en agendar sin responder → dale el Calendly, pero intenta sacar alguna info
- RECUERDA: No tienes que preguntar en CADA mensaje. Comenta, reacciona, y la pregunta que viene cuando sea natural.

### Después del presupuesto:
- Si dice que sí (≥600€) o da una cifra ≥600€ → "¡Genial! Creo que podemos ayudarte. Agenda una llamada gratuita de 15 min con Mateo: https://calendly.com/neuriax/30min 📅"
- Si dice que no (<600€) → "Entiendo perfectamente, cada negocio tiene sus tiempos. Te recomiendo echar un vistazo a neuriax.com donde hay recursos que te pueden ayudar. Y cuando estés listo, aquí estaremos 💪"
- Si no quiere responder → no insistas, ofrece Calendly igualmente

## HUMOR INTELIGENTE
- Una pizca de humor natural, nunca forzado
- NUNCA hagas chistes sobre la competencia ni sobre el cliente

## DATOS EMPRESA
- Mateo, fundador de Neuriax (España)
- Web: neuriax.com
- Email: hola@neuriax.com

## PROHIBIDO (ROMPER ESTAS REGLAS ES INACEPTABLE)
- NO des NUNCA precios, cifras ni rangos económicos de servicios — JAMÁS
- NO ofrezcas Calendly antes de hacer las preguntas de cualificación
- NO hagas las 5 preguntas de golpe — ve una por una, de forma natural
- NO preguntes por presupuesto hasta tener las otras 4 respuestas
- NO inventes datos ni estadísticas
- NO seas agresivo con la venta
- NO respondas como un robot: nada de "Perfecto. Ahora dime..." o "Entendido. Mi siguiente pregunta es..."`;

// ─── QUALIFYING QUESTIONS ───────────────────────────────────────────────────
const QUALIFYING_FIELDS = ['negocio', 'empleados', 'necesidad', 'urgencia', 'presupuesto'] as const;

// ─── HELPERS ────────────────────────────────────────────────────────────────
function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(url, key);
}

// ─── INTEL EXTRACTION (runs every few messages) ─────────────────────────────
async function extractLeadIntel(
  conversationHistory: Array<{ role: string; content: string }>,
  existingLead: Record<string, string | null>
) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;

  const extractionPrompt = `Analiza esta conversación de WhatsApp y extrae info del lead.
Devuelve SOLO un JSON válido con estos campos (null si no se sabe):
{
  "negocio": "descripción breve del negocio/sector",
  "sector": "sector (ej: hostelería, salud, retail, servicios...)",
  "empleados": "número o rango de empleados",
  "necesidad": "qué necesita o quiere resolver",
  "urgencia": "cuándo lo necesita (ej: ya, este mes, explorando, no definido)",
  "presupuesto": "presupuesto mencionado o si acepta mínimo de 600€ (ej: 1500€, sí acepta 600€, no tiene presupuesto)",
  "presupuesto_ok": true si menciona una cifra >= 600 o dice que sí tiene ese capital. false SOLO si dice explícitamente que no llega a 600€. null si no se ha hablado de dinero,
  "resumen": "resumen de 1 línea del lead. Ejemplo: María, peluquería en Barcelona, 3 empleadas, quiere web con reservas, lo necesita ya, acepta 600€+"
}

REGLAS IMPORTANTES:
- Si el lead menciona una cifra como 1500, 1000, 800, etc → presupuesto_ok = true (es >= 600)
- Si dice "sí" a la pregunta del capital mínimo de 600€ → presupuesto_ok = true
- presupuesto_ok = false SOLO si dice que no tiene 600€ o que su presupuesto es menor de 600€
- Si no se ha hablado de presupuesto → presupuesto_ok = null

Info que ya tenemos del lead (no cambiar a null si ya existe):
${JSON.stringify(existingLead)}

IMPORTANTE: Solo devuelve el JSON, sin texto adicional ni markdown.`;

  try {
    const msgs = [
      { role: 'system' as const, content: extractionPrompt },
      ...conversationHistory.slice(-20).map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: msgs,
        max_tokens: 300,
        temperature: 0.1,
      }),
    });

    if (!response.ok) return null;
    const data = await response.json();
    const raw = data.choices[0]?.message?.content || '';
    // Extract JSON from response
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;
    return JSON.parse(jsonMatch[0]);
  } catch {
    return null;
  }
}

// ─── DETERMINE LEAD STATE ───────────────────────────────────────────────────
function determineEstado(lead: Record<string, unknown>): string {
  const filled = QUALIFYING_FIELDS.filter(f => lead[f] != null && lead[f] !== '').length;
  if (lead.presupuesto_ok === false) return 'no_cualificado';
  if (filled >= 4 && lead.presupuesto_ok === true) return 'cualificado';
  if (filled > 0) return 'cualificando';
  return 'nuevo';
}

// ─── AI RESPONSE ────────────────────────────────────────────────────────────
async function getAIResponse(
  userMessage: string,
  conversationHistory: Array<{ role: string; content: string }>,
  leadContext?: string
) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return '¡Hola! Gracias por escribirnos. Mateo te responderá pronto. Si quieres, puedes agendar una llamada: https://calendly.com/neuriax/30min';

  let systemPrompt = WHATSAPP_SYSTEM_PROMPT;
  if (leadContext) {
    systemPrompt += `\n\n## CONTEXTO DEL LEAD ACTUAL\n${leadContext}\nUsa esta info para NO repetir preguntas que ya tienes respondidas. Enfócate en lo que falta.`;
  }

  const messages = [
    { role: 'system' as const, content: systemPrompt },
    ...conversationHistory.slice(-10).map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
    { role: 'user' as const, content: userMessage },
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

// ─── SEND WHATSAPP MESSAGE ──────────────────────────────────────────────────
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

// ─── GET - Webhook verification (Meta requires this) ────────────────────────
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

// ─── POST - Receive messages ────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = getSupabase();

    const entries = body.entry || [];
    for (const entry of entries) {
      const changes = entry.changes || [];
      for (const change of changes) {
        if (change.field !== 'messages') continue;

        const value = change.value;
        const incomingMessages = value.messages || [];

        for (const message of incomingMessages) {
          const from = message.from;
          const contactName = value.contacts?.[0]?.profile?.name || 'Desconocido';
          const messageText = message.text?.body || '';
          const messageType = message.type || 'text';

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

          // Check global bot enabled
          const { data: config } = await supabase
            .from('whatsapp_config')
            .select('*')
            .limit(1)
            .single();

          const botEnabled = config?.bot_enabled !== false;
          if (!botEnabled) continue;

          // Check per-chat bot_paused in whatsapp_leads
          const { data: lead } = await supabase
            .from('whatsapp_leads')
            .select('*')
            .eq('phone_number', from)
            .single();

          if (lead?.bot_paused) continue; // Bot paused for this chat

          // Upsert lead record if doesn't exist
          const now = new Date().toISOString();
          if (!lead) {
            await supabase.from('whatsapp_leads').insert({
              phone_number: from,
              contact_name: contactName,
              estado: 'nuevo',
              qualifying_step: 0,
              last_inbound_at: now,
            });
          } else {
            // Update last_inbound_at + reset followup tracking (lead replied!)
            const leadUpdates: Record<string, unknown> = {
              last_inbound_at: now,
              followup_count: 0,
              followup_sent_at: null,
            };
            if (lead.contact_name === 'Desconocido' && contactName !== 'Desconocido') {
              leadUpdates.contact_name = contactName;
            }
            // If lead was marked no_responde and they reply, move back to previous state
            if (lead.estado === 'no_responde') {
              leadUpdates.estado = lead.negocio ? 'cualificando' : 'nuevo';
            }
            await supabase
              .from('whatsapp_leads')
              .update(leadUpdates)
              .eq('phone_number', from);
          }

          // Get conversation history
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

          // Extract intel BEFORE building context (runs every message after msg 3)
          let currentLead: Record<string, any> = lead || {};
          const msgCount = (history || []).length;
          if (msgCount >= 3) {
            const existingData = {
              negocio: currentLead.negocio || null,
              sector: currentLead.sector || null,
              empleados: currentLead.empleados || null,
              necesidad: currentLead.necesidad || null,
              urgencia: currentLead.urgencia || null,
              presupuesto: currentLead.presupuesto || null,
            };

            const intel = await extractLeadIntel(conversationHistory, existingData);
            if (intel) {
              const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
              if (intel.negocio && !currentLead.negocio) updates.negocio = intel.negocio;
              if (intel.sector && !currentLead.sector) updates.sector = intel.sector;
              if (intel.empleados && !currentLead.empleados) updates.empleados = intel.empleados;
              if (intel.necesidad && !currentLead.necesidad) updates.necesidad = intel.necesidad;
              if (intel.urgencia && !currentLead.urgencia) updates.urgencia = intel.urgencia;
              if (intel.presupuesto && !currentLead.presupuesto) updates.presupuesto = intel.presupuesto;
              if (intel.presupuesto_ok != null) updates.presupuesto_ok = intel.presupuesto_ok;
              if (intel.resumen) updates.resumen = intel.resumen;

              const merged = { ...currentLead, ...updates };
              updates.estado = determineEstado(merged);

              await supabase
                .from('whatsapp_leads')
                .update(updates)
                .eq('phone_number', from);

              // Update currentLead with fresh data
              currentLead = { ...currentLead, ...updates };
            }
          }

          // Build lead context for AI
          const filledFields = QUALIFYING_FIELDS.filter(f => currentLead[f]);
          const missingFields = QUALIFYING_FIELDS.filter(f => !currentLead[f]);
          const isFirstMessage = msgCount <= 1;
          
          let leadContext: string;
          if (isFirstMessage) {
            leadContext = 'Este es el PRIMER mensaje del lead. Preséntate de forma elaborada: di que eres Neuri, el asistente de inteligencia artificial de Neuriax, que puedes resolver cualquier duda sobre webs, chatbots, automatización, estrategia digital... que estás ahí para guiarle en todo lo que necesite. Hazlo llamativo y cercano. Después, de forma natural, pregunta a qué se dedica su empresa para poder ayudarle mejor. Puedes usar "|||" para separar la presentación de la pregunta si queda más natural.';
          } else if (filledFields.length === 0) {
            leadContext = 'No sabemos nada aún del lead. Pregunta por su NEGOCIO de forma natural, integrada en la conversación. NO ofrezcas Calendly todavía.';
          } else {
            const nextQuestion = missingFields[0];
            const canAskPresupuesto = missingFields.length === 1 && missingFields[0] === 'presupuesto';
            leadContext = `Ya sabemos: ${filledFields.map(f => `${f}: ${currentLead[f]}`).join(', ')}. `;
            if (canAskPresupuesto) {
              leadContext += 'Ya tienes las 4 primeras respuestas. AHORA puedes hacer la pregunta del presupuesto de forma suave: "Para que te hagas una idea, nuestros servicios van desde los 600€. ¿Tendrías ese capital mínimo para invertir?"';
            } else if (missingFields.length > 0) {
              leadContext += `La SIGUIENTE pregunta que debes hacer es sobre: ${nextQuestion}. NO preguntes por presupuesto aún. NO ofrezcas Calendly aún.`;
            } else {
              leadContext += 'Ya tienes TODA la info. Ofrece Calendly si presupuesto >= 600€.';
            }
          }
          leadContext += '\n\n⚠️ NUNCA repitas una pregunta que ya has hecho o que el lead ya ha respondido. Lee el historial de la conversación. Si el lead ya ha respondido algo, NO lo preguntes de nuevo. Avanza a la siguiente pregunta.';

          // Get AI response with lead context
          const aiResponse = await getAIResponse(messageText, conversationHistory, leadContext);

          // Split into multiple messages if "|||" separator is present
          const messageParts = aiResponse.split('|||').map((p: string) => p.trim()).filter((p: string) => p.length > 0);

          let allSent = true;
          for (let i = 0; i < messageParts.length; i++) {
            // Add delay between messages to simulate typing (1.5s)
            if (i > 0) {
              await new Promise(resolve => setTimeout(resolve, 1500));
            }
            const sent = await sendWhatsAppMessage(from, messageParts[i]);
            if (!sent) allSent = false;

            // Save each message part to DB
            await supabase.from('whatsapp_messages').insert({
              phone_number: from,
              contact_name: contactName,
              direction: 'outbound',
              message_type: 'text',
              content: messageParts[i],
              status: sent ? 'sent' : 'failed',
              is_bot: true,
            });
          }

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

    // Always return 200 to Meta
    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    return NextResponse.json({ status: 'ok' });
  }
}
