import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { getMeetingReminderEmail } from '@/lib/vapi-email-templates';

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
 * Cron job: checks upcoming meetings and sends reminder emails.
 * Runs every 5 minutes via Vercel Cron.
 * GET /api/cron/vapi-reminders
 */
export async function GET() {
  try {
    const supabase = getSupabase();
    const resend = getResend();

    // Get reminder config
    const { data: config } = await supabase
      .from('vapi_config')
      .select('reminder_minutes_before, confirmation_email_enabled')
      .limit(1)
      .single();

    const reminderMinutes = config?.reminder_minutes_before || 15;

    if (config && !config.confirmation_email_enabled) {
      return NextResponse.json({ ok: true, skipped: true, reason: 'emails disabled' });
    }

    // Find meetings happening in the next [reminderMinutes] that haven't been reminded
    const now = new Date();
    const reminderWindow = new Date(now.getTime() + reminderMinutes * 60 * 1000);

    const { data: meetings, error } = await supabase
      .from('vapi_meetings')
      .select('*')
      .eq('status', 'scheduled')
      .eq('reminder_email_sent', false)
      .gte('meeting_date', now.toISOString())
      .lte('meeting_date', reminderWindow.toISOString());

    if (error) {
      console.error('[VAPI Reminders] DB error:', error);
      return NextResponse.json({ error: 'DB error' }, { status: 500 });
    }

    if (!meetings || meetings.length === 0) {
      return NextResponse.json({ ok: true, reminders_sent: 0 });
    }

    let sent = 0;

    for (const meeting of meetings) {
      if (!meeting.contact_email) continue;

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

      const minutesUntil = Math.round((meetingDate.getTime() - now.getTime()) / 60000);

      const { subject, html } = getMeetingReminderEmail({
        nombre: meeting.contact_name || 'amigo/a',
        fecha,
        hora,
        minutesBefore: minutesUntil,
        meetingUrl: meeting.meeting_url || undefined,
      });

      try {
        await resend.emails.send({
          from: 'Neuriax <hola@neuriax.com>',
          to: meeting.contact_email,
          subject,
          html,
        });

        // Mark reminder as sent
        await supabase
          .from('vapi_meetings')
          .update({ reminder_email_sent: true })
          .eq('id', meeting.id);

        sent++;
        console.log(`[VAPI Reminder] Sent to ${meeting.contact_email} for meeting ${meeting.id}`);
      } catch (emailError) {
        console.error(`[VAPI Reminder] Failed for ${meeting.contact_email}:`, emailError);
      }
    }

    return NextResponse.json({ ok: true, reminders_sent: sent });
  } catch (error) {
    console.error('[VAPI Reminders Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
