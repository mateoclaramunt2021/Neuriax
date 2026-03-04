'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface ClientDetail {
  contact: {
    id: number;
    nombre: string;
    email: string;
    telefono: string;
    mensaje: string;
    empresa?: string;
    sector?: string;
    created_at: string;
  };
  crm: {
    status: string;
    priority: string;
    value: number;
    source: string;
  };
  notes: Array<{
    id: number;
    note: string;
    author: string;
    created_at: string;
  }>;
  emails: Array<{
    id: number;
    subject: string;
    email_type: string;
    status: string;
    created_at: string;
  }>;
  events: Array<{
    id: number;
    pagina: string;
    evento_tipo: string;
    datos_adicionales: Record<string, unknown>;
    timestamp: string;
  }>;
}

const statusLabels: Record<string, string> = {
  nuevo: '🆕 Nuevo', contactado: '📞 Contactado', negociacion: '🤝 Negociación', cliente: '✅ Cliente', perdido: '❌ Perdido',
};

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<ClientDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [tab, setTab] = useState<'notes' | 'emails' | 'activity'>('notes');

  const fetchClient = async () => {
    try {
      const res = await fetch(`/api/superadmin/clients/${params.id}`);
      if (res.ok) {
        const result = await res.json();
        setData(result);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClient();
  }, [params.id]);

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    setSavingNote(true);
    try {
      const res = await fetch(`/api/superadmin/clients/${params.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: newNote }),
      });
      if (res.ok) {
        setNewNote('');
        fetchClient();
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setSavingNote(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!data) {
    return <div className="text-center py-20 text-slate-400">Cliente no encontrado</div>;
  }

  const { contact, crm, notes, emails, events } = data;

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={() => router.push('/superadmin/clientes')}
        className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
      >
        ← Volver a clientes
      </button>

      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{contact.nombre}</h1>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-500">
              <a href={`mailto:${contact.email}`} className="hover:text-cyan-600">📧 {contact.email}</a>
              {contact.telefono && (
                <a href={`tel:${contact.telefono}`} className="hover:text-cyan-600">📱 {contact.telefono}</a>
              )}
              {contact.empresa && <span>🏢 {contact.empresa}</span>}
              {contact.sector && <span>🏷️ {contact.sector}</span>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-sm rounded-full bg-slate-100 text-slate-700">
              {statusLabels[crm.status] || crm.status}
            </span>
            {crm.value > 0 && (
              <span className="px-3 py-1 text-sm rounded-full bg-green-50 text-green-700 font-semibold">
                {crm.value}€
              </span>
            )}
          </div>
        </div>
        {contact.mensaje && (
          <div className="mt-4 p-4 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-400 mb-1">Mensaje original:</p>
            <p className="text-sm text-slate-700">{contact.mensaje}</p>
          </div>
        )}
        <p className="text-xs text-slate-400 mt-3">
          Registrado el {new Date(contact.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
        {[
          { key: 'notes' as const, label: `📝 Notas (${notes.length})` },
          { key: 'emails' as const, label: `📧 Emails (${emails.length})` },
          { key: 'activity' as const, label: `📈 Actividad (${events.length})` },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              tab === t.key ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        {tab === 'notes' && (
          <div className="space-y-4">
            {/* Add note */}
            <div className="flex gap-3">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Escribe una nota..."
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                rows={2}
              />
              <button
                onClick={handleAddNote}
                disabled={savingNote || !newNote.trim()}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-700 disabled:opacity-50 transition-colors self-end"
              >
                {savingNote ? '...' : 'Añadir'}
              </button>
            </div>
            {/* Notes list */}
            {notes.length > 0 ? (
              notes.map((n) => (
                <div key={n.id} className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-slate-700">{n.note}</p>
                  <p className="text-xs text-slate-400 mt-2">{n.author} · {new Date(n.created_at).toLocaleString('es-ES')}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400 text-center py-8">Sin notas todavía</p>
            )}
          </div>
        )}

        {tab === 'emails' && (
          <div className="space-y-3">
            {emails.length > 0 ? (
              emails.map((e) => (
                <div key={e.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-slate-700">{e.subject || 'Sin asunto'}</p>
                    <p className="text-xs text-slate-400">{e.email_type} · {e.status}</p>
                  </div>
                  <span className="text-xs text-slate-400">{new Date(e.created_at).toLocaleString('es-ES')}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400 text-center py-8">No se han enviado emails a este contacto</p>
            )}
          </div>
        )}

        {tab === 'activity' && (
          <div className="space-y-2">
            {events.length > 0 ? (
              events.map((e) => (
                <div key={e.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg text-sm">
                  <span className="text-lg">
                    {e.evento_tipo === 'page_view' ? '👁️' : e.evento_tipo === 'time_spent' ? '⏱️' : e.evento_tipo === 'button_click' ? '👆' : '📋'}
                  </span>
                  <div className="flex-1">
                    <p className="text-slate-700">{e.pagina}</p>
                    <p className="text-xs text-slate-400">
                      {e.evento_tipo}
                      {e.datos_adicionales && typeof e.datos_adicionales === 'object' && 'segundos' in e.datos_adicionales
                        ? ` · ${e.datos_adicionales.segundos}s`
                        : ''}
                    </p>
                  </div>
                  <span className="text-xs text-slate-400">{new Date(e.timestamp).toLocaleString('es-ES')}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400 text-center py-8">Sin actividad registrada</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
