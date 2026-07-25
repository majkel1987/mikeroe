import Link from 'next/link';
import AnalyticsLink from './AnalyticsLink';
import JsonLd from './JsonLd';
import SiteFooter from './SiteFooter';
import SiteHeader from './SiteHeader';
import HtmlLang from './HtmlLang';
import { servicePages, type Locale, type ServiceKey } from '@/lib/site-content';

const siteUrl = 'https://mikeroe.pl';

export default function ServicePage({ locale, service }: { locale: Locale; service: ServiceKey }) {
  const t = servicePages[locale][service];
  const isPl = locale === 'pl';
  const home = isPl ? '/' : '/en';
  const currentPath =
    service === 'websites'
      ? isPl ? '/strony-internetowe-dla-firm' : '/en/websites-for-service-businesses'
      : service === 'landing'
        ? isPl ? '/landing-page' : '/en/landing-pages'
        : isPl ? '/mvp-aplikacje-webowe' : '/en/web-app-mvp';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: t.eyebrow,
        description: t.description,
        provider: { '@type': 'ProfessionalService', name: 'MikeRoe', url: siteUrl },
        areaServed: { '@type': 'Country', name: 'Poland' },
        url: `${siteUrl}${currentPath}`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: isPl ? 'Strona główna' : 'Home', item: `${siteUrl}${home === '/' ? '' : home}` },
          { '@type': 'ListItem', position: 2, name: t.eyebrow, item: `${siteUrl}${currentPath}` },
        ],
      },
    ],
  };

  return (
    <>
      <HtmlLang locale={locale} />
      <JsonLd data={schema} />
      <SiteHeader locale={locale} />
      <main id="main">
        <section className="subhero">
          <div className="shell subhero__grid">
            <div>
              <p className="eyebrow">{t.eyebrow}</p>
              <h1>{t.title}</h1>
            </div>
            <div>
              <p>{t.description}</p>
              <AnalyticsLink className="button" href={`${home}#contact`} event="cta_primary_click" eventProps={{ location: `service_${service}` }}>
                {t.cta}
              </AnalyticsLink>
            </div>
          </div>
        </section>
        <section className="section section--tint">
          <div className="shell service-outcome">
            <p className="eyebrow">{isPl ? 'Co otrzymujesz' : 'What you receive'}</p>
            <h2>{t.outcome}</h2>
          </div>
        </section>
        <section className="section">
          <div className="shell service-sections">
            {t.sections.map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1}</span>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="final-cta">
          <div className="shell">
            <h2>{isPl ? 'Zacznijmy od krótkiego opisu potrzeby.' : 'Start with a short description of the need.'}</h2>
            <AnalyticsLink className="button button--light" href={`${home}#contact`} event="cta_primary_click" eventProps={{ location: `service_final_${service}` }}>
              {t.cta}
            </AnalyticsLink>
            <Link className="text-link text-link--light" href={home}>{isPl ? 'Wróć na stronę główną' : 'Back to home'} →</Link>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
