'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import en from '@/locales/en.json';
import fr from '@/locales/fr.json';
import type { LanguageContextType, Messages, SupportedLanguage } from '@/types';

/* Both dictionaries are bundled statically (~16 KB combined). This removes
   the runtime fetch the previous implementation used, which meant `messages`
   was null on first paint and every consumer needed a `messages?.` guard or
   an early `return null`. */
const dictionaries: Record<SupportedLanguage, Messages> = { en, fr };

const STORAGE_KEY = 'language';

const LanguageContext = createContext<LanguageContextType | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<SupportedLanguage>('en');

  // Restore the saved preference after mount. Server and first client render
  // both use 'en', so hydration stays consistent.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'fr') {
      setLanguageState(saved);
    }
  }, []);

  // Keep the document language in sync for screen readers and search engines.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* private browsing / storage disabled — preference just won't persist */
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => {
      const next: SupportedLanguage = prev === 'en' ? 'fr' : 'en';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = useMemo<LanguageContextType>(
    () => ({
      language,
      messages: dictionaries[language],
      setLanguage,
      toggleLanguage,
    }),
    [language, setLanguage, toggleLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === null) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
