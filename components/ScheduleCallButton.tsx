'use client';

export default function ScheduleCallButton() {
  const handleScheduleCall = () => {
    const calendlyUrl = "https://calendly.com/neuriax/30min";
    window.open(calendlyUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleScheduleCall}
      className="fixed bottom-24 right-6 md:bottom-28 md:right-8 z-50 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 p-4 md:p-5 flex items-center justify-center cursor-pointer border-0"
      title="Agendar llamada"
      aria-label="Agendar llamada"
    >
      <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    </button>
  );
}
