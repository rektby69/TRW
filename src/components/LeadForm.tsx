import { useState, type FormEvent } from 'react';
import { CircleCheck as CheckCircle2, CircleAlert as AlertCircle, Loader as Loader2, Send } from 'lucide-react';
import { FORM } from '@/data/content';
import { useLang } from '@/context/PrefContext';
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
  const lang = useLang();
  const t = FORM[lang];

  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: '' }));
  }

  function validate(): Record<string, string> {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = t.nameError;
    if (!form.phone.trim() && !form.email.trim()) {
      e.contact = t.contactError;
    }
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = t.emailError;
    }
    if (!form.projectType) e.projectType = t.projectTypeError;
    if (!form.consent) e.consent = t.consentError;
    return e;
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setStatus('submitting');
    await new Promise((r) => setTimeout(r, 900));
    setStatus('error');
  }

  if (status === 'success') {
    return (
      <div className="mx-auto max-w-lg rounded-2xl bg-forest-50 p-8 text-center ring-1 ring-forest-200 dark:bg-forest-800/30 dark:ring-forest-700">
        <CheckCircle2 className="mx-auto h-12 w-12 text-forest-600 dark:text-forest-300" />
        <h3 className="mt-4 text-xl font-display font-normal text-forest-900 dark:text-ivory-100">{t.successTitle}</h3>
        <p className="mt-2 text-sm text-ink-600 dark:text-ivory-300/70">{t.successText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Field label={t.nameLabel} required error={errors.name}>
        <input
          type="text"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          className={inputCls(!!errors.name)}
          aria-invalid={!!errors.name}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.phoneLabel} error={errors.contact} hint={!errors.contact && !form.phone && !form.email ? t.contactHint : undefined}>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            className={inputCls(false)}
            autoComplete="tel"
          />
        </Field>
        <Field label={t.emailLabel} error={errors.email}>
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
        <p className="-mt-2 text-sm text-clay-600 dark:text-clay-400">{errors.contact}</p>
      )}

      <Field label={t.projectTypeLabel} required error={errors.projectType}>
        <div className="flex flex-wrap gap-2">
          {t.projectTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => update('projectType', type)}
              className={cn(
                'rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200',
                form.projectType === type
                  ? 'border-forest-800 bg-forest-800 text-ivory-50 dark:border-forest-600 dark:bg-forest-700'
                  : 'border-stone-300 bg-ivory-50 text-ink-600 hover:border-forest-400 dark:border-ink-600 dark:bg-ink-700 dark:text-ivory-300 dark:hover:border-forest-500',
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </Field>

      <Field label={t.locationLabel} hint={t.locationHint}>
        <input
          type="text"
          value={form.location}
          onChange={(e) => update('location', e.target.value)}
          className={inputCls(false)}
        />
      </Field>

      <Field label={t.timingLabel} hint={t.timingHint}>
        <select
          value={form.timing}
          onChange={(e) => update('timing', e.target.value)}
          className={inputCls(false)}
        >
          <option value="">{t.selectOption}</option>
          {t.timingOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </Field>

      <Field label={t.budgetLabel} hint={t.budgetHint}>
        <select
          value={form.budget}
          onChange={(e) => update('budget', e.target.value)}
          className={inputCls(false)}
        >
          <option value="">{t.selectOption}</option>
          {t.budgetOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </Field>

      <Field label={t.descriptionLabel} hint={t.descriptionHint}>
        <textarea
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          rows={4}
          className={cn(inputCls(false), 'resize-y')}
          placeholder={t.descriptionPlaceholder}
        />
      </Field>

      <div>
        <label className="flex items-start gap-3 text-sm text-ink-600 dark:text-ivory-300/70">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => update('consent', e.target.checked)}
            className="mt-0.5 h-4.5 w-4.5 rounded border-stone-300 text-forest-700 dark:border-ink-600 dark:bg-ink-700"
          />
          <span>{t.consentText}</span>
        </label>
        {errors.consent && (
          <p className="mt-1.5 text-sm text-clay-600 dark:text-clay-400">{errors.consent}</p>
        )}
      </div>

      {status === 'error' && (
        <div className="flex items-start gap-3 rounded-xl border border-clay-200 bg-clay-50 p-4 text-sm text-clay-800 dark:border-clay-500/30 dark:bg-clay-500/10 dark:text-clay-200">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>{t.errorNotice}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-clay-500 px-7 py-4 text-sm font-semibold text-white shadow-sm shadow-clay-900/20 transition-all hover:bg-clay-600 active:scale-[0.98] disabled:opacity-60 sm:w-auto"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t.submitting}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            {t.submitBtn}
          </>
        )}
      </button>
    </form>
  );
}

function inputCls(hasError: boolean): string {
  return cn(
    'w-full rounded-xl border bg-ivory-50 px-4 py-3 text-sm text-ink-800 transition-colors dark:bg-ink-700 dark:text-ivory-100',
    'placeholder:text-ink-300 dark:placeholder:text-ivory-300/30',
    hasError
      ? 'border-clay-400 ring-1 ring-clay-400/30'
      : 'border-stone-300 focus:border-forest-500 dark:border-ink-600 dark:focus:border-forest-500',
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
        <span className="text-sm font-semibold text-ink-700 dark:text-ivory-200">
          {label}
          {required && <span className="ml-1 text-clay-500">*</span>}
        </span>
        {hint && !error && (
          <span className="text-xs text-ink-400 dark:text-ivory-300/40">{hint}</span>
        )}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-sm text-clay-600 dark:text-clay-400">{error}</p>}
    </div>
  );
}
