'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Cargar el componente 3D dinámicamente para evitar problemas SSR
const Neuri3D = dynamic(() => import('./Neuri3D'), { ssr: false });

export default function NeuroWelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Mostrar modal al cargar la página (sin localStorage para que siempre aparezca)
    setIsOpen(true);
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full border border-cyan-500/20 overflow-hidden transition-transform duration-300 ${
            isVisible ? 'scale-100' : 'scale-95'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header con botón cerrar */}
          <div className="flex justify-between items-center p-6 border-b border-cyan-500/10">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              ¡Hola! Soy Neuri 🧠
            </h1>
            <button
              onClick={handleClose}
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Cerrar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Contenido principal */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* 3D Character - 40% del ancho */}
              <div className="h-96 md:h-full md:min-h-96">
                <Neuri3D />
              </div>

              {/* Texto - 60% del ancho */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-3">
                    Bienvenido a Neuriax
                  </h2>
                  <p className="text-slate-300 leading-relaxed">
                    Soy <strong>Neuri</strong>, tu asistente de automatización. Estoy aquí para ayudarte a transformar tu negocio con soluciones inteligentes.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-cyan-400">¿Qué puedo ayudarte a conseguir?</h3>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="text-cyan-400">✨</span> Webs profesionales
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-cyan-400">⚙️</span> Automatización de procesos
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-cyan-400">🤖</span> Chatbots y IA
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-cyan-400">📊</span> Integración de sistemas
                    </li>
                  </ul>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 pt-4">
                  <Link
                    href="/contacto/formulario"
                    className="block w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-center"
                  >
                    Empezar Consulta
                  </Link>
                  <button
                    onClick={handleClose}
                    className="w-full border-2 border-slate-500 hover:border-cyan-400 text-slate-300 hover:text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    Explorar después
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer info */}
          <div className="px-8 py-4 bg-slate-800/50 border-t border-cyan-500/10 text-center text-sm text-slate-400">
            💡 <strong>Tip:</strong> Completa nuestro formulario y obtén <strong className="text-cyan-400">25% de descuento</strong> en servicios
          </div>
        </div>
      </div>
    </>
  );
}
