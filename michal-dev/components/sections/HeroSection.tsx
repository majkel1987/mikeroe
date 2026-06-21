'use client';

import { motion } from 'framer-motion';
import { useLenis } from '@/components/SmoothScroll';
import { useLanguage } from '@/lib/LanguageContext';
import { FlipWords } from '../ui/flip-words';
import { TypewriterEffectSmooth } from '../ui/typewriter-effect';

const HERO_CONTENT_PL = {
  badge: "WEB DEVELOPER • SAAS BUILDER",
  greetings: ["Bonjour!", "Cześć!", "Hello!", "Hola!", "Ciao!", "Hallo!"],
  bio: "Łączę analityczne myślenie z nowoczesnymi technologiami. Od stabilnej architektury w C# i .NET, po responsywny frontend w React. Zamieniam Twoje wizje w działające produkty cyfrowe.",
  primaryCta: "Zbudujmy coś świetnego",
  secondaryCta: "Zobacz moje realizacje ↓"
};

const HERO_CONTENT_EN = {
  badge: "WEB DEVELOPER • SAAS BUILDER",
  greetings: ["Hello!", "Cześć!", "Hola!", "Bonjour!", "Ciao!", "Hallo!"],
  bio: "I combine analytical thinking with modern technologies. From stable architecture in C# and .NET, to responsive frontend in React. I turn your visions into working digital products.",
  primaryCta: "Let's build something great",
  secondaryCta: "See my work ↓"
};

const headlineWordsLine1_PL = [
  { text: "Buduję", className: "text-snowcap" },
  { text: "aplikacje", isColourful: true },
  { text: "webowe,", className: "text-snowcap" },
];

const headlineWordsLine2_PL = [
  { text: "na", className: "text-snowcap" },
  { text: "których", className: "text-snowcap" },
  { text: "możesz", className: "text-snowcap" },
  { text: "polegać.", className: "text-snowcap" },
];

const headlineWordsLine1_EN = [
  { text: "I build", className: "text-snowcap" },
  { text: "web apps", isColourful: true },
  { text: "you can", className: "text-snowcap" },
];

const headlineWordsLine2_EN = [
  { text: "rely", className: "text-snowcap" },
  { text: "on.", className: "text-snowcap" },
];

export default function HeroSection() {
  const { lenis } = useLenis();
  const { lang } = useLanguage();

  const isPl = lang === 'pl';
  const content = isPl ? HERO_CONTENT_PL : HERO_CONTENT_EN;
  const line1 = isPl ? headlineWordsLine1_PL : headlineWordsLine1_EN;
  const line2 = isPl ? headlineWordsLine2_PL : headlineWordsLine2_EN;
  const headlineWords = [...line1, ...line2];

  const handleScrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(id);
    } else {
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative w-full min-h-screen flex items-center justify-center overflow-x-hidden text-zinc-50 font-sans"
    >
      <div className="container relative z-10 mx-auto flex w-full max-w-full flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-20 lg:py-0">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex w-full max-w-3xl flex-col items-center md:max-w-4xl lg:max-w-5xl xl:max-w-6xl"
        >
          {/* Status Badge */}
          <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-[9px] font-mono uppercase tracking-widest text-zinc-300 shadow-sm backdrop-blur-md sm:mb-8 sm:text-[10px]">
            {content.badge}
          </div>
          
          <div className="mb-4 flex w-full max-w-full flex-col items-center justify-center gap-1 sm:mb-6 sm:gap-2">
            <div className="relative flex min-h-[2.25rem] w-full items-center justify-center overflow-hidden sm:min-h-[3rem]">
              <div className="text-snowcap text-[1.65rem] font-extrabold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-7xl">
                <FlipWords words={content.greetings} duration={3000} className="text-snowcap" />
              </div>
            </div>
            <h1 className="w-full max-w-full pb-1 text-center text-[1.65rem] font-extrabold leading-[1.15] tracking-tight text-snowcap sm:pb-3 sm:text-4xl md:text-[2.35rem] md:leading-[1.12] lg:text-6xl lg:leading-[1.08] xl:text-7xl">
              <TypewriterEffectSmooth
                words={headlineWords}
                delay={0.45}
                className="m-0 w-full max-w-full justify-center !leading-[inherit]"
                cursorClassName="bg-ember ml-1 inline-block h-[0.9em] w-[3px] self-auto sm:ml-2 sm:w-[4px]"
              />
            </h1>
          </div>
          
          <p className="mx-auto mb-8 max-w-2xl px-1 text-base leading-relaxed text-zinc-300 sm:mb-10 sm:px-0 sm:text-lg md:text-xl">
            {content.bio}
          </p>
          
          <div className="flex w-full max-w-md flex-col justify-center gap-3 sm:max-w-none sm:flex-row sm:gap-4">
            <a 
              href="#contact"
              onClick={handleScrollTo('#contact')}
              className="group relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-lg bg-ember px-6 font-semibold text-bg shadow-lg shadow-ember/30 transition-all duration-300 hover:scale-[1.02] hover:bg-sunlit focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-zinc-950 sm:w-auto sm:px-8"
            >
              {content.primaryCta}
            </a>
            
            <a 
              href="#portfolio"
              onClick={handleScrollTo('#portfolio')}
              className="inline-flex h-12 w-full items-center justify-center rounded-lg border border-glacier bg-zinc-900/50 px-6 font-medium text-zinc-300 backdrop-blur-sm transition-all hover:bg-zinc-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950 sm:w-auto sm:px-8"
            >
              {content.secondaryCta}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
