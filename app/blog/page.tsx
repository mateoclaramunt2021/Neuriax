import BlogPageClient from './client';
import { createClient } from '@supabase/supabase-js';

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

// Configuración directa de Supabase (seguro en el servidor)
const SUPABASE_URL = 'https://wfnaknuhwzmkriaetvtn.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmbmFrbnVod3pta3JpYWV0dnRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODA1OTMwMCwiZXhwIjoyMDgzNjM1MzAwfQ.CQ4Gm1k_eZ3Pn5TGQRbPblL_sRp9gahQubIUiytUdlE';

// Posts estáticos de respaldo (solo si Supabase falla completamente)
const staticPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Automatización Estratégica: 10 Procesos de Alto Impacto',
    description: 'Descubre cómo automatizar procesos críticos de tu negocio. Estrategias probadas, ROI mensurable (730% promedio), implementación en 30 días.',
    date: '2026-01-17',
    category: 'Automatización',
    readTime: '12 min',
    slug: '10-procesos-automatizar',
  },
  {
    id: '2',
    title: 'Inteligencia Artificial para Empresas: Implementación Práctica',
    description: 'Guía completa de IA empresarial. Casos de uso reales, ROI comprobado (1600%+ en 90 días), herramientas por presupuesto.',
    date: '2026-01-18',
    category: 'IA',
    readTime: '15 min',
    slug: 'ia-negocio-guia-practica',
  },
  {
    id: '3',
    title: 'Páginas Web Premium que Convierten: Los 7 Elementos Clave',
    description: 'Descubre qué hace que una web convierta 15-20% de visitantes. Diseño, copywriting, UX y psicología de conversión comprobada.',
    date: '2026-01-19',
    category: 'Web',
    readTime: '10 min',
    slug: 'paginas-web-que-venden',
  },
];

// Obtener posts desde Supabase
async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(50);
    
    if (error) {
      console.error('Supabase error:', error.message);
      return staticPosts;
    }
    
    if (!data || data.length === 0) {
      console.warn('No posts found in Supabase');
      return staticPosts;
    }
    
    // Transformar datos de Supabase al formato esperado
    const posts: BlogPost[] = data.map((post: any) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      date: post.created_at,
      category: post.category || 'IA',
      readTime: post.read_time || '5 min',
      slug: post.slug,
      image: post.image_url,
      source_url: post.source_url,
      source_name: post.source_name,
    }));
    
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return staticPosts;
  }
}

export const metadata = {
  title: 'Blog de IA y Automatización | Neuriax | Noticias Diarias',
  description: 'Las últimas noticias sobre inteligencia artificial, automatización, machine learning y transformación digital. Actualizado diariamente.',
  keywords: 'blog IA, noticias inteligencia artificial, automatización, machine learning, ChatGPT, OpenAI, tecnología',
};

// Revalidar cada 10 minutos para mostrar nuevas noticias rápidamente
export const revalidate = 600;

export default async function BlogPage() {
  const posts = await getBlogPosts();
  
  return <BlogPageClient posts={posts} />;
}
