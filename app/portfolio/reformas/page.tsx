'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ReformasDemo() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    zona: "",
    tipoReforma: "",
    metrosCuadrados: "",
    plazo: "",
    mensaje: ""
  });

  const servicios = [
    {
      titulo: "Reforma Integral",
      includes: ["Redistribución de espacios", "Instalaciones nuevas"],
      plazo: "3–4 meses"
    },
    {
      titulo: "Cocinas",
      includes: ["Muebles y electrodomésticos", "Encimera y revestimiento"],
      plazo: "3–5 semanas"
    },
    {
      titulo: "Baños",
      includes: ["Cambio de sanitarios", "Alicatado y suelos"],
      plazo: "2–3 semanas"
    },
    {
      titulo: "Interiorismo",
      includes: ["Diseño y asesoría", "Ejecución supervisada"],
      plazo: "1–2 meses"
    },
    {
      titulo: "Electricidad & Fontanería",
      includes: ["Instalaciones nuevas", "Normativa ITC y CTE"],
      plazo: "2–3 semanas"
    },
    {
      titulo: "Acabados Premium",
      includes: ["Pintura decorativa", "Suelos y revestimientos"],
      plazo: "1–2 semanas"
    }
  ];

  const proyectos = [
    {
      nombre: "Apartamento Centro, 92 m²",
      tipo: "Reforma integral",
      metros: 92,
      duracion: "14 semanas",
      zona: "Salamanca, Madrid",
      año: 2023,
      imagen: "/demos/reformas/apartamento-centro.jpg"
    },
    {
      nombre: "Cocina Gourmet + Salón Abierto",
      tipo: "Reforma + interiorismo",
      metros: 45,
      duracion: "8 semanas",
      zona: "Chamberí, Madrid",
      año: 2024,
      imagen: "/demos/reformas/cocina-gourmet.jpg"
    },
    {
      nombre: "Suite Baño + Dormitorio Principal",
      tipo: "Baño + acabados",
      metros: 28,
      duracion: "5 semanas",
      zona: "Paseo de Gracia, Barcelona",
      año: 2024,
      imagen: "/demos/reformas/bano-suite.jpg"
    },
    {
      nombre: "Loft Industrial Rehabilitado",
      tipo: "Reforma integral",
      metros: 150,
      duracion: "20 semanas",
      zona: "Eixample, Barcelona",
      año: 2023,
      imagen: "/demos/reformas/loft-rehabilitado.jpg"
    },
    {
      nombre: "Casa unifamiliar + Terraza",
      tipo: "Reforma + exteriors",
      metros: 180,
      duracion: "18 semanas",
      zona: "Pozuelo, Madrid",
      año: 2023,
      imagen: "/demos/reformas/casa-unifamiliar.jpg"
    }
  ];

  const pasos = [
    {
      numero: "01",
      titulo: "Visita & Medición",
      desc: "Inspección completa, planos, toma de medidas. Sin compromiso."
    },
    {
      numero: "02",
      titulo: "Presupuesto Cerrado",
      desc: "Desglose por partidas, plazo garantizado, sin sorpresas."
    },
    {
      numero: "03",
      titulo: "Planificación & Licencias",
      desc: "Planning de obra, permisos y coordinación con gremios."
    },
    {
      numero: "04",
      titulo: "Ejecución & Control",
      desc: "Equipo propio, reportes semanales, control de calidad."
    },
    {
      numero: "05",
      titulo: "Entrega & Garantía",
      desc: "Inspección final, documentación completa, 2 años de garantía."
    }
  ];

  const calidades = [
    {
      categoria: "Suelos",
      opciones: [
        { nombre: "Gres porcelánico mate", especificacion: "60×60 cm, resistencia R10" },
        { nombre: "Parquet roble europeo", especificacion: "Macizo 20 mm, barniz mate" },
        { nombre: "Microcemento alisado", especificacion: "3–5 mm, sellado 2K" }
      ]
    },
    {
      categoria: "Pintura",
      opciones: [
        { nombre: "Pintura plástica BIO premium", especificacion: "Blanco roto mate, 2 capas" },
        { nombre: "Pintura acrílica lavable", especificacion: "Tráfico medio, antimoho" },
        { nombre: "Acabado cemento/hormigón", especificacion: "Efecto industrial pulido" }
      ]
    },
    {
      categoria: "Baños",
      opciones: [
        { nombre: "Sanitarios porcelana blanca", especificacion: "Inodoro suspendido + bidé" },
        { nombre: "Grifo cascada cromado", especificacion: "Caño fijo, válvula termostática" },
        { nombre: "Mamparas cristal 8 mm", especificacion: "Templado, perfilería aluminio" }
      ]
    },
    {
      categoria: "Cocina",
      opciones: [
        { nombre: "Muebles lacados blanco brillo", especificacion: "Tableros 18 mm, tiradores ocultos" },
        { nombre: "Encimera cuarzo compacto", especificacion: "2000×650×40 mm, anti bacterias" },
        { nombre: "Salpicadero azulejo 10×10", especificacion: "Blanco mate, rejuntado epoxi" }
      ]
    },
    {
      categoria: "Iluminación",
      opciones: [
        { nombre: "Spots downlight LED 5W", especificacion: "3000K, 230V, aro aluminio" },
        { nombre: "Panel LED cuadrado 60×60", especificacion: "4000K, regulable 1–10V" },
        { nombre: "Luminaria suspensión aluminio", especificacion: "Negro mate, LED integrado" }
      ]
    }
  ];

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mensaje = `Presupuesto solicitado: ${formData.nombre} - ${formData.telefono} - Tipo: ${formData.tipoReforma} - ${formData.metrosCuadrados} m²`;
    const whatsappUrl = `https://wa.me/34631415151?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header Neuriax */}
      <header className="bg-gray-900 text-white px-6 py-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition-colors">
            🧠 Neuriax
          </Link>
          <nav className="flex gap-6 text-sm">
            <Link href="/portfolio" className="hover:text-gray-300 transition-colors">Portfolio</Link>
            <Link href="/" className="hover:text-gray-300 transition-colors">Inicio</Link>
          </nav>
        </div>
      </header>

      {/* Banner de DEMO - Fijo */}
      <div className="fixed top-0 left-0 right-0 z-40 w-full bg-blue-100 border-b-4 border-blue-400 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="flex items-start gap-4 w-full">
            <div className="text-3xl flex-shrink-0">⚠️</div>
            <div className="text-center flex-1">
              <p className="font-bold text-lg text-blue-900">ESTA ES UNA PÁGINA DE DEMOSTRACIÓN</p>
              <p className="text-sm text-blue-800 mt-2">
                Las imágenes mostradas son genéricas y de ejemplo. Este es un diseño de demostración para mostrar la estructura y funcionalidad de un sitio web para empresas de reformas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Espaciador para el banner fijo */}
      <div className="h-40"></div>

      {/* ====== HERO ====== */}
      <section className="relative px-6 py-32 border-b border-gray-200 overflow-hidden">
        {/* Imagen de fondo */}
        <div className="absolute inset-0">
          <img src="/demos/reformas/cocina-gourmet.jpg" alt="Reforma cocina gourmet" className="w-full h-full object-cover" />
          {/* Overlay oscuro para legibilidad */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Contenido */}
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Encabezado */}
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              Reformas integrales con presupuesto cerrado y plazos garantizados.
            </h1>
            <p className="text-xl text-gray-100 mb-10 leading-relaxed max-w-2xl font-light">
              Coordinación de gremios, control de obra y acabados duraderos. Equipo propio, transparencia total, 10 años de experiencia.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <a href="#presupuesto" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-semibold transition-colors text-center shadow-lg">
                Pedir presupuesto
              </a>
              <a href="#proyectos" className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-md font-semibold transition-colors text-center shadow-lg">
                Ver proyectos
              </a>
            </div>

            {/* Métricas */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/30 pt-10">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">+120</span>
                <span className="text-sm text-gray-100 mt-1">Obras completadas</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">10</span>
                <span className="text-sm text-gray-100 mt-1">Años de experiencia</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">Equipo</span>
                <span className="text-sm text-gray-100 mt-1">Propio y coordinado</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">2 años</span>
                <span className="text-sm text-gray-100 mt-1">Garantía completa</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== SERVICIOS ====== */}
      <section className="px-6 py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16">Servicios especializados</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicios.map((servicio, idx) => (
              <div key={idx} className="border border-gray-300 rounded-md p-8 bg-white hover:border-blue-400 transition-colors">
                <h3 className="text-xl font-bold text-gray-900 mb-6">{servicio.titulo}</h3>
                
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Incluye</p>
                  <ul className="space-y-2">
                    {servicio.includes.map((item, i) => (
                      <li key={i} className="text-gray-700 flex items-start">
                        <span className="text-blue-700 mr-3 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Plazo medio</p>
                  <p className="text-lg font-semibold text-gray-900">{servicio.plazo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== PROCESO ====== */}
      <section className="px-6 py-20 border-b border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Proceso de trabajo</h2>
          <p className="text-gray-600 mb-16 max-w-2xl">De la consulta inicial a la entrega final, cada paso cuenta. Transparencia y control en todo momento.</p>

          <div className="grid md:grid-cols-5 gap-0 mb-12 border border-gray-300 bg-white rounded-md overflow-hidden">
            {pasos.map((paso, idx) => (
              <div key={idx} className={`p-8 border-r border-gray-300 last:border-r-0 flex flex-col ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="text-4xl font-bold text-blue-700 mb-4">{paso.numero}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{paso.titulo}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{paso.desc}</p>
              </div>
            ))}
          </div>

          {/* Qué entregamos */}
          <div className="bg-white border border-gray-300 rounded-md p-8 mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Qué entregamos en cada proyecto</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <p className="font-semibold text-gray-900 mb-3">Planning de obra</p>
                <p className="text-gray-600 text-sm">Cronograma detallado semana a semana con hitos clave.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-3">Memoria de calidades</p>
                <p className="text-gray-600 text-sm">Especificaciones técnicas de todos los materiales e instalaciones.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-3">Presupuesto desglosado</p>
                <p className="text-gray-600 text-sm">Partidas por concepto, sin sorpresas ni costes ocultos.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== PROYECTOS ====== */}
      <section id="proyectos" className="px-6 py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16">Proyectos destacados</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {proyectos.map((proyecto, idx) => (
              <div key={idx} className="border border-gray-300 rounded-md overflow-hidden hover:border-blue-400 transition-colors bg-white">
                {/* Imagen */}
                <div className="h-40 bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center text-6xl border-b border-gray-300 overflow-hidden">
                  {proyecto.imagen.startsWith("/") ? (
                    <img src={proyecto.imagen} alt={proyecto.nombre} className="w-full h-full object-cover" />
                  ) : (
                    proyecto.imagen
                  )}
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{proyecto.nombre}</h3>
                  <p className="text-sm font-semibold text-blue-700 mb-4 uppercase tracking-wide">{proyecto.tipo}</p>

                  {/* Grilla de datos */}
                  <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-200">
                    <div>
                      <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Metros cuadrados</p>
                      <p className="text-lg font-bold text-gray-900">{proyecto.metros} m²</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Duración</p>
                      <p className="text-lg font-bold text-gray-900">{proyecto.duracion}</p>
                    </div>
                  </div>

                  {/* Zona y año */}
                  <div className="pt-4 space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-semibold text-gray-600 uppercase mt-0.5">📍</span>
                      <span className="text-sm text-gray-700">{proyecto.zona}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-semibold text-gray-600 uppercase mt-0.5">📅</span>
                      <span className="text-sm text-gray-700">{proyecto.año}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== MEMORIA DE CALIDADES ====== */}
      <section className="px-6 py-20 border-b border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Memoria de calidades</h2>
          <p className="text-gray-600 mb-12 max-w-2xl">Opciones de materiales y acabados para cada elemento constructivo.</p>

          <div className="space-y-8">
            {calidades.map((seccion, idx) => (
              <div key={idx} className="bg-white border border-gray-300 rounded-md overflow-hidden">
                {/* Encabezado */}
                <div className="bg-gray-100 px-8 py-4 border-b border-gray-300">
                  <h3 className="text-xl font-bold text-gray-900">{seccion.categoria}</h3>
                </div>

                {/* Tabla */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-300">
                      <tr>
                        <th className="px-8 py-3 font-semibold text-gray-900 text-base">Opción</th>
                        <th className="px-8 py-3 font-semibold text-gray-900 text-base">Especificación</th>
                      </tr>
                    </thead>
                    <tbody>
                      {seccion.opciones.map((opcion, i) => (
                        <tr key={i} className={`border-b border-gray-200 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                          <td className="px-8 py-4 font-semibold text-gray-900">{opcion.nombre}</td>
                          <td className="px-8 py-4 text-gray-600">{opcion.especificacion}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== PRESUPUESTO EN 24H ====== */}
      <section id="presupuesto" className="px-6 py-20 border-b border-gray-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Presupuesto en 24 horas</h2>
          <p className="text-gray-600 mb-12">Completa el formulario. Te responderemos con un presupuesto detallado sin compromiso.</p>

          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 border border-gray-300 rounded-md p-8">
            {/* Nombre y Tel */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Nombre completo</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleFormChange} required className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500" placeholder="Tu nombre" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Teléfono</label>
                <input type="tel" name="telefono" value={formData.telefono} onChange={handleFormChange} required className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500" placeholder="+34 6XX XXX XXX" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleFormChange} required className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500" placeholder="tu@email.com" />
            </div>

            {/* Zona y Tipo */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Zona / Barrio</label>
                <input type="text" name="zona" value={formData.zona} onChange={handleFormChange} required className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500" placeholder="Ej: Salamanca, Madrid" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Tipo de reforma</label>
                <select name="tipoReforma" value={formData.tipoReforma} onChange={handleFormChange} required className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:border-blue-500">
                  <option value="">Selecciona un tipo</option>
                  <option value="integral">Reforma integral</option>
                  <option value="cocina">Cocina</option>
                  <option value="baño">Baño</option>
                  <option value="interiorismo">Interiorismo</option>
                  <option value="acabados">Acabados</option>
                </select>
              </div>
            </div>

            {/* m² y Plazo */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Metros cuadrados aproximados</label>
                <input type="number" name="metrosCuadrados" value={formData.metrosCuadrados} onChange={handleFormChange} required className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500" placeholder="Ej: 75" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Plazo deseado</label>
                <select name="plazo" value={formData.plazo} onChange={handleFormChange} required className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:border-blue-500">
                  <option value="">Selecciona un plazo</option>
                  <option value="urgente">Lo antes posible (URGENTE)</option>
                  <option value="2-3meses">2–3 meses</option>
                  <option value="3-6meses">3–6 meses</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>

            {/* Mensaje */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Detalles adicionales</label>
              <textarea name="mensaje" value={formData.mensaje} onChange={handleFormChange} className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none" rows={4} placeholder="Describe brevemente tu proyecto (presupuesto aproximado, urgencia, etc.)" ></textarea>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button type="submit" className="flex-1 bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-md font-semibold transition-colors">
                📱 Enviar por WhatsApp
              </button>
              <a href="tel:+34631415151" className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 px-8 py-3 rounded-md font-semibold transition-colors text-center">
                ☎️ Llamar ahora
              </a>
            </div>
          </form>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="bg-gray-900 text-gray-300 px-6 py-12 text-sm border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-semibold text-white mb-2">NOVA Reformas</p>
          <p className="mb-4">Especialistas en reformas integrales con presupuesto cerrado y plazos garantizados.</p>
          <div className="border-t border-gray-700 pt-6 mt-6 text-xs text-gray-500">
            <p>Demo de portafolio creada por <Link href="/" className="text-blue-400 hover:underline">Neuriax</Link> • © 2025 NOVA Reformas</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
