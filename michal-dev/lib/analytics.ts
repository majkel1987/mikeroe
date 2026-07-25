export type AnalyticsEvent =
  | 'cta_primary_click'
  | 'pricing_view'
  | 'package_select'
  | 'form_start'
  | 'form_submit_success'
  | 'form_submit_error'
  | 'email_click'
  | 'linkedin_click'
  | 'portfolio_open';

declare global {
  interface Window {
    plausible?: (event: AnalyticsEvent, options?: { props?: Record<string, string> }) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, props?: Record<string, string>) {
  if (typeof window === 'undefined') return;
  window.plausible?.(event, props ? { props } : undefined);
}

