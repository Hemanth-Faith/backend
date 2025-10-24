import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  workMode: boolean;
  toggleWorkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [workMode, setWorkMode] = useState<boolean>(false);

  useEffect(() => {
    // Check localStorage and system preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }

    // Load work mode preference
    const savedWorkMode = localStorage.getItem('work_mode') === 'true';
    setWorkMode(savedWorkMode);
    if (savedWorkMode) {
      document.documentElement.classList.add('work-mode');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleWorkMode = () => {
    const newWorkMode = !workMode;
    setWorkMode(newWorkMode);
    localStorage.setItem('work_mode', String(newWorkMode));
    
    if (newWorkMode) {
      document.documentElement.classList.add('work-mode');
    } else {
      document.documentElement.classList.remove('work-mode');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, workMode, toggleWorkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
