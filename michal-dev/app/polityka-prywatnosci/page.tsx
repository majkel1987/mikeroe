import PrivacyPage from '@/components/site/PrivacyPage';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  locale: 'pl',
  title: 'Polityka prywatności',
  description: 'Informacje o przetwarzaniu danych w formularzu kontaktowym na mikeroe.pl.',
  path: '/polityka-prywatnosci',
  alternatePath: '/en/privacy',
  noIndex: true,
});

export default function PolishPrivacyPage() {
  return <PrivacyPage locale="pl" />;
}
