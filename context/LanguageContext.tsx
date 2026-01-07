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
import type { LanguageContextType, Messages } from '@/types';

const LanguageContext = createContext<LanguageContextType | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<'en' | 'fr'>('en');
  const [messages, setMessages] = useState<Messages | null>(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'fr' | null;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await fetch(`/locales/${language}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load messages for ${language}`);
        }
        const data = (await response.json()) as Messages;
        setMessages(data);
      } catch (error) {
        console.error('Error loading messages:', error);
        setMessages(null);
      }
    };
    void loadMessages();
  }, [language]);

  const setLanguage = useCallback((lang: 'en' | 'fr') => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => {
      const newLang = prev === 'en' ? 'fr' : 'en';
      localStorage.setItem('language', newLang);
      return newLang;
    });
  }, []);

  const contextValue = useMemo<LanguageContextType>(
    () => ({
      language,
      messages,
      toggleLanguage,
      setLanguage,
    }),
    [language, messages, toggleLanguage, setLanguage]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === null) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
