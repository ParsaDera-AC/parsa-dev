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

const STORAGE_KEY = 'theme';

const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  /* The inline script in app/layout.tsx has already applied the correct class
     to <html> before first paint, so this provider only needs to read that
     result and keep it in sync. It deliberately does NOT gate rendering — the
     previous version returned a blank div until a 100ms timer elapsed, which
     cost a visible empty frame on every single page load. */
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));

    // Follow the OS only while the visitor has made no explicit choice.
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem(STORAGE_KEY)) return;
      setIsDarkMode(e.matches);
      document.documentElement.classList.toggle('dark', e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => {
      const next = !prev;
      const root = document.documentElement;

      // Suppress transitions for one frame so the whole page doesn't
      // cross-fade every colour at once.
      root.classList.add('no-transition');
      root.classList.toggle('dark', next);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => root.classList.remove('no-transition'));
      });

      try {
        localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
      } catch {
        /* storage disabled — preference just won't persist */
      }
      return next;
    });
  }, []);

  const value = useMemo<ThemeContextType>(
    () => ({ isDarkMode, toggleTheme }),
    [isDarkMode, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
