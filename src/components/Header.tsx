import { useEffect, useState } from 'react';
import { Menu, X, Hammer, Sun, Moon, Globe } from 'lucide-react';
import { NAV_LINKS, UI } from '@/data/content';
import { usePref } from '@/context/PrefContext';
import { cn } from '@/utils/cn';

export function Header() {
  const { lang, theme, toggleLang, toggleTheme } = usePref();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const links = NAV_LINKS[lang];
  const t = UI[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-ivory-50/95 dark:bg-ink-900/95 backdrop-blur-md shadow-sm shadow-ink-900/5 border-b border-stone-200/70 dark:border-ink-800'
          : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex max-w-8xl items-center justify-between px-6 py-3.5 lg:px-10">
        <a href="#inicio" className="flex items-center gap-2.5 text-forest-800 dark:text-ivory-50 transition-colors">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-forest-800 text-ivory-50 dark:bg-forest-700">
            <Hammer className="h-4.5 w-4.5" strokeWidth={2.2} />
          </span>
          <span className="text-lg font-semibold tracking-tight font-display">
            Reforma&nbsp;Casa
          </span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-ink-600 dark:text-ivory-300 transition-colors hover:text-forest-800 dark:hover:text-ivory-50"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLang}
            aria-label="Toggle language"
            className="grid h-9 w-9 place-items-center rounded-lg text-forest-800 dark:text-ivory-200 transition-colors hover:bg-forest-50 dark:hover:bg-ink-800"
          >
            <Globe className="h-4.5 w-4.5" />
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t.lightMode : t.darkMode}
            className="grid h-9 w-9 place-items-center rounded-lg text-forest-800 dark:text-ivory-200 transition-colors hover:bg-forest-50 dark:hover:bg-ink-800"
          >
            {theme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>
          <a
            href="#contacto"
            className="hidden rounded-full bg-clay-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-clay-900/20 transition-all hover:bg-clay-600 active:scale-[0.97] md:inline-flex"
          >
            {lang === 'es' ? 'Solicita un presupuesto' : 'Request a quote'}
          </a>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg text-forest-800 dark:text-ivory-100 transition-colors hover:bg-forest-50 dark:hover:bg-ink-800 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        className={cn(
          'overflow-hidden bg-ivory-50/98 dark:bg-ink-900/98 backdrop-blur-md border-b border-stone-200/70 dark:border-ink-800 transition-[max-height] duration-300 md:hidden',
          open ? 'max-h-[32rem]' : 'max-h-0',
        )}
      >
        <ul className="px-6 py-4">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-base font-medium text-ink-700 dark:text-ivory-200 border-b border-stone-200/50 dark:border-ink-800 last:border-0"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-4">
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="block rounded-full bg-clay-500 px-6 py-3 text-center text-sm font-semibold text-white"
            >
              {lang === 'es' ? 'Solicita un presupuesto' : 'Request a quote'}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
