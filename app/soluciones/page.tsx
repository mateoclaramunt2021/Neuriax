import SolutionCard from "../../components/SolutionCard";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soluciones de Automatización e IA | Neuriax | Transformación Digital",
  description: "Soluciones inteligentes de automatización e IA para empresas. Eliminamos procesos manuales, optimizamos operaciones y escalamos resultados. Consulta gratuita.",
  keywords: "automatización de procesos, inteligencia artificial, soluciones digitales, automatización IA, sistemas inteligentes, transformación digital",
  openGraph: {
    title: "Soluciones de Automatización e IA | Neuriax",
    description: "Automatización inteligente + IA aplicada = Operaciones escalables sin fricción",
    url: "https://www.neuriax.com/soluciones",
  },
  alternates: {
    canonical: 'https://www.neuriax.com/soluciones',
  },
};

export default function Soluciones() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section - IMPACTANTE */}
      <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center justify-center bg-black overflow-hidden">
        {/* Animated background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-500/20 rounded-full blur-[100px] md:blur-[150px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-purple-600/15 rounded-full blur-[80px] md:blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/40 rounded-full px-4 py-2 mb-6 md:mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-cyan-400 text-xs md:text-sm font-medium tracking-wide">AUTOMATIZACIÓN E IA</span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8 leading-[1.1] tracking-tight">
            <span className="block text-white">Menos tareas manuales.</span>
            <span className="block mt-2 md:mt-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              Más tiempo para lo importante.
            </span>
          </h1>

          {/* Subheadline - Mensaje auténtico */}
          <p className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed px-4">
            No prometo resultados mágicos. Sí puedo <span className="text-cyan-400 font-semibold">analizar tus procesos</span>, encontrar dónde pierdes tiempo, y automatizar lo que tiene sentido automatizar.
          </p>

          {/* CTA Buttons - MEJORADO CON URGENCIA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 md:mb-16 px-4">
            <a
              href="/contacto/formulario"
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30"
            >
              <span className="relative z-10">🚀 Descubrir Ahorros Reales (Auditoría Gratis)</span>
              <svg className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#soluciones"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/10 hover:bg-white/10 transition-all"
            >
              ✓ Ver soluciones específicas
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>

          {/* Diferenciadores honestos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto px-4">
            <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-sm text-slate-300">Solo automatizo lo que tiene sentido</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-2xl mb-2">🤝</div>
              <div className="text-sm text-slate-300">Trato directo, sin intermediarios</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm text-slate-300">Te explico todo sin tecnicismos</div>
            </div>
          </div>
        </div>
      </section>

      {/* El problema que resuelvo */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Problema */}
          <div className="text-center mb-16">
            <span className="inline-block bg-red-500/10 text-red-400 text-sm font-semibold px-4 py-2 rounded-full mb-4">EL PROBLEMA</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Pasas horas en tareas que <span className="text-red-400">no aportan valor</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Copiar datos de un sitio a otro. Responder los mismos emails. Seguimiento manual de clientes. Horas que podrías dedicar a lo que realmente importa.
            </p>
          </div>

          {/* Ejemplos de problemas */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="bg-red-900/20 border border-red-800/50 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-lg font-bold text-white mb-2">Tiempo perdido</h3>
              <p className="text-gray-400 text-sm">Tareas repetitivas que hacen que el día no te rinda.</p>
            </div>
            <div className="bg-red-900/20 border border-red-800/50 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">😤</div>
              <h3 className="text-lg font-bold text-white mb-2">Leads sin responder</h3>
              <p className="text-gray-400 text-sm">Clientes potenciales que se van porque tardas en contestar.</p>
            </div>
            <div className="bg-red-900/20 border border-red-800/50 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-bold text-white mb-2">Datos dispersos</h3>
              <p className="text-gray-400 text-sm">Información en Excel, emails, notas... imposible de gestionar.</p>
            </div>
            <div className="bg-red-900/20 border border-red-800/50 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-lg font-bold text-white mb-2">Errores humanos</h3>
              <p className="text-gray-400 text-sm">Copiar y pegar, olvidar seguimientos, perder información.</p>
            </div>
          </div>

          {/* La pregunta clave */}
          <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-2xl p-8 border border-cyan-700/50 text-center">
            <p className="text-2xl md:text-3xl text-white font-bold mb-4">
              ¿Y si la tecnología hiciera eso por ti?
            </p>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              No hablo de magia. Hablo de automatizaciones reales que funcionan mientras tú te dedicas a lo que importa: tu negocio, tu familia, tu vida.
            </p>
          </div>
        </div>
      </section>

      {/* Soluciones */}
      <section id="soluciones" className="py-24 px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block bg-cyan-100 text-cyan-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
              QUÉ PUEDO HACER POR TI
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Tres formas de <span className="text-cyan-600">recuperar tu tiempo</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Dependiendo de lo que necesites, hay diferentes caminos. Te explico cuál encaja mejor contigo.
            </p>
          </div>

          <div className="space-y-8">
            {/* Solución 1: Captación */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="grid lg:grid-cols-3 gap-0">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-8 lg:p-10 text-white">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Captación Automatizada</h3>
                  <p className="text-cyan-100 text-sm">Chatbots + Seguimiento inteligente</p>
                </div>
                
                <div className="p-8 lg:p-10 lg:col-span-2">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-500 text-xs">✕</span>
                        </span>
                        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Problema</span>
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        Leads que contactan pero no reciben respuesta a tiempo. Oportunidades perdidas por procesos manuales.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center">
                          <span className="text-cyan-600 text-xs">⚙</span>
                        </span>
                        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Solución</span>
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        Chatbots inteligentes 24/7 + seguimiento automático que califica leads y agenda reuniones.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-xs">✓</span>
                        </span>
                        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Resultado</span>
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        Respuesta inmediata a todos los leads. Más conversiones con menos esfuerzo manual.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Solución 2: Dashboards */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="grid lg:grid-cols-3 gap-0">
                <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-8 lg:p-10 text-white">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Paneles Operativos</h3>
                  <p className="text-violet-100 text-sm">Dashboards + KPIs en tiempo real</p>
                </div>
                
                <div className="p-8 lg:p-10 lg:col-span-2">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-500 text-xs">✕</span>
                        </span>
                        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Problema</span>
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        Gerentes sin visibilidad de métricas clave. Decisiones basadas en intuición, no en datos.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center">
                          <span className="text-violet-600 text-xs">⚙</span>
                        </span>
                        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Solución</span>
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        Dashboards en tiempo real con KPIs personalizados, alertas automáticas y reportes inteligentes.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-xs">✓</span>
                        </span>
                        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Resultado</span>
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        Decisiones ágiles basadas en datos. Menos reuniones, más acción y mejores resultados.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Solución 3: IA */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="grid lg:grid-cols-3 gap-0">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 lg:p-10 text-white">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Optimización con IA</h3>
                  <p className="text-emerald-100 text-sm">Algoritmos + Automatización avanzada</p>
                </div>
                
                <div className="p-8 lg:p-10 lg:col-span-2">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-500 text-xs">✕</span>
                        </span>
                        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Problema</span>
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        Procesos ineficientes que consumen recursos. Cuellos de botella que frenan el crecimiento.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                          <span className="text-emerald-600 text-xs">⚙</span>
                        </span>
                        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Solución</span>
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        Algoritmos de IA que analizan patrones, predicen demandas y optimizan flujos continuamente.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-xs">✓</span>
                        </span>
                        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Resultado</span>
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        Menos costes operativos, mayor capacidad y clientes más satisfechos con el servicio.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-500 text-sm mb-6">No todos los negocios necesitan todo esto. En la llamada vemos qué tiene sentido para ti.</p>
            <a
              href="/contacto/formulario"
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all"
            >
              Descubrir qué necesito
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Planes de Automatización */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-green-500/10 text-green-400 text-sm font-semibold px-4 py-2 rounded-full mb-4">INVERSIÓN</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              ¿Cuánto cuesta automatizar?<br />
              <span className="text-cyan-400">Menos de lo que imaginas.</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Te doy precio cerrado antes de empezar. Sin sorpresas, sin letra pequeña.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* PLAN STARTER */}
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 flex flex-col group overflow-hidden">
              {/* Glow effect */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all"></div>
              
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
                <p className="text-slate-400 text-sm mb-6">Automatización esencial</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-white">600€ - 1.200€</span>
                  <p className="text-slate-500 text-sm mt-2">Pago único</p>
                </div>
                <ul className="space-y-4 text-slate-300 mb-8 flex-grow">
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-cyan-500/20 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>1 flujo de automatización</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-cyan-500/20 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Integración con 2-3 herramientas</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-cyan-500/20 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Configuración y puesta en marcha</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-cyan-500/20 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Formación básica de uso</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-cyan-500/20 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Soporte 30 días</span>
                  </li>
                </ul>
                <a 
                  href="/contacto/formulario" 
                  className="w-full text-center px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
                >
                  Empezar con Starter
                </a>
              </div>
            </div>

            {/* PLAN BUSINESS */}
            <div className="relative bg-gradient-to-br from-cyan-950 via-slate-900 to-blue-950 rounded-2xl p-8 pt-12 border-2 border-cyan-500 flex flex-col group transform hover:scale-[1.02] transition-all duration-300">
              {/* Glow effect */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg z-10">
                Más popular
              </div>
              
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/30">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Business</h3>
                <p className="text-cyan-300 text-sm mb-6">Automatización avanzada</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-cyan-400">A CONSULTAR</span>
                  <p className="text-cyan-400/70 text-sm mt-2">Presupuesto personalizado</p>
                </div>
                <ul className="space-y-4 text-slate-200 mb-8 flex-grow">
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-cyan-500/30 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-cyan-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Múltiples flujos de automatización</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-cyan-500/30 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-cyan-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Integración con CRM y herramientas</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-cyan-500/30 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-cyan-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Chatbot con IA incluido</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-cyan-500/30 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-cyan-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Dashboard de métricas</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-cyan-500/30 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-cyan-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Soporte 90 días</span>
                  </li>
                </ul>
                <a 
                  href="/contacto/formulario" 
                  className="w-full text-center px-6 py-4 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl transition-all shadow-lg"
                >
                  Solicitar propuesta
                </a>
              </div>
            </div>

            {/* PLAN ENTERPRISE */}
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 hover:border-purple-500/50 transition-all duration-300 flex flex-col group overflow-hidden">
              {/* Glow effect */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-all"></div>
              
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                <p className="text-slate-400 text-sm mb-6">Transformación digital completa</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-white">A CONSULTAR</span>
                  <p className="text-slate-500 text-sm mt-2">Proyecto a medida</p>
                </div>
                <ul className="space-y-4 text-slate-300 mb-8 flex-grow">
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-purple-500/20 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Ecosistema de automatización completo</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-purple-500/20 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Agentes de IA personalizados</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-purple-500/20 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Integraciones ilimitadas</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-purple-500/20 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Consultoría estratégica incluida</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-purple-500/20 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Soporte prioritario 12 meses</span>
                  </li>
                </ul>
                <a 
                  href="https://wa.me/34631415151?text=Hola%20Mateo,%20quiero%20conocer%20el%20plan%20Enterprise%20de%20automatizaci%C3%B3n" 
                  className="w-full text-center px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
                >
                  Hablar con un experto
                </a>
              </div>
            </div>
          </div>

          {/* Texto aclaratorio */}
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700 text-center">
            <p className="text-slate-300 text-lg">
              <span className="font-semibold text-white">Cada negocio tiene necesidades únicas.</span> Los planes Business y Enterprise se presupuestan según la complejidad del proyecto y los sistemas a integrar.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-black via-slate-950 to-slate-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Cada hora que pierdes en tareas manuales<br />
            <span className="text-cyan-400">es una hora menos para tu negocio</span>
          </h2>
          <p className="text-xl mb-4 text-slate-300">
            No te vendo humo. Si después de hablar veo que no necesitas automatizar, te lo digo.
          </p>
          <p className="text-lg mb-8 text-slate-400 max-w-2xl mx-auto">
            Pero si hay algo que se puede mejorar, te lo muestro con números reales.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href="/contacto/formulario"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-xl shadow-cyan-500/25 hover:from-cyan-600 hover:to-blue-700 transition-all hover:scale-105"
            >
              Quiero recuperar mi tiempo →
            </a>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Sin compromiso
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Garantía 30 días
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Te digo si no lo necesitas
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}