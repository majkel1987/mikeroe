import PhysioflowDemo from '@/components/site/PhysioflowDemo';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  locale: 'pl',
  title: 'Physioflow — demo projektu koncepcyjnego',
  description: 'Demonstracyjny widok koncepcyjnej strony gabinetu fizjoterapii.',
  path: '/demo/physioflow',
  alternatePath: '/en/demo/physioflow',
  noIndex: true,
});

export default function PhysioflowDemoPage() {
  return <PhysioflowDemo locale="pl" />;
}

