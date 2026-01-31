'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FormData {
  // Datos personales
  nombre: string;
  email: string;
  telefono: string;
  
  // Datos de la empresa
  nombreEmpresa: string;
  sector: string;
  urlActual: string;
  
  // Detalles del proyecto
  objetivo: string;
  servicioDestacado: string;
  colorPreferido: string;
  competencia: string;
  comentarios: string;
}

export default function DemoLandingPage() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    nombreEmpresa: '',
    sector: '',
    urlActual: '',
    objetivo: '',
    servicioDestacado: '',
    colorPreferido: '',
    competencia: '',
    comentarios: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const sectores = [
    'Peluquería / Estética',
    'Restaurante / Hostelería',
    'Clínica / Salud',
    'Consultoría / Servicios B2B',
    'Reformas / Construcción',
    'Inmobiliaria',
    'Fitness / Gimnasio',
    'Educación / Formación',
    'E-commerce / Tienda',
    'Otro'
  ];

  const objetivos = [
    'Captar más clientes',
    'Conseguir reservas/citas',
    'Generar presupuestos',
    'Vender un servicio específico',
    'Promocionar un evento',
    'Lanzar un nuevo negocio'
  ];

  const colores = [
    { name: 'Azul profesional', value: 'blue', class: 'bg-blue-500' },
    { name: 'Verde confianza', value: 'green', class: 'bg-emerald-500' },
    { name: 'Negro elegante', value: 'black', class: 'bg-gray-900' },
    { name: 'Naranja energético', value: 'orange', class: 'bg-orange-500' },
    { name: 'Rosa moderno', value: 'pink', class: 'bg-pink-500' },
    { name: 'Dorado premium', value: 'gold', class: 'bg-amber-500' },
    { name: 'Déjame elegir', value: 'auto', class: 'bg-gradient-to-r from-cyan-500 to-blue-500' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo: 'demo-landing',
          ...formData,
          fecha: new Date().toISOString()
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Error al enviar');
      }
    } catch (err) {
      setError('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo o contacta directamente al +34 640 791 041');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Animation */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center animate-bounce">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            ¡Solicitud recibida! 🎉
          </h1>
          
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-4xl">⏱️</span>
              <p className="text-2xl font-bold text-cyan-300">En menos de 48 horas</p>
            </div>
            <p className="text-xl text-gray-300">
              Recibirás en tu email <span className="text-white font-semibold">{formData.email}</span> una demo personalizada de tu landing page.
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">¿Qué pasa ahora?</h3>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-cyan-400 font-bold">1</span>
                </div>
                <p className="text-gray-300">Analizamos tu negocio y competencia</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-cyan-400 font-bold">2</span>
                </div>
                <p className="text-gray-300">Diseñamos una demo real de tu landing</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-cyan-400 font-bold">3</span>
                </div>
                <p className="text-gray-300">Te la enviamos por email en 48h</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-400 font-bold">4</span>
                </div>
                <p className="text-gray-300"><strong className="text-white">Solo pagas si te gusta</strong> - Sin compromiso</p>
              </div>
            </div>
          </div>

          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Banner Principal */}
        <div className="mb-10 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-cyan-500 to-blue-500 rounded-2xl blur opacity-30 animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-green-500/10 via-cyan-500/10 to-blue-500/10 border-2 border-green-500/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-6xl">🎁</div>
              <div className="text-center md:text-left flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Demo GRATIS en 48 horas
                </h2>
                <p className="text-gray-300 text-lg mb-3">
                  Rellena el formulario y recibe una demo real de tu landing page personalizada.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <span className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Sin pago por adelantado
                  </span>
                  <span className="inline-flex items-center gap-2 bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Solo pagas si te gusta
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Título */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Solicita tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Landing Page Demo</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Cuéntanos sobre tu negocio y en menos de 48 horas recibirás una demo personalizada. Sin compromiso.
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Sección 1: Datos personales */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white">Tus datos de contacto</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Ej: María García"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="tu@email.com"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-300 mb-2">
                  Teléfono (opcional - para dudas rápidas)
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="+34 600 000 000"
                />
              </div>
            </div>
          </div>

          {/* Sección 2: Datos de la empresa */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white">Sobre tu negocio</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nombreEmpresa" className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre de tu empresa/negocio *
                </label>
                <input
                  type="text"
                  id="nombreEmpresa"
                  name="nombreEmpresa"
                  value={formData.nombreEmpresa}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Ej: Peluquería María"
                />
              </div>
              
              <div>
                <label htmlFor="sector" className="block text-sm font-medium text-gray-300 mb-2">
                  Sector *
                </label>
                <select
                  id="sector"
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                >
                  <option value="">Selecciona tu sector</option>
                  {sectores.map(sector => (
                    <option key={sector} value={sector}>{sector}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="urlActual" className="block text-sm font-medium text-gray-300 mb-2">
                  Web actual (si tienes)
                </label>
                <input
                  type="url"
                  id="urlActual"
                  name="urlActual"
                  value={formData.urlActual}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="https://tuweb.com"
                />
              </div>
            </div>
          </div>

          {/* Sección 3: Detalles del proyecto */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white">Detalles para tu landing</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="objetivo" className="block text-sm font-medium text-gray-300 mb-2">
                  ¿Cuál es tu objetivo principal? *
                </label>
                <select
                  id="objetivo"
                  name="objetivo"
                  value={formData.objetivo}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                >
                  <option value="">¿Qué quieres conseguir?</option>
                  {objetivos.map(obj => (
                    <option key={obj} value={obj}>{obj}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="servicioDestacado" className="block text-sm font-medium text-gray-300 mb-2">
                  ¿Qué servicio o producto quieres destacar? *
                </label>
                <input
                  type="text"
                  id="servicioDestacado"
                  name="servicioDestacado"
                  value={formData.servicioDestacado}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Ej: Corte + peinado, Menú degustación, Consulta inicial..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  ¿Qué estilo de colores prefieres?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {colores.map(color => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, colorPreferido: color.value }))}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        formData.colorPreferido === color.value 
                          ? 'border-cyan-500 bg-cyan-500/10' 
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full ${color.class}`}></div>
                      <span className="text-xs text-gray-300 text-center">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="competencia" className="block text-sm font-medium text-gray-300 mb-2">
                  ¿Conoces algún competidor con buena web? (opcional)
                </label>
                <input
                  type="text"
                  id="competencia"
                  name="competencia"
                  value={formData.competencia}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="URL o nombre de un competidor que te guste"
                />
              </div>
              
              <div>
                <label htmlFor="comentarios" className="block text-sm font-medium text-gray-300 mb-2">
                  ¿Algo más que debamos saber?
                </label>
                <textarea
                  id="comentarios"
                  name="comentarios"
                  value={formData.comentarios}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                  placeholder="Colores de tu marca, estilo que te gusta, ideas que tengas..."
                />
              </div>
            </div>
          </div>

          {/* Recordatorio de beneficios */}
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <span className="text-3xl">💡</span>
              <div>
                <p className="text-white font-semibold mb-1">Recuerda: Sin riesgo para ti</p>
                <p className="text-gray-300 text-sm">
                  Recibirás la demo en 48h. Si te gusta, pagas <strong className="text-yellow-300">solo 350€</strong> (oferta hasta 25 feb). 
                  Si no te convence, no pagas nada. Así de simple.
                </p>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-300">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-8 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Enviando...
              </>
            ) : (
              <>
                Solicitar mi demo GRATIS
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>

          {/* Trust elements */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 pt-4">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Datos seguros
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Sin spam
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Respuesta en 48h
            </span>
          </div>
        </form>

        {/* Contacto alternativo */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-3">¿Prefieres hablar directamente?</p>
          <a href="tel:+34640791041" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +34 640 791 041
          </a>
        </div>
      </div>
    </div>
  );
}
