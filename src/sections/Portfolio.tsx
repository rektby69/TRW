import { useState } from 'react';
import { PORTFOLIO_ITEMS, PORTFOLIO_CATEGORIES } from '@/data/content';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/utils/cn';

export function Portfolio() {
  const [filter, setFilter] = useState<(typeof PORTFOLIO_CATEGORIES)[number]>('Todos');

  const items =
    filter === 'Todos'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((p) => p.category === filter);

  return (
    <section id="proyectos" className="bg-ivory-100 py-20 lg:py-28">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Proyectos"
          title="Ejemplos de reformas realizadas"
          description="Una selección para ayudarte a imaginar lo que es posible en tu vivienda. Son imágenes de muestra; las fotos reales de tus proyectos pueden añadirse fácilmente."
        />

        {/* Filter */}
        <Reveal className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full border border-stone-200 bg-ivory-50 p-1">
            {PORTFOLIO_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={cn(
                  'rounded-full px-5 py-2 text-sm font-semibold transition-colors',
                  filter === c
                    ? 'bg-forest-800 text-ivory-50'
                    : 'text-ink-500 hover:text-forest-800',
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={(i % 3) * 100}
              className="group relative overflow-hidden rounded-2xl ring-1 ring-stone-200/80"
            >
              <img
                src={item.image}
                alt={item.title}
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/0 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-clay-300">
                  {item.category}
                </span>
                <h3 className="mt-1 text-lg font-display text-ivory-50">{item.title}</h3>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-ink-400">
          Imágenes de muestra para la demostración. No corresponden a proyectos reales de la empresa.
        </p>
      </div>
    </section>
  );
}
