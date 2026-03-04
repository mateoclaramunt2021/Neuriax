'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CookiePreferencesModal from "./CookiePreferencesModal";
import LoginModal from "./superadmin/LoginModal";

type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

export default function Footer() {
  const [showCookiePreferences, setShowCookiePreferences] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
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
                  alt="Neuriax - Agencia de IA #1 en España"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">Neuriax</span>
                <p className="text-xs text-slate-500">Agencia de Inteligencia Artificial #1 en España</p>
              </div>
            </div>

            {/* Contacto rápido */}
            <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-500">
              <a href="tel:+34643045488" className="hover:text-cyan-400 transition-colors">
                +34 643 045 488
              </a>
              <a href="mailto:hola@neuriax.com" className="hover:text-cyan-400 transition-colors">
                hola@neuriax.com
              </a>
            </div>
          </div>

          {/* Service links - Internal linking para SEO */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
            <div>
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Servicios IA</h3>
              <ul className="space-y-2 text-xs text-slate-500">
                <li><Link href="/agencia-ia" className="hover:text-slate-900 transition-colors">Agencia de IA</Link></li>
                <li><Link href="/soluciones" className="hover:text-slate-900 transition-colors">Soluciones IA</Link></li>
                <li><Link href="/precios" className="hover:text-slate-900 transition-colors">Precios</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Sectores</h3>
              <ul className="space-y-2 text-xs text-slate-500">
                <li><Link href="/sectores" className="hover:text-slate-900 transition-colors">Todos los sectores</Link></li>
                <li><Link href="/landings/clinica" className="hover:text-slate-900 transition-colors">Clínicas</Link></li>
                <li><Link href="/landings/restaurante" className="hover:text-slate-900 transition-colors">Restaurantes</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Empresa</h3>
              <ul className="space-y-2 text-xs text-slate-500">
                <li><Link href="/quien-soy" className="hover:text-slate-900 transition-colors">Sobre Neuriax</Link></li>
                <li><Link href="/contacto" className="hover:text-slate-900 transition-colors">Contacto</Link></li>
                <li><Link href="/trabajo" className="hover:text-slate-900 transition-colors">Trabaja con nosotros</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Recursos</h3>
              <ul className="space-y-2 text-xs text-slate-500">
                <li><Link href="/webs" className="hover:text-slate-900 transition-colors">Webs profesionales</Link></li>
                <li><Link href="/landings" className="hover:text-slate-900 transition-colors">Casos de éxito</Link></li>
              </ul>
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
                {/* Hidden admin access */}
                <button
                  onClick={() => setShowAdminLogin(true)}
                  className="text-slate-300 hover:text-slate-400 transition-colors opacity-30 hover:opacity-60"
                  title=""
                  aria-label="Admin"
                >
                  🔒
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

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <LoginModal onClose={() => setShowAdminLogin(false)} />
      )}
    </>
  );
}
