'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  options?: string[];
}

interface LeadData {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  sector: string;
  problema: string;
  presupuesto: string;
  urgencia: string;
  conversacion: string[];
}

type ConversationStep = 
  | 'welcome'
  | 'nombre'
  | 'email'
  | 'telefono'
  | 'empresa'
  | 'necesidad'
  | 'recomendacion'
  | 'cierre'
  | 'dudas'
  | 'final';

export default function FormularioContacto() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState<ConversationStep>('welcome');
  const [isTyping, setIsTyping] = useState(false);
  const [useAI, setUseAI] = useState(true); // Flag para usar IA
  const [leadData, setLeadData] = useState<LeadData>({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    sector: '',
    problema: '',
    presupuesto: '',
    urgencia: '',
    conversacion: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll dentro del contenedor de mensajes, no de la página
  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, []);

  useEffect(() => {
    // Pequeño delay para asegurar que el DOM se actualizó
    const timer = setTimeout(scrollToBottom, 150);
    return () => clearTimeout(timer);
  }, [messages, scrollToBottom]);

  // Mensaje inicial
  useEffect(() => {
    setTimeout(() => {
      addBotMessage(
        "¡Hola! 👋 Soy María, la asistente de Mateo en Neuriax.\n\n¡Gracias por llegar hasta aquí! Eso me dice que buscas soluciones reales para tu negocio.\n\nTe ayudaré a rellenar un breve formulario para que Mateo pueda preparar tu llamada y darte la mejor atención posible.\n\n¿Empezamos?",
        ['Sí, empecemos', 'Tengo dudas primero']
      );
    }, 500);
  }, []);

  const addBotMessage = (content: string, options?: string[]) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'bot',
        content,
        options
      }]);
    }, 600 + Math.random() * 300);
  };

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'user',
      content
    }]);
    setLeadData(prev => ({
      ...prev,
      conversacion: [...prev.conversacion, `Usuario: ${content}`]
    }));
  };

  // Llamar a la API de IA
  const getAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const allMessages = [...messages, { type: 'user', content: userMessage }];
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: allMessages.map(m => ({ type: m.type, content: m.content })),
          leadData
        })
      });

      if (!response.ok) throw new Error('API error');
      
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error('Error calling AI:', error);
      return "Disculpa, tuve un pequeño problema. ¿Puedes repetir tu pregunta?";
    }
  };

  const handleOptionClick = (option: string) => {
    addUserMessage(option);
    processResponse(option);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inputValue.trim() || isTyping) return;
    
    const userInput = inputValue;
    setInputValue('');
    addUserMessage(userInput);
    
    // Mantener el foco en el input sin causar scroll
    setTimeout(() => {
      inputRef.current?.focus({ preventScroll: true });
    }, 100);
    
    await processResponse(userInput);
  };

  // Base de conocimiento de Neuriax
  const getKnowledgeResponse = (message: string): { text: string; options?: string[] } | null => {
    const lowerMsg = message.toLowerCase();

    // === SERVICIOS ===
    if (lowerMsg.includes('servicio') || lowerMsg.includes('ofrecéis') || lowerMsg.includes('hacéis') || lowerMsg.includes('qué haces') || lowerMsg.includes('a qué os dedicáis')) {
      return {
        text: "En Neuriax hacemos dos cosas principales:\n\n🤖 **Automatización & IA**\n→ Chatbots 24/7 (WhatsApp, web, Instagram)\n→ Seguimiento automático de leads\n→ Dashboards y reportes\n→ Procesos con inteligencia artificial\n\n💻 **Webs Profesionales**\n→ Diseño a medida, responsive\n→ Optimizadas para conversión\n→ SEO local incluido\n→ Sistemas de reservas, e-commerce\n\nMateo primero entiende tu caso y te dice honestamente si algo de esto te puede ayudar o no.\n\n¿Algo más o seguimos?",
        options: ['¿Cuánto cuesta?', '¿Cuánto tarda?', 'Seguir con las preguntas']
      };
    }

    // === PRECIOS ===
    if (lowerMsg.includes('cuest') || lowerMsg.includes('precio') || lowerMsg.includes('cost') || lowerMsg.includes('tarifas') || lowerMsg.includes('cuánto vale') || lowerMsg.includes('presupuesto')) {
      return {
        text: "Te soy honesto con los rangos:\n\n💻 **Webs**\n→ Web básica (informativa): desde 790€\n→ Con reservas online: desde 990€\n→ E-commerce: desde 1.500€\n→ Dominio + hosting 1 año incluidos\n\n🤖 **Automatización**\n→ Chatbot WhatsApp básico: desde 300€\n→ Automatización de leads: desde 500€\n→ Proyecto completo (CRM + IA): desde 1.500€\n\n📌 El precio exacto depende de tu caso específico. En la llamada Mateo te da un presupuesto cerrado, sin sorpresas después.\n\n¿Algo más?",
        options: ['¿Cuánto tarda?', '¿Qué incluye?', 'Seguir con las preguntas']
      };
    }

    // === TIEMPOS ===
    if (lowerMsg.includes('tarda') || lowerMsg.includes('tiempo') || lowerMsg.includes('plazo') || lowerMsg.includes('cuánto dura') || lowerMsg.includes('entrega') || lowerMsg.includes('días')) {
      return {
        text: "Tiempos realistas (no promesas vacías):\n\n💻 **Web básica**: 10-15 días\n💻 **Web con reservas/ecommerce**: 2-3 semanas\n🤖 **Chatbot simple**: 1 semana\n🤖 **Automatización completa**: 2-4 semanas\n🔧 **Proyecto integral**: 4-8 semanas\n\nMateo te confirma el plazo exacto en la llamada según tu caso. Preferimos ser realistas a quedar bien y luego fallar.\n\n¿Seguimos?",
        options: ['¿Cuánto cuesta?', '¿Qué incluye?', 'Seguir con las preguntas']
      };
    }

    // === GARANTÍAS ===
    if (lowerMsg.includes('garantía') || lowerMsg.includes('garantia') || lowerMsg.includes('si no me gusta') || lowerMsg.includes('devolucion') || lowerMsg.includes('devolución')) {
      return {
        text: "Nuestra política es simple:\n\n✅ **Garantía de satisfacción 30 días** en webs\n✅ **Revisiones ilimitadas** hasta que estés contento\n✅ **Sin letra pequeña** - lo que acordamos es lo que se hace\n✅ **Soporte incluido** durante el primer mes\n\nSi no estás satisfecho con el resultado, trabajamos hasta que lo estés o te devolvemos el dinero. Así de claro.\n\n¿Algo más?",
        options: ['¿Cuánto cuesta?', '¿Qué incluye?', 'Seguir con las preguntas']
      };
    }

    // === SOPORTE Y MANTENIMIENTO ===
    if (lowerMsg.includes('soporte') || lowerMsg.includes('mantenimiento') || lowerMsg.includes('ayuda') || lowerMsg.includes('después') || lowerMsg.includes('problemas')) {
      return {
        text: "El soporte funciona así:\n\n✅ **Primer mes**: Soporte incluido sin coste\n✅ **Después**: Plan opcional de mantenimiento (49€/mes)\n\nEl mantenimiento incluye:\n→ Actualizaciones de seguridad\n→ Copias de seguridad\n→ Cambios pequeños (textos, fotos)\n→ Soporte prioritario por WhatsApp\n\nSi no contratas mantenimiento, igualmente puedes contactarnos para cambios puntuales (se presupuestan aparte).\n\n¿Algo más?",
        options: ['¿Cuánto cuesta?', '¿Qué garantía hay?', 'Seguir con las preguntas']
      };
    }

    // === QUÉ INCLUYE ===
    if (lowerMsg.includes('incluye') || lowerMsg.includes('qué entra') || lowerMsg.includes('viene con')) {
      return {
        text: "Depende del servicio, pero en general:\n\n💻 **Web básica (790€) incluye:**\n→ Diseño responsive (móvil + PC)\n→ Hasta 5 secciones\n→ Formulario de contacto\n→ Botón WhatsApp y llamada\n→ Google Maps\n→ SEO básico local\n→ Dominio + hosting 1 año\n→ Certificado SSL\n\n🤖 **Automatización incluye:**\n→ Configuración completa\n→ Entrenamiento/personalización\n→ 1 mes de soporte\n→ Documentación de uso\n\nExtras típicos: reservas (+150€), multiidioma (+200€), e-commerce (+300€)\n\n¿Algo más?",
        options: ['¿Cuánto tarda?', '¿Qué garantía hay?', 'Seguir con las preguntas']
      };
    }

    // === DOMINIO Y HOSTING ===
    if (lowerMsg.includes('dominio') || lowerMsg.includes('hosting') || lowerMsg.includes('alojamiento')) {
      return {
        text: "✅ Sí, **dominio + hosting incluidos** el primer año en cualquier plan de web.\n\n→ Renovación anual: 120€/año (dominio + hosting + SSL)\n→ Si ya tienes dominio, lo conectamos sin problema\n→ Usamos servidores rápidos y seguros\n\n¿Algo más?",
        options: ['¿Cuánto cuesta una web?', '¿Qué incluye?', 'Seguir con las preguntas']
      };
    }

    // === RESERVAS ===
    if (lowerMsg.includes('reserva') || lowerMsg.includes('booking') || lowerMsg.includes('citas') || lowerMsg.includes('agenda')) {
      return {
        text: "Sí, integramos sistemas de reservas:\n\n📅 **Sistema básico de reservas**: +150€\n→ Calendario visual\n→ Confirmación automática por email\n→ Recordatorios\n\n📅 **Sistema avanzado**: +300€\n→ Múltiples servicios/empleados\n→ Pagos online\n→ Sincronización con Google Calendar\n\nTambién podemos integrar Calendly, SimplyBook, o crear algo a medida.\n\n¿Algo más?",
        options: ['¿Cuánto cuesta una web?', '¿Cuánto tarda?', 'Seguir con las preguntas']
      };
    }

    // === CHATBOTS ===
    if (lowerMsg.includes('chatbot') || lowerMsg.includes('bot') || lowerMsg.includes('whatsapp') || lowerMsg.includes('responder automático')) {
      return {
        text: "Los chatbots que hacemos:\n\n🤖 **Chatbot WhatsApp** (desde 300€)\n→ Responde 24/7 a tus clientes\n→ Cualifica leads automáticamente\n→ Responde preguntas frecuentes\n→ Puede agendar citas\n\n🤖 **Chatbot Web** (desde 200€)\n→ Integrado en tu página\n→ Captura datos de contacto\n→ Deriva a WhatsApp si es necesario\n\n🤖 **IA Avanzada** (desde 500€)\n→ Entiende lenguaje natural\n→ Aprende de tu negocio\n→ Respuestas personalizadas\n\n¿Algo más?",
        options: ['¿Cuánto tarda?', '¿Cómo funciona?', 'Seguir con las preguntas']
      };
    }

    // === AUTOMATIZACIÓN ===
    if (lowerMsg.includes('automatiz') || lowerMsg.includes('automatico') || lowerMsg.includes('automático') || lowerMsg.includes('proceso')) {
      return {
        text: "Automatizamos procesos repetitivos:\n\n⚡ **Ejemplos comunes:**\n→ Seguimiento automático de leads (email/WhatsApp)\n→ Respuestas automáticas a consultas\n→ Recordatorios de citas\n→ Generación de presupuestos\n→ Sincronización entre herramientas\n→ Reportes automáticos\n\n📊 **Herramientas que usamos:**\n→ Make, Zapier, n8n\n→ APIs de WhatsApp Business\n→ CRMs (HubSpot, Notion, Airtable)\n→ Desarrollos a medida\n\nEl objetivo: que dejes de perder tiempo en tareas que una máquina puede hacer mejor.\n\n¿Algo más?",
        options: ['¿Cuánto cuesta?', '¿Cuánto tarda?', 'Seguir con las preguntas']
      };
    }

    // === SEO ===
    if (lowerMsg.includes('seo') || lowerMsg.includes('google') || lowerMsg.includes('posicion') || lowerMsg.includes('buscador') || lowerMsg.includes('aparecer')) {
      return {
        text: "Sobre SEO:\n\n✅ **SEO básico incluido** en todas las webs:\n→ Estructura optimizada\n→ Velocidad de carga\n→ Mobile-first\n→ Metadatos básicos\n→ Google Business Profile\n\n📈 **SEO mensual** (desde 250€/mes):\n→ Estrategia de contenidos\n→ Optimización continua\n→ Link building\n→ Reportes mensuales\n\n⚠️ **Importante**: El SEO tarda 3-6 meses en dar resultados. Si alguien te promete resultados inmediatos, desconfía.\n\n¿Algo más?",
        options: ['¿Cuánto cuesta una web?', '¿Qué incluye?', 'Seguir con las preguntas']
      };
    }

    // === E-COMMERCE ===
    if (lowerMsg.includes('tienda') || lowerMsg.includes('ecommerce') || lowerMsg.includes('e-commerce') || lowerMsg.includes('vender online') || lowerMsg.includes('productos')) {
      return {
        text: "Para tiendas online:\n\n🛒 **E-commerce básico** (desde 1.500€):\n→ Hasta 50 productos\n→ Carrito de compra\n→ Pasarela de pago (Stripe/PayPal)\n→ Gestión de stock\n→ Envíos configurados\n\n🛒 **E-commerce avanzado** (desde 3.000€):\n→ Productos ilimitados\n→ Múltiples variantes\n→ Cupones y descuentos\n→ Integraciones (facturación, logística)\n\nUsamos WooCommerce o Shopify según tu caso.\n\n¿Algo más?",
        options: ['¿Cuánto tarda?', '¿Qué incluye?', 'Seguir con las preguntas']
      };
    }

    // === QUIÉN ES MATEO / NEURIAX ===
    if (lowerMsg.includes('quién') || lowerMsg.includes('quien') || lowerMsg.includes('mateo') || lowerMsg.includes('neuriax') || lowerMsg.includes('empresa') || lowerMsg.includes('equipo')) {
      return {
        text: "Neuriax somos Mateo y un pequeño equipo:\n\n👨‍💻 **Mateo** es quien habla contigo en las llamadas y lidera los proyectos. Lleva años ayudando a negocios locales a digitalizarse.\n\n🎯 **Nuestra filosofía:**\n→ Honestidad ante todo (si no te conviene, te lo decimos)\n→ Sin humo ni promesas vacías\n→ Proyectos a medida, no plantillas\n→ Relación directa, sin intermediarios\n\nNo somos una agencia gigante. Eso significa trato personal y que Mateo conoce cada proyecto.\n\n¿Algo más?",
        options: ['¿Qué servicios ofrecéis?', '¿Cuánto cuesta?', 'Seguir con las preguntas']
      };
    }

    // === CASOS / EJEMPLOS ===
    if (lowerMsg.includes('caso') || lowerMsg.includes('ejemplo') || lowerMsg.includes('resultado') || lowerMsg.includes('portfolio') || lowerMsg.includes('trabajos')) {
      return {
        text: "Algunos casos típicos:\n\n🍽️ **Restaurante**: Web con reservas + chatbot WhatsApp\n→ Resultado: Menos llamadas, más reservas online\n\n🏠 **Inmobiliaria**: CRM + seguimiento automático\n→ Resultado: No pierden leads, respuesta inmediata\n\n💇 **Clínica estética**: Web + sistema de citas\n→ Resultado: Agenda llena sin gestión manual\n\n💼 **Consultoría**: Automatización de propuestas\n→ Resultado: 10h/semana menos en tareas admin\n\nEn la llamada te mostramos casos más específicos de tu sector.\n\n¿Algo más?",
        options: ['¿Cuánto cuesta?', '¿Cuánto tarda?', 'Seguir con las preguntas']
      };
    }

    // === FORMA DE PAGO ===
    if (lowerMsg.includes('pago') || lowerMsg.includes('pagar') || lowerMsg.includes('transferencia') || lowerMsg.includes('factura') || lowerMsg.includes('plazos')) {
      return {
        text: "Formas de pago:\n\n💳 **Estructura típica:**\n→ 50% al empezar el proyecto\n→ 50% al entregar\n\n💳 **Métodos aceptados:**\n→ Transferencia bancaria\n→ Bizum\n→ Tarjeta (Stripe)\n\n📄 **Factura** siempre incluida con IVA desglosado.\n\nPara proyectos grandes (+3.000€) podemos estudiar fraccionamiento.\n\n¿Algo más?",
        options: ['¿Qué garantía hay?', '¿Cuánto cuesta?', 'Seguir con las preguntas']
      };
    }

    // === DIFERENCIA CON OTROS ===
    if (lowerMsg.includes('diferencia') || lowerMsg.includes('competencia') || lowerMsg.includes('por qué vosotros') || lowerMsg.includes('mejor que') || lowerMsg.includes('otros')) {
      return {
        text: "¿Por qué Neuriax y no otros?\n\n✅ **Lo que SÍ hacemos:**\n→ Trato directo con Mateo (no comerciales)\n→ Proyectos a medida (no plantillas)\n→ Precios cerrados sin sorpresas\n→ Te decimos NO si no te conviene\n\n❌ **Lo que NO hacemos:**\n→ Prometer resultados mágicos\n→ Vender humo con palabras bonitas\n→ Desaparecer después de entregar\n→ Cobrar por mantenimiento obligatorio\n\nNo somos los más baratos ni los más caros. Somos honestos y cumplimos.\n\n¿Algo más?",
        options: ['¿Cuánto cuesta?', '¿Qué garantía hay?', 'Seguir con las preguntas']
      };
    }

    // === CONTACTO ===
    if (lowerMsg.includes('contacto') || lowerMsg.includes('teléfono') || lowerMsg.includes('telefono') || lowerMsg.includes('email') || lowerMsg.includes('llamar')) {
      return {
        text: "Puedes contactarnos:\n\n📞 **Teléfono/WhatsApp**: +34 640 791 041\n📧 **Email**: hola@neuriax.com\n🌐 **Web**: neuriax.com\n\nPero lo mejor es agendar una llamada gratuita donde Mateo entiende tu caso y te dice si podemos ayudarte.\n\n¿Seguimos con las preguntas para preparar esa llamada?",
        options: ['Sí, seguimos', 'Tengo otra duda']
      };
    }

    // === IDIOMAS ===
    if (lowerMsg.includes('idioma') || lowerMsg.includes('inglés') || lowerMsg.includes('ingles') || lowerMsg.includes('catalán') || lowerMsg.includes('catalan') || lowerMsg.includes('multiidioma')) {
      return {
        text: "Sobre idiomas:\n\n🌍 **Web multiidioma**: +200€ por idioma adicional\n→ Español, Inglés, Catalán, Francés...\n→ Selector de idioma integrado\n→ SEO para cada idioma\n\nLa web base es en español. Cada idioma extra requiere traducción (la puedes aportar tú o nos encargamos nosotros).\n\n¿Algo más?",
        options: ['¿Cuánto cuesta?', '¿Qué incluye?', 'Seguir con las preguntas']
      };
    }

    // === SECTOR ESPECÍFICO ===
    if (lowerMsg.includes('restaurante') || lowerMsg.includes('hostelería') || lowerMsg.includes('bar')) {
      return {
        text: "Para restaurantes y hostelería:\n\n🍽️ **Lo típico que hacemos:**\n→ Web con carta/menú visual\n→ Sistema de reservas online\n→ Botón WhatsApp directo\n→ Integración Google Maps y reseñas\n→ Chatbot para reservas 24/7\n\n📊 **Resultado habitual:**\n→ Menos llamadas telefónicas\n→ Más reservas gestionadas solas\n→ Menos no-shows (confirmación automática)\n\n¿Te interesa esto para tu negocio?",
        options: ['¿Cuánto cuesta?', '¿Cuánto tarda?', 'Seguir con las preguntas']
      };
    }

    if (lowerMsg.includes('inmobiliaria') || lowerMsg.includes('pisos') || lowerMsg.includes('casas') || lowerMsg.includes('alquiler')) {
      return {
        text: "Para inmobiliarias:\n\n🏠 **Lo típico que hacemos:**\n→ Web con listado de propiedades\n→ Filtros de búsqueda\n→ Formularios por propiedad\n→ Seguimiento automático de leads\n→ CRM integrado\n\n📊 **Resultado habitual:**\n→ Leads mejor cualificados\n→ Respuesta inmediata 24/7\n→ Menos tiempo en seguimiento manual\n\n¿Te interesa esto para tu inmobiliaria?",
        options: ['¿Cuánto cuesta?', '¿Cuánto tarda?', 'Seguir con las preguntas']
      };
    }

    if (lowerMsg.includes('clínica') || lowerMsg.includes('clinica') || lowerMsg.includes('belleza') || lowerMsg.includes('estética') || lowerMsg.includes('estetica') || lowerMsg.includes('peluquería') || lowerMsg.includes('peluqueria')) {
      return {
        text: "Para clínicas y centros de belleza:\n\n💇 **Lo típico que hacemos:**\n→ Web elegante con servicios y precios\n→ Sistema de citas online\n→ Recordatorios automáticos\n→ WhatsApp para consultas rápidas\n→ Galería de trabajos (antes/después)\n\n📊 **Resultado habitual:**\n→ Agenda llena sin gestión manual\n→ Menos cancelaciones (recordatorios)\n→ Clientes nuevos desde Google\n\n¿Te interesa esto para tu negocio?",
        options: ['¿Cuánto cuesta?', '¿Cuánto tarda?', 'Seguir con las preguntas']
      };
    }

    return null; // No encontró respuesta en el knowledge base
  };

  const processResponse = async (response: string) => {
    const lowerResponse = response.toLowerCase();

    // Primero intentar responder desde el knowledge base (respuestas rápidas predefinidas)
    const knowledgeResponse = getKnowledgeResponse(response);
    if (knowledgeResponse && currentStep !== 'welcome' && currentStep !== 'dudas') {
      // Si estamos en medio del flujo, permitir preguntas pero guiar de vuelta
      setTimeout(() => {
        addBotMessage(knowledgeResponse.text, knowledgeResponse.options);
      }, 300);
      return;
    }

    // Manejar flujo de dudas en cualquier momento
    if (lowerResponse.includes('duda') || lowerResponse.includes('pregunta') || lowerResponse.includes('tengo dudas')) {
      setCurrentStep('dudas');
      setTimeout(() => {
        addBotMessage(
          "Por supuesto, pregúntame lo que necesites. Puedo ayudarte con información sobre precios, tiempos, servicios, garantías... lo que quieras saber.\n\n¿Qué te gustaría saber?",
          ['¿Qué servicios ofrecéis?', '¿Cuánto cuesta?', '¿Cuánto tarda?', '¿Qué garantía hay?', 'Seguir con el formulario']
        );
      }, 300);
      return;
    }

    // Respuestas a dudas - usar IA si está activa
    if (currentStep === 'dudas') {
      // Comandos para volver al flujo
      if (lowerResponse.includes('seguir') || lowerResponse.includes('formulario') || lowerResponse.includes('empezar')) {
        setCurrentStep('nombre');
        setTimeout(() => {
          addBotMessage("¡Perfecto! 😊\n\n**Pregunta 1 de 5**\n\n¿Cómo te llamas?");
        }, 300);
        return;
      }

      if (lowerResponse.includes('agendar') || lowerResponse.includes('llamada directamente')) {
        setCurrentStep('nombre');
        setTimeout(() => {
          addBotMessage("Entendido. Para preparar la llamada, necesito unos datos básicos.\n\n**Pregunta 1 de 5**\n\n¿Cómo te llamas?");
        }, 300);
        return;
      }

      // Usar IA para responder la pregunta
      setIsTyping(true);
      try {
        const aiResponse = await getAIResponse(response);
        setIsTyping(false);
        
        // Añadir opciones para continuar después de responder
        const continueOptions = ['¿Otra pregunta?', 'Seguir con el formulario', 'Agendar llamada directamente'];
        
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          type: 'bot',
          content: aiResponse,
          options: continueOptions
        }]);
      } catch (error) {
        setIsTyping(false);
        addBotMessage(
          "Disculpa, no pude procesar tu pregunta. ¿Puedes intentarlo de nuevo o prefieres que sigamos con el formulario?",
          ['Seguir con el formulario', 'Agendar llamada directamente']
        );
      }
      return;
    }

    // Flujo principal de recopilación - FORMULARIO ESTRUCTURADO
    switch (currentStep) {
      case 'welcome':
        if (lowerResponse.includes('sí') || lowerResponse.includes('empecemos') || lowerResponse.includes('vale') || lowerResponse.includes('ok')) {
          setCurrentStep('nombre');
          setTimeout(() => {
            addBotMessage("¡Perfecto! 😊\n\n**Pregunta 1 de 5**\n\n¿Cómo te llamas?");
          }, 300);
        } else {
          setCurrentStep('dudas');
          setTimeout(() => {
            addBotMessage(
              "Claro, pregúntame lo que necesites. Prefiero que tengas toda la información antes de decidir.\n\n¿Qué te gustaría saber?",
              ['¿Qué servicios ofrecéis?', '¿Cuánto cuesta?', '¿Cuánto tarda?', 'Empezar con el formulario']
            );
          }, 300);
        }
        break;

      case 'nombre':
        setLeadData(prev => ({ ...prev, nombre: response }));
        setCurrentStep('email');
        setTimeout(() => {
          addBotMessage(
            `¡Encantada, ${response}! 👋\n\n**Pregunta 2 de 5**\n\n¿Cuál es tu correo electrónico?\n\n_(Para enviarte la confirmación de la llamada)_`
          );
        }, 300);
        break;

      case 'email':
        // Validar email básico
        if (!response.includes('@') || !response.includes('.')) {
          setTimeout(() => {
            addBotMessage("Hmm, ese email no parece válido. ¿Puedes escribirlo de nuevo? 📧");
          }, 300);
          return;
        }
        setLeadData(prev => ({ ...prev, email: response }));
        setCurrentStep('telefono');
        setTimeout(() => {
          addBotMessage(`Perfecto, ${leadData.nombre}. ✉️\n\n**Pregunta 3 de 5**\n\n¿Tu número de teléfono?\n\n_(Por si hay algún cambio de última hora)_`);
        }, 300);
        break;

      case 'telefono':
        setLeadData(prev => ({ ...prev, telefono: response }));
        setCurrentStep('empresa');
        setTimeout(() => {
          addBotMessage("Genial. 📱\n\n**Pregunta 4 de 5**\n\n¿Cuál es el nombre de tu empresa o negocio?");
        }, 300);
        break;

      case 'empresa':
        setLeadData(prev => ({ ...prev, empresa: response }));
        setCurrentStep('necesidad');
        setTimeout(() => {
          addBotMessage(
            `${response}, anotado. 🏢\n\n**Pregunta 5 de 5** (última)\n\n¿En qué te gustaría que te ayudáramos?`,
            ['Necesito una web profesional', 'Quiero automatizar procesos', 'Chatbot para mi negocio', 'Mejorar ventas online', 'No tengo claro, quiero explorar opciones']
          );
        }, 300);
        break;

      case 'necesidad':
        setLeadData(prev => ({ ...prev, problema: response }));
        setCurrentStep('recomendacion');
        
        // Generar recomendación personalizada basada en la necesidad
        setTimeout(async () => {
          setIsTyping(true);
          
          let recomendacion = "";
          const necesidadLower = response.toLowerCase();
          
          if (necesidadLower.includes('web')) {
            recomendacion = `Perfecto, ${leadData.nombre}. Para una web profesional, te recomiendo:\n\n✅ **Web optimizada para conversión** - No solo bonita, sino que convierta visitantes en clientes\n✅ **SEO local incluido** - Para que te encuentren en Google\n✅ **Responsive** - Perfecta en móvil y ordenador\n✅ **Dominio + hosting 1 año incluidos**\n\n💰 Rango orientativo: desde 790€`;
          } else if (necesidadLower.includes('automatizar') || necesidadLower.includes('proceso')) {
            recomendacion = `Excelente, ${leadData.nombre}. Para automatizar tu negocio, te recomiendo:\n\n✅ **Análisis de procesos** - Identificar qué tareas te quitan más tiempo\n✅ **Automatización de leads** - Seguimiento automático de clientes potenciales\n✅ **Integraciones** - Conectar tus herramientas actuales\n✅ **Reportes automáticos** - Dashboard con métricas clave\n\n💰 Rango orientativo: desde 500€`;
          } else if (necesidadLower.includes('chatbot') || necesidadLower.includes('bot')) {
            recomendacion = `Genial, ${leadData.nombre}. Para un chatbot, te recomiendo:\n\n✅ **Chatbot 24/7** - Responde clientes mientras duermes\n✅ **Cualificación de leads** - Filtra automáticamente los clientes potenciales\n✅ **Respuestas inteligentes** - Con IA que entiende el contexto\n✅ **Integración WhatsApp/Web** - Donde estén tus clientes\n\n💰 Rango orientativo: desde 300€`;
          } else if (necesidadLower.includes('ventas') || necesidadLower.includes('vender')) {
            recomendacion = `Perfecto, ${leadData.nombre}. Para mejorar tus ventas online, te recomiendo:\n\n✅ **Estrategia de conversión** - Optimizar tu embudo de ventas\n✅ **Automatización de seguimiento** - No perder ningún lead\n✅ **Landing pages optimizadas** - Páginas que convierten\n✅ **Análisis de datos** - Entender qué funciona y qué no\n\n💰 Rango orientativo: depende del alcance`;
          } else {
            recomendacion = `Entendido, ${leadData.nombre}. Cuando no se tiene claro, lo mejor es:\n\n✅ **Análisis de tu situación** - Entender dónde estás y a dónde quieres llegar\n✅ **Propuesta personalizada** - Soluciones a medida para tu caso\n✅ **Sin compromiso** - Te decimos honestamente si podemos ayudarte o no\n\n🎯 Por eso la llamada con Mateo es clave`;
          }
          
          setIsTyping(false);
          addBotMessage(
            `${recomendacion}\n\n---\n\n🎯 **Mi recomendación:** Lo mejor es que hables directamente con Mateo. En 15-20 minutos puede analizar tu caso específico y darte un plan concreto (sin compromiso).\n\n¿Agendamos la llamada?`,
            ['Sí, agendar llamada ahora', 'Tengo más dudas']
          );
        }, 500);
        break;

      case 'recomendacion':
        if (lowerResponse.includes('sí') || lowerResponse.includes('agendar') || lowerResponse.includes('llamada')) {
          submitLeadAndShowCalendly();
        } else {
          setCurrentStep('dudas');
          setTimeout(() => {
            addBotMessage("Claro, pregúntame lo que necesites. ¿Qué duda tienes?");
          }, 300);
        }
        break;

      case 'cierre':
        if (lowerResponse.includes('sí') || lowerResponse.includes('agendar') || lowerResponse.includes('llamada')) {
          submitLeadAndShowCalendly();
        } else {
          setCurrentStep('dudas');
          setTimeout(() => {
            addBotMessage("Claro, pregúntame lo que necesites. ¿Qué duda tienes?");
          }, 300);
        }
        break;

      case 'final':
        setTimeout(() => {
          addBotMessage(
            "Ya tienes toda la información. 😊\n\nCuando estés listo, haz clic en el botón de abajo para agendar la llamada con Mateo.",
            ['Agendar llamada ahora']
          );
        }, 300);
        if (lowerResponse.includes('agendar')) {
          submitLeadAndShowCalendly();
        }
        break;

      default:
        // Respuesta genérica para cualquier otro caso
        setTimeout(() => {
          addBotMessage(
            "Entendido. ¿Quieres que sigamos con el formulario o tienes alguna duda?",
            ['Seguir con el formulario', 'Tengo una duda']
          );
        }, 300);
    }
  };

  const submitLeadAndShowCalendly = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: leadData.nombre,
          email: leadData.email,
          telefono: leadData.telefono,
          empresa: leadData.empresa,
          sector: leadData.sector,
          mensaje: `PROBLEMA: ${leadData.problema}\n\nURGENCIA: ${leadData.urgencia}\n\nPRESUPUESTO: ${leadData.presupuesto}\n\nCONVERSACIÓN:\n${leadData.conversacion.join('\n')}`,
          type: 'contact_form'
        })
      });

      if (response.ok) {
        setCurrentStep('final');
        addBotMessage(
          `¡Perfecto, ${leadData.nombre}! 🎉\n\nHe guardado toda tu información y Mateo la revisará antes de la llamada.\n\n📧 **Te he enviado un email** con un código de descuento del 10% para tu primer proyecto.\n\n**Ahora haz clic en el botón de abajo** para elegir el día y hora que mejor te venga.\n\n👇`
        );
        setShowCalendly(true);
      } else {
        addBotMessage("Ups, hubo un problema guardando tus datos. ¿Puedes intentarlo de nuevo?");
      }
    } catch (error) {
      console.error('Error:', error);
      addBotMessage("Ups, hubo un problema. Pero no te preocupes, puedes agendar directamente aquí: https://calendly.com/neuriax/30min");
      setShowCalendly(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepProgress = (): number => {
    const steps: ConversationStep[] = ['welcome', 'nombre', 'email', 'telefono', 'empresa', 'necesidad', 'recomendacion', 'cierre'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex === -1) return 100;
    return Math.round((currentIndex / (steps.length - 1)) * 100);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Animated Background - Ultra Premium */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[150px]"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400/60 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-blue-400/60 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-cyan-300/60 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-20 w-2 h-2 bg-purple-400/40 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <div className="h-16"></div>

      <section className="relative py-6 md:py-10 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back Link - Minimal */}
          <Link href="/contacto" className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-400 mb-6 transition-all text-sm group">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">Volver</span>
          </Link>

          {/* Main Card - Ultra Premium Glass */}
          <div className="relative">
            {/* Glow effect behind card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-[2rem] blur-xl opacity-50"></div>
            
            <div className="relative bg-gradient-to-br from-slate-900/98 via-slate-900/95 to-slate-800/98 rounded-[2rem] shadow-2xl border border-white/10 overflow-hidden backdrop-blur-2xl">
              
              {/* Header Section */}
              <div className="relative px-8 py-8 border-b border-white/5">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5"></div>
                
                <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  {/* Left - Avatar & Info */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 flex items-center justify-center shadow-xl shadow-cyan-500/30 rotate-3 hover:rotate-0 transition-transform duration-500">
                        <span className="text-white font-bold text-2xl">M</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-lg border-3 border-slate-900 flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-xl font-bold text-white">María</h2>
                        <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 text-[10px] font-semibold rounded-full uppercase tracking-wider">IA</span>
                      </div>
                      <p className="text-slate-400 text-sm">Asistente Personal de Neuriax</p>
                    </div>
                  </div>
                  
                  {/* Right - Progress */}
                  <div className="flex-shrink-0">
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Progreso</p>
                        <p className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{getStepProgress()}%</p>
                      </div>
                      <div className="w-16 h-16 relative">
                        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                          <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" className="text-slate-800" />
                          <circle 
                            cx="32" cy="32" r="28" fill="none" stroke="url(#progressGradient)" strokeWidth="4" 
                            strokeDasharray={`${getStepProgress() * 1.76} 176`}
                            strokeLinecap="round"
                            className="transition-all duration-700"
                          />
                          <defs>
                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#22d3ee" />
                              <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Messages Area */}
              <div 
                ref={messagesContainerRef}
                className="h-[400px] md:h-[450px] overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
              >
                {messages.map((message, idx) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                      {/* Bot avatar */}
                      {message.type === 'bot' && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                            <span className="text-white font-bold text-[10px]">M</span>
                          </div>
                          <span className="text-slate-500 text-xs">María</span>
                        </div>
                      )}
                      
                      <div
                        className={`rounded-2xl px-5 py-4 ${
                          message.type === 'user'
                            ? 'bg-gradient-to-br from-cyan-500 via-cyan-500 to-blue-600 text-white shadow-xl shadow-cyan-500/25'
                            : 'bg-white/[0.03] text-slate-100 border border-white/10 backdrop-blur-sm'
                        }`}
                      >
                        <p className="whitespace-pre-line text-[15px] leading-relaxed">{message.content}</p>
                      </div>
                      
                      {/* Options - Premium Pill Buttons */}
                      {message.options && message.type === 'bot' && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {message.options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => handleOptionClick(option)}
                              className="group relative px-5 py-3 text-sm font-medium overflow-hidden rounded-xl transition-all duration-300"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 transition-all duration-300"></div>
                              <div className="absolute inset-0 border border-white/10 group-hover:border-cyan-500/50 rounded-xl transition-all duration-300"></div>
                              <span className="relative text-slate-300 group-hover:text-white transition-colors">{option}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator - Premium */}
                {isTyping && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="flex items-center gap-3 bg-white/[0.03] rounded-2xl px-5 py-4 border border-white/10">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                        <span className="text-white font-bold text-[10px]">M</span>
                      </div>
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area - Ultra Premium */}
              <div className="border-t border-white/5 p-5 md:p-6 bg-gradient-to-t from-slate-900/50 to-transparent">
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <div className="flex-1 relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl opacity-0 group-focus-within:opacity-30 blur transition-opacity duration-300"></div>
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Escribe tu respuesta..."
                      className="relative w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all text-[15px]"
                      disabled={isSubmitting}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isSubmitting}
                    className="group relative px-6 py-4 rounded-xl overflow-hidden transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-300"></div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    </div>
                    <svg className="relative w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Calendly Button - Ultra Premium */}
          {showCalendly && (
            <div className="mt-10 text-center animate-fade-in-up">
              <div className="relative inline-block">
                <div className="absolute -inset-2 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
                <a
                  href="https://calendly.com/neuriax/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center justify-center gap-3 px-12 py-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 text-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Agendar mi llamada ahora
                </a>
              </div>
              <div className="mt-6 flex items-center justify-center gap-6 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="text-lg">📞</span> 15-20 min
                </span>
                <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                <span className="flex items-center gap-2">
                  <span className="text-lg">✅</span> Sin compromiso
                </span>
                <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                <span className="flex items-center gap-2">
                  <span className="text-lg">🎁</span> Gratis
                </span>
              </div>
            </div>
          )}

          {/* Trust Indicators - Minimal Premium */}
          <div className="mt-16 mb-8">
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm text-slate-500">
              <span className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span>Datos protegidos</span>
              </span>
              <span className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>Respuesta en 24h</span>
              </span>
              <span className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span>100% honestidad</span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
