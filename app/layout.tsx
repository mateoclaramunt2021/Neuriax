import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import ScheduleCallButton from "../components/ScheduleCallButton";
import { PageTracker } from "../components/PageTracker";
import VisitorForm from "../components/VisitorForm";
import CookieBanner from "../components/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neuriax | Automatización e IA + Páginas Web Profesionales | SEO Local",
  description: "Soluciones digitales premium: automatización inteligente con IA, páginas web de alto rendimiento y SEO local. Escala tu negocio con sistemas que generan resultados comprobables.",
  metadataBase: new URL('https://www.neuriax.com'),
  keywords: [
    "automatización de procesos",
    "inteligencia artificial negocios",
    "páginas web profesionales",
    "agencia digital",
    "soluciones digitales",
    "SEO local España",
    "automatización IA",
    "web desarrollo",
    "transformación digital"
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
    title: "Neuriax - Automatización e IA + Páginas Web | Transforma Tu Negocio",
    description: "Soluciones digitales completas: automatización inteligente, IA aplicada a negocios y páginas web optimizadas. Resultados medibles y sostenibles.",
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
    title: 'Neuriax | Automatización e IA + Páginas Web',
    description: 'Transforma tu negocio con soluciones digitales inteligentes',
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
              serviceType: ['Automatización Digital', 'Desarrollo de IA', 'Diseño Web', 'SEO Local'],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Analytics - Usando Script de Next.js */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JK6XH4LZ3C"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JK6XH4LZ3C');
          `}
        </Script>
        {/* Cookie Banner - Must be before other components to establish consent state */}
        <CookieBanner />
        {/* PageTracker gracefully handles Supabase failures */}
        <PageTracker />
        <Navbar />
        <main className="pt-20 md:pt-24 min-h-screen">
          {children}
        </main>
        <Footer />
        <Chatbot />
        <ScheduleCallButton />
        <VisitorForm />
      </body>
    </html>
  );
}
