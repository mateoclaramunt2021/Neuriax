"use client";

import { useState, FormEvent } from "react";

const CALENDLY_URL = "https://calendly.com/neuriax/llamada";

export default function ContactForm() {
  const [formData, setFormData] = useState({ nombre: "", telefono: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: "",
          telefono: formData.telefono,
          mensaje: "Solicitud de llamada desde landing",
          type: "landing_contact",
        }),
      });

      if (!res.ok) throw new Error("Error enviando");
      setStatus("success");

      setTimeout(() => {
        window.open(CALENDLY_URL, "_blank");
      }, 1500);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white/[0.03] border border-emerald-500/20 rounded-2xl p-8 text-center">
        <div className="w-14 h-14 bg-emerald-500/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">¡Recibido!</h3>
        <p className="text-gray-400 text-sm mb-4">Redirigiendo a Calendly para elegir tu horario...</p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors"
        >
          Abrir Calendly ahora
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8">
      <h3 className="text-lg font-bold text-white mb-1">Agenda tu llamada gratuita</h3>
      <p className="text-sm text-gray-500 mb-6">Solo necesito tu nombre y teléfono. Te llamo yo.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Tu nombre"
            required
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all text-sm"
          />
        </div>
        <div>
          <input
            type="tel"
            placeholder="Tu teléfono"
            required
            value={formData.telefono}
            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
            className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-white text-black font-bold py-4 px-6 rounded-xl text-base transition-all duration-300 hover:bg-gray-100 hover:scale-[1.01] hover:shadow-xl hover:shadow-white/10 disabled:opacity-60 disabled:cursor-not-allowed"
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
      <p className="text-[11px] text-gray-600 mt-4 text-center">
        Sin spam · Sin compromiso · Respuesta en menos de 24h
      </p>
    </div>
  );
}
