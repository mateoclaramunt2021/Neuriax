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
  label: string;
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
  message_type?: string;
}

interface QuickReply {
  id: number;
  label: string;
  message: string;
  icon: string;
}

interface InstagramConfig {
  bot_enabled: boolean;
  access_token?: string;
  instagram_account_id?: string;
  auto_reply_enabled: boolean;
  auto_reply_message: string;
  welcome_dm_enabled: boolean;
  welcome_message: string;
  token_expires_at?: string;
}

interface Stats {
  totalConversations: number;
  totalMessages: number;
  botMessages: number;
  humanMessages: number;
  todayMessages: number;
  weekMessages: number;
  unreadTotal: number;
  avgResponseTime: string;
  storyMentions: number;
  firstContacts: number;
  labelCounts: Record<string, number>;
}

const LABELS = [
  { value: 'nuevo', label: 'Nuevo', color: 'bg-slate-100 text-slate-700', dot: 'bg-slate-400' },
  { value: 'lead', label: 'Lead', color: 'bg-cyan-100 text-cyan-700', dot: 'bg-cyan-500' },
  { value: 'interesado', label: 'Interesado', color: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
  { value: 'cliente', label: 'Cliente', color: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
  { value: 'spam', label: 'Spam', color: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
];

export default function InstagramPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [config, setConfig] = useState<InstagramConfig | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([]);
  const [connected, setConnected] = useState(false);
  const [selectedSender, setSelectedSender] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [tab, setTab] = useState<'conversations' | 'config' | 'welcome' | 'quick_replies'>('conversations');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [filterLabel, setFilterLabel] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
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
        setStats(data.stats || null);
        setQuickReplies(data.quickReplies || []);
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

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || newMessage;
    if (!selectedSender || !text.trim() || sending) return;
    setSending(true);
    try {
      const res = await fetch('/api/superadmin/instagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderId: selectedSender, message: text }),
      });
      if (res.ok) {
        if (!messageText) setNewMessage('');
        await fetchConversation(selectedSender);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setSending(false);
    }
  };

  const handleUpdateLabel = async (senderId: string, label: string) => {
    try {
      await fetch('/api/superadmin/instagram', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_label', senderId, label }),
      });
      setConversations(prev =>
        prev.map(c => c.senderId === senderId ? { ...c, label } : c)
      );
    } catch (err) {
      console.error('Error:', err);
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
      if (res.ok) alert('Configuración guardada ✅');
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setSaving(false);
    }
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesLabel = filterLabel === 'all' || conv.label === filterLabel;
    const matchesSearch = !searchTerm || 
      conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLabel && matchesSearch;
  });

  const selectedConvLabel = conversations.find(c => c.senderId === selectedSender)?.label || 'nuevo';
  const labelInfo = LABELS.find(l => l.value === selectedConvLabel) || LABELS[0];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-slate-500">Cargando Instagram...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">📸 Instagram DMs</h1>
          <p className="text-slate-500 mt-1">Automatización completa de mensajes directos</p>
        </div>
        <div className="flex items-center gap-4">
          <LiveIndicator lastUpdated={new Date()} />
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-red-400'}`} />
            <span className="text-sm text-slate-600">{connected ? 'Conectado' : 'No conectado'}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="bg-white rounded-xl border border-slate-200 p-3">
          <p className="text-xl font-bold text-slate-900">{stats?.totalConversations || 0}</p>
          <p className="text-[10px] text-slate-500">Conversaciones</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-3">
          <p className="text-xl font-bold text-slate-900">{stats?.totalMessages || 0}</p>
          <p className="text-[10px] text-slate-500">Mensajes total</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-3">
          <p className="text-xl font-bold text-pink-600">{stats?.botMessages || 0}</p>
          <p className="text-[10px] text-slate-500">Bot IA 🤖</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-3">
          <p className="text-xl font-bold text-purple-600">{stats?.humanMessages || 0}</p>
          <p className="text-[10px] text-slate-500">Manuales</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-3">
          <p className="text-xl font-bold text-amber-600">{stats?.todayMessages || 0}</p>
          <p className="text-[10px] text-slate-500">Hoy</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-3">
          <p className="text-xl font-bold text-cyan-600">{stats?.unreadTotal || 0}</p>
          <p className="text-[10px] text-slate-500">Sin leer</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-3">
          <p className="text-xl font-bold text-green-600">{stats?.firstContacts || 0}</p>
          <p className="text-[10px] text-slate-500">1er contacto</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-3">
          <p className="text-xl font-bold text-fuchsia-600">{stats?.storyMentions || 0}</p>
          <p className="text-[10px] text-slate-500">Story mentions</p>
        </div>
      </div>

      {/* Pipeline Labels */}
      <div className="flex gap-2 flex-wrap">
        {LABELS.map(l => (
          <span key={l.value} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${l.color}`}>
            <span className={`w-2 h-2 rounded-full ${l.dot}`} />
            {l.label}: {stats?.labelCounts?.[l.value] || 0}
          </span>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
        {[
          { id: 'conversations', label: '💬 Conversaciones', key: 'conversations' as const },
          { id: 'config', label: '⚙️ Configuración', key: 'config' as const },
          { id: 'welcome', label: '👋 Bienvenida', key: 'welcome' as const },
          { id: 'quick_replies', label: '⚡ Resp. rápidas', key: 'quick_replies' as const },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.key)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              tab === t.key ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ===================== CONVERSATIONS TAB ===================== */}
      {tab === 'conversations' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversation list */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-3 border-b border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 text-sm">DMs</h3>
                <span className="text-xs text-slate-400">{filteredConversations.length} conv.</span>
              </div>
              <input
                type="text"
                placeholder="🔍 Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-pink-500"
              />
              <div className="flex gap-1 flex-wrap">
                <button
                  onClick={() => setFilterLabel('all')}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                    filterLabel === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  Todos
                </button>
                {LABELS.map(l => (
                  <button
                    key={l.value}
                    onClick={() => setFilterLabel(l.value)}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                      filterLabel === l.value ? l.color : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
              {filteredConversations.length > 0 ? filteredConversations.map((conv) => {
                const convLabel = LABELS.find(l => l.value === conv.label) || LABELS[0];
                return (
                  <button
                    key={conv.senderId}
                    onClick={() => setSelectedSender(conv.senderId)}
                    className={`w-full text-left p-3 hover:bg-slate-50 transition-colors ${
                      selectedSender === conv.senderId ? 'bg-pink-50 border-l-4 border-pink-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <p className="font-medium text-slate-900 text-sm truncate">{conv.name}</p>
                        <span className={`shrink-0 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium ${convLabel.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${convLabel.dot}`} />
                          {convLabel.label}
                        </span>
                      </div>
                      {conv.unread > 0 && (
                        <span className="shrink-0 w-5 h-5 bg-pink-500 text-white text-[10px] rounded-full flex items-center justify-center animate-pulse">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-1">{conv.lastMessage}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {new Date(conv.lastTime).toLocaleString('es-ES')} · {conv.totalMessages} msgs
                    </p>
                  </button>
                );
              }) : (
                <div className="p-8 text-center text-slate-400 text-sm">
                  <p className="text-4xl mb-3">📸</p>
                  <p className="font-medium">No hay DMs</p>
                  <p className="mt-2 text-xs">Los mensajes aparecerán aquí automáticamente.</p>
                </div>
              )}
            </div>
          </div>

          {/* Chat view */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 flex flex-col min-h-[500px]">
            {selectedSender ? (
              <>
                {/* Chat header */}
                <div className="p-3 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">
                        {conversations.find(c => c.senderId === selectedSender)?.name || selectedSender}
                      </p>
                      <p className="text-[10px] text-slate-400">ID: {selectedSender}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Label selector */}
                      <select
                        value={selectedConvLabel}
                        onChange={(e) => handleUpdateLabel(selectedSender, e.target.value)}
                        className={`text-xs px-2 py-1 rounded-lg border-0 font-medium ${labelInfo.color} cursor-pointer`}
                      >
                        {LABELS.map(l => (
                          <option key={l.value} value={l.value}>{l.label}</option>
                        ))}
                      </select>
                      <span className="text-xs bg-gradient-to-r from-purple-100 to-pink-100 text-pink-700 px-2 py-1 rounded-full">
                        Instagram
                      </span>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-[350px] bg-gradient-to-b from-slate-50 to-white">
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
                        {msg.message_type === 'story_mention' && (
                          <p className="text-[10px] opacity-60 mb-1">📷 Story Mention</p>
                        )}
                        {msg.message_type === 'first_contact' && (
                          <p className="text-[10px] opacity-60 mb-1">🆕 Primer contacto</p>
                        )}
                        {msg.message_type === 'comment' && (
                          <p className="text-[10px] opacity-60 mb-1">💬 Comentario</p>
                        )}
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

                {/* Quick Replies */}
                {quickReplies.length > 0 && (
                  <div className="px-4 pt-2 flex gap-1.5 flex-wrap">
                    {quickReplies.map((qr) => (
                      <button
                        key={qr.id}
                        onClick={() => handleSendMessage(qr.message)}
                        disabled={sending}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-pink-100 text-slate-700 hover:text-pink-700 rounded-full text-[11px] font-medium transition-colors disabled:opacity-50"
                        title={qr.message}
                      >
                        {qr.icon} {qr.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input */}
                <div className="p-3 border-t border-slate-200 flex gap-2">
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
                    onClick={() => handleSendMessage()}
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
                <p>Selecciona una conversación</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================== CONFIG TAB ===================== */}
      {tab === 'config' && config && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          {/* Connection Status */}
          <div className={`rounded-xl border p-4 ${connected ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
            <h3 className="font-semibold text-sm mb-1">
              {connected ? '✅ Instagram conectado' : '⚠️ Instagram no conectado'}
            </h3>
            <p className="text-xs text-slate-600">
              {connected
                ? `Tu cuenta está vinculada. ${config.token_expires_at ? `Token expira: ${new Date(config.token_expires_at).toLocaleDateString('es-ES')}` : 'Auto-refresh activo.'}`
                : 'Configura las credenciales de Meta para habilitar la automatización.'
              }
            </p>
          </div>

          {/* Bot toggle */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Bot IA automático</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-sm text-slate-600">{config.bot_enabled ? 'Activado' : 'Desactivado'}</span>
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

          {/* Credentials */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Token de acceso (Instagram API)</label>
            <input
              type="password"
              value={config.access_token || ''}
              onChange={(e) => setConfig({ ...config, access_token: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
              placeholder="IGAAxxxxxxxx..."
            />
            <p className="text-[10px] text-slate-400 mt-1">Se renueva automáticamente cada 50 días via cron.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">ID de cuenta de Instagram</label>
            <input
              type="text"
              value={config.instagram_account_id || ''}
              onChange={(e) => setConfig({ ...config, instagram_account_id: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
              placeholder="17841480589608877"
            />
          </div>

          {/* Auto reply */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-700">Respuesta automática</span>
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
            <textarea
              value={config.auto_reply_message}
              onChange={(e) => setConfig({ ...config, auto_reply_message: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
              rows={3}
            />
          </div>

          {/* Setup guide */}
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <h4 className="font-medium text-slate-700 mb-2 text-sm">📋 Pasos para conectar Instagram</h4>
            <ol className="text-xs text-slate-600 space-y-1 list-decimal list-inside">
              <li>Crea una app en <a href="https://developers.facebook.com" target="_blank" rel="noopener" className="text-cyan-600 hover:underline">developers.facebook.com</a></li>
              <li>Habilita el producto &quot;Instagram Graph API&quot;</li>
              <li>Vincula tu cuenta profesional de Instagram</li>
              <li>Genera un token de acceso de larga duración</li>
              <li>Introduce el token y el ID de cuenta arriba</li>
              <li>Configura el webhook: <code className="bg-slate-200 px-1 rounded">https://www.neuriax.com/api/instagram/webhook</code></li>
              <li>Token de verificación: <code className="bg-slate-200 px-1 rounded">neuriax-webhook-2026</code></li>
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

      {/* ===================== WELCOME TAB ===================== */}
      {tab === 'welcome' && config && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">👋 DM de Bienvenida Automático</h3>
            <p className="text-sm text-slate-500">Se envía automáticamente a cada nuevo contacto que te escribe por primera vez.</p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">Activar DM de bienvenida</span>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={config.welcome_dm_enabled}
                onChange={(e) => setConfig({ ...config, welcome_dm_enabled: e.target.checked })}
                className="sr-only"
              />
              <div className={`relative w-10 h-6 rounded-full transition-colors ${config.welcome_dm_enabled ? 'bg-pink-500' : 'bg-slate-300'}`}>
                <div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${config.welcome_dm_enabled ? 'translate-x-5' : 'translate-x-1'}`} />
              </div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mensaje de bienvenida</label>
            <textarea
              value={config.welcome_message || ''}
              onChange={(e) => setConfig({ ...config, welcome_message: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
              rows={5}
              placeholder="¡Hola! 👋 Gracias por seguirnos..."
            />
            <p className="text-[10px] text-slate-400 mt-1">Usa emojis y saltos de línea. Máximo 1000 caracteres.</p>
          </div>

          {/* Preview */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="text-xs font-medium text-slate-500 mb-2">Vista previa:</p>
            <div className="flex justify-end">
              <div className="max-w-[70%] bg-pink-100 text-pink-900 rounded-2xl px-4 py-2 text-sm shadow-sm">
                <p className="text-[10px] opacity-60 mb-1">🤖 Bot IA</p>
                <p className="whitespace-pre-wrap">{config.welcome_message || 'Sin mensaje configurado'}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-medium text-blue-800 text-sm mb-1">ℹ️ ¿Cómo funciona?</h4>
            <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
              <li>El cron se ejecuta cada 15 minutos</li>
              <li>Detecta nuevos usuarios que te han escrito por primera vez</li>
              <li>Les envía el mensaje de bienvenida automáticamente</li>
              <li>Máximo 20 DMs por ejecución (para respetar límites de Instagram)</li>
              <li>Cada usuario solo recibe el mensaje una vez</li>
            </ul>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition-all"
          >
            {saving ? 'Guardando...' : '💾 Guardar configuración de bienvenida'}
          </button>
        </div>
      )}

      {/* ===================== QUICK REPLIES TAB ===================== */}
      {tab === 'quick_replies' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">⚡ Respuestas Rápidas</h3>
            <p className="text-sm text-slate-500">Botones de respuesta rápida en el chat para enviar mensajes predefinidos con un click.</p>
          </div>

          <div className="space-y-4">
            {quickReplies.map((qr) => (
              <div key={qr.id} className="border border-slate-200 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{qr.icon}</span>
                    <span className="font-medium text-sm text-slate-900">{qr.label}</span>
                  </div>
                  <button
                    onClick={async () => {
                      if (confirm('¿Eliminar esta respuesta rápida?')) {
                        await fetch('/api/superadmin/instagram', {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ action: 'delete_quick_reply', id: qr.id }),
                        });
                        fetchData();
                      }
                    }}
                    className="text-red-400 hover:text-red-600 text-xs"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
                <p className="text-xs text-slate-500 whitespace-pre-wrap bg-slate-50 rounded p-2">{qr.message}</p>
              </div>
            ))}
          </div>

          {/* Add new quick reply */}
          <div className="border-t border-slate-200 pt-4">
            <h4 className="font-medium text-slate-700 text-sm mb-3">Añadir nueva respuesta rápida</h4>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                await fetch('/api/superadmin/instagram', {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    action: 'update_quick_reply',
                    label: formData.get('label'),
                    message: formData.get('message'),
                    icon: formData.get('icon') || '💬',
                  }),
                });
                form.reset();
                fetchData();
              }}
              className="space-y-3"
            >
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Emoji</label>
                  <input name="icon" type="text" defaultValue="💬" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
                <div className="col-span-3">
                  <label className="block text-xs text-slate-600 mb-1">Nombre del botón</label>
                  <input name="label" type="text" required placeholder="Ej: Enviar precios" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-1">Mensaje que se envía</label>
                <textarea name="message" required rows={3} placeholder="El mensaje completo que recibirá el usuario..." className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                ➕ Añadir respuesta rápida
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
