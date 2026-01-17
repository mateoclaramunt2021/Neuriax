'use client';

import Link from 'next/link';
import { useState } from 'react';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  image?: string;
  slug: string;
  source_url?: string;
  source_name?: string;
}

export default function BlogPageClient({ posts }: { posts: BlogPost[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Debug: mostrar posts en consola
  console.log('Posts recibidos:', posts.length, posts);

  // Extraer categorías únicas de los posts
  const uniqueCategories = Array.from(new Set(posts.map(p => p.category)));

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      {/* Hero */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
              🔴 Actualizado diariamente
            </span>
            <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
              {posts.length} artículos
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Noticias de IA y Automatización
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Las últimas noticias sobre inteligencia artificial, machine learning y tecnología. Curadas automáticamente cada día.
          </p>
        </div>
      </section>

      {/* Filtros */}
      <section className="container mx-auto px-4 mb-12">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              selectedCategory === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Todos ({posts.length})
          </button>
          {uniqueCategories.map((cat) => {
            const count = posts.filter(p => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid de Posts */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link 
              key={post.id} 
              href={post.source_url || `/blog/${post.slug}`} 
              target={post.source_url ? '_blank' : '_self'}
              rel={post.source_url ? 'noopener noreferrer' : undefined}
            >
              <article className="bg-gray-900 rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300 cursor-pointer h-full flex flex-col border border-gray-800 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10">
                {/* Header con icono */}
                <div className="w-full h-40 bg-gradient-to-br from-blue-900/80 to-purple-900/80 flex items-center justify-center relative">
                  <div className="text-center">
                    <div className="text-5xl mb-2">
                      {post.category === 'IA' && '🤖'}
                      {post.category === 'Automatización' && '⚡'}
                      {post.category === 'Tecnología' && '💻'}
                      {post.category === 'Web' && '🌐'}
                      {post.category === 'Marketing' && '📈'}
                      {!['IA', 'Automatización', 'Tecnología', 'Web', 'Marketing'].includes(post.category) && '📰'}
                    </div>
                  </div>
                  {post.source_name && (
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-xs text-gray-300 px-2 py-1 rounded-full">
                      📍 {post.source_name}
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-blue-600/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
                    {post.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-800">
                    <span className="flex items-center gap-1">
                      📅 {new Date(post.date).toLocaleDateString('es-ES', { 
                        day: 'numeric', 
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      ⏱️ {post.readTime}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Mensaje si no hay posts */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No hay artículos</h3>
            <p className="text-gray-400">No se encontraron artículos en esta categoría.</p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 mt-20">
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-8 md:p-12 text-center border border-blue-700/50 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            ¿Quieres automatizar tu negocio con IA?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Nuestro equipo especializado en automatización e IA está listo para ayudarte a transformar tu empresa.
          </p>
          <Link
            href="/contacto"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
          >
            Solicitar Consulta Gratuita
          </Link>
        </div>
      </section>
    </div>
  );
}
