import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(url, key);
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const { type, visitorId, pathname, referrer, timeSpent, buttonId } = await request.json();

    // === CREATE VISITOR ===
    if (type === 'create_visitor') {
      const { data, error } = await supabase
        .from('visitors')
        .insert([{ email: `anon_${Date.now()}@tracking.local`, nombre: null, telefono: null }])
        .select('id')
        .single();

      if (error) {
        console.error('Track create_visitor error:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
      }

      return NextResponse.json({ visitorId: data.id });
    }

    // === PAGE VIEW ===
    if (type === 'page_view' && visitorId) {
      await supabase.from('visitor_events').insert([{
        visitor_id: visitorId,
        pagina: pathname || '/',
        evento_tipo: 'page_view',
        datos_adicionales: { referrer: referrer || '' },
      }]);

      return NextResponse.json({ ok: true });
    }

    // === TIME SPENT ===
    if (type === 'time_spent' && visitorId && timeSpent > 5) {
      await supabase.from('visitor_events').insert([{
        visitor_id: visitorId,
        pagina: pathname || '/',
        evento_tipo: 'time_spent',
        datos_adicionales: { segundos: timeSpent },
      }]);

      return NextResponse.json({ ok: true });
    }

    // === BUTTON CLICK ===
    if (type === 'button_click' && visitorId) {
      await supabase.from('visitor_events').insert([{
        visitor_id: visitorId,
        pagina: pathname || '/',
        evento_tipo: 'button_click',
        datos_adicionales: { button: buttonId || 'unknown' },
      }]);

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Track API error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
