// components/BreadcrumbSchema.tsx
export const BreadcrumbSchema = (path: string) => {
  const routes: { [key: string]: { name: string; url: string }[] } = {
    '/': [{ name: 'Inicio', url: 'https://www.neuriax.com/' }],
    '/soluciones': [
      { name: 'Inicio', url: 'https://www.neuriax.com/' },
      { name: 'Soluciones', url: 'https://www.neuriax.com/soluciones' },
    ],
    '/webs': [
      { name: 'Inicio', url: 'https://www.neuriax.com/' },
      { name: 'Páginas Web', url: 'https://www.neuriax.com/webs' },
    ],
    '/portfolio': [
      { name: 'Inicio', url: 'https://www.neuriax.com/' },
      { name: 'Portfolio', url: 'https://www.neuriax.com/portfolio' },
    ],
    '/contacto': [
      { name: 'Inicio', url: 'https://www.neuriax.com/' },
      { name: 'Contacto', url: 'https://www.neuriax.com/contacto' },
    ],
  };

  const breadcrumbList = routes[path] || routes['/'];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbList.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url,
    })),
  };
};

