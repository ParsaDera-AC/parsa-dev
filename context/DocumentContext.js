"use client";

import { createContext, useContext } from 'react';

const DocumentContext = createContext({});

export function DocumentProvider({ children }) {
  // Replace these URLs with your secure storage links
  const secureDocuments = {
    resume: {
      en: "https://your-secure-storage/resume-en.pdf",
      fr: "https://your-secure-storage/resume-fr.pdf",
      // Add more languages as needed
    },
    cv: {
      en: "https://your-secure-storage/cv-en.pdf",
      fr: "https://your-secure-storage/cv-fr.pdf",
      // Add more languages as needed
    },
    // Add more document types as needed
  };

  const getSecureDocumentUrl = (documentType, language = 'en') => {
    return secureDocuments[documentType]?.[language] || '';
  };

  return (
    <DocumentContext.Provider value={{ getSecureDocumentUrl }}>
      {children}
    </DocumentContext.Provider>
  );
}

export const useDocuments = () => useContext(DocumentContext); 