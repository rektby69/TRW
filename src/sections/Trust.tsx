import { TRUST_POINTS } from '@/data/content';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { UserCircle2 } from 'lucide-react';

export function Trust() {
  return (
    <section className="bg-ivory-50 py-20 lg:py-28">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: heading + points */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="Por qué confiar en nosotros"
              title="Una reforma bien planificada empieza con confianza"
              description="Elegir a quien va a reformar tu casa no es una decisión menor. Por eso nos tomamos el tiempo de explicarte todo lo que necesitas saber antes de empezar."
            />

            <div className="mt-10 space-y-6">
              {TRUST_POINTS.map((p, i) => (
                <Reveal key={p.title} delay={i * 100} className="flex gap-4">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-clay-100 text-clay-600">
                    <span className="h-2 w-2 rounded-full bg-clay-500" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-forest-900">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-500">{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: profile card placeholder */}
          <Reveal delay={150} className="flex">
            <div className="flex w-full flex-col overflow-hidden rounded-2xl bg-ivory-100 ring-1 ring-stone-200/80">
              <div className="grid aspect-[4/3] place-items-center bg-stone-200/60 text-stone-400">
                <div className="text-center">
                  <UserCircle2 className="mx-auto h-20 w-20" />
                  <p className="mt-2 text-sm font-medium">Foto del equipo o profesional</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display text-forest-900">
                  [Nombre del responsable]
                </h3>
                <p className="mt-1 text-sm font-medium text-clay-600">
                  [Especialización — p. ej. Carpintería y reformas]
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink-500">
                  [Breve presentación profesional: trayectoria, forma de trabajar
                  con los clientes y qué les pide antes de empezar. Personaliza
                  este texto con la información real de tu empresa.]
                </p>
                <p className="mt-4 text-xs text-ink-400">
                  Placeholder: verifica que cualquier titulación o experiencia
                  mencionada se pueda acreditar antes de publicar la página.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
