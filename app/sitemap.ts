import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.neuriax.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/contacto",
    "/dashboard",
    "/login",
    "/portfolio",
    "/precios",
    "/quien-soy",
    "/sectores",
    "/signup",
    "/soluciones",
    "/trabajo",
    "/webs",
  ];

  const lastModified = new Date();

  return routes.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: path === "/" ? 1.0 : path === "/webs" ? 0.9 : path === "/precios" ? 0.85 : 0.7,
  }));
}
