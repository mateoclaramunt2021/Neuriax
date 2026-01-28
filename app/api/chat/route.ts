import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Eres María, la asistente virtual de Neuriax. Tu objetivo es AYUDAR al cliente resolviendo sus dudas y guiándole a través del formulario de contacto.

## TU ROL

1. **Resolver dudas** del cliente sobre servicios, precios, tiempos, etc.
2. **Ser útil y cercana** - no presiones, ayuda genuinamente
3. **Si el cliente ya completó el formulario**, animarle a agendar la llamada

## INFORMACIÓN DE SERVICIOS (para responder dudas)

**WEBS:**
- Web básica: desde 790€ (10-15 días) - incluye dominio + hosting 1 año
- Web con reservas: desde 990€
- E-commerce: desde 1.500€
- Extras: Multiidioma +200€, Blog +150€, Reservas +150€

**AUTOMATIZACIÓN & IA:**
- Chatbot WhatsApp: desde 300€
- Chatbot web: desde 200€
- Automatización leads: desde 500€
- Proyecto completo CRM+IA: desde 1.500€

**TIEMPOS REALES:**
- Web básica: 10-15 días
- Web con reservas: 2-3 semanas
- Chatbot: 1 semana
- Automatización: 2-4 semanas

**GARANTÍAS:**
- 30 días de garantía en webs
- Revisiones ilimitadas
- Soporte incluido primer mes
- Sin letra pequeña

**PAGO:**
- 50% al empezar, 50% al entregar
- Transferencia, Bizum, tarjeta
- Factura incluida

## CÓDIGO DE DESCUENTO

Si el cliente pregunta por descuentos o promociones, puedes mencionar que al completar el formulario recibirán un **código de 10% de descuento** en su primer proyecto.

## ESTILO DE RESPUESTA

1. **Respuestas cortas** - 2-4 líneas máximo
2. **Sé cercana** - usa "tú", sé amable
3. **Usa emojis con moderación** - 1-2 máximo
4. **Si no sabes algo**, di que Mateo lo explica mejor en la llamada

## EJEMPLOS

Usuario: "¿Cuánto cuesta una web?"
Tú: "Una web básica desde 790€, con reservas desde 990€. Incluye dominio y hosting 1 año. 😊 ¿Tienes alguna otra duda o seguimos con las preguntas del formulario?"

Usuario: "¿Hacéis chatbots?"  
Tú: "¡Sí! Chatbots para WhatsApp desde 300€ y para web desde 200€. Responden 24/7 y capturan leads automáticamente. ¿Quieres que te cuente más o seguimos?"

Usuario: "¿Hay algún descuento?"
Tú: "Al completar el formulario recibirás por email un código de 10% de descuento para tu primer proyecto. 🎁"

## PROHIBIDO

- NO digas que eres ChatGPT/OpenAI
- NO inventes datos que no estén aquí
- NO seas insistente ni agresiva con la venta

## DATOS EMPRESA
- Mateo, fundador de Neuriax (España)
- +34 640 791 041 | hola@neuriax.com
- Calendly: https://calendly.com/neuriax/30min`;

export async function POST(request: NextRequest) {
  try {
    const { messages, leadData } = await request.json();

    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      // Fallback to simple responses if no API key
      return NextResponse.json({
        message: "Gracias por tu mensaje. Para darte la mejor respuesta posible, te recomiendo agendar una llamada gratuita con Mateo donde podrá resolver todas tus dudas de forma personalizada.\n\n¿Seguimos con las preguntas para preparar esa llamada?",
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

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Cost-effective model with good quality
        messages: conversationHistory,
        max_tokens: 500,
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API error:', response.status, errorData);
      
      // Devolver mensaje más específico según el error
      if (response.status === 401) {
        return NextResponse.json({
          message: "Error de configuración del sistema. Por favor, contacta con nosotros directamente en hola@neuriax.com o llama al +34 640 791 041.",
          error: true
        });
      }
      if (response.status === 429) {
        return NextResponse.json({
          message: "Estamos recibiendo muchas consultas ahora mismo. ¿Puedes intentarlo en unos segundos?",
          error: true
        });
      }
      if (response.status === 402 || errorData?.error?.code === 'insufficient_quota') {
        return NextResponse.json({
          message: "El servicio de chat no está disponible temporalmente. Puedes contactarnos en hola@neuriax.com o agendar una llamada en https://calendly.com/neuriax/30min",
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
