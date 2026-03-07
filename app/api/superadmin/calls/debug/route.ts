import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!url || !key) throw new Error('Supabase config missing');
  return createClient(url, key);
}

/**
 * GET /api/superadmin/calls/debug
 * Debug endpoint to check the state of VAPI calls and webhook logs
 */
export async function GET() {
  try {
    const supabase = getSupabase();

    // Check if vapi_calls table exists and has data
    const { count: totalCalls, error: callsError } = await supabase
      .from('vapi_calls')
      .select('*', { count: 'exact', head: true });

    // Check recent webhook logs
    const { data: recentLogs, error: logsError } = await supabase
      .from('vapi_webhook_logs')
      .select('id, event_type, call_id, processed, created_at')
      .order('created_at', { ascending: false })
      .limit(20);

    // Check recent calls
    const { data: recentCalls, error: recentError } = await supabase
      .from('vapi_calls')
      .select('vapi_call_id, phone_number, contact_name, status, duration_seconds, created_at')
      .order('created_at', { ascending: false })
      .limit(10);

    // Check unprocessed logs (potential errors)
    const { data: unprocessedLogs, error: unprocError } = await supabase
      .from('vapi_webhook_logs')
      .select('id, event_type, call_id, payload, created_at')
      .eq('processed', false)
      .order('created_at', { ascending: false })
      .limit(10);

    // Check env vars (masked)
    const envCheck = {
      SUPABASE_URL: !!process.env.SUPABASE_URL || !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
    };

    return NextResponse.json({
      status: 'debug',
      timestamp: new Date().toISOString(),
      envCheck,
      tables: {
        vapi_calls: {
          totalCount: totalCalls ?? 0,
          error: callsError?.message || null,
          recentCalls: recentCalls || [],
          recentError: recentError?.message || null,
        },
        vapi_webhook_logs: {
          recentLogs: recentLogs || [],
          logsError: logsError?.message || null,
          unprocessedLogs: unprocessedLogs || [],
          unprocError: unprocError?.message || null,
        },
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: error.message,
      hint: 'Verifica que las tablas vapi_calls y vapi_webhook_logs existen en Supabase',
    }, { status: 500 });
  }
}
