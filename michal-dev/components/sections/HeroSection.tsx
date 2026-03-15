'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import TechOrbit from '../ui/TechOrbit';
import { ArrowDown } from 'lucide-react';
import { FlipWords } from '../ui/flip-words';
import { TypewriterEffectSmooth } from '../ui/typewriter-effect';
import { TextGenerateEffect } from '../ui/text-generate-effect';

const HERO_CONTENT = {
  badge: "WEB DEVELOPER • SAAS BUILDER",
  greetings: ["Cześć!", "Hello!", "Hola!", "Bonjour!", "Ciao!", "Hallo!"],
  headline: "Buduję aplikacje webowe, na których możesz polegać.",
  bio: "Łączę analityczne myślenie z nowoczesnymi technologiami. Od stabilnej architektury w C# i .NET, po responsywny frontend w React. Zamieniam Twoje wizje w działające produkty cyfrowe.",
  primaryCta: "Zbudujmy coś świetnego",
  secondaryCta: "Zobacz moje realizacje ↓"
};

const headlineWordsLine1 = [
  { text: "Buduję" },
  { text: "aplikacje", isColourful: true },
  { text: "webowe," },
];

const headlineWordsLine2 = [
  { text: "na" },
  { text: "których" },
  { text: "możesz" },
  { text: "polegać." },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollArrowRef = useRef<HTMLDivElement>(null);

  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial hidden states for GSAP-animated elements
      gsap.set(badgeRef.current, { opacity: 0, y: 20 });
      gsap.set(headlineRef.current, { opacity: 0, y: 30 });
      gsap.set(bioRef.current, { opacity: 0, y: 20 });
      gsap.set(ctaRef.current?.children || [], { opacity: 0, y: 20 });
      gsap.set(scrollArrowRef.current, { opacity: 0, y: -20 });

      // Master timeline with delay
      const tl = gsap.timeline({ delay: 0.3 });

      // 1. Badge fades in early
      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, 0);

      // 2. Headline fades in
      tl.to(headlineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      }, 0.4);

      // 3. Bio paragraph fades in
      tl.to(bioRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, 1.0);

      // 4. CTA buttons stagger in after bio
      tl.to(ctaRef.current?.children || [], {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: 'power3.out',
      }, 1.6);

      // 5. Scroll arrow fades in
      tl.to(scrollArrowRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, 2.2);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative w-full overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-4 lg:px-12 py-20 lg:py-0 h-dvh min-h-[800px] grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-20 pb-16">

        {/* Left Column (TechOrbit Graphics) */}
        <div className="relative w-full max-w-[800px] 2xl:max-w-[950px] mx-auto aspect-square flex items-center justify-center order-2 lg:order-1">
          <TechOrbit />
        </div>

        {/* Right Column (Text & CTAs) */}
        <div className="w-full flex flex-col gap-5 lg:gap-7 items-start z-10 order-1 lg:order-2">

          {/* Pre-title badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center"
          >
            <span className="text-gray-400 font-mono text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase">
              {HERO_CONTENT.badge}
            </span>
          </div>

          {/* H1 Headline */}
          <div ref={headlineRef} className="flex flex-col gap-2">
            <div className="text-gray-50 font-jakarta font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] leading-[1.1] tracking-tight -ml-2">
              <FlipWords words={HERO_CONTENT.greetings} duration={3000} className="text-[#FF6B35]" />
            </div>
            <h1 className="flex flex-col text-gray-50 font-jakarta font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] leading-[1.1] tracking-tight h-auto min-h-[1.5em] pb-2 sm:pb-3 lg:pb-0">
              <TypewriterEffectSmooth words={headlineWordsLine1} className="m-0 space-x-1 sm:space-x-2 lg:space-x-3 w-full max-w-full overflow-hidden whitespace-normal sm:whitespace-nowrap flex-wrap sm:flex-nowrap !leading-[1.1]" cursorClassName="hidden" />
              <TypewriterEffectSmooth words={headlineWordsLine2} className="m-0 space-x-1 sm:space-x-2 lg:space-x-3 w-full max-w-full overflow-hidden whitespace-normal sm:whitespace-nowrap flex-wrap sm:flex-nowrap !leading-[1.1]" cursorClassName="bg-[#FF6B35] h-[1em] self-center ml-1 sm:ml-2" />
            </h1>
          </div>

          {/* Sub-headline / description */}
          <div
            ref={bioRef}
            className="text-gray-400 font-sans font-normal text-base sm:text-lg leading-relaxed max-w-xl"
          >
            <TextGenerateEffect words={HERO_CONTENT.bio} />
          </div>

          {/* CTAs */}
          <div
            ref={ctaRef}
            className="flex flex-row flex-wrap items-center gap-4 mt-1"
          >
            {/* Primary CTA – orange */}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="cursor-pointer px-7 py-3.5 bg-[#FF6B35] rounded-xl text-white font-sans font-semibold text-sm sm:text-base shadow-lg shadow-[#FF6B35]/20 hover:brightness-110 hover:-translate-y-0.5 transition-all duration-300 text-center focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              {HERO_CONTENT.primaryCta}
            </a>
            {/* Secondary CTA – ghost/outline */}
            <a
              href="#portfolio"
              onClick={(e) => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="cursor-pointer px-7 py-3.5 border border-gray-500 rounded-xl text-gray-200 bg-transparent font-sans font-medium text-sm sm:text-base hover:bg-white/10 hover:border-white/60 hover:-translate-y-0.5 transition-all duration-300 text-center focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              {HERO_CONTENT.secondaryCta}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <div
        ref={scrollArrowRef}
        className="absolute w-full bottom-8 left-0 flex justify-center z-20"
      >
        <button
          onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}
          className="group animate-bounce p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-gray-400 hover:text-[#FF6B35] hover:border-[#FF6B35]/50 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2 focus-visible:ring-offset-bg cursor-pointer"
          aria-label="Scroll to services"
        >
          <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </section>
  );
}
