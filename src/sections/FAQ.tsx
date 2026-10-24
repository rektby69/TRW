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
            <Reveal key={i} delay={i * 50}>
              <div className={cn(
                'overflow-hidden rounded-2xl border bg-ivory-50 transition-colors dark:bg-ink-900',
                open === i
                  ? 'border-sage-400 dark:border-sage-600'
                  : 'border-sage-200/60 dark:border-ink-800',
              )}>
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-sage-800 dark:text-ivory-100">{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      'h-4.5 w-4.5 shrink-0 text-clay-500 transition-transform duration-300',
                      open === i && 'rotate-180',
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'grid transition-all duration-300 ease-smooth-out',
                    open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm leading-relaxed text-ink-600 dark:text-ivory-300/65">
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
