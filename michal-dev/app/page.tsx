import type { Metadata } from 'next';
import MarketingPage from '@/components/site/MarketingPage';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  locale: 'pl',
  title: 'Strony internetowe dla firm usługowych | MikeRoe',
  description:
    'Projektuję i wdrażam strony, które porządkują ofertę firmy usługowej i prowadzą do zapytania. Landing page od 3 500 zł, strona firmowa od 6 500 zł.',
  path: '/',
  alternatePath: '/en',
});

export default function HomePage() {
  return <MarketingPage locale="pl" />;
}
