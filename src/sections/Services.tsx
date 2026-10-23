import { ArrowRight, Check } from 'lucide-react';
import { SERVICES, SERVICES_HEADING } from '@/data/content';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/utils/cn';
import { useLang } from '@/context/PrefContext';

export function Services() {
  const lang = useLang();
  const services = SERVICES[lang];
  const heading = SERVICES_HEADING[lang];

  return (
    <section id="servicios" className="bg-ivory-100 py-20 lg:py-28 dark:bg-ink-950">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:[&>div:nth-child(n+3)]:col-span-2">
          {services.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 100}
              className={cn(
                'group relative flex flex-col overflow-hidden rounded-2xl bg-ivory-50 ring-1 ring-stone-200/80 dark:bg-ink-900 dark:ring-ink-800 transition-all duration-300 hover:shadow-xl hover:shadow-ink-900/8 dark:hover:shadow-black/30',
                s.featured && 'lg:col-span-2',
              )}
            >
              <div className={cn('relative overflow-hidden', s.featured ? 'aspect-[16/10]' : 'aspect-[4/3]')}>
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-smooth-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <div className="flex flex-1 flex-col p-6 lg:p-7">
                <h3 className="text-h3 font-display font-normal text-forest-800 dark:text-ivory-100">{s.title}</h3>
                <p className="mt-3 flex-1 text-body leading-relaxed text-ink-600 dark:text-ivory-300/70">
                  {s.description}
                </p>
                {s.features.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-caption text-ink-600 dark:text-ivory-300/60">
                        <Check className="h-3.5 w-3.5 shrink-0 text-clay-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
                <a
                  href="#contacto"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-clay-600 dark:text-clay-400 transition-colors hover:text-clay-700"
                >
                  {lang === 'es' ? 'Consultar este servicio' : 'Ask about this service'}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
