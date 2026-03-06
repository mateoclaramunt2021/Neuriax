import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(url, key);
}

export async function GET() {
  try {
    const supabase = getSupabase();
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

    // Total visitors
    const { count: totalVisitors } = await supabase
      .from('visitors')
      .select('*', { count: 'exact', head: true });

    // Today's visitors
    const { count: todayVisitors } = await supabase
      .from('visitors')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', todayStart);

    // Week visitors
    const { count: weekVisitors } = await supabase
      .from('visitors')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', weekAgo);

    // Total contacts (leads)
    const { count: totalContacts } = await supabase
      .from('contact_forms')
      .select('*', { count: 'exact', head: true });

    // Today's contacts
    const { count: todayContacts } = await supabase
      .from('contact_forms')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', todayStart);

    // Total emails sent
    const { count: totalEmails } = await supabase
      .from('email_log')
      .select('*', { count: 'exact', head: true });

    // Total chatbot conversations
    const { count: totalChats } = await supabase
      .from('chatbot_conversations')
      .select('*', { count: 'exact', head: true });

    // Top pages (last 30 days)
    const { data: pageEvents } = await supabase
      .from('visitor_events')
      .select('pagina')
      .eq('evento_tipo', 'page_view')
      .gte('timestamp', monthAgo)
      .order('timestamp', { ascending: false })
      .limit(1000);

    const pageCount: Record<string, number> = {};
    pageEvents?.forEach((e: { pagina: string }) => {
      pageCount[e.pagina] = (pageCount[e.pagina] || 0) + 1;
    });
    const topPages = Object.entries(pageCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);

    // Recent contacts
    const { data: recentContacts } = await supabase
      .from('contact_forms')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    // Recent visitors (non-anonymous)
    const { data: recentVisitors } = await supabase
      .from('visitors')
      .select('*')
      .not('email', 'like', '%anon_%')
      .order('created_at', { ascending: false })
      .limit(10);

    // Visits per day (last 30 days)
    const { data: dailyEvents } = await supabase
      .from('visitor_events')
      .select('timestamp')
      .eq('evento_tipo', 'page_view')
      .gte('timestamp', monthAgo);

    const dailyVisits: Record<string, number> = {};
    dailyEvents?.forEach((e: { timestamp: string }) => {
      const day = e.timestamp.split('T')[0];
      dailyVisits[day] = (dailyVisits[day] || 0) + 1;
    });

    // Client pipeline stats
    const { data: pipelineData } = await supabase
      .from('client_status')
      .select('status');

    const pipeline: Record<string, number> = { nuevo: 0, contactado: 0, negociacion: 0, cliente: 0, perdido: 0 };
    pipelineData?.forEach((s: { status: string }) => {
      pipeline[s.status] = (pipeline[s.status] || 0) + 1;
    });

    // Active visitors (last 5 minutes)
    const fiveMinAgo = new Date(now.getTime() - 5 * 60 * 1000).toISOString();
    const { data: activeVisitors } = await supabase
      .from('visitor_events')
      .select('visitor_id')
      .gte('timestamp', fiveMinAgo);
    const activeNow = new Set(activeVisitors?.map((v: { visitor_id: number }) => v.visitor_id)).size;

    // ── VAPI Stats ──
    const { count: todayCalls } = await supabase
      .from('vapi_calls')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', todayStart);

    const { count: totalCalls } = await supabase
      .from('vapi_calls')
      .select('*', { count: 'exact', head: true });

    const { count: pendingMeetings } = await supabase
      .from('vapi_meetings')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'scheduled')
      .gte('meeting_date', now.toISOString());

    const { data: nextMeetingData } = await supabase
      .from('vapi_meetings')
      .select('contact_name, meeting_date, meeting_type')
      .eq('status', 'scheduled')
      .gte('meeting_date', now.toISOString())
      .order('meeting_date', { ascending: true })
      .limit(1)
      .single();

    // Recent calls
    const { data: recentCalls } = await supabase
      .from('vapi_calls')
      .select('vapi_call_id, phone_number, contact_name, status, duration_seconds, meeting_scheduled, created_at')
      .order('created_at', { ascending: false })
      .limit(5);

    // Lead score stats
    const { data: leadScoreData } = await supabase
      .from('vapi_business_profiles')
      .select('lead_score');

    const allScores = (leadScoreData || []).map((r: { lead_score: number }) => r.lead_score).filter(s => s > 0);
    const avgLeadScore = allScores.length > 0
      ? Math.round((allScores.reduce((a: number, b: number) => a + b, 0) / allScores.length) * 10) / 10
      : 0;

    return NextResponse.json({
      activeNow,
      stats: {
        totalVisitors: totalVisitors || 0,
        todayVisitors: todayVisitors || 0,
        weekVisitors: weekVisitors || 0,
        totalContacts: totalContacts || 0,
        todayContacts: todayContacts || 0,
        totalEmails: totalEmails || 0,
        totalChats: totalChats || 0,
        todayCalls: todayCalls || 0,
        totalCalls: totalCalls || 0,
        pendingMeetings: pendingMeetings || 0,
        avgLeadScore,
      },
      topPages,
      recentContacts: recentContacts || [],
      recentVisitors: recentVisitors || [],
      recentCalls: recentCalls || [],
      nextMeeting: nextMeetingData || null,
      dailyVisits,
      pipeline,
    });
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json({ error: 'Error cargando datos' }, { status: 500 });
  }
}
