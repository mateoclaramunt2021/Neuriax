'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

interface CookiePreferencesModalProps {
  preferences: CookieConsent;
  onSave: (preferences: CookieConsent) => void;
  onClose: () => void;
}

export default function CookiePreferencesModal({
  preferences,
  onSave,
  onClose,
}: CookiePreferencesModalProps) {
  const { t } = useTranslation();
  const [localPrefs, setLocalPrefs] = useState<CookieConsent>(preferences);

  const handleToggle = (key: keyof Omit<CookieConsent, 'timestamp'>) => {
    if (key === 'necessary') return; // Necessary cookies cannot be disabled
    setLocalPrefs({
      ...localPrefs,
      [key]: !localPrefs[key],
    });
  };

  const handleSave = () => {
    onSave({
      ...localPrefs,
      timestamp: new Date().toISOString(),
    });
  };

  const handleAcceptAll = () => {
    onSave({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    });
  };

  const handleRejectAll = () => {
    onSave({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 border-b sticky top-0">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Configurar Cookies</h2>
            <button
              onClick={onClose}
              className="text-slate-300 hover:text-white transition-colors"
              aria-label="Cerrar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-slate-300 text-sm mt-2">
            Personaliza tu experiencia eligiendo quÃ© tipos de cookies deseas permitir.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Necessary Cookies */}
          <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">ðŸ”’ Cookies Necesarias</h3>
              <div className="relative inline-flex h-8 w-14 items-center rounded-full bg-blue-500">
                <input
                  type="checkbox"
                  checked={localPrefs.necessary}
                  disabled
                  className="sr-only"
                  aria-label="Cookies necesarias"
                />
                <span className="inline-flex h-7 w-7 transform rounded-full bg-white transition-all"></span>
              </div>
            </div>
            <p className="text-sm text-gray-700">
              Esenciales para el funcionamiento del sitio web. Se usan para autenticaciÃ³n, seguridad y preferencias bÃ¡sicas. 
              <strong> No se pueden desactivar.</strong>
            </p>
            <div className="mt-3 space-y-1 text-xs text-gray-600">
              <p>â€¢ session_id</p>
              <p>â€¢ csrf_token</p>
              <p>â€¢ user_preferences</p>
            </div>
          </div>

          {/* Analytics Cookies */}
          <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">ðŸ“Š Cookies AnalÃ­ticas</h3>
              <button
                onClick={() => handleToggle('analytics')}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  localPrefs.analytics ? 'bg-green-500' : 'bg-gray-300'
                }`}
                role="switch"
                aria-checked={localPrefs.analytics}
                aria-label="Cookies analÃ­ticas"
              >
                <span
                  className={`inline-flex h-7 w-7 transform rounded-full bg-white transition-all ${
                    localPrefs.analytics ? 'translate-x-7' : 'translate-x-0'
                  }`}
                ></span>
              </button>
            </div>
            <p className="text-sm text-gray-700">
              Nos ayudan a entender cÃ³mo usas el sitio para mejorar la experiencia. 
              {/* TODO: Especificar si se usa Google Analytics, Hotjar, etc. */}
            </p>
            <div className="mt-3 space-y-1 text-xs text-gray-600">
              <p>â€¢ [PENDIENTE: Nombre de herramienta analÃ­tica]</p>
              <p>â€¢ InformaciÃ³n de navegaciÃ³n y comportamiento</p>
            </div>
          </div>

          {/* Marketing Cookies */}
          <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">ðŸŽ¯ Cookies de Marketing</h3>
              <button
                onClick={() => handleToggle('marketing')}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  localPrefs.marketing ? 'bg-orange-500' : 'bg-gray-300'
                }`}
                role="switch"
                aria-checked={localPrefs.marketing}
                aria-label="Cookies de marketing"
              >
                <span
                  className={`inline-flex h-7 w-7 transform rounded-full bg-white transition-all ${
                    localPrefs.marketing ? 'translate-x-7' : 'translate-x-0'
                  }`}
                ></span>
              </button>
            </div>
            <p className="text-sm text-gray-700">
              Utilizadas para mostrar publicidad personalizada basada en tus intereses y actividad.
              {/* TODO: Especificar si se usa Meta Pixel, Google Ads, etc. */}
            </p>
            <div className="mt-3 space-y-1 text-xs text-gray-600">
              <p>â€¢ [PENDIENTE: Meta Pixel / Google Ads / Otras plataformas]</p>
              <p>â€¢ Cookies de redes sociales (si aplica)</p>
            </div>
          </div>

          {/* Info box */}
          <div className="bg-blue-100 border border-blue-300 rounded p-4">
            <p className="text-sm text-blue-900">
              <strong>ðŸ’¡ Tip:</strong> Puedes cambiar estas preferencias en cualquier momento desde el pie de pÃ¡gina 
              haciendo clic en "Configurar cookies".
            </p>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="bg-gray-100 p-6 flex gap-3 flex-col sm:flex-row justify-end border-t sticky bottom-0">
          <button
            onClick={handleRejectAll}
            className="px-6 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition-colors font-medium text-sm"
          >
            Rechazar todo
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors font-medium text-sm"
          >
            Aceptar todo
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all font-medium text-sm"
          >
            Guardar preferencias
          </button>
        </div>
      </div>
    </div>
  );
}

