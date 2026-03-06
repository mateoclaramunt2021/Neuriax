// ============================================
// Email templates for VAPI integration
// Meeting confirmation, reminders, and post-call
// ============================================

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://neuriax.com';

function vapiEmailWrapper(content: string): string {
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
    ${content}
  </div>

  <!-- Footer -->
  <div style="background: #f8fafc; padding: 24px 40px; border-top: 1px solid #e2e8f0; text-align: center;">
    <p style="color: #94a3b8; font-size: 12px; margin: 0 0 8px 0;">
      © 2026 Neuriax · <a href="${SITE_URL}" style="color: #06b6d4; text-decoration: none;">neuriax.com</a>
    </p>
    <p style="color: #94a3b8; font-size: 11px; margin: 0;">
      <a href="${SITE_URL}/politica-de-privacidad" style="color: #94a3b8; text-decoration: underline;">Política de privacidad</a>
    </p>
  </div>
</div>
</body>
</html>`;
}

/**
 * Email sent when VAPI schedules a meeting during a call.
 * Includes PDF attachment with IA business guide.
 */
export function getMeetingConfirmationEmail(params: {
  nombre: string;
  fecha: string;      // e.g. "15 de marzo de 2026"
  hora: string;       // e.g. "10:30"
  tipoReunion: string; // e.g. "demo", "consultoría"
  meetingUrl?: string;
}): { subject: string; html: string } {
  const { nombre, fecha, hora, tipoReunion, meetingUrl } = params;

  const meetingLabel = tipoReunion === 'demo' ? 'Demo personalizada'
    : tipoReunion === 'consultoria' ? 'Consultoría gratuita'
    : tipoReunion === 'seguimiento' ? 'Reunión de seguimiento'
    : tipoReunion === 'presentacion' ? 'Presentación'
    : 'Reunión';

  const subject = `✅ ${meetingLabel} confirmada — ${fecha} a las ${hora}`;

  const html = vapiEmailWrapper(`
    <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
      Hola <strong style="color: #0f172a;">${nombre}</strong>,
    </p>

    <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
      ¡Gracias por tu interés! Ha sido un placer hablar contigo. Tu reunión queda
      <strong style="color: #0f172a;">confirmada</strong>:
    </p>

    <!-- Meeting Details Box -->
    <div style="background: linear-gradient(135deg, #ecfeff, #f0f9ff); border: 2px solid #06b6d4; border-radius: 12px; padding: 28px; margin: 24px 0; text-align: center;">
      <p style="color: #0891b2; font-size: 13px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 700;">
        ${meetingLabel}
      </p>
      <p style="color: #0f172a; font-size: 28px; font-weight: 800; margin: 8px 0 4px 0;">
        📅 ${fecha}
      </p>
      <p style="color: #0f172a; font-size: 22px; font-weight: 700; margin: 0 0 4px 0;">
        🕐 ${hora}h (hora España)
      </p>
      ${meetingUrl ? `
      <a href="${meetingUrl}" style="display: inline-block; margin-top: 16px; background: linear-gradient(135deg, #06b6d4, #3b82f6); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 700; font-size: 15px;">
        Unirse a la reunión →
      </a>
      ` : ''}
    </div>

    <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
      Mientras tanto, te hemos adjuntado nuestra <strong style="color: #0f172a;">guía exclusiva:
      "Cómo la IA Transforma tu Negocio"</strong> — con casos reales, métricas y un plan
      de acción que puedes implementar hoy mismo.
    </p>

    <!-- PDF Gift Box -->
    <div style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 12px; padding: 28px; margin: 24px 0; text-align: center;">
      <p style="color: #fbbf24; font-size: 14px; margin: 0 0 4px 0; font-weight: 700;">🎁 TU REGALO</p>
      <h3 style="color: #ffffff; font-size: 18px; margin: 0 0 8px 0; font-weight: 700;">
        Guía: Cómo la IA Transforma tu Negocio
      </h3>
      <p style="color: #94a3b8; font-size: 13px; margin: 0 0 16px 0;">
        8 páginas · Casos reales · Plan de acción 30 días
      </p>
      <p style="color: #06b6d4; font-size: 13px; margin: 0;">
        📎 Revisa el archivo adjunto en este email
      </p>
    </div>

    <p style="color: #334155; font-size: 15px; line-height: 1.6; margin: 0 0 8px 0;">
      Si necesitas reprogramar la reunión, simplemente responde a este email.
    </p>

    <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 24px 0 0 0;">
      Un saludo,<br>
      <strong style="color: #0f172a;">Mateo — Neuriax</strong>
    </p>
  `);

  return { subject, html };
}

/**
 * Reminder email sent X minutes before the meeting.
 */
export function getMeetingReminderEmail(params: {
  nombre: string;
  fecha: string;
  hora: string;
  minutesBefore: number;
  meetingUrl?: string;
}): { subject: string; html: string } {
  const { nombre, fecha, hora, minutesBefore, meetingUrl } = params;

  const timeLabel = minutesBefore >= 60
    ? `${Math.round(minutesBefore / 60)} hora${minutesBefore >= 120 ? 's' : ''}`
    : `${minutesBefore} minutos`;

  const subject = `⏰ Tu reunión con Neuriax es en ${timeLabel}`;

  const html = vapiEmailWrapper(`
    <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
      Hola <strong style="color: #0f172a;">${nombre}</strong>,
    </p>

    <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
      Solo un recordatorio: tu reunión con Neuriax es <strong style="color: #0891b2;">en ${timeLabel}</strong>.
    </p>

    <!-- Reminder Box -->
    <div style="background: #fffbeb; border: 2px solid #f59e0b; border-radius: 12px; padding: 24px; margin: 24px 0; text-align: center;">
      <p style="color: #92400e; font-size: 24px; font-weight: 800; margin: 0 0 4px 0;">
        📅 ${fecha}
      </p>
      <p style="color: #92400e; font-size: 20px; font-weight: 700; margin: 0;">
        🕐 ${hora}h (hora España)
      </p>
      ${meetingUrl ? `
      <a href="${meetingUrl}" style="display: inline-block; margin-top: 16px; background: #0f172a; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 700; font-size: 14px;">
        Unirse a la reunión →
      </a>
      ` : ''}
    </div>

    <p style="color: #334155; font-size: 15px; line-height: 1.6; margin: 0 0 8px 0;">
      Ten a mano cualquier pregunta que tengas sobre cómo la IA puede ayudar a tu negocio. ¡Hablamos pronto!
    </p>

    <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 24px 0 0 0;">
      Un saludo,<br>
      <strong style="color: #0f172a;">Mateo — Neuriax</strong>
    </p>
  `);

  return { subject, html };
}

/**
 * Thank you email sent after a call ends (if no meeting was scheduled).
 */
export function getPostCallEmail(params: {
  nombre: string;
  summary?: string;
}): { subject: string; html: string } {
  const { nombre, summary } = params;

  const subject = '🙏 Gracias por hablar con nosotros — Tu regalo exclusivo';

  const html = vapiEmailWrapper(`
    <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
      Hola <strong style="color: #0f172a;">${nombre}</strong>,
    </p>

    <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
      Gracias por llamarnos. Ha sido un placer conversar contigo sobre cómo la
      Inteligencia Artificial puede ayudar a tu negocio.
    </p>

    ${summary ? `
    <!-- Call Summary -->
    <div style="background: #f8fafc; border-left: 4px solid #06b6d4; border-radius: 4px; padding: 20px; margin: 20px 0;">
      <p style="color: #0891b2; font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Resumen de tu consulta</p>
      <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0;">${summary}</p>
    </div>
    ` : ''}

    <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
      Como agradecimiento, te adjuntamos nuestra <strong style="color: #0f172a;">guía exclusiva</strong>
      con toda la información que necesitas para dar el salto a la IA.
    </p>

    <!-- PDF Gift Box -->
    <div style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 12px; padding: 28px; margin: 24px 0; text-align: center;">
      <p style="color: #fbbf24; font-size: 14px; margin: 0 0 4px 0; font-weight: 700;">🎁 TU REGALO</p>
      <h3 style="color: #ffffff; font-size: 18px; margin: 0 0 8px 0; font-weight: 700;">
        Guía: Cómo la IA Transforma tu Negocio
      </h3>
      <p style="color: #94a3b8; font-size: 13px; margin: 0 0 16px 0;">
        8 páginas · Casos reales · Plan de acción 30 días
      </p>
      <p style="color: #06b6d4; font-size: 13px; margin: 0;">
        📎 Revisa el archivo adjunto en este email
      </p>
    </div>

    <!-- CTA -->
    <div style="background: #f0fdfa; border: 2px solid #06b6d4; border-radius: 12px; padding: 24px; text-align: center; margin: 20px 0;">
      <p style="color: #0f172a; font-size: 15px; margin: 0 0 12px 0; font-weight: 600;">
        ¿Quieres seguir hablando? Agenda una reunión cuando te venga bien
      </p>
      <a href="${SITE_URL}/contacto" style="display: inline-block; background: #0f172a; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 14px;">
        📅 Agendar reunión
      </a>
    </div>

    <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 24px 0 0 0;">
      Un saludo,<br>
      <strong style="color: #0f172a;">Mateo — Neuriax</strong>
    </p>
  `);

  return { subject, html };
}
