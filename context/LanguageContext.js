"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    // Load messages based on selected language
    const loadMessages = async () => {
      try {
        const response = await fetch(`/locales/${language}.json`);
        const messages = await response.json();
        setMessages(messages);
      } catch (error) {
        console.error('Error loading messages:', error);
        setMessages(null);
      }
    };
    loadMessages();
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, messages, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 