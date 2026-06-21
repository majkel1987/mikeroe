'use client';

import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────
// Context Type
// ─────────────────────────────────────────────────────────

interface LenisContextType {
  lenis: Lenis | null;
  velocity: number;
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  velocity: 0,
});

export const useLenis = () => useContext(LenisContext);

// ─────────────────────────────────────────────────────────
// Provider Component
// ─────────────────────────────────────────────────────────

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [velocity, setVelocity] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Skip Lenis initialization if user prefers reduced motion
    if (prefersReducedMotion) {
      return;
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Sync Lenis raf with GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Remove lagSmoothing to prevent conflicts
    gsap.ticker.lagSmoothing(0);

    // Update velocity on scroll
    lenis.on('scroll', ({ velocity: v }: { velocity: number }) => {
      setVelocity(v);
    });

    // Refresh ScrollTrigger after Lenis is ready
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, [prefersReducedMotion]);

  const contextValue = {
    lenis: lenisRef.current,
    velocity,
  };

  return (
    <LenisContext.Provider value={contextValue}>
      {children}
      {/* Velocity-reactive effects are applied via hooks in individual components */}
    </LenisContext.Provider>
  );
}

// ─────────────────────────────────────────────────────────
// useVelocityEffect Hook
// ─────────────────────────────────────────────────────────

interface VelocityEffectOptions {
  onVelocityChange: (velocity: number) => void;
  disabled?: boolean;
}

export function useVelocityEffect({ onVelocityChange, disabled = false }: VelocityEffectOptions) {
  const { lenis, velocity } = useLenis();

  useEffect(() => {
    if (disabled || !lenis) return;
    onVelocityChange(velocity);
  }, [velocity, onVelocityChange, disabled, lenis]);
}

// ─────────────────────────────────────────────────────────
// Velocity Effect Components
// ─────────────────────────────────────────────────────────

// Portfolio Card Skew Effect
export function usePortfolioCardSkew(cardRefs: React.RefObject<HTMLElement[]>) {
  const { lenis, velocity } = useLenis();
  const quickSettersRef = useRef<Map<HTMLElement, gsap.QuickToFunc>>(new Map());
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !lenis || !cardRefs.current) return;

    // Initialize quickTo setters for each card
    cardRefs.current.forEach((card) => {
      if (card && !quickSettersRef.current.has(card)) {
        quickSettersRef.current.set(card, gsap.quickTo(card, 'skewY', { duration: 0.6, ease: 'power2.out' }));
      }
    });

    // Apply skew based on velocity
    const clampedSkew = Math.max(-3, Math.min(3, -velocity * 0.8));

    cardRefs.current.forEach((card) => {
      if (card) {
        const quickTo = quickSettersRef.current.get(card);
        if (quickTo) {
          quickTo(clampedSkew);
        }
      }
    });
  }, [velocity, lenis, cardRefs, prefersReducedMotion]);
}

// Hero Orbit Stretch Effect
export function useHeroOrbitStretch(orbitRef: React.RefObject<HTMLElement>) {
  const { lenis, velocity } = useLenis();
  const quickToRef = useRef<gsap.QuickToFunc | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !lenis || !orbitRef.current) return;

    if (!quickToRef.current) {
      gsap.set(orbitRef.current, { willChange: 'transform' });
      quickToRef.current = gsap.quickTo(orbitRef.current, 'scaleY', { duration: 0.5, ease: 'power2.out' });
    }

    // scaleY: scroll down fast → up to 1.04, scroll up fast → 0.96
    const scaleY = 1 + Math.max(-0.04, Math.min(0.04, velocity * 0.01));
    quickToRef.current(scaleY);
  }, [velocity, lenis, orbitRef, prefersReducedMotion]);
}

// Services Timeline Horizontal Shift Effect
export function useServicesTimelineShift(cardRefs: React.RefObject<HTMLElement[]>) {
  const { lenis, velocity } = useLenis();
  const quickSettersRef = useRef<Map<HTMLElement, gsap.QuickToFunc>>(new Map());
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !lenis || !cardRefs.current) return;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      // Only apply after entrance animation (check opacity)
      const computedStyle = window.getComputedStyle(card);
      if (parseFloat(computedStyle.opacity) < 1) return;

      if (!quickSettersRef.current.has(card)) {
        quickSettersRef.current.set(card, gsap.quickTo(card, 'x', { duration: 0.5, ease: 'power2.out' }));
      }

      // Alternating directions: cards 1, 3, 5 (index 0, 2, 4) shift RIGHT, cards 2, 4 (index 1, 3) shift LEFT
      const direction = index % 2 === 0 ? 1 : -1;
      const shift = Math.max(-10, Math.min(10, velocity * 2.5 * direction));

      const quickTo = quickSettersRef.current.get(card);
      if (quickTo) {
        quickTo(shift);
      }
    });
  }, [velocity, lenis, cardRefs, prefersReducedMotion]);
}

// Tech Item Letter Spacing Effect
export function useTechItemLetterSpacing(
  sectionRef: React.RefObject<HTMLElement>,
  headingRefs: React.RefObject<HTMLElement[]>
) {
  const { lenis, velocity } = useLenis();
  const quickSettersRef = useRef<Map<HTMLElement, gsap.QuickToFunc>>(new Map());
  const [isInViewport, setIsInViewport] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [sectionRef]);

  useEffect(() => {
    if (prefersReducedMotion || !lenis || !isInViewport || !headingRefs.current) return;

    headingRefs.current.forEach((heading) => {
      if (!heading) return;

      if (!quickSettersRef.current.has(heading)) {
        quickSettersRef.current.set(
          heading,
          gsap.quickTo(heading, 'letterSpacing', { duration: 0.5, ease: 'power2.out' })
        );
      }

      // Original: tracking-tight ≈ -0.025em. Expand up to +2px based on velocity
      const baseSpacing = -0.025 * 16; // Convert em to px (assuming 16px base)
      const expansion = Math.abs(velocity) * 0.5; // Max ~2px at high velocity
      const letterSpacing = baseSpacing + Math.min(2, expansion);

      const quickTo = quickSettersRef.current.get(heading);
      if (quickTo) {
        quickTo(letterSpacing);
      }
    });
  }, [velocity, lenis, isInViewport, headingRefs, prefersReducedMotion]);
}

// Nav Fade on Velocity Effect
export function useNavFadeOnVelocity(navRef: React.RefObject<HTMLElement>, isScrolled: boolean) {
  const { lenis, velocity } = useLenis();
  const quickToRef = useRef<gsap.QuickToFunc | null>(null);
  const hasEnteredRef = useRef(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // Track entrance animation completion
  useEffect(() => {
    if (isScrolled && !hasEnteredRef.current) {
      hasEnteredRef.current = true;
    }
  }, [isScrolled]);

  useEffect(() => {
    if (prefersReducedMotion || !lenis || !navRef.current) return;

    // Only apply after navbar entrance animation
    if (!hasEnteredRef.current) {
      // Short delay to allow entrance
      const timer = setTimeout(() => {
        hasEnteredRef.current = true;
      }, 600);
      return () => clearTimeout(timer);
    }

    if (!quickToRef.current) {
      quickToRef.current = gsap.quickTo(navRef.current, 'opacity', { duration: 0.3, ease: 'power2.out' });
    }

    const absVelocity = Math.abs(velocity);

    if (absVelocity > 2.5) {
      // Fade to 0.15 when scrolling fast
      quickToRef.current(0.15);
    } else if (absVelocity < 0.5) {
      // Fade back to full opacity when slow/stopped
      quickToRef.current(1);
    }
    // Between 0.5 and 2.5, maintain current state (hysteresis)
  }, [velocity, lenis, navRef, prefersReducedMotion]);
}

// Pricing Card Tilt Effect
export function usePricingCardTilt(
  gridRef: React.RefObject<HTMLElement>,
  cardRefs: React.RefObject<HTMLElement[]>
) {
  const { lenis, velocity } = useLenis();
  const quickSettersRef = useRef<Map<HTMLElement, gsap.QuickToFunc>>(new Map());
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !lenis || !gridRef.current || !cardRefs.current) return;

    // Add perspective to grid
    gridRef.current.style.perspective = '800px';

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      if (!quickSettersRef.current.has(card)) {
        quickSettersRef.current.set(card, gsap.quickTo(card, 'rotateX', { duration: 0.5, ease: 'power2.out' }));
      }

      // Check if this is the highlighted (middle) card
      const isHighlighted = card.classList.contains('highlighted') || index === 1;
      const intensity = isHighlighted ? 1.5 : 1;

      // rotateX: scroll down fast → -2deg, up → +2deg
      const baseRotation = Math.max(-2, Math.min(2, -velocity * 0.5));
      const rotation = baseRotation * intensity;

      const quickTo = quickSettersRef.current.get(card);
      if (quickTo) {
        quickTo(rotation);
      }
    });
  }, [velocity, lenis, gridRef, cardRefs, prefersReducedMotion]);
}

// Contact Image Parallax Velocity Effect
export function useContactImageParallax(
  sectionRef: React.RefObject<HTMLElement>,
  imageRef: React.RefObject<HTMLElement>
) {
  const { lenis, velocity } = useLenis();
  const quickToRef = useRef<gsap.QuickToFunc | null>(null);
  const [isInViewport, setIsInViewport] = useState(false);
  const entranceCompleteRef = useRef(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
        // Mark entrance complete when section enters viewport
        if (entry.isIntersecting && !entranceCompleteRef.current) {
          // Delay to allow GSAP entrance animation
          setTimeout(() => {
            entranceCompleteRef.current = true;
          }, 800);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [sectionRef]);

  useEffect(() => {
    if (prefersReducedMotion || !lenis || !isInViewport || !imageRef.current || !entranceCompleteRef.current) return;

    if (!quickToRef.current) {
      quickToRef.current = gsap.quickTo(imageRef.current, 'y', { duration: 0.4, ease: 'power2.out' });
    }

    // translateY shifts by velocity * 3px, clamped to ±15px
    const shift = Math.max(-15, Math.min(15, velocity * 3));
    quickToRef.current(shift);
  }, [velocity, lenis, isInViewport, imageRef, prefersReducedMotion]);
}
