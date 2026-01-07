'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { DocumentContextType, DocumentType, SupportedLanguage } from '@/types';

const DocumentContext = createContext<DocumentContextType | null>(null);

interface DocumentProviderProps {
  children: ReactNode;
}

export function DocumentProvider({ children }: DocumentProviderProps) {
  const contextValue = useMemo<DocumentContextType>(() => {
    const secureDocuments: Record<DocumentType, Record<SupportedLanguage, string>> = {
      resume: {
        en: process.env.NEXT_PUBLIC_RESUME_URL_EN ?? '/Resume.pdf',
        fr: process.env.NEXT_PUBLIC_RESUME_URL_FR ?? '/Resume.pdf',
      },
      cv: {
        en: process.env.NEXT_PUBLIC_CV_URL_EN ?? '/Resume.pdf',
        fr: process.env.NEXT_PUBLIC_CV_URL_FR ?? '/Resume.pdf',
      },
    };

    const getSecureDocumentUrl = (
      documentType: DocumentType,
      language: SupportedLanguage = 'en'
    ): string => {
      return secureDocuments[documentType]?.[language] ?? '';
    };

    return { getSecureDocumentUrl };
  }, []);

  return (
    <DocumentContext.Provider value={contextValue}>
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocuments(): DocumentContextType {
  const context = useContext(DocumentContext);
  if (context === null) {
    throw new Error('useDocuments must be used within a DocumentProvider');
  }
  return context;
}
