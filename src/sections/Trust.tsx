import { TRUST_POINTS, TRUST_HEADING, TRUST_PROFILE } from '@/data/content';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { CircleUser as UserCircle2 } from 'lucide-react';
import { useLang } from '@/context/PrefContext';

export function Trust() {
  const lang = useLang();
  const points = TRUST_POINTS[lang];
  const heading = TRUST_HEADING[lang];
  const profile = TRUST_PROFILE[lang];

  return (
    <section className="bg-ivory-50 py-20 lg:py-28 dark:bg-ink-900">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: heading + points */}
          <div>
            <SectionHeading
              align="left"
              eyebrow={heading.eyebrow}
              title={heading.title}
              description={heading.description}
            />

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {points.map((p, i) => (
                <Reveal key={p.title} delay={i * 80}>
                  <div className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-clay-100 text-clay-600 dark:bg-clay-500/15 dark:text-clay-400">
                      <p.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-forest-800 dark:text-ivory-100">{p.title}</h3>
                      <p className="mt-1.5 text-caption leading-relaxed text-ink-600 dark:text-ivory-300/60">{p.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: profile card */}
          <Reveal delay={150} className="flex">
            <div className="flex w-full flex-col overflow-hidden rounded-2xl bg-ivory-100 ring-1 ring-stone-200/80 dark:bg-ink-800 dark:ring-ink-700">
              <div className="grid aspect-[4/3] place-items-center bg-stone-200/50 text-stone-400 dark:bg-ink-700 dark:text-ink-500">
                <div className="text-center">
                  <UserCircle2 className="mx-auto h-20 w-20" />
                  <p className="mt-2 text-sm font-medium">{lang === 'es' ? 'Foto del equipo o profesional' : 'Team or professional photo'}</p>
                </div>
              </div>
              <div className="p-6 lg:p-7">
                <h3 className="text-xl font-display font-normal text-forest-800 dark:text-ivory-100">
                  {profile.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-clay-600 dark:text-clay-400">
                  {profile.role}
                </p>
                <p className="mt-4 text-body leading-relaxed text-ink-600 dark:text-ivory-300/60">
                  {profile.bio}
                </p>
                <p className="mt-4 text-caption text-ink-400 dark:text-ivory-300/40">
                  {profile.note}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
