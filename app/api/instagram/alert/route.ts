import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// ═══════════════════════════════════════════════════════════════════
//  ALERTAS DE INSTAGRAM → Email a Mateo
//  Se dispara cuando el bot detecta oportunidades, leads calientes,
//  o cualquier cosa que requiera atención humana.
// ═══════════════════════════════════════════════════════════════════

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const MATEO_EMAIL = 'mateo@neuriax.com';

type AlertType = 'hot_lead' | 'collaboration' | 'urgent' | 'daily_summary' | 'lead_converted';

const ALERT_CONFIG: Record<AlertType, { emoji: string; color: string; label: string }> = {
  hot_lead: { emoji: '🔥', color: '#ef4444', label: 'LEAD CALIENTE' },
  collaboration: { emoji: '🤝', color: '#8b5cf6', label: 'OPORTUNIDAD DE COLABORACIÓN' },
  urgent: { emoji: '🚨', color: '#f59e0b', label: 'ATENCIÓN URGENTE' },
  daily_summary: { emoji: '📊', color: '#06b6d4', label: 'RESUMEN DIARIO' },
  lead_converted: { emoji: '🎉', color: '#10b981', label: 'LEAD CONVERTIDO' },
};

function buildAlertEmail(
  alertType: AlertType,
  username: string,
  sector: string,
  message: string,
  context: string,
  conversationSnippet?: string
): { subject: string; html: string } {
  const config = ALERT_CONFIG[alertType];
  
  const subject = `${config.emoji} [Neuriax IG] ${config.label}: @${username}`;

  const html = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background: #0f172a; font-family: 'Segoe UI', Arial, sans-serif;">
<div style="max-width: 600px; margin: 0 auto;">
  
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); padding: 28px 32px; border-bottom: 3px solid ${config.color};">
    <div style="display: flex; align-items: center; gap: 12px;">
      <span style="font-size: 32px;">${config.emoji}</span>
      <div>
        <h1 style="color: #ffffff; font-size: 18px; margin: 0; font-weight: 700;">${config.label}</h1>
        <p style="color: #94a3b8; font-size: 12px; margin: 4px 0 0 0;">Instagram DM Automation · ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}</p>
      </div>
    </div>
  </div>

  <!-- Lead Info -->
  <div style="background: #1e293b; padding: 24px 32px;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Usuario</td>
        <td style="padding: 8px 0; color: #f1f5f9; font-size: 15px; font-weight: 600; text-align: right;">
          <a href="https://instagram.com/${username}" style="color: #e879f9; text-decoration: none;">@${username}</a>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Sector</td>
        <td style="padding: 8px 0; color: #f1f5f9; font-size: 14px; text-align: right;">${sector}</td>
      </tr>
    </table>
  </div>

  <!-- Message -->
  <div style="background: #0f172a; padding: 24px 32px;">
    <h3 style="color: #e2e8f0; font-size: 13px; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px;">💬 Mensaje del lead</h3>
    <div style="background: #1e293b; border-left: 3px solid ${config.color}; padding: 16px 20px; border-radius: 0 8px 8px 0;">
      <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
    </div>
  </div>

  <!-- Context -->
  <div style="background: #0f172a; padding: 0 32px 24px;">
    <h3 style="color: #e2e8f0; font-size: 13px; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px;">🧠 Por qué se disparó esta alerta</h3>
    <div style="background: #1e293b; padding: 16px 20px; border-radius: 8px;">
      <p style="color: #94a3b8; font-size: 13px; line-height: 1.6; margin: 0;">${context}</p>
    </div>
  </div>

  ${conversationSnippet ? `
  <!-- Conversation -->
  <div style="background: #0f172a; padding: 0 32px 24px;">
    <h3 style="color: #e2e8f0; font-size: 13px; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px;">📝 Últimos mensajes</h3>
    <div style="background: #1e293b; padding: 16px 20px; border-radius: 8px;">
      <pre style="color: #94a3b8; font-size: 12px; line-height: 1.6; margin: 0; white-space: pre-wrap; font-family: 'Segoe UI', Arial, sans-serif;">${conversationSnippet}</pre>
    </div>
  </div>
  ` : ''}

  <!-- CTA -->
  <div style="background: #1e293b; padding: 24px 32px; text-align: center;">
    <a href="https://www.neuriax.com/superadmin/instagram" style="display: inline-block; background: linear-gradient(135deg, #d946ef, #8b5cf6); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-weight: 700; font-size: 14px;">
      Abrir Dashboard →
    </a>
    <p style="color: #475569; font-size: 11px; margin: 12px 0 0 0;">Responde directamente desde el panel de Instagram</p>
  </div>

  <!-- Footer -->
  <div style="padding: 20px 32px; text-align: center;">
    <p style="color: #334155; font-size: 11px; margin: 0;">Neuriax AI · Sistema de captación automática</p>
  </div>

</div>
</body>
</html>`;

  return { subject, html };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { alertType, username, sector, message, context, conversationSnippet } = body;

    if (!alertType || !username || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const resend = getResend();
    const { subject, html } = buildAlertEmail(
      alertType as AlertType,
      username,
      sector || 'general',
      message,
      context || 'Alerta automática del sistema',
      conversationSnippet
    );

    const { error } = await resend.emails.send({
      from: 'Neuriax IG <hola@neuriax.com>',
      to: MATEO_EMAIL,
      subject,
      html,
    });

    if (error) {
      console.error('Alert email error:', error);
      return NextResponse.json({ error: 'Failed to send alert' }, { status: 500 });
    }

    return NextResponse.json({ success: true, alertType, username });
  } catch (error) {
    console.error('Alert endpoint error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
