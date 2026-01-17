'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface BlogPostData {
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
  content: string;
}

const blogPostsData: Record<string, BlogPostData> = {
  '10-procesos-automatizar': {
    title: 'Automatización Estratégica: 10 Procesos de Alto Impacto para tu Empresa',
    description: 'Descubre cómo automatizar procesos críticos de tu negocio. Estrategias probadas, ROI mensurable, implementación en 30 días.',
    date: '2026-01-17',
    category: 'Automatización',
    readTime: '12 min',
    author: 'Mateo Claramunt',
    content: `# Automatización Estratégica: Transforma tu Operación en 30 Días

La diferencia entre empresas que crecen exponencialmente y las que crecen lentamente no es suerte. Es automatización.

## El ROI Real

**Promedio:** 730% ROI en Mes 1. Payback en 4 días.

## Los 10 Procesos Más Rentables

### 1. Procesamiento de Documentos & Datos
Ahorro: 40-80 horas/mes | ROI: 400-600%

### 2. Respuestas Automáticas
Ahorro: 40+ horas/mes | ROI: 300-400%

### 3. Creación de Reportes
Ahorro: 20 horas/mes | ROI: 300%

### 4. Recordatorios Automáticos
Ahorro: 10-15 horas/mes | ROI: 200-300%

### 5. Gestión de Redes Sociales
Ahorro: 5-10 horas/semana | ROI: 250%

### 6. Transcripción de Reuniones
Ahorro: 3-4 horas por reunión | ROI: 400%

### 7. Calificación de Leads
Ahorro: 50 horas/mes | ROI: 500-1000%

### 8. Sincronización de Datos
Ahorro: 15 horas/mes | ROI: 250%

### 9. Gestión de Inventario
Ahorro: 15 horas/mes | ROI: 200-350%

### 10. Envío de Facturas
Ahorro: 10 horas/mes | ROI: 300-400%

## Roadmap 30 Días

Semana 1: Elige el proceso de mayor impacto
Semana 2: Implementa con herramienta simple
Semana 3: Mide resultados
Semana 4: Escala al siguiente proceso

## Caso de Éxito

Restaurante con 50 empleados:
20 horas/semana automatizadas = €600/mes en costo recuperado
ROI: 3x en mes 1

[Agendar Consulta Gratuita](/contacto)`,
  },
  'ia-negocio-guia-practica': {
    title: 'IA para tu Negocio: Guía Práctica y Casos de Uso',
    description: 'Cómo implementar inteligencia artificial en tu empresa. Casos de éxito, ROI real 1600% en 90 días, herramientas y presupuestos.',
    date: '2026-01-18',
    category: 'IA',
    readTime: '15 min',
    author: 'Mateo Claramunt',
    content: `# IA para tu Negocio: Guía Práctica

La inteligencia artificial ya no es ciencia ficción. Es algo que puedes implementar HOY con resultados inmediatos.

## 5 Aplicaciones de IA que Funcionan YA

### 1. Chatbots Inteligentes
80% de preguntas resueltas automáticamente
Satisfacción del cliente: 95%
Ahorro: 30 horas/semana | Costo: €100-500/mes

### 2. Análisis Predictivo
Retención de clientes +40%
Revenue +20-30%
Predicciones 85% precisión

### 3. Personalización Automática
Conversión +25-40%
AOV +15%
Repeat purchases +30%

### 4. Procesamiento de Imágenes
1000 fotos en minutos vs horas
99% de precisión
Ahorro: 50 horas/mes

### 5. Generación de Contenido
100x más rápido
Consistencia del brand voice
Mejor SEO

## Roadmap 30 Días

Semana 1: Evaluar qué procesos mejorar
Semana 2-3: Implementar con herramienta
Semana 4: Lanzar y medir

## Herramientas por Presupuesto

Gratis: ChatGPT, Microsoft Copilot
€100-300/mes: Make.com, Zapier + OpenAI
€500-2000/mes: Soluciones personalizadas
€5000+/mes: Enterprise

## Caso Real: 1600% ROI en 90 Días

Consultora de seguros (25 empleados)
Desafío: 200+ consultas diarias

Resultados:
60% de chats resueltos automáticamente
Respuesta: 45 min → 2 min
Satisfacción: 87% → 96%
Retención: +35%
Revenue: +45%

Inversión: €5000 + €2000/mes
Payback: 8 días

[Agendar Consulta Gratuita](/contacto)`,
  },
  'paginas-web-que-venden': {
    title: 'Páginas Web Premium que Convierten: 7 Elementos Críticos',
    description: 'Análisis de qué hace que una web venda. 7 elementos probados, checklist, caso real +667% conversión.',
    date: '2026-01-19',
    category: 'Web',
    readTime: '14 min',
    author: 'Mateo Claramunt',
    content: `# Páginas Web Premium que Convierten

La diferencia entre una web que genera 5 leads/mes y una que genera 50 leads/mes no es magia.

Es diseño + psicología + estrategia.

## Estadísticas Reales

70% de visitantes se van sin hacer nada
25% que se quedan abandonan el carrito
Solo 2-3% convierten (promedio industria)

## Los 7 Elementos que Cierran Ventas

### 1. Propuesta de Valor Cristalina
Headline claro que comunica beneficio
No características, beneficios
Social proof inmediato

### 2. Estructura de Conversión
Atención → Interés → Deseo → Acción
CTA claro en 3-4 lugares

### 3. Social Proof
Testimonios (video > texto)
Números (clientes, años, projects)
Logos de clientes
Certificaciones

### 4. Copy que Vende
Problema-Solución
Beneficio-Prueba-Acción
Antes-Después

### 5. Diseño que Guía
Colores estratégicos
Tipografía legible
Espacios en blanco
Mobile-first
Velocidad <3 segundos

### 6. Urgencia & FOMO
Solo 3 cupos disponibles
Oferta termina en 48 horas
Únete a 1000+ empresas

### 7. CTA Específico
Bien: Agendar Consulta Gratuita
Mal: Contactar

## Checklist: ¿Tu Web Tiene los 7 Elementos?

Headline comunica beneficio claro
Estructura: Atención → Interés → Deseo → Acción
3+ elementos de social proof
Copy enfocado en beneficios
Diseño limpio
Elemento de urgencia
CTA específico

7/7 = Web que vende. 5/7 = Mejora inmediata. <5 = Rediseño urgente.

## Caso Real: +667% Conversión

Despacho legal (5 abogados)
Web Antes: 100 visitas/mes, 0 conversiones

Cambios:
1. Headline: Recupera tu dinero. 95% de casos ganados.
2. Testimonios en video
3. 20 años experiencia, 500+ casos
4. Copy enfocado en diferenciación
5. CTA claro: Agendar Consulta Gratuita
6. Oferta urgente: Consulta gratis solo en enero
7. Formulario optimizado

Resultados:
Conversión: 0% → 15.7% (+667%)
Leads mes 1: 0 → 10
Ingresos mes 1: €0 → €8,000
Ingresos mes 6: €18,000/mes

[Solicitar Auditoría Web Gratuita](/contacto)

Típicamente encontramos 3-5 cambios que multiplican conversiones 3-5x.`,
  },
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug && blogPostsData[slug]) {
      setPost(blogPostsData[slug]);
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <div className="text-white text-2xl">Cargando...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post no encontrado</h1>
          <Link href="/blog" className="text-blue-500 hover:text-blue-400">
            ← Volver al blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <article className="container mx-auto px-4 max-w-4xl">
        <Link href="/blog" className="text-blue-400 hover:text-blue-300 mb-8 inline-block text-sm font-medium">
          ← Volver al blog
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <span className="bg-blue-900 text-blue-200 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
              {post.category}
            </span>
            <span className="text-gray-500 text-sm">•</span>
            <span className="text-gray-500 text-sm">{post.readTime}</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {post.description}
          </p>

          <div className="flex items-center gap-4 text-gray-400 pb-8 border-b border-gray-800">
            <div>
              <div className="font-semibold text-white text-sm">{post.author}</div>
              <div className="text-xs text-gray-500">
                {new Date(post.date).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div
            className="text-gray-300 leading-relaxed space-y-6 text-lg"
            dangerouslySetInnerHTML={{
              __html: post.content
                .split('\n')
                .map((line) => {
                  if (line.startsWith('# ')) {
                    return `<h1 class="text-4xl font-bold text-white mt-10 mb-6">${line.replace('# ', '')}</h1>`;
                  } else if (line.startsWith('## ')) {
                    return `<h2 class="text-3xl font-bold text-white mt-8 mb-4">${line.replace('## ', '')}</h2>`;
                  } else if (line.startsWith('### ')) {
                    return `<h3 class="text-2xl font-bold text-blue-400 mt-6 mb-3">${line.replace('### ', '')}</h3>`;
                  } else if (line.startsWith('- [ ]')) {
                    return `<li class="ml-6 text-gray-300 list-none before:content-['☐'] before:mr-2">${line.replace('- [ ] ', '')}</li>`;
                  } else if (line.startsWith('- ')) {
                    return `<li class="ml-6 text-gray-300">${line.replace('- ', '')}</li>`;
                  } else if (line === '' || line.trim() === '') {
                    return '<div class="h-3"></div>';
                  } else {
                    return `<p class="text-gray-300">${line}</p>`;
                  }
                })
                .join(''),
            }}
          />
        </div>

        <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-10 border border-blue-700/50 mb-16">
          <h3 className="text-2xl font-bold text-white mb-4">¿Listo para transformar tu negocio?</h3>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Nuestro equipo especializado está listo para ayudarte a implementar estas estrategias.
          </p>
          <Link
            href="/contacto"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
          >
            Agendar Consulta Gratuita
          </Link>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white mb-8">Artículos relacionados</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {['ia-negocio-guia-practica', 'paginas-web-que-venden', '10-procesos-automatizar']
              .filter((s) => s !== slug)
              .map((relatedSlug) => (
                <Link
                  key={relatedSlug}
                  href={`/blog/${relatedSlug}`}
                  className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition border border-gray-800 hover:border-blue-500 group"
                >
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition">
                    {blogPostsData[relatedSlug]?.title || 'Post'}
                  </h4>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {blogPostsData[relatedSlug]?.description}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </article>
    </div>
  );
}
