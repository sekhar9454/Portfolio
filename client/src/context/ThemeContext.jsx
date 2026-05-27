import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const themes = [
  { id: 'navy', name: 'Navy Blue', color: '#1e3a5f' },
  { id: 'emerald', name: 'Emerald', color: '#064e3b' },
  { id: 'burgundy', name: 'Burgundy', color: '#7f1d1d' },
  { id: 'slate', name: 'Slate Dark', color: '#0f172a' },
  { id: 'saffron', name: 'Saffron', color: '#78350f' },
];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'navy');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'navy') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
