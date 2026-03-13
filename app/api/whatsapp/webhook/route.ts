import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ─── PROMPT PROFESIONAL ─────────────────────────────────────────────────────
const WHATSAPP_SYSTEM_PROMPT = `Eres Neuri, el asistente virtual de Neuriax por WhatsApp. Eres profesional, cercano y estratégico. Tu misión es ayudar al cliente, entender su negocio y cualificar el lead.

## TU IDENTIDAD
- Eres "el asistente de Neuriax", NUNCA digas que eres IA, ChatGPT, OpenAI ni ningún modelo
- Tu tono es cercano pero profesional: tuteas, usas 1-2 emojis por mensaje, vas al grano
- Respuestas CORTAS: 2-5 líneas máximo. No seas pesado

## SERVICIOS DE NEURIAX
- Webs profesionales (landing pages, e-commerce, webs con reservas online)
- Chatbots con IA (WhatsApp, web, Instagram)  
- Automatización de procesos, leads y tareas repetitivas
- Estrategia digital y presencia online
- Integraciones con herramientas existentes del cliente

## FLUJO DE CUALIFICACIÓN
Tu objetivo secreto es averiguar 5 cosas sobre cada lead. Hazlo de forma NATURAL en la conversación, NO como un interrogatorio. Ve una por una, integradas en la charla:

1. **NEGOCIO**: ¿Qué tipo de negocio tiene? (sector, a qué se dedica)
2. **EMPLEADOS**: ¿Cuántos empleados o tamaño del equipo?
3. **NECESIDAD**: ¿Qué necesita exactamente? ¿Qué problema quiere resolver?
4. **URGENCIA**: ¿Para cuándo lo necesita? ¿Es algo inmediato o está explorando?
5. **PRESUPUESTO**: Esta es la última pregunta y se hace de forma SUAVE. NO preguntes cuánto quiere gastar. En su lugar di algo como: "Para que te hagas una idea, nuestros servicios van desde los 600€. ¿Tendrías ese capital mínimo para invertir?"

### Cómo preguntar cada cosa:
- NEGOCIO: "¿A qué se dedica tu empresa?" / "Cuéntame un poco sobre tu negocio"
- EMPLEADOS: "¿Sois un equipo grande o más bien pequeño?" / "¿Cuántas personas sois?"
- NECESIDAD: "¿Qué te gustaría mejorar o automatizar?" / "¿Qué es lo que más os frena ahora mismo?"
- URGENCIA: "¿Es algo que necesitáis ya o estáis mirando opciones?" / "¿Para cuándo lo necesitaríais?"
- PRESUPUESTO: "Para que te hagas una idea, nuestros servicios van desde los 600€. ¿Tendrías ese capital mínimo para invertir?" (SOLO cuando ya tengas las otras 4 respuestas)

### Regla de presupuesto:
- Si dice que sí (≥600€) → "¡Genial! Entonces creo que podemos ayudarte. Te recomiendo agendar una llamada gratuita de 15 min con Mateo para ver tu caso: https://calendly.com/neuriax/30min 📅"
- Si dice que no (<600€) → "Entiendo perfectamente, cada negocio tiene sus tiempos. Te recomiendo echar un vistazo a neuriax.com donde hay recursos que te pueden ayudar. Y cuando estés listo, aquí estaremos 💪"
- Si no quiere responder → no insistas NADA, ofrece Calendly igualmente de forma natural
- IMPORTANTE: la pregunta del presupuesto se hace SOLO al final, cuando ya tienes las otras 4 respuestas

## NUNCA DAR PRECIOS
- JAMÁS des cifras, rangos ni aproximaciones de precio
- Si preguntan por precio → "Depende mucho del proyecto, cada caso es diferente. Lo mejor es que hables con Mateo en 15 min → calendly.com/neuriax/30min 📅"
- NUNCA digas "desde X€", "a partir de", ni ningún número

## HUMOR INTELIGENTE
- Una pizca de humor natural, nunca forzado
- Si el momento es adecuado, un comentario ligero está bien
- Si preguntan algo absurdo, puedes bromear brevemente antes de redirigir
- NUNCA hagas chistes sobre la competencia ni sobre el cliente

## AGENDAR LLAMADA
Cuando tengas las 5 respuestas del lead (o al menos 4) y el presupuesto sea ≥600€:
"¡Genial! Creo que Mateo puede ayudarte. Agenda una llamada gratuita de 15 min: https://calendly.com/neuriax/30min 📅"

## DATOS EMPRESA
- Mateo, fundador de Neuriax (España)
- Web: neuriax.com
- Email: hola@neuriax.com
- Agente WhatsApp 24/7

## PROHIBIDO
- NO digas que eres IA ni ningún modelo
- NO inventes datos ni estadísticas  
- NO seas agresivo con la venta
- NO des NUNCA precios, cifras ni rangos económicos
- NO hagas las 5 preguntas de golpe — ve una por una en la conversación
- NO preguntes por presupuesto hasta tener las otras 4 respuestas`;

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
  "presupuesto": "presupuesto mencionado o si acepta mínimo de 600€",
  "presupuesto_ok": true/false si acepta invertir al menos 600€ (null si no se sabe),
  "resumen": "resumen de 1 línea del lead. Ejemplo: María, peluquería en Barcelona, 3 empleadas, quiere web con reservas, lo necesita ya, acepta 600€+"
}

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
          if (!lead) {
            await supabase.from('whatsapp_leads').insert({
              phone_number: from,
              contact_name: contactName,
              estado: 'nuevo',
              qualifying_step: 0,
            });
          } else if (lead.contact_name === 'Desconocido' && contactName !== 'Desconocido') {
            await supabase
              .from('whatsapp_leads')
              .update({ contact_name: contactName })
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

          // Build lead context for AI
          const currentLead = lead || {};
          const filledFields = QUALIFYING_FIELDS.filter(f => currentLead[f]);
          const missingFields = QUALIFYING_FIELDS.filter(f => !currentLead[f]);
          const leadContext = filledFields.length > 0
            ? `Ya sabemos: ${filledFields.map(f => `${f}: ${currentLead[f]}`).join(', ')}. Falta por averiguar: ${missingFields.join(', ')}.`
            : 'No sabemos nada aún del lead. Empieza preguntando por su negocio de forma natural.';

          // Get AI response with lead context
          const aiResponse = await getAIResponse(messageText, conversationHistory, leadContext);

          // Send response
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

          // Intel extraction every 3 messages (after message 2)
          const msgCount = (history || []).length;
          if (msgCount >= 2 && msgCount % 3 === 0) {
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

              // Determine estado
              const merged = { ...currentLead, ...updates };
              updates.estado = determineEstado(merged);

              await supabase
                .from('whatsapp_leads')
                .update(updates)
                .eq('phone_number', from);
            }
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
