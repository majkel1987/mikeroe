'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SiReact,
  SiDotnet,
  SiGithub,
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import { Database, Code2, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const techCategories = [
  {
    name: 'FRONTEND',
    accentClass: 'bg-[#E63946]',
    hoverBorder: 'hover:border-[#E63946]/40',
    hoverIconColor: 'group-hover:text-[#E63946]',
    items: [
      {
        name: 'React',
        description:
          'Interfejsy, które reagują natychmiast. Czysty kod, komponenty i widoki gotowe na skalowanie.',
        icon: SiReact,
      },
      {
        name: 'HTML & CSS',
        description:
          'Konstrukcja i aerodynamika. Każdy element interfejsu zaprogramowany z dbałością o detale i pełną responsywność.',
        icon: Code2,
      },
    ],
  },
  {
    name: 'BACKEND',
    accentClass: 'bg-[#FF6B35]',
    hoverBorder: 'hover:border-[#FF6B35]/40',
    hoverIconColor: 'group-hover:text-[#FF6B35]',
    items: [
      {
        name: 'C# / .NET',
        description:
          'Silnie typowany fundament. Inżynieryjna precyzja, która gwarantuje żelazną stabilność o każdej porze.',
        icon: TbBrandCSharp,
      },
      {
        name: 'ASP.NET Core',
        description:
          'Potężny, enterprise-grade silnik. Gotowy na skomplikowaną logikę biznesową Twojego produktu i niezawodne API.',
        icon: SiDotnet,
      },
      {
        name: 'Entity Framework Core',
        description:
          'Ulubiony ORM. Zapytania do bazy danych, które mają sens i działają bez zarzutu. Migracje bez stresu.',
        icon: Database,
      },
    ],
  },
  {
    name: 'TOOLING',
    accentClass: 'bg-[#FF6B35]',
    hoverBorder: 'hover:border-[#FF6B35]/40',
    hoverIconColor: 'group-hover:text-[#FF6B35]',
    items: [
      {
        name: 'Git & GitHub',
        description:
          'Kontrola wersji pod pełną kontrolą i wdrożenia szybkie jak precyzyjny pit-stop. Zero zaskoczeń na produkcji.',
        icon: SiGithub,
      },
      {
        name: 'Architektura SaaS',
        description:
          'Projektowanie systemów gotowych na wielu użytkowników. Rozwiązania, które z powodzeniem działają w bojowych warunkach.',
        icon: Layers,
      },
    ],
  },
];

export default function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerLabelRef = useRef<HTMLSpanElement>(null);
  const headerDividerRef = useRef<HTMLDivElement>(null);
  const headerTitleRef = useRef<HTMLHeadingElement>(null);
  const headerSublineRef = useRef<HTMLParagraphElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headerLabelRef.current, { opacity: 0, x: -20 });
      gsap.set(headerDividerRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(headerTitleRef.current, { opacity: 0, y: 30 });
      gsap.set(headerSublineRef.current, { opacity: 0, y: 30 });

      const categoryBlocks = categoriesRef.current?.querySelectorAll('.category-block');
      if (categoryBlocks) {
        categoryBlocks.forEach((block) => {
          const label = block.querySelector('.category-label');
          const items = block.querySelectorAll('.tech-item');
          gsap.set(label, { opacity: 0, x: -20 });
          gsap.set(items, { opacity: 0, y: 20 });
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      tl.to(headerLabelRef.current, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' })
        .to(headerDividerRef.current, { scaleX: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .to(headerTitleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .to(headerSublineRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5');

      if (categoryBlocks) {
        categoryBlocks.forEach((block, catIndex) => {
          const label = block.querySelector('.category-label');
          const items = block.querySelectorAll('.tech-item');
          tl.to(label, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, catIndex === 0 ? '-=0.2' : '-=0.1')
            .to(items, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out' }, '-=0.3');
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="w-full pt-24 pb-24 px-4 sm:px-8 xl:px-16 2xl:px-24"
      aria-label="Tech Stack — narzędzia i technologie"
    >
      <div className="w-full max-w-[1800px] mx-auto flex flex-col gap-12 md:gap-16 relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col gap-5 w-full">
          <div className="flex flex-row items-center gap-4 w-full">
            <span
              ref={headerLabelRef}
              className="text-[#FF6B35] font-mono text-xs font-semibold tracking-widest uppercase"
            >
              TECH STACK
            </span>
            <div ref={headerDividerRef} className="h-px bg-[#FF6B35]/30 flex-1" />
          </div>
          <h2 ref={headerTitleRef} className="text-white font-display text-3xl md:text-[42px] lg:text-5xl font-bold leading-[1.15] max-w-[820px]">
            Narzędzia, które znam na&nbsp;wylot
          </h2>
          <p ref={headerSublineRef} className="text-gray-400 font-sans text-base md:text-lg font-normal leading-relaxed max-w-2xl">
            Inżynieryjne podejście wymaga solidnych fundamentów. Oto stack, z którym dowożę projekty
            do&nbsp;mety.
          </p>
        </div>

        {/* ── Categories ── */}
        <div ref={categoriesRef} className="flex flex-col gap-14">
          {techCategories.map((category, i) => (
            <div key={category.name} className={`category-block flex flex-col gap-6 ${i > 0 ? 'mt-2' : ''}`}>

              {/* Category header row */}
              <div className="category-label flex items-center gap-3">
                <span className="text-white/70 font-mono text-xs font-semibold tracking-widest uppercase">
                  {category.name}
                </span>
                <div className={`h-[2px] w-10 ${category.accentClass} opacity-70 rounded-full`} />
              </div>

              {/* Cards grid */}
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {category.items.map((tech) => (
                  <li
                    key={tech.name}
                    className={`tech-item group relative bg-[#1A1A24] border border-white/5 rounded-xl p-6 transition-all duration-300 hover:-translate-y-[2px] ${category.hoverBorder} hover:bg-[#1e1e2e]`}
                  >
                    <div className="flex flex-col h-full gap-3">
                      {/* Title + icon row */}
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="text-white text-lg font-bold leading-snug">{tech.name}</h3>
                        <div
                          className={`text-white/20 transition-colors duration-300 ${category.hoverIconColor} shrink-0 mt-0.5`}
                        >
                          <tech.icon className="w-5 h-5" />
                        </div>
                      </div>
                      {/* Description */}
                      <p className="text-gray-400 text-sm leading-relaxed">{tech.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
