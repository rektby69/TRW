import { ArrowRight } from 'lucide-react';
import { SERVICES } from '@/data/content';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/utils/cn';

export function Services() {
  return (
    <section id="servicios" className="bg-ivory-100 py-20 lg:py-28">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Qué hacemos"
          title="Servicios de reforma, de principio a fin"
          description="Nos ocupamos de cada fase de la reforma para que no tengas que coordinar varios proveedores ni preocuparte por los detalles."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:[&>div:nth-child(n+3)]:col-span-2">
          {SERVICES.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 100}
              className={cn(
                'group relative flex flex-col overflow-hidden rounded-2xl bg-ivory-50 ring-1 ring-stone-200/80 transition-shadow hover:shadow-lg hover:shadow-ink-900/5',
                s.featured && 'lg:col-span-2',
              )}
            >
              <div className={cn('relative overflow-hidden', s.featured ? 'aspect-[16/9]' : 'aspect-[4/3]')}>
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-h3 font-display text-forest-900">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">
                  {s.description}
                </p>
                <a
                  href="#contacto"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-clay-600 transition-colors hover:text-clay-700"
                >
                  Consultar este servicio
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
