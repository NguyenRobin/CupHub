'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type ContextType = {
  theme: string;
  toggleTheme: () => void;
};

type Props = {
  children: React.ReactNode;
};

export const ThemeContext = createContext<ContextType>({
  theme: '',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const themeMode = localStorage.getItem('darkMode');
    if (themeMode === 'enabled') {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
    const isDarkModeActive = document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', isDarkModeActive ? 'enabled' : 'disabled');
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// react hook so every component can access the theme state
export const useTheme = () => useContext(ThemeContext);
