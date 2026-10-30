"use client";

import { useEffect, useMemo, useState } from 'react';
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
  LayoutGrid,
  MapPin,
  Users,
} from 'lucide-react';
import { DAYS, DISCIPLINES, SCHEDULE, SCHEDULE_HEADING, type ScheduleSession } from '@/data/content';
import { ClassModal } from '@/components/ClassModal';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { useLang } from '@/context/PrefContext';
import { cn } from '@/utils/cn';

const LOCATION_LABELS = {
  es: { all: 'Todas', studio: 'Centro' },
  en: { all: 'All', studio: 'Studio' },
};

const WEEKDAY_LABELS = {
  es: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
  en: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
};

export function Schedule() {
  const lang = useLang();
  const t = SCHEDULE_HEADING[lang];
  const days = DAYS[lang];
  const disciplines = DISCIPLINES[lang];
  const today = new Date();
  const [view, setView] = useState<'grid' | 'calendar'>('grid');
  const [disciplineFilter, setDisciplineFilter] = useState('all');
  const [dayFilter, setDayFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [focusFilter, setFocusFilter] = useState('all');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<ScheduleSession | null>(null);
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [monthDate, setMonthDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 450);
    return () => window.clearTimeout(timer);
  }, []);

  const focusOptions = useMemo(() => Array.from(new Set(SCHEDULE.map((session) => session.level))), []);
  const filteredSessions = useMemo(() => SCHEDULE.filter((session) => {
    const matchesDiscipline = disciplineFilter === 'all' || session.disciplineId === disciplineFilter;
    const matchesDay = dayFilter === 'all' || session.day === Number(dayFilter);
    const matchesLocation = locationFilter === 'all' || locationFilter === 'studio';
    const matchesFocus = focusFilter === 'all' || session.level === focusFilter;
    const matchesAvailability = !availableOnly || session.booked < session.capacity;
    return matchesDiscipline && matchesDay && matchesLocation && matchesFocus && matchesAvailability;
  }), [availableOnly, dayFilter, disciplineFilter, focusFilter, locationFilter]);

  const calendarDays = useMemo(() => {
    const firstWeekday = (new Date(monthDate.getFullYear(), monthDate.getMonth(), 1).getDay() + 6) % 7;
    const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();
    return Array.from({ length: firstWeekday + daysInMonth }, (_, index) => {
      if (index < firstWeekday) return null;
      const date = index - firstWeekday + 1;
      const weekday = new Date(monthDate.getFullYear(), monthDate.getMonth(), date).getDay();
      const scheduleDay = weekday === 0 ? 6 : weekday - 1;
      return { date, scheduleDay, hasSessions: SCHEDULE.some((session) => session.day === scheduleDay) };
    });
  }, [monthDate]);

  const selectedCalendarSessions = filteredSessions.filter((session) => {
    const weekday = new Date(monthDate.getFullYear(), monthDate.getMonth(), selectedDate).getDay();
    const scheduleDay = weekday === 0 ? 6 : weekday - 1;
    return session.day === scheduleDay;
  });

  const monthLabel = monthDate.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
    month: 'long',
    year: 'numeric',
  });

  function clearFilters() {
    setDisciplineFilter('all');
    setDayFilter('all');
    setLocationFilter('all');
    setFocusFilter('all');
    setAvailableOnly(false);
  }

  return (
    <section id="horarios" className="scroll-mt-20 bg-ivory-100 py-20 lg:py-28 dark:bg-ink-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

        <Reveal className="mt-10" delay={80}>
          <div className="rounded-2xl border border-sage-200/60 bg-ivory-50 p-4 dark:border-ink-700 dark:bg-ink-900">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex rounded-xl bg-ivory-200/70 p-1 dark:bg-ink-800">
                <button
                  type="button"
                  onClick={() => setView('grid')}
                  className={cn('inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all', view === 'grid' ? 'bg-ink-900 text-white shadow-sm dark:bg-ivory-100 dark:text-ink-900' : 'text-ink-500 hover:text-ink-800 dark:text-ivory-300 dark:hover:text-white')}
                >
                  <LayoutGrid className="h-4 w-4" />
                  {t.gridLabel}
                </button>
                <button
                  type="button"
                  onClick={() => setView('calendar')}
                  className={cn('inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all', view === 'calendar' ? 'bg-ink-900 text-white shadow-sm dark:bg-ivory-100 dark:text-ink-900' : 'text-ink-500 hover:text-ink-800 dark:text-ivory-300 dark:hover:text-white')}
                >
                  <CalendarDays className="h-4 w-4" />
                  {t.calendarLabel}
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Filter className="mr-1 h-4 w-4 text-ink-400 dark:text-ivory-300/50" />
                <SelectFilter label={t.filterDiscipline} value={disciplineFilter} onChange={setDisciplineFilter} options={[{ value: 'all', label: t.allOption }, ...disciplines.map((discipline) => ({ value: discipline.id, label: discipline.name }))]} />
                <SelectFilter label={t.dayFilter} value={dayFilter} onChange={setDayFilter} options={[{ value: 'all', label: t.allOption }, ...days.map((day, index) => ({ value: String(index), label: day }))]} />
                <SelectFilter label={lang === 'es' ? 'Ubicación' : 'Location'} value={locationFilter} onChange={setLocationFilter} options={[{ value: 'all', label: LOCATION_LABELS[lang].all }, { value: 'studio', label: LOCATION_LABELS[lang].studio }]} />
                <SelectFilter label={t.filterLevel} value={focusFilter} onChange={setFocusFilter} options={[{ value: 'all', label: t.allOption }, ...focusOptions.map((focus) => ({ value: focus, label: focus }))]} />
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-sage-200 bg-ivory-100 px-3 py-2 text-xs font-semibold text-ink-600 transition-colors hover:border-sage-400 dark:border-ink-700 dark:bg-ink-800 dark:text-ivory-300">
                  <input type="checkbox" checked={availableOnly} onChange={(event) => setAvailableOnly(event.target.checked)} className="h-3.5 w-3.5 accent-sage-600" />
                  {t.availableOnly}
                </label>
              </div>
            </div>
          </div>
        </Reveal>

        {isLoading ? (
          <ScheduleSkeleton view={view} />
        ) : view === 'grid' ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSessions.slice(0, 6).map((session, index) => (
              <Reveal key={session.id} delay={(index % 6) * 45}>
                <SessionCard session={session} lang={lang} days={days} onBook={setSelectedSession} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-6 grid gap-5 lg:grid-cols-[300px_1fr]">
            <CalendarPanel
              monthLabel={monthLabel}
              calendarDays={calendarDays}
              selectedDate={selectedDate}
              weekdayLabels={WEEKDAY_LABELS[lang]}
              onSelect={(date, scheduleDay) => {
                setSelectedDate(date);
                setDayFilter(String(scheduleDay));
              }}
              onPrevious={() => setMonthDate(new Date(monthDate.getFullYear(), monthDate.getMonth() - 1, 1))}
              onNext={() => setMonthDate(new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1))}
            />
            <div className="rounded-2xl border border-sage-200/60 bg-ivory-50 p-4 dark:border-ink-700 dark:bg-ink-900 sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-3 border-b border-sage-200/60 pb-4 dark:border-ink-700">
                <div>
                  <p className="text-micro font-semibold uppercase tracking-[0.14em] text-sage-600 dark:text-sage-300">{t.selectedDayLabel}</p>
                  <h3 className="mt-1 text-xl font-display text-sage-800 dark:text-ivory-100">{days[(new Date(monthDate.getFullYear(), monthDate.getMonth(), selectedDate).getDay() + 6) % 7]}</h3>
                </div>
                <span className="rounded-full bg-sage-100 px-3 py-1 text-xs font-semibold text-sage-700 dark:bg-sage-900/60 dark:text-sage-300">{selectedCalendarSessions.length} {t.sessionsLabel}</span>
              </div>
              <div className="space-y-3">
                {selectedCalendarSessions.length > 0 ? selectedCalendarSessions.map((session) => <SessionListRow key={session.id} session={session} lang={lang} onBook={setSelectedSession} />) : <EmptyState text={t.emptyText} />}
              </div>
            </div>
          </div>
        )}

        {filteredSessions.length === 0 && view === 'grid' && <EmptyState text={t.emptyText} />}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
          <p className="text-caption text-ink-400 dark:text-ivory-300/45">{t.disclaimer}</p>
          {(disciplineFilter !== 'all' || dayFilter !== 'all' || locationFilter !== 'all' || focusFilter !== 'all' || availableOnly) && <button type="button" onClick={clearFilters} className="text-caption font-semibold text-clay-600 underline underline-offset-2 hover:text-clay-700 dark:text-clay-300">{t.clearFilters}</button>}
        </div>
      </div>
      {selectedSession && <ClassModal session={selectedSession} onClose={() => setSelectedSession(null)} />}
    </section>
  );
}

function SelectFilter({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: { value: string; label: string }[] }) {
  return (
    <label className="relative">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="appearance-none rounded-xl border border-sage-200 bg-ivory-100 py-2 pl-3 pr-8 text-xs font-semibold text-ink-700 outline-none transition-colors focus:border-sage-500 dark:border-ink-700 dark:bg-ink-800 dark:text-ivory-200">
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}

function CalendarPanel({ monthLabel, calendarDays, selectedDate, weekdayLabels, onSelect, onPrevious, onNext }: { monthLabel: string; calendarDays: ({ date: number; scheduleDay: number; hasSessions: boolean } | null)[]; selectedDate: number; weekdayLabels: string[]; onSelect: (date: number, scheduleDay: number) => void; onPrevious: () => void; onNext: () => void }) {
  return (
    <div className="rounded-2xl border border-sage-200/60 bg-ivory-50 p-4 dark:border-ink-700 dark:bg-ink-900">
      <div className="mb-5 flex items-center justify-between">
        <button type="button" onClick={onPrevious} aria-label="Previous month" className="grid h-8 w-8 place-items-center rounded-lg text-ink-500 hover:bg-sage-100 dark:text-ivory-300 dark:hover:bg-ink-800"><ChevronLeft className="h-4 w-4" /></button>
        <p className="text-sm font-semibold capitalize text-ink-800 dark:text-ivory-100">{monthLabel}</p>
        <button type="button" onClick={onNext} aria-label="Next month" className="grid h-8 w-8 place-items-center rounded-lg text-ink-500 hover:bg-sage-100 dark:text-ivory-300 dark:hover:bg-ink-800"><ChevronRight className="h-4 w-4" /></button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {weekdayLabels.map((label, index) => <span key={`${label}-${index}`} className="pb-2 text-micro font-semibold text-ink-400 dark:text-ivory-300/45">{label}</span>)}
        {calendarDays.map((day, index) => day ? <button key={day.date} type="button" onClick={() => onSelect(day.date, day.scheduleDay)} className={cn('relative grid aspect-square place-items-center rounded-lg text-xs font-medium transition-colors', selectedDate === day.date ? 'bg-sage-600 text-white' : 'text-ink-700 hover:bg-sage-100 dark:text-ivory-200 dark:hover:bg-ink-800')}><span>{day.date}</span>{day.hasSessions && selectedDate !== day.date && <span className="absolute bottom-1 h-1 w-1 rounded-full bg-clay-500" />}</button> : <span key={`empty-${index}`} />)}
      </div>
    </div>
  );
}

function SessionCard({ session, lang, days, onBook }: { session: ScheduleSession; lang: 'es' | 'en'; days: string[]; onBook: (session: ScheduleSession) => void }) {
  const disc = DISCIPLINES[lang].find((item) => item.id === session.disciplineId);
  return <article className="group flex flex-col rounded-2xl border border-sage-200/60 bg-ivory-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-sage-400 hover:shadow-xl hover:shadow-ink-900/8 dark:border-ink-700 dark:bg-ink-900 dark:hover:border-sage-600"><SessionSummary session={session} lang={lang} days={days} discName={disc?.name} /><BookingAction session={session} lang={lang} onBook={onBook} /></article>;
}

function SessionListRow({ session, lang, onBook }: { session: ScheduleSession; lang: 'es' | 'en'; onBook: (session: ScheduleSession) => void }) {
  const days = DAYS[lang];
  const disc = DISCIPLINES[lang].find((item) => item.id === session.disciplineId);
  return <article className="rounded-xl border border-sage-200/60 bg-ivory-100/70 p-4 dark:border-ink-700 dark:bg-ink-800/60"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><SessionSummary session={session} lang={lang} days={days} discName={disc?.name} /><BookingAction session={session} lang={lang} onBook={onBook} compact /></div></article>;
}

function SessionSummary({ session, lang, days, discName }: { session: ScheduleSession; lang: 'es' | 'en'; days: string[]; discName?: string }) {
  const t = SCHEDULE_HEADING[lang];
  const remaining = session.capacity - session.booked;
  const percentage = Math.round((session.booked / session.capacity) * 100);
  return <div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><div><h3 className="text-base font-semibold text-sage-800 dark:text-ivory-100">{session.disciplineName}</h3><p className="mt-1 text-caption font-medium text-ink-500 dark:text-ivory-300/60">{days[session.day]} · {session.start}</p></div><span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-sage-100 px-2.5 py-1 text-micro font-semibold text-sage-700 dark:bg-sage-900/60 dark:text-sage-300"><MapPin className="h-3 w-3" />{lang === 'es' ? 'Centro' : 'Studio'}</span></div><div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-micro text-ink-500 dark:text-ivory-300/55"><span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-sage-500" />{session.duration} {t.minLabel}</span><span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-sage-500" />{remaining <= 0 ? t.full : `${remaining} ${t.placesAvailable}`}</span><span className="rounded-full bg-clay-100 px-2 py-0.5 font-semibold text-clay-700 dark:bg-clay-500/15 dark:text-clay-300">{discName}</span></div><div className="mt-3 flex items-center gap-3"><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-sage-100 dark:bg-ink-700"><div className={cn('h-full rounded-full transition-all', remaining <= 0 ? 'bg-clay-500' : 'bg-sage-500')} style={{ width: `${percentage}%` }} /></div><span className="text-micro text-ink-400 dark:text-ivory-300/45">{session.booked}/{session.capacity}</span></div></div>;
}

function BookingAction({ session, lang, onBook, compact = false }: { session: ScheduleSession; lang: 'es' | 'en'; onBook: (session: ScheduleSession) => void; compact?: boolean }) {
  const full = session.booked >= session.capacity;
  return <button type="button" disabled={full} onClick={() => onBook(session)} title={full ? SCHEDULE_HEADING[lang].full : SCHEDULE_HEADING[lang].bookClass} className={cn('group/book mt-5 inline-flex items-center justify-center rounded-lg border px-3 py-2.5 text-xs font-semibold transition-all sm:shrink-0', compact && 'mt-0 sm:min-w-[150px]', full ? 'cursor-not-allowed border-ink-200 text-ink-400 dark:border-ink-700 dark:text-ivory-300/35' : 'border-sage-300 text-sage-700 hover:border-sage-600 hover:bg-sage-600 hover:text-white dark:border-ink-600 dark:text-sage-300 dark:hover:border-sage-600 dark:hover:bg-sage-600 dark:hover:text-white')}>
    {full ? SCHEDULE_HEADING[lang].full : <><span className="group-hover/book:hidden">{SCHEDULE_HEADING[lang].bookClass}</span><span className="hidden group-hover/book:inline">{lang === 'es' ? 'Reserva rápida' : 'Quick book'}</span></>}
  </button>;
}

function ScheduleSkeleton({ view }: { view: 'grid' | 'calendar' }) {
  if (view === 'calendar') {
    return <div className="mt-6 grid gap-5 lg:grid-cols-[300px_1fr]"><div className="h-[330px] animate-pulse rounded-2xl bg-ivory-200 dark:bg-ink-800" /><div className="h-[330px] animate-pulse rounded-2xl bg-ivory-200 dark:bg-ink-800" /></div>;
  }
  return <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <div key={index} className="h-[245px] animate-pulse rounded-2xl bg-ivory-200 dark:bg-ink-800" />)}</div>;
}

function EmptyState({ text }: { text: string }) {
  return <div className="mt-6 rounded-2xl border border-dashed border-sage-300 bg-ivory-50 px-6 py-12 text-center text-sm text-ink-500 dark:border-ink-700 dark:bg-ink-900 dark:text-ivory-300/60">{text}</div>;
}
