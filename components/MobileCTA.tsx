'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  
  // No mostrar en la página de formulario ni en páginas legales
  const hiddenPaths = [
    '/contacto/formulario',
    '/aviso-legal',
    '/politica-de-privacidad',
    '/politica-de-cookies',
    '/condiciones-generales'
  ];
  
  const shouldHide = hiddenPaths.some(path => pathname?.startsWith(path));

  useEffect(() => {
    // Mostrar después de un pequeño scroll para no ser intrusivo
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      }
    };

    // También mostrar después de 2 segundos aunque no haya scroll
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  if (shouldHide || !isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-gradient-to-t from-black via-black/95 to-transparent pb-4 pt-8">
      <Link
        href="/contacto/formulario"
        className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-cyan-500/30 transition-all duration-300 active:scale-[0.98]"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>Agendar llamada gratis</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
