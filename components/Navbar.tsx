"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-12 w-12">
              <Image
                src="/assets/images/ChatGPT_Image_10_ene_2026__17_49_11-removebg-preview.png"
                alt="Neuriax"
                fill
                className="object-contain"
                priority
                sizes="48px"
              />
            </div>
            <span className="text-xl font-bold text-white">Neuriax</span>
          </Link>

          {/* CTA */}
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105"
          >
            <span className="hidden sm:inline">Contactar</span>
            <span className="sm:hidden">Contacto</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}
