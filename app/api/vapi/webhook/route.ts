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

// Helper: format date for Spanish locale
function formatDateES(date: Date): string {
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  return `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
}

function formatTimeES(date: Date): string {
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Madrid',
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// VAPI Webhook — receives all events from VAPI
// Configure in VAPI dashboard: https://yourdomain.com/api/vapi/webhook
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const supabase = getSupabase();

    console.log('[VAPI Webhook]', body.message?.type || 'unknown', JSON.stringify(body).slice(0, 500));

    const messageType = body.message?.type;

    // ═══ CALL STARTED (status-update with status "in-progress") ═══
    if (messageType === 'status-update' && body.message?.status === 'in-progress') {
      const call = body.message?.call || body.message;
      const callId = call?.id || body.message?.callId;
      const phoneNumber = call?.customer?.number || '';
      const customerName = call?.customer?.name || '';

      if (callId) {
        await supabase.from('vapi_calls').upsert({
          vapi_call_id: callId,
          assistant_id: call?.assistantId || '2c027356-c455-4039-bb78-f9da3184c79f',
          phone_number: phoneNumber,
          contact_name: customerName,
          direction: 'inbound',
          status: 'in-progress',
          started_at: new Date().toISOString(),
          metadata: { raw_event: 'status-update-in-progress' },
        }, { onConflict: 'vapi_call_id' });

        // Try to link to existing contact
        if (phoneNumber) {
          await linkToContact(supabase, callId, phoneNumber);
        }
      }

      return NextResponse.json({ ok: true });
    }

    // ═══ END OF CALL REPORT ═══
    if (messageType === 'end-of-call-report') {
      const report = body.message;
      const callId = report?.call?.id || report?.callId;

      if (!callId) {
        return NextResponse.json({ ok: true, msg: 'no callId' });
      }

      const transcript = report?.transcript || report?.artifact?.transcript || [];
      const summary = report?.summary || report?.artifact?.summary || '';
      const recordingUrl = report?.recordingUrl || report?.artifact?.recordingUrl || '';
      const duration = report?.durationSeconds || report?.call?.duration || 0;
      const endedReason = report?.endedReason || '';
      const cost = report?.cost || 0;
      const phoneNumber = report?.call?.customer?.number || '';
      const customerName = report?.call?.customer?.name || '';

      // Update the call record
      const { data: existingCall } = await supabase
        .from('vapi_calls')
        .select('id')
        .eq('vapi_call_id', callId)
        .single();

      if (existingCall) {
        await supabase.from('vapi_calls').update({
          status: 'ended',
          ended_at: new Date().toISOString(),
          duration_seconds: Math.round(duration),
          summary,
          transcript,
          recording_url: recordingUrl,
          ended_reason: endedReason,
          cost,
          contact_name: customerName || undefined,
        }).eq('vapi_call_id', callId);
      } else {
        // Call wasn't registered (maybe status-update was missed)
        await supabase.from('vapi_calls').insert({
          vapi_call_id: callId,
          assistant_id: report?.call?.assistantId || '2c027356-c455-4039-bb78-f9da3184c79f',
          phone_number: phoneNumber,
          contact_name: customerName,
          direction: 'inbound',
          status: 'ended',
          started_at: report?.startedAt || new Date().toISOString(),
          ended_at: new Date().toISOString(),
          duration_seconds: Math.round(duration),
          summary,
          transcript,
          recording_url: recordingUrl,
          ended_reason: endedReason,
          cost,
        });

        if (phoneNumber) {
          await linkToContact(supabase, callId, phoneNumber);
        }
      }

      // Check if a meeting was scheduled during this call (via tool calls)
      const meetingScheduled = await checkForScheduledMeeting(supabase, callId);

      // If no meeting was scheduled but we have an email, send post-call email with PDF
      if (!meetingScheduled) {
        const { data: callData } = await supabase
          .from('vapi_calls')
          .select('contact_email, contact_name')
          .eq('vapi_call_id', callId)
          .single();

        if (callData?.contact_email) {
          await sendPostCallEmailWithPDF(
            callData.contact_name || 'amigo/a',
            callData.contact_email,
            summary
          );
        }
      }

      return NextResponse.json({ ok: true });
    }

    // ═══ TOOL CALLS (agent schedules a meeting) ═══
    if (messageType === 'tool-calls') {
      const toolCalls = body.message?.toolCalls || body.message?.toolCallList || [];

      for (const toolCall of toolCalls) {
        const fnName = toolCall?.function?.name || toolCall?.name || '';

        // Handle meeting scheduling tool call
        if (fnName === 'schedule_meeting' || fnName === 'agendar_reunion' || fnName === 'book_meeting' || fnName === 'bookMeeting') {
          const args = toolCall?.function?.arguments
            ? (typeof toolCall.function.arguments === 'string'
              ? JSON.parse(toolCall.function.arguments)
              : toolCall.function.arguments)
            : {};

          const callId = body.message?.call?.id || body.message?.callId || '';
          const meetingDate = args.date || args.fecha || args.meeting_date || '';
          const meetingTime = args.time || args.hora || args.meeting_time || '';
          const name = args.name || args.nombre || args.contact_name || '';
          const email = args.email || args.contact_email || '';
          const phone = args.phone || args.telefono || args.contact_phone || '';
          const type = args.type || args.tipo || args.meeting_type || 'demo';
          const notes = args.notes || args.notas || '';

          // Parse the meeting datetime
          let meetingDatetime: Date;
          try {
            if (meetingDate && meetingTime) {
              meetingDatetime = new Date(`${meetingDate}T${meetingTime}`);
            } else if (meetingDate) {
              meetingDatetime = new Date(meetingDate);
            } else {
              meetingDatetime = new Date(Date.now() + 24 * 60 * 60 * 1000); // tomorrow
            }
          } catch {
            meetingDatetime = new Date(Date.now() + 24 * 60 * 60 * 1000);
          }

          // Save the meeting
          await supabase.from('vapi_meetings').insert({
            vapi_call_id: callId,
            contact_name: name,
            contact_email: email,
            contact_phone: phone,
            meeting_date: meetingDatetime.toISOString(),
            meeting_type: type,
            notes,
            status: 'scheduled',
          });

          // Update the call record
          if (callId) {
            await supabase.from('vapi_calls').update({
              meeting_scheduled: true,
              contact_name: name || undefined,
              contact_email: email || undefined,
            }).eq('vapi_call_id', callId);
          }

          // Send confirmation email + PDF
          if (email) {
            await sendMeetingConfirmationWithPDF({
              nombre: name || 'amigo/a',
              email,
              fecha: formatDateES(meetingDatetime),
              hora: formatTimeES(meetingDatetime),
              tipoReunion: type,
            });
          }

          // Link to CRM
          if (phone || email) {
            await linkToContactFromMeeting(supabase, callId, { name, email, phone });
          }
        }
      }

      return NextResponse.json({ ok: true });
    }

    // ═══ Other events (transcript, speech-update, etc.) — just acknowledge ═══
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[VAPI Webhook Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Helper functions
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

async function linkToContact(
  supabase: any,
  callId: string,
  phoneNumber: string
) {
  // Try to find existing contact by phone
  const { data: contact } = await supabase
    .from('contactos')
    .select('id, nombre, email')
    .or(`telefono.eq.${phoneNumber},telefono.eq.${phoneNumber.replace('+', '')}`)
    .limit(1)
    .single();

  if (contact) {
    await supabase.from('vapi_calls').update({
      contact_id: contact.id,
      contact_name: contact.nombre || undefined,
      contact_email: contact.email || undefined,
    }).eq('vapi_call_id', callId);

    // Update CRM pipeline to "contactado"
    await supabase.from('client_status').update({
      status: 'contactado',
      source: 'vapi_call',
      updated_at: new Date().toISOString(),
    }).eq('contact_id', contact.id);
  }
}

async function linkToContactFromMeeting(
  supabase: any,
  callId: string,
  data: { name: string; email: string; phone: string }
) {
  // Try to find existing contact
  let contactId: number | null = null;

  if (data.phone) {
    const { data: contact } = await supabase
      .from('contactos')
      .select('id')
      .or(`telefono.eq.${data.phone},telefono.eq.${data.phone.replace('+', '')}`)
      .limit(1)
      .single();
    if (contact) contactId = contact.id;
  }

  if (!contactId && data.email) {
    const { data: contact } = await supabase
      .from('contactos')
      .select('id')
      .eq('email', data.email)
      .limit(1)
      .single();
    if (contact) contactId = contact.id;
  }

  // If no existing contact, create one
  if (!contactId) {
    const { data: newContact } = await supabase.from('contactos').insert({
      nombre: data.name,
      email: data.email,
      telefono: data.phone,
      mensaje: 'Contacto creado desde llamada VAPI',
    }).select('id').single();

    if (newContact) {
      contactId = newContact.id;

      // Create CRM entry
      await supabase.from('client_status').insert({
        contact_id: contactId,
        status: 'negociacion',
        source: 'vapi_call',
        priority: 'alta',
      });
    }
  } else {
    // Update existing contact to "negociacion" (meeting scheduled)
    await supabase.from('client_status').update({
      status: 'negociacion',
      updated_at: new Date().toISOString(),
    }).eq('contact_id', contactId);
  }

  // Link contact to call and meeting
  if (contactId) {
    await supabase.from('vapi_calls').update({ contact_id: contactId }).eq('vapi_call_id', callId);
    await supabase.from('vapi_meetings').update({ contact_id: contactId }).eq('vapi_call_id', callId);
  }
}

async function checkForScheduledMeeting(
  supabase: any,
  callId: string
): Promise<boolean> {
  const { data } = await supabase
    .from('vapi_meetings')
    .select('id')
    .eq('vapi_call_id', callId)
    .limit(1);

  return (data && data.length > 0) || false;
}

async function sendMeetingConfirmationWithPDF(params: {
  nombre: string;
  email: string;
  fecha: string;
  hora: string;
  tipoReunion: string;
  meetingUrl?: string;
}) {
  try {
    const resend = getResend();
    const { subject, html } = getMeetingConfirmationEmail(params);
    const pdfBase64 = await generateGuiaPDFBase64();

    await resend.emails.send({
      from: 'Neuriax <hola@neuriax.com>',
      to: params.email,
      subject,
      html,
      attachments: [
        {
          filename: 'Guia-IA-Negocios-Neuriax.pdf',
          content: pdfBase64,
        },
      ],
    });

    // Also notify Mateo
    await resend.emails.send({
      from: 'Neuriax <hola@neuriax.com>',
      to: 'mateoclaramunt2021@gmail.com',
      subject: `📅 NUEVA REUNIÓN VAPI: ${params.nombre} — ${params.fecha} ${params.hora}`,
      html: `
        <div style="font-family: Arial; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0891b2;">📅 Nueva Reunión Agendada por VAPI</h2>
          <p><strong>Nombre:</strong> ${params.nombre}</p>
          <p><strong>Email:</strong> ${params.email}</p>
          <p><strong>Fecha:</strong> ${params.fecha}</p>
          <p><strong>Hora:</strong> ${params.hora}</p>
          <p><strong>Tipo:</strong> ${params.tipoReunion}</p>
          <p style="color: #22c55e; font-weight: bold;">✅ Email de confirmación + PDF enviado al cliente</p>
        </div>
      `,
    });

    console.log(`[VAPI] Meeting confirmation + PDF sent to ${params.email}`);
  } catch (error) {
    console.error('[VAPI] Error sending meeting confirmation:', error);
  }
}

async function sendPostCallEmailWithPDF(
  nombre: string,
  email: string,
  summary?: string
) {
  try {
    const resend = getResend();
    const { subject, html } = getPostCallEmail({ nombre, summary });
    const pdfBase64 = await generateGuiaPDFBase64();

    await resend.emails.send({
      from: 'Neuriax <hola@neuriax.com>',
      to: email,
      subject,
      html,
      attachments: [
        {
          filename: 'Guia-IA-Negocios-Neuriax.pdf',
          content: pdfBase64,
        },
      ],
    });

    console.log(`[VAPI] Post-call email + PDF sent to ${email}`);
  } catch (error) {
    console.error('[VAPI] Error sending post-call email:', error);
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'VAPI Webhook',
    assistantId: '2c027356-c455-4039-bb78-f9da3184c79f',
    timestamp: new Date().toISOString(),
  });
}
