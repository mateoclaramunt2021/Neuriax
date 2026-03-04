'use client';

import { useEffect, useState } from 'react';
import StatsCard from '@/components/superadmin/StatsCard';

interface Conversation {
  id: number;
  session_id: string;
  visitor_id: number;
  messages: Array<{ type: string; content: string }>;
  lead_data: Record<string, string>;
  total_messages: number;
  started_at: string;
  last_message_at: string;
  converted: boolean;
}

export default function ChatbotPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [stats, setStats] = useState({ total: 0, converted: 0, avgMessages: 0, conversionRate: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/superadmin/chatbot');
        if (res.ok) {
          const data = await res.json();
          setConversations(data.conversations);
          setStats(data.stats);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">🤖 Chatbot</h1>
        <p className="text-slate-500 mt-1">Historial de conversaciones del chatbot web</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatsCard title="Conversaciones" value={stats.total} icon="💬" />
        <StatsCard title="Convertidas" value={stats.converted} icon="🎯" />
        <StatsCard title="Msgs/conv promedio" value={stats.avgMessages} icon="📊" />
        <StatsCard title="Tasa conversión" value={`${stats.conversionRate}%`} icon="📈" />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversation list */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900">Conversaciones recientes</h3>
          </div>
          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {conversations.length > 0 ? conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConv(conv)}
                className={`w-full text-left p-4 hover:bg-slate-50 transition-colors ${
                  selectedConv?.id === conv.id ? 'bg-cyan-50' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium text-slate-900 text-sm">
                    {conv.lead_data?.nombre || `Sesión #${conv.session_id.slice(-6)}`}
                  </p>
                  {conv.converted && <span className="text-green-500">✓</span>}
                </div>
                {conv.lead_data?.email && (
                  <p className="text-xs text-slate-400">{conv.lead_data.email}</p>
                )}
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-slate-400">{conv.total_messages} mensajes</span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(conv.last_message_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                  </span>
                </div>
              </button>
            )) : (
              <div className="p-8 text-center text-slate-400 text-sm">
                No hay conversaciones registradas aún
              </div>
            )}
          </div>
        </div>

        {/* Chat view */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 flex flex-col min-h-[600px]">
          {selectedConv ? (
            <>
              <div className="p-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {selectedConv.lead_data?.nombre || `Sesión #${selectedConv.session_id.slice(-6)}`}
                    </p>
                    <p className="text-xs text-slate-400">
                      {new Date(selectedConv.started_at).toLocaleString('es-ES')}
                    </p>
                  </div>
                  {selectedConv.lead_data && Object.keys(selectedConv.lead_data).length > 0 && (
                    <div className="text-right text-xs text-slate-500">
                      {selectedConv.lead_data.email && <p>{selectedConv.lead_data.email}</p>}
                      {selectedConv.lead_data.sector && <p>Sector: {selectedConv.lead_data.sector}</p>}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {selectedConv.messages?.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                        msg.type === 'user'
                          ? 'bg-cyan-500 text-white'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 text-sm">
              Selecciona una conversación para ver los mensajes
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
