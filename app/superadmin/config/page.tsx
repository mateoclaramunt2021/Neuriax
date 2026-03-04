'use client';

import { useEffect, useState } from 'react';

export default function ConfigPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [connections, setConnections] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/superadmin/config');
        if (res.ok) {
          const data = await res.json();
          setSettings(data.settings || {});
          setConnections(data.connections || {});
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/superadmin/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) alert('Configuración guardada');
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  const connectionLabels: Record<string, { name: string; icon: string }> = {
    supabase: { name: 'Supabase (Base de datos)', icon: '🗄️' },
    groq: { name: 'Groq AI (Chatbot IA)', icon: '🤖' },
    resend: { name: 'Resend (Email)', icon: '📧' },
    superadmin: { name: 'SuperAdmin Password', icon: '🔐' },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">⚙️ Configuración</h1>
        <p className="text-slate-500 mt-1">Ajustes generales del panel y la empresa</p>
      </div>

      {/* API Connections Status */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">🔗 Estado de conexiones</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(connectionLabels).map(([key, { name, icon }]) => (
            <div
              key={key}
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                connections[key]
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <span className="text-lg">{icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-700">{name}</p>
              </div>
              <span className={`w-3 h-3 rounded-full ${connections[key] ? 'bg-green-500' : 'bg-red-400'}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Company Settings */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">🏢 Datos de la empresa</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono</label>
            <input
              type="text"
              value={settings.company_phone || ''}
              onChange={(e) => updateSetting('company_phone', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={settings.company_email || ''}
              onChange={(e) => updateSetting('company_email', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">URL Calendly</label>
            <input
              type="url"
              value={settings.calendly_url || ''}
              onChange={(e) => updateSetting('calendly_url', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">URL del sitio</label>
            <input
              type="url"
              value={settings.site_url || ''}
              onChange={(e) => updateSetting('site_url', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
              placeholder="https://neuriax.com"
            />
          </div>
        </div>
      </div>

      {/* Chatbot Settings */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">🤖 Configuración del Chatbot Web</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Modelo IA</label>
            <select
              value={settings.chatbot_model || 'llama-3.3-70b-versatile'}
              onChange={(e) => updateSetting('chatbot_model', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
            >
              <option value="llama-3.3-70b-versatile">Llama 3.3 70B (recomendado)</option>
              <option value="llama-3.1-8b-instant">Llama 3.1 8B (rápido)</option>
              <option value="mixtral-8x7b-32768">Mixtral 8x7B</option>
              <option value="gemma2-9b-it">Gemma 2 9B</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Temperatura (creatividad)</label>
            <input
              type="number"
              min="0"
              max="2"
              step="0.1"
              value={settings.chatbot_temperature || '0.7'}
              onChange={(e) => updateSetting('chatbot_temperature', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nombre del chatbot</label>
          <input
            type="text"
            value={settings.chatbot_name || 'María'}
            onChange={(e) => updateSetting('chatbot_name', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Mensaje de bienvenida</label>
          <textarea
            value={settings.chatbot_greeting || ''}
            onChange={(e) => updateSetting('chatbot_greeting', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
            rows={2}
            placeholder="¡Hola! Soy María, la asistente de Neuriax..."
          />
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">🔔 Notificaciones</h2>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email para notificaciones de leads</label>
          <input
            type="email"
            value={settings.notification_email || ''}
            onChange={(e) => updateSetting('notification_email', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
            placeholder="mateo@neuriax.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Webhook URL (para integraciones)</label>
          <input
            type="url"
            value={settings.webhook_url || ''}
            onChange={(e) => updateSetting('webhook_url', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
            placeholder="https://hooks.zapier.com/..."
          />
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-slate-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-slate-800 disabled:opacity-50 transition-colors"
      >
        {saving ? 'Guardando...' : '💾 Guardar toda la configuración'}
      </button>
    </div>
  );
}
