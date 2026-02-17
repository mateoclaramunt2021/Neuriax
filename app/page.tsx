import { Metadata } from "next";
import ContactForm from "../components/ContactForm";
import ScrollReveal from "../components/ScrollReveal";

export const metadata: Metadata = {
  title: "Neuriax | Sistema de Reservas Inteligente para Restaurantes y Barberías",
  description:
    "Panel de reservas + web personalizada + recordatorios automáticos por WhatsApp. Elimina no-shows, llena tu agenda 24/7. Garantía 30 días.",
  keywords:
    "sistema reservas restaurante, reservas barbería, panel reservas online, recordatorios WhatsApp, gestión reservas, agenda digital negocio",
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
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">

      {/* ════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center px-4 overflow-hidden">
        {/* BG */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0f0a1a] to-[#0a0a0f]" />
        <div className="absolute inset-0 grid-pattern opacity-[0.08]" />
        <div className="absolute top-[5%] left-[10%] w-[700px] h-[700px] bg-violet-600/[0.07] rounded-full blur-[200px] animate-pulse-slow" />
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-indigo-500/[0.06] rounded-full blur-[180px] animate-pulse-slow" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-600/[0.03] rounded-full blur-[250px]" />

        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center py-20 sm:py-28 lg:py-32">
          {/* CENTERED HERO CONTENT */}
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 bg-violet-500/[0.08] border border-violet-500/[0.15] rounded-full px-5 py-2.5 mb-10 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
              </span>
              <span className="text-[13px] text-gray-300 font-medium tracking-wide">
                +2.400 reservas gestionadas este mes
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold leading-[1.05] tracking-[-0.03em] mb-7">
              <span className="block text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.06)]">Reservas automáticas.</span>
              <span className="block text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.06)]">Clientes que vuelven.</span>
              <span className="relative inline-block mt-1">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-violet-400 animate-gradient-x drop-shadow-[0_0_60px_rgba(124,58,237,0.3)]">
                  Cero no-shows.
                </span>
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-[3px] bg-gradient-to-r from-transparent via-violet-500/60 to-transparent rounded-full" />
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-[1.35rem] text-gray-400 leading-relaxed mb-10 max-w-2xl mx-auto">
              El sistema todo-en-uno que gestiona las reservas de tu{" "}
              <span className="text-white font-semibold">restaurante o barbería</span>:
              panel inteligente, web de reservas con tu marca y recordatorios automáticos por WhatsApp.
            </p>

            {/* Metrics */}
            <div className="flex flex-wrap justify-center gap-10 sm:gap-14 mb-12">
              {[
                { value: "−95%", label: "no-shows", color: "text-emerald-400" },
                { value: "+60%", label: "reservas online", color: "text-violet-400" },
                { value: "24/7", label: "reservas activas", color: "text-amber-400" },
              ].map((m) => (
                <div key={m.label}>
                  <div className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${m.color}`}>{m.value}</div>
                  <div className="text-xs text-gray-500 mt-1.5 tracking-wide">{m.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <a
                href="#contacto"
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold py-4 px-10 rounded-full text-base sm:text-lg transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl hover:shadow-amber-500/25 shadow-lg shadow-amber-500/10"
              >
                Solicitar demo gratis
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#dashboard"
                className="inline-flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white font-semibold py-4 px-8 rounded-full text-base transition-all duration-300"
              >
                <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Ver ejemplos reales
              </a>
            </div>

            {/* Trust */}
            <div className="flex flex-wrap justify-center gap-6 text-[13px] text-gray-500">
              {["Sin permanencia", "Listo en 5 días", "Garantía 30 días"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* DASHBOARD PREVIEW — below hero text */}
          <div className="w-full max-w-3xl mx-auto mt-16 lg:mt-20">
            <div className="relative">
              <div className="absolute -inset-6 bg-violet-500/[0.05] rounded-3xl blur-3xl" />
              <div className="relative bg-[#0d1117] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
                {/* Chrome */}
                <div className="flex items-center gap-2 px-4 sm:px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-3 text-[11px] text-gray-500 font-mono">panel.neuriax.com — Reservas hoy</span>
                </div>
                {/* Content */}
                <div className="p-4 sm:p-5">
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                    {[
                      { label: "Hoy", value: "14", sub: "reservas", color: "text-violet-400" },
                      { label: "Ocupación", value: "87%", sub: "mesas", color: "text-emerald-400" },
                      { label: "No-shows", value: "0", sub: "este mes", color: "text-amber-400" },
                    ].map((s) => (
                      <div key={s.label} className="bg-slate-800/40 border border-slate-700/30 rounded-lg p-2.5 sm:p-3 text-center">
                        <div className={`text-lg sm:text-xl font-bold ${s.color}`}>{s.value}</div>
                        <div className="text-[9px] sm:text-[10px] text-gray-500">{s.sub}</div>
                      </div>
                    ))}
                  </div>
                  {/* Reservation list */}
                  <div className="space-y-1.5 max-h-[200px] lg:max-h-[280px] overflow-y-auto pr-1 scrollbar-thin">
                    {RESTAURANT_RESERVATIONS.slice(0, 6).map((r, i) => (
                      <div key={i} className="flex items-center justify-between bg-slate-800/30 border border-slate-700/20 rounded-lg px-3 py-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-[11px] text-gray-500 font-mono w-10 flex-shrink-0">{r.time}</span>
                          <span className="text-[12px] text-white font-medium truncate">{r.name}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[10px] text-gray-500">{r.guests}p · {r.table}</span>
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${r.status === "confirmed" ? "bg-emerald-400" : "bg-amber-400"}`} />
                        </div>
                      </div>
                    ))}
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
          SOCIAL PROOF BAR
          ════════════════════════════════════════════════ */}
      <section className="py-10 px-4 bg-[#0a0a0f] border-t border-b border-white/[0.04]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { value: "50+", label: "negocios activos" },
              { value: "2.400+", label: "reservas/mes" },
              { value: "4.9★", label: "satisfacción" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">{s.value}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          DASHBOARD EXAMPLE
          ════════════════════════════════════════════════ */}
      <section id="dashboard" className="py-24 px-4 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d15] to-[#0d0d15]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-violet-400 text-xs font-semibold tracking-[0.2em] uppercase">Panel de control</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
                Un panel que lo controla todo
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Desde las reservas de hoy hasta el historial de cada cliente. Todo en una pantalla.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative">
              <div className="absolute -inset-8 bg-violet-500/[0.04] rounded-3xl blur-3xl" />
              <div className="relative bg-[#0d1117] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-4 text-[11px] text-gray-500 font-mono bg-slate-800/50 px-4 py-1 rounded-md">panel.neuriax.com/reservas</span>
                </div>

                <div className="flex">
                  {/* Sidebar - hidden on mobile */}
                  <div className="hidden md:flex flex-col w-48 lg:w-56 border-r border-white/[0.06] bg-[#0b0f14] p-4 min-h-[450px]">
                    <div className="flex items-center gap-2 mb-8">
                      <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg flex items-center justify-center text-[10px] font-bold">N</div>
                      <span className="text-sm font-bold text-white">Neuriax</span>
                    </div>
                    {[
                      { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Inicio", active: false },
                      { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", label: "Reservas", active: true },
                      { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", label: "Clientes", active: false },
                      { icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z", label: "Mensajes", active: false },
                      { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", label: "Estadísticas", active: false },
                    ].map((item) => (
                      <div key={item.label} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm cursor-pointer transition-colors ${item.active ? "bg-violet-500/[0.12] text-violet-300 font-medium" : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]"}`}>
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                        </svg>
                        {item.label}
                      </div>
                    ))}
                  </div>

                  {/* Main content */}
                  <div className="flex-1 p-4 sm:p-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white">Reservas — Hoy, Lunes 17 Feb</h3>
                        <p className="text-[11px] text-gray-500">Trattoria La Nonna · 8 mesas disponibles</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] bg-emerald-500/[0.12] text-emerald-400 px-3 py-1 rounded-full font-medium">14 reservas hoy</span>
                        <span className="text-[11px] bg-violet-500/[0.12] text-violet-400 px-3 py-1 rounded-full font-medium">87% ocupación</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                      {[
                        { label: "Confirmadas", value: "11", color: "text-emerald-400", bg: "bg-emerald-500/[0.08]" },
                        { label: "Pendientes", value: "3", color: "text-amber-400", bg: "bg-amber-500/[0.08]" },
                        { label: "Comensales", value: "42", color: "text-violet-400", bg: "bg-violet-500/[0.08]" },
                        { label: "No-shows", value: "0", color: "text-gray-400", bg: "bg-white/[0.03]" },
                      ].map((s) => (
                        <div key={s.label} className={`${s.bg} border border-white/[0.04] rounded-xl p-3 text-center`}>
                          <div className={`text-xl sm:text-2xl font-bold ${s.color}`}>{s.value}</div>
                          <div className="text-[10px] text-gray-500 mt-0.5">{s.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-white/[0.06]">
                            <th className="text-[10px] text-gray-500 font-medium uppercase tracking-wider pb-2 pr-4">Hora</th>
                            <th className="text-[10px] text-gray-500 font-medium uppercase tracking-wider pb-2 pr-4">Cliente</th>
                            <th className="text-[10px] text-gray-500 font-medium uppercase tracking-wider pb-2 pr-4 hidden sm:table-cell">Personas</th>
                            <th className="text-[10px] text-gray-500 font-medium uppercase tracking-wider pb-2 pr-4 hidden sm:table-cell">Mesa</th>
                            <th className="text-[10px] text-gray-500 font-medium uppercase tracking-wider pb-2">Estado</th>
                          </tr>
                        </thead>
                        <tbody>
                          {RESTAURANT_RESERVATIONS.map((r, i) => (
                            <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                              <td className="py-2.5 pr-4 text-[12px] text-gray-400 font-mono">{r.time}</td>
                              <td className="py-2.5 pr-4 text-[12px] text-white font-medium">{r.name}</td>
                              <td className="py-2.5 pr-4 text-[12px] text-gray-400 hidden sm:table-cell">{r.guests} pers.</td>
                              <td className="py-2.5 pr-4 text-[12px] text-gray-400 hidden sm:table-cell">{r.table}</td>
                              <td className="py-2.5">
                                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${r.status === "confirmed" ? "bg-emerald-500/[0.12] text-emerald-400" : "bg-amber-500/[0.12] text-amber-400"}`}>
                                  {r.status === "confirmed" ? "✓ Confirmada" : "⏳ Pendiente"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
      <section id="ejemplos" className="py-24 px-4 bg-[#0d0d15]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-indigo-400 text-xs font-semibold tracking-[0.2em] uppercase">Tu web de reservas</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
                Tu propia web de reservas. Con tu marca.
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Tus clientes entran, eligen día y hora, y reservan en 30 segundos. Sin llamar. Sin esperar.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Landing 1 — Restaurant */}
            <ScrollReveal>
              <div className="relative">
                <div className="absolute -inset-3 bg-amber-500/[0.04] rounded-3xl blur-2xl" />
                <div className="relative bg-[#0d1117] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="ml-3 text-[10px] text-gray-500 font-mono">reservas.trattorialanonna.es</span>
                  </div>
                  {/* Scrollable landing */}
                  <div className="max-h-[420px] overflow-y-auto scrollbar-thin">
                    {/* Restaurant hero */}
                    <div className="relative bg-gradient-to-br from-amber-900/40 via-orange-900/30 to-stone-900 p-6 sm:p-8">
                      <div className="text-center">
                        <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 mb-4">
                          <span className="text-amber-400 text-lg">🍝</span>
                          <span className="text-xs text-white font-semibold">Trattoria La Nonna</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Reserva tu mesa</h3>
                        <p className="text-sm text-gray-300">Cocina italiana auténtica en el corazón de Madrid</p>
                        <div className="flex items-center justify-center gap-1 mt-2">
                          {[1,2,3,4,5].map((s) => (
                            <svg key={s} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-[11px] text-gray-400 ml-1">4.8 (324 reseñas)</span>
                        </div>
                      </div>
                    </div>
                    {/* Booking form */}
                    <div className="p-5 sm:p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block">Personas</label>
                          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2.5 text-[12px] text-white flex items-center justify-between">
                            <span>4 personas</span>
                            <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block">Fecha</label>
                          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2.5 text-[12px] text-white flex items-center justify-between">
                            <span>Vie, 21 Feb</span>
                            <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block">Hora disponible</label>
                        <div className="grid grid-cols-4 gap-2">
                          {["13:00", "13:30", "14:00", "14:30", "20:30", "21:00", "21:30", "22:00"].map((h, i) => (
                            <div key={h} className={`text-center text-[11px] py-2 rounded-lg cursor-pointer transition-colors ${i === 4 ? "bg-amber-500 text-black font-bold" : "bg-slate-800/50 border border-slate-700/40 text-gray-300 hover:border-amber-500/40"}`}>
                              {h}
                            </div>
                          ))}
                        </div>
                      </div>
                      <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold py-3 rounded-xl text-sm hover:shadow-lg hover:shadow-amber-500/20 transition-all">
                        Reservar mesa →
                      </button>
                      {/* Reviews */}
                      <div className="pt-4 border-t border-white/[0.06] space-y-3">
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">Últimas reseñas</p>
                        {[
                          { name: "Carmen R.", text: "Increíble pasta casera. El mejor italiano de la zona. Reservé online y fue super fácil.", stars: 5 },
                          { name: "Miguel A.", text: "Ambiente acogedor y servicio impecable. Ya hemos vuelto 3 veces.", stars: 5 },
                        ].map((rev) => (
                          <div key={rev.name} className="bg-slate-800/30 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-5 h-5 bg-amber-500/20 rounded-full flex items-center justify-center text-[8px]">👤</div>
                              <span className="text-[11px] text-white font-medium">{rev.name}</span>
                              <div className="flex gap-0.5">
                                {Array.from({length: rev.stars}).map((_, i) => (
                                  <svg key={i} className="w-2.5 h-2.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                ))}
                              </div>
                            </div>
                            <p className="text-[11px] text-gray-400 leading-relaxed">{rev.text}</p>
                          </div>
                        ))}
                      </div>
                      {/* Powered by */}
                      <div className="text-center pt-3 border-t border-white/[0.04]">
                        <span className="text-[9px] text-gray-600">Powered by <span className="text-violet-400 font-semibold">Neuriax</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Landing 2 — Barbershop */}
            <ScrollReveal delay={150}>
              <div className="relative">
                <div className="absolute -inset-3 bg-indigo-500/[0.04] rounded-3xl blur-2xl" />
                <div className="relative bg-[#0d1117] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="ml-3 text-[10px] text-gray-500 font-mono">reservas.urbancutbarberia.es</span>
                  </div>
                  <div className="max-h-[420px] overflow-y-auto scrollbar-thin">
                    {/* Barber hero */}
                    <div className="relative bg-gradient-to-br from-slate-800 via-zinc-900 to-slate-900 p-6 sm:p-8">
                      <div className="text-center">
                        <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 mb-4">
                          <span className="text-indigo-400 text-lg">💈</span>
                          <span className="text-xs text-white font-semibold">Urban Cut Barbería</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Reserva tu cita</h3>
                        <p className="text-sm text-gray-300">Estilo y precisión en cada corte</p>
                        <div className="flex items-center justify-center gap-1 mt-2">
                          {[1,2,3,4,5].map((s) => (
                            <svg key={s} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-[11px] text-gray-400 ml-1">4.9 (187 reseñas)</span>
                        </div>
                      </div>
                    </div>
                    {/* Booking form */}
                    <div className="p-5 sm:p-6 space-y-4">
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1.5 block">Elige barbero</label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { name: "Carlos", specialty: "Degradados", selected: true },
                            { name: "Alex", specialty: "Clásico & Barba", selected: false },
                          ].map((b) => (
                            <div key={b.name} className={`text-center p-3 rounded-xl cursor-pointer transition-all ${b.selected ? "bg-indigo-500/[0.15] border-2 border-indigo-500/40" : "bg-slate-800/50 border border-slate-700/40"}`}>
                              <div className="w-10 h-10 bg-slate-700 rounded-full mx-auto mb-1.5 flex items-center justify-center text-sm">✂️</div>
                              <p className="text-[12px] text-white font-semibold">{b.name}</p>
                              <p className="text-[9px] text-gray-500">{b.specialty}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1.5 block">Servicio</label>
                        <div className="space-y-2">
                          {[
                            { name: "Corte Degradado", price: "15€", duration: "30 min", selected: false },
                            { name: "Corte + Barba", price: "22€", duration: "45 min", selected: true },
                            { name: "Corte Premium", price: "28€", duration: "40 min", selected: false },
                            { name: "Tratamiento Capilar", price: "35€", duration: "50 min", selected: false },
                          ].map((s) => (
                            <div key={s.name} className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all ${s.selected ? "bg-indigo-500/[0.12] border border-indigo-500/30" : "bg-slate-800/30 border border-slate-700/30 hover:border-indigo-500/20"}`}>
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full border-2 ${s.selected ? "border-indigo-400 bg-indigo-400" : "border-gray-600"}`} />
                                <span className="text-[12px] text-white">{s.name}</span>
                              </div>
                              <div className="text-right">
                                <span className="text-[12px] text-white font-semibold">{s.price}</span>
                                <span className="text-[10px] text-gray-500 ml-2">{s.duration}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block">Fecha</label>
                          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2.5 text-[12px] text-white">Mar, 18 Feb</div>
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block">Hora</label>
                          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2.5 text-[12px] text-white">10:30</div>
                        </div>
                      </div>
                      <button className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-bold py-3 rounded-xl text-sm hover:shadow-lg hover:shadow-indigo-500/20 transition-all">
                        Reservar cita →
                      </button>
                      <div className="text-center pt-3 border-t border-white/[0.04]">
                        <span className="text-[9px] text-gray-600">Powered by <span className="text-violet-400 font-semibold">Neuriax</span></span>
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
      <section className="py-24 px-4 bg-gradient-to-b from-[#0d0d15] to-[#0a0a0f]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-6">
              <span className="text-emerald-400 text-xs font-semibold tracking-[0.2em] uppercase">Recordatorios automáticos</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
                Tus clientes nunca más se olvidan
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-2">
                Recordatorios por WhatsApp que eliminan los no-shows de tu negocio.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-3 bg-emerald-500/[0.08] border border-emerald-500/20 rounded-2xl px-6 py-4">
                <span className="text-4xl sm:text-5xl font-extrabold text-emerald-400">35% → 3%</span>
                <span className="text-sm text-gray-400 text-left">de no-shows<br />con recordatorios</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/40 via-violet-500/30 to-amber-500/30" />

            {[
              {
                icon: "✅", color: "bg-emerald-500", label: "Reserva confirmada", time: "Al instante",
                message: "¡Hola María! 🎉 Tu mesa para 4 en Trattoria La Nonna está confirmada:\n📅 Viernes 21 Feb — 20:30\n📍 C/ Gran Vía 45, Madrid\n\nSi necesitas cambiar algo, responde a este mensaje.",
              },
              {
                icon: "⏰", color: "bg-violet-500", label: "Recordatorio 24h antes", time: "Jueves 20:30",
                message: "Hola María 👋 Te recordamos tu reserva mañana viernes a las 20:30 en Trattoria La Nonna.\n\n¿Sigues viniendo?\n✅ SÍ — confirmar\n❌ NO — cancelar\n\nResponde para confirmar 🙏",
              },
              {
                icon: "📍", color: "bg-indigo-500", label: "Último aviso + ubicación", time: "Viernes 19:30",
                message: "¡María, te esperamos en 1 hora! 🍝\n\n📍 Cómo llegar: maps.google.com/trattoria\n🅿️ Parking: Parking Centro (2 min)\n\n¡Buen provecho!",
              },
              {
                icon: "⭐", color: "bg-amber-500", label: "Post-visita", time: "Sábado 10:00",
                message: "¡Hola María! Esperamos que disfrutaras de tu cena 😊\n\n¿Nos dejas tu opinión? Nos ayuda muchísimo:\n⭐ Dejar reseña en Google\n\n¡Gracias y hasta pronto!",
              },
            ].map((step, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="relative flex gap-4 sm:gap-6 mb-10 last:mb-0">
                  <div className={`relative z-10 w-12 h-12 sm:w-16 sm:h-16 ${step.color} rounded-2xl flex items-center justify-center text-lg sm:text-xl flex-shrink-0 shadow-lg`}>
                    {step.icon}
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-3">
                      <h3 className="text-base sm:text-lg font-bold text-white">{step.label}</h3>
                      <span className="text-[11px] text-gray-500 font-mono">{step.time}</span>
                    </div>
                    <div className="bg-[#1a2e1a] border border-emerald-900/40 rounded-2xl rounded-tl-sm p-4 max-w-md shadow-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.607-.798-6.384-2.147l-.108-.084-3.253 1.091 1.091-3.253-.084-.108A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                        </svg>
                        <span className="text-[10px] text-emerald-400 font-medium">WhatsApp Business</span>
                      </div>
                      <p className="text-[12px] text-emerald-100/90 leading-relaxed whitespace-pre-line">{step.message}</p>
                      <div className="text-right mt-2">
                        <span className="text-[9px] text-emerald-700">✓✓</span>
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
      <section className="py-24 px-4 bg-[#0a0a0f]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-rose-400 text-xs font-semibold tracking-[0.2em] uppercase">La diferencia</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
                La diferencia es brutal
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <ScrollReveal>
              <div className="bg-red-950/20 border border-red-500/15 rounded-2xl p-6 sm:p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-red-500/15 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-red-300">Sin Neuriax</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    { icon: "📓", text: "Libreta de papel con tachones y reservas perdidas" },
                    { icon: "📱", text: "52+ mensajes de WhatsApp sin contestar al día" },
                    { icon: "🚫", text: "35% de no-shows cada mes — mesas vacías, dinero perdido" },
                    { icon: "📞", text: "Llamadas a las 23:00 para reservar — imposible descansar" },
                    { icon: "💸", text: "Miles de euros perdidos en sillas y mesas vacías" },
                    { icon: "😤", text: "Clientes frustrados que no vuelven" },
                  ].map((item) => (
                    <li key={item.text} className="flex items-start gap-3">
                      <span className="text-base flex-shrink-0">{item.icon}</span>
                      <span className="text-sm text-gray-400 leading-relaxed">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="bg-emerald-950/20 border border-emerald-500/15 rounded-2xl p-6 sm:p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-500/15 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-emerald-300">Con Neuriax</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    { icon: "📊", text: "Panel digital con todas las reservas organizadas" },
                    { icon: "✅", text: "Reservas automáticas 24/7, sin intervención tuya" },
                    { icon: "📉", text: "Menos del 3% de no-shows con recordatorios WhatsApp" },
                    { icon: "🔕", text: "0 llamadas para reservar — todo online automático" },
                    { icon: "💰", text: "Agenda siempre llena, ingresos predecibles cada semana" },
                    { icon: "🔄", text: "Clientes que vuelven gracias al seguimiento automático" },
                  ].map((item) => (
                    <li key={item.text} className="flex items-start gap-3">
                      <span className="text-base flex-shrink-0">{item.icon}</span>
                      <span className="text-sm text-gray-300 leading-relaxed">{item.text}</span>
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
      <section id="sectores" className="py-24 px-4 bg-gradient-to-b from-[#0a0a0f] to-[#0d0d15]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase">Sectores</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
                Diseñado para tu tipo de negocio
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <ScrollReveal>
              <div className="group bg-gradient-to-br from-amber-500/[0.04] to-transparent border border-amber-500/[0.1] rounded-2xl p-6 sm:p-8 hover:border-amber-500/25 transition-all duration-500 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-amber-500/15 rounded-xl flex items-center justify-center text-2xl">🍽</div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Restaurantes</h3>
                    <p className="text-xs text-gray-500">Llena tus mesas cada servicio</p>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {[
                    "Gestión de mesas y turnos (comida/cena)",
                    "Menú del día visible en la web de reservas",
                    "Reservas para grupos y eventos especiales",
                    "Integración con Google Reviews y Google Maps",
                    "Recordatorios automáticos por WhatsApp",
                    "Panel de estadísticas: ocupación, ingresos, no-shows",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-400">
                      <svg className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] text-gray-600 italic">Ideal para: restaurantes, bares, cafeterías, gastrobares, brunch spots</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="group bg-gradient-to-br from-indigo-500/[0.04] to-transparent border border-indigo-500/[0.1] rounded-2xl p-6 sm:p-8 hover:border-indigo-500/25 transition-all duration-500 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-indigo-500/15 rounded-xl flex items-center justify-center text-2xl">💈</div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Barberías</h3>
                    <p className="text-xs text-gray-500">Agenda siempre llena sin esfuerzo</p>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {[
                    "Gestión por barbero/estilista individual",
                    "Servicios con duración y precio automático",
                    "Galería de trabajos y estilos en la web",
                    "Programa de fidelización integrado",
                    "Recordatorios de cita por WhatsApp",
                    "Estadísticas por barbero: agenda, clientes, ingresos",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-400">
                      <svg className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] text-gray-600 italic">Ideal para: barberías, peluquerías, centros de estética, nail bars</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          INTEGRATIONS MARQUEE
          ════════════════════════════════════════════════ */}
      <section className="py-14 bg-[#0d0d15] border-t border-b border-white/[0.04] overflow-hidden">
        <p className="text-center text-xs text-gray-600 uppercase tracking-[0.2em] mb-8">
          Integramos con las herramientas que ya usas
        </p>
        <div className="marquee-container">
          <div className="marquee-track">
            {[...INTEGRATIONS, ...INTEGRATIONS].map((tool, i) => (
              <span key={`${tool}-${i}`} className="inline-flex items-center gap-2 px-6 py-2 text-sm text-gray-500 font-medium whitespace-nowrap hover:text-white transition-colors">
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
      <section id="proceso" className="py-24 px-4 bg-[#0a0a0f]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <span className="text-violet-400 text-xs font-semibold tracking-[0.2em] uppercase">Proceso</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">En 5 días, funcionando</h2>
              <p className="text-lg text-gray-500">Simple, rápido, sin complicaciones.</p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-violet-500/30 via-indigo-500/30 to-amber-500/30" />

            {[
              { num: "01", title: "Hablamos", desc: "15 min por teléfono. Me cuentas tu negocio, te enseño una demo personalizada. Sin compromiso.", gradient: "from-violet-500 to-violet-600" },
              { num: "02", title: "Diseñamos", desc: "Creo tu panel de reservas + web personalizada con tu marca, colores, logo y servicios.", gradient: "from-indigo-500 to-indigo-600" },
              { num: "03", title: "Lanzamos", desc: "Te formo en 30 minutos. Empiezas a recibir reservas automáticas desde el día 1.", gradient: "from-blue-500 to-blue-600" },
              { num: "04", title: "Crecemos", desc: "Soporte continuo + optimización mensual. Tu sistema mejora cada semana.", gradient: "from-amber-500 to-orange-500" },
            ].map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 100}>
                <div className="text-center relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 text-lg font-bold shadow-lg relative z-10 rotate-3 hover:rotate-0 transition-transform duration-300 ${step.num === "04" ? "text-black" : "text-white"}`}>
                    {step.num}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-16">
              <a href="#contacto" className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold py-4 px-8 rounded-full text-base transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-amber-500/20">
                Quiero mi sistema de reservas
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          VOICE AGENTS — Premium add-on
          ════════════════════════════════════════════════ */}
      <section id="agentes" className="py-24 px-4 bg-gradient-to-b from-[#0a0a0f] via-[#0f0a1a] to-[#0a0a0f]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-cyan-500/[0.08] border border-cyan-500/20 rounded-full px-4 py-2 mb-5">
                <span className="text-[13px] text-cyan-300 font-semibold">⚡ Complemento Premium</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
                ¿Y si además tu teléfono<br className="hidden sm:block" /> se contesta solo?
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Añade un agente de voz con IA a tu sistema de reservas. Contesta llamadas,
                gestiona reservas y responde preguntas — con voz natural, 24 horas del día.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <ScrollReveal>
              <div>
                <ul className="space-y-5 mb-8">
                  {[
                    { title: "Responde llamadas 24/7", desc: "Un cliente llama a las 23:00 para reservar. El agente contesta, busca disponibilidad y confirma la reserva.", color: "text-cyan-400" },
                    { title: "Habla como una persona real", desc: "Voz natural con IA avanzada. Tus clientes no notarán la diferencia. Trato amable y profesional.", color: "text-violet-400" },
                    { title: "Conectado a tu panel", desc: "Las reservas que gestiona el agente aparecen directamente en tu panel. Todo sincronizado en tiempo real.", color: "text-amber-400" },
                  ].map((item) => (
                    <li key={item.title} className="flex gap-4">
                      <div className="w-10 h-10 bg-white/[0.04] border border-white/[0.08] rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className={`w-5 h-5 ${item.color}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <a href="#contacto" className="inline-flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white font-semibold py-3 px-6 rounded-full text-sm transition-all duration-300">
                  Añadir agente de voz a mi plan
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </div>
            </ScrollReveal>

            {/* Agent Mockup */}
            <ScrollReveal delay={150}>
              <div className="relative">
                <div className="absolute -inset-4 bg-cyan-500/[0.04] rounded-3xl blur-2xl" />
                <div className="relative bg-[#0d1117] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="ml-3 text-[11px] text-gray-500 font-mono">agente-voz — llamada activa</span>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        </span>
                        <span className="text-xs text-emerald-400 font-medium">En curso · Trattoria La Nonna</span>
                      </div>
                      <span className="text-xs text-gray-600 font-mono">00:42</span>
                    </div>

                    <div className="space-y-2.5 max-h-[220px] lg:max-h-[280px] overflow-y-auto pr-1 scrollbar-thin">
                      {[
                        { role: "user", text: "Hola buenas, quería reservar mesa para el viernes para 4 personas." },
                        { role: "agent", text: "¡Buenas tardes! Encantado de ayudarte. Para 4 personas el viernes, ¿tienes preferencia de horario? Tenemos disponibilidad a las 14:00, 21:00 y 21:30." },
                        { role: "user", text: "A las 21:00 perfecto." },
                        { role: "agent", text: "Genial, mesa para 4 el viernes a las 21:00. ¿A nombre de quién la reservo?" },
                        { role: "user", text: "A nombre de Roberto Díaz." },
                        { role: "agent", text: "Perfecto Roberto. Reserva confirmada: viernes a las 21:00, mesa para 4. Te envío confirmación por WhatsApp ahora mismo. ¡Le esperamos!" },
                      ].map((msg, i) => (
                        <div key={i} className={`flex gap-2 ${msg.role === "agent" ? "justify-end" : ""}`}>
                          {msg.role === "user" && <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 text-[9px]">👤</div>}
                          <div className={`rounded-xl px-3 py-2 max-w-[240px] ${msg.role === "agent" ? "bg-cyan-500/[0.1] border border-cyan-500/20 rounded-tr-sm" : "bg-slate-800/80 rounded-tl-sm"}`}>
                            <p className={`text-[11px] leading-relaxed ${msg.role === "agent" ? "text-cyan-50" : "text-gray-300"}`}>{msg.text}</p>
                          </div>
                          {msg.role === "agent" && <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 text-[9px]">🤖</div>}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                      <span className="text-[10px] text-gray-600">Duración: 0:42</span>
                      <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        Reserva creada + WhatsApp enviado
                      </span>
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
      <section className="py-20 px-4 bg-[#0a0a0f]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
              {[
                { value: "−95%", label: "no-shows", color: "text-emerald-400", bg: "from-emerald-500/[0.06] to-transparent" },
                { value: "+60%", label: "reservas online", color: "text-violet-400", bg: "from-violet-500/[0.06] to-transparent" },
                { value: "−80%", label: "llamadas teléfono", color: "text-indigo-400", bg: "from-indigo-500/[0.06] to-transparent" },
                { value: "4.9★", label: "satisfacción media", color: "text-amber-400", bg: "from-amber-500/[0.06] to-transparent" },
              ].map((r) => (
                <div key={r.label} className={`bg-gradient-to-b ${r.bg} border border-white/[0.05] rounded-2xl p-6 text-center`}>
                  <div className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${r.color} mb-2`}>{r.value}</div>
                  <div className="text-xs text-gray-500">{r.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          GUARANTEES
          ════════════════════════════════════════════════ */}
      <section className="py-16 px-4 bg-[#0d0d15] border-t border-b border-white/[0.04]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Garantía 30 días", desc: "No funciona = te devuelvo el dinero", bgClass: "bg-emerald-500/10", iconClass: "text-emerald-400" },
              { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", title: "Listo en 5 días", desc: "Panel + web funcionando", bgClass: "bg-violet-500/10", iconClass: "text-violet-400" },
              { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", title: "Trato directo", desc: "Hablas conmigo, no con vendedores", bgClass: "bg-indigo-500/10", iconClass: "text-indigo-400" },
              { icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", title: "Sin permanencia", desc: "Cancela cuando quieras", bgClass: "bg-amber-500/10", iconClass: "text-amber-400" },
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
      <section id="faq" className="py-24 px-4 bg-[#0a0a0f]">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Preguntas frecuentes</h2>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-3">
              {[
                { q: "¿Cuánto cuesta el sistema de reservas?", a: "Depende de las funcionalidades que necesites. En la llamada de 15 min te doy precio exacto para tu caso, sin sorpresas. Incluye panel, web personalizada y recordatorios." },
                { q: "¿Funciona para mi tipo de negocio?", a: "Si tienes un restaurante, bar, barbería, peluquería o centro de estética, sí. El sistema se adapta a tu tipo de negocio con funcionalidades específicas." },
                { q: "¿Mis clientes sabrán usar la web de reservas?", a: "Es más fácil que pedir un Uber. Eligen día, hora, confirman y listo. 30 segundos. Hemos probado con personas de todas las edades." },
                { q: "¿Cómo se reducen los no-shows?", a: "Con recordatorios automáticos por WhatsApp: confirmación al reservar, aviso 24h antes con botón de confirmar/cancelar, y último recordatorio 1h antes. De un 35% a menos del 3%." },
                { q: "¿Puedo probarlo antes de pagar?", a: "Sí. En la llamada te enseño una demo con datos reales de tu negocio. Además, tienes garantía de 30 días: si no funciona, devuelvo tu dinero." },
                { q: "¿Cuánto tarda en estar funcionando?", a: "5 días laborables desde que empezamos. Incluye diseño, configuración, personalización con tu marca y formación." },
                { q: "¿Qué pasa con el agente de voz?", a: "Es un complemento opcional. Si además de las reservas online quieres que alguien conteste el teléfono 24/7, añadimos el agente de voz IA a tu sistema." },
              ].map((faq, i) => (
                <details key={i} className="group bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden hover:border-violet-500/20 transition-colors">
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
      <section id="contacto" className="py-24 px-4 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d15] to-[#0d0d15]">
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
                    Solo 5 negocios nuevos al mes
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5">
                  ¿Listo para llenar<br />tu agenda?
                </h2>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  Rellena el formulario y elige tu horario en Calendly.{" "}
                  <span className="text-white font-medium">15 minutos. Sin compromiso.</span> Te enseño una demo personalizada para tu negocio.
                </p>

                <ul className="space-y-4 mb-8">
                  {["Demo personalizada con datos de tu negocio", "Presupuesto cerrado sin sorpresas", "Garantía 30 días o te devuelvo el dinero"].map((b) => (
                    <li key={b} className="flex items-center gap-3 text-gray-300 text-sm">
                      <div className="w-6 h-6 bg-violet-500/10 rounded-md flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-violet-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                      {b}
                    </li>
                  ))}
                </ul>

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

            <ScrollReveal delay={100}>
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
