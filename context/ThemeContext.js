"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize theme based on user preference (only once)
  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedMode = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Initialize theme without animation
    document.documentElement.classList.add('no-transition');
    
    if (savedMode === "dark" || (!savedMode && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
    
    // Remove the transition blocker after initial theme is set
    setTimeout(() => {
      document.documentElement.classList.remove('no-transition');
      setIsLoaded(true);
    }, 100);
    
    // Listen for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      if (!localStorage.getItem("theme")) {
        setIsDarkMode(e.matches);
        if (e.matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Toggle theme with memoized function to prevent rerenders
  const toggleTheme = useMemo(() => () => {
    // Only update if fully loaded
    if (!isLoaded) return;
    
    setIsDarkMode((prev) => {
      const newValue = !prev;
      if (newValue) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("theme", newValue ? "dark" : "light");
      return newValue;
    });
  }, [isLoaded]);

  // Memoize the context value to prevent rerenders
  const contextValue = useMemo(() => ({
    isDarkMode,
    toggleTheme,
  }), [isDarkMode, toggleTheme]);

  // Return isLoaded to prevent flash of content
  if (!isLoaded) {
    return <div className="theme-loading"></div>;
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
} 