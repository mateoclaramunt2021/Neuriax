import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!url || !key) throw new Error('Supabase config missing');
  return createClient(url, key);
}

/**
 * GET /api/vapi/sync — Fetch calls from VAPI API and sync into Supabase
 * This backfills any calls that were missed by the webhook
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
    skipped: 0,
    errors: [],
    calls: [],
  };

  try {
    // Fetch recent calls from VAPI API
    const vapiResponse = await fetch('https://api.vapi.ai/call?limit=50', {
      headers: {
        'Authorization': `Bearer ${vapiPrivateKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!vapiResponse.ok) {
      const errorText = await vapiResponse.text();
      return NextResponse.json({
        error: `VAPI API returned ${vapiResponse.status}`,
        details: errorText,
      }, { status: 502 });
    }

    const vapiData = await vapiResponse.json();
    // VAPI API returns either an array or { results: [...] }
    const calls = Array.isArray(vapiData) ? vapiData : (vapiData.results || vapiData.data || []);

    results.fetched = calls.length;

    for (const call of calls) {
      const vapiCallId = call.id;
      if (!vapiCallId) continue;

      // Check if already in our DB
      const { data: existing } = await supabase
        .from('vapi_calls')
        .select('id, status')
        .eq('vapi_call_id', vapiCallId)
        .maybeSingle();

      const phoneNumber = call.customer?.number || '';
      const customerName = call.customer?.name || '';
      const customerEmail = call.customer?.email || '';
      const direction = call.type === 'outboundPhoneCall' ? 'outbound' : 'inbound';
      const status = call.status === 'ended' ? 'ended' : call.status || 'unknown';
      const startedAt = call.startedAt || call.createdAt || new Date().toISOString();
      const endedAt = call.endedAt || null;
      const durationSeconds = call.costs
        ? Math.round((new Date(endedAt || Date.now()).getTime() - new Date(startedAt).getTime()) / 1000)
        : 0;
      const summary = call.analysis?.summary || call.summary || '';
      const transcript = call.artifact?.transcript || call.transcript || [];
      const recordingUrl = call.artifact?.recordingUrl || call.recordingUrl || '';
      const endedReason = call.endedReason || '';
      const cost = call.cost || call.costs?.total || 0;

      const callSummary = {
        vapi_call_id: vapiCallId,
        status,
        phone: phoneNumber,
        name: customerName,
        duration: durationSeconds,
        hasSummary: !!summary,
      };

      if (existing) {
        // Update if our record is incomplete (status not 'ended' but VAPI says it ended)
        if (existing.status !== 'ended' && status === 'ended') {
          const { error: updateErr } = await supabase.from('vapi_calls').update({
            status: 'ended',
            ended_at: endedAt,
            duration_seconds: durationSeconds,
            summary: summary || null,
            transcript: Array.isArray(transcript) ? transcript : [],
            recording_url: recordingUrl || null,
            ended_reason: endedReason || null,
            cost: Number(cost) || 0,
            contact_name: customerName || undefined,
            contact_email: customerEmail || undefined,
            phone_number: phoneNumber || undefined,
          }).eq('vapi_call_id', vapiCallId);

          if (updateErr) {
            results.errors.push({ callId: vapiCallId, action: 'update', error: updateErr.message });
          } else {
            results.synced++;
            results.calls.push({ ...callSummary, action: 'updated' });
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
          results.synced++;
          results.calls.push({ ...callSummary, action: 'inserted' });
        }
      }
    }

    // Also clean up test/diagnostic records
    await supabase.from('vapi_calls').delete()
      .or('vapi_call_id.like.test-%,vapi_call_id.like.diag-%');

    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      results,
    }, { status: 500 });
  }
}
