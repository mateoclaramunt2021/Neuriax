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
  const [cvFile, setCvFile] = useState<File | null>(null);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setErrors({ ...errors, cv: 'Solo se permiten archivos PDF o Word' });
        return;
      }
      // Validar tamaño (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, cv: 'El archivo no puede superar 5MB' });
        return;
      }
      setCvFile(file);
      setErrors({ ...errors, cv: '' });
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
      // Crear FormData para enviar archivo
      const submitData = new FormData();
      submitData.append('nombre', formData.nombre);
      submitData.append('email', formData.email);
      submitData.append('telefono', formData.telefono);
      submitData.append('posicion', formData.posicion);
      submitData.append('experiencia', formData.experiencia);
      submitData.append('mensaje', formData.mensaje);
      if (cvFile) {
        submitData.append('cv', cvFile);
      }

      // Enviar al API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: submitData,
      });

      if (response.ok) {
        setSubmitMessage('!¡Tu postulación ha sido enviada exitosamente! Pronto recibirás un email de confirmación.');
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          posicion: '',
          experiencia: '',
          mensaje: ''
        });
        setCvFile(null);
      } else {
        setSubmitMessage('Error al enviar la postulaciÃ³n. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage('Error al enviar la postulaciÃ³n. Por favor, intenta de nuevo.');
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
            Estamos buscando talento apasionado por la tecnología e innovación. Si quieres formar parte de Neuriax, envíanos tu postulación.
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
                    Correo ElectrÃ³nico *
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
                    TelÃ©fono
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
                    PosiciÃ³n Deseada *
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
                    <option value="">Selecciona una posiciÃ³n</option>
                    <option value="desarrollador">Desarrollador</option>
                    <option value="consultor">Consultor de AutomatizaciÃ³n</option>
                    <option value="analista">Analista de Datos</option>
                    <option value="marketing">Especialista en Marketing Digital</option>
                    <option value="otro">Otro</option>
                  </select>
                  {errors.posicion && <p className="mt-1 text-sm text-red-400">{errors.posicion}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="experiencia" className="block text-sm font-medium text-slate-300 mb-2">
                  AÃ±os de Experiencia
                </label>
                <select
                  id="experiencia"
                  name="experiencia"
                  value={formData.experiencia}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="">Selecciona experiencia</option>
                  <option value="0-1">0-1 aÃ±os</option>
                  <option value="1-3">1-3 aÃ±os</option>
                  <option value="3-5">3-5 aÃ±os</option>
                  <option value="5+">MÃ¡s de 5 aÃ±os</option>
                </select>
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-slate-300 mb-2">
                  CuÃ©ntanos sobre ti *
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
                  placeholder="Describe tu experiencia, habilidades y por quÃ© quieres unirte a Neuriax..."
                />
                {errors.mensaje && <p className="mt-1 text-sm text-red-400">{errors.mensaje}</p>}
              </div>

              {/* Campo para subir CV */}
              <div>
                <label htmlFor="cv" className="block text-sm font-medium text-slate-300 mb-2">
                  Curriculum Vitae (PDF o Word, mÃ¡x. 5MB)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="cv"
                    name="cv"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="cv"
                    className={`flex items-center justify-center w-full px-4 py-4 bg-slate-700 border-2 border-dashed rounded-lg cursor-pointer hover:bg-slate-600 transition-colors ${errors.cv ? 'border-red-500' : 'border-slate-500'}`}
                  >
                    <div className="text-center">
                      <svg className="mx-auto h-10 w-10 text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      {cvFile ? (
                        <span className="text-cyan-400 font-medium">{cvFile.name}</span>
                      ) : (
                        <span className="text-slate-400">Haz clic para subir tu CV</span>
                      )}
                    </div>
                  </label>
                </div>
                {errors.cv && <p className="mt-1 text-sm text-red-400">{errors.cv}</p>}
                {cvFile && (
                  <button
                    type="button"
                    onClick={() => setCvFile(null)}
                    className="mt-2 text-sm text-red-400 hover:text-red-300"
                  >
                    âœ• Eliminar archivo
                  </button>
                )}
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar PostulaciÃ³n'}
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
