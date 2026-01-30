'use client';

import { useState, useEffect } from 'react';

export default function LeadMagnetModal() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mostrar modal después de 2 segundos (casi inmediatamente) o cuando intenten salir
  useEffect(() => {
    // Mostrar después de tiempo
    const timer = setTimeout(() => {
      if (!localStorage.getItem('lead_magnet_dismissed')) {
        setShowModal(true);
      }
    }, 2000);

    // Mostrar si intenta salir (mouse sale de la ventana)
    const handleMouseLeave = () => {
      if (!localStorage.getItem('lead_magnet_dismissed') && !showModal) {
        setShowModal(true);
      }
    };

    // Para móviles: detectar intención de salir (scroll hacia arriba rápido)
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        // Si hace scroll muy rápido hacia arriba, probablemente intenta salir
        if (currentScrollY < lastScrollY - 50 && !localStorage.getItem('lead_magnet_dismissed') && !showModal) {
          setShowModal(true);
        }
        lastScrollY = currentScrollY;
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showModal]);

  const handleClose = () => {
    setShowModal(false);
    localStorage.setItem('lead_magnet_dismissed', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Error capturando email');
      }

      const data = await response.json();
      console.log('Email capturado exitosamente:', data);
      
      setIsSubmitted(true);
      localStorage.setItem('lead_magnet_dismissed', 'true');
      
      // Cerrar después de 3 segundos
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar tu solicitud. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-black rounded-2xl p-8 md:p-12 max-w-md w-full border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 animate-in fade-in zoom-in-95">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {!isSubmitted ? (
          <>
            {/* Emoji/Icon */}
            <div className="text-5xl mb-4 text-center">📋</div>

            {/* Headline */}
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 text-center">
              Guía Gratis: 7 Secretos de Automatización
            </h2>

            {/* Subheadline */}
            <p className="text-gray-400 text-center mb-6">
              Descarga cómo empresas están ahorrando <strong className="text-cyan-400">+10 horas semanales</strong> con automatización inteligente.
            </p>

            {/* Benefits */}
            <ul className="space-y-2 mb-8">
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <span className="w-5 h-5 flex items-center justify-center bg-cyan-500/20 rounded-full">
                  <span className="text-cyan-400 font-bold">✓</span>
                </span>
                Paso a paso para empezar
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <span className="w-5 h-5 flex items-center justify-center bg-cyan-500/20 rounded-full">
                  <span className="text-cyan-400 font-bold">✓</span>
                </span>
                Errores comunes a evitar
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <span className="w-5 h-5 flex items-center justify-center bg-cyan-500/20 rounded-full">
                  <span className="text-cyan-400 font-bold">✓</span>
                </span>
                Cuánto cuesta realmente
              </li>
            </ul>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu email"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Enviando...' : '🎁 Descargar Guía Gratis'}
              </button>
            </form>

            {/* Trust indicator */}
            <p className="text-xs text-gray-500 text-center mt-4">
              ✓ Sin spam • Solo contenido útil • Cancela cuando quieras
            </p>
          </>
        ) : (
          <>
            {/* Success message */}
            <div className="text-center">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-2xl font-bold text-white mb-2">¡Listo!</h3>
              <p className="text-gray-400 mb-6">
                Revisa tu email para descargar la guía. Estará en spam a veces, así que verifica.
              </p>
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="text-green-300 text-sm font-medium">Email recibido</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
