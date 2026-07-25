import PhysioflowCaseStudy from '@/components/site/PhysioflowCaseStudy';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  locale: 'en',
  title: 'Physioflow — physiotherapy website concept',
  description: 'A concept case study for a physiotherapy practice: problem, information architecture, UX decisions, content and design outcome.',
  path: '/en/work/physioflow',
  alternatePath: '/projekty/physioflow',
});

export default function PhysioflowProjectPage() {
  return <PhysioflowCaseStudy locale="en" />;
}

