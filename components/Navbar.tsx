"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Resultados", href: "#resultados" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/70 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[72px]">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative h-10 w-10">
                <Image
                  src="/assets/images/ChatGPT_Image_10_ene_2026__17_49_11-removebg-preview.png"
                  alt="Neuriax"
                  fill
                  className="object-contain"
                  priority
                  sizes="40px"
                />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Neuriax</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-[13px] font-medium text-gray-400 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/[0.04]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://wa.me/34640791041?text=Hola%2C%20quiero%20info%20sobre%20agentes%20de%20voz%20IA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-medium text-gray-400 hover:text-white transition-colors px-3 py-2"
              >
                WhatsApp
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-full transition-all duration-300 hover:bg-gray-100 hover:scale-[1.03] hover:shadow-lg hover:shadow-white/10"
              >
                Agendar llamada
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center"
              aria-label="Menu"
            >
              <div className="flex flex-col gap-[5px]">
                <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
                <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? "opacity-0 scale-0" : ""}`} />
                <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl transition-all duration-500 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 px-6">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-semibold text-white hover:text-cyan-400 transition-all duration-300"
              style={{
                transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms",
                transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                opacity: mobileOpen ? 1 : 0,
              }}
            >
              {link.label}
            </a>
          ))}
          <div className="w-12 h-px bg-slate-800 my-2" />
          <a
            href="#contacto"
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center gap-2 bg-white text-black font-bold py-3.5 px-8 rounded-full text-lg"
            style={{
              transitionDelay: mobileOpen ? "300ms" : "0ms",
              transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
              opacity: mobileOpen ? 1 : 0,
              transition: "all 0.3s ease",
            }}
          >
            Agendar llamada
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
