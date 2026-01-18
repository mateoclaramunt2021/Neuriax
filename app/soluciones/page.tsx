import SolutionCard from "../../components/SolutionCard";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soluciones de Automatización e IA | Neuriax | Transformación Digital",
  description: "Soluciones inteligentes de automatización e IA para empresas. Eliminamos procesos manuales, optimizamos operaciones y escalamos resultados. Consulta gratuita.",
  keywords: "automatización de procesos, inteligencia artificial, soluciones digitales, automatización IA, sistemas inteligentes, transformación digital",
  openGraph: {
    title: "Soluciones de Automatización e IA | Neuriax",
    description: "Automatización inteligente + IA aplicada = Operaciones escalables sin fricción",
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
                Soluciones de Automatización e IA Profesionales
              </h1>
              <h2 className="text-xl md:text-2xl mb-4 font-semibold text-blue-400">
                Transforma tu negocio con inteligencia artificial
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Sistemas inteligentes de automatización que eliminan procesos manuales, reducen costos operacionales y escalan tu negocio. Soluciones digitales de IA aplicada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start mb-8">
                <a
                  href="https://calendly.com/neuriax/30min"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all"
                >
                  Consulta Gratuita - Automatización e IA
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
                  alt="Automatización y soluciones digitales"
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
      <section id="soluciones" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Nuestras Soluciones Especializadas
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12">
              Cada solución está diseñada para resolver problemas específicos de tu negocio con tecnología de vanguardia.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <SolutionCard
              icon={
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
              title="Automatización de atención y captación"
              problem="Clientes potenciales contactan pero nunca reciben respuesta oportuna, perdiendo oportunidades de venta por procesos manuales lentos."
              solution="Implemento chatbots inteligentes y sistemas de seguimiento automático que responden instantáneamente y califican leads según su potencial."
              result="Aumento del 300% en respuestas a leads, reducción del 80% en tiempo de respuesta y mejora del 150% en conversión de oportunidades."
            />

            <div className="relative group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
                alt="Automatización de atención al cliente"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl group-hover:scale-105 group-hover:shadow-3xl transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl group-hover:from-black/70 transition-all duration-300"></div>
            </div>

            <div className="relative group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Seguimiento inteligente de leads"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl group-hover:scale-105 group-hover:shadow-3xl transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl group-hover:from-black/70 transition-all duration-300"></div>
            </div>

            <SolutionCard
              icon={
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
              title="Paneles operativos"
              problem="Gerentes sin visibilidad clara de métricas clave, tomando decisiones basadas en intuición en lugar de datos objetivos."
              solution="Implemento dashboards en tiempo real con KPIs personalizados, alertas automáticas y reportes inteligentes que facilitan la toma de decisiones."
              result="Mejora del 150% en velocidad de decisión, reducción del 70% en reuniones innecesarias y aumento del 80% en cumplimiento de objetivos."
            />

            <div className="relative group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Paneles operativos y dashboards"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl group-hover:scale-105 group-hover:shadow-3xl transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl group-hover:from-black/70 transition-all duration-300"></div>
            </div>

            <div className="relative group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Optimización con IA"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl group-hover:scale-105 group-hover:shadow-3xl transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl group-hover:from-black/70 transition-all duration-300"></div>
            </div>

            <SolutionCard
              icon={
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              }
              title="Optimización de procesos con IA"
              problem="Procesos ineficientes que consumen recursos valiosos, con cuellos de botella que frenan el crecimiento del negocio."
              solution="Utilizo algoritmos de IA para analizar patrones, predecir demandas y optimizar flujos de trabajo de manera continua."
              result="Reducción del 50% en costes operativos, aumento del 90% en capacidad de procesamiento y mejora del 200% en satisfacción del cliente."
            />
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Resultados Comprobados
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Nuestras soluciones han transformado cientos de negocios con resultados medibles y sostenibles.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4">300%</div>
              <p className="text-slate-300">Aumento en respuestas a leads</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4">90%</div>
              <p className="text-slate-300">Reducción en leads perdidos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4">60%</div>
              <p className="text-slate-300">Ahorro en tiempo administrativo</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4">200%</div>
              <p className="text-slate-300">Mejora en satisfacción del cliente</p>
            </div>
          </div>
        </div>
      </section>

      {/* Planes de Automatización */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Planes de Automatización
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Soluciones adaptadas a cada nivel de necesidad. Todas incluyen soporte y formación.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* PLAN STARTER */}
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
              <p className="text-gray-400 text-sm mb-6">Automatización esencial</p>
              <div className="mb-6">
                <span className="text-3xl font-bold text-white">600€ - 1.200€</span>
                <p className="text-gray-400 text-sm mt-2">Pago único</p>
              </div>
              <ul className="space-y-3 text-gray-300 mb-8 flex-grow">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>1 flujo de automatización</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Integración con 2-3 herramientas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Configuración y puesta en marcha</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Formación básica de uso</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Soporte 30 días</span>
                </li>
              </ul>
              <a 
                href="https://calendly.com/neuriax/30min" 
                className="w-full text-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all"
              >
                Empezar con Starter
              </a>
            </div>

            {/* PLAN BUSINESS */}
            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-lg p-8 border-2 border-cyan-500 relative flex flex-col">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Más popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Business</h3>
              <p className="text-gray-300 text-sm mb-6">Automatización avanzada</p>
              <div className="mb-6">
                <span className="text-3xl font-bold text-cyan-400">A CONSULTAR</span>
                <p className="text-cyan-300 text-sm mt-2">Presupuesto personalizado</p>
              </div>
              <ul className="space-y-3 text-gray-300 mb-8 flex-grow">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Múltiples flujos de automatización</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Integración con CRM y herramientas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Chatbot con IA incluido</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Dashboard de métricas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Soporte 90 días</span>
                </li>
              </ul>
              <a 
                href="https://calendly.com/neuriax/30min" 
                className="w-full text-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all"
              >
                Solicitar propuesta
              </a>
            </div>

            {/* PLAN ENTERPRISE */}
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
              <p className="text-gray-400 text-sm mb-6">Transformación digital completa</p>
              <div className="mb-6">
                <span className="text-3xl font-bold text-white">A CONSULTAR</span>
                <p className="text-gray-400 text-sm mt-2">Proyecto a medida</p>
              </div>
              <ul className="space-y-3 text-gray-300 mb-8 flex-grow">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Ecosistema de automatización completo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Agentes de IA personalizados</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Integraciones ilimitadas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Consultoría estratégica incluida</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">✓</span>
                  <span>Soporte prioritario 12 meses</span>
                </li>
              </ul>
              <a 
                href="https://wa.me/34631415151?text=Hola%20Mateo,%20quiero%20conocer%20el%20plan%20Enterprise%20de%20automatizaci%C3%B3n" 
                className="w-full text-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all"
              >
                Hablar con un experto
              </a>
            </div>
          </div>

          {/* Texto aclaratorio */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 text-center">
            <p className="text-gray-300 text-lg">
              <span className="font-semibold text-white">Cada negocio tiene necesidades únicas.</span> Los planes Business y Enterprise se presupuestan según la complejidad del proyecto y los sistemas a integrar.
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
            ¿Cuál de estas soluciones necesitas?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Hablemos sobre tu situación específica y diseñemos la solución perfecta para tu negocio.
          </p>
          <a
            href="https://calendly.com/neuriax/30min"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all"
          >
            Agendar consulta gratuita
          </a>
          <p className="text-sm mt-6 opacity-75">
            Sin compromiso • Análisis personalizado • Soluciones a medida
          </p>
        </div>
      </section>
    </div>
  );
}