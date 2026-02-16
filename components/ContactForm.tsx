"use client";

import { useState, FormEvent } from "react";

const CALENDLY_URL = "https://calendly.com/neuriax/llamada";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    servicio: "",
  });
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
          email: formData.email,
          telefono: formData.telefono,
          mensaje: `Servicio interesado: ${formData.servicio || "No especificado"}`,
          type: "landing_contact",
        }),
      });

      if (!res.ok) throw new Error("Error enviando");

      setStatus("success");
      
      // Redirect to Calendly after 1.5s
      setTimeout(() => {
        window.open(CALENDLY_URL, "_blank");
      }, 1500);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-slate-900/50 border border-emerald-500/30 rounded-2xl p-8 max-w-md mx-auto text-center">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">¡Recibido!</h3>
        <p className="text-gray-300 mb-4">Te estoy redirigiendo a Calendly para que elijas tu horario ideal...</p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
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
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Tu nombre"
          required
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          className="w-full px-4 py-3.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
        />
        <input
          type="email"
          placeholder="Tu email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
        />
        <input
          type="tel"
          placeholder="Tu teléfono"
          value={formData.telefono}
          onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
          className="w-full px-4 py-3.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
        />
        <select
          value={formData.servicio}
          onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
          className="w-full px-4 py-3.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
        >
          <option value="">¿Qué te interesa?</option>
          <option value="agentes-voz">Agentes de Voz IA</option>
          <option value="automatizacion">Automatización IA</option>
          <option value="ambos">Ambos servicios</option>
        </select>
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/25 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
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
            "Solicitar llamada gratuita"
          )}
        </button>
      </form>
      {status === "error" && (
        <p className="text-red-400 text-sm mt-3 text-center">
          Error al enviar. Intenta de nuevo o llámanos directamente.
        </p>
      )}
      <p className="text-xs text-gray-500 mt-4 text-center">
        Sin spam. Sin compromiso. Respuesta en menos de 24h.
      </p>
    </div>
  );
}
