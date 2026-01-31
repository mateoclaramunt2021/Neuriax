'use client';

import Image from "next/image";
import Link from "next/link";

export default function ConsultoriaDemo() {
  const servicios = [
    {
      titulo: "Estrategia Digital",
      desc: "Plan integral de transformación digital para tu negocio",
      icon: "📱"
    },
    {
      titulo: "Posicionamiento SEO",
      desc: "Domina Google y atrae clientes orgánicos constantemente",
      icon: "🔍"
    },
    {
      titulo: "Marketing Digital",
      desc: "Campañas efectivas que convierten visitantes en clientes",
      icon: "📊"
    },
    {
      titulo: "Desarrollo Web",
      desc: "Webs rápidas, hermosas y que venden de verdad",
      icon: "💻"
    },
    {
      titulo: "Consultoría de Negocios",
      desc: "Asesoramiento estratégico para crecer rentablemente",
      icon: "📈"
    },
    {
      titulo: "Branding y Diseño",
      desc: "Identidad visual que comunica tu propuesta de valor",
      icon: "🎨"
    }
  ];

  const casos = [
    {
      titulo: "Peluquería",
      resultado: "Reservas duplicadas",
      tiempo: "6 meses"
    },
    {
      titulo: "Restaurante",
      resultado: "Más visitas a web",
      tiempo: "8 meses"
    },
    {
      titulo: "Clínica Médica",
      resultado: "Citas automatizadas",
      tiempo: "5 meses"
    },
    {
      titulo: "E-commerce",
      resultado: "Más ventas online",
      tiempo: "4 meses"
    }
  ];

  const testimonios = [
    {
      nombre: "Juan Martínez",
      empresa: "Peluquería Premium",
      texto: "Transformaron completamente mi presencia online. Ahora recibo reservas todos los días. ¡Excelentes profesionales!",
      estrellas: 5
    },
    {
      nombre: "María García",
      empresa: "Restaurante Centro",
      texto: "La estrategia de marketing nos posicionó como referentes en la zona. Ingresos triplicados en un año.",
      estrellas: 5
    },
    {
      nombre: "Carlos López",
      empresa: "Clínica Dental",
      texto: "Profesionales serios que entienden los negocios. Resultados reales y medibles. Los recomiendo sin dudarlo.",
      estrellas: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Banner de DEMO - Sticky */}
      <div className="sticky top-0 z-50 w-full bg-yellow-100 border-b-4 border-yellow-400 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-3">
            <div className="text-2xl mt-1">⚠️</div>
            <div>
              <p className="font-bold text-lg text-yellow-900">ESTA ES UNA PÁGINA DE DEMOSTRACIÓN</p>
              <p className="text-yellow-800 mt-1">
                Las imágenes mostradas son genéricas. Este es un ejemplo de diseño web para agencias de consultoría. En una versión real, utilizarías fotos de tu equipo, proyectos y clientes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '75vh' }}>
        <div className="absolute inset-0">
          <img src="/demos/consultoria/hero.jpg" alt="Consultoría Digital" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/70 via-purple-800/60 to-indigo-900/70"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-left text-white pt-20">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Hagamos crecer tu negocio
            </h1>
            <p className="text-lg md:text-xl mb-10 opacity-95 font-light leading-relaxed">
              Estrategia digital integral para negocios que quieren resultados reales. Somos especialistas en transformar empresas locales en referencias en su sector.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contacto" 
                className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg text-lg inline-block"
              >
                Hablar Ahora
              </a>
              <a 
                href="#servicios" 
                className="bg-white/25 hover:bg-white/35 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 border-2 border-white text-lg inline-block"
              >
                Ver Servicios
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Acerca de Nosotros */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
              <img src="/demos/consultoria/about.jpg" alt="Equipo de Consultoría" className="w-full h-full object-cover" />
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Quiénes Somos</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Somos una agencia de consultoría digital especializada en transformar negocios locales en referencias en línea. Con más de 10 años de experiencia, hemos ayudado a cientos de empresas a crecer exponencialmente.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Nuestro enfoque es simple: combinar estrategia, tecnología y creatividad para obtener resultados medibles. No creemos en promesas vagas, solo en resultados verificables.
              </p>
              
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-3xl font-bold text-indigo-600">10+</p>
                  <p className="text-sm text-gray-600 mt-1">Años Experiencia</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-indigo-600">500+</p>
                  <p className="text-sm text-gray-600 mt-1">Proyectos Exitosos</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-indigo-600">✓</p>
                  <p className="text-sm text-gray-600 mt-1">Clientes Satisfechos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Nuestros Servicios</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Soluciones integrales de consultoría digital para cada etapa de tu crecimiento.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {servicios.map((servicio, idx) => (
              <div 
                key={idx}
                className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl hover:shadow-lg transition-all border border-indigo-100 hover:border-indigo-300"
              >
                <div className="text-5xl mb-4">{servicio.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{servicio.titulo}</h3>
                <p className="text-gray-600 leading-relaxed">{servicio.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Casos de Éxito */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Casos de Éxito</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Resultados reales de empresas que confiaron en nuestra estrategia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {casos.map((caso, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all border border-gray-200 p-6"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{caso.titulo}</h3>
                    <p className="text-sm text-gray-600">{caso.tiempo}</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-indigo-600 mb-2">{caso.resultado}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-gray-900">Lo que dicen nuestros clientes</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonios.map((testimonio, idx) => (
              <div 
                key={idx}
                className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic leading-relaxed">
                  "{testimonio.texto}"
                </p>
                <p className="font-bold text-gray-900">{testimonio.nombre}</p>
                <p className="text-sm text-gray-600">{testimonio.empresa}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-gray-900">Nuestro Proceso</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { numero: "01", titulo: "Análisis", desc: "Entendemos tu negocio, mercado y oportunidades" },
              { numero: "02", titulo: "Estrategia", desc: "Diseñamos plan personalizado con objetivos claros" },
              { numero: "03", titulo: "Ejecución", desc: "Implementamos con precisión y dedicación total" },
              { numero: "04", titulo: "Resultados", desc: "Medimos, optimizamos y escalamos el crecimiento" }
            ].map((paso, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {paso.numero}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{paso.titulo}</h3>
                <p className="text-gray-600 text-sm">{paso.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Contacto */}
      <section id="contacto" className="py-24 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para crecer?
          </h2>
          <p className="text-lg md:text-xl mb-12 opacity-95">
            Agenda una consulta gratuita con nuestro equipo. Sin compromisos, solo soluciones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+34915823456" 
              className="bg-white text-indigo-600 hover:bg-gray-100 px-10 py-5 rounded-lg font-bold transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 inline-block"
            >
              Llamar Ahora
            </a>
            <a 
              href="https://wa.me/34915823456" 
              className="bg-white/20 hover:bg-white/30 text-white px-10 py-5 rounded-lg font-bold transition-all duration-300 border-2 border-white text-lg inline-block"
            >
              Enviar WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-white font-semibold mb-4">Consultoría Digital</h4>
              <p className="text-sm">
                Transformamos negocios a través de estrategia digital integral. Resultados comprobados.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Servicios</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#servicios" className="hover:text-white transition-colors">Estrategia Digital</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors">Marketing</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors">Desarrollo Web</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors">SEO</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contacto</h4>
              <ul className="text-sm space-y-2">
                <li><a href="tel:+34915823456" className="hover:text-white transition-colors">+34 91 582 3456</a></li>
                <li><a href="https://wa.me/34915823456" className="hover:text-white transition-colors">WhatsApp</a></li>
                <li><a href="#contacto" className="hover:text-white transition-colors">Agendar Cita</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Síguenos</h4>
              <div className="flex gap-4 text-sm">
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-sm mb-3">
              © 2024 Consultoría Digital. Todos los derechos reservados.
            </p>
            <p className="text-xs text-gray-400 mb-4">
              ⚠️ <strong>PÁGINA DE DEMOSTRACIÓN:</strong> Este es un ejemplo de diseño web para agencias de consultoría.
            </p>
            <p className="text-xs text-gray-500">
              Diseñado por <a href="https://www.neuriax.com" className="text-indigo-500 hover:text-indigo-400 transition-colors">Neuriax</a> | Estrategia Digital para Agencias
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
