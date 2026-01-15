import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import ScheduleCallButton from "../components/ScheduleCallButton";
import { PageTracker } from "../components/PageTracker";
import VisitorForm from "../components/VisitorForm";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neuriax - Automatización, IA y Páginas Web Profesionales",
  description: "Soluciones digitales completas: automatización e IA para escalar operaciones + páginas web que convierten. Diseño profesional, SEO local y resultados medibles.",
  metadataBase: new URL('https://www.neuriax.com'),
  icons: {
    icon: '/favicon.png?v=2',
  },
  openGraph: {
    title: "Neuriax - Automatización e IA para tu negocio",
    description: "Soluciones digitales que eliminan fricción y escalan operaciones. Automatización, IA aplicada y páginas web profesionales.",
    url: "https://www.neuriax.com",
    siteName: "Neuriax",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neuriax - Soluciones Digitales y IA",
    description: "Automatización, IA aplicada a negocio y páginas web que venden.",
  },
  alternates: {
    canonical: 'https://www.neuriax.com',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
              telephone: '+34631415151',
              email: 'mateoclaramunt2021@gmail.com',
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
        {/* PageTracker gracefully handles Supabase failures */}
        <PageTracker />
        <Navbar />
        <main className="pt-16 min-h-screen">
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
