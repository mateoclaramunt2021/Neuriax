'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import LiveIndicator from '@/components/superadmin/LiveIndicator';

interface UnifiedMessage {
  id: string;
  source: 'whatsapp' | 'instagram' | 'web';
  sourceIcon: string;
  contactId: string;
  contactName: string;
  direction: 'inbound' | 'outbound';
  content: string;
  is_bot: boolean;
  status: string;
  created_at: string;
}

interface Conversation {
  id: string;
  contactId: string;
  contactName: string;
  source: string;
  sourceIcon: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  totalMessages: number;
  messages: UnifiedMessage[];
}

export default function InboxPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [stats, setStats] = useState<any>({});
  const [selectedConv, setSelectedConv] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'whatsapp' | 'instagram' | 'web'>('all');
  const [loading, setLoading] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/superadmin/inbox');
      if (res.ok) {
        const data = await res.json();
        setConversations(data.conversations || []);
        setStats(data.stats || {});
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Real-time polling every 5 seconds
  useEffect(() => {
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [fetchData]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConv]);

  const selectedConversation = conversations.find(c => c.id === selectedConv);
  const filteredConvs = filter === 'all'
    ? conversations
    : conversations.filter(c => c.source === filter);

  const sourceColor = (source: string) => {
    switch (source) {
      case 'whatsapp': return 'bg-green-100 text-green-700 border-green-200';
      case 'instagram': return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'web': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const sourceBubble = (msg: UnifiedMessage) => {
    if (msg.direction === 'outbound') {
      if (msg.is_bot) {
        return msg.source === 'whatsapp'
          ? 'bg-green-100 text-green-900'
          : msg.source === 'instagram'
          ? 'bg-pink-100 text-pink-900'
          : 'bg-blue-100 text-blue-900';
      }
      return 'bg-cyan-500 text-white';
    }
    return 'bg-white text-slate-800 border border-slate-200';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">📥 Bandeja Unificada</h1>
          <p className="text-slate-500 mt-1">Todos los mensajes en un solo lugar</p>
        </div>
        <LiveIndicator lastUpdated={new Date()} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-2xl font-bold text-slate-900">{stats.totalConversations || 0}</p>
          <p className="text-xs text-slate-500">Conversaciones</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-2xl font-bold text-red-500">{stats.unreadTotal || 0}</p>
          <p className="text-xs text-slate-500">Sin leer</p>
        </div>
        <div className="bg-white rounded-xl border border-green-200 p-4">
          <p className="text-2xl font-bold text-green-600">{stats.whatsappMessages || 0}</p>
          <p className="text-xs text-slate-500">💬 WhatsApp</p>
        </div>
        <div className="bg-white rounded-xl border border-pink-200 p-4">
          <p className="text-2xl font-bold text-pink-600">{stats.instagramMessages || 0}</p>
          <p className="text-xs text-slate-500">📸 Instagram</p>
        </div>
        <div className="bg-white rounded-xl border border-blue-200 p-4">
          <p className="text-2xl font-bold text-blue-600">{stats.webMessages || 0}</p>
          <p className="text-xs text-slate-500">🌐 Web</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {[
          { key: 'all' as const, label: '📥 Todos', count: conversations.length },
          { key: 'whatsapp' as const, label: '💬 WhatsApp', count: conversations.filter(c => c.source === 'whatsapp').length },
          { key: 'instagram' as const, label: '📸 Instagram', count: conversations.filter(c => c.source === 'instagram').length },
          { key: 'web' as const, label: '🌐 Web', count: conversations.filter(c => c.source === 'web').length },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === f.key
                ? 'bg-cyan-500 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversation list */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Conversaciones</h3>
            <span className="text-xs text-slate-400">{filteredConvs.length} total</span>
          </div>
          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {filteredConvs.length > 0 ? filteredConvs.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConv(conv.id)}
                className={`w-full text-left p-4 hover:bg-slate-50 transition-colors ${
                  selectedConv === conv.id ? 'bg-cyan-50 border-l-4 border-cyan-500' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${sourceColor(conv.source)}`}>
                      {conv.sourceIcon} {conv.source}
                    </span>
                    <p className="font-medium text-slate-900 text-sm">{conv.contactName}</p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 truncate">{conv.lastMessage}</p>
                <p className="text-[10px] text-slate-400 mt-1">
                  {new Date(conv.lastTime).toLocaleString('es-ES')} · {conv.totalMessages} msgs
                </p>
              </button>
            )) : (
              <div className="p-8 text-center text-slate-400 text-sm">
                <p className="text-4xl mb-3">📥</p>
                <p className="font-medium">No hay conversaciones</p>
                <p className="mt-2 text-xs">Los mensajes de WhatsApp, Instagram y la web aparecerán aquí.</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat view */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 flex flex-col min-h-[600px]">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-900">{selectedConversation.contactName}</p>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${sourceColor(selectedConversation.source)}`}>
                      {selectedConversation.sourceIcon} {selectedConversation.source}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{selectedConversation.contactId}</p>
                </div>
                <p className="text-xs text-slate-500">{selectedConversation.totalMessages} mensajes</p>
              </div>
              <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-[500px] bg-slate-50">
                {[...selectedConversation.messages].reverse().map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.direction === 'outbound' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-sm ${sourceBubble(msg)}`}>
                      {msg.is_bot && <p className="text-[10px] opacity-60 mb-1">🤖 Bot IA</p>}
                      {msg.direction === 'outbound' && !msg.is_bot && <p className="text-[10px] opacity-60 mb-1">👤 Manual</p>}
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                      <p className={`text-[10px] mt-1 ${msg.direction === 'outbound' && !msg.is_bot ? 'text-cyan-100' : 'text-slate-400'}`}>
                        {new Date(msg.created_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div className="p-4 border-t border-slate-200 text-center text-xs text-slate-400">
                Para responder, ve a la sección de{' '}
                {selectedConversation.source === 'whatsapp' ? (
                  <a href="/superadmin/whatsapp" className="text-green-600 hover:underline font-medium">WhatsApp</a>
                ) : selectedConversation.source === 'instagram' ? (
                  <a href="/superadmin/instagram" className="text-pink-600 hover:underline font-medium">Instagram</a>
                ) : (
                  <span className="text-blue-600 font-medium">Chatbot web</span>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 text-sm gap-3">
              <span className="text-5xl">📥</span>
              <p>Selecciona una conversación para ver el historial</p>
              <p className="text-xs">Todas las plataformas en un solo lugar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
