interface VideoSectionProps {
  videoId?: string; // Para YouTube
  localVideo?: string; // Para vÃ­deo local
  title: string;
  description: string;
}

export default function VideoSection({ videoId, localVideo, title, description }: VideoSectionProps) {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          {description}
        </p>

        <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-lg overflow-hidden shadow-2xl">
          {videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Video de introducciÃ³n"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : localVideo ? (
            <video
              src={localVideo}
              controls
              className="w-full h-full object-cover"
              poster="/video-poster.jpg"
            >
              Tu navegador no soporta el elemento de vÃ­deo.
            </video>
          ) : (
            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-cyan-500">
                  <svg className="w-8 h-8 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-cyan-300 font-medium">Te mostramos ejemplos reales de soluciones aplicadas durante la llamada.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
