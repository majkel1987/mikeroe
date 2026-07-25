import ServicePage from '@/components/site/ServicePage';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  locale: 'pl',
  title: 'Strony internetowe dla firm usługowych',
  description: 'Indywidualne strony firmowe nastawione na czytelną ofertę i zapytania. UX/UI, redakcja treści, SEO, analityka i wdrożenie od 6 500 zł.',
  path: '/strony-internetowe-dla-firm',
  alternatePath: '/en/websites-for-service-businesses',
});

export default function WebsitesPage() {
  return <ServicePage locale="pl" service="websites" />;
}

