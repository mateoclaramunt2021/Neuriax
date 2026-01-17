import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Configuración directa
const SUPABASE_URL = 'https://wfnaknuhwzmkriaetvtn.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmbmFrbnVod3pta3JpYWV0dnRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODA1OTMwMCwiZXhwIjoyMDgzNjM1MzAwfQ.CQ4Gm1k_eZ3Pn5TGQRbPblL_sRp9gahQubIUiytUdlE';

export async function GET() {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    
    // Contar TODOS los posts
    const { count: totalCount, error: countError } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true });
    
    // Obtener los últimos 5 posts ordenados por created_at
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, category, created_at')
      .order('created_at', { ascending: false })
      .limit(5);
    
    return NextResponse.json({
      success: !error,
      totalPosts: totalCount,
      latestPosts: data?.map(p => ({ title: p.title, slug: p.slug })) || [],
      error: error?.message || countError?.message || null,
      timestamp: new Date().toISOString()
    });
  } catch (e: any) {
    return NextResponse.json({
      error: e.message,
      stack: e.stack
    });
  }
}

export const dynamic = 'force-dynamic';
