'use client';

import { useRealtimeData } from '@/hooks/useRealtimeData';
import StatsCard from '@/components/superadmin/StatsCard';
import LiveIndicator from '@/components/superadmin/LiveIndicator';

interface DashboardData {
  activeNow: number;
  stats: {
    totalVisitors: number;
    todayVisitors: number;
    weekVisitors: number;
    totalContacts: number;
    todayContacts: number;
    totalEmails: number;
    totalChats: number;
    todayCalls: number;
    totalCalls: number;
    pendingMeetings: number;
    avgLeadScore: number;
  };
  topPages: [string, number][];
  recentContacts: Array<{
    id: number;
    nombre: string;
    email: string;
    telefono: string;
    mensaje: string;
    created_at: string;
  }>;
  recentVisitors: Array<{
    id: number;
    email: string;
    nombre: string;
    created_at: string;
  }>;
  recentCalls: Array<{
    vapi_call_id: string;
    phone_number: string;
    contact_name: string;
    status: string;
    duration_seconds: number;
    meeting_scheduled: boolean;
    created_at: string;
  }>;
  nextMeeting: {
    contact_name: string;
    meeting_date: string;
    meeting_type: string;
  } | null;
  dailyVisits: Record<string, number>;
  pipeline: Record<string, number>;
  igStats: {
    total: number;
    new: number;
    contacted: number;
    responded: number;
    converted: number;
    responseRate: number;
  };
  recentIgLeads: Array<{
    id: number;
    username: string;
    sector: string;
    status: string;
    created_at: string;
    responded: boolean;
    lead_intel: { resumen?: string; nivel_interes?: string; nombre_negocio?: string } | null;
  }>;
}

export default function SuperAdminDashboard() {
  const { data, loading, lastUpdated } = useRealtimeData<DashboardData>({
    url: '/api/superadmin/dashboard',
    interval: 5000,
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-slate-500">Cargando panel...</p>
        </div>
      </div>
    );
  }

  const stats = data?.stats;
  const pipelineLabels: Record<string, string> = {
    nuevo: '🆕 Nuevos',
    contactado: '📞 Contactados',
    negociacion: '🤝 En negociación',
    cliente: '✅ Clientes',
    perdido: '❌ Perdidos',
  };

  // Prepare chart data (last 14 days)
  const last14Days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    return d.toISOString().split('T')[0];
  });

  const maxVisits = Math.max(...last14Days.map(d => data?.dailyVisits?.[d] || 0), 1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Panel de control de Neuriax</p>
        </div>
        <LiveIndicator lastUpdated={lastUpdated} />
      </div>

      {/* Active Now Banner */}
      {(data?.activeNow ?? 0) > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-green-800 font-semibold text-sm">
            {data?.activeNow} {data?.activeNow === 1 ? 'persona' : 'personas'} en la web ahora mismo
          </span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Visitantes Hoy"
          value={stats?.todayVisitors || 0}
          icon="👁️"
          subtitle={`${stats?.weekVisitors || 0} esta semana`}
        />
        <StatsCard
          title="Total Visitantes"
          value={stats?.totalVisitors || 0}
          icon="🌐"
        />
        <StatsCard
          title="Leads / Contactos"
          value={stats?.totalContacts || 0}
          icon="🎯"
          subtitle={`${stats?.todayContacts || 0} hoy`}
        />
        <StatsCard
          title="Emails Enviados"
          value={stats?.totalEmails || 0}
          icon="📧"
        />
      </div>

      {/* VAPI KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Llamadas Hoy"
          value={stats?.todayCalls || 0}
          icon="📞"
          subtitle={`${stats?.totalCalls || 0} total`}
        />
        <StatsCard
          title="Reuniones Pendientes"
          value={stats?.pendingMeetings || 0}
          icon="📅"
          subtitle={data?.nextMeeting ? `Próxima: ${data.nextMeeting.contact_name}` : undefined}
        />
        <StatsCard
          title="Lead Score Medio"
          value={stats?.avgLeadScore || 0}
          icon="⭐"
          subtitle="de las llamadas cualificadas"
        />
        <StatsCard
          title="Chats IA"
          value={stats?.totalChats || 0}
          icon="🤖"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Visits Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">📈 Visitas (últimos 14 días)</h2>
          <div className="flex items-end gap-1 h-40">
            {last14Days.map((day) => {
              const count = data?.dailyVisits?.[day] || 0;
              const height = maxVisits > 0 ? (count / maxVisits) * 100 : 0;
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] text-slate-400">{count > 0 ? count : ''}</span>
                  <div
                    className="w-full bg-cyan-500 rounded-t transition-all hover:bg-cyan-400"
                    style={{ height: `${Math.max(height, 2)}%` }}
                    title={`${day}: ${count} visitas`}
                  />
                  <span className="text-[9px] text-slate-400 rotate-[-45deg] origin-center whitespace-nowrap">
                    {day.slice(5)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pipeline */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">🔄 Pipeline CRM</h2>
          <div className="space-y-3">
            {Object.entries(pipelineLabels).map(([key, label]) => {
              const count = data?.pipeline?.[key] || 0;
              const total = Object.values(data?.pipeline || {}).reduce((a, b) => a + b, 0) || 1;
              const width = (count / total) * 100;
              return (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">{label}</span>
                    <span className="font-semibold text-slate-900">{count}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        key === 'cliente' ? 'bg-green-500' :
                        key === 'perdido' ? 'bg-red-400' :
                        key === 'negociacion' ? 'bg-amber-500' :
                        key === 'contactado' ? 'bg-blue-500' :
                        'bg-cyan-500'
                      }`}
                      style={{ width: `${Math.max(width, 1)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Pages & Recent Contacts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">🔥 Páginas más visitadas</h2>
          <div className="space-y-2">
            {data?.topPages && data.topPages.length > 0 ? (
              data.topPages.map(([page, count], i) => (
                <div key={page} className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400 w-5">#{i + 1}</span>
                    <span className="text-sm text-slate-700 truncate max-w-[200px]">{page}</span>
                  </div>
                  <span className="text-sm font-semibold text-cyan-600">{count}</span>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-sm">Sin datos aún</p>
            )}
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">🆕 Últimos contactos</h2>
          <div className="space-y-3">
            {data?.recentContacts && data.recentContacts.length > 0 ? (
              data.recentContacts.map((contact) => (
                <div key={contact.id} className="flex items-start justify-between py-2 px-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{contact.nombre}</p>
                    <p className="text-xs text-slate-500">{contact.email}</p>
                    {contact.telefono && (
                      <p className="text-xs text-slate-400">{contact.telefono}</p>
                    )}
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap">
                    {new Date(contact.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-sm">Sin contactos aún</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent VAPI Calls */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">📞 Últimas llamadas VAPI</h2>
          <a href="/superadmin/llamadas" className="text-sm text-cyan-600 hover:text-cyan-800 font-medium">
            Ver todas →
          </a>
        </div>
        <div className="space-y-2">
          {data?.recentCalls && data.recentCalls.length > 0 ? (
            data.recentCalls.map((call) => (
              <div key={call.vapi_call_id} className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className={`text-lg ${call.status === 'ended' ? '' : call.status === 'in-progress' ? '' : ''}`}>
                    {call.status === 'ended' ? '✅' : call.status === 'in-progress' ? '🔵' : '❌'}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {call.contact_name || call.phone_number || 'Desconocido'}
                    </p>
                    <p className="text-xs text-slate-500">
                      {call.duration_seconds > 0 ? `${Math.floor(call.duration_seconds / 60)}:${(call.duration_seconds % 60).toString().padStart(2, '0')}` : 'En curso'}
                      {call.meeting_scheduled && ' · 📅 Reunión agendada'}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-slate-400 whitespace-nowrap">
                  {new Date(call.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-slate-400">
              <p className="text-3xl mb-2">📞</p>
              <p className="text-sm">Sin llamadas registradas aún</p>
              <p className="text-xs mt-1">Las llamadas de VAPI aparecerán aquí automáticamente</p>
            </div>
          )}
        </div>
      </div>

      {/* ═══ Instagram Cold Leads ═══ */}
      {data?.igStats && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">📸 Instagram — Leads Fríos</h2>
            <a href="/superadmin/instagram" className="text-sm text-fuchsia-600 hover:text-fuchsia-800 font-medium">
              Ver CRM completo →
            </a>
          </div>

          {/* IG KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="bg-white rounded-xl border border-slate-200 p-3">
              <p className="text-2xl font-bold text-slate-900">{data.igStats.total}</p>
              <p className="text-[11px] text-slate-500">Total leads</p>
            </div>
            <div className="bg-white rounded-xl border border-cyan-200 p-3">
              <p className="text-2xl font-bold text-cyan-600">{data.igStats.new}</p>
              <p className="text-[11px] text-slate-500">Nuevos</p>
            </div>
            <div className="bg-white rounded-xl border border-amber-200 p-3">
              <p className="text-2xl font-bold text-amber-600">{data.igStats.contacted}</p>
              <p className="text-[11px] text-slate-500">Contactados</p>
            </div>
            <div className="bg-white rounded-xl border border-emerald-200 p-3">
              <p className="text-2xl font-bold text-emerald-600">{data.igStats.responded}</p>
              <p className="text-[11px] text-slate-500">Respondieron</p>
            </div>
            <div className="bg-white rounded-xl border border-fuchsia-200 p-3">
              <p className="text-2xl font-bold text-fuchsia-600">{data.igStats.converted}</p>
              <p className="text-[11px] text-slate-500">Convertidos</p>
            </div>
            <div className="bg-white rounded-xl border border-violet-200 p-3">
              <p className="text-2xl font-bold text-violet-600">{data.igStats.responseRate}%</p>
              <p className="text-[11px] text-slate-500">Tasa respuesta</p>
            </div>
          </div>

          {/* Recent IG Leads Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="text-left px-4 py-2.5 text-[11px] text-slate-500 font-medium uppercase">Usuario</th>
                    <th className="text-left px-4 py-2.5 text-[11px] text-slate-500 font-medium uppercase">Sector</th>
                    <th className="text-left px-4 py-2.5 text-[11px] text-slate-500 font-medium uppercase">Estado</th>
                    <th className="text-left px-4 py-2.5 text-[11px] text-slate-500 font-medium uppercase">Intel</th>
                    <th className="text-left px-4 py-2.5 text-[11px] text-slate-500 font-medium uppercase">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {data.recentIgLeads && data.recentIgLeads.length > 0 ? data.recentIgLeads.map((lead) => {
                    const sectorEmoji: Record<string, string> = {
                      restaurante: '🍽️', clinica_estetica: '💆', barberia: '💈', clinica_salud: '🏥',
                      inmobiliaria: '🏠', gym: '💪', tienda: '🛍️', general: '🏢',
                    };
                    const statusStyle: Record<string, string> = {
                      new: 'bg-cyan-50 text-cyan-700',
                      contacted: 'bg-amber-50 text-amber-700',
                      responded: 'bg-emerald-50 text-emerald-700',
                      converted: 'bg-fuchsia-50 text-fuchsia-700',
                      no_response: 'bg-slate-50 text-slate-500',
                      dm_failed: 'bg-red-50 text-red-700',
                    };
                    const statusLabel: Record<string, string> = {
                      new: 'Nuevo', contacted: 'Contactado', responded: 'Respondió',
                      converted: 'Convertido', no_response: 'Sin respuesta', dm_failed: 'DM falló',
                    };
                    return (
                      <tr key={lead.id} className="hover:bg-slate-50/50">
                        <td className="px-4 py-2.5">
                          <span className="font-medium text-slate-900">@{lead.username}</span>
                          {lead.lead_intel?.nombre_negocio && (
                            <span className="block text-[10px] text-slate-400">{lead.lead_intel.nombre_negocio}</span>
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-xs">
                          {sectorEmoji[lead.sector] || '🏢'} {lead.sector.replace('_', ' ')}
                        </td>
                        <td className="px-4 py-2.5">
                          <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${statusStyle[lead.status] || statusStyle.new}`}>
                            {statusLabel[lead.status] || lead.status}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-xs text-slate-500 max-w-[200px] truncate">
                          {lead.lead_intel?.resumen || (lead.lead_intel?.nivel_interes ? `Interés: ${lead.lead_intel.nivel_interes}` : '—')}
                        </td>
                        <td className="px-4 py-2.5 text-xs text-slate-400">
                          {new Date(lead.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan={5} className="text-center py-6 text-slate-400 text-sm">
                        Sin leads de Instagram todavía · <a href="/superadmin/instagram" className="text-fuchsia-500 hover:underline">Añadir leads →</a>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
