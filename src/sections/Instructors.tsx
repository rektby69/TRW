import { INSTRUCTORS, INSTRUCTORS_HEADING } from '@/data/content';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { useLang } from '@/context/PrefContext';

export function Instructors() {
  const lang = useLang();
  const instructors = INSTRUCTORS[lang];
  const heading = INSTRUCTORS_HEADING[lang];

  return (
    <section className="bg-ivory-100 py-20 lg:py-28 dark:bg-ink-950">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {instructors.map((p, i) => (
            <Reveal
              key={i}
              delay={i * 90}
              className="group flex flex-col overflow-hidden rounded-2xl bg-ivory-50 ring-1 ring-sage-200/60 dark:bg-ink-900 dark:ring-ink-800 transition-all duration-500 hover:shadow-2xl hover:shadow-ink-900/10 dark:hover:shadow-black/40"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.role}
                  className="h-full w-full object-cover transition-transform duration-700 ease-smooth-out group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-ink-950/10 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <h3 className="text-lg font-display font-normal text-white">{p.name}</h3>
                  <p className="text-sm font-medium text-clay-300">{p.role}</p>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="flex-1 text-sm leading-relaxed text-ink-600 dark:text-ivory-300/70">{p.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
