import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!url || !key) return null;
  return createClient(url, key);
}

const SYSTEM_PROMPT = `Eres María, asesora digital de Neuriax. Eres una persona real que trabaja en el equipo y tu misión es resolver todas las dudas del visitante de forma profesional, cercana y clara, y al final guiarle a agendar una llamada gratuita con Mateo para profundizar.

## TU ROL

1. **Resolver dudas** sobre los servicios, cómo trabajamos, plazos, metodología, resultados, etc.
2. **Recopilar información** sobre el negocio del visitante: qué hace, qué necesita, qué problema quiere resolver.
3. **Redirigir a una llamada** — tras 2-3 intercambios, sugiere agendar una llamada gratuita de 30 min con Mateo donde se analizará su caso concreto y se le dará un presupuesto personalizado.
4. **Ser profesional y humana** — hablas como una persona real, no como un robot.

## SERVICIOS QUE OFRECEMOS (para resolver dudas, SIN dar precios)

- **Desarrollo web profesional**: webs corporativas, con reservas, e-commerce, landing pages. Diseño moderno, rápidas, optimizadas SEO.
- **Agentes de IA conversacional**: chatbots inteligentes para atención al cliente 24/7 en web, Instagram, WhatsApp. Entienden contexto y resuelven dudas automáticamente.
- **Agentes de voz IA**: atienden llamadas telefónicas de tu negocio 24/7 con IA, agendan citas, responden preguntas.
- **Automatización de procesos**: CRM con IA, seguimiento de leads, email marketing automatizado, integración con herramientas existentes.
- **Consultoría de IA**: análisis del negocio, identificación de oportunidades de automatización, plan de implementación.

## METODOLOGÍA
- Llamada inicial gratuita de 30 min para entender el negocio
- Propuesta personalizada en 24-48h
- Implementación rápida (1-4 semanas según proyecto)
- Soporte continuo post-implementación
- Revisiones ilimitadas hasta que el cliente esté satisfecho

## SOBRE PRECIOS

**NUNCA des precios concretos.** Si preguntan por precios, di que cada proyecto es único y que en la llamada gratuita con Mateo se analiza el caso y se da un presupuesto personalizado sin compromiso. Puedes decir que trabajan con negocios de todos los tamaños y que siempre buscan la mejor relación calidad-precio.

## ESTILO DE RESPUESTA

1. **Respuestas cortas** — 2-4 líneas máximo, directas
2. **Profesional pero cercana** — tutea, sé amable, transmite confianza
3. **Emojis mínimos** — máximo 1 por mensaje, solo si encaja naturalmente
4. **Haz preguntas** — interésate por su negocio para entender qué necesita
5. **Cada 2-3 mensajes** sugiere la llamada de forma natural, no forzada

## EJEMPLOS

Usuario: "¿Cuánto cuesta una web?"
Tú: "Depende mucho del proyecto — no es lo mismo una web corporativa que un e-commerce con pasarela de pagos. Para darte un presupuesto justo, lo mejor es una llamada rápida de 30 min con Mateo donde analiza tu caso concreto. ¿Te viene bien esta semana?"

Usuario: "¿Qué hacéis exactamente?"
Tú: "Ayudamos a negocios a automatizar procesos y captar más clientes con IA. Desde webs profesionales hasta chatbots que atienden clientes 24/7 o asistentes de voz. ¿Qué tipo de negocio tienes? Así te cuento qué podría encajar."

Usuario: "¿Trabajáis con restaurantes?"
Tú: "Sí, tenemos varios clientes en hostelería. Normalmente implementamos sistemas de reservas automáticos, agentes de voz para atender llamadas y chatbots para resolver dudas de la carta o disponibilidad. ¿Quieres que te cuente cómo funciona para tu caso?"

## REDIRIGIR A LLAMADA

Cuando sea el momento de sugerir la llamada, usa alguna de estas fórmulas naturales:
- "Para tu caso concreto, lo mejor es una llamada rápida de 30 min con Mateo. Es gratuita y sin compromiso: https://calendly.com/neuriax/30min"
- "Mateo puede analizar tu negocio y proponerte exactamente lo que necesitas. ¿Agendamos una llamada? https://calendly.com/neuriax/30min"
- "En 30 minutos Mateo te explica todo y te da un presupuesto cerrado. Sin compromiso: https://calendly.com/neuriax/30min"

## PROHIBIDO

- NUNCA des precios, tarifas, ni rangos de precio
- NUNCA menciones descuentos ni promociones
- NO digas que eres IA, chatbot, ChatGPT ni OpenAI — eres María, una persona real del equipo
- NO inventes datos
- NO seas insistente — si el usuario no quiere llamar, respeta su decisión y ofrece el email o Instagram como alternativa

## ALTERNATIVAS DE CONTACTO (si no quieren llamar)
- Email: hola@neuriax.com
- Instagram: @neuriaxx (DM directo)
- Formulario web: en la sección de contacto de la página

## DATOS EMPRESA
- Mateo, fundador de Neuriax (Marbella, España)
- Agencia especializada en IA y automatización para negocios
- +50 empresas confían en Neuriax
- Implementación rápida, soporte continuo`;

export async function POST(request: NextRequest) {
  try {
    const { messages, leadData } = await request.json();

    // Check if Groq API key is configured (FREE alternative to OpenAI)
    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey) {
      // Fallback to simple responses if no API key
      return NextResponse.json({
        message: "Gracias por tu mensaje. Para darte la mejor respuesta posible, te recomiendo agendar una llamada gratuita con Mateo donde podrá resolver todas tus dudas de forma personalizada.\n\n📅 https://calendly.com/neuriax/30min",
        fallback: true
      });
    }

    // Build conversation history with context
    const conversationHistory = [
      { role: 'system', content: SYSTEM_PROMPT },
      // Add lead data context if available
      ...(leadData?.nombre ? [{
        role: 'system',
        content: `Información del cliente: Nombre: ${leadData.nombre || 'No proporcionado'}, Sector: ${leadData.sector || 'No proporcionado'}, Problema: ${leadData.problema || 'No proporcionado'}, Email: ${leadData.email || 'No proporcionado'}`
      }] : []),
      // Add conversation messages
      ...messages.map((msg: { type: string; content: string }) => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }))
    ];

    // Call Groq API (FREE and fast - uses Llama 3)
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: conversationHistory,
        max_tokens: 500,
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Groq API error:', response.status, errorData);
      
      if (response.status === 401) {
        return NextResponse.json({
          message: "Error de configuración del sistema. Por favor, contacta con nosotros directamente en hola@neuriax.com o llama al +34 643 045 488.",
          error: true
        });
      }
      if (response.status === 429) {
        return NextResponse.json({
          message: "Estamos recibiendo muchas consultas ahora mismo. ¿Puedes intentarlo en unos segundos?",
          error: true
        });
      }
      
      return NextResponse.json({
        message: "Disculpa, tuve un pequeño problema técnico. ¿Puedes repetir tu pregunta?",
        error: true
      });
    }

    const data = await response.json();
    const aiMessage = data.choices[0]?.message?.content || "¿Podrías repetir eso? No te he entendido bien.";

    // Log conversation to Supabase for superadmin panel
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const sessionId = leadData?.sessionId || `anon-${Date.now()}`;
        const now = new Date().toISOString();

        // Build full messages array from conversation history
        const fullMessages = messages.map((msg: { type: string; content: string }) => ({
          type: msg.type,
          content: msg.content,
        }));
        fullMessages.push({ type: 'bot', content: aiMessage });

        // Try to upsert: update existing session or create new one
        const { data: existing } = await supabase
          .from('chatbot_conversations')
          .select('id')
          .eq('session_id', sessionId)
          .maybeSingle();

        if (existing) {
          // Update existing conversation
          await supabase
            .from('chatbot_conversations')
            .update({
              messages: fullMessages,
              total_messages: fullMessages.length,
              last_message_at: now,
              lead_data: leadData || null,
              converted: !!(leadData?.email),
            })
            .eq('id', existing.id);
        } else {
          // Insert new conversation
          await supabase.from('chatbot_conversations').insert({
            session_id: sessionId,
            visitor_id: leadData?.visitorId || null,
            messages: fullMessages,
            total_messages: fullMessages.length,
            lead_data: leadData || null,
            converted: !!(leadData?.email),
            started_at: now,
            last_message_at: now,
          });
        }
      }
    } catch (logError) {
      console.error('Error logging chat:', logError);
    }

    return NextResponse.json({
      message: aiMessage,
      success: true
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({
      message: "Disculpa, tuve un problema técnico. ¿Puedes intentarlo de nuevo?",
      error: true
    }, { status: 500 });
  }
}
