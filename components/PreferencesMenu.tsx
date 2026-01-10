'use client';

import { usePreferences } from '@/hooks/usePreferences';
import { useState } from 'react';
import { t } from '@/lib/translations';

export default function PreferencesMenu() {
  const { preferences, toggleTheme, setLanguage } = usePreferences();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Botón de preferencias */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
        title="Preferencias"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl border border-slate-700 z-50">
          <div className="p-4 space-y-4">
            {/* Tema */}
            <div>
              <p className="text-sm font-semibold text-slate-300 mb-2">
                {t('pref.theme', preferences.language)}
              </p>
              <button
                onClick={toggleTheme}
                className="w-full px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm transition-colors flex items-center gap-2"
              >
                {preferences.theme === 'dark' ? (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                    {t('pref.dark', preferences.language)}
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.828-2.828a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zm1.414-1.414a1 1 0 00-1.414 0l-.707.707a1 1 0 101.414 1.414l.707-.707a1 1 0 000-1.414zM9 17a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    {t('pref.light', preferences.language)}
                  </>
                )}
              </button>
            </div>

            {/* Idioma */}
            <div>
              <p className="text-sm font-semibold text-slate-300 mb-2">
                {t('pref.language', preferences.language)}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setLanguage('es')}
                  className={`flex-1 px-2 py-1 rounded text-sm transition-colors ${
                    preferences.language === 'es'
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  ES
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`flex-1 px-2 py-1 rounded text-sm transition-colors ${
                    preferences.language === 'en'
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            {/* Info de cookies */}
            <div className="pt-2 border-t border-slate-600">
              <p className="text-xs text-slate-400">
                {t('pref.info', preferences.language)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
