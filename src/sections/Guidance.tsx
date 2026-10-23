import { GUIDANCE_STEPS, GUIDANCE_HEADING } from '@/data/content';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { useLang } from '@/context/PrefContext';

export function Guidance() {
  const lang = useLang();
  const steps = GUIDANCE_STEPS[lang];
  const heading = GUIDANCE_HEADING[lang];

  return (
    <section className="bg-forest-800 py-20 lg:py-28 dark:bg-forest-900">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <SectionHeading
          dark
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal
              key={step.title}
              delay={i * 120}
              className="group rounded-2xl border border-forest-700/40 bg-forest-900/50 p-8 transition-colors hover:border-clay-400/30 hover:bg-forest-900/70 dark:bg-forest-950/50"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-clay-500/15 text-clay-300 transition-transform duration-300 group-hover:scale-110">
                <step.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-display font-normal text-ivory-50">{step.title}</h3>
              <p className="mt-2 text-body leading-relaxed text-ivory-200/65">{step.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center" delay={200}>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 rounded-full bg-clay-500 px-7 py-3.5 text-sm font-semibold text-white shadow-sm shadow-clay-950/30 transition-all hover:bg-clay-600 active:scale-[0.98]"
          >
            {lang === 'es' ? 'Hablemos de tu proyecto' : 'Let\'s talk about your project'}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
