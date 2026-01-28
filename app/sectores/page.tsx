import CTAButton from "../../components/CTAButton";
import Image from "next/image";

export default function Sectores() {
  const sectors = [
    {
      name: "Restaurantes",
      icon: (
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      problems: [
        "Reservas perdidas por falta de respuesta inmediata",
        "Gestión manual de pedidos y mesas",
        "Dificultad para fidelizar clientes"
      ],
      solutions: [
        "Sistema de reservas automático con confirmación instantánea",
        "Panel de control para gestión de mesas y pedidos",
        "Programa de fidelización con recordatorios automáticos"
      ],
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      name: "Inmobiliarias",
      icon: (
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      problems: [
        "Seguimiento manual de propiedades y clientes",
        "Comunicación fragmentada con interesados",
        "Dificultad para gestionar visitas y contratos"
      ],
      solutions: [
        "CRM integrado para gestión de propiedades y leads",
        "Sistema de comunicación automática con interesados",
        "Automatización de contratos y firma digital"
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      name: "Servicios Profesionales",
      icon: (
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8m0 0V4" />
        </svg>
      ),
      problems: [
        "Gestión ineficiente de citas y agenda",
        "Seguimiento manual de proyectos y facturación",
        "Dificultad para mantener comunicación constante con clientes"
      ],
      solutions: [
        "Sistema de agendamiento automático con recordatorios",
        "Dashboard de proyectos con seguimiento en tiempo real",
        "Automatización de facturación y seguimiento de pagos"
      ],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      name: "PYMEs",
      icon: (
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      problems: [
        "Procesos manuales que consumen tiempo valioso",
        "Dificultad para escalar operaciones",
        "Falta de visibilidad en métricas clave"
      ],
      solutions: [
        "Automatización de procesos administrativos",
        "Sistemas escalables que crecen con el negocio",
        "Dashboards con KPIs en tiempo real"
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white py-20 px-6 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-500/15 rounded-full blur-[100px] md:blur-[150px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-blue-600/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/40 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
              <span className="text-cyan-400 text-sm font-medium">SOLUCIONES POR SECTOR</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Cada negocio es diferente.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Tus soluciones también.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-slate-300 max-w-3xl mx-auto">
              No vendo paquetes genéricos. Primero entiendo tu sector y tus problemas reales, luego te propongo lo que tiene sentido.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="/contacto/formulario"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/25 hover:from-cyan-600 hover:to-blue-700 transition-all hover:scale-105"
              >
                Cuéntame tu sector →
              </a>
              <a
                href="#sectores"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/10 hover:bg-white/10 transition-all"
              >
                Ver ejemplos
              </a>
            </div>
            
            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Adaptado a tu caso
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Sin soluciones genéricas
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Te digo si no encaja
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sectores */}
      <section id="sectores" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Encabezado */}
          <div className="text-center mb-16">
            <span className="inline-block bg-cyan-100 text-cyan-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">EJEMPLOS POR SECTOR</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Problemas reales, <span className="text-cyan-600">soluciones concretas</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Estos son ejemplos de cómo trabajo en diferentes sectores. Tu caso puede ser diferente — hablemos y te cuento qué tiene sentido para ti.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16">
            {sectors.map((sector, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={sector.image}
                    alt={sector.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent group-hover:from-slate-900/90 transition-all duration-300"></div>
                  <div className="absolute top-4 left-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      {sector.icon}
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 group-hover:translate-y-1 transition-transform duration-300">
                    <h3 className="text-2xl font-bold text-white">{sector.name}</h3>
                  </div>
                </div>

                <div className="p-8">
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-red-600 mb-3">Problemas comunes:</h4>
                    <ul className="space-y-2">
                      {sector.problems.map((problem, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-red-500 mr-2 mt-1">•</span>
                          <span className="text-slate-700">{problem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-green-600 mb-3">Mis soluciones:</h4>
                    <ul className="space-y-2">
                      {sector.solutions.map((solution, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-500 mr-2 mt-1">•</span>
                          <span className="text-slate-700">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios por Sector */}
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-cyan-500/10 text-cyan-400 text-sm font-semibold px-4 py-2 rounded-full mb-4">RESULTADOS TÍPICOS</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              ¿Qué puedes conseguir? <span className="text-cyan-400">Esto es lo habitual:</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              No prometo números mágicos. Pero sí te cuento qué suele pasar cuando las cosas funcionan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-8 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-all">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="text-xl font-bold text-white mb-4">Restaurantes</h3>
              <p className="text-cyan-400 font-semibold mb-2">Más reservas, menos lío</p>
              <p className="text-slate-400 text-sm">Clientes que reservan solos, confirmaciones automáticas, menos no-shows.</p>
            </div>
            <div className="text-center bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-8 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-all">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-bold text-white mb-4">Inmobiliarias</h3>
              <p className="text-cyan-400 font-semibold mb-2">Leads que valen la pena</p>
              <p className="text-slate-400 text-sm">Filtrado automático, seguimiento sin esfuerzo, menos tiempo perdido.</p>
            </div>
            <div className="text-center bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-8 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-all">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-bold text-white mb-4">Servicios</h3>
              <p className="text-cyan-400 font-semibold mb-2">Menos papeleo, más facturar</p>
              <p className="text-slate-400 text-sm">Agenda automática, recordatorios, menos tareas administrativas.</p>
            </div>
          </div>

          <p className="text-center text-slate-500 text-sm mt-8">
            Cada negocio es diferente. En la llamada vemos qué es realista para tu caso.
          </p>
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
            ¿Tu sector no está aquí?<br />
            <span className="text-cyan-400">Da igual, hablemos.</span>
          </h2>
          <p className="text-xl mb-4 text-slate-300">
            Estos son solo ejemplos. Cada negocio tiene sus particularidades.
          </p>
          <p className="text-lg mb-8 text-slate-400 max-w-2xl mx-auto">
            Cuéntame qué haces, dónde pierdes tiempo, y te digo si puedo ayudarte.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href="/contacto/formulario"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-xl shadow-cyan-500/25 hover:from-cyan-600 hover:to-blue-700 transition-all hover:scale-105"
            >
              Cuéntame sobre tu negocio →
            </a>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Sin compromiso
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Análisis gratis
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Solución a medida
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}