"use client";

import { useState, useEffect } from 'react';
import { X, Clock, User, ChartBar as BarChart3, Users, ArrowRight, Info, ArrowLeft, CalendarDays } from 'lucide-react';
import { DISCIPLINES, BOOKING, DAYS, SCHEDULE_HEADING, type ScheduleSession } from '@/data/content';
import { cn } from '@/utils/cn';
import { useLang } from '@/context/PrefContext';

export function ClassModal({ session, onClose }: {
  session: ScheduleSession;
  onClose: () => void;
}) {
  const lang = useLang();
  const t = BOOKING[lang];
  const sch = SCHEDULE_HEADING[lang];
  const disc = DISCIPLINES[lang].find((d) => d.id === session.disciplineId);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const remaining = session.capacity - session.booked;
  const full = remaining <= 0;
  const pct = Math.round((session.booked / session.capacity) * 100);
  const dayName = DAYS[lang][session.day];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink-950/70 p-0 backdrop-blur-md sm:items-center sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-t-[1.75rem] bg-ivory-50 shadow-2xl sm:rounded-[1.5rem] dark:bg-ink-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header image */}
        {disc && (
          <div className="relative h-40 overflow-hidden sm:h-44">
            <img src={disc.image} alt={disc.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/30 to-transparent" />
            <button
              type="button"
              onClick={onClose}
              aria-label={t.closeBtn}
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-ink-950/40 text-white backdrop-blur-md transition-all hover:bg-ink-950/60 hover:scale-105"
            >
              <X className="h-4.5 w-4.5" />
            </button>
            <div className="absolute bottom-4 left-5">
              <span className={cn(
                'rounded-full px-2.5 py-1 text-micro font-semibold uppercase tracking-wider',
                disc.accent === 'clay' ? 'bg-clay-500 text-white' : 'bg-sage-600 text-white',
              )}>
                {disc.name}
              </span>
              <h3 className="mt-2 text-xl font-display font-normal text-white">{session.disciplineName}</h3>
            </div>
          </div>
        )}

        <div className="max-h-[60vh] overflow-y-auto p-6">
          {!preview ? (
            <>
              {/* Meta grid */}
              <div className="grid grid-cols-2 gap-4">
                <Meta icon={CalendarDays} label={lang === 'es' ? 'Día y hora' : 'Day & time'} value={`${dayName} · ${session.start}`} />
                <Meta icon={Clock} label={t.duration} value={`${session.duration} ${sch.minLabel}`} />
                <Meta icon={User} label={t.instructor} value={session.instructor} />
                <Meta icon={BarChart3} label={t.level} value={session.level} />
              </div>

              {/* Availability */}
              <div className="mt-5 rounded-xl border border-sage-200/60 bg-ivory-100 p-4 dark:border-ink-700 dark:bg-ink-800">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-700 dark:text-ivory-200">
                    <Users className="h-4 w-4 text-sage-500" />
                    {t.availability}
                  </span>
                  <span className={cn(
                    'text-sm font-bold',
                    full ? 'text-clay-600 dark:text-clay-400' : remaining <= 2 ? 'text-clay-500' : 'text-sage-600 dark:text-sage-400',
                  )}>
                    {full ? sch.full : `${remaining} ${sch.placesAvailable}`}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-sage-100 dark:bg-ink-700">
                    <div
                      className={cn('h-full rounded-full transition-all', full ? 'bg-clay-500' : remaining <= 2 ? 'bg-clay-400' : 'bg-sage-500')}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-caption text-ink-400 dark:text-ivory-300/40">{session.booked}/{session.capacity}</span>
                </div>
              </div>

              {/* What to expect */}
              <div className="mt-5">
                <h4 className="text-sm font-semibold text-sage-800 dark:text-ivory-100">{t.expectTitle}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600 dark:text-ivory-300/70">{t.expectText}</p>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => !full && setPreview(true)}
                  disabled={full}
                  className={cn(
                    'inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all active:scale-[0.98]',
                    full
                      ? 'cursor-not-allowed bg-ink-200 text-ink-400 dark:bg-ink-700 dark:text-ivory-300/40'
                      : 'bg-sage-600 text-white shadow-sm shadow-sage-900/20 hover:bg-sage-700 hover:shadow-md',
                  )}
                >
                  {t.bookBtn}
                  {!full && <ArrowRight className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-sage-300 px-6 py-3.5 text-sm font-semibold text-ink-600 transition-colors hover:bg-sage-50 dark:border-ink-600 dark:text-ivory-300 dark:hover:bg-ink-800"
                >
                  {t.closeBtn}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-clay-100 text-clay-600 dark:bg-clay-500/15 dark:text-clay-400">
                <Info className="h-7 w-7" />
              </div>
              <h3 className="mt-4 text-xl font-display font-normal text-sage-800 dark:text-ivory-100">{t.previewTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ivory-300/70">{t.previewText}</p>

              <div className="mt-4 rounded-xl border border-sage-200/60 bg-ivory-100 p-4 text-left dark:border-ink-700 dark:bg-ink-800">
                <p className="text-sm font-semibold text-ink-700 dark:text-ivory-200">{session.disciplineName}</p>
                <p className="mt-1 text-caption text-ink-500 dark:text-ivory-300/60">
                  {dayName} · {session.start} · {session.duration} {sch.minLabel} · {session.instructor}
                </p>
              </div>

              <p className="mt-3 text-caption text-ink-400 dark:text-ivory-300/40">{t.previewNote}</p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contacto"
                  onClick={onClose}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-sage-600 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-sage-700"
                >
                  {t.contactBtn}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setPreview(false)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-sage-300 px-6 py-3.5 text-sm font-semibold text-ink-600 transition-colors hover:bg-sage-50 dark:border-ink-600 dark:text-ivory-300 dark:hover:bg-ink-800"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t.backBtn}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Meta({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-sage-100 text-sage-600 dark:bg-sage-900/50 dark:text-sage-300">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-micro font-semibold uppercase tracking-wider text-ink-400 dark:text-ivory-300/40">{label}</p>
        <p className="text-sm font-medium text-ink-700 dark:text-ivory-200">{value}</p>
      </div>
    </div>
  );
}
