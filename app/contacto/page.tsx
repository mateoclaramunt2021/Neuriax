'use client';

import Link from 'next/link';

export default function Contacto() {



  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white pb-20 md:pb-0">
      <div className="h-16"></div>

      {/* ========== HERO SECTION - ULTRA PREMIUM ========== */}
      <section className="relative hero-futuristic py-24 md:py-40 px-6 overflow-hidden">
        {/* Multiple Animated Backgrounds */}
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        
        {/* Premium Glowing Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[200px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[180px] -z-10" style={{ animation: 'pulse 8s ease-in-out infinite' }}></div>
        <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-purple-500/15 rounded-full blur-[150px] -z-10"></div>

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `floatUp ${20 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Main Content */}
          <div className="text-center mb-12">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 rounded-full px-6 py-3 mb-10 backdrop-blur-md shadow-lg shadow-cyan-500/20">
              <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse"></span>
              <span className="text-cyan-300 font-semibold text-sm tracking-wider">(al instante)</span>
            </div>

            {/* Main Title - ULTRA PREMIUM */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight">
              <span className="block text-white drop-shadow-lg">Automatiza</span>
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-xl text-glow-cyan">
                tu negocio con IA
              </span>
              <span className="block text-white drop-shadow-lg">convierte más leads</span>
            </h1>

            {/* Premium Subtitle */}
            <p className="text-xl md:text-2xl text-slate-200 mb-10 leading-relaxed max-w-3xl mx-auto font-light tracking-wide">
              En <span className="font-bold text-cyan-300">15–20 minutos</span> te damos un plan claro con <span className="font-bold text-cyan-300">3–5 mejoras</span> aplicables esta misma semana.
            </p>

            {/* Promotional Cards - PREMIUM DESIGN */}
            <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
              {/* Automatización Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"></div>
                <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 rounded-2xl p-6 border border-cyan-500/50 backdrop-blur-xl hover:border-cyan-400 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/30">
                  <div className="flex items-center justify-center mb-3">
                    <span className="text-3xl">⚡</span>
                  </div>
                  <p className="text-cyan-400 font-bold text-lg mb-1">Oferta Automatización</p>
                  <p className="text-white font-semibold text-xl">¡Hasta 15 Feb!</p>
                  <p className="text-slate-400 text-sm mt-2">Chatbots + Whatsapp</p>
                </div>
              </div>

              {/* Páginas Web Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"></div>
                <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 rounded-2xl p-6 border border-purple-500/50 backdrop-blur-xl hover:border-purple-400 transition-all duration-300 shadow-2xl hover:shadow-purple-500/30">
                  <div className="flex items-center justify-center mb-3">
                    <span className="text-3xl">🚀</span>
                  </div>
                  <p className="text-purple-400 font-bold text-lg mb-1">Promo Páginas Web</p>
                  <p className="text-white font-semibold text-xl">¡Hasta 1 Feb!</p>
                  <p className="text-slate-400 text-sm mt-2">SEO + Diseño Premium</p>
                </div>
              </div>
            </div>

            {/* Premium CTA Button */}
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 opacity-75 group-hover:opacity-100 blur-xl transition-all duration-300 rounded-full"></div>
              <Link
                href="/contacto/formulario"
                className="group relative inline-flex items-center justify-center px-10 md:px-14 py-5 md:py-6 bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-600 hover:via-blue-700 hover:to-cyan-600 text-white font-bold text-lg md:text-xl rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 border border-white/20 overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center gap-3">
                  <span>Agendar llamada</span>
                  <span className="text-2xl">→</span>
                </span>
              </Link>
            </div>

            {/* Trust Statement - Premium */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
              <p className="text-slate-300">✓ Sin compromiso</p>
              <span className="hidden sm:block w-1 h-1 bg-slate-500 rounded-full"></span>
              <p className="text-slate-300">✓ Confidencial</p>
              <span className="hidden sm:block w-1 h-1 bg-slate-500 rounded-full"></span>
              <p className="text-slate-300">✓ En 24h tendrás resultado</p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-8 mt-20 pt-12 border-t border-slate-700/50">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">15-20</p>
              <p className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Minutos de llamada</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">3-5</p>
              <p className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Mejoras detectadas</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">24h</p>
              <p className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Propuesta recibida</p>
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
