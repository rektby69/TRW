import { useState, type FormEvent } from 'react';
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';
import { FORM_PROJECT_TYPES, FORM_TIMING } from '@/data/content';
import { cn } from '@/utils/cn';

type Status = 'idle' | 'submitting' | 'success' | 'error';

type FormState = {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  location: string;
  description: string;
  timing: string;
  budget: string;
  consent: boolean;
};

const EMPTY: FormState = {
  name: '',
  phone: '',
  email: '',
  projectType: '',
  location: '',
  description: '',
  timing: '',
  budget: '',
  consent: false,
};

export function LeadForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: '' }));
  }

  function validate(): Record<string, string> {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Introduce tu nombre.';
    if (!form.phone.trim() && !form.email.trim()) {
      e.contact = 'Necesitamos un teléfono o un email para contactarte.';
    }
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'El email no parece válido.';
    }
    if (!form.projectType) e.projectType = 'Selecciona un tipo de proyecto.';
    if (!form.consent) e.consent = 'Necesitamos que aceptes la política de privacidad.';
    return e;
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setStatus('submitting');
    // Demo mode: no backend connected. Simulate a brief processing delay,
    // then show an honest notice that the form is not yet wired up.
    await new Promise((r) => setTimeout(r, 900));
    setStatus('error');
  }

  if (status === 'success') {
    return (
      <div className="mx-auto max-w-lg rounded-2xl bg-forest-50 p-8 text-center ring-1 ring-forest-200">
        <CheckCircle2 className="mx-auto h-12 w-12 text-forest-600" />
        <h3 className="mt-4 text-xl font-display text-forest-900">¡Gracias!</h3>
        <p className="mt-2 text-sm text-ink-500">
          Hemos recibido tu solicitud. Nos pondremos en contacto contigo lo antes posible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Name */}
      <Field label="Nombre" required error={errors.name}>
        <input
          type="text"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          className={inputCls(!!errors.name)}
          aria-invalid={!!errors.name}
        />
      </Field>

      {/* Contact: phone + email */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Teléfono" error={errors.contact} hint={!errors.contact && !form.phone && !form.email ? 'Indica teléfono o email' : undefined}>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            className={inputCls(false)}
            autoComplete="tel"
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className={inputCls(!!errors.email)}
            autoComplete="email"
          />
        </Field>
      </div>
      {errors.contact && (
        <p className="-mt-2 text-sm text-clay-600">{errors.contact}</p>
      )}

      {/* Project type */}
      <Field label="Tipo de proyecto" required error={errors.projectType}>
        <div className="flex flex-wrap gap-2">
          {FORM_PROJECT_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => update('projectType', t)}
              className={cn(
                'rounded-full border px-5 py-2.5 text-sm font-medium transition-colors',
                form.projectType === t
                  ? 'border-forest-800 bg-forest-800 text-ivory-50'
                  : 'border-stone-300 bg-ivory-50 text-ink-600 hover:border-forest-400',
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </Field>

      {/* Location */}
      <Field label="Ubicación o código postal" hint="Opcional">
        <input
          type="text"
          value={form.location}
          onChange={(e) => update('location', e.target.value)}
          className={inputCls(false)}
        />
      </Field>

      {/* Timing */}
      <Field label="Plazo aproximado" hint="Opcional">
        <select
          value={form.timing}
          onChange={(e) => update('timing', e.target.value)}
          className={inputCls(false)}
        >
          <option value="">Selecciona una opción…</option>
          {FORM_TIMING.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </Field>

      {/* Budget */}
      <Field label="Presupuesto aproximado" hint="Opcional y orientativo">
        <select
          value={form.budget}
          onChange={(e) => update('budget', e.target.value)}
          className={inputCls(false)}
        >
          <option value="">Selecciona un rango…</option>
          <option value="hasta 5.000 €">Hasta 5.000 €</option>
          <option value="5.000 – 15.000 €">5.000 – 15.000 €</option>
          <option value="15.000 – 30.000 €">15.000 – 30.000 €</option>
          <option value="más de 30.000 €">Más de 30.000 €</option>
          <option value="no lo sé">Todavía no lo sé</option>
        </select>
      </Field>

      {/* Description */}
      <Field label="Cuéntanos tu proyecto" hint="Opcional — unas líneas son suficientes">
        <textarea
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          rows={4}
          className={cn(inputCls(false), 'resize-y')}
          placeholder="Qué quieres cambiar, qué es lo más importante para ti, cualquier duda que tengas…"
        />
      </Field>

      {/* Consent */}
      <div>
        <label className="flex items-start gap-3 text-sm text-ink-600">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => update('consent', e.target.checked)}
            className="mt-0.5 h-4.5 w-4.5 rounded border-stone-300 text-forest-700"
          />
          <span>
            Acepto que mis datos se utilicen para responder a esta solicitud.
            [Política de privacidad placeholder — sustitúyela por el texto
            real antes de publicar.]
          </span>
        </label>
        {errors.consent && (
          <p className="mt-1.5 text-sm text-clay-600">{errors.consent}</p>
        )}
      </div>

      {/* Error notice (demo mode) */}
      {status === 'error' && (
        <div className="flex items-start gap-3 rounded-xl border border-clay-200 bg-clay-50 p-4 text-sm text-clay-800">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>
            Esta es una demostración: el formulario no está conectado a un
            servidor todavía. Introduce los datos y pulsa para ver la
            validación, pero el envío no se procesará hasta que se configure
            el backend.
          </p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-clay-500 px-7 py-4 text-sm font-semibold text-white shadow-sm shadow-clay-900/20 transition-colors hover:bg-clay-600 disabled:opacity-60 sm:w-auto"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Enviando…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Solicitar presupuesto
          </>
        )}
      </button>
    </form>
  );
}

/* ---------- helpers ---------- */

function inputCls(hasError: boolean): string {
  return cn(
    'w-full rounded-xl border bg-ivory-50 px-4 py-3 text-sm text-ink-800 transition-colors',
    'placeholder:text-ink-300',
    hasError
      ? 'border-clay-400 ring-1 ring-clay-400/30'
      : 'border-stone-300 focus:border-forest-500',
  );
}

function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-baseline justify-between">
        <span className="text-sm font-semibold text-ink-700">
          {label}
          {required && <span className="ml-1 text-clay-500">*</span>}
        </span>
        {hint && !error && (
          <span className="text-xs text-ink-400">{hint}</span>
        )}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-sm text-clay-600">{error}</p>}
    </div>
  );
}
