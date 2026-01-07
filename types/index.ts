// ===========================================
// Shared Type Definitions
// ===========================================

// i18n Messages Structure
export interface Messages {
  nav: {
    home: string;
    about: string;
    skills: string;
    softskills: string;
    projects: string;
    contact: string;
    resume: string;
  };
  hero: {
    greeting: string;
    role: string;
    title: string;
    description: string;
    viewWork: string;
    contact: string;
    subtitle?: string;
    cta?: string;
    downloadCv?: string;
    typedText1?: string;
    typedText2?: string;
    typedText3?: string;
    typedText4?: string;
    titleHighlight?: string;
    iAm?: string;
    projectsButton?: string;
    scrollText?: string;
  };
  about: {
    title: string;
    description: string;
    skills: {
      frontend: string;
      backend: string;
      database: string;
      cloud: string;
    };
    cards: {
      education: {
        title: string;
        description: string;
        stats: string[];
      };
      experience: {
        title: string;
        description: string;
        stats: string[];
      };
      expertise: {
        title: string;
        description: string;
        stats: string[];
      };
      achievements: {
        title: string;
        description: string;
        stats: string[];
      };
    };
  };
  softSkills: {
    title: string;
    subtitle?: string;
    highlightTitle?: string;
    highlightDescription?: string;
    leadership: {
      title: string;
      description: string;
      skills: string[];
    };
    problemSolving: {
      title: string;
      description: string;
      skills: string[];
    };
    communication: {
      title: string;
      description: string;
      skills: string[];
    };
    projectManagement: {
      title: string;
      description: string;
      skills: string[];
    };
    dataAnalysis?: {
      title: string;
      description: string;
      skills: string[];
    };
    analytics?: {
      title: string;
      description: string;
      skills: string[];
    };
    adaptability: {
      title: string;
      description: string;
      skills: string[];
    };
  };
  projects: {
    title: string;
    subtitle: string;
    viewCode?: string;
    privateRepo?: string;
    liveDemo?: string;
    moreOnGithub?: string;
    categories: {
      all: string;
      fullStack: string;
      frontend: string;
      dataScience: string;
      gamedev: string;
    };
    types?: Record<string, string>;
    items: Record<string, {
      title: string;
      description: string;
      tags: string[];
      technologies: string[];
    }>;
  };
  contact: {
    title: string;
    subtitle: string;
    connectTitle: string;
    description: string;
    quickResponse: string;
    responseMessage: string;
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
    };
  };
  resume: {
    title: string;
    subtitle: string;
    placeholder: string;
    submit: string;
    noCode: string;
    contactMe: string;
    download?: string;
    invalidCode?: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    connect: string;
    emailLabel: string;
    rights: string;
  };
}

// Theme Context Types
export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  isLoaded: boolean;
}

// Language Context Types
export interface LanguageContextType {
  language: 'en' | 'fr';
  messages: Messages | null;
  toggleLanguage: () => void;
  setLanguage: (lang: 'en' | 'fr') => void;
}

// Document Context Types
export type DocumentType = 'resume' | 'cv';
export type SupportedLanguage = 'en' | 'fr';

export interface DocumentContextType {
  getSecureDocumentUrl: (documentType: DocumentType, language?: SupportedLanguage) => string;
}

// Component Props Types
export interface SectionProps {
  id?: string;
  className?: string;
}

// Social Links
export interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url: string;
  color: string;
}

// Form Data
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Skill Types
export interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number;
  category: string;
  description?: string;
  relatedTech?: string[];
}

// Project Types
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  demo?: string;
  type: 'web' | 'mobile' | 'desktop' | 'other';
}

// Animation Variants
export interface AnimationVariants {
  initial: Record<string, unknown>;
  animate: Record<string, unknown>;
  exit?: Record<string, unknown>;
}
