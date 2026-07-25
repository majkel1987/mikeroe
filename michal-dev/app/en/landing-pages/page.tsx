import ServicePage from '@/components/site/ServicePage';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  locale: 'en',
  title: 'Landing pages for services and campaigns',
  description: 'A focused landing page with custom UX/UI, form, SEO, analytics and deployment. Packages start at PLN 3,500.',
  path: '/en/landing-pages',
  alternatePath: '/landing-page',
});

export default function LandingPage() {
  return <ServicePage locale="en" service="landing" />;
}

