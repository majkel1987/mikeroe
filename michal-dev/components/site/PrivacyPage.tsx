import Link from 'next/link';
import HtmlLang from './HtmlLang';
import SiteFooter from './SiteFooter';
import SiteHeader from './SiteHeader';
import type { Locale } from '@/lib/site-content';

const copy = {
  pl: {
    title: 'Polityka prywatności',
    lead: 'Informacje o danych przekazywanych przez formularz, pocztę e-mail i narzędzia używane na stronie.',
    warning:
      'Wersja robocza do preview. Przed publikacją produkcyjną trzeba uzupełnić pełne dane administratora i przeprowadzić przegląd prawny.',
    sections: [
      ['1. Administrator danych', 'Administratorem danych jest [UZUPEŁNIJ: pełna nazwa, forma prawna lub imię i nazwisko, adres i dane rejestrowe]. Kontakt w sprawach prywatności: theorbitospace@gmail.com.'],
      ['2. Jakie dane są zbierane', 'Formularz wymaga imienia, adresu e-mail, rodzaju projektu i opisu. Budżet i planowany termin są dobrowolne. System może przetwarzać również techniczne dane niezbędne do ochrony formularza przed nadużyciami, w tym adres IP i nagłówki żądania.'],
      ['3. Cel i podstawa', 'Dane służą do odpowiedzi na zapytanie, przygotowania wstępnej wyceny oraz ewentualnego zawarcia lub wykonania umowy. Podstawą jest podjęcie działań na żądanie osoby przed zawarciem umowy oraz prawnie uzasadniony interes polegający na obsłudze korespondencji i zabezpieczeniu serwisu.'],
      ['4. Odbiorcy i dostawcy', 'Wiadomości są obsługiwane przez Gmail. Serwis jest hostowany w Vercel. Po uruchomieniu konfiguracji produkcyjnej anonimowe statystyki odwiedzin będzie przetwarzać Plausible Analytics. Dostawcy mogą przetwarzać dane zgodnie ze swoimi warunkami i mechanizmami transferu danych.'],
      ['5. Analityka i pliki cookies', 'Plausible jest planowany jako narzędzie analityczne skonfigurowane bez profilowania reklamowego. Strona nie wymaga cookies marketingowych. Jeżeli konfiguracja zmieni ten stan, polityka i mechanizm zgód muszą zostać zaktualizowane przed publikacją.'],
      ['6. Okres przechowywania', 'Korespondencja jest przechowywana przez czas potrzebny do obsługi zapytania, współpracy i obrony ewentualnych roszczeń, a następnie usuwana zgodnie z ustalonym harmonogramem. Konkretny okres należy zatwierdzić wraz z pełnymi danymi administratora.'],
      ['7. Twoje prawa', 'Możesz żądać dostępu, sprostowania, usunięcia lub ograniczenia przetwarzania danych, wnieść sprzeciw, a w odpowiednich przypadkach zażądać przeniesienia danych. Możesz też wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych.'],
      ['8. Dobrowolność danych', 'Podanie danych jest dobrowolne, ale pola wymagane są potrzebne, aby odpowiedzieć na zapytanie. Dane nie są wykorzystywane do zautomatyzowanego podejmowania decyzji ani profilowania.'],
    ],
    back: 'Wróć do strony głównej',
  },
  en: {
    title: 'Privacy policy',
    lead: 'Information about data submitted through the form, email and tools used by this website.',
    warning:
      'Draft for preview only. The controller’s complete legal details and a legal review are required before production publication.',
    sections: [
      ['1. Data controller', 'The controller is [COMPLETE: full legal or personal name, address and registration details]. Privacy contact: theorbitospace@gmail.com.'],
      ['2. Data collected', 'The form requires a name, email address, project type and description. Budget and preferred timing are optional. Technical information needed to protect the form, including IP address and request headers, may also be processed.'],
      ['3. Purpose and legal basis', 'Data is used to answer an enquiry, prepare an initial estimate and, where relevant, enter into or perform a contract. Processing is based on steps requested before a contract and the legitimate interest of handling correspondence and protecting the service.'],
      ['4. Providers', 'Messages are handled through Gmail. The service is hosted on Vercel. Once production configuration is enabled, aggregate visit statistics will be handled by Plausible Analytics. Providers process data under their own terms and transfer mechanisms.'],
      ['5. Analytics and cookies', 'Plausible is intended to run without advertising profiles. The website does not require marketing cookies. If that configuration changes, this policy and the consent mechanism must be updated before publication.'],
      ['6. Retention', 'Correspondence is retained as long as needed to handle an enquiry, cooperation and possible claims, then removed under an approved retention schedule. A concrete period must be confirmed together with the controller details.'],
      ['7. Your rights', 'You may request access, correction, deletion or restriction, object to processing and, where applicable, request portability. You may also complain to the competent data protection authority.'],
      ['8. Voluntary submission', 'Providing data is voluntary, but required fields are necessary to answer an enquiry. Data is not used for automated decisions or profiling.'],
    ],
    back: 'Back to the homepage',
  },
} as const;

export default function PrivacyPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const home = locale === 'pl' ? '/' : '/en';

  return (
    <>
      <HtmlLang locale={locale} />
      <SiteHeader locale={locale} />
      <main id="main" className="legal-page">
        <article className="shell legal-page__article">
          <p className="eyebrow">MikeRoe · 25.07.2026</p>
          <h1>{t.title}</h1>
          <p className="legal-page__lead">{t.lead}</p>
          <aside className="legal-warning" role="note">{t.warning}</aside>
          {t.sections.map(([title, body]) => (
            <section key={title}>
              <h2>{title}</h2>
              <p>{body}</p>
            </section>
          ))}
          <Link className="text-link" href={home}>← {t.back}</Link>
        </article>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
