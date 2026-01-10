export const translations = {
  es: {
    // Navbar
    'nav.home': 'Inicio',
    'nav.quien-soy': 'Quiénes Somos',
    'nav.soluciones': 'Soluciones',
    'nav.webs': 'Webs',
    'nav.sectores': 'Sectores',
    'nav.casos': 'Casos',
    'nav.trabajo': 'Trabajo',
    'nav.contacto': 'Contacto',
    
    // Cookie
    'cookie.title': '🍪 Preferencias de Cookies',
    'cookie.text': 'Usamos cookies para recordar tus preferencias (tema, idioma) y mejorar tu experiencia. Tus datos se guardan localmente en tu navegador.',
    'cookie.reject': 'Rechazar',
    'cookie.accept': 'Aceptar',
    
    // Preferences
    'pref.theme': 'Tema',
    'pref.dark': 'Modo Oscuro',
    'pref.light': 'Modo Claro',
    'pref.language': 'Idioma',
    'pref.info': '✓ Tus preferencias se guardan localmente en tu navegador.',
    
    // General
    'general.cta': 'Agendar consulta gratuita',
    'general.email': 'Enviar email',
  },
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.quien-soy': 'About Us',
    'nav.soluciones': 'Solutions',
    'nav.webs': 'Websites',
    'nav.sectores': 'Sectors',
    'nav.casos': 'Cases',
    'nav.trabajo': 'Work',
    'nav.contacto': 'Contact',
    
    // Cookie
    'cookie.title': '🍪 Cookie Preferences',
    'cookie.text': 'We use cookies to remember your preferences (theme, language) and improve your experience. Your data is stored locally in your browser.',
    'cookie.reject': 'Reject',
    'cookie.accept': 'Accept',
    
    // Preferences
    'pref.theme': 'Theme',
    'pref.dark': 'Dark Mode',
    'pref.light': 'Light Mode',
    'pref.language': 'Language',
    'pref.info': '✓ Your preferences are saved locally in your browser.',
    
    // General
    'general.cta': 'Schedule free consultation',
    'general.email': 'Send email',
  }
};

export type Language = 'es' | 'en';
export type TranslationKey = keyof typeof translations.es;

export function t(key: TranslationKey, language: Language): string {
  return translations[language][key] || translations['es'][key];
}
