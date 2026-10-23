import { Hammer, Phone, Mail, MapPin } from 'lucide-react';
import { FOOTER, NAV_LINKS, CONTACT } from '@/data/content';
import { useLang } from '@/context/PrefContext';

export function Footer() {
  const lang = useLang();
  const t = FOOTER[lang];
  const links = NAV_LINKS[lang];
  const contact = CONTACT[lang];
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-950 py-14 dark:bg-ink-950">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand + tagline */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 text-ivory-50">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-forest-800 dark:bg-forest-700">
                <Hammer className="h-4.5 w-4.5" strokeWidth={2.2} />
              </span>
              <span className="text-lg font-semibold tracking-tight font-display">
                {t.brand}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory-200/50">
              {t.tagline}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-micro font-semibold uppercase tracking-[0.12em] text-ivory-200/40">
              {t.servicesTitle}
            </h3>
            <ul className="mt-4 space-y-2">
              {t.services.map((s) => (
                <li key={s}>
                  <a
                    href="#servicios"
                    className="text-sm text-ivory-200/60 transition-colors hover:text-ivory-50"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-micro font-semibold uppercase tracking-[0.12em] text-ivory-200/40">
              {t.navTitle}
            </h3>
            <ul className="mt-4 space-y-2">
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
              <li className="flex items-center gap-2.5 text-sm text-ivory-200/60">
                <Phone className="h-4 w-4 shrink-0 text-ivory-200/40" />
                {contact.phoneValue}
              </li>
              <li className="flex items-center gap-2.5 text-sm text-ivory-200/60">
                <Mail className="h-4 w-4 shrink-0 text-ivory-200/40" />
                {contact.emailValue}
              </li>
              <li className="flex items-center gap-2.5 text-sm text-ivory-200/60">
                <MapPin className="h-4 w-4 shrink-0 text-ivory-200/40" />
                {contact.areaValue}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-forest-800/50 pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-ivory-200/40">
            {t.copyright.replace('{year}', String(year))}
          </p>
          <div className="flex gap-5">
            <a href="#" className="text-sm text-ivory-200/40 transition-colors hover:text-ivory-200/70">{t.privacy}</a>
            <a href="#" className="text-sm text-ivory-200/40 transition-colors hover:text-ivory-200/70">{t.terms}</a>
            <a href="#" className="text-sm text-ivory-200/40 transition-colors hover:text-ivory-200/70">{t.cookies}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
