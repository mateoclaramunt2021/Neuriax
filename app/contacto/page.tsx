import ContactForm from "../../components/ContactForm";

export default function Contacto() {
  const faqs = [
    {
      question: "Â¿CuÃ¡nto tiempo toma implementar una soluciÃ³n?",
      answer: "Depende de la complejidad, pero la mayorÃ­a de soluciones bÃ¡sicas estÃ¡n operativas en 1-2 semanas. Soluciones mÃ¡s complejas pueden tomar 4-6 semanas."
    },
    {
      question: "Â¿Trabajas con empresas de cualquier tamaÃ±o?",
      answer: "SÃ­, trabajamos tanto con startups y PYMEs como con empresas mÃ¡s grandes. Adaptamos nuestras soluciones al presupuesto y necesidades de cada cliente."
    },
    {
      question: "Â¿QuÃ© pasa si no estoy satisfecho con los resultados?",
      answer: "Todas nuestras implementaciones incluyen un perÃ­odo de garantÃ­a y ajustes gratuitos. Nuestro objetivo es que obtengas resultados concretos y medibles."
    },
    {
      question: "Â¿Ofreces soporte despuÃ©s de la implementaciÃ³n?",
      answer: "SÃ­, incluimos soporte tÃ©cnico y mantenimiento por al menos 3 meses despuÃ©s de la implementaciÃ³n, con opciÃ³n a contratos de soporte continuo."
    },
    {
      question: "Â¿CÃ³mo mides el Ã©xito de las soluciones?",
      answer: "Establecemos KPIs claros desde el inicio y realizamos seguimiento mensual con reportes detallados de los resultados obtenidos."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Formulario centrado */}
      <section className="py-20 px-6 bg-gradient-to-br from-black via-slate-950 to-slate-900">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              CuÃ©ntanos sobre tu proyecto
            </h1>
            <p className="text-lg text-gray-300">
              Rellena el formulario y nos pondremos en contacto pronto
            </p>
          </div>
          <div className="bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-700">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* InformaciÃ³n de contacto */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Otras formas de contactarnos
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-700 text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
              <a href="mailto:neuriaxx@gmail.com" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                neuriaxx@gmail.com
              </a>
            </div>
            <div className="bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-700 text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">WhatsApp</h3>
              <a href="https://wa.me/34631415151" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                +34 631 415 151
              </a>
            </div>
            <div className="bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-700 text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-12 h-12 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.203 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Instagram</h3>
              <a href="https://www.instagram.com/mateclaramunt" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                @mateclaramunt
              </a>
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
              Respuestas a las dudas mÃ¡s comunes
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
      <section className="py-20 px-6 bg-gradient-to-br from-black via-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Â¿Listo para transformar tu negocio?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            La primera conversaciÃ³n es gratuita
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contacto" className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all">
              Agendar ahora
            </a>
            <a href="mailto:neuriaxx@gmail.com" className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transition-all">
              Enviar email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

