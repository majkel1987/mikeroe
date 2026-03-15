'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitContact } from '@/app/actions/contact';
import { Send, Loader2, CheckCircle2, AlertCircle, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SUBJECT_OPTIONS = [
  'Landing Page / Strona wizytówka',
  'Sklep internetowy (e-commerce)',
  'Aplikacja webowa / SaaS',
  'Redesign istniejącej strony',
  'Współpraca długoterminowa',
  'Inne',
];

const formSchema = z.object({
  name: z.string().min(2, 'Imię musi mieć co najmniej 2 znaki'),
  email: z.string().email('Niepoprawny adres email'),
  company: z.string().optional(),
  subject: z.string().min(1, 'Wybierz temat wiadomości'),
  message: z.string().min(10, 'Wiadomość musi mieć co najmniej 10 znaków').max(2000, 'Maksymalnie 2000 znaków'),
  website: z.string().optional(), // honeypot
});

type FormData = z.infer<typeof formSchema>;

/* ─────────────────────────────────────────────────────── */

const RequiredStar = () => (
  <span className="text-accent3 ml-0.5">*</span>
);

/* ─────────────────────────────────────────────────────── */

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');


  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

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

  // Watch message length for char counter
  const messageValue = watch('message') ?? '';
  const currentCharCount = messageValue.length;

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

      setTimeout(() => setStatus('idle'), 5000);
    } else {
      setStatus('error');
      setServerError(
        response.errors?.form ||
        Object.values(response.errors || {})[0] ||
        'Wystąpił nieoczekiwany błąd. Spróbuj ponownie.'
      );
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initial hidden states
      const label = headerRef.current?.querySelector('.contact-label') as HTMLElement | null;
      const divider = headerRef.current?.querySelector('.contact-divider') as HTMLElement | null;
      const title = headerRef.current?.querySelector('h2') as HTMLElement | null;
      const subtitle = headerRef.current?.querySelector('p') as HTMLElement | null;

      if (label) gsap.set(label, { opacity: 0, x: -20 });
      if (divider) gsap.set(divider, { scaleX: 0, transformOrigin: 'left center' });
      if (title) gsap.set(title, { opacity: 0, y: 30 });
      if (subtitle) gsap.set(subtitle, { opacity: 0, y: 20 });
      if (leftColRef.current) gsap.set(leftColRef.current, { opacity: 0, x: -40 });
      if (rightColRef.current) gsap.set(rightColRef.current, { opacity: 0, x: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      if (label) tl.to(label, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' });
      if (divider) tl.to(divider, { scaleX: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3');
      if (title) tl.to(title, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');
      if (subtitle) tl.to(subtitle, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3');
      if (leftColRef.current)
        tl.to(leftColRef.current, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }, '-=0.2');
      if (rightColRef.current)
        tl.to(rightColRef.current, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Shared input/label styles */
  const inputBase =
    'h-12 w-full bg-[#0d0d14] border border-border rounded-xl px-4 text-text font-sans text-sm placeholder:text-muted/40 focus:outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]/40 transition-colors disabled:opacity-50';
  const labelBase =
    'text-muted font-sans text-[11px] font-semibold tracking-[0.15em] uppercase';

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 text-text w-full overflow-hidden px-4 sm:px-8 xl:px-16 2xl:px-24"
    >
      {/* Subtle ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 80%, rgba(255,107,53,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="w-full max-w-[1800px] mx-auto flex flex-col gap-14 relative z-10">

        {/* ── Section Header ── */}
        <div ref={headerRef} className="flex flex-col gap-5 w-full">
          <div className="flex flex-row items-center gap-4 w-full">
            <span className="contact-label text-[#FF6B35] font-mono text-xs font-semibold tracking-widest uppercase">
              Kontakt
            </span>
            <div className="contact-divider h-px bg-[#FF6B35]/30 flex-1" />
          </div>
          <h2 className="text-white font-display text-3xl md:text-[42px] lg:text-5xl font-bold leading-[1.15] max-w-[820px]">
            Masz pomysł? Pogadajmy.
          </h2>
          <p className="text-gray-400 font-sans text-base md:text-lg font-normal leading-relaxed max-w-2xl">
            Opisz krótko swój projekt, a odezwę się w ciągu 24h.
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">

          {/* ── Left Column — Image ── */}
          <div
            ref={leftColRef}
            className="relative w-full rounded-2xl overflow-hidden min-h-[420px] lg:min-h-0"
          >
            <Image
              src="/img/Contact_image.png"
              alt="Skontaktuj się ze mną"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Subtle overlay for depth */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg, rgba(10,10,15,0.35) 0%, rgba(10,10,15,0.10) 60%, rgba(255,107,53,0.12) 100%)',
              }}
            />
          </div>

          {/* ── Right Column — Form ── */}
          <div ref={rightColRef} className="flex flex-col">
            <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 flex flex-col gap-6 h-full">

              {/* Form header */}
              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-2xl font-bold text-text leading-tight">
                  Napisz wiadomość
                </h3>
                <p className="font-sans text-sm text-muted leading-relaxed">
                  Wypełnij formularz, a odezwę się tak szybko, jak to możliwe.
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 w-full flex-1"
              >
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className={labelBase}>
                    Imię i nazwisko<RequiredStar />
                  </label>
                  <input
                    id="name"
                    type="text"
                    disabled={status === 'loading'}
                    autoComplete="name"
                    placeholder="Jan Kowalski"
                    {...register('name')}
                    className={inputBase}
                  />
                  {errors.name && (
                    <span className="text-accent3 text-xs font-sans">{errors.name.message}</span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className={labelBase}>
                    Adres email<RequiredStar />
                  </label>
                  <input
                    id="email"
                    type="email"
                    disabled={status === 'loading'}
                    autoComplete="email"
                    placeholder="jan@firma.pl"
                    {...register('email')}
                    className={inputBase}
                  />
                  {errors.email && (
                    <span className="text-accent3 text-xs font-sans">{errors.email.message}</span>
                  )}
                </div>

                {/* Company */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="company" className={labelBase}>
                    Firma
                  </label>
                  <input
                    id="company"
                    type="text"
                    disabled={status === 'loading'}
                    autoComplete="organization"
                    placeholder="Nazwa firmy (opcjonalnie)"
                    {...register('company')}
                    className={inputBase}
                  />
                </div>

                {/* Subject — Select */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className={labelBase}>
                    Temat wiadomości<RequiredStar />
                  </label>
                  <div className="relative">
                    <select
                      id="subject"
                      disabled={status === 'loading'}
                      {...register('subject')}
                      className={`${inputBase} appearance-none pr-10 cursor-pointer`}
                    >
                      <option value="" disabled hidden className="text-muted/40">
                        Wybierz temat...
                      </option>
                      {SUBJECT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-surface text-text">
                          {opt}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
                      aria-hidden
                    />
                  </div>
                  {errors.subject && (
                    <span className="text-accent3 text-xs font-sans">{errors.subject.message}</span>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5 flex-1">
                  <label htmlFor="message" className={labelBase}>
                    Treść wiadomości<RequiredStar />
                  </label>
                  <div className="relative flex-1">
                    <textarea
                      id="message"
                      disabled={status === 'loading'}
                      placeholder="Opisz swój projekt, pomysł lub pytanie..."
                      {...register('message')}
                      maxLength={2000}
                      className="min-h-[140px] w-full h-full bg-[#0d0d14] border border-border rounded-xl px-4 py-3.5 text-text font-sans text-sm placeholder:text-muted/40 resize-y focus:outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]/40 transition-colors disabled:opacity-50"
                    />
                    <span className="absolute bottom-3 right-3.5 text-[11px] font-mono text-muted/50 pointer-events-none select-none">
                      {currentCharCount}/2000
                    </span>
                  </div>
                  {errors.message && (
                    <span className="text-accent3 text-xs font-sans">{errors.message.message}</span>
                  )}
                </div>

                {/* Honeypot */}
                <div className="h-0 opacity-0 pointer-events-none absolute" aria-hidden="true">
                  <input type="text" {...register('website')} tabIndex={-1} autoComplete="off" />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="mt-2 h-[52px] w-full flex items-center justify-center gap-2.5 bg-[#FF6B35] hover:bg-[#FF6B35]/85 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none text-white font-sans font-semibold text-[15px] rounded-xl shadow-[0_0_24px_rgba(255,107,53,0.25)] hover:shadow-[0_0_32px_rgba(255,107,53,0.4)] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Wysyłanie...
                    </>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Wysłano pomyślnie!
                    </>
                  ) : (
                    <>
                      Wyślij wiadomość
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Error message */}
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-accent3 bg-accent3/10 border border-accent3/20 px-4 py-3 rounded-xl text-sm font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {serverError}
                  </div>
                )}

                {/* RODO clause */}
                <p className="text-xs text-center text-muted/50 leading-relaxed">
                  Wysyłając formularz, wyrażasz zgodę na przetwarzanie danych osobowych
                  w celu odpowiedzi na Twoje zapytanie.
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
