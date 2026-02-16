import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neuriax | Automatización IA & Agentes de Voz Inteligentes",
  description: "Automatiza tu negocio con IA y agentes de voz que trabajan 24/7. Más clientes, menos trabajo manual. Resultados garantizados o te devolvemos el dinero.",
  keywords: "automatización IA, agentes de voz, inteligencia artificial, automatización empresarial, chatbots IA, asistentes virtuales",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO - Impacto inmediato */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Background sutil */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-300">Agentes IA disponibles 24/7</span>
          </div>

          {/* Título principal */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Tu negocio en </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">piloto automático</span>
          </h1>

          {/* Subtítulo */}
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Agentes de voz IA + automatizaciones que <span className="text-cyan-400 font-semibold">captan clientes, responden llamadas y cierran ventas</span> mientras tú te dedicas a lo importante.
          </p>

          {/* CTA Principal */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a 
              href="#contacto" 
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25"
            >
              Quiero automatizar mi negocio
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Garantía 30 días
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Sin compromiso
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Respuesta en 24h
            </span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* SERVICIOS - Solo lo esencial */}
      <section className="py-24 px-4 bg-gradient-to-b from-black to-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Dos soluciones. Un objetivo.
            </h2>
            <p className="text-xl text-gray-400">Más clientes, menos trabajo manual.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Agentes de Voz IA */}
            <div className="group bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300">
              <div className="w-14 h-14 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Agentes de Voz IA</h3>
              <p className="text-gray-300 mb-6">
                Asistentes telefónicos inteligentes que responden llamadas, agendan citas y cualifican leads. Disponibles 24/7, nunca pierdes una oportunidad.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Atiende llamadas 24/7
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Agenda citas automáticamente
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Cualifica leads al instante
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Voz natural e indistinguible
                </li>
              </ul>
            </div>

            {/* Automatizaciones */}
            <div className="group bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Automatización IA</h3>
              <p className="text-gray-300 mb-6">
                Sistemas inteligentes que trabajan por ti: seguimiento de clientes, respuestas automáticas, gestión de tareas. Tu negocio funciona mientras duermes.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Respuestas automáticas
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Seguimiento de leads
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Integración con tus herramientas
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Sin intervención manual
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESO - 3 pasos simples */}
      <section className="py-24 px-4 bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Cómo funciona</h2>
            <p className="text-xl text-gray-400">Simple, rápido, sin complicaciones.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">1</div>
              <h3 className="text-xl font-bold text-white mb-3">Hablamos</h3>
              <p className="text-gray-400">Llamada de 15 min. Me cuentas tu negocio, te digo si puedo ayudarte y cómo.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">2</div>
              <h3 className="text-xl font-bold text-white mb-3">Implemento</h3>
              <p className="text-gray-400">Construyo tu sistema a medida. Tú sigues con tu día a día, yo me encargo.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">3</div>
              <h3 className="text-xl font-bold text-white mb-3">Funciona</h3>
              <p className="text-gray-400">Tu negocio automatizado. Más clientes, menos trabajo. Resultados desde el día 1.</p>
            </div>
          </div>
        </div>
      </section>

      {/* GARANTÍAS */}
      <section className="py-16 px-4 bg-slate-900/50 border-t border-b border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-white mb-2">Garantía 30 días</h3>
              <p className="text-sm text-gray-400">No funciona = devuelvo el dinero</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-white mb-2">Respuesta 24h</h3>
              <p className="text-sm text-gray-400">Siempre disponible para ti</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-white mb-2">Trato directo</h3>
              <p className="text-sm text-gray-400">Hablas conmigo, no con vendedores</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="font-bold text-white mb-2">Resultados medibles</h3>
              <p className="text-sm text-gray-400">Métricas claras, sin humo</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL + CONTACTO */}
      <section id="contacto" className="py-24 px-4 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-green-300 text-sm">Últimos 3 slots disponibles este mes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para automatizar?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            15 minutos de llamada. Sin compromiso. Te digo si puedo ayudarte.
          </p>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 max-w-md mx-auto">
            <form action="/api/send-email" method="POST" className="space-y-4">
              <input 
                type="text" 
                name="name" 
                placeholder="Tu nombre" 
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Tu email" 
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <input 
                type="tel" 
                name="phone" 
                placeholder="Tu teléfono" 
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <select 
                name="service"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
              >
                <option value="">¿Qué te interesa?</option>
                <option value="agentes-voz">Agentes de Voz IA</option>
                <option value="automatizacion">Automatización</option>
                <option value="ambos">Ambos</option>
              </select>
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/25"
              >
                Solicitar llamada gratuita
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              Sin spam. Sin compromiso. Respuesta en menos de 24h.
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400">
            <a href="tel:+34640791041" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +34 640 791 041
            </a>
            <a href="mailto:hola@neuriax.com" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              hola@neuriax.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
