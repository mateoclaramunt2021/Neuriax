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
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '30');
    const offset = (page - 1) * limit;

    const { data: conversations, count } = await supabase
      .from('chatbot_conversations')
      .select('*', { count: 'exact' })
      .order('last_message_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Stats
    const { count: totalConversations } = await supabase
      .from('chatbot_conversations')
      .select('*', { count: 'exact', head: true });

    const { count: convertedCount } = await supabase
      .from('chatbot_conversations')
      .select('*', { count: 'exact', head: true })
      .eq('converted', true);

    // Average messages per conversation
    const avgMessages = conversations?.length
      ? Math.round(conversations.reduce((acc: number, c: any) => acc + (c.total_messages || 0), 0) / conversations.length)
      : 0;

    return NextResponse.json({
      conversations: conversations || [],
      total: count || 0,
      stats: {
        total: totalConversations || 0,
        converted: convertedCount || 0,
        avgMessages,
        conversionRate: totalConversations ? Math.round(((convertedCount || 0) / totalConversations) * 100) : 0,
      },
      page,
      limit,
    });
  } catch (error) {
    console.error('Chatbot API error:', error);
    return NextResponse.json({ error: 'Error cargando datos del chatbot' }, { status: 500 });
  }
}
