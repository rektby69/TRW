import { Star, MessageCircle } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';

export function Reviews() {
  return (
    <section className="bg-forest-950 py-20 lg:py-28">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <SectionHeading
          dark
          eyebrow="Opiniones"
          title="Lo que dicen quienes han reformado con nosotros"
          description="Reservamos este espacio para reseñas reales de clientes. De momento, aquí se muestra un placeholder hasta que dispongamos de opiniones verificadas."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { name: '[Nombre]', project: 'Cocina' },
            { name: '[Nombre]', project: 'Baño' },
            { name: '[Nombre]', project: 'Ambos' },
          ].map((c, i) => (
            <Reveal
              key={i}
              delay={i * 120}
              className="flex flex-col rounded-2xl border border-forest-700/50 bg-forest-900/60 p-7"
            >
              <div className="flex gap-1 text-clay-300" aria-hidden>
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-clay-300" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm italic leading-relaxed text-ivory-200/70">
                «[Texto de la reseña real. Esta tarjeta es un placeholder: las
                valoraciones se añadirán una vez disponibles, preferiblemente
                desde una fuente verificada como Google.]»
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-forest-700/50 pt-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-forest-700 text-ivory-200">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ivory-50">{c.name}</p>
                  <p className="text-xs text-ivory-200/60">Reforma de {c.project}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-ivory-200/50">
          No se han inventado testimonios. Sustituye estos placeholders por reseñas reales antes de publicar.
        </p>
      </div>
    </section>
  );
}
