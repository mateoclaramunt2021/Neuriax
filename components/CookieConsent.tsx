'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si el usuario ya aceptó cookies
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowConsent(true);
    }
    setIsLoading(false);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsent-date', new Date().toISOString());
    setShowConsent(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setShowConsent(false);
  };

  if (isLoading || !showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-700 shadow-2xl animate-in slide-in-from-bottom-5">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <h3 className="text-white font-semibold text-lg mb-2">
              🍪 Preferencias de Cookies
            </h3>
            <p className="text-slate-300 text-sm">
              Usamos cookies para recordar tus preferencias (tema, idioma) y mejorar tu experiencia. Tus datos se guardan localmente en tu navegador.
            </p>
          </div>
          <div className="flex gap-3 flex-col sm:flex-row">
            <button
              onClick={handleReject}
              className="px-6 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors font-medium text-sm"
            >
              Rechazar
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all font-medium text-sm"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
