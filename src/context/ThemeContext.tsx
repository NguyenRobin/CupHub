'use client';
import { createContext, useContext, useState } from 'react';

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

  function toggleTheme() {
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
    console.log(document.documentElement.classList);
    document.documentElement.classList.toggle('dark');
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// react hook so every component can access the theme state
export const useTheme = () => useContext(ThemeContext);
