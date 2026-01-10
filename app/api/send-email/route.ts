import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

    // Configurar transporte de email
    // Usando Gmail - necesitas una contraseña de aplicación
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email al propietario
    const ownerMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'mateoclaramunt2021@gmail.com',
      subject: `Nueva postulación de trabajo - ${nombre}`,
      html: `
        <h2>Nueva Postulación Recibida</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono || 'No proporcionado'}</p>
        <p><strong>Posición deseada:</strong> ${posicion}</p>
        <p><strong>Experiencia:</strong> ${experiencia || 'No proporcionada'}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Email de confirmación al postulante
    const applicantMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Tu postulación ha sido recibida - Neuriax',
      html: `
        <h2>¡Gracias por tu postulación!</h2>
        <p>Hola ${nombre},</p>
        <p>Hemos recibido tu postulación para la posición de <strong>${posicion}</strong>.</p>
        <p>Nos pondremos en contacto contigo pronto en caso de que tu perfil sea de interés para nuestro equipo.</p>
        <p>¡Muchas gracias por tu interés en Neuriax!</p>
        <br>
        <p>Saludos,<br>El equipo de Neuriax</p>
      `,
    };

    // Enviar emails
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(applicantMailOptions);

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
