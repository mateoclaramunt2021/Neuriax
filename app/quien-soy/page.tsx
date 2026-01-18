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
              SOBRE NEURIAX
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Tecnología que impulsa<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">negocios reales</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
              Somos una agencia digital especializada en diseño web profesional y automatización con inteligencia artificial.
            </p>
          </div>

          {/* Fundador destacado */}
          <div className="flex flex-col md:flex-row items-center gap-8 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full blur-xl opacity-30"></div>
              <Image
                src="/assets/images/mateo.png"
                alt="Mateo MC - Fundador de Neuriax"
                width={140}
                height={140}
                className="relative rounded-full border-4 border-cyan-500/30 object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Mateo MC</h2>
              <p className="text-cyan-400 font-semibold mb-4">Fundador & CEO</p>
              <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
                Fundó Neuriax con la visión de hacer la tecnología accesible para cualquier negocio. Autodidacta, apasionado por la IA y la productividad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Qué hacemos */}
      <section className="py-24 px-6 bg-slate-900">
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
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-10 border border-slate-700 hover:border-cyan-500 transition-all duration-300 group">
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
                  Velocidad optimizada
                </li>
              </ul>
            </div>

            {/* Automatización */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-10 border border-slate-700 hover:border-purple-500 transition-all duration-300 group">
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

      {/* Por qué Neuriax */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-4 block">Por qué elegirnos</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Nuestro enfoque
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

      {/* Nuestro Equipo */}
      <section className="py-24 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-4 block">El equipo</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Quiénes somos
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Profesionales comprometidos con el éxito de cada proyecto.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* CEO - Mateo */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 hover:border-cyan-500 transition-all duration-300 text-center group">
              <div className="relative w-28 h-28 mx-auto mb-6">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                  MC
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-sm">
                  👑
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Mateo Claramunt</h3>
              <p className="text-cyan-400 font-semibold text-sm mb-4">CEO & Fundador</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Fundó Neuriax con la visión de hacer la tecnología accesible para cualquier negocio. Autodidacta, apasionado por la IA y la productividad.
              </p>
              <div className="mt-4">
                <a href="https://www.linkedin.com/in/mateoclaramunt" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-slate-700 hover:bg-cyan-600 rounded-full inline-flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>

            {/* Daniel */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 hover:border-cyan-500 transition-all duration-300 text-center group">
              <div className="relative w-28 h-28 mx-auto mb-6">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                  DD
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Daniel Domínguez</h3>
              <p className="text-cyan-400 font-semibold text-sm mb-4">Lead Web Developer</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Especialista en desarrollo web, diseño UI/UX y creación de experiencias digitales de alto impacto.
              </p>
              <div className="mt-4">
                <a href="#" className="w-8 h-8 bg-slate-700 hover:bg-cyan-600 rounded-full inline-flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>

            {/* Alejandro */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 hover:border-cyan-500 transition-all duration-300 text-center group">
              <div className="relative w-28 h-28 mx-auto mb-6">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                  AM
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Alejandro Moreno</h3>
              <p className="text-cyan-400 font-semibold text-sm mb-4">Lead AI Engineer</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Ingeniero especializado en arquitectura de sistemas de inteligencia artificial y automatización.
              </p>
              <div className="mt-4">
                <a href="#" className="w-8 h-8 bg-slate-700 hover:bg-cyan-600 rounded-full inline-flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>

            {/* María */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 hover:border-cyan-500 transition-all duration-300 text-center group">
              <div className="relative w-28 h-28 mx-auto mb-6">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                  MP
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">María Pérez</h3>
              <p className="text-cyan-400 font-semibold text-sm mb-4">Directora de Administración</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Responsable de la gestión administrativa, financiera y coordinación de recursos empresariales.
              </p>
              <div className="mt-4">
                <a href="#" className="w-8 h-8 bg-slate-700 hover:bg-cyan-600 rounded-full inline-flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agentes de IA */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-900 via-slate-950 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              <span className="text-cyan-400 text-sm font-medium">Trabajando 24/7</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Nuestros Agentes de IA
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Agentes de inteligencia artificial que trabajan incansablemente para optimizar cada proceso.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* ARIA */}
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  🤖
                </div>
                <h3 className="text-lg font-bold text-white mb-1">ARIA</h3>
                <p className="text-cyan-400 text-xs font-semibold mb-3">Atención al Cliente</p>
                <p className="text-slate-400 text-sm mb-4">
                  Responde consultas y gestiona soporte instantáneo 24/7.
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span>Activo</span>
                </div>
              </div>
            </div>

            {/* NOVA */}
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-purple-500/30 hover:border-purple-400 transition-all duration-300 group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  📊
                </div>
                <h3 className="text-lg font-bold text-white mb-1">NOVA</h3>
                <p className="text-purple-400 text-xs font-semibold mb-3">Analista de Datos</p>
                <p className="text-slate-400 text-sm mb-4">
                  Procesa métricas y genera informes automáticos.
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span>Activo</span>
                </div>
              </div>
            </div>

            {/* ATLAS */}
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-emerald-500/30 hover:border-emerald-400 transition-all duration-300 group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <h3 className="text-lg font-bold text-white mb-1">ATLAS</h3>
                <p className="text-emerald-400 text-xs font-semibold mb-3">Motor de Automatización</p>
                <p className="text-slate-400 text-sm mb-4">
                  Ejecuta flujos automatizados e integra sistemas.
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span>Activo</span>
                </div>
              </div>
            </div>

            {/* SAGE */}
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-amber-500/30 hover:border-amber-400 transition-all duration-300 group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  ✍️
                </div>
                <h3 className="text-lg font-bold text-white mb-1">SAGE</h3>
                <p className="text-amber-400 text-xs font-semibold mb-3">Creador de Contenido</p>
                <p className="text-slate-400 text-sm mb-4">
                  Genera textos, emails y contenido SEO.
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span>Activo</span>
                </div>
              </div>
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