import PhysioflowCaseStudy from '@/components/site/PhysioflowCaseStudy';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  locale: 'pl',
  title: 'Physioflow — koncepcyjna strona gabinetu fizjoterapii',
  description: 'Case study koncepcyjnej strony dla gabinetu fizjoterapii: problem, architektura informacji, decyzje UX, treść i rezultat projektowy.',
  path: '/projekty/physioflow',
  alternatePath: '/en/work/physioflow',
});

export default function PhysioflowProjectPage() {
  return <PhysioflowCaseStudy locale="pl" />;
}

