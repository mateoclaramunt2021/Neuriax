import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

// Importar Resend solo si la API key existe
let resend: any = null;
if (process.env.RESEND_API_KEY) {
  const { Resend } = require('resend');
  resend = new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request: NextRequest) {
  try {
    const { nombre, email, telefono } = await request.json();

    // Validación básica
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    if (!nombre || nombre.trim().length < 2) {
      return NextResponse.json(
        { error: 'Nombre inválido' },
        { status: 400 }
      );
    }

    // 1. Guardar en Supabase
    const { data: insertedLead, error: dbError } = await supabase
      .from('lead_magnets')
      .insert([
        {
          email,
          nombre: nombre?.trim() || '',
          telefono: telefono?.trim() || '',
          created_at: new Date().toISOString(),
          source: 'lead_magnet_popup'
        }
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Error guardando en Supabase:', dbError);
      // No falles si hay error en DB, continúa con el email
    }

    // 2. Enviar email con Resend (si está configurado)
    if (resend) {
      try {
        // Email al lead con la guía
        const emailResult = await resend.emails.send({
          from: 'Neuriax <noreply@neuriax.com>',
          to: email,
          subject: '📋 Tu Guía Gratis: 7 Secretos de Automatización',
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <style>
                  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
                  .header h1 { margin: 0; font-size: 28px; }
                  .content { background: #f9fafb; padding: 30px; }
                  .benefits { margin: 20px 0; }
                  .benefit { margin: 12px 0; padding-left: 30px; position: relative; }
                  .benefit:before { content: "✓"; position: absolute; left: 0; color: #06b6d4; font-weight: bold; }
                  .cta { display: inline-block; background: linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%); color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 20px 0; font-weight: bold; }
                  .footer { background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; }
                  .footer a { color: #06b6d4; text-decoration: none; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>📋 Tu Guía Gratis Está Lista</h1>
                  </div>
                  <div class="content">
                    <p>¡Hola!</p>
                    <p>Muchas gracias por tu interés en automatizar tu negocio. Aquí tienes la <strong>guía completa: "7 Secretos de Automatización"</strong> que te mostrará cómo empresas están ahorrando +10 horas semanales.</p>
                    
                    <div class="benefits">
                      <div class="benefit">Paso a paso para empezar desde cero</div>
                      <div class="benefit">Errores comunes que debes evitar</div>
                      <div class="benefit">Cuánto cuesta realmente automatizar</div>
                      <div class="benefit">Herramientas recomendadas (con precios)</div>
                      <div class="benefit">Ejemplos reales de empresas que lo hicieron</div>
                    </div>

                    <p style="text-align: center;">
                      <a href="https://neuriax.com/guias/7-secretos-automatizacion.html" class="cta">📥 Descargar Guía</a>
                    </p>

                    <p><strong>¿No ves el enlace?</strong> Copia y pega en tu navegador:</p>
                    <p style="background: #e5e7eb; padding: 10px; border-radius: 4px; word-break: break-all; font-size: 12px;">
                      https://neuriax.com/guias/7-secretos-automatizacion.html
                    </p>

                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

                    <p>Si tienes preguntas sobre automatización o quieres una consulta personalizada, <a href="https://neuriax.com/contacto" style="color: #06b6d4; font-weight: bold;">contáctame aquí</a>.</p>

                    <p>¡A automatizar se ha dicho! 🚀</p>
                    <p>Mateo Claramunt<br><strong>Neuriax</strong></p>
                  </div>
                  <div class="footer">
                    <p>© 2026 Neuriax. Todos los derechos reservados.</p>
                    <p><a href="https://neuriax.com/politica-de-privacidad">Privacidad</a> • <a href="https://neuriax.com/condiciones-generales">Términos</a></p>
                    <p>Recibiste este email porque descargaste nuestra guía gratuita. <a href="https://neuriax.com/unsubscribe?email=${email}">Darse de baja</a></p>
                  </div>
                </div>
              </body>
            </html>
          `
        });

        if (emailResult.error) {
          console.error('Error enviando email con Resend:', emailResult.error);
        }

        // Email de notificación a Mateo - LEAD CALIENTE
        const notificationResult = await resend.emails.send({
          from: 'Neuriax Leads <noreply@neuriax.com>',
          to: 'mateoclaramunt2021@gmail.com',
          subject: '🔥 LEAD CALIENTE - Descarga Guía 7 Secretos',
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <style>
                  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; background: #f5f5f5; padding: 20px; }
                  .container { max-width: 500px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
                  .header { background: linear-gradient(135deg, #ef4444 0%, #f97316 100%); color: white; padding: 25px; text-align: center; }
                  .header h1 { margin: 0; font-size: 24px; }
                  .content { padding: 30px; }
                  .field { margin-bottom: 20px; padding: 15px; background: #f9fafb; border-radius: 8px; border-left: 4px solid #06b6d4; }
                  .field-label { font-size: 12px; text-transform: uppercase; color: #6b7280; margin-bottom: 5px; }
                  .field-value { font-size: 18px; font-weight: 600; color: #111827; }
                  .cta { display: block; text-align: center; background: #25d366; color: white; padding: 15px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px; }
                  .cta:hover { background: #128c7e; }
                  .footer { padding: 20px; text-align: center; font-size: 12px; color: #6b7280; background: #f9fafb; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>🔥 Nuevo Lead Caliente</h1>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">Descargó la guía de 7 secretos</p>
                  </div>
                  <div class="content">
                    <div class="field">
                      <div class="field-label">Nombre</div>
                      <div class="field-value">${nombre || 'No proporcionado'}</div>
                    </div>
                    <div class="field">
                      <div class="field-label">Email</div>
                      <div class="field-value">${email}</div>
                    </div>
                    <div class="field">
                      <div class="field-label">Teléfono</div>
                      <div class="field-value">${telefono || 'No proporcionado'}</div>
                    </div>
                    <a href="https://wa.me/${(telefono || '').replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(nombre || '')},%20vi%20que%20descargaste%20la%20guía%20de%20automatización.%20¿Te%20gustaría%20agendar%20una%20llamada%20gratuita?" class="cta">
                      💬 Contactar por WhatsApp
                    </a>
                  </div>
                  <div class="footer">
                    <p>Lead capturado el ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}</p>
                    <p>Fuente: Lead Magnet Popup - 7 Secretos de Automatización</p>
                  </div>
                </div>
              </body>
            </html>
          `
        });

        if (notificationResult.error) {
          console.error('Error enviando notificación a Mateo:', notificationResult.error);
        }
      } catch (emailError) {
        console.error('Error en envío de email:', emailError);
        // Continuar aunque falle el email
      }
    } else {
      console.log('RESEND_API_KEY no configurada. Email no enviado. Registrando en logs:', email);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Email capturado y guía enviada',
        leadId: insertedLead?.id
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error en lead magnet API:', error);
    return NextResponse.json(
      { error: 'Error procesando solicitud' },
      { status: 500 }
    );
  }
}
