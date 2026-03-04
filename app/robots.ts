import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.neuriax.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/superadmin/",
          "/login/",
          "/signup/",
          "/dashboard/",
          "/_next/",
          "/*.json$",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/superadmin/",
          "/login/",
          "/signup/",
          "/dashboard/",
        ],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/assets/", "/og-image.jpg"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: [
          "/api/",
          "/superadmin/",
          "/login/",
          "/signup/",
          "/dashboard/",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
