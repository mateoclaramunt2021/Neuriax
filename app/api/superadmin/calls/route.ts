import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!url || !key) throw new Error('Supabase config missing');
  return createClient(url, key);
}

/**
 * GET /api/superadmin/calls — returns all VAPI calls data
 * Query params: ?status=ended&limit=50&offset=0
 */
export async function GET(req: Request) {
  try {
    const supabase = getSupabase();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // ── Stats ──
    const [
      { count: totalCalls },
      { count: todayCalls },
      { data: avgDuration },
      { count: meetingsFromCalls },
    ] = await Promise.all([
      supabase.from('vapi_calls').select('*', { count: 'exact', head: true }),
      supabase.from('vapi_calls').select('*', { count: 'exact', head: true })
        .gte('created_at', new Date(new Date().setHours(0, 0, 0, 0)).toISOString()),
      supabase.from('vapi_calls').select('duration_seconds').eq('status', 'ended'),
      supabase.from('vapi_calls').select('*', { count: 'exact', head: true }).eq('meeting_scheduled', true),
    ]);

    const durations = (avgDuration || []).map(r => r.duration_seconds).filter(d => d > 0);
    const avgDur = durations.length > 0
      ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
      : 0;

    const conversionRate = (totalCalls || 0) > 0
      ? Math.round(((meetingsFromCalls || 0) / (totalCalls || 1)) * 100)
      : 0;

    // ── Call List ──
    let query = supabase
      .from('vapi_calls')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data: calls, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      stats: {
        totalCalls: totalCalls || 0,
        todayCalls: todayCalls || 0,
        avgDurationSeconds: avgDur,
        conversionRate,
        meetingsFromCalls: meetingsFromCalls || 0,
      },
      calls: calls || [],
    });
  } catch (error) {
    console.error('[Calls API Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
