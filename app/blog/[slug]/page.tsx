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
    content: `
# Automatización Estratégica: Transforma tu Operación en 30 Días

La diferencia entre empresas que crecen exponencialmente y las que crecen lentamente no es suerte. Es automatización.

Mientras tus competidores siguen haciendo tareas manuales, tú estás liberando capital humano para estrategia, innovación y crecimiento.

## El ROI Real de la Automatización

- Procesamiento de documentos: 400-600% ROI
- Gestión de leads: 500-1000% ROI
- Reportes automáticos: 300-400% ROI
- Recordatorios: 200-300% ROI
- Inventario: 200-350% ROI

**Promedio:** 730% ROI en Mes 1. Payback en 4 días.

---

## Los 10 Procesos Más Rentables

### 1. Procesamiento de Documentos & Datos
**Tiempo:** 40-80 horas/mes ahorradas
**ROI:** 400-600%
**Impacto:** Errores reducidos 99%, datos en tiempo real

### 2. Generación de Reportes
**Tiempo:** 20 horas/mes ahorradas
**ROI:** 300-400%
**Impacto:** Reportes automáticos, decisiones más rápidas

### 3. Calificación Automática de Leads
**Tiempo:** 15 horas/mes ahorradas
**ROI:** 500-1000%
**Impacto:** Conversión: 2-3% → 8-12%

### 4. Confirmaciones & Recordatorios
**Tiempo:** 10-15 horas/mes ahorradas
**ROI:** 200-300%
**Impacto:** No-shows reducidos 30-40%

### 5. Sincronización de Bases de Datos
**Tiempo:** 8 horas/mes ahorradas
**ROI:** 150-250%
**Impacto:** Datos siempre consistentes

### 6. Gestión de Inventario
**Tiempo:** 10 horas/mes ahorradas
**ROI:** 200-350%
**Impacto:** 0 stockouts, 20% menos inventario muerto

### 7. Transcripción de Reuniones
**Tiempo:** 8 horas/mes ahorradas
**ROI:** 150-300%
**Impacto:** Transcripción en minutos, resúmenes automáticos

### 8. Enrutamiento de Soporte
**Tiempo:** 15 horas/mes ahorradas
**ROI:** 250-400%
**Impacto:** Respuestas en < 2 horas, satisfacción +25%

### 9. Generación de Documentos
**Tiempo:** 20 horas/mes ahorradas
**ROI:** 180-350%
**Impacto:** Presupuestos en 10 segundos, errores 0

### 10. Marketing Automático
**Tiempo:** 25 horas/mes ahorradas
**ROI:** 300-600%
**Impacto:** Conversión +40-80%, leads siempre en seguimiento

---

## El Plan: 30 Días

**Semana 1:** Auditoría de procesos. Elige el top-3 por impacto.

**Semana 2-3:** Implementa con Make, Zapier o similar.

**Semana 4:** Monitorea resultados y escalea.

---

## Lo Más Importante

Empieza pequeño. Un proceso. Un mes. Mide el impacto. Escala lo que funciona.

La mayoría de empresas ven ROI positivo en menos de 2 semanas.

---

[Agendar Auditoría Gratuita](/contacto)
    `,
  },
  'ia-negocio-guia-practica': {
    title: 'Inteligencia Artificial para Empresas: Del Concepto al Resultado Real',
    description: 'Guía práctica: cómo implementar IA en tu negocio. Casos de uso reales, ROI comprobado, herramientas, presupuestos.',
    date: '2026-01-18',
    category: 'IA',
    readTime: '15 min',
    author: 'Mateo Claramunt',
    content: `
# Inteligencia Artificial para Empresas: Implementación Práctica

La IA no es el futuro. Es el presente. Empresas que implementan IA estratégicamente generan 40% más revenue con el mismo equipo.

---

## Los 5 Casos de Uso de Mayor Impacto

### 1. Chatbots Inteligentes (ROI: 400-800%)

**Problema:** Tu equipo de soporte está saturado. Clientes esperan respuestas 24/7.

**Solución:** IA chatbot que resuelve 70-80% de preguntas automáticamente.

**Caso Real:**
- Empresa SaaS con 5,000 clientes
- Antes: 3 agentes, tiempo respuesta 4h, resolución 45%, costo €12,000/mes
- Después: 1 agente + chatbot, tiempo respuesta 2min, resolución 82%, costo €6,000/mes
- ROI: 240% en mes 1

### 2. Análisis Predictivo (ROI: 500-1500%)

**Problema:** Pierdes clientes sin saber por qué. No sabes quién se va antes de que se vaya.

**Solución:** IA predice qué clientes están en riesgo. Automáticamente activa intervención.

**Caso Real:**
- E-commerce 15,000 clientes
- Churn antes: 8%/mes
- Churn después: 3.5%/mes
- Clientes salvados: 70%
- Ingresos recuperados: €21,000/mes
- ROI: 1400%

### 3. Personalización Inteligente (ROI: 200-500%)

**Problema:** Todos tus clientes ven el mismo contenido. Conversión es promedio.

**Solución:** Cada cliente ve recomendaciones únicas.

**Caso Real:**
- B2B SaaS 500 clientes
- AOV antes: €250, upsell 8%, churn 6%
- AOV después: €340, upsell 22%, churn 3.5%
- Impacto: €45,000/mes + €7,500/mes
- ROI: 2650%

### 4. Generación de Contenido (ROI: 100-300%)

**Problema:** Crear contenido lleva tiempo. Escribir copy es caro.

**Solución:** Generar automáticamente descripciones, emails, artículos.

**Caso Real:**
- E-commerce 2,000 SKUs
- Descripciones: 100h/mes → 5h/mes
- Conversión: 1.8% → 3.2%
- Ahorro + ingresos adicionales: €12,750/mes
- ROI: 4150%

### 5. Business Intelligence (ROI: 150-400%)

**Problema:** Datos dispersos. Análisis manual toma horas.

**Solución:** IA centraliza datos, analiza automáticamente, genera insights.

**Caso Real:**
- Agencia 25 empleados, 30 clientes
- Reportes manuales: 8h/semana → 0h
- Insights automáticos en tiempo real
- Nuevos servicios identificados: €5,000/mes
- ROI: 520%

---

## ROI Proyectado: 90 Días

| Caso | Mes 1 | Mes 2 | Mes 3 | Total |
|------|-------|-------|-------|-------|
| Chatbot | €2,000 | €4,500 | €6,000 | €1150% |
| Predictivo | -€1,000 | €8,000 | €15,000 | €1100% |
| Personalización | -€500 | €6,000 | €12,000 | €900% |
| Contenido | €1,500 | €3,500 | €5,000 | €600% |
| BI | €500 | €2,000 | €4,000 | €325% |

**Total:** €2,500 inversión → €40,500 retorno = 1620% ROI

---

## Implementación: 60 Días

**Semana 1-2:** Diagnóstico. Elige 1 use case.

**Semana 3-4:** MVP rápido. Testing con 20% usuarios.

**Semana 5-6:** Rollout 100%. Monitoreo y optimización.

---

## Herramientas por Presupuesto

### Gratuito
- ChatGPT, Google Bard

### €100-500/mes
- Make.com, Copy.ai

### €500-2,000/mes
- Custom chatbots, BI solutions

### €2,000+/mes
- Enterprise, modelos custom

---

[Agendar Consulta IA Gratuita](/contacto)
    `,
  },
  'paginas-web-que-venden': {
    title: 'Páginas Web Premium que Convierten: Los 7 Elementos Clave',
    description: 'Descubre los 7 elementos que hacen que una web convierta 15-20% de visitantes. Diseño, copy, UX y psicología.',
    date: '2026-01-19',
    category: 'Web',
    readTime: '10 min',
    author: 'Mateo Claramunt',
    content: `
# Páginas Web Que Convierten: Los 7 Elementos Clave

El promedio de conversión es 2-3%. Las buenas convierten 8-12%. Las excelentes, 20%+.

La diferencia son 7 elementos específicos.

---

## 1. Propuesta de Valor Cristalina

**Principio:** 3 segundos. Ese es tu tiempo.

**Fórmula:** Beneficio específico + Para quién + Resultado cuantificable

❌ "Soluciones de automatización e IA"
✅ "Reduce costos 30-40% en 4 semanas"

---

## 2. Arquitectura Visual de Confianza

**Elementos:**
- ✅ Paleta coherente (máx 3 colores)
- ✅ Tipografía clara
- ✅ Espaciado generoso
- ✅ Imágenes premium
- ✅ Accesibilidad (contraste 4.5:1)

❌ Muchos colores, animaciones, auto-play, pop-ups

---

## 3. Prueba Social & Credibilidad

**Elementos:**
- Testimonios con foto + nombre + empresa
- Casos con números
- Clientes atendidos
- Awards y certificaciones

**Ubicación:** Después del primer CTA, mitad de página, antes de CTA final

---

## 4. CTAs Irresistibles

**Color:** Contrastante (rojo, azul, naranja)

**Texto:** Orientado a beneficio
- ✅ "Agendar Llamada Gratuita"
- ✅ "Ver Casos de Éxito"
- ❌ "Enviar", "Hacer clic"

**Tamaño:** 44px mínimo (thumb-friendly)

**Posición:** Hero, cada 300-400 palabras, final

---

## 5. Formularios Cortos

**Máximo 3 campos:**
1. Nombre
2. Email
3. Teléfono/Empresa

**Resultado:**
- 3 campos: 8-12% conversión
- 5 campos: 3-4%
- 10+ campos: <1%

❌ Empresa, presupuesto, necesidades, comentarios

---

## 6. Velocidad

**Métricas:**
- LCP: <2.5s
- FID: <100ms
- CLS: <0.1

**Impacto:**
- 1seg demora = 7% conversión perdida
- Optimización de 4.2s → 1.8s = +30% conversión

---

## 7. SEO Técnico

**On-Page:**
- H1 con keyword
- Meta description con CTA
- Alt text en imágenes
- Internal links
- Schema markup

**Technical:**
- XML sitemap
- Robots.txt
- Structured data
- Mobile-first
- HTTPS

---

## Checklist: ¿Tu Web Convierte?

- [ ] Propuesta de valor clara
- [ ] Diseño visual premium
- [ ] Testimonios visibles
- [ ] CTAs contrastantes
- [ ] Formulario 3 campos max
- [ ] Carga <2.5s
- [ ] Optimizada SEO

**Puntuación:**
- 7/7 = Premium (15-20%)
- 5-6/7 = Buena (8-10%)
- 3-4/7 = Promedio (3-5%)
- <3/7 = Débil (<2%)

---

## Caso Real

**Antes:**
- Propuesta vaga
- Formulario 12 campos
- 4.8 segundos
- Conversión: 1.2%
- 60 leads/mes

**Cambios:**
- H1 clara
- Diseño premium
- 4 casos de éxito
- Formulario 3 campos
- 1.8 segundos
- SEO técnico completo

**Resultado:**
- Conversión: 9.2%
- Leads: 570/mes
- Revenue: +€45,000/mes

---

[Auditoría Web Gratuita](/contacto)

*Típicamente encontramos 3-5 cambios que multiplican conversiones 3-5x.*
    `,
  }
};
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
        {/* Navegación */}
        <Link href="/blog" className="text-blue-400 hover:text-blue-300 mb-8 inline-block text-sm font-medium">
          ← Volver al blog
        </Link>

        {/* Header */}
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

          {/* Autor y fecha */}
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

        {/* Contenido */}
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
                  } else if (line.startsWith('**') && line.endsWith('**')) {
                    return `<p class="font-bold text-white text-lg">${line.replace(/\*\*/g, '')}</p>`;
                  } else if (line.startsWith('- ')) {
                    return `<li class="ml-6 text-gray-300">${line.replace('- ', '')}</li>`;
                  } else if (line.startsWith('- [ ]')) {
                    return `<li class="ml-6 text-gray-300 list-none before:content-['☐'] before:mr-2">${line.replace('- [ ] ', '')}</li>`;
                  } else if (line === '' || line.trim() === '') {
                    return '<div class="h-3"></div>';
                  } else if (line.includes('€') || line.includes('|')) {
                    return `<p class="font-mono text-sm text-gray-400">${line}</p>`;
                  } else {
                    return `<p class="text-gray-300">${line}</p>`;
                  }
                })
                .join(''),
            }}
          />
        </div>

        {/* CTA Final */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-10 border border-blue-700/50 mb-16">
          <h3 className="text-2xl font-bold text-white mb-4">¿Listo para transformar tu negocio?</h3>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Nuestro equipo especializado en automatización, IA y optimización web está listo para ayudarte a implementar estas estrategias.
          </p>
          <Link
            href="/contacto"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
          >
            Agendar Consulta Gratuita
          </Link>
        </div>

        {/* Posts Relacionados */}
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
