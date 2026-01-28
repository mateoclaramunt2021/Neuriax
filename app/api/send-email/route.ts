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
        from: 'Neuriax <onboarding@resend.dev>',
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
      from: 'Neuriax <onboarding@resend.dev>',
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
