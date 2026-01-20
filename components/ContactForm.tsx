'use client';

import { useState } from 'react';

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  servicio: string;
  mensaje: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    servicio: 'consulta-general',
    mensaje: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const servicios = [
    { value: 'consulta-general', label: 'Consulta General' },
    { value: 'web-seo', label: 'Web + SEO (75€/mes)' },
    { value: 'web-seo-ia', label: 'Web + SEO + IA (desde 150€/mes)' },
    { value: 'automatizacion', label: 'Automatización' },
    { value: 'seo', label: 'SEO Avanzado' },
    { value: 'otro', label: 'Otro' },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Validación básica
      if (!formData.nombre || !formData.email || !formData.telefono) {
        setError('Por favor, completa todos los campos requeridos');
        setLoading(false);
        return;
      }

      // Enviar datos al API
      const response = await fetch('/api/send-contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      setSuccess(true);
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        servicio: 'consulta-general',
        mensaje: '',
      });

      // Redirigir a Calendly después de 2 segundos
      setTimeout(() => {
        window.location.href = `/contacto?name=${encodeURIComponent(
          formData.nombre
        )}&email=${encodeURIComponent(formData.email)}`;
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error al enviar el formulario'
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-8 border-2 border-green-500 text-center">
        <div className="flex justify-center mb-4">
          <svg
            className="w-16 h-16 text-green-400 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">¡Perfecto!</h3>
        <p className="text-green-300 mb-4">
          Hemos recibido tu solicitud. Te redirigimos a Calendly para que agendes tu cita...
        </p>
        <p className="text-sm text-gray-400">
          Si no se redirige automáticamente, haz clic aquí:{' '}
          <a
            href="/contacto"
            className="text-green-400 hover:underline font-semibold"
          >
            Ir a Calendly
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nombre */}
      <div>
        <label htmlFor="nombre" className="block text-sm font-semibold text-white mb-2">
          Nombre completo <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Tu nombre"
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
          Correo electrónico <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
          required
        />
      </div>

      {/* Teléfono */}
      <div>
        <label htmlFor="telefono" className="block text-sm font-semibold text-white mb-2">
          Teléfono <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="+34 600 000 000"
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
          required
        />
      </div>

      {/* Servicio */}
      <div>
        <label htmlFor="servicio" className="block text-sm font-semibold text-white mb-2">
          ¿Qué tipo de servicio te interesa?
        </label>
        <select
          id="servicio"
          name="servicio"
          value={formData.servicio}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
        >
          {servicios.map((svc) => (
            <option key={svc.value} value={svc.value}>
              {svc.label}
            </option>
          ))}
        </select>
      </div>

      {/* Mensaje */}
      <div>
        <label htmlFor="mensaje" className="block text-sm font-semibold text-white mb-2">
          Cuéntanos tu proyecto o pregunta
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          placeholder="Describe brevemente lo que necesitas..."
          rows={5}
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold rounded-lg shadow-lg transition-all flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Enviando...
          </>
        ) : (
          <>
            <span>Enviar y agendar cita</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </>
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Tus datos se guardarán de forma segura y los usaremos solo para contactarte.
      </p>
    </form>
  );
}

