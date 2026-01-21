import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Mantenimiento - Neuriax',
  description: 'Estamos realizando mantenimiento. Disculpa las molestias.',
};

export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center p-6'>
      <div className='text-center max-w-2xl'>
        {/* Logo Neuriax */}
        <div className='mb-8'>
          <Image
            src='/logo-neuriax.png'
            alt='Neuriax Logo'
            width={120}
            height={120}
            className='mx-auto drop-shadow-lg'
          />
        </div>

        {/* Title */}
        <h1 className='text-5xl font-bold mb-4'>
          En mantenimiento
        </h1>

        {/* Description */}
        <p className='text-xl text-gray-300 mb-8'>
          Estamos optimizando nuestros sistemas para ofrecerte una mejor experiencia.
        </p>

        {/* Secondary message */}
        <div className='bg-white/[0.03] border border-white/[0.08] rounded-lg p-6 mb-8 backdrop-blur-md'>
          <p className='text-gray-300 mb-4'>
            Disculpa las molestias. Volvemos pronto con una web mejorada.
          </p>
          <p className='text-sm text-gray-400'>
            Mientras tanto, puedes contactarnos en:
          </p>
          <p className='text-cyan-400 font-semibold mt-2'>
            Correo | WhatsApp | Teléfono
          </p>
        </div>

        {/* Loading animation */}
        <div className='flex justify-center gap-2 mb-8'>
          <div className='w-2 h-2 bg-cyan-400 rounded-full animate-pulse'></div>
          <div className='w-2 h-2 bg-cyan-400 rounded-full animate-pulse' style={{ animationDelay: '0.2s' }}></div>
          <div className='w-2 h-2 bg-cyan-400 rounded-full animate-pulse' style={{ animationDelay: '0.4s' }}></div>
        </div>

        {/* Footer */}
        <p className='text-xs text-gray-500'>
           2026 Neuriax. Transformación digital inteligente.
        </p>
      </div>
    </div>
  );
}
