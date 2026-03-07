'use client';

import { useRealtimeData } from '@/hooks/useRealtimeData';
import StatsCard from '@/components/superadmin/StatsCard';
import { useState, useEffect } from 'react';

interface Meeting {
  id: number;
  vapi_call_id: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  meeting_date: string;
  meeting_type: string;
  notes: string;
  status: string;
  reminder_email_sent: boolean;
  meeting_url: string;
  created_at: string;
}

interface MeetingsData {
  stats: {
    total: number;
    scheduled: number;
    completed: number;
    noShow: number;
    thisWeek: number;
  };
  meetings: Meeting[];
  nextMeeting: Meeting | null;
}

const statusColors: Record<string, string> = {
  scheduled: 'bg-blue-50 text-blue-700',
  confirmed: 'bg-cyan-50 text-cyan-700',
  completed: 'bg-green-50 text-green-700',
  cancelled: 'bg-slate-50 text-slate-500',
  'no-show': 'bg-red-50 text-red-700',
};

const statusIcons: Record<string, string> = {
  scheduled: '🕐',
  confirmed: '✅',
  completed: '🎉',
  cancelled: '❌',
  'no-show': '👻',
};

const statusLabels: Record<string, string> = {
  scheduled: 'Programada',
  confirmed: 'Confirmada',
  completed: 'Completada',
  cancelled: 'Cancelada',
  'no-show': 'No-show',
};

const typeLabels: Record<string, string> = {
  demo: '🎨 Demo',
  consultoria: '💼 Consultoría',
  seguimiento: '🔄 Seguimiento',
  presentacion: '📊 Presentación',
};

function formatMeetingDate(dateStr: string): string {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-ES', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function formatMeetingTime(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

function isUpcoming(dateStr: string): boolean {
  return new Date(dateStr) > new Date();
}

// ── Edit Meeting Modal ──
function EditMeetingModal({
  meeting,
  onClose,
  onSaved,
}: {
  meeting: Meeting;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    contact_name: meeting.contact_name || '',
    contact_email: meeting.contact_email || '',
    contact_phone: meeting.contact_phone || '',
    meeting_date: '',
    meeting_time: '',
    meeting_type: meeting.meeting_type || 'demo',
    status: meeting.status || 'scheduled',
    notes: meeting.notes || '',
    meeting_url: meeting.meeting_url || '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Parse meeting_date into date and time inputs
  useEffect(() => {
    if (meeting.meeting_date) {
      const d = new Date(meeting.meeting_date);
      const dateStr = d.getFullYear() + '-' +
        String(d.getMonth() + 1).padStart(2, '0') + '-' +
        String(d.getDate()).padStart(2, '0');
      const timeStr = String(d.getHours()).padStart(2, '0') + ':' +
        String(d.getMinutes()).padStart(2, '0');
      setForm(prev => ({ ...prev, meeting_date: dateStr, meeting_time: timeStr }));
    }
  }, [meeting.meeting_date]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  }

  async function handleSave() {
    if (!form.contact_name.trim()) {
      setError('El nombre es obligatorio');
      return;
    }
    if (form.contact_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contact_email)) {
      setError('Email no válido');
      return;
    }
    if (!form.meeting_date) {
      setError('La fecha es obligatoria');
      return;
    }

    setSaving(true);
    setError('');

    try {
      // Combine date + time into ISO string
      const meetingDatetime = form.meeting_time
        ? new Date(`${form.meeting_date}T${form.meeting_time}:00`).toISOString()
        : new Date(`${form.meeting_date}T00:00:00`).toISOString();

      const res = await fetch('/api/superadmin/meetings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: meeting.id,
          contact_name: form.contact_name.trim(),
          contact_email: form.contact_email.trim(),
          contact_phone: form.contact_phone.trim(),
          meeting_date: meetingDatetime,
          meeting_type: form.meeting_type,
          status: form.status,
          notes: form.notes.trim(),
          meeting_url: form.meeting_url.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error al guardar');
      }

      setSuccess(true);
      setTimeout(() => {
        onSaved();
        onClose();
      }, 800);
    } catch (err: any) {
      setError(err.message || 'Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">✏️ Editar Reunión</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="p-5 space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nombre del contacto *</label>
            <input
              type="text"
              name="contact_name"
              value={form.contact_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
              placeholder="Nombre completo"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              name="contact_email"
              value={form.contact_email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
              placeholder="email@ejemplo.com"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono</label>
            <input
              type="tel"
              name="contact_phone"
              value={form.contact_phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
              placeholder="+34 6XX XXX XXX"
            />
          </div>

          {/* Fecha y Hora */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Fecha *</label>
              <input
                type="date"
                name="meeting_date"
                value={form.meeting_date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Hora</label>
              <input
                type="time"
                name="meeting_time"
                value={form.meeting_time}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
              />
            </div>
          </div>

          {/* Tipo y Estado */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de reunión</label>
              <select
                name="meeting_type"
                value={form.meeting_type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none bg-white"
              >
                <option value="demo">🎨 Demo</option>
                <option value="consultoria">💼 Consultoría</option>
                <option value="seguimiento">🔄 Seguimiento</option>
                <option value="presentacion">📊 Presentación</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Estado</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none bg-white"
              >
                <option value="scheduled">🕐 Programada</option>
                <option value="confirmed">✅ Confirmada</option>
                <option value="completed">🎉 Completada</option>
                <option value="cancelled">❌ Cancelada</option>
                <option value="no-show">👻 No-show</option>
              </select>
            </div>
          </div>

          {/* URL de reunión */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">URL de reunión (opcional)</label>
            <input
              type="url"
              name="meeting_url"
              value={form.meeting_url}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
              placeholder="https://meet.google.com/..."
            />
          </div>

          {/* Notas */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Notas</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none"
              placeholder="Detalles sobre la reunión..."
            />
          </div>

          {/* Error / Success */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
              ❌ {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg p-3">
              ✅ Reunión actualizada correctamente
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-5 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 text-sm font-medium text-white bg-cyan-500 rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Guardando...' : '💾 Guardar cambios'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ReunionesPage() {
  const { data, loading } = useRealtimeData<MeetingsData>({
    url: '/api/superadmin/meetings',
    interval: 10000,
  });

  const [filter, setFilter] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);

  async function updateMeetingStatus(id: number, newStatus: string) {
    setUpdatingId(id);
    try {
      await fetch('/api/superadmin/meetings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
    } catch (err) {
      console.error('Error updating meeting:', err);
    } finally {
      setUpdatingId(null);
    }
  }

  async function resendConfirmation(meetingId: number) {
    try {
      await fetch('/api/vapi/send-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meeting_id: meetingId }),
      });
      alert('Email de confirmación reenviado');
    } catch (err) {
      console.error('Error resending:', err);
      alert('Error al reenviar');
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4" />
          <p className="text-slate-500">Cargando reuniones...</p>
        </div>
      </div>
    );
  }

  const stats = data?.stats;
  const meetings = data?.meetings || [];
  const nextMeeting = data?.nextMeeting;
  const filtered = filter === 'all' ? meetings : meetings.filter(m => m.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">📅 Reuniones</h1>
        <p className="text-slate-500 mt-1">Reuniones agendadas por el agente VAPI durante las llamadas</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Esta Semana"
          value={stats?.thisWeek || 0}
          icon="📆"
          subtitle={`${stats?.scheduled || 0} pendientes`}
        />
        <StatsCard
          title="Completadas"
          value={stats?.completed || 0}
          icon="✅"
        />
        <StatsCard
          title="No-Shows"
          value={stats?.noShow || 0}
          icon="👻"
        />
        <StatsCard
          title="Total"
          value={stats?.total || 0}
          icon="📋"
        />
      </div>

      {/* Next Meeting Banner */}
      {nextMeeting && (
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-5 flex items-center gap-4">
          <div className="text-4xl">📅</div>
          <div className="flex-1">
            <p className="text-xs text-cyan-600 font-semibold uppercase tracking-wider">Próxima reunión</p>
            <p className="text-lg font-bold text-slate-900">{nextMeeting.contact_name || 'Sin nombre'}</p>
            <p className="text-sm text-slate-600">
              {formatMeetingDate(nextMeeting.meeting_date)} a las {formatMeetingTime(nextMeeting.meeting_date)}
              {' · '}
              {typeLabels[nextMeeting.meeting_type] || nextMeeting.meeting_type}
            </p>
          </div>
          {nextMeeting.contact_email && (
            <div className="text-right">
              <p className="text-xs text-slate-500">{nextMeeting.contact_email}</p>
              {nextMeeting.contact_phone && <p className="text-xs text-slate-400">{nextMeeting.contact_phone}</p>}
            </div>
          )}
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'scheduled', 'confirmed', 'completed', 'cancelled', 'no-show'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-cyan-500 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {f === 'all' ? 'Todas' : `${statusIcons[f] || ''} ${statusLabels[f] || f}`}
          </button>
        ))}
      </div>

      {/* Meetings List */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map(meeting => {
            const upcoming = isUpcoming(meeting.meeting_date);
            return (
              <div
                key={meeting.id}
                className={`bg-white rounded-xl border border-slate-200 p-5 transition-all hover:shadow-sm ${
                  !upcoming && meeting.status === 'scheduled' ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left: Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="text-center min-w-[60px]">
                      <p className="text-2xl font-bold text-cyan-600">
                        {new Date(meeting.meeting_date).getDate()}
                      </p>
                      <p className="text-xs text-slate-500 uppercase">
                        {new Date(meeting.meeting_date).toLocaleDateString('es-ES', { month: 'short' })}
                      </p>
                      <p className="text-sm font-semibold text-slate-700 mt-1">
                        {formatMeetingTime(meeting.meeting_date)}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-slate-900">{meeting.contact_name || 'Sin nombre'}</p>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[meeting.status] || 'bg-slate-50'}`}>
                          {statusIcons[meeting.status]} {statusLabels[meeting.status] || meeting.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500">
                        {typeLabels[meeting.meeting_type] || meeting.meeting_type}
                        {meeting.contact_email && ` · ${meeting.contact_email}`}
                        {meeting.contact_phone && ` · ${meeting.contact_phone}`}
                      </p>
                      {meeting.notes && (
                        <p className="text-xs text-slate-400 mt-1 italic">{meeting.notes}</p>
                      )}
                      {meeting.reminder_email_sent && (
                        <p className="text-xs text-green-500 mt-1">✉️ Recordatorio enviado</p>
                      )}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-col gap-2 min-w-[140px]">
                    <button
                      onClick={() => setEditingMeeting(meeting)}
                      className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium hover:bg-amber-100 transition-colors"
                    >
                      ✏️ Editar
                    </button>
                    {meeting.status === 'scheduled' && (
                      <>
                        <button
                          onClick={() => updateMeetingStatus(meeting.id, 'completed')}
                          disabled={updatingId === meeting.id}
                          className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors disabled:opacity-50"
                        >
                          ✅ Completada
                        </button>
                        <button
                          onClick={() => updateMeetingStatus(meeting.id, 'no-show')}
                          disabled={updatingId === meeting.id}
                          className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors disabled:opacity-50"
                        >
                          👻 No-show
                        </button>
                        <button
                          onClick={() => updateMeetingStatus(meeting.id, 'cancelled')}
                          disabled={updatingId === meeting.id}
                          className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-100 transition-colors disabled:opacity-50"
                        >
                          ❌ Cancelar
                        </button>
                      </>
                    )}
                    {meeting.contact_email && (
                      <button
                        onClick={() => resendConfirmation(meeting.id)}
                        className="px-3 py-1.5 bg-cyan-50 text-cyan-700 rounded-lg text-xs font-medium hover:bg-cyan-100 transition-colors"
                      >
                        📧 Reenviar email
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <p className="text-4xl mb-3">📅</p>
            <p className="text-slate-500">No hay reuniones{filter !== 'all' ? ` con estado "${statusLabels[filter] || filter}"` : ''} todavía</p>
            <p className="text-sm text-slate-400 mt-1">Las reuniones aparecerán aquí cuando el agente VAPI las agende durante las llamadas</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingMeeting && (
        <EditMeetingModal
          meeting={editingMeeting}
          onClose={() => setEditingMeeting(null)}
          onSaved={() => {
            // Data will refresh automatically via polling
          }}
        />
      )}
    </div>
  );
}
