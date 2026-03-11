'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

/* ─── Types ─── */
interface LeadIntel {
  nombre_negocio?: string | null;
  sector?: string | null;
  tiene_web?: string | null;
  url_web?: string | null;
  ciudad?: string | null;
  zona_barrio?: string | null;
  redes_sociales?: string | null;
  num_empleados?: string | null;
  anos_abierto?: string | null;
  problemas?: string[];
  necesidades?: string[];
  nivel_interes?: string | null;
  tiene_competencia_online?: string | null;
  notas_extra?: string | null;
  resumen?: string | null;
}
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
  lead_intel?: LeadIntel | null;
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
  ice_breakers?: Array<{ question: string; payload: string }>;
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

/* ─── Lead purposes ─── */
const LEAD_PURPOSES = [
  { value: 'captacion',       label: 'Captación',       icon: '🎯', color: 'text-cyan-400' },
  { value: 'colaboracion',    label: 'Colaboración',    icon: '🤝', color: 'text-violet-400' },
  { value: 'informacion',     label: 'Información',     icon: 'ℹ️', color: 'text-amber-400' },
  { value: 'acompanamiento',  label: 'Acompañamiento',  icon: '🧭', color: 'text-emerald-400' },
];

/* ─── Lead detail data ─── */
interface LeadDetail {
  profileData: ProfileData | null;
  leadIntel: LeadIntel | null;
  leadPurpose: string;
  stats: {
    totalMessages: number;
    firstMessageAt: string | null;
    lastMessageAt: string | null;
  };
}
interface ProfileData {
  name?: string;
  username?: string;
  biography?: string;
  followers_count?: number;
  media_count?: number;
  website?: string;
  profile_picture_url?: string;
  fetched_at?: string;
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
  const [settingsTab, setSettingsTab] = useState<'bot' | 'welcome' | 'quick' | 'icebreakers' | 'outreach'>('bot');
  // Ice breakers state
  const [iceBreakers, setIceBreakers] = useState<Array<{ question: string; payload: string }>>([
    { question: '¿Qué servicios ofrecéis?', payload: 'ICE_SERVICES' },
    { question: 'Quiero automatizar mi negocio', payload: 'ICE_AUTOMATE' },
    { question: '¿Cuánto cuesta?', payload: 'ICE_PRICES' },
    { question: 'Agendar una llamada', payload: 'ICE_CALL' },
  ]);
  const [iceSaving, setIceSaving] = useState(false);
  const [iceStatus, setIceStatus] = useState<'idle' | 'saved' | 'error'>('idle');
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
  const [sendTiming, setSendTiming] = useState<'now' | 'next_cron' | 'scheduled' | 'none'>('now');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('10:00');
  const [selectedLead, setSelectedLead] = useState<ColdLead | null>(null);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [bulkText, setBulkText] = useState('');
  const [bulkSector, setBulkSector] = useState<string>('auto');
  const [bulkTiming, setBulkTiming] = useState<'now' | 'next_cron' | 'none'>('next_cron');
  const [bulkImporting, setBulkImporting] = useState(false);
  const [bulkResult, setBulkResult] = useState<{ added: number; duplicates: number; errors: number; total: number; dmsSent?: number; sectorDetected?: boolean } | null>(null);
  const [bulkDuplicatesList, setBulkDuplicatesList] = useState<string[]>([]);
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning'>('success');
  const [fixingSectors, setFixingSectors] = useState(false);
  const [showLeadPanel, setShowLeadPanel] = useState(false);
  const [leadDetail, setLeadDetail] = useState<LeadDetail | null>(null);
  const [editPurpose, setEditPurpose] = useState('captacion');
  const [editNotes, setEditNotes] = useState('');
  const [savingLead, setSavingLead] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const selectedSenderRef = useRef<string | null>(null);

  useEffect(() => { selectedSenderRef.current = selectedSender; }, [selectedSender]);

  /* — Show toast — */
  const showToast = (msg: string, type: 'success' | 'error' | 'warning' = 'success') => {
    setToast(msg);
    setToastType(type);
    setTimeout(() => setToast(null), type === 'error' ? 5000 : 3000);
  };

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
        // Load saved ice breakers from config
        if (data.config?.ice_breakers?.length) {
          setIceBreakers(data.config.ice_breakers);
        }
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
      // Build scheduled datetime if needed
      let scheduledAt: string | undefined;
      if (sendTiming === 'scheduled' && scheduledDate) {
        scheduledAt = new Date(`${scheduledDate}T${scheduledTime || '10:00'}:00`).toISOString();
      }

      const res = await fetch('/api/superadmin/instagram', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_lead',
          username: newLeadUsername.trim(),
          sector: newLeadSector,
          full_name: newLeadName.trim() || undefined,
          notes: newLeadNotes.trim() || undefined,
          sendTiming,
          scheduledAt,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        const timingLabels: Record<string, string> = {
          now: 'DM enviado ✅',
          next_cron: 'DM se enviará mañana 10 AM ⏰',
          scheduled: `DM programado para ${scheduledDate} ${scheduledTime} 📅`,
          none: 'guardado sin DM 📋',
        };
        if (data.dmSent) {
          showToast(`@${newLeadUsername.replace(/^@/, '')} añadido y ${timingLabels.now}`);
        } else if (sendTiming === 'now' && data.dmError) {
          showToast(`@${newLeadUsername.replace(/^@/, '')} añadido ✅ pero DM falló: ${data.dmError}`, 'warning');
        } else {
          showToast(`@${newLeadUsername.replace(/^@/, '')} añadido — ${timingLabels[sendTiming] || timingLabels.none}`);
        }
        setNewLeadUsername('');
        setNewLeadName('');
        setNewLeadNotes('');
        setSendTiming('now');
        setScheduledDate('');
        setScheduledTime('10:00');
        setShowAddLead(false);
        fetchColdLeads();
      } else {
        // Show duplicate error with warning style
        if (res.status === 409) {
          showToast(`⚠️ ${data.error}`, 'warning');
        } else {
          showToast(data.error || 'Error al añadir lead', 'error');
        }
      }
    } catch (err) { console.error('Error:', err); showToast('Error de conexión', 'error'); }
    finally { setAddingLead(false); }
  };

  /* — Bulk add leads — */
  const handleBulkAdd = async () => {
    if (!bulkText.trim() || bulkImporting) return;
    setBulkImporting(true);
    setBulkResult(null);
    setBulkDuplicatesList([]);
    try {
      // Parse usernames: split by newlines, commas, spaces, semicolons
      const rawList = bulkText
        .split(/[\n,;\s]+/)
        .map(u => u.replace(/^@/, '').trim().toLowerCase())
        .filter(u => u.length > 1);

      // Detect internal duplicates (within the list itself)
      const seen = new Set<string>();
      const internalDups: string[] = [];
      const usernames: string[] = [];
      for (const u of rawList) {
        if (seen.has(u)) {
          if (!internalDups.includes(u)) internalDups.push(u);
        } else {
          seen.add(u);
          usernames.push(u);
        }
      }

      if (usernames.length === 0) {
        showToast('No se detectaron usernames válidos', 'error');
        setBulkImporting(false);
        return;
      }

      if (internalDups.length > 0) {
        showToast(`⚠️ ${internalDups.length} duplicados dentro de tu lista eliminados: @${internalDups.slice(0, 5).join(', @')}${internalDups.length > 5 ? '...' : ''}`, 'warning');
      }

      const res = await fetch('/api/superadmin/instagram', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'bulk_add_leads',
          usernames,
          sector: bulkSector === 'auto' ? 'auto' : bulkSector,
          sendTiming: bulkTiming,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setBulkResult(data.summary);
        setBulkDuplicatesList(data.duplicatesList || []);
        if (data.summary.duplicates > 0 && data.summary.added > 0) {
          showToast(`${data.summary.added} añadidos, ${data.summary.duplicates} duplicados omitidos`, 'warning');
        } else if (data.summary.added === 0) {
          showToast('Todos los leads ya existían — 0 añadidos', 'warning');
        } else {
          showToast(data.message);
        }
        fetchColdLeads();
      } else {
        showToast(data.error || 'Error al importar', 'error');
      }
    } catch (err) {
      console.error('Bulk import error:', err);
      showToast('Error de conexión', 'error');
    } finally {
      setBulkImporting(false);
    }
  };

  /* — Fix sectors for existing leads — */
  const handleFixSectors = async () => {
    if (fixingSectors) return;
    setFixingSectors(true);
    try {
      const res = await fetch('/api/superadmin/instagram', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'fix_sectors' }),
      });
      const data = await res.json();
      if (res.ok) {
        showToast(`✅ ${data.fixed} leads reclasificados${data.remaining > 0 ? ` (${data.remaining} siguen como general)` : ''}`);
        fetchColdLeads();
      } else {
        showToast(data.error || 'Error', 'error');
      }
    } catch (err) {
      console.error('Fix sectors error:', err);
      showToast('Error de conexión', 'error');
    } finally {
      setFixingSectors(false);
    }
  };

  /* — Fetch lead detail — */
  const fetchLeadDetail = useCallback(async (senderId: string) => {
    try {
      const res = await fetch('/api/superadmin/instagram', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get_lead_detail', senderId }),
      });
      if (res.ok) {
        const data = await res.json();
        setLeadDetail({
          profileData: data.profileData || null,
          leadIntel: data.leadIntel || null,
          leadPurpose: data.leadPurpose || 'captacion',
          stats: data.stats || { totalMessages: 0, firstMessageAt: null, lastMessageAt: null },
        });
        setEditPurpose(data.leadPurpose || 'captacion');
        setEditNotes(data.follower?.notes || data.coldLead?.notes || '');
      }
    } catch (err) { console.error('Lead detail error:', err); }
  }, []);

  /* — Save lead info — */
  const handleSaveLeadInfo = async () => {
    if (!selectedSender || savingLead) return;
    setSavingLead(true);
    try {
      const res = await fetch('/api/superadmin/instagram', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_lead_info',
          senderId: selectedSender,
          lead_purpose: editPurpose,
          notes: editNotes,
          label: selectedConvLabel,
        }),
      });
      if (res.ok) {
        showToast('Lead actualizado ✅');
        if (leadDetail) {
          setLeadDetail({ ...leadDetail, leadPurpose: editPurpose });
        }
      }
    } catch (err) { console.error('Save lead error:', err); showToast('Error al guardar', 'error'); }
    finally { setSavingLead(false); }
  };

  /* — Toggle lead panel and fetch detail — */
  useEffect(() => {
    if (selectedSender && showLeadPanel) {
      fetchLeadDetail(selectedSender);
    }
  }, [selectedSender, showLeadPanel, fetchLeadDetail]);

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
        <div className={`fixed top-6 right-6 z-50 backdrop-blur text-white text-sm px-5 py-3 rounded-xl shadow-2xl animate-[slideIn_0.3s_ease-out] flex items-center gap-2 ${
          toastType === 'error' ? 'bg-red-500/90 shadow-red-500/20' :
          toastType === 'warning' ? 'bg-amber-500/90 shadow-amber-500/20' :
          'bg-emerald-500/90 shadow-emerald-500/20'
        }`}>
          {toastType === 'error' ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : toastType === 'warning' ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
          )}
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-[#1a1a2e]/60 backdrop-blur rounded-2xl border border-white/[0.06] overflow-hidden min-h-[600px] h-[calc(100vh-280px)]">

            {/* ── Sidebar: Conversations ── */}
            <div className="lg:col-span-4 xl:col-span-3 border-r border-white/[0.06] flex flex-col overflow-hidden">
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
            <div className={`${showLeadPanel ? 'lg:col-span-5 xl:col-span-6' : 'lg:col-span-8 xl:col-span-9'} flex flex-col transition-all`}>
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
                      <button
                        onClick={() => setShowLeadPanel(!showLeadPanel)}
                        className={`p-2 rounded-lg transition-all ${showLeadPanel ? 'bg-fuchsia-500/20 text-fuchsia-300 ring-1 ring-fuchsia-500/30' : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]'}`}
                        title="Info del Lead"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      </button>
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

            {/* ── Lead Detail Panel ── */}
            {showLeadPanel && selectedSender && (
              <div className="lg:col-span-3 xl:col-span-3 border-l border-white/[0.06] flex flex-col overflow-y-auto max-h-[600px]">
                <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <svg className="w-4 h-4 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    Info del Lead
                  </h3>
                  <button onClick={() => setShowLeadPanel(false)} className="text-slate-500 hover:text-white">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>

                <div className="p-4 space-y-4">
                  {/* Profile Data */}
                  {leadDetail?.profileData ? (
                    <div className="bg-white/[0.03] rounded-xl p-3 space-y-2">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Perfil de Instagram</p>
                      {leadDetail.profileData.name && (
                        <p className="text-sm text-white font-medium">{leadDetail.profileData.name}</p>
                      )}
                      {leadDetail.profileData.username && (
                        <a href={`https://instagram.com/${leadDetail.profileData.username}`} target="_blank" rel="noopener noreferrer" className="text-xs text-fuchsia-400 hover:underline">@{leadDetail.profileData.username}</a>
                      )}
                      {leadDetail.profileData.biography && (
                        <p className="text-xs text-slate-400 leading-relaxed">{leadDetail.profileData.biography}</p>
                      )}
                      <div className="flex gap-4 pt-1">
                        {leadDetail.profileData.followers_count !== undefined && (
                          <div>
                            <p className="text-sm font-semibold text-white">{leadDetail.profileData.followers_count.toLocaleString()}</p>
                            <p className="text-[10px] text-slate-500">seguidores</p>
                          </div>
                        )}
                        {leadDetail.profileData.media_count !== undefined && (
                          <div>
                            <p className="text-sm font-semibold text-white">{leadDetail.profileData.media_count.toLocaleString()}</p>
                            <p className="text-[10px] text-slate-500">publicaciones</p>
                          </div>
                        )}
                      </div>
                      {leadDetail.profileData.website && (
                        <p className="text-xs text-slate-400">🌐 {leadDetail.profileData.website}</p>
                      )}
                    </div>
                  ) : (
                    <div className="bg-white/[0.03] rounded-xl p-3">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Perfil</p>
                      <p className="text-xs text-slate-600">Sin datos de perfil</p>
                    </div>
                  )}

                  {/* Lead Purpose (editable) */}
                  <div className="bg-white/[0.03] rounded-xl p-3 space-y-2">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Categoría del Lead</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {LEAD_PURPOSES.map(p => (
                        <button
                          key={p.value}
                          onClick={() => setEditPurpose(p.value)}
                          className={`px-2 py-1.5 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1.5 ${
                            editPurpose === p.value
                              ? 'bg-fuchsia-500/15 text-fuchsia-300 ring-1 ring-fuchsia-500/30'
                              : 'bg-white/[0.04] text-slate-400 hover:bg-white/[0.08]'
                          }`}
                        >
                          <span>{p.icon}</span>
                          <span>{p.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Lead Intel (auto-extracted) */}
                  {leadDetail?.leadIntel && (
                    <div className="bg-white/[0.03] rounded-xl p-3 space-y-2">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Intel del Negocio (auto)</p>
                      {leadDetail.leadIntel.nombre_negocio && (
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Negocio</span>
                          <span className="text-slate-300">{leadDetail.leadIntel.nombre_negocio}</span>
                        </div>
                      )}
                      {leadDetail.leadIntel.sector && (
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Sector</span>
                          <span className="text-slate-300">{leadDetail.leadIntel.sector}</span>
                        </div>
                      )}
                      {leadDetail.leadIntel.ciudad && (
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Ciudad</span>
                          <span className="text-slate-300">{leadDetail.leadIntel.ciudad}</span>
                        </div>
                      )}
                      {leadDetail.leadIntel.tiene_web && (
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Tiene web</span>
                          <span className="text-slate-300">{leadDetail.leadIntel.tiene_web}</span>
                        </div>
                      )}
                      {leadDetail.leadIntel.nivel_interes && (
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Interés</span>
                          <span className={`font-medium ${
                            leadDetail.leadIntel.nivel_interes === 'muy_caliente' ? 'text-red-400' :
                            leadDetail.leadIntel.nivel_interes === 'caliente' ? 'text-amber-400' :
                            leadDetail.leadIntel.nivel_interes === 'tibio' ? 'text-cyan-400' : 'text-slate-400'
                          }`}>{leadDetail.leadIntel.nivel_interes}</span>
                        </div>
                      )}
                      {leadDetail.leadIntel.problemas && leadDetail.leadIntel.problemas.length > 0 && (
                        <div className="pt-1">
                          <p className="text-[10px] text-slate-500 mb-1">Problemas:</p>
                          <div className="flex flex-wrap gap-1">
                            {leadDetail.leadIntel.problemas.map((p, i) => (
                              <span key={i} className="text-[10px] px-1.5 py-0.5 bg-red-500/10 text-red-400 rounded">{p}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {leadDetail.leadIntel.necesidades && leadDetail.leadIntel.necesidades.length > 0 && (
                        <div className="pt-1">
                          <p className="text-[10px] text-slate-500 mb-1">Necesidades:</p>
                          <div className="flex flex-wrap gap-1">
                            {leadDetail.leadIntel.necesidades.map((n, i) => (
                              <span key={i} className="text-[10px] px-1.5 py-0.5 bg-cyan-500/10 text-cyan-400 rounded">{n}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {leadDetail.leadIntel.resumen && (
                        <div className="pt-1 border-t border-white/[0.04]">
                          <p className="text-xs text-slate-400 italic mt-1">&ldquo;{leadDetail.leadIntel.resumen}&rdquo;</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Interaction Stats */}
                  {leadDetail?.stats && (
                    <div className="bg-white/[0.03] rounded-xl p-3 space-y-1.5">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Historial</p>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Total mensajes</span>
                        <span className="text-slate-300">{leadDetail.stats.totalMessages}</span>
                      </div>
                      {leadDetail.stats.firstMessageAt && (
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Primera vez</span>
                          <span className="text-slate-300">{new Date(leadDetail.stats.firstMessageAt).toLocaleDateString('es-ES')}</span>
                        </div>
                      )}
                      {leadDetail.stats.lastMessageAt && (
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Último mensaje</span>
                          <span className="text-slate-300">{timeAgo(leadDetail.stats.lastMessageAt)}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Notes (editable) */}
                  <div className="bg-white/[0.03] rounded-xl p-3 space-y-2">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Notas</p>
                    <textarea
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      placeholder="Añade notas sobre este lead..."
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg p-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-fuchsia-500/50 resize-none h-20"
                    />
                  </div>

                  {/* Save button */}
                  <button
                    onClick={handleSaveLeadInfo}
                    disabled={savingLead}
                    className="w-full py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl text-xs font-semibold hover:shadow-lg hover:shadow-fuchsia-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    {savingLead ? (
                      <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    )}
                    Guardar Cambios
                  </button>
                </div>
              </div>
            )}
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
                  onClick={handleFixSectors}
                  disabled={fixingSectors}
                  className="px-3 py-2 bg-amber-500/10 text-amber-300 rounded-xl text-xs font-medium ring-1 ring-amber-500/20 hover:bg-amber-500/20 transition-all disabled:opacity-50"
                  title="Re-analiza los leads con sector 'general' y les asigna el sector correcto"
                >
                  {fixingSectors ? '🔄 Analizando...' : '🔄 Re-clasificar sectores'}
                </button>
                <button
                  onClick={() => { setShowBulkImport(!showBulkImport); setShowAddLead(false); setBulkResult(null); }}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  📋 Importar lista
                </button>
                <button
                  onClick={() => { setShowAddLead(!showAddLead); setShowBulkImport(false); }}
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
                      <option value="inmobiliaria">🏠 Inmobiliaria</option>
                      <option value="gym">💪 Gimnasio</option>
                      <option value="tienda">🛍️ Tienda</option>
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

                {/* Send Timing Selector */}
                <div>
                  <label className="text-[11px] text-slate-500 mb-2 block">¿Cuándo enviar el DM?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {([
                      { value: 'now' as const, label: '⚡ Ahora', desc: 'Envío instantáneo' },
                      { value: 'next_cron' as const, label: '⏰ Mañana 10AM', desc: 'Cron automático' },
                      { value: 'scheduled' as const, label: '📅 Programar', desc: 'Elige fecha/hora' },
                      { value: 'none' as const, label: '🚫 No enviar', desc: 'Solo guardar' },
                    ]).map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setSendTiming(opt.value)}
                        className={`p-3 rounded-xl text-left transition-all border ${
                          sendTiming === opt.value
                            ? 'border-fuchsia-500/40 bg-fuchsia-500/10 ring-1 ring-fuchsia-500/20'
                            : 'border-white/[0.06] bg-black/20 hover:border-white/[0.12]'
                        }`}
                      >
                        <p className="text-sm font-medium text-white">{opt.label}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scheduled Date/Time Picker */}
                {sendTiming === 'scheduled' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-500 mb-1 block">Fecha</label>
                      <input
                        type="date"
                        value={scheduledDate}
                        onChange={e => setScheduledDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2.5 bg-black/30 border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-fuchsia-500/40 focus:ring-1 focus:ring-fuchsia-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-500 mb-1 block">Hora</label>
                      <input
                        type="time"
                        value={scheduledTime}
                        onChange={e => setScheduledTime(e.target.value)}
                        className="w-full px-3 py-2.5 bg-black/30 border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-fuchsia-500/40 focus:ring-1 focus:ring-fuchsia-500/20 transition-all"
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-1">
                  <button
                    onClick={() => setShowAddLead(false)}
                    className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAddLead}
                    disabled={!newLeadUsername.trim() || addingLead || (sendTiming === 'scheduled' && !scheduledDate)}
                    className="px-5 py-2 bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-fuchsia-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {addingLead ? 'Añadiendo...' : sendTiming === 'now' ? '⚡ Añadir y Enviar' : sendTiming === 'scheduled' ? '📅 Añadir y Programar' : '+ Añadir Lead'}
                  </button>
                </div>
                <p className="text-[10px] text-slate-600 -mt-1">
                  {sendTiming === 'now' && '⚡ Se enviará el DM al instante al añadir el lead.'}
                  {sendTiming === 'next_cron' && '⏰ El DM se enviará mañana a las 10:00 AM automáticamente.'}
                  {sendTiming === 'scheduled' && '📅 El DM se enviará en la fecha y hora que elijas.'}
                  {sendTiming === 'none' && '🚫 El lead se guardará sin enviar DM. Podrás enviarlo manualmente después.'}
                </p>
              </div>
            )}

            {/* ─── Bulk Import Modal ─── */}
            {showBulkImport && (
              <div className="bg-[#1a1a2e]/80 backdrop-blur rounded-2xl border border-cyan-500/20 p-5 space-y-4 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-cyan-300 flex items-center gap-2">
                    <span>📋</span> Importar lista de leads
                  </h3>
                  <button onClick={() => { setShowBulkImport(false); setBulkResult(null); }} className="text-slate-500 hover:text-white text-sm">✕</button>
                </div>

                <div>
                  <label className="text-[11px] text-slate-500 mb-1 block">Pega los usernames (uno por línea, separados por comas o espacios)</label>
                  <textarea
                    value={bulkText}
                    onChange={e => setBulkText(e.target.value)}
                    placeholder={`@restaurante_bueno\n@barberia_style\n@clinica_beauty\npeluqueria_top, gym_fitness\notra_tienda`}
                    className="w-full px-3 py-3 bg-black/30 border border-white/[0.08] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 transition-all font-mono resize-none"
                    rows={6}
                  />
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-[10px] text-slate-600">
                      {bulkText.trim() ? `${bulkText.split(/[\n,;\s]+/).filter(u => u.replace(/^@/, '').trim().length > 1).length} usernames detectados` : 'Acepta @username, username, separados por comas, espacios o líneas'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-500 mb-1 block">Sector</label>
                    <select
                      value={bulkSector}
                      onChange={e => setBulkSector(e.target.value)}
                      className="w-full px-3 py-2.5 bg-black/30 border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                    >
                      <option value="auto">🤖 Auto-detectar (AI)</option>
                      <option value="restaurante">🍽️ Restaurante</option>
                      <option value="clinica_estetica">💆 Clínica Estética</option>
                      <option value="barberia">💈 Barbería</option>
                      <option value="clinica_salud">🏥 Clínica Salud</option>
                      <option value="inmobiliaria">🏠 Inmobiliaria</option>
                      <option value="gym">💪 Gimnasio</option>
                      <option value="tienda">🛍️ Tienda</option>
                      <option value="general">🏢 General</option>
                    </select>
                    <p className="text-[10px] text-slate-600 mt-1">
                      {bulkSector === 'auto' ? '🤖 IA analizará cada username para detectar el sector' : 'Se aplicará a todos los leads'}
                    </p>
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 mb-1 block">¿Cuándo enviar DMs?</label>
                    <div className="space-y-1.5">
                      {([
                        { value: 'next_cron' as const, label: '⏰ Mañana 10AM', desc: 'Cron automático (recomendado)' },
                        { value: 'now' as const, label: '⚡ Ahora', desc: 'Máx 8 DMs instantáneos' },
                        { value: 'none' as const, label: '🚫 No enviar', desc: 'Solo guardar leads' },
                      ]).map(opt => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setBulkTiming(opt.value)}
                          className={`w-full p-2 rounded-lg text-left transition-all border text-xs ${
                            bulkTiming === opt.value
                              ? 'border-cyan-500/40 bg-cyan-500/10 ring-1 ring-cyan-500/20'
                              : 'border-white/[0.06] bg-black/20 hover:border-white/[0.12]'
                          }`}
                        >
                          <span className="font-medium text-white">{opt.label}</span>
                          <span className="text-slate-500 ml-1.5">{opt.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bulk result summary */}
                {bulkResult && (
                  <div className="bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 rounded-xl p-4 border border-emerald-500/20 space-y-2">
                    <p className="text-sm font-semibold text-emerald-300">✅ Importación completada</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="text-center">
                        <p className="text-lg font-bold text-white">{bulkResult.total}</p>
                        <p className="text-[10px] text-slate-500">Procesados</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-emerald-400">{bulkResult.added}</p>
                        <p className="text-[10px] text-slate-500">Añadidos</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-amber-400">{bulkResult.duplicates}</p>
                        <p className="text-[10px] text-slate-500">Duplicados</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-cyan-400">{bulkResult.dmsSent || 0}</p>
                        <p className="text-[10px] text-slate-500">DMs enviados</p>
                      </div>
                    </div>
                    {bulkResult.sectorDetected && (
                      <p className="text-[10px] text-slate-500">🤖 Sectores auto-detectados por IA</p>
                    )}
                    {/* Show duplicate usernames */}
                    {bulkDuplicatesList.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-white/[0.06]">
                        <p className="text-[10px] text-amber-400 font-semibold mb-1">⚠️ Duplicados omitidos ({bulkDuplicatesList.length}):</p>
                        <div className="flex flex-wrap gap-1">
                          {bulkDuplicatesList.map((u, i) => (
                            <span key={i} className="px-1.5 py-0.5 bg-amber-500/10 text-amber-300 rounded text-[10px] ring-1 ring-amber-500/20">@{u}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-1">
                  <button
                    onClick={() => { setShowBulkImport(false); setBulkResult(null); }}
                    className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleBulkAdd}
                    disabled={!bulkText.trim() || bulkImporting}
                    className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {bulkImporting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Importando...
                      </>
                    ) : (
                      <>📋 Importar {bulkText.trim() ? `${bulkText.split(/[\n,;\s]+/).filter(u => u.replace(/^@/, '').trim().length > 1).length} leads` : 'lista'}</>
                    )}
                  </button>
                </div>
                <p className="text-[10px] text-slate-600 -mt-1">
                  {bulkTiming === 'now' && '⚡ Se enviarán DMs instantáneamente (máx 8 por seguridad).'}
                  {bulkTiming === 'next_cron' && '⏰ Los DMs se enviarán mañana 10 AM automáticamente.'}
                  {bulkTiming === 'none' && '🚫 Los leads se guardarán sin enviar ningún DM.'}
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
                        restaurante: '🍽️', clinica_estetica: '💆', barberia: '💈', clinica_salud: '🏥',
                        inmobiliaria: '🏠', gym: '💪', tienda: '🛍️', general: '🏢',
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
                        <tr key={lead.id} onClick={() => setSelectedLead(selectedLead?.id === lead.id ? null : lead)} className={`hover:bg-white/[0.02] transition-colors group cursor-pointer ${selectedLead?.id === lead.id ? 'bg-fuchsia-500/[0.04] ring-1 ring-fuchsia-500/20' : ''}`}>
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

            {/* ─── Lead Intel Panel ─── */}
            {selectedLead && (() => {
              // Parse intel from lead_intel field or from notes fallback
              let intel: LeadIntel | null = null;
              if (selectedLead.lead_intel) {
                intel = selectedLead.lead_intel;
              } else if (selectedLead.notes && selectedLead.notes.includes('[INTEL:')) {
                try {
                  const match = selectedLead.notes.match(/\[INTEL:([\s\S]*)\]$/);
                  if (match) intel = JSON.parse(match[1]);
                } catch { /* ignore parse error */ }
              }

              return (
                <div className="bg-[#1a1a2e]/60 backdrop-blur rounded-2xl border border-fuchsia-500/20 overflow-hidden animate-in slide-in-from-top-2">
                  <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg">
                        {(selectedLead.username || '?')[0].toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white">@{selectedLead.username}</h3>
                        <p className="text-[10px] text-slate-500">{selectedLead.full_name || selectedLead.sector} · {intel?.ciudad || 'ubicación desconocida'}</p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedLead(null)} className="text-slate-500 hover:text-white text-lg">✕</button>
                  </div>

                  {intel ? (
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Resumen */}
                      {intel.resumen && (
                        <div className="col-span-full bg-gradient-to-r from-fuchsia-500/5 to-violet-500/5 rounded-xl p-3 border border-fuchsia-500/10">
                          <p className="text-[10px] text-fuchsia-400 font-bold uppercase tracking-wider mb-1">📋 Resumen para Mateo</p>
                          <p className="text-sm text-slate-300">{intel.resumen}</p>
                        </div>
                      )}

                      {/* Datos del negocio */}
                      <div className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.06]">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">🏢 Negocio</p>
                        <div className="space-y-1.5 text-xs">
                          <div className="flex justify-between"><span className="text-slate-500">Nombre</span><span className="text-slate-300">{intel.nombre_negocio || '—'}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Sector</span><span className="text-slate-300">{intel.sector || selectedLead.sector}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Ciudad</span><span className="text-slate-300">{intel.ciudad || '—'}{intel.zona_barrio ? ` (${intel.zona_barrio})` : ''}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Años abierto</span><span className="text-slate-300">{intel.anos_abierto || '—'}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Empleados</span><span className="text-slate-300">{intel.num_empleados || '—'}</span></div>
                        </div>
                      </div>

                      {/* Presencia digital */}
                      <div className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.06]">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">🌐 Digital</p>
                        <div className="space-y-1.5 text-xs">
                          <div className="flex justify-between"><span className="text-slate-500">Tiene web</span><span className={`font-medium ${intel.tiene_web === 'sí' ? 'text-emerald-400' : intel.tiene_web === 'no' ? 'text-red-400' : 'text-slate-400'}`}>{intel.tiene_web || '—'}</span></div>
                          {intel.url_web && <div className="flex justify-between"><span className="text-slate-500">URL</span><span className="text-cyan-400 truncate max-w-[150px]">{intel.url_web}</span></div>}
                          <div className="flex justify-between"><span className="text-slate-500">Redes</span><span className="text-slate-300">{intel.redes_sociales || '—'}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Competencia online</span><span className="text-slate-300">{intel.tiene_competencia_online || '—'}</span></div>
                        </div>
                      </div>

                      {/* Interés y necesidades */}
                      <div className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.06]">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">🎯 Interés</p>
                        <div className="space-y-1.5 text-xs">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Nivel</span>
                            <span className={`font-semibold ${
                              intel.nivel_interes === 'muy_caliente' ? 'text-red-400' :
                              intel.nivel_interes === 'caliente' ? 'text-orange-400' :
                              intel.nivel_interes === 'tibio' ? 'text-amber-400' :
                              intel.nivel_interes === 'frío' ? 'text-cyan-400' : 'text-slate-400'
                            }`}>
                              {intel.nivel_interes === 'muy_caliente' ? '🔥🔥 Muy caliente' :
                               intel.nivel_interes === 'caliente' ? '🔥 Caliente' :
                               intel.nivel_interes === 'tibio' ? '🌡️ Tibio' :
                               intel.nivel_interes === 'frío' ? '❄️ Frío' : '—'}
                            </span>
                          </div>
                        </div>
                        {intel.necesidades && intel.necesidades.length > 0 && (
                          <div className="mt-2">
                            <p className="text-[10px] text-slate-600 mb-1">Necesita:</p>
                            <div className="flex flex-wrap gap-1">
                              {intel.necesidades.map((n, i) => (
                                <span key={i} className="px-1.5 py-0.5 bg-violet-500/10 text-violet-300 rounded text-[10px] ring-1 ring-violet-500/20">{n}</span>
                              ))}
                            </div>
                          </div>
                        )}
                        {intel.problemas && intel.problemas.length > 0 && (
                          <div className="mt-2">
                            <p className="text-[10px] text-slate-600 mb-1">Problemas:</p>
                            <div className="flex flex-wrap gap-1">
                              {intel.problemas.map((p, i) => (
                                <span key={i} className="px-1.5 py-0.5 bg-red-500/10 text-red-300 rounded text-[10px] ring-1 ring-red-500/20">{p}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Notas extra */}
                      {intel.notas_extra && (
                        <div className="col-span-full bg-white/[0.02] rounded-xl p-3 border border-white/[0.06]">
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">📝 Notas extra</p>
                          <p className="text-xs text-slate-400">{intel.notas_extra}</p>
                        </div>
                      )}

                      {/* DM History */}
                      <div className="col-span-full bg-white/[0.02] rounded-xl p-3 border border-white/[0.06]">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">💬 Historial DM</p>
                        <div className="space-y-1 text-xs">
                          {selectedLead.first_dm_message && (
                            <div><span className="text-fuchsia-400">1er DM:</span> <span className="text-slate-400">{selectedLead.first_dm_message}</span></div>
                          )}
                          {selectedLead.followup_message && (
                            <div><span className="text-amber-400">Follow-up:</span> <span className="text-slate-400">{selectedLead.followup_message}</span></div>
                          )}
                          {selectedLead.notes && !selectedLead.notes.includes('[INTEL:') && (
                            <div><span className="text-slate-500">Notas:</span> <span className="text-slate-400">{selectedLead.notes}</span></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-slate-600">
                      <p className="text-lg mb-1">📊</p>
                      <p className="text-sm font-medium">Sin inteligencia todavía</p>
                      <p className="text-xs text-slate-700 mt-1">El bot extraerá datos automáticamente mientras conversa con este lead</p>
                      {/* DM info even without intel */}
                      <div className="mt-4 text-left max-w-md mx-auto space-y-1 text-xs">
                        {selectedLead.first_dm_message && (
                          <div><span className="text-fuchsia-400">1er DM:</span> <span className="text-slate-400">{selectedLead.first_dm_message}</span></div>
                        )}
                        {selectedLead.followup_message && (
                          <div><span className="text-amber-400">Follow-up:</span> <span className="text-slate-400">{selectedLead.followup_message}</span></div>
                        )}
                        {selectedLead.notes && (
                          <div><span className="text-slate-500">Notas:</span> <span className="text-slate-400">{selectedLead.notes}</span></div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
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
                    { id: 'icebreakers' as const, label: 'Ice Breakers', icon: '❄️' },
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

                {/* ── Ice Breakers ── */}
                {settingsTab === 'icebreakers' && (
                  <>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">❄️ Ice Breakers</h3>
                      <p className="text-sm text-slate-500">Botones que aparecen cuando alguien abre el chat contigo por primera vez. Máximo 4.</p>
                    </div>

                    {/* Ice breaker list */}
                    <div className="space-y-3">
                      {iceBreakers.map((ib, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] ring-1 ring-white/[0.06]">
                          <span className="text-lg text-slate-500 font-mono w-6 text-center">{idx + 1}</span>
                          <input
                            type="text"
                            value={ib.question}
                            onChange={(e) => {
                              const updated = [...iceBreakers];
                              updated[idx] = { ...updated[idx], question: e.target.value };
                              setIceBreakers(updated);
                              setIceStatus('idle');
                            }}
                            placeholder="Texto del botón..."
                            maxLength={80}
                            className="flex-1 px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-fuchsia-500/50"
                          />
                          <input
                            type="text"
                            value={ib.payload}
                            onChange={(e) => {
                              const updated = [...iceBreakers];
                              updated[idx] = { ...updated[idx], payload: e.target.value.toUpperCase().replace(/[^A-Z0-9_]/g, '_') };
                              setIceBreakers(updated);
                              setIceStatus('idle');
                            }}
                            placeholder="PAYLOAD"
                            maxLength={30}
                            className="w-32 px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-xs text-slate-400 font-mono placeholder-slate-600 focus:outline-none focus:border-fuchsia-500/50"
                          />
                          <button
                            onClick={() => {
                              setIceBreakers(iceBreakers.filter((_, i) => i !== idx));
                              setIceStatus('idle');
                            }}
                            className="p-2 text-red-400/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add button */}
                    {iceBreakers.length < 4 && (
                      <button
                        onClick={() => {
                          setIceBreakers([...iceBreakers, { question: '', payload: `ICE_${iceBreakers.length + 1}` }]);
                          setIceStatus('idle');
                        }}
                        className="w-full py-2.5 border-2 border-dashed border-white/[0.08] rounded-xl text-sm text-slate-500 hover:text-slate-300 hover:border-white/[0.15] transition-all"
                      >
                        + Añadir ice breaker
                      </button>
                    )}

                    {/* Preview */}
                    <div className="bg-white/[0.02] rounded-xl p-4 ring-1 ring-white/[0.06]">
                      <p className="text-[10px] text-slate-600 font-medium mb-3 uppercase tracking-wider">Preview — Así se ve en Instagram</p>
                      <div className="max-w-[280px] mx-auto space-y-2">
                        {iceBreakers.filter(ib => ib.question.trim()).map((ib, idx) => (
                          <div key={idx} className="px-4 py-2.5 bg-white/[0.06] rounded-full text-sm text-blue-300 text-center ring-1 ring-blue-400/20 cursor-default">
                            {ib.question}
                          </div>
                        ))}
                        {iceBreakers.filter(ib => ib.question.trim()).length === 0 && (
                          <p className="text-xs text-slate-600 text-center py-4">Añade al menos un ice breaker</p>
                        )}
                      </div>
                    </div>

                    {/* How it works */}
                    <div className="bg-cyan-500/5 rounded-xl p-4 ring-1 ring-cyan-500/20">
                      <h4 className="font-medium text-cyan-300 text-sm mb-2">¿Cómo funciona?</h4>
                      <ul className="text-xs text-cyan-300/60 space-y-1.5">
                        <li>→ Cuando alguien abre el chat contigo por primera vez, ve estos botones</li>
                        <li>→ Al tocar uno, se envía como mensaje y el bot responde automáticamente</li>
                        <li>→ Máximo 4 ice breakers, cada uno con hasta 80 caracteres</li>
                        <li>→ Solo aparecen en la primera conversación con cada usuario</li>
                      </ul>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={async () => {
                          const valid = iceBreakers.filter(ib => ib.question.trim() && ib.payload.trim());
                          if (!valid.length) { showToast('Añade al menos un ice breaker con texto'); return; }
                          setIceSaving(true);
                          setIceStatus('idle');
                          try {
                            const res = await fetch('/api/superadmin/instagram', {
                              method: 'PUT',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ action: 'set_ice_breakers', ice_breakers: valid }),
                            });
                            const data = await res.json();
                            if (res.ok && data.success) {
                              setIceStatus('saved');
                              showToast('❄️ Ice breakers configurados en Instagram!');
                            } else {
                              setIceStatus('error');
                              showToast(data.error || 'Error configurando ice breakers');
                            }
                          } catch {
                            setIceStatus('error');
                            showToast('Error de conexión');
                          }
                          setIceSaving(false);
                        }}
                        disabled={iceSaving}
                        className="flex-1 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/20 disabled:opacity-30 transition-all"
                      >
                        {iceSaving ? 'Guardando...' : iceStatus === 'saved' ? '✅ Configurados!' : '❄️ Guardar en Instagram'}
                      </button>
                      <button
                        onClick={async () => {
                          if (!confirm('¿Eliminar todos los ice breakers de Instagram?')) return;
                          setIceSaving(true);
                          try {
                            const res = await fetch('/api/superadmin/instagram', {
                              method: 'PUT',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ action: 'delete_ice_breakers' }),
                            });
                            if (res.ok) {
                              setIceBreakers([]);
                              setIceStatus('idle');
                              showToast('Ice breakers eliminados');
                            }
                          } catch { showToast('Error de conexión'); }
                          setIceSaving(false);
                        }}
                        disabled={iceSaving}
                        className="px-5 py-3 bg-red-500/10 text-red-400 ring-1 ring-red-500/20 rounded-xl text-sm font-medium hover:bg-red-500/20 disabled:opacity-30 transition-all"
                      >
                        🗑️ Eliminar
                      </button>
                    </div>

                    {/* Status */}
                    {iceStatus === 'error' && (
                      <div className="bg-red-500/10 rounded-xl p-3 ring-1 ring-red-500/20">
                        <p className="text-xs text-red-400">Error al configurar. Verifica que el token de Instagram esté activo y tenga permisos de messaging.</p>
                      </div>
                    )}
                  </>
                )}

                {/* ── Quick Replies ── */}
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
