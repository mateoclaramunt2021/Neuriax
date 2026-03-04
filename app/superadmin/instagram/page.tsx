'use client';

import { useEffect, useState } from 'react';

interface InstagramConfig {
  bot_enabled: boolean;
  access_token?: string;
  instagram_account_id?: string;
  auto_reply_enabled: boolean;
  auto_reply_message: string;
}

export default function InstagramPage() {
  const [config, setConfig] = useState<InstagramConfig | null>(null);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/superadmin/instagram');
        if (res.ok) {
          const data = await res.json();
          setConfig(data.config);
          setConnected(data.connected);
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
    if (!config) return;
    setSaving(true);
    try {
      const res = await fetch('/api/superadmin/instagram', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      if (res.ok) alert('Configuración guardada');
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">📸 Instagram</h1>
          <p className="text-slate-500 mt-1">Integración y automatización de Instagram</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-red-400'}`} />
          <span className="text-sm text-slate-600">{connected ? 'Conectado' : 'No conectado'}</span>
        </div>
      </div>

      {/* Connection Status */}
      <div className={`rounded-xl border p-6 ${connected ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
        <h3 className="font-semibold text-lg mb-2">
          {connected ? '✅ Instagram conectado' : '⚠️ Instagram no conectado'}
        </h3>
        <p className="text-sm text-slate-600 mb-4">
          {connected
            ? 'Tu cuenta de Instagram está vinculada. Los DMs automáticos están disponibles.'
            : 'Necesitas conectar tu cuenta de Instagram mediante la API de Meta para habilitar las funciones de automatización.'
          }
        </p>
        {!connected && (
          <div className="bg-white rounded-lg p-4 border border-amber-200">
            <h4 className="font-medium text-slate-700 mb-2">Pasos para conectar:</h4>
            <ol className="text-sm text-slate-600 space-y-1 list-decimal list-inside">
              <li>Crea una app en <a href="https://developers.facebook.com" target="_blank" rel="noopener" className="text-cyan-600 hover:underline">developers.facebook.com</a></li>
              <li>Habilita el producto &quot;Instagram Graph API&quot;</li>
              <li>Genera un token de acceso de larga duración</li>
              <li>Introduce el token y el ID de cuenta abajo</li>
            </ol>
          </div>
        )}
      </div>

      {/* Config */}
      {config && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          <h3 className="text-lg font-semibold text-slate-900">Configuración</h3>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Token de acceso (Instagram API)</label>
            <input
              type="password"
              value={config.access_token || ''}
              onChange={(e) => setConfig({ ...config, access_token: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
              placeholder="Tu token de acceso de Instagram"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">ID de cuenta de Instagram</label>
            <input
              type="text"
              value={config.instagram_account_id || ''}
              onChange={(e) => setConfig({ ...config, instagram_account_id: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
              placeholder="ID numérico de tu cuenta"
            />
          </div>

          <div className="pt-4 border-t border-slate-200">
            <h4 className="font-medium text-slate-700 mb-4">Automatización de DMs</h4>

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-slate-600">Respuesta automática a DMs</span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.auto_reply_enabled}
                  onChange={(e) => setConfig({ ...config, auto_reply_enabled: e.target.checked })}
                  className="sr-only"
                />
                <div className={`relative w-10 h-6 rounded-full transition-colors ${config.auto_reply_enabled ? 'bg-pink-500' : 'bg-slate-300'}`}>
                  <div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${config.auto_reply_enabled ? 'translate-x-5' : 'translate-x-1'}`} />
                </div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Mensaje de respuesta automática</label>
              <textarea
                value={config.auto_reply_message}
                onChange={(e) => setConfig({ ...config, auto_reply_message: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-slate-600">Bot IA para DMs</span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.bot_enabled}
                  onChange={(e) => setConfig({ ...config, bot_enabled: e.target.checked })}
                  className="sr-only"
                />
                <div className={`relative w-10 h-6 rounded-full transition-colors ${config.bot_enabled ? 'bg-pink-500' : 'bg-slate-300'}`}>
                  <div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${config.bot_enabled ? 'translate-x-5' : 'translate-x-1'}`} />
                </div>
              </label>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Cuando está activo, el bot IA responderá mensajes usando el mismo modelo que el chatbot web.
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition-all"
          >
            {saving ? 'Guardando...' : '💾 Guardar configuración'}
          </button>
        </div>
      )}
    </div>
  );
}
