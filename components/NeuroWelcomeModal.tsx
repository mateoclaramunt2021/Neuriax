'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Importación dinámica para SSR safety
const Neuri3DProfessional = dynamic(
  () => import('./Neuri3D'),
  { ssr: false, loading: () => <div className="w-full h-full bg-gradient-to-br from-slate-900 to-blue-900 animate-pulse" /> }
);

export default function NeuroWelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      setTimeout(() => setIsVisible(true), 50);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  // Cerrar modal al hacer scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => {
      handleClose();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop con blur ultra profesional */}
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-lg transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Modal container */}
      <div
        className={`relative z-50 w-full max-w-5xl transition-all duration-300 max-h-[90vh] overflow-y-auto ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal principal */}
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          {/* Fondo con gradiente premium */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" />
          
          {/* Efecto glow */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

          {/* Borde luminoso */}
          <div className="absolute inset-0 rounded-3xl border border-cyan-500/20 pointer-events-none" />

          {/* Contenido relativo */}
          <div className="relative p-8 md:p-12 lg:p-16">
            {/* Botón cerrar */}
            <button
              onClick={handleClose}
              className="absolute top-8 right-8 text-gray-400 hover:text-white transition-all duration-200 hover:bg-white/10 p-2 rounded-full"
              aria-label="Cerrar modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Grid responsivo */}
            <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-16 items-center">
              
              {/* Columna 3D - Lado izquierdo */}
              <div className="order-2 lg:order-1 flex items-center justify-center">
                <div className="relative w-full aspect-square max-w-sm">
                  {/* Marco decorativo */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-2xl blur-xl opacity-75" />
                  <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 border border-blue-500/30">
                    <Neuri3DProfessional />
                  </div>
                </div>
              </div>

              {/* Columna contenido - Lado derecho */}
              <div className="order-1 lg:order-2 space-y-8">
                
                {/* Header */}
                <div className="space-y-3">
                  <div className="inline-block">
                    <span className="text-5xl">🧠</span>
                  </div>
                  <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                    Hola! Soy Neuri
                  </h1>
                  <p className="text-sm font-semibold text-blue-300/80 uppercase tracking-widest">
                    Tu asistente inteligente de transformación digital
                  </p>
                </div>

                {/* Descripción principal */}
                <div className="space-y-3">
                  <p className="text-lg text-gray-200 leading-relaxed">
                    Soy <span className="text-cyan-300 font-semibold">Neuri</span>, el asistente IA de <span className="text-cyan-300 font-semibold">Neuriax</span>. Mi misión es ayudarte a transformar tu negocio con soluciones inteligentes, automatización y tecnología de punta.
                  </p>
                </div>

                {/* Grid de capacidades - Estilo enterprise */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: '🌐', label: 'Webs Profesionales', desc: 'Soluciones web premium' },
                    { icon: '⚙️', label: 'Automatización', desc: 'Procesos inteligentes' },
                    { icon: '🤖', label: 'Chatbots IA', desc: 'Conversaciones naturales' },
                    { icon: '🔗', label: 'Integraciones', desc: 'Sistemas conectados' },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="group p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-cyan-500/20 cursor-default"
                    >
                      <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{item.icon}</div>
                      <p className="font-semibold text-sm text-gray-100">{item.label}</p>
                      <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons - Premium */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  <Link
                    href="/contacto/formulario"
                    onClick={handleClose}
                    className="group relative overflow-hidden rounded-xl px-8 py-4 font-bold text-white text-center transition-all duration-300 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 hover:from-cyan-400 hover:via-blue-400 hover:to-cyan-500 shadow-lg hover:shadow-cyan-500/50 hover:shadow-2xl transform hover:scale-105 active:scale-95"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <span>Empezar Consulta</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Link>

                  <button
                    onClick={handleClose}
                    className="group rounded-xl px-8 py-4 font-bold text-blue-300 text-center transition-all duration-300 border-2 border-blue-400/50 hover:bg-blue-500/10 hover:border-blue-300 hover:text-blue-200 active:scale-95"
                  >
                    Explorar después
                  </button>
                </div>

                {/* Consejo / Oferta especial */}
                <div className="p-5 rounded-xl bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-400/30 flex gap-3">
                  <span className="text-2xl flex-shrink-0">✨</span>
                  <div>
                    <p className="text-sm font-medium text-gray-100">Oferta especial para nuevos usuarios</p>
                    <p className="text-xs text-gray-300 mt-1">
                      Completa nuestro formulario y obtén <span className="text-amber-300 font-bold">25% de descuento</span> en todos nuestros servicios de automatización
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Brillo inferior decorativo */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        </div>
      </div>
    </div>
  );
}
