import { useEffect, useState, useCallback } from 'react';

export type Lang = 'es' | 'en';
export type Theme = 'light' | 'dark';

function getInitialLang(): Lang {
  const stored = localStorage.getItem('lang');
  if (stored === 'es' || stored === 'en') return stored;
  const browser = navigator.language.toLowerCase();
  const lang: Lang = browser.startsWith('es') ? 'es' : 'en';
  localStorage.setItem('lang', lang);
  return lang;
}

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function usePreferences() {
  const [lang, setLangState] = useState<Lang>(getInitialLang);
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
  }, [lang]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggleLang = useCallback(() => {
    setLangState((prev) => (prev === 'es' ? 'en' : 'es'));
  }, []);
  const setTheme = useCallback((t: Theme) => setThemeState(t), []);
  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return { lang, theme, setLang, toggleLang, setTheme, toggleTheme };
}
