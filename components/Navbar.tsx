"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Resultados", href: "#resultados" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Track which section is visible */
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      {/* ─── Top accent line ─── */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />

      <nav
        className={`fixed top-[2px] w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "bg-[#08090c]/80 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/[0.04] shadow-2xl shadow-black/40"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-16 sm:h-[68px]">

            {/* ─── Logo ─── */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-9 w-9 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/assets/images/ChatGPT_Image_10_ene_2026__17_49_11-removebg-preview.png"
                  alt="Neuriax"
                  fill
                  className="object-contain"
                  priority
                  sizes="36px"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-bold text-white tracking-tight leading-none">
                  Neuriax
                </span>
                <span className="text-[10px] font-medium text-gray-600 tracking-[0.15em] uppercase leading-none mt-0.5">
                  AI Automation
                </span>
              </div>
            </Link>

            {/* ─── Desktop nav ─── */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center gap-0.5 bg-white/[0.03] border border-white/[0.06] rounded-full px-1.5 py-1">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`relative px-4 py-1.5 text-[13px] font-medium rounded-full transition-all duration-300 ${
                        isActive
                          ? "text-white bg-white/[0.08]"
                          : "text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* ─── Desktop right ─── */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="https://wa.me/34640791041?text=Hola%2C%20quiero%20info%20sobre%20agentes%20de%20voz%20IA"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[13px] font-medium text-gray-500 hover:text-[#25D366] transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>

              <div className="w-px h-5 bg-white/[0.08]" />

              <a
                href="#contacto"
                className="group relative inline-flex items-center gap-2 px-5 py-2 text-[13px] font-semibold rounded-full transition-all duration-300 bg-white text-black hover:shadow-lg hover:shadow-white/15 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Agendar llamada
                  <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
            </div>

            {/* ─── Mobile hamburger ─── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/[0.04] transition-colors"
              aria-label="Menu"
            >
              <div className="flex flex-col gap-[5px]">
                <span className={`block w-[18px] h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
                <span className={`block w-[18px] h-[1.5px] bg-white rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0 scale-0" : ""}`} />
                <span className={`block w-[18px] h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Mobile overlay ─── */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 lg:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl" onClick={closeMobile} />

        {/* Content */}
        <div className="relative flex flex-col h-full pt-24 pb-12 px-8">
          {/* Nav links */}
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link, i) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className={`flex items-center justify-between py-4 px-2 border-b border-white/[0.05] text-lg font-medium transition-all duration-500 ${
                    isActive ? "text-white" : "text-gray-500"
                  }`}
                  style={{
                    transitionDelay: mobileOpen ? `${80 + i * 50}ms` : "0ms",
                    transform: mobileOpen ? "translateX(0)" : "translateX(-30px)",
                    opacity: mobileOpen ? 1 : 0,
                  }}
                >
                  <span>{link.label}</span>
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              );
            })}
          </nav>

          {/* Bottom CTAs */}
          <div
            className="mt-auto flex flex-col gap-3"
            style={{
              transitionDelay: mobileOpen ? "350ms" : "0ms",
              transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
              opacity: mobileOpen ? 1 : 0,
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <a
              href="#contacto"
              onClick={closeMobile}
              className="flex items-center justify-center gap-2 bg-white text-black font-bold py-4 px-6 rounded-2xl text-base transition-all hover:bg-gray-100"
            >
              Agendar llamada gratuita
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="https://wa.me/34640791041?text=Hola%2C%20quiero%20info%20sobre%20agentes%20de%20voz%20IA"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobile}
              className="flex items-center justify-center gap-2 bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] font-semibold py-4 px-6 rounded-2xl text-base transition-all hover:bg-[#25D366]/20"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Escribir por WhatsApp
            </a>

            <p className="text-center text-[11px] text-gray-700 mt-2">
              Sin compromiso · Respuesta inmediata
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
