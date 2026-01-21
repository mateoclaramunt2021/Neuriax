'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

export default function FormularioContacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    sector: '',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          empresa: formData.empresa,
          sector: formData.sector,
          mensaje: formData.mensaje,
          type: 'contact_form'
        })
      });

      if (response.ok) {
        window.location.href = 'https://calendly.com/neuriax/15min';
      } else {
        alert('Hubo un error. Por favor intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white">
      <div className="h-16"></div>

      <section className="py-16 md:py-20 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Back Link */}
          <Link href="/contacto" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
            ← Volver a contacto
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Cuéntanos sobre tu negocio
            </h1>
            <p className="text-xl text-slate-300">
              Rellena el formulario y accede a Calendly para agendar tu llamada de 15–20 minutos
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-slate-700/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-semibold text-slate-200 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-200 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-semibold text-slate-200 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  placeholder="+34 640 791 041"
                />
              </div>

              <div>
                <label htmlFor="empresa" className="block text-sm font-semibold text-slate-200 mb-2">
                  Empresa *
                </label>
                <input
                  type="text"
                  id="empresa"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  placeholder="Nombre de tu empresa"
                />
              </div>

              <div>
                <label htmlFor="sector" className="block text-sm font-semibold text-slate-200 mb-2">
                  Sector *
                </label>
                <select
                  id="sector"
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                >
                  <option value="">Selecciona tu sector</option>
                  <option value="restaurante">Restaurante</option>
                  <option value="inmobiliaria">Inmobiliaria</option>
                  <option value="belleza">Belleza / Clínica</option>
                  <option value="servicios">Servicios Locales</option>
                  <option value="consultoria">Consultoría</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-semibold text-slate-200 mb-2">
                  ¿Qué procesos necesitas automatizar?
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                  placeholder="Cuéntanos brevemente..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? 'Procesando...' : 'Ir a Calendly →'}
              </button>

              <p className="text-sm text-slate-400 text-center">
                Al enviar, accederás a Calendly para agendar tu llamada de 15–20 minutos
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
