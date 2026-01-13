'use client';

import { useState } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "¡Hola! Soy Mateo, tu asistente virtual. ¿En qué puedo ayudarte hoy?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickResponses = [
    "Quiero saber más sobre tus servicios",
    "¿Cuánto cuesta una automatización?",
    "¿Trabajas con empresas de mi sector?",
    "Agenda una consulta gratuita"
  ];

  const botResponses = {
    "servicios": "Ofrecemos soluciones de automatización personalizadas para restaurantes, inmobiliarias y servicios profesionales. Podemos ayudarte a eliminar tareas repetitivas, mejorar la eficiencia y aumentar tus ingresos.",
    "costos": "Los precios dependen de la complejidad del proyecto. Una automatización básica puede costar desde 500€, mientras que soluciones más complejas pueden llegar a 5000€. Ofrecemos consultoría gratuita para evaluar tu caso.",
    "sector": "Trabajamos principalmente con restaurantes, inmobiliarias y servicios profesionales, pero podemos adaptar soluciones para otros sectores. ¿Cuál es tu sector?",
    "consulta": "¡Perfecto! Puedes agendar una consulta gratuita de 30 minutos aquí: https://calendly.com/neuriax/30min",
    "default": "Nos encantaría ayudarte mejor. ¿Puedes contarnos más sobre tu negocio o qué problema estás tratando de resolver?"
  };

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    const newMessages = [...messages, { text: message, isBot: false }];
    setMessages(newMessages);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const response = getBotResponse(message.toLowerCase());
      setMessages(prev => [...prev, { text: response, isBot: true }]);
    }, 1000);
  };

  const getBotResponse = (message: string) => {
    if (message.includes('servicio') || message.includes('qué haces') || message.includes('ofreces')) {
      return botResponses.servicios;
    }
    if (message.includes('cuesta') || message.includes('precio') || message.includes('cost')) {
      return botResponses.costos;
    }
    if (message.includes('sector') || message.includes('trabajas')) {
      return botResponses.sector;
    }
    if (message.includes('consulta') || message.includes('llamada') || message.includes('reunión')) {
      return botResponses.consulta;
    }
    return botResponses.default;
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
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-slate-900 rounded-lg shadow-2xl border border-slate-700 z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <span className="text-sm font-bold">M</span>
              </div>
              <div>
                <h3 className="font-semibold">Mateo</h3>
                <p className="text-xs opacity-90">Asistente virtual</p>
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
                <div className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.isBot
                    ? 'bg-slate-800 text-slate-200'
                    : 'bg-cyan-500 text-white'
                }`}>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Responses */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {quickResponses.slice(0, 3).map((response, index) => (
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
                placeholder="Escribe tu mensaje..."
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