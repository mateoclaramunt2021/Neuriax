import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PageTracker } from "../components/PageTracker";
import CookieBanner from "../components/CookieBanner";
import LeadMagnetModal from "../components/LeadMagnetModal";
import WhatsAppButton from "../components/WhatsAppButton";
import StickyCTA from "../components/StickyCTA";
import SocialProofToast from "../components/SocialProofToast";
import ExitIntentPopup from "../components/ExitIntentPopup";
import LayoutShell from "../components/LayoutShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Neuriax | Agencia de IA en España · Automatización & Agentes Inteligentes',
    template: '%s | Neuriax - Agencia de Inteligencia Artificial',
  },
  description: "Agencia de inteligencia artificial líder en España. Expertos en agentes IA conversacionales, chatbots empresariales, automatización con IA y agentes de voz. +50 empresas confían en Neuriax. Consultoría gratuita.",
  metadataBase: new URL('https://www.neuriax.com'),
  keywords: [
    "agencia de IA",
    "agencias de IA",
    "agencia de inteligencia artificial",
    "agencia IA España",
    "empresa de inteligencia artificial",
    "consultoría IA",
    "automatización IA",
    "agentes de IA",
    "agentes de voz IA",
    "chatbots IA empresas",
    "inteligencia artificial para empresas",
    "soluciones IA empresariales",
    "automatización empresarial",
    "transformación digital IA",
    "IA conversacional",
    "asistentes virtuales IA",
    "implementación IA",
    "desarrollo IA a medida",
    "agencia inteligencia artificial España",
    "mejor agencia IA",
    "agencia IA Madrid",
    "agencia IA Barcelona",
    "contratar agencia IA",
    "empresa IA España",
    "consultoría inteligencia artificial",
    "implementar IA en empresa",
    "automatización procesos IA",
    "agencia machine learning",
    "agencia NLP España",
    "agentes conversacionales IA",
    "chatbot inteligencia artificial",
    "agencia IA generativa",
    "GPT empresas España",
    "LLM empresas",
    "soluciones IA a medida",
    "partner IA empresas"
  ],
  category: 'technology',
  classification: 'Agencia de Inteligencia Artificial',
  creator: 'Neuriax',
  publisher: 'Neuriax',
  generator: 'Next.js',
  applicationName: 'Neuriax - Agencia de IA',
  referrer: 'origin-when-cross-origin',
  authors: [{ name: 'Neuriax', url: 'https://www.neuriax.com' }],
  icons: {
    icon: [
      { url: '/favicon.png?v=10', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png?v=10', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.png?v=10', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/favicon.png?v=10',
    shortcut: '/favicon.png?v=10',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.neuriax.com',
    languages: {
      'es': 'https://www.neuriax.com',
      'es-ES': 'https://www.neuriax.com',
      'es-MX': 'https://www.neuriax.com',
      'es-AR': 'https://www.neuriax.com',
      'es-CO': 'https://www.neuriax.com',
      'en': 'https://www.neuriax.com',
      'x-default': 'https://www.neuriax.com',
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
  other: {
    'msvalidate.01': 'bing-verification-code',
    'yandex-verification': 'yandex-verification-code',
    'rating': 'general',
    'geo.region': 'ES',
    'geo.placename': 'España',
    'ICBM': '40.4168, -3.7038',
    'dc.language': 'es',
    'dc.source': 'https://www.neuriax.com',
    'dc.title': 'Neuriax - Agencia de IA en España',
    'dc.creator': 'Neuriax',
    'dc.subject': 'Inteligencia Artificial, Agencia IA, Automatización',
  },
  openGraph: {
    title: 'Neuriax | Agencia de IA en España · Automatización Inteligente',
    description: 'Agencia de inteligencia artificial líder en España. Expertos en agentes IA, chatbots, automatización empresarial y soluciones de IA a medida. +50 empresas. Consultoría gratuita.',
    url: 'https://www.neuriax.com',
    siteName: 'Neuriax - Agencia de Inteligencia Artificial',
    images: [
      {
        url: 'https://www.neuriax.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Neuriax - Agencia de IA en España - Automatización e Inteligencia Artificial',
        type: 'image/jpeg',
      },
    ],
    type: 'website',
    locale: 'es_ES',
    alternateLocale: ['en_US', 'es_MX', 'es_AR', 'es_CO'],
    countryName: 'España',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neuriax | Agencia de IA en España',
    description: 'La agencia de inteligencia artificial líder. Agentes IA conversacionales, automatización empresarial y soluciones a medida. Resultados desde el primer mes.',
    creator: '@neuriax_ia',
    site: '@neuriax_ia',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [{ color: '#000000', media: '(prefers-color-scheme: dark)' }, { color: '#ffffff', media: '(prefers-color-scheme: light)' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              '@id': 'https://www.neuriax.com/#organization',
              name: 'Neuriax - Agencia de Inteligencia Artificial',
              alternateName: ['Neuriax', 'Neuriax IA', 'Neuriax Agencia IA'],
              description: 'Agencia de inteligencia artificial líder en España. Especialistas en agentes IA conversacionales, automatización empresarial, chatbots IA y soluciones de IA a medida para empresas.',
              url: 'https://www.neuriax.com',
              telephone: '+34643045488',
              email: 'info@neuriax.com',
              priceRange: '€€',
              areaServed: [
                { '@type': 'Country', name: 'España' },
                { '@type': 'Country', name: 'México' },
                { '@type': 'Country', name: 'Colombia' },
                { '@type': 'Country', name: 'Argentina' },
              ],
              serviceType: [
                'Agencia de Inteligencia Artificial',
                'Agentes de IA Conversacional',
                'Automatización Empresarial con IA',
                'Chatbots IA para Empresas',
                'Agentes de Voz Inteligentes',
                'Consultoría IA',
                'Desarrollo IA a Medida',
                'Implementación de IA',
              ],
              knowsAbout: [
                'Inteligencia Artificial',
                'Machine Learning',
                'Procesamiento de Lenguaje Natural',
                'Agentes Conversacionales',
                'Automatización de Procesos',
                'IA Generativa',
                'Chatbots',
                'Asistentes Virtuales',
                'NLP',
                'GPT',
                'LLM',
              ],
              foundingDate: '2024',
              foundingLocation: {
                '@type': 'Place',
                name: 'España',
              },
              numberOfEmployees: {
                '@type': 'QuantitativeValue',
                minValue: 5,
                maxValue: 20,
              },
              slogan: 'Tu Agencia de IA en España',
              award: 'Agencia de IA más innovadora 2025',
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 40.4168,
                longitude: -3.7038,
              },
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'ES',
                addressRegion: 'Madrid',
              },
              sameAs: [
                'https://www.instagram.com/neuriax.ia_',
                'https://www.linkedin.com/company/neuriax',
                'https://www.tiktok.com/@neuriaxx',
              ],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '52',
                bestRating: '5',
              },
              review: [
                {
                  '@type': 'Review',
                  author: { '@type': 'Person', name: 'Carlos M.' },
                  reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
                  reviewBody: 'La mejor agencia de IA con la que hemos trabajado. Implementaron un agente conversacional que redujo nuestros costes de atención al cliente en un 60%.',
                  datePublished: '2025-09-15',
                },
                {
                  '@type': 'Review',
                  author: { '@type': 'Person', name: 'María L.' },
                  reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
                  reviewBody: 'Neuriax transformó nuestra empresa con IA. El agente de voz atiende llamadas 24/7 y nuestros clientes están encantados. 100% recomendable.',
                  datePublished: '2025-11-20',
                },
                {
                  '@type': 'Review',
                  author: { '@type': 'Person', name: 'Javier R.' },
                  reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
                  reviewBody: 'Excelente agencia de inteligencia artificial. Profesionales, rápidos y con resultados medibles desde el primer mes.',
                  datePublished: '2026-01-10',
                },
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Servicios de IA',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Agente IA Conversacional',
                      description: 'Agente de inteligencia artificial que atiende clientes 24/7 por WhatsApp, web y voz',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Automatización Empresarial con IA',
                      description: 'Automatización inteligente de procesos empresariales con inteligencia artificial',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Consultoría IA Estratégica',
                      description: 'Consultoría especializada en implementación de soluciones de inteligencia artificial',
                    },
                  },
                ],
              },
            }),
          }}
        />
        {/* WebSite Schema for Sitelinks Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': 'https://www.neuriax.com/#website',
              name: 'Neuriax - Agencia de IA',
              alternateName: 'Neuriax Agencia de Inteligencia Artificial',
              url: 'https://www.neuriax.com',
              description: 'Agencia de inteligencia artificial líder en España. Expertos en agentes IA, automatización, chatbots y soluciones IA enterprise.',
              inLanguage: 'es',
              publisher: { '@id': 'https://www.neuriax.com/#organization' },
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://www.neuriax.com/soluciones?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        {/* FAQPage Schema - Enterprise SEO for Featured Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: '¿Qué es una agencia de IA?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Una agencia de IA (inteligencia artificial) es una empresa especializada en desarrollar, implementar y gestionar soluciones basadas en inteligencia artificial para otras empresas. Neuriax es una agencia de IA líder en España, especializada en agentes conversacionales, automatización empresarial y chatbots inteligentes.',
                  },
                },
                {
                  '@type': 'Question',
                  name: '¿Cuánto cuesta contratar una agencia de inteligencia artificial?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Los servicios de una agencia de IA como Neuriax varían según la complejidad del proyecto. Los agentes IA conversacionales empiezan desde 790€, la automatización empresarial desde 1.500€ y las soluciones enterprise a medida desde 3.000€. Ofrecemos consultoría gratuita para evaluar tu caso.',
                  },
                },
                {
                  '@type': 'Question',
                  name: '¿Cuál es la mejor agencia de IA en España?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Neuriax es considerada la mejor agencia de IA en España por su enfoque en resultados medibles, implementación rápida (5 días) y especialización en agentes IA conversacionales. Con +50 empresas atendidas y una valoración de 4.9/5, lidera el sector de inteligencia artificial aplicada.',
                  },
                },
                {
                  '@type': 'Question',
                  name: '¿Qué servicios ofrece una agencia de inteligencia artificial?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Una agencia de IA ofrece: 1) Agentes IA conversacionales para atención al cliente 24/7, 2) Chatbots inteligentes para WhatsApp, web y voz, 3) Automatización de procesos empresariales con IA, 4) Consultoría estratégica en inteligencia artificial, 5) Desarrollo de soluciones IA a medida, 6) Integración de GPT y LLMs en sistemas empresariales.',
                  },
                },
                {
                  '@type': 'Question',
                  name: '¿Cómo implementar IA en mi empresa?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Para implementar IA en tu empresa: 1) Identifica procesos repetitivos que se pueden automatizar, 2) Contacta con una agencia de IA especializada como Neuriax, 3) Define objetivos medibles (reducir costes, mejorar atención), 4) Implementa de forma progresiva empezando por un agente IA conversacional, 5) Mide resultados y escala. Neuriax ofrece implementación en 5 días.',
                  },
                },
                {
                  '@type': 'Question',
                  name: '¿Qué es un agente de IA conversacional?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Un agente de IA conversacional es un sistema de inteligencia artificial que puede mantener conversaciones naturales con humanos a través de texto o voz. A diferencia de un chatbot tradicional, un agente IA entiende el contexto, aprende de las interacciones y puede ejecutar acciones como agendar citas, procesar pedidos o resolver incidencias. Neuriax desarrolla agentes IA personalizados para cada negocio.',
                  },
                },
                {
                  '@type': 'Question',
                  name: '¿En cuánto tiempo se implementa la IA en una empresa?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Con Neuriax, la implementación básica de un agente IA conversacional toma solo 5 días. Proyectos de automatización empresarial completa se implementan en 2-4 semanas. Soluciones enterprise a medida requieren 4-8 semanas. Desde el primer día se ven resultados medibles.',
                  },
                },
                {
                  '@type': 'Question',
                  name: '¿Cuál es el ROI de implementar inteligencia artificial?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'El ROI de implementar IA con una agencia especializada como Neuriax es significativo: reducción del 40-70% en costes de atención al cliente, aumento del 25-50% en conversiones, disponibilidad 24/7, y recuperación de la inversión en 2-3 meses. Nuestros clientes reportan un ROI medio del 300% en el primer año.',
                  },
                },
              ],
            }),
          }}
        />
        {/* BreadcrumbList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.neuriax.com' },
                { '@type': 'ListItem', position: 2, name: 'Soluciones IA', item: 'https://www.neuriax.com/soluciones' },
                { '@type': 'ListItem', position: 3, name: 'Agencia de IA', item: 'https://www.neuriax.com/agencia-ia' },
                { '@type': 'ListItem', position: 4, name: 'Precios', item: 'https://www.neuriax.com/precios' },
                { '@type': 'ListItem', position: 5, name: 'Contacto', item: 'https://www.neuriax.com/contacto' },
              ],
            }),
          }}
        />
        {/* SpeakableSpecification - For Google Assistant / Voice Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              '@id': 'https://www.neuriax.com/#webpage',
              name: 'Neuriax - Agencia de IA en España',
              description: 'Agencia de inteligencia artificial líder en España',
              isPartOf: { '@id': 'https://www.neuriax.com/#website' },
              about: { '@id': 'https://www.neuriax.com/#organization' },
              inLanguage: 'es',
              speakable: {
                '@type': 'SpeakableSpecification',
                cssSelector: ['h1', '.hero-description', '.faq-answer'],
              },
              mainContentOfPage: {
                '@type': 'WebPageElement',
                cssSelector: 'main',
              },
            }),
          }}
        />
        {/* Preconnect & DNS Prefetch for Performance - Core Web Vitals */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Cookie Banner - Must be before other components to establish consent state */}
        <CookieBanner />
        {/* PageTracker gracefully handles Supabase failures */}
        <PageTracker />
        <LayoutShell
          navbar={<Navbar />}
          footer={<Footer />}
          extras={
            <>
              <LeadMagnetModal />
              <WhatsAppButton />
              <StickyCTA />
              <SocialProofToast />
              <ExitIntentPopup />
            </>
          }
        >
          {children}
        </LayoutShell>
        <Analytics mode="production" />
        {/* Supabase PageTracker depends on cookie consent */}
      </body>
    </html>
  );
}
