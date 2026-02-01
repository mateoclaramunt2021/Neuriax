'use client';

import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";
import { useState } from "react";
import Link from "next/link";
import CookiePreferencesModal from "./CookiePreferencesModal";

export default function Footer() {
  const { t } = useTranslation();
  const [showCookiePreferences, setShowCookiePreferences] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const handleConfigureCookies = () => {
    const savedPreferences = localStorage.getItem('cookie_consent_v1');
    if (savedPreferences) {
      setShowCookiePreferences(true);
    } else {
      localStorage.removeItem('cookie_consent_v1');
      window.location.reload();
    }
  };

  const handleSavePreferences = (prefs: any) => {
    localStorage.setItem('cookie_consent_v1', JSON.stringify(prefs));
    setShowCookiePreferences(false);
  };

  return (
    <>
      <footer className="relative bg-gradient-to-b from-slate-950 via-black to-slate-950 text-white overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        {/* Main footer content */}
        <div className="relative z-10">
          {/* Top section - Brand + CTA */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Brand + Description */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative h-16 w-16">
                    <Image
                      src="/assets/images/ChatGPT_Image_10_ene_2026__17_49_11-removebg-preview.png"
                      alt="Neuriax"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                      Neuriax
                    </h3>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Automatización e IA</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
                  Soluciones digitales transformadoras: automatización inteligente, IA aplicada a negocio y páginas web que convierten resultados en crecimiento exponencial.
                </p>
              </div>

              {/* CTA Section */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20"
                >
                  Solicitar Demo
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <a
                  href="tel:+34640791041"
                  className="inline-flex items-center justify-center px-8 py-3 border border-slate-700 hover:border-cyan-500/50 bg-slate-900/50 hover:bg-slate-900 text-white font-semibold rounded-lg transition-all duration-300"
                >
                  📞 +34 640 791 041
                </a>
              </div>
            </div>
          </div>

          {/* Links sections */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              
              {/* Servicios */}
              <div className="group">
                <h4 className="text-sm font-bold uppercase tracking-widest text-gray-300 mb-6 flex items-center gap-2">
                  <span className="w-1 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></span>
                  Servicios
                </h4>
                <div className="space-y-3">
                  {[
                    { label: 'Soluciones', href: '/soluciones' },
                    { label: 'Páginas Web', href: '/webs' },
                    { label: 'Precios', href: '/precios' },
                    { label: 'Landings', href: '/landings' },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm flex items-center gap-2 group/link"
                    >
                      <span className="w-1 h-1 bg-cyan-500/0 group-hover/link:bg-cyan-500 rounded-full transition-colors"></span>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Empresa */}
              <div className="group">
                <h4 className="text-sm font-bold uppercase tracking-widest text-gray-300 mb-6 flex items-center gap-2">
                  <span className="w-1 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></span>
                  Empresa
                </h4>
                <div className="space-y-3">
                  {[
                    { label: 'Quiénes Somos', href: '/quien-soy' },
                    { label: 'Trabajo', href: '/trabajo' },
                    { label: 'Blog (Próximamente)', href: '#' },
                    { label: 'Contacto', href: '/contacto' },
                  ].map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm flex items-center gap-2 group/link"
                    >
                      <span className="w-1 h-1 bg-cyan-500/0 group-hover/link:bg-cyan-500 rounded-full transition-colors"></span>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Legal */}
              <div className="group">
                <h4 className="text-sm font-bold uppercase tracking-widest text-gray-300 mb-6 flex items-center gap-2">
                  <span className="w-1 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></span>
                  Legal & Privacidad
                </h4>
                <div className="space-y-3">
                  {[
                    { label: 'Aviso Legal', href: '/aviso-legal' },
                    { label: 'Política de Privacidad', href: '/politica-de-privacidad' },
                    { label: 'Política de Cookies', href: '/politica-de-cookies' },
                    { label: 'Condiciones Generales', href: '/condiciones-generales' },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm flex items-center gap-2 group/link"
                    >
                      <span className="w-1 h-1 bg-cyan-500/0 group-hover/link:bg-cyan-500 rounded-full transition-colors"></span>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contacto */}
              <div className="group">
                <h4 className="text-sm font-bold uppercase tracking-widest text-gray-300 mb-6 flex items-center gap-2">
                  <span className="w-1 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></span>
                  Contacto Directo
                </h4>
                <div className="space-y-4">
                  <a
                    href="mailto:info@neuriax.com"
                    className="flex items-center gap-3 text-sm group/contact hover:text-cyan-400 transition-colors"
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-slate-800 group-hover/contact:bg-cyan-500/20 rounded-lg transition-colors">
                      <span>✉</span>
                    </div>
                    <span className="text-gray-400 group-hover/contact:text-cyan-400">info@neuriax.com</span>
                  </a>
                  <a
                    href="tel:+34640791041"
                    className="flex items-center gap-3 text-sm group/contact hover:text-cyan-400 transition-colors"
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-slate-800 group-hover/contact:bg-cyan-500/20 rounded-lg transition-colors">
                      <span>📞</span>
                    </div>
                    <span className="text-gray-400 group-hover/contact:text-cyan-400">+34 640 791 041</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Social + Settings */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-slate-800/50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Social links */}
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-widest text-gray-500">Síguenos</span>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/neuriax.ia_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative p-2.5 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 text-gray-400 hover:text-cyan-400 transition-all duration-300"
                    onMouseEnter={() => setHoveredSocial('instagram')}
                    onMouseLeave={() => setHoveredSocial(null)}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/@neuriaxx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative p-2.5 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 text-gray-400 hover:text-cyan-400 transition-all duration-300"
                    onMouseEnter={() => setHoveredSocial('tiktok')}
                    onMouseLeave={() => setHoveredSocial(null)}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/neuriax"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative p-2.5 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 text-gray-400 hover:text-cyan-400 transition-all duration-300"
                    onMouseEnter={() => setHoveredSocial('linkedin')}
                    onMouseLeave={() => setHoveredSocial(null)}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Settings + Copyright */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <button
                  onClick={handleConfigureCookies}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-widest bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 text-gray-400 hover:text-cyan-400 rounded-lg transition-all duration-300 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                  </svg>
                  🍪 Cookies
                </button>
                <p className="text-xs text-gray-500">
                  © 2026 <span className="font-semibold text-gray-400">Neuriax</span>. Todos los derechos reservados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Preferences Modal */}
      {showCookiePreferences && (
        <CookiePreferencesModal
          preferences={JSON.parse(
            localStorage.getItem('cookie_consent_v1') || '{"necessary":true,"analytics":false,"marketing":false,"timestamp":""}'
          )}
          onSave={handleSavePreferences}
          onClose={() => setShowCookiePreferences(false)}
        />
      )}
    </>
  );
}