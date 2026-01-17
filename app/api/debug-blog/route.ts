import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  const debug = {
    hasUrl: !!supabaseUrl,
    hasServiceKey: !!supabaseServiceKey,
    hasAnonKey: !!supabaseAnonKey,
    serviceKeyLength: supabaseServiceKey?.length || 0,
    urlPreview: supabaseUrl?.substring(0, 30) || 'not set',
  };
  
  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ 
      error: 'Missing env vars',
      debug 
    });
  }
  
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { data, error, count } = await supabase
      .from('blog_posts')
      .select('id, title, slug', { count: 'exact' })
      .eq('published', true)
      .limit(5);
    
    return NextResponse.json({
      success: true,
      debug,
      postsCount: count,
      posts: data,
      error: error?.message || null
    });
  } catch (e: any) {
    return NextResponse.json({
      error: e.message,
      debug
    });
  }
}

export const dynamic = 'force-dynamic';
