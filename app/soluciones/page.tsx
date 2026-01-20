import SolutionCard from "../../components/SolutionCard";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soluciones de AutomatizaciÃ³n e IA | Neuriax | TransformaciÃ³n Digital",
  description: "Soluciones inteligentes de automatizaciÃ³n e IA para empresas. Eliminamos procesos manuales, optimizamos operaciones y escalamos resultados. Consulta gratuita.",
  keywords: "automatizaciÃ³n de procesos, inteligencia artificial, soluciones digitales, automatizaciÃ³n IA, sistemas inteligentes, transformaciÃ³n digital",
  openGraph: {
    title: "Soluciones de AutomatizaciÃ³n e IA | Neuriax",
    description: "AutomatizaciÃ³n inteligente + IA aplicada = Operaciones escalables sin fricciÃ³n",
    url: "https://www.neuriax.com/soluciones",
  },
  alternates: {
    canonical: 'https://www.neuriax.com/soluciones',
  },
};

export default function Soluciones() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white py-24 px-6 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Soluciones de AutomatizaciÃ³n e IA Profesionales
              </h1>
              <h2 className="text-xl md:text-2xl mb-4 font-semibold text-blue-400">
                Transforma tu negocio con inteligencia artificial
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Sistemas inteligentes de automatizaciÃ³n que eliminan procesos manuales, reducen costos operacionales y escalan tu negocio. Soluciones digitales de IA aplicada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start mb-8">
                <a
                  href="/contacto"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all"
                >
                  Consulta Gratuita - AutomatizaciÃ³n e IA
                </a>
                <a
                  href="#soluciones"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transition-all"
                >
                  Ver soluciones
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-96 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="AutomatizaciÃ³n y soluciones digitales"
                  fill
                  className="object-cover rounded-lg shadow-2xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent rounded-lg"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-cyan-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Soluciones */}
      <section id="soluciones" className="py-24 px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block bg-cyan-100 text-cyan-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
              SOLUCIONES
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Tres pilares de transformaciÃ³n
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Cada soluciÃ³n resuelve un problema crÃ­tico de tu negocio. ImplementaciÃ³n rÃ¡pida, resultados medibles.
            </p>
          </div>

          <div className="space-y-8">
            {/* SoluciÃ³n 1: CaptaciÃ³n */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="grid lg:grid-cols-3 gap-0">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-8 lg:p-10 text-white">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">CaptaciÃ³n Automatizada</h3>
                  <p className="text-cyan-100 text-sm">Chatbots + Seguimiento inteligente</p>
                </div>
                
                <div className="p-8 lg:p-10 lg:col-span-2">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-500 text-xs">âœ•</span>
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
                          <span className="text-cyan-600 text-xs">âš™</span>
                        </span>
                        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">SoluciÃ³n</span>
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        Chatbots inteligentes 24/7 + seguimiento automÃ¡tico que califica leads y agenda reuniones.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-xs">âœ“</span>
                        </span>
                        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Resultado</span>
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        Respuesta inmediata a todos los leads. MÃ¡s conversiones con menos esfuerzo manual.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SoluciÃ³n 2: Dashboards */}
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
                          <span className="text-red-500 text-xs">âœ•</span>
                        </span>
                        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Problema</span>
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        Gerentes sin visibilidad de mÃ©tricas clave. Decisiones basadas en intuiciÃ³n, no en datos.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center">
                          <span className="text-violet-600 text-xs">âš™</span>
                        </span>
                        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">SoluciÃ³n</span>
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        Dashboards en tiempo real con KPIs personalizados, alertas automÃ¡ticas y reportes inteligentes.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-xs">âœ“</span>
                        </span>
                        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Resultado</span>
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        Decisiones Ã¡giles basadas en datos. Menos reuniones, mÃ¡s acciÃ³n y mejores resultados.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SoluciÃ³n 3: IA */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="grid lg:grid-cols-3 gap-0">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 lg:p-10 text-white">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">OptimizaciÃ³n con IA</h3>
                  <p className="text-emerald-100 text-sm">Algoritmos + AutomatizaciÃ³n avanzada</p>
                </div>
                
                <div className="p-8 lg:p-10 lg:col-span-2">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-500 text-xs">âœ•</span>
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
                          <span className="text-emerald-600 text-xs">âš™</span>
                        </span>
                        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">SoluciÃ³n</span>
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        Algoritmos de IA que analizan patrones, predicen demandas y optimizan flujos continuamente.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-xs">âœ“</span>
                        </span>
                        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Resultado</span>
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        Menos costes operativos, mayor capacidad y clientes mÃ¡s satisfechos con el servicio.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-500 text-sm mb-6">Los resultados varÃ­an segÃºn sector y punto de partida. Te mostramos casos reales en la llamada.</p>
            <a
              href="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all"
            >
              Ver quÃ© soluciÃ³n encaja contigo
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Planes de AutomatizaciÃ³n */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Planes de AutomatizaciÃ³n
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Soluciones adaptadas a cada nivel de necesidad. Todas incluyen soporte y formaciÃ³n.
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
                <p className="text-slate-400 text-sm mb-6">AutomatizaciÃ³n esencial</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-white">600â‚¬ - 1.200â‚¬</span>
                  <p className="text-slate-500 text-sm mt-2">Pago Ãºnico</p>
                </div>
                <ul className="space-y-4 text-slate-300 mb-8 flex-grow">
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-cyan-500/20 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>1 flujo de automatizaciÃ³n</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-cyan-500/20 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>IntegraciÃ³n con 2-3 herramientas</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-cyan-500/20 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>ConfiguraciÃ³n y puesta en marcha</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-cyan-500/20 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>FormaciÃ³n bÃ¡sica de uso</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-cyan-500/20 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Soporte 30 dÃ­as</span>
                  </li>
                </ul>
                <a 
                  href="/contacto" 
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
                MÃ¡s popular
              </div>
              
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/30">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Business</h3>
                <p className="text-cyan-300 text-sm mb-6">AutomatizaciÃ³n avanzada</p>
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
                    <span>MÃºltiples flujos de automatizaciÃ³n</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-cyan-500/30 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-cyan-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>IntegraciÃ³n con CRM y herramientas</span>
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
                    <span>Dashboard de mÃ©tricas</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-cyan-500/30 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-cyan-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Soporte 90 dÃ­as</span>
                  </li>
                </ul>
                <a 
                  href="/contacto" 
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
                <p className="text-slate-400 text-sm mb-6">TransformaciÃ³n digital completa</p>
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
                    <span>Ecosistema de automatizaciÃ³n completo</span>
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
                    <span>ConsultorÃ­a estratÃ©gica incluida</span>
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
              <span className="font-semibold text-white">Cada negocio tiene necesidades Ãºnicas.</span> Los planes Business y Enterprise se presupuestan segÃºn la complejidad del proyecto y los sistemas a integrar.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-black via-slate-950 to-slate-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Â¿CuÃ¡l de estas soluciones necesitas?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Hablemos sobre tu situaciÃ³n especÃ­fica y diseÃ±emos la soluciÃ³n perfecta para tu negocio.
          </p>
          <a
            href="/contacto"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all"
          >
            Agendar consulta gratuita
          </a>
          <p className="text-sm mt-6 opacity-75">
            Sin compromiso â€¢ AnÃ¡lisis personalizado â€¢ Soluciones a medida
          </p>
        </div>
      </section>
    </div>
  );
}
