import React, { createContext, useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
}

// Create context but don't export it
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    // Try to get theme from localStorage
    const saved = localStorage.getItem('theme-mode') as ThemeMode;
    return saved || 'light';
  });

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateThemeClass = () => {
      const root = document.documentElement;

      // Remove previous theme classes
      root.classList.remove('light', 'dark');

      let shouldBeDark = false;

      if (themeMode === 'dark') {
        shouldBeDark = true;
      } else if (themeMode === 'light') {
        shouldBeDark = false;
      } else if (themeMode === 'system') {
        // Check system preference
        shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }

      // Apply the appropriate class
      root.classList.add(shouldBeDark ? 'dark' : 'light');
      setIsDark(shouldBeDark);

      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', shouldBeDark ? '#0f172a' : '#ffffff');
      }
    };

    updateThemeClass();

    // Save to localStorage
    localStorage.setItem('theme-mode', themeMode);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (themeMode === 'system') {
        updateThemeClass();
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Export the context ONLY for use in the hook file (not for external use)
export { ThemeContext };
