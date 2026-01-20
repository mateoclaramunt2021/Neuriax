'use client';

import Image from "next/image";
import Link from "next/link";

export default function PeluqueriaDemo() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Banner de DEMO */}
      <div className="sticky top-0 z-50 w-full bg-yellow-100 border-b-4 border-yellow-400 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-3">
            <div className="text-2xl mt-1">âš ï¸</div>
            <div>
              <p className="font-bold text-lg text-yellow-900">ESTA ES UNA PÃGINA DE DEMOSTRACIÃ“N</p>
              <p className="text-yellow-800 mt-1">
                Las imÃ¡genes mostradas son genÃ©ricas y de ejemplo. Este es un diseÃ±o de demostraciÃ³n para mostrar la estructura y funcionalidad de un sitio web para salones de peluquerÃ­a. En una versiÃ³n real, utilizarÃ­as fotos autÃ©nticas de tu salÃ³n, clientes y resultados de trabajos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '75vh' }}>
        {/* Background Image con overlay gradiente profesional */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `url('/demos/peluqueria/hero.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          {/* Overlay gradiente suave: izquierda oscura para legibilidad, derecha mÃ¡s clara */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-left text-white pt-20">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
              Color, corte y salud capilar con acabado premium
            </h1>
            <p className="text-lg md:text-xl mb-10 opacity-95 font-light leading-relaxed">
              En Lumen Hair Studio combinamos tÃ©cnicas de salÃ³n profesional con productos de alta gama. Cada cliente recibe diagnÃ³stico personalizado y resultados que duran.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://calendly.com/demo/30min" 
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg text-lg inline-block"
              >
                Reservar Cita
              </a>
              <a 
                href="#servicios" 
                className="bg-white/25 hover:bg-white/35 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 border-2 border-white/60 text-lg inline-block"
              >
                Ver Servicios
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Nuestros Servicios Premium</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cada servicio incluye diagnÃ³stico personalizado, aplicaciÃ³n de productos profesionales y asesoramiento experto.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Servicio 1 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="relative h-40 bg-gray-300 overflow-hidden">
                <img 
                  src="/demos/peluqueria/curly.jpg" 
                  alt="Corte & Styling"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Corte & Styling</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  Corte personalizado con anÃ¡lisis de rasgos faciales y textura capilar. Incluye secado y peinado profesional.
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-amber-600 font-bold text-lg">Desde 35â‚¬</p>
                    <p className="text-gray-500 text-xs">45â€“60 min</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Servicio 2 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="relative h-40 bg-gray-300 overflow-hidden">
                <img 
                  src="/demos/peluqueria/balayage.jpg" 
                  alt="ColoraciÃ³n & Balayage"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">ColoraciÃ³n & Balayage</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  ColoraciÃ³n con pigmentaciÃ³n de larga duraciÃ³n. TÃ©cnica balayage para realces naturales y profundidad.
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-amber-600 font-bold text-lg">Desde 75â‚¬</p>
                    <p className="text-gray-500 text-xs">90â€“120 min</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Servicio 3 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="relative h-40 bg-gray-300 overflow-hidden">
                <img 
                  src="/demos/peluqueria/color-organico.jpg" 
                  alt="Mechas & Babylights"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Mechas & Babylights</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  Realces finos y naturales para dimensiÃ³n y luminosidad. Ideal para renovar el look sin cambio radical.
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-amber-600 font-bold text-lg">Desde 95â‚¬</p>
                    <p className="text-gray-500 text-xs">100â€“130 min</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Servicio 4 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="relative h-40 bg-gray-300 overflow-hidden">
                <img 
                  src="/demos/peluqueria/transicion-canas.jpg" 
                  alt="Tratamiento Capilar ReparaciÃ³n"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Tratamiento Capilar ReparaciÃ³n</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  HidrataciÃ³n intensiva, queratina y proteÃ­nas. Ideal para cabellos daÃ±ados, quemados o secos.
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-amber-600 font-bold text-lg">Desde 45â‚¬</p>
                    <p className="text-gray-500 text-xs">50â€“70 min</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Servicio 5 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="relative h-40 bg-gray-300 overflow-hidden">
                <img 
                  src="/demos/peluqueria/salon-principal.jpg" 
                  alt="Alisado & Keratina Premium"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Alisado & Keratina Premium</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  Alisado brasileÃ±o o alisado a la keratina. Resultados lisos y brillantes durante 3â€“6 meses.
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-amber-600 font-bold text-lg">Desde 120â‚¬</p>
                    <p className="text-gray-500 text-xs">120â€“150 min</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Servicio 6 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="relative h-40 bg-gray-300 overflow-hidden">
                <img 
                  src="/demos/peluqueria/peinado-evento.jpg" 
                  alt="Peinados & Eventos"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Peinados & Eventos</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  Peinado de novia, eventos especiales. Incluye prueba previa, diseÃ±o personalizado y retoque el dÃ­a.
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-amber-600 font-bold text-lg">Desde 80â‚¬</p>
                    <p className="text-gray-500 text-xs">60â€“90 min</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 p-6 bg-amber-50 rounded-lg border border-amber-200 text-center">
            <p className="text-gray-700 text-sm">
              <strong>ðŸ’¡ Consulta de DiagnÃ³stico Gratuita:</strong> Primera visita sin coste. Te asesoramos sobre el mejor servicio segÃºn tu cabello, estilo y presupuesto.
            </p>
          </div>
        </div>
      </section>

      {/* GalerÃ­a */}
      <section id="galeria" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Nuestro Trabajo</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cada imagen cuenta una historia de transformaciÃ³n. Mira los cambios reales de nuestras clientes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Balayage Caramelo', img: '/demos/peluqueria/balayage.jpg' },
              { title: 'Peinado Evento', img: '/demos/peluqueria/peinado-evento.jpg' },
              { title: 'Color OrgÃ¡nico', img: '/demos/peluqueria/color-organico.jpg' },
              { title: 'Cabello Rizado', img: '/demos/peluqueria/curly.jpg' },
              { title: 'TransiciÃ³n Canas', img: '/demos/peluqueria/transicion-canas.jpg' },
              { title: 'SalÃ³n Principal', img: '/demos/peluqueria/salon-principal.jpg' },
            ].map((item, idx) => (
              <div key={idx} className="relative h-72 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                  <div className="p-6 w-full">
                    <p className="text-white font-bold text-lg">{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section id="testimonios" className="py-24 px-6 bg-gradient-to-br from-amber-50 to-yellow-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Lo que dicen nuestras clientes</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Testimonios reales de quienes confÃ­an en nosotros.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonio 1 */}
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow border border-amber-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 text-base leading-relaxed italic">
                "Hice un balayage hace 4 meses y sigue perfecto. El corte me solucionÃ³ el problema que llevaba aÃ±os con mi cabello. Â¡Vuelvo seguro!"
              </p>
              <p className="font-semibold text-gray-900">SofÃ­a MartÃ­nez</p>
              <p className="text-gray-600 text-xs">âœ“ Cliente verificada</p>
            </div>

            {/* Testimonio 2 */}
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow border border-amber-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 text-base leading-relaxed italic">
                "Me hicieron un alisado keratina antes de mi boda. QuedÃ© con el cabello liso, brillante y disciplinado. Â¡Era exacto lo que querÃ­a!"
              </p>
              <p className="font-semibold text-gray-900">Elena RodrÃ­guez</p>
              <p className="text-gray-600 text-xs">âœ“ Evento Especial (Noviembre 2025)</p>
            </div>

            {/* Testimonio 3 */}
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow border border-amber-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 text-base leading-relaxed italic">
                "Iba con mi cabello apagado y daÃ±ado. El tratamiento reparaciÃ³n + el nuevo corte = transformaciÃ³n total. Las chicas me preguntaban dÃ³nde me lo habÃ­a hecho."
              </p>
              <p className="font-semibold text-gray-900">Laura GÃ³mez</p>
              <p className="text-gray-600 text-xs">âœ“ Cliente VIP (5 visitas)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Precios & Packs */}
      <section id="precios" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Precios y Packs</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tarifas transparentes y packs diseÃ±ados para obtener mÃ¡xima transformaciÃ³n.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Pack 1 */}
            <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:border-amber-400 hover:shadow-lg transition-all">
              <div className="relative h-48 bg-gray-300 overflow-hidden">
                <img 
                  src="/demos/peluqueria/color-organico.jpg" 
                  alt="Pack Color + Corte"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Pack Color + Corte</h3>
                <p className="text-gray-600 mb-6 text-sm">TransformaciÃ³n completa</p>
                <p className="text-4xl font-bold text-amber-600 mb-1">140â‚¬</p>
                <p className="text-xs text-gray-500 mb-8">Normalmente 165â‚¬</p>
                
                <ul className="space-y-3 mb-8 text-sm">
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-amber-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">ColoraciÃ³n con tÃ©cnica elegida</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-amber-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Corte personalizado</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-amber-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Secado y peinado profesional</span>
                  </li>
                </ul>

                <a 
                  href="https://calendly.com/demo/30min"
                  className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-900 py-3 rounded-lg font-semibold transition-colors text-center"
                >
                  Consultar
                </a>
              </div>
            </div>

            {/* Pack 2 - Destacado */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl overflow-hidden border-2 border-amber-400 shadow-lg relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-amber-600 text-white px-5 py-1 rounded-full text-sm font-bold z-10">
                MÃS POPULAR
              </div>
              <div className="relative h-48 bg-gray-300 overflow-hidden">
                <img 
                  src="/demos/peluqueria/balayage.jpg" 
                  alt="Pack Completo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Pack Completo</h3>
                <p className="text-gray-600 mb-6 text-sm">Color + Corte + Tratamiento</p>
                <p className="text-4xl font-bold text-amber-600 mb-1">185â‚¬</p>
                <p className="text-xs text-gray-500 mb-8">Normalmente 225â‚¬</p>
                
                <ul className="space-y-3 mb-8 text-sm">
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-amber-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">ColoraciÃ³n + Balayage</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-amber-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Corte y styling premium</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-amber-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Tratamiento reparaciÃ³n intensiva</span>
                  </li>
                </ul>

                <a 
                  href="https://calendly.com/demo/30min"
                  className="block w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition-colors text-center"
                >
                  Reservar Ahora
                </a>
              </div>
            </div>

            {/* Pack 3 */}
            <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:border-amber-400 hover:shadow-lg transition-all">
              <div className="relative h-48 bg-gray-300 overflow-hidden">
                <img 
                  src="/demos/peluqueria/peinado-evento.jpg" 
                  alt="Pack Novia"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Pack Novia</h3>
                <p className="text-gray-600 mb-6 text-sm">Prueba + dÃ­a del evento</p>
                <p className="text-4xl font-bold text-amber-600 mb-1">260â‚¬</p>
                <p className="text-xs text-gray-500 mb-8">Incluye prueba + retoque</p>
                
                <ul className="space-y-3 mb-8 text-sm">
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-amber-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Prueba de peinado + maquillaje</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-amber-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Peinado dÃ­a del evento</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-amber-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Retoque sin cargo el dÃ­a</span>
                  </li>
                </ul>

                <a 
                  href="https://calendly.com/demo/30min"
                  className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-900 py-3 rounded-lg font-semibold transition-colors text-center"
                >
                  Consultar Disponibilidad
                </a>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-8 text-center">
            <p className="text-gray-700 text-base leading-relaxed">
              <strong>ðŸ“‹ Presupuesto Personalizado:</strong> El precio final depende de la densidad, largo y estado del cabello. Realizamos consulta gratuita y presupuesto sin compromiso. Todos los servicios incluyen productos profesionales y asesoramiento post-servicio.
            </p>
          </div>
        </div>
      </section>

      {/* UbicaciÃ³n y Contacto */}
      <section id="ubicacion" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Mapa */}
            <div className="rounded-xl overflow-hidden shadow-lg h-96 bg-gray-300 flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1906456891256!2d-3.7038!3d40.4168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI1JzAuNSJOIDPCsDQyJzEzLjciVw!5e0!3m2!1ses!2ses!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* InformaciÃ³n */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-10">UbicaciÃ³n y Contacto</h2>
              
              <div className="mb-10">
                <h3 className="text-xl font-bold mb-3">ðŸ“ DirecciÃ³n</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Paseo de la Castellana, 156 â€“ Local 3A<br/>
                  28046 Madrid, EspaÃ±a<br/>
                  <span className="text-sm text-gray-600 mt-2 block">A 3 min de Metro ChamartÃ­n</span>
                </p>
              </div>

              <div className="mb-10">
                <h3 className="text-xl font-bold mb-3">ðŸ• Horarios</h3>
                <ul className="text-gray-700 text-lg space-y-2">
                  <li><strong>Lunes a Viernes:</strong> 10:00 â€“ 19:00</li>
                  <li><strong>SÃ¡bados:</strong> 10:00 â€“ 15:00</li>
                  <li><strong>Domingos:</strong> Cerrado</li>
                </ul>
                <p className="text-xs text-gray-600 mt-4">ðŸ’¡ Abierto en festivos locales bajo reserva previa</p>
              </div>

              <div className="space-y-4">
                <a 
                  href="tel:+34917654321" 
                  className="flex items-center gap-4 bg-white p-5 rounded-xl border border-gray-200 hover:border-amber-400 hover:bg-amber-50 transition-all group"
                >
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                    <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.11.33.217.648.309.95C5.904 10.75 7.119 13.169 9.965 15.93c2.737 2.73 5.144 3.94 8.6 5.55.092.03.167.062.23.1l.774-1.559a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2.694a1 1 0 01-.867-.5c-1.012-1.487-2.492-3.782-4.899-6.689-1.52-1.88-3.088-3.004-4.782-3.75a1 1 0 01-.364-1.58L5.228 3.51A1 1 0 014.886 2.74L2.743 2.065a1 1 0 01-.74-.025L2 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Llamar</p>
                    <p className="text-amber-600 font-semibold">+34 91 765 4321</p>
                  </div>
                </a>

                <a 
                  href="https://wa.me/34917654321" 
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
                    <p className="text-green-600 font-semibold">EnvÃ­a mensaje directo</p>
                  </div>
                </a>
              </div>

              <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-gray-700 text-sm">
                  <strong>âš¡ Respuesta rÃ¡pida:</strong> Respondemos en menos de 1 hora en horario laboral. Fines de semana respondemos el lunes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-6 bg-gradient-to-r from-amber-600 to-yellow-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Reserva tu cita y te asesoramos sin compromiso
          </h2>
          <p className="text-lg md:text-xl mb-12 opacity-95">
            Primera visita incluye diagnÃ³stico gratuito y presupuesto personalizado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://calendly.com/demo/30min" 
              className="bg-white text-amber-600 hover:bg-gray-100 px-10 py-5 rounded-lg font-bold transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Reservar Cita Ahora
            </a>
            <a 
              href="https://wa.me/34912345678" 
              className="bg-white/20 hover:bg-white/30 text-white px-10 py-5 rounded-lg font-bold transition-all duration-300 border-2 border-white text-lg"
            >
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer Demo */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Lumen Hair Studio</h3>
              <p className="text-sm leading-relaxed">
                Especialistas en color, corte y cuidado capilar. Tu confianza es nuestro compromiso.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Servicios</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#servicios" className="hover:text-white transition-colors">Corte & Styling</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors">ColoraciÃ³n</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors">Tratamientos</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors">Peinados Eventos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contacto</h4>
              <ul className="text-sm space-y-2">
                <li><a href="tel:+34917654321" className="hover:text-white transition-colors">+34 91 765 4321</a></li>
                <li><a href="https://wa.me/34917654321" className="hover:text-white transition-colors">WhatsApp</a></li>
                <li><a href="#ubicacion" className="hover:text-white transition-colors">UbicaciÃ³n</a></li>
                <li><a href="#ubicacion" className="hover:text-white transition-colors">Horarios</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Redes Sociales</h4>
              <div className="flex gap-4 text-sm">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">Facebook</a>
                <a href="#" className="hover:text-white transition-colors">TikTok</a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-sm mb-3">
              Â© 2026 Lumen Hair Studio. Todos los derechos reservados.
            </p>
            <p className="text-xs text-gray-400 mb-4">
              âš ï¸ <strong>PÃGINA DE DEMOSTRACIÃ“N:</strong> Las imÃ¡genes mostradas son genÃ©ricas. Este es un ejemplo de diseÃ±o web para salones de peluquerÃ­a.
            </p>
            <p className="text-xs text-gray-500">
              âœ¨ Demo creada por <Link href="/" className="text-amber-400 hover:text-amber-300 transition-colors font-semibold">Neuriax</Link> â€¢ DiseÃ±os web que venden para salones de belleza
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

