import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(url, key);
}

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

    // All page views in period
    const { data: events } = await supabase
      .from('visitor_events')
      .select('*')
      .gte('timestamp', since)
      .order('timestamp', { ascending: false })
      .limit(5000);

    // Visitors in period
    const { data: visitors } = await supabase
      .from('visitors')
      .select('*')
      .gte('created_at', since)
      .order('created_at', { ascending: false })
      .limit(1000);

    // Page views per page
    const pageViews: Record<string, number> = {};
    const pageTimeSpent: Record<string, number[]> = {};
    const dailyViews: Record<string, number> = {};
    const hourlyViews: Record<number, number> = {};
    const referrers: Record<string, number> = {};
    let totalTimeSpent = 0;
    let timeSpentCount = 0;

    events?.forEach((e: any) => {
      if (e.evento_tipo === 'page_view') {
        pageViews[e.pagina] = (pageViews[e.pagina] || 0) + 1;
        
        const day = e.timestamp.split('T')[0];
        dailyViews[day] = (dailyViews[day] || 0) + 1;

        const hour = new Date(e.timestamp).getHours();
        hourlyViews[hour] = (hourlyViews[hour] || 0) + 1;

        if (e.datos_adicionales?.referrer) {
          const ref = e.datos_adicionales.referrer;
          try {
            const hostname = new URL(ref).hostname;
            if (hostname) {
              referrers[hostname] = (referrers[hostname] || 0) + 1;
            }
          } catch {
            referrers['directo'] = (referrers['directo'] || 0) + 1;
          }
        } else {
          referrers['directo'] = (referrers['directo'] || 0) + 1;
        }
      }

      if (e.evento_tipo === 'time_spent' && e.datos_adicionales?.segundos) {
        totalTimeSpent += e.datos_adicionales.segundos;
        timeSpentCount++;
        
        if (!pageTimeSpent[e.pagina]) pageTimeSpent[e.pagina] = [];
        pageTimeSpent[e.pagina].push(e.datos_adicionales.segundos);
      }
    });

    // Button clicks
    const buttonClicks: Record<string, number> = {};
    events?.filter((e: any) => e.evento_tipo === 'button_click').forEach((e: any) => {
      const btn = e.datos_adicionales?.button || e.pagina;
      buttonClicks[btn] = (buttonClicks[btn] || 0) + 1;
    });

    // Top pages sorted
    const topPages = Object.entries(pageViews)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 20)
      .map(([page, views]) => ({
        page,
        views,
        avgTime: pageTimeSpent[page]
          ? Math.round(pageTimeSpent[page].reduce((a, b) => a + b, 0) / pageTimeSpent[page].length)
          : 0,
      }));

    // Top referrers
    const topReferrers = Object.entries(referrers)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);

    // Top buttons
    const topButtons = Object.entries(buttonClicks)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);

    // Active visitors (last 5 min)
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { data: activeEvents } = await supabase
      .from('visitor_events')
      .select('visitor_id, pagina, timestamp')
      .gte('timestamp', fiveMinAgo)
      .order('timestamp', { ascending: false });

    const activeVisitors = new Set(activeEvents?.map((e: any) => e.visitor_id));

    return NextResponse.json({
      overview: {
        totalPageViews: events?.filter((e: any) => e.evento_tipo === 'page_view').length || 0,
        uniqueVisitors: visitors?.length || 0,
        avgTimeOnSite: timeSpentCount > 0 ? Math.round(totalTimeSpent / timeSpentCount) : 0,
        activeNow: activeVisitors.size,
        bounceRate: 0, // Would need session tracking for this
      },
      topPages,
      dailyViews,
      hourlyViews,
      topReferrers,
      topButtons,
      activePages: activeEvents?.slice(0, 10) || [],
    });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json({ error: 'Error cargando analíticas' }, { status: 500 });
  }
}
