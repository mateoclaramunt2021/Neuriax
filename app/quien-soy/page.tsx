import Image from "next/image";

export const revalidate = 0; // Force no cache

export default function QuienSomos() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-semibold px-4 py-2 rounded-full mb-8">
              NUESTRA HISTORIA
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              No vendemos sueños,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">construimos realidades</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
              Neuriax nació de una idea simple: la tecnología de verdad debería estar al alcance de cualquier negocio, no solo de las grandes corporaciones.
            </p>
          </div>
        </div>
      </section>

      {/* La Historia */}
      <section className="py-24 px-6 bg-slate-900">
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
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                    M
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