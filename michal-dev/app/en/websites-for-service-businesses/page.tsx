import ServicePage from '@/components/site/ServicePage';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  locale: 'en',
  title: 'Websites for service businesses',
  description: 'Custom company websites built around a clear offer and enquiry path. UX/UI, content editing, SEO, analytics and launch from PLN 6,500.',
  path: '/en/websites-for-service-businesses',
  alternatePath: '/strony-internetowe-dla-firm',
});

export default function WebsitesPage() {
  return <ServicePage locale="en" service="websites" />;
}

