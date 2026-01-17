# Google Search Console & Analytics - Setup Completo

## Google Search Console (GSC) - Guía de Implementación

### Paso 1: Verificar Sitio en GSC

**Opción A: DNS (Recomendada)**
1. Ir a https://search.google.com/search-console
2. Click en "+ Agregar propiedad"
3. Seleccionar "Propiedad de dominio"
4. Ingresar: `neuriax.com`
5. Copiar código de verificación DNS
6. Agregar registro TXT en proveedor DNS
7. Esperar 24-48 horas para verificación

**Opción B: Metaetiqueta HTML**
1. Agregar en `<head>` de layout.tsx:
```html
<meta name="google-site-verification" content="CODIGO_AQUI" />
```

**Opción C: Archivo HTML** (menos recomendado para Next.js)

**Estado Actual:** ⏳ PENDIENTE

---

### Paso 2: Enviar Sitemap a GSC

```bash
1. En GSC → Sitemaps
2. Click "Agregar/probar sitemap"
3. Ingresar URL: https://neuriax.com/sitemap.xml
4. Click Enviar
5. Esperar a que Google rastree
```

**Qué aparecerá:**
- URLs enviadas vs indexadas
- Errores de cobertura
- Problemas de formato

**Status Actual:** ⏳ PENDIENTE

---

### Paso 3: Revisar Cobertura

**Ubicación:** GSC → Cobertura

**Análisis esperado:**
```
Total de URLs enviadas: 18
- Válidas: 18
- Excluidas: 0
- Errores: 0
- Advertencias: 0
```

**Si hay errores:**
- Revisar meta robots
- Verificar canonical tags
- Buscar 404s no intencionales
- Comprobar redirect chains

---

### Paso 4: Enhancements (Mejoras)

**GSC → Enhancements**

**Para verificar:**
- [ ] Mobile Usability
- [ ] Breadcrumb (debería verse)
- [ ] FAQ (debería verse)
- [ ] Product (si aplica)
- [ ] AggregateRating (debería verse)

**Qué deberías ver:**
```
✅ Breadcrumb: 18 URLs válidas
✅ Structured Data: Organization, LocalBusiness, Service
```

---

### Paso 5: Core Web Vitals Monitoreo

**GSC → Core Web Vitals**

**Qué monitorear:**
- LCP (Largest Contentful Paint)
- FID/INP (Interactivity)
- CLS (Layout Shift)

**Métricas esperadas para Neuriax:**
```
Status: Buenas
- LCP: < 2.5s ✅
- FID: < 100ms ✅
- CLS: < 0.1 ✅
```

**Si fallas:**
1. Revisar PageSpeed Insights
2. Optimizar imágenes
3. Lazy load contenido
4. Minificar JS/CSS

---

### Paso 6: Search Performance

**GSC → Resultados de búsqueda**

**Datos que verás (después de 2-4 semanas):**
```
Clics: Cuántos clicks recibes de Google
Impresiones: Cuántas veces apareces en búsqueda
CTR: Click-through rate promedio
Posición: Ranking promedio en búsqueda
```

**Análisis esperado (mes 1):**
- Impresiones: 100-500
- Clics: 20-50
- CTR: 10-15%
- Posición: Posición 10-30

**Análisis esperado (mes 3):**
- Impresiones: 5,000-10,000
- Clics: 500-1,000
- CTR: 8-10%
- Posición: Posición 3-8

---

### Paso 7: Mobile Usability

**GSC → Mobile Usability**

**Esperar:**
```
✅ No issues detected
- Viewport configurado
- Font legible
- Touch elements correctos
```

---

### Paso 8: Sitemaps

**GSC → Sitemaps**

**Estadísticas esperadas:**
```
URLs en sitemap: 18
URLs indexadas: 18
URLs notificadas: 18
URLs erróneas: 0
```

---

### Paso 9: URL Inspection

**Para debugging individual de URLs:**

1. GSC → URL Inspection
2. Pegar URL: https://neuriax.com/soluciones
3. Click "Inspeccionar"

**Información que aparece:**
```
✅ Página disponible para Google
✅ Se puede rastrear
✅ Indexada
✅ Mobile amigable
```

---

## Google Analytics 4 - Setup Completo

### Paso 1: Crear Propiedad en GA4

```bash
1. Ir a https://analytics.google.com
2. Click "Administrador"
3. "Crear Propiedad"
4. Nombre: "Neuriax - Sitio Web"
5. Zona horaria: America/Madrid (UTC+1)
6. Divisa: EUR
7. Click Crear
```

### Paso 2: Instalar Etiqueta de Seguimiento

**Opción A: Google Tag Manager (Recomendada)**
```bash
1. Ir a https://tagmanager.google.com
2. Crear Cuenta: "Neuriax"
3. Crear Contenedor: Web
4. Copiar código GTM
```

**Opción B: Etiqueta de seguimiento directa**
```html
<!-- Agregar al <head> de layout.tsx -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Status Actual:** ⏳ PENDIENTE

### Paso 3: Vincular GSC con GA4

```bash
1. GA4 → Administrador
2. Google Search Console links
3. "Vincular"
4. Seleccionar dominio: neuriax.com
5. Confirmar
```

**Beneficio:** Ver datos de búsqueda directamente en GA4

---

## Configuración de Conversiones en GA4

### Evento 1: Formulario de Contacto Enviado

**Ubicación:** En componente `VisitorForm.tsx`

```typescript
// Tracking de formulario enviado
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // ... lógica de envío
  
  // Track conversion
  gtag.event('form_submission', {
    'event_category': 'contact',
    'event_label': 'visitor_form',
    'value': 1
  });
};
```

### Evento 2: CTA Clicks

**En componentes `CTAButton.tsx` y `ScheduleCallButton.tsx`**

```typescript
const handleCTAClick = () => {
  gtag.event('cta_click', {
    'event_category': 'engagement',
    'event_label': 'direct_call_button',
    'button_text': 'Llamada Directa'
  });
  
  // Redirigir a Calendly
};
```

### Evento 3: Scroll Depth

```typescript
// Tracking de profundidad de lectura
useEffect(() => {
  const handleScroll = () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    if (scrollPercentage > 25 && !tracked25) {
      gtag.event('scroll_depth', { 'scroll_depth': 25 });
      setTracked25(true);
    }
    if (scrollPercentage > 50 && !tracked50) {
      gtag.event('scroll_depth', { 'scroll_depth': 50 });
      setTracked50(true);
    }
    if (scrollPercentage > 75 && !tracked75) {
      gtag.event('scroll_depth', { 'scroll_depth': 75 });
      setTracked75(true);
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### Evento 4: Page Views

**Automático en GA4**, pero pueden personalizarse:

```typescript
// En app/layout.tsx con componente PageTracker
<PageTracker />
```

---

## Dashboards Recomendados en GA4

### Dashboard 1: Resumen SEO
```
Metrics:
- Sesiones desde búsqueda orgánica
- Usuarios nuevos
- Tasa de rebote
- Páginas por sesión
- Duración media de sesión
- Conversiones
```

### Dashboard 2: Fuentes de Tráfico
```
Visualización:
- Canal (Organic Search, Direct, Referral, Social)
- Proporción de usuarios por canal
- Conversiones por canal
```

### Dashboard 3: Comportamiento en Web
```
Reportes:
- Página más visitada
- Tiempo en página
- Tasa de salida
- Clics en links internos
- Clics en CTAs
```

### Dashboard 4: Conversiones
```
Eventos:
- Form submissions
- CTA clicks
- Scroll depth
- PDF downloads
- Video plays
```

---

## Setup Paso a Paso (Checklist)

### SEMANA 1: Search Console
- [ ] Crear propiedad en GSC
- [ ] Verificar dominio (DNS)
- [ ] Enviar sitemap.xml
- [ ] Revisar cobertura
- [ ] Monitorear errores

### SEMANA 2: Analytics
- [ ] Crear propiedad GA4
- [ ] Instalar código de seguimiento
- [ ] Vincular GSC
- [ ] Configurar eventos de conversión
- [ ] Crear dashboards

### SEMANA 3: Seguimiento
- [ ] Revisar primeros datos en GA4
- [ ] Ajustar eventos si es necesario
- [ ] Crear reportes automáticos
- [ ] Comenzar seguimiento de KPIs

---

## Informes Personalizados

### Informe Semanal (15 min)

```
Enviar cada Lunes:

📊 Tráfico Orgánico
- Sesiones: X
- Usuarios nuevos: X
- Conversiones: X

📈 Top 5 Palabras Clave (GSC)
- Keyword 1: Pos X, X impresiones
- Keyword 2: Pos X, X impresiones
...

⚙️ Issues Técnicos
- Errores: 0
- Advertencias: 0
```

### Informe Mensual (1 hora)

```
## Resumen Ejecutivo

### KPIs Principales
| Métrica | Esta semana | Vs Mes Anterior |
|---------|-----------|----------------|
| Tráfico orgánico | X | +X% |
| Conversiones | X | +X% |
| Ranking promedio | X.X | -X posiciones |
| Impresiones | X | +X% |

### Análisis de Performance
- Keywords ganadas: X
- Keywords perdidas: X
- Nueva contenido impactó: X
- Problema identificado: X

### Recomendaciones
1. ...
2. ...
3. ...
```

---

## Herramientas de Monitoreo

### GSC Alerts
```bash
GSC → Configuración → Alertas
✅ Habilitar alertas para:
- Errores de cobertura
- Problemas de core web vitals
- Cambios en rankings
- Sitemap problemas
```

### Rank Tracking

**Opción 1: SEMrush**
- Setup: Agregar 20+ keywords objetivo
- Frecuencia: Tracking diario
- Reportes: Semanales automáticos

**Opción 2: AccuRanker**
- Setup más granular
- Mejor para pequeñas agencias
- Más económico

**Keywords a trackear:**
- "automatización procesos"
- "IA para empresas"
- "páginas web profesionales"
- "agencia digital barcelona"
- ... (20+ total)

---

## Calendario de Monitoreo

### Diario (5 min)
- [ ] Check GA4 sesiones
- [ ] Revisar si hay alerts

### Semanal (30 min)
- [ ] Revisar rankings (Rank tracker)
- [ ] Analizar tráfico de búsqueda orgánica
- [ ] Revisar páginas con mejor rendimiento

### Mensual (2 horas)
- [ ] Análisis profundo de GSC
- [ ] Core Web Vitals review
- [ ] KPI trending
- [ ] Crear informe ejecutivo

### Trimestral (4 horas)
- [ ] Estrategia review
- [ ] Competitive analysis
- [ ] Oportunidades identificadas
- [ ] Plan ajustado

---

## Troubleshooting Común

### Problema: No hay datos en GSC después de 1 semana
**Solución:**
1. Verificar que sitemap está enviado
2. Usar URL Inspection para URLs específicas
3. Revisar robots.txt
4. Comprobar que página no tiene noindex

### Problema: Google no indexa páginas
**Solución:**
1. GSC → URL Inspection
2. Click "Solicitar indexación"
3. Esperar 24-48 horas
4. Revisar si tiene canonical a otra URL

### Problema: Core Web Vitals malas
**Solución:**
1. PageSpeed Insights
2. Identificar culpable (imagen, script, etc.)
3. Optimizar recurso
4. Esperar 1 semana para refrescar datos

### Problema: Ranking cayó de repente
**Solución:**
1. Revisar algoritmo updates de Google
2. Analizar cambios recientes en sitio
3. Revisar backlinks (si hay penalización)
4. Revisar Core Web Vitals
5. Contactar a Google si es penalización manual

---

## Acciones Inmediatas (Esta Semana)

- [ ] **HOY:** Setup GSC (dominio + sitemap)
- [ ] **HOY:** Setup GA4 (código de seguimiento)
- [ ] **Mañana:** Vincular GSC con GA4
- [ ] **Mañana:** Configurar eventos de conversión
- [ ] **Esta semana:** Crear dashboards
- [ ] **Esta semana:** Comenzar rank tracking

**Responsable:** Mateo Claramunt  
**Deadline:** 7 días

---

## Recursos

- Google Search Console: https://search.google.com/search-console
- Google Analytics: https://analytics.google.com
- Google Tag Manager: https://tagmanager.google.com
- PageSpeed Insights: https://pagespeed.web.dev/
- Documentación GSC: https://support.google.com/webmasters/
- Documentación GA4: https://support.google.com/analytics/
