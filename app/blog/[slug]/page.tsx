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
    title: '10 Procesos que Puedes Automatizar HOY en tu Negocio',
    description: 'Descubre los 10 procesos más comunes que pueden automatizarse para ahorrar tiempo, reducir errores y aumentar productividad.',
    date: '2026-01-17',
    category: 'Automatización',
    readTime: '12 min',
    author: 'Mateo Claramunt',
    content: `
# 10 Procesos que Puedes Automatizar HOY en tu Negocio

La automatización de procesos es uno de los cambios más transformadores que puede experimentar una empresa. No es necesario esperar años ni invertir millones. Aquí te presentamos 10 procesos que puedes automatizar hoy mismo, con resultados visibles en cuestión de días.

## 1. Procesamiento de Facturas

**El Problema:** Tu equipo pasa horas digitando facturas, extrayendo datos, clasificando documentos.

**La Solución:** Herramientas como Make, Zapier o Power Automate pueden leer facturas, extraer datos automáticamente e ingresarlos en tu contabilidad.

**El Impacto:** 
- Ahorro de 10-20 horas/semana
- Reducción de errores del 99%
- Procesamiento 100x más rápido

**ROI:** Se paga en la primera semana.

## 2. Respuestas a Correos Comunes

**El Problema:** Tu equipo responde el mismo correo 50 veces al mes ("¿Cuál es tu horario?", "¿Cuáles son tus precios?", etc.)

**La Solución:** Chatbots inteligentes con IA que responden automáticamente, clasifican y derivan cuando es necesario.

**El Impacto:**
- 40+ horas/mes ahorradas
- Respuestas 24/7
- Mayor satisfacción del cliente

**Costo:** Desde €50/mes

## 3. Creación de Reportes

**El Problema:** Cada lunes tu equipo pasa 4 horas compilando datos, creando gráficos y escribiendo reportes.

**La Solución:** Automatizar la recopilación de datos y generar reportes automáticamente cada mañana.

**El Impacto:**
- 20 horas/mes ahorradas
- Reportes siempre al día
- Más tiempo para análisis estratégico

**Herramienta:** Google Sheets + Zapier o Power BI

## 4. Envío de Recordatorios

**El Problema:** Los clientes olvidan sus citas. Las tareas se pierden en el caos.

**La Solución:** Automatizar recordatorios por email, SMS o WhatsApp 24 horas antes.

**El Impacto:**
- 30% reducción en no-shows
- 100% menos Follow-ups manuales
- Mejor experiencia del cliente

**Coste:** Gratis o €20/mes

## 5. Gestión de Redes Sociales

**El Problema:** Necesitas postear en 5 redes sociales, todos los días, a diferentes horarios.

**La Solución:** Programar posts automáticamente a horas óptimas.

**El Impacto:**
- Consistencia 100%
- 5 horas/semana ahorradas
- Mejor alcance (posts en horas pico)

**Herramientas:** Buffer, Later, Hootsuite

## 6. Transcripción de Reuniones

**El Problema:** Transcribir una reunión de 1 hora tarda 3-4 horas.

**La Solución:** IA transcribe automáticamente mientras hablas.

**El Impacto:**
- Transcripción en minutos vs horas
- Resúmenes automáticos
- Documentación completa

**Herramientas:** Otter.ai, Fireflies, Microsoft Copilot

## 7. Clasificación de Leads

**El Problema:** Recibes 100 leads/mes pero 80% no son calificados.

**La Solución:** IA analiza y clasifica automáticamente según criterios que defines.

**El Impacto:**
- Tu equipo enfoca solo en leads HOT
- 300% más conversiones
- Ahorro de 50 horas/mes

**ROI:** Típicamente 500-1000% en mes 1

## 8. Actualización de Bases de Datos

**El Problema:** Múltiples bases de datos desincronizadas (CRM, contabilidad, sitio web).

**La Solución:** Sincronizar automáticamente cuando cambia un dato.

**El Impacto:**
- Datos siempre actualizados
- 0 errores de sincronización
- Decisiones basadas en datos correctos

**Herramientas:** Zapier, Make, Integromat

## 9. Gestión de Inventario

**El Problema:** Monitorear inventario manualmente es tedioso y propenso a errores.

**La Solución:** Alertas automáticas cuando stock es bajo, reorden automática.

**El Impacto:**
- Nunca más stockouts
- 15 horas/mes ahorradas
- Mejor cash flow

**Costo:** €30-100/mes

## 10. Envío de Invoices y Recordatorios de Pago

**El Problema:** Muchas invoices no se envían a tiempo, pagos se retrasan.

**La Solución:** Envío automático de invoices, recordatorios automáticos antes del vencimiento, alertas si no se paga.

**El Impacto:**
- Pagos 20 días más rápido (promedio)
- Reducción de deuda morosa 60%
- Cash flow mejorado

**ROI:** Recuperas dinero pendiente rápidamente

---

## ¿Por dónde empezar?

**Semana 1:** Elige el proceso que te ahorre MÁS tiempo. Probablemente "Procesamiento de Facturas" o "Creación de Reportes".

**Semana 2:** Implementa con una herramienta simple (Zapier, Make, o contrata a un especialista como Neuriax).

**Semana 3:** Mide el impacto. ¿Cuántas horas ahorraste? ¿Cuántos errores evitaste?

**Semana 4:** Automatiza el siguiente proceso.

---

## Caso de Éxito Real

**Empresa:** Restaurante con 50 empleados  
**Antes:** 20 horas/semana en tareas administrativas  
**Proceso automatizado:** Pedidos online, recordatorios, facturas, reportes

**Resultado:**
- 15 horas/semana ahorradas = €600/mes en costo de personal
- 0 errores en pedidos (reducción del 100%)
- Clientes más satisfechos (respuestas automáticas 24/7)
- Revenue +30% (mejor gestión de pedidos)

**Inversión:** €500/mes en automatización  
**ROI:** 3x en mes 1

---

## Siguiente Paso

¿Listo para automatizar? Nuestro equipo puede ayudarte a identificar qué procesos automatizar y implementarlos en tu empresa.

**[Solicitar Consulta Gratuita](/contacto)**

*Típicamente la automatización se paga a sí misma en 2-4 semanas.*
    `,
  },
  'ia-negocio-guia-practica': {
    title: 'IA para tu Negocio: Guía Práctica y Casos de Uso',
    description: 'Cómo implementar inteligencia artificial en tu empresa. Guía paso a paso con herramientas, casos de éxito y presupuestos.',
    date: '2026-01-18',
    category: 'IA',
    readTime: '15 min',
    author: 'Mateo Claramunt',
    content: `
# IA para tu Negocio: Guía Práctica y Casos de Uso

La inteligencia artificial ya no es ciencia ficción. Es algo que puedes implementar HOY en tu negocio con resultados inmediatos.

## ¿Qué es IA para Negocios?

IA empresarial = Máquinas que aprenden a hacer tareas mejor que los humanos.

**Ejemplos:**
- Chatbots que entienden contexto
- Predicción de qué cliente se va
- Recomendaciones personalizadas
- Análisis de sentimiento
- Detección de fraude

## 5 Aplicaciones de IA que Funcionan YA

### 1. Chatbots Inteligentes (Atención al Cliente 24/7)

**Problema:** Tu equipo no puede responder todos los chats/emails.

**Solución IA:** Chatbot que entiende y responde automáticamente.

**Resultado:**
- 80% de preguntas resueltas automáticamente
- Satisfacción del cliente: 95%
- Ahorro: 30 horas/semana

**Implementación:** 2 semanas  
**Costo:** €100-500/mes

### 2. Análisis Predictivo (Prever el Futuro)

**Problema:** No sabes qué cliente se va a ir, qué producto va a vender, cuándo.

**Solución IA:** Analizar datos históricos para predecir con 85% de precisión.

**Resultado:**
- Retención de clientes +40%
- Inventario optimizado
- Revenue +20-30%

**Casos:**
- Clínicas: Predecir pacientes que no van a volver
- Retail: Qué producto va a ser trending
- SaaS: Qué cliente va a cancelar

### 3. Personalización Automática

**Problema:** No puedes personalizar la experiencia para cada cliente.

**Solución IA:** Cada cliente ve recomendaciones únicas.

**Resultado:**
- Conversión +25-40%
- AOV (ticket promedio) +15%
- Repeat purchases +30%

**Ejemplos:**
- Netflix: Qué serie recomendarte
- Amazon: Qué producto mostrarte
- Tu web: Qué servicio ofrecerte

### 4. Procesamiento de Imágenes (Visión por Computadora)

**Problema:** Revisar manualmente 1000 fotos toma horas.

**Solución IA:** Analizar, clasificar, etiquetar automáticamente.

**Resultado:**
- Procesar 1000 fotos en minutos vs horas
- 99% de precisión
- Ahorro: 50 horas/mes

**Casos:**
- Restaurantes: Clasificar fotos de platos
- Retail: Análisis de productos
- Salud: Análisis de radiografías

### 5. Generación de Contenido

**Problema:** Crear 10 descripción de productos toma 2 horas.

**Solución IA:** Generar automáticamente en minutos.

**Resultado:**
- 100x más rápido
- Consistencia del brand voice
- Mejor SEO

**Casos:**
- Generador de descripciones de productos
- Copywriting de emails
- Títulos de posts
- Meta descriptions

---

## Roadmap: Cómo Implementar IA en 30 Días

### Semana 1: Evaluar
- [ ] Qué procesos pueden mejorarse con IA?
- [ ] Cuál daría mayor ROI?
- [ ] Qué datos necesitamos?

### Semana 2-3: Implementar
- [ ] Elegir herramienta
- [ ] Integrar con sistemas existentes
- [ ] Testing y refinamiento

### Semana 4: Lanzar
- [ ] Entrenamiento del equipo
- [ ] Monitoreo de resultados
- [ ] Escalamiento

---

## Herramientas IA Recomendadas (por presupuesto)

### Gratis/Freemium
- ChatGPT (Contenido, ideas, brainstorming)
- Microsoft Copilot (Integrado con Office)
- Google Bard (Análisis de datos)

### €100-300/mes
- Make.com (Automatización + IA)
- Zapier + OpenAI (Flujos inteligentes)
- Copy.ai (Generación de contenido)

### €500-2000/mes
- Soluciones personalizadas (Chatbots custom)
- Integración de APIs de IA
- Modelos entrenados con tus datos

### €5000+/mes
- Soluciones enterprise
- Desarrollo de modelos propios
- Consultoría estratégica

---

## ROI Típico de IA

| Caso | Inversión | Retorno Mes 1 | Payback |
|------|-----------|---------------|---------|
| Chatbot | €300 | €1,500 | < 1 semana |
| Análisis Predictivo | €2,000 | €10,000 | 1 semana |
| Personalización | €1,500 | €5,000 | 2 semanas |
| Procesamiento de imágenes | €1,000 | €4,000 | 10 días |

---

## Preguntas Frecuentes

**¿Es complicado implementar IA?**  
No. Herramientas como Make o Zapier lo hacen visual y simple.

**¿Necesito datos masivos?**  
No. Puedes empezar con 100-1000 registros.

**¿Cuánto tarda?**  
2-4 semanas típicamente.

**¿Es seguro?**  
Sí. Datos encriptados, GDPR compliant.

---

## Siguiente Paso

¿Listo para implementar IA en tu negocio?

**[Solicitar Consulta Gratuita](/contacto)**

*Típicamente el ROI es positivo en la primera semana.*
    `,
  },
  'paginas-web-que-venden': {
    title: 'Páginas Web que Venden: Elementos Clave para Conversión',
    description: 'Qué elementos hacen que una página web convierta visitantes en clientes. Diseño, UX, copy y psicología de conversión.',
    date: '2026-01-19',
    category: 'Web',
    readTime: '10 min',
    author: 'Mateo Claramunt',
    content: `
# Páginas Web que Venden: Elementos Clave para Conversión

Una página web promedio convierte el 1-2% de visitantes. Las buenas convierten el 5-10%. Las excelentes, el 15%+.

¿La diferencia? 7 elementos específicos que te enseñaremos aquí.

## 1. Propuesta de Valor Clara (En los primeros 3 segundos)


**El Problema:** El visitante NO entiende qué haces en 3 segundos → Se va.

**La Solución:**
\`\`\`
"Automatización e IA para Empresas" es vago.

"Reduce costos operacionales 30-40% en 4 semanas" es claro.
\`\`\`

**Elemento:** H1 + Subtítulo en la sección Hero

**Fórmula:**
- Qué haces
- Para quién
- Resultado cuantificable

## 2. CTA (Call To Action) Estratégica

**El Problema:** 90% de las webs tienen CTAs débiles o confusas.

**Ejemplos MALOS:**
- "Enviar" (genérico)
- "Hacer clic aquí" (invisible)
- "Más información" (vago)

**Ejemplos BUENOS:**
- "Agendar Llamada Gratuita" (específico)
- "Ver Caso de Éxito" (beneficio claro)
- "Solicitar Presupuesto" (acción clara)

**Elementos:**
- Color contrastante (rojo, azul, verde)
- Texto orientado a beneficio (no a acción)
- Ubicación: Arriba, mitad, abajo
- Botón, no link
- Padding generoso (fácil de clickear)

## 3. Prueba Social (Testimonios, Casos de Éxito, Números)

**El Problema:** El visitante no confía. "¿Y si es estafa?"

**La Solución:**
- Testimonios de clientes reales
- Fotos + nombre + empresa
- Número de clientes atendidos
- Awards/certificaciones
- Casos de éxito cuantitativos

**Ejemplos:**
- "42 empresas convierten con nosotros" ✅
- "Satisfacción del cliente: 4.9/5" ✅
- "Ahorro promedio: €2,500/mes" ✅

**Ubicación:** Después del primer CTA o en sidebar

## 4. Formularios Cortos (Max 3 campos)

**El Problema:** Formularios de 10 campos tienen 90% de abandono.

**Formulario Óptimo:**
- Nombre
- Email
- Teléfono

Eso. Nada más.

**NO incluyas:**
- Empresa (puedes preguntar después)
- Presupuesto (conversación)
- Múltiples opciones

**Resultado:**
- Tasa de conversión: 8-12%
- vs formularios largos: 1-2%

## 5. Diseño Visual Limpio (No Abrumar)

**El Problema:** Demasiada información = Parálisis = No conversión.

**Elementos de un buen diseño:**
- ✅ Máximo 3 colores principales
- ✅ Tipografía clara (2 fonts max)
- ✅ Mucho espacio en blanco
- ✅ Una columna = fácil de leer
- ✅ Sin animaciones distrayentes
- ✅ Imágenes de calidad (no stock photos genéricos)

**NO:**
- ❌ 50 colores diferentes
- ❌ Texto pequeño
- ❌ Fondos con patrón (ilegible)
- ❌ Autoplay videos/audio
- ❌ Pop-ups invasivos

## 6. Velocidad (Menos de 2 segundos)

**El Problema:** Cada segundo que tarda, pierdes 7% de conversión.

**Indicadores:**
- LCP (Largest Contentful Paint): < 2.5s ✅
- FID (First Input Delay): < 100ms ✅
- CLS (Cumulative Layout Shift): < 0.1 ✅

**Cómo mejorar:**
- Optimizar imágenes (WebP, AVIF)
- Lazy loading
- Minificar CSS/JS
- Usar CDN

**Herramientas de test:**
- PageSpeed Insights (Google)
- GTmetrix
- Lighthouse

## 7. SEO On-Page (Ser Encontrado)

**El Problema:** Convertir bien no sirve si nadie te encuentra.

**Elementos:**
- H1 con keyword principal
- Meta description con CTA
- Internal links relevantes
- Alt text en imágenes
- Schema markup

**Resultado:**
- Posicionamiento en Google
- Tráfico orgánico consistente
- Conversiones automáticas

---

## Checklist: ¿Tu Web Convierte?

- [ ] ¿Propuesta de valor clara en 3 segundos?
- [ ] ¿CTA estratégica visible?
- [ ] ¿Testimonios/prueba social?
- [ ] ¿Formulario de max 3 campos?
- [ ] ¿Diseño limpio?
- [ ] ¿Carga en < 2 segundos?
- [ ] ¿Optimizada para SEO?

**Puntuación:**
- 7/7 = Web excelente (15%+ conversión)
- 5-6/7 = Web buena (5-10% conversión)
- 3-4/7 = Web promedio (2-5% conversión)
- < 3/7 = Web débil (< 2% conversión)

---

## Caso de Éxito Real

**Antes:**
- Web genérica
- Formulario de 8 campos
- Conversión: 1.2%

**Mejoras implementadas:**
- H1 clara: "Páginas Web que Venden"
- Formulario reducido a 3 campos
- Testimonios destacados
- CTA optimizada
- Velocidad mejorada (2.1s → 1.8s)
- SEO on-page

**Resultado:**
- Conversión: 9.5%
- Mismo tráfico → 8x más leads
- Revenue: +€15,000/mes

---

## Siguiente Paso

¿Tu web está convirtiendo?

**[Auditoría Web Gratuita](/contacto)**

*Típicamente encontramos 3-5 cambios que multiplican conversiones por 3-5x.*
    `,
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
      <article className="container mx-auto px-4 max-w-3xl">
        {/* Navegación */}
        <Link href="/blog" className="text-blue-500 hover:text-blue-400 mb-8 inline-block">
          ← Volver al blog
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-blue-900 text-blue-200 px-3 py-1 rounded text-sm font-medium">
              {post.category}
            </span>
            <span className="text-gray-500 text-sm">{post.readTime}</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {post.title}
          </h1>

          <p className="text-xl text-gray-300 mb-8">
            {post.description}
          </p>

          {/* Autor y fecha */}
          <div className="flex items-center gap-4 text-gray-400 pb-8 border-b border-gray-800">
            <div>
              <div className="font-medium text-white">{post.author}</div>
              <div className="text-sm">
                {new Date(post.date).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="prose prose-invert max-w-none mb-12">
          <div
            className="text-gray-300 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{
              __html: post.content
                .split('\n')
                .map((line) => {
                  if (line.startsWith('# ')) {
                    return `<h1 class="text-4xl font-bold text-white mt-8 mb-4">${line.replace('# ', '')}</h1>`;
                  } else if (line.startsWith('## ')) {
                    return `<h2 class="text-3xl font-bold text-white mt-6 mb-3">${line.replace('## ', '')}</h2>`;
                  } else if (line.startsWith('### ')) {
                    return `<h3 class="text-2xl font-bold text-white mt-5 mb-2">${line.replace('### ', '')}</h3>`;
                  } else if (line.startsWith('**')) {
                    return `<p class="font-bold text-white">${line}</p>`;
                  } else if (line.startsWith('- ')) {
                    return `<li class="ml-4">${line.replace('- ', '')}</li>`;
                  } else if (line.startsWith('| ')) {
                    return `<div class="overflow-x-auto"><table class="w-full border border-gray-700 mt-4 mb-4"><tr>${line
                      .split('|')
                      .slice(1, -1)
                      .map((cell) => `<td class="border border-gray-700 p-2">${cell.trim()}</td>`)
                      .join('')}</tr></table></div>`;
                  } else if (line === '') {
                    return '<div class="h-2"></div>';
                  } else {
                    return `<p>${line}</p>`;
                  }
                })
                .join(''),
            }}
          />
        </div>

        {/* CTA Final */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-8 border border-blue-700">
          <h3 className="text-2xl font-bold text-white mb-3">¿Listo para implementar?</h3>
          <p className="text-gray-300 mb-6">
            Nuestro equipo puede ayudarte a automatizar procesos, implementar IA o crear una web que convierte.
          </p>
          <Link
            href="/contacto"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            Solicitar Consulta Gratuita
          </Link>
        </div>

        {/* Posts Relacionados */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-6">Más artículos</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {['ia-negocio-guia-practica', 'paginas-web-que-venden', '10-procesos-automatizar']
              .filter((s) => s !== slug)
              .map((relatedSlug) => (
                <Link
                  key={relatedSlug}
                  href={`/blog/${relatedSlug}`}
                  className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition border border-gray-800 hover:border-blue-500"
                >
                  <h4 className="text-lg font-bold text-white mb-2">
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
