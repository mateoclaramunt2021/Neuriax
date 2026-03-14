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
// Supports multiple payload formats from VAPI API
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Helper: Extract phone/name/email from ANY VAPI payload
function extractContactFromBody(body: any): { phone: string; name: string; email: string } {
  const msg = body.message || body;
  const call = msg?.call || body.call || {};
  const customer = call?.customer || msg?.customer || body.customer || {};
  // Try structured data from analysis
  const sd = msg?.analysis?.structuredData || msg?.artifact?.analysis?.structuredData || {};
  return {
    phone: customer?.number || customer?.phone || '',
    name: customer?.name || sd?.name || sd?.nombre || sd?.customerName || '',
    email: customer?.email || sd?.email || '',
  };
}

// Helper: Extract name from summary/transcript text
function extractNameFromText(summary: string, transcript?: any[]): string {
  const namePatterns = [
    /(?:se llama|mi nombre es|soy|me llamo)\s+([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*)/i,
    /(?:caller|customer|contact|nombre|name)(?:\s*[:=]\s*|\s+(?:is|es)\s+)([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*)/i,
  ];
  for (const p of namePatterns) {
    const m = summary.match(p);
    if (m?.[1] && m[1].length > 2 && m[1].length < 50) return m[1];
  }
  if (Array.isArray(transcript)) {
    for (const msg of transcript.slice(0, 10)) {
      const text = msg.message || msg.content || msg.text || '';
      for (const p of namePatterns) {
        const m = text.match(p);
        if (m?.[1] && m[1].length > 2 && m[1].length < 50) return m[1];
      }
    }
  }
  return '';
}

// Helper: Ensure a vapi_calls record exists for a given call ID.
// This is the KEY fix: we create the call record on the FIRST event
// we receive, regardless of event type (tool-calls, status-update, etc.)
async function ensureCallRecord(
  supabase: any,
  vapiCallId: string,
  body: any,
  eventType: string
) {
  if (!vapiCallId || vapiCallId.startsWith('test-') || vapiCallId.startsWith('diag-')) return;

  const { data: existing } = await supabase
    .from('vapi_calls')
    .select('id')
    .eq('vapi_call_id', vapiCallId)
    .maybeSingle();

  if (existing) return; // Already exists

  const contact = extractContactFromBody(body);
  const msg = body.message || body;
  const call = msg?.call || body.call || {};

  const { error } = await supabase.from('vapi_calls').insert({
    vapi_call_id: vapiCallId,
    assistant_id: call?.assistantId || call?.assistant_id || msg?.assistantId || '2c027356-c455-4039-bb78-f9da3184c79f',
    phone_number: contact.phone,
    contact_name: contact.name,
    contact_email: contact.email,
    direction: call?.direction || msg?.direction || 'inbound',
    status: 'in-progress',
    started_at: call?.startedAt || call?.started_at || new Date().toISOString(),
    metadata: { created_from_event: eventType },
  });

  if (error) {
    console.error(`[VAPI] ensureCallRecord FAILED for ${vapiCallId}:`, error.message, error.details, error.hint);
  } else {
    console.log(`[VAPI] Call record created from ${eventType} event: ${vapiCallId}`);
    // Try to link to existing contact
    if (contact.phone) {
      await linkToContact(supabase, vapiCallId, contact.phone);
    }
  }
}

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const supabase = getSupabase();
  const bodyStr = JSON.stringify(body).slice(0, 3000);

  // ── Flexible event type detection ──
  // VAPI sends events in different formats depending on the version:
  // Format A: { message: { type: "...", ... } }
  // Format B: { type: "...", ... } (flat)
  // Format C: { event: "...", ... }
  const messageType =
    body.message?.type ||
    body.type ||
    body.event ||
    '';

  // Extract call ID flexibly
  const callId =
    body.message?.call?.id ||
    body.message?.callId ||
    body.call?.id ||
    body.callId ||
    body.id ||
    '';

  // Log EVERY incoming webhook for debugging
  try {
    await supabase.from('vapi_webhook_logs').insert({
      event_type: messageType || 'unknown',
      call_id: callId || null,
      payload: body,
      processed: false,
    });
  } catch (logErr) {
    console.error('[VAPI Log Error]', logErr);
  }

  console.log(`[VAPI Webhook] type=${messageType} callId=${callId} body=${bodyStr.slice(0, 500)}`);

  // ═══ UNIVERSAL: Ensure a call record exists for ANY event with a call ID ═══
  // This is crucial because VAPI may not always send status-update before other events
  if (callId) {
    await ensureCallRecord(supabase, callId, body, messageType);
  }

  try {
    // ═══ STATUS UPDATE (call started / ringing / ended) ═══
    if (messageType === 'status-update') {
      const status = body.message?.status || body.status || '';
      const call = body.message?.call || body.call || body.message || body;
      const cId = call?.id || callId;
      const phoneNumber = call?.customer?.number || body.customer?.number || '';
      const customerName = call?.customer?.name || body.customer?.name || '';

      if (cId && (status === 'in-progress' || status === 'ringing')) {
        const { error: upsertErr } = await supabase.from('vapi_calls').upsert({
          vapi_call_id: cId,
          assistant_id: call?.assistantId || call?.assistant_id || '2c027356-c455-4039-bb78-f9da3184c79f',
          phone_number: phoneNumber,
          contact_name: customerName,
          direction: call?.direction || 'inbound',
          status: status === 'ringing' ? 'ringing' : 'in-progress',
          started_at: new Date().toISOString(),
          metadata: { raw_event: `status-update-${status}` },
        }, { onConflict: 'vapi_call_id' });

        if (upsertErr) {
          console.error(`[VAPI] status-update UPSERT FAILED for ${cId}:`, upsertErr.message, upsertErr.details);
        }

        if (phoneNumber) {
          await linkToContact(supabase, cId, phoneNumber);
        }
      }

      // Mark log as processed
      await supabase.from('vapi_webhook_logs').update({ processed: true })
        .eq('call_id', callId).eq('event_type', 'status-update').order('created_at', { ascending: false }).limit(1);

      return NextResponse.json({ ok: true });
    }

    // ═══ END OF CALL REPORT ═══
    if (messageType === 'end-of-call-report') {
      const report = body.message || body;
      const cId = report?.call?.id || report?.callId || callId;

      if (!cId) {
        console.log('[VAPI] end-of-call-report without callId, skipping');
        return NextResponse.json({ ok: true, msg: 'no callId' });
      }

      // Extract data flexibly — VAPI puts data in different paths
      const transcript =
        report?.transcript ||
        report?.artifact?.transcript ||
        report?.messages ||
        body.transcript ||
        [];
      const summary =
        report?.summary ||
        report?.artifact?.summary ||
        report?.analysis?.summary ||
        body.summary ||
        '';
      const recordingUrl =
        report?.recordingUrl ||
        report?.artifact?.recordingUrl ||
        report?.recording_url ||
        body.recordingUrl ||
        '';
      const duration =
        report?.durationSeconds ||
        report?.duration ||
        report?.call?.duration ||
        body.durationSeconds ||
        body.duration ||
        0;
      const endedReason =
        report?.endedReason ||
        report?.ended_reason ||
        body.endedReason ||
        '';
      const cost =
        report?.cost ||
        report?.costBreakdown?.total ||
        body.cost ||
        0;
      const phoneNumber =
        report?.call?.customer?.number ||
        report?.customer?.number ||
        body.customer?.number ||
        '';
      let customerName =
        report?.call?.customer?.name ||
        report?.customer?.name ||
        body.customer?.name ||
        report?.analysis?.structuredData?.name ||
        report?.analysis?.structuredData?.nombre ||
        '';

      // If no name from customer object, try to extract from summary/transcript
      if (!customerName && (summary || (Array.isArray(transcript) && transcript.length > 0))) {
        customerName = extractNameFromText(summary, Array.isArray(transcript) ? transcript : []);
      }

      // Check if call exists (use maybeSingle to avoid errors)
      const { data: existingCall } = await supabase
        .from('vapi_calls')
        .select('id')
        .eq('vapi_call_id', cId)
        .maybeSingle();

      if (existingCall) {
        const { error: updateErr } = await supabase.from('vapi_calls').update({
          status: 'ended',
          ended_at: new Date().toISOString(),
          duration_seconds: Math.round(Number(duration) || 0),
          summary: summary || null,
          transcript: Array.isArray(transcript) ? transcript : [],
          recording_url: recordingUrl || null,
          ended_reason: endedReason || null,
          cost: Number(cost) || 0,
          contact_name: customerName || undefined,
        }).eq('vapi_call_id', cId);

        if (updateErr) {
          console.error(`[VAPI] end-of-call UPDATE FAILED for ${cId}:`, updateErr.message, updateErr.details);
        } else {
          console.log(`[VAPI] Call ${cId} updated to ended (duration: ${duration}s)`);
        }
      } else {
        const { error: insertErr } = await supabase.from('vapi_calls').insert({
          vapi_call_id: cId,
          assistant_id: report?.call?.assistantId || report?.assistantId || '2c027356-c455-4039-bb78-f9da3184c79f',
          phone_number: phoneNumber,
          contact_name: customerName,
          direction: report?.call?.direction || 'inbound',
          status: 'ended',
          started_at: report?.startedAt || report?.started_at || new Date().toISOString(),
          ended_at: new Date().toISOString(),
          duration_seconds: Math.round(Number(duration) || 0),
          summary: summary || null,
          transcript: Array.isArray(transcript) ? transcript : [],
          recording_url: recordingUrl || null,
          ended_reason: endedReason || null,
          cost: Number(cost) || 0,
        });

        if (insertErr) {
          console.error(`[VAPI] end-of-call INSERT FAILED for ${cId}:`, insertErr.message, insertErr.details);
        } else {
          console.log(`[VAPI] Call ${cId} inserted as ended (duration: ${duration}s)`);
        }

        if (phoneNumber) {
          await linkToContact(supabase, cId, phoneNumber);
        }
      }

      // Check if a meeting was scheduled during this call
      const meetingScheduled = await checkForScheduledMeeting(supabase, cId);

      // Send post-call email only if:
      // 1. No meeting was scheduled
      // 2. We have an email
      // 3. We have a real summary (not empty)
      if (!meetingScheduled && summary) {
        const { data: callData } = await supabase
          .from('vapi_calls')
          .select('contact_email, contact_name')
          .eq('vapi_call_id', cId)
          .single();

        if (callData?.contact_email) {
          await sendPostCallEmailWithPDF(
            callData.contact_name || 'amigo/a',
            callData.contact_email,
            summary
          );
        }
      }

      // Send notification to Mateo with call summary
      try {
        const resend = getResend();
        await resend.emails.send({
          from: 'Neuriax <hola@neuriax.com>',
          to: 'mateoclaramunt2021@gmail.com',
          subject: `📞 Llamada VAPI finalizada — ${customerName || phoneNumber || 'Desconocido'}`,
          html: `
            <div style="font-family: Arial; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #0891b2;">📞 Llamada VAPI Finalizada</h2>
              <p><strong>Contacto:</strong> ${customerName || 'No identificado'}</p>
              <p><strong>Teléfono:</strong> ${phoneNumber || 'No disponible'}</p>
              <p><strong>Duración:</strong> ${Math.round(Number(duration) || 0)} segundos</p>
              <p><strong>Motivo fin:</strong> ${endedReason || 'No especificado'}</p>
              <p><strong>Reunión agendada:</strong> ${meetingScheduled ? '✅ Sí' : '❌ No'}</p>
              ${summary ? `<h3 style="color: #0891b2;">📝 Resumen:</h3><p style="background: #f1f5f9; padding: 15px; border-radius: 8px; line-height: 1.6;">${summary}</p>` : '<p style="color:#94a3b8;">Sin resumen disponible</p>'}
              <hr style="border-color: #e2e8f0; margin: 20px 0;">
              <p style="font-size: 12px; color: #94a3b8;">ID: ${cId}</p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error('[VAPI] Error sending notification email:', emailErr);
      }

      // Mark log as processed
      await supabase.from('vapi_webhook_logs').update({ processed: true })
        .eq('call_id', cId).eq('event_type', 'end-of-call-report').order('created_at', { ascending: false }).limit(1);

      return NextResponse.json({ ok: true });
    }

    // ═══ TOOL CALLS (agent uses a function) ═══
    if (messageType === 'tool-calls' || messageType === 'function-call') {
      const toolCalls =
        body.message?.toolCalls ||
        body.message?.toolCallList ||
        body.toolCalls ||
        body.toolCallList ||
        (body.message?.functionCall ? [{ function: body.message.functionCall }] : []) ||
        (body.functionCall ? [{ function: body.functionCall }] : []) ||
        [];

      // Also support single tool call format
      if (toolCalls.length === 0 && (body.message?.function || body.function)) {
        toolCalls.push({ function: body.message?.function || body.function });
      }

      const toolCallId =
        body.message?.call?.id ||
        body.message?.callId ||
        body.call?.id ||
        body.callId ||
        callId;

      for (const toolCall of toolCalls) {
        const fnName =
          toolCall?.function?.name ||
          toolCall?.name ||
          toolCall?.functionName ||
          '';

        const rawArgs = toolCall?.function?.arguments || toolCall?.arguments || toolCall?.input || {};
        const args = typeof rawArgs === 'string' ? JSON.parse(rawArgs) : rawArgs;

        // ── Handle meeting scheduling ──
        if (['schedule_meeting', 'agendar_reunion', 'book_meeting', 'bookMeeting', 'agendar_reunión'].includes(fnName)) {
          const meetingDate = args.date || args.fecha || args.meeting_date || '';
          const meetingTime = args.time || args.hora || args.meeting_time || '';
          const name = args.name || args.nombre || args.contact_name || '';
          const email = args.email || args.contact_email || '';
          const phone = args.phone || args.telefono || args.contact_phone || '';
          const type = args.type || args.tipo || args.meeting_type || 'demo';
          const notes = args.notes || args.notas || '';

          let meetingDatetime: Date;
          try {
            if (meetingDate && meetingTime) {
              meetingDatetime = new Date(`${meetingDate}T${meetingTime}`);
            } else if (meetingDate) {
              meetingDatetime = new Date(meetingDate);
            } else {
              meetingDatetime = new Date(Date.now() + 24 * 60 * 60 * 1000);
            }
            if (isNaN(meetingDatetime.getTime())) {
              meetingDatetime = new Date(Date.now() + 24 * 60 * 60 * 1000);
            }
          } catch {
            meetingDatetime = new Date(Date.now() + 24 * 60 * 60 * 1000);
          }

          await supabase.from('vapi_meetings').insert({
            vapi_call_id: toolCallId,
            contact_name: name,
            contact_email: email,
            contact_phone: phone,
            meeting_date: meetingDatetime.toISOString(),
            meeting_type: type,
            notes,
            status: 'scheduled',
          });

          if (toolCallId) {
            const updateData: any = { meeting_scheduled: true };
            if (name) updateData.contact_name = name;
            if (email) updateData.contact_email = email;
            if (phone) updateData.phone_number = phone;

            const { error: meetUpdateErr } = await supabase.from('vapi_calls')
              .update(updateData)
              .eq('vapi_call_id', toolCallId);

            if (meetUpdateErr) {
              console.error(`[VAPI] Failed to update call ${toolCallId} with meeting info:`, meetUpdateErr.message);
            }
          }

          if (email) {
            await sendMeetingConfirmationWithPDF({
              nombre: name || 'amigo/a',
              email,
              fecha: formatDateES(meetingDatetime),
              hora: formatTimeES(meetingDatetime),
              tipoReunion: type,
            });
          }

          if (phone || email) {
            await linkToContactFromMeeting(supabase, toolCallId, { name, email, phone });
          }

          console.log(`[VAPI] Meeting scheduled: ${name} ${email} ${meetingDate} ${meetingTime}`);
        }

        // ── Handle business profile ──
        if (['guardar_perfil_negocio', 'save_business_profile'].includes(fnName)) {
          const sector = args.sector || 'otro';
          const nombreNegocio = args.nombre_negocio || args.business_name || '';
          const numEmpleados = args.num_empleados || args.employees || 'no_definido';
          const problemaPrincipal = args.problema_principal || args.main_problem || '';
          const herramientasActuales = args.herramientas_actuales || args.current_tools || '';
          const experienciaIa = args.experiencia_ia || args.ai_experience || 'ninguna';
          const presupuestoMensual = args.presupuesto_mensual || args.monthly_budget || 'no_definido';
          const urgencia = args.urgencia || args.urgency || 'media';
          const notas = args.notas || args.notes || '';

          const leadScore = calculateLeadScore({
            sector, numEmpleados, experienciaIa, presupuestoMensual, urgencia, problemaPrincipal,
          });

          await supabase.from('vapi_business_profiles').insert({
            vapi_call_id: toolCallId,
            sector,
            nombre_negocio: nombreNegocio,
            num_empleados: numEmpleados,
            problema_principal: problemaPrincipal,
            herramientas_actuales: herramientasActuales,
            experiencia_ia: experienciaIa,
            presupuesto_mensual: presupuestoMensual,
            urgencia,
            notas,
            lead_score: leadScore,
          });

          console.log(`[VAPI] Business profile saved — Score: ${leadScore}/10, Sector: ${sector}`);
        }
      }

      // Mark log as processed
      await supabase.from('vapi_webhook_logs').update({ processed: true })
        .eq('call_id', callId).eq('event_type', messageType).order('created_at', { ascending: false }).limit(1);

      // VAPI expects tool call results in a specific format
      // Return results so VAPI can continue the conversation
      return NextResponse.json({ ok: true, results: [{ result: 'success' }] });
    }

    // ═══ HANG / SPEECH / TRANSCRIPT / CONVERSATION-UPDATE — acknowledge ═══
    // These are common VAPI events we don't need to process
    // ensureCallRecord already ran above, so the call IS tracked
    if (['hang', 'speech-update', 'transcript', 'conversation-update', 'model-output', 'voice-input', 'user-interrupted', 'transfer-destination-request', 'assistant-request'].includes(messageType)) {
      await supabase.from('vapi_webhook_logs').update({ processed: true })
        .eq('call_id', callId).eq('event_type', messageType).order('created_at', { ascending: false }).limit(1);
      return NextResponse.json({ ok: true });
    }

    // ═══ Unknown event — log it but don't error ═══
    // ensureCallRecord already ran, so even unknown events create call records
    console.log(`[VAPI Webhook] Unhandled event type: ${messageType}, callId: ${callId}`);
    return NextResponse.json({ ok: true, unhandled: messageType });
  } catch (error) {
    console.error('[VAPI Webhook Error]', error);

    // Log the error
    try {
      await supabase.from('vapi_webhook_logs').update({
        processed: false,
        error: String(error),
      }).eq('call_id', callId).eq('event_type', messageType).order('created_at', { ascending: false }).limit(1);
    } catch { /* ignore */ }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Lead Score Calculator
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function calculateLeadScore(data: {
  sector: string;
  numEmpleados: string;
  experienciaIa: string;
  presupuestoMensual: string;
  urgencia: string;
  problemaPrincipal: string;
}): number {
  let score = 5; // base

  // Sector bonus (high-value sectors)
  const highValueSectors = ['ecommerce', 'inmobiliaria', 'clinica', 'abogados', 'asesoria'];
  const midValueSectors = ['hosteleria', 'marketing', 'retail', 'formacion', 'tecnologia'];
  if (highValueSectors.includes(data.sector)) score += 2;
  else if (midValueSectors.includes(data.sector)) score += 1;

  // Employees bonus (bigger = higher potential)
  if (data.numEmpleados === '50+') score += 2;
  else if (data.numEmpleados === '21-50') score += 1.5;
  else if (data.numEmpleados === '6-20') score += 1;

  // Budget bonus
  if (data.presupuestoMensual === 'mas_2000') score += 2;
  else if (data.presupuestoMensual === '500_2000') score += 1.5;
  else if (data.presupuestoMensual === '100_500') score += 0.5;
  else if (data.presupuestoMensual === 'menos_100') score -= 0.5;

  // Urgency bonus
  if (data.urgencia === 'alta') score += 1;
  else if (data.urgencia === 'baja') score -= 0.5;

  // AI experience (less = more upside)
  if (data.experienciaIa === 'ninguna') score += 0.5;
  else if (data.experienciaIa === 'avanzada') score -= 0.5;

  // Has a clear problem identified
  if (data.problemaPrincipal && data.problemaPrincipal.length > 15) score += 0.5;

  // Clamp between 1-10
  return Math.max(1, Math.min(10, Math.round(score)));
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
