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
    const type = searchParams.get('type');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    let query = supabase
      .from('email_log')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (type && type !== 'all') {
      query = query.eq('email_type', type);
    }
    if (search) {
      query = query.or(`recipient_email.ilike.%${search}%,recipient_name.ilike.%${search}%,subject.ilike.%${search}%`);
    }

    const { data: emails, count, error } = await query;
    if (error) throw error;

    // Get email type counts
    const { data: typeCounts } = await supabase
      .from('email_log')
      .select('email_type');

    const typeStats: Record<string, number> = {};
    typeCounts?.forEach((e: { email_type: string }) => {
      typeStats[e.email_type] = (typeStats[e.email_type] || 0) + 1;
    });

    return NextResponse.json({
      emails: emails || [],
      total: count || 0,
      typeStats,
      page,
      limit,
    });
  } catch (error) {
    console.error('Emails API error:', error);
    return NextResponse.json({ error: 'Error cargando emails' }, { status: 500 });
  }
}
