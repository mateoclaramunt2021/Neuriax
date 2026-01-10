import { createTranslator } from 'next-intl/server';

export async function getTranslator(locale: string) {
  return createTranslator({ locale, namespace: 'default' });
}

export type Language = 'es' | 'en';

export const languages: { [key: string]: Language } = {
  es: 'es',
  en: 'en',
};

export const defaultLanguage: Language = 'es';
