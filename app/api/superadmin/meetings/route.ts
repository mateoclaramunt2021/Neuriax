import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!url || !key) throw new Error('Supabase config missing');
  return createClient(url, key);
}

/**
 * GET /api/superadmin/meetings — returns all VAPI meetings data
 * Query params: ?status=scheduled&limit=50&offset=0
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
      { count: total },
      { count: scheduled },
      { count: completed },
      { count: noShow },
      { count: thisWeek },
    ] = await Promise.all([
      supabase.from('vapi_meetings').select('*', { count: 'exact', head: true }),
      supabase.from('vapi_meetings').select('*', { count: 'exact', head: true }).eq('status', 'scheduled'),
      supabase.from('vapi_meetings').select('*', { count: 'exact', head: true }).eq('status', 'completed'),
      supabase.from('vapi_meetings').select('*', { count: 'exact', head: true }).eq('status', 'no-show'),
      supabase.from('vapi_meetings').select('*', { count: 'exact', head: true })
        .eq('status', 'scheduled')
        .gte('meeting_date', new Date().toISOString())
        .lte('meeting_date', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()),
    ]);

    // ── Meeting List ──
    let query = supabase
      .from('vapi_meetings')
      .select('*')
      .order('meeting_date', { ascending: true })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data: meetings, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // ── Next meeting ──
    const { data: nextMeeting } = await supabase
      .from('vapi_meetings')
      .select('*')
      .eq('status', 'scheduled')
      .gte('meeting_date', new Date().toISOString())
      .order('meeting_date', { ascending: true })
      .limit(1)
      .single();

    return NextResponse.json({
      stats: {
        total: total || 0,
        scheduled: scheduled || 0,
        completed: completed || 0,
        noShow: noShow || 0,
        thisWeek: thisWeek || 0,
      },
      meetings: meetings || [],
      nextMeeting: nextMeeting || null,
    });
  } catch (error) {
    console.error('[Meetings API Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * PATCH /api/superadmin/meetings — update meeting status
 * Body: { id: number, status: string, notes?: string }
 */
export async function PATCH(req: Request) {
  try {
    const supabase = getSupabase();
    const { id, status: newStatus, notes } = await req.json();

    if (!id || !newStatus) {
      return NextResponse.json({ error: 'id and status required' }, { status: 400 });
    }

    const updateData: Record<string, unknown> = { status: newStatus };
    if (notes !== undefined) updateData.notes = notes;

    const { error } = await supabase
      .from('vapi_meetings')
      .update(updateData)
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[Meetings PATCH Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
