'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CookiePreferencesModal from "./CookiePreferencesModal";

type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

export default function Footer() {
  const [showCookiePreferences, setShowCookiePreferences] = useState(false);
  const [currentPreferences, setCurrentPreferences] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    marketing: false,
    timestamp: new Date().toISOString(),
  });

  const handleConfigureCookies = () => {
    const savedPreferences = localStorage.getItem('cookie_consent_v1');
    if (savedPreferences) {
      try {
        setCurrentPreferences(JSON.parse(savedPreferences));
      } catch {
        // Use defaults
      }
      setShowCookiePreferences(true);
    } else {
      setShowCookiePreferences(true);
    }
  };

  const handleSavePreferences = (prefs: CookieConsent) => {
    localStorage.setItem('cookie_consent_v1', JSON.stringify(prefs));
    setShowCookiePreferences(false);
    window.location.reload();
  };

  return (
    <>
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Logo + Tagline */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-10">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10">
                <Image
                  src="/assets/images/ChatGPT_Image_10_ene_2026__17_49_11-removebg-preview.png"
                  alt="Neuriax"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">Neuriax</span>
                <p className="text-xs text-slate-500">Agentes de IA Personalizados</p>
              </div>
            </div>

            {/* Contacto rápido */}
            <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-500">
              <a href="tel:+34640791041" className="hover:text-cyan-400 transition-colors">
                +34 640 791 041
              </a>
              <a href="mailto:hola@neuriax.com" className="hover:text-cyan-400 transition-colors">
                hola@neuriax.com
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <p className="text-xs text-slate-500">
                © {new Date().getFullYear()} Neuriax. Todos los derechos reservados.
              </p>

              {/* Legal links */}
              <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500">
                <Link href="/aviso-legal" className="hover:text-slate-900 transition-colors">
                  Aviso Legal
                </Link>
                <Link href="/politica-de-privacidad" className="hover:text-slate-900 transition-colors">
                  Privacidad
                </Link>
                <Link href="/politica-de-cookies" className="hover:text-slate-900 transition-colors">
                  Cookies
                </Link>
                <button 
                  onClick={handleConfigureCookies}
                  className="hover:text-slate-900 transition-colors"
                >
                  Configurar Cookies
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Preferences Modal */}
      {showCookiePreferences && (
        <CookiePreferencesModal
          preferences={currentPreferences}
          onClose={() => setShowCookiePreferences(false)}
          onSave={handleSavePreferences}
        />
      )}
    </>
  );
}
