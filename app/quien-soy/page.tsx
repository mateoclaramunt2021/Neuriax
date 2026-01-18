import Image from "next/image";

export const revalidate = 0; // Force no cache

export default function QuienSomos() {
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
                Quiénes Somos
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Neuriax es especialista en transformar negocios mediante soluciones digitales inteligentes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start mb-8">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold">
                  Automatización • IA • Eficiencia
                </div>
                <div className="bg-slate-800 text-slate-300 px-6 py-3 rounded-lg font-semibold">
                  ✓ 15 empresas en 2 meses transformadas
                </div>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative h-96 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Equipo de trabajo colaborativo"
                  fill
                  className="object-cover rounded-lg shadow-2xl group-hover:scale-105 group-hover:shadow-3xl transition-all duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg group-hover:from-black/70 transition-all duration-300"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-cyan-500/20 rounded-full blur-xl group-hover:bg-cyan-500/30 transition-all duration-300"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/30 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Qué Hacemos */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Qué Hacemos
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Transformamos negocios mediante soluciones digitales que eliminan fricción y multiplican resultados.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Automatización Inteligente</h3>
              <p className="text-slate-300 mb-6">
                Neuriax diseña e implementa sistemas automatizados que liberan tiempo valioso para que las organizaciones se enfoquen en lo que realmente importa: hacer crecer el negocio.
              </p>
              <p className="text-slate-300 mb-6">
                Desde chatbots que responden 24/7 hasta dashboards con visibilidad completa de las operaciones, las soluciones están pensadas para escalar junto al crecimiento.
              </p>
              <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                <p className="text-cyan-400 italic">
                  &quot;La tecnología debe trabajar para ti, no al revés&quot;
                </p>
                <p className="text-slate-400 text-sm mt-2">- Nuestra filosofía</p>
              </div>
            </div>

            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Tecnología y automatización avanzada"
                width={500}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Análisis de datos y métricas"
                width={500}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Resultados Medibles</h3>
              <p className="text-slate-300 mb-6">
                Cada solución implementada incluye métricas claras y objetivos específicos. Neuriax garantiza resultados verificables.
              </p>
              <p className="text-slate-300 mb-6">
                Desde reducciones de costes operativos de hasta 50% hasta aumentos de ingresos de hasta 200%, los clientes reportan ROI desde el primer mes.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center">
                  <div className="text-2xl font-bold text-cyan-400">85%</div>
                  <div className="text-slate-400 text-sm">Reducción tiempo administrativo</div>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center">
                  <div className="text-2xl font-bold text-cyan-400">200%</div>
                  <div className="text-slate-400 text-sm">Aumento eficiencia</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por Qué Lo Hacemos */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Propósito
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Creemos que la tecnología debe estar al servicio de las personas, no al revés.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900 p-8 rounded-xl border border-slate-700 hover:border-cyan-500 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Democratizar la Tecnología</h3>
              <p className="text-slate-300">
                La tecnología más avanzada no debería estar reservada para grandes corporaciones. Neuriax hace que las soluciones de vanguardia sean accesibles para cualquier negocio, desde startups hasta empresas tradicionales.
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-xl border border-slate-700 hover:border-cyan-500 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Trabajo Colaborativo</h3>
              <p className="text-slate-300">
                El enfoque se basa en la colaboración estrecha con los clientes. Cada proyecto es una alianza en la que se aprende, se crece y se celebran los éxitos de forma conjunta.
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-xl border border-slate-700 hover:border-cyan-500 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Resultados Tangibles</h3>
              <p className="text-slate-300">
                No se realizan promesas vacías. Cada solución entregada cuenta con métricas claras, objetivos medibles y resultados verificables. El éxito del cliente es la prioridad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestro Equipo */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Nuestro Equipo
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Profesionales apasionados por la tecnología y comprometidos con el éxito de cada proyecto.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* CEO */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-cyan-500 transition-all duration-300 text-center group">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                  MC
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-lg">
                  👑
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Mateo Claramunt</h3>
              <p className="text-cyan-400 font-semibold mb-4">CEO & Fundador</p>
              <p className="text-slate-400 text-sm">
                Visionario tecnológico con pasión por transformar negocios mediante soluciones digitales innovadoras.
              </p>
              <div className="mt-4 flex justify-center gap-3">
                <a href="https://www.linkedin.com/in/mateoclaramunt" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-slate-700 hover:bg-cyan-600 rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>

            {/* Daniel */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-cyan-500 transition-all duration-300 text-center group">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                  DD
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Daniel Domínguez</h3>
              <p className="text-cyan-400 font-semibold mb-4">Lead Web Developer</p>
              <p className="text-slate-400 text-sm">
                Especialista en desarrollo web, diseño UI/UX y creación de experiencias digitales de alto impacto.
              </p>
              <div className="mt-4 flex justify-center gap-3">
                <a href="#" className="w-8 h-8 bg-slate-700 hover:bg-cyan-600 rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>

            {/* Alex */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-cyan-500 transition-all duration-300 text-center group">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                  AM
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Alejandro Moreno</h3>
              <p className="text-cyan-400 font-semibold mb-4">Lead AI Systems Engineer</p>
              <p className="text-slate-400 text-sm">
                Ingeniero especializado en arquitectura de sistemas de inteligencia artificial y machine learning.
              </p>
              <div className="mt-4 flex justify-center gap-3">
                <a href="#" className="w-8 h-8 bg-slate-700 hover:bg-cyan-600 rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>

            {/* María Pérez */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-cyan-500 transition-all duration-300 text-center group">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                  MP
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">María Pérez</h3>
              <p className="text-cyan-400 font-semibold mb-4">Directora de Administración</p>
              <p className="text-slate-400 text-sm">
                Responsable de la gestión administrativa, financiera y coordinación de recursos empresariales.
              </p>
              <div className="mt-4 flex justify-center gap-3">
                <a href="#" className="w-8 h-8 bg-slate-700 hover:bg-cyan-600 rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agentes de IA */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-slate-950 to-black">
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
              Contamos con agentes de inteligencia artificial especializados que trabajan incansablemente para optimizar cada proceso.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* ARIA - Asistente de Atención */}
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                  🤖
                </div>
                <h3 className="text-xl font-bold text-white mb-2">ARIA</h3>
                <p className="text-cyan-400 text-sm font-semibold mb-3">Asistente de Atención al Cliente</p>
                <p className="text-slate-400 text-sm mb-4">
                  Responde consultas, gestiona tickets de soporte y proporciona asistencia instantánea a clientes 24/7.
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span>Activo</span>
                </div>
              </div>
            </div>

            {/* NOVA - Análisis de Datos */}
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-purple-500/30 hover:border-purple-400 transition-all duration-300 group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                  📊
                </div>
                <h3 className="text-xl font-bold text-white mb-2">NOVA</h3>
                <p className="text-purple-400 text-sm font-semibold mb-3">Analista de Datos</p>
                <p className="text-slate-400 text-sm mb-4">
                  Procesa métricas, genera informes automáticos y detecta patrones para la toma de decisiones estratégicas.
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span>Activo</span>
                </div>
              </div>
            </div>

            {/* ATLAS - Automatización */}
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-emerald-500/30 hover:border-emerald-400 transition-all duration-300 group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <h3 className="text-xl font-bold text-white mb-2">ATLAS</h3>
                <p className="text-emerald-400 text-sm font-semibold mb-3">Motor de Automatización</p>
                <p className="text-slate-400 text-sm mb-4">
                  Ejecuta flujos de trabajo automatizados, integra sistemas y elimina tareas repetitivas en tiempo real.
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span>Activo</span>
                </div>
              </div>
            </div>

            {/* SAGE - Generación de Contenido */}
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-amber-500/30 hover:border-amber-400 transition-all duration-300 group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                  ✍️
                </div>
                <h3 className="text-xl font-bold text-white mb-2">SAGE</h3>
                <p className="text-amber-400 text-sm font-semibold mb-3">Creador de Contenido</p>
                <p className="text-slate-400 text-sm mb-4">
                  Genera textos, emails, posts para redes sociales y contenido optimizado para SEO automáticamente.
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

      {/* Empresas Trabajadas */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Empresas que Confían en Nosotros
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Hemos trabajado con 15 empresas exitosamente en tan solo 2 meses en diferentes sectores. Desde startups hasta pymes consolidadas.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Restaurante La Familia", icon: "🍽️" },
              { name: "Inmobiliaria Moderna", icon: "🏠" },
              { name: "Consultoría Estratégica", icon: "📊" },
              { name: "Agencia Digital Plus", icon: "💼" },
              { name: "Clínica Dental Nueva Era", icon: "😁" },
              { name: "Fitness Elite Club", icon: "💪" },
              { name: "Academia de Idiomas Pro", icon: "🎓" },
              { name: "Tech Store Express", icon: "🛍️" }
            ].map((empresa, index) => (
              <div
                key={index}
                className="bg-slate-800 p-8 rounded-lg border border-slate-700 hover:border-cyan-500 transition-all duration-300 flex flex-col items-center justify-center text-center group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {empresa.icon}
                </div>
                <p className="text-white font-semibold text-sm">
                  {empresa.name}
                </p>
              </div>
            ))}
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
            ¿Listo para transformar tu negocio con Neuriax?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Neuriax es especialista en automatización orientada a hacer realidad la transformación digital de cada empresa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/neuriax/30min"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all"
            >
              Agendar consulta gratuita
            </a>
            <a
              href="mailto:neuriaxx@gmail.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transition-all"
            >
              Enviar email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}