import type { Metadata } from 'next';
import MarketingPage from '@/components/site/MarketingPage';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  locale: 'en',
  title: 'Websites for service businesses | MikeRoe',
  description:
    'Website strategy, design and development for service businesses. Focused landing pages, company websites and web-app MVPs.',
  path: '/en',
  alternatePath: '/',
});

export default function EnglishHomePage() {
  return <MarketingPage locale="en" />;
}

