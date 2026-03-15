'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { Search, PenTool, Code, Gauge, Rocket } from 'lucide-react';
import servicesData from '@/content/services.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServicePhase {
  id: string;
  phase: string;
  title: string;
  description: string;
  icon: string;
}

const iconsMap: Record<string, React.ElementType> = {
  Search,
  PenTool,
  Code,
  Gauge,
  Rocket,
};

// Per-phase accent colours: orange → red gradient across the 5 phases
const phaseAccents = [
  { dot: '#FF6B35', glowColor: 'rgba(255,107,53,0.5)', badge: 'bg-[#FF6B35]/10 text-[#FF6B35]', line: 'from-[#FF6B35] to-[#f0842a]' },
  { dot: '#f0842a', glowColor: 'rgba(240,132,42,0.5)', badge: 'bg-[#f0842a]/10 text-[#f0842a]', line: 'from-[#f0842a] to-[#e55c22]' },
  { dot: '#e55c22', glowColor: 'rgba(229,92,34,0.5)',  badge: 'bg-[#e55c22]/10 text-[#e55c22]', line: 'from-[#e55c22] to-[#df4a35]' },
  { dot: '#df4a35', glowColor: 'rgba(223,74,53,0.5)',  badge: 'bg-[#df4a35]/10 text-[#df4a35]', line: 'from-[#df4a35] to-[#E63946]' },
  { dot: '#E63946', glowColor: 'rgba(230,57,70,0.5)',  badge: 'bg-[#E63946]/10 text-[#E63946]', line: 'from-[#E63946] to-[#E63946]' },
];

export default function ServicesSection() {
  const services: ServicePhase[] = servicesData;
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const ctaStripRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const label = headerRef.current?.querySelector('.services-label') as HTMLElement | null;
      const divider = headerRef.current?.querySelector('.services-divider') as HTMLElement | null;

      if (label) gsap.set(label, { opacity: 0, x: -16 });
      if (divider) gsap.set(divider, { scaleX: 0, transformOrigin: 'left center' });
      if (titleRef.current) gsap.set(titleRef.current, { opacity: 0, y: 30 });
      if (subtitleRef.current) gsap.set(subtitleRef.current, { opacity: 0, y: 20 });

      const cards = timelineContainerRef.current?.querySelectorAll('.phase-card');
      const dots = timelineContainerRef.current?.querySelectorAll('.timeline-dot');
      const lines = timelineContainerRef.current?.querySelectorAll('.timeline-connector');

      if (cards) gsap.set(cards, { opacity: 0, x: 24 });
      if (dots) gsap.set(dots, { opacity: 0, scale: 0.5 });
      if (lines) gsap.set(lines, { scaleY: 0, transformOrigin: 'top center' });
      if (ctaStripRef.current) gsap.set(ctaStripRef.current, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          toggleActions: 'play none none none',
        },
      });

      // Header
      if (label) tl.to(label, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' });
      if (divider) tl.to(divider, { scaleX: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3');
      if (titleRef.current) tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4');
      if (subtitleRef.current) tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');

      // Phase items: dot → line → card, staggered
      if (dots && cards && lines) {
        Array.from(dots).forEach((dot, i) => {
          const offset = i === 0 ? '-=0.2' : `-=${0.3}`;
          tl.to(dot, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.5)' }, offset);
          if (lines[i]) tl.to(lines[i], { scaleY: 1, duration: 0.4, ease: 'power2.out' }, '-=0.1');
          if (cards[i]) tl.to(cards[i], { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, '-=0.35');
        });
      }

      // CTA
      if (ctaStripRef.current) tl.to(ctaStripRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="w-full pt-20 md:pt-28 pb-10 md:pb-12 px-4 sm:px-8 xl:px-16 2xl:px-24">
      <div className="w-full max-w-[1800px] mx-auto flex flex-col gap-14 md:gap-16 relative z-10">

        {/* ── Section Header ── */}
        <div ref={headerRef} className="flex flex-col gap-5 w-full">
          {/* Pre-title */}
          <div className="flex flex-row items-center gap-4">
            <span className="services-label text-[#FF6B35] font-mono text-xs font-semibold tracking-widest uppercase">
              USŁUGI &amp; PROCES
            </span>
            <div className="services-divider h-px bg-[#FF6B35]/30 flex-1" />
          </div>

          <h2
            ref={titleRef}
            className="text-white font-display text-3xl md:text-[42px] lg:text-5xl font-bold leading-[1.15] max-w-[820px]"
          >
            Twoja strona to nie wizytówka&nbsp;&mdash; to narzędzie napędzające biznes.
          </h2>

          <p
            ref={subtitleRef}
            className="text-gray-400 font-sans text-base md:text-lg font-normal leading-relaxed max-w-2xl"
          >
            Od pomysłu do wdrożenia&nbsp;&mdash; każdy etap projektuję tak, aby Twój produkt działał bezbłędnie
            i przynosił realne zyski.
          </p>
        </div>

        {/* ── Timeline + CTA wrapper ── */}
        <div className="w-full max-w-[860px] mx-auto">

          {/* Timeline */}
          <div ref={timelineContainerRef} className="flex flex-col">
            {services.map((service, index) => {
              const IconComponent = iconsMap[service.icon] || Code;
              const accent = phaseAccents[index % phaseAccents.length];
              const isLast = index === services.length - 1;

              return (
                <div key={service.id} className="flex gap-5 sm:gap-7">

                  {/* ── Left: dot + connector ── */}
                  <div className="flex flex-col items-center shrink-0 w-10 sm:w-12">
                    {/* Dot */}
                    <div
                      className="timeline-dot w-10 h-10 sm:w-12 sm:h-12 rounded-full border-[3px] flex items-center justify-center bg-bg z-10 shrink-0 transition-shadow duration-300"
                      style={{ borderColor: accent.dot }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 16px 4px ${accent.glowColor}`; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                    >
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: accent.dot }} />
                    </div>
                    {/* Connector line */}
                    {!isLast && (
                      <div
                        className={`timeline-connector w-[2px] flex-1 my-2 bg-gradient-to-b ${accent.line} min-h-[32px]`}
                      />
                    )}
                  </div>

                  {/* ── Right: card ── */}
                  <div className={`phase-card w-full ${isLast ? 'mb-0' : 'mb-5'}`}>
                    <div className="group bg-[#1A1A24] border border-white/5 rounded-xl px-5 py-4 sm:px-6 sm:py-5 flex flex-row items-start justify-between gap-4 hover:-translate-y-0.5 transition-transform duration-200">
                      {/* Left: title + description */}
                      <div className="flex flex-col gap-1.5">
                        <h3 className="text-white font-display text-lg sm:text-xl font-bold leading-snug">
                          {service.title}
                        </h3>
                        <p className="text-gray-400 font-sans text-sm font-normal leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                      {/* Right: phase badge */}
                      <span
                        className={`shrink-0 font-mono text-[10px] sm:text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded ${accent.badge} mt-0.5`}
                      >
                        Phase {service.phase}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* ── CTA Strip ── */}
          <div
            ref={ctaStripRef}
            className="mt-10 bg-zinc-900 border border-white/5 rounded-2xl px-6 py-7 sm:px-8 sm:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
          >
            <div className="flex flex-col gap-1">
              <h3 className="text-white font-display text-xl sm:text-[22px] font-bold">
                Masz pomysł na projekt?
              </h3>
              <p className="text-gray-400 font-sans text-sm font-normal">
                Porozmawiajmy o tym, jak zamienić go w skalowalną aplikację.
              </p>
            </div>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="shrink-0 cursor-pointer bg-[#FF6B35] hover:bg-[#E63946] transition-colors duration-250 text-white font-sans text-sm sm:text-base font-medium px-7 py-3 rounded-xl whitespace-nowrap text-center focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              Porozmawiajmy
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
