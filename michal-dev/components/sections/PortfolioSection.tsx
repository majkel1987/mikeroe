'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import projectsData from '@/content/projects.json';
import gsap from 'gsap';
import { ExternalLink } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/lib/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const TRANSLATIONS = {
  pl: {
    sectionLabel: 'PORTFOLIO',
    title: 'Projekty, które rozwiązują realne problemy',
    subtitle: 'Zajrzyj za kulisy moich prac. Zobacz, jak wyzwania biznesowe moich klientów przekształciły się w dochodowe rozwiązania cyfrowe.',
    inProgress: 'W budowie',
    pageUnderConstruction: 'Strona w budowie',
    visitSite: 'Odwiedź stronę',
  },
  en: {
    sectionLabel: 'PORTFOLIO',
    title: 'Projects that solve real problems',
    subtitle: 'Take a look behind the scenes. See how my clients\u2019 business challenges became profitable digital solutions.',
    inProgress: 'In progress',
    pageUnderConstruction: 'Site under construction',
    visitSite: 'Visit site',
  },
} as const;

interface Project {
  id: string;
  name: string;
  role: string;
  description_pl: string;
  description_en: string;
  stack: string[];
  status: string;
  live: string;
  image: string;
}

const projects = projectsData as Project[];

export default function PortfolioSection() {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial hidden states
      gsap.set(labelRef.current, { opacity: 0, x: -20 });
      gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(titleRef.current, { opacity: 0, y: 30 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 20 });

      const projectCards = gridRef.current?.querySelectorAll('.project-card');
      if (projectCards) {
        gsap.set(projectCards, { opacity: 0, y: 50 });
      }

      // Single timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        }
      });

      // 1. Label fades in
      tl.to(labelRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: 'power2.out',
      })

      // 2. Divider scales from left
      .to(dividerRef.current, {
        scaleX: 1,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.3')

      // 3. Title fades up
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.4')

      // 4. Subtitle fades up
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.3');

      if (projectCards && projectCards.length > 0) {
        tl.to(projectCards, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        }, '-=0.3');
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="w-full relative py-12 md:py-32 xl:py-40 min-h-screen flex flex-col justify-center overflow-hidden px-4 sm:px-8 xl:px-16 2xl:px-24">
      
      {/* Container - Utilizing full desktop real estate (wider max-width) */}
      <div className="w-full max-w-[1800px] mx-auto flex flex-col gap-16 md:gap-24 relative z-10">

        {/* Header - Top Section */}
        <div ref={headerRef} className="flex flex-col gap-5 w-full">
          <div className="flex flex-row items-center gap-4">
            <span ref={labelRef} className="text-ember font-mono text-xs font-semibold tracking-widest uppercase">
              {t.sectionLabel}
            </span>
            <div ref={dividerRef} className="h-px bg-ember/30 flex-1"></div>
          </div>
          <h2 ref={titleRef} className="text-white font-display text-3xl md:text-[42px] lg:text-5xl font-bold leading-[1.15] max-w-[820px]">
            {t.title}
          </h2>
          <p ref={subtitleRef} className="text-gray-300 font-sans text-base md:text-lg font-normal leading-relaxed max-w-2xl">
            {t.subtitle}
          </p>
        </div>

        {/* Project Grid - Wide 2-column layout */}
        <div ref={gridRef} className="grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 w-full z-10 relative">
          {projects.map((project) => {
            return (
              <div
                key={project.id}
                className="project-card relative group"
              >
                {/* Refined gradient glow behind the card */}
                <div className="absolute -inset-1 lg:-inset-2 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-blue-500/20 rounded-[2.5rem] lg:rounded-[3rem] blur-2xl opacity-40 group-hover:opacity-100 transition duration-1000"></div>

                {/* Main Card Container - Dark brushed composite material */}
                <div className="relative flex flex-col bg-[#1a1c23] bg-gradient-to-br from-[#242733] to-[#12141a] border-t border-l border-white/10 border-r border-b border-black/80 rounded-[2rem] lg:rounded-[2.5rem] p-4 lg:p-5 shadow-[0_30px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] transition-transform duration-700 hover:-translate-y-2 lg:hover:-translate-y-4 h-full overflow-hidden group/inner">
                  
                  {/* Subtle noise texture overlay - CSS-based for performance */}
                  <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none bg-[length:100px_100px]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}></div>

                  {/* Laptop Mockup Wrapper - Wide landscape oriented */}
                  <div className="laptop-mockup relative w-full aspect-[16/10] bg-gradient-to-b from-gray-700/50 via-gray-900/90 to-black p-[2px] rounded-[1.2rem] lg:rounded-[1.8rem] shadow-[0_40px_60px_-15px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.3)] mb-6 lg:mb-8 shrink-0 z-20 transition-transform duration-700 group-hover/inner:scale-[1.02]">
                    
                    {/* Inner Black Bezel */}
                    <div className="relative w-full h-full bg-[#050505] rounded-[1.1rem] lg:rounded-[1.7rem] flex flex-col overflow-hidden pb-4 lg:pb-6 shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
                      
                      {/* Live Project Tag (frosted glass) - Moved to top black bezel */}
                      <div className="absolute top-3 right-4 lg:top-4 lg:right-6 z-40">
                        {project.status === "in_progress" ? (
                          <div className="bg-white/5 backdrop-blur-md border border-amber-500/30 text-amber-400/90 text-[10px] lg:text-xs font-semibold tracking-wider px-3 lg:px-4 py-1.5 lg:py-2 rounded-full shadow-lg flex items-center gap-2 transition duration-500 hover:bg-white/10">
                            <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_12px_rgba(245,158,11,0.9)]"></div>
                            {t.inProgress}
                          </div>
                        ) : (
                          <div className="bg-white/5 backdrop-blur-md border border-white/10 text-white/90 text-[10px] lg:text-xs font-semibold tracking-wider px-3 lg:px-4 py-1.5 lg:py-2 rounded-full shadow-lg flex items-center gap-2 transition duration-500 hover:bg-white/10 group-hover/inner:border-white/20 group-hover/inner:text-white">
                            <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_12px_rgba(34,211,238,0.9)]"></div>
                            Live Project
                          </div>
                        )}
                      </div>

                      {/* Camera Notch Area */}
                      <div className="w-full h-5 lg:h-7 flex justify-center shrink-0 relative z-30 bg-[#050505]">
                         <div className="w-32 lg:w-48 h-4 lg:h-6 bg-[#0a0a0c] rounded-b-[10px] lg:rounded-b-[14px] flex items-center justify-center border-b border-x border-white/5 shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                            <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-[#0f0f12] border border-white/10 flex items-center justify-center">
                               <div className="w-0.5 h-0.5 lg:w-1 lg:h-1 rounded-full bg-blue-500/50"></div>
                            </div>
                         </div>
                      </div>

                      {/* Spacer for bezel before screen starts */}
                      <div className="h-2 lg:h-4 w-full bg-[#050505] shrink-0"></div>

                      {/* Screen Display Area */}
                      <div className="relative flex-grow bg-[#000] mx-2 lg:mx-3 mb-1 lg:mb-2 rounded-sm lg:rounded-md overflow-hidden ring-1 ring-white/10 shadow-[inset_0_2px_20px_rgba(0,0,0,0.9)] z-10 group/screen">
                        
                        {/* Dynamic Glossy Screen Reflection */}
                        <div className="absolute top-0 right-0 w-[200%] h-[200%] bg-gradient-to-b from-white/10 via-white/5 to-transparent -rotate-45 translate-x-1/2 -translate-y-1/2 blur-[8px] z-20 pointer-events-none transition-transform duration-1000 group-hover/inner:-translate-x-10 group-hover/inner:translate-y-10"></div>

                        <Image
                          src={project.image || "/placeholder.png"}
                          alt={project.name}
                          fill
                          sizes="(max-width: 1280px) 100vw, 50vw"
                          className="object-cover object-top transition-transform duration-700 group-hover/screen:scale-[1.03] opacity-90 group-hover/screen:opacity-100 filter contrast-[1.05]"
                        />
                        
                        {/* Subtle bottom shadow on screen */}
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent z-10 pointer-events-none"></div>
                        
                        {/* Clickable Area */}
                        {project.status !== "in_progress" && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 z-40"
                            aria-label={`View ${project.name} live`}
                          ></a>
                        )}
                      </div>
                      
                      {/* Laptop Chin */}
                      <div className="absolute bottom-1 lg:bottom-1.5 w-full flex justify-center z-20 pointer-events-none">
                         <span className="text-[6px] lg:text-[8px] tracking-[0.4em] font-sans text-white/20 uppercase font-bold text-shadow-sm">MacBook Pro</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Typography & Description */}
                  <div className="flex flex-col flex-grow justify-start px-2 lg:px-4 pb-2 lg:pb-4 relative z-10">
                    {/* Project Name - Large Bold White */}
                    <div className="flex flex-col mb-3">
                      <h3 className="text-white font-display text-4xl sm:text-5xl lg:text-5xl xl:text-6xl leading-[1.05] font-bold tracking-tight drop-shadow-md">
                        {project.name}
                      </h3>
                    </div>

                    {/* Project Description */}
                    <div className="w-full mb-6 shrink-0">
                        <p className="text-[#A1A1AA] font-sans text-[15px] lg:text-[17px] font-normal leading-relaxed max-w-[95%]">
                          {lang === 'pl' ? project.description_pl : project.description_en}
                        </p>
                    </div>

                    {/* Odwiedź stronę button */}
                    <div className="mt-auto pt-2">
                       {project.status === "in_progress" ? (
                          <div className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white/5 text-white/40 font-sans font-semibold text-[15px] border border-white/10 cursor-not-allowed w-fit">
                             {t.pageUnderConstruction}
                          </div>
                       ) : (
                          <a
                             href={project.live}
                             target="_blank"
                             rel="noopener noreferrer"
                             className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-ember text-bg font-sans font-semibold text-[15px] shadow-lg shadow-ember/20 hover:brightness-110 hover:-translate-y-0.5 transition-all duration-300 w-fit group/btn focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1c23]"
                          >
                             {t.visitSite}
                             <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                          </a>
                       )}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
