import ServicePage from '@/components/site/ServicePage';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  locale: 'en',
  title: 'Web application and MVP development',
  description: 'Focused web-app MVP scope, UX/UI, development and deployment for small businesses. Projects start at PLN 15,000.',
  path: '/en/web-app-mvp',
  alternatePath: '/mvp-aplikacje-webowe',
});

export default function MvpPage() {
  return <ServicePage locale="en" service="mvp" />;
}

