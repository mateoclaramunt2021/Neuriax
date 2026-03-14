import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!url || !key) throw new Error('Supabase config missing');
  return createClient(url, key);
}

// Extract the caller's name from VAPI analysis or transcript
function extractNameFromCall(call: any): string {
  // 1. Customer object
  if (call.customer?.name) return call.customer.name;
  // 2. Analysis structured data
  const sd = call.analysis?.structuredData || call.artifact?.analysis?.structuredData;
  if (sd?.name || sd?.nombre || sd?.customerName || sd?.contact_name) {
    return sd.name || sd.nombre || sd.customerName || sd.contact_name;
  }
  // 3. Try to find name in summary
  const summary = call.analysis?.summary || call.artifact?.analysis?.summary || call.summary || '';
  const namePatterns = [
    /(?:se llama|mi nombre es|soy|me llamo)\s+([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*)/i,
    /(?:caller|customer|contact|nombre)(?:\s*[:=]\s*|\s+is\s+)([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*)/i,
  ];
  for (const pattern of namePatterns) {
    const match = summary.match(pattern);
    if (match?.[1] && match[1].length > 2 && match[1].length < 50) return match[1];
  }
  // 4. Try from transcript
  const transcript = call.artifact?.transcript || call.transcript || [];
  if (Array.isArray(transcript)) {
    for (const msg of transcript.slice(0, 10)) {
      const text = msg.message || msg.content || msg.text || '';
      for (const pattern of namePatterns) {
        const match = text.match(pattern);
        if (match?.[1] && match[1].length > 2 && match[1].length < 50) return match[1];
      }
    }
  }
  return '';
}

// Paginated fetch from VAPI API — gets ALL calls
async function fetchAllVapiCalls(apiKey: string): Promise<any[]> {
  const allCalls: any[] = [];
  let cursor: string | undefined;
  const maxPages = 10; // Safety limit

  for (let page = 0; page < maxPages; page++) {
    const url = new URL('https://api.vapi.ai/call');
    url.searchParams.set('limit', '100');
    if (cursor) url.searchParams.set('createdAtLt', cursor);

    const res = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) break;

    const data = await res.json();
    const calls = Array.isArray(data) ? data : (data.results || data.data || []);
    if (calls.length === 0) break;

    allCalls.push(...calls);

    // Use the last call's createdAt for cursor-based pagination
    const lastCall = calls[calls.length - 1];
    const lastDate = lastCall?.createdAt || lastCall?.startedAt;
    if (!lastDate || calls.length < 100) break;
    cursor = lastDate;
  }

  return allCalls;
}

/**
 * GET /api/vapi/sync — Fetch ALL calls from VAPI API and sync into Supabase
 * - Paginates to get every call
 * - Always updates existing records if data is missing (name, summary, transcript, etc.)
 * - Extracts caller names from analysis/transcript
 * - Cleans up test/junk records
 */
export async function GET() {
  const vapiPrivateKey = process.env.VAPI_PRIVATE_KEY;

  if (!vapiPrivateKey) {
    return NextResponse.json({ error: 'VAPI_PRIVATE_KEY not configured' }, { status: 500 });
  }

  const supabase = getSupabase();
  const results: any = {
    timestamp: new Date().toISOString(),
    fetched: 0,
    synced: 0,
    updated: 0,
    inserted: 0,
    skipped: 0,
    cleaned: 0,
    errors: [],
  };

  try {
    // Fetch ALL calls from VAPI with pagination
    const calls = await fetchAllVapiCalls(vapiPrivateKey);
    results.fetched = calls.length;

    for (const call of calls) {
      const vapiCallId = call.id;
      if (!vapiCallId) continue;

      // Extract all fields from VAPI response
      const phoneNumber = call.customer?.number || '';
      const customerName = extractNameFromCall(call);
      const customerEmail = call.customer?.email || '';
      const direction = call.type === 'outboundPhoneCall' ? 'outbound' : 'inbound';
      const status = call.status === 'ended' ? 'ended' : call.status || 'unknown';
      const startedAt = call.startedAt || call.createdAt || new Date().toISOString();
      const endedAt = call.endedAt || null;

      let durationSeconds = 0;
      if (endedAt && startedAt) {
        durationSeconds = Math.max(0, Math.round(
          (new Date(endedAt).getTime() - new Date(startedAt).getTime()) / 1000
        ));
      }

      const summary = call.analysis?.summary || call.artifact?.analysis?.summary || call.summary || '';
      const transcript = call.artifact?.transcript || call.transcript || [];
      const recordingUrl = call.artifact?.recordingUrl || call.recordingUrl || '';
      const endedReason = call.endedReason || '';
      const cost = call.cost || call.costs?.total || 0;

      // Check if already in our DB
      const { data: existing } = await supabase
        .from('vapi_calls')
        .select('id, status, contact_name, summary, transcript, recording_url, duration_seconds, phone_number')
        .eq('vapi_call_id', vapiCallId)
        .maybeSingle();

      if (existing) {
        // Build update object — only update fields that are missing or incomplete
        const updates: Record<string, any> = {};

        if (existing.status !== 'ended' && status === 'ended') {
          updates.status = 'ended';
          updates.ended_at = endedAt;
          updates.ended_reason = endedReason || null;
        }
        if (!existing.contact_name && customerName) updates.contact_name = customerName;
        if (!existing.summary && summary) updates.summary = summary;
        if (!existing.recording_url && recordingUrl) updates.recording_url = recordingUrl;
        if ((!existing.duration_seconds || existing.duration_seconds === 0) && durationSeconds > 0) {
          updates.duration_seconds = durationSeconds;
        }
        if (!existing.phone_number && phoneNumber) updates.phone_number = phoneNumber;
        if (customerEmail) updates.contact_email = customerEmail;

        // Always update transcript if we have one and existing is empty
        const existingTranscript = existing.transcript;
        const hasExistingTranscript = Array.isArray(existingTranscript) && existingTranscript.length > 0;
        if (!hasExistingTranscript && Array.isArray(transcript) && transcript.length > 0) {
          updates.transcript = transcript;
        }

        if (Number(cost) > 0) updates.cost = Number(cost);

        if (Object.keys(updates).length > 0) {
          const { error: updateErr } = await supabase.from('vapi_calls')
            .update(updates)
            .eq('vapi_call_id', vapiCallId);

          if (updateErr) {
            results.errors.push({ callId: vapiCallId, action: 'update', error: updateErr.message });
          } else {
            results.updated++;
            results.synced++;
          }
        } else {
          results.skipped++;
        }
      } else {
        // Insert new call
        const { error: insertErr } = await supabase.from('vapi_calls').insert({
          vapi_call_id: vapiCallId,
          assistant_id: call.assistantId || call.assistant?.id || '',
          phone_number: phoneNumber,
          contact_name: customerName,
          contact_email: customerEmail,
          direction,
          status,
          started_at: startedAt,
          ended_at: endedAt,
          duration_seconds: durationSeconds,
          summary: summary || null,
          transcript: Array.isArray(transcript) ? transcript : [],
          recording_url: recordingUrl || null,
          ended_reason: endedReason || null,
          cost: Number(cost) || 0,
          metadata: { synced_from_api: true },
        });

        if (insertErr) {
          results.errors.push({ callId: vapiCallId, action: 'insert', error: insertErr.message });
        } else {
          results.inserted++;
          results.synced++;
        }
      }
    }

    // Clean up test/diagnostic records
    const { count: testCleaned } = await supabase.from('vapi_calls').delete({ count: 'exact' })
      .or('vapi_call_id.like.test-%,vapi_call_id.like.diag-%');
    results.cleaned += testCleaned || 0;

    // Fix stuck "in-progress" calls older than 1 hour — they're clearly ended
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count: stuckFixed } = await supabase.from('vapi_calls')
      .update({ status: 'ended', ended_reason: 'sync-timeout-fix' })
      .eq('status', 'in-progress')
      .lt('created_at', oneHourAgo)
      .select('id', { count: 'exact', head: true });
    if (stuckFixed) results.cleaned += stuckFixed;

    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      results,
    }, { status: 500 });
  }
}
