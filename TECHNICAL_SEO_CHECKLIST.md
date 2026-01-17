# Technical SEO Checklist - Neuriax

## Core Web Vitals ⚡

### Largest Contentful Paint (LCP)
- **Target:** < 2.5 segundos
- [ ] Optimize server response time (TTFB < 0.6s)
- [ ] Lazy load images below fold
- [ ] Use image CDN (Cloudinary, Akamai)
- [ ] Minimize CSS/JS (Vercel auto-optimizes)
- [ ] Preload critical resources
- [ ] Use WebP format ✅ (implementado)

### First Input Delay (FID) / Interaction to Next Paint (INP)
- **Target:** < 100ms (FID), < 200ms (INP)
- [ ] Minimize JavaScript
- [ ] Break up long tasks (> 50ms)
- [ ] Use Web Workers para tasks pesados
- [ ] Optimize event listeners
- [ ] Defer non-critical JavaScript

### Cumulative Layout Shift (CLS)
- **Target:** < 0.1
- [ ] Set explicit dimensions en img/video tags
- [ ] Avoid dynamic content injection
- [ ] Use transform instead of property changes
- [ ] Avoid font flashing (FOUT)
- [ ] Preload web fonts

### Auditar Core Web Vitals
- [ ] PageSpeed Insights (Google)
- [ ] WebPageTest
- [ ] Chrome DevTools (Lighthouse)
- [ ] CrUX Dashboard (Chrome User Experience Report)

---

## Indexación y Crawling 🕷️

### Robots.txt ✅
- [x] Sitemap referencia
- [x] Disallow API/admin/dashboard
- [x] Allow robots para contenido público
- [x] Crawl-delay configurado

### Sitemap.xml ✅
- [x] Sitemap.xml válido en raíz
- [x] Incluye todas URLs importantes (18 URLs)
- [x] Priority y changeFrequency correctas
- [x] URLs canónicas incluidas
- [ ] Sitemap index si > 50,000 URLs

### Google Search Console
- [ ] Sitio verificado
- [ ] Sitemap enviado
- [ ] Eliminar URLs problemáticas
- [ ] Monitorear cobertura
- [ ] Core Web Vitals revisar
- [ ] Mejoramientos revisar

### Bing Webmaster Tools
- [ ] Sitio registrado
- [ ] Sitemap enviado
- [ ] Rastreo monitorizado

### Indexabilidad
- [ ] Meta robots: index, follow ✅
- [ ] X-Robots-Tag headers correctos
- [ ] No bloqueado por robots.txt
- [ ] No canonical a otra página
- [ ] Contenido único (sin duplicación)

---

## Estructura Técnica 🏗️

### URLs Estructura
- [x] URLs legibles (slug-based)
- [x] Sin caracteres especiales
- [x] HTTPS en todas las URLs ✅
- [x] Sin parámetros innecesarios
- [x] Consistencia con/sin www

### Velocidad y Rendimiento
- [x] Next.js optimizado con Turbopack
- [x] Image optimization ✅ (AVIF, WebP)
- [ ] Minificación CSS/JS
- [ ] Cache headers ✅ (max-age implementado)
- [ ] Gzip compression
- [ ] CDN para assets estáticos
- [ ] Database queries optimizados
- [ ] Reduce redirects

### HTTPS y Seguridad
- [x] SSL/TLS certificate válido
- [x] X-Content-Type-Options: nosniff ✅
- [x] X-Frame-Options: DENY ✅
- [x] X-XSS-Protection ✅
- [ ] Content-Security-Policy (CSP) headers
- [ ] HSTS header (Strict-Transport-Security)
- [ ] Secure cookies

### Mobile Friendly
- [x] Responsive design (Tailwind)
- [x] Viewport meta tag ✅
- [ ] Touch-friendly buttons (48px min)
- [ ] Mobile navigation optimizado
- [ ] No Flash/obsolete plugins
- [ ] Font sizes legibles en mobile

### Estructura Canónica
- [x] Canonical tags en cada página ✅
- [x] Self-referential en páginas simple
- [ ] Parametrized URLs redirigen a canonical
- [ ] Session IDs no en canonical

---

## On-Page SEO ✅

### Meta Tags
- [x] Meta Title < 60 caracteres
- [x] Meta Description 155-160 caracteres
- [x] Keywords en meta tags
- [x] Único por página
- [ ] Incluir CTAs en descriptions

### Heading Tags
- [x] H1 única por página
- [x] H1 contiene keyword principal
- [ ] H2-H3 jerarquía apropiada
- [ ] Headings descriptivos
- [ ] Headings no vacíos

### Contenido
- [ ] Mínimo 300-500 palabras (nuevas páginas)
- [ ] Keywords en primer párrafo
- [ ] Densidad 1-2% (natural)
- [ ] Sinónimos y variantes de keywords
- [ ] Contenido actualizado regularmente

### Imágenes
- [ ] Alt text descriptivo
- [ ] Tamaño de archivo optimizado
- [ ] Nombres de archivo descriptivos
- [ ] Formatos modernos (WebP, AVIF) ✅
- [ ] Lazy loading
- [ ] Structured data para images

### Links Internos
- [ ] Links contextuales relevantes
- [ ] Anchor text descriptivo
- [ ] Distribución PageRank
- [x] No más de 5-7 links por página
- [ ] Links a páginas prioritarias

### Links Externos
- [x] Links a sitios de autoridad
- [x] Rel="external" cuando aplica
- [ ] Texto ancla relevante
- [ ] Sin exceso de outbound links

---

## Structured Data 🔍

### Schema.org Markup
- [x] Organization Schema ✅
- [x] LocalBusiness Schema ✅
- [x] Service Schema ✅
- [x] BreadcrumbList ✅
- [x] FAQPage Schema ✅
- [ ] Article Schema (blog posts)
- [ ] Product Schema (paquetes)
- [ ] Review Schema (testimonios)
- [ ] VideoObject Schema (demos)
- [ ] Event Schema (webinars)
- [ ] HowTo Schema (guías)
- [ ] AggregateRating ✅

### JSON-LD Validación
- [ ] Validar en schema.org/validator
- [ ] Google Rich Results Test
- [ ] No errores de markup
- [ ] Datos consistentes con página

### Rich Snippets
- [ ] Ratings/reviews aparecen
- [ ] Breadcrumbs aparecen
- [ ] FAQ aparece
- [ ] Videos aparecen

---

## Palabras Clave y Targeting 📍

### Keyword Research
- [x] 20+ keywords principales ✅
- [x] 5 semantic clusters ✅
- [ ] 50+ long-tail keywords documentados
- [ ] LSI keywords incluidos
- [ ] Competidores analizados

### Keyword Placement
- [x] Keywords en title tags
- [x] Keywords en meta descriptions
- [x] Keywords en H1/H2
- [ ] Keywords en URL (cuando apropiado)
- [ ] Keywords en alt text de imágenes
- [ ] Keywords en first 100 palabras

### Intent Matching
- [x] Informational content
- [x] Transactional content (contacto, precios)
- [ ] Navegational queries cubiertas
- [ ] Commercial intent optimizado

---

## Mobile y Desktop

### Mobile Optimization
- [x] Mobile-responsive design
- [x] Fast loading on mobile
- [x] Touch-friendly elements
- [x] No interstitials invasivos
- [ ] Viewport meta tag correcto
- [ ] Readable font sizes

### Desktop Optimization
- [x] Full width layout
- [x] Desktop performance
- [x] Hover effects funcionales
- [ ] High resolution images

---

## Errores Comunes 🚨

### Errores 4xx
- [ ] 404s monitorizados
- [ ] Páginas deletadas redirigidas 301
- [ ] Recursos faltantes resueltos

### Errores 5xx
- [ ] Server errors monitoreados
- [ ] Uptime 99.9%+
- [ ] Error pages personalizadas

### Redirect Chains
- [ ] Evitar chains (A→B→C)
- [ ] Redireccionamientos directos
- [ ] Máximo 2 hops

### Soft 404s
- [ ] Páginas no-indexadas tienen contenido
- [ ] Meta robots correcto
- [ ] HTTP status codes correctos

---

## International SEO (si aplica)

### Hreflang Tags
- [ ] Hreflang para variantes de idioma
- [ ] es-ES implementado
- [ ] x-default para default language
- [ ] Bidireccionales correctas

### Geotargeting
- [ ] language/region targeting
- [ ] País de hosting apropiado
- [ ] Geositemaps si necesario

---

## Auditoría Herramientas

### Google Tools
- [ ] Google Search Console - Cobertura
- [ ] Google Analytics - Tráfico y comportamiento
- [ ] PageSpeed Insights - Velocidad
- [ ] Google Mobile-Friendly Test

### Terceros
- [ ] Screaming Frog (crawl errors)
- [ ] Semrush (keyword rankings)
- [ ] Ahrefs (backlinks)
- [ ] Moz (domain authority)
- [ ] Lighthouse (performance)

### Checklists Automatizados
- [ ] WAVE (accessibility)
- [ ] Grammarly (content quality)
- [ ] GTmetrix (page speed)

---

## Monitoreo Continuo 📊

### Métricas Clave (KPIs)

1. **Visibilidad SEO**
   - Rankings para keywords objetivo
   - Posición promedio
   - Impressiones en GSC

2. **Tráfico Orgánico**
   - Tráfico orgánico total
   - Tráfico por página
   - Growth rate mes a mes

3. **Engagement**
   - Bounce rate
   - Tiempo en página
   - Pages per session
   - CTR desde SERPs

4. **Conversión**
   - Leads desde orgánico
   - Conversion rate
   - Cost per acquisition (CPA)

5. **Técnico**
   - Core Web Vitals scores
   - Crawl errors
   - Coverage issues
   - Mobile usability

6. **Autoridad**
   - Domain authority
   - Page authority
   - Backlinks
   - Referring domains

### Reportes
- [ ] Semanal: Rankings top keywords
- [ ] Mensual: Tráfico, conversiones, técnico
- [ ] Trimestral: Estrategia, oportunidades

### Herramientas de Monitoreo
- [ ] Google Search Console alerts
- [ ] Google Analytics 4
- [ ] Rank tracking tool (Semrush, AccuRanker)
- [ ] Core Web Vitals dashboard

---

## Checklist de Implementación

### Fase 1: COMPLETADA ✅
- [x] Metadata en todas las páginas
- [x] Schema markup básico
- [x] Sitemap expandido
- [x] Robots.txt optimizado
- [x] Performance headers
- [x] Image optimization

### Fase 2: EN PROGRESO 🔄
- [ ] Blog posts con 50+ artículos
- [ ] Advanced schema markup (Product, Review, etc.)
- [ ] Google Search Console submission
- [ ] Analytics configuration
- [ ] Core Web Vitals optimization

### Fase 3: PRÓXIMO 📅
- [ ] Backlink building campaign
- [ ] Google My Business optimization
- [ ] Social signals strategy
- [ ] Content update cycle
- [ ] Ranking monitoring

---

## Prioridades de Implementación

**INMEDIATO (esta semana):**
1. ✅ Google Search Console - Agregar sitio
2. ✅ Enviar sitemap
3. ✅ Verificar cobertura
4. ✅ Monitorear Core Web Vitals

**CORTO PLAZO (próximas 2 semanas):**
1. [ ] Google Analytics 4 setup
2. [ ] Google My Business completar
3. [ ] Advanced schemas (Product, Review)
4. [ ] Comenzar blog posts

**MEDIANO PLAZO (próximo mes):**
1. [ ] 20-30 blog posts publicados
2. [ ] Backlink acquisition iniciada
3. [ ] Core Web Vitals optimizados
4. [ ] Rankings monitoreados

**LARGO PLAZO (próximos 3 meses):**
1. [ ] 50+ blog posts
2. [ ] Top 3 en keywords principales
3. [ ] 300%+ tráfico orgánico
4. [ ] 50+ backlinks de calidad
