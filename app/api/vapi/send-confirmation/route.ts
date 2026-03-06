import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { getMeetingConfirmationEmail, getPostCallEmail } from '@/lib/vapi-email-templates';
import { generateGuiaPDFBase64 } from '@/lib/pdf/generate-pdf';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!url || !key) throw new Error('Supabase config missing');
  return createClient(url, key);
}

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

/**
 * Manual endpoint to send/resend confirmation email for a meeting.
 * POST /api/vapi/send-confirmation
 * Body: { meeting_id: number } or { call_id: string, type: 'post-call' }
 */
export async function POST(req: NextRequest) {
  try {
    const { meeting_id, call_id, type } = await req.json();
    const supabase = getSupabase();
    const resend = getResend();

    // ── Send meeting confirmation ──
    if (meeting_id) {
      const { data: meeting, error } = await supabase
        .from('vapi_meetings')
        .select('*')
        .eq('id', meeting_id)
        .single();

      if (error || !meeting) {
        return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
      }

      if (!meeting.contact_email) {
        return NextResponse.json({ error: 'No email for this meeting' }, { status: 400 });
      }

      const meetingDate = new Date(meeting.meeting_date);
      const months = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
      ];
      const fecha = `${meetingDate.getDate()} de ${months[meetingDate.getMonth()]} de ${meetingDate.getFullYear()}`;
      const hora = meetingDate.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Madrid',
      });

      const { subject, html } = getMeetingConfirmationEmail({
        nombre: meeting.contact_name || 'amigo/a',
        fecha,
        hora,
        tipoReunion: meeting.meeting_type || 'demo',
        meetingUrl: meeting.meeting_url || undefined,
      });

      const pdfBase64 = await generateGuiaPDFBase64();

      await resend.emails.send({
        from: 'Neuriax <hola@neuriax.com>',
        to: meeting.contact_email,
        subject,
        html,
        attachments: [
          {
            filename: 'Guia-IA-Negocios-Neuriax.pdf',
            content: pdfBase64,
          },
        ],
      });

      return NextResponse.json({ ok: true, message: 'Meeting confirmation sent' });
    }

    // ── Send post-call email ──
    if (call_id && type === 'post-call') {
      const { data: call, error } = await supabase
        .from('vapi_calls')
        .select('*')
        .eq('vapi_call_id', call_id)
        .single();

      if (error || !call) {
        return NextResponse.json({ error: 'Call not found' }, { status: 404 });
      }

      if (!call.contact_email) {
        return NextResponse.json({ error: 'No email for this call' }, { status: 400 });
      }

      const { subject, html } = getPostCallEmail({
        nombre: call.contact_name || 'amigo/a',
        summary: call.summary || undefined,
      });

      const pdfBase64 = await generateGuiaPDFBase64();

      await resend.emails.send({
        from: 'Neuriax <hola@neuriax.com>',
        to: call.contact_email,
        subject,
        html,
        attachments: [
          {
            filename: 'Guia-IA-Negocios-Neuriax.pdf',
            content: pdfBase64,
          },
        ],
      });

      return NextResponse.json({ ok: true, message: 'Post-call email sent' });
    }

    return NextResponse.json({ error: 'Provide meeting_id or call_id + type' }, { status: 400 });
  } catch (error) {
    console.error('[VAPI Send Confirmation Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
