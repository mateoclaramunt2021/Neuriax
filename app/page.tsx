import { Metadata } from "next";
import ContactForm from "../components/ContactForm";

export const metadata: Metadata = {
  title: "Neuriax | Automatización IA & Agentes de Voz para Empresas",
  description: "Agentes de voz IA que responden llamadas 24/7, agendan citas y cierran ventas. Automatizaciones inteligentes para empresas. Garantía 30 días.",
  keywords: "automatización IA, agentes de voz IA, inteligencia artificial empresas, asistentes virtuales telefónicos, automatización ventas",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* ═══════════════════════════════════════════ */}
      {/* HERO - Impacto máximo */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[150px] animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: "3s" }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[200px]"></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-30"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 mb-8 backdrop-blur-sm section-fade-in">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-300 font-medium">Agentes IA disponibles 24/7</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-[1.05] tracking-tight section-fade-in" style={{ animationDelay: "0.1s" }}>
            <span className="text-white">Tu negocio en </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 animate-gradient-x">piloto automático</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed section-fade-in" style={{ animationDelay: "0.2s" }}>
            Agentes de voz con IA que <span className="text-cyan-400 font-semibold">responden llamadas, agendan citas y cierran ventas</span> por ti. Automatizaciones que convierten leads en clientes sin intervención manual.
          </p>

          {/* Metric */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-10 section-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400">0</div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">llamadas perdidas</div>
            </div>
            <div className="w-px h-12 bg-slate-800 hidden sm:block"></div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-400">24/7</div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">disponibilidad</div>
            </div>
            <div className="w-px h-12 bg-slate-800 hidden sm:block"></div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-purple-400">30d</div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">garantía total</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 section-fade-in" style={{ animationDelay: "0.4s" }}>
            <a
              href="#contacto"
              className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 btn-shimmer"
            >
              Quiero automatizar mi negocio
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300"
            >
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Ver cómo funciona
            </a>
          </div>

          {/* Trust line */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 section-fade-in" style={{ animationDelay: "0.5s" }}>
            {["Garantía 30 días", "Sin compromiso", "Respuesta en 24h"].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-gray-500 rounded-full mt-2 animate-scroll-indicator"></div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* PROBLEMA → SOLUCIÓN */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-gradient-to-b from-black via-slate-950 to-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 section-fade-in">
            <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">El problema</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
              ¿Cuántos clientes pierdes cada día?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Mientras no contestas el teléfono, tu competencia sí lo hace.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* SIN IA */}
            <div className="bg-red-950/20 border border-red-500/20 rounded-2xl p-8 section-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-300">Sin Neuriax</h3>
              </div>
              <ul className="space-y-4">
                {[
                  { metric: "52+", text: "llamadas perdidas al mes" },
                  { metric: "68%", text: "de leads nunca reciben seguimiento" },
                  { metric: "5h+", text: "semanales en tareas repetitivas" },
                  { metric: "0€", text: "generados fuera de horario" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-4">
                    <span className="text-2xl font-extrabold text-red-400 w-16 text-right flex-shrink-0">{item.metric}</span>
                    <span className="text-gray-400">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CON IA */}
            <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-8 section-fade-in" style={{ animationDelay: "0.15s" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-emerald-300">Con Neuriax</h3>
              </div>
              <ul className="space-y-4">
                {[
                  { metric: "0", text: "llamadas sin responder" },
                  { metric: "100%", text: "de leads con seguimiento automático" },
                  { metric: "0h", text: "trabajo manual repetitivo" },
                  { metric: "24/7", text: "vendiendo incluso mientras duermes" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-4">
                    <span className="text-2xl font-extrabold text-emerald-400 w-16 text-right flex-shrink-0">{item.metric}</span>
                    <span className="text-gray-300">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12 section-fade-in">
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold text-lg transition-colors"
            >
              Quiero pasar al lado verde
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SERVICIOS - Explicación profunda */}
      {/* ═══════════════════════════════════════════ */}
      <section id="demo" className="py-24 px-4 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 section-fade-in">
            <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase">Nuestros servicios</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
              Dos soluciones. Un objetivo.
            </h2>
            <p className="text-xl text-gray-400">Más clientes, menos trabajo manual.</p>
          </div>

          {/* Servicio 1: Agentes de Voz */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="section-fade-in">
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-1.5 mb-6">
                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <span className="text-cyan-300 text-sm font-medium">Servicio estrella</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">Agentes de Voz IA</h3>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Un asistente telefónico con inteligencia artificial que <strong className="text-white">habla como una persona real</strong>. Contesta llamadas de tus clientes, responde preguntas sobre tu negocio, agenda citas en tu calendario y cualifica si el lead es bueno. Todo automáticamente, las 24 horas del día.
              </p>
              <p className="text-gray-400 mb-8">
                <strong className="text-cyan-400">Ejemplo real:</strong> Un cliente llama a tu clínica a las 23:00. El agente le contesta, le explica los servicios, le agenda una cita para mañana y te envía un resumen. Tú ni te enteras hasta que miras el email.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Voz natural, indistinguible de una persona",
                  "Atiende llamadas entrantes y hace llamadas salientes",
                  "Conectado a tu calendario (Google, Calendly...)",
                  "Responde preguntas específicas de tu negocio",
                  "Te envía resumen de cada conversación",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-300">
                    <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contacto" className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25">
                Quiero un agente de voz
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>

            {/* Visual - Simulación de llamada */}
            <div className="section-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-400 font-mono">Agente activo — Llamada en curso</span>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs">👤</span>
                    </div>
                    <div className="bg-slate-700/50 rounded-xl rounded-tl-none px-4 py-3 max-w-xs">
                      <p className="text-sm text-gray-300">&ldquo;Hola, quería pedir cita para esta semana si es posible.&rdquo;</p>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl rounded-tr-none px-4 py-3 max-w-xs">
                      <p className="text-sm text-cyan-100">&ldquo;¡Claro! Tenemos disponibilidad el jueves a las 10:00 y el viernes a las 16:00. ¿Cuál te viene mejor?&rdquo;</p>
                    </div>
                    <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs">🤖</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs">👤</span>
                    </div>
                    <div className="bg-slate-700/50 rounded-xl rounded-tl-none px-4 py-3 max-w-xs">
                      <p className="text-sm text-gray-300">&ldquo;El jueves a las 10 perfecto.&rdquo;</p>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl rounded-tr-none px-4 py-3 max-w-xs">
                      <p className="text-sm text-cyan-100">&ldquo;Perfecto, cita confirmada para el jueves a las 10:00. Te envío confirmación por SMS. ¿Algo más en lo que pueda ayudarte?&rdquo;</p>
                    </div>
                    <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs">🤖</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-700">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Duración: 47s</span>
                    <span className="text-emerald-400">Cita agendada ✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Servicio 2: Automatización */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Visual - Dashboard */}
            <div className="order-2 lg:order-1 section-fade-in">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-400 font-mono">Sistema activo — 5 automatizaciones</span>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "Nuevo lead → WhatsApp + Email", status: "Activa", count: "142 ejecuciones", color: "emerald" },
                    { name: "Sin respuesta 48h → Recordatorio", status: "Activa", count: "38 ejecuciones", color: "emerald" },
                    { name: "Cita agendada → Confirmación SMS", status: "Activa", count: "89 ejecuciones", color: "emerald" },
                    { name: "Lead caliente → Notificación urgente", status: "Activa", count: "23 ejecuciones", color: "emerald" },
                    { name: "Resumen semanal → Email al equipo", status: "Activa", count: "12 ejecuciones", color: "emerald" },
                  ].map((auto) => (
                    <div key={auto.name} className="flex items-center justify-between bg-slate-800/50 rounded-lg px-4 py-3 border border-slate-700/50">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-2 h-2 bg-${auto.color}-400 rounded-full flex-shrink-0`}></div>
                        <span className="text-sm text-gray-300 truncate">{auto.name}</span>
                      </div>
                      <span className="text-xs text-gray-500 flex-shrink-0 ml-3">{auto.count}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-slate-700">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Total: 304 tareas automatizadas</span>
                    <span className="text-blue-400">~127 horas ahorradas</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 section-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-blue-300 text-sm font-medium">Máxima eficiencia</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">Automatización IA</h3>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Flujos de trabajo inteligentes que <strong className="text-white">conectan todas tus herramientas</strong> y ejecutan acciones automáticamente. Cuando llega un lead, se dispara toda la cadena: bienvenida por WhatsApp, email de seguimiento, tarea en tu CRM, recordatorio a los 3 días.
              </p>
              <p className="text-gray-400 mb-8">
                <strong className="text-blue-400">Ejemplo real:</strong> Alguien rellena tu formulario. En 30 segundos recibe un WhatsApp personalizado, tú recibes una notificación, el lead se guarda en tu CRM y se programa un seguimiento automático. Sin tocar nada.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Integración con WhatsApp, Email, CRM, Calendar",
                  "Seguimiento automático de leads fríos y calientes",
                  "Notificaciones inteligentes según prioridad",
                  "Informes y resúmenes automáticos",
                  "Sin programar: lo configuramos todo por ti",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-300">
                    <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contacto" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
                Quiero automatizar
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* INTEGRACIONES */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-16 px-4 bg-black border-t border-b border-slate-900">
        <div className="max-w-5xl mx-auto text-center section-fade-in">
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-8">Integramos con las herramientas que ya usas</p>
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 text-gray-500">
            {["WhatsApp", "Google Calendar", "Make", "Vapi", "OpenAI", "Zapier", "HubSpot", "Slack"].map((tool) => (
              <span key={tool} className="text-sm sm:text-base font-medium hover:text-white transition-colors cursor-default">{tool}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* PROCESO - 3 pasos */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 section-fade-in">
            <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">Proceso</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">Cómo funciona</h2>
            <p className="text-xl text-gray-400">Simple, rápido, sin complicaciones.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-purple-500/50"></div>

            {[
              { num: "1", title: "Hablamos", desc: "Llamada de 15 min. Me cuentas tu negocio, te digo exactamente qué puedo automatizar y cuánto te va a costar. Sin rodeos.", color: "from-cyan-500 to-cyan-600" },
              { num: "2", title: "Construyo", desc: "Diseño e implemento tu sistema a medida. Agentes de voz, automatizaciones, integraciones. Tú sigues con tu día a día.", color: "from-blue-500 to-blue-600" },
              { num: "3", title: "Funciona", desc: "Tu negocio en piloto automático. Agentes respondiendo, leads llegando, seguimiento funcionando. Resultados desde el día 1.", color: "from-purple-500 to-purple-600" },
            ].map((step, i) => (
              <div key={step.num} className="text-center relative section-fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg relative z-10`}>
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-14 section-fade-in">
            <a
              href="#contacto"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25"
            >
              Empezar ahora
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* CASOS DE USO */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-gradient-to-b from-slate-950 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 section-fade-in">
            <span className="text-emerald-400 text-sm font-semibold tracking-widest uppercase">Casos de éxito</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
              Resultados en sectores reales
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { sector: "Clínica dental", result: "De 15 a 0 llamadas perdidas/semana", detail: "Agente de voz + reservas automáticas", icon: "🏥" },
              { sector: "Empresa de reformas", result: "3x más presupuestos enviados", detail: "Cualificación automática de leads", icon: "🔨" },
              { sector: "Consultoría", result: "12h/semana de tiempo recuperado", detail: "Automatización de seguimiento y propuestas", icon: "📊" },
              { sector: "Restaurante", result: "40% más reservas fuera de horario", detail: "Agente de voz para reservas 24/7", icon: "🍽️" },
              { sector: "Peluquería", result: "Agenda siempre llena sin llamar", detail: "Reservas por voz + recordatorios SMS", icon: "💇" },
              { sector: "Abogados", result: "100% leads con primer contacto &lt;5min", detail: "Respuesta automática + cualificación IA", icon: "⚖️" },
            ].map((caso, i) => (
              <div
                key={caso.sector}
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300 section-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="text-3xl mb-4 block">{caso.icon}</span>
                <h3 className="text-sm font-semibold text-cyan-400 mb-2">{caso.sector}</h3>
                <p className="text-lg font-bold text-white mb-2" dangerouslySetInnerHTML={{ __html: caso.result }}></p>
                <p className="text-sm text-gray-500">{caso.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* GARANTÍAS */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-16 px-4 bg-slate-900/30 border-t border-b border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Garantía 30 días", desc: "No funciona = devuelvo el dinero", color: "green" },
              { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", title: "Respuesta 24h", desc: "Siempre disponible para ti", color: "cyan" },
              { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", title: "Trato directo", desc: "Hablas conmigo, no con vendedores", color: "blue" },
              { icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", title: "Resultados medibles", desc: "Métricas claras, sin humo", color: "purple" },
            ].map((item) => (
              <div key={item.title} className="section-fade-in">
                <div className={`w-12 h-12 bg-${item.color}-500/20 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <svg className={`w-6 h-6 text-${item.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* FAQ */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 section-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Preguntas frecuentes</h2>
          </div>

          <div className="space-y-4 section-fade-in">
            {[
              { q: "¿Qué es exactamente un agente de voz IA?", a: "Es un asistente telefónico con inteligencia artificial. Contesta llamadas de tus clientes con voz natural, responde preguntas sobre tu negocio, agenda citas y cualifica leads. Funciona 24/7 sin descanso." },
              { q: "¿Cuánto cuesta?", a: "Depende de la complejidad. Desde 297€/mes para agentes de voz básicos. En la llamada te doy precio exacto para tu caso, sin sorpresas ni letra pequeña." },
              { q: "¿Cuánto tarda en estar funcionando?", a: "Agentes de voz: 3-5 días. Automatizaciones: 1-2 semanas dependiendo de complejidad. En la llamada te doy fecha exacta." },
              { q: "¿Y si no funciona?", a: "Garantía 30 días. Si no ves resultados, devuelvo el dinero. Sin preguntas. Pero funciona, porque lo medimos antes de empezar." },
              { q: "¿Funciona para mi sector?", a: "Si tienes clientes que te llaman o necesitas seguimiento de leads, sí. Clínicas, reformas, restaurantes, abogados, consultoría, peluquerías... Háblame de tu caso específico en la llamada." },
            ].map((faq, i) => (
              <details
                key={i}
                className="group bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="text-white font-semibold pr-4">{faq.q}</span>
                  <svg className="w-5 h-5 text-gray-500 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* CONTACTO FINAL */}
      {/* ═══════════════════════════════════════════ */}
      <section id="contacto" className="py-24 px-4 bg-gradient-to-b from-black to-slate-950">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-8 section-fade-in">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-green-300 text-sm font-medium">Últimos 3 slots disponibles este mes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 section-fade-in">
            ¿Listo para automatizar?
          </h2>
          <p className="text-xl text-gray-300 mb-4 section-fade-in">
            Rellena el formulario y te redirigimos a Calendly para agendar tu llamada.
          </p>
          <p className="text-gray-500 mb-10 section-fade-in">
            15 minutos. Sin compromiso. Si no puedo ayudarte, te lo digo directamente.
          </p>

          <div className="section-fade-in">
            <ContactForm />
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400 section-fade-in">
            <a href="tel:+34640791041" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +34 640 791 041
            </a>
            <a href="mailto:hola@neuriax.com" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              hola@neuriax.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
