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
                Soluciones por Sector
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Entiendo los desafíos específicos de cada industria. Aquí te muestro cómo mis soluciones se adaptan a diferentes sectores.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start mb-8">
                <a
                  href="https://calendly.com/neuriax/30min"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all"
                >
                  Agendar consulta gratuita
                </a>
                <a
                  href="#sectores"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transition-all"
                >
                  Ver sectores
                </a>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative h-96 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                  alt="Equipos de trabajo colaborando"
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

      {/* Sectores */}
      <section id="sectores" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
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
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Resultados por Sector
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Cada sector tiene sus propias métricas de éxito. Aquí te muestro los resultados típicos que conseguimos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4">85%</div>
              <p className="text-slate-300 mb-2">Aumento en reservas (Restaurantes)</p>
              <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-4">65%</div>
              <p className="text-slate-300">Reducción en tiempo de gestión</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4">200%</div>
              <p className="text-slate-300 mb-2">Más leads cualificados (Inmobiliarias)</p>
              <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-4">75%</div>
              <p className="text-slate-300">Aumento en cierres de ventas</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4">90%</div>
              <p className="text-slate-300 mb-2">Reducción en tareas administrativas</p>
              <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-4">150%</div>
              <p className="text-slate-300">Mejora en satisfacción del cliente</p>
            </div>
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
            ¿En qué sector operas?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Cuéntame sobre tu negocio y te muestro exactamente cómo puedo ayudarte a resolver tus problemas específicos.
          </p>
          <CTAButton
            href="https://calendly.com/neuriax/30min"
            variant="secondary"
            size="lg"
          >
            Agendar consulta gratuita
          </CTAButton>
        </div>
      </section>
    </div>
  );
}