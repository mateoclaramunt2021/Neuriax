"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const BOOKING_URL = "/contacto";
const INSTAGRAM_URL = "https://instagram.com/neuriax.ia_";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50">
        {/* Premium Navbar */}
        <div className="bg-gradient-to-r from-slate-950 via-black to-slate-950 border-b border-blue-900/30 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-32">
              
              {/* Logo Section */}
              <Link 
                href="/" 
                className="flex items-center gap-3 group"
                aria-label="Neuriax"
              >
                <div className="relative h-48 w-48">
                  <Image
                    src="/assets/images/ChatGPT_Image_10_ene_2026__17_49_11-removebg-preview.png"
                    alt="Neuriax"
                    fill
                    className="object-contain"
                    priority
                    sizes="192px"
                  />
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {[
                  { href: "/", label: "Inicio", badge: "home" },
                  { href: "/soluciones", label: "Soluciones", badge: "core" },
                  { href: "/webs", label: "Webs", badge: "hot" },
                  { href: "/portfolio", label: "Portfolio", badge: "work" },
                  { href: "/sectores", label: "Sectores", badge: null },
                  { href: "/trabajo", label: "Trabajo", badge: null },
                  { href: "/quien-soy", label: "Quiénes Somos", badge: null },
                  { href: "/contacto", label: "Contacto", badge: "cta" },
                ].map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href}
                    className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 font-semibold relative group"
                  >
                    {item.label}
                    {item.badge && (
                      <span className="absolute -top-2 -right-1 text-xs bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-0.5 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {item.badge === "core" && "★"}
                        {item.badge === "home" && "●"}
                        {item.badge === "hot" && "🔥"}
                        {item.badge === "work" && "✓"}
                        {item.badge === "new" && "NEW"}
                        {item.badge === "cta" && "→"}
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-4">
                
                {/* Instagram */}
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-pink-500/40 transform hover:scale-105 font-semibold"
                  aria-label="Instagram"
                >
                  <span>Instagram</span>
                </a>

                {/* CTA Button - Desktop */}
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transform hover:scale-105"
                >
                  Llamada
                </a>

                {/* CTA Button - Mobile */}
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:hidden inline-flex px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold rounded-lg transition-all duration-300"
                >
                  Demo
                </a>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="lg:hidden inline-flex items-center justify-center w-10 h-10 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                  aria-label="Menú"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
              <div className="lg:hidden border-t border-blue-900/30 bg-gradient-to-r from-slate-950 via-black to-slate-950 py-4 space-y-2">
                {[
                  { href: "/", label: "Inicio" },
                  { href: "/soluciones", label: "Soluciones" },
                  { href: "/webs", label: "Webs" },
                  { href: "/portfolio", label: "Portfolio" },
                  { href: "/sectores", label: "Sectores" },
                  { href: "/trabajo", label: "Trabajo" },
                  { href: "/quien-soy", label: "Quiénes Somos" },
                  { href: "/contacto", label: "Contacto" },
                ].map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
