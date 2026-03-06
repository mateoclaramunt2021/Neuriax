'use client';

import { useRealtimeData } from '@/hooks/useRealtimeData';
import StatsCard from '@/components/superadmin/StatsCard';
import { useState } from 'react';

interface BusinessProfile {
  sector: string;
  nombre_negocio: string;
  num_empleados: string;
  problema_principal: string;
  herramientas_actuales: string;
  experiencia_ia: string;
  presupuesto_mensual: string;
  urgencia: string;
  notas: string;
  lead_score: number;
}

interface VapiCall {
  id: number;
  vapi_call_id: string;
  phone_number: string;
  contact_name: string;
  contact_email: string;
  direction: string;
  status: string;
  started_at: string;
  ended_at: string;
  duration_seconds: number;
  summary: string;
  transcript: Array<{ role: string; message: string }>;
  recording_url: string;
  ended_reason: string;
  cost: number;
  meeting_scheduled: boolean;
  created_at: string;
  business_profile: BusinessProfile | null;
}

interface CallsData {
  stats: {
    totalCalls: number;
    todayCalls: number;
    avgDurationSeconds: number;
    conversionRate: number;
    meetingsFromCalls: number;
    avgLeadScore: number;
    totalProfiles: number;
    topSectors: [string, number][];
  };
  calls: VapiCall[];
}

function formatDuration(seconds: number): string {
  if (!seconds) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}

const SECTOR_LABELS: Record<string, string> = {
  hosteleria: '🍽️ Hostelería',
  inmobiliaria: '🏠 Inmobiliaria',
  clinica: '🏥 Clínica',
  ecommerce: '🛒 E-commerce',
  abogados: '⚖️ Abogados',
  asesoria: '📊 Asesoría',
  marketing: '📢 Marketing',
  construccion: '🏗️ Construcción',
  formacion: '🎓 Formación',
  retail: '🏪 Retail',
  tecnologia: '💻 Tecnología',
  otro: '🏢 Otro',
};

const EMPLEADOS_LABELS: Record<string, string> = {
  '1-5': '1-5 empleados',
  '6-20': '6-20 empleados',
  '21-50': '21-50 empleados',
  '50+': '50+ empleados',
  'no_definido': 'No definido',
};

const PRESUPUESTO_LABELS: Record<string, string> = {
  'menos_100': '< 100€/mes',
  '100_500': '100-500€/mes',
  '500_2000': '500-2.000€/mes',
  'mas_2000': '2.000€+/mes',
  'no_definido': 'No definido',
};

function LeadScoreBadge({ score }: { score: number }) {
  const color = score >= 7 ? 'bg-green-100 text-green-700 border-green-200'
    : score >= 4 ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
    : 'bg-red-100 text-red-700 border-red-200';
  const emoji = score >= 7 ? '🟢' : score >= 4 ? '🟡' : '🔴';
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold border ${color}`}>
      {emoji} {score}/10
    </span>
  );
}

export default function LlamadasPage() {
  const { data, loading } = useRealtimeData<CallsData>({
    url: '/api/superadmin/calls',
    interval: 10000,
  });

  const [selectedCall, setSelectedCall] = useState<VapiCall | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [sectorFilter, setSectorFilter] = useState<string>('all');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4" />
          <p className="text-slate-500">Cargando llamadas...</p>
        </div>
      </div>
    );
  }

  const stats = data?.stats;
  const calls = data?.calls || [];
  const filtered = calls.filter(c => {
    if (filter !== 'all' && c.status !== filter) return false;
    if (sectorFilter !== 'all' && c.business_profile?.sector !== sectorFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">📞 Llamadas VAPI</h1>
        <p className="text-slate-500 mt-1">Historial de llamadas recibidas por el agente IA</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard
          title="Llamadas Hoy"
          value={stats?.todayCalls || 0}
          icon="📞"
          subtitle={`${stats?.totalCalls || 0} total`}
        />
        <StatsCard
          title="Duración Media"
          value={formatDuration(stats?.avgDurationSeconds || 0)}
          icon="⏱️"
        />
        <StatsCard
          title="Reuniones"
          value={stats?.meetingsFromCalls || 0}
          icon="📅"
        />
        <StatsCard
          title="Conversión"
          value={`${stats?.conversionRate || 0}%`}
          icon="🎯"
          subtitle="llamada → reunión"
        />
        <StatsCard
          title="Lead Score Medio"
          value={stats?.avgLeadScore || 0}
          icon="⭐"
          subtitle={`${stats?.totalProfiles || 0} perfiles`}
        />
      </div>

      {/* Top Sectors */}
      {stats?.topSectors && stats.topSectors.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">📊 Sectores más frecuentes</h3>
          <div className="flex flex-wrap gap-2">
            {stats.topSectors.map(([sector, count]) => (
              <button
                key={sector}
                onClick={() => setSectorFilter(sectorFilter === sector ? 'all' : sector)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  sectorFilter === sector
                    ? 'bg-cyan-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {SECTOR_LABELS[sector] || sector} ({count})
              </button>
            ))}
            {sectorFilter !== 'all' && (
              <button
                onClick={() => setSectorFilter('all')}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100"
              >
                ✕ Quitar filtro
              </button>
            )}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2">
        {['all', 'in-progress', 'ended', 'failed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-cyan-500 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {f === 'all' ? 'Todas' : f === 'in-progress' ? '🟢 En curso' : f === 'ended' ? '✅ Completadas' : '❌ Fallidas'}
          </button>
        ))}
      </div>

      {/* Calls Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Fecha</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Contacto</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Sector</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Lead Score</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Duración</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Estado</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Reunión</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map(call => (
                  <tr
                    key={call.id}
                    className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedCall(call)}
                  >
                    <td className="py-3 px-4 text-slate-700">{formatDate(call.started_at || call.created_at)}</td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-slate-900">{call.contact_name || '—'}</p>
                      {call.phone_number && (
                        <p className="text-xs text-slate-400 font-mono">{call.phone_number}</p>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {call.business_profile ? (
                        <span className="text-xs font-medium text-slate-600">
                          {SECTOR_LABELS[call.business_profile.sector] || call.business_profile.sector}
                        </span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {call.business_profile?.lead_score ? (
                        <LeadScoreBadge score={call.business_profile.lead_score} />
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-700">{formatDuration(call.duration_seconds)}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        call.status === 'ended' ? 'bg-green-50 text-green-700' :
                        call.status === 'in-progress' ? 'bg-blue-50 text-blue-700' :
                        call.status === 'failed' ? 'bg-red-50 text-red-700' :
                        'bg-slate-50 text-slate-600'
                      }`}>
                        {call.status === 'ended' ? '✅' : call.status === 'in-progress' ? '🔵' : '❌'}
                        {call.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {call.meeting_scheduled ? (
                        <span className="text-green-600 font-medium">📅 Sí</span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-cyan-600 hover:text-cyan-800 text-xs font-medium">
                        Ver →
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No hay llamadas{filter !== 'all' ? ` con estado "${filter}"` : ''} todavía
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Call Detail Modal */}
      {selectedCall && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCall(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  📞 {selectedCall.contact_name || selectedCall.phone_number || 'Llamada'}
                </h2>
                <p className="text-sm text-slate-500">{formatDate(selectedCall.started_at || selectedCall.created_at)}</p>
              </div>
              <button
                onClick={() => setSelectedCall(null)}
                className="text-slate-400 hover:text-slate-600 p-2"
              >
                ✕
              </button>
            </div>

            <div className="px-6 py-4 space-y-5">
              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500">Teléfono</p>
                  <p className="font-mono text-sm font-medium">{selectedCall.phone_number || '—'}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500">Duración</p>
                  <p className="text-sm font-medium">{formatDuration(selectedCall.duration_seconds)}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500">Estado</p>
                  <p className="text-sm font-medium">{selectedCall.status}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500">Coste</p>
                  <p className="text-sm font-medium">{selectedCall.cost ? `€${selectedCall.cost.toFixed(4)}` : '—'}</p>
                </div>
              </div>

              {/* Summary */}
              {selectedCall.summary && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">📝 Resumen</h3>
                  <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                    <p className="text-sm text-cyan-900 leading-relaxed">{selectedCall.summary}</p>
                  </div>
                </div>
              )}

              {/* Business Profile */}
              {selectedCall.business_profile && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    🏢 Perfil del Negocio
                    <LeadScoreBadge score={selectedCall.business_profile.lead_score} />
                  </h3>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">Sector</p>
                        <p className="text-sm font-medium text-slate-800">{SECTOR_LABELS[selectedCall.business_profile.sector] || selectedCall.business_profile.sector}</p>
                      </div>
                      {selectedCall.business_profile.nombre_negocio && (
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">Empresa</p>
                          <p className="text-sm font-medium text-slate-800">{selectedCall.business_profile.nombre_negocio}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">Empleados</p>
                        <p className="text-sm font-medium text-slate-800">{EMPLEADOS_LABELS[selectedCall.business_profile.num_empleados] || selectedCall.business_profile.num_empleados}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">Presupuesto</p>
                        <p className="text-sm font-medium text-slate-800">{PRESUPUESTO_LABELS[selectedCall.business_profile.presupuesto_mensual] || selectedCall.business_profile.presupuesto_mensual}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">Experiencia IA</p>
                        <p className="text-sm font-medium text-slate-800 capitalize">{selectedCall.business_profile.experiencia_ia}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">Urgencia</p>
                        <p className={`text-sm font-bold ${
                          selectedCall.business_profile.urgencia === 'alta' ? 'text-red-600' :
                          selectedCall.business_profile.urgencia === 'media' ? 'text-yellow-600' :
                          'text-slate-600'
                        }`}>
                          {selectedCall.business_profile.urgencia === 'alta' ? '🔴 Alta' :
                           selectedCall.business_profile.urgencia === 'media' ? '🟡 Media' :
                           '🟢 Baja'}
                        </p>
                      </div>
                    </div>
                    {selectedCall.business_profile.problema_principal && (
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">Problema principal</p>
                        <p className="text-sm text-slate-800 bg-white rounded p-2 border border-slate-100">{selectedCall.business_profile.problema_principal}</p>
                      </div>
                    )}
                    {selectedCall.business_profile.herramientas_actuales && (
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">Herramientas actuales</p>
                        <p className="text-sm text-slate-800">{selectedCall.business_profile.herramientas_actuales}</p>
                      </div>
                    )}
                    {selectedCall.business_profile.notas && (
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">Notas</p>
                        <p className="text-sm text-slate-600 italic">{selectedCall.business_profile.notas}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Recording */}
              {selectedCall.recording_url && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">🎙️ Grabación</h3>
                  <audio controls className="w-full" src={selectedCall.recording_url}>
                    Tu navegador no soporta audio.
                  </audio>
                </div>
              )}

              {/* Transcript */}
              {selectedCall.transcript && Array.isArray(selectedCall.transcript) && selectedCall.transcript.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">💬 Transcripción</h3>
                  <div className="bg-slate-50 rounded-lg p-4 max-h-60 overflow-y-auto space-y-2">
                    {selectedCall.transcript.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex gap-2 ${msg.role === 'assistant' ? '' : 'flex-row-reverse'}`}
                      >
                        <div className={`px-3 py-2 rounded-lg text-sm max-w-[80%] ${
                          msg.role === 'assistant'
                            ? 'bg-cyan-100 text-cyan-900'
                            : 'bg-slate-200 text-slate-800'
                        }`}>
                          <p className="text-[10px] font-bold mb-0.5 opacity-60">
                            {msg.role === 'assistant' ? '🤖 IA' : '👤 Cliente'}
                          </p>
                          {msg.message}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Meeting scheduled */}
              {selectedCall.meeting_scheduled && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                  <span className="text-2xl">📅</span>
                  <div>
                    <p className="text-sm font-semibold text-green-800">Reunión agendada durante esta llamada</p>
                    <p className="text-xs text-green-600">Ver en la sección de Reuniones</p>
                  </div>
                </div>
              )}

              {/* Ended reason */}
              {selectedCall.ended_reason && (
                <p className="text-xs text-slate-400">
                  Motivo fin: {selectedCall.ended_reason}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
