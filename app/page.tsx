import CTAButton from "../components/CTAButton";
import VideoSection from "../components/VideoSection";
import ProblemCard from "../components/ProblemCard";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automatización e IA + Páginas Web Profesionales | Neuriax | Transformación Digital",
  description: "Soluciones digitales completas: automatización inteligente con IA, páginas web optimizadas en SEO, transformación empresarial. Agencia digital especializada en automatización e IA. Resultados medibles.",
  keywords: "automatización procesos, inteligencia artificial, IA aplicada, páginas web profesionales, agencia digital, automatización IA, soluciones digitales, transformación digital, SEO local, desarrollo web",
};

export default function Home() {
  const faqs = [
    {
      question: "¿Cómo la automatización e IA puede transformar mi negocio?",
      answer: "La automatización elimina procesos manuales repetitivos, la IA analiza datos y toma decisiones automáticas, resultando en mayor eficiencia, reducción de costos y escalabilidad infinita de tu operación."
    },
    {
      question: "¿Qué es mejor: páginas web profesionales o automatización?",
      answer: "Ambas son complementarias. Las páginas web atraen clientes y la automatización te permite gestionar más clientes sin aumentar costos operacionales. Juntas generan crecimiento exponencial."
    },
    {
      question: "¿Cuánto cuesta la automatización e IA?",
      answer: "Depende de la complejidad del proyecto. En la llamada te mostramos casos reales con retornos medibles. Disponemos de paquetes desde PYMEs hasta empresas grandes."
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Schema para FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
      
      {/* Hero Section - ULTRA FLUIDO PROFESIONAL */}
      <section className="relative hero-futuristic text-white pt-20 pb-24 px-6 overflow-hidden min-h-[calc(100vh-80px)] flex items-center">
        {/* Professional Grid Background */}
        <div className="absolute inset-0 grid-pattern"></div>
        
        {/* Subtle Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${3 + i * 6.5}%`,
                animationDuration: `${20 + i * 3}s`,
                animationDelay: `${i * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Elegant Glowing Orbs - More diffuse */}
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-cyan-500/8 rounded-full blur-[200px] orb-glow"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-600/6 rounded-full blur-[250px] orb-glow" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-500/4 rounded-full blur-[300px] orb-float"></div>

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 bg-white/[0.03] border border-white/[0.08] rounded-full px-6 py-2.5 mb-8 backdrop-blur-md fade-in-up" style={{ animationDelay: '0s' }}>
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                <span className="text-slate-400 text-sm font-medium tracking-wider">Agencia Digital Especializada</span>
              </div>

              {/* Main Title - NUEVO */}
              <h1 className="text-4xl md:text-6xl font-semibold mb-6 leading-[1.1] tracking-tight fade-in-up" style={{ animationDelay: '0.15s' }}>
                <span className="block text-white mb-2">Páginas Web</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 text-glow-cyan">
                  & Automatizaciones
                </span>
                <span className="block text-white/90 text-3xl md:text-4xl mt-3 font-normal">con Inteligencia Artificial</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base md:text-lg text-slate-400 mb-8 max-w-lg leading-relaxed fade-in-up" style={{ animationDelay: '0.3s' }}>
                Creamos presencia digital profesional y automatizamos procesos para que tu negocio escale sin límites.
              </p>

              {/* Features - Elegant pills */}
              <div className="flex flex-wrap gap-2.5 mb-10 fade-in-up" style={{ animationDelay: '0.45s' }}>
                <div className="flex items-center gap-2 bg-white/[0.03] backdrop-blur-sm rounded-full px-4 py-2 border border-white/[0.06]">
                  <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-slate-300">Diseño Web Premium</span>
                </div>
                <div className="flex items-center gap-2 bg-white/[0.03] backdrop-blur-sm rounded-full px-4 py-2 border border-white/[0.06]">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-sm text-slate-300">Automatización IA</span>
                </div>
                <div className="flex items-center gap-2 bg-white/[0.03] backdrop-blur-sm rounded-full px-4 py-2 border border-white/[0.06]">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="text-sm text-slate-300">SEO Optimizado</span>
                </div>
                <div className="flex items-center gap-2 bg-white/[0.03] backdrop-blur-sm rounded-full px-4 py-2 border border-white/[0.06]">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-slate-300">Soporte 24/7</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6 fade-in-up" style={{ animationDelay: '0.6s' }}>
                <a 
                  href="https://calendly.com/neuriax/30min" 
                  className="btn-shimmer group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium py-3.5 px-7 rounded-full transition-all duration-700 shadow-lg shadow-cyan-500/15 hover:shadow-cyan-500/25 hover:scale-[1.02]"
                >
                  <span>Agenda tu Consulta Gratuita</span>
                  <svg className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a 
                  href="#problemas" 
                  className="group inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/[0.03] border border-white/10 hover:border-white/20 text-white font-medium py-3.5 px-7 rounded-full transition-all duration-700"
                >
                  <span>Ver Soluciones</span>
                  <svg className="w-5 h-5 transition-transform duration-500 group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 text-xs text-slate-500 fade-in-up" style={{ animationDelay: '0.75s' }}>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-emerald-500/70" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Sin compromiso
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-emerald-500/70" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  30 minutos
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-emerald-500/70" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Análisis gratuito
                </span>
              </div>
            </div>

            {/* Right Side - Ultra Clean Visual */}
            <div className="relative hidden lg:flex items-center justify-center fade-in-scale" style={{ animationDelay: '0.3s' }}>
              <div className="relative w-full max-w-sm">
                {/* Elegant rotating rings - slower */}
                <div className="absolute inset-0 aspect-square">
                  <div className="absolute inset-0 border border-cyan-500/[0.08] rounded-full smooth-spin" style={{ animationDuration: '45s' }}></div>
                  <div className="absolute inset-12 border border-blue-500/[0.12] rounded-full smooth-spin" style={{ animationDuration: '35s', animationDirection: 'reverse' }}></div>
                  <div className="absolute inset-24 border border-purple-500/[0.08] rounded-full smooth-spin" style={{ animationDuration: '55s' }}></div>
                </div>
                
                {/* Central glass card */}
                <div className="relative aspect-square flex items-center justify-center">
                  <div className="glass-card rounded-3xl p-10 text-center float-smooth">
                    <div className="text-7xl font-light text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-400 mb-3">IA</div>
                    <div className="text-xs text-slate-500 tracking-[0.4em] uppercase">Powered</div>
                    <div className="mt-6 flex justify-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cyan-400/60 rounded-full animate-pulse"></span>
                      <span className="w-1.5 h-1.5 bg-blue-400/60 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></span>
                      <span className="w-1.5 h-1.5 bg-purple-400/60 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></span>
                    </div>
                  </div>

                  {/* Floating accent cards */}
                  <div className="absolute -top-4 -right-4 glass-card rounded-xl px-4 py-3 float-smooth" style={{ animationDelay: '2s' }}>
                    <div className="text-xl font-semibold text-cyan-400/90">24/7</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Asistente</div>
                  </div>
                  <div className="absolute -bottom-4 -left-4 glass-card rounded-xl px-4 py-3 float-smooth" style={{ animationDelay: '3.5s' }}>
                    <div className="text-xl font-semibold text-purple-400/90">+SEO</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Optimizado</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
      </section>

      {/* Servicios principales */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Dos líneas de servicio: IA + Páginas Web
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Automatización e IA para operaciones que escalen. Páginas web que convierten en ventas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Automatización */}
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl p-8 border border-blue-700/50 hover:border-blue-500 transition-colors">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-500/20 rounded-lg">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Automatización & IA</h3>
              <p className="text-gray-300 mb-6">
                Sistemas digitales que eliminan procesos manuales, reducen costos y escalan operaciones.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Leads automáticos 24/7</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Seguimiento inteligente</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Procesos IA avanzados</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Reportes en tiempo real</span>
                </li>
              </ul>
              <CTAButton href="/soluciones" className="w-full text-center justify-center">
                Ver soluciones
              </CTAButton>
            </div>

            {/* Páginas Web */}
            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl p-8 border border-cyan-700/50 hover:border-cyan-500 transition-colors">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-cyan-500/20 rounded-lg">
                  <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Páginas Web Profesionales</h3>
              <p className="text-gray-300 mb-6">
                Webs que convierten visitas en clientes. Diseño + SEO local + Reservas automáticas.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Diseño a medida responsivo</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>SEO local + Google Maps</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Reservas online + WhatsApp</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Desde 790€ • Entrega 15 días</span>
                </li>
              </ul>
              <CTAButton href="/webs" className="w-full text-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                Ver webs
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <VideoSection
        title="Cómo transformamos negocios con tecnología"
        description="Descubre cómo empresas han optimizado sus operaciones con nuestras soluciones digitales."
        // videoId="YOUTUBE_VIDEO_ID" // Para YouTube
        // localVideo="/intro.mp4" // Para vídeo local
      />

      {/* Problemas que resolvemos */}
      <section id="problemas" className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 hover:scale-105 transition-transform duration-300">
              Problemas que resolvemos en tu negocio
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto hover:text-white transition-colors duration-300">
              Estos son los dolores más comunes que vemos en empresas y que solucionamos con sistemas digitales inteligentes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProblemCard
              icon={
                <svg className="w-6 h-6 text-red-400 group-hover:text-red-200 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
              title="Leads sin respuesta"
              description="Clientes potenciales que contactan pero nunca reciben seguimiento, perdiendo oportunidades de venta."
            />

            <ProblemCard
              icon={
                <svg className="w-6 h-6 text-orange-400 group-hover:text-orange-200 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              }
              title="Tareas repetitivas"
              description="Empleados dedicando horas a procesos manuales que podrían automatizarse completamente."
            />

            <ProblemCard
              icon={
                <svg className="w-6 h-6 text-yellow-400 group-hover:text-yellow-200 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              }
              title="Falta de seguimiento"
              description="Clientes olvidados, tareas pendientes y oportunidades perdidas por falta de sistemas de seguimiento."
            />

            <ProblemCard
              icon={
                <svg className="w-6 h-6 text-purple-400 group-hover:text-purple-200 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              }
              title="Procesos desordenados"
              description="Flujos de trabajo caóticos, información dispersa y falta de estándares operativos claros."
            />

            <ProblemCard
              icon={
                <svg className="w-6 h-6 text-blue-400 group-hover:text-blue-200 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
              title="Datos dispersos"
              description="Información crítica repartida en Excel, emails y notas, imposible de analizar o acceder rápidamente."
            />

            <ProblemCard
              icon={
                <svg className="w-6 h-6 text-pink-400 group-hover:text-pink-200 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              }
              title="Falta de visibilidad operativa"
              description="Gerentes sin métricas claras, equipos sin objetivos definidos y decisiones tomadas a ciegas."
            />
          </div>
        </div>
      </section>

      {/* Cómo trabajo */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 hover:scale-105 transition-transform duration-300">
              Cómo trabajamos para solucionar tus problemas
            </h2>
            <p className="text-lg text-cyan-300 mb-4 font-medium">
              Trabajamos con metodología, no con improvisación.
            </p>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 hover:text-white transition-colors duration-300">
              Nuestro proceso probado en múltiples proyectos garantiza resultados concretos y sostenibles.
            </p>
          </div>

          {/* Diagrama de proceso */}
          <div className="relative mb-16">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 transform -translate-y-1/2 z-0 animate-pulse"></div>

            <div className="grid md:grid-cols-4 gap-8 relative z-10">
              <div className="text-center group cursor-pointer">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-400 rounded-full flex items-center justify-center animate-bounce">
                    <svg className="w-4 h-4 text-red-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-red-300 transition-colors duration-300">Análisis</h3>
                <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                  Estudiamos detalladamente tus procesos actuales, identificamos cuellos de botella y oportunidades de mejora.
                </p>
              </div>

              <div className="text-center group cursor-pointer">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-600 to-orange-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center animate-bounce">
                    <svg className="w-4 h-4 text-orange-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-orange-300 transition-colors duration-300">Diseño del sistema</h3>
                <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                  Creamos la arquitectura digital perfecta para tu negocio, integrando automatización e inteligencia artificial.
                </p>
              </div>

              <div className="text-center group cursor-pointer">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                    <svg className="w-4 h-4 text-yellow-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300">Implementación</h3>
                <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                  Desplegamos la solución de forma ágil, capacitando a tu equipo y asegurando una transición suave.
                </p>
              </div>

              <div className="text-center group cursor-pointer">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300">
                    <span className="text-2xl font-bold text-white">4</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center animate-bounce">
                    <svg className="w-4 h-4 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-green-300 transition-colors duration-300">Optimización continua</h3>
                <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                  Monitoreamos el rendimiento, analizamos métricas y realizamos mejoras continuas para maximizar resultados.
                </p>
                <p className="text-gray-500 text-sm mt-2 font-medium">Entrega clara, documentación y soporte.</p>
              </div>
            </div>
          </div>

          {/* Imagen de proceso */}
          <div className="text-center">
            <div className="relative inline-block group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Proceso de automatización y optimización"
                width={600}
                height={300}
                className="rounded-xl shadow-2xl group-hover:scale-105 group-hover:shadow-3xl transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl group-hover:from-black/70 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Resultados y experiencia - Prueba Social */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Resultados y experiencia aplicada
            </h2>
            <p className="text-xl text-cyan-300 font-medium">
              No hablamos de teoría. Aplicamos sistemas que ya funcionan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Tarjeta 1 */}
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-xl p-8 border border-blue-700/50 hover:border-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg border border-blue-500/50">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Procesos automatizados en entornos reales</h3>
              <p className="text-gray-300">
                Implementación de flujos automáticos para captación, seguimiento y gestión de clientes en negocios de servicios.
              </p>
            </div>

            {/* Tarjeta 2 */}
            <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-800/20 rounded-xl p-8 border border-cyan-700/50 hover:border-cyan-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500/20 rounded-lg border border-cyan-500/50">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Optimización del tiempo operativo</h3>
              <p className="text-gray-300">
                Reducción de tareas manuales repetitivas mediante sistemas digitales y automatización inteligente.
              </p>
            </div>

            {/* Tarjeta 3 */}
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-xl p-8 border border-purple-700/50 hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-lg border border-purple-500/50">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Enfoque en conversión y eficiencia</h3>
              <p className="text-gray-300">
                Cada sistema se diseña con un objetivo claro: ahorrar tiempo y mejorar resultados.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-400 text-sm font-medium max-w-3xl mx-auto">
              Los ejemplos concretos se muestran en llamada para adaptarlos a cada negocio.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-black via-slate-950 to-slate-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            ¿Tiene sentido automatizar tu negocio?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Si encaja, te lo diremos. Y si no, también.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <CTAButton href="https://calendly.com/neuriax/30min" size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 shadow-xl">
              Mantener una llamada clara
            </CTAButton>
            <CTAButton href="/webs" variant="secondary" size="lg">
              Ver opciones de web
            </CTAButton>
          </div>
          <p className="text-sm opacity-75">
            Sin compromiso • Análisis personalizado • Soluciones a medida
          </p>
        </div>
      </section>
    </div>
  );
}
