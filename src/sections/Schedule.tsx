"use client";

import { useMemo, useState } from 'react';
import { Filter, Users, Clock } from 'lucide-react';
import { DAYS, DISCIPLINES, SCHEDULE, SCHEDULE_HEADING, type ScheduleSession } from '@/data/content';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/utils/cn';
import { useLang } from '@/context/PrefContext';

export function Schedule() {
  const lang = useLang();
  const t = SCHEDULE_HEADING[lang];
  const days = DAYS[lang];
  const disciplines = DISCIPLINES[lang];
  const [filter, setFilter] = useState('all');

  const sessionsByDay = useMemo(() => {
    const sessions = filter === 'all'
      ? SCHEDULE
      : SCHEDULE.filter((session) => session.disciplineId === filter);

    return days.map((day, dayIndex) => ({
      day,
      session: sessions.find((item) => item.day === dayIndex),
    }));
  }, [days, filter]);

  return (
    <section id="horarios" className="scroll-mt-20 bg-ivory-100 py-20 lg:py-28 dark:bg-ink-950">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.description}
        />

        <Reveal className="mt-10" delay={80}>
          <div className="flex flex-col gap-4 rounded-2xl border border-sage-200/60 bg-ivory-50 p-4 dark:border-ink-700 dark:bg-ink-800 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-caption font-semibold text-ink-500 dark:text-ivory-300/60">
              <Filter className="h-3.5 w-3.5" />
              <span>{t.filterDiscipline}</span>
            </div>
            <label className="relative flex-1 sm:max-w-xs">
              <span className="sr-only">{t.filterDiscipline}</span>
              <select
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                className="w-full appearance-none rounded-xl border border-sage-300 bg-ivory-100 px-4 py-2.5 pr-9 text-sm font-medium text-ink-700 outline-none transition-colors focus:border-sage-500 dark:border-ink-600 dark:bg-ink-700 dark:text-ivory-200"
              >
                <option value="all">{t.allOption}</option>
                {disciplines.map((discipline) => (
                  <option key={discipline.id} value={discipline.id}>{discipline.name}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-400">⌄</span>
            </label>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sessionsByDay.map(({ day, session }, index) => (
            <Reveal key={day} delay={index * 50}>
              {session ? (
                <CompactSessionCard
                  day={day}
                  session={session}
                  lang={lang}
                />
              ) : (
                <div className="flex min-h-[180px] flex-col justify-between rounded-2xl border border-dashed border-sage-200 bg-ivory-50/60 p-4 dark:border-ink-700 dark:bg-ink-800/40">
                  <p className="text-sm font-semibold text-sage-800 dark:text-ivory-100">{day}</p>
                  <p className="text-caption text-ink-400 dark:text-ivory-300/40">{t.emptyText}</p>
                </div>
              )}
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-caption text-ink-400 dark:text-ivory-300/45">
          {t.disclaimer}
        </p>
      </div>
    </section>
  );
}

function CompactSessionCard({ day, session, lang }: {
  day: string;
  session: ScheduleSession;
  lang: 'es' | 'en';
}) {
  const t = SCHEDULE_HEADING[lang];
  const disc = DISCIPLINES[lang].find((item) => item.id === session.disciplineId);
  const remaining = session.capacity - session.booked;
  const percentage = Math.round((session.booked / session.capacity) * 100);
  const full = remaining <= 0;

  return (
    <article className="group flex min-h-[180px] flex-col rounded-2xl border border-sage-200/60 bg-ivory-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-sage-400 hover:shadow-xl hover:shadow-ink-900/8 dark:border-ink-700 dark:bg-ink-800 dark:hover:border-sage-600">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-sage-800 dark:text-ivory-100">{session.disciplineName}</p>
          <p className="mt-1 text-caption font-medium text-ink-500 dark:text-ivory-300/60">{day} · {session.start}</p>
        </div>
        <span className={cn(
          'shrink-0 rounded-full px-2.5 py-1 text-micro font-semibold',
          disc?.accent === 'clay'
            ? 'bg-clay-100 text-clay-700 dark:bg-clay-500/15 dark:text-clay-300'
            : 'bg-sage-100 text-sage-700 dark:bg-sage-900/50 dark:text-sage-300',
        )}>
          {disc?.name}
        </span>
      </div>

      <div className="mt-auto pt-4">
        <div className="flex items-center justify-between text-micro text-ink-500 dark:text-ivory-300/55">
          <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{session.duration} {t.minLabel}</span>
          <span className={cn(
            'inline-flex items-center gap-1 font-semibold',
            full ? 'text-clay-600 dark:text-clay-400' : remaining <= 2 ? 'text-clay-500' : 'text-sage-600 dark:text-sage-400',
          )}>
            <Users className="h-3.5 w-3.5" />
            {full ? t.full : `${remaining} ${t.placesAvailable}`}
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sage-100 dark:bg-ink-700">
          <div className={cn('h-full rounded-full transition-all', full ? 'bg-clay-500' : 'bg-sage-500')} style={{ width: `${percentage}%` }} />
        </div>
        <button
          type="button"
          className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-sage-300 px-3 py-2 text-xs font-semibold text-sage-700 transition-colors hover:bg-sage-600 hover:text-white hover:border-sage-600 dark:border-ink-600 dark:text-sage-300 dark:hover:bg-sage-600 dark:hover:text-white dark:hover:border-sage-600"
        >
          {lang === 'es' ? 'Apuntarme' : 'Book this session'}
        </button>
      </div>
    </article>
  );
}
