'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/lib/LanguageContext';
import { useLenis } from '@/components/SmoothScroll';

gsap.registerPlugin(ScrollTrigger);

/* ─── SVG Icon Components ─────────────────────────────── */

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const GmailIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
  </svg>
);

/* ─── JSON-LD Structured Data ─────────────────────────── */

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://mikeroe.pl/#person',
      name: 'Mike Roe',
      alternateName: 'mikeroe',
      url: 'https://mikeroe.pl',
      jobTitle: 'Fullstack Developer',
      description: 'Fullstack Developer z Polski specjalizujący się w Next.js, React, Node.js i nowoczesnych technologiach webowych.',
      knowsAbout: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'GraphQL'],
      sameAs: [
        'https://github.com/mikeroe',
        'https://www.linkedin.com/in/mike-roe-8598313b7/',
        'https://www.facebook.com/profile.php?id=61580788897042',
      ],
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://mikeroe.pl/#service',
      name: 'mikeroe.pl - Usługi Fullstack Development',
      url: 'https://mikeroe.pl',
      description: 'Profesjonalne usługi tworzenia stron internetowych, aplikacji webowych i e-commerce. Od Discovery przez Design i Development po SEO i wdrożenie.',
      provider: { '@id': 'https://mikeroe.pl/#person' },
      areaServed: {
        '@type': 'Country',
        name: 'Poland',
      },
      serviceType: ['Web Development', 'Frontend Development', 'Backend Development', 'E-commerce Development', 'SEO Optimization'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Pakiety usług',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Starter',
            description: 'Strona wizytówka dla małych firm i freelancerów',
          },
          {
            '@type': 'Offer',
            name: 'Biznes',
            description: 'Rozbudowana strona firmowa z CMS i integracjami',
          },
          {
            '@type': 'Offer',
            name: 'Growth',
            description: 'Aplikacja webowa lub e-commerce z pełnym wsparciem',
          },
        ],
      },
    },
  ],
};

/* ─── Data ────────────────────────────────────────────── */

const navLinksPL = [
  { name: 'Usługi', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Stack', href: '#tech-stack' },
  { name: 'Cennik', href: '#pricing' },
  { name: 'Kontakt', href: '#contact' },
];

const navLinksEN = [
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Stack', href: '#tech-stack' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact', href: '#contact' },
];

const TRANSLATIONS = {
  pl: {
    navTitle: 'Nawigacja',
    navAriaLabel: 'Nawigacja stopki',
    statusTitle: 'Status',
    available: 'Dostępny na nowe projekty',
    statusText: 'Chętnie porozmawiam o Twoim projekcie.',
    statusLink: 'Napisz do mnie →',
    pricingNote: '* Terminy szacunkowe (praca po godzinach). Opcja przyspieszenia +50% ceny.',
    copyright: 'Wszelkie prawa zastrzeżone.',
    privacy: 'Polityka prywatności',
    backToTop: '↑ Wróć na górę',
    emailLabel: 'Wyślij email',
  },
  en: {
    navTitle: 'Navigation',
    navAriaLabel: 'Footer navigation',
    statusTitle: 'Status',
    available: 'Available for new projects',
    statusText: "Happy to discuss your project.",
    statusLink: 'Get in touch →',
    pricingNote: '* Timelines are estimates (part-time work). Rush option available at +50%.',
    copyright: 'All rights reserved.',
    privacy: 'Privacy Policy',
    backToTop: '↑ Back to top',
    emailLabel: 'Send email',
  },
} as const;

const socialLinks = [
  { labelPL: 'GitHub', labelEN: 'GitHub', href: 'https://github.com/mikeroe', Icon: GitHubIcon },
  { labelPL: 'LinkedIn', labelEN: 'LinkedIn', href: 'https://www.linkedin.com/in/mike-roe-8598313b7/', Icon: LinkedInIcon },
  { labelPL: 'Facebook', labelEN: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61580788897042', Icon: FacebookIcon },
  { labelPL: 'mike_roe1987', labelEN: 'mike_roe1987', href: 'https://discord.com', Icon: DiscordIcon },
  { labelPL: 'Wyślij email', labelEN: 'Send email', href: 'mailto:theorbitospace@gmail.com?subject=Zapytanie%20o%20współpracę', Icon: GmailIcon },
];

/* ─── Component ───────────────────────────────────────── */

export default function FooterSection() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];
  const navLinks = lang === 'en' ? navLinksEN : navLinksPL;
  const { lenis } = useLenis();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 95%',
          toggleActions: 'play none none none',
        }
      });

      tl.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} id="footer" role="contentinfo" className="text-text w-full px-4 sm:px-8 xl:px-16 2xl:px-24">
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div ref={contentRef} className="w-full max-w-[1800px] mx-auto">

        {/* ── Top border ── */}
        <div className="h-px w-full bg-border" />

        {/* ── Main body: 3-column grid ── */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-16">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-4">
            <div>
              <span className="font-display font-extrabold text-xl text-text tracking-tight">
                mikeroe.pl
              </span>
              <p className="font-sans text-[13px] text-muted mt-1">
                Fullstack Developer
              </p>
            </div>

            {/* Social icons */}
            <div className="mt-1 flex items-center gap-2">
              {socialLinks.map(({ labelPL, labelEN, href, Icon }) => (
                <a
                  key={labelPL}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={lang === 'en' ? labelEN : labelPL}
                  className="flex w-10 h-10 items-center justify-center rounded-xl bg-surface border border-border text-muted hover:text-text hover:border-text/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-muted/60">
              {t.navTitle}
            </p>
            <nav aria-label={t.navAriaLabel} className="flex flex-row flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-mono text-[13px] text-muted hover:text-text hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 3 — Availability */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-muted/60">
              {t.statusTitle}
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 flex-shrink-0 rounded-full bg-accent2 animate-pulse" />
                <span className="font-mono text-xs text-accent2">
                  {t.available}
                </span>
              </div>
              <p className="font-sans text-[13px] text-muted leading-relaxed">
                {t.statusText}{' '}
                <a
                  href="#contact"
                  className="text-ember hover:underline transition-colors duration-200 cursor-pointer"
                >
                  {t.statusLink}
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* ── Pricing Note ── */}
        <div className="w-full text-center pb-8 mt-4 md:mt-0">
          <p className="font-mono text-[11px] text-muted/80">
            {t.pricingNote}
          </p>
        </div>

        {/* ── Bottom divider ── */}
        <div className="h-px w-full bg-border" />

        {/* ── Bottom bar: copyright + legal + back-to-top ── */}
        <div className="py-5 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
          <span className="font-mono text-[11px] text-[#4a4a6a]">
            © {currentYear} mikeroe.pl {t.copyright}
          </span>

          {/* Legal links */}
          <div className="flex items-center gap-4">
            <a
              href="/polityka-prywatnosci"
              className="font-mono text-[11px] text-[#4a4a6a] hover:text-muted transition-colors duration-200 cursor-pointer"
            >
              {t.privacy}
            </a>
            <span className="text-[#4a4a6a] text-[11px]">·</span>
            <a
              href="/rodo"
              className="font-mono text-[11px] text-[#4a4a6a] hover:text-muted transition-colors duration-200 cursor-pointer"
            >
              RODO
            </a>
          </div>

          <span className="font-mono text-[11px] text-[#4a4a6a] hidden md:block">
            Next.js · Tailwind · Vercel
          </span>

          <a
            href="#main"
            onClick={(e) => { e.preventDefault(); if (lenis) { lenis.scrollTo(0); } else { window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
            className="font-mono text-[11px] text-muted hover:text-text transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 rounded px-2 py-1 cursor-pointer"
          >
            {t.backToTop}
          </a>
        </div>


      </div>
    </footer>
  );
}
