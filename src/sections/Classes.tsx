import { ArrowRight, Clock, Users } from 'lucide-react';
import { DISCIPLINES, DISCIPLINES_HEADING } from '@/data/content';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/utils/cn';
import { useLang } from '@/context/PrefContext';

export function Classes() {
  const lang = useLang();
  const disciplines = DISCIPLINES[lang];
  const heading = DISCIPLINES_HEADING[lang];

  return (
    <section id="clases" className="relative bg-ivory-100 py-20 lg:py-28 dark:bg-ink-950">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {disciplines.map((d, i) => (
            <Reveal
              key={d.id}
              delay={i * 80}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-ivory-50 ring-1 ring-sage-200/60 dark:bg-ink-900 dark:ring-ink-800 transition-all duration-500 hover:shadow-2xl hover:shadow-ink-900/10 dark:hover:shadow-black/40 hover:ring-sage-300/80 dark:hover:ring-sage-700/60"
            >
              <div className="relative aspect-[5/3] overflow-hidden">
                <img
                  src={d.image}
                  alt={d.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-smooth-out group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-ink-950/10 to-transparent" />
                <span className={cn(
                  'absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl backdrop-blur-md transition-transform duration-300 group-hover:scale-110',
                  d.accent === 'clay'
                    ? 'bg-clay-500/90 text-white'
                    : 'bg-sage-600/90 text-white',
                )}>
                  <d.icon className="h-5 w-5" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-h4 font-display font-normal text-sage-800 dark:text-ivory-100">{d.name}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-600 dark:text-ivory-300/70">
                  {d.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-caption text-ink-500 dark:text-ivory-300/60">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-sage-500" />
                    {d.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-sage-500" />
                    {lang === 'es' ? `Máx. ${d.capacity}` : `Max ${d.capacity}`}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-sage-100 px-2.5 py-0.5 font-medium text-sage-700 dark:bg-sage-900/50 dark:text-sage-300">
                    {d.level}
                  </span>
                </div>
                <a
                  href="#horarios"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-clay-600 dark:text-clay-400 transition-colors hover:text-clay-700 dark:hover:text-clay-300"
                >
                  {lang === 'es' ? 'Ver horarios' : 'View schedule'}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
