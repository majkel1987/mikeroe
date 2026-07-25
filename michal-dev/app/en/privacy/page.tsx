import PrivacyPage from '@/components/site/PrivacyPage';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  locale: 'en',
  title: 'Privacy policy',
  description: 'Information about data processing in the contact form at mikeroe.pl.',
  path: '/en/privacy',
  alternatePath: '/polityka-prywatnosci',
  noIndex: true,
});

export default function EnglishPrivacyPage() {
  return <PrivacyPage locale="en" />;
}
