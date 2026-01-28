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

      const { data: uploadData, error: uploadError } = await supabase.storage
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
      to: 'info@neuriax.com',
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
      { error: 'Error al procesar la postulación' },
      { status: 500 }
    );
  }
}
