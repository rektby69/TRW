import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS, FAQ_HEADING } from '@/data/content';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/utils/cn';
import { useLang } from '@/context/PrefContext';

export function FAQ() {
  const lang = useLang();
  const faqs = FAQS[lang];
  const heading = FAQ_HEADING[lang];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-ivory-100 py-20 lg:py-28 dark:bg-ink-950">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="overflow-hidden rounded-xl border border-stone-200 bg-ivory-50 dark:border-ink-800 dark:bg-ink-900">
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-forest-800 dark:text-ivory-100">{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      'h-4.5 w-4.5 shrink-0 text-ink-400 dark:text-ivory-300/50 transition-transform duration-200',
                      open === i && 'rotate-180',
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'grid transition-all duration-200',
                    open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm leading-relaxed text-ink-600 dark:text-ivory-300/60">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
