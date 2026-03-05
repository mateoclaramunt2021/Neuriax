'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import LiveIndicator from '@/components/superadmin/LiveIndicator';

interface Conversation {
  phone: string;
  name: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  totalMessages: number;
}

interface Message {
  id: string;
  phone_number: string;
  direction: 'inbound' | 'outbound';
  content: string;
  is_bot: boolean;
  status: string;
  created_at: string;
}

interface WhatsAppConfig {
  bot_enabled: boolean;
  greeting_message: string;
  auto_reply_outside_hours: string;
  system_prompt?: string;
  business_hours?: { start: string; end: string };
  api_token?: string;
  phone_number_id?: string;
}

export default function WhatsAppPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [config, setConfig] = useState<WhatsAppConfig | null>(null);
  const [stats, setStats] = useState<any>({});
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [tab, setTab] = useState<'conversations' | 'config'>('conversations');
  const [loading, setLoading] = useState(true);
  const [savingConfig, setSavingConfig] = useState(false);
  const [sending, setSending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const selectedPhoneRef = useRef<string | null>(null);

  useEffect(() => {
    selectedPhoneRef.current = selectedPhone;
  }, [selectedPhone]);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/superadmin/whatsapp');
      if (res.ok) {
        const data = await res.json();
        setConversations(data.conversations || []);
        setConfig(data.config);
        setStats(data.stats || {});
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchConversation = useCallback(async (phone: string) => {
    try {
      const res = await fetch(`/api/superadmin/whatsapp?phone=${encodeURIComponent(phone)}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Real-time polling every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
      if (selectedPhoneRef.current) {
        fetchConversation(selectedPhoneRef.current);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [fetchData, fetchConversation]);

  useEffect(() => {
    if (selectedPhone) {
      fetchConversation(selectedPhone);
    }
  }, [selectedPhone, fetchConversation]);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!selectedPhone || !newMessage.trim() || sending) return;
    setSending(true);
    try {
      const res = await fetch('/api/superadmin/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: selectedPhone, message: newMessage }),
      });
      if (res.ok) {
        const data = await res.json();
        setNewMessage('');
        await fetchConversation(selectedPhone);
        if (!data.sent) {
          console.warn('Mensaje guardado pero no enviado por WhatsApp. Configura las credenciales de Meta.');
        }
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setSending(false);
    }
  };

  const handleSaveConfig = async () => {
    if (!config) return;
    setSavingConfig(true);
    try {
      const res = await fetch('/api/superadmin/whatsapp', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      if (res.ok) alert('Configuración guardada');
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setSavingConfig(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">💬 WhatsApp IA</h1>
          <p className="text-slate-500 mt-1">Gestiona conversaciones y automatización</p>
        </div>
        <div className="flex items-center gap-4">
          <LiveIndicator lastUpdated={new Date()} />
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${config?.bot_enabled ? 'bg-green-500 animate-pulse' : 'bg-red-400'}`} />
            <span className="text-sm text-slate-600">{config?.bot_enabled ? 'Bot activo' : 'Bot desactivado'}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-2xl font-bold text-slate-900">{stats.totalConversations || 0}</p>
          <p className="text-xs text-slate-500">Conversaciones</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-2xl font-bold text-slate-900">{stats.totalMessages || 0}</p>
          <p className="text-xs text-slate-500">Mensajes totales</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-2xl font-bold text-green-600">{stats.botMessages || 0}</p>
          <p className="text-xs text-slate-500">Respuestas del bot</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-2xl font-bold text-blue-600">{stats.humanMessages || 0}</p>
          <p className="text-xs text-slate-500">Mensajes manuales</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
        <button
          onClick={() => setTab('conversations')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
            tab === 'conversations' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
          }`}
        >
          💬 Conversaciones
        </button>
        <button
          onClick={() => setTab('config')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
            tab === 'config' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
          }`}
        >
          ⚙️ Configuración Bot
        </button>
      </div>

      {tab === 'conversations' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversation list */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">Conversaciones</h3>
              <span className="text-xs text-slate-400">{conversations.length} total</span>
            </div>
            <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
              {conversations.length > 0 ? conversations.map((conv) => (
                <button
                  key={conv.phone}
                  onClick={() => setSelectedPhone(conv.phone)}
                  className={`w-full text-left p-4 hover:bg-slate-50 transition-colors ${
                    selectedPhone === conv.phone ? 'bg-green-50 border-l-4 border-green-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-slate-900 text-sm">{conv.name}</p>
                    {conv.unread > 0 && (
                      <span className="w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-1">{conv.lastMessage}</p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    {new Date(conv.lastTime).toLocaleString('es-ES')} · {conv.totalMessages} msgs
                  </p>
                </button>
              )) : (
                <div className="p-8 text-center text-slate-400 text-sm">
                  <p className="text-4xl mb-3">📱</p>
                  <p className="font-medium">No hay conversaciones aún</p>
                  <p className="mt-2 text-xs">Cuando alguien te escriba por WhatsApp, las conversaciones aparecerán aquí en tiempo real.</p>
                </div>
              )}
            </div>
          </div>

          {/* Chat view */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 flex flex-col min-h-[500px]">
            {selectedPhone ? (
              <>
                <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {conversations.find(c => c.phone === selectedPhone)?.name || selectedPhone}
                    </p>
                    <p className="text-xs text-slate-400">{selectedPhone}</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    WhatsApp
                  </span>
                </div>
                <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-[400px] bg-[#f0f2f5]">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.direction === 'outbound' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                          msg.direction === 'outbound'
                            ? msg.is_bot
                              ? 'bg-green-100 text-green-900'
                              : 'bg-cyan-500 text-white'
                            : 'bg-white text-slate-800'
                        }`}
                      >
                        {msg.is_bot && <p className="text-[10px] opacity-60 mb-1">🤖 Bot IA</p>}
                        {msg.direction === 'outbound' && !msg.is_bot && <p className="text-[10px] opacity-60 mb-1">👤 Manual</p>}
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <p className={`text-[10px] ${msg.direction === 'outbound' && !msg.is_bot ? 'text-cyan-100' : 'text-slate-400'}`}>
                            {new Date(msg.created_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          {msg.direction === 'outbound' && (
                            <span className={`text-[10px] ${msg.status === 'sent' ? 'text-green-500' : 'text-slate-300'}`}>
                              {msg.status === 'sent' ? '✓✓' : '✓'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {messages.length === 0 && (
                    <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                      Sin mensajes
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
                <div className="p-4 border-t border-slate-200 flex gap-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled={sending}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || sending}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center gap-2"
                  >
                    {sending ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      '📤'
                    )}
                    Enviar
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 text-sm gap-3">
                <span className="text-5xl">💬</span>
                <p>Selecciona una conversación para ver los mensajes</p>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'config' && config && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Configuración del Bot IA</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-sm text-slate-600">Bot {config.bot_enabled ? 'activado' : 'desactivado'}</span>
              <input
                type="checkbox"
                checked={config.bot_enabled}
                onChange={(e) => setConfig({ ...config, bot_enabled: e.target.checked })}
                className="sr-only"
              />
              <div className={`relative w-10 h-6 rounded-full transition-colors ${config.bot_enabled ? 'bg-green-500' : 'bg-slate-300'}`}>
                <div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${config.bot_enabled ? 'translate-x-5' : 'translate-x-1'}`} />
              </div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mensaje de bienvenida</label>
            <input
              type="text"
              value={config.greeting_message}
              onChange={(e) => setConfig({ ...config, greeting_message: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Prompt del sistema (personalidad del bot)</label>
            <textarea
              value={config.system_prompt || ''}
              onChange={(e) => setConfig({ ...config, system_prompt: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm font-mono"
              rows={8}
              placeholder="Eres el asistente de Neuriax..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Respuesta fuera de horario</label>
            <textarea
              value={config.auto_reply_outside_hours}
              onChange={(e) => setConfig({ ...config, auto_reply_outside_hours: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Horario inicio</label>
              <input
                type="time"
                value={config.business_hours?.start || '09:00'}
                onChange={(e) => setConfig({ ...config, business_hours: { ...config.business_hours, start: e.target.value, end: config.business_hours?.end || '20:00' } })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Horario fin</label>
              <input
                type="time"
                value={config.business_hours?.end || '20:00'}
                onChange={(e) => setConfig({ ...config, business_hours: { start: config.business_hours?.start || '09:00', ...config.business_hours, end: e.target.value } })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <h4 className="font-medium text-slate-700 mb-3">🔗 Conexión WhatsApp Business API</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Token de API</label>
                <input
                  type="password"
                  value={config.api_token || ''}
                  onChange={(e) => setConfig({ ...config, api_token: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
                  placeholder="Tu token de WhatsApp Business"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number ID</label>
                <input
                  type="text"
                  value={config.phone_number_id || ''}
                  onChange={(e) => setConfig({ ...config, phone_number_id: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
                  placeholder="ID del número de teléfono"
                />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Necesitas una cuenta de WhatsApp Business API (Meta) para el envío automático de mensajes.
              <a href="https://developers.facebook.com/docs/whatsapp/cloud-api/get-started" target="_blank" rel="noopener" className="text-cyan-500 hover:underline ml-1">
                Ver documentación →
              </a>
            </p>
          </div>

          <button
            onClick={handleSaveConfig}
            disabled={savingConfig}
            className="w-full bg-green-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            {savingConfig ? 'Guardando...' : '💾 Guardar configuración'}
          </button>
        </div>
      )}
    </div>
  );
}
