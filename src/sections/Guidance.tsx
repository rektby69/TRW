import { GUIDANCE_STEPS } from '@/data/content';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';

export function Guidance() {
  return (
    <section className="bg-forest-900 py-20 lg:py-28">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <SectionHeading
          dark
          eyebrow="¿No sabes por dónde empezar?"
          title="No necesitas tener todo decidido para hablar con nosotros"
          description="Una reforma empieza por entender qué necesitas y resolver las dudas importantes antes de la obra. Te acompañamos desde la primera conversación."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {GUIDANCE_STEPS.map((step, i) => (
            <Reveal
              key={step.title}
              delay={i * 120}
              className="rounded-2xl border border-forest-700/50 bg-forest-800/60 p-8"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-clay-500/15 text-clay-300">
                <step.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-display text-ivory-50">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory-200/70">{step.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 rounded-full bg-clay-500 px-7 py-3.5 text-sm font-semibold text-white shadow-sm shadow-clay-950/30 transition-colors hover:bg-clay-600"
          >
            Hablemos de tu proyecto
          </a>
        </Reveal>
      </div>
    </section>
  );
}
