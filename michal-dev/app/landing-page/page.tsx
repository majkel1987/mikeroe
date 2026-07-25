import ServicePage from '@/components/site/ServicePage';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  locale: 'pl',
  title: 'Landing page dla firmy i nowej usługi',
  description: 'Landing page z jasnym celem, indywidualnym UX/UI, formularzem, SEO i analityką. Pakiet od 3 500 zł, realizacja zwykle 2–3 tygodnie.',
  path: '/landing-page',
  alternatePath: '/en/landing-pages',
});

export default function LandingPage() {
  return <ServicePage locale="pl" service="landing" />;
}

