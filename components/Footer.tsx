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
                  alt="Neuriax - Agencia de IA en España"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">Neuriax</span>
                <p className="text-xs text-slate-500">Agencia de Inteligencia Artificial #1 en España</p>
              </div>
            </div>

            {/* Contacto rápido + Redes sociales */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-slate-500">
              <a href="tel:+34643045488" className="hover:text-cyan-400 transition-colors">
                +34 643 045 488
              </a>
              <a href="mailto:hola@neuriax.com" className="hover:text-cyan-400 transition-colors">
                hola@neuriax.com
              </a>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/neuriax.ia_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-pink-500 transition-colors"
                  aria-label="Síguenos en Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/34643045488?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20los%20servicios%20de%20Neuriax"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-[#25D366] transition-colors"
                  aria-label="Escríbenos por WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
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
