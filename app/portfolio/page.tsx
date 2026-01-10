import { Metadata } from "next";
import CTAButton from "../../components/CTAButton";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Portfolio de Webs - Neuriax | Diseños Profesionales",
  description: "Ejemplos de páginas web profesionales diseñadas por Neuriax. Webs que venden para peluquerías, restaurantes, clínicas y servicios locales.",
  openGraph: {
    title: "Portfolio de Webs - Neuriax",
    description: "Ejemplos reales de webs optimizadas para conversión. Diseño, SEO local y resultados medibles.",
    url: "https://www.neuriax.com/portfolio",
  },
  alternates: {
    canonical: 'https://www.neuriax.com/portfolio',
  },
};

export default function PortfolioPage() {
  const demos = [
    {
      title: "Demo Web Peluquería",
      category: "Estética",
      features: [
        "Galería de cortes y estilos",
        "Reservas online automáticas",
        "Mapa y ubicación fácil"
      ]
    },
    {
      title: "Demo Web Restaurante",
      category: "Hostelería",
      features: [
        "Menú online con categorías",
        "Reservas para grupos",
        "Ubicación en Google Maps"
      ]
    },
    {
      title: "Demo Web Clínica",
      category: "Salud",
      features: [
        "Servicios y especialidades",
        "Sistema de citas online",
        "Contacto directo vía WhatsApp"
      ]
    },
    {
      title: "Demo Web Consultoría",
      category: "Servicios",
      features: [
        "Portafolio de proyectos",
        "Casos de éxito destacados",
        "CTA a agendamiento claro"
      ]
    },
    {
      title: "Demo Web Estética",
      category: "Belleza",
      features: [
        "Galería de tratamientos",
        "Paquetes y promociones",
        "Integración con sistemas de pago"
      ]
    },
    {
      title: "Demo Web Local Store",
      category: "Retail",
      features: [
        "Catálogo de productos",
        "Horarios y ubicación",
        "Contacto directo y pedidos"
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="py-24 px-6 bg-gradient-to-br from-black via-slate-950 to-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Portfolio de diseños web
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ejemplos reales de webs profesionales diseñadas para convertir. Cada una optimizada para su industria.
          </p>
        </div>
      </section>

      {/* Grid de demos */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {demos.map((demo, idx) => (
              <div key={idx} className="group bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
                {/* Imagen placeholder */}
                <div className="relative h-64 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} className="w-full h-full"></div>
                  </div>
                  <div className="relative text-center">
                    <svg className="w-16 h-16 text-cyan-400/50 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-cyan-300 text-sm font-semibold group-hover:text-cyan-200 transition-colors">Vista previa</p>
                  </div>
                  
                  {/* Overlay con CTA */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <CTAButton href="https://calendly.com/neuriax/30min" className="bg-cyan-500 hover:bg-cyan-600 text-white">
                      Ver en detalle
                    </CTAButton>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <span className="inline-block bg-cyan-900/30 text-cyan-300 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {demo.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-4">{demo.title}</h3>
                  
                  <ul className="space-y-2 mb-6">
                    {demo.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300">
                        <svg className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <CTAButton href="https://calendly.com/neuriax/30min" variant="secondary" className="w-full text-center justify-center">
                    Quiero una igual
                  </CTAButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios de estos diseños */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Por qué estos diseños venden
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Velocidad ultrarrápida</h3>
              <p className="text-gray-300">Carga en menos de 2 segundos. Google premia el speed, tus usuarios también.</p>
            </div>

            <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">SEO local optimizado</h3>
              <p className="text-gray-300">Apareces en Google Maps y búsquedas locales. Clientes que buscan TU tipo de negocio te encuentran.</p>
            </div>

            <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Conversión clara</h3>
              <p className="text-gray-300">Cada elemento está diseñado para guiar al cliente hacia la acción: llamada, reserva, compra o contacto.</p>
            </div>

            <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Móvil first</h3>
              <p className="text-gray-300">El 70% de tus clientes buscan desde el móvil. Nuestros diseños son perfectos en cualquier pantalla.</p>
            </div>

            <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Copy orientado a resultados</h3>
              <p className="text-gray-300">Cada palabra está escrita para persuadir, no para adornar. Textos que cierran ventas.</p>
            </div>

            <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Fácil de mantener</h3>
              <p className="text-gray-300">Cambias fotos, textos y precios sin saber de código. O con mi soporte mensual por 49€.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Casos reales (validación social) */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Resultados reales
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-lg p-8 border border-green-700/50">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-green-400">+150%</span>
              </div>
              <p className="text-white font-semibold mb-2">Incremento en consultas</p>
              <p className="text-gray-300 text-sm">Clínica dental que pasó de 5 a 12 consultas/mes en 3 meses con la web + SEO.</p>
            </div>

            <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-lg p-8 border border-green-700/50">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-green-400">+80%</span>
              </div>
              <p className="text-white font-semibold mb-2">Reservas online</p>
              <p className="text-gray-300 text-sm">Restaurante que automatizó reservas y bajó en un 40% las llamadas a cocina.</p>
            </div>

            <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-lg p-8 border border-green-700/50">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-green-400">3.2k</span>
              </div>
              <p className="text-white font-semibold mb-2">Clientes nuevos/año</p>
              <p className="text-gray-300 text-sm">Peluquería con web + maps que ahora tiene lista de espera los fines de semana.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6 bg-gradient-to-br from-black via-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Quiero una web como estas
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Agendemos una llamada para diseñar la web perfecta para tu negocio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href="https://calendly.com/neuriax/30min" size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
              Ver disponibilidad
            </CTAButton>
            <CTAButton href="/webs" variant="secondary" size="lg">
              Volver a Webs
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}
