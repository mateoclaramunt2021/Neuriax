import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(url, key);
}

// GET - Get all settings
export async function GET() {
  try {
    const supabase = getSupabase();

    const { data: settings } = await supabase
      .from('admin_settings')
      .select('*')
      .order('key');

    // Transform to key-value map
    const configMap: Record<string, string> = {};
    settings?.forEach((s: { key: string; value: string }) => {
      configMap[s.key] = s.value;
    });

    // Also get API connection statuses
    const connections: Record<string, boolean> = {
      supabase: !!(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL),
      groq: !!process.env.GROQ_API_KEY,
      resend: !!process.env.RESEND_API_KEY,
      superadmin: !!process.env.SUPERADMIN_PASSWORD,
    };

    return NextResponse.json({ settings: configMap, connections });
  } catch (error) {
    console.error('Config API error:', error);
    return NextResponse.json({ error: 'Error cargando configuración' }, { status: 500 });
  }
}

// PUT - Update settings
export async function PUT(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const updates = await request.json();

    for (const [key, value] of Object.entries(updates)) {
      const { data: existing } = await supabase
        .from('admin_settings')
        .select('id')
        .eq('key', key)
        .single();

      if (existing) {
        await supabase
          .from('admin_settings')
          .update({ value: String(value), updated_at: new Date().toISOString() })
          .eq('key', key);
      } else {
        await supabase
          .from('admin_settings')
          .insert({ key, value: String(value) });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Config update error:', error);
    return NextResponse.json({ error: 'Error guardando configuración' }, { status: 500 });
  }
}
