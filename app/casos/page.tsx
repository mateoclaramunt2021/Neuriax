import Image from "next/image";

export default function Casos() {
  const cases = [
    {
      title: "Restaurante familiar: De reservas perdidas a ocupación del 95%",
      sector: "Restaurantes",
      problem: "Un restaurante familiar perdía el 40% de reservas potenciales porque no respondían llamadas en horario de trabajo. Los dueños trabajaban 12 horas diarias gestionando todo manualmente.",
      solution: "Implementé un sistema de reservas automático con chatbot que responde 24/7, confirma reservas instantáneamente y envía recordatorios automáticos.",
      results: [
        "Aumento del 300% en reservas confirmadas",
        "Reducción del 80% en tiempo dedicado a gestión",
        "Ocupación promedio del 95% vs 65% anterior",
        "Aumento del 150% en ingresos por reservas"
      ],
      testimonial: {
        quote: "Ahora podemos dedicar tiempo a cocinar y atender clientes en lugar de estar pegados al teléfono. Nuestro negocio ha crecido un 40% en 6 meses.",
        author: "María González",
        position: "Propietaria, Restaurante La Familia"
      },
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Inmobiliaria: De leads dispersos a cierre de 12 propiedades/mes",
      sector: "Inmobiliarias",
      problem: "Una inmobiliaria pequeña tenía leads en WhatsApp, email, llamadas y redes sociales, pero sin seguimiento sistemático. Perdían el 70% de oportunidades por falta de organización.",
      solution: "Creé un CRM integrado que centraliza todos los leads, automatiza el seguimiento con emails personalizados y genera reportes de conversión automática.",
      results: [
        "Centralización del 100% de leads en una plataforma",
        "Aumento del 250% en leads cualificados",
        "Cierre de 12 propiedades/mes vs 3 anteriores",
        "Reducción del 90% en tiempo administrativo"
      ],
      testimonial: {
        quote: "Antes perdíamos oportunidades por no poder seguir todo. Ahora tenemos un sistema que nos avisa qué hacer con cada lead. Increíble la diferencia.",
        author: "Carlos Rodríguez",
        position: "Director, Inmobiliaria Moderna"
      },
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Consultoría: De caos administrativo a facturación duplicada",
      sector: "Servicios Profesionales",
      problem: "Una consultoría de 8 personas dedicaba 15 horas semanales a tareas administrativas: facturación manual, seguimiento de proyectos y gestión de citas.",
      solution: "Automatización completa de facturación, dashboard de proyectos en tiempo real y sistema de agendamiento automático con clientes.",
      results: [
        "Ahorro de 15 horas semanales en tareas administrativas",
        "Reducción del 95% en errores de facturación",
        "Aumento del 200% en capacidad de nuevos proyectos",
        "Mejora del 150% en satisfacción del cliente"
      ],
      testimonial: {
        quote: "Recuperamos tiempo para hacer lo que realmente importa: servir a nuestros clientes. El ROI fue del 300% en el primer año.",
        author: "Ana Martínez",
        position: "CEO, Consultoría Estratégica"
      },
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Agencia de Marketing: De clientes desorganizados a operación fluida",
      sector: "Agencias Digitales",
      problem: "Una agencia de marketing manejaba 15 clientes con herramientas dispersas (email, sheets, whatsapp). Perdían información constantemente y no podían escalar sin duplicar el equipo.",
      solution: "Implementé un sistema centralizado de gestión de clientes con automatización de reportes, follow-ups programados y dashboard de métricas en tiempo real.",
      results: [
        "Aumento del 180% en capacidad de nuevos clientes sin aumentar staff",
        "Reducción del 70% en tiempo dedicado a tareas administrativas",
        "Mejora del 85% en satisfacción del cliente",
        "Aumento del 120% en retención de clientes"
      ],
      testimonial: {
        quote: "Pasamos de ser muy reactivos a proactivos. Ahora podemos enfocarnos en estrategia en lugar de buscar información. Creció nuestro negocio un 60%.",
        author: "Laura Fernández",
        position: "Socia, Agencia Digital Plus"
      },
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Clínica Dental: De agenda caótica a 100% de ocupación",
      sector: "Sanidad",
      problem: "Una clínica dental recibía 50 consultas semanales pero no podía gestionar confirmaciones de citas. Perdían el 35% por no-show y dejaban huecos vacíos.",
      solution: "Sistema automático de confirmación por SMS/WhatsApp, recordatorios 24 horas antes y lista de espera automática para cancelaciones.",
      results: [
        "Reducción del 85% en no-shows",
        "Aumento de ocupación de 65% a 98%",
        "Incremento del 45% en ingresos sin aumentar capacidad",
        "Mejora del 90% en satisfacción de pacientes"
      ],
      testimonial: {
        quote: "Era frustrante tener puestos disponibles sin pacientes. Ahora la agenda está completa. El sistema se gestiona solo, es increíble.",
        author: "Dr. Miguel López",
        position: "Director, Clínica Dental Nueva Era"
      },
      image: "https://images.unsplash.com/photo-1576091160550-112173f7f869?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Academia de Idiomas: De registro manual a 200% de crecimiento",
      sector: "Educación",
      problem: "Una academia de idiomas gestionaba inscripciones manualmente en hojas de cálculo. Perdían leads por respuestas lentas y no tenían seguimiento de estudiantes.",
      solution: "Automaticé todo: formularios de inscripción en web, confirmación automática, seguimiento de pagos y comunicación con estudiantes mediante bot inteligente.",
      results: [
        "Aumento del 200% en estudiantes nuevos en 3 meses",
        "Reducción del 95% en tiempo administrativo de inscripción",
        "Incremento del 150% en ingresos mensuales",
        "Mejora del 100% en retención de estudiantes"
      ],
      testimonial: {
        quote: "Antes responder consultas era un caos. Ahora el sistema responde al instante y los estudiantes se sienten atendidos. Creció mucho la academia.",
        author: "Sofia Rodríguez",
        position: "Directora, Academia de Idiomas Global"
      },
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Ecommerce: De caos logístico a operación escalable",
      sector: "Retail Online",
      problem: "Una tienda online procesaba pedidos manualmente, enviaba facturas por email y no tenía seguimiento de inventario. Cometía errores constantemente en entregas.",
      solution: "Integré sistema de inventario automático, procesamiento de órdenes sin intervención manual, etiquetado automático de envíos y notificaciones al cliente en tiempo real.",
      results: [
        "Reducción del 80% en errores de pedido",
        "Aumento del 250% en capacidad de ventas diarias",
        "Ahorro del 60% en tiempo de empaque y envío",
        "Aumento del 70% en satisfacción del cliente"
      ],
      testimonial: {
        quote: "El sistema maneja todo automáticamente. Podemos dormir sabiendo que los pedidos se procesan bien. Las ventas se triplicaron sin stress.",
        author: "David López",
        position: "Propietario, Tech Store Express"
      },
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Gimnasio: De cancelaciones a retención del 95%",
      sector: "Fitness",
      problem: "Un gimnasio tenía el 40% de cancelación de membresías por falta de comunicación. No hacían follow-up con miembros inactivos ni recordaban cancelaciones próximas.",
      solution: "Sistema automático de engagement con usuarios: recordatorios de rutinas, notificaciones de clases, alertas previas a cancelación y oferta automática de planes alternativos.",
      results: [
        "Reducción de cancelaciones del 40% al 5%",
        "Aumento del 85% en clientes activos mensualmente",
        "Incremento del 200% en ingresos recurrentes",
        "Mejora del 90% en satisfacción de miembros"
      ],
      testimonial: {
        quote: "Los miembros se sienten motivados y conectados. Ya no se van porque no sienten el apoyo. Nuestro negocio es estable y crece cada mes.",
        author: "Jorge Martínez",
        position: "Gerente, Fitness Elite Club"
      },
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Bufete Legal: De expedientes perdidos a gestión centralizada",
      sector: "Servicios Legales",
      problem: "Un bufete de 5 abogados perdía documentos, olvidaba plazos importantes y no tenía visibilidad de estados de casos. Clientes se quejaban por falta de comunicación.",
      solution: "Sistema centralizado de gestión de casos con automatización de recordatorios de plazos, alertas de documentos vencidos y actualizaciones automáticas para clientes.",
      results: [
        "Reducción del 100% en casos con plazos olvidados",
        "Aumento del 175% en casos manejados simultáneamente",
        "Mejora del 95% en satisfacción de clientes",
        "Ahorro de 20 horas semanales en tareas administrativas"
      ],
      testimonial: {
        quote: "El sistema nos salva de cometer errores costosos. Nunca más olvidamos un plazo. Los clientes ven transparencia total en sus casos.",
        author: "Alejandra García",
        position: "Fundadora, García & Asociados Abogados"
      },
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
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
                Casos de Éxito
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Historias reales de negocios que transformaron su operación con mis soluciones. Resultados concretos, medibles y verificables.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start mb-8">
                <a
                  href="https://calendly.com/neuriax/30min"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all"
                >
                  Agendar consulta gratuita
                </a>
                <a
                  href="#casos"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transition-all"
                >
                  Ver casos de éxito
                </a>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative h-96 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Casos de éxito y transformación empresarial"
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

      {/* Statistics Section */}
      <section className="py-16 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Resultados que Hablan por Sí Solos
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              En los últimos 2 meses, Neuriax ha trabajado con 8 empresas impulsando su transformación mediante automatización y sistemas digitales.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">300%</div>
              <div className="text-slate-300">Aumento promedio en eficiencia</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">85%</div>
              <div className="text-slate-300">Reducción en tiempo administrativo</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">8</div>
              <div className="text-slate-300">Empresas trabajadas (últimos 2 meses)</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-600 mb-2">95%</div>
              <div className="text-slate-600">Satisfacción del cliente</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section id="casos" className="py-20 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Historias de Transformación
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Cada caso representa una victoria real. Historias de negocios que pasaron de luchar día a día a crecer exponencialmente.
            </p>
          </div>

          <div className="space-y-20">
            {cases.map((caseStudy, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                <div className="flex-1">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium">
                      {caseStudy.sector}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                    {caseStudy.title}
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-red-400 mb-2">El Problema</h4>
                      <p className="text-slate-300">{caseStudy.problem}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-green-400 mb-2">La Solución</h4>
                      <p className="text-slate-300">{caseStudy.solution}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-blue-400 mb-4">Los Resultados</h4>
                      <ul className="space-y-2">
                        {caseStudy.results.map((result, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-green-400 mr-2 mt-1">✓</span>
                            <span className="text-slate-300">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-slate-800 rounded-lg shadow-lg border-l-4 border-cyan-500">
                    <blockquote className="text-slate-300 italic mb-4">
                      &ldquo;{caseStudy.testimonial.quote}&rdquo;
                    </blockquote>
                    <div className="text-sm text-slate-400">
                      <div className="font-semibold text-white">{caseStudy.testimonial.author}</div>
                      <div>{caseStudy.testimonial.position}</div>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="relative h-96 w-full group cursor-pointer">
                    <Image
                      src={caseStudy.image}
                      alt={caseStudy.title}
                      fill
                      className="object-cover rounded-lg shadow-xl group-hover:scale-105 group-hover:shadow-2xl transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg group-hover:from-black/50 transition-all duration-300"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Quieres ser el próximo caso de éxito?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Hablemos sobre tu situación actual y diseñemos la solución que transformará tu negocio como lo hice con estos clientes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/neuriax/30min"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all"
            >
              Comenzar tu transformación
            </a>
            <a
              href="mailto:mateoclaramunt2021@gmail.com"
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