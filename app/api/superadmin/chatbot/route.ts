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

    // Normalize rows: ensure all have required fields
    const normalized = (conversations || []).map((c: Record<string, unknown>) => {
      if (!c.messages || (Array.isArray(c.messages) && c.messages.length === 0)) {
        c.messages = [];
        c.total_messages = 0;
      }
      if (!c.session_id) {
        c.session_id = `session-${c.id}`;
      }
      if (!c.started_at) {
        c.started_at = c.last_message_at;
      }
      if (!c.last_message_at) {
        c.last_message_at = c.started_at;
      }
      return c;
    });

    // Group by session_id so conversations with same session show as one
    const sessionMap = new Map<string, Record<string, unknown>>();
    for (const conv of normalized) {
      const sid = conv.session_id as string;
      if (sessionMap.has(sid)) {
        // Merge messages into existing session
        const existing = sessionMap.get(sid)!;
        const existingMsgs = (existing.messages as Array<{ type: string; content: string }>) || [];
        const newMsgs = (conv.messages as Array<{ type: string; content: string }>) || [];
        existing.messages = [...existingMsgs, ...newMsgs];
        existing.total_messages = (existing.messages as unknown[]).length;
        if (new Date(conv.last_message_at as string) > new Date(existing.last_message_at as string)) {
          existing.last_message_at = conv.last_message_at;
        }
      } else {
        sessionMap.set(sid, conv);
      }
    }
    const grouped = Array.from(sessionMap.values());

    // Stats
    const { count: totalConversations } = await supabase
      .from('chatbot_conversations')
      .select('*', { count: 'exact', head: true });

    const { count: convertedCount } = await supabase
      .from('chatbot_conversations')
      .select('*', { count: 'exact', head: true })
      .eq('converted', true);

    // Average messages per conversation
    const avgMessages = grouped.length
      ? Math.round(grouped.reduce((acc: number, c: Record<string, unknown>) => acc + ((c.total_messages as number) || 0), 0) / grouped.length)
      : 0;

    return NextResponse.json({
      conversations: grouped,
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
