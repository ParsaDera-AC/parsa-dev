'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  type ReactNode,
} from 'react';
import type { ThemeContextType } from '@/types';

const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    document.documentElement.classList.add('no-transition');

    if (savedMode === 'dark' || (!savedMode && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    const timeout = setTimeout(() => {
      document.documentElement.classList.remove('no-transition');
      setIsLoaded(true);
    }, 100);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setIsDarkMode(e.matches);
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => {
      clearTimeout(timeout);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    if (!isLoaded) return;

    setIsDarkMode((prev) => {
      const newValue = !prev;
      if (newValue) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', newValue ? 'dark' : 'light');
      return newValue;
    });
  }, [isLoaded]);

  const contextValue = useMemo<ThemeContextType>(
    () => ({
      isDarkMode,
      toggleTheme,
      isLoaded,
    }),
    [isDarkMode, toggleTheme, isLoaded]
  );

  if (!isLoaded) {
    return <div className="theme-loading" aria-hidden="true" />;
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
