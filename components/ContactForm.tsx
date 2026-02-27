"use client";

import { useState, FormEvent } from "react";

const CALENDLY_URL = "https://calendly.com/neuriax/llamada";

const SECTORES = [
  "Restauración / Hostelería",
  "Clínica / Salud",
  "Comercio / Retail",
  "Consultoría / Servicios profesionales",
  "Construcción / Reformas",
  "Inmobiliaria",
  "Educación / Formación",
  "Logística / Transporte",
  "Industria / Fabricación",
  "Tecnología / SaaS",
  "E-commerce",
  "Despacho / Asesoría",
  "Otro",
];

const SERVICIOS = [
  "Chatbot / Asistente virtual con IA",
  "Automatización de procesos",
  "Desarrollo web / Landing pages",
  "CRM e integración de sistemas",
  "Marketing automatizado",
  "Otro / No estoy seguro",
];

const PRESUPUESTOS = [
  "Menos de 500 €",
  "500 € – 2.000 €",
  "2.000 € – 5.000 €",
  "5.000 € – 15.000 €",
  "+15.000 €",
  "Prefiero hablarlo",
];

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    sector: "",
    servicio: "",
    presupuesto: "",
    mensaje: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const canGoStep2 = formData.nombre && formData.email && formData.telefono;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          empresa: formData.empresa,
          sector: formData.sector,
          mensaje: [
            `📋 SOLICITUD DESDE FORMULARIO WEB`,
            ``,
            `🏢 Empresa: ${formData.empresa || "No especificada"}`,
            `📍 Sector: ${formData.sector || "No especificado"}`,
            `🎯 Servicio: ${formData.servicio || "No especificado"}`,
            `💰 Presupuesto: ${formData.presupuesto || "No especificado"}`,
            ``,
            `💬 Mensaje:`,
            formData.mensaje || "Sin comentarios adicionales",
          ].join("\n"),
          type: "contact_form",
        }),
      });

      if (!res.ok) throw new Error("Error enviando");
      setStatus("success");

      setTimeout(() => {
        window.open(CALENDLY_URL, "_blank");
      }, 2500);
    } catch {
      setStatus("error");
    }
  };

  /* ─────────────────────────────────────
     SUCCESS STATE
     ───────────────────────────────────── */
  if (status === "success") {
    return (
      <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-violet-500/10 border border-white/20">
        {/* Glow backdrop */}
        <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400/20 via-teal-400/10 to-cyan-400/20 blur-xl" />
        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl">
          {/* Header éxito */}
          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 px-8 py-8 text-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-50" />
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-white/10">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-2">¡Solicitud recibida!</h3>
              <p className="text-emerald-50 text-sm font-medium">Nuestro equipo analizará tu caso en las próximas horas</p>
            </div>
          </div>

          <div className="px-8 py-6 space-y-5">
            {/* Confirmación email */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
              <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Email de confirmación enviado</p>
                <p className="text-xs text-slate-500 mt-0.5">Revisa tu bandeja en <strong>{formData.email}</strong></p>
              </div>
            </div>

            {/* CTA Calendly */}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-3 w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white px-6 py-4 rounded-2xl font-bold text-sm transition-all hover:shadow-xl hover:shadow-slate-900/20 hover:scale-[1.02] overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="relative z-10">Agendar llamada estratégica gratuita</span>
            </a>

            <p className="text-[11px] text-slate-400 text-center animate-pulse">
              Redirigiendo automáticamente a Calendly...
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────
     FORM STEPS
     ───────────────────────────────────── */
  const inputBase =
    "w-full px-4 py-3.5 bg-white border-2 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 text-sm font-medium";
  const selectBase = (hasValue: boolean) =>
    `${inputBase} ${hasValue ? "text-slate-900" : "text-slate-400"} appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20width%3d%2214%22%20height%3d%2214%22%20viewBox%3d%220%200%2024%2024%22%20fill%3d%22none%22%20stroke%3d%22%2394a3b8%22%20stroke-width%3d%222.5%22%20stroke-linecap%3d%22round%22%20stroke-linejoin%3d%22round%22%3e%3cpath%20d%3d%22M6%209l6%206%206-6%22%2f%3e%3c%2fsvg%3e')] bg-[length:14px] bg-[right_14px_center] bg-no-repeat pr-10`;
  const labelBase = "block text-[13px] font-bold text-slate-700 mb-2 flex items-center gap-1.5";

  const steps = [
    { num: 1, label: "Contacto", icon: "👤" },
    { num: 2, label: "Proyecto", icon: "🎯" },
  ];

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-violet-500/10">
      {/* Animated glow border */}
      <div className="absolute -inset-[1px] bg-gradient-to-br from-violet-500/30 via-indigo-500/20 to-violet-500/30 rounded-3xl" />
      <div className="absolute -inset-[1px] bg-gradient-to-tl from-violet-500/20 via-transparent to-indigo-500/20 rounded-3xl animate-pulse-slow" />

      <div className="relative bg-white/[0.97] backdrop-blur-xl rounded-3xl">
        {/* ═══ Header ═══ */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 px-6 sm:px-8 py-6">
          {/* Subtle pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9zdmc+')] opacity-50" />
          <div className="relative">
            {/* Title row */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  Solicitar análisis gratuito
                </h3>
                <p className="text-violet-300/80 text-xs mt-1 font-medium">Sin compromiso · Respuesta en menos de 24h</p>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[11px] text-emerald-300 font-bold">Online</span>
              </div>
            </div>

            {/* Step indicators */}
            <div className="flex gap-3">
              {steps.map((s) => (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => {
                    if (s.num === 1) setStep(1);
                    if (s.num === 2 && canGoStep2) setStep(2);
                  }}
                  className={`flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-all duration-300 ${
                    step === s.num
                      ? "bg-white/15 border border-white/20 shadow-lg shadow-black/20"
                      : step > s.num
                      ? "bg-emerald-500/15 border border-emerald-400/20"
                      : "bg-white/5 border border-white/5"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black transition-all ${
                      step === s.num
                        ? "bg-violet-500 text-white shadow-md shadow-violet-500/30"
                        : step > s.num
                        ? "bg-emerald-500 text-white"
                        : "bg-white/10 text-white/40"
                    }`}
                  >
                    {step > s.num ? "✓" : s.num}
                  </div>
                  <div>
                    <span className={`text-[11px] font-bold block ${step >= s.num ? "text-white" : "text-white/30"}`}>
                      {s.label}
                    </span>
                    <span className="text-[9px] text-white/30 block">{s.icon}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ Form body ═══ */}
        <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-6">
          {/* ═══ STEP 1: Contacto ═══ */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <label className={labelBase}>
                  <span className="text-violet-500">●</span> Nombre completo
                </label>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Ej: María García López"
                  required
                  value={formData.nombre}
                  onChange={handleChange}
                  className={inputBase}
                />
              </div>

              <div>
                <label className={labelBase}>
                  <span className="text-violet-500">●</span> Email profesional
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="maria@tuempresa.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={inputBase}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelBase}>
                    <span className="text-violet-500">●</span> Teléfono
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    placeholder="+34 6XX XXX XXX"
                    required
                    value={formData.telefono}
                    onChange={handleChange}
                    className={inputBase}
                  />
                </div>
                <div>
                  <label className={labelBase}>
                    <span className="text-slate-300">○</span> Empresa
                  </label>
                  <input
                    type="text"
                    name="empresa"
                    placeholder="Nombre de tu empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    className={inputBase}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => canGoStep2 && setStep(2)}
                disabled={!canGoStep2}
                className="group w-full relative bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold py-4 px-6 rounded-2xl text-sm transition-all duration-300 hover:from-violet-500 hover:to-indigo-500 hover:shadow-xl hover:shadow-violet-500/25 hover:scale-[1.02] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center gap-2 mt-2 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                <span className="relative z-10 flex items-center gap-2">
                  Siguiente: tu proyecto
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </div>
          )}

          {/* ═══ STEP 2: Proyecto ═══ */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelBase}>
                    <span className="text-violet-500">●</span> Sector
                  </label>
                  <select
                    name="sector"
                    value={formData.sector}
                    onChange={handleChange}
                    className={selectBase(!!formData.sector)}
                  >
                    <option value="" disabled>
                      Seleccionar sector
                    </option>
                    {SECTORES.map((s) => (
                      <option key={s} value={s} className="text-slate-900">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelBase}>
                    <span className="text-violet-500">●</span> Servicio
                  </label>
                  <select
                    name="servicio"
                    required
                    value={formData.servicio}
                    onChange={handleChange}
                    className={selectBase(!!formData.servicio)}
                  >
                    <option value="" disabled>
                      ¿Qué necesitas?
                    </option>
                    {SERVICIOS.map((s) => (
                      <option key={s} value={s} className="text-slate-900">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelBase}>
                  <span className="text-slate-300">○</span> Presupuesto orientativo
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PRESUPUESTOS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setFormData({ ...formData, presupuesto: p })}
                      className={`px-3 py-2.5 rounded-xl text-xs font-semibold border-2 transition-all duration-200 ${
                        formData.presupuesto === p
                          ? "border-violet-500 bg-violet-50 text-violet-700 shadow-sm shadow-violet-500/10"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelBase}>
                  <span className="text-slate-300">○</span> Cuéntanos más
                </label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows={3}
                  placeholder="¿Qué problema quieres resolver? Cualquier detalle nos ayuda a preparar la llamada."
                  className={`${inputBase} resize-none`}
                />
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1 px-5 py-4 rounded-2xl text-sm font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 hover:text-slate-700 transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  Atrás
                </button>
                <button
                  type="submit"
                  disabled={status === "sending" || !formData.servicio}
                  className="group flex-1 relative bg-gradient-to-r from-amber-500 to-orange-500 text-black font-black py-4 px-6 rounded-2xl text-sm transition-all duration-300 hover:from-amber-400 hover:to-orange-400 hover:shadow-xl hover:shadow-amber-500/25 hover:scale-[1.02] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                  {status === "sending" ? (
                    <span className="relative z-10 flex items-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    <span className="relative z-10 flex items-center gap-2">
                      🚀 Solicitar análisis gratuito
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>

        {/* ═══ Footer ═══ */}
        <div className="px-6 sm:px-8 pb-5">
          {status === "error" && (
            <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-2xl p-4 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-red-700 text-xs font-bold">Error al enviar el formulario</p>
                <p className="text-red-500 text-[11px] mt-0.5">
                  Intenta de nuevo o llámanos al{" "}
                  <a href="tel:+34640791041" className="underline font-semibold">+34 640 791 041</a>
                </p>
              </div>
            </div>
          )}

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {[
              {
                icon: (
                  <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                label: "Datos protegidos",
              },
              {
                icon: (
                  <svg className="w-3.5 h-3.5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                label: "Sin compromiso",
              },
              {
                icon: (
                  <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                label: "Respuesta <24h",
              },
            ].map((badge) => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 bg-slate-50 rounded-full px-3 py-1.5 border border-slate-100"
              >
                {badge.icon}
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
