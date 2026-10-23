import { useState } from 'react';
import { PORTFOLIO_ITEMS, PORTFOLIO_CATEGORIES, PORTFOLIO_HEADING } from '@/data/content';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/utils/cn';
import { useLang } from '@/context/PrefContext';

export function Portfolio() {
  const lang = useLang();
  const items = PORTFOLIO_ITEMS[lang];
  const categories = PORTFOLIO_CATEGORIES[lang];
  const heading = PORTFOLIO_HEADING[lang];
  const [filter, setFilter] = useState<string>(categories[0]);

  const filtered = filter === categories[0] ? items : items.filter((p) => p.category === filter);

  return (
    <section id="proyectos" className="bg-ivory-100 py-20 lg:py-28 dark:bg-ink-950">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />

        <Reveal className="mt-10 flex justify-center" delay={100}>
          <div className="inline-flex rounded-full border border-stone-200 bg-ivory-50 p-1 dark:border-ink-800 dark:bg-ink-900">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={cn(
                  'rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200',
                  filter === c
                    ? 'bg-forest-800 text-ivory-50 dark:bg-forest-700'
                    : 'text-ink-500 dark:text-ivory-300/60 hover:text-forest-800 dark:hover:text-ivory-100',
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid auto-rows-[220px] gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((item, i) => (
            <Reveal
              key={item.title}
              delay={(i % 4) * 80}
              className={cn(
                'group relative overflow-hidden rounded-2xl ring-1 ring-stone-200/80 dark:ring-ink-800',
                item.tall ? 'row-span-2' : '',
              )}
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-smooth-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-ink-950/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="text-micro font-semibold uppercase text-clay-300">
                  {item.category}
                </span>
                <h3 className="mt-1 text-lg font-display font-normal text-ivory-50">{item.title}</h3>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-caption text-ink-400 dark:text-ivory-300/40">
          {heading.disclaimer}
        </p>
      </div>
    </section>
  );
}
