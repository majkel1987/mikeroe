'use client';

import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function PricingTracker() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackEvent('pricing_view');
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return <span ref={ref} aria-hidden="true" className="pricing-observer" />;
}
