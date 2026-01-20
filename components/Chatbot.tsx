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
    { text: "Â¡Hola! Soy Maria,la asistenta de Neuriax. Estoy aquÃ­ para ayudarte con automatizaciÃ³n, IA, webs y consultorÃ­a digital. Â¿En quÃ© puedo ayudarte?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [conversationContext, setConversationContext] = useState<{
    industry?: string;
    goal?: string;
    channel?: string;
    messageCount?: number;
  }>({});

  const quickResponses = [
    "Â¿QuÃ© servicios ofreceÃ­s?",
    "Precio de una web",
    "Chatbot + automatizaciÃ³n",
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
        const response = "Nuestra web BÃ¡sica cuesta 790â‚¬. Incluye:\nâœ“ DiseÃ±o responsive\nâœ“ InformaciÃ³n de negocio\nâœ“ BotÃ³n WhatsApp y llamada\nâœ“ Google Maps integrado\nâœ“ OptimizaciÃ³n de velocidad\nâœ“ Dominio + hosting 1 aÃ±o incluidos\n\nEntrega en 10-15 dÃ­as segÃºn complejidad.\n\nÂ¿QuÃ© sector es y quÃ© funcionalidad necesitarÃ­as (reservas, e-commerce)?";
        return { text: response };
      }
      return { text: "Â¿EstÃ¡s preguntando por una web o por automatizaciÃ³n/chatbot? Te doy un rango mÃ¡s exacto." };
    }

    // FLUJO B: AutomatizaciÃ³n / Chatbot / IA
    if (lowerMsg.includes('chatbot') || lowerMsg.includes('automatiza') || lowerMsg.includes('whatsapp') || lowerMsg.includes('ia') || lowerMsg.includes('ai')) {
      const response = "Implementamos:\nâœ“ Chatbots 24/7 (responder leads automÃ¡ticamente)\nâœ“ Seguimiento automÃ¡tico + cualificaciÃ³n\nâœ“ AutomatizaciÃ³n WhatsApp con IA (desde 300â‚¬)\nâœ“ Dashboards y reportes automÃ¡ticos\n\nCoste depende del alcance. Â¿Por dÃ³nde te entran leads hoy? (WhatsApp, web, Instagram, llamadas)";
      return { text: response };
    }

    // FLUJO C: Casos / Ejemplos
    if (lowerMsg.includes('caso') || lowerMsg.includes('ejemplo') || lowerMsg.includes('resultado') || lowerMsg.includes('funciona')) {
      const response = "AquÃ­ van 3 casos tÃ­picos:\n\nðŸ“± RESTAURANTE: Sistema de reservas online + chatbot que responde 24/7 y recuerda reservas â†’ 40% mÃ¡s ocupaciÃ³n.\n\nðŸ  INMOBILIARIA: CRM integrado + seguimiento automÃ¡tico de propiedades â†’ reducen tiempo de respuesta 80%.\n\nðŸ’¼ CONSULTORÃA: AutomatizaciÃ³n de facturaciÃ³n + agendamiento + dashboard de KPIs â†’ ahorran 15h/semana.\n\nÂ¿Te encaja tu sector? Agendamos 30 min y lo aterrizamos a tu caso.";
      return { text: response };
    }

    // FLUJO D: General - Â¿QuÃ© hacÃ©is?
    if (lowerMsg.includes('quÃ© haces') || lowerMsg.includes('quiÃ©n eres') || lowerMsg.includes('servicios') || lowerMsg.includes('ofrece')) {
      const response = "Somos Neuriax. Ofrecemos dos lÃ­neas:\n\nðŸ¤– AUTOMATIZACIÃ“N & IA\nâ†’ Chatbots, seguimiento automÃ¡tico, reportes, procesos IA.\nâ†’ Solucionamos: leads sin respuesta, tareas repetitivas, falta de seguimiento.\n\nðŸ’» WEBS PROFESIONALES\nâ†’ DiseÃ±o a medida, SEO local, reservas/WhatsApp, orientadas a conversiÃ³n.\nâ†’ Desde 790â‚¬.\n\nÂ¿CuÃ¡l te interesa?";
      return { text: response };
    }

    // FLUJO E: Tiempos / Plazos
    if (lowerMsg.includes('tiempo') || lowerMsg.includes('plazo') || lowerMsg.includes('cuÃ¡nto tarda') || lowerMsg.includes('entrega')) {
      return { text: "â±ï¸ Tiempos tÃ­picos:\n\nðŸ• Web: 10-15 dÃ­as tras el brief (segÃºn complejidad e info que aportes).\n\nâš™ï¸ AutomatizaciÃ³n: depende del alcance (rango 2-8 semanas).\n\nEn la llamada te confirmo el plazo exacto segÃºn tu proyecto." };
    }

    // FLUJO: Agendar llamada directamente
    if (lowerMsg.includes('agendar') || lowerMsg.includes('llamada') || lowerMsg.includes('reuniÃ³n') || lowerMsg.includes('consulta')) {
      return { 
        text: "Perfecto. ðŸ“… La llamada es gratis, 30 minutos, sin compromiso. AnÃ¡lisis personalizado de tu caso.\n\nAqui el enlace: /contacto\n\nSi me dices tu sector y tu principal problema, llegamos mÃ¡s preparados.",
        isLink: true
      };
    }

    // Preguntas frecuentes
    if (lowerMsg.includes('dominio') || lowerMsg.includes('hosting')) {
      return { text: "âœ“ SÃ­, dominio + hosting 1 aÃ±o incluidos en cualquier plan web.\n\nRenovaciÃ³n anual: 120â‚¬/aÃ±o." };
    }

    if (lowerMsg.includes('soporte') || lowerMsg.includes('mantenimiento')) {
      return { text: "âœ“ Soporte sÃ­, incluido.\n\nðŸ“Œ Mantenimiento opcional: 49â‚¬/mes (actualizaciones, copias, seguridad, cambios pequeÃ±os)." };
    }

    if (lowerMsg.includes('reservas') || lowerMsg.includes('booking')) {
      return { text: "âœ“ Integramos sistema de reservas online.\n\nCoste: +150â‚¬ (o a medida segÃºn complejidad)." };
    }

    if (lowerMsg.includes('reseÃ±a') || lowerMsg.includes('google')) {
      return { text: "No se pueden eliminar reseÃ±as, pero sÃ­ mejorar reputaciÃ³n con estrategia de generaciÃ³n de reviews positivas.\n\nEso lo analizamos en la llamada." };
    }

    if (lowerMsg.includes('extra') || lowerMsg.includes('multiidioma') || lowerMsg.includes('ecommerce') || lowerMsg.includes('seo')) {
      return { text: "Extras tÃ­picos:\nâœ“ Multiidioma: +200â‚¬\nâœ“ E-commerce: +300â‚¬\nâœ“ Reservas: +150â‚¬\nâœ“ AutomatizaciÃ³n WhatsApp IA: desde 300â‚¬\nâœ“ SEO mensual: desde 250â‚¬/mes\n\nÂ¿Cual necesitas?" };
    }

    // DetecciÃ³n de intenciÃ³n ALTA: sugerir llamada
    if (lowerMsg.includes('quiero') || lowerMsg.includes('necesito') || lowerMsg.includes('presupuesto') || lowerMsg.includes('proyecto')) {
      return { 
        text: "Te lo aterrizamos en 30 min: revisamos tu caso, te digo si merece la pena y quÃ© opciÃ³n encaja.\n\nEs gratis y sin compromiso. Â¿Agenamos? ðŸ“… /contacto",
        isLink: true
      };
    }

    // Default: capturar informaciÃ³n
    return { text: "Me encantarÃ­a ayudarte mÃ¡s. Â¿Puedes decirme:\n\n1) QuÃ© tipo de negocio es?\n2) QuÃ© quieres mejorar (mÃ¡s leads, automatizar procesos, nueva web, visibilidad)?" };
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
                            ðŸ“… Agendar llamada aquÃ­
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
              <p className="text-xs text-slate-400 mb-2">Temas rÃ¡pidos:</p>
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
