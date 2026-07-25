import Image from 'next/image';
import AnalyticsLink from './AnalyticsLink';
import JsonLd from './JsonLd';
import SiteFooter from './SiteFooter';
import SiteHeader from './SiteHeader';
import HtmlLang from './HtmlLang';
import type { Locale } from '@/lib/site-content';

export default function PhysioflowCaseStudy({ locale }: { locale: Locale }) {
  const isPl = locale === 'pl';
  const home = isPl ? '/' : '/en';
  const path = isPl ? '/projekty/physioflow' : '/en/work/physioflow';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'Physioflow — concept website case study',
    url: `https://mikeroe.pl${path}`,
    creator: { '@type': 'Organization', name: 'MikeRoe' },
    isBasedOn: 'A fictional brief created to demonstrate a service-business website process.',
  };

  return (
    <>
      <HtmlLang locale={locale} />
      <JsonLd data={schema} />
      <SiteHeader locale={locale} />
      <main id="main">
        <section className="case-hero">
          <div className="shell">
            <p className="eyebrow">{isPl ? 'Projekt koncepcyjny · gabinet fizjoterapii' : 'Concept project · physiotherapy practice'}</p>
            <h1>Physioflow</h1>
            <p>
              {isPl
                ? 'Kompletna koncepcja strony, która spokojnie wyjaśnia ofertę specjalisty i prowadzi osobę od pierwszego pytania do kontaktu.'
                : 'A complete website concept that explains a specialist service calmly and guides a visitor from the first question to contact.'}
            </p>
            <div className="case-hero__meta">
              <span>{isPl ? 'Zakres' : 'Scope'}: UX · UI · content · frontend</span>
              <span>{isPl ? 'Status' : 'Status'}: {isPl ? 'koncepcja, nie klient' : 'concept, not client work'}</span>
            </div>
          </div>
        </section>
        <div className="shell case-image">
          <Image
            src="/images/physioflow-concept.webp"
            alt={isPl ? 'Koncepcyjny gabinet Physioflow przygotowany do wizyty' : 'Concept Physioflow practice prepared for an appointment'}
            width={1600}
            height={1067}
            priority
            sizes="100vw"
          />
        </div>
        <section className="section">
          <div className="shell case-study">
            <aside>
              <p className="eyebrow">{isPl ? 'Zasada projektu' : 'Design principle'}</p>
              <blockquote>
                {isPl
                  ? 'Nie obiecuj cudów. Wyjaśnij, komu pomagasz, jak wygląda pierwsza wizyta i co zrobić dalej.'
                  : 'Do not promise miracles. Explain who you help, what the first visit looks like and what to do next.'}
              </blockquote>
            </aside>
            <div className="case-study__chapters">
              <article>
                <span>01</span>
                <h2>{isPl ? 'Problem' : 'Problem'}</h2>
                <p>
                  {isPl
                    ? 'Osoba szukająca fizjoterapeuty często działa pod presją bólu i niepewności. Nie potrzebuje rozbudowanej historii marki, lecz szybkiej odpowiedzi: czy ten gabinet zajmuje się moim problemem, jak wygląda wizyta i jak się umówić.'
                    : 'Someone looking for a physiotherapist is often dealing with pain and uncertainty. They need fast answers: does this practice cover my issue, what happens during a visit and how do I get in touch?'}
                </p>
              </article>
              <article>
                <span>02</span>
                <h2>{isPl ? 'Decyzje UX' : 'UX decisions'}</h2>
                <p>
                  {isPl
                    ? 'Oferta została podzielona według potrzeb odbiorcy, a nie nazw metod. Pierwsza wizyta ma własny, prosty opis. CTA prowadzi do jednego formularza bez wymagania wyboru zabiegu, którego nowy pacjent może nie znać.'
                    : 'The offer is organised around visitor needs rather than treatment names. The first visit has a plain explanation. One CTA leads to a form without requiring a new patient to choose a treatment they may not understand.'}
                </p>
              </article>
              <article>
                <span>03</span>
                <h2>{isPl ? 'Treść i zaufanie' : 'Content and trust'}</h2>
                <p>
                  {isPl
                    ? 'Koncepcja nie używa fikcyjnych opinii, liczby pacjentów ani gwarancji efektu. Zaufanie budują jasny zakres, sposób pracy, kwalifikacje do uzupełnienia prawdziwymi danymi i spokojna prezentacja przestrzeni.'
                    : 'The concept uses no invented testimonials, patient counts or outcome guarantees. Trust comes from clear scope, process, qualifications reserved for real data and a calm presentation of the space.'}
                </p>
              </article>
              <article>
                <span>04</span>
                <h2>{isPl ? 'Rezultat projektowy' : 'Design outcome'}</h2>
                <p>
                  {isPl
                    ? 'Powstał responsywny wzorzec strony dla specjalisty: hero z obietnicą informacyjną, usługi, pierwsza wizyta, proces, FAQ i prosty kontakt. Nie przedstawiamy wyników biznesowych, ponieważ projekt nie był wdrożeniem klienta.'
                    : 'The result is a responsive specialist-site pattern: informative hero, services, first visit, process, FAQ and simple contact. No business outcomes are claimed because this was not a client deployment.'}
                </p>
              </article>
            </div>
          </div>
        </section>
        <section className="final-cta">
          <div className="shell">
            <h2>{isPl ? 'Zobacz koncepcję jako działającą stronę.' : 'See the concept as a working website.'}</h2>
            <AnalyticsLink className="button button--light" href={`${home}/demo/physioflow`.replace('//', '/')} event="portfolio_open" eventProps={{ project: 'physioflow', target: 'demo-case-study' }}>
              {isPl ? 'Otwórz demo' : 'Open demo'}
            </AnalyticsLink>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
