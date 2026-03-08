"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

const NAV_LINKS = [
  { label: "Agencia IA", href: "/agencia-ia" },
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
            ? "bg-white/80 backdrop-blur-2xl backdrop-saturate-150 border-b border-slate-200 shadow-lg shadow-slate-900/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
<div className="flex justify-between items-center h-36 sm:h-40">

            {/* ─── Logo ─── */}
            <Link href="/" className="flex items-center group">
              <div className="relative h-[132px] w-[132px] sm:h-36 sm:w-36 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/assets/images/ChatGPT_Image_10_ene_2026__17_49_11-removebg-preview.png"
                  alt="Neuriax"
                  fill
                  className="object-contain"
                  priority
                  sizes="144px"
                />
              </div>
            </Link>

            {/* ─── Desktop nav ─── */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center gap-0.5 bg-slate-100 border border-slate-200 rounded-full px-1.5 py-1">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  const isExternal = link.href.startsWith("/");
                  const Tag = isExternal ? Link : "a";
                  return (
                    <Tag
                      key={link.href}
                      href={link.href}
                      className={`relative px-4 py-1.5 text-[13px] font-medium rounded-full transition-all duration-300 ${
                        isActive
                          ? "text-slate-900 bg-white shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {link.label}
                    </Tag>
                  );
                })}
              </div>
            </div>

            {/* ─── Desktop right ─── */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="https://ig.me/m/neuriaxx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[13px] font-medium text-slate-500 hover:text-[#DD2A7B] transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                Instagram
              </a>

              <div className="w-px h-5 bg-slate-200" />

              <a
                href="#contacto"
                className="group relative inline-flex items-center gap-2 px-5 py-2 text-[13px] font-semibold rounded-full transition-all duration-300 bg-slate-900 text-white hover:shadow-lg hover:shadow-slate-900/20 hover:scale-[1.02] active:scale-[0.98]"
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
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors"
              aria-label="Menu"
            >
              <div className="flex flex-col gap-[5px]">
                <span className={`block w-[18px] h-[1.5px] bg-slate-700 rounded-full transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
                <span className={`block w-[18px] h-[1.5px] bg-slate-700 rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0 scale-0" : ""}`} />
                <span className={`block w-[18px] h-[1.5px] bg-slate-700 rounded-full transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
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
        <div className="absolute inset-0 bg-white/95 backdrop-blur-3xl" onClick={closeMobile} />

        {/* Content */}
        <div className="relative flex flex-col h-full pt-24 pb-12 px-8">
          {/* Nav links */}
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link, i) => {
              const isActive = activeSection === link.href.replace("#", "");
              const isPage = link.href.startsWith("/");
              const Tag = isPage ? Link : "a";
              return (
                <Tag
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className={`flex items-center justify-between py-4 px-2 border-b border-slate-200 text-lg font-medium transition-all duration-500 ${
                    isActive ? "text-slate-900" : "text-slate-500"
                  }`}
                  style={{
                    transitionDelay: mobileOpen ? `${80 + i * 50}ms` : "0ms",
                    transform: mobileOpen ? "translateX(0)" : "translateX(-30px)",
                    opacity: mobileOpen ? 1 : 0,
                  }}
                >
                  <span>{link.label}</span>
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Tag>
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
              className="flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-4 px-6 rounded-2xl text-base transition-all hover:bg-slate-800"
            >
              Agendar llamada gratuita
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="https://ig.me/m/neuriaxx"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobile}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#F58529]/10 via-[#DD2A7B]/10 to-[#8134AF]/10 border border-[#DD2A7B]/20 text-[#DD2A7B] font-semibold py-4 px-6 rounded-2xl text-base transition-all hover:from-[#F58529]/20 hover:via-[#DD2A7B]/20 hover:to-[#8134AF]/20"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Escribir por Instagram
            </a>

            <p className="text-center text-[11px] text-slate-400 mt-2">
              Sin compromiso · Respuesta inmediata
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
