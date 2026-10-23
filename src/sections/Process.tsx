import { PROCESS_STEPS } from '@/data/content';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';

export function Process() {
  return (
    <section id="proceso" className="bg-ivory-100 py-20 lg:py-28">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="El proceso"
          title="Qué pasa después de escribirnos"
          description="Cuatro pasos sencillos. No te pediremos que decidas nada sin tener toda la información primero."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 120} className="relative">
              {/* Connector line */}
              {i < PROCESS_STEPS.length - 1 && (
                <div
                  className="absolute top-7 left-[60%] hidden h-px w-[80%] bg-stone-300 md:block"
                  aria-hidden
                />
              )}
              <div className="relative">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-forest-800 text-lg font-bold text-ivory-50 shadow-sm">
                  {step.n}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-display text-forest-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
