import { STUDIO_POINTS, STUDIO_HEADING } from '@/data/content';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { useLang } from '@/context/PrefContext';

export function Studio() {
  const lang = useLang();
  const points = STUDIO_POINTS[lang];
  const heading = STUDIO_HEADING[lang];

  return (
    <section id="centro" className="relative bg-ivory-50 py-20 lg:py-28 dark:bg-ink-900">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: image */}
          <Reveal className="order-2 flex lg:order-1 lg:h-full">
            <div className="relative w-full overflow-hidden rounded-[1.75rem] shadow-2xl shadow-ink-900/12 ring-1 ring-sage-200/60 dark:ring-ink-800 lg:h-full">
              <img
                src="https://images.pexels.com/photos/8436756/pexels-photo-8436756.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt={lang === 'es' ? 'Clase de yoga en el estudio' : 'Yoga class at the studio'}
                className="aspect-[4/3] w-full object-cover lg:h-full lg:aspect-auto"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/30 to-transparent" />
            </div>
          </Reveal>

          {/* Right: heading + points */}
          <div className="order-1 lg:order-2">
            <SectionHeading
              align="left"
              eyebrow={heading.eyebrow}
              title={heading.title}
              description={heading.description}
            />

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {points.map((p, i) => (
                <Reveal key={p.title} delay={i * 80}>
                  <div className="group flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sage-100 text-sage-600 transition-all duration-300 group-hover:bg-sage-600 group-hover:text-white dark:bg-sage-900/50 dark:text-sage-300 dark:group-hover:bg-sage-600 dark:group-hover:text-white">
                      <p.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-sage-800 dark:text-ivory-100">{p.title}</h3>
                      <p className="mt-1.5 text-caption leading-relaxed text-ink-600 dark:text-ivory-300/60">{p.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
