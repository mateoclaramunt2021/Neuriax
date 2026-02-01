'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  web: string;
  sector: string;
  empleados: string;
  necesidad: string;
  presupuesto: string;
  urgencia: string;
  comoNosConocio: string;
  mensaje: string;
  acepta: boolean;
}

export default function FormularioContacto() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    web: '',
    sector: '',
    empleados: '',
    necesidad: '',
    presupuesto: '',
    urgencia: '',
    comoNosConocio: '',
    mensaje: '',
    acepta: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
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
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          empresa: formData.empresa,
          sector: formData.sector,
          mensaje: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 FORMULARIO DE CONTACTO PREMIUM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 DATOS PERSONALES
• Nombre: ${formData.nombre}
• Email: ${formData.email}
• Teléfono: ${formData.telefono}

🏢 DATOS DE LA EMPRESA
• Empresa: ${formData.empresa || 'No especificado'}
• Web actual: ${formData.web || 'No tiene'}
• Sector: ${formData.sector || 'No especificado'}
• Tamaño: ${formData.empleados || 'No especificado'}

📌 PROYECTO
• Necesidad: ${formData.necesidad}
• Presupuesto: ${formData.presupuesto || 'No especificado'}
• Urgencia: ${formData.urgencia || 'No especificado'}

📣 ¿Cómo nos conoció?: ${formData.comoNosConocio || 'No especificado'}

💬 MENSAJE:
${formData.mensaje}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          `,
          type: 'contact_form'
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setError('Hubo un problema al enviar el formulario. Por favor, inténtalo de nuevo.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error de conexión. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const canProceedStep1 = formData.nombre && formData.email && formData.telefono;
  const canProceedStep2 = formData.necesidad;

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      {/* Ultra Premium Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Main gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-cyan-500/8 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-500/5 rounded-full blur-[180px]"></div>
        
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>

        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-1 h-1 bg-cyan-400/40 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-blue-400/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-cyan-300/40 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-20 w-2 h-2 bg-purple-400/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-emerald-400/30 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <div className="h-20"></div>

      <section className="relative py-8 md:py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link href="/contacto" className="inline-flex items-center gap-2 text-slate-600 hover:text-cyan-400 mb-10 transition-all text-sm group">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="opacity-70 group-hover:opacity-100 transition-opacity">Volver a contacto</span>
          </Link>

          {/* Main Card */}
          <div className="relative">
            {/* Outer glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-[2.5rem] blur-2xl opacity-60"></div>
            
            <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-950/98 to-slate-900/95 rounded-[2rem] shadow-2xl border border-white/[0.08] overflow-hidden backdrop-blur-3xl">
              
              {/* Exclusive Banner */}
              <div className="relative px-6 py-4 bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-amber-500/10 border-b border-amber-500/20">
                <div className="flex items-center justify-center gap-3 text-center">
                  <span className="text-xl">👑</span>
                  <p className="text-sm md:text-base">
                    <span className="text-amber-300 font-semibold">Solo para empresas que buscan resultados reales</span>
                    <span className="text-slate-400 hidden md:inline"> — No trabajamos con todos, trabajamos con los mejores</span>
                  </p>
                </div>
              </div>

              {/* Header Premium */}
              <div className="relative px-8 md:px-12 py-10 border-b border-white/[0.06] overflow-hidden">
                {/* Header background effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/[0.03] via-transparent to-blue-500/[0.03]"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
                
                <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex items-start gap-5">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/30 rotate-3 hover:rotate-0 transition-transform duration-500">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-lg border-2 border-slate-900 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Demuestra que tu negocio está listo para crecer</h1>
                      <p className="text-slate-400 text-sm md:text-base">Rellena el formulario completo y recibe una propuesta personalizada en 24h</p>
                    </div>
                  </div>
                  
                  {/* Step indicator */}
                  <div className="flex items-center gap-2">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                          currentStep === step 
                            ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30' 
                            : currentStep > step 
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-white/5 text-slate-500 border border-white/10'
                        }`}>
                          {currentStep > step ? (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : step}
                        </div>
                        {step < 3 && (
                          <div className={`w-6 h-0.5 mx-1 transition-all duration-300 ${currentStep > step ? 'bg-emerald-500/50' : 'bg-white/10'}`}></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8 md:p-12">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit}>
                    
                    {/* STEP 1: Datos personales */}
                    <div className={`space-y-6 ${currentStep === 1 ? 'block' : 'hidden'}`}>
                      <div className="mb-8">
                        <h2 className="text-lg font-semibold text-white flex items-center gap-3 mb-2">
                          <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </span>
                          Tus datos de contacto
                        </h2>
                        <p className="text-slate-500 text-sm ml-11">Para poder contactarte y enviarte la propuesta</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Nombre */}
                        <div className="md:col-span-2">
                          <label htmlFor="nombre" className="block text-sm font-medium text-slate-300 mb-2">
                            Nombre completo <span className="text-cyan-400">*</span>
                          </label>
                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                            <input
                              type="text"
                              id="nombre"
                              name="nombre"
                              value={formData.nombre}
                              onChange={handleChange}
                              required
                              placeholder="Tu nombre completo"
                              className="relative w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.05] transition-all"
                            />
                          </div>
                        </div>

                        {/* Email */}
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                            Email profesional <span className="text-cyan-400">*</span>
                          </label>
                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              placeholder="tu@email.com"
                              className="relative w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.05] transition-all"
                            />
                          </div>
                        </div>

                        {/* Teléfono */}
                        <div>
                          <label htmlFor="telefono" className="block text-sm font-medium text-slate-300 mb-2">
                            Teléfono / WhatsApp <span className="text-cyan-400">*</span>
                          </label>
                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                            <input
                              type="tel"
                              id="telefono"
                              name="telefono"
                              value={formData.telefono}
                              onChange={handleChange}
                              required
                              placeholder="+34 600 000 000"
                              className="relative w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.05] transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Navigation */}
                      <div className="flex justify-end pt-6">
                        <button
                          type="button"
                          onClick={nextStep}
                          disabled={!canProceedStep1}
                          className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          Siguiente
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* STEP 2: Empresa y necesidad */}
                    <div className={`space-y-6 ${currentStep === 2 ? 'block' : 'hidden'}`}>
                      <div className="mb-8">
                        <h2 className="text-lg font-semibold text-white flex items-center gap-3 mb-2">
                          <span className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </span>
                          Sobre tu empresa
                        </h2>
                        <p className="text-slate-500 text-sm ml-11">Cuéntanos sobre tu negocio para personalizar la propuesta</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Empresa */}
                        <div>
                          <label htmlFor="empresa" className="block text-sm font-medium text-slate-300 mb-2">
                            Nombre de la empresa
                          </label>
                          <input
                            type="text"
                            id="empresa"
                            name="empresa"
                            value={formData.empresa}
                            onChange={handleChange}
                            placeholder="Tu empresa o negocio"
                            className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.05] transition-all"
                          />
                        </div>

                        {/* Web */}
                        <div>
                          <label htmlFor="web" className="block text-sm font-medium text-slate-300 mb-2">
                            Web actual (si tienes)
                          </label>
                          <input
                            type="url"
                            id="web"
                            name="web"
                            value={formData.web}
                            onChange={handleChange}
                            placeholder="https://tuempresa.com"
                            className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.05] transition-all"
                          />
                        </div>

                        {/* Sector */}
                        <div>
                          <label htmlFor="sector" className="block text-sm font-medium text-slate-300 mb-2">
                            Sector
                          </label>
                          <select
                            id="sector"
                            name="sector"
                            value={formData.sector}
                            onChange={handleChange}
                            className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all appearance-none cursor-pointer"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5rem' }}
                          >
                            <option value="" className="bg-slate-900">Selecciona tu sector</option>
                            <option value="tecnologia" className="bg-slate-900">Tecnología / SaaS</option>
                            <option value="ecommerce" className="bg-slate-900">E-commerce / Retail</option>
                            <option value="servicios" className="bg-slate-900">Servicios profesionales</option>
                            <option value="salud" className="bg-slate-900">Salud / Bienestar</option>
                            <option value="hosteleria" className="bg-slate-900">Hostelería / Restauración</option>
                            <option value="inmobiliaria" className="bg-slate-900">Inmobiliaria</option>
                            <option value="educacion" className="bg-slate-900">Educación / Formación</option>
                            <option value="finanzas" className="bg-slate-900">Finanzas / Seguros</option>
                            <option value="industrial" className="bg-slate-900">Industrial / Manufactura</option>
                            <option value="otro" className="bg-slate-900">Otro</option>
                          </select>
                        </div>

                        {/* Empleados */}
                        <div>
                          <label htmlFor="empleados" className="block text-sm font-medium text-slate-300 mb-2">
                            Tamaño de la empresa
                          </label>
                          <select
                            id="empleados"
                            name="empleados"
                            value={formData.empleados}
                            onChange={handleChange}
                            className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all appearance-none cursor-pointer"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5rem' }}
                          >
                            <option value="" className="bg-slate-900">Selecciona</option>
                            <option value="solo" className="bg-slate-900">Solo yo / Freelance</option>
                            <option value="1-5" className="bg-slate-900">1-5 empleados</option>
                            <option value="6-20" className="bg-slate-900">6-20 empleados</option>
                            <option value="21-50" className="bg-slate-900">21-50 empleados</option>
                            <option value="50+" className="bg-slate-900">Más de 50 empleados</option>
                          </select>
                        </div>
                      </div>

                      {/* Necesidad - Full width */}
                      <div>
                        <label htmlFor="necesidad" className="block text-sm font-medium text-slate-300 mb-2">
                          ¿Qué necesitas? <span className="text-cyan-400">*</span>
                        </label>
                        <select
                          id="necesidad"
                          name="necesidad"
                          value={formData.necesidad}
                          onChange={handleChange}
                          required
                          className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all appearance-none cursor-pointer"
                          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5rem' }}
                        >
                          <option value="" className="bg-slate-900">¿Qué te gustaría conseguir?</option>
                          <option value="web-corporativa" className="bg-slate-900">🌐 Web corporativa profesional</option>
                          <option value="landing-page" className="bg-slate-900">🎯 Landing page de ventas</option>
                          <option value="ecommerce" className="bg-slate-900">🛒 Tienda online / E-commerce</option>
                          <option value="automatizacion" className="bg-slate-900">⚡ Automatización de procesos</option>
                          <option value="chatbot" className="bg-slate-900">🤖 Chatbot / Asistente IA</option>
                          <option value="seo" className="bg-slate-900">📈 Posicionamiento SEO</option>
                          <option value="rediseno" className="bg-slate-900">✨ Rediseño web existente</option>
                          <option value="consultoria" className="bg-slate-900">💡 Consultoría digital</option>
                          <option value="otro" className="bg-slate-900">🔧 Otro / Varios servicios</option>
                        </select>
                      </div>

                      {/* Navigation */}
                      <div className="flex justify-between pt-6">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="px-6 py-4 bg-white/5 hover:bg-white/10 text-slate-300 font-medium rounded-xl border border-white/10 hover:border-white/20 transition-all flex items-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                          </svg>
                          Anterior
                        </button>
                        <button
                          type="button"
                          onClick={nextStep}
                          disabled={!canProceedStep2}
                          className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          Siguiente
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* STEP 3: Detalles del proyecto */}
                    <div className={`space-y-6 ${currentStep === 3 ? 'block' : 'hidden'}`}>
                      <div className="mb-8">
                        <h2 className="text-lg font-semibold text-white flex items-center gap-3 mb-2">
                          <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </span>
                          Detalles finales
                        </h2>
                        <p className="text-slate-500 text-sm ml-11">Última información para preparar tu propuesta personalizada</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Presupuesto */}
                        <div>
                          <label htmlFor="presupuesto" className="block text-sm font-medium text-slate-300 mb-2">
                            Presupuesto aproximado
                          </label>
                          <select
                            id="presupuesto"
                            name="presupuesto"
                            value={formData.presupuesto}
                            onChange={handleChange}
                            className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all appearance-none cursor-pointer"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5rem' }}
                          >
                            <option value="" className="bg-slate-900">Selecciona un rango</option>
                            <option value="500-1500" className="bg-slate-900">500€ - 1.500€</option>
                            <option value="1500-3000" className="bg-slate-900">1.500€ - 3.000€</option>
                            <option value="3000-6000" className="bg-slate-900">3.000€ - 6.000€</option>
                            <option value="6000-10000" className="bg-slate-900">6.000€ - 10.000€</option>
                            <option value="10000+" className="bg-slate-900">Más de 10.000€</option>
                            <option value="flexible" className="bg-slate-900">Flexible / A consultar</option>
                          </select>
                        </div>

                        {/* Urgencia */}
                        <div>
                          <label htmlFor="urgencia" className="block text-sm font-medium text-slate-300 mb-2">
                            ¿Cuándo lo necesitas?
                          </label>
                          <select
                            id="urgencia"
                            name="urgencia"
                            value={formData.urgencia}
                            onChange={handleChange}
                            className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all appearance-none cursor-pointer"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5rem' }}
                          >
                            <option value="" className="bg-slate-900">Selecciona</option>
                            <option value="urgente" className="bg-slate-900">🔴 Lo antes posible (urgente)</option>
                            <option value="1mes" className="bg-slate-900">🟡 En el próximo mes</option>
                            <option value="2-3meses" className="bg-slate-900">🟢 En 2-3 meses</option>
                            <option value="explorando" className="bg-slate-900">🔵 Solo estoy explorando opciones</option>
                          </select>
                        </div>

                        {/* Cómo nos conoció */}
                        <div className="md:col-span-2">
                          <label htmlFor="comoNosConocio" className="block text-sm font-medium text-slate-300 mb-2">
                            ¿Cómo nos conociste?
                          </label>
                          <select
                            id="comoNosConocio"
                            name="comoNosConocio"
                            value={formData.comoNosConocio}
                            onChange={handleChange}
                            className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all appearance-none cursor-pointer"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5rem' }}
                          >
                            <option value="" className="bg-slate-900">Selecciona</option>
                            <option value="google" className="bg-slate-900">Google / Buscador</option>
                            <option value="redes" className="bg-slate-900">Redes sociales</option>
                            <option value="recomendacion" className="bg-slate-900">Recomendación</option>
                            <option value="linkedin" className="bg-slate-900">LinkedIn</option>
                            <option value="tiktok" className="bg-slate-900">TikTok</option>
                            <option value="publicidad" className="bg-slate-900">Publicidad online</option>
                            <option value="otro" className="bg-slate-900">Otro</option>
                          </select>
                        </div>
                      </div>

                      {/* Mensaje */}
                      <div>
                        <label htmlFor="mensaje" className="block text-sm font-medium text-slate-300 mb-2">
                          Cuéntanos más sobre tu proyecto <span className="text-cyan-400">*</span>
                        </label>
                        <textarea
                          id="mensaje"
                          name="mensaje"
                          value={formData.mensaje}
                          onChange={handleChange}
                          required
                          rows={5}
                          placeholder="Describe tu situación actual, qué te gustaría conseguir, cualquier detalle que nos ayude a preparar una propuesta personalizada..."
                          className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.05] transition-all resize-none"
                        />
                      </div>

                      {/* Checkbox RGPD */}
                      <div className="p-5 bg-white/[0.02] rounded-xl border border-white/5">
                        <label className="flex items-start gap-4 cursor-pointer group">
                          <input
                            type="checkbox"
                            name="acepta"
                            checked={formData.acepta}
                            onChange={handleChange}
                            required
                            className="mt-0.5 w-5 h-5 rounded border-slate-600 bg-white/5 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                          />
                          <span className="text-sm text-slate-400 leading-relaxed">
                            He leído y acepto la{' '}
                            <a href="/politica-de-privacidad" target="_blank" className="text-cyan-400 hover:underline">
                              política de privacidad
                            </a>{' '}
                            y consiento el tratamiento de mis datos personales para recibir información sobre los servicios solicitados y comunicaciones comerciales relacionadas. <span className="text-cyan-400">*</span>
                          </span>
                        </label>
                      </div>

                      {/* Error Message */}
                      {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-3">
                          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {error}
                        </div>
                      )}

                      {/* Navigation */}
                      <div className="flex justify-between pt-6">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="px-6 py-4 bg-white/5 hover:bg-white/10 text-slate-300 font-medium rounded-xl border border-white/10 hover:border-white/20 transition-all flex items-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                          </svg>
                          Anterior
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting || !formData.acepta || !formData.mensaje}
                          className="group relative px-10 py-4 overflow-hidden rounded-xl font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:from-cyan-400 group-hover:to-blue-500 transition-all"></div>
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                          </div>
                          <span className="relative flex items-center gap-2 text-white">
                            {isSubmitting ? (
                              <>
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Enviando...
                              </>
                            ) : (
                              <>
                                Enviar solicitud
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </>
                            )}
                          </span>
                        </button>
                      </div>
                    </div>

                  </form>
                ) : (
                  /* Success State */
                  <div className="text-center py-12">
                    <div className="relative inline-block mb-8">
                      <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-2xl animate-pulse"></div>
                      <div className="relative w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-2xl shadow-emerald-500/40">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-white mb-4">¡Solicitud enviada!</h2>
                    <p className="text-slate-400 mb-8 max-w-lg mx-auto text-lg">
                      Hemos recibido tu información. Te contactaremos en las próximas <strong className="text-white">24 horas</strong> con una propuesta personalizada.
                    </p>
                    
                    <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl px-6 py-4 mb-10">
                      <span className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></span>
                      <span className="text-emerald-300 font-medium">Revisa tu bandeja de entrada (y spam)</span>
                    </div>
                    
                    <div className="pt-8 border-t border-white/10">
                      <p className="text-slate-500 mb-6">¿Prefieres hablar directamente?</p>
                      <a
                        href="https://calendly.com/neuriax/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 text-white font-medium rounded-xl transition-all group"
                      >
                        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Agendar videollamada gratuita</span>
                        <svg className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16">
            <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-600">
              <span className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span>Datos 100% seguros</span>
              </span>
              <span className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>Respuesta en 24h</span>
              </span>
              <span className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span>Sin compromiso</span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
