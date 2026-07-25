'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { trackEvent, type AnalyticsEvent } from '@/lib/analytics';

type AnalyticsLinkProps = ComponentProps<typeof Link> & {
  event: AnalyticsEvent;
  eventProps?: Record<string, string>;
};

export default function AnalyticsLink({ event, eventProps, onClick, ...props }: AnalyticsLinkProps) {
  return (
    <Link
      {...props}
      onClick={(clickEvent) => {
        trackEvent(event, eventProps);
        onClick?.(clickEvent);
      }}
    />
  );
}

