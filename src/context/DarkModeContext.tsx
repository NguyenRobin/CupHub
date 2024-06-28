"use client";
import { createContext, useContext, useEffect, useState } from "react";

type ContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

type Props = {
  children: React.ReactNode;
};

export const DarkModeContext = createContext<ContextType>({
  isDarkMode: true,
  toggleTheme: () => {},
});

export function DarkModeProvider({ children }: Props) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function toggleTheme() {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
}

// react hook so every component can access the theme state
export const useTheme = () => useContext(DarkModeContext);
