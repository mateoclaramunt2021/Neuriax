import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(url, key);
}

// GET - Instagram config & stats
export async function GET() {
  try {
    const supabase = getSupabase();

    const { data: config } = await supabase
      .from('instagram_config')
      .select('*')
      .single();

    return NextResponse.json({
      config: config || {
        bot_enabled: false,
        auto_reply_enabled: false,
        auto_reply_message: 'Hola! Gracias por escribirnos. Te responderemos pronto.',
      },
      connected: !!config?.access_token,
    });
  } catch (error) {
    console.error('Instagram API error:', error);
    return NextResponse.json({ error: 'Error cargando datos de Instagram' }, { status: 500 });
  }
}

// PUT - Update Instagram config
export async function PUT(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const config = await request.json();

    const { data: existing } = await supabase
      .from('instagram_config')
      .select('id')
      .single();

    if (existing) {
      await supabase
        .from('instagram_config')
        .update({ ...config, updated_at: new Date().toISOString() })
        .eq('id', existing.id);
    } else {
      await supabase.from('instagram_config').insert(config);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Instagram config error:', error);
    return NextResponse.json({ error: 'Error guardando configuración' }, { status: 500 });
  }
}
