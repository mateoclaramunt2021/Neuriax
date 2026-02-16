import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PageTracker } from "../components/PageTracker";
import CookieBanner from "../components/CookieBanner";
import LeadMagnetModal from "../components/LeadMagnetModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neuriax | Automatización IA & Agentes de Voz Inteligentes",
  description: "Automatiza tu negocio con IA y agentes de voz que trabajan 24/7. Más clientes, menos trabajo manual. Resultados garantizados.",
  metadataBase: new URL('https://www.neuriax.com'),
  keywords: [
    "automatización IA",
    "agentes de voz",
    "inteligencia artificial",
    "automatización empresarial",
    "chatbots IA",
    "asistentes virtuales",
    "automatización negocios"
  ],
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
  },
  openGraph: {
    title: "Neuriax | Automatización IA & Agentes de Voz",
    description: "Automatiza tu negocio con IA y agentes de voz que trabajan 24/7. Más clientes, menos trabajo manual.",
    url: 'https://www.neuriax.com',
    siteName: 'Neuriax',
    images: [
      {
        url: 'https://www.neuriax.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Neuriax - Automatización e IA',
        type: 'image/jpeg',
      },
    ],
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neuriax | Automatización IA & Agentes de Voz',
    description: 'Tu negocio en piloto automático con IA',
    creator: '@neuriax.ia_',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'Neuriax',
              description: 'Soluciones digitales, automatización e IA aplicada a negocio',
              url: 'https://www.neuriax.com',
              telephone: '+34640791041',
              email: 'info@neuriax.com',
              priceRange: '$$',
              areaServed: 'ES',
              serviceType: ['Automatización IA', 'Agentes de Voz', 'Inteligencia Artificial'],
            }),
          }}
        />

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Cookie Banner - Must be before other components to establish consent state */}
        <CookieBanner />
        {/* PageTracker gracefully handles Supabase failures */}
        <PageTracker />
        <Navbar />
        <main className="pt-20 min-h-screen">
          {children}
        </main>
        <Footer />
        <LeadMagnetModal />
        <Analytics mode="production" />
        {/* Supabase PageTracker depends on cookie consent */}
      </body>
    </html>
  );
}
