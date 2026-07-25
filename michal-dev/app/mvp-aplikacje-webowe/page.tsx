import ServicePage from '@/components/site/ServicePage';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  locale: 'pl',
  title: 'Aplikacje webowe i MVP dla małych firm',
  description: 'Analiza zakresu, UX/UI, development i wdrożenie pierwszej wersji aplikacji webowej lub MVP. Projekty od 15 000 zł.',
  path: '/mvp-aplikacje-webowe',
  alternatePath: '/en/web-app-mvp',
});

export default function MvpPage() {
  return <ServicePage locale="pl" service="mvp" />;
}

