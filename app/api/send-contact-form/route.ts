import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configurar transporter de email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

// Función para guardar en Supabase (solo en runtime)
async function saveToSupabase(data: any) {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );

    const { error } = await supabase
      .from('contact_forms')
      .insert([
        {
          nombre: data.nombre,
          email: data.email,
          telefono: data.telefono,
          servicio: data.servicio,
          mensaje: data.mensaje,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error('Error guardando en BD:', error);
    }
  } catch (err) {
    console.error('Error en Supabase:', err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, email, telefono, servicio, mensaje } = body;

    // Validación
    if (!nombre || !email || !telefono) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // 1. Guardar en Supabase de forma asíncrona
    saveToSupabase(body).catch(err => console.error('Failed to save to Supabase:', err));

    // 2. Enviar email al admin (Mateo)
    try {
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: 'neuriaxx@gmail.com', // Tu email
        subject: `Nuevo contacto de ${nombre} - ${servicio}`,
        html: `
          <h2>Nuevo contacto desde neuriax.com</h2>
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${telefono}</p>
          <p><strong>Servicio:</strong> ${servicio}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${mensaje.replace(/\n/g, '<br>')}</p>
          <hr>
          <p style="color: #666; font-size: 12px;">
            Responde rápido para agendar la cita en Calendly
          </p>
        `,
      });
    } catch (emailError) {
      console.error('Error enviando email:', emailError);
      // Continuamos aunque falle el email
    }

    // 3. Enviar confirmación al usuario
    try {
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Recibimos tu solicitud - Neuriax',
        html: `
          <h2>¡Gracias por contactarnos!</h2>
          <p>Hola ${nombre},</p>
          <p>Hemos recibido tu solicitud correctamente. En breve te contactaremos para confirmar tu cita.</p>
          <p><strong>Resumen de tu contacto:</strong></p>
          <p>Teléfono: ${telefono}</p>
          <p>Servicio: ${servicio}</p>
          <p>Mensaje: ${mensaje}</p>
          <hr>
          <p>Si deseas cambiar la fecha o tienes dudas, contáctanos.</p>
          <p>
            <strong>Neuriax Team</strong><br>
            Web + SEO + Automatización IA
          </p>
        `,
      });
    } catch (emailError) {
      console.error('Error enviando confirmación:', emailError);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Contacto guardado correctamente',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en API:', error);
    return NextResponse.json(
      { error: 'Error procesando solicitud' },
      { status: 500 }
    );
  }
}
