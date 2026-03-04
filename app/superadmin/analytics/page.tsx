'use client';

import { useEffect, useState } from 'react';
import StatsCard from '@/components/superadmin/StatsCard';

interface AnalyticsData {
  overview: {
    totalPageViews: number;
    uniqueVisitors: number;
    avgTimeOnSite: number;
    activeNow: number;
  };
  topPages: Array<{ page: string; views: number; avgTime: number }>;
  dailyViews: Record<string, number>;
  hourlyViews: Record<number, number>;
  topReferrers: [string, number][];
  topButtons: [string, number][];
  activePages: Array<{ visitor_id: number; pagina: string; timestamp: string }>;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/superadmin/analytics?days=${days}`);
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
    setLoading(true);
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [days]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  const last30Days = Array.from({ length: Math.min(days, 30) }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (Math.min(days, 30) - 1 - i));
    return d.toISOString().split('T')[0];
  });

  const maxDailyViews = Math.max(...last30Days.map(d => data?.dailyViews?.[d] || 0), 1);
  const maxHourlyViews = Math.max(...Object.values(data?.hourlyViews || {}), 1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">📈 Analítica Web</h1>
          <p className="text-slate-500 mt-1">Comportamiento de los visitantes</p>
        </div>
        <select
          value={days}
          onChange={(e) => setDays(parseInt(e.target.value))}
          className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
        >
          <option value={7}>Últimos 7 días</option>
          <option value={14}>Últimos 14 días</option>
          <option value={30}>Últimos 30 días</option>
          <option value={90}>Últimos 90 días</option>
        </select>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Páginas vistas" value={data?.overview?.totalPageViews || 0} icon="👁️" />
        <StatsCard title="Visitantes únicos" value={data?.overview?.uniqueVisitors || 0} icon="👤" />
        <StatsCard
          title="Tiempo medio"
          value={data?.overview?.avgTimeOnSite ? `${data.overview.avgTimeOnSite}s` : '0s'}
          icon="⏱️"
        />
        <StatsCard
          title="Activos ahora"
          value={data?.overview?.activeNow || 0}
          icon="🟢"
          subtitle="Últimos 5 minutos"
        />
      </div>

      {/* Daily Chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Visitas diarias</h2>
        <div className="flex items-end gap-[2px] h-48">
          {last30Days.map((day) => {
            const count = data?.dailyViews?.[day] || 0;
            const height = (count / maxDailyViews) * 100;
            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] text-slate-400">{count > 0 ? count : ''}</span>
                <div
                  className="w-full bg-cyan-500 rounded-t hover:bg-cyan-400 transition-colors"
                  style={{ height: `${Math.max(height, 1)}%` }}
                  title={`${day}: ${count} visitas`}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-[9px] text-slate-400">
          <span>{last30Days[0]?.slice(5)}</span>
          <span>{last30Days[last30Days.length - 1]?.slice(5)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Distribution */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">🕐 Distribución horaria</h2>
          <div className="flex items-end gap-[2px] h-32">
            {Array.from({ length: 24 }, (_, h) => {
              const count = data?.hourlyViews?.[h] || 0;
              const height = (count / maxHourlyViews) * 100;
              return (
                <div key={h} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-indigo-400 rounded-t hover:bg-indigo-300"
                    style={{ height: `${Math.max(height, 1)}%` }}
                    title={`${h}:00 - ${count} visitas`}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-1 text-[9px] text-slate-400">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>23:00</span>
          </div>
        </div>

        {/* Top Referrers */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">🔗 Fuentes de tráfico</h2>
          <div className="space-y-2">
            {data?.topReferrers && data.topReferrers.length > 0 ? (
              data.topReferrers.map(([source, count]) => (
                <div key={source} className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-700">{source}</span>
                  <span className="text-sm font-semibold text-indigo-600">{count}</span>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-sm">Sin datos</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages with Avg Time */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">🔥 Páginas más visitadas</h2>
          <div className="space-y-2">
            {data?.topPages?.map((page, i) => (
              <div key={page.page} className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 w-5">#{i + 1}</span>
                  <span className="text-sm text-slate-700 truncate max-w-[200px]">{page.page}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-400">{page.avgTime > 0 ? `${page.avgTime}s` : '-'}</span>
                  <span className="text-sm font-semibold text-cyan-600">{page.views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Button Clicks */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">👆 Clics en botones</h2>
          <div className="space-y-2">
            {data?.topButtons && data.topButtons.length > 0 ? (
              data.topButtons.map(([btn, count]) => (
                <div key={btn} className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-700 truncate max-w-[250px]">{btn}</span>
                  <span className="text-sm font-semibold text-amber-600">{count}</span>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-sm">Sin datos de clics</p>
            )}
          </div>
        </div>
      </div>

      {/* Active Now */}
      {data?.activePages && data.activePages.length > 0 && (
        <div className="bg-white rounded-xl border border-green-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">🟢 Visitantes activos ahora</h2>
          <div className="space-y-2">
            {data.activePages.map((ap, i) => (
              <div key={i} className="flex items-center justify-between py-2 px-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-slate-700">Visitante #{ap.visitor_id}</span>
                </div>
                <span className="text-sm text-slate-500">{ap.pagina}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
