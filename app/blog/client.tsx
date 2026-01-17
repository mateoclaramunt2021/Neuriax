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

// Componente de Anuncio (preparado para AdSense)
function AdBanner({ slot, format = 'horizontal' }: { slot: string; format?: 'horizontal' | 'vertical' | 'rectangle' }) {
  // Cuando tengas AdSense aprobado, reemplaza esto con el código real
  // Por ahora muestra un placeholder
  const isAdSenseReady = false; // Cambiar a true cuando tengas AdSense
  
  if (isAdSenseReady) {
    return (
      <div className="ad-container my-8">
        {/* Aquí irá el código de AdSense */}
        {/* <ins className="adsbygoogle" 
             style={{ display: 'block' }}
             data-ad-client="ca-pub-XXXXXXXXXX"
             data-ad-slot={slot}
             data-ad-format="auto"
             data-full-width-responsive="true"></ins> */}
      </div>
    );
  }
  
  // Placeholder mientras no tienes AdSense
  return (
    <div className={`bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-lg my-8 flex items-center justify-center ${
      format === 'horizontal' ? 'h-24' : format === 'rectangle' ? 'h-64' : 'h-96'
    }`}>
      <div className="text-center text-gray-500 text-sm">
        <div className="text-2xl mb-1">📢</div>
        <span>Espacio Publicitario</span>
      </div>
    </div>
  );
}

export default function BlogPageClient({ posts }: { posts: BlogPost[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ['IA', 'Automatización', 'Tecnología', 'Web', 'Marketing'];

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      {/* Hero */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
              🔴 Actualizado diariamente
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Noticias de IA y Automatización
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Las últimas noticias sobre inteligencia artificial, machine learning y tecnología. Curadas automáticamente cada día.
          </p>
        </div>
      </section>

      {/* Banner Anuncio Top */}
      <section className="container mx-auto px-4">
        <AdBanner slot="top-banner" format="horizontal" />
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
          {categories.map((cat) => {
            const count = posts.filter(p => p.category === cat).length;
            if (count === 0) return null;
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
          {filteredPosts.map((post, index) => (
            <>
              <Link key={post.id} href={post.source_url || `/blog/${post.slug}`} target={post.source_url ? '_blank' : '_self'}>
                <div className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition cursor-pointer h-full flex flex-col border border-gray-800 hover:border-blue-500">
                  {/* Imagen placeholder */}
                  <div className="w-full h-48 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center relative">
                    <div className="text-gray-500 text-center">
                      <div className="text-4xl mb-2">
                        {post.category === 'IA' && '🤖'}
                        {post.category === 'Automatización' && '⚡'}
                        {post.category === 'Tecnología' && '💻'}
                        {post.category === 'Web' && '🌐'}
                        {post.category === 'Marketing' && '📈'}
                        {!['IA', 'Automatización', 'Tecnología', 'Web', 'Marketing'].includes(post.category) && '📝'}
                      </div>
                      <div className="text-sm">{post.category}</div>
                    </div>
                    {post.source_name && (
                      <div className="absolute bottom-2 right-2 bg-black/70 text-xs text-gray-400 px-2 py-1 rounded">
                        {post.source_name}
                      </div>
                    )}
                  </div>

                  {/* Contenido */}
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-blue-500 text-sm font-medium mb-2">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
                      {post.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-800">
                      <span>{new Date(post.date).toLocaleDateString('es-ES')}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
              
              {/* Insertar anuncio cada 6 posts */}
              {(index + 1) % 6 === 0 && index < filteredPosts.length - 1 && (
                <div key={`ad-${index}`} className="md:col-span-2 lg:col-span-3">
                  <AdBanner slot={`mid-content-${index}`} format="horizontal" />
                </div>
              )}
            </>
          ))}
        </div>
      </section>

      {/* Banner Anuncio Bottom */}
      <section className="container mx-auto px-4 mt-12">
        <AdBanner slot="bottom-banner" format="rectangle" />
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 mt-12">
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-12 text-center border border-blue-700">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Quieres automatizar tu negocio con IA?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Nuestro equipo especializado en automatización e IA está listo para ayudarte a transformar tu empresa.
          </p>
          <Link
            href="/contacto"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            Solicitar Consulta Gratuita
          </Link>
        </div>
      </section>
    </div>
  );
}
