'use client';

import { useRef, useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import { submitContact, type ContactFormResponse } from '@/app/actions/contact';
import type { Locale } from '@/lib/site-content';
import Link from 'next/link';

const options = {
  pl: {
    project: ['Landing page', 'Strona firmowa', 'Aplikacja webowa / MVP', 'Redesign', 'Inny projekt'],
    budget: ['Nie wiem jeszcze', '3 500–6 500 zł', '6 500–15 000 zł', '15 000–30 000 zł', 'powyżej 30 000 zł'],
    deadline: ['Elastyczny', 'W ciągu miesiąca', '1–2 miesiące', '3 miesiące lub później'],
  },
  en: {
    project: ['Landing page', 'Company website', 'Web application / MVP', 'Redesign', 'Other project'],
    budget: ['Not sure yet', 'PLN 3,500–6,500', 'PLN 6,500–15,000', 'PLN 15,000–30,000', 'above PLN 30,000'],
    deadline: ['Flexible', 'Within one month', '1–2 months', '3 months or later'],
  },
};

const copy = {
  pl: {
    name: 'Imię',
    email: 'E-mail',
    project: 'Rodzaj projektu',
    budget: 'Przybliżony budżet (opcjonalnie)',
    deadline: 'Termin (opcjonalnie)',
    message: 'Czego potrzebujesz?',
    messageHint: 'Wystarczy kilka zdań o usłudze, odbiorcach i tym, co ma zmienić nowa strona.',
    consent: 'Wysyłając formularz, prosisz o kontakt w sprawie projektu i potwierdzasz zapoznanie się z polityką prywatności.',
    submit: 'Wyślij zapytanie',
    sending: 'Wysyłam…',
    success: 'Dziękuję. Wiadomość została wysłana. Odpowiem w ciągu jednego dnia roboczego.',
    retry: 'Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz bezpośrednio na e-mail.',
    required: 'Uzupełnij wymagane pole.',
  },
  en: {
    name: 'Name',
    email: 'Email',
    project: 'Project type',
    budget: 'Approximate budget (optional)',
    deadline: 'Timeline (optional)',
    message: 'What do you need?',
    messageHint: 'A few sentences about the service, audience and what the new website should change are enough.',
    consent: 'By sending the form, you request project-related contact and confirm that you have read the privacy policy.',
    submit: 'Send enquiry',
    sending: 'Sending…',
    success: 'Thank you. Your message has been sent. I will reply within one business day.',
    retry: 'The message could not be sent. Try again or email me directly.',
    required: 'Complete this required field.',
  },
};

export default function ContactForm({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const choices = options[locale];
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [response, setResponse] = useState<ContactFormResponse | null>(null);
  const startedAt = useRef(Date.now());
  const started = useRef(false);

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    trackEvent('form_start');
  };

  async function handleSubmit(formData: FormData) {
    setStatus('sending');
    setResponse(null);
    formData.set('locale', locale);
    formData.set('startedAt', String(startedAt.current));

    try {
      const result = await submitContact(null, formData);
      setResponse(result);
      if (result.success) {
        setStatus('success');
        trackEvent('form_submit_success');
      } else {
        setStatus('error');
        trackEvent('form_submit_error');
      }
    } catch {
      setStatus('error');
      trackEvent('form_submit_error');
    }
  }

  if (status === 'success') {
    return (
      <div className="form-success" role="status" tabIndex={-1}>
        <span aria-hidden="true">✓</span>
        <h3>{locale === 'pl' ? 'Wiadomość wysłana' : 'Message sent'}</h3>
        <p>{t.success}</p>
        <a href="mailto:theorbitospace@gmail.com">theorbitospace@gmail.com</a>
      </div>
    );
  }

  const fieldErrors = response && !response.success ? response.errors : {};

  return (
    <form action={handleSubmit} className="contact-form" onFocus={markStarted} noValidate>
      <div className="form-grid">
        <label>
          <span>{t.name} *</span>
          <input name="name" autoComplete="name" required aria-describedby={fieldErrors?.name ? 'name-error' : undefined} />
          {fieldErrors?.name && <small id="name-error">{fieldErrors.name}</small>}
        </label>
        <label>
          <span>{t.email} *</span>
          <input name="email" type="email" autoComplete="email" required aria-describedby={fieldErrors?.email ? 'email-error' : undefined} />
          {fieldErrors?.email && <small id="email-error">{fieldErrors.email}</small>}
        </label>
      </div>

      <label>
        <span>{t.project} *</span>
        <select name="projectType" defaultValue="" required aria-describedby={fieldErrors?.projectType ? 'project-error' : undefined}>
          <option value="" disabled>{locale === 'pl' ? 'Wybierz' : 'Select'}</option>
          {choices.project.map((item) => <option key={item}>{item}</option>)}
        </select>
        {fieldErrors?.projectType && <small id="project-error">{fieldErrors.projectType}</small>}
      </label>

      <div className="form-grid">
        <label>
          <span>{t.budget}</span>
          <select name="budget" defaultValue="">
            <option value="">{locale === 'pl' ? 'Wybierz, jeśli chcesz' : 'Select if useful'}</option>
            {choices.budget.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span>{t.deadline}</span>
          <select name="deadline" defaultValue="">
            <option value="">{locale === 'pl' ? 'Wybierz, jeśli wiesz' : 'Select if known'}</option>
            {choices.deadline.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>

      <label>
        <span>{t.message} *</span>
        <textarea name="message" rows={6} minLength={20} maxLength={2000} required aria-describedby="message-hint" />
        <small id="message-hint">{fieldErrors?.message ?? t.messageHint}</small>
      </label>

      <div className="form-trap" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === 'error' && (
        <p className="form-error" role="alert">
          {(fieldErrors && 'form' in fieldErrors && fieldErrors.form) || t.retry}
        </p>
      )}

      <button className="button" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? t.sending : t.submit}
      </button>
      <p className="form-consent">
        {t.consent}{' '}
        <Link href={locale === 'pl' ? '/polityka-prywatnosci' : '/en/privacy'}>
          {locale === 'pl' ? 'Polityka prywatności' : 'Privacy policy'}
        </Link>
      </p>
    </form>
  );
}
