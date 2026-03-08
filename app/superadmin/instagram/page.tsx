'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

/* ─── Types ─── */
interface ColdLead {
  id: number;
  instagram_user_id: string;
  username: string;
  full_name: string | null;
  sector: string;
  bio: string | null;
  followers_count: number;
  source_hashtag: string;
  status: string;
  first_dm_sent_at: string | null;
  first_dm_message: string | null;
  followup_sent_at: string | null;
  followup_message: string | null;
  responded: boolean;
  responded_at: string | null;
  converted: boolean;
  blacklisted: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}
interface ColdStats {
  total: number;
  new: number;
  contacted: number;
  responded: number;
  noResponse: number;
  converted: number;
  responseRate: number;
  sectors: Record<string, number>;
}
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
interface QuickReply { id: number; label: string; message: string; icon: string; }
interface InstagramConfig {
  bot_enabled: boolean;
  access_token?: string;
  instagram_account_id?: string;
  auto_reply_enabled: boolean;
  auto_reply_message: string;
  welcome_dm_enabled: boolean;
  welcome_message: string;
  token_expires_at?: string;
  cold_outreach_enabled?: boolean;
  cold_dm_daily_limit?: number;
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

/* ─── Pipeline labels ─── */
const LABELS = [
  { value: 'nuevo',      label: 'Nuevo',      color: 'bg-slate-500/10 text-slate-300 ring-slate-500/30',      dot: 'bg-slate-400',  icon: '○' },
  { value: 'lead',       label: 'Lead',       color: 'bg-cyan-500/10 text-cyan-300 ring-cyan-500/30',        dot: 'bg-cyan-400',   icon: '◈' },
  { value: 'interesado', label: 'Interesado', color: 'bg-amber-500/10 text-amber-300 ring-amber-500/30',     dot: 'bg-amber-400',  icon: '◆' },
  { value: 'cliente',    label: 'Cliente',    color: 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/30', dot: 'bg-emerald-400', icon: '●' },
  { value: 'spam',       label: 'Spam',       color: 'bg-red-500/10 text-red-300 ring-red-500/30',           dot: 'bg-red-400',    icon: '✕' },
];

/* ─── Toggle component ─── */
function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <button
        role="switch"
        aria-checked={on}
        onClick={() => onChange(!on)}
        className={`relative w-11 h-6 rounded-full transition-all duration-200 ${on ? 'bg-gradient-to-r from-fuchsia-500 to-violet-500 shadow-lg shadow-fuchsia-500/25' : 'bg-[#2a2a3e]'}`}
      >
        <span className={`block w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-200 absolute top-1 ${on ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
      <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{label}</span>
    </label>
  );
}

/* ─── Stat card ─── */
function StatCard({ value, label, accent }: { value: number | string; label: string; accent: string }) {
  return (
    <div className="bg-[#1a1a2e]/80 backdrop-blur-sm rounded-2xl border border-white/[0.06] p-4 hover:border-white/[0.12] transition-all group">
      <p className={`text-2xl font-semibold tracking-tight ${accent}`}>{value}</p>
      <p className="text-[11px] text-slate-500 mt-1 group-hover:text-slate-400 transition-colors">{label}</p>
    </div>
  );
}

/* ─── Time ago helper ─── */
function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'ahora';
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `${days}d`;
}

/* ════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ════════════════════════════════════════════════════════════════ */
export default function InstagramPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [config, setConfig] = useState<InstagramConfig | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([]);
  const [connected, setConnected] = useState(false);
  const [selectedSender, setSelectedSender] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [tab, setTab] = useState<'inbox' | 'pipeline' | 'prospecting' | 'settings'>('inbox');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [filterLabel, setFilterLabel] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [settingsTab, setSettingsTab] = useState<'bot' | 'welcome' | 'quick' | 'outreach'>('bot');
  const [toast, setToast] = useState<string | null>(null);
  const [coldLeads, setColdLeads] = useState<ColdLead[]>([]);
  const [coldStats, setColdStats] = useState<ColdStats | null>(null);
  const [coldFilter, setColdFilter] = useState<string>('all');
  const [coldSectorFilter, setColdSectorFilter] = useState<string>('all');
  const [showAddLead, setShowAddLead] = useState(false);
  const [newLeadUsername, setNewLeadUsername] = useState('');
  const [newLeadSector, setNewLeadSector] = useState('restaurante');
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadNotes, setNewLeadNotes] = useState('');
  const [addingLead, setAddingLead] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const selectedSenderRef = useRef<string | null>(null);

  useEffect(() => { selectedSenderRef.current = selectedSender; }, [selectedSender]);

  /* — Show toast — */
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  /* — Fetch cold leads — */
  const fetchColdLeads = useCallback(async () => {
    try {
      const params = new URLSearchParams({ section: 'cold_leads' });
      if (coldFilter !== 'all') params.set('status', coldFilter);
      if (coldSectorFilter !== 'all') params.set('sector', coldSectorFilter);
      const res = await fetch(`/api/superadmin/instagram?${params}`);
      if (res.ok) {
        const data = await res.json();
        setColdLeads(data.coldLeads || []);
        setColdStats(data.coldStats || null);
      }
    } catch (err) { console.error('Cold leads fetch error:', err); }
  }, [coldFilter, coldSectorFilter]);

  /* — Data fetching — */
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
    } catch (err) { console.error('Error:', err); }
    finally { setLoading(false); }
  }, []);

  const fetchConversation = useCallback(async (senderId: string) => {
    try {
      const res = await fetch(`/api/superadmin/instagram?sender=${encodeURIComponent(senderId)}`);
      if (res.ok) { const data = await res.json(); setMessages(data.messages || []); }
    } catch (err) { console.error('Error:', err); }
  }, []);

  useEffect(() => { fetchData(); fetchColdLeads(); }, [fetchData, fetchColdLeads]);
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
      fetchColdLeads();
      if (selectedSenderRef.current) fetchConversation(selectedSenderRef.current);
    }, 8000);
    return () => clearInterval(interval);
  }, [fetchData, fetchConversation, fetchColdLeads]);
  useEffect(() => { if (selectedSender) fetchConversation(selectedSender); }, [selectedSender, fetchConversation]);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  /* — Actions — */
  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || newMessage;
    if (!selectedSender || !text.trim() || sending) return;
    setSending(true);
    try {
      const res = await fetch('/api/superadmin/instagram', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderId: selectedSender, message: text }),
      });
      if (res.ok) { if (!messageText) setNewMessage(''); await fetchConversation(selectedSender); }
    } catch (err) { console.error('Error:', err); }
    finally { setSending(false); }
  };

  const handleUpdateLabel = async (senderId: string, label: string) => {
    try {
      await fetch('/api/superadmin/instagram', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_label', senderId, label }),
      });
      setConversations(prev => prev.map(c => c.senderId === senderId ? { ...c, label } : c));
      showToast(`Label → ${label}`);
    } catch (err) { console.error('Error:', err); }
  };

  const handleSave = async () => {
    if (!config) return;
    setSaving(true);
    try {
      const res = await fetch('/api/superadmin/instagram', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      if (res.ok) showToast('Configuración guardada');
    } catch (err) { console.error('Error:', err); }
    finally { setSaving(false); }
  };

  /* — Cold lead actions — */
  const handleBlacklistLead = async (leadId: number) => {
    await fetch('/api/superadmin/instagram', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'blacklist_lead', leadId }),
    });
    setColdLeads(prev => prev.filter(l => l.id !== leadId));
    showToast('Lead bloqueado');
  };

  const handleConvertLead = async (leadId: number) => {
    await fetch('/api/superadmin/instagram', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'convert_lead', leadId }),
    });
    setColdLeads(prev => prev.map(l => l.id === leadId ? { ...l, converted: true, status: 'converted' } : l));
    showToast('Lead convertido 🎉');
  };

  const handleSendDMToLead = async (leadId: number, username: string) => {
    setSelectedSender(username);
    setTab('inbox');
  };

  const handleAddLead = async () => {
    if (!newLeadUsername.trim() || addingLead) return;
    setAddingLead(true);
    try {
      const res = await fetch('/api/superadmin/instagram', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_lead',
          username: newLeadUsername.trim(),
          sector: newLeadSector,
          full_name: newLeadName.trim() || undefined,
          notes: newLeadNotes.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        showToast(data.dmSent
          ? `@${newLeadUsername.replace(/^@/, '')} añadido y DM enviado ✅`
          : `@${newLeadUsername.replace(/^@/, '')} añadido (DM pendiente)`
        );
        setNewLeadUsername('');
        setNewLeadName('');
        setNewLeadNotes('');
        setShowAddLead(false);
        fetchColdLeads();
      } else {
        showToast(data.error || 'Error al añadir lead');
      }
    } catch (err) { console.error('Error:', err); showToast('Error de conexión'); }
    finally { setAddingLead(false); }
  };

  /* — Filters — */
  const filteredConversations = conversations.filter(conv => {
    const matchesLabel = filterLabel === 'all' || conv.label === filterLabel;
    const matchesSearch = !searchTerm ||
      conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLabel && matchesSearch;
  });

  const selectedConv = conversations.find(c => c.senderId === selectedSender);
  const selectedConvLabel = selectedConv?.label || 'nuevo';
  const labelInfo = LABELS.find(l => l.value === selectedConvLabel) || LABELS[0];

  /* — Loading — */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f0f1a]">
        <div className="text-center space-y-4">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-2 border-fuchsia-500/20 animate-ping" />
            <div className="absolute inset-2 rounded-full border-2 border-t-fuchsia-500 animate-spin" />
          </div>
          <p className="text-slate-500 text-sm">Conectando con Instagram...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">
      {/* ─── Toast ─── */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500/90 backdrop-blur text-white text-sm px-5 py-3 rounded-xl shadow-2xl shadow-emerald-500/20 animate-[slideIn_0.3s_ease-out] flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
          {toast}
        </div>
      )}

      {/* ─── Top Bar ─── */}
      <div className="border-b border-white/[0.06] bg-[#0f0f1a]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: title */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center shadow-lg shadow-fuchsia-500/20">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold tracking-tight">Instagram CRM</h1>
                <p className="text-xs text-slate-500">AI Setter &middot; @neuriaxx</p>
              </div>
            </div>

            {/* Center: Tabs */}
            <nav className="hidden md:flex items-center bg-white/[0.04] rounded-xl p-1">
              {([
                { id: 'inbox' as const, label: 'Inbox', count: stats?.unreadTotal },
                { id: 'pipeline' as const, label: 'Pipeline' },
                { id: 'prospecting' as const, label: 'Prospección', count: coldStats?.new },
                { id: 'settings' as const, label: 'Settings' },
              ]).map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`relative px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    tab === t.id
                      ? 'bg-white/[0.08] text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {t.label}
                  {t.count && t.count > 0 ? (
                    <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-fuchsia-500 text-white rounded-full font-semibold">{t.count}</span>
                  ) : null}
                </button>
              ))}
            </nav>

            {/* Right: Status */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04]">
                <span className="relative flex h-2 w-2">
                  {connected && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />}
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${connected ? 'bg-emerald-400' : 'bg-red-400'}`} />
                </span>
                <span className="text-xs text-slate-400">{connected ? 'Live' : 'Offline'}</span>
              </div>
              {config?.bot_enabled && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-fuchsia-500/10 ring-1 ring-fuchsia-500/20">
                  <span className="text-xs">🤖</span>
                  <span className="text-xs text-fuchsia-300 font-medium">AI Activo</span>
                </div>
              )}
            </div>
          </div>

          {/* Mobile tabs */}
          <nav className="md:hidden flex items-center gap-1 mt-3 bg-white/[0.04] rounded-xl p-1">
            {(['inbox', 'pipeline', 'prospecting', 'settings'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
                  tab === t ? 'bg-white/[0.08] text-white' : 'text-slate-500'
                }`}
              >
                {t === 'inbox' ? '📥 Inbox' : t === 'pipeline' ? '📊 Pipeline' : t === 'prospecting' ? '🎯 Prospección' : '⚙️ Settings'}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-6 space-y-6">

        {/* ─── Stats Row ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          <StatCard value={stats?.totalConversations || 0} label="Conversaciones" accent="text-white" />
          <StatCard value={stats?.totalMessages || 0} label="Mensajes" accent="text-white" />
          <StatCard value={stats?.botMessages || 0} label="AI Bot" accent="text-fuchsia-400" />
          <StatCard value={stats?.humanMessages || 0} label="Manuales" accent="text-violet-400" />
          <StatCard value={stats?.todayMessages || 0} label="Hoy" accent="text-amber-400" />
          <StatCard value={stats?.unreadTotal || 0} label="Sin leer" accent="text-cyan-400" />
          <StatCard value={stats?.firstContacts || 0} label="1er contacto" accent="text-emerald-400" />
          <StatCard value={stats?.storyMentions || 0} label="Stories" accent="text-pink-400" />
        </div>

        {/* ═══════════════════ INBOX TAB ═══════════════════ */}
        {tab === 'inbox' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-[#1a1a2e]/60 backdrop-blur rounded-2xl border border-white/[0.06] overflow-hidden min-h-[600px]">

            {/* ── Sidebar: Conversations ── */}
            <div className="lg:col-span-4 xl:col-span-3 border-r border-white/[0.06] flex flex-col">
              {/* Search & Filter */}
              <div className="p-4 space-y-3 border-b border-white/[0.06]">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  <input
                    type="text"
                    placeholder="Buscar conversación..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/20 transition-all"
                  />
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  <button
                    onClick={() => setFilterLabel('all')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                      filterLabel === 'all' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Todos ({conversations.length})
                  </button>
                  {LABELS.map(l => {
                    const count = stats?.labelCounts?.[l.value] || 0;
                    return (
                      <button
                        key={l.value}
                        onClick={() => setFilterLabel(l.value)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                          filterLabel === l.value ? `${l.color} ring-1` : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {l.label} {count > 0 ? `(${count})` : ''}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Conversation list */}
              <div className="flex-1 overflow-y-auto divide-y divide-white/[0.04]">
                {filteredConversations.length > 0 ? filteredConversations.map((conv) => {
                  const convLabel = LABELS.find(l => l.value === conv.label) || LABELS[0];
                  const isSelected = selectedSender === conv.senderId;
                  return (
                    <button
                      key={conv.senderId}
                      onClick={() => setSelectedSender(conv.senderId)}
                      className={`w-full text-left px-4 py-3.5 transition-all ${
                        isSelected
                          ? 'bg-fuchsia-500/10 border-l-2 border-fuchsia-500'
                          : 'hover:bg-white/[0.03] border-l-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Avatar */}
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${
                            isSelected ? 'bg-fuchsia-500/20 text-fuchsia-300' : 'bg-white/[0.06] text-slate-400'
                          }`}>
                            {conv.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className={`text-sm font-medium truncate ${isSelected ? 'text-white' : 'text-slate-200'}`}>{conv.name}</p>
                              <span className={`shrink-0 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold ring-1 ${convLabel.color}`}>
                                {convLabel.label}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 truncate mt-0.5">{conv.lastMessage}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end shrink-0 gap-1">
                          <span className="text-[10px] text-slate-600">{timeAgo(conv.lastTime)}</span>
                          {conv.unread > 0 && (
                            <span className="w-5 h-5 bg-fuchsia-500 text-white text-[10px] rounded-full flex items-center justify-center font-semibold shadow-lg shadow-fuchsia-500/30">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                }) : (
                  <div className="flex flex-col items-center justify-center py-16 text-slate-600">
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.04] flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                    </div>
                    <p className="text-sm font-medium">Inbox vacío</p>
                    <p className="text-xs mt-1 text-slate-700">Los DMs llegarán aquí automáticamente</p>
                  </div>
                )}
              </div>
            </div>

            {/* ── Chat panel ── */}
            <div className="lg:col-span-8 xl:col-span-9 flex flex-col">
              {selectedSender ? (
                <>
                  {/* Chat header */}
                  <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 flex items-center justify-center text-fuchsia-300 font-semibold">
                        {selectedConv?.name?.charAt(0).toUpperCase() || '?'}
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">{selectedConv?.name || selectedSender}</p>
                        <p className="text-[11px] text-slate-500">{selectedConv?.totalMessages || 0} mensajes &middot; {timeAgo(selectedConv?.lastTime || new Date().toISOString())}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={selectedConvLabel}
                        onChange={(e) => handleUpdateLabel(selectedSender, e.target.value)}
                        className={`text-xs px-3 py-1.5 rounded-lg border-0 font-semibold cursor-pointer ring-1 ${labelInfo.color} bg-transparent appearance-none`}
                      >
                        {LABELS.map(l => (
                          <option key={l.value} value={l.value} className="bg-[#1a1a2e] text-white">{l.icon} {l.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 px-6 py-4 overflow-y-auto space-y-3 max-h-[450px]" style={{ background: 'radial-gradient(ellipse at top, rgba(139,92,246,0.03), transparent)' }}>
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.direction === 'outbound' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[65%] rounded-2xl px-4 py-2.5 text-sm ${
                          msg.direction === 'outbound'
                            ? msg.is_bot
                              ? 'bg-fuchsia-500/15 text-fuchsia-100 ring-1 ring-fuchsia-500/20'
                              : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/10'
                            : 'bg-white/[0.06] text-slate-200 ring-1 ring-white/[0.08]'
                        }`}>
                          {msg.message_type === 'story_mention' && <p className="text-[10px] opacity-50 mb-1 font-medium">📷 Story Mention</p>}
                          {msg.message_type === 'first_contact' && <p className="text-[10px] opacity-50 mb-1 font-medium">✨ Primer contacto</p>}
                          {msg.message_type === 'comment' && <p className="text-[10px] opacity-50 mb-1 font-medium">💬 Comentario</p>}
                          {msg.is_bot && <p className="text-[10px] text-fuchsia-400/60 mb-1 font-medium">🤖 AI Setter</p>}
                          {msg.direction === 'outbound' && !msg.is_bot && <p className="text-[10px] text-white/50 mb-1 font-medium">👤 Manual</p>}
                          <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <p className="text-[10px] opacity-40">
                              {new Date(msg.created_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            {msg.direction === 'outbound' && (
                              <span className={`text-[10px] ${msg.status === 'sent' ? 'text-emerald-400' : 'opacity-30'}`}>
                                {msg.status === 'sent' ? '✓✓' : '✓'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {messages.length === 0 && (
                      <div className="flex items-center justify-center h-full text-slate-600 text-sm">
                        <p>Sin mensajes aún</p>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Quick Replies */}
                  {quickReplies.length > 0 && (
                    <div className="px-6 pt-3 flex gap-2 flex-wrap">
                      {quickReplies.map((qr) => (
                        <button
                          key={qr.id}
                          onClick={() => handleSendMessage(qr.message)}
                          disabled={sending}
                          className="px-3 py-1.5 bg-white/[0.04] hover:bg-fuchsia-500/10 text-slate-400 hover:text-fuchsia-300 rounded-lg text-[11px] font-medium ring-1 ring-white/[0.06] hover:ring-fuchsia-500/20 transition-all disabled:opacity-50"
                          title={qr.message}
                        >
                          {qr.icon} {qr.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Input */}
                  <div className="px-6 py-4 border-t border-white/[0.06]">
                    <div className="flex gap-3 items-center">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                        placeholder="Escribe un mensaje..."
                        className="flex-1 px-5 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/20 transition-all"
                        disabled={sending}
                      />
                      <button
                        onClick={() => handleSendMessage()}
                        disabled={!newMessage.trim() || sending}
                        className="px-5 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-fuchsia-500/20 disabled:opacity-30 transition-all flex items-center gap-2"
                      >
                        {sending ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                        )}
                        Enviar
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-600 gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-white/[0.03] flex items-center justify-center">
                    <svg className="w-10 h-10 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-slate-500">Selecciona una conversación</p>
                    <p className="text-xs text-slate-700 mt-1">o espera a que lleguen nuevos DMs</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══════════════════ PIPELINE TAB ═══════════════════ */}
        {tab === 'pipeline' && (
          <div className="space-y-6">
            {/* Pipeline header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Sales Pipeline</h2>
                <p className="text-xs text-slate-500 mt-0.5">{conversations.length} contactos en el pipeline</p>
              </div>
            </div>

            {/* Kanban columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {LABELS.map(label => {
                const labelConvs = conversations.filter(c => c.label === label.value);
                return (
                  <div key={label.value} className="bg-[#1a1a2e]/60 backdrop-blur rounded-2xl border border-white/[0.06] overflow-hidden">
                    {/* Column header */}
                    <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${label.dot}`} />
                        <span className="text-sm font-medium text-slate-300">{label.label}</span>
                      </div>
                      <span className="text-[11px] text-slate-600 bg-white/[0.04] px-2 py-0.5 rounded-md font-medium">{labelConvs.length}</span>
                    </div>
                    {/* Cards */}
                    <div className="p-2 space-y-2 max-h-[400px] overflow-y-auto">
                      {labelConvs.length > 0 ? labelConvs.map(conv => (
                        <button
                          key={conv.senderId}
                          onClick={() => { setSelectedSender(conv.senderId); setTab('inbox'); }}
                          className="w-full text-left p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.04] hover:border-white/[0.08] transition-all group"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center text-xs text-slate-400 font-medium shrink-0">
                              {conv.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-medium text-slate-300 truncate group-hover:text-white transition-colors">{conv.name}</p>
                              <p className="text-[10px] text-slate-600 truncate">{conv.lastMessage}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.04]">
                            <span className="text-[10px] text-slate-600">{conv.totalMessages} msgs</span>
                            <span className="text-[10px] text-slate-600">{timeAgo(conv.lastTime)}</span>
                            {conv.unread > 0 && (
                              <span className="w-4 h-4 bg-fuchsia-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">{conv.unread}</span>
                            )}
                          </div>
                        </button>
                      )) : (
                        <div className="py-8 text-center text-slate-700 text-xs">
                          Sin contactos
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══════════════════ PROSPECTING TAB ═══════════════════ */}
        {tab === 'prospecting' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Captación en Frío</h2>
                <p className="text-xs text-slate-500 mt-0.5">Añade leads manualmente · AI Setter les contactará automáticamente</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAddLead(!showAddLead)}
                  className="px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-fuchsia-500/25 transition-all"
                >
                  + Añadir Lead
                </button>
                <span className={`px-3 py-1.5 rounded-lg text-xs font-medium ring-1 ${
                  config?.cold_outreach_enabled !== false
                    ? 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/20'
                    : 'bg-red-500/10 text-red-300 ring-red-500/20'
                }`}>
                  {config?.cold_outreach_enabled !== false ? '🟢 Activo' : '🔴 Pausado'}
                </span>
              </div>
            </div>

            {/* Add Lead Form */}
            {showAddLead && (
              <div className="bg-[#1a1a2e]/80 backdrop-blur rounded-2xl border border-fuchsia-500/20 p-5 space-y-4 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-fuchsia-300 flex items-center gap-2">
                    <span>🎯</span> Añadir Lead Manualmente
                  </h3>
                  <button onClick={() => setShowAddLead(false)} className="text-slate-500 hover:text-white text-sm">✕</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-500 mb-1 block">Username de Instagram *</label>
                    <input
                      type="text"
                      value={newLeadUsername}
                      onChange={e => setNewLeadUsername(e.target.value)}
                      placeholder="@restaurante_ejemplo"
                      className="w-full px-3 py-2.5 bg-black/30 border border-white/[0.08] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-fuchsia-500/40 focus:ring-1 focus:ring-fuchsia-500/20 transition-all"
                      onKeyDown={e => e.key === 'Enter' && handleAddLead()}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 mb-1 block">Sector *</label>
                    <select
                      value={newLeadSector}
                      onChange={e => setNewLeadSector(e.target.value)}
                      className="w-full px-3 py-2.5 bg-black/30 border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-fuchsia-500/40 focus:ring-1 focus:ring-fuchsia-500/20 transition-all"
                    >
                      <option value="restaurante">🍽️ Restaurante</option>
                      <option value="clinica_estetica">💆 Clínica Estética</option>
                      <option value="barberia">💈 Barbería</option>
                      <option value="clinica_salud">🏥 Clínica Salud</option>
                      <option value="general">🏢 General</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 mb-1 block">Nombre (opcional)</label>
                    <input
                      type="text"
                      value={newLeadName}
                      onChange={e => setNewLeadName(e.target.value)}
                      placeholder="Restaurante La Buena Mesa"
                      className="w-full px-3 py-2.5 bg-black/30 border border-white/[0.08] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-fuchsia-500/40 focus:ring-1 focus:ring-fuchsia-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 mb-1 block">Notas (opcional)</label>
                    <input
                      type="text"
                      value={newLeadNotes}
                      onChange={e => setNewLeadNotes(e.target.value)}
                      placeholder="Visto en Instagram, poca presencia online"
                      className="w-full px-3 py-2.5 bg-black/30 border border-white/[0.08] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-fuchsia-500/40 focus:ring-1 focus:ring-fuchsia-500/20 transition-all"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-1">
                  <button
                    onClick={() => setShowAddLead(false)}
                    className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAddLead}
                    disabled={!newLeadUsername.trim() || addingLead}
                    className="px-5 py-2 bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-fuchsia-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {addingLead ? 'Añadiendo...' : '+ Añadir Lead'}
                  </button>
                </div>
                <p className="text-[10px] text-slate-600 -mt-1">
                  💡 El lead se añadirá con estado &quot;Nuevo&quot;. El cron de captación en frío le enviará un DM personalizado automáticamente.
                </p>
              </div>
            )}

            {/* Cold Stats */}
            {coldStats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                <StatCard value={coldStats.total} label="Total Leads" accent="text-white" />
                <StatCard value={coldStats.new} label="Nuevos" accent="text-cyan-400" />
                <StatCard value={coldStats.contacted} label="Contactados" accent="text-amber-400" />
                <StatCard value={coldStats.responded} label="Respondieron" accent="text-emerald-400" />
                <StatCard value={coldStats.noResponse} label="Sin respuesta" accent="text-slate-400" />
                <StatCard value={coldStats.converted} label="Convertidos" accent="text-fuchsia-400" />
                <StatCard value={`${coldStats.responseRate}%`} label="Tasa respuesta" accent="text-violet-400" />
              </div>
            )}

            {/* Sector breakdown */}
            {coldStats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { key: 'restaurante', icon: '🍽️', label: 'Restaurantes', color: 'text-orange-400' },
                  { key: 'clinica_estetica', icon: '💆', label: 'Clínicas Estética', color: 'text-pink-400' },
                  { key: 'barberia', icon: '💈', label: 'Barberías', color: 'text-blue-400' },
                  { key: 'clinica_salud', icon: '🏥', label: 'Clínicas Salud', color: 'text-emerald-400' },
                ].map(s => (
                  <button
                    key={s.key}
                    onClick={() => setColdSectorFilter(coldSectorFilter === s.key ? 'all' : s.key)}
                    className={`bg-[#1a1a2e]/80 backdrop-blur-sm rounded-2xl border p-4 transition-all text-left ${
                      coldSectorFilter === s.key ? 'border-fuchsia-500/40 bg-fuchsia-500/5' : 'border-white/[0.06] hover:border-white/[0.12]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{s.icon}</span>
                      <span className={`text-xl font-semibold ${s.color}`}>{coldStats.sectors[s.key] || 0}</span>
                    </div>
                    <p className="text-[11px] text-slate-500">{s.label}</p>
                  </button>
                ))}
              </div>
            )}

            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
              {[
                { value: 'all', label: 'Todos' },
                { value: 'new', label: '🆕 Nuevos' },
                { value: 'contacted', label: '📤 Contactados' },
                { value: 'responded', label: '💬 Respondieron' },
                { value: 'no_response', label: '😶 Sin respuesta' },
                { value: 'converted', label: '🎉 Convertidos' },
              ].map(f => (
                <button
                  key={f.value}
                  onClick={() => setColdFilter(f.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    coldFilter === f.value ? 'bg-fuchsia-500/20 text-fuchsia-300 ring-1 ring-fuchsia-500/30' : 'bg-white/[0.04] text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Leads Table */}
            <div className="bg-[#1a1a2e]/60 backdrop-blur rounded-2xl border border-white/[0.06] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left px-4 py-3 text-[11px] text-slate-500 font-medium uppercase tracking-wider">Usuario</th>
                      <th className="text-left px-4 py-3 text-[11px] text-slate-500 font-medium uppercase tracking-wider">Sector</th>
                      <th className="text-left px-4 py-3 text-[11px] text-slate-500 font-medium uppercase tracking-wider">Estado</th>
                      <th className="text-left px-4 py-3 text-[11px] text-slate-500 font-medium uppercase tracking-wider">Primer DM</th>
                      <th className="text-left px-4 py-3 text-[11px] text-slate-500 font-medium uppercase tracking-wider">Follow-up</th>
                      <th className="text-left px-4 py-3 text-[11px] text-slate-500 font-medium uppercase tracking-wider">Hashtag</th>
                      <th className="text-right px-4 py-3 text-[11px] text-slate-500 font-medium uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {coldLeads.length > 0 ? coldLeads.map((lead) => {
                      const sectorIcons: Record<string, string> = {
                        restaurante: '🍽️', clinica_estetica: '💆', barberia: '💈', clinica_salud: '🏥', general: '🏢'
                      };
                      const statusColors: Record<string, string> = {
                        new: 'bg-cyan-500/10 text-cyan-300 ring-cyan-500/20',
                        contacted: 'bg-amber-500/10 text-amber-300 ring-amber-500/20',
                        responded: 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/20',
                        no_response: 'bg-slate-500/10 text-slate-400 ring-slate-500/20',
                        converted: 'bg-fuchsia-500/10 text-fuchsia-300 ring-fuchsia-500/20',
                        dm_failed: 'bg-red-500/10 text-red-300 ring-red-500/20',
                        blacklisted: 'bg-red-500/10 text-red-400 ring-red-500/20',
                      };
                      const statusLabels: Record<string, string> = {
                        new: 'Nuevo', contacted: 'Contactado', responded: 'Respondió',
                        no_response: 'Sin respuesta', converted: 'Convertido',
                        dm_failed: 'DM falló', blacklisted: 'Bloqueado',
                      };
                      return (
                        <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-xs font-medium text-slate-400">
                                {(lead.username || '?')[0].toUpperCase()}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-200">@{lead.username || lead.instagram_user_id}</p>
                                {lead.full_name && <p className="text-[10px] text-slate-600">{lead.full_name}</p>}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm">{sectorIcons[lead.sector] || '🏢'} {lead.sector.replace('_', ' ')}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex px-2 py-0.5 rounded-md text-[11px] font-semibold ring-1 ${statusColors[lead.status] || statusColors.new}`}>
                              {statusLabels[lead.status] || lead.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-500">
                            {lead.first_dm_sent_at ? timeAgo(lead.first_dm_sent_at) : '—'}
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-500">
                            {lead.followup_sent_at ? timeAgo(lead.followup_sent_at) : '—'}
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-600">
                            #{lead.source_hashtag}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              {lead.responded && !lead.converted && (
                                <button
                                  onClick={() => handleConvertLead(lead.id)}
                                  className="px-2 py-1 bg-emerald-500/10 text-emerald-300 rounded-md text-[10px] font-medium hover:bg-emerald-500/20 transition-all ring-1 ring-emerald-500/20"
                                  title="Marcar como convertido"
                                >
                                  ✓ Convertir
                                </button>
                              )}
                              <button
                                onClick={() => handleSendDMToLead(lead.id, lead.instagram_user_id)}
                                className="px-2 py-1 bg-fuchsia-500/10 text-fuchsia-300 rounded-md text-[10px] font-medium hover:bg-fuchsia-500/20 transition-all ring-1 ring-fuchsia-500/20"
                                title="Abrir conversación"
                              >
                                💬 Chat
                              </button>
                              {!lead.blacklisted && (
                                <button
                                  onClick={() => handleBlacklistLead(lead.id)}
                                  className="px-2 py-1 bg-red-500/10 text-red-300 rounded-md text-[10px] font-medium hover:bg-red-500/20 transition-all ring-1 ring-red-500/20"
                                  title="Bloquear lead"
                                >
                                  ✕
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    }) : (
                      <tr>
                        <td colSpan={7} className="py-16 text-center text-slate-600">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-2xl bg-white/[0.04] flex items-center justify-center">
                              <span className="text-3xl">🎯</span>
                            </div>
                            <p className="text-sm font-medium">Sin leads fríos todavía</p>
                            <p className="text-xs text-slate-700">Pulsa &quot;+ Añadir Lead&quot; para empezar a captar clientes</p>
                            <button
                              onClick={() => setShowAddLead(true)}
                              className="mt-2 px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white rounded-xl text-xs font-medium hover:shadow-lg hover:shadow-fuchsia-500/25 transition-all"
                            >
                              + Añadir primer lead
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════ SETTINGS TAB ═══════════════════ */}
        {tab === 'settings' && config && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Settings sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#1a1a2e]/60 backdrop-blur rounded-2xl border border-white/[0.06] overflow-hidden">
                <div className="p-4 border-b border-white/[0.06]">
                  <h3 className="text-sm font-semibold text-slate-300">Configuración</h3>
                </div>
                <nav className="p-2 space-y-1">
                  {([
                    { id: 'bot' as const, label: 'AI Bot & Conexión', icon: '🤖' },
                    { id: 'welcome' as const, label: 'DM de Bienvenida', icon: '👋' },
                    { id: 'quick' as const, label: 'Respuestas Rápidas', icon: '⚡' },
                    { id: 'outreach' as const, label: 'Captación en Frío', icon: '🎯' },
                  ]).map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSettingsTab(s.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center gap-3 ${
                        settingsTab === s.id
                          ? 'bg-fuchsia-500/10 text-fuchsia-300 font-medium'
                          : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.03]'
                      }`}
                    >
                      <span>{s.icon}</span>
                      {s.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Settings content */}
            <div className="lg:col-span-3">
              <div className="bg-[#1a1a2e]/60 backdrop-blur rounded-2xl border border-white/[0.06] p-6 space-y-6">

                {/* ── Bot & Connection ── */}
                {settingsTab === 'bot' && (
                  <>
                    {/* Status */}
                    <div className={`rounded-xl p-4 ring-1 ${
                      connected
                        ? 'bg-emerald-500/5 ring-emerald-500/20'
                        : 'bg-amber-500/5 ring-amber-500/20'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          connected ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          {connected ? '✓' : '!'}
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm text-white">
                            {connected ? 'Instagram conectado' : 'Instagram no conectado'}
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {connected
                              ? config.token_expires_at
                                ? `Token expira: ${new Date(config.token_expires_at).toLocaleDateString('es-ES')}`
                                : 'Auto-refresh via cron activo'
                              : 'Configura las credenciales para activar'
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Toggles */}
                    <div className="space-y-4 py-2">
                      <Toggle on={config.bot_enabled} onChange={(v) => setConfig({ ...config, bot_enabled: v })} label="AI Setter automático" />
                      <Toggle on={config.auto_reply_enabled} onChange={(v) => setConfig({ ...config, auto_reply_enabled: v })} label="Respuesta automática (fallback)" />
                    </div>

                    {/* Fallback message */}
                    {config.auto_reply_enabled && (
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-2">Mensaje de respuesta automática (sin AI)</label>
                        <textarea
                          value={config.auto_reply_message}
                          onChange={(e) => setConfig({ ...config, auto_reply_message: e.target.value })}
                          className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-fuchsia-500/50 transition-all resize-none"
                          rows={3}
                        />
                      </div>
                    )}

                    {/* Credentials */}
                    <div className="space-y-4 pt-4 border-t border-white/[0.06]">
                      <h4 className="text-sm font-semibold text-slate-300">Credenciales API</h4>
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1.5">Access Token</label>
                        <input
                          type="password"
                          value={config.access_token || ''}
                          onChange={(e) => setConfig({ ...config, access_token: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-fuchsia-500/50 transition-all font-mono"
                          placeholder="IGAAxxxxxxxx..."
                        />
                        <p className="text-[10px] text-slate-600 mt-1">Se renueva automáticamente cada 50 días via cron</p>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1.5">Instagram Account ID</label>
                        <input
                          type="text"
                          value={config.instagram_account_id || ''}
                          onChange={(e) => setConfig({ ...config, instagram_account_id: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-fuchsia-500/50 transition-all font-mono"
                          placeholder="26210666705196518"
                        />
                      </div>
                    </div>

                    {/* Setup guide */}
                    <details className="group">
                      <summary className="flex items-center gap-2 cursor-pointer text-sm text-slate-400 hover:text-slate-300 transition-colors">
                        <svg className="w-4 h-4 transition-transform group-open:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        Guía de configuración
                      </summary>
                      <div className="mt-3 ml-6 bg-white/[0.02] rounded-xl p-4 ring-1 ring-white/[0.06]">
                        <ol className="text-xs text-slate-500 space-y-2 list-decimal list-inside">
                          <li>Crea app en <a href="https://developers.facebook.com" target="_blank" rel="noopener" className="text-fuchsia-400 hover:underline">developers.facebook.com</a></li>
                          <li>Habilita &quot;Instagram Graph API&quot;</li>
                          <li>Vincula tu cuenta profesional</li>
                          <li>Genera token de larga duración</li>
                          <li>Webhook URL: <code className="bg-white/[0.06] px-1.5 py-0.5 rounded text-fuchsia-300 font-mono">https://www.neuriax.com/api/instagram/webhook</code></li>
                          <li>Verify token: <code className="bg-white/[0.06] px-1.5 py-0.5 rounded text-fuchsia-300 font-mono">neuriax-webhook-2026</code></li>
                        </ol>
                      </div>
                    </details>

                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-fuchsia-500/20 disabled:opacity-30 transition-all"
                    >
                      {saving ? 'Guardando...' : 'Guardar configuración'}
                    </button>
                  </>
                )}

                {/* ── Welcome DM ── */}
                {settingsTab === 'welcome' && (
                  <>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">DM de Bienvenida</h3>
                      <p className="text-sm text-slate-500">Se envía a cada nuevo contacto que escribe por primera vez</p>
                    </div>

                    <Toggle on={config.welcome_dm_enabled} onChange={(v) => setConfig({ ...config, welcome_dm_enabled: v })} label="Activar DM de bienvenida" />

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-2">Mensaje</label>
                      <textarea
                        value={config.welcome_message || ''}
                        onChange={(e) => setConfig({ ...config, welcome_message: e.target.value })}
                        className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-fuchsia-500/50 transition-all resize-none"
                        rows={5}
                        placeholder="¡Hola! 👋 Gracias por seguirnos..."
                      />
                      <p className="text-[10px] text-slate-600 mt-1">Emojis y saltos de línea soportados &middot; Max 1000 chars</p>
                    </div>

                    {/* Preview */}
                    <div className="bg-white/[0.02] rounded-xl p-4 ring-1 ring-white/[0.06]">
                      <p className="text-[10px] text-slate-600 font-medium mb-3 uppercase tracking-wider">Preview</p>
                      <div className="flex justify-end">
                        <div className="max-w-[70%] bg-fuchsia-500/15 text-fuchsia-100 rounded-2xl px-4 py-2.5 text-sm ring-1 ring-fuchsia-500/20">
                          <p className="text-[10px] text-fuchsia-400/60 mb-1 font-medium">🤖 AI Setter</p>
                          <p className="whitespace-pre-wrap leading-relaxed">{config.welcome_message || 'Sin mensaje configurado'}</p>
                        </div>
                      </div>
                    </div>

                    {/* How it works */}
                    <div className="bg-violet-500/5 rounded-xl p-4 ring-1 ring-violet-500/20">
                      <h4 className="font-medium text-violet-300 text-sm mb-2">¿Cómo funciona?</h4>
                      <ul className="text-xs text-violet-300/60 space-y-1.5">
                        <li className="flex items-start gap-2"><span className="text-violet-400 mt-0.5">→</span> Cron cada 15 min detecta nuevos contactos</li>
                        <li className="flex items-start gap-2"><span className="text-violet-400 mt-0.5">→</span> Envía el DM de bienvenida automáticamente</li>
                        <li className="flex items-start gap-2"><span className="text-violet-400 mt-0.5">→</span> Max 20 DMs por ejecución (límites Instagram)</li>
                        <li className="flex items-start gap-2"><span className="text-violet-400 mt-0.5">→</span> Cada usuario lo recibe una sola vez</li>
                      </ul>
                    </div>

                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-fuchsia-500/20 disabled:opacity-30 transition-all"
                    >
                      {saving ? 'Guardando...' : 'Guardar bienvenida'}
                    </button>
                  </>
                )}

                {/* ── Quick Replies ── */}
                {settingsTab === 'quick' && (
                  <>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Respuestas Rápidas</h3>
                      <p className="text-sm text-slate-500">Botones de respuesta instantánea en el chat</p>
                    </div>

                    <div className="space-y-3">
                      {quickReplies.map((qr) => (
                        <div key={qr.id} className="bg-white/[0.03] rounded-xl p-4 ring-1 ring-white/[0.06] hover:ring-white/[0.1] transition-all group">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{qr.icon}</span>
                              <span className="font-medium text-sm text-white">{qr.label}</span>
                            </div>
                            <button
                              onClick={async () => {
                                if (confirm('¿Eliminar esta respuesta rápida?')) {
                                  await fetch('/api/superadmin/instagram', {
                                    method: 'PUT', headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ action: 'delete_quick_reply', id: qr.id }),
                                  });
                                  fetchData();
                                  showToast('Respuesta eliminada');
                                }
                              }}
                              className="text-red-400/50 hover:text-red-400 text-xs opacity-0 group-hover:opacity-100 transition-all"
                            >
                              Eliminar
                            </button>
                          </div>
                          <p className="text-xs text-slate-500 whitespace-pre-wrap mt-2 bg-white/[0.02] rounded-lg p-3">{qr.message}</p>
                        </div>
                      ))}
                    </div>

                    {/* Add form */}
                    <div className="pt-4 border-t border-white/[0.06]">
                      <h4 className="font-medium text-slate-300 text-sm mb-4">Añadir nueva</h4>
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const form = e.target as HTMLFormElement;
                          const formData = new FormData(form);
                          await fetch('/api/superadmin/instagram', {
                            method: 'PUT', headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              action: 'update_quick_reply',
                              label: formData.get('label'),
                              message: formData.get('message'),
                              icon: formData.get('icon') || '💬',
                            }),
                          });
                          form.reset();
                          fetchData();
                          showToast('Respuesta rápida añadida');
                        }}
                        className="space-y-3"
                      >
                        <div className="grid grid-cols-5 gap-3">
                          <div>
                            <label className="block text-[10px] text-slate-600 mb-1 uppercase tracking-wider">Emoji</label>
                            <input name="icon" type="text" defaultValue="💬" className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white text-center focus:outline-none focus:border-fuchsia-500/50 transition-all" />
                          </div>
                          <div className="col-span-4">
                            <label className="block text-[10px] text-slate-600 mb-1 uppercase tracking-wider">Nombre</label>
                            <input name="label" type="text" required placeholder="Ej: Enviar precios" className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-fuchsia-500/50 transition-all" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-600 mb-1 uppercase tracking-wider">Mensaje</label>
                          <textarea name="message" required rows={3} placeholder="El mensaje que recibirá el usuario..." className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-fuchsia-500/50 transition-all resize-none" />
                        </div>
                        <button
                          type="submit"
                          className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-fuchsia-500/20 transition-all"
                        >
                          + Añadir respuesta rápida
                        </button>
                      </form>
                    </div>
                  </>
                )}

                {/* ── Outreach Settings ── */}
                {settingsTab === 'outreach' && (
                  <>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Captación en Frío</h3>
                      <p className="text-sm text-slate-500">El bot descubre leads por hashtags y les envía DMs automáticos</p>
                    </div>

                    <Toggle
                      on={config.cold_outreach_enabled !== false}
                      onChange={async (v) => {
                        await fetch('/api/superadmin/instagram', {
                          method: 'PUT', headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ action: 'toggle_cold_outreach', enabled: v }),
                        });
                        setConfig({ ...config, cold_outreach_enabled: v } as InstagramConfig);
                        showToast(v ? 'Captación activada' : 'Captación pausada');
                      }}
                      label="Activar captación automática"
                    />

                    {/* How it works */}
                    <div className="bg-violet-500/5 rounded-xl p-4 ring-1 ring-violet-500/20 space-y-3">
                      <h4 className="font-medium text-violet-300 text-sm">¿Cómo funciona?</h4>
                      <ul className="text-xs text-violet-300/60 space-y-2">
                        <li className="flex items-start gap-2"><span className="text-violet-400 mt-0.5">1.</span> <strong className="text-violet-300/80">Descubrimiento</strong> — Cron diario busca cuentas de negocios por hashtags (#restaurantemadrid, #barberiamadrid, etc.)</li>
                        <li className="flex items-start gap-2"><span className="text-violet-400 mt-0.5">2.</span> <strong className="text-violet-300/80">Primer DM</strong> — Envía 5-8 DMs/día, personalizados por sector, sonando 100% humano</li>
                        <li className="flex items-start gap-2"><span className="text-violet-400 mt-0.5">3.</span> <strong className="text-violet-300/80">Follow-up</strong> — Si no responden en 48h, envía 1 follow-up suave (máximo)</li>
                        <li className="flex items-start gap-2"><span className="text-violet-400 mt-0.5">4.</span> <strong className="text-violet-300/80">Conversación</strong> — Si responden, el AI Setter toma la conversación y los lleva al formulario</li>
                        <li className="flex items-start gap-2"><span className="text-violet-400 mt-0.5">5.</span> <strong className="text-violet-300/80">Descarte</strong> — Si no responden al follow-up, se marca como "sin respuesta" y no se insiste</li>
                      </ul>
                    </div>

                    {/* Sectors */}
                    <div className="bg-white/[0.02] rounded-xl p-4 ring-1 ring-white/[0.06]">
                      <h4 className="font-medium text-slate-300 text-sm mb-3">Sectores objetivo</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { icon: '🍽️', label: 'Restaurantes', desc: '#restaurantemadrid, #gastronomia...' },
                          { icon: '💆', label: 'Clínicas Estética', desc: '#clinicaestetica, #medicinaestetica...' },
                          { icon: '💈', label: 'Barberías', desc: '#barberiamadrid, #barbershop...' },
                          { icon: '🏥', label: 'Clínicas Salud', desc: '#fisioterapia, #clinicadental...' },
                        ].map(s => (
                          <div key={s.label} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] ring-1 ring-white/[0.06]">
                            <span className="text-xl">{s.icon}</span>
                            <div>
                              <p className="text-xs font-medium text-slate-300">{s.label}</p>
                              <p className="text-[10px] text-slate-600">{s.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Safety limits */}
                    <div className="bg-amber-500/5 rounded-xl p-4 ring-1 ring-amber-500/20">
                      <h4 className="font-medium text-amber-300 text-sm mb-2">⚠️ Límites de seguridad</h4>
                      <ul className="text-xs text-amber-300/60 space-y-1.5">
                        <li>→ Máximo 8 DMs fríos por día</li>
                        <li>→ Máximo 1 follow-up por lead</li>
                        <li>→ Delays aleatorios entre envíos (3-7 seg)</li>
                        <li>→ Leads bloqueados nunca son re-contactados</li>
                        <li>→ Si no responden al follow-up, se descartan</li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─── CSS Animation ─── */}
      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
