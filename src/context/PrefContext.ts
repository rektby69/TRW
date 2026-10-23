import { createContext, useContext } from 'react';
import type { Lang, Theme } from '@/hooks/usePreferences';

type PrefContextType = {
  lang: Lang;
  theme: Theme;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
};

export const PrefContext = createContext<PrefContextType | null>(null);

export function usePref() {
  const ctx = useContext(PrefContext);
  if (!ctx) throw new Error('usePref must be used within PrefContext');
  return ctx;
}

export function useLang() {
  return usePref().lang;
}
