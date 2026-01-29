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
  | 'final';

export default function FormularioContacto() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState<ConversationStep>('welcome');
  const [isTyping, setIsTyping] = useState(false);
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
        "¡Hola! 👋 Soy María, la asistente de Mateo en Neuriax.\n\n**Rellena este formulario para obtener un descuento especial** en nuestros servicios.\n\nPara poder ayudarte de la mejor manera, necesito hacerte 5 preguntas rápidas. Después podrás agendar una llamada gratuita con Mateo donde resolverás todas tus dudas.\n\n**¿Empezamos?**",
        ['Sí, empecemos']
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

  const processResponse = async (response: string) => {
    const lowerResponse = response.toLowerCase();

    // Flujo principal de recopilación - FORMULARIO ESTRUCTURADO (sin desviaciones)
    switch (currentStep) {
      case 'welcome':
        // Cualquier respuesta inicia el formulario
        setCurrentStep('nombre');
        setTimeout(() => {
          addBotMessage("¡Perfecto! 😊\n\n**Pregunta 1 de 5**\n\n¿Cómo te llamas?");
        }, 300);
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
          addBotMessage(`Perfecto. ✉️\n\n**Pregunta 3 de 5**\n\n¿Tu número de teléfono?\n\n_(Por si hay algún cambio de última hora)_`);
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
            `${response}, anotado. 🏢\n\n**Pregunta 5 de 5** (última)\n\n¿Qué te gustaría conseguir? (web, automatización, chatbot, etc.)`,
            ['Necesito una web profesional', 'Quiero automatizar procesos', 'Chatbot para mi negocio', 'No tengo claro, quiero explorar']
          );
        }, 300);
        break;

      case 'necesidad':
        setLeadData(prev => ({ ...prev, problema: response }));
        setCurrentStep('recomendacion');
        
        // Mostrar directamente la opción de agendar
        setTimeout(() => {
          addBotMessage(
            `¡Perfecto, ${leadData.nombre}! ✅\n\n**Ya tengo toda la información.**\n\nAhora el siguiente paso es agendar una llamada gratuita de 15-20 minutos con Mateo, donde:\n\n📞 Analizará tu caso específico\n💡 Te dará una propuesta personalizada\n🤝 Resolverá todas tus dudas\n✨ Sin compromiso\n\n**¿Agendamos la llamada?**`,
            ['Sí, agendar llamada ahora']
          );
        }, 500);
        break;

      case 'recomendacion':
        // Cualquier respuesta lleva a agendar
        submitLeadAndShowCalendly();
        break;

      case 'final':
        // Si ya está en final, mostrar calendly
        submitLeadAndShowCalendly();
        break;

      default:
        // Si se pierde, reiniciar al paso actual o siguiente lógico
        setTimeout(() => {
          addBotMessage(
            "¿Continuamos con el formulario?",
            ['Sí, continuar']
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
    const steps: ConversationStep[] = ['welcome', 'nombre', 'email', 'telefono', 'empresa', 'necesidad', 'recomendacion', 'final'];
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
                <span>Respuesta inmediata</span>
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
