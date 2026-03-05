import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(url, key);
}

// GET - Unified inbox: WhatsApp + Instagram + Web chatbot
export async function GET() {
  try {
    const supabase = getSupabase();

    // Fetch from all 3 sources in parallel
    const [waResult, igResult, chatResult] = await Promise.all([
      supabase
        .from('whatsapp_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200),
      supabase
        .from('instagram_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200),
      supabase
        .from('chatbot_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200),
    ]);

    // Normalize messages into unified format
    const unified: any[] = [];

    // WhatsApp messages
    (waResult.data || []).forEach((msg: any) => {
      unified.push({
        id: `wa-${msg.id}`,
        source: 'whatsapp',
        sourceIcon: '💬',
        contactId: msg.phone_number,
        contactName: msg.contact_name || msg.phone_number,
        direction: msg.direction,
        content: msg.content,
        is_bot: msg.is_bot,
        status: msg.status,
        created_at: msg.created_at,
      });
    });

    // Instagram messages
    (igResult.data || []).forEach((msg: any) => {
      unified.push({
        id: `ig-${msg.id}`,
        source: 'instagram',
        sourceIcon: '📸',
        contactId: msg.sender_id,
        contactName: msg.sender_name || msg.sender_id,
        direction: msg.direction,
        content: msg.content,
        is_bot: msg.is_bot,
        status: msg.status,
        created_at: msg.created_at,
      });
    });

    // Web chatbot messages
    (chatResult.data || []).forEach((msg: any) => {
      unified.push({
        id: `chat-${msg.id}`,
        source: 'web',
        sourceIcon: '🌐',
        contactId: msg.session_id || msg.visitor_id || 'web',
        contactName: msg.visitor_name || `Visitante ${(msg.session_id || '???').slice(0, 6)}`,
        direction: msg.role === 'user' ? 'inbound' : 'outbound',
        content: msg.content || msg.message,
        is_bot: msg.role === 'assistant',
        status: 'delivered',
        created_at: msg.created_at,
      });
    });

    // Sort by date descending
    unified.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    // Group into conversations
    const conversationMap: Record<string, {
      contactId: string;
      contactName: string;
      source: string;
      sourceIcon: string;
      lastMessage: string;
      lastTime: string;
      unread: number;
      totalMessages: number;
      messages: any[];
    }> = {};

    unified.forEach((msg) => {
      const key = `${msg.source}-${msg.contactId}`;
      if (!conversationMap[key]) {
        conversationMap[key] = {
          contactId: msg.contactId,
          contactName: msg.contactName,
          source: msg.source,
          sourceIcon: msg.sourceIcon,
          lastMessage: msg.content || '',
          lastTime: msg.created_at,
          unread: 0,
          totalMessages: 0,
          messages: [],
        };
      }
      conversationMap[key].totalMessages++;
      conversationMap[key].messages.push(msg);
      if (msg.direction === 'inbound' && msg.status !== 'read') {
        conversationMap[key].unread++;
      }
    });

    const conversations = Object.entries(conversationMap)
      .map(([id, conv]) => ({ id, ...conv }))
      .sort((a, b) => new Date(b.lastTime).getTime() - new Date(a.lastTime).getTime());

    // Stats
    const stats = {
      totalMessages: unified.length,
      whatsappMessages: waResult.data?.length || 0,
      instagramMessages: igResult.data?.length || 0,
      webMessages: chatResult.data?.length || 0,
      totalConversations: conversations.length,
      unreadTotal: conversations.reduce((sum, c) => sum + c.unread, 0),
    };

    return NextResponse.json({ conversations, stats });
  } catch (error) {
    console.error('Inbox API error:', error);
    return NextResponse.json({ error: 'Error cargando bandeja unificada' }, { status: 500 });
  }
}
