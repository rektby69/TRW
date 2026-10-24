import { MapPin, ExternalLink, Info } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { CONTACT } from '@/data/content';
import { useLang } from '@/context/PrefContext';

export function Location() {
  const lang = useLang();
  const t = CONTACT[lang];

  return (
    <section id="contacto" className="scroll-mt-20 bg-ivory-50 py-20 lg:py-28 dark:bg-ink-900">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: copy */}
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-sage-100/80 px-4 py-1.5 text-micro font-semibold uppercase tracking-[0.14em] text-sage-700 dark:bg-sage-900/50 dark:text-sage-300">
              <span className="h-1.5 w-1.5 rounded-full bg-clay-400" />
              {t.eyebrow}
            </span>
            <h2 className="mt-5 text-h2 font-display font-normal text-sage-800 dark:text-ivory-100 text-balance">
              {t.title}
            </h2>
            <p className="mt-5 text-body-lg leading-relaxed text-ink-600 dark:text-ivory-300/70 text-pretty">
              {t.description}
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sage-100 text-sage-700 dark:bg-sage-900/50 dark:text-sage-300">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-micro font-semibold uppercase text-ink-400 dark:text-ivory-300/40">{t.addressLabel}</p>
                  <p className="text-sm font-medium text-ink-700 dark:text-ivory-200">{t.addressValue}</p>
                  <p className="text-sm font-medium text-ink-700 dark:text-ivory-200">{t.cityValue}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sage-100 text-sage-700 dark:bg-sage-900/50 dark:text-sage-300">
                  <Info className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-micro font-semibold uppercase text-ink-400 dark:text-ivory-300/40">{t.hoursLabel}</p>
                  <p className="text-sm font-medium text-ink-700 dark:text-ivory-200">{t.hoursValue}</p>
                </div>
              </div>
            </div>

            <a
              href={t.websiteHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-sage-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sage-900/20 transition-all hover:bg-sage-700 hover:shadow-xl active:scale-[0.98]"
            >
              {t.cta}
              <ExternalLink className="h-4 w-4" />
            </a>

            <p className="mt-5 max-w-md text-caption text-ink-400 dark:text-ivory-300/40">
              {t.note}
            </p>
          </Reveal>

          {/* Right: map embed */}
          <Reveal delay={150} className="overflow-hidden rounded-[1.75rem] shadow-xl ring-1 ring-sage-200/60 dark:ring-ink-700">
            <iframe
              title={lang === 'es' ? 'Mapa de Yoga Center Córdoba' : 'Map of Yoga Center Córdoba'}
              src="https://www.openstreetmap.org/export/embed.html?bbox=-4.8020%2C37.8740%2C-4.7780%2C37.8880&layer=mapnik&marker=37.8810%2C-4.7900"
              className="h-full min-h-[360px] w-full border-0"
              loading="lazy"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
