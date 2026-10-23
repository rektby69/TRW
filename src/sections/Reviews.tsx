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
    <section className="bg-forest-900 py-20 lg:py-28 dark:bg-forest-950">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
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
              delay={i * 120}
              className="flex flex-col rounded-2xl border border-forest-700/40 bg-forest-800/40 p-7 dark:bg-forest-900/40"
            >
              <div className="flex gap-1 text-clay-300" aria-hidden>
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-clay-300" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-body italic leading-relaxed text-ivory-200/60">
                {lang === 'es'
                  ? '«Las reseñas reales de nuestros clientes aparecerán aquí pronto. Trabajamos para que cada reforma sea una experiencia positiva de principio a fin.»'
                  : '"Genuine reviews from our clients will appear here soon. We work to make every renovation a positive experience from start to finish."'}
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-forest-700/40 pt-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-forest-700 text-ivory-200">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ivory-50">{c.name}</p>
                  <p className="text-xs text-ivory-200/50">
                    {lang === 'es' ? `Reforma de ${c.project}` : `${c.project} renovation`}
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
