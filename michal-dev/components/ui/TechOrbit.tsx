'use client';

import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useHeroOrbitStretch } from '@/components/SmoothScroll';

// react-icons imports
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiDocker,
  SiGraphql,
  SiJavascript,
  SiDotnet,
  SiFigma,
} from 'react-icons/si';
import { FaGitAlt } from 'react-icons/fa';
import { TbBrandCSharp, TbBrandAzure } from 'react-icons/tb';

// Types
interface TechIcon {
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  name: string;
  color: string;
  startAngle: number;
}

interface OrbitConfig {
  id: string;
  radiusPercent: number;
  borderOpacity: number;
  duration: number;
  direction: 'cw' | 'ccw';
  icons: TechIcon[];
}

// Orbit configurations
const ORBITS: OrbitConfig[] = [
  {
    id: 'orbit-1',
    radiusPercent: 20,
    borderOpacity: 0.04,
    duration: 25,
    direction: 'cw',
    icons: [
      { Icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E', startAngle: 0 },
      { Icon: SiDotnet, name: '.NET', color: '#512BD4', startAngle: 120 },
      { Icon: SiFigma, name: 'Figma', color: '#F24E1E', startAngle: 240 },
    ],
  },
  {
    id: 'orbit-2',
    radiusPercent: 33,
    borderOpacity: 0.06,
    duration: 35,
    direction: 'ccw',
    icons: [
      { Icon: TbBrandCSharp, name: 'C#', color: '#512BD4', startAngle: 0 },
      { Icon: SiTailwindcss, name: 'Tailwind', color: '#06B6D4', startAngle: 90 },
      { Icon: TbBrandAzure, name: 'Azure', color: '#0078D4', startAngle: 180 },
      { Icon: FaGitAlt, name: 'Git', color: '#F05032', startAngle: 270 },
    ],
  },
  {
    id: 'orbit-3',
    radiusPercent: 48,
    borderOpacity: 0.08,
    duration: 50,
    direction: 'cw',
    icons: [
      { Icon: SiReact, name: 'React', color: '#61DAFB', startAngle: 0 },
      { Icon: SiTypescript, name: 'TypeScript', color: '#3178C6', startAngle: 72 },
      { Icon: SiNextdotjs, name: 'Next.js', color: '#ffffff', startAngle: 144 },
      { Icon: SiDocker, name: 'Docker', color: '#2496ED', startAngle: 216 },
      { Icon: SiGraphql, name: 'GraphQL', color: '#E10098', startAngle: 288 },
    ],
  },
];

export default function TechOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationsReady, setAnimationsReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check reduced motion preference
  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // Apply hero orbit stretch effect
  useHeroOrbitStretch(containerRef);

  // Entrance animation with GSAP
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const orbits = containerRef.current.querySelectorAll<HTMLElement>('.orbit-ring');
    const icons = containerRef.current.querySelectorAll<HTMLElement>('.tech-icon-node');

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(orbits, { opacity: 0, scale: 0.8 });
      gsap.set(icons, { opacity: 0, scale: 0 });

      // Entrance timeline
      const tl = gsap.timeline({
        delay: 0.5,
        onComplete: () => {
          // Enable CSS animations after entrance completes
          setAnimationsReady(true);
        },
      });

      // Orbit rings fade in
      tl.to(orbits, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      });

      // Icons stagger in
      const sortedIcons = Array.from(icons).sort((a, b) => {
        const aOrbit = parseInt(a.dataset.orbit || '0', 10);
        const bOrbit = parseInt(b.dataset.orbit || '0', 10);
        return aOrbit - bOrbit;
      });

      tl.to(
        sortedIcons,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'back.out(1.4)',
        },
        '-=0.3'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Determine if we should animate
  const shouldAnimate = animationsReady && !prefersReducedMotion;

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[360px] md:max-w-[500px] lg:max-w-[800px] 2xl:max-w-[950px] mx-auto aspect-square"
      aria-hidden="true"
    >
      {/* Inject keyframes */}
      <style jsx>{`
        @keyframes spin-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-ccw {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>

      {/* Background gradient blobs */}
      <div className="absolute inset-[10%] bg-gradient-to-tr from-accent1/30 to-emerald-500/20 blur-[120px] rounded-full z-0" />
      <div className="absolute bottom-[15%] right-[15%] w-1/3 h-1/3 bg-accent2/15 blur-[80px] rounded-full z-0" />

      {/* Orbit rings */}
      {ORBITS.map((orbit, orbitIndex) => {
        const sizePercent = orbit.radiusPercent * 2;
        const insetPercent = (100 - sizePercent) / 2;
        const duration = orbit.duration;
        const orbitAnimation = orbit.direction === 'cw' ? 'spin-cw' : 'spin-ccw';
        const iconAnimation = orbit.direction === 'cw' ? 'spin-ccw' : 'spin-cw';

        return (
          <div
            key={orbit.id}
            className="orbit-ring absolute rounded-full pointer-events-none"
            style={{
              inset: `${insetPercent}%`,
              border: `1px solid rgba(255,255,255,${orbit.borderOpacity})`,
              animation: shouldAnimate ? `${orbitAnimation} ${duration}s linear infinite` : 'none',
            }}
          >
            {/* Icons on this orbit */}
            {orbit.icons.map((tech) => {
              const angleRad = (tech.startAngle * Math.PI) / 180;
              const x = 50 + 50 * Math.cos(angleRad);
              const y = 50 + 50 * Math.sin(angleRad);

              return (
                // Outer wrapper: only used for positioning, no pointer events
                <div
                  key={tech.name}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {/* Counter-rotating icon node — this is the hover target */}
                  <div
                    data-orbit={orbitIndex}
                    className="tech-icon-node group pointer-events-auto w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-surface/80 backdrop-blur-md border-[1.5px] border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-[1.2] hover:border-current relative"
                    style={{
                      color: tech.color,
                      boxShadow: `0 0 12px ${tech.color}20`,
                      animation: shouldAnimate ? `${iconAnimation} ${duration}s linear infinite` : 'none',
                    }}
                    title={tech.name}
                  >
                    <tech.Icon
                      className="w-[22px] h-[22px] lg:w-[30px] lg:h-[30px] transition-all duration-300"
                      style={{ color: tech.color }}
                    />
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                      style={{
                        boxShadow: `0 0 24px ${tech.color}50`,
                      }}
                    />
                    {/* Tooltip — inside counter-rotating div so text stays upright */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-surface border border-white/10 rounded text-[10px] font-mono text-text whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                      {tech.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      {/* Outer orbit conic gradient highlight */}
      <div
        className="absolute rounded-full pointer-events-none z-[5]"
        style={{
          inset: '2%',
          background:
            'conic-gradient(from 0deg, transparent 0%, rgba(124,107,255,0.1) 25%, transparent 50%, rgba(124,107,255,0.05) 75%, transparent 100%)',
          opacity: 0.5,
        }}
      />
    </div>
  );
}
