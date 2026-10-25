"use client";

import { MapPin, Info } from 'lucide-react';
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

          </Reveal>

          {/* Right: map photo */}
          <Reveal delay={150} className="overflow-hidden rounded-[1.75rem] shadow-xl ring-1 ring-sage-200/60 dark:ring-ink-700">
            <img
              src="https://images.pexels.com/photos/40269133/pexels-photo-40269133.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt={lang === 'es' ? 'Vista aérea de la ciudad de Córdoba' : 'Aerial view of the city of Córdoba'}
              className="h-full min-h-[360px] w-full object-cover"
              loading="lazy"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
