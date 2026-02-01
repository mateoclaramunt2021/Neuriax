import { Metadata } from "next";
import CTAButton from "../../components/CTAButton";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Landing Pages de Alta Conversión | Neuriax | Diseño Premium + Resultados",
  description: "Ejemplos de landing pages profesionales que convierten visitantes en clientes. Diseño premium, copywriting persuasivo y optimización para conversión.",
  keywords: "landing pages, páginas de aterrizaje, landing page profesional, diseño landing page, conversión web, páginas que venden",
  openGraph: {
    title: "Landing Pages de Alta Conversión - Neuriax",
    description: "Portfolio de landing pages premium optimizadas para convertir. Diseño estratégico + Copywriting + Velocidad.",
    url: "https://www.neuriax.com/landings",
  },
  alternates: {
    canonical: 'https://www.neuriax.com/landings',
  },
};

export default function PortfolioPage() {
  const demos = [
    {
      title: "Landing Peluquería Premium",
      category: "Estética & Belleza",
      description: "Diseñada para captar citas de servicios de alto valor",
      metrics: { conversion: "8.5%", tiempo: "45s avg" },
      features: [
        "Hero con propuesta de valor clara",
        "Galería de transformaciones",
        "Booking integrado con confirmación",
        "Testimonios con foto real"
      ],
      gradient: "from-rose-500 to-pink-600",
      accentColor: "rose"
    },
    {
      title: "Landing Restaurante Gourmet",
      category: "Gastronomía",
      description: "Optimizada para reservas de experiencias gastronómicas",
      metrics: { conversion: "12%", tiempo: "38s avg" },
      features: [
        "Vídeo hero con platos estrella",
        "Menú degustación destacado",
        "Reserva con depósito incluido",
        "Instagram feed integrado"
      ],
      gradient: "from-amber-500 to-orange-600",
      accentColor: "amber"
    },
    {
      title: "Landing Clínica Salud",
      category: "Sector Médico",
      description: "Genera confianza y convierte consultas iniciales",
      metrics: { conversion: "6.2%", tiempo: "52s avg" },
      features: [
        "Credenciales y certificaciones",
        "Antes/después con consentimiento",
        "Chat de primera consulta gratis",
        "Valoraciones verificadas"
      ],
      gradient: "from-emerald-500 to-teal-600",
      accentColor: "emerald"
    },
    {
      title: "Landing Consultoría B2B",
      category: "Servicios Profesionales",
      description: "Captura leads cualificados para servicios premium",
      metrics: { conversion: "4.8%", tiempo: "1:20 avg" },
      features: [
        "Casos de éxito con métricas",
        "Lead magnet descargable",
        "Calendly integrado",
        "Social proof corporativo"
      ],
      gradient: "from-blue-500 to-indigo-600",
      accentColor: "blue"
    },
    {
      title: "Landing Reformas Integrales",
      category: "Construcción & Hogar",
      description: "Convierte interesados en presupuestos solicitados",
      metrics: { conversion: "7.3%", tiempo: "55s avg" },
      features: [
        "Slider antes/después impactante",
        "Calculadora de presupuesto",
        "Portfolio de proyectos",
        "Garantías y seguros visibles"
      ],
      gradient: "from-slate-500 to-zinc-700",
      accentColor: "slate"
    },
    {
      title: "Tu Landing Personalizada",
      category: "A Medida",
      description: "Diseñamos la landing perfecta para tu negocio",
      metrics: { conversion: "∞", tiempo: "Tu ritmo" },
      features: [
        "Análisis de tu competencia",
        "Estrategia de conversión única",
        "Copywriting persuasivo incluido",
        "Tests A/B para optimizar"
      ],
      gradient: "from-cyan-500 to-blue-600",
      accentColor: "cyan",
      isCustom: true
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="py-24 px-6 bg-gradient-to-br from-black via-slate-950 to-slate-900 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-[250px] h-[250px] bg-blue-600/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          {/* OFERTA ESPECIAL - Banner destacado */}
          <div className="mb-8 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl blur opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 border-2 border-yellow-500/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">🔥</span>
                  <div className="text-left">
                    <p className="text-yellow-400 text-xs font-bold uppercase tracking-wider">Oferta por tiempo limitado</p>
                    <p className="text-white text-sm">Hasta el <span className="font-bold text-yellow-300">25 de febrero</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm line-through">790€</p>
                    <p className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">350€</p>
                  </div>
                  <div className="text-left">
                    <p className="text-white font-bold text-lg">Landing Page Profesional</p>
                    <p className="text-gray-300 text-sm">Diseño + Copywriting + Hosting 1 año</p>
                  </div>
                </div>
                <CTAButton href="/contacto/demo-landing" size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 shadow-lg shadow-orange-500/30 text-black font-bold whitespace-nowrap">
                  ¡Quiero mi demo GRATIS! →
                </CTAButton>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-gray-300">
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Entrega en 7 días
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  2 revisiones incluidas
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Optimizada para móvil
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Solo 5 plazas disponibles
                </span>
              </div>
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-cyan-300 text-sm font-medium">Landing Pages de Alta Conversión</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Landing Pages que <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">convierten visitantes en clientes</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-4">
            Diseño premium + Copywriting persuasivo + Velocidad extrema. Todo lo que tu negocio necesita para vender más.
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Explora los ejemplos. Cada landing está optimizada para convertir en tu sector específico.
          </p>
          
          {/* CTA Hero */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <CTAButton href="/contacto/demo-landing" size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/25">
              Solicitar demo GRATIS →
            </CTAButton>
          </div>
          
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              +50 landings entregadas
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Conversión promedio 6-12%
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Garantía de satisfacción
            </span>
          </div>
        </div>
      </section>

      {/* Grid de demos */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {demos.map((demo, idx) => (
              <div key={idx} className="group bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
                {/* Imagen placeholder */}
                <div className="relative h-64 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 flex items-center justify-center overflow-hidden">
                  {idx === 0 ? (
                    <>
                      <img 
                        src="/demos/peluqueria/hero.jpg" 
                        alt="Demo Web Peluquería"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300"></div>
                    </>
                  ) : idx === 1 ? (
                    <>
                      <img 
                        src="/demos/restaurante/hero.jpg" 
                        alt="Demo Web Restaurante"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300"></div>
                    </>
                  ) : idx === 2 ? (
                    <>
                      <img 
                        src="/demos/clinica/hero.jpg" 
                        alt="Demo Web Clínica"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300"></div>
                    </>
                  ) : idx === 3 ? (
                    <>
                      <img 
                        src="/demos/consultoria/hero.jpg" 
                        alt="Demo Web Consultoría"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300"></div>
                    </>
                  ) : idx === 4 ? (
                    <>
                      <img 
                        src="/demos/reformas/cocina-gourmet.jpg" 
                        alt="Demo Web Reformas"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300"></div>
                    </>
                  ) : idx === 5 ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/30 to-blue-600/30"></div>
                      <div className="relative text-center">
                        <svg className="w-16 h-16 text-cyan-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <p className="text-cyan-200 text-sm font-semibold">Tu proyecto personalizado</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 opacity-20">
                        <div style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }} className="w-full h-full"></div>
                      </div>
                      <div className="relative text-center">
                        <svg className="w-16 h-16 text-cyan-400/50 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-cyan-300 text-sm font-semibold group-hover:text-cyan-200 transition-colors">Vista previa</p>
                      </div>
                    </>
                  )}
                  
                  {/* Overlay con CTA */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <CTAButton href={idx === 0 ? "/landings/peluqueria" : idx === 1 ? "/landings/restaurante" : idx === 2 ? "/landings/clinica" : idx === 3 ? "/landings/consultoria" : idx === 4 ? "/landings/reformas" : idx === 5 ? "/contacto/demo-landing" : "/contacto/demo-landing"} className="bg-cyan-500 hover:bg-cyan-600 text-white">
                      {idx === 5 ? "Solicitar demo GRATIS" : "Ver en detalle"}
                    </CTAButton>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <span className="inline-block bg-cyan-900/30 text-cyan-300 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {demo.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-4">{demo.title}</h3>
                  
                  <ul className="space-y-2 mb-6">
                    {demo.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300">
                        <svg className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <CTAButton href={idx === 0 ? "/landings/peluqueria" : idx === 1 ? "/landings/restaurante" : idx === 2 ? "/landings/clinica" : idx === 3 ? "/landings/consultoria" : idx === 4 ? "/landings/reformas" : idx === 5 ? "/contacto/demo-landing" : "/contacto/demo-landing"} variant="secondary" className="w-full text-center justify-center">
                    {idx === 5 ? "Solicitar demo GRATIS" : "Quiero una igual"}
                  </CTAButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios de estos diseños */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Por qué estos diseños venden
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Velocidad ultrarrápida</h3>
              <p className="text-gray-300">Carga en menos de 2 segundos. Google premia el speed, tus usuarios también.</p>
            </div>

            <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">SEO local optimizado</h3>
              <p className="text-gray-300">Apareces en Google Maps y búsquedas locales. Clientes que buscan TU tipo de negocio te encuentran.</p>
            </div>

            <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Conversión clara</h3>
              <p className="text-gray-300">Cada elemento está diseñado para guiar al cliente hacia la acción: llamada, reserva, compra o contacto.</p>
            </div>

            <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Móvil first</h3>
              <p className="text-gray-300">El 70% de tus clientes buscan desde el móvil. Nuestros diseños son perfectos en cualquier pantalla.</p>
            </div>

            <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Copy orientado a resultados</h3>
              <p className="text-gray-300">Cada palabra está escrita para persuadir, no para adornar. Textos que cierran ventas.</p>
            </div>

            <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Fácil de mantener</h3>
              <p className="text-gray-300">Cambias fotos, textos y precios sin saber de código. O con mi soporte mensual por 49€.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Precios Landing Pages */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Precios Landing Pages</h2>
            <p className="text-gray-400">Elige el plan que mejor se adapta a tu negocio</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* LANDING ESENCIAL */}
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-2">Esencial</h3>
              <p className="text-gray-400 text-sm mb-6">Landing simple y efectiva</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">350€</span>
                <p className="text-gray-400 text-sm mt-2">Todo incluido</p>
              </div>
              <ul className="space-y-3 text-gray-300 mb-8 flex-grow">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Diseño responsive profesional</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Hosting 1 año incluido</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Botón CTA WhatsApp</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Botón CTA Instagram</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Optimización de velocidad</span>
                </li>
              </ul>
              <CTAButton href="/contacto/formulario" size="lg" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                Solicitar landing esencial
              </CTAButton>
            </div>

            {/* LANDING PROFESIONAL */}
            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-lg p-8 border-2 border-cyan-500 relative flex flex-col">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Recomendada
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Profesional</h3>
              <p className="text-gray-300 text-sm mb-6">Landing optimizada para conversión</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-cyan-400">600€</span>
                <p className="text-cyan-300 text-sm mt-2">Mayor conversión</p>
              </div>
              <ul className="space-y-3 text-gray-300 mb-8 flex-grow">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Todo lo de Esencial</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Diseño a medida</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Formulario de contacto</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Textos orientados a ventas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Sección de testimonios</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Dominio + Hosting 1 año</span>
                </li>
              </ul>
              <CTAButton href="/contacto/formulario" size="lg" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                Solicitar landing profesional
              </CTAButton>
            </div>

            {/* LANDING PREMIUM */}
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
              <p className="text-gray-400 text-sm mb-6">Landing de alto rendimiento</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">1.200€</span>
                <p className="text-gray-400 text-sm mt-2">Máxima conversión</p>
              </div>
              <ul className="space-y-3 text-gray-300 mb-8 flex-grow">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Todo lo de Profesional</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Animaciones y efectos premium</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Integración con CRM/email</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Analítica avanzada</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>A/B testing básico</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Soporte prioritario</span>
                </li>
              </ul>
              <CTAButton href="/contacto/formulario" size="lg" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                Solicitar landing premium
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Resultados reales (validación social) */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Resultados reales
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-lg p-8 border border-green-700/50">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-green-400">✓</span>
              </div>
              <p className="text-white font-semibold mb-2">Más consultas</p>
              <p className="text-gray-300 text-sm">Clínica dental que duplicó sus consultas mensuales en 3 meses con la web + SEO.</p>
            </div>

            <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-lg p-8 border border-green-700/50">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-green-400">✓</span>
              </div>
              <p className="text-white font-semibold mb-2">Reservas online</p>
              <p className="text-gray-300 text-sm">Restaurante que automatizó reservas y redujo significativamente las llamadas a cocina.</p>
            </div>

            <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-lg p-8 border border-green-700/50">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-green-400">✓</span>
              </div>
              <p className="text-white font-semibold mb-2">Más clientes</p>
              <p className="text-gray-300 text-sm">Peluquería con web + maps que ahora tiene lista de espera los fines de semana.</p>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mt-8">Los resultados varían según sector y punto de partida. Te mostramos casos reales en la llamada.</p>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-6 bg-gradient-to-br from-black via-slate-950 to-slate-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-500 rounded-full filter blur-[128px]"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500 rounded-full filter blur-[128px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-green-400 text-sm font-medium">⚡ Solo 3 proyectos nuevos al mes</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Tu competencia ya tiene landing.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Consigue la tuya en 48 horas</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
            Rellena el formulario y recibe una demo personalizada. <strong>Solo pagas si te gusta.</strong>
          </p>
          
          {/* Qué incluye la llamada */}
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
              <div className="text-2xl mb-2">📋</div>
              <p className="text-white font-semibold text-sm">Rellenas el formulario</p>
              <p className="text-gray-400 text-xs">Cuéntanos sobre tu negocio</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
              <div className="text-2xl mb-2">🎨</div>
              <p className="text-white font-semibold text-sm">Demo en 48h</p>
              <p className="text-gray-400 text-xs">Diseño personalizado para ti</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
              <div className="text-2xl mb-2">💰</div>
              <p className="text-white font-semibold text-sm">Solo pagas si te gusta</p>
              <p className="text-gray-400 text-xs">Sin riesgo, sin compromiso</p>
            </div>
          </div>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <CTAButton href="/contacto/demo-landing" size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/25 text-lg px-8 py-4">
              Solicitar mi demo GRATIS →
            </CTAButton>
          </div>
          
          {/* Trust elements */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mb-8">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Sin pago por adelantado
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Demo en 48 horas
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              350€ hasta el 25 feb
            </span>
          </div>
          
          {/* Contacto directo */}
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-500 text-sm mb-3">¿Prefieres hablar directamente?</p>
            <a href="tel:+34640791041" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +34 640 791 041
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
