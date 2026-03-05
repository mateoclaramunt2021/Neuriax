import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.neuriax.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'neuriax.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Optimización de performance
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Headers para SEO y Seguridad
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), browsing-topics=(), interest-cohort=(), serial=(), hid=(), bluetooth=(), display-capture=()'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://calendly.com https://assets.calendly.com https://*.vercel-scripts.com https://*.vercel-insights.com https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://assets.calendly.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https://calendly.com https://*.supabase.co https://*.vercel-insights.com https://vitals.vercel-insights.com wss://*.supabase.co; frame-src 'self' https://calendly.com; object-src 'none'; base-uri 'self'; form-action 'self' https://calendly.com; frame-ancestors 'self'; upgrade-insecure-requests;"
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin'
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'credentialless'
          },
          {
            key: 'X-Permitted-Cross-Domain-Policies',
            value: 'none'
          },
          // Pages: no browser cache, revalidate on CDN every 60s
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=60, stale-while-revalidate=300'
          }
        ],
      },
      // Static assets: cache aggressively
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      // Headers específicos para APIs - sin cache + security hardened
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, private'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'none'; frame-ancestors 'none'"
          },
          {
            key: 'Pragma',
            value: 'no-cache'
          },
          {
            key: 'Expires',
            value: '0'
          }
        ]
      },
      // Block access to sensitive dotfiles and config
      {
        source: '/.env',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }]
      },
      {
        source: '/.git/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }]
      }
    ]
  },
  // Redirects para SEO
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/agencia-ia.html',
        destination: '/agencia-ia',
        permanent: true,
      },
      {
        source: '/agencia-inteligencia-artificial',
        destination: '/agencia-ia',
        permanent: true,
      },
      {
        source: '/agencia-de-ia',
        destination: '/agencia-ia',
        permanent: true,
      },
      {
        source: '/servicios-ia',
        destination: '/soluciones',
        permanent: true,
      },
      {
        source: '/servicios',
        destination: '/soluciones',
        permanent: true,
      },
      {
        source: '/chatbot-ia',
        destination: '/soluciones',
        permanent: true,
      },
      {
        source: '/automatizacion-ia',
        destination: '/soluciones',
        permanent: true,
      },
      {
        source: '/consultoria-ia',
        destination: '/contacto',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
