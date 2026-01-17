# Advanced Schema Markup - Neuriax

## Schema Types Implementados y Recomendados

### 1. Organization Schema ✅ (IMPLEMENTADO)
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Neuriax",
  "description": "Automatización e IA + Páginas Web Profesionales",
  "url": "https://neuriax.com",
  "telephone": "+34 611 234 567",
  "email": "info@neuriax.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Barcelona",
    "addressRegion": "Cataluña",
    "postalCode": "08002",
    "addressCountry": "ES"
  },
  "areaServed": "ES",
  "sameAs": [
    "https://instagram.com/neuriax.ia_",
    "https://linkedin.com/company/neuriax"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "42"
  },
  "priceRange": "€€€"
}
```

### 2. Service Schema ✅ (IMPLEMENTADO)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Automatización e IA Empresarial",
  "description": "Soluciones inteligentes para automatizar procesos y escalar operaciones",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Neuriax"
  },
  "areaServed": "ES",
  "priceRange": "€€€",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "EUR",
    "priceRange": "790-5000",
    "availability": "InStock"
  }
}
```

### 3. ProfessionalService Schema 🆕 (RECOMENDADO)
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Neuriax - Agencia Digital",
  "description": "Automatización, IA, Páginas Web",
  "url": "https://neuriax.com",
  "telephone": "+34 611 234 567",
  "serviceType": ["Automation", "Web Design", "AI Solutions"],
  "areaServed": {
    "@type": "Country",
    "name": "ES"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "42"
  }
}
```

### 4. Product Schema 🆕 (RECOMENDADO - para servicios/paquetes)
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Paquete Web Profesional + Automatización",
  "description": "Diseño web profesional + automatización de procesos",
  "url": "https://neuriax.com/webs",
  "price": "1990",
  "priceCurrency": "EUR",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "28"
  },
  "offers": {
    "@type": "Offer",
    "price": "1990",
    "priceCurrency": "EUR",
    "availability": "InStock",
    "seller": {
      "@type": "Organization",
      "name": "Neuriax"
    }
  }
}
```

### 5. BreadcrumbList Schema ✅ (IMPLEMENTADO)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://neuriax.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Soluciones",
      "item": "https://neuriax.com/soluciones"
    }
  ]
}
```

### 6. FAQPage Schema ✅ (IMPLEMENTADO en /soluciones)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué es la automatización de procesos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La automatización de procesos..."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo puede ayudar la IA a mi negocio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La IA puede ayudarte..."
      }
    }
  ]
}
```

### 7. Article Schema 🆕 (Para Blog Posts)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Cómo Automatizar tu Negocio con IA en 2026",
  "description": "Guía completa sobre automatización...",
  "image": "https://neuriax.com/images/article-cover.jpg",
  "datePublished": "2026-01-15",
  "dateModified": "2026-01-20",
  "author": {
    "@type": "Person",
    "name": "Mateo Claramunt"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Neuriax",
    "logo": {
      "@type": "ImageObject",
      "url": "https://neuriax.com/logo.png"
    }
  },
  "mainEntityOfPage": "https://neuriax.com/blog/automatizacion-ia-2026"
}
```

### 8. VideoObject Schema 🆕
```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Demo Automatización Neuriax",
  "description": "Vea cómo la automatización puede transformar su negocio",
  "thumbnailUrl": "https://neuriax.com/images/video-thumb.jpg",
  "uploadDate": "2026-01-15",
  "duration": "PT5M33S",
  "url": "https://youtube.com/neuriax",
  "contentUrl": "https://youtube.com/neuriax"
}
```

### 9. Review Schema 🆕 (Testimonios de clientes)
```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5",
    "worstRating": "1"
  },
  "reviewBody": "Neuriax transformó completamente nuestro negocio con automatización e IA...",
  "author": {
    "@type": "Person",
    "name": "Juan García"
  },
  "itemReviewed": {
    "@type": "LocalBusiness",
    "name": "Neuriax"
  }
}
```

### 10. Event Schema 🆕 (Para webinars/demos)
```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Webinar: Automatización de tu Negocio",
  "description": "Descubre cómo automatizar procesos con IA",
  "startDate": "2026-02-15T18:00:00Z",
  "endDate": "2026-02-15T19:00:00Z",
  "url": "https://neuriax.com/webinar",
  "eventStatus": "EventScheduled",
  "eventAttendanceMode": "OnlineEventBroadcastEvent",
  "organizer": {
    "@type": "Organization",
    "name": "Neuriax",
    "url": "https://neuriax.com"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR",
    "availability": "InStock"
  }
}
```

### 11. HowTo Schema 🆕 (Para guías/tutoriales)
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo implementar automatización en tu empresa",
  "description": "Guía paso a paso",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Análisis de procesos actuales",
      "text": "Primero, analiza tus procesos..."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Identificar puntos de automatización",
      "text": "Luego, identifica dónde..."
    }
  ]
}
```

### 12. JobPosting Schema 🆕 (Para /trabajo)
```json
{
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": "Senior Developer (React/Next.js)",
  "description": "Buscamos un desarrollador senior...",
  "hiringOrganization": {
    "@type": "Organization",
    "name": "Neuriax"
  },
  "jobLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Barcelona",
      "addressRegion": "Cataluña",
      "addressCountry": "ES"
    }
  },
  "baseSalary": {
    "@type": "PriceSpecification",
    "priceCurrency": "EUR",
    "price": "40000"
  },
  "datePosted": "2026-01-15"
}
```

## Jerarquía de Schemas por Página

### Página Principal (/)
1. Organization ✅
2. LocalBusiness ✅
3. BreadcrumbList ✅
4. FAQPage ✅
5. VideoObject (recomendado)

### /soluciones
1. BreadcrumbList ✅
2. FAQPage ✅
3. Service ✅
4. Article (para blog content)
5. HowTo (para procesos)

### /webs
1. BreadcrumbList ✅
2. Product (paquetes web)
3. Service ✅
4. Article (para case studies)

### /portfolio
1. BreadcrumbList ✅
2. Article (case studies)
3. Review (testimonios)
4. Product (servicios entregados)

### /portfolio/[sector]
1. BreadcrumbList ✅
2. Article (caso de éxito)
3. Review (cliente)
4. VideoObject (demo)

### /trabajo
1. BreadcrumbList ✅
2. JobPosting (empleos abiertos)

### /blog (futuro)
1. Article
2. BreadcrumbList
3. HowTo o Review
4. VideoObject (si aplica)

## Implementación en Next.js

```typescript
// app/schema/types.ts
export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  // ... propiedades
});

export const generateServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  // ... propiedades
});

export const generateArticleSchema = (article: Article) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  // ... propiedades dinámicas
});
```

```typescript
// app/page.tsx
export const metadata = {
  // ... metadata
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(generateOrganizationSchema())}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(generateServiceSchema())}
      </script>
      {/* ... página */}
    </>
  );
}
```

## Validación de Schemas

- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema.org Validator**: https://validator.schema.org/
- **JSON-LD Playground**: https://json-ld.org/playground/

## Prioridad de Implementación

1. **Inmediato (esta semana):**
   - ProfessionalService Schema en layout.tsx ✅
   - Product Schema para paquetes en /webs

2. **Corto Plazo (próximas 2 semanas):**
   - Review Schema en /portfolio
   - VideoObject Schema para demos

3. **Mediano Plazo (próximo mes):**
   - Article Schema para blog posts
   - HowTo Schema para guías
   - Event Schema para webinars

4. **Largo Plazo (cuando se cree):**
   - JobPosting para sección /trabajo
   - Más Reviews específicos
   - Más VideoObjects
