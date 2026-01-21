import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'En mantenimiento - Neuriax',
  description: 'Estamos realizando tareas de mantenimiento. Volvemos pronto.',
};

export default function Home() {
  return (
    <div className='min-h-screen bg-black text-white flex items-center justify-center p-6'>
      <div className='text-center max-w-2xl'>
        {/* Logo */}
        <div className='mb-12 animate-pulse'>
          <Image
            src='/logo-neuriax.png'
            alt='Neuriax'
            width={150}
            height={150}
            className='mx-auto drop-shadow-2xl'
            priority
          />
        </div>

        {/* Title */}
        <h1 className='text-6xl font-bold mb-6 text-white'>
          En mantenimiento
        </h1>

        {/* Description */}
        <p className='text-2xl text-gray-300 mb-8 leading-relaxed'>
          Estamos optimizando nuestros sistemas para ofrecerte la mejor experiencia.
        </p>

        {/* Message */}
        <div className='bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-lg p-8 mb-12 backdrop-blur'>
          <p className='text-lg text-gray-300 mb-4'>
            Disculpa las molestias. Volvemos en breve con una web mejorada.
          </p>
          <p className='text-sm text-gray-400'>
            Mientras tanto, puedes contactarnos directamente
          </p>
        </div>

        {/* Loading dots */}
        <div className='flex justify-center gap-3 mb-12'>
          <div className='w-3 h-3 bg-cyan-400 rounded-full animate-bounce'></div>
          <div className='w-3 h-3 bg-cyan-400 rounded-full animate-bounce' style={{ animationDelay: '0.2s' }}></div>
          <div className='w-3 h-3 bg-cyan-400 rounded-full animate-bounce' style={{ animationDelay: '0.4s' }}></div>
        </div>

        {/* Footer */}
        <p className='text-gray-500 text-sm'>
           2026 Neuriax. Transformación digital inteligente.
        </p>
      </div>
    </div>
  );
}
