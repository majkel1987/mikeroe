'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, useReducedMotion } from 'framer-motion';
import {
  IconMail,
  IconBrandLinkedin,
  IconMapPin,
  IconSend2,
  IconCircleCheck,
} from '@tabler/icons-react';
import { submitContact } from '@/app/actions/contact';
import { useLanguage } from '@/lib/LanguageContext';

const SUBJECT_OPTIONS_PL = [
  'Landing Page',
  'Sklep internetowy',
  'Aplikacja SaaS',
  'Redesign strony',
  'Długoterminowa współpraca',
  'Inne',
] as const;

const SUBJECT_OPTIONS_EN = [
  'Landing Page',
  'Online store',
  'SaaS application',
  'Website redesign',
  'Long-term cooperation',
  'Other',
] as const;

const TRANSLATIONS = {
  pl: {
    eyebrow: 'KONTAKT',
    titleLine1: 'Masz pomysł?',
    titleLine2: 'Pogadajmy.',
    description:
      'Opisz swój projekt. Odezwę się w ciągu 24h i zaproponuję konkretne rozwiązanie, dopasowane do Twoich potrzeb. Nie oferty z szablonu.',
    statusBadge: 'Dostępny na nowe projekty',
    email: 'theorbitospace@gmail.com',
    linkedin: 'LinkedIn',
    location: 'Warszawa · Remote worldwide',
    responseTime: 'Zazwyczaj odpowiadam w < 4h w dni robocze.',
    formTitle: 'Napisz wiadomość',
    formSubtitle: 'Wypełnij formularz. Odezwę się tak szybko, jak to możliwe.',
    labelName: 'IMIĘ I NAZWISKO',
    labelEmail: 'ADRES EMAIL',
    labelCompany: 'FIRMA',
    labelCompanyOptional: '(opcjonalnie)',
    labelSubject: 'CZEGO POTRZEBUJESZ?',
    labelMessage: 'OPISZ PROJEKT',
    placeholderName: 'Jan Kowalski',
    placeholderEmail: 'jan@firma.pl',
    placeholderCompany: 'Nazwa firmy lub projekt',
    placeholderSubject: 'Wybierz typ projektu...',
    placeholderMessage:
      'Opisz swój pomysł: co chcesz zbudować, jaki problem rozwiązać, jaki masz deadline lub budżet. Im więcej wiem, tym lepiej mogę pomóc.',
    send: 'Wyślij wiadomość',
    sending: 'Wysyłanie...',
    rodo:
      'Wysyłając formularz, wyrażasz zgodę na przetwarzanie danych osobowych w celu odpowiedzi na Twoje zapytanie. Dane nie są udostępniane osobom trzecim.',
    successTitle: 'Wiadomość wysłana!',
    successBody:
      'Dzięki za wiadomość. Odezwę się w ciągu 24h. W razie pilnej sprawy pisz bezpośrednio:',
    sendAnother: 'Wyślij kolejną wiadomość',
    errorFallback: 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie.',
    validationName: 'Imię i nazwisko jest wymagane.',
    validationEmail: 'Podaj poprawny adres email.',
    validationSubject: 'Wybierz typ projektu.',
    validationMessageMin: 'Opisz swój projekt (min. 20 znaków).',
    validationMessageMax: 'Maksymalnie 2000 znaków.',
  },
  en: {
    eyebrow: 'CONTACT',
    titleLine1: 'Got an idea?',
    titleLine2: "Let's talk.",
    description:
      'Describe your project. I will reply within 24h with a concrete solution tailored to your needs. No template proposals.',
    statusBadge: 'Available for new projects',
    email: 'theorbitospace@gmail.com',
    linkedin: 'LinkedIn',
    location: 'Warsaw · Remote worldwide',
    responseTime: 'I usually reply within 4h on business days.',
    formTitle: 'Send a message',
    formSubtitle: 'Fill out the form. I will get back to you as soon as possible.',
    labelName: 'FULL NAME',
    labelEmail: 'EMAIL ADDRESS',
    labelCompany: 'COMPANY',
    labelCompanyOptional: '(optional)',
    labelSubject: 'WHAT DO YOU NEED?',
    labelMessage: 'DESCRIBE THE PROJECT',
    placeholderName: 'John Smith',
    placeholderEmail: 'john@company.com',
    placeholderCompany: 'Company or project name',
    placeholderSubject: 'Select project type...',
    placeholderMessage:
      'Describe your idea: what you want to build, the problem to solve, deadline or budget. The more I know, the better I can help.',
    send: 'Send message',
    sending: 'Sending...',
    rodo:
      'By submitting this form, you consent to the processing of your personal data to respond to your inquiry. Data is not shared with third parties.',
    successTitle: 'Message sent!',
    successBody:
      'Thanks for reaching out. I will reply within 24h. For urgent matters, write directly to:',
    sendAnother: 'Send another message',
    errorFallback: 'An unexpected error occurred. Please try again.',
    validationName: 'Full name is required.',
    validationEmail: 'Please enter a valid email address.',
    validationSubject: 'Please select a project type.',
    validationMessageMin: 'Describe your project (min. 20 characters).',
    validationMessageMax: 'Maximum 2000 characters.',
  },
} as const;

const revealEase = [0.16, 1, 0.3, 1] as const;

const RequiredStar = () => (
  <span className="text-[#E2954B] ml-0.5" aria-hidden="true">
    *
  </span>
);

const SelectChevron = () => (
  <svg
    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M4 6l4 4 4-4"
      stroke="#E2954B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SubmitSpinner = () => (
  <span
    className="inline-block h-4 w-4 rounded-full border-2 border-[#0B0E18]/30 border-t-[#0B0E18] animate-spin"
    aria-hidden="true"
  />
);

export default function ContactSection() {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];
  const subjectOptions = lang === 'en' ? SUBJECT_OPTIONS_EN : SUBJECT_OPTIONS_PL;
  const reduceMotion = useReducedMotion();

  const formSchema = z.object({
    name: z.string().min(2, t.validationName),
    email: z.string().email(t.validationEmail),
    company: z.string().optional(),
    subject: z.string().min(1, t.validationSubject),
    message: z
      .string()
      .min(20, t.validationMessageMin)
      .max(2000, t.validationMessageMax),
    website: z.string().optional(),
  });

  type FormData = z.infer<typeof formSchema>;

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { subject: '' },
  });

  const messageValue = watch('message') ?? '';
  const isFormDisabled = status === 'loading';

  const motionProps = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.4, delay, ease: revealEase },
        };

  const cardMotionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.4, delay: 0.1, ease: revealEase },
      };

  const fieldMotionProps = (index: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 6 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.1 },
          transition: { duration: 0.4, delay: 0.1 + index * 0.04, ease: revealEase },
        };

  const handleResetForm = () => {
    reset();
    setStatus('idle');
    setServerError('');
  };

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    setServerError('');

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    const response = await submitContact(null, formData);

    if (response.success) {
      setStatus('success');
      reset();
      return;
    }

    setStatus('error');
    setServerError(
      response.errors?.form ||
        Object.values(response.errors || {})[0] ||
        t.errorFallback
    );
  };

  const inputClassName = (hasError: boolean) =>
    [
      'w-full rounded-lg px-3.5 py-3 text-sm text-[#F0EDE6] transition-[border-color,box-shadow] duration-200',
      'bg-white/[0.04] border placeholder:text-[#6A7080]/60',
      'focus:outline-none disabled:opacity-60 disabled:pointer-events-none',
      hasError
        ? 'border-[rgba(200,80,60,0.7)] shadow-[0_0_0_3px_rgba(200,80,60,0.1)]'
        : 'border-white/10 focus:border-[#E2954B] focus:shadow-[0_0_0_3px_rgba(226,149,75,0.12)]',
    ].join(' ');

  const labelClassName =
    'block text-[9.5px] tracking-[0.08em] uppercase text-[#6A7080] font-medium mb-1.5';

  const errorClassName = 'mt-1 text-[11px] text-[rgba(220,100,80,0.9)]';

  const contactLinks = [
    {
      icon: IconMail,
      href: 'mailto:theorbitospace@gmail.com?subject=Zapytanie%20o%20współpracę',
      label: t.email,
      external: false,
    },
    {
      icon: IconBrandLinkedin,
      href: 'https://www.linkedin.com/in/mike-roe-8598313b7/',
      label: t.linkedin,
      external: true,
    },
  ] as const;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative w-full overflow-hidden py-[60px] max-[480px]:py-10 md:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/25"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 max-[480px]:px-4 sm:px-6">
        <div className="grid grid-cols-1 items-start gap-10 md:gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
          {/* Form card first in DOM for mobile stacking */}
          <motion.div
            {...cardMotionProps}
            className="order-1 lg:order-2 rounded-2xl border border-[rgba(226,149,75,0.15)] bg-[rgba(10,13,21,0.90)] p-5 backdrop-blur-[12px] max-[480px]:p-5 md:p-7 lg:p-9"
          >
            {status === 'success' ? (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: revealEase }}
                className="flex flex-col items-center py-8 text-center"
              >
                <IconCircleCheck
                  className="mb-5 h-14 w-14 text-[#9CC2BA]"
                  stroke={1.5}
                  aria-hidden="true"
                />
                <h3 className="mb-3 text-xl font-semibold text-[#F0EDE6]">{t.successTitle}</h3>
                <p className="mb-2 max-w-sm text-sm leading-relaxed text-[#6A7080]">
                  {t.successBody}
                </p>
                <a
                  href="mailto:theorbitospace@gmail.com"
                  className="mb-8 text-sm font-medium text-[#E2954B] transition-colors hover:text-[#F3BD7E]"
                >
                  theorbitospace@gmail.com
                </a>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="rounded-lg border border-white/10 px-5 py-2.5 text-sm font-medium text-[#F0EDE6] transition-colors hover:border-[#E2954B]/40 hover:text-[#F3BD7E]"
                >
                  {t.sendAnother}
                </button>
              </motion.div>
            ) : (
              <>
                <div className="mb-7">
                  <h3 className="mb-1.5 text-xl font-semibold text-[#F0EDE6]">{t.formTitle}</h3>
                  <p className="text-xs text-[#5A6070]">{t.formSubtitle}</p>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className={`flex flex-col gap-4 ${isFormDisabled ? 'opacity-60 pointer-events-none' : ''}`}
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <motion.div {...fieldMotionProps(0)}>
                      <label htmlFor="name" className={labelClassName}>
                        {t.labelName}
                        <RequiredStar />
                      </label>
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder={t.placeholderName}
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        disabled={isFormDisabled}
                        {...register('name')}
                        className={inputClassName(!!errors.name)}
                      />
                      {errors.name && (
                        <p id="name-error" role="alert" className={errorClassName}>
                          {errors.name.message}
                        </p>
                      )}
                    </motion.div>

                    <motion.div {...fieldMotionProps(1)}>
                      <label htmlFor="email" className={labelClassName}>
                        {t.labelEmail}
                        <RequiredStar />
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder={t.placeholderEmail}
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        disabled={isFormDisabled}
                        {...register('email')}
                        className={inputClassName(!!errors.email)}
                      />
                      {errors.email && (
                        <p id="email-error" role="alert" className={errorClassName}>
                          {errors.email.message}
                        </p>
                      )}
                    </motion.div>
                  </div>

                  <motion.div {...fieldMotionProps(2)}>
                    <label htmlFor="company" className={labelClassName}>
                      {t.labelCompany}{' '}
                      <span className="normal-case tracking-normal text-[#3A4050]">
                        {t.labelCompanyOptional}
                      </span>
                    </label>
                    <input
                      id="company"
                      type="text"
                      autoComplete="organization"
                      placeholder={t.placeholderCompany}
                      disabled={isFormDisabled}
                      {...register('company')}
                      className={inputClassName(false)}
                    />
                  </motion.div>

                  <motion.div {...fieldMotionProps(3)}>
                    <label htmlFor="subject" className={labelClassName}>
                      {t.labelSubject}
                      <RequiredStar />
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        aria-required="true"
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? 'subject-error' : undefined}
                        disabled={isFormDisabled}
                        {...register('subject')}
                        className={`${inputClassName(!!errors.subject)} appearance-none pr-10 cursor-pointer`}
                      >
                        <option value="" disabled hidden>
                          {t.placeholderSubject}
                        </option>
                        {subjectOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0A0D15] text-[#F0EDE6]">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <SelectChevron />
                    </div>
                    {errors.subject && (
                      <p id="subject-error" role="alert" className={errorClassName}>
                        {errors.subject.message}
                      </p>
                    )}
                  </motion.div>

                  <motion.div {...fieldMotionProps(4)}>
                    <label htmlFor="message" className={labelClassName}>
                      {t.labelMessage}
                      <RequiredStar />
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      maxLength={2000}
                      placeholder={t.placeholderMessage}
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      disabled={isFormDisabled}
                      {...register('message')}
                      className={`${inputClassName(!!errors.message)} resize-y max-h-60 min-h-[140px]`}
                    />
                    <div className="mt-1 flex justify-end">
                      <span className="text-[11px] text-[#3A4050]" aria-live="polite">
                        {messageValue.length} / 2000
                      </span>
                    </div>
                    {errors.message && (
                      <p id="message-error" role="alert" className={errorClassName}>
                        {errors.message.message}
                      </p>
                    )}
                  </motion.div>

                  <div className="h-0 overflow-hidden opacity-0" aria-hidden="true">
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      {...register('website')}
                    />
                  </div>

                  {status === 'error' && serverError && (
                    <p role="alert" className={errorClassName}>
                      {serverError}
                    </p>
                  )}

                  <motion.div {...fieldMotionProps(5)}>
                    <button
                      type="submit"
                      disabled={isFormDisabled}
                      aria-busy={isFormDisabled}
                      className="mt-1 flex w-full items-center justify-center gap-2 rounded-[10px] border-none bg-[#E2954B] px-7 py-3.5 text-[15px] font-semibold text-[#0B0E18] transition-all duration-200 hover:-translate-y-px hover:bg-[#F3BD7E] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(226,149,75,0.12)]"
                    >
                      {isFormDisabled ? (
                        <>
                          <SubmitSpinner />
                          {t.sending}
                        </>
                      ) : (
                        <>
                          {t.send}
                          <IconSend2 size={18} stroke={2} aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </motion.div>

                  <p className="mt-1 text-center text-[10.5px] leading-relaxed text-[#3A4050]">
                    {t.rodo}
                  </p>
                </form>
              </>
            )}
          </motion.div>

          {/* Left column content */}
          <div className="order-2 flex flex-col lg:order-1">
            <motion.p
              {...motionProps(0)}
              className="mb-3 text-[10px] uppercase tracking-[0.12em] text-[#E2954B]"
            >
              {t.eyebrow}
            </motion.p>

            <motion.h2
              {...motionProps(0.08)}
              id="contact-heading"
              className="mb-4 text-[32px] font-bold leading-[1.1] text-[#F0EDE6] max-[768px]:text-[28px] md:text-[44px]"
            >
              {t.titleLine1}
              <br />
              {t.titleLine2}
            </motion.h2>

            <motion.p
              {...motionProps(0.16)}
              className="mb-9 max-w-[380px] text-[15px] leading-[1.7] text-[#6A7080]"
            >
              {t.description}
            </motion.p>

            <motion.div
              {...motionProps(0.24)}
              className="mb-10 inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(156,194,186,0.3)] px-3 py-1.5"
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-[#9CC2BA] animate-status-pulse"
                aria-hidden="true"
              />
              <span className="text-[13px] font-medium text-[#9CC2BA]">{t.statusBadge}</span>
            </motion.div>

            <motion.div {...motionProps(0.32)} className="flex flex-col">
              {contactLinks.map(({ icon: Icon, href, label, external }) => (
                <a
                  key={href}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="mb-4 flex items-center gap-3 text-sm font-medium text-[#F0EDE6] transition-colors duration-200 hover:text-[#F3BD7E] last:mb-0"
                >
                  <Icon size={18} stroke={1.75} className="shrink-0 text-[#E2954B]" aria-hidden="true" />
                  <span>{label}</span>
                </a>
              ))}

              <div className="mb-4 flex items-center gap-3 text-sm text-[#6A7080]">
                <IconMapPin size={18} stroke={1.75} className="shrink-0 text-[#E2954B]" aria-hidden="true" />
                <span>{t.location}</span>
              </div>

              <p className="mt-5 text-[11px] italic text-[#3A4050]">{t.responseTime}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
