'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Client {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
  created_at: string;
  crm: {
    status: string;
    priority: string;
    value: number;
    source: string;
  };
}

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  nuevo: { label: 'Nuevo', color: 'text-cyan-700', bg: 'bg-cyan-50 border-cyan-200' },
  contactado: { label: 'Contactado', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
  negociacion: { label: 'En negociación', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  cliente: { label: 'Cliente', color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
  perdido: { label: 'Perdido', color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
};

const priorityConfig: Record<string, { label: string; dot: string }> = {
  baja: { label: 'Baja', dot: 'bg-slate-400' },
  normal: { label: 'Normal', dot: 'bg-blue-400' },
  alta: { label: 'Alta', dot: 'bg-amber-500' },
  urgente: { label: 'Urgente', dot: 'bg-red-500' },
};

export default function ClientesPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingClient, setEditingClient] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ status: '', priority: '', value: 0, notes: '' });

  const fetchClients = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (filterStatus !== 'all') params.set('status', filterStatus);
      const res = await fetch(`/api/superadmin/clients?${params}`);
      if (res.ok) {
        const data = await res.json();
        setClients(data.clients);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [filterStatus]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    fetchClients();
  };

  const handleSaveClient = async (clientId: number) => {
    try {
      const res = await fetch('/api/superadmin/clients', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactId: clientId,
          ...editForm,
        }),
      });
      if (res.ok) {
        setEditingClient(null);
        setEditForm({ status: '', priority: '', value: 0, notes: '' });
        fetchClients();
      }
    } catch (err) {
      console.error('Error guardando:', err);
    }
  };

  const exportCSV = () => {
    const headers = ['Nombre', 'Email', 'Teléfono', 'Estado', 'Prioridad', 'Valor', 'Fecha'];
    const rows = clients.map(c => [
      c.nombre,
      c.email,
      c.telefono || '',
      c.crm.status,
      c.crm.priority,
      c.crm.value,
      new Date(c.created_at).toLocaleDateString('es-ES'),
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clientes-neuriax-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">👥 Clientes (CRM)</h1>
          <p className="text-slate-500 mt-1">{clients.length} contactos</p>
        </div>
        <button
          onClick={exportCSV}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-800 transition-colors"
        >
          📥 Exportar CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <form onSubmit={handleSearch} className="flex-1 min-w-[200px]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, email o teléfono..."
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
          />
        </form>
        <div className="flex gap-2">
          {['all', ...Object.keys(statusConfig)].map((s) => (
            <button
              key={s}
              onClick={() => { setFilterStatus(s); setLoading(true); }}
              className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                filterStatus === s
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
              }`}
            >
              {s === 'all' ? 'Todos' : statusConfig[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Cliente</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Contacto</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Estado</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Prioridad</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Valor</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Fecha</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4">
                    <Link href={`/superadmin/clientes/${client.id}`} className="hover:text-cyan-600">
                      <p className="font-medium text-slate-900">{client.nombre}</p>
                      {client.mensaje && (
                        <p className="text-xs text-slate-400 truncate max-w-[200px]">{client.mensaje}</p>
                      )}
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-slate-700">{client.email}</p>
                    {client.telefono && <p className="text-xs text-slate-400">{client.telefono}</p>}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full border ${statusConfig[client.crm.status]?.bg || 'bg-slate-50 border-slate-200'} ${statusConfig[client.crm.status]?.color || 'text-slate-600'}`}>
                      {statusConfig[client.crm.status]?.label || client.crm.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${priorityConfig[client.crm.priority]?.dot || 'bg-slate-400'}`} />
                      <span className="text-xs text-slate-600">{priorityConfig[client.crm.priority]?.label || client.crm.priority}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-slate-700 font-medium">{client.crm.value ? `${client.crm.value}€` : '-'}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-xs">
                    {new Date(client.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => {
                        setEditingClient(editingClient === client.id ? null : client.id);
                        setEditForm({
                          status: client.crm.status,
                          priority: client.crm.priority,
                          value: client.crm.value,
                          notes: '',
                        });
                      }}
                      className="text-cyan-600 hover:text-cyan-800 text-xs font-medium"
                    >
                      ✏️ Editar
                    </button>
                  </td>
                </tr>
              ))}
              {clients.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No se encontraron clientes
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Editar cliente</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Estado</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                >
                  {Object.entries(statusConfig).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Prioridad</label>
                <select
                  value={editForm.priority}
                  onChange={(e) => setEditForm({ ...editForm, priority: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                >
                  {Object.entries(priorityConfig).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Valor (€)</label>
                <input
                  type="number"
                  value={editForm.value}
                  onChange={(e) => setEditForm({ ...editForm, value: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nota (opcional)</label>
                <textarea
                  value={editForm.notes}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  rows={3}
                  placeholder="Añadir una nota sobre este cliente..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleSaveClient(editingClient)}
                  className="flex-1 bg-cyan-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-cyan-700 transition-colors"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setEditingClient(null)}
                  className="flex-1 bg-slate-100 text-slate-700 py-2 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
