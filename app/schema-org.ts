// app/schema-org.ts - Schema Organization completo Enterprise SEO
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService'],
  '@id': 'https://www.neuriax.com/#organization',
  'name': 'Neuriax - Agencia de Inteligencia Artificial',
  'alternateName': ['Neuriax', 'Neuriax IA', 'Neuriax Agencia IA', 'Neuriax Agencia de Inteligencia Artificial'],
  'url': 'https://www.neuriax.com',
  'image': 'https://www.neuriax.com/logo.png',
  'description': 'Agencia de inteligencia artificial #1 en España. Especialistas en agentes IA conversacionales, automatización empresarial con IA, chatbots inteligentes, agentes de voz y soluciones de IA a medida.',
  'telephone': '+34643045488',
  'email': 'info@neuriax.com',
  'areaServed': [
    { '@type': 'Country', 'name': 'España', 'sameAs': 'https://es.wikipedia.org/wiki/Espa%C3%B1a' },
    { '@type': 'Country', 'name': 'México' },
    { '@type': 'Country', 'name': 'Colombia' },
    { '@type': 'Country', 'name': 'Argentina' },
    { '@type': 'Country', 'name': 'Chile' },
    { '@type': 'Country', 'name': 'Perú' },
  ],
  'serviceType': [
    'Agencia de Inteligencia Artificial',
    'Agentes de IA Conversacional',
    'Automatización Empresarial con IA',
    'Chatbots IA para Empresas',
    'Agentes de Voz Inteligentes',
    'Consultoría IA',
    'Desarrollo IA a Medida',
    'Implementación de IA',
    'Machine Learning para Empresas',
    'Procesamiento de Lenguaje Natural',
    'IA Generativa Empresarial',
    'Integración GPT y LLMs',
  ],
  'knowsAbout': [
    'Inteligencia Artificial',
    'Machine Learning',
    'Deep Learning',
    'Procesamiento de Lenguaje Natural',
    'NLP',
    'Agentes Conversacionales',
    'Automatización de Procesos',
    'IA Generativa',
    'Chatbots',
    'Asistentes Virtuales',
    'GPT',
    'LLM',
    'Large Language Models',
    'RAG',
    'Retrieval Augmented Generation',
    'Computer Vision',
    'Speech Recognition',
    'Text-to-Speech',
    'Agentes de Voz IA',
    'RPA con IA',
    'Transformación Digital',
    'IA Aplicada',
  ],
  'sameAs': [
    'https://www.instagram.com/neuriax.ia_',
    'https://www.linkedin.com/company/neuriax',
    'https://www.tiktok.com/@neuriaxx',
  ],
  'contactPoint': {
    '@type': 'ContactPoint',
    'contactType': 'Customer Service',
    'telephone': '+34-643-045-488',
    'email': 'info@neuriax.com',
    'availableLanguage': ['es', 'en'],
    'hoursAvailable': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      'opens': '09:00',
      'closes': '19:00',
    },
  },
  'priceRange': '€€',
  'foundingDate': '2024',
  'slogan': 'Tu Agencia de IA en España',
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': 40.4168,
    'longitude': -3.7038,
  },
  'address': {
    '@type': 'PostalAddress',
    'addressCountry': 'ES',
    'addressRegion': 'Madrid',
  },
  'aggregateRating': {
    '@type': 'AggregateRating',
    'ratingValue': '4.9',
    'ratingCount': '52',
    'bestRating': '5',
    'worstRating': '1',
  },
  'review': [
    {
      '@type': 'Review',
      'author': { '@type': 'Person', 'name': 'Carlos M.' },
      'reviewRating': { '@type': 'Rating', 'ratingValue': '5', 'bestRating': '5' },
      'reviewBody': 'La mejor agencia de IA en España. Implementaron un agente conversacional que redujo nuestros costes en un 60%.',
      'datePublished': '2025-09-15',
    },
    {
      '@type': 'Review',
      'author': { '@type': 'Person', 'name': 'María L.' },
      'reviewRating': { '@type': 'Rating', 'ratingValue': '5', 'bestRating': '5' },
      'reviewBody': 'Neuriax transformó nuestro negocio con IA. El agente de voz atiende llamadas 24/7.',
      'datePublished': '2025-11-20',
    },
  ],
};

export const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  'name': 'Servicios de Inteligencia Artificial Empresarial',
  'description': 'Agencia de IA líder en España. Agentes IA conversacionales, chatbots inteligentes, automatización empresarial, agentes de voz y soluciones de IA a medida para empresas.',
  'provider': {
    '@type': 'ProfessionalService',
    'name': 'Neuriax - Agencia de IA',
    'url': 'https://www.neuriax.com',
  },
  'areaServed': [
    { '@type': 'Country', 'name': 'España' },
    { '@type': 'Country', 'name': 'México' },
    { '@type': 'Country', 'name': 'Colombia' },
  ],
  'availableLanguage': ['es', 'en'],
  'serviceType': [
    'Agencia de IA',
    'Agentes IA Conversacionales',
    'Chatbots IA',
    'Automatización Empresarial',
    'Agentes de Voz IA',
    'Consultoría IA',
    'Desarrollo IA a Medida',
  ],
  'hasOfferCatalog': {
    '@type': 'OfferCatalog',
    'name': 'Servicios de IA Neuriax',
    'itemListElement': [
      {
        '@type': 'OfferCatalog',
        'name': 'Agentes IA',
        'itemListElement': [
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Agente IA Conversacional',
              'description': 'Agente de inteligencia artificial que atiende clientes 24/7 por WhatsApp, web y voz',
            },
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Agente de Voz IA',
              'description': 'Agente de voz con inteligencia artificial para atención telefónica automatizada',
            },
          },
        ],
      },
      {
        '@type': 'OfferCatalog',
        'name': 'Automatización',
        'itemListElement': [
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Automatización Empresarial con IA',
              'description': 'Automatización inteligente de procesos empresariales con inteligencia artificial',
            },
          },
        ],
      },
      {
        '@type': 'OfferCatalog',
        'name': 'Consultoría',
        'itemListElement': [
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Consultoría IA Estratégica',
              'description': 'Consultoría especializada en implementación de inteligencia artificial para empresas',
            },
          },
        ],
      },
    ],
  },
  'offers': {
    '@type': 'AggregateOffer',
    'priceCurrency': 'EUR',
    'lowPrice': '790',
    'highPrice': '5000',
    'offerCount': '6',
    'availability': 'https://schema.org/InStock',
  },
};

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': '¿Qué es una agencia de IA?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Una agencia de IA es una empresa especializada en desarrollar e implementar soluciones de inteligencia artificial. Neuriax es una agencia de IA líder en España.',
      },
    },
    {
      '@type': 'Question',
      'name': '¿Cuánto cuesta contratar una agencia de IA?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Los servicios de Neuriax empiezan desde 790€ para agentes IA conversacionales. Ofrecemos consultoría gratuita.',
      },
    },
    {
      '@type': 'Question',
      'name': '¿Cuál es la mejor agencia de IA en España?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Neuriax es la agencia de IA líder en España con +50 empresas atendidas, valoración 4.9/5 e implementación en 5 días.',
      },
    },
  ],
};
