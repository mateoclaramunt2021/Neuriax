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
    title: '10 Procesos que Puedes Automatizar HOY en tu Negocio',
    description: 'Descubre los procesos más comunes que pueden automatizarse para ahorrar tiempo y costos en tu empresa. Guía práctica con ejemplos reales.',
    date: '2026-01-17',
    category: 'Automatización',
    readTime: '12 min',
    slug: '10-procesos-automatizar',
    image: '/assets/images/blog-automation.jpg',
  },
  {
    id: '2',
    title: 'IA para tu Negocio: Guía Práctica y Casos de Uso',
    description: 'Cómo implementar inteligencia artificial en tu empresa. Casos de éxito, herramientas recomendadas y presupuestos.',
    date: '2026-01-18',
    category: 'IA',
    readTime: '15 min',
    slug: 'ia-negocio-guia-practica',
    image: '/assets/images/blog-ia.jpg',
  },
  {
    id: '3',
    title: 'Páginas Web que Venden: Elementos Clave',
    description: 'Qué hace que una página web convierta visitantes en clientes. Diseño, UX, SEO y psicología de conversión.',
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
