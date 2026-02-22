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
   DASHBOARD CONVERSATIONS (simplified)
   ───────────────────────────────────────────────────── */
const CONVERSATIONS = [
  { time: "13:02", name: "María García", channel: "WhatsApp", status: "resolved", summary: "Reserva confirmada para 4 pax" },
  { time: "13:18", name: "Carlos López", channel: "Web Chat", status: "resolved", summary: "Consulta sobre horarios" },
  { time: "13:45", name: "Ana Martínez", channel: "Voz IA", status: "pending", summary: "Solicitud de presupuesto" },
  { time: "14:02", name: "Pedro Sánchez", channel: "WhatsApp", status: "resolved", summary: "Modificación de reserva" },
  { time: "14:15", name: "Laura Fernández", channel: "Web Chat", status: "resolved", summary: "Información sobre servicios" },
];

/* ───────────────────────────────────────────────────── */

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFBFF] text-slate-900 overflow-x-hidden">

      {/* ════════════════════════════════════════════════
          HERO — Premium Aurora
          ════════════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] flex items-center px-4 overflow-hidden">
        {/* Aurora mesh background */}
        <div className="absolute inset-0 grid-micro" />
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute top-[-10%] right-[-15%] w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] bg-violet-300/[0.18] rounded-full blur-[120px] sm:blur-[180px] aurora-blob-1" />
        <div className="absolute top-[30%] left-[-10%] w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-indigo-200/[0.14] rounded-full blur-[100px] sm:blur-[160px] aurora-blob-2" />
        <div className="absolute bottom-[-5%] right-[20%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-rose-200/[0.10] rounded-full blur-[100px] sm:blur-[150px] aurora-blob-3" />

        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center pt-28 sm:pt-36 lg:pt-40 pb-16">
          {/* HERO CONTENT */}
          <div className="text-center w-full max-w-4xl mx-auto flex flex-col items-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 glass rounded-full px-5 py-2.5 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-violet-500 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
              </span>
              <span className="text-[12px] sm:text-[13px] text-slate-600 font-medium tracking-wide">
                AI-Powered Customer Operations
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-[3.25rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6rem] font-black leading-[1.02] tracking-[-0.04em] mb-6 text-center w-full px-2">
              <span className="block text-slate-900">Agentes de IA</span>
              <span className="block text-slate-900">que atienden,</span>
              <span className="underline-glow mt-1 block text-slate-900">
                convierten y escalan.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-slate-500 leading-relaxed mb-10 max-w-lg sm:max-w-2xl mx-auto px-2">
              Sistema integral de atención al cliente con IA.{" "}
              <span className="text-slate-900 font-semibold">Agente personalizado + landing profesional + panel de control</span>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8 w-full px-2 sm:px-0">
              <a
                href="#contacto"
                className="group inline-flex items-center justify-center gap-3 bg-slate-900 text-white font-semibold py-4 px-8 sm:px-10 rounded-2xl sm:rounded-full text-[16px] sm:text-[17px] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-slate-900/20 w-full sm:w-auto"
              >
                Explorar plataforma
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-2 glass text-slate-700 font-semibold py-4 px-6 sm:px-8 rounded-2xl sm:rounded-full text-[15px] sm:text-base transition-all duration-300 hover:bg-white/80 w-full sm:w-auto"
              >
                Solicitar demostración →
              </a>
            </div>

            {/* Trust metrics inline */}
            <div className="flex items-center justify-center gap-4 sm:gap-8 text-sm text-slate-500">
              {[
                { value: "99.9%", label: "uptime" },
                { value: "<2s", label: "respuesta" },
                { value: "24/7", label: "disponible" },
              ].map((m) => (
                <div key={m.label} className="flex items-center gap-1.5">
                  <span className="text-slate-900 font-bold">{m.value}</span>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* DASHBOARD PREVIEW */}
          <div className="w-full max-w-4xl mx-auto mt-14 sm:mt-20 lg:mt-24">
            <div className="relative">
              {/* Glow behind dashboard */}
              <div className="absolute -inset-6 sm:-inset-10 bg-violet-400/[0.06] rounded-3xl blur-3xl" />

              {/* Floating notification cards — desktop only */}
              <div className="hidden lg:block absolute -top-4 -right-12 z-20 float-gentle">
                <div className="glass rounded-xl px-4 py-3 shadow-lg shadow-slate-900/[0.06]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block">Agente IA · ahora</span>
                      <span className="text-[12px] text-slate-700 font-medium">Consulta #1247 resuelta</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block absolute -bottom-2 -left-10 z-20 float-gentle-delayed">
                <div className="glass rounded-xl px-4 py-3 shadow-lg shadow-slate-900/[0.06]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block">Sistema · 3 canales</span>
                      <span className="text-[12px] text-slate-700 font-medium">Satisfacción: 98%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dashboard frame */}
              <div className="relative dashboard-frame rounded-2xl overflow-hidden dashboard-perspective">
                {/* Chrome bar */}
                <div className="flex items-center gap-2 px-4 sm:px-5 py-3 border-b border-slate-200/40">
                  <span className="w-3 h-3 rounded-full bg-slate-300/80" />
                  <span className="w-3 h-3 rounded-full bg-slate-300/60" />
                  <span className="w-3 h-3 rounded-full bg-slate-300/40" />
                  <div className="ml-3 flex items-center gap-1.5 bg-slate-100/80 px-3 py-1 rounded-lg">
                    <svg className="w-2.5 h-2.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                    <span className="text-[11px] text-slate-500 font-mono">panel.neuriax.com</span>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    <span className="text-[10px] text-emerald-600 font-medium hidden sm:inline">En vivo</span>
                  </div>
                </div>

                {/* Dashboard content */}
                <div className="p-4 sm:p-6">
                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
                    {[
                      { label: "Atendidos hoy", value: "142", icon: "✓", color: "text-emerald-600", bg: "bg-emerald-50" },
                      { label: "Resolución", value: "97%", icon: "◆", color: "text-violet-600", bg: "bg-violet-50" },
                      { label: "Automáticas", value: "89%", icon: "⚡", color: "text-indigo-600", bg: "bg-indigo-50" },
                      { label: "Satisfacción", value: "4.9", icon: "★", color: "text-amber-600", bg: "bg-amber-50" },
                    ].map((s) => (
                      <div key={s.label} className={`${s.bg} rounded-xl p-3 sm:p-4`}>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[10px] sm:text-xs">{s.icon}</span>
                          <span className="text-[9px] sm:text-[11px] text-slate-500 font-medium">{s.label}</span>
                        </div>
                        <div className={`text-lg sm:text-2xl font-bold ${s.color}`}>{s.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Conversations list */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] sm:text-xs text-slate-500 font-medium">Conversaciones recientes</span>
                      <span className="text-[10px] sm:text-[11px] text-violet-600 font-medium">Ver todas →</span>
                    </div>
                    {CONVERSATIONS.map((c, i) => (
                      <div key={i} className={`flex items-center gap-2 sm:gap-3 px-3 py-2.5 rounded-xl transition-colors ${i === 2 ? "bg-amber-50 border border-amber-200/60" : i === 0 ? "bg-violet-50/50" : "hover:bg-slate-50"}`}>
                        <span className="text-[10px] sm:text-[12px] text-slate-400 font-mono w-10 flex-shrink-0">{c.time}</span>
                        <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[8px] sm:text-[9px] font-bold flex-shrink-0 ${i % 3 === 0 ? "bg-violet-100 text-violet-600" : i % 3 === 1 ? "bg-emerald-100 text-emerald-600" : "bg-indigo-100 text-indigo-600"}`}>
                          {c.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[11px] sm:text-[13px] text-slate-800 font-medium block truncate">{c.name}</span>
                          <span className="text-[9px] sm:text-[11px] text-slate-400 truncate block">{c.summary}</span>
                        </div>
                        <span className={`text-[8px] sm:text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 hidden sm:block ${
                          c.channel === "WhatsApp" ? "bg-emerald-50 text-emerald-600 border border-emerald-200/60" :
                          c.channel === "Voz IA" ? "bg-indigo-50 text-indigo-600 border border-indigo-200/60" :
                          "bg-violet-50 text-violet-600 border border-violet-200/60"
                        }`}>
                          {c.channel}
                        </span>
                        <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full flex-shrink-0 ${c.status === "resolved" ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"}`}>
                          {c.status === "resolved" ? "✓" : "⏳"}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom fade */}
                  <div className="h-6 bg-gradient-to-t from-white/90 to-transparent -mx-4 sm:-mx-6 -mb-4 sm:-mb-6 mt-2" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase hidden sm:block">Descubre más</span>
            <div className="w-5 h-9 border-2 border-slate-300/60 rounded-full flex justify-center">
              <div className="w-1 h-2.5 bg-slate-400 rounded-full mt-2 animate-scroll-indicator" />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          CAPABILITIES — 6 Glass Cards
          ════════════════════════════════════════════════ */}
      <section id="servicios" className="relative py-24 sm:py-32 px-4">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16 sm:mb-20">
              <span className="inline-block text-[12px] sm:text-[13px] font-semibold text-violet-600 tracking-widest uppercase mb-4">
                Capacidades
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-5">
                Todo lo que tu agente puede hacer
              </h2>
              <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto">
                Un sistema completo que se adapta a tu negocio. Multi-canal, multi-idioma, siempre disponible.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                ),
                title: "Chat IA en web",
                desc: "Widget conversacional integrado en tu web. Responde preguntas, genera leads y agenda citas automáticamente.",
                color: "text-violet-600",
                bg: "bg-violet-50",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  </svg>
                ),
                title: "Agente WhatsApp",
                desc: "Atención por WhatsApp Business API. Respuestas inteligentes, envío de catálogos y confirmaciones automáticas.",
                color: "text-emerald-600",
                bg: "bg-emerald-50",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                ),
                title: "Voz IA (llamadas)",
                desc: "Agente de voz con IA conversacional. Atiende llamadas, filtra consultas y transfiere a humano cuando es necesario.",
                color: "text-indigo-600",
                bg: "bg-indigo-50",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                ),
                title: "Landing white-label",
                desc: "Página profesional con tu marca, optimizada para conversión. Diseño premium adaptado a tu sector.",
                color: "text-rose-600",
                bg: "bg-rose-50",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                  </svg>
                ),
                title: "Panel de control",
                desc: "Dashboard en tiempo real. Métricas, conversaciones, leads y rendimiento del agente centralizados.",
                color: "text-amber-600",
                bg: "bg-amber-50",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                ),
                title: "25+ integraciones",
                desc: "Conecta con Google Calendar, Stripe, CRMs, Zapier, Make y más. API abierta para integraciones custom.",
                color: "text-cyan-600",
                bg: "bg-cyan-50",
              },
            ].map((c, i) => (
              <ScrollReveal key={c.title} delay={i * 80}>
                <div className="glass-card rounded-2xl p-6 sm:p-8 h-full group hover:shadow-lg hover:shadow-slate-900/[0.04] transition-all duration-300">
                  <div className={`w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center ${c.color} mb-5 group-hover:scale-110 transition-transform`}>
                    {c.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{c.title}</h3>
                  <p className="text-sm sm:text-[15px] text-slate-500 leading-relaxed">{c.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          HOW IT WORKS — 4 Steps
          ════════════════════════════════════════════════ */}
      <section id="proceso" className="relative py-24 sm:py-32 px-4 bg-white">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16 sm:mb-20">
              <span className="inline-block text-[12px] sm:text-[13px] font-semibold text-violet-600 tracking-widest uppercase mb-4">
                Proceso
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-5">
                De cero a operativo en 72h
              </h2>
              <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto">
                Un proceso simple con acompañamiento en cada paso. Tú pones el negocio, nosotros la tecnología.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                step: "01",
                title: "Consultoría",
                desc: "Analizamos tu negocio, flujos de atención y objetivos para diseñar el agente perfecto.",
                icon: "🎯",
              },
              {
                step: "02",
                title: "Configuración",
                desc: "Entrenamos el agente con tu información, conectamos canales e integramos herramientas.",
                icon: "⚙️",
              },
              {
                step: "03",
                title: "Lanzamiento",
                desc: "Desplegamos landing + agente + panel. Testeo real con tus primeros clientes.",
                icon: "🚀",
              },
              {
                step: "04",
                title: "Optimización",
                desc: "Mejora continua basada en datos reales. Ajustes semanales para maximizar conversión.",
                icon: "📈",
              },
            ].map((s, i) => (
              <ScrollReveal key={s.step} delay={i * 100}>
                <div className="relative text-center md:text-left">
                  {/* Connector line — desktop */}
                  {i < 3 && (
                    <div className="hidden md:block absolute top-8 left-[calc(100%+0.5rem)] w-[calc(100%-1rem)] h-px bg-gradient-to-r from-slate-200 to-transparent" />
                  )}
                  <div className="text-3xl mb-4">{s.icon}</div>
                  <div className="text-[11px] font-bold text-violet-500 tracking-widest uppercase mb-2">
                    Paso {s.step}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          USE CASES — 2 Cards
          ════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 px-4">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16 sm:mb-20">
              <span className="inline-block text-[12px] sm:text-[13px] font-semibold text-violet-600 tracking-widest uppercase mb-4">
                Casos de uso
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-5">
                Adaptado a cualquier sector
              </h2>
              <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto">
                Restaurantes, clínicas, inmobiliarias, academias, e-commerce… Tu agente habla el idioma de tu negocio.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Restaurante */}
            <ScrollReveal>
              <div className="glass-card rounded-2xl p-8 sm:p-10 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-2xl">🍽️</div>
                  <div>
                    <h3 className="text-xl font-bold">Restaurante</h3>
                    <p className="text-sm text-slate-500">Hostelería y gastronomía</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "Gestión automática de reservas por WhatsApp y web",
                    "Respuesta a preguntas sobre menú, alérgenos y horarios",
                    "Confirmaciones y recordatorios automáticos",
                    "Integración con Google Maps y Reviews",
                    "Panel con ocupación en tiempo real",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm sm:text-[15px] text-slate-600">
                      <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Clínica */}
            <ScrollReveal delay={100}>
              <div className="glass-card rounded-2xl p-8 sm:p-10 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center text-2xl">🏥</div>
                  <div>
                    <h3 className="text-xl font-bold">Clínica / Consulta</h3>
                    <p className="text-sm text-slate-500">Salud y bienestar</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "Agenda citas por cualquier canal, sincronizado con Calendar",
                    "Responde dudas frecuentes sobre tratamientos y precios",
                    "Envío automático de preparación pre-consulta",
                    "Recordatorios 24h antes para reducir no-shows",
                    "Formularios de admisión inteligentes",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm sm:text-[15px] text-slate-600">
                      <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          BEFORE vs AFTER
          ════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 px-4 bg-white">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16 sm:mb-20">
              <span className="inline-block text-[12px] sm:text-[13px] font-semibold text-violet-600 tracking-widest uppercase mb-4">
                Comparativa
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-5">
                Antes vs Después
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Before */}
            <ScrollReveal>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-8">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-xl">😰</span>
                  <h3 className="text-lg font-bold text-slate-400">Sin Neuriax</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Llamadas perdidas = clientes perdidos",
                    "Responder WhatsApp manualmente todo el día",
                    "Sin datos de rendimiento ni métricas",
                    "Web genérica sin conversión",
                    "Horario limitado: solo horas de oficina",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-400">
                      <svg className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* After */}
            <ScrollReveal delay={100}>
              <div className="glass-card rounded-2xl p-8 border-2 border-violet-200/60">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-xl">🚀</span>
                  <h3 className="text-lg font-bold text-slate-900">Con Neuriax</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Cada consulta atendida al instante, 24/7",
                    "Agente IA gestiona WhatsApp, web y voz",
                    "Panel con métricas en tiempo real",
                    "Landing profesional que convierte visitas en leads",
                    "Disponibilidad total: madrugada, festivos, siempre",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <svg className="w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          RESULTS — Big Numbers
          ════════════════════════════════════════════════ */}
      <section id="resultados" className="relative py-24 sm:py-32 px-4">
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-200/[0.08] rounded-full blur-[150px]" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16 sm:mb-20">
              <span className="inline-block text-[12px] sm:text-[13px] font-semibold text-violet-600 tracking-widest uppercase mb-4">
                Resultados
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-5">
                Números que hablan solos
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { value: "97%", label: "Consultas resueltas sin intervención humana", color: "text-violet-600" },
              { value: "<2s", label: "Tiempo medio de primera respuesta", color: "text-indigo-600" },
              { value: "3x", label: "Más leads generados vs formulario tradicional", color: "text-emerald-600" },
              { value: "24/7", label: "Disponibilidad total sin costes extra", color: "text-amber-600" },
            ].map((r, i) => (
              <ScrollReveal key={r.value} delay={i * 80}>
                <div className="text-center">
                  <div className={`text-5xl sm:text-6xl md:text-7xl font-black tracking-tight ${r.color} mb-3`}>
                    {r.value}
                  </div>
                  <p className="text-sm text-slate-500 leading-snug">{r.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          INTEGRATIONS MARQUEE
          ════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 px-4 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <span className="inline-block text-[12px] sm:text-[13px] font-semibold text-violet-600 tracking-widest uppercase mb-4">
            Ecosistema
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Conectado con tus herramientas
          </h2>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
          <div className="flex gap-4 animate-marquee">
            {[...INTEGRATIONS, ...INTEGRATIONS].map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex-shrink-0 glass rounded-xl px-5 py-3 text-sm font-medium text-slate-600 whitespace-nowrap"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          FAQ — Accordion Style
          ════════════════════════════════════════════════ */}
      <section id="faq" className="relative py-24 sm:py-32 px-4">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block text-[12px] sm:text-[13px] font-semibold text-violet-600 tracking-widest uppercase mb-4">
                FAQ
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                Preguntas frecuentes
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-3">
            {[
              {
                q: "¿Qué incluye el sistema Neuriax?",
                a: "Incluye un agente de IA conversacional personalizado, una landing page profesional con tu marca, un panel de control con métricas en tiempo real, y conexión multi-canal (WhatsApp, web chat, voz). Todo configurado y listo para operar.",
              },
              {
                q: "¿Cuánto tarda en estar operativo?",
                a: "Normalmente entre 48-72 horas desde la consultoría inicial. Incluye configuración del agente, diseño de la landing, integración de canales y fase de pruebas.",
              },
              {
                q: "¿Funciona con mi negocio?",
                a: "Sí. El agente se entrena específicamente con la información de tu negocio: servicios, precios, horarios, preguntas frecuentes, políticas… Funciona para hostelería, salud, inmobiliaria, educación, e-commerce y más.",
              },
              {
                q: "¿Qué pasa si el agente no sabe responder?",
                a: "El agente está diseñado para escalar a un humano cuando detecta consultas complejas, quejas o situaciones que requieren intervención personal. Puedes configurar exactamente cuándo y cómo se hace la transferencia.",
              },
              {
                q: "¿Puedo ver las conversaciones del agente?",
                a: "Sí. El panel de control te da acceso completo a todas las conversaciones, métricas de satisfacción, tiempos de respuesta y rendimiento general. Todo en tiempo real.",
              },
              {
                q: "¿Es compatible con mis herramientas actuales?",
                a: "Conectamos con 25+ herramientas: Google Calendar, Stripe, WhatsApp Business, HubSpot, Zapier, Make, Slack, y más. Si necesitas una integración específica, la desarrollamos.",
              },
              {
                q: "¿Qué precio tiene?",
                a: "Depende del alcance del proyecto. Ofrecemos planes desde configuración básica hasta soluciones enterprise con múltiples agentes. Contacta para una propuesta personalizada sin compromiso.",
              },
            ].map((faq, i) => (
              <ScrollReveal key={i} delay={i * 50}>
                <details className="group glass-card rounded-xl" open={i === 0}>
                  <summary className="flex items-center justify-between cursor-pointer p-5 sm:p-6 list-none">
                    <span className="text-[15px] sm:text-base font-semibold text-slate-900 pr-4">{faq.q}</span>
                    <svg
                      className="w-5 h-5 text-slate-400 flex-shrink-0 transition-transform group-open:rotate-45"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
                    </svg>
                  </summary>
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-1">
                    <p className="text-sm sm:text-[15px] text-slate-500 leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          CONTACT CTA
          ════════════════════════════════════════════════ */}
      <section id="contacto" className="relative py-24 sm:py-32 px-4 bg-white">
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute top-0 left-[50%] -translate-x-1/2 w-[800px] h-[400px] bg-violet-200/[0.06] rounded-full blur-[120px]" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <ScrollReveal>
              <div>
                <span className="inline-block text-[12px] sm:text-[13px] font-semibold text-violet-600 tracking-widest uppercase mb-4">
                  Contacto
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-5">
                  Hablemos de tu proyecto
                </h2>
                <p className="text-base sm:text-lg text-slate-500 leading-relaxed mb-8">
                  Cuéntanos sobre tu negocio y diseñamos un agente a medida. Sin compromiso, sin letra pequeña.
                </p>

                {/* Contact details */}
                <div className="flex flex-col gap-3 text-sm text-slate-500 mb-8">
                  <a href="tel:+34640791041" className="flex items-center gap-2.5 hover:text-slate-900 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                    +34 640 791 041
                  </a>
                  <a href="mailto:hola@neuriax.com" className="flex items-center gap-2.5 hover:text-slate-900 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                    hola@neuriax.com
                  </a>
                </div>

                {/* Trust final */}
                <div className="flex items-center gap-6 text-[13px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                    Sin compromiso
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Respuesta en 24h
                  </span>
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
