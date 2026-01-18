import Image from "next/image";

export const revalidate = 0; // Force no cache

export default function QuienSomos() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section - Historia */}
      <section className="relative bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="text-center">
            <span className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-semibold px-4 py-2 rounded-full mb-8">
              NUESTRA HISTORIA
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Aprendimos solos.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Ahora ayudamos a otros.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12">
              Todo empezó hace 2 años con una idea simple: aprender a diseñar webs por cuenta propia. YouTube, tutoriales y las primeras herramientas de IA fueron nuestros profesores.
            </p>
          </div>
        </div>
      </section>

      {/* El Origen */}
      <section className="py-24 px-6 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-4 block">El origen</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                De aprender solo a crear para otros
              </h2>
              <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                Hace 2 años, decidí aprender diseño web por mi cuenta. Sin academia, sin bootcamp. Solo YouTube, documentación y muchas horas de práctica.
              </p>
              <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                Cuando llegó la IA generativa, todo cambió. Lo que antes tomaba semanas, ahora se resolvía en días. Aprender se volvió más rápido. Crear, más eficiente. Y ser productivo, más accesible que nunca.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed">
                Esa experiencia se convirtió en Neuriax: la idea de que cualquier negocio puede aprovechar la tecnología moderna para crecer, sin necesidad de ser experto en código.
              </p>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📺</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">YouTube + Documentación</h4>
                      <p className="text-slate-400 text-sm">Aprendizaje autodidacta desde cero</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🤖</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">IA como acelerador</h4>
                      <p className="text-slate-400 text-sm">Productividad multiplicada desde el primer día</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">De proyecto personal a empresa</h4>
                      <p className="text-slate-400 text-sm">15+ clientes en los primeros meses</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qué hacemos */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-4 block">Qué hacemos</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Dos servicios, un objetivo
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Ayudamos a negocios a tener presencia digital profesional y a automatizar lo que les quita tiempo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Diseño Web */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-10 border border-slate-700 hover:border-cyan-500 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Diseño Web Profesional</h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Webs rápidas, modernas y optimizadas para convertir visitantes en clientes. Desde landing pages hasta tiendas online.
              </p>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-cyan-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Diseño responsivo
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-cyan-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  SEO local incluido
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-cyan-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Velocidad de carga optimizada
                </li>
              </ul>
            </div>

            {/* Automatización */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-10 border border-slate-700 hover:border-purple-500 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Automatización con IA</h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Sistemas que trabajan por ti 24/7. Chatbots, seguimiento de leads, dashboards y flujos automatizados.
              </p>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Chatbots inteligentes
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Paneles de métricas
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Integraciones personalizadas
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Filosofía */}
      <section className="py-24 px-6 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-4 block">Filosofía</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Lo que nos mueve
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Tecnología accesible</h3>
              <p className="text-slate-400">
                Las mejores herramientas no deberían estar reservadas para grandes empresas. Las hacemos accesibles para todos.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Productividad real</h3>
              <p className="text-slate-400">
                Cada solución está pensada para ahorrarte tiempo. Menos tareas manuales, más foco en lo importante.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Trabajo cercano</h3>
              <p className="text-slate-400">
                No somos una agencia gigante. Trabajamos contigo directamente, entendiendo tu negocio de verdad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fundador */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 border border-slate-700">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="w-32 h-32 mx-auto md:mx-0 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-5xl font-bold text-white mb-4">
                  MC
                </div>
                <h3 className="text-2xl font-bold text-white">Mateo Claramunt</h3>
                <p className="text-cyan-400 font-semibold">Fundador</p>
              </div>
              
              <div className="md:col-span-2">
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  &quot;Empecé diseñando webs en mi habitación hace 2 años. YouTube fue mi universidad y la IA se convirtió en mi mejor herramienta. Hoy, aplico todo lo que aprendí para ayudar a negocios a crecer más rápido.&quot;
                </p>
                <p className="text-slate-400 leading-relaxed">
                  La idea detrás de Neuriax es simple: hacer que la tecnología moderna sea accesible para cualquier negocio, sin importar su tamaño o presupuesto.
                </p>
                <div className="mt-6">
                  <a 
                    href="https://www.linkedin.com/in/mateoclaramunt" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    Conectar en LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-slate-900 via-slate-950 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            ¿Hablamos?
          </h2>
          <p className="text-xl text-slate-300 mb-10">
            Cuéntanos qué necesita tu negocio. Te ayudamos a encontrar la mejor solución.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/neuriax/30min"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all"
            >
              Agendar llamada
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="mailto:neuriaxx@gmail.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-700 transition-all border border-slate-600"
            >
              Enviar email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}