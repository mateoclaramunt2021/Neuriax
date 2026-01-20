import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.neuriax.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    // Páginas principales
    { path: "/", priority: 1.0, changeFrequency: "daily" as const },
    
    // Páginas de negocio (más importantes)
    { path: "/soluciones", priority: 0.95, changeFrequency: "weekly" as const },
    { path: "/webs", priority: 0.95, changeFrequency: "weekly" as const },
    { path: "/contacto", priority: 0.95, changeFrequency: "weekly" as const },
    
    // Portfolio y casos de éxito
    { path: "/portfolio", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/portfolio/clinica", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/portfolio/consultoria", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/portfolio/peluqueria", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/portfolio/reformas", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/portfolio/restaurante", priority: 0.85, changeFrequency: "monthly" as const },
    
    // ...eliminadas rutas de Blog...
    
    // Otros servicios
    { path: "/precios", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/sectores", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/trabajo", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/quien-soy", priority: 0.75, changeFrequency: "monthly" as const },
    
    // Legales
    { path: "/politica-de-privacidad", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/politica-de-cookies", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/aviso-legal", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/condiciones-generales", priority: 0.5, changeFrequency: "monthly" as const },
  ];

  const lastModified = new Date();

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
