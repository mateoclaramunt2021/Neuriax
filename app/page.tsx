import { Metadata } from "next";
import ContactForm from "../components/ContactForm";
import ScrollReveal from "../components/ScrollReveal";

export const metadata: Metadata = {
  title: "Neuriax | Automatización IA & Agentes de Voz para Empresas",
  description:
    "Agentes de voz IA que responden llamadas 24/7, agendan citas y cierran ventas. Automatizaciones inteligentes para empresas. Garantía 30 días.",
  keywords:
    "automatización IA, agentes de voz IA, inteligencia artificial empresas, asistentes virtuales telefónicos, automatización ventas",
};

/* ─────────────────────────────────────────────────────
   INTEGRATIONS DATA (used in marquee)
   ───────────────────────────────────────────────────── */
const INTEGRATIONS = [
  "WhatsApp",
  "Google Calendar",
  "Make",
  "Vapi",
  "OpenAI",
  "Zapier",
  "HubSpot",
  "Slack",
  "Calendly",
  "Notion",
  "Gmail",
  "Stripe",
  "Twilio",
  "Microsoft Teams",
  "Salesforce",
  "Shopify",
  "WordPress",
  "Airtable",
  "Typeform",
  "Google Sheets",
  "Mailchimp",
  "ActiveCampaign",
  "Zoho CRM",
  "Monday.com",
  "Trello",
  "Intercom",
  "Freshdesk",
  "GoHighLevel",
  "n8n",
  "Claude AI",
  "ElevenLabs",
  "Telegram",
  "Instagram",
  "Facebook Messenger",
  "Pipedrive",
  "Google Meet",
  "Zoom",
  "Webhook",
  "REST API",
];

/* ───────────────────────────────────────────────────── */

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* ════════════════════════════════════════════════
          HERO  —  Full viewport, split layout
          ════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center px-4 overflow-hidden">
        {/* --- BG layers --- */}
        <div className="absolute inset-0 hero-futuristic" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        {/* Large animated orbs */}
        <div className="absolute top-[10%] left-[15%] w-[600px] h-[600px] bg-cyan-500/[0.07] rounded-full blur-[170px] animate-pulse-slow" />
        <div
          className="absolute bottom-[15%] right-[10%] w-[500px] h-[500px] bg-blue-600/[0.07] rounded-full blur-[150px] animate-pulse-slow"
          style={{ animationDelay: "3s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-purple-500/[0.04] rounded-full blur-[200px]" />

        {/* --- Content grid --- */}
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center py-20 sm:py-28 lg:py-32">
          {/* LEFT — Copy */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              <span className="text-[13px] text-gray-300 font-medium">
                Agentes IA disponibles 24/7
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold leading-[1.08] tracking-tight mb-6">
              <span className="block text-white">Tu negocio en</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 animate-gradient-x">
                piloto automático
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed mb-8 max-w-xl">
              Agentes de voz con IA que{" "}
              <span className="text-white font-medium">
                responden llamadas, agendan citas y cierran ventas
              </span>{" "}
              por ti. Automatizaciones que convierten leads en clientes sin intervención
              manual.
            </p>

            {/* Metrics row */}
            <div className="flex flex-wrap gap-8 mb-10">
              {[
                { value: "0", label: "llamadas perdidas", color: "text-cyan-400" },
                { value: "24/7", label: "disponibilidad", color: "text-blue-400" },
                { value: "30d", label: "garantía total", color: "text-purple-400" },
              ].map((m) => (
                <div key={m.label}>
                  <div className={`text-3xl sm:text-4xl font-extrabold ${m.color}`}>
                    {m.value}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{m.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contacto"
                className="group inline-flex items-center justify-center gap-3 bg-white text-black font-bold py-4 px-8 rounded-full text-base transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-white/10"
              >
                Agendar llamada gratis
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white font-semibold py-4 px-8 rounded-full text-base transition-all duration-300"
              >
                <svg
                  className="w-5 h-5 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                Ver servicios
              </a>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-6 mt-8 text-[13px] text-gray-500">
              {["Garantía 30 días", "Sin compromiso", "Respuesta en 24h"].map(
                (t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 text-emerald-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {t}
                  </span>
                )
              )}
            </div>
          </div>

          {/* RIGHT — Floating UI Mockup (Agent call simulation) */}
          <div className="block">
            <div className="relative lg:float-smooth">
              {/* Glow behind card */}
              <div className="absolute -inset-6 bg-cyan-500/[0.06] rounded-3xl blur-3xl hidden lg:block" />
              {/* Main card */}
              <div className="relative bg-[#0d1117] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-3 text-xs text-gray-500 font-mono">
                    neuriax-agent — llamada activa
                  </span>
                </div>

                {/* Fake call UI */}
                <div className="p-6 space-y-4">
                  {/* Status bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      </span>
                      <span className="text-xs text-emerald-400 font-medium">
                        En curso · Clínica Dental Sol
                      </span>
                    </div>
                    <span className="text-xs text-gray-600 font-mono">00:34</span>
                  </div>

                  {/* Chat bubbles — conversación realista */}
                  <div className="space-y-3 max-h-[220px] lg:max-h-[340px] overflow-y-auto pr-1 scrollbar-thin">
                    {/* 1 — Paciente llama */}
                    <div className="flex gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 text-[10px]">👤</div>
                      <div className="bg-slate-800/80 rounded-xl rounded-tl-sm px-3.5 py-2 max-w-[260px]">
                        <p className="text-[12.5px] text-gray-300 leading-relaxed">Hola, buenos días, llamaba porque me duele bastante una muela desde ayer y quería ver si podéis atenderme.</p>
                      </div>
                    </div>
                    {/* 2 — Agente IA saluda y pregunta */}
                    <div className="flex gap-2.5 justify-end">
                      <div className="bg-cyan-500/[0.12] border border-cyan-500/20 rounded-xl rounded-tr-sm px-3.5 py-2 max-w-[275px]">
                        <p className="text-[12.5px] text-cyan-50 leading-relaxed">Buenos días, siento que estés con molestias. Para poder ayudarte mejor, ¿podrías decirme si el dolor es constante o solo cuando muerdes algo?</p>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 text-[10px]">🤖</div>
                    </div>
                    {/* 3 — Paciente describe */}
                    <div className="flex gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 text-[10px]">👤</div>
                      <div className="bg-slate-800/80 rounded-xl rounded-tl-sm px-3.5 py-2 max-w-[260px]">
                        <p className="text-[12.5px] text-gray-300 leading-relaxed">Es constante, sobre todo por la noche. He tomado ibuprofeno pero no se me pasa del todo.</p>
                      </div>
                    </div>
                    {/* 4 — Agente IA empatiza y propone cita */}
                    <div className="flex gap-2.5 justify-end">
                      <div className="bg-cyan-500/[0.12] border border-cyan-500/20 rounded-xl rounded-tr-sm px-3.5 py-2 max-w-[275px]">
                        <p className="text-[12.5px] text-cyan-50 leading-relaxed">Entiendo, eso puede ser muy incómodo. Lo mejor es que te vea el doctor cuanto antes. ¿Cuándo te vendría bien venir, esta semana?</p>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 text-[10px]">🤖</div>
                    </div>
                    {/* 5 — Paciente dice disponibilidad */}
                    <div className="flex gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 text-[10px]">👤</div>
                      <div className="bg-slate-800/80 rounded-xl rounded-tl-sm px-3.5 py-2 max-w-[260px]">
                        <p className="text-[12.5px] text-gray-300 leading-relaxed">Si pudiera ser mañana o pasado, mejor. Por la mañana me viene bien.</p>
                      </div>
                    </div>
                    {/* 6 — Agente consulta agenda y ofrece huecos */}
                    <div className="flex gap-2.5 justify-end">
                      <div className="bg-cyan-500/[0.12] border border-cyan-500/20 rounded-xl rounded-tr-sm px-3.5 py-2 max-w-[275px]">
                        <p className="text-[12.5px] text-cyan-50 leading-relaxed">Perfecto, déjame comprobar la disponibilidad del doctor…</p>
                        <p className="text-[12.5px] text-cyan-50 leading-relaxed mt-1.5">Tenemos un hueco mañana miércoles a las 9:30 y otro el jueves a las 10:15. ¿Cuál prefieres?</p>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 text-[10px]">🤖</div>
                    </div>
                    {/* 7 — Paciente elige */}
                    <div className="flex gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 text-[10px]">👤</div>
                      <div className="bg-slate-800/80 rounded-xl rounded-tl-sm px-3.5 py-2">
                        <p className="text-[12.5px] text-gray-300">Mañana a las 9:30 me viene genial.</p>
                      </div>
                    </div>
                    {/* 8 — Agente confirma, pide nombre, envía SMS */}
                    <div className="flex gap-2.5 justify-end">
                      <div className="bg-cyan-500/[0.12] border border-cyan-500/20 rounded-xl rounded-tr-sm px-3.5 py-2 max-w-[275px]">
                        <p className="text-[12.5px] text-cyan-50 leading-relaxed">Listo, te reservo mañana miércoles a las 9:30 con el Dr. García. ¿A nombre de quién la pongo?</p>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 text-[10px]">🤖</div>
                    </div>
                    {/* 9 — Paciente da nombre */}
                    <div className="flex gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 text-[10px]">👤</div>
                      <div className="bg-slate-800/80 rounded-xl rounded-tl-sm px-3.5 py-2">
                        <p className="text-[12.5px] text-gray-300">A nombre de Laura Martínez.</p>
                      </div>
                    </div>
                    {/* 10 — Agente cierra con confirmación completa */}
                    <div className="flex gap-2.5 justify-end">
                      <div className="bg-cyan-500/[0.12] border border-cyan-500/20 rounded-xl rounded-tr-sm px-3.5 py-2 max-w-[275px]">
                        <p className="text-[12.5px] text-cyan-50 leading-relaxed">Perfecto, Laura. Cita confirmada: mañana miércoles a las 9:30 con el Dr. García. Ahora mismo te envío un SMS de confirmación con los datos. Si necesitas cambiar algo, puedes llamar cuando quieras. ¡Que te mejores!</p>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 text-[10px]">🤖</div>
                    </div>
                  </div>

                  {/* Bottom bar */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                    <div className="flex items-center gap-2 text-[11px] text-gray-600">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
                      </svg>
                      Duración: 1m 23s
                    </div>
                    <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Cita agendada + SMS enviado
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating mini-cards */}
              <div className="absolute -left-8 top-16 bg-[#0d1117] border border-white/[0.08] rounded-xl px-4 py-3 shadow-xl float-smooth hidden lg:flex" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">+142</p>
                    <p className="text-[10px] text-gray-500">citas este mes</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-6 bottom-20 bg-[#0d1117] border border-white/[0.08] rounded-xl px-4 py-3 shadow-xl float-smooth hidden lg:flex" style={{ animationDelay: "2s" }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">0 perdidas</p>
                    <p className="text-[10px] text-gray-500">llamadas hoy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-5 h-9 border-2 border-gray-700 rounded-full flex justify-center">
            <div className="w-1 h-2.5 bg-gray-600 rounded-full mt-2 animate-scroll-indicator" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          PROBLEM → SOLUTION
          ════════════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-gradient-to-b from-black via-slate-950 to-slate-950">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-cyan-400 text-xs font-semibold tracking-[0.2em] uppercase">
                El problema
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
                ¿Cuántos clientes pierdes cada día?
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Mientras no contestas el teléfono, tu competencia sí lo hace.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <ScrollReveal>
              <div className="bg-red-950/20 border border-red-500/15 rounded-2xl p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-red-500/15 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-red-300">Sin Neuriax</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    { metric: "52+", text: "llamadas perdidas al mes" },
                    { metric: "68%", text: "de leads sin seguimiento" },
                    { metric: "5h+", text: "semanales en tareas repetitivas" },
                    { metric: "0€", text: "generados fuera de horario" },
                  ].map((item) => (
                    <li key={item.text} className="flex items-center gap-4">
                      <span className="text-2xl font-extrabold text-red-400/90 w-14 text-right flex-shrink-0">{item.metric}</span>
                      <span className="text-gray-400 text-sm">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="bg-emerald-950/20 border border-emerald-500/15 rounded-2xl p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-500/15 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-emerald-300">Con Neuriax</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    { metric: "0", text: "llamadas sin responder" },
                    { metric: "100%", text: "leads con seguimiento automático" },
                    { metric: "0h", text: "trabajo manual repetitivo" },
                    { metric: "24/7", text: "vendiendo mientras duermes" },
                  ].map((item) => (
                    <li key={item.text} className="flex items-center gap-4">
                      <span className="text-2xl font-extrabold text-emerald-400/90 w-14 text-right flex-shrink-0">{item.metric}</span>
                      <span className="text-gray-300 text-sm">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="text-center mt-12">
              <a href="#contacto" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors text-sm">
                Quiero pasar al lado verde
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SERVICES
          ════════════════════════════════════════════════ */}
      <section id="servicios" className="py-24 px-4 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <span className="text-blue-400 text-xs font-semibold tracking-[0.2em] uppercase">
                Servicios
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
                Dos soluciones. Un objetivo.
              </h2>
              <p className="text-lg text-gray-500">Más clientes, menos trabajo manual.</p>
            </div>
          </ScrollReveal>

          {/* Service 1 — Voice Agents */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-28">
            <ScrollReveal>
              <div>
                <div className="inline-flex items-center gap-2 bg-cyan-500/[0.08] border border-cyan-500/15 rounded-full px-4 py-1.5 mb-6">
                  <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                  <span className="text-cyan-300 text-xs font-medium">Servicio estrella</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-5">Agentes de Voz IA</h3>
                <p className="text-base text-gray-400 mb-6 leading-relaxed">
                  Un asistente telefónico con inteligencia artificial que{" "}
                  <strong className="text-white">habla como una persona real</strong>.
                  Contesta llamadas de tus clientes, responde preguntas, agenda citas en tu
                  calendario y cualifica leads. Todo automáticamente, 24 horas del día.
                </p>
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 mb-8">
                  <p className="text-sm text-gray-400">
                    <span className="text-cyan-400 font-semibold">Ejemplo:</span> Un cliente
                    llama a tu clínica a las 23:00. El agente contesta, explica servicios,
                    agenda cita para mañana y te envía resumen por email. Tú ni te enteras
                    hasta la mañana siguiente.
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  {["Voz natural, indistinguible de una persona", "Llamadas entrantes y salientes", "Conectado a tu calendario", "Responde preguntas de tu negocio", "Resumen de cada conversación por email"].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-300 text-sm">
                      <svg className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="#contacto" className="inline-flex items-center gap-2 bg-white text-black font-bold py-3 px-6 rounded-full text-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-white/10">
                  Quiero un agente de voz
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </div>
            </ScrollReveal>

            {/* Visual — Automations Dashboard mockup */}
            <ScrollReveal delay={150}>
              <div className="relative">
                <div className="absolute -inset-4 bg-cyan-500/[0.04] rounded-3xl blur-2xl" />
                <div className="relative bg-[#0d1117] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
                  <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="ml-3 text-[11px] text-gray-600 font-mono">dashboard — agentes activos</span>
                  </div>
                  <div className="p-5 space-y-3">
                    {[
                      { name: "Clínica Dental Sol", calls: "34 llamadas", status: "Activo", pct: 92 },
                      { name: "Reformas García", calls: "21 llamadas", status: "Activo", pct: 78 },
                      { name: "Rest. La Marina", calls: "48 llamadas", status: "Activo", pct: 95 },
                    ].map((agent) => (
                      <div key={agent.name} className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                            <span className="text-sm text-white font-medium">{agent.name}</span>
                          </div>
                          <span className="text-[11px] text-gray-500">{agent.calls}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                            style={{ width: `${agent.pct}%` }}
                          />
                        </div>
                        <div className="flex justify-between mt-1.5">
                          <span className="text-[10px] text-gray-600">Satisfacción</span>
                          <span className="text-[10px] text-cyan-400 font-medium">{agent.pct}%</span>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.04] text-[11px] text-gray-600">
                      <span>Total este mes: 103 llamadas</span>
                      <span className="text-emerald-400">0 perdidas</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Service 2 — Automation */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollReveal className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-blue-500/[0.04] rounded-3xl blur-2xl" />
                <div className="relative bg-[#0d1117] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
                  <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="ml-3 text-[11px] text-gray-600 font-mono">automatizaciones — 5 activas</span>
                  </div>
                  <div className="p-5 space-y-2.5">
                    {[
                      { name: "Nuevo lead → WhatsApp + Email", count: "142", active: true },
                      { name: "Sin respuesta 48h → Recordatorio", count: "38", active: true },
                      { name: "Cita agendada → Confirmación SMS", count: "89", active: true },
                      { name: "Lead caliente → Notificación urgente", count: "23", active: true },
                      { name: "Resumen semanal → Email al equipo", count: "12", active: true },
                    ].map((auto) => (
                      <div key={auto.name} className="flex items-center justify-between bg-slate-800/40 border border-slate-700/40 rounded-lg px-4 py-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0" />
                          <span className="text-[13px] text-gray-300 truncate">{auto.name}</span>
                        </div>
                        <span className="text-[11px] text-gray-500 flex-shrink-0 ml-3">{auto.count} ejecuciones</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.04] text-[11px] text-gray-600">
                      <span>304 tareas automatizadas</span>
                      <span className="text-blue-400">~127h ahorradas</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150} className="order-1 lg:order-2">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-500/[0.08] border border-blue-500/15 rounded-full px-4 py-1.5 mb-6">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  <span className="text-blue-300 text-xs font-medium">Máxima eficiencia</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-5">Automatización IA</h3>
                <p className="text-base text-gray-400 mb-6 leading-relaxed">
                  Flujos de trabajo inteligentes que{" "}
                  <strong className="text-white">conectan todas tus herramientas</strong> y
                  ejecutan acciones automáticamente. Cuando llega un lead, se dispara toda la
                  cadena: WhatsApp, email, CRM, recordatorio.
                </p>
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 mb-8">
                  <p className="text-sm text-gray-400">
                    <span className="text-blue-400 font-semibold">Ejemplo:</span> Alguien
                    rellena tu formulario. En 30 segundos recibe un WhatsApp personalizado, tú
                    recibes una notificación, el lead se guarda en tu CRM y se programa un
                    seguimiento automático.
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  {["WhatsApp, Email, CRM, Calendar integrados", "Seguimiento automático de leads", "Notificaciones inteligentes por prioridad", "Informes y resúmenes automáticos", "Lo configuramos todo por ti"].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-300 text-sm">
                      <svg className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="#contacto" className="inline-flex items-center gap-2 bg-white text-black font-bold py-3 px-6 rounded-full text-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-white/10">
                  Quiero automatizar
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          INTEGRATIONS MARQUEE
          ════════════════════════════════════════════════ */}
      <section className="py-14 bg-black border-t border-b border-white/[0.04] overflow-hidden">
        <p className="text-center text-xs text-gray-600 uppercase tracking-[0.2em] mb-8">
          Integramos con las herramientas que ya usas
        </p>
        <div className="marquee-container">
          <div className="marquee-track">
            {[...INTEGRATIONS, ...INTEGRATIONS].map((tool, i) => (
              <span
                key={`${tool}-${i}`}
                className="inline-flex items-center gap-2 px-6 py-2 text-sm text-gray-500 font-medium whitespace-nowrap hover:text-white transition-colors"
              >
                <span className="w-1.5 h-1.5 bg-cyan-500/40 rounded-full" />
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          PROCESS — 3 steps
          ════════════════════════════════════════════════ */}
      <section id="proceso" className="py-24 px-4 bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <span className="text-purple-400 text-xs font-semibold tracking-[0.2em] uppercase">Proceso</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">Cómo funciona</h2>
              <p className="text-lg text-gray-500">Simple, rápido, sin complicaciones.</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30" />

            {[
              { num: "01", title: "Hablamos", desc: "Llamada de 15 min. Me cuentas tu negocio, te digo exactamente qué puedo automatizar y cuánto te va a costar. Sin rodeos.", gradient: "from-cyan-500 to-cyan-600" },
              { num: "02", title: "Construyo", desc: "Diseño e implemento tu sistema a medida. Agentes de voz, automatizaciones, integraciones. Tú sigues con tu día a día.", gradient: "from-blue-500 to-blue-600" },
              { num: "03", title: "Funciona", desc: "Tu negocio en piloto automático. Agentes respondiendo, leads llegando, seguimiento funcionando. Resultados desde el día 1.", gradient: "from-purple-500 to-purple-600" },
            ].map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 100}>
                <div className="text-center relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 text-lg font-bold shadow-lg relative z-10 rotate-3 hover:rotate-0 transition-transform duration-300`}>
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-16">
              <a href="#contacto" className="inline-flex items-center gap-3 bg-white text-black font-bold py-4 px-8 rounded-full text-base transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-white/10">
                Empezar ahora
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          RESULTS / USE CASES
          ════════════════════════════════════════════════ */}
      <section id="resultados" className="py-24 px-4 bg-gradient-to-b from-slate-950 to-black">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-emerald-400 text-xs font-semibold tracking-[0.2em] uppercase">Resultados</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">Resultados en sectores reales</h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { sector: "Clínicas dentales", result: "De 15 a 0 llamadas perdidas/semana", detail: "Agente de voz + reservas automáticas", icon: "M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" },
              { sector: "Empresas de reformas", result: "3x más presupuestos enviados", detail: "Cualificación automática de leads", icon: "M11.42 15.17l-5.1-5.1m0 0L3.29 13.1m3.03-3.03l-3.03 3.03M20.71 7.04c.39.39.39 1.02 0 1.41l-3.54 3.54M15.17 11.42l5.1 5.1m0 0l3.03-3.03m-3.03 3.03l3.03 3.03" },
              { sector: "Consultoría", result: "12h/semana de tiempo recuperado", detail: "Automatización de seguimiento", icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" },
              { sector: "Restaurantes", result: "40% más reservas fuera de horario", detail: "Agente de voz para reservas 24/7", icon: "M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.379a48.474 48.474 0 00-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M16.5 3.75V4.875c0 .621-.504 1.125-1.125 1.125H8.625A1.125 1.125 0 017.5 4.875V3.75m9 0H7.5m9 0h1.875c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H5.625A1.125 1.125 0 014.5 6.375v-1.5c0-.621.504-1.125 1.125-1.125H7.5" },
              { sector: "Peluquerías", result: "Agenda siempre llena sin llamar", detail: "Reservas por voz + recordatorios SMS", icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" },
              { sector: "Despachos de abogados", result: "100% leads contactados en <5min", detail: "Respuesta automática + cualificación IA", icon: "M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" },
            ].map((caso, i) => (
              <ScrollReveal key={caso.sector} delay={i * 80}>
                <div className="group bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 hover:border-cyan-500/20 hover:bg-white/[0.04] transition-all duration-500 h-full">
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-500/15 transition-colors">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={caso.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xs font-semibold text-cyan-400 mb-2 uppercase tracking-wider">{caso.sector}</h3>
                  <p className="text-base font-bold text-white mb-2">{caso.result}</p>
                  <p className="text-xs text-gray-500">{caso.detail}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          GUARANTEES
          ════════════════════════════════════════════════ */}
      <section className="py-16 px-4 bg-slate-950/50 border-t border-b border-white/[0.04]">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Garantía 30 días", desc: "No funciona = devuelvo el dinero", bgClass: "bg-emerald-500/10", iconClass: "text-emerald-400" },
              { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", title: "Respuesta 24h", desc: "Siempre disponible para ti", bgClass: "bg-cyan-500/10", iconClass: "text-cyan-400" },
              { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", title: "Trato directo", desc: "Hablas conmigo, no con vendedores", bgClass: "bg-blue-500/10", iconClass: "text-blue-400" },
              { icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", title: "Resultados medibles", desc: "Métricas claras, sin humo", bgClass: "bg-purple-500/10", iconClass: "text-purple-400" },
            ].map((item) => (
              <ScrollReveal key={item.title}>
                <div>
                  <div className={`w-12 h-12 ${item.bgClass} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <svg className={`w-6 h-6 ${item.iconClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="font-bold text-white text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          FAQ
          ════════════════════════════════════════════════ */}
      <section id="faq" className="py-24 px-4 bg-black">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Preguntas frecuentes</h2>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-3">
              {[
                { q: "¿Qué es exactamente un agente de voz IA?", a: "Es un asistente telefónico con inteligencia artificial. Contesta llamadas de tus clientes con voz natural, responde preguntas sobre tu negocio, agenda citas y cualifica leads. Funciona 24/7 sin descanso." },
                { q: "¿Cuánto cuesta?", a: "Depende de la complejidad. Desde 297€/mes para agentes de voz básicos. En la llamada te doy precio exacto para tu caso, sin sorpresas ni letra pequeña." },
                { q: "¿Cuánto tarda en estar funcionando?", a: "Agentes de voz: 3-5 días. Automatizaciones: 1-2 semanas dependiendo de complejidad. En la llamada te doy fecha exacta." },
                { q: "¿Y si no funciona?", a: "Garantía 30 días. Si no ves resultados, devuelvo el dinero. Sin preguntas. Pero funciona, porque lo medimos antes de empezar." },
                { q: "¿Funciona para mi sector?", a: "Si tienes clientes que te llaman o necesitas seguimiento de leads, sí. Clínicas, reformas, restaurantes, abogados, consultoría, peluquerías... Háblame de tu caso específico en la llamada." },
                { q: "¿Necesito conocimientos técnicos?", a: "Cero. Lo diseño, configuro e implemento todo yo. Tú solo ves los resultados en tu email o tu CRM." },
              ].map((faq, i) => (
                <details key={i} className="group bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/[0.1] transition-colors">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                    <span className="text-white font-medium text-[15px] pr-4">{faq.q}</span>
                    <svg className="w-4 h-4 text-gray-600 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-gray-400 leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          CONTACT / CTA FINAL
          ════════════════════════════════════════════════ */}
      <section id="contacto" className="py-24 px-4 bg-gradient-to-b from-black via-slate-950 to-slate-950">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Copy */}
            <ScrollReveal>
              <div>
                <div className="inline-flex items-center gap-2 bg-emerald-500/[0.08] border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-emerald-300 text-xs font-medium">
                    Solo 5 clientes nuevos al mes
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5">
                  ¿Listo para<br />automatizar?
                </h2>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  Rellena el formulario y te redirigimos a Calendly para elegir tu horario.{" "}
                  <span className="text-white font-medium">15 minutos. Sin compromiso.</span> Si no puedo ayudarte, te lo digo directamente.
                </p>

                {/* Benefits */}
                <ul className="space-y-4 mb-8">
                  {["Análisis gratuito de tu negocio", "Propuesta personalizada sin compromiso", "Precio cerrado en la primera llamada"].map((b) => (
                    <li key={b} className="flex items-center gap-3 text-gray-300 text-sm">
                      <div className="w-6 h-6 bg-cyan-500/10 rounded-md flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Contact info */}
                <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500">
                  <a href="tel:+34640791041" className="flex items-center gap-2 hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                    +34 640 791 041
                  </a>
                  <a href="mailto:hola@neuriax.com" className="flex items-center gap-2 hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                    hola@neuriax.com
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Right — Form */}
            <ScrollReveal delay={100}>
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
