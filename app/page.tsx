import CTAButton from "../components/CTAButton";
import VideoSection from "../components/VideoSection";
import ProblemCard from "../components/ProblemCard";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automatización e IA + Páginas Web Profesionales | Neuriax | Transformación Digital",
  description: "Soluciones digitales completas: automatización inteligente con IA, páginas web optimizadas en SEO, transformación empresarial. Agencia digital especializada en automatización e IA. Resultados medibles.",
  keywords: "automatización procesos, inteligencia artificial, IA aplicada, páginas web profesionales, agencia digital, automatización IA, soluciones digitales, transformación digital, SEO local, desarrollo web",
};

export default function Home() {
  const faqs = [
    {
      question: "¿Cómo la automatización e IA puede transformar mi negocio?",
      answer: "La automatización elimina procesos manuales repetitivos, la IA analiza datos y toma decisiones automáticas, resultando en mayor eficiencia, reducción de costos y escalabilidad infinita de tu operación."
    },
    {
      question: "¿Qué es mejor: páginas web profesionales o automatización?",
      answer: "Ambas son complementarias. Las páginas web atraen clientes y la automatización te permite gestionar más clientes sin aumentar costos operacionales. Juntas generan crecimiento exponencial."
    },
    {
      question: "¿Cuánto cuesta la automatización e IA?",
      answer: "Depende de la complejidad del proyecto. En la llamada te mostramos casos reales con retornos medibles. Disponemos de paquetes desde PYMEs hasta empresas grandes."
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Schema para FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-black to-black opacity-20"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Automatización e IA + Webs Profesionales
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Transformamos tu negocio con inteligencia artificial, automatización de procesos y páginas web que convierten visitas en ventas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <CTAButton 
              href="#contacto"
              variant="primary"
              size="lg"
            >
              Agendar Llamada Gratis
            </CTAButton>
            <CTAButton 
              href="/portfolio"
              variant="secondary"
              size="lg"
            >
              Ver Nuestros Casos
            </CTAButton>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-16 text-left">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">+150</div>
              <p className="text-gray-400">Proyectos Completados</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">+500%</div>
              <p className="text-gray-400">ROI Promedio</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">24/7</div>
              <p className="text-gray-400">Soporte Disponible</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <VideoSection 
        title="Cómo Transformamos Negocios con IA"
        description="Descubre cómo nuestras soluciones generan resultados reales en empresas como la tuya"
      />

      {/* Problems Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Problemas que Resolvemos</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProblemCard 
              title="Procesos Manuales"
              description="Tareas repetitivas que consumen horas y generan errores"
              icon="⚙️"
            />
            <ProblemCard 
              title="Falta de Presencia Online"
              description="No tienes web o la que tienes no genera clientes"
              icon="🌐"
            />
            <ProblemCard 
              title="Datos Desorganizados"
              description="No sabes realmente quién son tus clientes ni qué quieren"
              icon="📊"
            />
            <ProblemCard 
              title="Atención al Cliente Lenta"
              description="No puedes responder rápido a todas las consultas"
              icon="💬"
            />
            <ProblemCard 
              title="Falta de Escalabilidad"
              description="Creces pero tus costos crecen proporcionalmente"
              icon="📈"
            />
            <ProblemCard 
              title="Competencia Digital"
              description="Tus competidores tienen presencia online fuerte"
              icon="🏆"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Preguntas Frecuentes</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details key={index} className="group border border-gray-700 rounded-lg p-6 cursor-pointer hover:border-blue-600 transition-colors">
                <summary className="font-bold text-lg flex justify-between items-center">
                  {faq.question}
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-gray-400 mt-4">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Listo para Transformar tu Negocio</h2>
          <p className="text-xl text-gray-100 mb-8">
            Agenda una llamada gratuita hoy y descubre cómo automatización e IA pueden multiplicar tus resultados.
          </p>
          <CTAButton 
            href="#contacto"
            variant="primary"
            size="lg"
          >
            Agendar Llamada Gratuita
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
