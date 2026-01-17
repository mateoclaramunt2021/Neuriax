'use client';

import { useState, useEffect } from 'react';
import CookiePreferencesModal from './CookiePreferencesModal';
import { useTranslation } from '@/hooks/useTranslation';

type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

export default function CookieBanner() {
  const { t } = useTranslation();
  const [showBanner, setShowBanner] = useState(true);
  const [showPreferences, setShowPreferences] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [preferences, setPreferences] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    marketing: false,
    timestamp: new Date().toISOString(),
  });

  useEffect(() => {
    // Always show banner, but load saved preferences if available
    const savedPreferences = localStorage.getItem('cookie_consent_v1');
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences(parsed);
        // Load analytics/marketing scripts if already consented
        loadConsentedScripts(parsed);
      } catch (e) {
        console.error('Error parsing cookie preferences:', e);
      }
    }
    setIsLoading(false);
  }, []);

  const loadConsentedScripts = (consent: CookieConsent) => {
    // TODO: Integrar Google Analytics si está activo
    if (consent.analytics) {
      console.log('[COOKIES] Analytics scripts would load here');
      // Example: loadGoogleAnalytics();
    }

    // TODO: Integrar Meta Pixel / Facebook Ads si está activo
    if (consent.marketing) {
      console.log('[COOKIES] Marketing scripts would load here');
      // Example: loadMetaPixel();
    }
  };

  const handleAcceptAll = () => {
    const consent: CookieConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    saveCookiePreferences(consent);
  };

  const handleRejectAll = () => {
    const consent: CookieConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    saveCookiePreferences(consent);
  };

  const handleSavePreferences = (prefs: CookieConsent) => {
    saveCookiePreferences(prefs);
  };

  const saveCookiePreferences = (consent: CookieConsent) => {
    localStorage.setItem('cookie_consent_v1', JSON.stringify(consent));
    setPreferences(consent);
    setShowBanner(false);
    setShowPreferences(false);
    // Load scripts based on new preferences
    loadConsentedScripts(consent);
  };

  if (isLoading) return null;

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-700 shadow-2xl animate-in slide-in-from-bottom-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid md:grid-cols-3 gap-6 items-start md:items-center">
            <div className="md:col-span-2">
              <h3 className="text-white font-semibold text-lg mb-2">
                🍪 Gestión de Cookies y Consentimiento
              </h3>
              <p className="text-slate-300 text-sm mb-3">
                Utilizamos cookies técnicas (necesarias), analíticas y de marketing para mejorar tu experiencia. 
                Puedes configurar tus preferencias o leer nuestra{' '}
                <a href="/politica-de-cookies" className="text-cyan-400 hover:text-cyan-300 underline">
                  Política de Cookies
                </a>.
              </p>
            </div>
            <div className="flex gap-2 flex-col sm:flex-row">
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors font-medium text-sm whitespace-nowrap"
              >
                Rechazar todo
              </button>
              <button
                onClick={() => setShowPreferences(true)}
                className="px-4 py-2 bg-slate-700 text-slate-100 rounded-lg hover:bg-slate-600 transition-colors font-medium text-sm whitespace-nowrap"
              >
                Configurar
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all font-medium text-sm whitespace-nowrap"
              >
                Aceptar todo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      {showPreferences && (
        <CookiePreferencesModal
          preferences={preferences}
          onSave={handleSavePreferences}
          onClose={() => setShowPreferences(false)}
        />
      )}
    </>
  );
}
