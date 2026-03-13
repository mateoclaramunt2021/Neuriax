'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import LiveIndicator from '@/components/superadmin/LiveIndicator';

interface Lead {
  phone_number: string;
  contact_name: string;
  negocio: string | null;
  sector: string | null;
  empleados: string | null;
  necesidad: string | null;
  urgencia: string | null;
  presupuesto: string | null;
  presupuesto_ok: boolean | null;
  resumen: string | null;
  estado: string;
  bot_paused: boolean;
  qualifying_step: number;
  followup_count: number;
  followup_sent_at: string | null;
  last_inbound_at: string | null;
  updated_at: string;
}

interface Conversation {
  phone: string;
  name: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  totalMessages: number;
  lead: Lead | null;
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

interface RecentActivity {
  phone: string;
  name: string;
  content: string;
  status: string;
  is_bot: boolean;
  created_at: string;
}

const ESTADO_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  nuevo: { label: '🆕 Nuevo', color: 'text-slate-600', bg: 'bg-slate-100' },
  cualificando: { label: '🔄 Cualificando', color: 'text-amber-700', bg: 'bg-amber-50' },
  cualificado: { label: '✅ Cualificado', color: 'text-green-700', bg: 'bg-green-50' },
  no_cualificado: { label: '❌ No cualificado', color: 'text-red-600', bg: 'bg-red-50' },
  llamada_agendada: { label: '📅 Llamada agendada', color: 'text-blue-700', bg: 'bg-blue-50' },
  no_responde: { label: '😶 No responde', color: 'text-gray-500', bg: 'bg-gray-100' },
};

function timeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return 'hace unos minutos';
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `+${days} día${days > 1 ? 's' : ''}`;
}

export default function WhatsAppPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [config, setConfig] = useState<WhatsAppConfig | null>(null);
  const [stats, setStats] = useState<any>({});
  const [currentLead, setCurrentLead] = useState<Lead | null>(null);
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [tab, setTab] = useState<'inbox' | 'pipeline' | 'config'>('inbox');
  const [loading, setLoading] = useState(true);
  const [savingConfig, setSavingConfig] = useState(false);
  const [sending, setSending] = useState(false);
  const [followingUp, setFollowingUp] = useState<string | null>(null);
  const [massFollowingUp, setMassFollowingUp] = useState(false);
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
        setCurrentLead(data.lead || null);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

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
    if (selectedPhone) fetchConversation(selectedPhone);
  }, [selectedPhone, fetchConversation]);

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
        setNewMessage('');
        await fetchConversation(selectedPhone);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setSending(false);
    }
  };

  const handleToggleBotPause = async (phone: string, paused: boolean) => {
    try {
      await fetch('/api/superadmin/whatsapp', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, bot_paused: paused }),
      });
      await fetchData();
      if (selectedPhone === phone) await fetchConversation(phone);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleChangeEstado = async (phone: string, estado: string) => {
    try {
      await fetch('/api/superadmin/whatsapp', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, estado }),
      });
      await fetchData();
      if (selectedPhone === phone) await fetchConversation(phone);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleFollowup = async (phone: string) => {
    setFollowingUp(phone);
    try {
      await fetch('/api/superadmin/whatsapp', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, action: 'followup' }),
      });
      await fetchData();
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setFollowingUp(null);
    }
  };

  const handleMassFollowup = async () => {
    if (massFollowingUp) return;
    const phones = stats.pendingFollowupPhones || [];
    if (phones.length === 0) return;
    setMassFollowingUp(true);
    try {
      await fetch('/api/superadmin/whatsapp', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phones[0], action: 'followup_mass', phones }),
      });
      await fetchData();
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setMassFollowingUp(false);
    }
  };

  const handleDiscard = async (phone: string) => {
    try {
      await fetch('/api/superadmin/whatsapp', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, action: 'discard' }),
      });
      await fetchData();
    } catch (err) {
      console.error('Error:', err);
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

  const pipeline = stats.pipeline || { nuevo: 0, cualificando: 0, cualificado: 0, no_cualificado: 0, llamada_agendada: 0, no_responde: 0 };

  // Get pending follow-up conversations
  const pendingFollowupConvs = conversations.filter(c => 
    (stats.pendingFollowupPhones || []).includes(c.phone)
  );

  const recentActivity: RecentActivity[] = stats.recentActivity || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">💬 WhatsApp CRM</h1>
          <p className="text-slate-500 mt-1">AI Setter · Neuriax</p>
        </div>
        <div className="flex items-center gap-4">
          <LiveIndicator lastUpdated={new Date()} />
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${config?.bot_enabled ? 'bg-green-500 animate-pulse' : 'bg-red-400'}`} />
            <span className="text-sm text-slate-600">{config?.bot_enabled ? '🤖 AI Activo' : 'Bot desactivado'}</span>
          </div>
        </div>
      </div>

      {/* ─── STATS BAR ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
        {[
          { value: stats.totalConversations || 0, label: 'Conversaciones', icon: '💬' },
          { value: stats.totalMessages || 0, label: 'Mensajes', icon: '📨' },
          { value: stats.botMessages7d || 0, label: 'Bot (7d)', icon: '🤖' },
          { value: stats.manualMessages7d || 0, label: 'Manuales (7d)', icon: '👤' },
          { value: stats.todayMessages || 0, label: 'Hoy', icon: '📅' },
          { value: stats.unreadCount || 0, label: 'Sin leer', icon: '🔴', highlight: (stats.unreadCount || 0) > 0 },
          { value: stats.firstContact7d || 0, label: '1er Contacto (7d)', icon: '🆕' },
          { value: `${stats.responseRate || 0}%`, label: 'Tasa Respuesta', icon: '📊' },
          { value: stats.pendingFollowups || 0, label: 'Pendientes', icon: '⏳', highlight: (stats.pendingFollowups || 0) > 0 },
        ].map((s, i) => (
          <div key={i} className={`bg-white rounded-xl border p-3 text-center ${s.highlight ? 'border-amber-300 bg-amber-50' : 'border-slate-200'}`}>
            <p className="text-lg font-bold text-slate-900">{s.value}</p>
            <p className="text-[10px] text-slate-500">{s.icon} {s.label}</p>
          </div>
        ))}
      </div>

      {/* ─── PIPELINE MINI-BAR ──────────────────────────────────────────── */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {Object.entries(ESTADO_LABELS).map(([key, { label, bg, color }]) => (
          <div key={key} className={`${bg} rounded-lg p-3 text-center`}>
            <p className={`text-xl font-bold ${color}`}>{pipeline[key] || 0}</p>
            <p className="text-[10px] text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      {/* ─── TABS ───────────────────────────────────────────────────────── */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
        {[
          { key: 'inbox' as const, label: '📥 Inbox', count: stats.pendingFollowups || 0 },
          { key: 'pipeline' as const, label: '📊 Pipeline' },
          { key: 'config' as const, label: '⚙️ Settings' },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-2 ${
              tab === t.key ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
            }`}
          >
            {t.label}
            {t.count ? <span className="w-5 h-5 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center">{t.count}</span> : null}
          </button>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ─── INBOX TAB ──────────────────────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {tab === 'inbox' && (
        <div className="space-y-6">

          {/* ─── PENDING FOLLOW-UPS SECTION ────────────────────────────── */}
          {pendingFollowupConvs.length > 0 && (
            <div className="bg-white rounded-xl border border-amber-200 overflow-hidden">
              <div className="p-4 border-b border-amber-100 bg-amber-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg">📋</span>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">Chats sin seguimiento</h3>
                    <p className="text-xs text-slate-500">{pendingFollowupConvs.length} leads que necesitan follow-up</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => fetchData()}
                    className="text-xs px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    🔄 Analizar
                  </button>
                  <button
                    onClick={handleMassFollowup}
                    disabled={massFollowingUp}
                    className="text-xs px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-1"
                  >
                    {massFollowingUp ? (
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      '📩'
                    )}
                    Follow-up masivo ({pendingFollowupConvs.length})
                  </button>
                </div>
              </div>
              <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
                {pendingFollowupConvs.map((conv) => {
                  const lead = conv.lead;
                  const hoursAgo = lead?.last_inbound_at
                    ? Math.floor((Date.now() - new Date(lead.last_inbound_at).getTime()) / (1000 * 60 * 60))
                    : 0;
                  const estadoInfo = ESTADO_LABELS[lead?.estado || 'nuevo'] || ESTADO_LABELS.nuevo;

                  return (
                    <div key={conv.phone} className="p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-slate-900 text-sm">{conv.name}</p>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded ${estadoInfo.bg} ${estadoInfo.color}`}>
                              {lead?.estado || 'nuevo'}
                            </span>
                            {(lead?.followup_count || 0) > 0 && (
                              <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">
                                {lead?.followup_count} follow-up{(lead?.followup_count || 0) > 1 ? 's' : ''}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 truncate">{conv.lastMessage}</p>
                          <p className="text-[10px] text-amber-600 mt-1">
                            Sin respuesta hace {timeAgo(lead?.last_inbound_at || conv.lastTime)}
                            <span className="text-slate-400"> · {hoursAgo}h · {conv.totalMessages} msgs</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => handleFollowup(conv.phone)}
                            disabled={followingUp === conv.phone}
                            className="text-xs px-2.5 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors disabled:opacity-50 flex items-center gap-1"
                          >
                            {followingUp === conv.phone ? (
                              <div className="w-3 h-3 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              '📩'
                            )}
                            Follow-up
                          </button>
                          <button
                            onClick={() => { setSelectedPhone(conv.phone); }}
                            className="text-xs px-2 py-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                          >
                            💬
                          </button>
                          <button
                            onClick={() => handleDiscard(conv.phone)}
                            className="text-xs px-2 py-1.5 bg-red-50 text-red-400 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors"
                          >
                            🚫
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─── RECENT BOT ACTIVITY ──────────────────────────────────── */}
          {recentActivity.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex items-center gap-2">
                <span className="text-lg">📊</span>
                <h3 className="font-semibold text-slate-900 text-sm">Actividad reciente del bot</h3>
              </div>
              <div className="divide-y divide-slate-50 max-h-[300px] overflow-y-auto">
                {recentActivity.map((a, i) => (
                  <div key={i} className="px-4 py-2.5 flex items-center gap-3 text-xs hover:bg-slate-50">
                    <span className={`shrink-0 ${a.is_bot ? 'text-green-500' : 'text-cyan-500'}`}>
                      {a.is_bot ? '🤖' : '👤'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-slate-700">{a.name}</span>
                      <span className="text-slate-400 mx-1">·</span>
                      <span className="text-slate-500 truncate">{a.content}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${a.status === 'sent' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                        {a.status}
                      </span>
                      <span className="text-[10px] text-slate-400">{timeAgo(a.created_at)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── CONVERSATIONS + CHAT ─────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversation list */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">Conversaciones</h3>
                <span className="text-xs text-slate-400">{conversations.length} total</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
                {conversations.length > 0 ? conversations.map((conv) => {
                  const estado = conv.lead?.estado || 'nuevo';
                  const estadoInfo = ESTADO_LABELS[estado] || ESTADO_LABELS.nuevo;
                  return (
                    <button
                      key={conv.phone}
                      onClick={() => setSelectedPhone(conv.phone)}
                      className={`w-full text-left p-4 hover:bg-slate-50 transition-colors ${
                        selectedPhone === conv.phone ? 'bg-green-50 border-l-4 border-green-500' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-slate-900 text-sm">{conv.name}</p>
                        <div className="flex items-center gap-1.5">
                          {conv.lead?.bot_paused && (
                            <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded">⏸</span>
                          )}
                          {(conv.lead?.followup_count || 0) > 0 && (
                            <span className="text-[10px] bg-blue-100 text-blue-600 px-1 py-0.5 rounded">
                              📩{conv.lead?.followup_count}
                            </span>
                          )}
                          {conv.unread > 0 && (
                            <span className="w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-1">{conv.lastMessage}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-[10px] text-slate-400">
                          {timeAgo(conv.lastTime)} · {conv.totalMessages} msgs
                        </p>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${estadoInfo.bg} ${estadoInfo.color}`}>
                          {estadoInfo.label}
                        </span>
                      </div>
                    </button>
                  );
                }) : (
                  <div className="p-8 text-center text-slate-400 text-sm">
                    <p className="text-4xl mb-3">📱</p>
                    <p className="font-medium">No hay conversaciones aún</p>
                    <p className="mt-2 text-xs">Cuando alguien te escriba por WhatsApp, aparecerán aquí.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Chat + Lead Card */}
            <div className="lg:col-span-2 space-y-4">
              {/* Lead Summary Card */}
              {selectedPhone && currentLead && (currentLead.negocio || currentLead.necesidad || currentLead.resumen) && (
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-slate-900 text-sm">📋 Ficha del Lead</h4>
                    <div className="flex items-center gap-2">
                      <select
                        value={currentLead.estado || 'nuevo'}
                        onChange={(e) => handleChangeEstado(selectedPhone, e.target.value)}
                        className="text-xs border border-slate-300 rounded px-2 py-1"
                      >
                        {Object.entries(ESTADO_LABELS).map(([key, { label }]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {currentLead.resumen && (
                    <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-3 mb-3 italic">&quot;{currentLead.resumen}&quot;</p>
                  )}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div><span className="text-slate-400">Negocio:</span> <span className="text-slate-700 font-medium">{currentLead.negocio || '—'}</span></div>
                    <div><span className="text-slate-400">Sector:</span> <span className="text-slate-700 font-medium">{currentLead.sector || '—'}</span></div>
                    <div><span className="text-slate-400">Empleados:</span> <span className="text-slate-700 font-medium">{currentLead.empleados || '—'}</span></div>
                    <div><span className="text-slate-400">Necesidad:</span> <span className="text-slate-700 font-medium">{currentLead.necesidad || '—'}</span></div>
                    <div><span className="text-slate-400">Urgencia:</span> <span className="text-slate-700 font-medium">{currentLead.urgencia || '—'}</span></div>
                    <div>
                      <span className="text-slate-400">Presupuesto:</span>{' '}
                      <span className={`font-medium ${currentLead.presupuesto_ok === true ? 'text-green-600' : currentLead.presupuesto_ok === false ? 'text-red-500' : 'text-slate-700'}`}>
                        {currentLead.presupuesto || '—'}
                        {currentLead.presupuesto_ok === true && ' ✅'}
                        {currentLead.presupuesto_ok === false && ' ❌'}
                      </span>
                    </div>
                  </div>
                  {/* Follow-up info */}
                  {(currentLead.followup_count > 0 || currentLead.last_inbound_at) && (
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-4 text-[11px] text-slate-400">
                      {currentLead.last_inbound_at && (
                        <span>Último msg: {timeAgo(currentLead.last_inbound_at)}</span>
                      )}
                      {currentLead.followup_count > 0 && (
                        <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                          📩 {currentLead.followup_count} follow-up{currentLead.followup_count > 1 ? 's' : ''} enviado{currentLead.followup_count > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Chat view */}
              <div className="bg-white rounded-xl border border-slate-200 flex flex-col min-h-[500px]">
                {selectedPhone ? (
                  <>
                    <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {conversations.find(c => c.phone === selectedPhone)?.name || selectedPhone}
                        </p>
                        <p className="text-xs text-slate-400">{selectedPhone}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleFollowup(selectedPhone)}
                          disabled={followingUp === selectedPhone}
                          className="text-xs px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors disabled:opacity-50"
                        >
                          📩 Follow-up
                        </button>
                        <button
                          onClick={() => handleToggleBotPause(selectedPhone, !(currentLead?.bot_paused))}
                          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                            currentLead?.bot_paused
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-red-100 text-red-600 hover:bg-red-200'
                          }`}
                        >
                          {currentLead?.bot_paused ? '▶️ Activar bot' : '⏸️ Pausar bot'}
                        </button>
                      </div>
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
          </div>
        </div>
      )}

      {/* ─── PIPELINE TAB ───────────────────────────────────────────────── */}
      {tab === 'pipeline' && (
        <div className="space-y-4">
          {Object.entries(ESTADO_LABELS).map(([estado, { label, bg, color }]) => {
            const leadsInState = conversations.filter(c => (c.lead?.estado || 'nuevo') === estado);
            if (leadsInState.length === 0) return null;
            return (
              <div key={estado}>
                <h3 className={`font-semibold text-sm mb-2 ${color}`}>{label} ({leadsInState.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {leadsInState.map((conv) => (
                    <div
                      key={conv.phone}
                      className={`${bg} border border-slate-200 rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow`}
                      onClick={() => { setSelectedPhone(conv.phone); setTab('inbox'); }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-slate-900 text-sm">{conv.name}</p>
                        <div className="flex items-center gap-1">
                          {conv.lead?.bot_paused && <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded">⏸</span>}
                          {(conv.lead?.followup_count || 0) > 0 && (
                            <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">📩{conv.lead?.followup_count}</span>
                          )}
                        </div>
                      </div>
                      {conv.lead?.resumen && (
                        <p className="text-xs text-slate-600 italic mb-2">&quot;{conv.lead.resumen}&quot;</p>
                      )}
                      <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-500">
                        {conv.lead?.negocio && <p>🏢 {conv.lead.negocio}</p>}
                        {conv.lead?.empleados && <p>👥 {conv.lead.empleados}</p>}
                        {conv.lead?.necesidad && <p>💡 {conv.lead.necesidad}</p>}
                        {conv.lead?.urgencia && <p>⏰ {conv.lead.urgencia}</p>}
                        {conv.lead?.presupuesto && (
                          <p className={conv.lead.presupuesto_ok ? 'text-green-600 font-medium' : ''}>
                            💰 {conv.lead.presupuesto} {conv.lead.presupuesto_ok ? '✅' : ''}
                          </p>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-2">{conv.totalMessages} msgs · {new Date(conv.lastTime).toLocaleDateString('es-ES')}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          {conversations.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <p className="text-4xl mb-3">📊</p>
              <p>No hay leads aún. Los leads aparecerán aquí cuando lleguen mensajes por WhatsApp.</p>
            </div>
          )}
        </div>
      )}

      {/* ─── CONFIG TAB ─────────────────────────────────────────────────── */}
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
