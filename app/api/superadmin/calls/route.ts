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
      { data: leadScores },
    ] = await Promise.all([
      supabase.from('vapi_calls').select('*', { count: 'exact', head: true }),
      supabase.from('vapi_calls').select('*', { count: 'exact', head: true })
        .gte('created_at', new Date(new Date().setHours(0, 0, 0, 0)).toISOString()),
      supabase.from('vapi_calls').select('duration_seconds').eq('status', 'ended'),
      supabase.from('vapi_calls').select('*', { count: 'exact', head: true }).eq('meeting_scheduled', true),
      supabase.from('vapi_business_profiles').select('lead_score'),
    ]);

    const durations = (avgDuration || []).map(r => r.duration_seconds).filter(d => d > 0);
    const avgDur = durations.length > 0
      ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
      : 0;

    const conversionRate = (totalCalls || 0) > 0
      ? Math.round(((meetingsFromCalls || 0) / (totalCalls || 1)) * 100)
      : 0;

    const scores = (leadScores || []).map(r => r.lead_score).filter(s => s > 0);
    const avgLeadScore = scores.length > 0
      ? Math.round((scores.reduce((a: number, b: number) => a + b, 0) / scores.length) * 10) / 10
      : 0;

    // ── Call List with business profiles ──
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

    // Fetch business profiles for these calls
    const callIds = (calls || []).map(c => c.vapi_call_id).filter(Boolean);
    let profilesMap: Record<string, any> = {};

    if (callIds.length > 0) {
      const { data: profiles } = await supabase
        .from('vapi_business_profiles')
        .select('*')
        .in('vapi_call_id', callIds);

      if (profiles) {
        for (const p of profiles) {
          profilesMap[p.vapi_call_id] = p;
        }
      }
    }

    // Merge calls with their business profiles
    const callsWithProfiles = (calls || []).map(call => ({
      ...call,
      business_profile: profilesMap[call.vapi_call_id] || null,
    }));

    // Sector breakdown
    const sectorCounts: Record<string, number> = {};
    (leadScores as any[] || []).forEach(() => {}); // placeholder
    const { data: sectorData } = await supabase
      .from('vapi_business_profiles')
      .select('sector');
    if (sectorData) {
      for (const row of sectorData) {
        sectorCounts[row.sector] = (sectorCounts[row.sector] || 0) + 1;
      }
    }

    return NextResponse.json({
      stats: {
        totalCalls: totalCalls || 0,
        todayCalls: todayCalls || 0,
        avgDurationSeconds: avgDur,
        conversionRate,
        meetingsFromCalls: meetingsFromCalls || 0,
        avgLeadScore,
        totalProfiles: scores.length,
        topSectors: Object.entries(sectorCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5),
      },
      calls: callsWithProfiles,
    });
  } catch (error) {
    console.error('[Calls API Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
