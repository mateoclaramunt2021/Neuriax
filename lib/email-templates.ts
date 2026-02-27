// ============================================
// Secuencia de 15 emails automáticos - Neuriax
// Se envían cada 2 días durante 30 días
// ============================================

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://neuriax.com';
const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/neuriax/30min';

export interface EmailTemplate {
  number: number;
  subject: string;
  getHtml: (nombre: string, unsubscribeUrl: string) => string;
  guideUrl: string;
  guideTitle: string;
}

function emailWrapper(nombre: string, content: string, guideUrl: string, guideTitle: string, unsubscribeUrl: string): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background: #f1f5f9; font-family: 'Segoe UI', Arial, sans-serif;">
<div style="max-width: 600px; margin: 0 auto; background: #ffffff;">
  
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #0f172a, #1e293b); padding: 30px 40px; text-align: center;">
    <h1 style="color: #06b6d4; font-size: 28px; margin: 0; font-weight: 800; letter-spacing: -0.5px;">Neuriax</h1>
    <p style="color: #94a3b8; font-size: 13px; margin: 8px 0 0 0;">Automatización inteligente para tu negocio</p>
  </div>

  <!-- Body -->
  <div style="padding: 40px;">
    <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
      Hola <strong style="color: #0f172a;">${nombre}</strong>,
    </p>
    
    ${content}
    
    <!-- Guide CTA -->
    <div style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 12px; padding: 30px; margin: 30px 0; text-align: center;">
      <p style="color: #94a3b8; font-size: 13px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">📚 Tu guía de hoy</p>
      <h3 style="color: #ffffff; font-size: 18px; margin: 0 0 16px 0;">${guideTitle}</h3>
      <a href="${guideUrl}" style="display: inline-block; background: linear-gradient(135deg, #06b6d4, #3b82f6); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 700; font-size: 15px;">
        Descargar guía gratuita →
      </a>
    </div>

    <!-- Calendly CTA -->
    <div style="background: #f0fdfa; border: 2px solid #06b6d4; border-radius: 12px; padding: 24px; text-align: center; margin: 20px 0;">
      <p style="color: #0f172a; font-size: 15px; margin: 0 0 12px 0; font-weight: 600;">
        ¿Quieres implementar esto en tu negocio?
      </p>
      <a href="${CALENDLY_URL}" style="display: inline-block; background: #0f172a; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 14px;">
        📅 Agendar llamada gratuita
      </a>
    </div>

    <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0;">
      Un saludo,<br>
      <strong style="color: #0f172a;">Mateo — Neuriax</strong>
    </p>
  </div>

  <!-- Footer -->
  <div style="background: #f8fafc; padding: 24px 40px; border-top: 1px solid #e2e8f0; text-align: center;">
    <p style="color: #94a3b8; font-size: 12px; margin: 0 0 8px 0;">
      © 2026 Neuriax · <a href="${SITE_URL}" style="color: #06b6d4; text-decoration: none;">neuriax.com</a>
    </p>
    <p style="color: #94a3b8; font-size: 11px; margin: 0;">
      <a href="${unsubscribeUrl}" style="color: #94a3b8; text-decoration: underline;">Darme de baja de estos emails</a>
    </p>
  </div>
</div>
</body>
</html>`;
}

export const EMAIL_SEQUENCE: EmailTemplate[] = [
  // ========== EMAIL 1 - DÍA 0 (inmediato) ==========
  {
    number: 1,
    subject: '¡Bienvenido/a! Tu primera guía gratuita 🎁',
    guideUrl: `${SITE_URL}/guias/guia-01-automatizaciones-negocio.html`,
    guideTitle: '10 Automatizaciones que Todo Negocio Necesita en 2026',
    getHtml: (nombre, unsubscribeUrl) => emailWrapper(nombre, `
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        ¡Gracias por confiar en Neuriax! 🎉
      </p>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        Durante los próximos 30 días vas a recibir <strong>15 guías gratuitas</strong> con todo lo que necesitas saber sobre automatización, IA y digitalización para tu negocio.
      </p>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        Cada 2 días recibirás un email con contenido práctico y una guía descargable. <strong>Sin spam, solo valor real.</strong>
      </p>
      <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 24px 0;">
        <p style="color: #1e40af; font-size: 14px; margin: 0; font-weight: 600;">📋 Lo que vas a recibir:</p>
        <ul style="color: #334155; font-size: 14px; margin: 12px 0 0 0; padding-left: 20px; line-height: 1.8;">
          <li>Guías prácticas de automatización</li>
          <li>Herramientas gratuitas recomendadas</li>
          <li>Casos de éxito y datos reales</li>
          <li>Plan de acción paso a paso</li>
          <li>Oferta exclusiva al final de la secuencia</li>
        </ul>
      </div>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        Empezamos con la primera guía: <strong>10 automatizaciones imprescindibles</strong> que cualquier negocio puede implementar hoy mismo.
      </p>
    `, `${SITE_URL}/guias/guia-01-automatizaciones-negocio.html`, '10 Automatizaciones que Todo Negocio Necesita en 2026', unsubscribeUrl),
  },

  // ========== EMAIL 2 - DÍA 2 ==========
  {
    number: 2,
    subject: '¿Sabías que pierdes 20h/semana en tareas manuales? 🤖',
    guideUrl: `${SITE_URL}/guias/guia-02-ahorro-tiempo-ia.html`,
    guideTitle: 'Cómo la IA Te Ahorra 20 Horas Semanales',
    getHtml: (nombre, unsubscribeUrl) => emailWrapper(nombre, `
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        Un estudio de McKinsey reveló que el <strong>60% del tiempo</strong> de un profesional se dedica a tareas que podrían automatizarse. Eso son unas <strong>20 horas semanales</strong>.
      </p>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        Imagina qué harías con 20 horas extra cada semana: más clientes, más ingresos, o simplemente más tiempo para ti.
      </p>
      <div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 24px 0;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr style="border-bottom: 1px solid #dcfce7;">
            <td style="padding: 10px; color: #166534; font-weight: 600;">📧 Emails</td>
            <td style="padding: 10px; color: #dc2626; text-align: center;">5h/sem</td>
            <td style="padding: 10px; color: #16a34a; text-align: center; font-weight: 700;">→ 30 min</td>
          </tr>
          <tr style="border-bottom: 1px solid #dcfce7;">
            <td style="padding: 10px; color: #166534; font-weight: 600;">📅 Agendar citas</td>
            <td style="padding: 10px; color: #dc2626; text-align: center;">3h/sem</td>
            <td style="padding: 10px; color: #16a34a; text-align: center; font-weight: 700;">→ 0h</td>
          </tr>
          <tr style="border-bottom: 1px solid #dcfce7;">
            <td style="padding: 10px; color: #166534; font-weight: 600;">📊 Reportes</td>
            <td style="padding: 10px; color: #dc2626; text-align: center;">3h/sem</td>
            <td style="padding: 10px; color: #16a34a; text-align: center; font-weight: 700;">→ 30 min</td>
          </tr>
          <tr>
            <td style="padding: 10px; color: #166534; font-weight: 600;">💬 Soporte</td>
            <td style="padding: 10px; color: #dc2626; text-align: center;">5h/sem</td>
            <td style="padding: 10px; color: #16a34a; text-align: center; font-weight: 700;">→ 1h</td>
          </tr>
        </table>
      </div>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        En la guía de hoy te explicamos exactamente cómo conseguirlo con herramientas que ya existen.
      </p>
    `, `${SITE_URL}/guias/guia-02-ahorro-tiempo-ia.html`, 'Cómo la IA Te Ahorra 20 Horas Semanales', unsubscribeUrl),
  },

  // ========== EMAIL 3 - DÍA 4 ==========
  {
    number: 3,
    subject: 'Tu competencia ya usa chatbots. ¿Y tú? 💬',
    guideUrl: `${SITE_URL}/guias/guia-03-chatbots-ventas.html`,
    guideTitle: 'Chatbots que Venden: Guía Práctica',
    getHtml: (nombre, unsubscribeUrl) => emailWrapper(nombre, `
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        El <strong>67% de los consumidores</strong> han interactuado con un chatbot en el último año. Y los negocios que los usan reportan un <strong>aumento del 35% en ventas</strong>.
      </p>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        Un chatbot bien configurado puede:
      </p>
      <ul style="color: #334155; font-size: 15px; line-height: 1.8; padding-left: 20px;">
        <li>💰 <strong>Vender 24/7</strong> sin que tengas que estar presente</li>
        <li>🎯 <strong>Filtrar leads</strong> automáticamente por calidad</li>
        <li>📅 <strong>Agendar citas</strong> directamente en tu calendario</li>
        <li>❓ <strong>Resolver dudas</strong> frecuentes al instante</li>
      </ul>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        La guía de hoy te muestra cómo implementar uno paso a paso, incluso sin conocimientos técnicos.
      </p>
    `, `${SITE_URL}/guias/guia-03-chatbots-ventas.html`, 'Chatbots que Venden: Guía Práctica', unsubscribeUrl),
  },

  // ========== EMAIL 4 - DÍA 6 ==========
  {
    number: 4,
    subject: 'Calcula cuánto dinero pierdes sin automatizar 💰',
    guideUrl: `${SITE_URL}/guias/guia-04-roi-automatizacion.html`,
    guideTitle: 'Calcula el ROI de Automatizar Tu Negocio',
    getHtml: (nombre, unsubscribeUrl) => emailWrapper(nombre, `
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        La mayoría de negocios no automatizan porque piensan que es caro. La realidad es que <strong>no automatizar es mucho más caro</strong>.
      </p>
      <div style="background: #fef2f2; border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center;">
        <p style="color: #991b1b; font-size: 14px; margin: 0 0 8px 0;">El coste de NO automatizar:</p>
        <p style="color: #dc2626; font-size: 36px; font-weight: 800; margin: 0;">~24.000€/año</p>
        <p style="color: #991b1b; font-size: 13px; margin: 8px 0 0 0;">en horas perdidas y oportunidades desaprovechadas</p>
      </div>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        En la guía de hoy te enseñamos a calcular exactamente cuánto te cuesta no automatizar, con ejemplos reales por sector: restaurantes, clínicas, inmobiliarias...
      </p>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        <strong>Spoiler:</strong> la inversión se recupera en menos de 2 meses en la mayoría de casos.
      </p>
    `, `${SITE_URL}/guias/guia-04-roi-automatizacion.html`, 'Calcula el ROI de Automatizar Tu Negocio', unsubscribeUrl),
  },

  // ========== EMAIL 5 - DÍA 8 ==========
  {
    number: 5,
    subject: '5 negocios que triplicaron ventas automatizando 🚀',
    guideUrl: `${SITE_URL}/guias/guia-05-casos-exito.html`,
    guideTitle: '5 Casos de Éxito: De 0 a Automatizado',
    getHtml: (nombre, unsubscribeUrl) => emailWrapper(nombre, `
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        Nada mejor que ver <strong>resultados reales</strong>. Hoy te traemos 5 casos de negocios que transformaron sus operaciones con automatización.
      </p>
      <div style="margin: 24px 0;">
        <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 12px; border-left: 4px solid #06b6d4;">
          <p style="margin: 0; font-size: 14px;"><strong>🍽️ Cadena de restaurantes:</strong> <span style="color: #16a34a;">-30% no-shows, +45% reservas online</span></p>
        </div>
        <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 12px; border-left: 4px solid #3b82f6;">
          <p style="margin: 0; font-size: 14px;"><strong>🏠 Inmobiliaria:</strong> <span style="color: #16a34a;">2x operaciones cerradas, -60% tiempo en seguimiento</span></p>
        </div>
        <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 12px; border-left: 4px solid #8b5cf6;">
          <p style="margin: 0; font-size: 14px;"><strong>🦷 Clínica dental:</strong> <span style="color: #16a34a;">+40% citas, recordatorios automáticos</span></p>
        </div>
        <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 12px; border-left: 4px solid #f59e0b;">
          <p style="margin: 0; font-size: 14px;"><strong>🛒 E-commerce:</strong> <span style="color: #16a34a;">+55% recuperación de carritos abandonados</span></p>
        </div>
        <div style="background: #f8fafc; border-radius: 8px; padding: 16px; border-left: 4px solid #10b981;">
          <p style="margin: 0; font-size: 14px;"><strong>⚖️ Despacho de abogados:</strong> <span style="color: #16a34a;">3x leads, -70% tiempo administrativo</span></p>
        </div>
      </div>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        En la guía de hoy verás el detalle completo: qué tenían antes, qué implementaron y los resultados exactos.
      </p>
    `, `${SITE_URL}/guias/guia-05-casos-exito.html`, '5 Casos de Éxito: De 0 a Automatizado', unsubscribeUrl),
  },

  // ========== EMAIL 6 - DÍA 10 ==========
  {
    number: 6,
    subject: 'Email marketing automático: vende mientras duermes 📧',
    guideUrl: `${SITE_URL}/guias/guia-06-email-marketing-automatico.html`,
    guideTitle: 'Email Marketing Automático para PYMEs',
    getHtml: (nombre, unsubscribeUrl) => emailWrapper(nombre, `
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        ¿Sabías que el email marketing tiene un <strong>ROI del 4.200%</strong>? Por cada euro invertido, recuperas 42€ de media.
      </p>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        Y lo mejor: se puede automatizar al 100%. Configuras las secuencias una vez y <strong>trabajan para ti las 24 horas</strong>.
      </p>
      <div style="background: #eff6ff; border-radius: 12px; padding: 20px; margin: 24px 0;">
        <p style="color: #1e40af; font-size: 14px; margin: 0 0 12px 0; font-weight: 700;">5 secuencias que deberías tener:</p>
        <p style="color: #334155; font-size: 14px; margin: 4px 0;">1️⃣ <strong>Bienvenida</strong> — Primera impresión impecable</p>
        <p style="color: #334155; font-size: 14px; margin: 4px 0;">2️⃣ <strong>Nurturing</strong> — Educas y generas confianza</p>
        <p style="color: #334155; font-size: 14px; margin: 4px 0;">3️⃣ <strong>Re-engagement</strong> — Reactiva contactos dormidos</p>
        <p style="color: #334155; font-size: 14px; margin: 4px 0;">4️⃣ <strong>Post-venta</strong> — Fideliza y genera reseñas</p>
        <p style="color: #334155; font-size: 14px; margin: 4px 0;">5️⃣ <strong>Carrito abandonado</strong> — Recupera ventas perdidas</p>
      </div>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        Ironía: este email que estás leyendo es exactamente eso — email marketing automático. Y funciona. 😉
      </p>
    `, `${SITE_URL}/guias/guia-06-email-marketing-automatico.html`, 'Email Marketing Automático para PYMEs', unsubscribeUrl),
  },

  // ========== EMAIL 7 - DÍA 12 ==========
  {
    number: 7,
    subject: 'Tu web puede generar leads 24/7 (así se hace) 🌐',
    guideUrl: `${SITE_URL}/guias/guia-07-webs-generan-clientes.html`,
    guideTitle: 'Webs que Generan Clientes en Piloto Automático',
    getHtml: (nombre, unsubscribeUrl) => emailWrapper(nombre, `
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        El <strong>90% de las webs de PYMEs</strong> son folletos digitales: bonitas pero que no generan ni un solo lead.
      </p>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        Una web profesional debería ser tu <strong>mejor vendedor</strong>: trabaja 24/7, no pide vacaciones y nunca tiene un mal día.
      </p>
      <div style="background: #fefce8; border-radius: 12px; padding: 20px; margin: 24px 0;">
        <p style="color: #854d0e; font-size: 14px; margin: 0 0 12px 0; font-weight: 700;">⚡ Los 7 elementos que tu web necesita:</p>
        <p style="color: #334155; font-size: 14px; margin: 4px 0;">✅ Hero claro con propuesta de valor</p>
        <p style="color: #334155; font-size: 14px; margin: 4px 0;">✅ Prueba social (testimonios, logos)</p>
        <p style="color: #334155; font-size: 14px; margin: 4px 0;">✅ CTAs visibles en toda la página</p>
        <p style="color: #334155; font-size: 14px; margin: 4px 0;">✅ Chat en vivo o chatbot</p>
        <p style="color: #334155; font-size: 14px; margin: 4px 0;">✅ Formulario inteligente</p>
        <p style="color: #334155; font-size: 14px; margin: 4px 0;">✅ Velocidad de carga &lt;3 segundos</p>
        <p style="color: #334155; font-size: 14px; margin: 4px 0;">✅ SEO básico implementado</p>
      </div>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        ¿Cuántos cumple tu web? La guía de hoy incluye un checklist completo para evaluarla.
      </p>
    `, `${SITE_URL}/guias/guia-07-webs-generan-clientes.html`, 'Webs que Generan Clientes en Piloto Automático', unsubscribeUrl),
  },

  // ========== EMAIL 8 - DÍA 14 ==========
  {
    number: 8,
    subject: 'WhatsApp Business + IA = tu mejor vendedor 📱',
    guideUrl: `${SITE_URL}/guias/guia-08-whatsapp-business-ia.html`,
    guideTitle: 'WhatsApp Business + IA: Tu Mejor Vendedor',
    getHtml: (nombre, unsubscribeUrl) => emailWrapper(nombre, `
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        WhatsApp es la app más usada en España. <strong>El 98% de los mensajes se leen</strong> (vs 20% de los emails).
      </p>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        Ahora imagina conectar WhatsApp con <strong>inteligencia artificial</strong>:
      </p>
      <ul style="color: #334155; font-size: 15px; line-height: 1.8; padding-left: 20px;">
        <li>🤖 Respuestas automáticas inteligentes 24/7</li>
        <li>📋 Catálogo de productos dentro del chat</li>
        <li>📅 Agendamiento de citas automático</li>
        <li>🔄 Seguimiento post-venta sin esfuerzo</li>
        <li>📊 Todo integrado con tu CRM</li>
      </ul>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        La guía de hoy te muestra el flujo completo paso a paso, con ejemplos por sector.
      </p>
    `, `${SITE_URL}/guias/guia-08-whatsapp-business-ia.html`, 'WhatsApp Business + IA: Tu Mejor Vendedor', unsubscribeUrl),
  },

  // ========== EMAIL 9 - DÍA 16 ==========
  {
    number: 9,
    subject: 'SEO local: que te encuentren los que te necesitan 📍',
    guideUrl: `${SITE_URL}/guias/guia-09-seo-local-negocios.html`,
    guideTitle: 'SEO Local: Que Te Encuentren los que Te Necesitan',
    getHtml: (nombre, unsubscribeUrl) => emailWrapper(nombre, `
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        El <strong>46% de todas las búsquedas en Google</strong> son locales: "dentista cerca de mí", "restaurante en [ciudad]"...
      </p>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        Si tu negocio no aparece en esas búsquedas, estás regalando clientes a tu competencia.
      </p>
      <div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 24px 0;">
        <p style="color: #166534; font-size: 14px; margin: 0 0 12px 0; font-weight: 700;">📍 Las 5 señales que Google usa para el ranking local:</p>
        <p style="color: #334155; font-size: 14px; margin: 6px 0;">1. Google Business Profile optimizado</p>
        <p style="color: #334155; font-size: 14px; margin: 6px 0;">2. Reseñas y valoraciones</p>
        <p style="color: #334155; font-size: 14px; margin: 6px 0;">3. Consistencia NAP (Nombre, Dirección, Teléfono)</p>
        <p style="color: #334155; font-size: 14px; margin: 6px 0;">4. Proximidad al buscador</p>
        <p style="color: #334155; font-size: 14px; margin: 6px 0;">5. Contenido localizado en tu web</p>
      </div>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        La guía incluye un checklist de 15 puntos para dominar el SEO local de tu zona.
      </p>
    `, `${SITE_URL}/guias/guia-09-seo-local-negocios.html`, 'SEO Local: Que Te Encuentren los que Te Necesitan', unsubscribeUrl),
  },

  // ========== EMAIL 10 - DÍA 18 ==========
  {
    number: 10,
    subject: 'CRM gratis: organiza tus clientes sin gastar 📋',
    guideUrl: `${SITE_URL}/guias/guia-10-crm-gratuito-automatizacion.html`,
    guideTitle: 'CRM Gratuito + Automatización',
    getHtml: (nombre, unsubscribeUrl) => emailWrapper(nombre, `
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        Si todavía gestionas tus clientes con un Excel, una libreta o "de cabeza"... estás perdiendo dinero.
      </p>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        Un CRM (Customer Relationship Management) te permite <strong>saber exactamente en qué punto está cada cliente</strong> y automatizar el seguimiento.
      </p>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        Y lo mejor: <strong>hay opciones 100% gratuitas</strong> que funcionan de maravilla para PYMEs.
      </p>
      <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 24px 0;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr style="background: #0f172a; color: white;">
            <td style="padding: 10px; border-radius: 6px 0 0 0; font-weight: 700;">CRM</td>
            <td style="padding: 10px; font-weight: 700; text-align: center;">Gratis</td>
            <td style="padding: 10px; border-radius: 0 6px 0 0; font-weight: 700; text-align: center;">Ideal para</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 10px;">HubSpot</td>
            <td style="padding: 10px; text-align: center;">✅</td>
            <td style="padding: 10px; text-align: center;">Completo</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 10px;">Zoho CRM</td>
            <td style="padding: 10px; text-align: center;">✅</td>
            <td style="padding: 10px; text-align: center;">Versatilidad</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 10px;">Notion</td>
            <td style="padding: 10px; text-align: center;">✅</td>
            <td style="padding: 10px; text-align: center;">Personalización</td>
          </tr>
          <tr>
            <td style="padding: 10px;">Google Sheets</td>
            <td style="padding: 10px; text-align: center;">✅</td>
            <td style="padding: 10px; text-align: center;">Simplicidad</td>
          </tr>
        </table>
      </div>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        La guía compara las mejores opciones y te enseña cómo elegir la correcta.
      </p>
    `, `${SITE_URL}/guias/guia-10-crm-gratuito-automatizacion.html`, 'CRM Gratuito + Automatización', unsubscribeUrl),
  },

  // ========== EMAIL 11 - DÍA 20 ==========
  {
    number: 11,
    subject: 'Facturación y cobros automáticos (adiós Excel) 🧾',
    guideUrl: `${SITE_URL}/guias/guia-11-automatiza-facturacion.html`,
    guideTitle: 'Automatiza Tu Facturación y Cobros',
    getHtml: (nombre, unsubscribeUrl) => emailWrapper(nombre, `
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        ¿Cuánto tiempo pierdes cada mes haciendo facturas, enviando recordatorios de pago y conciliando cuentas?
      </p>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        El flujo ideal es automático:
      </p>
      <div style="text-align: center; margin: 24px 0;">
        <div style="display: inline-block; background: #eff6ff; border-radius: 8px; padding: 12px 20px; margin: 4px; font-size: 14px; color: #1e40af; font-weight: 600;">📋 Presupuesto</div>
        <span style="color: #94a3b8; font-size: 20px;">→</span>
        <div style="display: inline-block; background: #f0fdf4; border-radius: 8px; padding: 12px 20px; margin: 4px; font-size: 14px; color: #166534; font-weight: 600;">🧾 Factura auto</div>
        <span style="color: #94a3b8; font-size: 20px;">→</span>
        <div style="display: inline-block; background: #fef3c7; border-radius: 8px; padding: 12px 20px; margin: 4px; font-size: 14px; color: #92400e; font-weight: 600;">💳 Cobro</div>
        <span style="color: #94a3b8; font-size: 20px;">→</span>
        <div style="display: inline-block; background: #fce7f3; border-radius: 8px; padding: 12px 20px; margin: 4px; font-size: 14px; color: #9d174d; font-weight: 600;">⏰ Recordatorio</div>
      </div>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        Todo sin tocar un solo botón. La guía de hoy te muestra cómo configurarlo con herramientas accesibles.
      </p>
    `, `${SITE_URL}/guias/guia-11-automatiza-facturacion.html`, 'Automatiza Tu Facturación y Cobros', unsubscribeUrl),
  },

  // ========== EMAIL 12 - DÍA 22 ==========
  {
    number: 12,
    subject: 'Redes sociales en piloto automático 📲',
    guideUrl: `${SITE_URL}/guias/guia-12-redes-sociales-automatizadas.html`,
    guideTitle: 'Redes Sociales en Piloto Automático',
    getHtml: (nombre, unsubscribeUrl) => emailWrapper(nombre, `
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        Publicar en redes sociales es importante. Pero hacerlo manualmente todos los días es un <strong>sumidero de tiempo</strong>.
      </p>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        Con las herramientas adecuadas puedes:
      </p>
      <ul style="color: #334155; font-size: 15px; line-height: 1.8; padding-left: 20px;">
        <li>📅 Programar un mes entero de contenido en 2 horas</li>
        <li>🤖 Usar IA para generar ideas, textos e imágenes</li>
        <li>📊 Automatizar reportes de rendimiento</li>
        <li>🔄 Reutilizar contenido entre plataformas</li>
        <li>💬 Responder comentarios con plantillas inteligentes</li>
      </ul>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        La guía incluye un calendario editorial descargable y comparativa de herramientas gratuitas.
      </p>
    `, `${SITE_URL}/guias/guia-12-redes-sociales-automatizadas.html`, 'Redes Sociales en Piloto Automático', unsubscribeUrl),
  },

  // ========== EMAIL 13 - DÍA 24 ==========
  {
    number: 13,
    subject: 'Cómo elegir la tecnología correcta para tu negocio 🔧',
    guideUrl: `${SITE_URL}/guias/guia-13-mapa-tecnologico-pymes.html`,
    guideTitle: 'Mapa Tecnológico para PYMEs 2026',
    getHtml: (nombre, unsubscribeUrl) => emailWrapper(nombre, `
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        Hay miles de herramientas digitales. Elegir las correctas puede ser abrumador. Pero no tiene por qué serlo.
      </p>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        La guía de hoy es un <strong>mapa tecnológico organizado por presupuesto</strong>:
      </p>
      <div style="margin: 24px 0;">
        <div style="background: #f0fdf4; border-radius: 8px; padding: 16px; margin-bottom: 8px;">
          <p style="margin: 0; font-size: 14px;"><strong style="color: #16a34a;">💚 0€/mes</strong> — Herramientas gratuitas que cubren lo básico</p>
        </div>
        <div style="background: #eff6ff; border-radius: 8px; padding: 16px; margin-bottom: 8px;">
          <p style="margin: 0; font-size: 14px;"><strong style="color: #2563eb;">💙 ~500€/mes</strong> — Stack profesional para crecer</p>
        </div>
        <div style="background: #faf5ff; border-radius: 8px; padding: 16px;">
          <p style="margin: 0; font-size: 14px;"><strong style="color: #7c3aed;">💜 ~2.000€/mes</strong> — Suite empresarial completa</p>
        </div>
      </div>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        Incluye recomendaciones específicas para web, email, CRM, contabilidad, RRSS y automatización. Sin humo, solo lo que funciona.
      </p>
    `, `${SITE_URL}/guias/guia-13-mapa-tecnologico-pymes.html`, 'Mapa Tecnológico para PYMEs 2026', unsubscribeUrl),
  },

  // ========== EMAIL 14 - DÍA 26 ==========
  {
    number: 14,
    subject: 'Tu plan de acción: automatiza en 30 días 📆',
    guideUrl: `${SITE_URL}/guias/guia-14-plan-accion-30-dias.html`,
    guideTitle: 'Plan de Acción: Automatiza en 30 Días',
    getHtml: (nombre, unsubscribeUrl) => emailWrapper(nombre, `
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        Has aprendido mucho en estas semanas. Ahora toca <strong>pasar a la acción</strong>.
      </p>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        La guía de hoy es un plan detallado semana a semana:
      </p>
      <div style="margin: 24px 0;">
        <div style="border-left: 4px solid #06b6d4; padding: 12px 16px; margin-bottom: 12px;">
          <p style="margin: 0; font-size: 14px;"><strong style="color: #06b6d4;">Semana 1:</strong> Auditoría de procesos y priorización</p>
        </div>
        <div style="border-left: 4px solid #3b82f6; padding: 12px 16px; margin-bottom: 12px;">
          <p style="margin: 0; font-size: 14px;"><strong style="color: #3b82f6;">Semana 2:</strong> Email marketing y CRM</p>
        </div>
        <div style="border-left: 4px solid #8b5cf6; padding: 12px 16px; margin-bottom: 12px;">
          <p style="margin: 0; font-size: 14px;"><strong style="color: #8b5cf6;">Semana 3:</strong> Web optimizada y chatbot</p>
        </div>
        <div style="border-left: 4px solid #10b981; padding: 12px 16px;">
          <p style="margin: 0; font-size: 14px;"><strong style="color: #10b981;">Semana 4:</strong> Integración, medición y optimización</p>
        </div>
      </div>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        Incluye checklist diario, plantillas y todo lo que necesitas para transformar tu negocio en 30 días.
      </p>
    `, `${SITE_URL}/guias/guia-14-plan-accion-30-dias.html`, 'Plan de Acción: Automatiza en 30 Días', unsubscribeUrl),
  },

  // ========== EMAIL 15 - DÍA 28 (ÚLTIMO) ==========
  {
    number: 15,
    subject: '🎯 Última guía + oferta exclusiva solo para ti',
    guideUrl: `${SITE_URL}/guias/guia-15-checklist-final.html`,
    guideTitle: 'Checklist Final de Automatización + Oferta Especial',
    getHtml: (nombre, unsubscribeUrl) => emailWrapper(nombre, `
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        ¡Llegamos al final! 🎉 Has recibido <strong>15 guías completas</strong> sobre automatización, IA y digitalización.
      </p>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        La guía final incluye un <strong>checklist de 30 puntos</strong> para evaluar el estado de automatización de tu negocio, y un resumen de todo lo aprendido.
      </p>
      
      <div style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 16px; padding: 32px; margin: 30px 0; text-align: center; border: 2px solid #06b6d4;">
        <p style="color: #94a3b8; font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 2px;">🎁 Oferta exclusiva</p>
        <p style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 0 0 8px 0;">15% de descuento</p>
        <p style="color: #06b6d4; font-size: 16px; margin: 0 0 16px 0;">en cualquier servicio de Neuriax</p>
        <div style="background: rgba(6, 182, 212, 0.1); border: 2px dashed #06b6d4; border-radius: 8px; padding: 12px; display: inline-block; margin-bottom: 16px;">
          <span style="color: #06b6d4; font-size: 28px; font-weight: 800; letter-spacing: 4px;">GUIAS15</span>
        </div>
        <p style="color: #64748b; font-size: 13px; margin: 0;">Válido durante los próximos 15 días</p>
      </div>

      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        ${nombre}, ha sido un placer acompañarte durante este mes. Si quieres dar el paso y automatizar tu negocio, estamos aquí para ayudarte.
      </p>
      <p style="color: #334155; font-size: 16px; line-height: 1.7;">
        <strong>Solo tienes que agendar una llamada gratuita</strong> y te contamos cómo podemos ayudarte con tu caso concreto.
      </p>
    `, `${SITE_URL}/guias/guia-15-checklist-final.html`, 'Checklist Final de Automatización + Oferta Especial', unsubscribeUrl),
  },
];

// Obtener el template de email por número
export function getEmailTemplate(emailNumber: number): EmailTemplate | null {
  return EMAIL_SEQUENCE.find(t => t.number === emailNumber) || null;
}
