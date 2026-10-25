import { useEffect, useState, useCallback } from 'react';

export type Lang = 'es' | 'en';
export type Theme = 'light' | 'dark';

const DEFAULT_LANG: Lang = 'es';
const DEFAULT_THEME: Theme = 'light';

function readStoredLang(): Lang {
  if (typeof window === 'undefined') return DEFAULT_LANG;
  const stored = localStorage.getItem('lang');
  if (stored === 'es' || stored === 'en') return stored;
  const browser = navigator.language.toLowerCase();
  const lang: Lang = browser.startsWith('es') ? 'es' : 'en';
  localStorage.setItem('lang', lang);
  return lang;
}

function readStoredTheme(): Theme {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function usePreferences() {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [hydrated, setHydrated] = useState(false);

  // After mount, read persisted preferences and apply them.
  useEffect(() => {
    setLangState(readStoredLang());
    setThemeState(readStoredTheme());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
  }, [lang, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme, hydrated]);

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
