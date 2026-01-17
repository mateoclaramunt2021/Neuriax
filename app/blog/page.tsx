import Link from 'next/link';
import Image from 'next/image';
import BlogPageClient from './client';

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

const blogPosts: BlogPost[] = [
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

export const metadata = {
  title: 'Blog SEO | Neuriax | Automatización, IA y Páginas Web',
  description: 'Blog de artículos sobre automatización, inteligencia artificial, diseño web y transformación digital. Tips y casos de éxito.',
  keywords: 'blog, automatización, IA, páginas web, SEO, tips digitales',
};

export default function BlogPage() {
  return <BlogPageClient posts={blogPosts} />;
}
