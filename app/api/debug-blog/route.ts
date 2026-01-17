import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Configuración directa
const SUPABASE_URL = 'https://wfnaknuhwzmkriaetvtn.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmbmFrbnVod3pta3JpYWV0dnRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODA1OTMwMCwiZXhwIjoyMDgzNjM1MzAwfQ.CQ4Gm1k_eZ3Pn5TGQRbPblL_sRp9gahQubIUiytUdlE';

export async function GET() {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    
    // Query simple sin filtros para ver todos los posts y sus columnas
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .limit(3);
    
    // Obtener las columnas disponibles
    const columns = data && data.length > 0 ? Object.keys(data[0]) : [];
    
    return NextResponse.json({
      success: !error,
      postsCount: data?.length || 0,
      columns: columns,
      samplePost: data?.[0] || null,
      error: error?.message || null,
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
