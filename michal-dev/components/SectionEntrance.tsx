'use client';

import { ReactNode, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionEntranceProps {
  children: ReactNode;
  className?: string;
}

export default function SectionEntrance({ children, className = '' }: SectionEntranceProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.set(wrapper, { y: 72, opacity: 0 });

      gsap.to(wrapper, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'back.out(1.15)',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 92%',
          toggleActions: 'play none none none',
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full ${className}`}
    >
      {children}
    </div>
  );
}
