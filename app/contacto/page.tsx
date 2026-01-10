import Image from "next/image";

export default function Contacto() {
  const faqs = [
    {
      question: "¿Cuánto tiempo toma implementar una solución?",
      answer: "Depende de la complejidad, pero la mayoría de soluciones básicas están operativas en 1-2 semanas. Soluciones más complejas pueden tomar 4-6 semanas."
    },
    {
      question: "¿Trabajas con empresas de cualquier tamaño?",
      answer: "Sí, trabajamos tanto con startups y PYMEs como con empresas más grandes. Adaptamos nuestras soluciones al presupuesto y necesidades de cada cliente."
    },
    {
      question: "¿Qué pasa si no estoy satisfecho con los resultados?",
      answer: "Todas nuestras implementaciones incluyen un período de garantía y ajustes gratuitos. Nuestro objetivo es que obtengas resultados concretos y medibles."
    },
    {
      question: "¿Ofreces soporte después de la implementación?",
      answer: "Sí, incluimos soporte técnico y mantenimiento por al menos 3 meses después de la implementación, con opción a contratos de soporte continuo."
    },
    {
      question: "¿Cómo mides el éxito de las soluciones?",
      answer: "Establecemos KPIs claros desde el inicio y realizamos seguimiento mensual con reportes detallados de los resultados obtenidos."
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
                Hablemos de tu negocio
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Estamos aquí para entender tus desafíos y diseñar la solución perfecta que transforme tu operación.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start mb-8">
                <a
                  href="https://calendly.com/mateoastraautomations/30min"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all"
                >
                  Agendar consulta gratuita
                </a>
                <a
                  href="mailto:mateoclaramunt2021@gmail.com"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transition-all"
                >
                  Enviar email
                </a>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative h-96 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Consulta gratuita y transformación empresarial"
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

      {/* Contact Info & CTA */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-700">
              <h2 className="text-3xl font-bold text-white mb-6">Agenda una consulta gratuita</h2>
              <p className="text-slate-300 mb-8">
                En una llamada de 30 minutos analizaremos tu situación actual, identificaremos las oportunidades de mejora y te presentaré un plan personalizado.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-cyan-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-slate-300">mateoclaramunt2021@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-cyan-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-slate-700">+34 631 415 151</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-cyan-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m-6 4h8m-8 4h8m-8 4h8" />
                  </svg>
                  <a href="https://www.instagram.com/mateclaramunt?igsh=MXRjcXE2MXd1Y3ZrYg%3D%3D&utm_source=qr" className="text-slate-700 hover:text-cyan-600 transition-colors">@mateclaramunt</a>
                </div>
              </div>

              <a
                href="https://calendly.com/mateoastraautomations/30min"
                className="inline-flex items-center justify-center w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all"
              >
                Agendar consulta gratuita
              </a>
            </div>

            <div className="bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-6">¿Qué esperar de nuestra conversación?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 text-lg">✓</span>
                  <span className="text-slate-300">Análisis detallado de tus procesos actuales y puntos de dolor</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 text-lg">✓</span>
                  <span className="text-slate-300">Identificación de oportunidades de automatización y mejora</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 text-lg">✓</span>
                  <span className="text-slate-300">Propuesta de soluciones específicas para tu caso</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 text-lg">✓</span>
                  <span className="text-slate-300">Estimación de tiempos, costes y retorno de inversión</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 text-lg">✓</span>
                  <span className="text-slate-300">Plan de implementación paso a paso</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Preguntas frecuentes
            </h2>
            <p className="text-lg text-slate-300">
              Respuestas a las dudas más comunes sobre mis servicios
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-slate-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para transformar tu negocio?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            La primera conversación es gratuita. No tienes nada que perder y mucho que ganar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/mateoastraautomations/30min"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all"
            >
              Agendar ahora
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