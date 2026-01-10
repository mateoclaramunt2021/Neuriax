'use client';

import React, { useState } from 'react';

export default function Trabajo() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    posicion: '',
    experiencia: '',
    mensaje: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.posicion) newErrors.posicion = 'Selecciona una posición';
    if (!formData.mensaje.trim()) newErrors.mensaje = 'El mensaje es requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    validateForm();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitMessage('Por favor, corrige los errores en el formulario.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Enviar al API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('¡Tu postulación ha sido enviada exitosamente! Pronto recibirás un email de confirmación.');
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          posicion: '',
          experiencia: '',
          mensaje: ''
        });
      } else {
        setSubmitMessage('Error al enviar la postulación. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage('Error al enviar la postulación. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white py-24 px-6 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Únete a Nuestro Equipo
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Estamos buscando talento apasionado por la tecnología y la innovación. Si quieres formar parte de Neuriax, envíanos tu postulación.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-700">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Formulario de Postulación</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-slate-300 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    onBlur={() => handleBlur('nombre')}
                    required
                    className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${errors.nombre ? 'border-red-500' : 'border-slate-600'}`}
                    placeholder="Tu nombre completo"
                  />
                  {errors.nombre && <p className="mt-1 text-sm text-red-400">{errors.nombre}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    required
                    className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-slate-600'}`}
                    placeholder="tu@email.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-slate-300 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="+34 600 000 000"
                  />
                </div>

                <div>
                  <label htmlFor="posicion" className="block text-sm font-medium text-slate-300 mb-2">
                    Posición Deseada *
                  </label>
                  <select
                    id="posicion"
                    name="posicion"
                    value={formData.posicion}
                    onChange={handleChange}
                    onBlur={() => handleBlur('posicion')}
                    required
                    className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${errors.posicion ? 'border-red-500' : 'border-slate-600'}`}
                  >
                    <option value="">Selecciona una posición</option>
                    <option value="desarrollador">Desarrollador</option>
                    <option value="consultor">Consultor de Automatización</option>
                    <option value="analista">Analista de Datos</option>
                    <option value="marketing">Especialista en Marketing Digital</option>
                    <option value="otro">Otro</option>
                  </select>
                  {errors.posicion && <p className="mt-1 text-sm text-red-400">{errors.posicion}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="experiencia" className="block text-sm font-medium text-slate-300 mb-2">
                  Años de Experiencia
                </label>
                <select
                  id="experiencia"
                  name="experiencia"
                  value={formData.experiencia}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="">Selecciona experiencia</option>
                  <option value="0-1">0-1 años</option>
                  <option value="1-3">1-3 años</option>
                  <option value="3-5">3-5 años</option>
                  <option value="5+">Más de 5 años</option>
                </select>
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-slate-300 mb-2">
                  Cuéntanos sobre ti *
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  onBlur={() => handleBlur('mensaje')}
                  required
                  rows={6}
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none ${errors.mensaje ? 'border-red-500' : 'border-slate-600'}`}
                  placeholder="Describe tu experiencia, habilidades y por qué quieres unirte a Neuriax..."
                />
                {errors.mensaje && <p className="mt-1 text-sm text-red-400">{errors.mensaje}</p>}
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Postulación'}
                </button>
                {submitMessage && (
                  <p className={`mt-4 text-sm ${submitMessage.includes('exitosamente') ? 'text-green-400' : 'text-red-400'}`}>
                    {submitMessage}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}