import PhysioflowDemo from '@/components/site/PhysioflowDemo';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  locale: 'en',
  title: 'Physioflow — concept demo',
  description: 'A demonstrational view of a concept physiotherapy website.',
  path: '/en/demo/physioflow',
  alternatePath: '/demo/physioflow',
  noIndex: true,
});

export default function PhysioflowDemoPage() {
  return <PhysioflowDemo locale="en" />;
}

