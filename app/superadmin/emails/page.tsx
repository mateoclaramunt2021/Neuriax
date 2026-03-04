'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import LiveIndicator from '@/components/superadmin/LiveIndicator';

interface Email {
  id: number;
  recipient_email: string;
  recipient_name: string;
  subject: string;
  email_type: string;
  status: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

const typeLabels: Record<string, { label: string; icon: string }> = {
  contact_form: { label: 'Formulario', icon: '📋' },
  demo_request: { label: 'Demo', icon: '🎨' },
  lead_magnet: { label: 'Lead Magnet', icon: '🧲' },
  sequence: { label: 'Secuencia', icon: '📨' },
  manual: { label: 'Manual', icon: '✍️' },
  cv_application: { label: 'CV / Empleo', icon: '💼' },
};

const statusColors: Record<string, string> = {
  sent: 'bg-blue-100 text-blue-700',
  delivered: 'bg-green-100 text-green-700',
  opened: 'bg-emerald-100 text-emerald-700',
  bounced: 'bg-red-100 text-red-700',
  failed: 'bg-red-100 text-red-700',
};

export default function EmailsPage() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [typeStats, setTypeStats] = useState<Record<string, number>>({});
  const [total, setTotal] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const isFirstLoad = useRef(true);

  const fetchEmails = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (filterType !== 'all') params.set('type', filterType);
      const res = await fetch(`/api/superadmin/emails?${params}`);
      if (res.ok) {
        const data = await res.json();
        setEmails(data.emails);
        setTypeStats(data.typeStats);
        setTotal(data.total);
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      if (isFirstLoad.current) {
        setLoading(false);
        isFirstLoad.current = false;
      }
    }
  }, [search, filterType]);

  useEffect(() => {
    fetchEmails();
    const interval = setInterval(fetchEmails, 5000);
    return () => clearInterval(interval);
  }, [filterType, fetchEmails]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    fetchEmails();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">📧 Emails</h1>
          <p className="text-slate-500 mt-1">{total} emails enviados en total</p>
        </div>
        <LiveIndicator lastUpdated={lastUpdated} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {Object.entries(typeLabels).map(([key, { label, icon }]) => (
          <div
            key={key}
            onClick={() => { setFilterType(filterType === key ? 'all' : key); setLoading(true); }}
            className={`p-3 rounded-lg border cursor-pointer transition-all ${
              filterType === key ? 'border-cyan-500 bg-cyan-50' : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <p className="text-lg">{icon}</p>
            <p className="text-xl font-bold text-slate-900">{typeStats[key] || 0}</p>
            <p className="text-xs text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por email, nombre o asunto..."
          className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </form>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Tipo</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Destinatario</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Asunto</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Estado</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {emails.map((email) => (
                <tr key={email.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4">
                    <span className="text-lg">{typeLabels[email.email_type]?.icon || '📧'}</span>
                    <span className="ml-2 text-xs text-slate-500">{typeLabels[email.email_type]?.label || email.email_type}</span>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-slate-700">{email.recipient_name || '-'}</p>
                    <p className="text-xs text-slate-400">{email.recipient_email}</p>
                  </td>
                  <td className="py-3 px-4 text-slate-700 max-w-[250px] truncate">
                    {email.subject || '-'}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${statusColors[email.status] || 'bg-slate-100 text-slate-600'}`}>
                      {email.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-400">
                    {new Date(email.created_at).toLocaleString('es-ES')}
                  </td>
                </tr>
              ))}
              {emails.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">No se encontraron emails</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
