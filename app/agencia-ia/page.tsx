import { Metadata } from "next";
import Link from "next/link";
import ContactForm from "../../components/ContactForm";
import ScrollReveal from "../../components/ScrollReveal";

export const metadata: Metadata = {
  title: "Agencia de IA #1 en España | Neuriax · Inteligencia Artificial para Empresas",
  description:
    "Neuriax es la agencia de IA líder en España. Especialistas en agentes IA conversacionales, chatbots inteligentes, automatización empresarial y agentes de voz. +50 empresas confían en nosotros. Implementación en 5 días. Consultoría gratuita.",
  keywords:
    "agencia de IA, agencia IA, agencias de IA, agencia inteligencia artificial, agencia de inteligencia artificial España, mejor agencia IA, agencia IA España, empresa IA, consultoría IA, agencia IA Madrid, agencia IA Barcelona, agencia IA Valencia, automatización IA, agentes de IA, chatbot IA empresa, agencia IA automatización, agencia machine learning, contratar agencia IA, agencia IA generativa, implementar IA empresa",
  alternates: {
    canonical: "https://www.neuriax.com/agencia-ia",
  },
  openGraph: {
    title: "Agencia de IA #1 en España | Neuriax",
    description:
      "La agencia de inteligencia artificial líder. Agentes IA, chatbots, automatización y soluciones a medida. +50 empresas. Resultados desde el primer mes.",
    url: "https://www.neuriax.com/agencia-ia",
    siteName: "Neuriax - Agencia de Inteligencia Artificial",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agencia de IA #1 en España | Neuriax",
    description:
      "Agencia de inteligencia artificial líder. Agentes IA conversacionales, automatización y más.",
  },
};

/* ─────────────────────────────────────────────── */
const SERVICES = [
  {
    icon: "🤖",
    title: "Agentes IA Conversacionales",
    desc: "Agentes de inteligencia artificial que atienden a tus clientes 24/7 por WhatsApp, web chat y redes sociales. Entienden contexto, resuelven dudas y convierten visitantes en clientes.",
    stats: "40-70% reducción costes atención",
  },
  {
    icon: "🎙️",
    title: "Agentes de Voz IA",
    desc: "Asistentes telefónicos con IA que contestan llamadas, agendan citas, toman pedidos y resuelven incidencias. Voz natural e indistinguible de un humano.",
    stats: "24/7 sin tiempos de espera",
  },
  {
    icon: "⚡",
    title: "Automatización Empresarial con IA",
    desc: "Automatizamos procesos repetitivos: cualificación de leads, email marketing, gestión de inventarios, facturación, reporting y más. Integración con +25 plataformas.",
    stats: "80% ahorro en tareas manuales",
  },
  {
    icon: "🧠",
    title: "Consultoría IA Estratégica",
    desc: "Auditamos tu negocio, identificamos oportunidades de IA y diseñamos una hoja de ruta personalizada. ROI garantizado desde el primer mes.",
    stats: "300% ROI medio primer año",
  },
  {
    icon: "🔧",
    title: "Desarrollo IA a Medida",
    desc: "Soluciones de inteligencia artificial personalizadas: modelos ML, NLP, RAG, integración de LLMs (GPT-4, Claude, Llama), fine-tuning y despliegue.",
    stats: "Tecnología enterprise-grade",
  },
  {
    icon: "📊",
    title: "IA para Marketing y Ventas",
    desc: "Campañas inteligentes, segmentación predictiva, lead scoring con IA, personalización de contenido y análisis de sentimiento en tiempo real.",
    stats: "25-50% más conversiones",
  },
];

const METHODOLOGY = [
  {
    step: "01",
    title: "Auditoría IA Gratuita",
    desc: "Analizamos tu negocio, procesos actuales y oportunidades de automatización con IA. Sin compromiso.",
    duration: "Día 1",
  },
  {
    step: "02",
    title: "Estrategia Personalizada",
    desc: "Diseñamos la solución IA perfecta para tu caso: qué automatizar, qué agente implementar y qué resultados esperar.",
    duration: "Día 2",
  },
  {
    step: "03",
    title: "Desarrollo e Integración",
    desc: "Construimos tu agente IA, lo entrenamos con tu información y lo integramos con tus herramientas existentes.",
    duration: "Días 3-4",
  },
  {
    step: "04",
    title: "Lanzamiento y Optimización",
    desc: "Activamos el sistema, monitorizamos resultados y optimizamos continuamente. Soporte dedicado incluido.",
    duration: "Día 5+",
  },
];

const RESULTS = [
  { metric: "+50", label: "Empresas confían en Neuriax" },
  { metric: "4.9/5", label: "Valoración media de clientes" },
  { metric: "5 días", label: "Implementación completa" },
  { metric: "300%", label: "ROI medio primer año" },
  { metric: "24/7", label: "Atención sin interrupciones" },
  { metric: "-60%", label: "Reducción costes operativos" },
];

const SECTORS = [
  { name: "Clínicas y Salud", icon: "🏥", href: "/landings/clinica" },
  { name: "Restaurantes", icon: "🍽️", href: "/landings/restaurante" },
  { name: "Consultorías", icon: "💼", href: "/landings/consultoria" },
  { name: "Peluquerías", icon: "💇", href: "/landings/peluqueria" },
  { name: "Reformas", icon: "🏗️", href: "/landings/reformas" },
  { name: "E-commerce", icon: "🛒", href: "/sectores" },
  { name: "Inmobiliarias", icon: "🏠", href: "/sectores" },
  { name: "Educación", icon: "📚", href: "/sectores" },
  { name: "Legal", icon: "⚖️", href: "/sectores" },
  { name: "Logística", icon: "🚚", href: "/sectores" },
  { name: "Seguros", icon: "🛡️", href: "/sectores" },
  { name: "Turismo", icon: "✈️", href: "/sectores" },
];

const FAQ_DATA = [
  {
    q: "¿Qué es una agencia de IA?",
    a: "Una agencia de IA (inteligencia artificial) es una empresa especializada en diseñar, desarrollar e implementar soluciones basadas en inteligencia artificial para otras empresas. A diferencia de una consultora tradicional, una agencia de IA como Neuriax no solo asesora, sino que construye y despliega los sistemas: agentes conversacionales, chatbots inteligentes, automatización de procesos, agentes de voz y modelos de machine learning personalizados.",
  },
  {
    q: "¿Cuánto cuesta contratar una agencia de inteligencia artificial?",
    a: "Los precios de una agencia de IA varían según la complejidad del proyecto. En Neuriax, los agentes IA conversacionales empiezan desde 790€/mes, la automatización empresarial desde 1.500€ y las soluciones enterprise a medida desde 3.000€. Ofrecemos una consultoría inicial gratuita para evaluar tu caso y darte un presupuesto exacto sin compromiso.",
  },
  {
    q: "¿Cuál es la mejor agencia de IA en España?",
    a: "Neuriax es reconocida como una de las mejores agencias de IA en España por su enfoque en resultados medibles, implementación ultra-rápida (5 días laborables) y especialización en agentes IA conversacionales. Con más de 50 empresas atendidas, una valoración de 4.9/5 y un ROI medio del 300% en el primer año, combinamos tecnología de vanguardia con un servicio cercano y personalizado.",
  },
  {
    q: "¿Qué servicios ofrece una agencia de IA?",
    a: "Una agencia de IA completa como Neuriax ofrece: 1) Agentes IA conversacionales para atención al cliente 24/7, 2) Agentes de voz IA para atención telefónica, 3) Chatbots inteligentes para WhatsApp, web y redes sociales, 4) Automatización de procesos empresariales, 5) Consultoría estratégica en IA, 6) Desarrollo de soluciones IA a medida con GPT, LLMs y machine learning, 7) IA aplicada a marketing y ventas.",
  },
  {
    q: "¿Cómo implementar inteligencia artificial en mi empresa?",
    a: "El proceso con Neuriax es sencillo: 1) Solicitas una consultoría gratuita, 2) Auditamos tus procesos e identificamos oportunidades, 3) Diseñamos una estrategia IA personalizada, 4) Desarrollamos e integramos la solución en 5 días, 5) Monitorizamos y optimizamos continuamente. No necesitas conocimientos técnicos: nos encargamos de todo.",
  },
  {
    q: "¿Qué es un agente de IA conversacional?",
    a: "Un agente de IA conversacional es un sistema de inteligencia artificial avanzado que mantiene conversaciones naturales con humanos por texto o voz. A diferencia de un chatbot con reglas, un agente IA entiende el contexto, recuerda conversaciones previas, aprende de cada interacción y puede ejecutar acciones reales: agendar citas, procesar pedidos, resolver incidencias, cualificar leads y más.",
  },
  {
    q: "¿En cuánto tiempo se ven resultados con IA?",
    a: "Con Neuriax, los resultados son inmediatos. La implementación básica toma 5 días laborables y desde el primer día en producción se ven mejoras: reducción de tiempos de respuesta, atención 24/7, cualificación automática de leads. En el primer mes, nuestros clientes reportan una reducción del 40-70% en costes de atención al cliente y un aumento del 25-50% en conversiones.",
  },
  {
    q: "¿Neuriax trabaja solo en España o también internacionalmente?",
    a: "Neuriax es una agencia de IA con sede en España que atiende clientes en toda la Península Ibérica (Madrid, Barcelona, Valencia, Sevilla, Bilbao...) y Latinoamérica (México, Colombia, Argentina, Chile, Perú). Trabajamos de forma remota y presencial, adaptándonos a las necesidades de cada proyecto.",
  },
  {
    q: "¿Qué diferencia a Neuriax de otras agencias de IA?",
    a: "Neuriax se diferencia en: 1) Velocidad — implementación en 5 días vs semanas/meses de la competencia, 2) Resultados medibles — dashboard con métricas en tiempo real, 3) Especialización — foco exclusivo en agentes IA y automatización, 4) Tecnología propia — no somos intermediarios, desarrollamos internamente, 5) Precio justo — sin contratos de permanencia, 6) Soporte humano — equipo dedicado, no bots para atender bots.",
  },
  {
    q: "¿Qué tecnologías utiliza Neuriax?",
    a: "Utilizamos las tecnologías más avanzadas del mercado: OpenAI GPT-4o, Claude (Anthropic), Llama, modelos de NLP, RAG (Retrieval Augmented Generation), ElevenLabs para voz, Vapi para agentes telefónicos, LangChain, embeddings vectoriales, y stacks de automatización como n8n, Make y Zapier. Todo integrado con WhatsApp Business, Google Calendar, CRMs y +25 plataformas.",
  },
];

const COMPARISONS = [
  { feature: "Implementación", neuriax: "5 días", others: "2-6 meses" },
  { feature: "Agentes IA conversacionales", neuriax: "✅ Especialistas", others: "❌ Chatbots básicos" },
  { feature: "Agentes de voz IA", neuriax: "✅ Incluido", others: "❌ No disponible" },
  { feature: "Soporte dedicado", neuriax: "✅ Equipo humano", others: "⚠️ Tickets" },
  { feature: "Dashboard métricas", neuriax: "✅ Tiempo real", others: "⚠️ Reportes mensuales" },
  { feature: "Integraciones", neuriax: "+25 plataformas", others: "5-10 básicas" },
  { feature: "Permanencia", neuriax: "❌ Sin contratos", others: "⚠️ 6-12 meses" },
  { feature: "ROI primer año", neuriax: "300% media", others: "Variable" },
];

/* ─────────────────────────────────────────────── */

export default function AgenciaIA() {
  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 overflow-x-hidden">

      {/* ════════════ HERO ════════════ */}
      <section className="relative min-h-[90svh] flex items-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F1F5F9] via-[#EDE9FE] to-[#F1F5F9]" />
        <div className="absolute inset-0 hero-aurora opacity-30" />
        <div className="absolute top-[10%] right-[-10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-violet-400/[0.15] rounded-full blur-[120px] sm:blur-[200px] animate-pulse-slow" />
        <div className="absolute bottom-[5%] left-[-5%] w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-indigo-400/[0.12] rounded-full blur-[100px] sm:blur-[180px] animate-pulse-slow" style={{ animationDelay: "3s" }} />

        <div className="relative z-10 max-w-5xl mx-auto w-full py-32 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-violet-100/80 border border-violet-200 rounded-full px-4 py-2 mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[12px] sm:text-[13px] text-violet-700 font-semibold">
              +50 empresas confían en nosotros
            </span>
          </div>

          {/* H1 — Keyword principal exacto */}
          <h1 className="text-[2.5rem] sm:text-5xl lg:text-6xl xl:text-[4.5rem] font-black leading-[1.05] tracking-[-0.03em] mb-6">
            <span className="block text-slate-900">Agencia de IA</span>
            <span className="relative inline-block mt-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-indigo-400 to-violet-500 animate-gradient-x">
                #1 en España
              </span>
            </span>
          </h1>

          {/* Subtítulo con keywords secundarias */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Somos <strong>Neuriax</strong>, la <strong>agencia de inteligencia artificial</strong> que transforma empresas. 
            Agentes IA conversacionales, automatización empresarial, chatbots inteligentes y agentes de voz. 
            <span className="text-violet-600 font-semibold"> Implementación en 5 días. Resultados desde el primer mes.</span>
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <a
              href="#contacto-agencia"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl text-base transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/20 hover:scale-[1.02]"
            >
              Consultoría IA Gratuita
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="https://wa.me/34643045488?text=Hola%2C%20quiero%20info%20sobre%20vuestra%20agencia%20de%20IA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] font-semibold rounded-2xl text-base transition-all hover:bg-[#25D366]/20"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp directo
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-1">⭐ 4.9/5 valoración</span>
            <span className="flex items-center gap-1">🚀 Implementación en 5 días</span>
            <span className="flex items-center gap-1">🔒 Sin permanencia</span>
          </div>
        </div>
      </section>

      {/* ════════════ QUÉ ES UNA AGENCIA DE IA ════════════ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-black text-center mb-8">
              ¿Qué es una <span className="text-violet-600">Agencia de IA</span>?
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed space-y-4">
              <p>
                Una <strong>agencia de IA</strong> (agencia de inteligencia artificial) es una empresa especializada en diseñar, 
                desarrollar e implementar soluciones basadas en <strong>inteligencia artificial</strong> para otras empresas. 
                A diferencia de consultoras tradicionales, una agencia de IA como <strong>Neuriax</strong> no solo asesora: 
                <em>construye, despliega y optimiza</em> los sistemas de IA que transforman tu negocio.
              </p>
              <p>
                En España, las <strong>agencias de IA</strong> han pasado de ser un lujo reservado a grandes corporaciones a convertirse 
                en un aliado estratégico para PYMEs y empresas de todos los tamaños. La clave está en elegir una 
                <strong> agencia de inteligencia artificial</strong> que combine tecnología de vanguardia con implementación rápida 
                y resultados medibles — exactamente lo que hacemos en Neuriax.
              </p>
              <p>
                Como <strong>agencia de IA líder en España</strong>, en Neuriax nos especializamos en <strong>agentes IA 
                conversacionales</strong>, <strong>automatización empresarial</strong>, <strong>chatbots inteligentes</strong> y 
                <strong> agentes de voz</strong> que atienden a tus clientes 24/7 por WhatsApp, teléfono y web.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════ RESULTADOS / STATS ════════════ */}
      <section className="py-16 px-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-black text-center text-white mb-12">
              Resultados reales de nuestra <span className="text-violet-400">agencia de IA</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {RESULTS.map((r, i) => (
              <ScrollReveal key={i}>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-black text-white mb-1">{r.metric}</div>
                  <div className="text-xs sm:text-sm text-slate-400">{r.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ SERVICIOS ════════════ */}
      <section id="servicios-agencia" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-black mb-4">
                Servicios de nuestra <span className="text-violet-600">agencia de inteligencia artificial</span>
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Soluciones de IA completas para empresas en España y Latinoamérica. Desde agentes conversacionales 
                hasta automatización empresarial avanzada.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <ScrollReveal key={i}>
                <div className="bg-white border border-slate-200 rounded-2xl p-6 h-full hover:shadow-lg hover:border-violet-200 transition-all duration-300 group">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-violet-600 transition-colors">{s.title}</h3>
                  <p className="text-sm text-slate-500 mb-4 leading-relaxed">{s.desc}</p>
                  <div className="flex items-center gap-2 text-xs font-semibold text-violet-600 bg-violet-50 px-3 py-1.5 rounded-full w-fit">
                    📈 {s.stats}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ METODOLOGÍA ════════════ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-black mb-4">
                Cómo trabajamos como <span className="text-violet-600">agencia de IA</span>
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Nuestra metodología como agencia de inteligencia artificial garantiza resultados 
                desde el primer mes. Implementación en 5 días laborables.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {METHODOLOGY.map((m, i) => (
              <ScrollReveal key={i}>
                <div className="flex items-start gap-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-all">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-violet-600 text-white flex items-center justify-center text-xl font-black">
                    {m.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold">{m.title}</h3>
                      <span className="text-xs text-violet-600 bg-violet-100 px-2 py-0.5 rounded-full font-semibold">{m.duration}</span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ COMPARATIVA ════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-black mb-4">
                Neuriax vs otras <span className="text-violet-600">agencias de IA</span>
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Por qué las empresas eligen Neuriax como su agencia de inteligencia artificial de confianza.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 px-6 py-3">
                <div className="text-sm font-bold text-slate-400">Característica</div>
                <div className="text-sm font-bold text-violet-600 text-center">Neuriax</div>
                <div className="text-sm font-bold text-slate-400 text-center">Otras agencias</div>
              </div>
              {COMPARISONS.map((c, i) => (
                <div key={i} className={`grid grid-cols-3 px-6 py-4 ${i % 2 === 0 ? '' : 'bg-slate-50/50'} border-b border-slate-100 last:border-0`}>
                  <div className="text-sm font-medium text-slate-700">{c.feature}</div>
                  <div className="text-sm text-center font-semibold text-slate-900">{c.neuriax}</div>
                  <div className="text-sm text-center text-slate-400">{c.others}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════ SECTORES ════════════ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-black mb-4">
                Sectores donde aplicamos <span className="text-violet-600">inteligencia artificial</span>
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Nuestra agencia de IA trabaja con empresas de más de 12 sectores en España y Latinoamérica.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {SECTORS.map((s, i) => (
              <ScrollReveal key={i}>
                <Link
                  href={s.href}
                  className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-violet-300 hover:shadow-md transition-all group"
                >
                  <span className="text-2xl">{s.icon}</span>
                  <span className="text-sm font-medium text-slate-700 group-hover:text-violet-600 transition-colors">{s.name}</span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ TESTIMONIOS ════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-black text-center mb-12">
              Lo que dicen de nuestra <span className="text-violet-600">agencia de IA</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Carlos M.",
                role: "CEO, empresa tecnológica",
                text: "La mejor agencia de IA con la que hemos trabajado. Implementaron un agente conversacional que redujo nuestros costes de atención al cliente en un 60%. En 5 días teníamos todo funcionando.",
                stars: 5,
              },
              {
                name: "María L.",
                role: "Directora, clínica dental",
                text: "Neuriax transformó nuestra clínica con IA. El agente de voz atiende llamadas 24/7, agenda citas automáticamente y nuestros pacientes están encantados. 100% recomendable como agencia de IA.",
                stars: 5,
              },
              {
                name: "Javier R.",
                role: "Fundador, consultora",
                text: "Excelente agencia de inteligencia artificial. Profesionales, rápidos y con resultados medibles desde el primer mes. El ROI ha sido brutal: hemos recuperado la inversión en 2 meses.",
                stars: 5,
              },
            ].map((t, i) => (
              <ScrollReveal key={i}>
                <div className="bg-white border border-slate-200 rounded-2xl p-6 h-full">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <span key={j} className="text-amber-400 text-lg">⭐</span>
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.role}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ FAQ ════════════ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-black mb-4">
                Preguntas frecuentes sobre <span className="text-violet-600">agencias de IA</span>
              </h2>
              <p className="text-slate-500">
                Todo lo que necesitas saber antes de contratar una agencia de inteligencia artificial.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {FAQ_DATA.map((faq, i) => (
              <ScrollReveal key={i}>
                <details className="group bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-sm font-bold text-slate-900 hover:bg-slate-100 transition-colors">
                    <span>{faq.q}</span>
                    <svg className="w-4 h-4 text-slate-400 transition-transform group-open:rotate-180 flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-4 text-sm text-slate-500 leading-relaxed faq-answer">
                    {faq.a}
                  </div>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ CIUDADES ════════════ */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-black text-center mb-8">
              Agencia de IA en toda <span className="text-violet-600">España</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao", "Málaga",
                "Zaragoza", "Alicante", "Murcia", "Palma de Mallorca", "Las Palmas",
                "A Coruña", "Valladolid", "Vigo", "Gijón", "Hospitalet",
                "Andorra", "México", "Colombia", "Argentina", "Chile",
              ].map((city, i) => (
                <span
                  key={i}
                  className="text-xs text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-full hover:border-violet-300 transition-colors"
                >
                  Agencia IA {city}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════ CTA + FORMULARIO FINAL ════════════ */}
      <section id="contacto-agencia" className="py-20 px-4 bg-gradient-to-b from-white to-[#F1F5F9]">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div>
                <h2 className="text-3xl sm:text-4xl font-black mb-6">
                  Contrata la <span className="text-violet-600">agencia de IA</span> que tu empresa necesita
                </h2>
                <p className="text-slate-500 mb-6 leading-relaxed">
                  Solicita tu consultoría IA gratuita. Analizamos tu negocio, identificamos oportunidades 
                  de automatización y te presentamos un plan personalizado. Sin compromiso, sin permanencia.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Consultoría IA gratuita y sin compromiso",
                    "Implementación completa en 5 días",
                    "Resultados medibles desde el primer mes",
                    "Sin contratos de permanencia",
                    "Soporte humano dedicado",
                    "Tecnología enterprise-grade (GPT-4o, Claude, Llama)",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-emerald-500 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span>⭐ 4.9/5</span>
                  <span>·</span>
                  <span>+50 empresas</span>
                  <span>·</span>
                  <span>España & LATAM</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg">
                <h3 className="text-lg font-bold text-center mb-6">Solicita tu consultoría IA gratuita</h3>
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════ JSON-LD Schema específico de página ════════════ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Agencia de IA Neuriax",
            "description": "Agencia de inteligencia artificial #1 en España. Agentes IA conversacionales, automatización empresarial, chatbots y agentes de voz.",
            "url": "https://www.neuriax.com/agencia-ia",
            "provider": {
              "@type": "ProfessionalService",
              "@id": "https://www.neuriax.com/#organization",
              "name": "Neuriax",
            },
            "areaServed": [
              { "@type": "Country", "name": "España" },
              { "@type": "Country", "name": "México" },
              { "@type": "Country", "name": "Colombia" },
              { "@type": "Country", "name": "Argentina" },
            ],
            "serviceType": "Agencia de Inteligencia Artificial",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "EUR",
              "lowPrice": "790",
              "highPrice": "5000",
            },
          }),
        }}
      />
    </div>
  );
}
