import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const SUPABASE_URL = 'https://wfnaknuhwzmkriaetvtn.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmbmFrbnVod3pta3JpYWV0dnRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODA1OTMwMCwiZXhwIjoyMDgzNjM1MzAwfQ.CQ4Gm1k_eZ3Pn5TGQRbPblL_sRp9gahQubIUiytUdlE';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Contenido profesional para cada noticia
const professionalContent: Record<string, { content: string; description: string }> = {
  'nvidia-20260117b': {
    description: 'Nvidia alcanza una valoración histórica de 3 billones de dólares impulsada por la demanda sin precedentes de GPUs para inteligencia artificial.',
    content: `
      <h2>El dominio de Nvidia en la era de la IA</h2>
      <p>Nvidia ha consolidado su posición como el pilar fundamental de la revolución de la inteligencia artificial, alcanzando una capitalización bursátil de <strong>3 billones de dólares</strong>. Este hito histórico posiciona a la compañía como una de las más valiosas del mundo.</p>
      
      <h3>Factores clave del crecimiento</h3>
      <ul>
        <li><strong>Demanda exponencial:</strong> Los centros de datos de empresas como Microsoft, Google y Amazon están adquiriendo GPUs H100 y H200 a un ritmo sin precedentes.</li>
        <li><strong>Escasez de oferta:</strong> La producción no logra satisfacer la demanda global, creando listas de espera de hasta 6 meses.</li>
        <li><strong>Márgenes excepcionales:</strong> Los márgenes brutos superan el 70%, reflejando el poder de fijación de precios de la empresa.</li>
      </ul>
      
      <h3>Impacto en el ecosistema tecnológico</h3>
      <p>La dependencia de Nvidia por parte de la industria de IA ha generado un efecto dominó. Startups y grandes corporaciones compiten por acceder a su hardware, mientras que la compañía diversifica hacia software con CUDA y plataformas de IA empresarial.</p>
      
      <h3>Perspectivas de mercado</h3>
      <p>Los analistas proyectan que la demanda de GPUs para IA se multiplicará por 5 en los próximos tres años, sugiriendo que el crecimiento de Nvidia podría sostenerse a largo plazo.</p>
    `
  },
  'claude4-20260117a': {
    description: 'Anthropic lanza Claude 4, superando a GPT-4 en benchmarks de razonamiento y estableciendo nuevos estándares de seguridad en IA.',
    content: `
      <h2>Claude 4: Un nuevo paradigma en IA conversacional</h2>
      <p>Anthropic ha presentado <strong>Claude 4</strong>, su modelo más avanzado hasta la fecha, que supera consistentemente a GPT-4 en múltiples benchmarks de razonamiento lógico y comprensión contextual.</p>
      
      <h3>Mejoras técnicas destacadas</h3>
      <ul>
        <li><strong>Razonamiento mejorado:</strong> Puntuación 15% superior en pruebas de razonamiento matemático y lógico.</li>
        <li><strong>Ventana de contexto:</strong> Capacidad de procesar hasta 200,000 tokens, permitiendo analizar documentos extensos.</li>
        <li><strong>Reducción de alucinaciones:</strong> 40% menos errores factuales comparado con modelos anteriores.</li>
      </ul>
      
      <h3>Enfoque en seguridad constitucional</h3>
      <p>Anthropic ha implementado su metodología de "IA constitucional" de forma más robusta, estableciendo guardarraíles que evitan respuestas dañinas sin sacrificar utilidad. El modelo ha pasado rigurosas evaluaciones de red teaming.</p>
      
      <h3>Disponibilidad y precios</h3>
      <p>Claude 4 está disponible a través de la API de Anthropic y en claude.ai. Los precios se mantienen competitivos: $15 por millón de tokens de entrada y $75 por millón de tokens de salida.</p>
    `
  },
  'copilot-20260117a': {
    description: 'Microsoft despliega Copilot en toda la suite Office, prometiendo aumentar la productividad empresarial hasta un 40%.',
    content: `
      <h2>La era del trabajo asistido por IA</h2>
      <p>Microsoft ha completado la integración de <strong>Copilot</strong> en todas sus aplicaciones de Office 365, transformando fundamentalmente la forma en que millones de usuarios interactúan con Word, Excel, PowerPoint, Outlook y Teams.</p>
      
      <h3>Funcionalidades principales</h3>
      <ul>
        <li><strong>Word:</strong> Generación de borradores, resúmenes automáticos y reescritura de textos manteniendo el estilo.</li>
        <li><strong>Excel:</strong> Análisis de datos mediante lenguaje natural, creación automática de fórmulas complejas y visualizaciones.</li>
        <li><strong>PowerPoint:</strong> Diseño de presentaciones completas a partir de documentos o instrucciones simples.</li>
        <li><strong>Outlook:</strong> Resúmenes de hilos de correo y redacción de respuestas contextualizadas.</li>
      </ul>
      
      <h3>Resultados medibles</h3>
      <p>Según estudios internos de Microsoft, los usuarios de Copilot reportan un <strong>aumento del 40% en productividad</strong> y una reducción del 50% en tiempo dedicado a tareas administrativas repetitivas.</p>
      
      <h3>Modelo de suscripción</h3>
      <p>Copilot está incluido en Microsoft 365 E5 o disponible como complemento por $30/usuario/mes para planes empresariales.</p>
    `
  },
  'optimus-20260117a': {
    description: 'Tesla presenta Optimus Gen 3, un robot humanoide capaz de realizar tareas domésticas complejas, con precio objetivo de $20,000.',
    content: `
      <h2>Optimus Gen 3: La visión de Tesla del futuro doméstico</h2>
      <p>Elon Musk ha presentado la tercera generación del robot humanoide <strong>Optimus</strong>, demostrando capacidades significativamente mejoradas en manipulación de objetos y navegación autónoma.</p>
      
      <h3>Especificaciones técnicas</h3>
      <ul>
        <li><strong>Altura:</strong> 1.73 metros, peso 57 kg</li>
        <li><strong>Capacidad de carga:</strong> Hasta 20 kg por brazo</li>
        <li><strong>Autonomía:</strong> 8 horas de operación continua</li>
        <li><strong>Procesamiento:</strong> Chip Tesla D1 con inferencia en tiempo real</li>
      </ul>
      
      <h3>Capacidades demostradas</h3>
      <p>Durante la presentación, Optimus realizó tareas como doblar ropa, preparar café, ordenar objetos y responder a comandos de voz. El robot utiliza visión por computadora y aprendizaje por imitación para adaptarse a nuevos entornos.</p>
      
      <h3>Disponibilidad</h3>
      <p>Tesla planea iniciar producción limitada en 2027, con un precio objetivo de <strong>menos de $20,000</strong>. La compañía proyecta que eventualmente los robots superarán en número a sus vehículos.</p>
    `
  },
  'sora-20260117a': {
    description: 'OpenAI lanza Sora públicamente, permitiendo generar videos de hasta 1 minuto con calidad cinematográfica desde descripciones de texto.',
    content: `
      <h2>Sora democratiza la creación de video</h2>
      <p>OpenAI ha lanzado <strong>Sora</strong> al público general, su modelo de generación de video que transforma descripciones textuales en clips de alta calidad con una fidelidad visual sin precedentes.</p>
      
      <h3>Características técnicas</h3>
      <ul>
        <li><strong>Duración:</strong> Videos de hasta 60 segundos en resolución 1080p</li>
        <li><strong>Coherencia temporal:</strong> Mantiene consistencia de objetos y personajes a lo largo del video</li>
        <li><strong>Física realista:</strong> Simula iluminación, reflejos y movimientos de cámara naturales</li>
        <li><strong>Estilos múltiples:</strong> Desde fotorrealismo hasta animación estilizada</li>
      </ul>
      
      <h3>Casos de uso</h3>
      <p>Creadores de contenido, equipos de marketing y cineastas independientes pueden producir material visual de calidad profesional sin equipos costosos ni grandes presupuestos.</p>
      
      <h3>Consideraciones éticas</h3>
      <p>OpenAI ha implementado marcas de agua invisibles y sistemas de detección para combatir deepfakes. El uso comercial requiere verificación de identidad y aceptación de políticas de uso responsable.</p>
      
      <h3>Precios</h3>
      <p>Disponible en ChatGPT Plus ($20/mes) con límites de generación, o a través de la API con precios basados en duración y resolución.</p>
    `
  },
  'apple-20260117a': {
    description: 'Apple Intelligence llega oficialmente a España con iOS 18.3, habilitando funciones de IA en español para iPhone 15 Pro y modelos superiores.',
    content: `
      <h2>Apple Intelligence habla español</h2>
      <p>Con el lanzamiento de iOS 18.3, <strong>Apple Intelligence</strong> finalmente está disponible en España y Latinoamérica, llevando las capacidades de IA de Apple a millones de usuarios hispanohablantes.</p>
      
      <h3>Funciones disponibles</h3>
      <ul>
        <li><strong>Herramientas de escritura:</strong> Reescritura, resumen y corrección de textos en español</li>
        <li><strong>Siri mejorado:</strong> Comprensión contextual avanzada y respuestas más naturales</li>
        <li><strong>Genmoji:</strong> Creación de emojis personalizados mediante descripciones</li>
        <li><strong>Resúmenes inteligentes:</strong> Notificaciones y correos resumidos automáticamente</li>
        <li><strong>Clean Up en Fotos:</strong> Eliminación de objetos no deseados de imágenes</li>
      </ul>
      
      <h3>Requisitos de hardware</h3>
      <p>Apple Intelligence requiere iPhone 15 Pro o superior, iPad con chip M1+ o Mac con Apple Silicon. El procesamiento se realiza mayoritariamente en el dispositivo, con opciones de Private Cloud Compute para tareas complejas.</p>
      
      <h3>Privacidad</h3>
      <p>Apple enfatiza que los datos no se almacenan ni se utilizan para entrenar modelos, diferenciándose de competidores que procesan todo en la nube.</p>
    `
  },
  'aiact-20260117b': {
    description: 'La Unión Europea pone en vigor el AI Act, la regulación de inteligencia artificial más estricta del mundo, con multas de hasta el 7% de ingresos globales.',
    content: `
      <h2>El AI Act entra en vigor: Nueva era regulatoria</h2>
      <p>La Unión Europea ha activado oficialmente el <strong>AI Act</strong>, estableciendo el marco regulatorio más comprehensivo del mundo para la inteligencia artificial y marcando un precedente global.</p>
      
      <h3>Clasificación por niveles de riesgo</h3>
      <ul>
        <li><strong>Riesgo inaceptable:</strong> Prohibidos sistemas de scoring social, manipulación subliminal y reconocimiento facial masivo en espacios públicos</li>
        <li><strong>Alto riesgo:</strong> Sistemas en salud, educación, empleo y justicia requieren evaluaciones de conformidad y auditorías</li>
        <li><strong>Riesgo limitado:</strong> Chatbots y deepfakes deben identificarse claramente como IA</li>
        <li><strong>Riesgo mínimo:</strong> La mayoría de aplicaciones operan con requisitos básicos de transparencia</li>
      </ul>
      
      <h3>Sanciones</h3>
      <p>Las multas pueden alcanzar el <strong>7% de los ingresos globales anuales</strong> o 35 millones de euros, lo que sea mayor. Las empresas tienen 24 meses para adaptarse completamente.</p>
      
      <h3>Impacto global</h3>
      <p>Se espera el "efecto Bruselas": empresas multinacionales adoptarán los estándares europeos globalmente para evitar mantener sistemas diferenciados por región.</p>
    `
  },
  'gnome-20260117b': {
    description: 'Google DeepMind anuncia que GNoME ha descubierto 2.2 millones de nuevos materiales, potencialmente revolucionando baterías y computación cuántica.',
    content: `
      <h2>GNoME: IA acelera la ciencia de materiales</h2>
      <p>Google DeepMind ha revelado que su sistema de IA <strong>GNoME</strong> (Graph Networks for Materials Exploration) ha identificado 2.2 millones de estructuras cristalinas estables previamente desconocidas.</p>
      
      <h3>Magnitud del descubrimiento</h3>
      <ul>
        <li>Equivale a <strong>800 años de conocimiento</strong> acumulado por métodos tradicionales</li>
        <li>380,000 materiales ya verificados experimentalmente como estables</li>
        <li>Incluye potenciales superconductores, electrolitos para baterías y materiales cuánticos</li>
      </ul>
      
      <h3>Aplicaciones prácticas</h3>
      <p>Los investigadores destacan materiales prometedores para:</p>
      <ul>
        <li><strong>Baterías de estado sólido:</strong> Mayor densidad energética y seguridad</li>
        <li><strong>Superconductores:</strong> Candidatos para funcionar a temperaturas más altas</li>
        <li><strong>Computación cuántica:</strong> Materiales con propiedades topológicas únicas</li>
      </ul>
      
      <h3>Metodología</h3>
      <p>GNoME utiliza redes neuronales de grafos entrenadas con datos del Materials Project. El sistema predice estabilidad termodinámica con 89% de precisión, reduciendo drásticamente el tiempo de descubrimiento.</p>
      
      <h3>Acceso abierto</h3>
      <p>DeepMind ha liberado la base de datos para acelerar la investigación global en ciencia de materiales.</p>
    `
  },
  'llama4-20260117b': {
    description: 'Meta lanza Llama 4, su modelo open source más potente que supera a GPT-4 en benchmarks y está disponible gratuitamente para desarrolladores.',
    content: `
      <h2>Llama 4: Open source alcanza la frontera</h2>
      <p>Meta ha publicado <strong>Llama 4</strong>, su modelo de lenguaje más avanzado, superando a GPT-4 en múltiples benchmarks mientras mantiene su compromiso con el código abierto.</p>
      
      <h3>Rendimiento técnico</h3>
      <ul>
        <li><strong>MMLU:</strong> 89.2% (vs 86.4% de GPT-4)</li>
        <li><strong>HumanEval:</strong> 78.3% en generación de código</li>
        <li><strong>Contexto:</strong> 128,000 tokens nativos</li>
        <li><strong>Versiones:</strong> 8B, 70B y 405B parámetros</li>
      </ul>
      
      <h3>Licencia y acceso</h3>
      <p>Llama 4 se distribuye bajo licencia permisiva que permite uso comercial sin restricciones para empresas con menos de 700 millones de usuarios activos mensuales. Los pesos del modelo están disponibles en Hugging Face.</p>
      
      <h3>Impacto en el ecosistema</h3>
      <p>La disponibilidad de un modelo de frontera como open source democratiza el acceso a IA avanzada, permitiendo a startups y desarrolladores independientes competir con grandes corporaciones.</p>
      
      <h3>Requisitos de hardware</h3>
      <p>El modelo 8B funciona en GPUs consumer (16GB VRAM), mientras que 70B requiere múltiples A100 o hardware equivalente. Meta también ofrece acceso via API a través de sus socios cloud.</p>
    `
  },
  'alexa-20260117b': {
    description: 'Amazon presenta la nueva Alexa con IA generativa, capaz de mantener conversaciones naturales y ejecutar tareas complejas mediante comandos de voz.',
    content: `
      <h2>Alexa renace con IA generativa</h2>
      <p>Amazon ha lanzado una versión completamente renovada de <strong>Alexa</strong> potenciada por modelos de lenguaje avanzados, transformando el asistente de voz en un compañero conversacional genuino.</p>
      
      <h3>Nuevas capacidades</h3>
      <ul>
        <li><strong>Conversaciones naturales:</strong> Mantiene contexto a lo largo de múltiples intercambios</li>
        <li><strong>Redacción asistida:</strong> Compone emails, mensajes y listas a partir de instrucciones verbales</li>
        <li><strong>Razonamiento:</strong> Resuelve problemas paso a paso y ofrece recomendaciones personalizadas</li>
        <li><strong>Integración profunda:</strong> Conecta con apps y servicios de terceros mediante lenguaje natural</li>
      </ul>
      
      <h3>Arquitectura técnica</h3>
      <p>Amazon ha desarrollado un LLM propietario optimizado para latencia ultra-baja, permitiendo respuestas en menos de 300ms. El procesamiento híbrido combina inferencia en el dispositivo con capacidades cloud.</p>
      
      <h3>Disponibilidad</h3>
      <p>La nueva Alexa está disponible como actualización gratuita para dispositivos Echo de 3ª generación en adelante. Funciones premium requieren suscripción Alexa+ ($9.99/mes).</p>
      
      <h3>Competencia con ChatGPT</h3>
      <p>Amazon busca recuperar relevancia en el mercado de asistentes, donde ChatGPT y Google Assistant han ganado terreno con sus capacidades conversacionales.</p>
    `
  }
};

export async function GET() {
  try {
    const updates = [];
    
    for (const [slug, data] of Object.entries(professionalContent)) {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          description: data.description,
          content: data.content
        })
        .eq('slug', slug);
      
      if (error) {
        updates.push({ slug, success: false, error: error.message });
      } else {
        updates.push({ slug, success: true });
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'Contenido actualizado',
      updates
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: String(error) 
    }, { status: 500 });
  }
}
