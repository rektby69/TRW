import { MapPin } from 'lucide-react';
import { FOOTER, NAV_LINKS, CONTACT } from '@/data/content';
import { useLang } from '@/context/PrefContext';

export function Footer() {
  const lang = useLang();
  const t = FOOTER[lang];
  const links = NAV_LINKS[lang];
  const contact = CONTACT[lang];
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-sage-950 py-14 dark:bg-ink-950">
      <div className="pointer-events-none absolute -right-20 -top-10 h-56 w-56 rounded-full bg-sage-800/30 blur-3xl" />

      <div className="relative mx-auto max-w-8xl px-6 lg:px-10">
        <div className="grid gap-10 md:grid-cols-3 lg:gap-12">
          {/* Brand + tagline */}
          <div>
            <img src="/logo.svg" alt={t.brand} className="h-14 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory-200/50">
              {t.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-micro font-semibold uppercase tracking-[0.12em] text-ivory-200/40">
              {t.navTitle}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-ivory-200/60 transition-colors hover:text-ivory-50"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-micro font-semibold uppercase tracking-[0.12em] text-ivory-200/40">
              {t.contactTitle}
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-ivory-200/60">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ivory-200/40" />
                <span>{contact.addressValue}<br />{contact.cityValue}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-4 border-t border-sage-800/50 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ivory-200/40">
            {t.copyright.replace('{year}', String(year))}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><a href="#" className="text-sm text-ivory-200/40 transition-colors hover:text-ivory-50">{t.privacy}</a></li>
            <li><a href="#" className="text-sm text-ivory-200/40 transition-colors hover:text-ivory-50">{t.terms}</a></li>
            <li><a href="#" className="text-sm text-ivory-200/40 transition-colors hover:text-ivory-50">{t.cookies}</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
