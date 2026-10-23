import { useEffect, useState } from 'react';
import { Menu, X, Hammer } from 'lucide-react';
import { NAV_LINKS } from '@/data/content';
import { cn } from '@/utils/cn';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-ivory-50/95 backdrop-blur-md shadow-sm shadow-ink-900/5 border-b border-stone-200/70'
          : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex max-w-8xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#inicio" className="flex items-center gap-2.5 text-forest-900">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-forest-800 text-ivory-50">
            <Hammer className="h-4.5 w-4.5" strokeWidth={2.2} />
          </span>
          <span className="text-lg font-semibold tracking-tight font-display">
            Reforma&nbsp;Casa
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-ink-600 transition-colors hover:text-forest-800"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contacto"
          className="hidden rounded-full bg-clay-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-clay-900/20 transition-colors hover:bg-clay-600 md:inline-flex"
        >
          Solicita un presupuesto
        </a>

        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg text-forest-900 transition-colors hover:bg-forest-50 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          'overflow-hidden bg-ivory-50/98 backdrop-blur-md border-b border-stone-200/70 transition-[max-height] duration-300 md:hidden',
          open ? 'max-h-96' : 'max-h-0',
        )}
      >
        <ul className="px-6 py-4">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-base font-medium text-ink-700 border-b border-stone-200/50 last:border-0"
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
              Solicita un presupuesto
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
