import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal | Neuriax - Automatización e IA',
  description: 'Información legal, privacidad y políticas de cookies.',
  robots: 'noindex, nofollow',
};

interface LegalLayoutProps {
  children: React.ReactNode;
  title: string;
  lastUpdated?: string;
  toc?: { id: string; label: string }[];
}

export default function LegalLayout({ children, title, lastUpdated, toc }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          {lastUpdated && (
            <p className="text-sm text-gray-500">
              Última actualización: <strong>{lastUpdated}</strong>
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          {toc && toc.length > 0 && (
            <aside className="lg:col-span-1">
              <div className="sticky top-20 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4 text-sm">Contenido</h3>
                <nav className="space-y-2">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-sm text-blue-600 hover:text-blue-800 transition-colors hover:underline"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Main Content */}
          <main className={`prose prose-sm prose-gray max-w-none ${toc && toc.length > 0 ? 'lg:col-span-3' : ''}`}>
            {children}
          </main>
        </div>

        {/* Footer info */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Este documento se proporciona únicamente a efectos informativos. No constituye asesoramiento legal. 
            Si tienes dudas sobre nuestras políticas, contáctanos en{' '}
            <a href="mailto:neuriaxx@gmail.com" className="text-blue-600 hover:text-blue-800">
              neuriaxx@gmail.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
