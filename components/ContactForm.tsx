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

const TAMAÑOS = [
  "1-5 empleados",
  "6-20 empleados",
  "21-50 empleados",
  "51-200 empleados",
  "+200 empleados",
];

const SERVICIOS = [
  "Automatización de procesos",
  "Chatbot / Asistente virtual con IA",
  "Desarrollo web / Landing pages",
  "CRM e integración de sistemas",
  "Análisis de datos / Business Intelligence",
  "Marketing automatizado",
  "Otro / No estoy seguro",
];

const PRESUPUESTOS = [
  "Menos de 500 €",
  "500 € – 2.000 €",
  "2.000 € – 5.000 €",
  "5.000 € – 15.000 €",
  "+15.000 €",
  "Prefiero hablarlo en la llamada",
];

const URGENCIAS = [
  "Lo antes posible",
  "En las próximas 2-4 semanas",
  "En 1-3 meses",
  "Estoy explorando opciones",
];

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    cargo: "",
    empresa: "",
    sector: "",
    tamano: "",
    webActual: "",
    servicio: "",
    presupuesto: "",
    urgencia: "",
    mensaje: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const canGoStep2 = formData.nombre && formData.email && formData.telefono;
  const canGoStep3 = formData.empresa && formData.sector && formData.tamano;

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
            `📋 SOLICITUD COMPLETA DE EMPRESAS`,
            ``,
            `👤 CONTACTO`,
            `Cargo: ${formData.cargo || "No especificado"}`,
            ``,
            `🏢 EMPRESA`,
            `Tamaño: ${formData.tamano}`,
            `Web actual: ${formData.webActual || "No tiene"}`,
            ``,
            `🎯 PROYECTO`,
            `Servicio: ${formData.servicio}`,
            `Presupuesto: ${formData.presupuesto}`,
            `Urgencia: ${formData.urgencia}`,
            ``,
            `💬 MENSAJE`,
            formData.mensaje || "Sin comentarios adicionales",
          ].join("\n"),
          type: "contact_form",
        }),
      });

      if (!res.ok) throw new Error("Error enviando");
      setStatus("success");

      setTimeout(() => {
        window.open(CALENDLY_URL, "_blank");
      }, 2000);
    } catch {
      setStatus("error");
    }
  };

  // ───── Estado de éxito ─────
  if (status === "success") {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg shadow-slate-900/5">
        {/* Header éxito */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-6 text-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-1">¡Solicitud recibida!</h3>
          <p className="text-emerald-50 text-sm">Tu consulta está siendo analizada por nuestro equipo</p>
        </div>

        <div className="px-8 py-6 space-y-5">
          {/* Confirmación email */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-slate-800">Email de confirmación enviado</p>
              <p className="text-xs text-slate-500 mt-0.5">Revisa tu bandeja en <strong>{formData.email}</strong></p>
            </div>
          </div>

          {/* Próximos pasos */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Próximos pasos</p>
            {[
              { icon: "📅", text: "Agenda tu llamada ahora en Calendly" },
              { icon: "🔍", text: "Analizaremos tu operación antes de la llamada" },
              { icon: "📊", text: "Recibirás una propuesta personalizada" },
            ].map((paso, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-slate-600">
                <span className="text-base">{paso.icon}</span>
                <span>{paso.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Calendly */}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white px-6 py-4 rounded-xl font-bold text-sm transition-all hover:bg-slate-800 hover:scale-[1.01] hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Agendar llamada estratégica gratuita
          </a>

          <p className="text-[11px] text-slate-400 text-center">
            Redirigiendo automáticamente a Calendly...
          </p>
        </div>
      </div>
    );
  }

  // ───── Formulario multi-step ─────
  const inputClass = "w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/15 transition-all text-sm";
  const selectClass = (hasValue: boolean) =>
    `${inputClass} ${hasValue ? "text-slate-900" : "text-slate-400"} appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20width%3d%2212%22%20height%3d%2212%22%20viewBox%3d%220%200%2012%2012%22%3e%3cpath%20fill%3d%22%2394a3b8%22%20d%3d%22M2%204l4%204%204-4%22%2f%3e%3c%2fsvg%3e')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat`;
  const labelClass = "block text-xs font-semibold text-slate-700 mb-1.5 tracking-wide";

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg shadow-slate-900/5">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-8 py-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-white">Solicitar análisis gratuito</h3>
          <span className="text-[11px] text-slate-400 font-mono">Paso {step}/3</span>
        </div>
        {/* Progress bar */}
        <div className="flex gap-1.5">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 rounded-full flex-1 transition-all duration-500 ${
                s <= step ? "bg-violet-400" : "bg-slate-700"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step labels */}
      <div className="px-8 pt-5 pb-1">
        <div className="flex items-center gap-2 mb-1">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
            step === 1 ? "bg-violet-500 text-white" : step > 1 ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
          }`}>
            {step > 1 ? "✓" : "1"}
          </div>
          <span className={`text-xs font-medium ${step === 1 ? "text-slate-900" : "text-slate-400"}`}>
            {step === 1 ? "Tus datos de contacto" : step === 2 ? "Datos de tu empresa" : "Detalles del proyecto"}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-8 pb-6">
        {/* ═══ STEP 1: Contacto ═══ */}
        {step === 1 && (
          <div className="space-y-4 pt-3 animate-in fade-in duration-300">
            <div>
              <label className={labelClass}>Nombre completo *</label>
              <input type="text" name="nombre" placeholder="Ej: María García López" required value={formData.nombre} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email corporativo *</label>
              <input type="email" name="email" placeholder="maria@tuempresa.com" required value={formData.email} onChange={handleChange} className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Teléfono *</label>
                <input type="tel" name="telefono" placeholder="+34 6XX XXX XXX" required value={formData.telefono} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Cargo en la empresa</label>
                <input type="text" name="cargo" placeholder="Ej: Director/a" value={formData.cargo} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            <button
              type="button"
              onClick={() => canGoStep2 && setStep(2)}
              disabled={!canGoStep2}
              className="w-full bg-slate-900 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all duration-300 hover:bg-slate-800 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              Siguiente: tu empresa
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        )}

        {/* ═══ STEP 2: Empresa ═══ */}
        {step === 2 && (
          <div className="space-y-4 pt-3 animate-in fade-in duration-300">
            <div>
              <label className={labelClass}>Nombre de la empresa *</label>
              <input type="text" name="empresa" placeholder="Ej: TuEmpresa S.L." required value={formData.empresa} onChange={handleChange} className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Sector *</label>
                <select name="sector" required value={formData.sector} onChange={handleChange} className={selectClass(!!formData.sector)}>
                  <option value="" disabled>Seleccionar</option>
                  {SECTORES.map((s) => (
                    <option key={s} value={s} className="text-slate-900">{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Tamaño *</label>
                <select name="tamano" required value={formData.tamano} onChange={handleChange} className={selectClass(!!formData.tamano)}>
                  <option value="" disabled>Empleados</option>
                  {TAMAÑOS.map((t) => (
                    <option key={t} value={t} className="text-slate-900">{t}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className={labelClass}>Web actual <span className="text-slate-400 font-normal">(opcional)</span></label>
              <input type="url" name="webActual" placeholder="https://tuempresa.com" value={formData.webActual} onChange={handleChange} className={inputClass} />
            </div>

            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-shrink-0 px-5 py-3.5 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                ← Atrás
              </button>
              <button
                type="button"
                onClick={() => canGoStep3 && setStep(3)}
                disabled={!canGoStep3}
                className="flex-1 bg-slate-900 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all duration-300 hover:bg-slate-800 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Siguiente: tu proyecto
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ═══ STEP 3: Proyecto ═══ */}
        {step === 3 && (
          <div className="space-y-4 pt-3 animate-in fade-in duration-300">
            <div>
              <label className={labelClass}>¿Qué servicio necesitas? *</label>
              <select name="servicio" required value={formData.servicio} onChange={handleChange} className={selectClass(!!formData.servicio)}>
                <option value="" disabled>Seleccionar servicio</option>
                {SERVICIOS.map((s) => (
                  <option key={s} value={s} className="text-slate-900">{s}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Presupuesto estimado</label>
                <select name="presupuesto" value={formData.presupuesto} onChange={handleChange} className={selectClass(!!formData.presupuesto)}>
                  <option value="" disabled>Seleccionar rango</option>
                  {PRESUPUESTOS.map((p) => (
                    <option key={p} value={p} className="text-slate-900">{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Urgencia</label>
                <select name="urgencia" value={formData.urgencia} onChange={handleChange} className={selectClass(!!formData.urgencia)}>
                  <option value="" disabled>Seleccionar plazo</option>
                  {URGENCIAS.map((u) => (
                    <option key={u} value={u} className="text-slate-900">{u}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className={labelClass}>Cuéntanos más sobre tu proyecto <span className="text-slate-400 font-normal">(opcional)</span></label>
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                rows={3}
                placeholder="¿Qué problema quieres resolver? ¿Qué herramientas usas actualmente? Cualquier detalle nos ayuda a preparar mejor la llamada."
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-shrink-0 px-5 py-3.5 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                ← Atrás
              </button>
              <button
                type="submit"
                disabled={status === "sending" || !formData.servicio}
                className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all duration-300 hover:from-violet-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-violet-500/20 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === "sending" ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Enviando solicitud...
                  </>
                ) : (
                  <>
                    Solicitar análisis gratuito
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Footer info */}
      <div className="px-8 pb-5">
        {status === "error" && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-3 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-600 text-xs">Error al enviar. Intenta de nuevo o llámanos al +34 640 791 041.</p>
          </div>
        )}
        <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            Datos protegidos
          </span>
          <span>·</span>
          <span>Sin compromiso</span>
          <span>·</span>
          <span>Respuesta &lt;24h</span>
        </div>
      </div>
    </div>
  );
}
