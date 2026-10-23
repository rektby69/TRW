import { LeadForm } from '@/components/LeadForm';
import { Reveal } from '@/components/Reveal';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { CONTACT } from '@/data/content';
import { useLang } from '@/context/PrefContext';

export function Contact() {
  const lang = useLang();
  const t = CONTACT[lang];

  const contactItems = [
    { icon: Phone, label: t.phoneLabel, value: t.phoneValue },
    { icon: Mail, label: t.emailLabel, value: t.emailValue },
    { icon: MapPin, label: t.areaLabel, value: t.areaValue },
    { icon: Clock, label: t.hoursLabel, value: t.hoursValue },
  ];

  return (
    <section id="contacto" className="scroll-mt-20 bg-ivory-50 py-20 lg:py-28 dark:bg-ink-900">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: copy + contact info */}
          <Reveal>
            <span className="text-micro font-semibold uppercase tracking-[0.18em] text-clay-500">
              {t.eyebrow}
            </span>
            <h2 className="mt-4 text-h2 font-display font-normal text-forest-800 dark:text-ivory-100 text-balance">
              {t.title}
            </h2>
            <p className="mt-5 text-body-lg leading-relaxed text-ink-600 dark:text-ivory-300/70 text-pretty">
              {t.description}
            </p>

            <div className="mt-8 space-y-4">
              {contactItems.map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-forest-50 text-forest-700 dark:bg-forest-800/50 dark:text-forest-300">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-micro font-semibold uppercase text-ink-400 dark:text-ivory-300/40">{c.label}</p>
                    <p className="text-sm font-medium text-ink-700 dark:text-ivory-200">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={150} className="rounded-2xl bg-ivory-100 p-7 shadow-sm shadow-ink-900/5 ring-1 ring-stone-200/80 dark:bg-ink-800 dark:ring-ink-700 lg:p-9">
            <LeadForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
