import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { checkRateLimit, getClientIP, rateLimitExceededResponse, RATE_LIMIT_CONFIGS } from '@/lib/rate-limit';
import { getEmailTemplate } from '@/lib/email-templates';

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!url || !key) {
    throw new Error(`Supabase config missing: url=${!!url}, key=${!!key}`);
  }
  return createClient(url, key);
}

export async function POST(request: NextRequest) {
  try {
    const resend = getResend();
    const supabase = getSupabase();
    const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/neuriax/30min';
    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://neuriax.com';
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

        // Guardar en Supabase (tabla contact_forms)
        const demoMsg = `DEMO LANDING REQUEST\n\nEmpresa: ${nombreEmpresa}\nSector: ${sector}\nObjetivo: ${objetivo}\nServicio destacado: ${servicioDestacado}\nColor preferido: ${colorPreferido || 'No especificado'}\nWeb actual: ${urlActual || 'No tiene'}\nCompetencia: ${competencia || 'No especificada'}\nComentarios: ${comentarios || 'Sin comentarios'}`;

        const { error: dbError } = await supabase.from('contact_forms').insert({
          nombre,
          email,
          telefono: telefono || null,
          mensaje: demoMsg,
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

      // Guardar en Supabase (tabla contact_forms)
      const fullMessage = [
        mensaje || '',
        '',
        `--- Datos adicionales ---`,
        `Empresa: ${empresa || 'No especificada'}`,
        `Sector: ${sector || 'No especificado'}`,
        `Tipo: ${type || 'contact_form'}`,
      ].join('\n');

      const { error: dbError } = await supabase.from('contact_forms').insert({
        nombre,
        email,
        telefono: telefono || null,
        mensaje: fullMessage,
      });

      if (dbError) {
        console.error('Error guardando contacto:', dbError);
      }

      // ========== 1) EMAIL A MATEO CON TODA LA INFO ==========
      const { data: emailData, error: emailError } = await resend.emails.send({
        from: 'Neuriax <hola@neuriax.com>',
        to: 'mateoclaramunt2021@gmail.com',
        subject: `🎯 NUEVO LEAD: ${nombre} - ${empresa || 'Sin empresa'}`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
            <div style="background: linear-gradient(135deg, #0f172a, #1e293b); padding: 30px 40px;">
              <h1 style="color: #06b6d4; margin: 0; font-size: 24px; font-weight: 800;">🎯 Nuevo Lead de Contacto</h1>
              <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 14px;">Formulario completado → Redirigido a Calendly</p>
            </div>
            
            <div style="padding: 30px 40px;">
              <div style="background: #f0fdfa; border: 2px solid #06b6d4; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0; color: #0f172a; font-weight: 700; font-size: 16px;">⚡ Este lead ha sido redirigido a Calendly</p>
                <p style="margin: 6px 0 0 0; color: #475569; font-size: 14px;">Revisa tu calendario para la próxima disponibilidad</p>
              </div>

              <h3 style="color: #0f172a; font-size: 16px; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid #e2e8f0;">👤 Datos del contacto</h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 14px; width: 140px;"><strong>Nombre:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px;">${nombre}</td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 14px;"><strong>Email:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 14px;"><strong>Teléfono:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px;"><a href="tel:${telefono}" style="color: #3b82f6; text-decoration: none;">${telefono || 'No proporcionado'}</a></td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 14px;"><strong>Empresa:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px;">${empresa || 'No especificada'}</td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 14px;"><strong>Sector:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px;">${sector || 'No especificado'}</td></tr>
              </table>
              
              ${mensaje ? `
              <h3 style="color: #0f172a; font-size: 16px; margin: 0 0 12px 0; padding-bottom: 8px; border-bottom: 2px solid #e2e8f0;">💬 Mensaje del cliente</h3>
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; color: #334155; font-size: 14px; line-height: 1.7; white-space: pre-wrap; margin-bottom: 24px;">${mensaje}</div>
              ` : ''}

              <div style="background: #eff6ff; border-radius: 8px; padding: 16px; text-align: center;">
                <p style="margin: 0; color: #1e40af; font-size: 13px;">📧 Secuencia de 15 emails de nurturing iniciada automáticamente</p>
              </div>
            </div>
            
            <div style="background: #f8fafc; padding: 16px 40px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">Enviado automáticamente desde el formulario de neuriax.com</p>
            </div>
          </div>
        `
      });

      if (emailError) {
        console.error('Error enviando email de contacto:', emailError);
        // No bloqueamos — el contacto se guardó en DB, seguimos
      }

      // ========== 2) EMAIL DE BIENVENIDA AL CLIENTE (Email 1 de la secuencia) ==========
      try {
        const welcomeTemplate = getEmailTemplate(1);
        if (welcomeTemplate) {
          const unsubscribeUrl = `${SITE_URL}/api/unsubscribe?email=${encodeURIComponent(email)}`;
          await resend.emails.send({
            from: 'Neuriax <hola@neuriax.com>',
            to: email,
            subject: welcomeTemplate.subject,
            html: welcomeTemplate.getHtml(nombre, unsubscribeUrl),
          });
          console.log('Email de bienvenida (Guía 1) enviado a:', email);
        }
      } catch (clientError) {
        console.error('Error enviando email de bienvenida al cliente:', clientError);
      }

      // ========== 3) REGISTRAR SECUENCIA DE 15 EMAILS ==========
      try {
        // Calcular próxima fecha de envío (2 días después)
        const nextSendDate = new Date();
        nextSendDate.setDate(nextSendDate.getDate() + 2);

        // Verificar si ya existe una secuencia para este email
        const { data: existingSeq } = await supabase
          .from('email_sequences')
          .select('id')
          .eq('contact_email', email)
          .eq('completed', false)
          .single();

        if (!existingSeq) {
          await supabase.from('email_sequences').insert({
            contact_email: email,
            contact_nombre: nombre,
            current_email: 2, // El email 1 ya se envió arriba
            next_send_date: nextSendDate.toISOString().split('T')[0],
            completed: false,
            unsubscribed: false
          });
          console.log('Secuencia de emails registrada para:', email);
        } else {
          console.log('Ya existe una secuencia activa para:', email);
        }
      } catch (seqError) {
        console.error('Error registrando secuencia de emails:', seqError);
      }

      return NextResponse.json(
        { 
          message: 'Contacto enviado correctamente', 
          emailId: emailData?.id,
          calendlyUrl: CALENDLY_URL 
        },
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
