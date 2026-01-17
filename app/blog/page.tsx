import Link from 'next/link';
import Image from 'next/image';
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

// Posts estáticos de respaldo
const staticPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Automatización Estratégica: 10 Procesos de Alto Impacto',
    description: 'Descubre cómo automatizar procesos críticos de tu negocio. Estrategias probadas, ROI mensurable (730% promedio), implementación en 30 días.',
    date: '2026-01-17',
    category: 'Automatización',
    readTime: '12 min',
    slug: '10-procesos-automatizar',
    image: '/assets/images/blog-automation.jpg',
  },
  {
    id: '2',
    title: 'Inteligencia Artificial para Empresas: Implementación Práctica',
    description: 'Guía completa de IA empresarial. Casos de uso reales, ROI comprobado (1600%+ en 90 días), herramientas por presupuesto.',
    date: '2026-01-18',
    category: 'IA',
    readTime: '15 min',
    slug: 'ia-negocio-guia-practica',
    image: '/assets/images/blog-ia.jpg',
  },
  {
    id: '3',
    title: 'Páginas Web Premium que Convierten: Los 7 Elementos Clave',
    description: 'Descubre qué hace que una web convierta 15-20% de visitantes. Diseño, copywriting, UX y psicología de conversión comprobada.',
    date: '2026-01-19',
    category: 'Web',
    readTime: '10 min',
    slug: 'paginas-web-que-venden',
    image: '/assets/images/blog-web.jpg',
  },
];

// Obtener posts desde Supabase
async function getBlogPosts(): Promise<BlogPost[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase not configured, using static posts');
    return staticPosts;
  }
  
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(50);
    
    if (error || !data || data.length === 0) {
      console.warn('No posts from Supabase, using static posts');
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

// Revalidar cada hora para mostrar nuevas noticias
export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getBlogPosts();
  
  return <BlogPageClient posts={posts} />;
}
