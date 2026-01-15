"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-slate-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[72px]">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link 
                href="/" 
                className="inline-flex items-center justify-center rounded-lg hover:bg-slate-800/50 transition-colors p-1"
                aria-label="Neuriax - Ir a inicio"
              >
                <div className="relative h-8 w-8 sm:h-7 sm:w-7 md:h-8 md:w-8">
                  <Image
                    src="/chatgpt-logo.png"
                    alt="Neuriax Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-1">
              <Link href="/" className="text-slate-300 hover:text-cyan-400 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Inicio
              </Link>
              <Link href="/quien-soy" className="text-slate-300 hover:text-cyan-400 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Quiénes Somos
              </Link>
              <Link href="/soluciones" className="text-slate-300 hover:text-cyan-400 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Soluciones
              </Link>
              <Link href="/webs" className="text-slate-300 hover:text-cyan-400 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Webs
              </Link>
              <Link href="/trabajo" className="text-slate-300 hover:text-cyan-400 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Trabajo
              </Link>
              <Link href="/portfolio" className="text-slate-300 hover:text-cyan-400 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Portfolio
              </Link>
              <Link href="/sectores" className="text-slate-300 hover:text-cyan-400 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Sectores
              </Link>
              <Link href="/contacto" className="text-slate-300 hover:text-cyan-400 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Contacto
              </Link>
            </div>

          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors"
              aria-label="Abrir menú de navegación"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button
        </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="text-slate-300 hover:text-cyan-400 hover:bg-slate-800 block px-3 py-2 rounded-md text-base font-medium transition-colors">
                Inicio
              </Link>
              <Link href="/quien-soy" className="text-slate-300 hover:text-cyan-400 hover:bg-slate-800 block px-3 py-2 rounded-md text-base font-medium transition-colors">
                Quiénes Somos
              </Link>
              <Link href="/soluciones" className="text-slate-300 hover:text-cyan-400 hover:bg-slate-800 block px-3 py-2 rounded-md text-base font-medium transition-colors">
                Soluciones
              </Link>
              <Link href="/webs" className="text-slate-300 hover:text-cyan-400 hover:bg-slate-800 block px-3 py-2 rounded-md text-base font-medium transition-colors">
                Webs
              </Link>
              <Link href="/trabajo" className="text-slate-300 hover:text-cyan-400 hover:bg-slate-800 block px-3 py-2 rounded-md text-base font-medium transition-colors">
                Trabajo
              </Link>
              <Link href="/portfolio" className="text-slate-300 hover:text-cyan-400 hover:bg-slate-800 block px-3 py-2 rounded-md text-base font-medium transition-colors">
                Portfolio
              </Link>
              <Link href="/sectores" className="text-slate-300 hover:text-cyan-400 hover:bg-slate-800 block px-3 py-2 rounded-md text-base font-medium transition-colors">
                Sectores
              </Link>
              <Link href="/contacto" className="text-slate-300 hover:text-cyan-400 hover:bg-slate-800 block px-3 py-2 rounded-md text-base font-medium transition-colors">
                Contacto
              </Link>
            </div>
          </div>
        )}
    </nav>
  </>
  );
}