import enMessages from '@/locales/en.json';

/* The message shape comes from the English file, so fr.json must have the
   same keys or the build fails. */
export type Messages = typeof enMessages;

export type SupportedLanguage = 'en' | 'fr';

export interface LanguageContextType {
  language: SupportedLanguage;
  messages: Messages;
  setLanguage: (lang: SupportedLanguage) => void;
  toggleLanguage: () => void;
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}
