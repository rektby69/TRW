import { LeadForm } from '@/components/LeadForm';
import { Reveal } from '@/components/Reveal';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export function Contact() {
  return (
    <section id="contacto" className="scroll-mt-20 bg-ivory-50 py-20 lg:py-28">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: copy + contact info */}
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-clay-500">
              Solicita un presupuesto
            </span>
            <h2 className="mt-3 text-h2 font-display text-forest-900">
              Cuéntanos qué reforma tienes en mente
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-500">
              Comparte algunos detalles de tu proyecto y nos pondremos en
              contacto contigo. No necesitas tener todo definido: unas pocas
              líneas son suficientes para empezar a orientarte.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: Phone, label: 'Teléfono', value: '[Número de teléfono]' },
                { icon: Mail, label: 'Email', value: '[correo@empresa.es]' },
                { icon: MapPin, label: 'Zona de trabajo', value: '[Indica tu área de servicio]' },
                { icon: Clock, label: 'Horario', value: '[Lun–Vie · 9:00–18:00]' },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-forest-50 text-forest-700">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                      {c.label}
                    </p>
                    <p className="text-sm font-medium text-ink-700">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={150} className="rounded-2xl bg-ivory-100 p-7 shadow-sm shadow-ink-900/5 ring-1 ring-stone-200/80 lg:p-9">
            <LeadForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
