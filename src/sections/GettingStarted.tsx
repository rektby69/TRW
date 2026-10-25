"use client";

import { ArrowRight, Check } from 'lucide-react';
import { GETTING_STARTED } from '@/data/content';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { useLang } from '@/context/PrefContext';

export function GettingStarted() {
  const lang = useLang();
  const data = GETTING_STARTED[lang];

  return (
    <section className="relative overflow-hidden bg-sage-700 py-20 lg:py-28 dark:bg-sage-800">
      <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-sage-600/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-clay-500/15 blur-3xl" />

      <div className="relative mx-auto max-w-8xl px-6 lg:px-10">
        <SectionHeading
          dark
          eyebrow={data.heading.eyebrow}
          title={data.heading.title}
          description={data.heading.description}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {data.steps.map((step, i) => (
            <Reveal
              key={step.n}
              delay={i * 90}
              className="group rounded-2xl border border-sage-500/30 bg-sage-800/40 p-7 backdrop-blur-sm transition-all duration-300 hover:border-sage-400/50 hover:bg-sage-800/60 dark:bg-sage-900/40 dark:hover:bg-sage-900/60"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-clay-400/25 text-clay-200 font-display text-lg transition-transform duration-300 group-hover:scale-110">
                  {step.n}
                </span>
                <Check className="h-4 w-4 text-sage-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <h3 className="mt-5 text-lg font-display font-normal text-ivory-50">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory-200/65">{step.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center" delay={150}>
          <a
            href="#clases"
            className="inline-flex items-center gap-2 rounded-full bg-clay-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sage-950/30 transition-all hover:bg-clay-600 hover:shadow-xl active:scale-[0.98]"
          >
            {data.cta}
            <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
