'use client';

import { useState } from 'react';

interface Message {
  text: string;
  isBot: boolean;
  isLink?: boolean;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "¡Hola! Soy Maria, la asistenta de Neuriax. Estoy aquí para ayudarte con automatización, IA, webs y consultoría digital. ¿En qué puedo ayudarte?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [conversationContext, setConversationContext] = useState<{
    industry?: string;
    goal?: string;
    channel?: string;
    messageCount?: number;
  }>({});

  const quickResponses = [
    "¿Qué servicios ofreces?",
    "Precio de una web",
    "Chatbot + automatización",
    "Agendar llamada"
  ];

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    const newMessages = [...messages, { text: message, isBot: false }];
    setMessages(newMessages);
    setInputValue('');

    const newContext = { ...conversationContext, messageCount: (conversationContext.messageCount || 0) + 1 };
    setConversationContext(newContext);

    // Simulate bot response
    setTimeout(() => {
      const response = getBotResponse(message.toLowerCase(), newContext);
      setMessages(prev => [...prev, { text: response.text, isBot: true, isLink: response.isLink }]);
    }, 800);
  };

  const getBotResponse = (message: string, context: any): { text: string; isLink?: boolean } => {
    const lowerMsg = message.toLowerCase();

    // FLUJO A: Precio / Web
    if (lowerMsg.includes('precio') || lowerMsg.includes('cuesta') || lowerMsg.includes('coste') || lowerMsg.includes('web')) {
      if (lowerMsg.includes('web')) {
        const response = "Nuestra web Básica cuesta 790€. Incluye:\n✓ Diseño responsive\n✓ Información de negocio\n✓ Botón WhatsApp y llamada\n✓ Google Maps integrado\n✓ Optimización de velocidad\n✓ Dominio + hosting 1 año incluidos\n\nEntrega en 10-15 días según complejidad.\n\n¿Qué sector es y qué funcionalidad necesitarías (reservas, e-commerce)?";
        return { text: response };
      }
      return { text: "¿Estás preguntando por una web o por automatización/chatbot? Te doy un rango más exacto." };
    }

    // FLUJO B: Automatización / Chatbot / IA
    if (lowerMsg.includes('chatbot') || lowerMsg.includes('automatiza') || lowerMsg.includes('whatsapp') || lowerMsg.includes('ia') || lowerMsg.includes('ai')) {
      const response = "Implementamos:\n✓ Chatbots 24/7 (responder leads automáticamente)\n✓ Seguimiento automático + cualificación\n✓ Automatización WhatsApp con IA (desde 300€)\n✓ Dashboards y reportes automáticos\n\nCoste depende del alcance. ¿Por dónde te entran leads hoy? (WhatsApp, web, Instagram, llamadas)";
      return { text: response };
    }

    // FLUJO C: Casos / Ejemplos
    if (lowerMsg.includes('caso') || lowerMsg.includes('ejemplo') || lowerMsg.includes('resultado') || lowerMsg.includes('funciona')) {
      const response = "Aquí van 3 casos típicos:\n\n🍽️ RESTAURANTE: Sistema de reservas online + chatbot que responde 24/7 y recuerda reservas → 40% más ocupación.\n\n🏠 INMOBILIARIA: CRM integrado + seguimiento automático de propiedades → reducen tiempo de respuesta 80%.\n\n💼 CONSULTORÍA: Automatización de facturación + agendamiento + dashboard de KPIs → ahorran 15h/semana.\n\n¿Te encaja tu sector? Agendamos 30 min y lo aterrizamos a tu caso.";
      return { text: response };
    }

    // FLUJO D: General - ¿Qué hacéis?
    if (lowerMsg.includes('qué haces') || lowerMsg.includes('quién eres') || lowerMsg.includes('servicios') || lowerMsg.includes('ofrece')) {
      const response = "Somos Neuriax. Ofrecemos dos líneas:\n\n🤖 AUTOMATIZACIÓN & IA\n→ Chatbots, seguimiento automático, reportes, procesos IA.\n→ Solucionamos: leads sin respuesta, tareas repetitivas, falta de seguimiento.\n\n💻 WEBS PROFESIONALES\n→ Diseño a medida, SEO local, reservas/WhatsApp, orientadas a conversión.\n→ Desde 790€.\n\n¿Cuál te interesa?";
      return { text: response };
    }

    // FLUJO E: Tiempos / Plazos
    if (lowerMsg.includes('tiempo') || lowerMsg.includes('plazo') || lowerMsg.includes('cuánto tarda') || lowerMsg.includes('entrega')) {
      return { text: "⏱️ Tiempos típicos:\n\n📅 Web: 10-15 días tras el brief (según complejidad e info que aportes).\n\n⚙️ Automatización: depende del alcance (rango 2-8 semanas).\n\nEn la llamada te confirmo el plazo exacto según tu proyecto." };
    }

    // FLUJO: Agendar llamada directamente
    if (lowerMsg.includes('agendar') || lowerMsg.includes('llamada') || lowerMsg.includes('reunión') || lowerMsg.includes('consulta')) {
      return { 
        text: "Perfecto. 📞 La llamada es gratis, 30 minutos, sin compromiso. Análisis personalizado de tu caso.\n\nAqui el enlace: /contacto\n\nSi me dices tu sector y tu principal problema, llegamos más preparados.",
        isLink: true
      };
    }

    // Preguntas frecuentes
    if (lowerMsg.includes('dominio') || lowerMsg.includes('hosting')) {
      return { text: "✓ Sí, dominio + hosting 1 año incluidos en cualquier plan web.\n\nRenovación anual: 120€/año." };
    }

    if (lowerMsg.includes('soporte') || lowerMsg.includes('mantenimiento')) {
      return { text: "✓ Soporte sí, incluido.\n\n📌 Mantenimiento opcional: 49€/mes (actualizaciones, copias, seguridad, cambios pequeños)." };
    }

    if (lowerMsg.includes('reservas') || lowerMsg.includes('booking')) {
      return { text: "✓ Integramos sistema de reservas online.\n\nCoste: +150€ (o a medida según complejidad)." };
    }

    if (lowerMsg.includes('reseña') || lowerMsg.includes('google')) {
      return { text: "No se pueden eliminar reseñas, pero sí mejorar reputación con estrategia de generación de reviews positivas.\n\nEso lo analizamos en la llamada." };
    }

    if (lowerMsg.includes('extra') || lowerMsg.includes('multiidioma') || lowerMsg.includes('ecommerce') || lowerMsg.includes('seo')) {
      return { text: "Extras típicos:\n✓ Multiidioma: +200€\n✓ E-commerce: +300€\n✓ Reservas: +150€\n✓ Automatización WhatsApp IA: desde 300€\n✓ SEO mensual: desde 250€/mes\n\n¿Cual necesitas?" };
    }

    // Detección de intención ALTA: sugerir llamada
    if (lowerMsg.includes('quiero') || lowerMsg.includes('necesito') || lowerMsg.includes('presupuesto') || lowerMsg.includes('proyecto')) {
      return { 
        text: "Te lo aterrizamos en 30 min: revisamos tu caso, te digo si merece la pena y qué opción encaja.\n\nEs gratis y sin compromiso. ¿Agenamos? 📞 /contacto",
        isLink: true
      };
    }

    // Default: capturar información
    return { text: "Me encantaría ayudarte más. ¿Puedes decirme:\n\n1) Qué tipo de negocio es?\n2) Qué quieres mejorar (más leads, automatizar procesos, nueva web, visibilidad)?" };
  };

  const handleQuickResponse = (response: string) => {
    handleSendMessage(response);
  };

  return (
    <>
      {/* Chatbot Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
            aria-label="Abrir chat"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[32rem] bg-slate-900 rounded-lg shadow-2xl border border-slate-700 z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <span className="text-sm font-bold">N</span>
              </div>
              <div>
                <h3 className="font-semibold">Neuriax</h3>
                <p className="text-xs opacity-90">Asistente digital</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Cerrar chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-xs px-4 py-2 rounded-lg whitespace-pre-wrap text-sm ${
                  message.isBot
                    ? 'bg-slate-800 text-slate-200'
                    : 'bg-cyan-500 text-white'
                }`}>
                  {message.isLink ? (
                    <>
                      {message.text.split(/(https:\/\/[^\s]+)/g).map((part, i) => 
                        part.startsWith('https://') ? (
                          <a 
                            key={i} 
                            href={part} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 underline font-semibold"
                          >
                            📞 Agendar llamada aquí
                          </a>
                        ) : (
                          <span key={i}>{part}</span>
                        )
                      )}
                    </>
                  ) : (
                    message.text
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Responses */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-slate-400 mb-2">Temas rápidos:</p>
              <div className="flex flex-wrap gap-2">
                {quickResponses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickResponse(response)}
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-full transition-colors"
                  >
                    {response}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                placeholder="Escribe tu pregunta..."
                className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-2 rounded-lg transition-colors"
                aria-label="Enviar mensaje"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
