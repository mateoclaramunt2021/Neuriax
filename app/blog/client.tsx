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
}

export default function BlogPageClient({ posts }: { posts: BlogPost[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ['Automatización', 'IA', 'Web', 'SEO', 'Transformación Digital'];

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      {/* Hero */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Blog de Automatización e IA
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Artículos, tips y casos de éxito sobre automatización de procesos, inteligencia artificial y diseño web que convierte.
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
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid de Posts */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <div className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition cursor-pointer h-full flex flex-col border border-gray-800 hover:border-blue-500">
                {/* Imagen placeholder */}
                <div className="w-full h-48 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                  <div className="text-gray-500 text-center">
                    <div className="text-4xl mb-2">📝</div>
                    <div className="text-sm">{post.category}</div>
                  </div>
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
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 mt-20">
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-12 text-center border border-blue-700">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Nuestro equipo especializado en automatización e IA está listo para ayudarte.
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
