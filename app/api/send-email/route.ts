import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, email, telefono, posicion, experiencia, mensaje } = body;

    // Validar datos
    if (!nombre || !email || !posicion || !mensaje) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Email al propietario (a ti)
    await resend.emails.send({
      from: 'Neuriax Formulario <onboarding@resend.dev>',
      to: 'neuriaxx@gmail.com',
      subject: `🚀 Nueva postulación de trabajo - ${nombre}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #22d3ee; margin: 0;">Nueva Postulación Recibida</h1>
            <p style="color: #94a3b8;">Alguien quiere unirse a Neuriax</p>
          </div>
          
          <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #22d3ee; margin-top: 0;">📋 Datos del Candidato</h3>
            <p style="color: #e2e8f0;"><strong>👤 Nombre:</strong> ${nombre}</p>
            <p style="color: #e2e8f0;"><strong>📧 Email:</strong> <a href="mailto:${email}" style="color: #22d3ee;">${email}</a></p>
            <p style="color: #e2e8f0;"><strong>📱 Teléfono:</strong> ${telefono || 'No proporcionado'}</p>
            <p style="color: #e2e8f0;"><strong>💼 Posición deseada:</strong> ${posicion}</p>
            <p style="color: #e2e8f0;"><strong>📈 Experiencia:</strong> ${experiencia || 'No especificada'}</p>
          </div>
          
          <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 20px;">
            <h3 style="color: #22d3ee; margin-top: 0;">💬 Mensaje</h3>
            <p style="color: #e2e8f0; line-height: 1.6;">${mensaje.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
            <p style="color: #64748b; font-size: 12px;">Enviado desde el formulario de trabajo de neuriax.com</p>
          </div>
        </div>
      `,
    });

    // Email de confirmación al postulante
    await resend.emails.send({
      from: 'Neuriax <onboarding@resend.dev>',
      to: email,
      subject: '✅ Tu postulación ha sido recibida - Neuriax',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #22d3ee; margin: 0;">¡Gracias por tu interés!</h1>
            <p style="color: #94a3b8;">Hemos recibido tu postulación</p>
          </div>
          
          <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <p style="color: #e2e8f0; font-size: 16px;">Hola <strong>${nombre}</strong>,</p>
            <p style="color: #e2e8f0; line-height: 1.6;">
              Hemos recibido tu postulación para la posición de <strong style="color: #22d3ee;">${posicion}</strong>.
            </p>
            <p style="color: #e2e8f0; line-height: 1.6;">
              Nuestro equipo revisará tu perfil y nos pondremos en contacto contigo si hay una oportunidad que se ajuste a tus habilidades.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #22d3ee; font-weight: bold;">¡Mucha suerte! 🚀</p>
            <p style="color: #94a3b8;">El equipo de Neuriax</p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
            <a href="https://www.neuriax.com" style="color: #22d3ee; text-decoration: none;">www.neuriax.com</a>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { message: 'Postulación enviada correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error enviando email:', error);
    return NextResponse.json(
      { error: 'Error al enviar la postulación' },
      { status: 500 }
    );
  }
}
