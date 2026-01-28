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
  | 'sector'
  | 'problema'
  | 'urgencia'
  | 'presupuesto'
  | 'email'
  | 'telefono'
  | 'empresa'
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
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    // Pequeño delay para asegurar que el DOM se actualizó
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [messages, scrollToBottom]);

  // Mensaje inicial
  useEffect(() => {
    setTimeout(() => {
      addBotMessage(
        "¡Hola! 👋 Soy el asistente de Mateo en Neuriax.\n\nAntes de agendar una llamada, me gustaría hacerte unas preguntas rápidas para entender tu situación. Así Mateo puede prepararse y no hacerte perder el tiempo.\n\n¿Te parece bien?",
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
    if (!inputValue.trim() || isTyping) return;
    
    const userInput = inputValue;
    setInputValue('');
    addUserMessage(userInput);
    
    // Mantener el foco en el input
    inputRef.current?.focus();
    
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
          ['¿Qué servicios ofrecéis?', '¿Cuánto cuesta?', '¿Cuánto tarda?', '¿Qué garantía hay?', 'Seguir con las preguntas']
        );
      }, 300);
      return;
    }

    // Respuestas a dudas - usar IA si está activa
    if (currentStep === 'dudas') {
      // Comandos para volver al flujo
      if (lowerResponse.includes('seguir') || (lowerResponse.includes('sí') && lowerResponse.length < 10)) {
        setCurrentStep('nombre');
        setTimeout(() => {
          addBotMessage("Perfecto, continuamos. 😊\n\n¿Cómo te llamas?");
        }, 300);
        return;
      }

      if (lowerResponse.includes('agendar') || lowerResponse.includes('llamada directamente')) {
        setCurrentStep('nombre');
        setTimeout(() => {
          addBotMessage("Entendido. Para preparar la llamada, solo necesito unos datos básicos.\n\n¿Cómo te llamas?");
        }, 300);
        return;
      }

      // Usar IA para responder la pregunta
      setIsTyping(true);
      try {
        const aiResponse = await getAIResponse(response);
        setIsTyping(false);
        
        // Añadir opciones para continuar después de responder
        const continueOptions = ['¿Otra pregunta?', 'Seguir con las preguntas', 'Agendar llamada directamente'];
        
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          type: 'bot',
          content: aiResponse,
          options: continueOptions
        }]);
      } catch (error) {
        setIsTyping(false);
        addBotMessage(
          "Disculpa, no pude procesar tu pregunta. ¿Puedes intentarlo de nuevo o prefieres que sigamos con las preguntas?",
          ['Seguir con las preguntas', 'Agendar llamada directamente']
        );
      }
      return;
    }

    // Flujo principal de recopilación
    switch (currentStep) {
      case 'welcome':
        if (lowerResponse.includes('sí') || lowerResponse.includes('empecemos') || lowerResponse.includes('vale') || lowerResponse.includes('ok')) {
          setCurrentStep('nombre');
          setTimeout(() => {
            addBotMessage("Genial. 😊\n\nPrimero lo básico: ¿Cómo te llamas?");
          }, 300);
        } else {
          setCurrentStep('dudas');
          setTimeout(() => {
            addBotMessage(
              "Claro, pregúntame lo que necesites. Prefiero que tengas toda la información antes de decidir.\n\n¿Qué te gustaría saber?",
              ['¿Qué servicios ofrecéis?', '¿Cuánto cuesta?', '¿Cuánto tarda?', 'Empezar con las preguntas']
            );
          }, 300);
        }
        break;

      case 'nombre':
        setLeadData(prev => ({ ...prev, nombre: response }));
        setCurrentStep('sector');
        setTimeout(() => {
          addBotMessage(
            `Encantado, ${response}. 👋\n\n¿En qué sector está tu negocio?`,
            ['Restaurante / Hostelería', 'Inmobiliaria', 'Clínica / Belleza', 'Servicios profesionales', 'E-commerce', 'Otro']
          );
        }, 300);
        break;

      case 'sector':
        setLeadData(prev => ({ ...prev, sector: response }));
        setCurrentStep('problema');
        setTimeout(() => {
          addBotMessage(
            `${response}, entendido.\n\n¿Cuál es el principal problema o reto que tienes ahora mismo en tu negocio?\n\nSé específico, así Mateo puede prepararse mejor.`
          );
        }, 300);
        break;

      case 'problema':
        setLeadData(prev => ({ ...prev, problema: response }));
        setCurrentStep('urgencia');
        setTimeout(() => {
          addBotMessage(
            "Gracias por compartirlo. 🙏\n\n¿Cómo de urgente es solucionar esto para ti?",
            ['Es urgente (este mes)', 'Pronto (1-2 meses)', 'Sin prisa, explorando opciones']
          );
        }, 300);
        break;

      case 'urgencia':
        setLeadData(prev => ({ ...prev, urgencia: response }));
        setCurrentStep('presupuesto');
        setTimeout(() => {
          addBotMessage(
            "¿Tienes un rango de presupuesto en mente?\n\nNo te preocupes si no lo tienes claro, solo para que Mateo pueda proponerte opciones realistas.",
            ['Menos de 500€', '500€ - 1.000€', '1.000€ - 3.000€', 'Más de 3.000€', 'No tengo claro']
          );
        }, 300);
        break;

      case 'presupuesto':
        setLeadData(prev => ({ ...prev, presupuesto: response }));
        setCurrentStep('email');
        setTimeout(() => {
          addBotMessage(
            `Perfecto, ${leadData.nombre}.\n\nYa casi terminamos. Necesito un email para enviarte la confirmación de la llamada:`
          );
        }, 300);
        break;

      case 'email':
        // Validar email básico
        if (!response.includes('@') || !response.includes('.')) {
          setTimeout(() => {
            addBotMessage("Hmm, ese email no parece válido. ¿Puedes escribirlo de nuevo?");
          }, 300);
          return;
        }
        setLeadData(prev => ({ ...prev, email: response }));
        setCurrentStep('telefono');
        setTimeout(() => {
          addBotMessage("Y un teléfono de contacto (por si hay algún cambio con la llamada):");
        }, 300);
        break;

      case 'telefono':
        setLeadData(prev => ({ ...prev, telefono: response }));
        setCurrentStep('empresa');
        setTimeout(() => {
          addBotMessage("Última pregunta: ¿Nombre de tu empresa o negocio?");
        }, 300);
        break;

      case 'empresa':
        setLeadData(prev => ({ ...prev, empresa: response }));
        setCurrentStep('cierre');
        setTimeout(() => {
          addBotMessage(
            `¡Genial, ${leadData.nombre}! 🎉\n\nTengo todo lo que necesito:\n\n✓ **Sector**: ${leadData.sector}\n✓ **Problema**: ${leadData.problema.substring(0, 50)}...\n✓ **Urgencia**: ${leadData.urgencia}\n✓ **Presupuesto**: ${leadData.presupuesto}\n\nMateo revisará esto antes de la llamada para llegar preparado.\n\n¿Listo para elegir un hueco en su agenda?`,
            ['Sí, agendar llamada', 'Tengo más dudas']
          );
        }, 300);
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
            "Entendido. ¿Quieres que sigamos con las preguntas o tienes alguna duda?",
            ['Seguir con las preguntas', 'Tengo una duda']
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
    const steps: ConversationStep[] = ['welcome', 'nombre', 'sector', 'problema', 'urgencia', 'presupuesto', 'email', 'telefono', 'empresa', 'cierre'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex === -1) return 100;
    return Math.round((currentIndex / (steps.length - 1)) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white">
      <div className="h-16"></div>

      <section className="py-8 md:py-12 px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Back Link */}
          <Link href="/contacto" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 transition-colors text-sm">
            ← Volver a contacto
          </Link>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/40 rounded-full px-4 py-2 mb-4">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-cyan-400 text-sm font-medium">Asistente disponible</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Hablemos de tu proyecto
            </h1>
            <p className="text-slate-400 text-sm">
              Unas preguntas rápidas para preparar tu llamada con Mateo
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Progreso</span>
              <span>{getStepProgress()}%</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                style={{ width: `${getStepProgress()}%` }}
              ></div>
            </div>
          </div>

          {/* Chat Container */}
          <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden backdrop-blur-sm">
            {/* Messages Area */}
            <div 
              ref={messagesContainerRef}
              className="h-[400px] md:h-[450px] overflow-y-auto p-4 md:p-6 space-y-4"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    {message.type === 'bot' && (
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                          </svg>
                        </div>
                        <span className="text-xs text-slate-500">Asistente de Neuriax</span>
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                          : 'bg-slate-800/80 text-slate-200 border border-slate-700/50'
                      }`}
                    >
                      <p className="whitespace-pre-line text-sm md:text-base">{message.content}</p>
                    </div>
                    
                    {/* Options */}
                    {message.options && message.type === 'bot' && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className="px-3 py-2 text-sm bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-600 hover:border-cyan-500/50 rounded-xl transition-all hover:scale-105"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800/80 rounded-2xl px-4 py-3 border border-slate-700/50">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-slate-700/50 p-4">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escribe tu respuesta..."
                  className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isSubmitting}
                  className="px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* Calendly Button */}
          {showCalendly && (
            <div className="mt-6 text-center animate-fade-in">
              <a
                href="https://calendly.com/neuriax/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-green-500/25 transition-all hover:scale-105 text-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Agendar llamada ahora
              </a>
              <p className="text-slate-500 text-sm mt-3">
                15-20 minutos · Sin compromiso · 100% gratis
              </p>
            </div>
          )}

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Sin compromiso
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Datos seguros
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Te decimos si no encaja
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
