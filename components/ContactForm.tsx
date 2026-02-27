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
  "Otro",
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    sector: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
          mensaje: `Solicitud de llamada (empresa: ${formData.empresa}, sector: ${formData.sector})`,
          type: "contact_form",
        }),
      });

      if (!res.ok) throw new Error("Error enviando");
      setStatus("success");

      // Redirigir a Calendly para agendar llamada
      setTimeout(() => {
        window.open(CALENDLY_URL, "_blank");
      }, 1500);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
        <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">¡Solicitud recibida!</h3>
        <p className="text-slate-600 text-sm mb-2">Te hemos enviado un email de confirmación a <strong>{formData.email}</strong>.</p>
        <p className="text-slate-500 text-sm mb-5">Redirigiendo a Calendly para que elijas tu horario...</p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:bg-slate-800 hover:scale-[1.02]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Agendar llamada en Calendly
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg shadow-slate-900/5">
      <h3 className="text-lg font-bold text-slate-900 mb-1">Agenda tu llamada gratuita</h3>
      <p className="text-sm text-slate-500 mb-6">Cuéntanos sobre tu empresa. Te contactamos en menos de 24 h.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre */}
        <div>
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            required
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all text-sm"
          />
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email corporativo"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all text-sm"
          />
        </div>

        {/* Teléfono */}
        <div>
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono de contacto"
            required
            value={formData.telefono}
            onChange={handleChange}
            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all text-sm"
          />
        </div>

        {/* Empresa */}
        <div>
          <input
            type="text"
            name="empresa"
            placeholder="Nombre de tu empresa"
            required
            value={formData.empresa}
            onChange={handleChange}
            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all text-sm"
          />
        </div>

        {/* Sector */}
        <div>
          <select
            name="sector"
            required
            value={formData.sector}
            onChange={handleChange}
            className={`w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all ${formData.sector ? "text-slate-900" : "text-slate-400"}`}
          >
            <option value="" disabled>Sector de tu empresa</option>
            {SECTORES.map((s) => (
              <option key={s} value={s} className="text-slate-900">{s}</option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-slate-900 text-white font-bold py-4 px-6 rounded-xl text-base transition-all duration-300 hover:bg-slate-800 hover:scale-[1.01] hover:shadow-xl hover:shadow-slate-900/10 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "sending" ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Enviando...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Solicitar llamada gratuita
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          )}
        </button>
      </form>

      {status === "error" && (
        <p className="text-red-400 text-xs mt-3 text-center">
          Error al enviar. Intenta de nuevo o llámanos directamente.
        </p>
      )}
      <p className="text-[11px] text-slate-400 mt-4 text-center">
        Sin spam · Sin compromiso · Respuesta en menos de 24h
      </p>
    </div>
  );
}
