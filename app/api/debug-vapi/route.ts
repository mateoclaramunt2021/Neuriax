import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * GET /api/debug-vapi — PUBLIC diagnostic endpoint (temporary)
 * Checks Supabase connectivity, table structure, and recent data
 * DELETE THIS AFTER DEBUGGING
 */
export async function GET() {
  const results: Record<string, any> = {
    timestamp: new Date().toISOString(),
    checks: {},
  };

  // 1. Check env vars
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  results.checks.envVars = {
    SUPABASE_URL: supabaseUrl ? `✅ ${supabaseUrl.slice(0, 30)}...` : '❌ MISSING',
    SUPABASE_SERVICE_ROLE_KEY: serviceKey ? `✅ (${serviceKey.length} chars, starts: ${serviceKey.slice(0, 15)}...)` : '❌ MISSING',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: anonKey ? `✅ (${anonKey.length} chars)` : '❌ MISSING',
    serviceKeyIsJWT: serviceKey.split('.').length === 3 ? '✅ Valid JWT format' : `❌ NOT a JWT (has ${serviceKey.split('.').length} parts)`,
    anonKeyIsJWT: anonKey.split('.').length === 3 ? '✅ Valid JWT format' : `❌ NOT a JWT (has ${anonKey.split('.').length} parts)`,
  };

  // 2. Try connecting with service key
  try {
    const supabaseService = createClient(supabaseUrl, serviceKey);
    
    // Test: read from vapi_calls
    const { data: callsData, error: callsError, count: callsCount } = await supabaseService
      .from('vapi_calls')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(3);

    results.checks.serviceKeyConnection = {
      status: callsError ? '❌ FAILED' : '✅ OK',
      error: callsError ? callsError.message : null,
      errorCode: callsError ? callsError.code : null,
      errorDetails: callsError ? callsError.details : null,
      totalCalls: callsCount,
      recentCalls: callsData?.map(c => ({
        id: c.id,
        vapi_call_id: c.vapi_call_id,
        status: c.status,
        created_at: c.created_at,
      })) || [],
    };

    // Test: try to insert and then delete a test row
    const testId = `diag-test-${Date.now()}`;
    const { data: insertData, error: insertError } = await supabaseService
      .from('vapi_calls')
      .insert({
        vapi_call_id: testId,
        assistant_id: 'test',
        phone_number: '+0000000000',
        direction: 'inbound',
        status: 'test-diagnostic',
        started_at: new Date().toISOString(),
      })
      .select();

    results.checks.insertTest = {
      status: insertError ? '❌ INSERT FAILED' : '✅ INSERT OK',
      error: insertError?.message || null,
      errorCode: insertError?.code || null,
      errorHint: insertError?.hint || null,
      errorDetails: insertError?.details || null,
      insertedRow: insertData?.[0] ? Object.keys(insertData[0]) : null,
    };

    // Clean up test row
    if (!insertError) {
      await supabaseService.from('vapi_calls').delete().eq('vapi_call_id', testId);
      results.checks.insertTest.cleanedUp = true;
    }

    // Test: update an existing call
    if (callsData && callsData.length > 0) {
      const testCall = callsData[0];
      const { error: updateError } = await supabaseService
        .from('vapi_calls')
        .update({ metadata: { diagnostic_test: true, timestamp: new Date().toISOString() } })
        .eq('vapi_call_id', testCall.vapi_call_id);

      results.checks.updateTest = {
        status: updateError ? '❌ UPDATE FAILED' : '✅ UPDATE OK',
        error: updateError?.message || null,
        errorCode: updateError?.code || null,
        testedOn: testCall.vapi_call_id,
      };
    }

    // Test: check webhook logs table
    const { data: logsData, error: logsError, count: logsCount } = await supabaseService
      .from('vapi_webhook_logs')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(5);

    results.checks.webhookLogs = {
      status: logsError ? '❌ FAILED' : '✅ OK',
      error: logsError?.message || null,
      totalLogs: logsCount,
      recentLogs: logsData?.map(l => ({
        id: l.id,
        event_type: l.event_type,
        call_id: l.call_id,
        processed: l.processed,
        created_at: l.created_at,
        hasPayload: !!l.payload,
      })) || [],
    };

    // Check if there are unprocessed end-of-call-report logs (these would show failed processing)
    const { data: failedLogs } = await supabaseService
      .from('vapi_webhook_logs')
      .select('event_type, call_id, payload, created_at')
      .eq('processed', false)
      .in('event_type', ['end-of-call-report', 'status-update'])
      .order('created_at', { ascending: false })
      .limit(5);

    results.checks.failedEvents = {
      count: failedLogs?.length || 0,
      events: failedLogs?.map(l => ({
        event_type: l.event_type,
        call_id: l.call_id,
        created_at: l.created_at,
        payloadKeys: l.payload ? Object.keys(l.payload) : [],
      })) || [],
    };

  } catch (err: any) {
    results.checks.serviceKeyConnection = {
      status: '❌ EXCEPTION',
      message: err.message,
    };
  }

  // 3. Try connecting with anon key
  try {
    const supabaseAnon = createClient(supabaseUrl, anonKey);
    const { data, error } = await supabaseAnon
      .from('vapi_calls')
      .select('id', { count: 'exact', head: true });

    results.checks.anonKeyConnection = {
      status: error ? `❌ ${error.message}` : '✅ OK',
      hint: error?.hint || null,
      note: 'If this fails with RLS, that is expected — service key should bypass RLS',
    };
  } catch (err: any) {
    results.checks.anonKeyConnection = {
      status: '❌ EXCEPTION',
      message: err.message,
    };
  }

  // 4. Check columns of vapi_calls by reading a row
  try {
    const supabase = createClient(supabaseUrl, serviceKey);
    const { data } = await supabase.from('vapi_calls').select('*').limit(1);
    if (data && data.length > 0) {
      results.checks.tableColumns = {
        vapi_calls: Object.keys(data[0]),
      };
    } else {
      results.checks.tableColumns = {
        vapi_calls: 'No rows to inspect — columns unknown',
      };
    }
  } catch {}

  return NextResponse.json(results, { status: 200 });
}
