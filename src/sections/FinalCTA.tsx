import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export function FinalCTA() {
  return (
    <section className="bg-clay-500 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <Reveal>
          <h2 className="text-h2 font-display text-ivory-50">
            ¿Hablamos de tu reforma?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-clay-50/90">
            Puedes empezar simplemente contándonos tus ideas y tus necesidades.
            No necesitas tener cada detalle decidido para dar el primer paso.
          </p>
          <a
            href="#contacto"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest-900 px-8 py-4 text-sm font-semibold text-ivory-50 shadow-sm transition-colors hover:bg-forest-950 active:scale-[0.98]"
          >
            Solicita un presupuesto
            <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
