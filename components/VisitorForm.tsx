'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function VisitorForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Insertar o actualizar visitante
      const { data, error } = await supabase
        .from('visitors')
        .upsert([
          {
            email: formData.email,
            nombre: formData.nombre,
            telefono: formData.telefono,
          },
        ])
        .select()

      if (error) throw error

      // Registrar evento de form_submit
      if (data && data[0]) {
        await supabase.from('visitor_events').insert([
          {
            visitor_id: data[0].id,
            pagina: typeof window !== 'undefined' ? window.location.pathname : '/',
            evento_tipo: 'form_submit',
            datos_adicionales: { formulario: 'visitante' },
          },
        ])
      }

      setSubmitted(true)
      setTimeout(() => {
        setIsOpen(false)
        setSubmitted(false)
        setFormData({ nombre: '', email: '', telefono: '' })
      }, 2000)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* BotÃ³n flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg z-40 transition-all duration-300"
        aria-label="Abrir formulario"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {/* Modal del formulario */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 bg-white rounded-lg shadow-xl p-6 w-80 z-50 animate-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Contacto</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              âœ•
            </button>
          </div>

          {submitted ? (
            <div className="text-center py-4">
              <p className="text-green-600 font-semibold">
                Â¡Gracias por tu informaciÃ³n!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                name="telefono"
                placeholder="TelÃ©fono (opcional)"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 rounded-md transition-colors"
              >
                {loading ? 'Enviando...' : 'Enviar'}
              </button>
            </form>
          )}
        </div>
      )}
    </>
  )
}

