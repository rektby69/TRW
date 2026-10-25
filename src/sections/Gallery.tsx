"use client";

import { GALLERY, GALLERY_HEADING } from '@/data/content';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/utils/cn';
import { useLang } from '@/context/PrefContext';

export function Gallery() {
  const lang = useLang();
  const items = GALLERY[lang];
  const heading = GALLERY_HEADING[lang];

  return (
    <section className="bg-ivory-50 py-20 lg:py-28 dark:bg-ink-900">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />

        <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 sm:auto-rows-[240px] lg:grid-cols-4">
          {items.map((g, i) => (
            <Reveal
              key={i}
              delay={(i % 4) * 70}
              className={cn(
                'group relative overflow-hidden rounded-2xl ring-1 ring-sage-200/60 dark:ring-ink-800',
                g.span && 'col-span-2 row-span-2',
              )}
            >
              <img
                src={g.image}
                alt={g.alt}
                className="h-full w-full object-cover transition-transform duration-700 ease-smooth-out group-hover:scale-108"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/10 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
              <p className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                {g.alt}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
