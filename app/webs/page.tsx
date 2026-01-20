import { Metadata } from "next";
import CTAButton from "../../components/CTAButton";
import Image from "next/image";

export const metadata: Metadata = {
  title: "PÃ¡ginas Web Profesionales con SEO Local | Neuriax | DiseÃ±o + AutomatizaciÃ³n",
  description: "PÃ¡ginas web profesionales diseÃ±adas para convertir. Incluye SEO local, reservas automÃ¡ticas, WhatsApp integrado. Perfectas para negocios locales. Desde 790â‚¬.",
  keywords: "pÃ¡ginas web profesionales, diseÃ±o web, pÃ¡ginas web con SEO, reservas online, pÃ¡ginas web negocios, web profesional, agencia web",
  openGraph: {
    title: "PÃ¡ginas Web Profesionales que Convierten - Neuriax",
    description: "DiseÃ±o responsivo + SEO local + Reservas automÃ¡ticas. PÃ¡ginas web que generan clientes para tu negocio.",
    url: "https://www.neuriax.com/webs",
  },
  alternates: {
    canonical: 'https://www.neuriax.com/webs',
  },
};

export default function WebsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                PÃ¡ginas web profesionales que convierten visitas en clientes
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                DiseÃ±o + SEO local + WhatsApp / Reservas. Sin plantillas genÃ©ricas. PÃ¡ginas construidas para negocios locales que venden.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start mb-8">
                <CTAButton href="#precios" size="lg">
                  Ver precios
                </CTAButton>
                <CTAButton href="/contacto" variant="secondary" size="lg">
                  Agendar llamada
                </CTAButton>
              </div>
              <p className="text-sm opacity-75">
                Desde 790 â‚¬ â€¢ Entrega en 15 dÃ­as â€¢ Soporte incluido
              </p>
            </div>

            <div className="relative">
              <div className="relative h-96 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="DiseÃ±o web profesional y moderno"
                  fill
                  className="object-cover rounded-lg shadow-2xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent rounded-lg"></div>
              </div>

              <div className="absolute -top-4 -left-4 w-20 h-20 bg-cyan-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Para quiÃ©n es */}
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
              { title: "PeluquerÃ­as & EstÃ©tica", desc: "Reservas online, galerÃ­a de cortes, promociones y contacto directo por WhatsApp." },
              { title: "ClÃ­nicas & Consultorios", desc: "InformaciÃ³n de servicios, citas online, horarios y ubicaciÃ³n fÃ¡cil de encontrar en Google." },
              { title: "Restaurantes & Bares", desc: "MenÃº online, reservas, ubicaciÃ³n con mapas, galerÃ­a de platos y promociones." },
              { title: "Servicios Profesionales", desc: "Portafolio, tarifas, clientes, testimonios y llamadas a acciÃ³n claras." },
              { title: "E-commerce Local", desc: "Tienda online simple, carrito, mÃ©todos de pago y entregas rÃ¡pidas." },
              { title: "Inmobiliarias", desc: "GalerÃ­a de propiedades, fichas detalladas, citas de visita y contacto directo." },
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-cyan-500 transition-colors">
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QuÃ© incluye */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              QuÃ© incluye cada web
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
                  <h3 className="text-xl font-semibold text-white mb-2">DiseÃ±o responsivo premium</h3>
                  <p className="text-gray-300">Perfecta en mÃ³vil, tablet y desktop. Carga rÃ¡pida y buena experiencia usuario.</p>
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
                  <h3 className="text-xl font-semibold text-white mb-2">SEO local bÃ¡sico</h3>
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
                  <p className="text-gray-300">BotÃ³n para contacto directo, sistema de reservas online o formulario de llamada.</p>
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
                  <p className="text-gray-300">Hosting rÃ¡pido, certificado SSL, copias de seguridad automÃ¡ticas y soporte.</p>
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
              Proceso simple y rÃ¡pido
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              De cero a web lista en 15 dÃ­as.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Brief 15 min</h3>
              <p className="text-gray-300">
                Llamada rÃ¡pida para entender tu negocio, competencia, objetivos y quÃ© quieres lograr.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">DiseÃ±o + Textos</h3>
              <p className="text-gray-300">
                Creo la web con copy orientado a conversiÃ³n, diseÃ±o profesional y llamadas a acciÃ³n claras.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">PublicaciÃ³n + RevisiÃ³n</h3>
              <p className="text-gray-300">
                Deploy, testing, revisiones finales y capacitaciÃ³n. Tu web lista para vender.
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
                <span className="text-gray-400">€</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-300">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  5 pÃ¡ginas
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  DiseÃ±o responsive
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  WhatsApp / Contacto
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  SEO local bÃ¡sico
                </li>
              </ul>
              <CTAButton href="/contacto" variant="secondary" className="w-full text-center justify-center">
                Contratar
              </CTAButton>
            </div>

            {/* Profesional */}
            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl border-2 border-cyan-500 p-8 relative md:scale-105 md:-my-4">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Recomendada
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">Profesional</h3>
              <p className="text-gray-300 mb-6">La mÃ¡s popular</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-cyan-400">A CONSULTAR</span>
                <p className="text-cyan-300 text-sm mt-2">Presupuesto personalizado</p>
              </div>
              <ul className="space-y-3 mb-8 text-gray-300">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Hasta 10 pÃ¡ginas
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  DiseÃ±o a medida
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
              <CTAButton href="/contacto" className="w-full text-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                Contratar ahora
              </CTAButton>
            </div>

            {/* Premium */}
            <div className="bg-gray-900 rounded-xl border border-gray-700 p-8 hover:border-cyan-500 transition-colors">
              <h3 className="text-2xl font-semibold text-white mb-2">Premium</h3>
              <p className="text-gray-400 mb-6">Completa y personalizada</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">A CONSULTAR</span>
                <p className="text-gray-400 text-sm mt-2">SoluciÃ³n a medida</p>
              </div>
              <ul className="space-y-3 mb-8 text-gray-300">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  PÃ¡ginas ilimitadas
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Tienda online bÃ¡sica
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  SEO avanzado
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  AnalÃ­tica + Dashboard
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Mantenimiento 3 meses
                </li>
              </ul>
              <CTAButton href="/contacto" variant="secondary" className="w-full text-center justify-center">
                Consultar
              </CTAButton>
            </div>
          </div>

          {/* Planes Mensuales - Boosts */}
          <div className="mt-16 pt-12 border-t border-gray-700">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Planes mensuales - Potencia tu web existente
              </h3>
              <p className="text-gray-300">
                Si ya tienes web, agrega estas soluciones sin crear una nueva.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Plan Web + SEO */}
              <div className="bg-gradient-to-br from-cyan-900/40 to-slate-900/40 rounded-lg p-8 border-2 border-cyan-500 hover:border-cyan-400 transition-colors relative">
                <div className="absolute -top-4 left-6 bg-cyan-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                  POPULAR
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 mt-4">Web + SEO</h3>
                <p className="text-gray-300 text-sm mb-6">Página profesional con posicionamiento incluido</p>
                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-cyan-400">75€</span>
                    <span className="text-gray-400 ml-2">/mes</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">Primer mes, luego se ajusta según necesidades</p>
                </div>
                <ul className="space-y-3 text-gray-300 mb-8">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-bold">✓</span>
                    <span>Página web profesional</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-bold">✓</span>
                    <span>SEO local incluido</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-bold">✓</span>
                    <span>Diseño responsive</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-bold">✓</span>
                    <span>Dominio + hosting 1 año</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-bold">✓</span>
                    <span>Soporte técnico incluido</span>
                  </li>
                </ul>
                <CTAButton href="/contacto" size="lg" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                  Empezar ahora
                </CTAButton>
              </div>

              {/* Plan Web + SEO + IA */}
              <div className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 rounded-lg p-8 border-2 border-purple-500 hover:border-purple-400 transition-colors relative">
                <div className="absolute -top-4 right-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  RECOMENDADO
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 mt-4">Web + SEO + IA 24/7</h3>
                <p className="text-gray-300 text-sm mb-6">Automatización inteligente para captar y calificar leads</p>
                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-purple-400">desde 150€</span>
                    <span className="text-gray-400 ml-2">/mes</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">Incluye todo del plan anterior +</p>
                </div>
                <ul className="space-y-3 text-gray-300 mb-8">
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-3 font-bold">✓</span>
                    <span>Todo lo del plan Web + SEO</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-3 font-bold">✓</span>
                    <span>Bot WhatsApp inteligente con IA</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-3 font-bold">✓</span>
                    <span>Captación automática de leads 24/7</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-3 font-bold">✓</span>
                    <span>Calificación inteligente de prospectos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-3 font-bold">✓</span>
                    <span>Reportes automáticos diarios</span>
                  </li>
                </ul>
                <CTAButton href="/contacto" size="lg" className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                  Agendar demo
                </CTAButton>
              </div>
            </div>

            {/* Nota aclaratoria */}
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 text-center mt-8">
              <p className="text-gray-300">
                <span className="text-cyan-400 font-semibold">Estos planes son flexibles:</span> puedes empezar con Web + SEO y agregar IA cuando lo necesites.
              </p>
            </div>
          </div>

          <div className="text-center mb-12 mt-16">
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
                q: "Â¿Incluye dominio y hosting?",
                a: "SÃ­, el primer aÃ±o de dominio + hosting estÃ¡ incluido en cualquier plan. DespuÃ©s es 120 â‚¬/aÃ±o."
              },
              {
                q: "Â¿CuÃ¡nto tiempo tarda la entrega?",
                a: "Entre 10-15 dÃ­as desde el brief. Depende de la complejidad y quÃ© tan rÃ¡pido me des informaciÃ³n."
              },
              {
                q: "Â¿Puedo hacer cambios despuÃ©s?",
                a: "Claro, 1 mes de soporte tÃ©cnico incluido en todos los planes. Luego puedo hacer mantenimiento a 49 â‚¬/mes."
              },
              {
                q: "Â¿Me ayudas con las reseÃ±as de Google?",
                a: "No se pueden eliminar reseÃ±as malas, pero sÃ­ podemos mejorar tu reputaciÃ³n digital con una estrategia completa. Consulta."
              },
              {
                q: "Â¿Necesito saber de tecnologÃ­a?",
                a: "No, te capacito en todo. El sistema es fÃ¡cil de usar y te doy soporte siempre que lo necesites."
              },
              {
                q: "Â¿Hago mÃ¡s caro si necesito mÃ¡s pÃ¡ginas o funciones?",
                a: "Reservas online (+150 â‚¬), integraciÃ³n WhatsApp IA (desde 300 â‚¬), SEO mensual (desde 250 â‚¬). Todo personalizable."
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
            Â¿Quieres dejar de perder clientes en Google?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Una web profesional que venda es tu mejor inversiÃ³n. Agendemos una llamada sin compromiso.
          </p>
          <CTAButton href="/contacto" size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 shadow-xl">
            Agendar llamada gratuita
          </CTAButton>
          <p className="text-sm mt-6 opacity-75">
            30 minutos â€¢ Sin compromiso â€¢ AnÃ¡lisis personalizado
          </p>
        </div>
      </section>
    </div>
  );
}

