'use client';

import Image from "next/image";
import Link from "next/link";

export default function RestauranteDemo() {
  const platos = [
    {
      nombre: "Jamón Ibérico de Bellota Puro",
      desc: "Corte artesanal de la mejor cría ibérica",
      precio: "32€"
    },
    {
      nombre: "Ceviche de Gambas Rojas",
      desc: "Ají amarillo, leche de tigre casera",
      precio: "28€"
    },
    {
      nombre: "Pulpo a la Gallega",
      desc: "Paprika ahumada, patatas tiernas",
      precio: "26€"
    },
    {
      nombre: "Carne Maturada 60 Días",
      desc: "Solomillo de res de pasto, sal marina",
      precio: "45€"
    },
    {
      nombre: "Pescado Salvaje del Cantábrico",
      desc: "Turbot a la sal, hinojo y limón",
      precio: "38€"
    },
    {
      nombre: "Setas Silvestres Rehidratadas",
      desc: "Porcini, boletus, con mantequilla negra",
      precio: "24€"
    },
    {
      nombre: "Postre de Chocolate Artesanal",
      desc: "72% cacao con helado de remolacha",
      precio: "14€"
    },
    {
      nombre: "Flan de Queso de Cabra",
      desc: "Mermelada de tomate, tostadas caseras",
      precio: "12€"
    }
  ];

  const galeria = [
    "/demos/restaurante/hero.jpg",
    "/demos/restaurante/carnes.jpg",
    "/demos/restaurante/pescado.jpg",
    "/demos/restaurante/cocido.jpg",
    "/demos/restaurante/pulpo.jpg",
    "/demos/restaurante/turbot.jpg",
    "/demos/restaurante/postres.jpg",
    "/demos/restaurante/vino-nacional.jpg"
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Banner de DEMO - Sticky */}
      <div className="sticky top-0 z-50 w-full bg-yellow-100 border-b-4 border-yellow-400 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-3">
            <div className="text-2xl mt-1">⚠️</div>
            <div>
              <p className="font-bold text-lg text-yellow-900">ESTA ES UNA PÁGINA DE DEMOSTRACIÓN</p>
              <p className="text-yellow-800 mt-1">
                Las imágenes mostradas son genéricas. Este es un diseño de demostración para mostrar un restaurante de lujo premium. En una versión real, utilizarías fotos auténticas de tu restaurante.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section Premium */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/demos/restaurante/hero.jpg"
            alt="ATROZ Restaurante"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="w-12 h-1 bg-amber-500"></div>
              <span className="text-amber-400 font-light tracking-widest uppercase text-sm">Castelldefels, Barcelona</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-light mb-8 leading-tight tracking-tight">
              ATROZ
            </h1>
            
            <p className="text-2xl md:text-3xl font-light text-gray-200 mb-12 leading-relaxed max-w-xl">
              Cocina honesta. Producto de temporada. Fuego lento.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#reservar" 
                className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-none font-light tracking-wide transition-all duration-300 uppercase text-sm inline-block shadow-lg"
              >
                Reservar Mesa
              </a>
              <a 
                href="#menu" 
                className="border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black px-10 py-4 rounded-none font-light tracking-wide transition-all duration-300 uppercase text-sm inline-block"
              >
                Ver Menú
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestro Concepto */}
      <section className="py-32 px-6 bg-black border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block border border-amber-400 px-6 py-2 rounded-none mb-6">
              <span className="text-amber-400 font-light tracking-widest uppercase text-xs">Nuestro concepto</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-light mb-6 text-white">
              Filosofía ATROZ
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Desde 2019, ATROZ representa un enfoque diferente a la gastronomía. No buscamos innovación por innovación, sino respeto absoluto por el producto de temporada y la técnica culinaria honesta.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-2xl font-light mb-4 text-white">Producto de Temporada</h3>
              <p className="text-gray-400 leading-relaxed">
                Cada ingrediente es seleccionado en su momento óptimo. Cambiamos menú con las estaciones para garantizar frescura y sabor genuino.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🔥</span>
              </div>
              <h3 className="text-2xl font-light mb-4 text-white">Fuego Lento</h3>
              <p className="text-gray-400 leading-relaxed">
                Nuestras cocciones respetan los tiempos. No hay prisa en la cocina. Cada plato requiere atención y paciencia para alcanzar la perfección.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">✋</span>
              </div>
              <h3 className="text-2xl font-light mb-4 text-white">Cocina Honesta</h3>
              <p className="text-gray-400 leading-relaxed">
                Sin pretensiones innecesarias. Cada elemento en el plato tiene un propósito. La técnica sirve al sabor, nunca al revés.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestro Menú */}
      <section id="menu" className="py-32 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block border border-amber-400 px-6 py-2 rounded-none mb-6">
              <span className="text-amber-400 font-light tracking-widest uppercase text-xs">Menú actual</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-light mb-6 text-white">
              Platos de la Casa
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Selección de creaciones que definen nuestra cocina. El menú varía según la disponibilidad de productos de temporada.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {platos.map((plato, idx) => (
              <div 
                key={idx}
                className="border-l border-amber-400 pl-6 py-4 hover:border-amber-300 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-light text-white">{plato.nombre}</h3>
                  <span className="text-amber-400 font-light text-lg whitespace-nowrap ml-4">{plato.precio}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{plato.desc}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700 pt-12">
            <h3 className="text-2xl font-light text-white mb-8 text-center">Maridaje Especial</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-800/50 border border-gray-700 p-8 rounded-none">
                <h4 className="text-xl font-light text-white mb-3">Menú Degustación ATROZ</h4>
                <p className="text-gray-400 text-sm mb-6">
                  6 tiempos preparados por el chef. Experiencia completa de nuestra cocina con ingredientes de temporada seleccionados cada día.
                </p>
                <p className="text-amber-400 font-light text-xl">59€ por persona</p>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 p-8 rounded-none">
                <h4 className="text-xl font-light text-white mb-3">Con Maridaje de Vinos</h4>
                <p className="text-gray-400 text-sm mb-6">
                  Degustación con selección de vinos españoles nacionales e internacionales. Cada copa acompaña a su plato de forma armónica.
                </p>
                <p className="text-amber-400 font-light text-xl">+35€ por persona</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-amber-900/20 border border-amber-400/30 rounded-none text-center">
            <p className="text-gray-300 text-sm">
              💌 Consulta disponibilidad | Cambios según temporada | Alergias e intolerancias: informar con anticipación
            </p>
          </div>
        </div>
      </section>

      {/* Galería Visual */}
      <section className="py-32 px-6 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block border border-amber-400 px-6 py-2 rounded-none mb-6">
              <span className="text-amber-400 font-light tracking-widest uppercase text-xs">Galería</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-light mb-6 text-white">
              Nuestro Mundo
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {galeria.map((src, idx) => (
              <div 
                key={idx}
                className="relative h-64 bg-gray-800 overflow-hidden group cursor-pointer"
              >
                <img 
                  src={src}
                  alt={`ATROZ - Imagen ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creaciones Maestras */}
      <section className="py-32 px-6 bg-gradient-to-b from-gray-900 to-black border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block border border-amber-400 px-6 py-2 rounded-none mb-6">
              <span className="text-amber-400 font-light tracking-widest uppercase text-xs">Firma</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-light mb-6 text-white">
              Creaciones Maestras
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Platos que definen nuestra identidad. Recetas que perfeccionamos durante años.
            </p>
          </div>

          <div className="space-y-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-80 overflow-hidden bg-gray-800">
                <img 
                  src="/demos/restaurante/cocido.jpg"
                  alt="Jamón Ibérico"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-4xl font-light mb-4 text-white">Jamón Ibérico Puro</h3>
                <p className="text-amber-400 font-light text-lg mb-6">32€</p>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Corte artesanal del mejor jamón ibérico de bellota de Jabugo. Seleccionado con cuidado, cortado a mano con técnica tradicional. Se sirve a temperatura ambiente para mantener toda su complejidad de sabores.
                </p>
                <p className="text-gray-500 text-sm">Acompaña pan tostado casero con aceite de oliva virgen extra</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-4xl font-light mb-4 text-white">Pulpo a la Gallega</h3>
                <p className="text-amber-400 font-light text-lg mb-6">26€</p>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Pulpo gallego cocido en su punto exacto. Paprika ahumada de la Vera, aceite de oliva premium y patatas tiernas. Un clásico reinterpretado con respeto absoluto a la tradición.
                </p>
                <p className="text-gray-500 text-sm">Recurso de temporada | Disponibilidad limitada</p>
              </div>
              <div className="relative h-80 overflow-hidden bg-gray-800">
                <img 
                  src="/demos/restaurante/pulpo.jpg"
                  alt="Pulpo a la Gallega"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-80 overflow-hidden bg-gray-800">
                <img 
                  src="/demos/restaurante/turbot.jpg"
                  alt="Pescado Salvaje"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-4xl font-light mb-4 text-white">Pescado Salvaje</h3>
                <p className="text-amber-400 font-light text-lg mb-6">38€</p>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Turbot del Cantábrico a la sal marina. Técnica ancestral que concentra los sabores naturales del pescado. Hinojo fresco y limón de Málaga como únicos acompañantes.
                </p>
                <p className="text-gray-500 text-sm">Pescado diario | Se prepara bajo encargo</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-4xl font-light mb-4 text-white">Carne Maturada</h3>
                <p className="text-amber-400 font-light text-lg mb-6">45€</p>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Solomillo de res de pasto maturado 60 días. Sabor profundo y textura mantecosa. A la parrilla de leña con sal marina gruesa. Lo hacemos solo tres veces por semana.
                </p>
                <p className="text-gray-500 text-sm">Reserva con 24 horas de anticipación</p>
              </div>
              <div className="relative h-80 overflow-hidden bg-gray-800">
                <img 
                  src="/demos/restaurante/carnes.jpg"
                  alt="Carne Maturada"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-32 px-6 bg-black border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block border border-amber-400 px-6 py-2 rounded-none mb-6">
              <span className="text-amber-400 font-light tracking-widest uppercase text-xs">Clientes</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-light mb-6 text-white">
              Lo que dicen
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-gray-700 p-8 hover:border-amber-400 transition-colors">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400">★</span>
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed italic">
                "ATROZ es una revelación. Cada plato respira respeto por el producto. No necesita trucos de cocina, solo buenos ingredientes y técnica honesta. He vuelto tres veces en un mes."
              </p>
              <p className="font-light text-white">Mar García</p>
              <p className="text-xs text-gray-500">Barcelona</p>
            </div>

            <div className="border border-gray-700 p-8 hover:border-amber-400 transition-colors">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400">★</span>
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed italic">
                "El maridaje de vinos fue perfecto. El sommelier entiende profundamente su oficio. Cada copa amplificaba los sabores de la comida de forma mágica. Imprescindible si vienes."
              </p>
              <p className="font-light text-white">Javier Ruiz</p>
              <p className="text-xs text-gray-500">Madrid</p>
            </div>

            <div className="border border-gray-700 p-8 hover:border-amber-400 transition-colors">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400">★</span>
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed italic">
                "Cena de celebración inolvidable. La atmósfera es serena, sin pretensiones. El equipo de servicio anticipaba cada necesidad. Esto es lo que buscaba en Barcelona."
              </p>
              <p className="font-light text-white">Elena Diaz</p>
              <p className="text-xs text-gray-500">Valencia</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Reserva */}
      <section id="reservar" className="py-32 px-6 bg-gradient-to-r from-amber-900 via-black to-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-light mb-6 leading-tight">
            Reserva tu Mesa
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
            Lugares limitados. Recomendamos reservar con 2-3 semanas de anticipación para garantizar disponibilidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+34915823456" 
              className="bg-amber-600 hover:bg-amber-700 text-black px-10 py-5 rounded-none font-light tracking-wide transition-all duration-300 uppercase text-sm shadow-lg hover:shadow-xl transform hover:scale-105 inline-block"
            >
              Llamar Ahora
            </a>
            <a 
              href="https://wa.me/34915823456" 
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black px-10 py-5 rounded-none font-light tracking-wide transition-all duration-300 uppercase text-sm inline-block"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Ubicación y Horarios */}
      <section id="ubicacion" className="py-32 px-6 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Mapa */}
            <div className="relative bg-gray-800 overflow-hidden" style={{ height: '400px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.567890123!2d1.9536!3d41.2904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE3JzI2LjAiTiAxwrA1NycyA6NTIuMSJF!5e0!3m2!1ses!2ses!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Información */}
            <div>
              <div className="inline-block border border-amber-400 px-6 py-2 rounded-none mb-6">
                <span className="text-amber-400 font-light tracking-widest uppercase text-xs">Contacto</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-light mb-12 text-white">Ubicación & Horarios</h2>
              
              <div className="mb-12">
                <h3 className="text-xl font-light mb-4 text-amber-400 uppercase tracking-wide">Dirección</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Paseo Marítimo, 45<br/>
                  08860 Castelldefels<br/>
                  Barcelona, España<br/>
                  <span className="text-sm text-gray-500 mt-2 block">Frente al Mediterráneo | Parking privado</span>
                </p>
              </div>

              <div className="mb-12">
                <h3 className="text-xl font-light mb-4 text-amber-400 uppercase tracking-wide">Horarios</h3>
                <ul className="text-gray-300 text-lg space-y-3">
                  <li className="flex justify-between"><span>Martes a Jueves</span> <span className="text-gray-500">13:30 – 16:00 | 20:00 – 23:30</span></li>
                  <li className="flex justify-between"><span>Viernes y Sábado</span> <span className="text-gray-500">13:30 – 16:00 | 20:00 – 00:30</span></li>
                  <li className="flex justify-between"><span>Domingo</span> <span className="text-gray-500">13:30 – 16:00</span></li>
                  <li className="flex justify-between text-amber-400"><span>Lunes</span> <span>Cerrado</span></li>
                </ul>
                <p className="text-xs text-gray-500 mt-4">Abierto en festivos bajo reserva previa</p>
              </div>

              <div className="space-y-4">
                <a 
                  href="tel:+34915823456" 
                  className="flex items-center gap-4 bg-gray-900 border border-gray-700 p-5 hover:border-amber-400 transition-all group"
                >
                  <div className="w-10 h-10 bg-amber-600/20 border border-amber-600 flex items-center justify-center">
                    <span className="text-amber-400 text-lg">📞</span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wide">Llamadas</p>
                    <p className="text-white font-light">+34 91 582 3456</p>
                  </div>
                </a>

                <a 
                  href="https://wa.me/34915823456" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-gray-900 border border-gray-700 p-5 hover:border-green-500 transition-all group"
                >
                  <div className="w-10 h-10 bg-green-600/20 border border-green-600 flex items-center justify-center">
                    <span className="text-green-400 text-lg">💬</span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wide">WhatsApp</p>
                    <p className="text-white font-light">Envía un mensaje directo</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-400 py-16 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="text-white font-light text-lg mb-6 uppercase tracking-wide">ATROZ</h4>
              <p className="text-sm leading-relaxed text-gray-500">
                Cocina honesta. Producto de temporada. Fuego lento.
              </p>
              <p className="text-xs text-gray-600 mt-4">
                Castelldefels, Barcelona
              </p>
            </div>

            <div>
              <h4 className="text-white font-light text-lg mb-6 uppercase tracking-wide">Menú</h4>
              <ul className="text-sm space-y-3">
                <li><a href="#menu" className="text-gray-500 hover:text-white transition-colors">Platos de la Casa</a></li>
                <li><a href="#galeria" className="text-gray-500 hover:text-white transition-colors">Galería</a></li>
                <li><a href="#ubicacion" className="text-gray-500 hover:text-white transition-colors">Ubicación</a></li>
                <li><a href="#reservar" className="text-gray-500 hover:text-white transition-colors">Reserva</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-light text-lg mb-6 uppercase tracking-wide">Contacto</h4>
              <ul className="text-sm space-y-3">
                <li><a href="tel:+34915823456" className="text-gray-500 hover:text-white transition-colors">+34 91 582 3456</a></li>
                <li><a href="https://wa.me/34915823456" className="text-gray-500 hover:text-white transition-colors">WhatsApp</a></li>
                <li><a href="#ubicacion" className="text-gray-500 hover:text-white transition-colors">Dirección</a></li>
                <li><a href="#ubicacion" className="text-gray-500 hover:text-white transition-colors">Horarios</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-light text-lg mb-6 uppercase tracking-wide">Conecta</h4>
              <div className="flex gap-4 text-sm">
                <a href="#" className="text-gray-500 hover:text-amber-400 transition-colors">Instagram</a>
                <a href="#" className="text-gray-500 hover:text-amber-400 transition-colors">Facebook</a>
                <a href="#" className="text-gray-500 hover:text-amber-400 transition-colors">TripAdvisor</a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-600 mb-3">
              © 2024 ATROZ Restaurante. Todos los derechos reservados.
            </p>
            <p className="text-xs text-gray-700 mb-4 bg-amber-900/20 p-3 border border-amber-400/20 rounded-none inline-block">
              ⚠️ <strong>PÁGINA DE DEMOSTRACIÓN:</strong> Este es un ejemplo de diseño web para restaurantes premium. Las imágenes son genéricas.
            </p>
            <p className="text-xs text-gray-600 mt-4">
              Diseñado por <a href="https://www.neuriax.com" className="text-amber-600 hover:text-amber-400 transition-colors">Neuriax</a> | Estrategia Digital para Negocios Gastronómicos
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
