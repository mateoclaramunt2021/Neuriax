import Image from "next/image";

export const revalidate = 0; // Force no cache

export default function QuienSomos() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section - IMPACTANTE */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center bg-black overflow-hidden">
        {/* Animated background effects */}
        <div className="absolute inset-0">
          {/* Gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-cyan-500/30 rounded-full blur-[100px] md:blur-[150px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-blue-600/20 rounded-full blur-[80px] md:blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-purple-500/10 rounded-full blur-[60px] md:blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
          
          {/* Radial gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/40 rounded-full px-4 py-2 mb-6 md:mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-cyan-400 text-xs md:text-sm font-medium tracking-wide">ESTO ES NEURIAX</span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 leading-[1.1] tracking-tight">
            <span className="block text-white">No vendemos</span>
            <span className="block text-white">sueños.</span>
            <span className="block mt-2 md:mt-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient-x">
              Construimos realidades.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed px-4">
            La tecnología que transforma negocios <span className="text-cyan-400 font-semibold">no debería ser un privilegio</span>. Debería ser una herramienta.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 md:mb-16 px-4">
            <a
              href="/contacto/formulario"
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30"
            >
              <span className="relative z-10">Quiero transformar mi negocio</span>
              <svg className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </a>
            <a
              href="#historia"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
            >
              Conoce la historia
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto px-4">
            <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">100%</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">Autodidacta</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">0</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">Promesas vacías</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">∞</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">Compromiso</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* La Historia */}
      <section id="historia" className="py-24 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-4 block">El origen</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                De la frustración a la solución
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                Todo empezó viendo cómo negocios con potencial enorme se quedaban atrás por no poder acceder a las herramientas correctas. Agencias que cobraban fortunas por webs mediocres. Consultores que vendían humo. Tecnología que prometía mucho y entregaba poco.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Había una brecha enorme entre lo que los negocios necesitaban y lo que realmente podían pagar. Y decidí cerrarla.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700">
                <div className="text-6xl mb-4">💡</div>
                <p className="text-xl text-white font-semibold mb-2">&quot;La mejor tecnología no sirve de nada si solo pueden usarla los que ya tienen éxito.&quot;</p>
                <p className="text-slate-400">— Filosofía Neuriax</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-500/50">
                    <Image
                      src="/assets/images/mateo-ceo.jpg"
                      alt="Mateo - Fundador"
                      fill
                      className="object-cover object-center"
                      priority
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Mateo</h3>
                    <p className="text-cyan-400">Fundador</p>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Aprendí desarrollo web y automatización de forma autodidacta, mientras trabajaba en hostelería. Cada hora libre era una hora de código. Cada proyecto, un paso hacia adelante. Cometí errores, aprendí rápido, y sobre todo: nunca paré.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-4 block">El camino</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Sin atajos, solo trabajo
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                No hay historia de éxito instantáneo aquí. Solo horas de aprendizaje, proyectos que salieron mal, clientes que confiaron cuando nadie más lo hacía, y una determinación inquebrantable.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Cada web que entrego, cada automatización que implemento, lleva detrás ese camino. Por eso entiendo lo que significa empezar desde cero. Y por eso sé cómo ayudarte.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Valores */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-900 via-slate-950 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-4 block">Lo que nos mueve</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Nuestra misión
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Democratizar la tecnología. Que el tamaño de tu empresa no determine tu capacidad de competir.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6">
                🎯
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Resultados, no promesas</h3>
              <p className="text-slate-400 leading-relaxed">
                No vendemos humo ni métricas infladas. Cada proyecto tiene objetivos claros y medibles. Si no funciona, no tiene sentido.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-2xl mb-6">
                🤝
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Trato directo</h3>
              <p className="text-slate-400 leading-relaxed">
                Hablas conmigo, no con intermediarios. Entiendo tu negocio porque me tomo el tiempo de escucharte de verdad.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-2xl mb-6">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Tecnología que entiendas</h3>
              <p className="text-slate-400 leading-relaxed">
                Sin tecnicismos innecesarios. Te explico todo para que tomes decisiones informadas sobre tu negocio.
              </p>
            </div>
          </div>

          {/* Lo que NO hacemos */}
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">🚫</span>
              Lo que NO hacemos
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <span className="text-red-400 text-xl">✕</span>
                <p className="text-slate-300">Prometer resultados mágicos en 30 días</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-red-400 text-xl">✕</span>
                <p className="text-slate-300">Usar plantillas genéricas para todos</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-red-400 text-xl">✕</span>
                <p className="text-slate-300">Desaparecer después del pago</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-red-400 text-xl">✕</span>
                <p className="text-slate-300">Cobrar por cosas que no necesitas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo Trabajamos */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-4 block">Proceso</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Cómo trabajamos
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Simple, transparente y enfocado en ti.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white">
                1
              </div>
              <div className="flex-1 bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-bold text-white mb-2">Hablamos</h3>
                <p className="text-slate-400">
                  Una llamada sin compromiso para entender qué necesitas. Sin presiones, sin letra pequeña. Solo una conversación honesta sobre tu negocio.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white">
                2
              </div>
              <div className="flex-1 bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-bold text-white mb-2">Diseño la solución</h3>
                <p className="text-slate-400">
                  Te presento una propuesta clara con lo que incluye, cuánto cuesta y cuánto tiempo llevará. Sin sorpresas después.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white">
                3
              </div>
              <div className="flex-1 bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-bold text-white mb-2">Ejecuto y entrego</h3>
                <p className="text-slate-400">
                  Trabajo en tu proyecto manteniéndote informado en cada paso. Cuando está listo, te formo para que puedas manejarlo con autonomía.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white">
                4
              </div>
              <div className="flex-1 bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-bold text-white mb-2">Soporte continuo</h3>
                <p className="text-slate-400">
                  No desaparezco. Cualquier duda, problema o mejora que necesites, estoy ahí. Tu éxito es mi éxito.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué Neuriax - Diferenciadores */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-900 via-slate-950 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-4 block">La diferencia</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Por qué Neuriax
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 rounded-2xl p-8 border border-slate-700/30">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-2xl">🏢</span>
                Agencias tradicionales
              </h3>
              <ul className="space-y-4 text-slate-400">
                <li className="flex items-start gap-3">
                  <span className="text-red-400">•</span>
                  Hablas con comerciales que no entienden de tecnología
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400">•</span>
                  Presupuestos inflados con servicios que no necesitas
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400">•</span>
                  Procesos largos y burocráticos
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400">•</span>
                  Después de entregar, desaparecen
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-2xl p-8 border border-cyan-500/30">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                Neuriax
              </h3>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400">✓</span>
                  Trato directo con quien hace el trabajo
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400">✓</span>
                  Solo pagas por lo que realmente necesitas
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400">✓</span>
                  Ejecución ágil y comunicación constante
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400">✓</span>
                  Soporte real después de cada proyecto
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-black via-slate-950 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para dar el paso?
          </h2>
          <p className="text-xl text-slate-300 mb-10">
            Una conversación puede cambiar el rumbo de tu negocio. Sin compromiso, sin presión. Solo posibilidades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contacto/formulario"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all"
            >
              Agenda una llamada
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="mailto:info@neuriax.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-700 transition-all border border-slate-600"
            >
              Escríbeme directamente
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}