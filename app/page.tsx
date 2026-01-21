import { Metadata } from " next\;

export const metadata: Metadata = {
 title: \Mantenimiento - Neuriax\,
 description: \Estamos realizando mantenimiento. Disculpa las molestias.\,
};

export default function Home() {
 return (
 <div className=\min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center p-6\>
 <div className=\text-center max-w-2xl\>
 {/* Logo/Icon */}
 <div className=\mb-8\>
 <div className=\inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full\>
 <svg className=\w-10 h-10 text-white\ fill=\none\ stroke=\currentColor\ viewBox=\0 0 24 24\>
 <path strokeLinecap=\round\ strokeLinejoin=\round\ strokeWidth={2} d=\M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z\ />
 </svg>
 </div>
 </div>

 {/* Title */}
 <h1 className=\text-5xl font-bold mb-4\>
 En mantenimiento
 </h1>

 {/* Description */}
 <p className=\text-xl text-gray-300 mb-8\>
 Estamos optimizando nuestros sistemas para ofrecerte una mejor experiencia.
 </p>

 {/* Secondary message */}
 <div className=\bg-white/[0.03] border border-white/[0.08] rounded-lg p-6 mb-8 backdrop-blur-md\>
 <p className=\text-gray-300 mb-4\>
 Disculpa las molestias. Volvemos pronto con una web mejorada.
 </p>
 <p className=\text-sm text-gray-400\>
 Mientras tanto, puedes contactarnos en:
 </p>
 <p className=\text-cyan-400 font-semibold mt-2\>
 Correo | WhatsApp | Teléfono
 </p>
 </div>

 {/* Loading animation */}
 <div className=\flex justify-center gap-2 mb-8\>
 <div className=\w-2 h-2 bg-cyan-400 rounded-full animate-pulse\></div>
 <div className=\w-2 h-2 bg-cyan-400 rounded-full animate-pulse\ style={{ animationDelay: '0.2s' }}></div>
 <div className=\w-2 h-2 bg-cyan-400 rounded-full animate-pulse\ style={{ animationDelay: '0.4s' }}></div>
 </div>

 {/* Footer */}
 <p className=\text-xs text-gray-500\>
 2026 Neuriax. Transformación digital inteligente.
 </p>
 </div>
 </div>
 );
}
