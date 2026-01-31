'use client';

import Image from "next/image";
import Link from "next/link";

export default function ClinicaDemo() {
  const servicios = [
    {
      titulo: "Medicina General",
      desc: "Consultas de salud integral y seguimiento preventivo",
      icon: "🩺"
    },
    {
      titulo: "Dermatología",
      desc: "Tratamientos de piel, acné, envejecimiento y estética",
      icon: "✨"
    },
    {
      titulo: "Odontología",
      desc: "Implantes, ortodoncia, limpieza y estética dental",
      icon: "😁"
    },
    {
      titulo: "Oftalmología",
      desc: "Revisión visual, graduación y cirugía refractiva",
      icon: "👁️"
    },
    {
      titulo: "Cardiología",
      desc: "Prevención y tratamiento de enfermedades cardíacas",
      icon: "❤️"
    },
    {
      titulo: "Fisioterapia",
      desc: "Rehabilitación y tratamiento de lesiones musculares",
      icon: "💪"
    }
  ];

  const medicos = [
    {
      nombre: "Dr. Juan García López",
      especialidad: "Médico General",
      experiencia: "18 años"
    },
    {
      nombre: "Dra. María Fernández Silva",
      especialidad: "Dermatología",
      experiencia: "12 años"
    },
    {
      nombre: "Dr. Carlos Rodríguez Pérez",
      especialidad: "Odontología",
      experiencia: "15 años"
    },
    {
      nombre: "Dra. Elena Martínez Ruiz",
      especialidad: "Oftalmología",
      experiencia: "14 años"
    }
  ];

  const testimonios = [
    {
      nombre: "Isabel González",
      ciudad: "Barcelona",
      texto: "Excelente atención. Los médicos son muy profesionales y el personal muy amable. La clínica tiene un ambiente tranquilo y acogedor.",
      estrellas: 5
    },
    {
      nombre: "Antonio Rodríguez",
      ciudad: "Madrid",
      texto: "Muy satisfecho con el servicio. El equipo médico escucha tus preocupaciones y explica bien los tratamientos. Lo recomiendo.",
      estrellas: 5
    },
    {
      nombre: "Laura Jiménez",
      ciudad: "Valencia",
      texto: "Clínica moderna con excelentes instalaciones. Citas puntuales y un trato muy personal. Voy a volver sin duda.",
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
                Las imágenes mostradas son genéricas. Este es un ejemplo de diseño web para clínicas médicas. En una versión real, utilizarías fotos auténticas de tu clínica, equipo y pacientes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '75vh' }}>
        <div className="absolute inset-0">
          <img 
            src="/demos/clinica/hero.jpg"
            alt="Clínica Médica"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-blue-800/50 to-teal-800/40"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-left text-white pt-20">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Tu salud en las mejores manos
            </h1>
            <p className="text-lg md:text-xl mb-10 opacity-95 font-light leading-relaxed">
              Clínica integral con profesionales especializados. Atención personalizada, tecnología moderna y compromiso con tu bienestar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#cita" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg text-lg inline-block"
              >
                Agendar Cita
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
            <div className="relative h-96 bg-blue-200 rounded-xl overflow-hidden shadow-lg">
              <img 
                src="/demos/clinica/clinica.jpg"
                alt="Clínica Médica"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Sobre Nuestra Clínica</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Desde 2010, nos dedicamos a proporcionar atención médica de calidad con un enfoque centrado en el paciente. Nuestro equipo de profesionales cuenta con años de experiencia y se mantiene constantemente actualizado en los últimos avances médicos.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Disponemos de instalaciones modernas, equipamiento de última generación y un ambiente acogedor para que te sientas cómodo durante tu visita.
              </p>
              
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-3xl font-bold text-blue-600">14+</p>
                  <p className="text-sm text-gray-600 mt-1">Años de Experiencia</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600">12+</p>
                  <p className="text-sm text-gray-600 mt-1">Especialidades</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600">15K+</p>
                  <p className="text-sm text-gray-600 mt-1">Pacientes Atendidos</p>
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
              Amplia gama de especialidades médicas para cuidar tu salud de forma integral.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {servicios.map((servicio, idx) => (
              <div 
                key={idx}
                className="p-8 bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl hover:shadow-lg transition-all border border-blue-100 hover:border-blue-300"
              >
                <div className="text-5xl mb-4">{servicio.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{servicio.titulo}</h3>
                <p className="text-gray-600 leading-relaxed">{servicio.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo Médico */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Nuestro Equipo Médico</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Profesionales especializados dedicados a tu salud y bienestar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {medicos.map((medico, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center text-6xl">
                  👨‍⚕️
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{medico.nombre}</h3>
                  <p className="text-sm text-blue-600 font-semibold mb-2">{medico.especialidad}</p>
                  <p className="text-xs text-gray-600">{medico.experiencia} de experiencia</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonio */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-gray-900">Lo que dicen nuestros pacientes</h2>
          
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
                <p className="text-sm text-gray-600">{testimonio.ciudad}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agendar Cita */}
      <section id="cita" className="py-24 px-6 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Agenda tu Cita Hoy
          </h2>
          <p className="text-lg md:text-xl mb-12 opacity-95">
            Contáctanos y te atenderemos lo antes posible. Nuestro equipo está disponible para cuidar de ti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+34915823456" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-5 rounded-lg font-bold transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 inline-block"
            >
              Llamar Ahora
            </a>
            <a 
              href="https://wa.me/34915823456" 
              className="bg-white/20 hover:bg-white/30 text-white px-10 py-5 rounded-lg font-bold transition-all duration-300 border-2 border-white text-lg inline-block"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Ubicación y Contacto */}
      <section id="ubicacion" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Mapa */}
            <div className="rounded-xl overflow-hidden shadow-lg h-96 bg-gray-300 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-gray-600">Mapa de ubicación</p>
              </div>
            </div>

            {/* Información */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-10 text-gray-900">Ubicación y Horarios</h2>
              
              <div className="mb-10">
                <h3 className="text-xl font-bold mb-3 text-blue-600">📍 Dirección</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Calle de la Salud, 123<br/>
                  28001 Madrid, España<br/>
                  <span className="text-sm text-gray-600 mt-2 block">A 5 min de Metro Sevilla</span>
                </p>
              </div>

              <div className="mb-10">
                <h3 className="text-xl font-bold mb-3 text-blue-600">🕐 Horarios</h3>
                <ul className="text-gray-700 text-lg space-y-2">
                  <li><strong>Lunes a Viernes:</strong> 08:00 – 20:00</li>
                  <li><strong>Sábados:</strong> 09:00 – 14:00</li>
                  <li><strong>Domingos y Festivos:</strong> Cerrado</li>
                </ul>
                <p className="text-xs text-gray-600 mt-4">💡 Urgencias: disponibles 24/7</p>
              </div>

              <div className="space-y-4">
                <a 
                  href="tel:+34915823456" 
                  className="flex items-center gap-4 bg-white p-5 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all group"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.11.33.217.648.309.95C5.904 10.75 7.119 13.169 9.965 15.93c2.737 2.73 5.144 3.94 8.6 5.55.092.03.167.062.23.1l.774-1.559a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2.694a1 1 0 01-.867-.5c-1.012-1.487-2.492-3.782-4.899-6.689-1.52-1.88-3.088-3.004-4.782-3.75a1 1 0 01-.364-1.58L5.228 3.51A1 1 0 014.886 2.74L2.743 2.065a1 1 0 01-.74-.025L2 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Llamar</p>
                    <p className="text-blue-600 font-semibold">+34 91 582 3456</p>
                  </div>
                </a>

                <a 
                  href="https://wa.me/34915823456" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white p-5 rounded-xl border border-gray-200 hover:border-green-400 hover:bg-green-50 transition-all group"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.364-3.905 6.75-1.914 10.88.942 1.889 2.262 3.464 3.926 4.6 1.664 1.136 3.59 1.798 5.573 1.941 2.584.17 5.242-.822 7.254-2.853 2.012-2.03 2.599-5.193 1.539-7.957-1.562-4.076-5.556-6.583-9.891-6.59zm0-1.23h.008c5.076.03 9.508 3.802 10.854 8.659 1.533 5.509-1.473 10.693-7.027 12.252-5.554 1.56-11.738-1.162-13.282-6.684-1.544-5.522 1.374-11.075 6.962-12.899.833-.25 1.684-.375 2.547-.378" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">WhatsApp</p>
                    <p className="text-green-600 font-semibold">Envía mensaje directo</p>
                  </div>
                </a>
              </div>

              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-gray-700 text-sm">
                  <strong>⚡ Respuesta rápida:</strong> Respondemos en menos de 30 minutos. Para urgencias contacta directamente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-white font-semibold mb-4">Clínica Médica</h4>
              <p className="text-sm">
                Atención médica integral con profesionales especializados. Tu salud es nuestra prioridad.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Servicios</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#servicios" className="hover:text-white transition-colors">Nuestros Servicios</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors">Especialidades</a></li>
                <li><a href="#ubicacion" className="hover:text-white transition-colors">Ubicación</a></li>
                <li><a href="#cita" className="hover:text-white transition-colors">Agendar Cita</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contacto</h4>
              <ul className="text-sm space-y-2">
                <li><a href="tel:+34915823456" className="hover:text-white transition-colors">+34 91 582 3456</a></li>
                <li><a href="https://wa.me/34915823456" className="hover:text-white transition-colors">WhatsApp</a></li>
                <li><a href="#ubicacion" className="hover:text-white transition-colors">Ubicación</a></li>
                <li><a href="#ubicacion" className="hover:text-white transition-colors">Horarios</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Síguenos</h4>
              <div className="flex gap-4 text-sm">
                <a href="#" className="hover:text-white transition-colors">Facebook</a>
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-sm mb-3">
              © 2024 Clínica Médica. Todos los derechos reservados.
            </p>
            <p className="text-xs text-gray-400 mb-4">
              ⚠️ <strong>PÁGINA DE DEMOSTRACIÓN:</strong> Este es un ejemplo de diseño web para clínicas médicas.
            </p>
            <p className="text-xs text-gray-500">
              Diseñado por <a href="https://www.neuriax.com" className="text-blue-500 hover:text-blue-400 transition-colors">Neuriax</a> | Estrategia Digital para Negocios Locales
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
