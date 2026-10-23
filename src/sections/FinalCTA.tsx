import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { FINAL_CTA } from '@/data/content';
import { useLang } from '@/context/PrefContext';

export function FinalCTA() {
  const lang = useLang();
  const t = FINAL_CTA[lang];

  return (
    <section className="bg-clay-500 py-20 lg:py-28 dark:bg-clay-600">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <Reveal>
          <h2 className="text-h2 font-display font-normal text-ivory-50 text-balance">
            {t.title}
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-body-lg leading-relaxed text-clay-50/90 text-pretty">
            {t.description}
          </p>
          <a
            href="#contacto"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest-900 px-8 py-4 text-sm font-semibold text-ivory-50 shadow-md shadow-forest-950/30 transition-all hover:bg-forest-950 active:scale-[0.98]"
          >
            {t.button}
            <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
