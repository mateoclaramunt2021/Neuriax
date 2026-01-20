import { Metadata } from "next";
import CTAButton from "../../components/CTAButton";

export const metadata: Metadata = {
  title: "Tabla de Precios - Neuriax | Webs + AutomatizaciÃ³n",
  description: "Precios transparentes para pÃ¡ginas web profesionales y soluciones de automatizaciÃ³n. Desde 790â‚¬. Incluye dominio, hosting y soporte.",
  openGraph: {
    title: "Precios Neuriax - Webs y AutomatizaciÃ³n",
    description: "Tabla completa de precios, planes y servicios adicionales. Sin sorpresas, todo transparente.",
    url: "https://www.neuriax.com/precios",
  },
  alternates: {
    canonical: 'https://www.neuriax.com/precios',
  },
};

export default function PreciosPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="py-24 px-6 bg-gradient-to-br from-black via-slate-950 to-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Planes de web profesional
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Todas las soluciones incluyen calidad, soporte y dominio + hosting por 1 aÃ±o.
          </p>
        </div>
      </section>

      {/* Planes - Tarjetas principales */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* PLAN BÃSICO */}
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-2">BÃ¡sica</h3>
              <p className="text-gray-400 text-sm mb-6">Web profesional esencial</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">790â‚¬</span>
                <p className="text-gray-400 text-sm mt-2">Todo incluido</p>
              </div>
              <ul className="space-y-3 text-gray-300 mb-8 flex-grow">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">âœ“</span>
                  <span>Web One Page profesional</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">âœ“</span>
                  <span>DiseÃ±o responsive (mÃ³vil y escritorio)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">âœ“</span>
                  <span>InformaciÃ³n del negocio</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">âœ“</span>
                  <span>BotÃ³n WhatsApp y llamada</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">âœ“</span>
                  <span>Google Maps</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">âœ“</span>
                  <span>OptimizaciÃ³n bÃ¡sica de velocidad</span>
                </li>
              </ul>
              <CTAButton href="/contacto" size="lg" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                Empezar con web bÃ¡sica
              </CTAButton>
            </div>

            {/* PLAN PROFESIONAL */}
            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-lg p-8 border-2 border-cyan-500 relative flex flex-col">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Recomendada
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Profesional</h3>
              <p className="text-gray-300 text-sm mb-6">Web a medida orientada a conversiÃ³n</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-cyan-400">A CONSULTAR</span>
                <p className="text-cyan-300 text-sm mt-2">Presupuesto personalizado</p>
              </div>
              <ul className="space-y-3 text-gray-300 mb-8 flex-grow">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">âœ“</span>
                  <span>DiseÃ±o personalizado</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">âœ“</span>
                  <span>Varias pÃ¡ginas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">âœ“</span>
                  <span>Textos optimizados para ventas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">âœ“</span>
                  <span>SEO local</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">âœ“</span>
                  <span>IntegraciÃ³n de reservas o formularios</span>
                </li>
              </ul>
              <CTAButton href="/contacto" size="lg" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                Solicitar propuesta personalizada
              </CTAButton>
            </div>

            {/* PLAN PREMIUM */}
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
              <p className="text-gray-400 text-sm mb-6">Web avanzada + estrategia digital</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">A CONSULTAR</span>
                <p className="text-gray-400 text-sm mt-2">SoluciÃ³n a medida</p>
              </div>
              <ul className="space-y-3 text-gray-300 mb-8 flex-grow">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">âœ“</span>
                  <span>DiseÃ±o 100% a medida</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">âœ“</span>
                  <span>SEO avanzado</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">âœ“</span>
                  <span>Automatizaciones y captaciÃ³n de leads</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">âœ“</span>
                  <span>Integraciones avanzadas</span>
                </li>
              </ul>
              <CTAButton href="https://wa.me/34631415151?text=Hola%20Mateo,%20quiero%20conocer%20detalles%20del%20plan%20Premium" size="lg" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                Hablar con un experto
              </CTAButton>
            </div>
          </div>

          {/* Texto aclaratorio */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 text-center">
            <p className="text-gray-300 text-lg">
              <span className="font-semibold text-white">Cada negocio es distinto.</span> Los planes Profesional y Premium se presupuestan a medida segÃºn objetivos, sector y nivel de personalizaciÃ³n.
            </p>
          </div>
        </div>
      </section>

      {/* Ofertas especiales */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Planes mensuales - Boosts para tu negocio
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* OFERTA 1: WEB + SEO */}
            <div className="bg-gradient-to-br from-cyan-900/40 to-slate-900/40 rounded-lg p-8 border-2 border-cyan-500 hover:border-cyan-400 transition-colors relative">
              <div className="absolute -top-4 left-6 bg-cyan-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                POPULAR
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 mt-4">Web + SEO</h3>
              <p className="text-gray-300 text-sm mb-6">PÃ¡gina profesional con posicionamiento incluido</p>
              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-cyan-400">75â‚¬</span>
                  <span className="text-gray-400 ml-2">/mes</span>
                </div>
                <p className="text-gray-400 text-sm mt-2">Primer mes, luego se ajusta segÃºn necesidades</p>
              </div>
              <ul className="space-y-3 text-gray-300 mb-8">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">âœ“</span>
                  <span>PÃ¡gina web profesional</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">âœ“</span>
                  <span>SEO local incluido</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">âœ“</span>
                  <span>DiseÃ±o responsive</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">âœ“</span>
                  <span>Dominio + hosting 1 aÃ±o</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">âœ“</span>
                  <span>Soporte tÃ©cnico incluido</span>
                </li>
              </ul>
              <CTAButton href="/contacto" size="lg" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                Empezar ahora
              </CTAButton>
            </div>

            {/* OFERTA 2: WEB + SEO + IA */}
            <div className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 rounded-lg p-8 border-2 border-purple-500 hover:border-purple-400 transition-colors relative">
              <div className="absolute -top-4 right-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                RECOMENDADO
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 mt-4">Web + SEO + IA 24/7</h3>
              <p className="text-gray-300 text-sm mb-6">AutomatizaciÃ³n inteligente para captar y calificar leads</p>
              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-purple-400">desde 150â‚¬</span>
                  <span className="text-gray-400 ml-2">/mes</span>
                </div>
                <p className="text-gray-400 text-sm mt-2">Incluye todo del plan anterior +</p>
              </div>
              <ul className="space-y-3 text-gray-300 mb-8">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3 font-bold">âœ“</span>
                  <span>Todo lo del plan Web + SEO</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3 font-bold">âœ“</span>
                  <span>Bot WhatsApp inteligente con IA</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3 font-bold">âœ“</span>
                  <span>CaptaciÃ³n automÃ¡tica de leads 24/7</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3 font-bold">âœ“</span>
                  <span>CalificaciÃ³n inteligente de prospectos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3 font-bold">âœ“</span>
                  <span>Reportes automÃ¡ticos diarios</span>
                </li>
              </ul>
              <CTAButton href="/contacto" size="lg" className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                Agendar demo
              </CTAButton>
            </div>
          </div>

          {/* Nota aclaratoria */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 text-center">
            <p className="text-gray-300">
              <span className="text-cyan-400 font-semibold">Estos planes son flexibles:</span> puedes empezar con Web + SEO y agregar IA cuando lo necesites.
            </p>
          </div>
        </div>
      </section>

      {/* Servicios extras */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Servicios adicionales
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Dominio + Hosting anual", price: "120â‚¬", desc: "Primer aÃ±o incluido en cualquier plan. RenovaciÃ³n anual despuÃ©s." },
              { title: "Mantenimiento mensual", price: "49â‚¬/mes", desc: "Actualizaciones, cambios pequeÃ±os y soporte tÃ©cnico continuado." },
              { title: "Sistema de reservas online", price: "+150â‚¬", desc: "IntegraciÃ³n con calendario, confirmaciÃ³n automÃ¡tica por email/WhatsApp." },
              { title: "AutomatizaciÃ³n WhatsApp con IA", price: "desde 300â‚¬", desc: "Bot inteligente que responde consultas y califica leads automÃ¡ticamente." },
              { title: "SEO mensual", price: "desde 250â‚¬/mes", desc: "Posicionamiento avanzado, keywords, backlinks, mejora ranking mensual." },
              { title: "Multiidioma", price: "+200â‚¬", desc: "Web en 2 o mÃ¡s idiomas con cambio automÃ¡tico segÃºn localizaciÃ³n." },
              { title: "GalerÃ­a / Portafolio avanzado", price: "+100â‚¬", desc: "GalerÃ­a con filtros, zoom, lightbox y gestiÃ³n de categorÃ­as." },
              { title: "IntegraciÃ³n e-commerce", price: "+300â‚¬", desc: "Carrito, mÃ©todos de pago (Stripe, PayPal), gestiÃ³n de inventario." },
              // ...eliminado Blog / CMS...
            ].map((service, idx) => (
              <div key={idx} className="bg-gray-900 rounded-lg p-6 border border-gray-700 hover:border-cyan-500 transition-colors">
                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-cyan-400 font-semibold mb-3">{service.price}</p>
                <p className="text-gray-300">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso de precios */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            CÃ³mo funciona la presupuestaciÃ³n
          </h2>

          <div className="space-y-6">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">Plan BÃ¡sico</h3>
              <p className="text-gray-300">790â‚¬ - Precio fijo, incluye dominio + hosting 1 aÃ±o. Perfecto para comenzar.</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">Planes Profesional y Premium</h3>
              <p className="text-gray-300">Se presupuestan a medida segÃºn tus necesidades, sector y objetivos. Cada negocio es Ãºnico, y queremos que tu inversiÃ³n sea exacta y sin sorpresas.</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">Proceso</h3>
              <p className="text-gray-300">Agendar llamada â†’ AnÃ¡lisis personalizado â†’ Propuesta detallada â†’ ConfirmaciÃ³n â†’ Desarrollo 50-50 (pago inicial y final).</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">DespuÃ©s de la entrega</h3>
              <p className="text-gray-300">Soporte tÃ©cnico incluido 1 aÃ±o. Mantenimiento opcional: 49â‚¬/mes para actualizaciones continuas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* GarantÃ­a */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-xl p-12 border border-cyan-700/50">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                GarantÃ­a de satisfacciÃ³n
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Si en los primeros 30 dÃ­as tu web no cumple con lo acordado, reviso todo sin costo extra.
              </p>
              <p className="text-sm text-gray-400">
                Nos tomas en serio: quiero que tu web venda, porque si vende tu negocio, todos ganamos. ðŸ’ª
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6 bg-gradient-to-br from-black via-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Â¿Listo para tu web?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Agendemos 15 minutos para entender exactamente quÃ© necesitas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href="/contacto" size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
              Agendar llamada gratuita
            </CTAButton>
            <CTAButton href="https://wa.me/34631415151?text=Hola%20Mateo,%20quiero%20saber%20m%C3%A1s%20sobre%20mis%20opciones%20de%20web." variant="secondary" size="lg">
              WhatsApp
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}

