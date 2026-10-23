import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '@/data/content';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/utils/cn';

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-ivory-100 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Dudas habituales antes de empezar"
          description="Si no encuentras tu pregunta aquí, escríbenos y la resolvemos sin compromiso."
        />

        <div className="mt-12 space-y-3">
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="overflow-hidden rounded-xl border border-stone-200 bg-ivory-50">
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-forest-900">{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      'h-4.5 w-4.5 shrink-0 text-ink-400 transition-transform duration-200',
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
                    <p className="px-5 pb-4 text-sm leading-relaxed text-ink-500">
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
