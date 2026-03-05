'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import LiveIndicator from '@/components/superadmin/LiveIndicator';

interface Conversation {
  senderId: string;
  name: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  totalMessages: number;
}

interface Message {
  id: string;
  sender_id: string;
  direction: 'inbound' | 'outbound';
  content: string;
  is_bot: boolean;
  status: string;
  created_at: string;
  sender_name?: string;
}

interface InstagramConfig {
  bot_enabled: boolean;
  access_token?: string;
  instagram_account_id?: string;
  auto_reply_enabled: boolean;
  auto_reply_message: string;
}

export default function InstagramPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [config, setConfig] = useState<InstagramConfig | null>(null);
  const [stats, setStats] = useState<any>({});
  const [connected, setConnected] = useState(false);
  const [selectedSender, setSelectedSender] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [tab, setTab] = useState<'conversations' | 'config'>('conversations');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const selectedSenderRef = useRef<string | null>(null);

  useEffect(() => {
    selectedSenderRef.current = selectedSender;
  }, [selectedSender]);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/superadmin/instagram');
      if (res.ok) {
        const data = await res.json();
        setConversations(data.conversations || []);
        setConfig(data.config);
        setConnected(data.connected);
        setStats(data.stats || {});
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchConversation = useCallback(async (senderId: string) => {
    try {
      const res = await fetch(`/api/superadmin/instagram?sender=${encodeURIComponent(senderId)}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Real-time polling every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
      if (selectedSenderRef.current) {
        fetchConversation(selectedSenderRef.current);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [fetchData, fetchConversation]);

  useEffect(() => {
    if (selectedSender) {
      fetchConversation(selectedSender);
    }
  }, [selectedSender, fetchConversation]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!selectedSender || !newMessage.trim() || sending) return;
    setSending(true);
    try {
      const res = await fetch('/api/superadmin/instagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderId: selectedSender, message: newMessage }),
      });
      if (res.ok) {
        setNewMessage('');
        await fetchConversation(selectedSender);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setSending(false);
    }
  };

  const handleSave = async () => {
    if (!config) return;
    setSaving(true);
    try {
      const res = await fetch('/api/superadmin/instagram', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      if (res.ok) alert('Configuración guardada');
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">📸 Instagram DMs</h1>
          <p className="text-slate-500 mt-1">Gestiona mensajes directos y automatización</p>
        </div>
        <div className="flex items-center gap-4">
          <LiveIndicator lastUpdated={new Date()} />
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-red-400'}`} />
            <span className="text-sm text-slate-600">{connected ? 'Conectado' : 'No conectado'}</span>
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
          <p className="text-2xl font-bold text-pink-600">{stats.botMessages || 0}</p>
          <p className="text-xs text-slate-500">Respuestas del bot</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-2xl font-bold text-purple-600">{stats.humanMessages || 0}</p>
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
          ⚙️ Configuración
        </button>
      </div>

      {tab === 'conversations' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversation list */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">DMs</h3>
              <span className="text-xs text-slate-400">{conversations.length} total</span>
            </div>
            <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
              {conversations.length > 0 ? conversations.map((conv) => (
                <button
                  key={conv.senderId}
                  onClick={() => setSelectedSender(conv.senderId)}
                  className={`w-full text-left p-4 hover:bg-slate-50 transition-colors ${
                    selectedSender === conv.senderId ? 'bg-pink-50 border-l-4 border-pink-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-slate-900 text-sm">{conv.name}</p>
                    {conv.unread > 0 && (
                      <span className="w-5 h-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
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
                  <p className="text-4xl mb-3">📸</p>
                  <p className="font-medium">No hay DMs aún</p>
                  <p className="mt-2 text-xs">Cuando alguien te escriba por Instagram, los mensajes aparecerán aquí.</p>
                </div>
              )}
            </div>
          </div>

          {/* Chat view */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 flex flex-col min-h-[500px]">
            {selectedSender ? (
              <>
                <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {conversations.find(c => c.senderId === selectedSender)?.name || selectedSender}
                    </p>
                    <p className="text-xs text-slate-400">ID: {selectedSender}</p>
                  </div>
                  <span className="text-xs bg-gradient-to-r from-purple-100 to-pink-100 text-pink-700 px-2 py-1 rounded-full">
                    Instagram
                  </span>
                </div>
                <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-[400px] bg-gradient-to-b from-slate-50 to-white">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.direction === 'outbound' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                          msg.direction === 'outbound'
                            ? msg.is_bot
                              ? 'bg-pink-100 text-pink-900'
                              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                            : 'bg-white text-slate-800 border border-slate-200'
                        }`}
                      >
                        {msg.is_bot && <p className="text-[10px] opacity-60 mb-1">🤖 Bot IA</p>}
                        {msg.direction === 'outbound' && !msg.is_bot && <p className="text-[10px] opacity-60 mb-1">👤 Manual</p>}
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <p className={`text-[10px] ${msg.direction === 'outbound' && !msg.is_bot ? 'text-white/60' : 'text-slate-400'}`}>
                            {new Date(msg.created_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          {msg.direction === 'outbound' && (
                            <span className={`text-[10px] ${msg.status === 'sent' ? 'text-pink-500' : 'text-slate-300'}`}>
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
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    disabled={sending}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || sending}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition-all flex items-center gap-2"
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
                <span className="text-5xl">📸</span>
                <p>Selecciona una conversación para ver los mensajes</p>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'config' && config && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          {/* Connection Status */}
          <div className={`rounded-xl border p-4 ${connected ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
            <h3 className="font-semibold text-sm mb-1">
              {connected ? '✅ Instagram conectado' : '⚠️ Instagram no conectado'}
            </h3>
            <p className="text-xs text-slate-600">
              {connected
                ? 'Tu cuenta está vinculada. Los DMs automáticos están disponibles.'
                : 'Configura las credenciales de Meta para habilitar la automatización.'
              }
            </p>
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Configuración del Bot</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-sm text-slate-600">Bot IA {config.bot_enabled ? 'activado' : 'desactivado'}</span>
              <input
                type="checkbox"
                checked={config.bot_enabled}
                onChange={(e) => setConfig({ ...config, bot_enabled: e.target.checked })}
                className="sr-only"
              />
              <div className={`relative w-10 h-6 rounded-full transition-colors ${config.bot_enabled ? 'bg-pink-500' : 'bg-slate-300'}`}>
                <div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${config.bot_enabled ? 'translate-x-5' : 'translate-x-1'}`} />
              </div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Token de acceso (Instagram API)</label>
            <input
              type="password"
              value={config.access_token || ''}
              onChange={(e) => setConfig({ ...config, access_token: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
              placeholder="Tu token de acceso de Instagram"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">ID de cuenta de Instagram</label>
            <input
              type="text"
              value={config.instagram_account_id || ''}
              onChange={(e) => setConfig({ ...config, instagram_account_id: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
              placeholder="ID numérico de tu cuenta"
            />
          </div>

          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-slate-600">Respuesta automática a DMs</span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.auto_reply_enabled}
                  onChange={(e) => setConfig({ ...config, auto_reply_enabled: e.target.checked })}
                  className="sr-only"
                />
                <div className={`relative w-10 h-6 rounded-full transition-colors ${config.auto_reply_enabled ? 'bg-pink-500' : 'bg-slate-300'}`}>
                  <div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${config.auto_reply_enabled ? 'translate-x-5' : 'translate-x-1'}`} />
                </div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Mensaje de respuesta automática</label>
              <textarea
                value={config.auto_reply_message}
                onChange={(e) => setConfig({ ...config, auto_reply_message: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
                rows={3}
              />
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <h4 className="font-medium text-slate-700 mb-2 text-sm">📋 Pasos para conectar Instagram</h4>
            <ol className="text-xs text-slate-600 space-y-1 list-decimal list-inside">
              <li>Crea una app en <a href="https://developers.facebook.com" target="_blank" rel="noopener" className="text-cyan-600 hover:underline">developers.facebook.com</a></li>
              <li>Habilita el producto &quot;Instagram Graph API&quot;</li>
              <li>Vincula tu cuenta profesional de Instagram</li>
              <li>Genera un token de acceso de larga duración</li>
              <li>Introduce el token y el ID de cuenta arriba</li>
              <li>Configura el webhook: <code className="bg-slate-200 px-1 rounded">https://www.neuriax.com/api/instagram/webhook</code></li>
            </ol>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition-all"
          >
            {saving ? 'Guardando...' : '💾 Guardar configuración'}
          </button>
        </div>
      )}
    </div>
  );
}
