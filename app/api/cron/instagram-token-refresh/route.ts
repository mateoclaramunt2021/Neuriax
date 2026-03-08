import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(url, key);
}

// Refresh Instagram long-lived token (valid 60 days, refresh every ~50 days)
export async function GET() {
  try {
    const supabase = getSupabase();

    // Get current token from config or env
    const { data: config } = await supabase
      .from('instagram_config')
      .select('*')
      .single();

    const currentToken = config?.access_token || process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!currentToken) {
      return NextResponse.json({ error: 'No Instagram token found' }, { status: 400 });
    }

    // Refresh the token via Meta Graph API
    const response = await fetch(
      `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${currentToken}`
    );

    if (!response.ok) {
      // Try Facebook Graph API endpoint instead
      const fbResponse = await fetch(
        `https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.META_APP_ID || '1475190714270538'}&client_secret=${process.env.META_APP_SECRET || ''}&fb_exchange_token=${currentToken}`
      );

      if (!fbResponse.ok) {
        const err = await fbResponse.json();
        console.error('Token refresh failed:', err);

        // Log the failure
        await supabase.from('instagram_token_log').insert({
          action: 'refresh_failed',
          details: JSON.stringify(err),
        });

        return NextResponse.json({ error: 'Token refresh failed', details: err }, { status: 500 });
      }

      const fbData = await fbResponse.json();
      const newToken = fbData.access_token;
      const expiresIn = fbData.expires_in || 5184000; // ~60 days

      // Save new token to config
      if (config) {
        await supabase
          .from('instagram_config')
          .update({
            access_token: newToken,
            token_expires_at: new Date(Date.now() + expiresIn * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('id', config.id);
      }

      await supabase.from('instagram_token_log').insert({
        action: 'refresh_success_fb',
        details: JSON.stringify({ expires_in: expiresIn }),
      });

      return NextResponse.json({
        success: true,
        method: 'facebook',
        expires_in: expiresIn,
        expires_at: new Date(Date.now() + expiresIn * 1000).toISOString(),
      });
    }

    const data = await response.json();
    const newToken = data.access_token;
    const expiresIn = data.expires_in || 5184000;

    // Save new token to config
    if (config) {
      await supabase
        .from('instagram_config')
        .update({
          access_token: newToken,
          token_expires_at: new Date(Date.now() + expiresIn * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', config.id);
    }

    // Log
    await supabase.from('instagram_token_log').insert({
      action: 'refresh_success',
      details: JSON.stringify({ expires_in: expiresIn }),
    });

    console.log(`Instagram token refreshed. Expires in ${Math.round(expiresIn / 86400)} days.`);

    return NextResponse.json({
      success: true,
      method: 'instagram',
      expires_in: expiresIn,
      expires_at: new Date(Date.now() + expiresIn * 1000).toISOString(),
    });
  } catch (error) {
    console.error('Instagram token refresh error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
