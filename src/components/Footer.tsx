import { Hammer } from 'lucide-react';
import { NAV_LINKS } from '@/data/content';

export function Footer() {
  return (
    <footer className="bg-forest-950 py-12">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-2.5 text-ivory-50">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-forest-800">
              <Hammer className="h-4.5 w-4.5" strokeWidth={2.2} />
            </span>
            <span className="text-lg font-semibold tracking-tight font-display">
              Reforma&nbsp;Casa
            </span>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-ivory-200/70 transition-colors hover:text-ivory-50"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t border-forest-800/60 pt-6 text-sm text-ivory-200/50">
          <p>
            © {new Date().getFullYear()} Reforma Casa. Plantilla de demostración
            para reformas de cocinas y baños. Sustituye los textos entre
            corchetes por la información real de tu empresa antes de publicar.
          </p>
        </div>
      </div>
    </footer>
  );
}
