"use client";

import { useState, useEffect, useCallback } from "react";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (e.clientY <= 5 && !dismissed) {
        // Check if already shown today
        const today = new Date().toDateString();
        const lastShown = localStorage.getItem("exitIntentLastShown");
        if (lastShown === today) return;

        localStorage.setItem("exitIntentLastShown", today);
        setShow(true);
      }
    },
    [dismissed]
  );

  useEffect(() => {
    // Only add listener after 10 seconds on page
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 10000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseLeave]);

  const handleClose = () => {
    setShow(false);
    setDismissed(true);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
      />
      {/* Modal */}
      <div className="relative bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl animate-fade-in-up z-10">
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Icon */}
        <div className="w-16 h-16 bg-cyan-500/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>

        <h3 className="text-2xl font-bold text-white mb-3">
          ¿Te vas sin tu análisis gratuito?
        </h3>
        <p className="text-gray-400 mb-6 leading-relaxed">
          Te hago un <span className="text-cyan-400 font-semibold">análisis gratuito y personalizado</span> de qué procesos puedes automatizar en tu negocio. Sin compromiso, en 15 minutos.
        </p>

        <div className="space-y-3">
          <a
            href="#contacto"
            onClick={handleClose}
            className="w-full inline-flex items-center justify-center gap-2 bg-white text-black font-bold py-3.5 px-6 rounded-xl text-base transition-all duration-300 hover:bg-gray-100 hover:scale-[1.02]"
          >
            Quiero mi análisis gratis
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="https://wa.me/34640791041?text=Hola%2C%20quiero%20un%20análisis%20gratuito%20de%20automatización"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366]/15 text-[#25D366] font-semibold py-3 px-6 rounded-xl text-sm border border-[#25D366]/20 transition-all duration-300 hover:bg-[#25D366]/25"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Prefiero WhatsApp
          </a>
        </div>

        <p className="text-xs text-gray-600 mt-4">Sin spam. Cancela cuando quieras.</p>
      </div>
    </div>
  );
}
