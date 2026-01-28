'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  text: string;
  isBot: boolean;
  isLink?: boolean;
}

interface ConversationMessage {
  type: 'user' | 'bot';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "¡Hola! Soy María, la asistente de Neuriax. Estoy aquí para ayudarte con automatización, IA, webs y consultoría digital. ¿En qué puedo ayudarte?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickResponses = [
    "¿Qué servicios ofrecéis?",
    "Precio de una web",
    "Chatbot + automatización",
    "Agendar llamada"
  ];

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    // Añadir mensaje del usuario
    const userMessage: Message = { text: message, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Actualizar historial de conversación
    const newHistory: ConversationMessage[] = [
      ...conversationHistory,
      { type: 'user', content: message }
    ];
    setConversationHistory(newHistory);

    try {
      // Llamar a la API de IA
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newHistory,
        }),
      });

      const data = await response.json();
      
      const botMessage = data.message || "Disculpa, no pude procesar tu mensaje. ¿Puedes intentarlo de nuevo?";
      const hasLink = botMessage.includes('https://');

      // Añadir respuesta del bot
      setMessages(prev => [...prev, { 
        text: botMessage, 
        isBot: true, 
        isLink: hasLink 
      }]);

      // Actualizar historial con respuesta del bot
      setConversationHistory(prev => [
        ...prev,
        { type: 'bot', content: botMessage }
      ]);

    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      setMessages(prev => [...prev, { 
        text: "Disculpa, tuve un problema técnico. ¿Puedes intentarlo de nuevo?", 
        isBot: true 
      }]);
    } finally {
      setIsLoading(false);
    }
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
                            📅 Agendar llamada aquí
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
            {/* Indicador de escritura */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 text-slate-200 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
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
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage(inputValue)}
                placeholder={isLoading ? "María está escribiendo..." : "Escribe tu pregunta..."}
                disabled={isLoading}
                className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 disabled:opacity-50"
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                disabled={isLoading || !inputValue.trim()}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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