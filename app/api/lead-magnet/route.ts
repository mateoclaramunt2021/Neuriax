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
    const { email } = await request.json();

    // Validación básica
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // 1. Guardar en Supabase
    const { data: insertedLead, error: dbError } = await supabase
      .from('lead_magnets')
      .insert([
        {
          email,
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
