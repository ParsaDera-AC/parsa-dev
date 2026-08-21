import type { ReactNode } from 'react';
import enMessages from '@/locales/en.json';

// ===========================================
// i18n
// ===========================================

/* The message shape is derived from the English locale rather than
   hand-maintained. Adding a key to en.json makes it immediately available
   (and required in fr.json) with no type edits — and any drift between the
   two files becomes a compile error instead of a runtime `undefined`. */
export type Messages = typeof enMessages;

export type SupportedLanguage = 'en' | 'fr';

export interface LanguageContextType {
  language: SupportedLanguage;
  messages: Messages;
  setLanguage: (lang: SupportedLanguage) => void;
  toggleLanguage: () => void;
}

// ===========================================
// Theme
// ===========================================

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// ===========================================
// Documents
// ===========================================

export type DocumentType = 'resume' | 'cv';

export interface DocumentContextType {
  getSecureDocumentUrl: (documentType: DocumentType, language?: SupportedLanguage) => string;
}

// ===========================================
// Projects
// ===========================================

/* Categories match the keys under projects.categories in the locale files. */
export type ProjectCategory = 'fullStack' | 'frontend' | 'dataScience' | 'gamedev';

/* Presentation metadata lives in code; all copy lives in the locales.
   Tying `id` to the locale keys means a mistyped project id fails to
   compile rather than rendering blank text. */
export interface ProjectMeta {
  id: keyof Messages['projects']['items'];
  image: string;
  category: ProjectCategory;
  github?: string;
  demo?: string;
}

// ===========================================
// Skills
// ===========================================

export type SkillCategory = 'frontend' | 'backend' | 'database' | 'devops';

export interface SkillMeta {
  name: string;
  icon: ReactNode;
  category: SkillCategory;
}

export interface LanguageBar {
  name: string;
  level: number;
}

// ===========================================
// Shared
// ===========================================

export interface SocialLink {
  label: string;
  icon: ReactNode;
  url: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
