import Image from 'next/image';
import Link from 'next/link';
import AnalyticsLink from './AnalyticsLink';
import ContactForm from './ContactForm';
import JsonLd from './JsonLd';
import PricingTracker from './PricingTracker';
import SiteFooter from './SiteFooter';
import SiteHeader from './SiteHeader';
import HtmlLang from './HtmlLang';
import { localePath, siteContent, type Locale } from '@/lib/site-content';

const siteUrl = 'https://mikeroe.pl';

export default function MarketingPage({ locale }: { locale: Locale }) {
  const t = siteContent[locale];
  const isPl = locale === 'pl';
  const ids = isPl
    ? { offer: 'oferta', projects: 'projekty', process: 'proces' }
    : { offer: 'services', projects: 'work', process: 'process' };
  const contactHref = '#contact';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'MikeRoe',
        inLanguage: isPl ? 'pl-PL' : 'en',
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${siteUrl}/#service`,
        name: 'MikeRoe',
        url: isPl ? siteUrl : `${siteUrl}/en`,
        areaServed: { '@type': 'Country', name: 'Poland' },
        email: 'theorbitospace@gmail.com',
        description: isPl
          ? 'Projektowanie i wdrażanie stron internetowych dla firm usługowych i specjalistów.'
          : 'Website strategy, design and development for service businesses and specialists.',
        serviceType: isPl
          ? ['Strony internetowe dla firm', 'Landing page', 'Aplikacje webowe i MVP']
          : ['Company websites', 'Landing pages', 'Web applications and MVPs'],
      },
    ],
  };

  return (
    <>
      <HtmlLang locale={locale} />
      <JsonLd data={schema} />
      <SiteHeader locale={locale} />
      <main id="main">
        <section className="hero">
          <div className="shell hero__grid">
            <div className="hero__copy">
              <p className="eyebrow">{t.hero.eyebrow}</p>
              <h1>{t.hero.title}</h1>
              <p className="hero__description">{t.hero.description}</p>
              <div className="hero__actions">
                <AnalyticsLink className="button" href={contactHref} event="cta_primary_click" eventProps={{ location: 'hero' }}>
                  {t.hero.primary}
                </AnalyticsLink>
                <AnalyticsLink
                  className="text-link"
                  href={`#${ids.projects}`}
                  event="portfolio_open"
                  eventProps={{ location: 'hero' }}
                >
                  {t.hero.secondary} <span aria-hidden="true">↘</span>
                </AnalyticsLink>
              </div>
              <p className="hero__note">{t.hero.note}</p>
            </div>
            <figure className="hero__visual">
              <Image
                src="/images/mikeroe-hero.webp"
                alt={
                  isPl
                    ? 'Editorialna kompozycja pokazująca drogę od materiałów firmy do uporządkowanej strony'
                    : 'Editorial composition showing a path from business materials to a structured website'
                }
                width={1800}
                height={1013}
                priority
                sizes="(max-width: 900px) 100vw, 52vw"
              />
              <figcaption>
                <span>01</span>
                {isPl ? 'Od niejasnej oferty do czytelnej decyzji' : 'From a confusing offer to a clear decision'}
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="section section--border" aria-labelledby="problems-heading">
          <div className="shell">
            <div className="section-heading">
              <p className="eyebrow">{t.problems.eyebrow}</p>
              <h2 id="problems-heading">{t.problems.title}</h2>
              <p>{t.problems.intro}</p>
            </div>
            <div className="problem-list">
              {t.problems.items.map(([title, body], index) => (
                <article key={title}>
                  <span>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--tint" id={ids.offer} aria-labelledby="offer-heading">
          <PricingTracker />
          <div className="shell">
            <div className="section-heading section-heading--split">
              <div>
                <p className="eyebrow">{t.offer.eyebrow}</p>
                <h2 id="offer-heading">{t.offer.title}</h2>
              </div>
              <p>{t.offer.intro}</p>
            </div>

            <div className="package-list">
              {t.packages.map((item, index) => {
                const serviceHref =
                  item.id === 'landing'
                    ? localePath(locale, '/landing-page', '/landing-pages')
                    : item.id === 'website'
                      ? localePath(locale, '/strony-internetowe-dla-firm', '/websites-for-service-businesses')
                      : localePath(locale, '/mvp-aplikacje-webowe', '/web-app-mvp');
                return (
                  <article className={item.featured ? 'package package--featured' : 'package'} key={item.id}>
                    <div className="package__number">0{index + 1}</div>
                    <div className="package__intro">
                      {item.featured && <span className="package__flag">{isPl ? 'Rekomendowany' : 'Recommended'}</span>}
                      <h3>{item.name}</h3>
                      <p>{item.forWhom}</p>
                    </div>
                    <div className="package__price">
                      <strong>{item.price}</strong>
                      <span>{item.timeframe}</span>
                    </div>
                    <div className="package__detail">
                      <p>{item.result}</p>
                      <ul>
                        {item.features.map((feature) => <li key={feature}>{feature}</li>)}
                      </ul>
                      <p className="package__meta">{item.revisions} · {item.support}</p>
                    </div>
                    <div className="package__actions">
                      <AnalyticsLink
                        className="button button--outline"
                        href={contactHref}
                        event="package_select"
                        eventProps={{ package: item.id }}
                      >
                        {isPl ? 'Zapytaj o zakres' : 'Ask about scope'}
                      </AnalyticsLink>
                      <Link className="text-link" href={serviceHref}>
                        {isPl ? 'Pełny opis' : 'Full details'} <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="addons">
              <p className="eyebrow">{isPl ? 'Dodatki' : 'Add-ons'}</p>
              <ul>
                {(isPl
                  ? ['CMS od 1 500 zł', 'pełny copywriting od 1 500 zł', 'dodatkowa podstrona od 700 zł', 'identyfikacja od 1 500 zł', 'rozszerzone SEO od 1 500 zł', 'integracje od 500 zł', 'opieka od 300 zł / mies.', 'termin priorytetowy +30%']
                  : ['CMS from PLN 1,500', 'full copywriting from PLN 1,500', 'extra page from PLN 700', 'visual identity from PLN 1,500', 'extended SEO from PLN 1,500', 'integrations from PLN 500', 'care from PLN 300 / month', 'priority delivery +30%']
                ).map((addon) => <li key={addon}>{addon}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="section" id={ids.projects} aria-labelledby="projects-heading">
          <div className="shell">
            <div className="section-heading">
              <p className="eyebrow">{t.projects.eyebrow}</p>
              <h2 id="projects-heading">{t.projects.title}</h2>
              <p>{t.projects.intro}</p>
            </div>

            <article className="featured-project">
              <div className="featured-project__image">
                <Image
                  src="/images/physioflow-concept.webp"
                  alt={isPl ? 'Koncepcyjne zdjęcie gabinetu fizjoterapii Physioflow' : 'Concept image for the Physioflow physiotherapy practice'}
                  width={1600}
                  height={1067}
                  sizes="(max-width: 900px) 100vw, 58vw"
                />
                <span>{t.projectsData[0].label}</span>
              </div>
              <div className="featured-project__copy">
                <p className="eyebrow">{t.projectsData[0].businessType}</p>
                <h3>Physioflow</h3>
                <p>{t.projectsData[0].problem}</p>
                <dl>
                  <div>
                    <dt>{isPl ? 'Rozwiązanie' : 'Solution'}</dt>
                    <dd>{t.projectsData[0].solution}</dd>
                  </div>
                  <div>
                    <dt>{isPl ? 'Rezultat projektowy' : 'Design outcome'}</dt>
                    <dd>{t.projectsData[0].outcome}</dd>
                  </div>
                </dl>
                <div className="featured-project__links">
                  <AnalyticsLink
                    className="button"
                    href={localePath(locale, '/projekty/physioflow', '/work/physioflow')}
                    event="portfolio_open"
                    eventProps={{ project: 'physioflow', target: 'case-study' }}
                  >
                    {isPl ? 'Zobacz case study' : 'View case study'}
                  </AnalyticsLink>
                  <AnalyticsLink
                    className="text-link"
                    href={localePath(locale, '/demo/physioflow', '/demo/physioflow')}
                    event="portfolio_open"
                    eventProps={{ project: 'physioflow', target: 'demo' }}
                  >
                    {isPl ? 'Otwórz demo' : 'Open demo'} <span aria-hidden="true">↗</span>
                  </AnalyticsLink>
                </div>
              </div>
            </article>

            <div className="project-grid">
              {t.projectsData.slice(1).map((project) => (
                <article key={project.slug}>
                  <div className="project-grid__image">
                    <Image src={project.image} alt={`${project.name} — ${project.label}`} fill sizes="(max-width: 700px) 100vw, 33vw" />
                  </div>
                  <span>{project.label}</span>
                  <h3>{project.name}</h3>
                  <p>{project.outcome}</p>
                  {project.externalUrl ? (
                    <AnalyticsLink
                      className="text-link"
                      href={project.externalUrl}
                      event="portfolio_open"
                      eventProps={{ project: project.slug, target: 'external' }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {isPl ? 'Zobacz koncepcję' : 'View concept'} <span aria-hidden="true">↗</span>
                    </AnalyticsLink>
                  ) : (
                    <small>{isPl ? 'Publiczne demo niedostępne' : 'Public demo unavailable'}</small>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--ink" id={ids.process} aria-labelledby="process-heading">
          <div className="shell">
            <div className="section-heading">
              <p className="eyebrow">{t.process.eyebrow}</p>
              <h2 id="process-heading">{t.process.title}</h2>
            </div>
            <ol className="process-list">
              {t.process.steps.map(([number, title, body]) => (
                <li key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" aria-labelledby="trust-heading">
          <div className="shell trust">
            <div className="trust__mark" aria-hidden="true">MR</div>
            <div>
              <p className="eyebrow">{t.trust.eyebrow}</p>
              <h2 id="trust-heading">{t.trust.title}</h2>
              <p>{t.trust.body}</p>
              <ul>{t.trust.points.map((point) => <li key={point}>{point}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className="section section--tint" id="faq" aria-labelledby="faq-heading">
          <div className="shell faq-layout">
            <div className="section-heading">
              <p className="eyebrow">FAQ</p>
              <h2 id="faq-heading">{t.faqTitle}</h2>
            </div>
            <div className="faq-list">
              {t.faqs.map(([question, answer], index) => (
                <article key={question}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{question}</h3>
                    <p>{answer}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact" id="contact" aria-labelledby="contact-heading">
          <div className="shell contact__grid">
            <div>
              <p className="eyebrow">{t.contact.eyebrow}</p>
              <h2 id="contact-heading">{t.contact.title}</h2>
              <p>{t.contact.description}</p>
              <div className="contact__direct">
                <span>{isPl ? 'Wolisz e-mail?' : 'Prefer email?'}</span>
                <AnalyticsLink href="mailto:theorbitospace@gmail.com" event="email_click">
                  theorbitospace@gmail.com
                </AnalyticsLink>
              </div>
            </div>
            <ContactForm locale={locale} />
          </div>
        </section>

        <section className="final-cta">
          <div className="shell">
            <h2>{t.finalCta.title}</h2>
            <AnalyticsLink className="button button--light" href={contactHref} event="cta_primary_click" eventProps={{ location: 'final_cta' }}>
              {t.finalCta.button}
            </AnalyticsLink>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
