import { Metadata } from "next";
import CTAButton from "../../components/CTAButton";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Páginas Web Profesionales con SEO Local | Neuriax | Diseño + Automatización",
  description: "Páginas web profesionales diseñadas para convertir. Incluye SEO local, reservas automáticas, WhatsApp integrado. Perfectas para negocios locales. Desde 790€.",
  keywords: "páginas web profesionales, diseño web, páginas web con SEO, reservas online, páginas web negocios, web profesional, agencia web",
  openGraph: {
    title: "Páginas Web Profesionales que Convierten - Neuriax",
    description: "Diseño responsivo + SEO local + Reservas automáticas. Páginas web que generan clientes para tu negocio.",
    url: "https://www.neuriax.com/webs",
  },
  alternates: {
    canonical: 'https://www.neuriax.com/webs',
  },
};

export default function WebsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section - IMPACTANTE */}
      <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center justify-center bg-black overflow-hidden">
        {/* Animated background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-500/20 rounded-full blur-[100px] md:blur-[150px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-blue-600/15 rounded-full blur-[80px] md:blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/40 rounded-full px-4 py-2 mb-6 md:mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-cyan-400 text-xs md:text-sm font-medium tracking-wide">PÁGINAS WEB PROFESIONALES</span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8 leading-[1.1] tracking-tight">
            <span className="block text-white">Tu negocio merece</span>
            <span className="block mt-2 md:mt-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              una web que trabaje para ti.
            </span>
          </h1>

          {/* Subheadline - Mensaje auténtico */}
          <p className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed px-4">
            No hago webs genéricas con plantillas. Diseño cada proyecto <span className="text-cyan-400 font-semibold">escuchando primero qué necesitas</span>, quién es tu cliente y qué quieres lograr.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 md:mb-16 px-4">
            <a
              href="#precios"
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30"
            >
              <span className="relative z-10">Ver precios claros</span>
              <svg className="relative z-10 w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
            <a
              href="/contacto/formulario"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/10 hover:bg-white/10 transition-all"
            >
              Agendar llamada
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Diferenciadores honestos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto px-4">
            <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-xl font-bold text-cyan-400">Desde 790€</div>
              <div className="text-sm text-slate-400">Precio cerrado, sin sorpresas</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-xl font-bold text-cyan-400">15 días</div>
              <div className="text-sm text-slate-400">De brief a web publicada</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-xl font-bold text-cyan-400">Soporte real</div>
              <div className="text-sm text-slate-400">No desaparezco después</div>
            </div>
          </div>
        </div>
      </section>

      {/* Para quién es */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ideal para negocios locales que necesitan presencia digital
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Si tu negocio vende servicios o productos locales, una buena web es tu mejor vendedor 24/7.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Peluquerías & Estética", desc: "Reservas online, galería de cortes, promociones y contacto directo por WhatsApp." },
              { title: "Clínicas & Consultorios", desc: "Información de servicios, citas online, horarios y ubicación fácil de encontrar en Google." },
              { title: "Restaurantes & Bares", desc: "Menú online, reservas, ubicación con mapas, galería de platos y promociones." },
              { title: "Servicios Profesionales", desc: "Portafolio, tarifas, clientes, testimonios y llamadas a acción claras." },
              { title: "E-commerce Local", desc: "Tienda online simple, carrito, métodos de pago y entregas rápidas." },
              { title: "Inmobiliarias", desc: "Galería de propiedades, fichas detalladas, citas de visita y contacto directo." },
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-cyan-500 transition-colors">
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Qué incluye cada web
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Todo lo que necesitas para vender online sin complicaciones.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl p-8 border border-cyan-700/50 hover:border-cyan-500 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Diseño responsivo premium</h3>
                  <p className="text-gray-300">Perfecta en móvil, tablet y desktop. Carga rápida y buena experiencia usuario.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl p-8 border border-cyan-700/50 hover:border-cyan-500 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">SEO local básico</h3>
                  <p className="text-gray-300">Google Maps, palabras clave locales, meta tags optimizados para que te encuentren.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl p-8 border border-cyan-700/50 hover:border-cyan-500 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v16m8-16a8 8 0 11-16 0 8 8 0 0116 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">WhatsApp + Reservas / Llamadas</h3>
                  <p className="text-gray-300">Botón para contacto directo, sistema de reservas online o formulario de llamada.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl p-8 border border-cyan-700/50 hover:border-cyan-500 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Velocidad + Seguridad</h3>
                  <p className="text-gray-300">Hosting rápido, certificado SSL, copias de seguridad automáticas y soporte.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Proceso simple y rápido
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              De cero a web lista en 15 días.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Brief 15 min</h3>
              <p className="text-gray-300">
                Llamada rápida para entender tu negocio, competencia, objetivos y qué quieres lograr.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Diseño + Textos</h3>
              <p className="text-gray-300">
                Creo la web con copy orientado a conversión, diseño profesional y llamadas a acción claras.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Publicación + Revisión</h3>
              <p className="text-gray-300">
                Deploy, testing, revisiones finales y capacitación. Tu web lista para vender.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Precios */}
      <section id="precios" className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Precios claros y sin sorpresas
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Elige el plan que mejor se adapte a tu negocio.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Básica */}
            <div className="bg-gray-900 rounded-xl border border-gray-700 p-8 hover:border-cyan-500 transition-colors">
              <h3 className="text-2xl font-semibold text-white mb-2">Básica</h3>
              <p className="text-gray-400 mb-6">Para empezar</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">790</span>
                <span className="text-gray-400"> €</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-300">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  5 páginas
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Diseño responsive
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  WhatsApp / Contacto
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  SEO local básico
                </li>
              </ul>
              <CTAButton href="/contacto/formulario" variant="secondary" className="w-full text-center justify-center">
                Contratar
              </CTAButton>
            </div>

            {/* Profesional */}
            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl border-2 border-cyan-500 p-8 relative md:scale-105 md:-my-4">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Recomendada
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">Profesional</h3>
              <p className="text-gray-300 mb-6">La más popular</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-cyan-400">A CONSULTAR</span>
                <p className="text-cyan-300 text-sm mt-2">Presupuesto personalizado</p>
              </div>
              <ul className="space-y-3 mb-8 text-gray-300">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Hasta 10 páginas
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Diseño a medida
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  SEO local + Google Maps
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Reservas / Formularios
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Copy profesional
                </li>
              </ul>
              <CTAButton href="/contacto/formulario" className="w-full text-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                Contratar ahora
              </CTAButton>
            </div>

            {/* Premium */}
            <div className="bg-gray-900 rounded-xl border border-gray-700 p-8 hover:border-cyan-500 transition-colors">
              <h3 className="text-2xl font-semibold text-white mb-2">Premium</h3>
              <p className="text-gray-400 mb-6">Completa y personalizada</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">A CONSULTAR</span>
                <p className="text-gray-400 text-sm mt-2">Solución a medida</p>
              </div>
              <ul className="space-y-3 mb-8 text-gray-300">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Páginas ilimitadas
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Tienda online básica
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  SEO avanzado
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Analítica + Dashboard
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Mantenimiento 3 meses
                </li>
              </ul>
              <CTAButton href="/contacto/formulario" variant="secondary" className="w-full text-center justify-center">
                Consultar
              </CTAButton>
            </div>
          </div>

          <div className="text-center mb-12">
            <p className="text-gray-300 mb-4">
              ¿Necesitas algo más personalizado? <span className="text-cyan-400">Todos los planes incluyen dominio + hosting 1 año.</span>
            </p>
            <CTAButton href="/precios" variant="secondary">
              Ver tabla completa de precios y extras
            </CTAButton>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Preguntas frecuentes
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "¿Incluye dominio y hosting?",
                a: "Sí, el primer año de dominio + hosting está incluido en cualquier plan. Después es 120 €/año."
              },
              {
                q: "¿Cuánto tiempo tarda la entrega?",
                a: "Entre 10-15 días desde el brief. Depende de la complejidad y qué tan rápido me des información."
              },
              {
                q: "¿Puedo hacer cambios después?",
                a: "Claro, 1 mes de soporte técnico incluido en todos los planes. Luego puedo hacer mantenimiento a 49 €/mes."
              },
              {
                q: "¿Me ayudas con las reseñas de Google?",
                a: "No se pueden eliminar reseñas malas, pero sí podemos mejorar tu reputación digital con una estrategia completa. Consulta."
              },
              {
                q: "¿Necesito saber de tecnología?",
                a: "No, te capacito en todo. El sistema es fácil de usar y te doy soporte siempre que lo necesites."
              },
              {
                q: "¿Hago más caro si necesito más páginas o funciones?",
                a: "Reservas online (+150 €), integración WhatsApp IA (desde 300 €), SEO mensual (desde 250 €). Todo personalizable."
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-cyan-500 transition-colors">
                <h3 className="text-lg font-semibold text-white mb-3">{faq.q}</h3>
                <p className="text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-black via-slate-950 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            ¿Quieres dejar de perder clientes en Google?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Una web profesional que venda es tu mejor inversión. Agendemos una llamada sin compromiso.
          </p>
          <CTAButton href="/contacto/formulario" size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 shadow-xl">
            Agendar llamada gratuita
          </CTAButton>
          <p className="text-sm mt-6 opacity-75">
            30 minutos • Sin compromiso • Análisis personalizado
          </p>
        </div>
      </section>
    </div>
  );
}
