import { PROCESS_STEPS, PROCESS_HEADING } from '@/data/content';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { useLang } from '@/context/PrefContext';

export function Process() {
  const lang = useLang();
  const steps = PROCESS_STEPS[lang];
  const heading = PROCESS_HEADING[lang];

  return (
    <section id="proceso" className="bg-ivory-100 py-20 lg:py-28 dark:bg-ink-950">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />

        <div className="mt-16 grid gap-8 md:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 120} className="relative">
              {i < steps.length - 1 && (
                <div
                  className="absolute top-8 left-[55%] hidden h-px w-[80%] bg-gradient-to-r from-stone-300 to-transparent dark:from-ink-700 md:block"
                  aria-hidden
                />
              )}
              <div className="relative flex items-start gap-4 md:block">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-forest-800 text-ivory-50 shadow-sm dark:bg-forest-700">
                  <step.icon className="h-7 w-7" strokeWidth={1.5} />
                </span>
                <div className="md:mt-5">
                  <span className="text-h4 font-display text-clay-500">{step.n}</span>
                  <h3 className="mt-1 text-lg font-display font-normal text-forest-800 dark:text-ivory-100">{step.title}</h3>
                  <p className="mt-2 text-caption leading-relaxed text-ink-600 dark:text-ivory-300/60">{step.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
