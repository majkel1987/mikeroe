'use client';

import { useRef, useLayoutEffect, useState } from 'react';
import pricingData from '@/content/pricing.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PricingModal, PricingTierDetails } from '@/components/ui/pricing-modal';

gsap.registerPlugin(ScrollTrigger);

interface PricingTier {
  id: string;
  tier: string;
  description: string;
  price: string;
  currency: string;
  prefix: string;
  suffix: string;
  timeframe: string;
  ctaText: string;
  features: string[];
  specsIncluded: string[];
  specsExcluded: string[];
  highlighted: boolean;
}

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [selectedPlan, setSelectedPlan] = useState<PricingTierDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);

  const calculatePrice = (basePrice: string, urgent: boolean) => {
    if (!urgent) return basePrice;
    
    // Handle ranges like "2000-2500"
    if (basePrice.includes('-')) {
      return basePrice.split('-').map(p => {
        const numPrice = parseInt(p.replace(/\D/g, ''), 10);
        if (isNaN(numPrice)) return p;
        return Math.round(numPrice * 1.5).toString();
      }).join('-');
    }

    const numPrice = parseInt(basePrice.replace(/\D/g, ''), 10);
    if (isNaN(numPrice)) return basePrice;
    return Math.round(numPrice * 1.5).toString();
  };

  const calculateTimeframe = (baseTimeframe: string, urgent: boolean) => {
    if (!urgent) return baseTimeframe;
    return baseTimeframe.replace(/(\d+)[–-](\d+)/, (match, p1, p2) => {
      const start = Math.max(1, parseInt(p1, 10) - 2);
      const end = Math.max(1, parseInt(p2, 10) - 2);
      return `${start}–${end}`;
    });
  };

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenModal = (plan: PricingTier) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const headerElements = headerRef.current?.children;
      if (headerElements) {
        gsap.set(headerElements, { opacity: 0, y: 30 });
      }

      const pricingCards = gridRef.current?.querySelectorAll('.pricing-card');
      if (pricingCards) {
        gsap.set(pricingCards, { opacity: 0, y: 50 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        }
      });

      if (headerElements && headerElements.length > 0) {
        tl.to(headerElements, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        });
      }

      if (pricingCards && pricingCards.length > 0) {
        tl.to(pricingCards, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
        }, '-=0.2');
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} id="pricing" className="w-full py-8 md:py-28 flex justify-center relative overflow-hidden px-4 sm:px-8 xl:px-16 2xl:px-24">

        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[#FF6B35]/8 blur-[130px] rounded-full pointer-events-none" />

        <div className="w-full max-w-[1800px] mx-auto flex flex-col gap-10 md:gap-14 relative z-10 items-center">

          {/* ── Header & Toggle ── */}
          <div ref={headerRef} className="flex flex-col gap-8 w-full">

            {/* Label + divider row */}
            <div className="flex flex-row items-center gap-4 w-full">
              <span className="text-[#FF6B35] font-mono text-xs font-semibold tracking-widest uppercase">
                CENNIK
              </span>
              <div className="h-px bg-[#FF6B35]/30 flex-1" />
            </div>

            {/* H2 */}
            <h2 className="text-white font-display text-3xl md:text-[42px] lg:text-5xl font-bold leading-[1.15] max-w-[820px]">
              Klarowne zasady, czysty kod, zero ukrytych kosztów
            </h2>

            {/* Subtitle */}
            <p className="text-gray-400 font-sans text-base md:text-lg font-normal leading-relaxed max-w-2xl">
              Cenię inżynieryjną precyzję i transparentność. Wybierz pakiet, który najlepiej pasuje do Twojego etapu biznesowego, lub porozmawiajmy o wycenie indywidualnej.
            </p>

            {/* Toggle pill */}
            <div className="flex justify-center w-full">
              <button
                onClick={() => setIsUrgent(!isUrgent)}
                className="inline-flex items-center justify-center gap-4 bg-zinc-900 hover:bg-zinc-800 border border-white/8 px-6 py-3 rounded-full backdrop-blur-sm transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] max-w-fit"
                aria-pressed={isUrgent}
              >
              <span className={`text-[15px] font-medium transition-colors ${!isUrgent ? 'text-white' : 'text-gray-500'}`}>
                Standardowy
              </span>

              {/* Switch track */}
              <div className={`w-12 h-6 rounded-full flex items-center px-1 border transition-colors ${isUrgent ? 'bg-[#FF6B35]/20 border-[#FF6B35]/30' : 'bg-white/10 border-white/5'}`}>
                <div className={`w-4 h-4 rounded-full transition-transform duration-300 ${isUrgent ? 'translate-x-6 bg-[#FF6B35]' : 'translate-x-0 bg-white'}`} />
              </div>

              {/* Urgent label + badge */}
              <div className="flex items-center gap-2">
                <span className={`text-[15px] font-medium transition-colors ${isUrgent ? 'text-white' : 'text-gray-500'}`}>
                  Tryb Pilny
                </span>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full transition-colors ${isUrgent ? 'bg-[#FF6B35] text-white' : 'text-[#FF6B35] bg-[#FF6B35]/10 border border-[#FF6B35]/20'}`}>
                  +50%
                </span>
              </div>
            </button>
            </div>
          </div>

          {/* ── Pricing Grid ── */}
          <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 w-full max-w-[1200px] mx-auto items-start lg:items-stretch">
            {pricingData.map((plan: unknown) => {
              const p = plan as PricingTier;
              const isHighlighted = p.highlighted;

              return (
                <div
                  key={p.id}
                  className={`pricing-card flex flex-col relative group transition-transform duration-300 ${
                    isHighlighted
                      ? 'lg:scale-105 z-10'
                      : ''
                  }`}
                >
                  {/* Orange glow behind highlighted card */}
                  {isHighlighted && (
                    <div className="absolute -inset-[1px] rounded-2xl blur-[10px] bg-[#FF6B35]/20 pointer-events-none" />
                  )}

                  <div
                    className={`relative w-full flex flex-col h-full p-8 rounded-2xl border transition-all duration-300 ${
                      isHighlighted
                        ? 'bg-[#1A1A24] border-[#FF6B35] shadow-[0_0_30px_rgba(255,107,53,0.18)] hover:-translate-y-1'
                        : 'bg-[#1A1A24] border-white/5 hover:border-white/15 hover:-translate-y-1'
                    }`}
                  >
                    {/* "Najpopularniejszy" badge */}
                    {isHighlighted && (
                      <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 z-10">
                        <div className="bg-[#FF6B35] text-white text-[11px] font-semibold px-4 py-1 rounded-full whitespace-nowrap shadow-[0_0_12px_rgba(255,107,53,0.4)]">
                          Najpopularniejszy
                        </div>
                      </div>
                    )}

                    {/* ── Card Header ── */}
                    <div className="flex flex-col gap-3">
                      {/* Title */}
                      <div className="font-display text-white text-2xl font-bold tracking-tight">
                        {p.tier}
                      </div>

                      {/* Short description */}
                      <div className="font-sans text-gray-400 text-sm leading-relaxed min-h-[3rem]">
                        {p.description}
                      </div>

                      <div className="w-full h-px bg-white/5 my-3" />

                      {/* Price */}
                      <div className="flex flex-col gap-1">
                        {p.prefix && (
                          <span className="text-gray-400 text-sm leading-none">{p.prefix}</span>
                        )}
                        <div className="flex items-baseline gap-2">
                          <span className="font-display text-white text-4xl font-bold tracking-tight leading-none transition-all duration-300">
                            {calculatePrice(p.price, isUrgent)}
                          </span>
                          {p.currency && (
                            <span className="text-gray-300 text-sm font-medium tracking-wide">
                              {p.currency}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Timeframe */}
                      <div className="w-full h-px bg-white/5 mt-4" />
                      <div className="font-sans text-gray-300 text-sm font-medium mt-1 transition-all duration-300">
                        Realizacja: {calculateTimeframe(p.timeframe, isUrgent)}
                      </div>
                    </div>

                    {/* ── Features ── */}
                    <div className="flex flex-col flex-grow mt-8">
                      <div className="font-sans font-semibold text-white text-[15px] mb-4">
                        W cenie:
                      </div>

                      <ul className="flex flex-col gap-3.5">
                        {p.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <svg
                              className="w-[17px] h-[17px] text-emerald-400 flex-shrink-0 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="font-sans text-sm text-gray-300 leading-snug">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* "Full spec" link */}
                      <div className="mt-6 flex justify-center">
                        <button
                          onClick={() => handleOpenModal(p)}
                          className="text-gray-500 hover:text-gray-300 text-[13px] font-medium transition-colors underline-offset-4 hover:underline"
                        >
                          Zobacz pełną specyfikację
                        </button>
                      </div>

                      {/* CTA button */}
                      <div className="mt-auto pt-6">
                        <a
                          href="#contact"
                          onClick={handleScrollToContact}
                          className={`w-full h-12 flex items-center justify-center rounded-lg font-sans text-[15px] font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A24] relative overflow-hidden group ${
                            isHighlighted
                              ? 'bg-[#FF6B35] text-white hover:brightness-110 focus-visible:ring-[#FF6B35]'
                              : 'bg-transparent border border-white/20 text-white hover:bg-white/5 focus-visible:ring-white/20'
                          }`}
                        >
                          {isHighlighted && (
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                          )}
                          <span className="relative z-10">{p.ctaText || 'Wybierz'}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>


        </div>
      </section>

      <PricingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={selectedPlan}
      />
    </>
  );
}
