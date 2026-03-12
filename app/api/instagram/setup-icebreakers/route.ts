import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(url, key);
}

// Ice breaker options that show when someone opens DMs for the first time
const ICE_BREAKERS = [
  {
    question: '🚀 ¿Qué hace Neuriax?',
    payload: 'ICE_SERVICES',
  },
  {
    question: '💬 Quiero una web o chatbot',
    payload: 'ICE_AUTOMATE',
  },
  {
    question: '📊 ¿Cómo puede ayudarme la IA?',
    payload: 'ICE_PRICES',
  },
  {
    question: '📞 Hablar con Mateo',
    payload: 'ICE_CALL',
  },
];

// Persistent menu (always visible in DM thread)
const PERSISTENT_MENU = [
  {
    locale: 'default',
    call_to_actions: [
      {
        type: 'postback',
        title: '🌐 Ver neuriax.com',
        payload: 'ICE_PORTFOLIO',
      },
      {
        type: 'postback',
        title: '📞 Agendar llamada',
        payload: 'SCHEDULE_CALL',
      },
      {
        type: 'postback',
        title: '💡 ¿Qué hacéis?',
        payload: 'GET_SERVICES',
      },
    ],
  },
];

export async function POST() {
  try {
    const supabase = getSupabase();
    const { data: config } = await supabase
      .from('instagram_config')
      .select('access_token, instagram_account_id')
      .single();

    const accessToken = config?.access_token || process.env.INSTAGRAM_ACCESS_TOKEN;
    const pageId = process.env.FACEBOOK_PAGE_ID;

    if (!accessToken) {
      return NextResponse.json({ error: 'No access token configured' }, { status: 400 });
    }

    const results: Record<string, unknown> = {};

    // 1. Set Ice Breakers via Instagram Messaging API
    try {
      const iceRes = await fetch(
        `https://graph.instagram.com/v21.0/me/messenger_profile`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            platform: 'instagram',
            ice_breakers: ICE_BREAKERS,
          }),
        }
      );
      const iceData = await iceRes.json();
      results.ice_breakers = { status: iceRes.ok ? 'success' : 'failed', data: iceData };
    } catch (e) {
      results.ice_breakers = { status: 'error', error: String(e) };
    }

    // 2. Set Persistent Menu (if Facebook Page ID is available)
    if (pageId) {
      try {
        const menuRes = await fetch(
          `https://graph.facebook.com/v21.0/${pageId}/messenger_profile`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              platform: 'instagram',
              persistent_menu: PERSISTENT_MENU,
            }),
          }
        );
        const menuData = await menuRes.json();
        results.persistent_menu = { status: menuRes.ok ? 'success' : 'failed', data: menuData };
      } catch (e) {
        results.persistent_menu = { status: 'error', error: String(e) };
      }
    } else {
      results.persistent_menu = { status: 'skipped', reason: 'FACEBOOK_PAGE_ID not set' };
    }

    // Log setup
    await supabase.from('instagram_token_log').insert({
      action: 'setup_icebreakers',
      details: JSON.stringify(results),
    });

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('Ice breakers setup error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

// GET — view current ice breakers
export async function GET() {
  try {
    const supabase = getSupabase();
    const { data: config } = await supabase
      .from('instagram_config')
      .select('access_token')
      .single();

    const accessToken = config?.access_token || process.env.INSTAGRAM_ACCESS_TOKEN;
    if (!accessToken) {
      return NextResponse.json({ error: 'No access token' }, { status: 400 });
    }

    const res = await fetch(
      `https://graph.instagram.com/v21.0/me/messenger_profile?fields=ice_breakers&platform=instagram`,
      { headers: { 'Authorization': `Bearer ${accessToken}` } }
    );

    const data = await res.json();
    return NextResponse.json({ current_ice_breakers: data });
  } catch (error) {
    console.error('Ice breakers get error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
