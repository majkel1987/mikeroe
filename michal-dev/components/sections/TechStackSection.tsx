'use client';

/**
 * Color tokens used (from globals.css → tailwind.config.ts):
 * - bg (#0a0a0f)           → card backgrounds (darkest)
 * - surface (#111118)       → card visual areas
 * - surface2 (#18181f)      → nested UI mock elements
 * - border / border-custom  → card borders
 * - text / text-custom      → primary text
 * - muted / muted-custom    → secondary text & display type
 * - ember (#E2954B)         → section label, hero accent, highlights
 * - sunlit (#F3BD7E)        → warm accent in visuals
 * - accent1 (#7c6bff)       → React card accent
 * - accent2 (#00d4aa)       → EF card accent
 * - glacier (#3E6B63)       → Git card accent
 * - summit (#10131B)        → deep inset panels
 */

import { useRef, useLayoutEffect, useEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SiGithub } from 'react-icons/si';
import { useLanguage } from '@/lib/LanguageContext';
import { useTechItemLetterSpacing } from '@/components/SmoothScroll';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const CARD_BASE =
  'tech-item group relative flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-bg transition-all duration-200 hover:scale-[1.02] hover:border-ember/40';

type BentoCard = {
  name: string;
  description: string;
  visual: ReactNode;
  gridClass: string;
};

const TRANSLATIONS = {
  pl: {
    label: 'TECH STACK',
    ariaLabel: 'Tech Stack — narzędzia i technologie',
    title: 'Narzędzia, które znam na\u00a0wylot',
    subtitle:
      'Inżynieryjne podejście wymaga solidnych fundamentów. Oto stack, z którym dowożę projekty do\u00a0mety.',
    heroStat: '6+',
    heroStatLabel: 'technologii',
    cards: [
      {
        name: 'React',
        description:
          'Interfejsy, które reagują natychmiast. Czysty kod, komponenty i widoki gotowe na skalowanie.',
        gridClass: 'md:col-span-1 md:row-span-1',
      },
      {
        name: 'HTML & CSS',
        description:
          'Konstrukcja i aerodynamika. Każdy element interfejsu zaprogramowany z dbałością o detale i pełną responsywność.',
        gridClass: 'md:col-span-1 md:row-span-1',
      },
      {
        name: 'C# / .NET',
        description:
          'Silnie typowany fundament. Inżynieryjna precyzja, która gwarantuje żelazną stabilność o każdej porze.',
        gridClass: 'md:col-span-1 md:row-span-1',
      },
      {
        name: 'ASP.NET Core',
        description:
          'Potężny, enterprise-grade silnik. Gotowy na skomplikowaną logikę biznesową Twojego produktu i niezawodne API.',
        gridClass: 'md:col-span-1 md:row-span-1',
      },
      {
        name: 'Entity Framework Core',
        description:
          'Ulubiony ORM. Zapytania do bazy danych, które mają sens i działają bez zarzutu. Migracje bez stresu.',
        gridClass: 'md:col-span-1 md:row-span-1',
      },
      {
        name: 'Git & GitHub',
        description:
          'Kontrola wersji pod pełną kontrolą i wdrożenia szybkie jak precyzyjny pit-stop. Zero zaskoczeń na produkcji.',
        gridClass: 'md:col-span-1 md:row-span-1',
      },
    ],
  },
  en: {
    label: 'TECH STACK',
    ariaLabel: 'Tech Stack — tools and technologies',
    title: 'Tools I know\u00a0inside out',
    subtitle:
      "An engineering mindset demands solid foundations. Here's the stack I use to ship projects across the\u00a0finish line.",
    heroStat: '6+',
    heroStatLabel: 'technologies',
    cards: [
      {
        name: 'React',
        description:
          'Interfaces that respond instantly. Clean code, reusable components, and views ready to scale.',
        gridClass: 'md:col-span-1 md:row-span-1',
      },
      {
        name: 'HTML & CSS',
        description:
          'Structure and styling. Every UI element crafted with attention to detail and full responsiveness.',
        gridClass: 'md:col-span-1 md:row-span-1',
      },
      {
        name: 'C# / .NET',
        description:
          'A strongly-typed foundation. Engineering precision that guarantees rock-solid stability around the clock.',
        gridClass: 'md:col-span-1 md:row-span-1',
      },
      {
        name: 'ASP.NET Core',
        description:
          'A powerful, enterprise-grade engine. Ready for complex business logic and reliable APIs.',
        gridClass: 'md:col-span-1 md:row-span-1',
      },
      {
        name: 'Entity Framework Core',
        description:
          'My go-to ORM. Queries that make sense and work flawlessly. Stress-free migrations.',
        gridClass: 'md:col-span-1 md:row-span-1',
      },
      {
        name: 'Git & GitHub',
        description:
          'Full version control and deployments as smooth as a precision pit-stop. Zero surprises in production.',
        gridClass: 'md:col-span-1 md:row-span-1',
      },
    ],
  },
} as const;

const HeroVisual = ({ stat, statLabel }: { stat: string; statLabel: string }) => (
  <div className="flex min-h-[140px] flex-1 flex-col items-center justify-center bg-surface p-6 md:min-h-[180px] md:p-8">
    <div className="flex items-end gap-2">
      <span className="font-display text-6xl font-bold leading-none text-ember md:text-7xl">{stat}</span>
      <span className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted md:text-xs">{statLabel}</span>
    </div>
  </div>
);

const CodeFrame = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-1 items-center justify-center bg-surface p-4 md:p-5">
    <div className="w-full overflow-hidden rounded-lg border border-border/60 bg-summit">
      <div className="flex items-center gap-1.5 border-b border-border/40 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-accent3/70" />
        <span className="h-2 w-2 rounded-full bg-sunlit/70" />
        <span className="h-2 w-2 rounded-full bg-accent2/70" />
      </div>
      <div className="space-y-1 p-3 font-mono text-[9px] leading-relaxed md:text-[10px]">{children}</div>
    </div>
  </div>
);

const ReactVisual = () => (
  <CodeFrame>
    <p>
      <span className="text-accent1">const</span> <span className="text-sunlit">Button</span> = {'({ label }) => ('}
    </p>
    <p className="pl-2 text-muted">
      {'<'}<span className="text-accent2">button</span> className=<span className="text-sunlit">&quot;btn&quot;</span>{'>'}
    </p>
    <p className="pl-4 text-text">{'{label}'}</p>
    <p className="pl-2 text-muted">{'</'}<span className="text-accent2">button</span>{'>'}</p>
    <p>{');'}</p>
  </CodeFrame>
);

const HtmlCssVisual = () => (
  <CodeFrame>
    <p className="text-muted">
      {'<'}<span className="text-accent2">section</span> <span className="text-sunlit">class</span>=<span className="text-sunlit">&quot;hero&quot;</span>{'>'}
    </p>
    <p className="pl-2 text-muted">
      {'<'}<span className="text-accent2">h1</span>{'>'}Title{'</'}<span className="text-accent2">h1</span>{'>'}
    </p>
    <p className="text-muted">{'</'}<span className="text-accent2">section</span>{'>'}</p>
    <p className="pt-1 text-muted/50">.hero {'{'}</p>
    <p className="pl-2 text-muted">
      <span className="text-accent1">display</span>: <span className="text-sunlit">grid</span>;
    </p>
    <p className="pl-2 text-muted">
      <span className="text-accent1">gap</span>: <span className="text-sunlit">1.5rem</span>;
    </p>
    <p className="text-muted/50">{'}'}</p>
  </CodeFrame>
);

const CSharpVisual = () => (
  <CodeFrame>
    <p>
      <span className="text-accent1">public record</span> <span className="text-sunlit">User</span>(
    </p>
    <p className="pl-2 text-muted">
      <span className="text-accent2">int</span> Id, <span className="text-accent2">string</span> Name);
    </p>
    <p className="pt-1 text-accent2">.ToListAsync();</p>
  </CodeFrame>
);

const AspNetVisual = () => (
  <CodeFrame>
    <p>
      <span className="text-accent1">var</span> builder = <span className="text-sunlit">WebApplication</span>
    </p>
    <p className="pl-2 text-muted">.CreateBuilder();</p>
    <p>
      builder.Services.<span className="text-sunlit">AddControllers</span>();
    </p>
    <p className="pt-1 text-accent2">
      app.MapGet(&quot;/api/health&quot;, () =&gt; Results.Ok());
    </p>
  </CodeFrame>
);

const EntityFrameworkVisual = () => (
  <div className="flex flex-1 items-center justify-center bg-surface p-4 md:p-6">
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-8 w-28 items-center justify-center rounded-md border border-accent2/30 bg-accent2/10 font-mono text-[10px] text-accent2">
        DbContext
      </div>
      <div className="h-4 w-px bg-border" />
      <div className="flex gap-2">
        <div className="h-7 w-16 rounded border border-border/60 bg-surface2" />
        <div className="h-7 w-16 rounded border border-border/60 bg-surface2" />
        <div className="h-7 w-16 rounded border border-border/60 bg-surface2" />
      </div>
      <div className="flex gap-2">
        <div className="h-1.5 w-16 rounded-full bg-border/60" />
        <div className="h-1.5 w-16 rounded-full bg-border/60" />
        <div className="h-1.5 w-16 rounded-full bg-border/60" />
      </div>
    </div>
  </div>
);

const GitVisual = () => (
  <div className="flex flex-1 items-center justify-center bg-surface p-4 md:p-6">
    <div className="relative flex items-center gap-3">
      <div className="flex flex-col items-center gap-1">
        <div className="h-3 w-3 rounded-full border-2 border-glacier bg-glacier/20" />
        <div className="h-6 w-px bg-glacier/50" />
        <div className="h-3 w-3 rounded-full border-2 border-glacier bg-glacier/20" />
      </div>
      <div className="absolute left-3 top-3 h-px w-10 bg-glacier/40" />
      <div className="ml-6 flex flex-col gap-2 font-mono text-[10px] text-muted">
        <span className="text-glacier">main</span>
        <span className="text-sunlit/70">feat/api</span>
      </div>
      <SiGithub className="ml-2 h-8 w-8 text-muted/30 transition-colors duration-200 group-hover:text-text/50" aria-hidden="true" />
    </div>
  </div>
);

const VISUALS: Record<string, () => ReactNode> = {
  React: ReactVisual,
  'HTML & CSS': HtmlCssVisual,
  'C# / .NET': CSharpVisual,
  'ASP.NET Core': AspNetVisual,
  'Entity Framework Core': EntityFrameworkVisual,
  'Git & GitHub': GitVisual,
};

export default function TechStackSection() {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const headerLabelRef = useRef<HTMLSpanElement>(null);
  const headerDividerRef = useRef<HTMLDivElement>(null);
  const headerTitleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const techHeadingsRef = useRef<HTMLElement[]>([]);

  const bentoCards: BentoCard[] = t.cards.map((card) => ({
    ...card,
    visual: VISUALS[card.name]?.() ?? null,
  }));

  useEffect(() => {
    if (gridRef.current) {
      techHeadingsRef.current = Array.from(gridRef.current.querySelectorAll('.tech-item h3')) as HTMLElement[];
    }
  }, [lang]);

  useTechItemLetterSpacing(sectionRef, techHeadingsRef);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headerLabelRef.current, { opacity: 0, x: -20 });
      gsap.set(headerDividerRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(headerTitleRef.current, { opacity: 0, y: 30 });

      const cards = gridRef.current?.querySelectorAll('.tech-item');
      if (cards) {
        gsap.set(cards, { opacity: 0, y: 24 });
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
        .to(headerTitleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');

      if (cards) {
        tl.to(cards, { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: 'power2.out' }, '-=0.3');
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="w-full bg-transparent px-4 pb-12 pt-12 sm:px-8 md:pb-24 md:pt-24 xl:px-16 2xl:px-24"
      aria-label={t.ariaLabel}
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[1800px] flex-col gap-10 md:gap-14">
        <div className="flex w-full flex-col gap-5">
          <div className="flex w-full flex-row items-center gap-4">
            <span
              ref={headerLabelRef}
              className="font-mono text-xs font-semibold uppercase tracking-widest text-ember"
            >
              {t.label}
            </span>
            <div ref={headerDividerRef} className="h-px flex-1 bg-ember/30" />
          </div>
          <h2
            ref={headerTitleRef}
            className="max-w-[820px] font-display text-3xl font-bold leading-[1.15] text-text md:text-[42px] lg:text-5xl"
          >
            {t.title}
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-4 md:grid-flow-dense md:grid-cols-4 md:auto-rows-[minmax(180px,auto)] md:gap-5"
        >
          <article className={cn(CARD_BASE, 'md:col-span-1 md:row-span-2')}>
            <HeroVisual stat={t.heroStat} statLabel={t.heroStatLabel} />
            <div className="flex flex-col gap-2 border-t border-border/30 p-5 md:p-6">
              <p className="text-sm leading-relaxed text-muted">{t.subtitle}</p>
            </div>
          </article>

          {bentoCards.map((card) => (
            <article key={card.name} className={cn(CARD_BASE, card.gridClass)}>
              {card.visual}
              <div className="flex flex-col gap-2 border-t border-border/30 p-5 md:p-6">
                <h3 className="text-base font-bold leading-snug text-text md:text-lg">{card.name}</h3>
                <p className="text-sm leading-relaxed text-muted">{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
