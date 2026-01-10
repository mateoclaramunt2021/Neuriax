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
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo-neuriax.png"
                alt="Neuriax Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/" className="text-slate-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Inicio
              </Link>
              <Link href="/quien-soy" className="text-slate-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Quiénes Somos
              </Link>
              <Link href="/soluciones" className="text-slate-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Soluciones
              </Link>
              <Link href="/webs" className="text-slate-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Webs
              </Link>
              <Link href="/sectores" className="text-slate-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Sectores
              </Link>
              <Link href="/casos" className="text-slate-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Casos
              </Link>
              <Link href="/trabajo" className="text-slate-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Trabajo
              </Link>
              <Link href="/contacto" className="text-slate-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Contacto
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white hover:text-cyan-400 focus:outline-none focus:text-cyan-400"
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
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/95">
            <Link href="/" className="text-slate-300 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium">
              Inicio
            </Link>
            <Link href="/quien-soy" className="text-slate-300 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium">
              Quiénes Somos
            </Link>
            <Link href="/soluciones" className="text-slate-300 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium">
              Soluciones
            </Link>
            <Link href="/webs" className="text-slate-300 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium">
              Webs
            </Link>
            <Link href="/sectores" className="text-slate-300 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium">
              Sectores
            </Link>
            <Link href="/casos" className="text-slate-300 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium">
              Casos
            </Link>
            <Link href="/trabajo" className="text-slate-300 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium">
              Trabajo
            </Link>
            <Link href="/contacto" className="text-slate-300 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium">
              Contacto
            </Link>
          </div>
        </div>
      )}
    </nav>
  </>
  );
}