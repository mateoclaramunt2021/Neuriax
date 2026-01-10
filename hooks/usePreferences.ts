import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type Language = 'es' | 'en';

interface Preferences {
  theme: Theme;
  language: Language;
}

export function usePreferences() {
  const [preferences, setPreferences] = useState<Preferences>({
    theme: 'dark',
    language: 'es',
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar preferencias del localStorage al montar
  useEffect(() => {
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
      try {
        setPreferences(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing preferences:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Guardar preferencias cuando cambien
  const updatePreferences = (updates: Partial<Preferences>) => {
    const updated = { ...preferences, ...updates };
    setPreferences(updated);
    localStorage.setItem('userPreferences', JSON.stringify(updated));

    // Aplicar tema
    if (updates.theme) {
      if (updates.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const toggleTheme = () => {
    updatePreferences({
      theme: preferences.theme === 'dark' ? 'light' : 'dark',
    });
  };

  const setLanguage = (lang: Language) => {
    updatePreferences({ language: lang });
  };

  return {
    preferences,
    isLoaded,
    updatePreferences,
    toggleTheme,
    setLanguage,
  };
}
