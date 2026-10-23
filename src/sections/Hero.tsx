import { ArrowRight, ArrowDown } from 'lucide-react';

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-ivory-50 pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Copy */}
          <div className="animate-fade-up">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-clay-500">
              Reformas de cocinas y baños
            </span>
            <h1 className="mt-4 text-display font-display text-forest-900">
              Una cocina o baño que funcione, con orientación en cada paso.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-500">
              Si no sabes por dónde empezar, no pasa nada. Te ayudamos a tomar
              decisiones con calma, a elegir materiales sensatos y a entender
              el presupuesto antes de cualquier obra.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-full bg-clay-500 px-7 py-3.5 text-sm font-semibold text-white shadow-sm shadow-clay-900/20 transition-all hover:bg-clay-600 active:scale-[0.98]"
              >
                Solicita un presupuesto
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#proyectos"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 underline-offset-4 hover:underline"
              >
                Ver proyectos
                <ArrowDown className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-in [animation-delay:200ms]">
            <div className="relative overflow-hidden rounded-2xl shadow-xl shadow-ink-900/10 ring-1 ring-stone-200">
              <img
                src="https://images.pexels.com/photos/6510984/pexels-photo-6510984.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Cocina renovada, luminosa y funcional con encimera de granito"
                className="aspect-[4/3] w-full object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 hidden overflow-hidden rounded-xl shadow-lg ring-1 ring-stone-200 sm:block lg:-left-8">
              <img
                src="https://images.pexels.com/photos/35868666/pexels-photo-35868666.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Baño moderno renovado con doble lavabo"
                className="aspect-[4/3] w-44 object-cover lg:w-56"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Subtle background texture */}
      <div className="pointer-events-none absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-forest-100/40 blur-3xl" />
    </section>
  );
}
