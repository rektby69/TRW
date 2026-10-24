import { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
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
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-ivory-50/90 dark:bg-ink-900/90 backdrop-blur-xl border-b border-sage-200/60 dark:border-ink-800/80 shadow-sm shadow-ink-900/5'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <nav className="mx-auto flex max-w-8xl items-center justify-between px-6 py-3.5 lg:px-10">
        <a href="#inicio" aria-label="Yoga Center Córdoba" className="group flex items-center transition-transform duration-300 hover:scale-[1.02]">
          <img src="/logo.svg" alt="Yoga Center Córdoba" className="h-11 w-auto" />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={cn(
                  'relative text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-clay-300 after:transition-all after:duration-300 hover:after:w-full',
                  scrolled ? 'text-ink-600 hover:text-sage-700 dark:text-ivory-300 dark:hover:text-ivory-50' : 'text-ivory-50/90 hover:text-ivory-50',
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleLang}
            aria-label="Toggle language"
            className={cn(
            'grid h-9 w-9 place-items-center rounded-lg transition-colors',
            scrolled ? 'text-sage-800 hover:bg-sage-100 dark:text-ivory-200 dark:hover:bg-ink-800' : 'text-ivory-50 hover:bg-ink-950/20',
          )}
          >
            <Globe className="h-4.5 w-4.5" />
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t.lightMode : t.darkMode}
            className={cn(
            'grid h-9 w-9 place-items-center rounded-lg transition-colors',
            scrolled ? 'text-sage-800 hover:bg-sage-100 dark:text-ivory-200 dark:hover:bg-ink-800' : 'text-ivory-50 hover:bg-ink-950/20',
          )}
          >
            {theme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>
          <a
            href="#horarios"
            className={cn(
            'hidden rounded-full px-6 py-2.5 text-sm font-semibold shadow-sm transition-all active:scale-[0.97] md:inline-flex',
            scrolled
              ? 'bg-sage-600 text-white shadow-sage-900/20 hover:bg-sage-700 hover:shadow-md'
              : 'bg-ivory-50/15 text-white ring-1 ring-ivory-100/40 backdrop-blur-sm hover:bg-ivory-50/25',
          )}
          >
            {lang === 'es' ? 'Ver horarios' : 'View schedule'}
          </a>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={cn(
            'grid h-10 w-10 place-items-center rounded-lg transition-colors md:hidden',
            scrolled ? 'text-sage-800 hover:bg-sage-100 dark:text-ivory-100 dark:hover:bg-ink-800' : 'text-ivory-50 hover:bg-ink-950/20',
          )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        className={cn(
          'overflow-hidden bg-ivory-50/98 dark:bg-ink-900/98 backdrop-blur-xl border-b border-sage-200/60 dark:border-ink-800/80 transition-[max-height,opacity] duration-300 md:hidden',
          open ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <ul className="px-6 py-4">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-base font-medium text-ink-700 dark:text-ivory-200 border-b border-sage-200/40 dark:border-ink-800/60 last:border-0"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-4">
            <a
              href="#horarios"
              onClick={() => setOpen(false)}
              className="block rounded-full bg-sage-600 px-6 py-3 text-center text-sm font-semibold text-white"
            >
              {lang === 'es' ? 'Ver horarios' : 'View schedule'}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
