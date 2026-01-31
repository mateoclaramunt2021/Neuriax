import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { checkRateLimit, getClientIP, rateLimitExceededResponse, RATE_LIMIT_CONFIGS } from '@/lib/rate-limit';

const resend = new Resend('re_SkvxdW82_ChjGZRx157xETMZ3ejJfYCg9');

const supabase = createClient(
  'https://wfnaknuhwzmkriaetvtn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmbmFrbnVod3pta3JpYWV0dnRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODA1OTMwMCwiZXhwIjoyMDgzNjM1MzAwfQ.CQ4Gm1k_eZ3Pn5TGQRbPblL_sRp9gahQubIUiytUdlE'
);

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - máximo 3 requests por minuto para formularios de contacto
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(`send-email:${clientIP}`, RATE_LIMIT_CONFIGS.contact);
    
    if (!rateLimit.allowed) {
      return rateLimitExceededResponse(rateLimit.resetIn);
    }

    // Detectar el tipo de contenido para manejar JSON o FormData
    const contentType = request.headers.get('content-type') || '';
    
    // ========== FORMULARIO DE CONTACTO (JSON) ==========
    if (contentType.includes('application/json')) {
      const jsonData = await request.json();
      
      // ========== FORMULARIO DE DEMO LANDING ==========
      if (jsonData.tipo === 'demo-landing') {
        const { 
          nombre, email, telefono, 
          nombreEmpresa, sector, urlActual,
          objetivo, servicioDestacado, colorPreferido, competencia, comentarios 
        } = jsonData;

        // Validar datos del formulario
        if (!nombre || !email || !nombreEmpresa || !sector || !objetivo || !servicioDestacado) {
          return NextResponse.json(
            { error: 'Faltan campos requeridos' },
            { status: 400 }
          );
        }

        // Guardar en Supabase (tabla contacts)
        const { error: dbError } = await supabase.from('contacts').insert({
          nombre,
          email,
          telefono: telefono || null,
          empresa: nombreEmpresa,
          sector: sector,
          mensaje: `DEMO LANDING REQUEST\n\nObjetivo: ${objetivo}\nServicio destacado: ${servicioDestacado}\nColor preferido: ${colorPreferido || 'No especificado'}\nWeb actual: ${urlActual || 'No tiene'}\nCompetencia: ${competencia || 'No especificada'}\nComentarios: ${comentarios || 'Sin comentarios'}`,
          tipo: 'demo-landing',
          leido: false
        });

        if (dbError) {
          console.error('Error guardando solicitud demo landing:', dbError);
        }

        // Enviar email de notificación a Mateo
        const { data: emailData, error: emailError } = await resend.emails.send({
          from: 'Neuriax <hola@neuriax.com>',
          to: 'mateoclaramunt2021@gmail.com',
          subject: `🎨 NUEVA DEMO LANDING: ${nombreEmpresa} (${sector})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 20px;">
              <div style="background: linear-gradient(135deg, #f59e0b, #ef4444); padding: 30px; border-radius: 12px 12px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 24px;">🎨 Nueva Solicitud de Demo Landing</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">¡Tienes 48h para crear la demo!</p>
              </div>
              
              <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
                <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                  <p style="margin: 0; color: #92400e; font-weight: bold;">⏰ Recuerda: Demo prometida en 48 horas</p>
                </div>
                
                <h3 style="color: #374151; margin-top: 0;">📋 Datos del cliente</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;"><strong>👤 Nombre:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${nombre}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;"><strong>📧 Email:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;"><a href="mailto:${email}">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;"><strong>📞 Teléfono:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${telefono || 'No proporcionado'}</td>
                  </tr>
                </table>
                
                <h3 style="color: #374151; margin-top: 25px;">🏢 Datos de la empresa</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;"><strong>Empresa:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${nombreEmpresa}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;"><strong>Sector:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${sector}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;"><strong>Web actual:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${urlActual ? `<a href="${urlActual}">${urlActual}</a>` : 'No tiene'}</td>
                  </tr>
                </table>
                
                <h3 style="color: #374151; margin-top: 25px;">🎯 Detalles del proyecto</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;"><strong>Objetivo:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${objetivo}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;"><strong>Servicio destacado:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${servicioDestacado}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;"><strong>Color preferido:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${colorPreferido || 'A elegir'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;"><strong>Competencia:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${competencia || 'No especificada'}</td>
                  </tr>
                </table>
                
                ${comentarios ? `
                <h3 style="color: #374151; margin-top: 25px;">💬 Comentarios adicionales</h3>
                <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
                  ${comentarios}
                </div>
                ` : ''}
              </div>
            </div>
          `
        });

        if (emailError) {
          console.error('Error enviando email demo landing:', emailError);
          return NextResponse.json(
            { error: 'Error al enviar el email', details: emailError.message },
            { status: 500 }
          );
        }

        // ========== ENVIAR EMAIL DE AGRADECIMIENTO AL CLIENTE ==========
        try {
          await resend.emails.send({
            from: 'Neuriax <hola@neuriax.com>',
            to: email,
            subject: '🎨 ¡Tu demo de landing page está en camino! - Neuriax',
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 20px;">
              <div style="background: linear-gradient(135deg, #06b6d4, #3b82f6); padding: 40px 30px; border-radius: 12px 12px 0 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px;">¡Hola ${nombre}! 👋</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 15px 0 0 0; font-size: 18px;">Tu solicitud de demo ha sido recibida</p>
              </div>
              
              <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
                
                <!-- Countdown box -->
                <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); border: 2px solid #f59e0b; border-radius: 12px; padding: 25px; text-align: center; margin-bottom: 25px;">
                  <p style="color: #92400e; font-size: 14px; margin: 0 0 8px 0; font-weight: 500;">⏱️ Tu demo personalizada estará lista en</p>
                  <p style="color: #78350f; font-size: 42px; font-weight: bold; margin: 0;">48 HORAS</p>
                  <p style="color: #92400e; font-size: 14px; margin: 8px 0 0 0;">La recibirás directamente en este email</p>
                </div>
                
                <h3 style="color: #374151; margin-top: 0;">📋 Resumen de tu solicitud:</h3>
                <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                  <p style="margin: 5px 0; color: #4b5563;"><strong>Empresa:</strong> ${nombreEmpresa}</p>
                  <p style="margin: 5px 0; color: #4b5563;"><strong>Sector:</strong> ${sector}</p>
                  <p style="margin: 5px 0; color: #4b5563;"><strong>Objetivo:</strong> ${objetivo}</p>
                  <p style="margin: 5px 0; color: #4b5563;"><strong>Servicio a destacar:</strong> ${servicioDestacado}</p>
                </div>
                
                <h3 style="color: #374151;">🚀 ¿Qué pasa ahora?</h3>
                <div style="margin-bottom: 25px;">
                  <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                    <div style="background: #06b6d4; color: white; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px; flex-shrink: 0;">1</div>
                    <p style="margin: 0; color: #4b5563; line-height: 1.5;">Analizamos tu negocio y tu competencia</p>
                  </div>
                  <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                    <div style="background: #06b6d4; color: white; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px; flex-shrink: 0;">2</div>
                    <p style="margin: 0; color: #4b5563; line-height: 1.5;">Diseñamos una landing page personalizada para ti</p>
                  </div>
                  <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                    <div style="background: #06b6d4; color: white; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px; flex-shrink: 0;">3</div>
                    <p style="margin: 0; color: #4b5563; line-height: 1.5;">Te enviamos el enlace a la demo en 48 horas</p>
                  </div>
                  <div style="display: flex; align-items: flex-start;">
                    <div style="background: #10b981; color: white; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px; flex-shrink: 0;">4</div>
                    <p style="margin: 0; color: #4b5563; line-height: 1.5;"><strong>Solo pagas si te gusta</strong> - Sin compromiso alguno</p>
                  </div>
                </div>
                
                <!-- Reminder box -->
                <div style="background: linear-gradient(135deg, #ecfdf5, #d1fae5); border: 1px solid #10b981; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
                  <p style="margin: 0; color: #065f46; font-weight: 600;">💰 Oferta especial hasta el 25 de febrero</p>
                  <p style="margin: 8px 0 0 0; color: #047857; font-size: 14px;">
                    Landing page profesional por solo <strong style="font-size: 18px;">350€</strong> <span style="text-decoration: line-through; color: #6b7280;">790€</span>
                  </p>
                </div>
                
                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;">
                
                <p style="color: #6b7280; font-size: 14px; margin-bottom: 5px;">
                  ¿Tienes alguna duda mientras tanto?
                </p>
                <p style="color: #6b7280; font-size: 14px; margin-top: 0;">
                  📧 <a href="mailto:hola@neuriax.com" style="color: #3b82f6;">hola@neuriax.com</a><br>
                  📱 <a href="https://wa.me/34640791041" style="color: #3b82f6;">+34 640 791 041</a> (WhatsApp)
                </p>
                
                <p style="color: #374151; font-size: 16px; margin-top: 25px;">
                  ¡Nos ponemos manos a la obra!<br>
                  <strong>El equipo de Neuriax</strong>
                </p>
              </div>
              
              <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 20px;">
                Recibes este email porque solicitaste una demo en neuriax.com
              </p>
            </div>
          `
          });
          console.log('Email de confirmación demo landing enviado a:', email);
        } catch (clientError) {
          console.error('Error enviando email de confirmación al cliente:', clientError);
        }

        return NextResponse.json(
          { message: 'Solicitud de demo enviada correctamente', emailId: emailData?.id },
          { status: 200 }
        );
      }

      // ========== FORMULARIO DE CONTACTO NORMAL ==========
      const { nombre, email, telefono, empresa, sector, mensaje, type } = jsonData;

      // Validar datos del formulario de contacto
      if (!nombre || !email) {
        return NextResponse.json(
          { error: 'Faltan campos requeridos (nombre y email)' },
          { status: 400 }
        );
      }

      // Guardar en Supabase (tabla contacts)
      const { error: dbError } = await supabase.from('contacts').insert({
        nombre,
        email,
        telefono: telefono || null,
        empresa: empresa || null,
        sector: sector || null,
        mensaje: mensaje || null,
        tipo: type || 'contact_form',
        leido: false
      });

      if (dbError) {
        console.error('Error guardando contacto:', dbError);
        // Continuamos para enviar el email aunque falle la DB
      }

      // Enviar email de notificación con Resend
      const { data: emailData, error: emailError } = await resend.emails.send({
        from: 'Neuriax <hola@neuriax.com>',
        to: 'mateoclaramunt2021@gmail.com',
        subject: `🎯 Nuevo lead de contacto: ${nombre}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 20px;">
            <div style="background: linear-gradient(135deg, #06b6d4, #3b82f6); padding: 30px; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">🎯 Nuevo Lead de Contacto</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Alguien quiere agendar una llamada contigo</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                    <strong style="color: #6b7280;">👤 Nombre:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">
                    ${nombre}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                    <strong style="color: #6b7280;">📧 Email:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                    <a href="mailto:${email}" style="color: #3b82f6;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                    <strong style="color: #6b7280;">📞 Teléfono:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">
                    ${telefono || 'No proporcionado'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                    <strong style="color: #6b7280;">🏢 Empresa:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">
                    ${empresa || 'No especificada'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                    <strong style="color: #6b7280;">🏷️ Sector:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">
                    ${sector || 'No especificado'}
                  </td>
                </tr>
              </table>
              
              ${mensaje ? `
              <div style="margin-top: 20px;">
                <strong style="color: #6b7280;">💬 Mensaje:</strong>
                <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin-top: 8px; color: #374151;">
                  ${mensaje}
                </div>
              </div>
              ` : ''}
              
              <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #ecfdf5, #d1fae5); border-radius: 8px; border: 1px solid #a7f3d0;">
                <p style="margin: 0; color: #065f46; font-weight: 600;">
                  ⏰ Este lead va a agendar una llamada en Calendly
                </p>
                <p style="margin: 8px 0 0 0; color: #047857; font-size: 14px;">
                  Revisa tu calendario para la próxima disponibilidad
                </p>
              </div>
            </div>
            
            <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 20px;">
              Email enviado automáticamente desde el formulario de contacto de neuriax.com
            </p>
          </div>
        `
      });

      if (emailError) {
        console.error('Error enviando email de contacto:', emailError);
        return NextResponse.json(
          { error: 'Error al enviar el email', details: emailError.message },
          { status: 500 }
        );
      }

      // ========== ENVIAR EMAIL DE AGRADECIMIENTO AL CLIENTE ==========
      const discountCode = 'BIENVENIDO10';
      
      // Intentar enviar email al cliente (puede fallar si el dominio no está verificado)
      try {
        const { data: clientEmailData, error: clientEmailError } = await resend.emails.send({
          from: 'Neuriax <hola@neuriax.com>',
          to: email,
          subject: '🎉 ¡Gracias por contactar con Neuriax! Tu código de descuento',
          html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 20px;">
            <div style="background: linear-gradient(135deg, #06b6d4, #3b82f6); padding: 40px 30px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">¡Hola ${nombre}! 👋</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 15px 0 0 0; font-size: 16px;">Gracias por confiar en Neuriax</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-top: 0;">
                Somos el equipo de Neuriax. Hemos recibido tu consulta y estamos revisando tu caso.
              </p>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                Como agradecimiento por elegirnos, aquí tienes un <strong>código de descuento del 10%</strong> para tu primer proyecto:
              </p>
              
              <div style="background: linear-gradient(135deg, #ecfdf5, #d1fae5); padding: 25px; border-radius: 12px; text-align: center; margin: 25px 0; border: 2px dashed #10b981;">
                <p style="color: #065f46; font-size: 14px; margin: 0 0 10px 0; font-weight: 500;">Tu código de descuento:</p>
                <p style="color: #047857; font-size: 32px; font-weight: bold; margin: 0; letter-spacing: 3px;">${discountCode}</p>
                <p style="color: #059669; font-size: 14px; margin: 10px 0 0 0;">10% de descuento en tu primer proyecto</p>
              </div>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                <strong>¿Siguiente paso?</strong> Agenda una llamada gratuita de 15 minutos conmigo para hablar de tu proyecto:
              </p>
              
              <div style="text-align: center; margin: 25px 0;">
                <a href="https://calendly.com/neuriax/30min" style="display: inline-block; background: linear-gradient(135deg, #06b6d4, #3b82f6); color: white; padding: 15px 35px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
                  📅 Agendar llamada gratuita
                </a>
              </div>
              
              <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
                En la llamada:
              </p>
              <ul style="color: #6b7280; font-size: 14px; line-height: 1.8;">
                <li>Entenderé mejor tu caso y necesidades</li>
                <li>Te daré un presupuesto cerrado sin sorpresas</li>
                <li>Te diré honestamente si podemos ayudarte</li>
              </ul>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;">
              
              <p style="color: #9ca3af; font-size: 14px; margin-bottom: 5px;">
                ¿Prefieres escribirme directamente?
              </p>
              <p style="color: #6b7280; font-size: 14px; margin-top: 0;">
                📧 <a href="mailto:hola@neuriax.com" style="color: #3b82f6;">hola@neuriax.com</a><br>
                📱 <a href="https://wa.me/34640791041" style="color: #3b82f6;">+34 640 791 041</a> (WhatsApp)
              </p>
              
              <p style="color: #374151; font-size: 16px; margin-top: 25px;">
                ¡Hablamos pronto!<br>
                <strong>El equipo de Neuriax</strong>
              </p>
            </div>
            
            <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 20px;">
              Recibes este email porque contactaste a través de neuriax.com
            </p>
          </div>
        `
        });

        if (clientEmailError) {
          console.error('Error enviando email al cliente:', clientEmailError);
          // No fallamos la request, el email a Mateo ya se envió correctamente
        } else {
          console.log('Email de confirmación enviado al cliente:', clientEmailData?.id);
        }
      } catch (clientError) {
        console.error('Error inesperado enviando email al cliente:', clientError);
        // Continuamos, el email principal a Mateo ya se envió
      }

      return NextResponse.json(
        { message: 'Contacto enviado correctamente', emailId: emailData?.id },
        { status: 200 }
      );
    }

    // ========== FORMULARIO DE TRABAJO (FormData con CV) ==========
    const formData = await request.formData();
    
    const nombre = formData.get('nombre') as string;
    const email = formData.get('email') as string;
    const telefono = formData.get('telefono') as string;
    const posicion = formData.get('posicion') as string;
    const experiencia = formData.get('experiencia') as string;
    const mensaje = formData.get('mensaje') as string;
    const cvFile = formData.get('cv') as File | null;

    // Validar datos
    if (!nombre || !email || !posicion || !mensaje) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    let cvUrl = null;

    // Subir CV a Supabase Storage si existe
    if (cvFile && cvFile.size > 0) {
      const timestamp = Date.now();
      const sanitizedName = nombre.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
      const extension = cvFile.name.split('.').pop();
      const fileName = `cv_${sanitizedName}_${timestamp}.${extension}`;

      const arrayBuffer = await cvFile.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      const { error: uploadError } = await supabase.storage
        .from('cvs')
        .upload(fileName, buffer, {
          contentType: cvFile.type,
          upsert: false
        });

      if (uploadError) {
        console.error('Error subiendo CV:', uploadError);
        // Continuamos sin el CV si hay error
      } else {
        // Obtener URL pública del CV
        const { data: urlData } = supabase.storage
          .from('cvs')
          .getPublicUrl(fileName);
        cvUrl = urlData.publicUrl;
      }
    }

    // Guardar en Supabase
    const { error: dbError } = await supabase.from('job_applications').insert({
      nombre,
      email,
      telefono: telefono || null,
      posicion,
      experiencia: experiencia || null,
      mensaje,
      cv_url: cvUrl,
      leido: false
    });

    if (dbError) {
      console.error('Error guardando postulación:', dbError);
      return NextResponse.json(
        { error: 'Error al guardar la postulación' },
        { status: 500 }
      );
    }

    // Enviar email de notificación con Resend
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Neuriax <hola@neuriax.com>',
      to: 'mateoclaramunt2021@gmail.com',
      subject: `🚀 Nueva postulación: ${posicion}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">Nueva Postulación Recibida</h2>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>📋 Posición:</strong> ${posicion}</p>
            <p><strong>👤 Nombre:</strong> ${nombre}</p>
            <p><strong>📧 Email:</strong> ${email}</p>
            <p><strong>📞 Teléfono:</strong> ${telefono || 'No proporcionado'}</p>
            <p><strong>💼 Experiencia:</strong> ${experiencia || 'No especificada'}</p>
            ${cvUrl ? `<p><strong>📄 CV:</strong> <a href="${cvUrl}" style="color: #6366f1;">Descargar CV</a></p>` : '<p><strong>📄 CV:</strong> No adjuntado</p>'}
          </div>
          
          <h3 style="color: #374151;">Mensaje:</h3>
          <div style="background: #fff; border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px;">
            <p>${mensaje}</p>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 12px;">
            Este email fue enviado automáticamente desde el formulario de trabajo de neuriax.com
          </p>
        </div>
      `
    });

    if (emailError) {
      console.error('Error enviando email:', emailError);
      return NextResponse.json(
        { message: 'Postulación guardada, pero error en email', emailError: emailError },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: 'Postulación enviada correctamente', emailId: emailData?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
