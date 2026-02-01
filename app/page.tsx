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
      question: "¿Cómo sé si la automatización con IA me conviene?",
      answer: "Pasas más de 5 horas a la semana en emails, seguimiento o tareas repetitivas. Si es tu caso, probablemente sí. En la llamada te lo confirmo sin compromiso. Si no tiene sentido, te lo digo directamente."
    },
    {
      question: "¿Cuánto cuesta realmente?",
      answer: "Webs profesionales: desde 790€ (lista en menos de 10 días, desarrollada sin plantillas genéricas, incluye dominio, hosting y soporte 1 año). Automatizaciones: depende de complejidad, pero te doy precio exacto ANTES de empezar, sin sorpresas ni letra pequeña."
    },
    {
      question: "¿Cuánto tiempo tarda ver resultados?",
      answer: "Webs: en menos de 10 días tienes tu sitio online, desarrollado a medida sin plantillas. SEO local real toma 30-60 días para ver cambios. Automatizaciones: si están bien diseñadas, funcionan desde el primer día."
    },
    {
      question: "¿Qué pasa si no funciona?",
      answer: "Garantía 30 días. Si después de implementado no te da los resultados que esperas, devolvemos tu dinero. Sin preguntas. Pero lo normal es que funcione porque está medido antes de empezar."
    },
    {
      question: "¿Por qué no usas WordPress?",
      answer: "WordPress está bien para blogs, pero para webs que necesitan velocidad, SEO real y mantenimiento cero, uso tecnología moderna (Next.js). Carga 10x más rápido, posiciona mejor en Google y no necesita actualizaciones constantes que la rompan."
    },
    {
      question: "¿Necesito experiencia técnica?",
      answer: "No. Te enseño a usar todo lo que construimos. Además, si tienes dudas después, estoy disponible para ayudarte o resolverlo yo mismo. No te abandono después del pago."
    },
    {
      question: "¿Cuáles son los pasos para empezar?",
      answer: "Paso 1: Llamada de 15-30 min (gratis, sin compromiso). Paso 2: Te muestro opciones y presupuesto exacto. Paso 3: Si continúas, empezamos. Fácil, sin sorpresas."
    },
    {
      question: "¿Qué empresas puedo automatizar?",
      answer: "Cualquier empresa con procesos repetitivos: desde peluquerías (reservas automáticas) hasta consultoría (propuestas y seguimiento). Restaurantes, clínicas, reformas, abogados... Habla conmigo tu caso específico."
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
      
      {/* Hero Section - ULTRA LLAMATIVO Y PROFESIONAL */}
      <section className="relative hero-futuristic text-white pt-16 md:pt-20 pb-12 md:pb-20 px-4 md:px-6 overflow-hidden min-h-[100vh] md:min-h-[calc(100vh-80px)] flex items-center">
        {/* Professional Grid Background */}
        <div className="absolute inset-0 grid-pattern"></div>
        
        {/* Subtle Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${2 + i * 5}%`,
                animationDuration: `${15 + i * 2}s`,
                animationDelay: `${i * 1.5}s`,
              }}
            />
          ))}
        </div>

        {/* Glowing Orbs - Más intensos */}
        <div className="absolute top-0 left-0 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-cyan-500/10 rounded-full blur-[150px] md:blur-[200px] orb-glow"></div>
        <div className="absolute bottom-0 right-0 w-[600px] md:w-[900px] h-[600px] md:h-[900px] bg-blue-600/8 rounded-full blur-[200px] md:blur-[250px] orb-glow" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] md:w-[1200px] h-[800px] md:h-[1200px] bg-purple-500/5 rounded-full blur-[250px] md:blur-[300px] orb-float"></div>

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="relative z-10 text-center lg:text-left">
              {/* Badge Premium */}
              <div className="inline-flex items-center gap-2 md:gap-3 bg-white/5 border border-white/10 rounded-full px-4 md:px-6 py-2 md:py-2.5 mb-6 md:mb-8 backdrop-blur-md fade-in-up" style={{ animationDelay: '0s' }}>
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                <span className="text-slate-300 text-xs md:text-sm font-medium tracking-wide">Soluciones IA Personalizadas</span>
              </div>

              {/* Main Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-[1.1] tracking-tight fade-in-up" style={{ animationDelay: '0.15s' }}>
                <span className="block text-white mb-1 md:mb-2">Duplica tus ventas</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400">
                  con IA que trabaja 24/7
                </span>
              </h1>

              {/* Subtitle - Más directo */}
              <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed fade-in-up" style={{ animationDelay: '0.3s' }}>
                Webs profesionales + automatizaciones inteligentes que <span className="text-cyan-400 font-semibold">convierten visitantes en clientes</span> mientras tú te centras en lo importante.
              </p>

              {/* Value Props - Pills más visibles */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3 mb-6 md:mb-8 fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-2 bg-gradient-to-r from-cyan-500/15 to-cyan-500/5 backdrop-blur-sm rounded-full px-3 md:px-4 py-2 border border-cyan-500/20">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs md:text-sm text-white font-medium">Web en -10 días sin plantillas</span>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/15 to-blue-500/5 backdrop-blur-sm rounded-full px-3 md:px-4 py-2 border border-blue-500/20">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-xs md:text-sm text-white font-medium">IA Automatizada</span>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500/15 to-purple-500/5 backdrop-blur-sm rounded-full px-3 md:px-4 py-2 border border-purple-500/20">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-xs md:text-sm text-white font-medium">Garantía 30 días</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 md:gap-4 mb-6 fade-in-up" style={{ animationDelay: '0.5s' }}>
                {/* CTA Principal */}
                <a 
                  href="/contacto/formulario" 
                  className="group inline-flex items-center justify-center gap-2 md:gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-4 md:py-5 px-6 md:px-10 rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:brightness-110 text-base md:text-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Habla con un Experto</span>
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                
                {/* CTAs Secundarios */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <a 
                    href="/precios" 
                    className="group inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-white font-medium py-3 md:py-3.5 px-5 md:px-6 rounded-full transition-all duration-300 text-sm md:text-base"
                  >
                    <span>Ver Planes y Precios</span>
                  </a>
                  <a 
                    href="#problemas" 
                    className="group inline-flex items-center justify-center gap-2 text-slate-400 hover:text-white font-medium py-3 md:py-3.5 px-5 md:px-6 rounded-full transition-all duration-300 text-sm md:text-base"
                  >
                    <span>Ver Soluciones</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Social Proof */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6 fade-in-up" style={{ animationDelay: '0.6s' }}>
                {/* Garantía */}
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white">Garantía bajo contrato</div>
                    <div className="text-[10px] md:text-xs text-slate-400">30 días o te devolvemos el dinero</div>
                  </div>
                </div>

                {/* Disponibilidad */}
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  <span className="text-emerald-300 text-xs md:text-sm font-medium">Disponible esta semana</span>
                </div>
              </div>

              {/* Trust indicators - Más visibles */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 mt-6 md:mt-8 text-xs md:text-sm text-slate-400 fade-in-up" style={{ animationDelay: '0.7s' }}>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Sin compromiso</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Respuesta en 24h</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Trato directo</span>
                </span>
              </div>
            </div>

            {/* Right Side - Visual Limpio */}
            <div className="relative hidden lg:flex items-center justify-center fade-in-scale" style={{ animationDelay: '0.3s' }}>
              <div className="relative w-full max-w-sm">
                {/* Glow sutil */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl"></div>
                
                {/* Anillos orbitales - más sutiles */}
                <div className="absolute inset-0 aspect-square">
                  <div className="absolute inset-0 border border-white/5 rounded-full smooth-spin" style={{ animationDuration: '60s' }}></div>
                  <div className="absolute inset-12 border border-cyan-500/10 rounded-full smooth-spin" style={{ animationDuration: '45s', animationDirection: 'reverse' }}></div>
                </div>
                
                {/* Card central IA */}
                <div className="relative aspect-square flex items-center justify-center">
                  <div className="glass-card rounded-3xl p-10 md:p-14 text-center">
                    <div className="text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-blue-500 to-cyan-400 mb-3">IA</div>
                    <div className="text-xs text-slate-500 tracking-[0.3em] uppercase">Powered</div>
                    <div className="mt-6 flex justify-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cyan-400/60 rounded-full"></span>
                      <span className="w-1.5 h-1.5 bg-blue-400/60 rounded-full"></span>
                      <span className="w-1.5 h-1.5 bg-cyan-400/60 rounded-full"></span>
                    </div>
                  </div>

                  {/* Cards flotantes - sin animación */}
                  <div className="absolute -top-4 -right-4 glass-card rounded-xl px-4 py-3">
                    <div className="text-lg font-semibold text-cyan-400">24/7</div>
                    <div className="text-[10px] text-slate-500">Soporte</div>
                  </div>
                  <div className="absolute -bottom-4 -left-4 glass-card rounded-xl px-4 py-3">
                    <div className="text-lg font-semibold text-blue-400">+SEO</div>
                    <div className="text-[10px] text-slate-500">Incluido</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cards de servicios */}
          <div className="grid grid-cols-3 gap-3 md:gap-6 mt-10 md:mt-16 fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="glass-card rounded-xl md:rounded-2xl p-3 md:p-6 text-center transition-all duration-300 hover:bg-white/[0.04]">
              <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-4 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xs md:text-base font-semibold text-white">Diseño Web</h3>
              <p className="text-[10px] md:text-sm text-slate-500 hidden md:block mt-1">Webs que convierten</p>
            </div>
            
            <div className="glass-card rounded-xl md:rounded-2xl p-3 md:p-6 text-center transition-all duration-300 hover:bg-white/[0.04]">
              <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-4 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xs md:text-base font-semibold text-white">Automatización IA</h3>
              <p className="text-[10px] md:text-sm text-slate-500 hidden md:block mt-1">Trabaja mientras duermes</p>
            </div>
            
            <div className="glass-card rounded-xl md:rounded-2xl p-3 md:p-6 text-center transition-all duration-300 hover:bg-white/[0.04]">
              <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-4 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xs md:text-base font-semibold text-white">Soporte 24/7</h3>
              <p className="text-[10px] md:text-sm text-slate-500 hidden md:block mt-1">Siempre disponible</p>
            </div>
          </div>
        </div>

        {/* Gradiente inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
      </section>

      {/* Servicios principales */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Dos servicios. Una forma de trabajar.
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Elijas lo que elijas, hablas directamente conmigo. Te explico qué necesitas, qué no, y cuánto cuesta realmente.
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
                Si pasas horas en tareas repetitivas que no aportan valor, probablemente se pueden automatizar.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Respuesta automática a clientes</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Procesos internos optimizados</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>IA que trabaja mientras duermes</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Te explico si merece la pena</span>
                </li>
              </ul>
              <CTAButton href="/soluciones" className="w-full text-center justify-center">
                Ver cómo funciona
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
                Webs que realmente convierten visitas en clientes. Sin plantillas genéricas, sin excusas.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Diseño a medida, sin WordPress</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>SEO local incluido de verdad</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Dominio + hosting + soporte 1 año</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Desde 790€ • Lista en -10 días</span>
                </li>
              </ul>
              <CTAButton href="/webs" className="w-full text-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                Ver planes
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
              Cómo trabajo contigo
            </h2>
            <p className="text-lg text-cyan-300 mb-4 font-medium">
              Sin sorpresas. Sin letra pequeña. Sin promesas vacías.
            </p>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 hover:text-white transition-colors duration-300">
              Un proceso sencillo que he refinado con cada proyecto. Tú decides si seguimos adelante.
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
              No te vendo humo. Te muestro sistemas reales que ya funcionan.
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
              <h3 className="text-xl font-bold text-white mb-3">Automatizaciones que ahorran horas</h3>
              <p className="text-gray-300">
                Respuestas automáticas, seguimiento de clientes y gestión interna. Todo funcionando sin que tengas que estar pendiente.
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
              <h3 className="text-xl font-bold text-white mb-3">Webs que convierten de verdad</h3>
              <p className="text-gray-300">
                No plantillas genéricas. Webs diseñadas para tu negocio que hacen que los visitantes contacten.
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
              <h3 className="text-xl font-bold text-white mb-3">Soporte real después de entregar</h3>
              <p className="text-gray-300">
                No desaparezco después del pago. Si algo falla o tienes dudas, estoy ahí para resolverlo.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-400 text-sm font-medium max-w-3xl mx-auto">
              En la llamada te muestro ejemplos concretos adaptados a lo que necesita tu negocio.
            </p>
          </div>
        </div>
      </section>

      {/* GARANTÍA Y CONFIANZA - Nueva sección */}
      <section className="py-16 px-6 bg-slate-900/50 border-t border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {/* Garantía */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg mb-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">Garantía 30 días</h3>
              <p className="text-gray-400 text-sm">Si no ves resultados, devolvemos tu dinero. Sin preguntas.</p>
            </div>
            
            {/* Precios claros */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">Precios Transparentes</h3>
              <p className="text-gray-400 text-sm">Webs desde 790€. Automatizaciones a medida. Sin sorpresas.</p>
            </div>
            
            {/* Soporte directo */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500/20 rounded-lg mb-4">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">Hablas Directamente Conmigo</h3>
              <p className="text-gray-400 text-sm">Sin intermediarios, sin equipos de ventas. Yo respondo.</p>
            </div>
            
            {/* Resultados medibles */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-lg mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">Resultados Medibles</h3>
              <p className="text-gray-400 text-sm">Métricas claras, entrega documentada, sin humo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-black via-slate-950 to-slate-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center text-white">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-green-300 text-sm font-medium">✓ Garantía 30 días • Sin compromiso</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            ¿Listo para crecer de verdad?
          </h2>
          
          <p className="text-xl mb-4 text-gray-300">
            15 minutos de llamada te muestran si tiene sentido. Si no, no gastamos más tiempo.
          </p>
          
          <p className="text-lg mb-10 font-semibold text-cyan-300">
            Últimos 2 slots disponibles este mes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <CTAButton href="/contacto/formulario" size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 shadow-xl">
              🎯 Agendar Auditoría Gratuita
            </CTAButton>
            <CTAButton href="/webs" variant="secondary" size="lg">
              👁️ Ver planes de web
            </CTAButton>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 text-left max-w-2xl mx-auto mb-8">
            <div className="flex gap-3">
              <span className="text-cyan-400 font-bold text-lg flex-shrink-0">✓</span>
              <div>
                <p className="text-white font-semibold">Sin compromiso</p>
                <p className="text-gray-400 text-sm">Hablas, ves opciones y decides</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-cyan-400 font-bold text-lg flex-shrink-0">✓</span>
              <div>
                <p className="text-white font-semibold">15-30 minutos</p>
                <p className="text-gray-400 text-sm">Llamada enfocada y clara</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-cyan-400 font-bold text-lg flex-shrink-0">✓</span>
              <div>
                <p className="text-white font-semibold">Hablamos directo</p>
                <p className="text-gray-400 text-sm">Yo respondo, sin intermediarios</p>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-gray-500 font-medium">
            Casos de éxito reales • Precios transparentes • Garantía de 30 días
          </p>
        </div>
      </section>
    </div>
  );
}
