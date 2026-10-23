import { ArrowRight, ArrowDown } from 'lucide-react';
import { HERO } from '@/data/content';
import { useLang } from '@/context/PrefContext';

export function Hero() {
  const lang = useLang();
  const t = HERO[lang];

  return (
    <section id="inicio" className="relative overflow-hidden bg-ivory-50 pt-28 pb-16 lg:pt-36 lg:pb-24 dark:bg-ink-950">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          {/* Copy */}
          <div className="animate-fade-up">
            <span className="text-micro font-semibold uppercase tracking-[0.18em] text-clay-500">
              {t.eyebrow}
            </span>
            <h1 className="mt-5 text-display font-display font-normal text-forest-800 dark:text-ivory-50 text-balance">
              {t.title}{' '}
              <span className="italic text-clay-500">{t.titleAccent}</span>
            </h1>
            <p className="mt-6 max-w-lg text-body-lg leading-relaxed text-ink-600 dark:text-ivory-300/80 text-pretty">
              {t.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-full bg-clay-500 px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-clay-900/20 transition-all hover:bg-clay-600 hover:shadow-lg active:scale-[0.98]"
              >
                {t.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#proyectos"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 dark:text-ivory-200 underline-offset-4 hover:underline"
              >
                {t.secondaryCta}
                <ArrowDown className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Stats bar */}
            <div className="mt-12 flex gap-8 border-t border-stone-200 dark:border-ink-800 pt-6">
              <div>
                <p className="text-h3 font-display text-forest-800 dark:text-ivory-100">{t.stat1Value}</p>
                <p className="mt-1 text-caption text-ink-500 dark:text-ivory-300/60">{t.stat1Label}</p>
              </div>
              <div>
                <p className="text-h3 font-display text-forest-800 dark:text-ivory-100">{t.stat2Value}</p>
                <p className="mt-1 text-caption text-ink-500 dark:text-ivory-300/60">{t.stat2Label}</p>
              </div>
              <div>
                <p className="text-h3 font-display text-forest-800 dark:text-ivory-100">{t.stat3Value}</p>
                <p className="mt-1 text-caption text-ink-500 dark:text-ivory-300/60">{t.stat3Label}</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-in [animation-delay:200ms]">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-ink-900/15 ring-1 ring-stone-200/80 dark:ring-ink-800">
              <img
                src="https://images.pexels.com/photos/4800175/pexels-photo-4800175.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt={lang === 'es' ? 'Cocina renovada con isla de mármol' : 'Renovated kitchen with marble island'}
                className="aspect-[5/4] w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/20 to-transparent" />
            </div>
            <div className="absolute -bottom-5 -left-4 hidden overflow-hidden rounded-xl shadow-xl ring-1 ring-stone-200/80 dark:ring-ink-800 sm:block lg:-left-6">
              <img
                src="https://images.pexels.com/photos/8146211/pexels-photo-8146211.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt={lang === 'es' ? 'Baño renovado con mármol' : 'Renovated marble bathroom'}
                className="aspect-[4/3] w-44 object-cover lg:w-56"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-forest-100/30 blur-3xl dark:bg-forest-900/20" />
    </section>
  );
}
