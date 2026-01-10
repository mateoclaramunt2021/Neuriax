'use client';

import { useEffect, useState } from 'react';
import { usePreferences } from './usePreferences';

type MessageKey = string;

export function useTranslation() {
  const { preferences } = usePreferences();
  const [messages, setMessages] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMessages() {
      try {
        const lang = preferences.language || 'es';
        const response = await fetch(`/messages/${lang}.json`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error loading translations:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadMessages();
  }, [preferences.language]);

  const t = (key: MessageKey, defaultValue: string = ''): string => {
    const keys = key.split('.');
    let value = messages;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return defaultValue;
      }
    }

    return typeof value === 'string' ? value : defaultValue;
  };

  return { t, isLoading, language: preferences.language };
}
