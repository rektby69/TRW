import { Star, MessageCircle } from 'lucide-react';
import { REVIEWS, REVIEWS_HEADING } from '@/data/content';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { useLang } from '@/context/PrefContext';

export function Reviews() {
  const lang = useLang();
  const reviews = REVIEWS[lang];
  const heading = REVIEWS_HEADING[lang];

  return (
    <section className="relative overflow-hidden bg-sage-800 py-20 lg:py-28 dark:bg-sage-900">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-sage-700/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-clay-600/15 blur-3xl" />

      <div className="relative mx-auto max-w-8xl px-6 lg:px-10">
        <SectionHeading
          dark
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reviews.map((c, i) => (
            <Reveal
              key={i}
              delay={i * 100}
              className="flex flex-col rounded-2xl border border-sage-600/30 bg-sage-900/40 p-7 backdrop-blur-sm dark:bg-sage-950/40"
            >
              <div className="flex gap-1 text-clay-300" aria-hidden>
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-clay-300" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-body italic leading-relaxed text-ivory-200/65">
                {lang === 'es'
                  ? '«Las reseñas reales de nuestros alumnos aparecerán aquí pronto. Trabajamos para que cada clase sea una experiencia positiva y adaptada a cada persona.»'
                  : '"Genuine reviews from our students will appear here soon. We work to make every class a positive experience tailored to each person."'}
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-sage-600/30 pt-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-sage-700 text-ivory-200">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ivory-50">{c.name}</p>
                  <p className="text-xs text-ivory-200/50">
                    {lang === 'es' ? `Alumno/a de ${c.project}` : `${c.project} student`}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-caption text-ivory-200/40">
          {heading.disclaimer}
        </p>
      </div>
    </section>
  );
}
