'use client';

import Link from 'next/link';

export default function Contacto() {



  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white pb-20 md:pb-0">
      <div className="h-16"></div>

      {/* ========== HERO SECTION - FUTURISTIC ========== */}
      <section className="relative hero-futuristic py-16 md:py-32 px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 grid-pattern opacity-50"></div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[150px] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-500/15 rounded-full blur-[120px] -z-10"></div>

        <div className="max-w-6xl mx-auto">
          <div className="relative z-10 text-center">
            {/* Left Content */}
            <div>
              {/* Main Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight">
                <span className="block text-white">Automatiza tu negocio con</span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  IA y convierte más leads
                </span>
              </h1>

              {/* Badge */}
              <p className="text-cyan-300 text-lg italic mb-6 opacity-80">(al instante)</p>

              {/* Subtitle */}
              <p className="text-base md:text-lg text-slate-300 mb-8 leading-relaxed">
                En 15–20 min te damos un plan claro con 3–5 mejoras aplicables esta semana.
              </p>

              {/* Promotional Cards */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {/* Automatización Card */}
                <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-xl p-4 border border-cyan-500/50 backdrop-blur-sm hover:border-cyan-400 transition-all">
                  <p className="text-cyan-400 font-bold text-center">Oferta de Automatización</p>
                  <p className="text-white font-semibold text-center">¡Hasta el 15 de Febrero!</p>
                </div>

                {/* Páginas Web Card */}
                <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-xl p-4 border border-purple-500/50 backdrop-blur-sm hover:border-purple-400 transition-all">
                  <p className="text-purple-400 font-bold text-center">Promoción de Páginas Web</p>
                  <p className="text-white font-semibold text-center">¡Hasta el 1 de Febrero!</p>
                </div>
              </div>

              {/* Main CTA Button */}
              <Link
                href="/contacto/formulario"
                className="block w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-center border border-blue-400/50 mb-6"
              >
                Agendar llamada (15 min)
              </Link>

              {/* Trust Note */}
              <p className="text-sm text-slate-400">
                Sin compromiso. Te llevas un plan claro aunque no trabájemos juntos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CÓMO FUNCIONA (3 STEPS) ========== */}
      <section className="py-16 md:py-20 px-6 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Cómo funciona en 3 pasos
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700 hover:border-cyan-500/50 transition-all">
              <div className="flex items-center justify-center w-12 h-12 bg-cyan-500 rounded-full text-white font-bold text-xl mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Diagnóstico rápido</h3>
              <p className="text-slate-300">
                En 5 minutos analizamos tu operación y entendemos dónde pierdes tiempo y dinero.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700 hover:border-cyan-500/50 transition-all">
              <div className="flex items-center justify-center w-12 h-12 bg-cyan-500 rounded-full text-white font-bold text-xl mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">2–3 automatizaciones</h3>
              <p className="text-slate-300">
                Te presentamos las mejoras específicas para tu caso, con impacto medible.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700 hover:border-cyan-500/50 transition-all">
              <div className="flex items-center justify-center w-12 h-12 bg-cyan-500 rounded-full text-white font-bold text-xl mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Demo y propuesta</h3>
              <p className="text-slate-300">
                Si encaja, te mostramos cómo funciona y te enviamos una propuesta sin compromiso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== EJEMPLOS POR SECTOR ========== */}
      <section id="ejemplos-section" className="py-16 md:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Ejemplos por sector
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Restaurantes */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700 hover:border-cyan-400/30 transition-all">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">Restaurantes</h3>
              <p className="text-slate-300 mb-4">
                <strong>Automatización:</strong> Recibir reservas por WhatsApp, confirmar automáticamente y enviar recordatorio 24h antes.
              </p>
              <p className="text-sm text-slate-400">
                Resultado: 30% menos no-shows, sin que nadie tenga que llamar.
              </p>
            </div>

            {/* Inmobiliarias */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700 hover:border-cyan-400/30 transition-all">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">Inmobiliarias</h3>
              <p className="text-slate-300 mb-4">
                <strong>Automatización:</strong> Filtrar leads por presupuesto/zona, agendar visitas sin intervención manual.
              </p>
              <p className="text-sm text-slate-400">
                Resultado: Cierra 2x más operaciones en menos tiempo.
              </p>
            </div>

            {/* Belleza / Clínicas */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700 hover:border-cyan-400/30 transition-all">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">Belleza / Clínicas</h3>
              <p className="text-slate-300 mb-4">
                <strong>Automatización:</strong> Booking 24/7, recordatorios automáticos, reactivación de clientes dormidos por IA.
              </p>
              <p className="text-sm text-slate-400">
                Resultado: 40% más citas, sin staff adicional.
              </p>
            </div>

            {/* Servicios Locales */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700 hover:border-cyan-400/30 transition-all">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">Servicios Locales</h3>
              <p className="text-slate-300 mb-4">
                <strong>Automatización:</strong> Presupuestos automáticos, seguimiento por SMS, cierre de ventas con IA.
              </p>
              <p className="text-sm text-slate-400">
                Resultado: 3x conversión con menos presupuestadores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== RESULTADOS Y CONFIANZA ========== */}
      <section className="py-16 md:py-20 px-6 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Resultados y confianza
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Implementación por fases */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700">
              <h3 className="text-xl font-bold mb-4 text-cyan-400">Implementación por fases</h3>
              <p className="text-slate-300">
                No es todo de golpe. Empezamos con lo que más impacto genera, ajustamos y escalamos. Solo pagas por lo que funciona.
              </p>
            </div>

            {/* Ajustes incluidos */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700">
              <h3 className="text-xl font-bold mb-4 text-cyan-400">Ajustes incluidos</h3>
              <p className="text-slate-300">
                Durante los primeros 30 días, hacemos los cambios que necesites sin costo. Garantía de que funcione.
              </p>
            </div>
          </div>

          {/* Testimonios Placeholder */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-slate-300 mb-4 italic">
                "[Testimonial placeholder - Cliente (Sector)]"
              </p>
              <p className="text-slate-400 font-semibold">Cliente (Sector)</p>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-slate-300 mb-4 italic">
                "[Testimonial placeholder - Cliente (Sector)]"
              </p>
              <p className="text-slate-400 font-semibold">Cliente (Sector)</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== MOBILE STICKY CTA ========== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 to-slate-950/90 border-t border-slate-800 p-4 z-40">
        <Link
          href="/contacto/formulario"
          className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105 inline-block text-center"
        >
          Agendar llamada →
        </Link>
      </div>
    </div>
  );
}
