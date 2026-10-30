"use client";

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GALLERY, GALLERY_HEADING } from '@/data/content';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/utils/cn';
import { useLang } from '@/context/PrefContext';

export function Gallery() {
  const lang = useLang();
  const items = GALLERY[lang];
  const heading = GALLERY_HEADING[lang];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowRight') setActiveIndex((current) => current === null ? 0 : (current + 1) % items.length);
      if (event.key === 'ArrowLeft') setActiveIndex((current) => current === null ? items.length - 1 : (current - 1 + items.length) % items.length);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, items.length]);

  return (
    <section className="bg-ivory-50 py-20 lg:py-28 dark:bg-ink-900">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <SectionHeading eyebrow={heading.eyebrow} title={heading.title} description={heading.description} />

        <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 sm:auto-rows-[240px] lg:grid-cols-4">
          {items.map((g, i) => (
            <Reveal key={i} delay={(i % 4) * 70} className={cn('group relative overflow-hidden rounded-2xl ring-1 ring-sage-200/60 dark:ring-ink-800', g.span && 'col-span-2 row-span-2')}>
              <button type="button" onClick={() => setActiveIndex(i)} className="absolute inset-0 h-full w-full cursor-zoom-in text-left" aria-label={lang === 'es' ? `Ampliar: ${g.alt}` : `Enlarge: ${g.alt}`}>
                <img src={g.image} alt={g.alt} className="h-full w-full object-cover transition-transform duration-700 ease-smooth-out group-hover:scale-108" loading="lazy" />
                <span className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-ink-950/10 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
                <span className="absolute bottom-4 left-4 right-4 translate-y-2 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">{g.alt}</span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-950/90 p-5 backdrop-blur-md" role="dialog" aria-modal="true" aria-label={items[activeIndex].alt} onClick={() => setActiveIndex(null)}>
          <div className="relative max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <img src={items[activeIndex].image} alt={items[activeIndex].alt} className="max-h-[80vh] w-auto rounded-2xl object-contain shadow-2xl" />
            <p className="mt-3 text-center text-sm text-ivory-100/80">{items[activeIndex].alt}</p>
            <button type="button" onClick={() => setActiveIndex(null)} aria-label={lang === 'es' ? 'Cerrar galería' : 'Close gallery'} className="absolute -right-2 -top-2 grid h-10 w-10 place-items-center rounded-full bg-ivory-50 text-ink-900 shadow-lg transition-transform hover:scale-105"><X className="h-5 w-5" /></button>
            <button type="button" onClick={() => setActiveIndex((activeIndex - 1 + items.length) % items.length)} aria-label={lang === 'es' ? 'Imagen anterior' : 'Previous image'} className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-ink-950/70 text-white transition-colors hover:bg-ink-950"><ChevronLeft className="h-5 w-5" /></button>
            <button type="button" onClick={() => setActiveIndex((activeIndex + 1) % items.length)} aria-label={lang === 'es' ? 'Siguiente imagen' : 'Next image'} className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-ink-950/70 text-white transition-colors hover:bg-ink-950"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
      )}
    </section>
  );
}
