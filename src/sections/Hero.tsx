"use client";

import { useEffect, useState } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { HERO } from '@/data/content';
import { useLang } from '@/context/PrefContext';

export function Hero() {
  const lang = useLang();
  const t = HERO[lang];
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const updateParallax = () => setScrollOffset(Math.min(window.scrollY, 240));
    updateParallax();
    window.addEventListener('scroll', updateParallax, { passive: true });
    return () => window.removeEventListener('scroll', updateParallax);
  }, []);

  return (
    <section id="inicio" className="relative isolate flex min-h-[720px] items-end overflow-hidden bg-ink-950 pt-40 pb-12 lg:min-h-[780px] lg:items-center lg:pt-36 lg:pb-16">
      <img
        src="https://images.pexels.com/photos/3822672/pexels-photo-3822672.jpeg?auto=compress&cs=tinysrgb&w=1800"
        alt={lang === 'es' ? 'Sesión de yoga en el estudio con luz natural' : 'Yoga session at the studio in natural light'}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center transition-transform duration-200 ease-out"
        style={{ transform: `translateY(${scrollOffset * 0.2}px) scale(${1 + scrollOffset * 0.0001})` }}
        loading="eager"
      />
      <div className="hero-overlay absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/80 to-ink-950/15" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950/75 via-transparent to-ink-950/20" />

      <div className="relative mx-auto w-full max-w-8xl px-6 lg:px-10">
        <div className="max-w-3xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-clay-200/30 bg-ink-950/25 px-4 py-1.5 text-micro font-semibold uppercase tracking-[0.14em] text-clay-200 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-clay-300" />
            {t.eyebrow}
          </span>
          <h1 className="mt-6 max-w-2xl text-display font-display font-normal text-ivory-50 text-balance">
            {t.title}{' '}
            <span className="italic text-clay-300">{t.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-body-lg leading-relaxed text-ivory-100/85 text-pretty">
            {t.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#horarios"
              className="inline-flex items-center gap-2 rounded-full bg-clay-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-ink-950/30 transition-all hover:bg-clay-600 hover:shadow-xl active:scale-[0.98]"
            >
              {t.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#clases"
              className="inline-flex items-center gap-1.5 rounded-full border border-ivory-100/35 bg-ink-950/15 px-5 py-3 text-sm font-semibold text-ivory-50 backdrop-blur-sm transition-colors hover:border-ivory-100/60 hover:bg-ink-950/30"
            >
              {t.secondaryCta}
              <ArrowDown className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4 border-t border-ivory-100/25 pt-6 lg:mt-14 lg:gap-8">
            <div>
              <p className="text-h3 font-display text-ivory-50">{t.stat1Value}</p>
              <p className="mt-1 max-w-[9rem] text-caption text-ivory-100/65">{t.stat1Label}</p>
            </div>
            <div>
              <p className="text-h3 font-display text-ivory-50">{t.stat2Value}</p>
              <p className="mt-1 max-w-[9rem] text-caption text-ivory-100/65">{t.stat2Label}</p>
            </div>
            <div>
              <p className="text-h3 font-display text-ivory-50">{t.stat3Value}</p>
              <p className="mt-1 max-w-[10rem] text-caption text-ivory-100/65">{t.stat3Label}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 right-8 hidden h-24 w-24 rounded-full border border-clay-200/25 lg:block" />
      <div className="pointer-events-none absolute bottom-14 right-14 hidden h-12 w-12 rounded-full border border-clay-200/20 lg:block" />
    </section>
  );
}
