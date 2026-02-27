import { Metadata } from "next";
import ContactForm from "../components/ContactForm";
import ScrollReveal from "../components/ScrollReveal";

export const metadata: Metadata = {
  title: "Neuriax | Agentes de IA Personalizados · Atención al Cliente 24/7",
  description:
    "Agentes de IA conversacional que atienden a tus clientes 24/7. Sistema personalizado + landing white-label + panel de control. Multi-canal: WhatsApp, voz y web chat.",
  keywords:
    "agente IA, atención al cliente IA, chatbot personalizado, agente conversacional, automatización atención cliente, landing page white-label, IA empresas",
};

/* ─────────────────────────────────────────────────────
   INTEGRATIONS DATA
   ───────────────────────────────────────────────────── */
const INTEGRATIONS = [
  "WhatsApp Business", "Google Calendar", "Google Maps", "Google Reviews",
  "Instagram", "Stripe", "Bizum", "Redsys", "Make", "Zapier",
  "Calendly", "Notion", "Gmail", "Slack", "Twilio",
  "HubSpot", "Mailchimp", "Google Sheets", "Telegram",
  "n8n", "OpenAI", "ElevenLabs", "Vapi", "REST API", "Webhook",
];

/* ─────────────────────────────────────────────────────
   DASHBOARD DATA
   ───────────────────────────────────────────────────── */
const RESTAURANT_RESERVATIONS = [
  { time: "13:00", name: "María García", guests: 4, table: "Mesa 3", status: "confirmed" },
  { time: "13:30", name: "Carlos López", guests: 2, table: "Mesa 7", status: "confirmed" },
  { time: "14:00", name: "Ana Martínez", guests: 6, table: "Mesa 1", status: "pending" },
  { time: "14:00", name: "Pedro Sánchez", guests: 3, table: "Mesa 5", status: "confirmed" },
  { time: "14:30", name: "Laura Fernández", guests: 2, table: "Mesa 8", status: "confirmed" },
  { time: "20:30", name: "Roberto Díaz", guests: 5, table: "Mesa 2", status: "confirmed" },
  { time: "21:00", name: "Sofía Ruiz", guests: 4, table: "Mesa 4", status: "pending" },
  { time: "21:30", name: "Javier Moreno", guests: 2, table: "Mesa 6", status: "confirmed" },
];

/* ───────────────────────────────────────────────────── */

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 overflow-x-hidden">

      {/* ════════════════════════════════════════════════
          HERO — Formulario + Mensaje de conversión
          ════════════════════════════════════════════════ */}
      <section id="contacto" className="relative min-h-[100svh] flex items-center px-4 overflow-hidden">
        {/* Animated aurora BG */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F1F5F9] via-[#EDE9FE] to-[#F1F5F9]" />
        <div className="absolute inset-0 hero-aurora opacity-30" />
        <div className="absolute top-[10%] right-[-10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-violet-400/[0.15] rounded-full blur-[120px] sm:blur-[200px] animate-pulse-slow" />
        <div className="absolute bottom-[5%] left-[-5%] w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-indigo-400/[0.12] rounded-full blur-[100px] sm:blur-[180px] animate-pulse-slow" style={{ animationDelay: "3s" }} />

        <div className="relative z-10 max-w-7xl mx-auto w-full py-20 sm:py-28 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* LEFT COLUMN — Conversion message */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-violet-100/80 border border-violet-200 rounded-full px-4 py-2 mb-6 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[12px] sm:text-[13px] text-violet-700 font-semibold">
                  Implementación en 5 días
                </span>
              </div>

              {/* H1 */}
              <h1 className="text-[2.5rem] sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-black leading-[1.05] tracking-[-0.03em] mb-5">
                <span className="block text-slate-900">Tu negocio</span>
                <span className="block text-slate-900">atendido 24/7</span>
                <span className="relative inline-block mt-1">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-indigo-400 to-violet-500 animate-gradient-x hero-text-glow">
                    por Inteligencia Artificial
                  </span>
                  <span className="absolute -bottom-1.5 left-0 lg:left-0 w-2/3 h-[3px] bg-gradient-to-r from-violet-500/70 via-violet-500/70 to-transparent rounded-full" />
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
                Agentes de IA que atienden, convierten y escalan.{" "}
                <span className="text-slate-900 font-semibold">Más clientes, menos trabajo manual.</span>
              </p>

              {/* Value bullets */}
              <div className="space-y-4 mb-8 w-full max-w-md">
                {[
                  {
                    icon: (
                      <svg className="w-5 h-5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    ),
                    title: "Respuesta instantánea",
                    desc: "Tu agente IA responde en menos de 2 segundos, 24/7",
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    title: "Multi-canal integrado",
                    desc: "WhatsApp, web chat, voz y más en un solo panel",
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    title: "ROI desde el primer mes",
                    desc: "Reduce costes de atención hasta un 70%",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 text-left">
                    <div className="flex-shrink-0 w-10 h-10 bg-white/80 border border-slate-200/60 rounded-xl flex items-center justify-center shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-slate-900 block">{item.title}</span>
                      <span className="text-[13px] text-slate-500">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social proof mini */}
              <div className="flex items-center gap-5 mb-6">
                {[
                  { value: "99.9%", label: "uptime" },
                  { value: "<2s", label: "respuesta" },
                  { value: "24/7", label: "disponible" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-lg sm:text-xl font-extrabold text-slate-900">{s.value}</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-500">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Contact info */}
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 text-sm text-slate-500">
                <a href="mailto:hola@neuriax.com" className="flex items-center gap-1.5 hover:text-violet-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  hola@neuriax.com
                </a>
                <span className="hidden sm:inline text-slate-300">|</span>
                <a href="https://calendly.com/neuriax/llamada" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-violet-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Agendar llamada
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN — Contact Form */}
            <div className="w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto">
              <div className="relative">
                <div className="absolute -inset-3 sm:-inset-4 bg-violet-500/[0.06] rounded-2xl sm:rounded-3xl blur-2xl sm:blur-3xl" />
                <div className="relative">
                  <ContactForm />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SOCIAL PROOF BAR
          ════════════════════════════════════════════════ */}
      <section className="py-12 px-4 bg-white border-t border-b border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8 text-center items-end">
            {[
              { value: "99.9%", label: "uptime garantizado", color: "text-emerald-400" },
              { value: "<2s", label: "tiempo de respuesta", color: "text-violet-400" },
              { value: "24/7", label: "disponibilidad total", color: "text-amber-400" },
              { value: "25+", label: "integraciones", color: "text-slate-900" },
              { value: "Multi", label: "idioma y canal", color: "text-slate-900" },
              { value: "RGPD", label: "compliant", color: "text-slate-900" },
            ].map((s) => (
              <div key={s.label}>
                <div className={`text-2xl sm:text-3xl font-extrabold ${s.color}`}>{s.value}</div>
                <div className="text-[10px] sm:text-xs text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          DASHBOARD EXAMPLE — Ultra-Premium
          ════════════════════════════════════════════════ */}
      <section id="dashboard" className="py-16 sm:py-24 px-4 bg-gradient-to-b from-[#F1F5F9] via-[#EFF6FF] to-[#EFF6FF]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10 sm:mb-14">
              <span className="text-violet-400 text-xs font-semibold tracking-[0.2em] uppercase">Centro de operaciones</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">
                Command Center
              </h2>
              <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto">
                Monitoriza conversaciones, métricas de rendimiento y configuración del agente desde un único panel.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative">
              <div className="absolute -inset-6 sm:-inset-8 bg-violet-500/[0.05] rounded-2xl sm:rounded-3xl blur-2xl sm:blur-3xl" />
              <div className="relative bg-[#0d1117] border border-white/[0.08] rounded-xl sm:rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
                {/* Browser chrome */}
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
                  <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-red-500/80" />
                  <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 sm:ml-4 text-[9px] sm:text-[11px] text-gray-500 font-mono bg-slate-800/50 px-2 sm:px-4 py-0.5 sm:py-1 rounded-md truncate">panel.neuriax.com/agents</span>
                  <div className="ml-auto flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    <span className="text-[9px] text-emerald-400 font-medium hidden sm:inline">En vivo</span>
                  </div>
                </div>

                <div className="flex">
                  {/* Sidebar - hidden on mobile */}
                  <div className="hidden md:flex flex-col w-48 lg:w-56 border-r border-white/[0.06] bg-[#0b0f14] p-4 min-h-[580px]">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg flex items-center justify-center text-[10px] font-bold text-white">N</div>
                      <span className="text-sm font-bold text-white">Neuriax</span>
                    </div>
                    {[
                      { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Overview", active: false, badge: "" },
                      { icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z", label: "Conversaciones", active: true, badge: "14" },
                      { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", label: "Clientes", active: false, badge: "312" },
                      { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", label: "Analytics", active: false, badge: "" },
                      { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", label: "Integraciones", active: false, badge: "25" },
                      { icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z", label: "Configuración", active: false, badge: "" },
                    ].map((item) => (
                      <div key={item.label} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm cursor-pointer transition-colors ${item.active ? "bg-violet-500/[0.15] text-violet-300 font-medium border border-violet-500/20" : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]"}`}>
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                        </svg>
                        {item.label}
                        {item.badge && (
                          <span className={`ml-auto text-[9px] font-medium px-1.5 py-0.5 rounded-full ${item.active ? "bg-violet-500/30 text-violet-300" : "bg-white/[0.06] text-gray-500"}`}>{item.badge}</span>
                        )}
                      </div>
                    ))}

                    {/* IA Assistant mini */}
                    <div className="mt-auto pt-4 border-t border-white/[0.06]">
                      <div className="bg-gradient-to-br from-violet-500/[0.1] to-indigo-500/[0.1] border border-violet-500/20 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-5 h-5 bg-violet-500/30 rounded-lg flex items-center justify-center">
                            <svg className="w-3 h-3 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                          </div>
                          <span className="text-[10px] text-violet-300 font-semibold">Estado del Agente</span>
                        </div>
                        <p className="text-[9px] text-gray-400 leading-relaxed">Procesadas <span className="text-emerald-400 font-medium">142 consultas</span> hoy. Tasa de resolución: 97%.</p>
                      </div>
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="flex-1 min-w-0">
                    {/* Header with alert */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 px-3 sm:px-6 py-3 sm:py-4 border-b border-white/[0.06]">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm sm:text-lg font-bold text-white">Conversaciones — Hoy</h3>
                          <span className="text-[9px] sm:text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-medium">1 pendiente de revisión</span>
                        </div>
                        <p className="text-[10px] sm:text-[11px] text-gray-500">Lunes 17 Feb · 3 canales activos · Agente v2.4</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 bg-slate-800/40 border border-slate-700/30 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5">
                          <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                          <span className="text-[9px] sm:text-[10px] text-gray-500">Buscar...</span>
                        </div>
                        <div className="relative">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-[#0d1117] text-[6px] text-white flex items-center justify-center font-bold">2</span>
                        </div>
                        <div className="w-6 sm:w-7 h-6 sm:h-7 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full flex items-center justify-center text-[8px] sm:text-[9px] font-bold text-white">MR</div>
                      </div>
                    </div>

                    <div className="p-3 sm:p-5">
                      {/* Stats with icons + trends */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-5">
                        {[
                          { label: "Resueltas", value: "138", change: "+12 vs ayer", icon: "✓", color: "text-emerald-400", bg: "bg-emerald-500/[0.08]", iconBg: "bg-emerald-500/20" },
                          { label: "Pendientes", value: "4", change: "−1 vs ayer", icon: "⏳", color: "text-amber-400", bg: "bg-amber-500/[0.08]", iconBg: "bg-amber-500/20" },
                          { label: "Usuarios", value: "89", change: "+15 esta semana", icon: "◆", color: "text-violet-400", bg: "bg-violet-500/[0.08]", iconBg: "bg-violet-500/20" },
                          { label: "Satisfacción", value: "4.9", change: "+0.2", icon: "★", color: "text-cyan-400", bg: "bg-cyan-500/[0.08]", iconBg: "bg-cyan-500/20" },
                        ].map((s) => (
                          <div key={s.label} className={`${s.bg} border border-white/[0.04] rounded-lg sm:rounded-xl p-2.5 sm:p-3`}>
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className={`w-5 h-5 sm:w-6 sm:h-6 ${s.iconBg} rounded-lg flex items-center justify-center text-[10px] sm:text-[12px]`}>{s.icon}</span>
                              <span className="text-[8px] sm:text-[9px] text-gray-500 uppercase tracking-wider">{s.label}</span>
                            </div>
                            <div className={`text-lg sm:text-2xl font-bold ${s.color}`}>{s.value}</div>
                            <span className="text-[8px] sm:text-[9px] text-emerald-400/70 font-medium">{s.change}</span>
                          </div>
                        ))}
                      </div>

                      {/* Main grid: Table + Side panels */}
                      <div className="flex flex-col lg:flex-row gap-4">
                        {/* Left: Timeline + Table */}
                        <div className="flex-1 min-w-0">
                          {/* Visual day timeline */}
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] sm:text-[11px] text-gray-400 font-medium">Timeline del día</span>
                              <div className="flex items-center gap-2">
                                <span className="flex items-center gap-1 text-[8px] text-gray-500"><span className="w-2 h-2 rounded-full bg-emerald-500/60" />Lleno</span>
                                <span className="flex items-center gap-1 text-[8px] text-gray-500"><span className="w-2 h-2 rounded-full bg-violet-500/60" />Alto</span>
                                <span className="flex items-center gap-1 text-[8px] text-gray-500"><span className="w-2 h-2 rounded-full bg-slate-600/60" />Libre</span>
                              </div>
                            </div>
                            <div className="relative">
                              {/* Timeline bar */}
                              <div className="flex gap-0.5 sm:gap-1">
                                {[
                                  { time: "12:00", pct: 30 }, { time: "13:00", pct: 100 }, { time: "13:30", pct: 85 },
                                  { time: "14:00", pct: 100 }, { time: "14:30", pct: 60 }, { time: "15:00", pct: 20 },
                                  { time: "20:00", pct: 40 }, { time: "20:30", pct: 90 }, { time: "21:00", pct: 100 },
                                  { time: "21:30", pct: 75 }, { time: "22:00", pct: 30 },
                                ].map((slot) => (
                                  <div key={slot.time} className="flex-1 group relative">
                                    <div className="h-6 sm:h-8 bg-slate-800/40 rounded-sm overflow-hidden flex items-end">
                                      <div
                                        className={`w-full rounded-sm ${slot.pct === 100 ? "bg-emerald-500/70" : slot.pct >= 80 ? "bg-violet-500/60" : slot.pct >= 50 ? "bg-indigo-500/50" : "bg-slate-600/40"}`}
                                        style={{ height: `${slot.pct}%` }}
                                      />
                                    </div>
                                    <span className="text-[6px] sm:text-[7px] text-gray-600 block text-center mt-0.5 hidden sm:block">{slot.time}</span>
                                  </div>
                                ))}
                              </div>
                              {/* Current time indicator */}
                              <div className="absolute top-0 bottom-0 left-[45%] w-0.5 bg-amber-400/60 rounded-full" />
                              <div className="absolute -top-1 left-[45%] -translate-x-1/2 text-[7px] text-amber-400 font-bold bg-[#0d1117] px-1 rounded hidden sm:block">AHORA</div>
                            </div>
                          </div>

                          {/* Compact reservation list */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-[10px] sm:text-[11px] text-gray-400 font-medium">Conversaciones recientes</span>
                              <div className="flex items-center gap-1 ml-auto">
                                {["Todas", "Pendientes"].map((f, i) => (
                                  <span key={f} className={`text-[8px] sm:text-[9px] px-2 py-0.5 rounded-full cursor-pointer transition-colors ${i === 0 ? "bg-violet-500/20 text-violet-300" : "bg-slate-800/40 text-gray-500"}`}>{f}</span>
                                ))}
                              </div>
                            </div>
                            {RESTAURANT_RESERVATIONS.slice(0, 6).map((r, i) => (
                              <div key={i} className={`flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors ${i === 2 ? "bg-amber-500/[0.06] border border-amber-500/20" : i === 0 ? "bg-violet-500/[0.05]" : "hover:bg-white/[0.02]"}`}>
                                <span className="text-[9px] sm:text-[11px] text-gray-400 font-mono w-8 sm:w-10 flex-shrink-0">{r.time}</span>
                                <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[7px] sm:text-[8px] font-bold flex-shrink-0 ${i % 3 === 0 ? "bg-violet-500/20 text-violet-300" : i % 3 === 1 ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`}>
                                  {r.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="text-[10px] sm:text-[11px] text-white font-medium block truncate">{r.name}</span>
                                  <span className="text-[7px] sm:text-[8px] text-gray-600">{r.guests} pax · {r.table}</span>
                                </div>
                                <div className="flex items-center gap-1 flex-shrink-0">
                                  {i % 3 === 0 ? (
                                    <span className="text-[7px] sm:text-[8px] bg-emerald-500/10 text-emerald-400 px-1 sm:px-1.5 py-0.5 rounded font-medium hidden sm:block">WhatsApp</span>
                                  ) : i % 3 === 1 ? (
                                    <span className="text-[7px] sm:text-[8px] bg-violet-500/10 text-violet-400 px-1 sm:px-1.5 py-0.5 rounded font-medium hidden sm:block">Web</span>
                                  ) : (
                                    <span className="text-[7px] sm:text-[8px] bg-cyan-500/10 text-cyan-400 px-1 sm:px-1.5 py-0.5 rounded font-medium hidden sm:block">Bot IA</span>
                                  )}
                                  <span className={`text-[8px] sm:text-[9px] font-medium px-1.5 py-0.5 rounded-full ${r.status === "confirmed" ? "bg-emerald-500/[0.12] text-emerald-400" : "bg-amber-500/[0.12] text-amber-400"}`}>
                                    {r.status === "confirmed" ? "✓" : "⏳"}
                                  </span>
                                </div>
                              </div>
                            ))}
                            <div className="text-center pt-2">
                              <span className="text-[9px] text-violet-400 cursor-pointer hover:text-violet-300">Ver todas (14) →</span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Side panels — hidden on mobile */}
                        <div className="w-full lg:w-64 flex flex-col gap-3 sm:gap-4">
                          {/* Floor map */}
                          <div className="bg-slate-800/20 border border-white/[0.04] rounded-xl p-3">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[10px] text-gray-400 font-medium">Mapa de mesas</span>
                              <span className="text-[8px] text-emerald-400">3 libres</span>
                            </div>
                            <div className="grid grid-cols-4 gap-1.5">
                              {[
                                { id: 1, status: "occupied", name: "A.M." },
                                { id: 2, status: "occupied", name: "R.D." },
                                { id: 3, status: "occupied", name: "M.G." },
                                { id: 4, status: "free", name: "" },
                                { id: 5, status: "soon", name: "P.S." },
                                { id: 6, status: "occupied", name: "J.M." },
                                { id: 7, status: "occupied", name: "C.L." },
                                { id: 8, status: "free", name: "" },
                              ].map((table) => (
                                <div key={table.id} className={`aspect-square rounded-lg flex flex-col items-center justify-center text-[7px] sm:text-[8px] font-medium border ${
                                  table.status === "occupied" ? "bg-violet-500/15 border-violet-500/30 text-violet-300" :
                                  table.status === "soon" ? "bg-amber-500/15 border-amber-500/30 text-amber-300" :
                                  "bg-slate-800/30 border-slate-700/30 text-gray-600"
                                }`}>
                                  <span className="text-[8px] sm:text-[9px]">{table.id}</span>
                                  {table.name && <span className="text-[6px] sm:text-[7px] opacity-70">{table.name}</span>}
                                  {table.status === "soon" && <span className="text-[5px] sm:text-[6px] text-amber-400 mt-0.5">14:30</span>}
                                </div>
                              ))}
                            </div>
                            <div className="flex items-center gap-3 mt-2 pt-2 border-t border-white/[0.04]">
                              <span className="flex items-center gap-1 text-[7px] text-gray-500"><span className="w-1.5 h-1.5 rounded-full bg-violet-500/60" />Ocupada</span>
                              <span className="flex items-center gap-1 text-[7px] text-gray-500"><span className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />Próxima</span>
                              <span className="flex items-center gap-1 text-[7px] text-gray-500"><span className="w-1.5 h-1.5 rounded-full bg-slate-600/60" />Libre</span>
                            </div>
                          </div>

                          {/* WhatsApp preview */}
                          <div className="bg-slate-800/20 border border-white/[0.04] rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                              </div>
                              <span className="text-[10px] text-gray-400 font-medium">Recordatorio automático</span>
                            </div>
                            <div className="bg-[#0b2e18] rounded-xl rounded-tl-sm p-2.5 border border-emerald-800/30">
                              <p className="text-[9px] sm:text-[10px] text-emerald-100/90 leading-relaxed">
                                Hola María 👋<br/>
                                Te recordamos tu reserva <span className="font-semibold">mañana a las 14:00</span> en La Trattoria (Mesa 3, 4 pax).<br/><br/>
                                ¿Confirmas? Responde <span className="font-bold">SÍ</span> o <span className="font-bold">NO</span>
                              </p>
                              <div className="flex items-center justify-end gap-1 mt-1">
                                <span className="text-[7px] text-emerald-400/50">13:42</span>
                                <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"/></svg>
                              </div>
                            </div>
                            <div className="mt-2 bg-[#0b2e18] rounded-xl rounded-tl-sm p-2 border border-emerald-800/30 ml-8">
                              <p className="text-[9px] sm:text-[10px] text-emerald-100/90">SÍ, confirmado! 😊</p>
                              <div className="flex items-center justify-end gap-1 mt-0.5">
                                <span className="text-[7px] text-emerald-400/50">13:44</span>
                              </div>
                            </div>
                          </div>

                          {/* Activity feed */}
                          <div className="bg-slate-800/20 border border-white/[0.04] rounded-xl p-3">
                            <span className="text-[10px] text-gray-400 font-medium block mb-2">Actividad reciente</span>
                            <div className="space-y-2">
                              {[
                                { icon: "✓", color: "text-emerald-400 bg-emerald-500/20", text: "Consulta #1247 resuelta por el agente", time: "hace 2 min" },
                                { icon: "◆", color: "text-violet-400 bg-violet-500/20", text: "Nuevo lead cualificado vía web chat", time: "hace 5 min" },
                                { icon: "◆", color: "text-cyan-400 bg-cyan-500/20", text: "Follow-up enviado a María", time: "hace 8 min" },
                                { icon: "◆", color: "text-amber-400 bg-amber-500/20", text: "Agente de voz atendió llamada", time: "hace 12 min" },
                              ].map((a, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] flex-shrink-0 ${a.color}`}>{a.icon}</span>
                                  <div className="min-w-0">
                                    <span className="text-[9px] text-gray-300 block leading-tight">{a.text}</span>
                                    <span className="text-[7px] text-gray-600">{a.time}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom bar — weekly chart + AI summary */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/[0.04]">
                        {/* Weekly area chart */}
                        <div className="bg-slate-800/20 border border-white/[0.04] rounded-xl p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] text-gray-400 font-medium">Interacciones esta semana</span>
                            <span className="text-[9px] text-emerald-400 font-medium">+18% ↑</span>
                          </div>
                          <div className="flex items-end gap-1 h-16 sm:h-20">
                            {[
                              { day: "L", val: 14, max: true },
                              { day: "M", val: 11, max: false },
                              { day: "X", val: 9, max: false },
                              { day: "J", val: 16, max: false },
                              { day: "V", val: 22, max: false },
                              { day: "S", val: 28, max: false },
                              { day: "D", val: 8, max: false },
                            ].map((d) => (
                              <div key={d.day} className="flex-1 flex flex-col items-center gap-0.5">
                                <div className="w-full bg-slate-800/40 rounded-sm overflow-hidden flex items-end" style={{ height: '100%' }}>
                                  <div className={`w-full rounded-sm transition-all ${d.day === "L" ? "bg-violet-500/80 animate-pulse-slow" : d.val >= 20 ? "bg-emerald-500/60" : d.val >= 12 ? "bg-violet-500/50" : "bg-indigo-500/40"}`} style={{ height: `${(d.val / 28) * 100}%` }} />
                                </div>
                                <span className="text-[7px] sm:text-[8px] text-gray-600">{d.day}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* AI summary */}
                        <div className="bg-gradient-to-br from-violet-500/[0.08] to-indigo-500/[0.08] border border-violet-500/10 rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 bg-violet-500/20 rounded-lg flex items-center justify-center">
                              <svg className="w-3.5 h-3.5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <span className="text-[10px] sm:text-[11px] text-violet-300 font-semibold">Resumen IA del día</span>
                          </div>
                          <div className="space-y-1.5">
                            <p className="text-[9px] sm:text-[10px] text-gray-400 leading-relaxed flex items-start gap-1.5">
                              <span className="text-emerald-400 mt-0.5">●</span>
                              <span><span className="text-white font-medium">138 de 142</span> consultas resueltas automáticamente</span>
                            </p>
                            <p className="text-[9px] sm:text-[10px] text-gray-400 leading-relaxed flex items-start gap-1.5">
                              <span className="text-violet-400 mt-0.5">●</span>
                              <span>Tiempo medio de respuesta: <span className="text-white font-medium">1.2 segundos</span></span>
                            </p>
                            <p className="text-[9px] sm:text-[10px] text-gray-400 leading-relaxed flex items-start gap-1.5">
                              <span className="text-amber-400 mt-0.5">●</span>
                              <span>4 consultas <span className="text-amber-400 font-medium">requieren revisión manual</span></span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          LANDING PAGE EXAMPLES — Scrollable previews
          ════════════════════════════════════════════════ */}
      <section id="ejemplos" className="py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-indigo-400 text-xs font-semibold tracking-[0.2em] uppercase">Landing incluida</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">
                Landing page white-label. Personalizable.
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Cada agente incluye una landing profesional con la identidad de tu marca. Dominio propio, diseño adaptado y conversión optimizada.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Landing 1 — Restaurant Ultra-Premium */}
            <ScrollReveal>
              <div className="relative">
                <div className="absolute -inset-3 bg-amber-500/[0.06] rounded-3xl blur-2xl" />
                <div className="relative bg-[#0d1117] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="ml-3 text-[10px] text-gray-500 font-mono bg-slate-800/50 px-3 py-0.5 rounded-md flex items-center gap-1.5">
                      <svg className="w-2.5 h-2.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                      reservas.trattorialanonna.es
                    </span>
                    <div className="ml-auto flex items-center gap-1">
                      <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                      <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01" /></svg>
                    </div>
                  </div>
                  {/* Scrollable landing */}
                  <div className="max-h-[540px] overflow-y-auto scrollbar-thin">
                    {/* Navbar */}
                    <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/[0.04] bg-[#0c1015]/95 backdrop-blur-xl sticky top-0 z-10">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400 text-sm">🍝</span>
                        <span className="text-[12px] text-white font-semibold tracking-wide">Trattoria La Nonna</span>
                      </div>
                      <div className="flex items-center gap-5">
                        <span className="text-[9px] text-gray-400 hidden sm:block hover:text-white transition-colors cursor-pointer">Carta</span>
                        <span className="text-[9px] text-gray-400 hidden sm:block hover:text-white transition-colors cursor-pointer">Horarios</span>
                        <span className="text-[9px] text-gray-400 hidden sm:block hover:text-white transition-colors cursor-pointer">Contacto</span>
                        <div className="flex items-center gap-1.5">
                          <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" /></span>
                          <span className="text-[8px] text-emerald-400 font-medium hidden sm:block">Abierto</span>
                        </div>
                        <span className="text-[9px] bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold px-3 py-1 rounded-full shadow-lg shadow-amber-500/25">Reservar</span>
                      </div>
                    </div>
                    {/* Hero con imagen real */}
                    <div className="relative h-52 overflow-hidden">
                      <img src="/mockups/restaurante/hero.jpg" alt="Trattoria La Nonna" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/30 to-black/20" />
                      {/* Trust badges floating */}
                      <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                        <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-0.5 border border-white/10">
                          <svg className="w-2.5 h-2.5 text-amber-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.41 16.09V16.9c-1.63-.11-2.88-.72-3.72-1.26l.66-1.56c.87.54 1.99 1.08 3.24 1.08 1.35 0 2.04-.63 2.04-1.44 0-.81-.54-1.29-2.1-1.8-2.19-.72-3.48-1.53-3.48-3.33 0-1.62 1.14-2.88 3.12-3.24V4.09h1.5v1.2c1.29.12 2.16.51 2.82.93l-.63 1.5c-.51-.3-1.38-.84-2.64-.84-1.44 0-1.89.72-1.89 1.32 0 .78.63 1.17 2.37 1.77 2.31.78 3.21 1.74 3.21 3.42 0 1.71-1.26 3.03-3.36 3.33v1.31h-1.5z" /></svg>
                          <span className="text-[7px] text-white font-bold">TheFork</span>
                        </div>
                        <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-0.5 border border-white/10">
                          <svg className="w-2.5 h-2.5 text-green-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" /></svg>
                          <span className="text-[7px] text-white font-bold">TripAdvisor</span>
                        </div>
                      </div>
                      {/* Social proof toast */}
                      <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/70 backdrop-blur-sm rounded-lg px-2.5 py-1.5 border border-white/10 animate-pulse">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-[7px] font-bold text-black">A</div>
                        <div>
                          <p className="text-[8px] text-white font-medium">Ana reservó mesa para 4</p>
                          <p className="text-[7px] text-gray-400">hace 5 min</p>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[9px] bg-amber-500/20 text-amber-400 font-semibold px-2 py-0.5 rounded-full border border-amber-500/20">Fine Dining</span>
                          <span className="text-[9px] bg-white/10 text-white/70 font-medium px-2 py-0.5 rounded-full backdrop-blur-sm">📍 Madrid Centro</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 tracking-tight">Trattoria La Nonna</h3>
                        <p className="text-[12px] text-gray-300/80 italic">Cocina italiana auténtica desde 1998</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1">
                            <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <svg key={s} className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}</div>
                            <span className="text-[10px] text-gray-400 ml-0.5">4.8</span>
                          </div>
                          <span className="text-[9px] text-gray-500">·</span>
                          <span className="text-[10px] text-gray-400">324 reseñas</span>
                          <span className="text-[9px] text-gray-500">·</span>
                          <span className="text-[10px] text-gray-400">€€€</span>
                        </div>
                      </div>
                    </div>
                    {/* Galería de platos — masonry 2x2 */}
                    <div className="grid grid-cols-4 grid-rows-2 gap-1 px-1 py-1 h-32">
                      <div className="col-span-2 row-span-2 relative rounded-lg overflow-hidden group cursor-pointer">
                        <img src="/mockups/restaurante/plato1.jpg" alt="Pasta fresca" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                          <span className="text-[9px] text-white font-semibold">🍝 Pasta fresca del día</span>
                        </div>
                      </div>
                      <div className="col-span-2 relative rounded-lg overflow-hidden group cursor-pointer">
                        <img src="/mockups/restaurante/plato2.jpg" alt="Especialidad" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                          <span className="text-[9px] text-white font-semibold">🥩 Especialidad de la casa</span>
                        </div>
                      </div>
                      <div className="col-span-2 relative rounded-lg overflow-hidden group cursor-pointer">
                        <img src="/mockups/restaurante/plato3.jpg" alt="Carta del chef" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                          <span className="text-[9px] text-white font-semibold">👨‍🍳 Menú degustación</span>
                        </div>
                      </div>
                    </div>
                    {/* Menú categorías */}
                    <div className="px-5 pt-4 pb-2">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-4 bg-amber-500 rounded-full" />
                        <span className="text-[11px] text-white font-semibold">Nuestra carta</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { icon: "🥗", name: "Entrantes", count: "12" },
                          { icon: "🍝", name: "Pasta", count: "8" },
                          { icon: "🥩", name: "Carnes", count: "6" },
                          { icon: "🍰", name: "Postres", count: "5" },
                        ].map((cat) => (
                          <div key={cat.name} className="text-center bg-white/[0.03] border border-white/[0.06] rounded-xl p-2 hover:border-amber-500/30 transition-colors cursor-pointer group">
                            <span className="text-base block mb-0.5 group-hover:scale-110 transition-transform">{cat.icon}</span>
                            <p className="text-[9px] text-white font-medium">{cat.name}</p>
                            <p className="text-[7px] text-gray-500">{cat.count} platos</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Urgencia de disponibilidad */}
                    <div className="mx-5 mb-2 flex items-center gap-2 bg-amber-500/[0.08] border border-amber-500/20 rounded-lg px-3 py-2">
                      <span className="text-amber-400 text-xs">⚡</span>
                      <span className="text-[10px] text-amber-300 font-medium">Solo quedan 2 mesas para viernes noche</span>
                      <span className="text-[8px] text-amber-500/60 ml-auto">Alta demanda</span>
                    </div>
                    {/* Formulario de reserva premium */}
                    <div className="p-5 sm:p-6 space-y-4">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-1 h-5 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full" />
                        <span className="text-[13px] text-white font-semibold">Reserva tu mesa</span>
                        <span className="ml-auto text-[8px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-medium">Confirmación inmediata</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] text-gray-500 uppercase tracking-widest mb-1.5 block font-medium">Comensales</label>
                          <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-[12px] text-white flex items-center justify-between hover:border-amber-500/30 transition-colors cursor-pointer">
                            <div className="flex items-center gap-2">
                              <svg className="w-3.5 h-3.5 text-amber-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                              <span>4 personas</span>
                            </div>
                            <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                          </div>
                        </div>
                        <div>
                          <label className="text-[9px] text-gray-500 uppercase tracking-widest mb-1.5 block font-medium">Fecha</label>
                          <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-[12px] text-white flex items-center justify-between hover:border-amber-500/30 transition-colors cursor-pointer">
                            <div className="flex items-center gap-2">
                              <svg className="w-3.5 h-3.5 text-amber-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                              <span>Vie, 21 Feb</span>
                            </div>
                            <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="text-[9px] text-gray-500 uppercase tracking-widest mb-1.5 block font-medium">Horario disponible</label>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { h: "13:00", available: true }, { h: "13:30", available: true }, { h: "14:00", available: false }, { h: "14:30", available: true },
                            { h: "20:30", available: true, selected: true }, { h: "21:00", available: true }, { h: "21:30", available: true }, { h: "22:00", available: false },
                          ].map((slot) => (
                            <div key={slot.h} className={`text-center text-[11px] py-2.5 rounded-xl cursor-pointer transition-all relative ${slot.selected ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold shadow-lg shadow-amber-500/20 scale-[1.02]" : slot.available ? "bg-white/[0.03] border border-white/[0.06] text-gray-400 hover:border-amber-500/30 hover:text-white" : "bg-white/[0.01] border border-white/[0.03] text-gray-700 line-through cursor-not-allowed"}`}>
                              {slot.h}
                              {!slot.available && <span className="absolute -top-1 -right-1 text-[6px] bg-red-500/20 text-red-400 px-1 rounded-full">Lleno</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-[9px] text-gray-500 uppercase tracking-widest mb-1.5 block font-medium">Peticiones especiales</label>
                        <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-[11px] text-gray-500 italic hover:border-white/[0.15] transition-colors cursor-text">Alergias, celebraciones, silla infantil...</div>
                      </div>
                      <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold py-3.5 rounded-xl text-sm hover:shadow-xl hover:shadow-amber-500/25 transition-all hover:scale-[1.01] flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        Confirmar reserva
                      </button>
                      {/* WhatsApp confirmation preview */}
                      <div className="bg-[#0b2014] border border-emerald-500/20 rounded-xl p-3 flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" /></svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[9px] text-emerald-400 font-semibold">WhatsApp</span>
                            <span className="text-[7px] text-gray-600">· Confirmación automática</span>
                          </div>
                          <div className="bg-[#0d2e1a] rounded-lg px-2.5 py-2 border border-emerald-500/10">
                            <p className="text-[10px] text-gray-300 leading-relaxed">✅ <span className="text-white font-medium">Reserva confirmada</span></p>
                            <p className="text-[9px] text-gray-400 mt-0.5">Trattoria La Nonna · Vie 21 Feb · 20:30</p>
                            <p className="text-[9px] text-gray-400">Mesa para 4 · Ref: #TLN-2847</p>
                          </div>
                        </div>
                      </div>
                      {/* Reseñas con fuente */}
                      <div className="pt-4 border-t border-white/[0.06] space-y-2.5">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">Reseñas verificadas</span>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 bg-white/[0.04] px-2 py-0.5 rounded-full">
                              <svg className="w-2.5 h-2.5 text-[#4285F4]" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                              <span className="text-[8px] text-gray-400 font-semibold">4.8</span>
                            </div>
                            <div className="flex items-center gap-1 bg-white/[0.04] px-2 py-0.5 rounded-full">
                              <span className="text-[8px]">🍴</span>
                              <span className="text-[8px] text-gray-400 font-semibold">TheFork 9.2</span>
                            </div>
                          </div>
                        </div>
                        {[
                          { name: "Carmen R.", text: "Increíble pasta casera. El mejor italiano de la zona. Reservé online en 20 segundos.", stars: 5, time: "hace 2 días", source: "Google", badge: "Local Guide" },
                          { name: "Miguel A.", text: "Ambiente acogedor y servicio impecable. Ya hemos vuelto 3 veces.", stars: 5, time: "hace 1 semana", source: "TripAdvisor", badge: "Verificado" },
                        ].map((rev) => (
                          <div key={rev.name} className="bg-white/[0.03] border border-white/[0.04] rounded-xl p-3">
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-gradient-to-br from-amber-500/30 to-orange-500/20 rounded-full flex items-center justify-center text-[8px] font-bold text-amber-300">{rev.name.split(' ').map(n => n[0]).join('')}</div>
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[11px] text-white font-medium">{rev.name}</span>
                                    <span className="text-[7px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded-full border border-amber-500/10">{rev.badge}</span>
                                  </div>
                                  <div className="flex items-center gap-1 mt-0.5">
                                    <span className="text-[7px] text-gray-500">vía {rev.source}</span>
                                    <span className="text-[7px] text-gray-600">· {rev.time}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-0.5">{Array.from({length: rev.stars}).map((_, i) => <svg key={i} className="w-2.5 h-2.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}</div>
                            </div>
                            <p className="text-[10px] text-gray-400 leading-relaxed italic">&ldquo;{rev.text}&rdquo;</p>
                          </div>
                        ))}
                      </div>
                      {/* Ubicación con mapa estilizado */}
                      <div className="bg-white/[0.03] border border-white/[0.04] rounded-xl p-3 overflow-hidden">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <span className="text-[11px] text-white font-medium">C/ Gran Vía 45, Madrid</span>
                          </div>
                          <span className="text-[8px] text-amber-400 cursor-pointer hover:text-amber-300">Cómo llegar →</span>
                        </div>
                        <div className="h-20 bg-[#1a1f2e] rounded-lg relative overflow-hidden border border-white/[0.06]">
                          {/* Stylized map */}
                          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #334155 1px, transparent 1px)", backgroundSize: "12px 12px" }} />
                          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 80"><path d="M0 40h40l10-10 20 20 15-15 20 10h95" stroke="#475569" strokeWidth="0.5" fill="none" /><path d="M20 0v80M60 0v80M100 0v80M140 0v80M180 0v80" stroke="#334155" strokeWidth="0.3" /><path d="M0 20h200M0 60h200" stroke="#334155" strokeWidth="0.3" /></svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                              <div className="absolute -inset-3 bg-amber-500/20 rounded-full animate-ping" />
                              <div className="relative w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30 border-2 border-white/20">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                              </div>
                            </div>
                          </div>
                          <div className="absolute bottom-1 left-2 flex items-center gap-1">
                            <span className="text-[7px] text-gray-500 bg-black/40 px-1 rounded">Metro: Gran Vía · 2 min</span>
                          </div>
                        </div>
                      </div>
                      {/* Footer completo */}
                      <div className="pt-4 border-t border-white/[0.06] grid grid-cols-3 gap-3">
                        <div>
                          <p className="text-[8px] text-gray-600 uppercase tracking-widest mb-1 font-medium">Horario</p>
                          <p className="text-[9px] text-gray-400">L-J: 13-16, 20-23</p>
                          <p className="text-[9px] text-gray-400">V-S: 13-16, 20-00</p>
                          <p className="text-[9px] text-amber-400/60 mt-0.5">D: Cerrado</p>
                        </div>
                        <div>
                          <p className="text-[8px] text-gray-600 uppercase tracking-widest mb-1 font-medium">Contacto</p>
                          <p className="text-[9px] text-gray-400">info@trattoria.es</p>
                          <p className="text-[9px] text-gray-400">+34 911 234 567</p>
                          <p className="text-[9px] text-emerald-400/70 mt-0.5 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />WhatsApp
                          </p>
                        </div>
                        <div>
                          <p className="text-[8px] text-gray-600 uppercase tracking-widest mb-1 font-medium">Social</p>
                          <div className="flex gap-1.5">
                            {[
                              { label: "IG", gradient: "from-pink-500 to-purple-500" },
                              { label: "FB", gradient: "from-blue-600 to-blue-500" },
                              { label: "G", gradient: "from-amber-500 to-red-500" },
                            ].map(s => (
                              <div key={s.label} className={`w-5 h-5 rounded-md bg-gradient-to-br ${s.gradient} flex items-center justify-center text-[7px] text-white font-bold shadow-sm hover:scale-110 transition-transform cursor-pointer`}>{s.label}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* Cookie banner mini */}
                      <div className="flex items-center justify-between bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs">🍪</span>
                          <span className="text-[8px] text-gray-500">Usamos cookies para mejorar tu experiencia</span>
                        </div>
                        <div className="flex gap-1.5">
                          <span className="text-[7px] text-gray-500 cursor-pointer hover:text-white transition-colors">Configurar</span>
                          <span className="text-[7px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded cursor-pointer font-medium">Aceptar</span>
                        </div>
                      </div>
                      <div className="text-center pt-3 border-t border-white/[0.04]">
                        <span className="text-[9px] text-gray-600">Powered by <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent font-semibold">Neuriax</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Landing 2 — Barbershop Ultra-Premium */}
            <ScrollReveal delay={150}>
              <div className="relative">
                <div className="absolute -inset-3 bg-indigo-500/[0.04] rounded-3xl blur-2xl" />
                <div className="relative bg-[#0d1117] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <div className="ml-3 flex items-center gap-1.5 bg-slate-800/50 px-3 py-0.5 rounded-md">
                      <svg className="w-2.5 h-2.5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                      <span className="text-[10px] text-gray-500 font-mono">reservas.urbancutbarberia.es</span>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                      <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01" /></svg>
                    </div>
                  </div>
                  <div className="max-h-[540px] overflow-y-auto scrollbar-thin">
                    {/* Navbar */}
                    <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/[0.04] bg-[#0b0f14]/95 backdrop-blur-xl sticky top-0 z-10">
                      <div className="flex items-center gap-2">
                        <span className="text-indigo-400 text-sm">💈</span>
                        <span className="text-[11px] text-white font-bold tracking-wide">Urban Cut Barbería</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[9px] text-gray-500 hidden sm:block hover:text-gray-300 cursor-pointer transition-colors">Servicios</span>
                        <span className="text-[9px] text-gray-500 hidden sm:block hover:text-gray-300 cursor-pointer transition-colors">Equipo</span>
                        <div className="flex items-center gap-1.5">
                          <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" /></span>
                          <span className="text-[8px] text-emerald-400 font-medium hidden sm:block">Abierto · 2 en espera</span>
                        </div>
                        <span className="text-[9px] bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-bold px-3 py-1 rounded-full shadow-lg shadow-indigo-500/25">Reservar</span>
                      </div>
                    </div>
                    {/* Hero with real image */}
                    <div className="relative h-52 overflow-hidden">
                      <img src="/mockups/barberia/salon.jpg" alt="Urban Cut Barbería" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/30 to-black/20" />
                      {/* Trust badges */}
                      <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                        <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-0.5 border border-white/10">
                          <svg className="w-2.5 h-2.5 text-[#4285F4]" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                          <span className="text-[7px] text-white font-bold">4.9 Google</span>
                        </div>
                        <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-0.5 border border-white/10">
                          <span className="text-[8px]">🏆</span>
                          <span className="text-[7px] text-white font-bold">Top 10 BCN</span>
                        </div>
                      </div>
                      {/* Social proof toast */}
                      <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/70 backdrop-blur-sm rounded-lg px-2.5 py-1.5 border border-white/10 animate-pulse">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-[7px] font-bold text-white">J</div>
                        <div>
                          <p className="text-[8px] text-white font-medium">Javi reservó con Carlos</p>
                          <p className="text-[7px] text-gray-400">hace 8 min</p>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[9px] bg-indigo-500/20 text-indigo-300 font-semibold px-2 py-0.5 rounded-full border border-indigo-500/20">Barbería Premium</span>
                          <span className="text-[9px] bg-white/10 text-white/70 font-medium px-2 py-0.5 rounded-full backdrop-blur-sm">📍 Barcelona</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 tracking-tight">Urban Cut Barbería</h3>
                        <p className="text-[12px] text-gray-300/80">Estilo y precisión en cada corte</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1">
                            <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <svg key={s} className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}</div>
                            <span className="text-[10px] text-gray-400 ml-0.5">4.9</span>
                          </div>
                          <span className="text-[9px] text-gray-500">·</span>
                          <span className="text-[10px] text-gray-400">187 reseñas</span>
                          <span className="text-[9px] text-gray-500">·</span>
                          <span className="text-[10px] text-gray-400">€€</span>
                        </div>
                      </div>
                    </div>
                    {/* Before/After gallery */}
                    <div className="px-4 pt-3 pb-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">✂️ Nuestros trabajos</span>
                        <span className="text-[8px] text-indigo-400 cursor-pointer">Ver todos →</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {[
                          { src: "/mockups/barberia/corte1.jpg", label: "Degradado", tag: "Popular" },
                          { src: "/mockups/barberia/corte2.jpg", label: "Clásico", tag: null },
                          { src: "/mockups/barberia/corte-barba.jpg", label: "Barba", tag: "Nuevo" },
                          { src: "/mockups/barberia/corte-estilo.jpg", label: "Premium", tag: null },
                        ].map((cut, i) => (
                          <div key={i} className="relative rounded-lg overflow-hidden group cursor-pointer aspect-square">
                            <img src={cut.src} alt={cut.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col items-center justify-end pb-1.5">
                              <span className="text-[8px] text-white font-semibold">{cut.label}</span>
                            </div>
                            {cut.tag && <span className="absolute top-1 right-1 text-[6px] bg-indigo-500 text-white px-1.5 py-0.5 rounded-full font-bold">{cut.tag}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Instagram feed preview */}
                    <div className="mx-4 mt-2 mb-1 bg-white/[0.02] border border-white/[0.06] rounded-xl p-2.5">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-md bg-gradient-to-br from-pink-500 via-red-500 to-amber-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                        </div>
                        <div>
                          <span className="text-[9px] text-white font-semibold">@urbancutbarberia</span>
                          <span className="text-[7px] text-gray-500 ml-1.5">· 2.4k seguidores</span>
                        </div>
                        <span className="ml-auto text-[7px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full font-semibold cursor-pointer">Seguir</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1">
                        {["/mockups/barberia/corte1.jpg", "/mockups/barberia/corte-estilo.jpg", "/mockups/barberia/corte-barba.jpg", "/mockups/barberia/corte2.jpg"].map((src, i) => (
                          <div key={i} className="aspect-square rounded overflow-hidden">
                            <img src={src} alt="" className="w-full h-full object-cover hover:opacity-80 transition-opacity cursor-pointer" />
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Urgencia */}
                    <div className="mx-4 my-2 flex items-center gap-2 bg-indigo-500/[0.08] border border-indigo-500/20 rounded-lg px-3 py-2">
                      <span className="text-indigo-400 text-xs">⚡</span>
                      <span className="text-[10px] text-indigo-300 font-medium">Próxima cita disponible: <span className="text-white font-bold">Hoy 15:30</span></span>
                      <span className="text-[8px] text-indigo-400/60 ml-auto">3 huecos hoy</span>
                    </div>
                    {/* Booking form */}
                    <div className="p-5 sm:p-6 space-y-4">
                      {/* Barber selector */}
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-2 flex items-center gap-1.5">
                          <svg className="w-3 h-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                          Elige barbero
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { name: "Carlos", specialty: "Degradados", rating: "4.9", reviews: "84", selected: true },
                            { name: "Alex", specialty: "Clásico & Barba", rating: "4.8", reviews: "62", selected: false },
                            { name: "David", specialty: "Diseño", rating: "4.9", reviews: "41", selected: false },
                          ].map((b) => (
                            <div key={b.name} className={`text-center p-2.5 rounded-xl cursor-pointer transition-all duration-300 ${b.selected ? "bg-indigo-500/[0.15] border-2 border-indigo-500/40 shadow-lg shadow-indigo-500/10" : "bg-slate-800/50 border border-slate-700/40 hover:border-indigo-500/20"}`}>
                              <div className={`w-10 h-10 rounded-full mx-auto mb-1.5 flex items-center justify-center text-sm font-bold ring-2 ${b.selected ? "bg-gradient-to-br from-indigo-500 to-violet-500 text-white ring-indigo-400/30" : "bg-slate-700 text-gray-400 ring-transparent"}`}>{b.name[0]}</div>
                              <p className="text-[11px] text-white font-semibold">{b.name}</p>
                              <p className="text-[8px] text-gray-500">{b.specialty}</p>
                              <div className="flex items-center justify-center gap-0.5 mt-1">
                                <svg className="w-2 h-2 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                <span className="text-[7px] text-gray-400">{b.rating} ({b.reviews})</span>
                              </div>
                              {b.selected && <span className="text-[7px] text-emerald-400 mt-0.5 block">● Disponible hoy</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Services */}
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-2 flex items-center gap-1.5">
                          <svg className="w-3 h-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                          Servicio
                        </label>
                        <div className="space-y-1.5">
                          {[
                            { name: "Corte Degradado", price: "15€", duration: "30 min", selected: false, popular: true },
                            { name: "Corte + Barba", price: "22€", duration: "45 min", selected: true, popular: false },
                            { name: "Corte Premium", price: "28€", duration: "40 min", selected: false, popular: false },
                            { name: "Tratamiento Capilar", price: "35€", duration: "50 min", selected: false, popular: false },
                          ].map((s) => (
                            <div key={s.name} className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${s.selected ? "bg-indigo-500/[0.12] border border-indigo-500/30 shadow-md shadow-indigo-500/5" : "bg-slate-800/30 border border-slate-700/30 hover:border-indigo-500/20 hover:bg-slate-800/50"}`}>
                              <div className="flex items-center gap-2.5">
                                <div className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${s.selected ? "border-indigo-400 bg-indigo-400 shadow-sm shadow-indigo-400/50" : "border-gray-600"}`}>
                                  {s.selected && <svg className="w-full h-full text-white p-[1px]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                                </div>
                                <div>
                                  <span className={`text-[12px] block ${s.selected ? "text-white font-semibold" : "text-gray-300"}`}>{s.name}</span>
                                  {s.popular && <span className="text-[7px] text-amber-400">🔥 Más popular</span>}
                                </div>
                              </div>
                              <div className="text-right flex items-center gap-2">
                                <span className={`text-[12px] font-bold ${s.selected ? "text-indigo-300" : "text-white"}`}>{s.price}</span>
                                <span className="text-[9px] text-gray-500 bg-slate-800/60 px-1.5 py-0.5 rounded flex items-center gap-1">
                                  <svg className="w-2 h-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                  {s.duration}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Date & Time */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1 block">Fecha</label>
                          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2.5 text-[12px] text-white flex items-center gap-2 hover:border-indigo-500/30 transition-colors cursor-pointer">
                            <svg className="w-3.5 h-3.5 text-indigo-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            Mar, 18 Feb
                            <svg className="w-3 h-3 text-gray-500 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1 block">Hora</label>
                          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2.5 text-[12px] text-white flex items-center gap-2 hover:border-indigo-500/30 transition-colors cursor-pointer">
                            <svg className="w-3.5 h-3.5 text-indigo-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            10:30
                            <svg className="w-3 h-3 text-gray-500 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                          </div>
                        </div>
                      </div>
                      {/* Loyalty Points */}
                      <div className="bg-gradient-to-r from-indigo-500/[0.08] to-violet-500/[0.06] border border-indigo-500/15 rounded-xl p-3.5">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-amber-400 text-xs">⭐</span>
                            <span className="text-[10px] text-indigo-300 font-semibold">Puntos de fidelidad</span>
                          </div>
                          <span className="text-[11px] text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded-full">340 pts</span>
                        </div>
                        <div className="w-full h-2 bg-slate-700/40 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all" style={{ width: "68%" }} />
                        </div>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="text-[8px] text-gray-500">160 pts más para un corte gratis 🎉</span>
                          <span className="text-[7px] text-indigo-400/60">Nv. Plata</span>
                        </div>
                      </div>
                      {/* CTA button */}
                      <button className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-bold py-3.5 rounded-xl text-sm shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:from-indigo-400 hover:to-violet-400 transition-all duration-300 flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        Reservar cita · 22€
                      </button>
                      {/* WhatsApp confirmation preview */}
                      <div className="bg-[#0b2014] border border-emerald-500/20 rounded-xl p-3 flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" /></svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[9px] text-emerald-400 font-semibold">WhatsApp</span>
                            <span className="text-[7px] text-gray-600">· Confirmación automática</span>
                          </div>
                          <div className="bg-[#0d2e1a] rounded-lg px-2.5 py-2 border border-emerald-500/10">
                            <p className="text-[10px] text-gray-300 leading-relaxed">✅ <span className="text-white font-medium">Cita confirmada</span></p>
                            <p className="text-[9px] text-gray-400 mt-0.5">Urban Cut · Mar 18 Feb · 10:30</p>
                            <p className="text-[9px] text-gray-400">Corte + Barba con Carlos · Ref: #UC-1293</p>
                          </div>
                        </div>
                      </div>
                      {/* Reviews con fuente */}
                      <div className="space-y-2 pt-3 border-t border-white/[0.06]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold">Reseñas verificadas</span>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 bg-white/[0.04] px-2 py-0.5 rounded-full">
                              <svg className="w-2.5 h-2.5 text-[#4285F4]" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                              <span className="text-[8px] text-gray-400 font-semibold">4.9</span>
                            </div>
                          </div>
                        </div>
                        {[
                          { name: "Sergio M.", text: "El mejor degradado que me han hecho. Carlos es un artista. La reserva online es genial.", rating: 5, source: "Google", badge: "Local Guide", time: "hace 3 días" },
                          { name: "Pablo R.", text: "Siempre salgo contento. Ambiente top y nunca esperas.", rating: 5, source: "Google", badge: "Verificado", time: "hace 1 semana" },
                        ].map((r) => (
                          <div key={r.name} className="bg-slate-800/30 border border-slate-700/20 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-[8px] text-white font-bold">{r.name[0]}</div>
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] text-white font-semibold">{r.name}</span>
                                    <span className="text-[7px] text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded-full">{r.badge}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <span className="text-[7px] text-gray-500">vía {r.source}</span>
                                    <span className="text-[7px] text-gray-600">· {r.time}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <svg key={s} className="w-2.5 h-2.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}</div>
                            </div>
                            <p className="text-[10px] text-gray-400 italic leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                          </div>
                        ))}
                      </div>
                      {/* Ubicación */}
                      <div className="bg-white/[0.03] border border-white/[0.04] rounded-xl p-3 overflow-hidden">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <span className="text-[11px] text-white font-medium">C/ Enric Granados 38, Barcelona</span>
                          </div>
                          <span className="text-[8px] text-indigo-400 cursor-pointer hover:text-indigo-300">Cómo llegar →</span>
                        </div>
                        <div className="h-16 bg-[#1a1f2e] rounded-lg relative overflow-hidden border border-white/[0.06]">
                          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #334155 1px, transparent 1px)", backgroundSize: "12px 12px" }} />
                          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 80"><path d="M0 40h40l10-10 20 20 15-15 20 10h95" stroke="#475569" strokeWidth="0.5" fill="none" /><path d="M20 0v80M60 0v80M100 0v80M140 0v80M180 0v80" stroke="#334155" strokeWidth="0.3" /><path d="M0 20h200M0 60h200" stroke="#334155" strokeWidth="0.3" /></svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                              <div className="absolute -inset-3 bg-indigo-500/20 rounded-full animate-ping" />
                              <div className="relative w-6 h-6 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30 border-2 border-white/20">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                              </div>
                            </div>
                          </div>
                          <div className="absolute bottom-1 left-2 flex items-center gap-1">
                            <span className="text-[7px] text-gray-500 bg-black/40 px-1 rounded">Metro: Diagonal · 3 min</span>
                          </div>
                        </div>
                      </div>
                      {/* Footer */}
                      <div className="pt-4 border-t border-white/[0.04] grid grid-cols-3 gap-3">
                        <div>
                          <p className="text-[8px] text-gray-600 uppercase tracking-wider font-semibold mb-1">Horario</p>
                          <p className="text-[9px] text-gray-400">L-V: 10:00-20:00</p>
                          <p className="text-[9px] text-gray-400">S: 10:00-15:00</p>
                          <p className="text-[9px] text-indigo-400/60 mt-0.5">D: Cerrado</p>
                        </div>
                        <div>
                          <p className="text-[8px] text-gray-600 uppercase tracking-wider font-semibold mb-1">Contacto</p>
                          <p className="text-[9px] text-gray-400">+34 633 456 789</p>
                          <p className="text-[9px] text-emerald-400/70 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />WhatsApp
                          </p>
                        </div>
                        <div>
                          <p className="text-[8px] text-gray-600 uppercase tracking-wider font-semibold mb-1">Social</p>
                          <div className="flex gap-1.5">
                            {[
                              { label: "IG", gradient: "from-pink-500 to-purple-500" },
                              { label: "TK", gradient: "from-cyan-400 to-blue-500" },
                              { label: "G", gradient: "from-amber-500 to-red-500" },
                            ].map(s => (
                              <div key={s.label} className={`w-5 h-5 rounded-md bg-gradient-to-br ${s.gradient} flex items-center justify-center text-[7px] text-white font-bold shadow-sm hover:scale-110 transition-transform cursor-pointer`}>{s.label}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* Cookie mini */}
                      <div className="flex items-center justify-between bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs">🍪</span>
                          <span className="text-[8px] text-gray-500">Usamos cookies para mejorar tu experiencia</span>
                        </div>
                        <div className="flex gap-1.5">
                          <span className="text-[7px] text-gray-500 cursor-pointer hover:text-white transition-colors">Configurar</span>
                          <span className="text-[7px] bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded cursor-pointer font-medium">Aceptar</span>
                        </div>
                      </div>
                      <div className="text-center pt-3 border-t border-white/[0.04]">
                        <span className="text-[9px] text-gray-600">Powered by <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent font-semibold">Neuriax</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          REMINDERS TIMELINE
          ════════════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#EFF6FF] to-[#F1F5F9]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-6">
              <span className="text-emerald-400 text-xs font-semibold tracking-[0.2em] uppercase">Comunicación automatizada</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">
                Comunicación multi-canal con IA
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-2">
                El agente se comunica con tus clientes a través de WhatsApp, email y web chat. Cada interacción se registra y analiza.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-3 bg-emerald-500/[0.08] border border-emerald-500/20 rounded-2xl px-6 py-4">
                <span className="text-4xl sm:text-5xl font-extrabold text-emerald-400">97%</span>
                <span className="text-sm text-slate-500 text-left">tasa de resolución<br />automática</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Timeline with iPhone-style chat frames */}
          <div className="relative">
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/40 via-violet-500/30 to-amber-500/30" />

            {[
              {
                icon: "✓", color: "bg-emerald-500", label: "Confirmación automática", time: "Al instante",
                message: "¡Hola María! 🎉 Tu mesa para 4 en Trattoria La Nonna está confirmada:\n📅 Viernes 21 Feb — 20:30\n📍 C/ Gran Vía 45, Madrid\n\nSi necesitas cambiar algo, responde a este mensaje.",
                quickReplies: ["👍 Perfecto", "📝 Modificar"],
                timestamp: "14:23",
              },
              {
                icon: "◆", color: "bg-violet-500", label: "Follow-up programado", time: "Jueves 20:30",
                message: "Hola María 👋 Te recordamos tu reserva mañana viernes a las 20:30 en Trattoria La Nonna.\n\n¿Sigues viniendo?",
                quickReplies: ["✅ Confirmo", "❌ Cancelar", "🔄 Cambiar hora"],
                timestamp: "20:30",
              },
              {
                icon: "◆", color: "bg-indigo-500", label: "Notificación contextual", time: "Viernes 19:30",
                message: "¡María, te esperamos en 1 hora! 🍝\n\n📍 Cómo llegar: maps.google.com/trattoria\n🅿️ Parking: Parking Centro (2 min)\n\n¡Buen provecho!",
                hasMap: true,
                quickReplies: ["🚗 Abrir mapa"],
                timestamp: "19:30",
              },
              {
                icon: "◆", color: "bg-amber-500", label: "Post-interacción · Feedback loop", time: "Sábado 10:00",
                message: "¡Hola María! Esperamos que disfrutaras de tu cena 😊\n\n¿Nos dejas tu opinión? Nos ayuda muchísimo:",
                quickReplies: ["⭐ Dejar reseña", "📅 Reservar otra vez"],
                timestamp: "10:00",
              },
            ].map((step, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="relative flex gap-4 sm:gap-6 mb-10 last:mb-0">
                  <div className={`relative z-10 w-12 h-12 sm:w-16 sm:h-16 ${step.color} rounded-2xl flex items-center justify-center text-lg sm:text-xl flex-shrink-0 shadow-lg`}>
                    {step.icon}
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-3">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">{step.label}</h3>
                      <span className="text-[11px] text-slate-500 font-mono">{step.time}</span>
                    </div>
                    {/* iPhone-style WhatsApp frame */}
                    <div className="max-w-sm">
                      <div className="bg-[#111b21] border border-emerald-900/30 rounded-2xl overflow-hidden shadow-xl">
                        {/* WhatsApp header */}
                        <div className="flex items-center gap-2 px-3 py-2 bg-[#1f2c34] border-b border-white/[0.04]">
                          <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                          <div className="w-7 h-7 bg-emerald-500/20 rounded-full flex items-center justify-center">
                            <span className="text-[9px]">🍝</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[11px] text-white font-medium block">Trattoria La Nonna</span>
                            <span className="text-[8px] text-emerald-400">en línea</span>
                          </div>
                          <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                          <svg className="w-3.5 h-3.5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" /></svg>
                        </div>
                        {/* Chat body */}
                        <div className="p-3 min-h-[100px]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}>
                          {/* Message bubble */}
                          <div className="bg-[#1a2e1a] rounded-xl rounded-tl-sm p-3 max-w-[280px] mb-2 relative">
                            <p className="text-[11px] text-emerald-100/90 leading-relaxed whitespace-pre-line">{step.message}</p>
                            {/* Map preview for location step */}
                            {step.hasMap && (
                              <div className="mt-2 h-14 bg-[#0f1f15] rounded-lg flex items-center justify-center relative overflow-hidden border border-emerald-900/20">
                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#1a4731 1px, transparent 1px), linear-gradient(90deg, #1a4731 1px, transparent 1px)", backgroundSize: "12px 12px" }} />
                                <div className="relative flex items-center gap-1 text-[9px] text-emerald-400">
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                                  Ver ubicación
                                </div>
                              </div>
                            )}
                            <div className="flex items-center justify-end gap-1 mt-1">
                              <span className="text-[8px] text-emerald-700">{step.timestamp}</span>
                              <span className="text-[8px] text-blue-400">✓✓</span>
                            </div>
                          </div>
                          {/* Quick reply buttons */}
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {step.quickReplies.map((reply: string) => (
                              <div key={reply} className="bg-[#1f2c34] border border-emerald-800/30 rounded-full px-3 py-1 text-[10px] text-emerald-400 cursor-pointer hover:bg-emerald-900/20 transition-colors">
                                {reply}
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Input bar */}
                        <div className="flex items-center gap-2 px-3 py-2 bg-[#1f2c34] border-t border-white/[0.04]">
                          <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <div className="flex-1 bg-[#2a3942] rounded-full px-3 py-1">
                            <span className="text-[10px] text-gray-500">Escribe un mensaje</span>
                          </div>
                          <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          BEFORE vs AFTER
          ════════════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-[#F1F5F9]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-rose-400 text-xs font-semibold tracking-[0.2em] uppercase">Comparativa</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">
                Operaciones manuales vs. Operaciones con IA
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <ScrollReveal>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 sm:p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-red-600">Operación manual</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    { icon: "○", text: "Atención limitada a horario comercial — clientes perdidos fuera de horas" },
                    { icon: "○", text: "Respuestas manuales e inconsistentes entre canales" },
                    { icon: "○", text: "Datos dispersos sin análisis ni trazabilidad" },
                    { icon: "○", text: "Escalabilidad limitada por recursos humanos" },
                    { icon: "○", text: "Costes crecientes con cada nuevo canal de comunicación" },
                    { icon: "○", text: "Sin métricas de satisfacción ni feedback automatizado" },
                  ].map((item) => (
                    <li key={item.text} className="flex items-start gap-3">
                      <span className="text-base flex-shrink-0">{item.icon}</span>
                      <span className="text-sm text-slate-500 leading-relaxed">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-emerald-600">Con Neuriax</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    { icon: "◆", text: "Cobertura 24/7 sin intervención humana en todos los canales" },
                    { icon: "◆", text: "Respuestas personalizadas con NLP avanzado en <2 segundos" },
                    { icon: "◆", text: "Analytics en tiempo real con insights accionables" },
                    { icon: "◆", text: "Escalabilidad ilimitada sin incremento de costes operativos" },
                    { icon: "◆", text: "Un único sistema multi-canal: WhatsApp, voz, web chat" },
                    { icon: "◆", text: "Feedback loop automático con medición de satisfacción" },
                  ].map((item) => (
                    <li key={item.text} className="flex items-start gap-3">
                      <span className="text-base flex-shrink-0">{item.icon}</span>
                      <span className="text-sm text-slate-600 leading-relaxed">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTORS
          ════════════════════════════════════════════════ */}
      <section id="sectores" className="py-24 px-4 bg-gradient-to-b from-[#F1F5F9] to-[#EFF6FF]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase">Casos de uso</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">
                Soluciones por sector
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <ScrollReveal>
              <div className="group bg-gradient-to-br from-amber-50 to-white border border-amber-200/60 rounded-2xl p-6 sm:p-8 hover:border-amber-300 transition-all duration-500 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-2xl">�</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Hostelería & Restauración</h3>
                    <p className="text-xs text-slate-500">Gestión integral de reservas y atención</p>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {[
                    "Agente IA que gestiona reservas por WhatsApp, voz y web",
                    "Landing personalizada con carta, horarios y reserva online",
                    "Follow-up automático y recogida de feedback post-visita",
                    "Integración con Google Reviews, Maps y plataformas de reserva",
                    "Panel de control con analytics de ocupación y satisfacción",
                    "Multi-idioma para establecimientos turísticos",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-500">
                      <svg className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] text-slate-400 italic">Ideal para: restaurantes, bares, hoteles, cafeterías, catering, gastrobares</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="group bg-gradient-to-br from-indigo-50 to-white border border-indigo-200/60 rounded-2xl p-6 sm:p-8 hover:border-indigo-300 transition-all duration-500 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-2xl">✂️</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Servicios & Bienestar</h3>
                    <p className="text-xs text-slate-500">Automatización de citas y fidelización</p>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {[
                    "Agente IA que gestiona citas por profesional/especialista",
                    "Landing con catálogo de servicios, galería y booking",
                    "Programa de fidelización y puntos integrado",
                    "Recordatorios inteligentes y reprogramación automática",
                    "Analytics por profesional: agenda, retención, ingresos",
                    "Gestión de reseñas y reputación online",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-500">
                      <svg className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] text-slate-400 italic">Ideal para: barberías, peluquerías, centros de estética, clínicas, spas, consultas</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          INTEGRATIONS MARQUEE
          ════════════════════════════════════════════════ */}
      <section className="py-14 bg-white border-t border-b border-slate-200 overflow-hidden">
        <p className="text-center text-xs text-slate-400 uppercase tracking-[0.2em] mb-8">
          Integramos con las herramientas que ya usas
        </p>
        <div className="marquee-container">
          <div className="marquee-track">
            {[...INTEGRATIONS, ...INTEGRATIONS].map((tool, i) => (
              <span key={`${tool}-${i}`} className="inline-flex items-center gap-2 px-6 py-2 text-sm text-slate-500 font-medium whitespace-nowrap hover:text-slate-900 transition-colors">
                <span className="w-1.5 h-1.5 bg-violet-500/40 rounded-full" />
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          PROCESS — 4 steps
          ════════════════════════════════════════════════ */}
      <section id="proceso" className="py-24 px-4 bg-[#F1F5F9]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <span className="text-violet-400 text-xs font-semibold tracking-[0.2em] uppercase">Implementación</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3 mb-4">Proceso de implementación</h2>
              <p className="text-lg text-slate-500">Del análisis al despliegue en 5 días laborables.</p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-violet-500/30 via-indigo-500/30 to-amber-500/30" />

            {[
              { num: "01", title: "Discovery", desc: "Análisis de tu operación, flujos de atención actuales y puntos de fricción. Definición de requisitos y arquitectura del agente.", gradient: "from-violet-500 to-violet-600" },
              { num: "02", title: "Configuración", desc: "Personalización del agente IA, integraciones con tus sistemas, diseño de la landing page y flujos conversacionales.", gradient: "from-indigo-500 to-indigo-600" },
              { num: "03", title: "Despliegue", desc: "Puesta en producción con testing end-to-end, validación de todos los canales y formación del equipo.", gradient: "from-blue-500 to-blue-600" },
              { num: "04", title: "Optimización", desc: "Mejora continua basada en datos, ajuste de respuestas del agente y reporting mensual de rendimiento.", gradient: "from-amber-500 to-orange-500" },
            ].map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 100}>
                <div className="text-center relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 text-lg font-bold shadow-lg relative z-10 rotate-3 hover:rotate-0 transition-transform duration-300 ${step.num === "04" ? "text-black" : "text-white"}`}>
                    {step.num}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-16">
              <a href="#contacto" className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold py-4 px-8 rounded-full text-base transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-amber-500/20">
                Solicitar implementación
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          VOICE AGENTS — Premium add-on
          ════════════════════════════════════════════════ */}
      <section id="agentes" className="py-24 px-4 bg-gradient-to-b from-[#F1F5F9] via-[#EDE9FE] to-[#F1F5F9]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-cyan-500/[0.08] border border-cyan-500/20 rounded-full px-4 py-2 mb-5">
                <span className="text-[13px] text-cyan-300 font-semibold">Canal de voz integrado</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">
                Agente de voz con IA
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Canal telefónico con procesamiento de lenguaje natural en tiempo real.
                Voz sintética indistinguible, conectada al sistema central del agente.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <ScrollReveal>
              <div>
                <ul className="space-y-5 mb-8">
                  {[
                    { title: "Atención telefónica 24/7", desc: "Un cliente llama fuera de horario. El agente procesa la consulta, accede al sistema y resuelve la petición en tiempo real.", color: "text-cyan-400" },
                    { title: "Voz natural con NLP avanzado", desc: "Síntesis de voz indistinguible de un operador humano. Procesamiento contextual y respuestas adaptadas al historial del cliente.", color: "text-violet-400" },
                    { title: "Integrado con el sistema central", desc: "Todas las interacciones del agente de voz se sincronizan con el panel de control, analytics y los demás canales en tiempo real.", color: "text-amber-400" },
                  ].map((item) => (
                    <li key={item.title} className="flex gap-4">
                      <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className={`w-5 h-5 ${item.color}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900 mb-1">{item.title}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <a href="#contacto" className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-full text-sm transition-all duration-300">
                  Explorar canal de voz
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </div>
            </ScrollReveal>

            {/* Agent Mockup — Enterprise */}
            <ScrollReveal delay={150}>
              <div className="relative">
                <div className="absolute -inset-4 bg-cyan-500/[0.04] rounded-3xl blur-2xl" />
                <div className="relative bg-[#0d1117] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
                  {/* Chrome bar */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="ml-3 text-[11px] text-gray-500 font-mono bg-slate-800/50 px-3 py-0.5 rounded-md">panel.neuriax.com/agente-voz</span>
                  </div>
                  
                  <div className="flex">
                    {/* Main chat area */}
                    <div className="flex-1 min-w-0">
                      {/* Status bar */}
                      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-cyan-500/[0.03]">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5">
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                            </span>
                            <span className="text-[10px] text-emerald-400 font-medium">Llamada en curso</span>
                          </div>
                          <span className="text-[10px] text-gray-600 font-mono">00:42</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded font-medium">IA activa</span>
                          <div className="w-5 h-5 rounded bg-red-500/20 flex items-center justify-center cursor-pointer">
                            <svg className="w-2.5 h-2.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          </div>
                        </div>
                      </div>

                      {/* Audio waveform visualization */}
                      <div className="px-4 py-3 border-b border-white/[0.04]">
                        <div className="flex items-center gap-1 h-6 justify-center">
                          {[3, 5, 8, 12, 6, 14, 10, 7, 11, 15, 9, 4, 13, 8, 6, 11, 14, 5, 9, 12, 7, 10, 4, 8, 6].map((h, i) => (
                            <div key={i} className="w-0.5 bg-cyan-500/50 rounded-full animate-pulse" style={{ height: `${h * 1.5}px`, animationDelay: `${i * 80}ms`, animationDuration: '1.2s' }} />
                          ))}
                        </div>
                        <div className="flex items-center justify-center gap-4 mt-1">
                          <span className="text-[8px] text-gray-600">Escuchando</span>
                          <span className="text-[8px] text-cyan-500/60">⬤ Grabando</span>
                        </div>
                      </div>

                      {/* Chat messages with timestamps */}
                      <div className="p-4 space-y-3 max-h-[250px] overflow-y-auto scrollbar-thin">
                        {[
                          { role: "user", text: "Hola buenas, quería reservar mesa para el viernes para 4 personas.", ts: "00:03" },
                          { role: "agent", text: "¡Buenas tardes! Encantado de ayudarte. Para 4 personas el viernes, ¿tienes preferencia de horario? Tenemos disponibilidad a las 14:00, 21:00 y 21:30.", ts: "00:08" },
                          { role: "user", text: "A las 21:00 perfecto.", ts: "00:18" },
                          { role: "agent", text: "Genial, mesa para 4 el viernes a las 21:00. ¿A nombre de quién la reservo?", ts: "00:22" },
                          { role: "user", text: "A nombre de Roberto Díaz.", ts: "00:28" },
                          { role: "agent", text: "Perfecto Roberto. Reserva confirmada: viernes a las 21:00, mesa para 4. Te envío confirmación por WhatsApp ahora mismo. ¡Le esperamos!", ts: "00:35" },
                        ].map((msg, i) => (
                          <div key={i} className={`flex gap-2.5 ${msg.role === "agent" ? "justify-end" : ""}`}>
                            {msg.role === "user" && (
                              <div className="w-7 h-7 rounded-full bg-slate-700/60 flex items-center justify-center flex-shrink-0 text-[9px] font-bold text-gray-400">RD</div>
                            )}
                            <div className="max-w-[220px]">
                              <div className={`rounded-xl px-3 py-2 ${msg.role === "agent" ? "bg-cyan-500/[0.1] border border-cyan-500/20 rounded-tr-sm" : "bg-slate-800/80 rounded-tl-sm"}`}>
                                <p className={`text-[11px] leading-relaxed ${msg.role === "agent" ? "text-cyan-50" : "text-gray-300"}`}>{msg.text}</p>
                              </div>
                              <span className="text-[7px] text-gray-600 mt-0.5 block px-1">{msg.ts}</span>
                            </div>
                            {msg.role === "agent" && (
                              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500/30 to-violet-500/20 flex items-center justify-center flex-shrink-0">
                                <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Footer status */}
                      <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/[0.06] bg-white/[0.01]">
                        <div className="flex items-center gap-3">
                          <span className="text-[9px] text-emerald-400 font-medium flex items-center gap-1">
                            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            Reserva creada
                          </span>
                          <span className="text-[9px] text-violet-400 font-medium flex items-center gap-1">
                            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            WhatsApp enviado
                          </span>
                        </div>
                        <span className="text-[9px] text-gray-600">Duración: 0:42</span>
                      </div>
                    </div>

                    {/* Side panel — client data */}
                    <div className="hidden md:block w-44 border-l border-white/[0.06] bg-[#0b0f14] p-3">
                      <div className="mb-4">
                        <span className="text-[8px] text-gray-600 uppercase tracking-wider">Datos del cliente</span>
                        <div className="mt-2 space-y-2">
                          <div>
                            <span className="text-[8px] text-gray-500 block">Nombre</span>
                            <span className="text-[11px] text-white font-medium">Roberto Díaz</span>
                          </div>
                          <div>
                            <span className="text-[8px] text-gray-500 block">Teléfono</span>
                            <span className="text-[11px] text-gray-400">+34 *** *** 89</span>
                          </div>
                          <div>
                            <span className="text-[8px] text-gray-500 block">Visitas</span>
                            <span className="text-[11px] text-violet-400 font-medium">Primera vez</span>
                          </div>
                        </div>
                      </div>
                      <div className="mb-4 pt-3 border-t border-white/[0.06]">
                        <span className="text-[8px] text-gray-600 uppercase tracking-wider">Reserva</span>
                        <div className="mt-2 space-y-1.5">
                          <div className="flex items-center gap-1.5">
                            <svg className="w-2.5 h-2.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            <span className="text-[10px] text-gray-300">Vie 21 Feb</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <svg className="w-2.5 h-2.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="text-[10px] text-gray-300">21:00</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <svg className="w-2.5 h-2.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <span className="text-[10px] text-gray-300">4 personas</span>
                          </div>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-white/[0.06]">
                        <span className="text-[8px] text-gray-600 uppercase tracking-wider">Sentimiento</span>
                        <div className="mt-2 flex items-center gap-1.5">
                          <div className="flex-1 h-1.5 bg-slate-700/40 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500/60 rounded-full" style={{ width: "92%" }} />
                          </div>
                          <span className="text-[9px] text-emerald-400 font-medium">92%</span>
                        </div>
                        <span className="text-[8px] text-gray-600 mt-1 block">Positivo · Satisfecho</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          RESULTS — Big numbers
          ════════════════════════════════════════════════ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
              {[
                { value: "<2s", label: "tiempo medio de respuesta", color: "text-emerald-400", bg: "from-emerald-500/[0.06] to-transparent" },
                { value: "97%", label: "resolución automática", color: "text-violet-400", bg: "from-violet-500/[0.06] to-transparent" },
                { value: "99.9%", label: "disponibilidad del servicio", color: "text-indigo-400", bg: "from-indigo-500/[0.06] to-transparent" },
                { value: "4.9/5", label: "satisfacción usuarios finales", color: "text-amber-400", bg: "from-amber-500/[0.06] to-transparent" },
              ].map((r) => (
                <div key={r.label} className={`bg-gradient-to-b ${r.bg} border border-slate-200 rounded-2xl p-6 text-center`}>
                  <div className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${r.color} mb-2`}>{r.value}</div>
                  <div className="text-xs text-slate-500">{r.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          GUARANTEES
          ════════════════════════════════════════════════ */}
      <section className="py-16 px-4 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "SLA garantizado", desc: "Disponibilidad 99.9%", bgClass: "bg-emerald-500/10", iconClass: "text-emerald-400" },
              { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", title: "Despliegue en 5 días", desc: "Implementación rápida", bgClass: "bg-violet-500/10", iconClass: "text-violet-400" },
              { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", title: "Soporte dedicado", desc: "Equipo técnico asignado", bgClass: "bg-indigo-500/10", iconClass: "text-indigo-400" },
              { icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", title: "Sin lock-in", desc: "Portabilidad total de datos", bgClass: "bg-amber-500/10", iconClass: "text-amber-400" },
            ].map((item) => (
              <ScrollReveal key={item.title}>
                <div>
                  <div className={`w-12 h-12 ${item.bgClass} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <svg className={`w-6 h-6 ${item.iconClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          FAQ
          ════════════════════════════════════════════════ */}
      <section id="faq" className="py-24 px-4 bg-[#F1F5F9]">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Preguntas frecuentes</h2>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-3">
              {[
                { q: "¿Cuál es el modelo de pricing?", a: "Ofrecemos planes adaptados al volumen de interacciones y canales requeridos. En la demostración técnica definimos el alcance y proporcionamos un presupuesto cerrado. Sin costes ocultos." },
                { q: "¿Para qué sectores funciona la plataforma?", a: "Cualquier negocio que requiera atención al cliente: hostelería, servicios profesionales, salud, retail, consultorías. El agente se personaliza para cada vertical con flujos conversacionales adaptados." },
                { q: "¿Qué experiencia tienen los usuarios finales?", a: "Los clientes interactuían de forma natural por WhatsApp, teléfono o web chat. El agente responde en <2 segundos con lenguaje natural. La experiencia es indistinguible de un operador humano." },
                { q: "¿Cómo se entrena al agente?", a: "Durante la fase de Discovery analizamos tus flujos de atención y configuramos el agente con tu información: servicios, políticas, horarios, FAQ. El sistema mejora automáticamente con cada interacción." },
                { q: "¿Qué integraciones soporta la plataforma?", a: "Más de 25 integraciones nativas: WhatsApp Business, Google Calendar, Stripe, CRMs, Make, Zapier, n8n, APIs REST y webhooks. Si necesitas una integración específica, la desarrollamos." },
                { q: "¿Cuánto tarda la implementación?", a: "5 días laborables desde el kickoff. Incluye análisis, configuración del agente, diseño de la landing, integraciones, testing y formación del equipo." },
                { q: "¿Cumplís con RGPD?", a: "Sí. Todos los datos se procesan en la UE, con cifrado end-to-end, políticas de retención configurables y cumplimiento total con RGPD. Proporcionamos DPA si es necesario." },
              ].map((faq, i) => (
                <details key={i} className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-violet-500/20 transition-colors">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                    <span className="text-slate-900 font-medium text-[15px] pr-4">{faq.q}</span>
                    <svg className="w-4 h-4 text-slate-400 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-slate-500 leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          CONTACT / CTA FINAL
          ════════════════════════════════════════════════ */}
      <section id="contacto" className="py-24 px-4 bg-gradient-to-b from-[#F1F5F9] via-[#EFF6FF] to-[#EFF6FF]">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal>
              <div>
                <div className="inline-flex items-center gap-2 bg-amber-500/[0.08] border border-amber-500/20 rounded-full px-4 py-2 mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
                  </span>
                  <span className="text-amber-300 text-xs font-medium">
                    Implementación disponible
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-5">
                  Empieza a operar<br />con IA
                </h2>
                <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                  Solicita una demostración personalizada.{" "}
                  <span className="text-slate-900 font-medium">Nuestro equipo técnico analizará tu caso</span> y propondrá una solución a medida.
                </p>

                <ul className="space-y-4 mb-8">
                  {["Análisis técnico de tu operación actual", "Propuesta de arquitectura personalizada", "Presupuesto cerrado sin costes ocultos"].map((b) => (
                    <li key={b} className="flex items-center gap-3 text-slate-600 text-sm">
                      <div className="w-6 h-6 bg-violet-500/10 rounded-md flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-violet-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-500">
                  <a href="tel:+34640791041" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                    +34 640 791 041
                  </a>
                  <a href="mailto:hola@neuriax.com" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                    hola@neuriax.com
                  </a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
