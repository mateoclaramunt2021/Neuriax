const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://wfnaknuhwzmkriaetvtn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmbmFrbnVod3pta3JpYWV0dnRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODA1OTMwMCwiZXhwIjoyMDgzNjM1MzAwfQ.CQ4Gm1k_eZ3Pn5TGQRbPblL_sRp9gahQubIUiytUdlE'
);

const nuevasNoticias = [
  {
    title: 'Mistral AI lanza Le Chat Enterprise para empresas europeas',
    description: 'La startup francesa Mistral AI presenta su asistente empresarial con cumplimiento GDPR nativo y procesamiento de datos en servidores europeos.',
    content: '<h2>Mistral AI desafía a OpenAI en el mercado empresarial europeo</h2><p>La startup francesa Mistral AI ha lanzado Le Chat Enterprise, una solución de IA conversacional diseñada específicamente para empresas europeas que requieren cumplimiento estricto del GDPR.</p><h3>Características principales</h3><ul><li>Procesamiento 100% en servidores europeos</li><li>Cumplimiento GDPR nativo</li><li>Integración con Microsoft 365 y Google Workspace</li><li>Modelos entrenados sin datos de usuarios</li></ul><p>El precio comienza en 20€ por usuario al mes, significativamente más económico que las alternativas americanas.</p>',
    slug: 'mistral-le-chat-enterprise-2026',
    category: 'IA',
    read_time: '4 min',
    published: true,
    source_name: 'Neuriax'
  },
  {
    title: 'China presenta Ernie 5.0: el modelo que supera a GPT-4 en chino',
    description: 'Baidu lanza Ernie 5.0 con capacidades multimodales avanzadas y rendimiento superior en tareas en idioma chino.',
    content: '<h2>Ernie 5.0 marca un hito en la IA china</h2><p>Baidu ha presentado Ernie 5.0, su modelo de IA más avanzado que supera a GPT-4 en benchmarks de comprensión y generación en chino mandarín.</p><h3>Avances técnicos</h3><ul><li>Contexto de 1 millón de tokens</li><li>Generación de video en tiempo real</li><li>Razonamiento matemático mejorado un 40%</li><li>Disponible gratis para desarrolladores chinos</li></ul>',
    slug: 'baidu-ernie-5-china-2026',
    category: 'IA',
    read_time: '5 min',
    published: true,
    source_name: 'Neuriax'
  },
  {
    title: 'Stability AI lanza Stable Diffusion 4 con generación de video',
    description: 'La nueva versión del popular modelo de código abierto incluye generación de videos de 30 segundos y edición de imágenes en tiempo real.',
    content: '<h2>Stable Diffusion 4 revoluciona la creación visual</h2><p>Stability AI ha lanzado Stable Diffusion 4, la actualización más importante de su modelo de generación de imágenes que ahora incluye capacidades de video.</p><h3>Novedades</h3><ul><li>Videos de hasta 30 segundos en 4K</li><li>Edición en tiempo real con prompts</li><li>Nuevo modelo de licencia comercial flexible</li><li>Funciona en GPUs con 8GB de VRAM</li></ul>',
    slug: 'stable-diffusion-4-video-2026',
    category: 'IA',
    read_time: '4 min',
    published: true,
    source_name: 'Neuriax'
  },
  {
    title: 'GitHub Copilot ahora escribe tests automáticamente',
    description: 'La nueva función de GitHub Copilot genera tests unitarios completos analizando el código existente, aumentando la cobertura un 60%.',
    content: '<h2>Copilot transforma el testing de software</h2><p>GitHub ha anunciado que Copilot ahora puede generar automáticamente tests unitarios completos para cualquier función o clase.</p><h3>Cómo funciona</h3><ul><li>Analiza el código y genera tests edge-case</li><li>Soporta Jest, Pytest, JUnit y más</li><li>Integración directa con CI/CD</li><li>Aumenta cobertura promedio del 30% al 90%</li></ul>',
    slug: 'github-copilot-tests-automaticos-2026',
    category: 'IA',
    read_time: '5 min',
    published: true,
    source_name: 'Neuriax'
  },
  {
    title: 'Perplexity AI alcanza 100 millones de usuarios activos',
    description: 'El buscador con IA supera a DuckDuckGo en usuarios mensuales y se posiciona como alternativa real a Google.',
    content: '<h2>Perplexity desafía el dominio de Google</h2><p>Perplexity AI ha alcanzado los 100 millones de usuarios activos mensuales, consolidándose como la alternativa de IA más popular a Google Search.</p><h3>Claves del éxito</h3><ul><li>Respuestas con fuentes citadas</li><li>Sin anuncios en resultados</li><li>API gratuita para desarrolladores</li><li>Modo Pro con acceso a múltiples LLMs</li></ul>',
    slug: 'perplexity-100-millones-usuarios-2026',
    category: 'IA',
    read_time: '4 min',
    published: true,
    source_name: 'Neuriax'
  },
  {
    title: 'OpenAI lanza ChatGPT Team para pequeñas empresas',
    description: 'Nueva suscripción de $25/usuario/mes que incluye GPT-4, DALL-E 3 y análisis de datos sin límites para equipos de hasta 50 personas.',
    content: '<h2>ChatGPT se hace accesible para PYMEs</h2><p>OpenAI ha lanzado ChatGPT Team, un plan diseñado específicamente para pequeñas y medianas empresas que quieren adoptar IA sin comprometer seguridad.</p><h3>Qué incluye</h3><ul><li>GPT-4 Turbo sin límites</li><li>DALL-E 3 para imágenes</li><li>Análisis de datos avanzado</li><li>Workspace compartido seguro</li><li>Datos no usados para entrenar</li></ul>',
    slug: 'chatgpt-team-pymes-2026',
    category: 'IA',
    read_time: '4 min',
    published: true,
    source_name: 'Neuriax'
  },
  {
    title: 'BMW integra ChatGPT en todos sus vehículos desde fábrica',
    description: 'Todos los modelos BMW 2026 incluirán asistente de voz con ChatGPT integrado para navegación, entretenimiento y control del vehículo.',
    content: '<h2>BMW apuesta por la IA conversacional en coches</h2><p>BMW ha anunciado que todos sus vehículos fabricados a partir de 2026 incluirán ChatGPT integrado en el sistema de infoentretenimiento iDrive.</p><h3>Funcionalidades</h3><ul><li>Control por voz natural del vehículo</li><li>Navegación conversacional</li><li>Resúmenes de noticias y emails</li><li>Programación de citas y recordatorios</li></ul>',
    slug: 'bmw-chatgpt-coches-2026',
    category: 'IA',
    read_time: '4 min',
    published: true,
    source_name: 'Neuriax'
  },
  {
    title: 'Runway lanza Gen-3 Alpha: videos de 2 minutos con IA',
    description: 'El nuevo modelo de Runway permite generar videos coherentes de hasta 2 minutos con control preciso de cámara y personajes.',
    content: '<h2>Runway redefine la producción de video</h2><p>Runway ha presentado Gen-3 Alpha, su modelo más avanzado que permite generar videos de hasta 2 minutos con coherencia temporal perfecta.</p><h3>Características</h3><ul><li>Videos de 2 minutos en 4K</li><li>Control de movimientos de cámara</li><li>Personajes consistentes entre escenas</li><li>Editor de video integrado con IA</li></ul>',
    slug: 'runway-gen3-alpha-videos-2026',
    category: 'IA',
    read_time: '5 min',
    published: true,
    source_name: 'Neuriax'
  },
  {
    title: 'Spotify usa IA para crear podcasts personalizados diarios',
    description: 'La nueva función Daily Drive AI genera un podcast personalizado cada mañana con noticias, música y contenido basado en tus gustos.',
    content: '<h2>Spotify revoluciona el contenido matutino</h2><p>Spotify ha lanzado Daily Drive AI, una función que genera automáticamente un podcast personalizado cada mañana para cada usuario.</p><h3>Cómo funciona</h3><ul><li>Voz sintetizada natural</li><li>Mezcla noticias, música y podcasts favoritos</li><li>Duración personalizable (15-60 min)</li><li>Aprende de tus preferencias</li></ul>',
    slug: 'spotify-podcast-ia-personalizado-2026',
    category: 'IA',
    read_time: '4 min',
    published: true,
    source_name: 'Neuriax'
  },
  {
    title: 'Adobe Firefly 3 permite editar fotos con comandos de voz',
    description: 'La nueva versión de Adobe Firefly integra control por voz para edición de imágenes profesional en Photoshop y Lightroom.',
    content: '<h2>Adobe hace la edición accesible para todos</h2><p>Adobe ha lanzado Firefly 3 con integración de comandos de voz que permite editar fotos profesionalmente sin conocimientos técnicos.</p><h3>Ejemplos de comandos</h3><ul><li>"Elimina el fondo y ponlo en una playa"</li><li>"Mejora la iluminación del rostro"</li><li>"Cambia el color del vestido a azul"</li><li>"Añade un atardecer dramático"</li></ul>',
    slug: 'adobe-firefly-3-voz-2026',
    category: 'IA',
    read_time: '4 min',
    published: true,
    source_name: 'Neuriax'
  },
  {
    title: 'Duolingo Max usa GPT-4 para conversaciones realistas',
    description: 'La nueva suscripción premium de Duolingo incluye roleplay con IA que simula conversaciones reales en el idioma que estás aprendiendo.',
    content: '<h2>Duolingo transforma el aprendizaje de idiomas</h2><p>Duolingo ha lanzado Duolingo Max, una suscripción premium que usa GPT-4 para crear conversaciones realistas y personalizadas.</p><h3>Funciones exclusivas</h3><ul><li>Roleplay en situaciones reales</li><li>Corrección de pronunciación con IA</li><li>Explicaciones gramaticales personalizadas</li><li>Práctica de conversación ilimitada</li></ul>',
    slug: 'duolingo-max-gpt4-2026',
    category: 'IA',
    read_time: '4 min',
    published: true,
    source_name: 'Neuriax'
  },
  {
    title: 'Samsung Galaxy S26 incluye procesador NPU dedicado para IA',
    description: 'El nuevo flagship de Samsung integra un procesador neural de 4nm que ejecuta modelos de IA localmente sin conexión a internet.',
    content: '<h2>Samsung apuesta por la IA on-device</h2><p>Samsung ha presentado el Galaxy S26 con un procesador NPU dedicado que permite ejecutar modelos de IA avanzados directamente en el dispositivo.</p><h3>Capacidades</h3><ul><li>Traducción en tiempo real offline</li><li>Generación de imágenes local</li><li>Asistente de voz sin internet</li><li>Privacidad total de datos</li></ul>',
    slug: 'samsung-galaxy-s26-npu-ia-2026',
    category: 'IA',
    read_time: '5 min',
    published: true,
    source_name: 'Neuriax'
  },
  {
    title: 'Notion AI ahora crea bases de datos completas desde texto',
    description: 'La nueva función de Notion AI puede generar bases de datos estructuradas, plantillas y automatizaciones desde una simple descripción.',
    content: '<h2>Notion AI simplifica la organización</h2><p>Notion ha actualizado su IA para permitir la creación de bases de datos completas desde descripciones en lenguaje natural.</p><h3>Ejemplos</h3><ul><li>"Crea un CRM para mi startup"</li><li>"Diseña un sistema de gestión de proyectos"</li><li>"Haz un tracker de hábitos con gráficos"</li></ul>',
    slug: 'notion-ai-bases-datos-2026',
    category: 'IA',
    read_time: '4 min',
    published: true,
    source_name: 'Neuriax'
  },
  {
    title: 'Midjourney v7 genera imágenes indistinguibles de fotos reales',
    description: 'La nueva versión de Midjourney alcanza un realismo fotográfico del 99.7% según tests ciegos con expertos en fotografía.',
    content: '<h2>Midjourney v7 cruza el valle inquietante</h2><p>Midjourney ha lanzado la versión 7 de su modelo, alcanzando un nivel de fotorealismo que hace prácticamente imposible distinguir sus imágenes de fotografías reales.</p><h3>Mejoras</h3><ul><li>Manos y dedos perfectos</li><li>Texto legible en imágenes</li><li>Consistencia de personajes</li><li>Control preciso de iluminación</li></ul>',
    slug: 'midjourney-v7-fotorealismo-2026',
    category: 'IA',
    read_time: '5 min',
    published: true,
    source_name: 'Neuriax'
  },
  {
    title: 'LinkedIn integra IA para escribir mensajes de networking',
    description: 'Nueva función de LinkedIn usa IA para generar mensajes personalizados de conexión basados en el perfil del destinatario.',
    content: '<h2>LinkedIn facilita el networking profesional</h2><p>LinkedIn ha lanzado una función de IA que genera mensajes de conexión personalizados analizando el perfil profesional del destinatario.</p><h3>Cómo funciona</h3><ul><li>Analiza experiencia y habilidades comunes</li><li>Sugiere temas de conversación relevantes</li><li>Adapta el tono al contexto</li><li>Aumenta tasa de aceptación un 40%</li></ul>',
    slug: 'linkedin-ia-mensajes-networking-2026',
    category: 'IA',
    read_time: '4 min',
    published: true,
    source_name: 'Neuriax'
  }
];

async function addNews() {
  const { data, error } = await supabase.from('blog_posts').insert(nuevasNoticias);
  
  if (error) {
    console.log('❌ Error:', error.message);
  } else {
    console.log('✅ Insertadas', nuevasNoticias.length, 'noticias nuevas');
  }
  
  const { count } = await supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('published', true);
  console.log('📊 Total posts en el blog:', count);
}

addNews();
