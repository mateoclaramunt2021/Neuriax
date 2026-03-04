'use client';

import { useEffect, useState } from 'react';
import StatsCard from '@/components/superadmin/StatsCard';

interface DashboardData {
  stats: {
    totalVisitors: number;
    todayVisitors: number;
    weekVisitors: number;
    totalContacts: number;
    todayContacts: number;
    totalEmails: number;
    totalChats: number;
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
  dailyVisits: Record<string, number>;
  pipeline: Record<string, number>;
}

export default function SuperAdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/superadmin/dashboard');
        if (res.ok) {
          const result = await res.json();
          setData(result);
        }
      } catch (err) {
        console.error('Error fetching dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

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
        <div className="text-sm text-slate-400">
          Actualización automática cada 30s
        </div>
      </div>

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
    </div>
  );
}
