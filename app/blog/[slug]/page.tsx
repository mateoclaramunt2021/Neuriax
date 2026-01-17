import { createClient } from '@supabase/supabase-js';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Supabase con credenciales directas (seguro en servidor)
const SUPABASE_URL = 'https://wfnaknuhwzmkriaetvtn.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmbmFrbnVod3pta3JpYWV0dnRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODA1OTMwMCwiZXhwIjoyMDgzNjM1MzAwfQ.CQ4Gm1k_eZ3Pn5TGQRbPblL_sRp9gahQubIUiytUdlE';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string | null;
  date: string;
  category: string;
  readTime: string;
  slug: string;
  image: string | null;
  source_url: string | null;
  source_name: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generar metadata dinámica para SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (!post) {
    return {
      title: 'Post no encontrado | Neuriax',
    };
  }
  
  return {
    title: `${post.title} | Neuriax Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

// Generar rutas estáticas para todos los posts
export async function generateStaticParams() {
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug');
  
  return (posts || []).map((post) => ({
    slug: post.slug,
  }));
}

export const revalidate = 600; // Revalidar cada 10 minutos

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error || !post) {
    notFound();
  }
  
  // Normalizar campos que pueden tener diferentes nombres
  const postData = {
    ...post,
    date: post.created_at,
    readTime: post.read_time || '5 min',
    image: post.image_url,
  };
  
  const formattedDate = new Date(postData.date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-16">
      <article className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-blue-400 transition-colors">
                Inicio
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog" className="hover:text-blue-400 transition-colors">
                Blog
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-300 truncate max-w-[200px]">{postData.title}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {postData.category}
            </span>
            <span className="text-gray-400 text-sm">{postData.readTime} de lectura</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {postData.title}
          </h1>
          
          <div className="flex items-center gap-4 text-gray-400">
            <time dateTime={postData.date}>{formattedDate}</time>
            {postData.source_name && (
              <>
                <span>•</span>
                <span>Fuente: {postData.source_name}</span>
              </>
            )}
          </div>
        </header>

        {/* Imagen destacada */}
        {postData.image && (
          <div className="mb-10 rounded-xl overflow-hidden">
            <img 
              src={postData.image} 
              alt={postData.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Contenido */}
        <div className="prose prose-lg prose-invert max-w-none">
          {post.content ? (
            <div 
              className="space-y-6 text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <div className="space-y-6">
              <p className="text-xl text-gray-300 leading-relaxed">
                {postData.description}
              </p>
              
              <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-xl p-6 mt-8">
                <h3 className="text-xl font-semibold mb-3 text-blue-400">
                  📰 Resumen de la noticia
                </h3>
                <p className="text-gray-300 mb-4">
                  Esta noticia ha sido curada por Neuriax para mantenerte al día con las últimas 
                  tendencias en Inteligencia Artificial.
                </p>
                {post.source_url && (
                  <a 
                    href={post.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Leer artículo completo
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Ad placeholder */}
        <div className="my-10 bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center">
          <p className="text-gray-500 text-sm">Espacio publicitario</p>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            ¿Quieres automatizar tu negocio con IA?
          </h3>
          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
            En Neuriax ayudamos a empresas a implementar soluciones de inteligencia artificial 
            que aumentan la productividad y reducen costes.
          </p>
          <Link 
            href="/contacto"
            className="inline-block bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            Solicitar consulta gratuita
          </Link>
        </div>

        {/* Volver */}
        <div className="mt-10 text-center">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al blog
          </Link>
        </div>
      </article>
    </main>
  );
}
