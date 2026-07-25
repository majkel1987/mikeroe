import Link from 'next/link';
import BrandMark from './BrandMark';
import AnalyticsLink from './AnalyticsLink';
import type { Locale } from '@/lib/site-content';
import { siteContent } from '@/lib/site-content';

export default function SiteHeader({ locale }: { locale: Locale }) {
  const content = siteContent[locale];
  const home = locale === 'pl' ? '/' : '/en';
  const contact = `${home === '/' ? '' : home}#contact`;

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link href={home} aria-label={locale === 'pl' ? 'MikeRoe — strona główna' : 'MikeRoe — home'}>
          <BrandMark />
        </Link>

        <nav className="desktop-nav" aria-label={locale === 'pl' ? 'Główna nawigacja' : 'Main navigation'}>
          {content.navigation.map((item) => (
            <Link key={item.href} href={`${home === '/' ? '' : home}${item.href}`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <Link className="language-link" href={content.alternateHref} hrefLang={locale === 'pl' ? 'en' : 'pl'}>
            {content.alternateLabel}
          </Link>
          <AnalyticsLink className="button button--small" href={contact} event="cta_primary_click" eventProps={{ location: 'header' }}>
            {locale === 'pl' ? 'Wstępna wycena' : 'Initial estimate'}
          </AnalyticsLink>
        </div>

        <details className="mobile-menu">
          <summary aria-label={locale === 'pl' ? 'Otwórz menu' : 'Open menu'}>
            <span />
            <span />
          </summary>
          <nav aria-label={locale === 'pl' ? 'Nawigacja mobilna' : 'Mobile navigation'}>
            {content.navigation.map((item) => (
              <Link key={item.href} href={`${home === '/' ? '' : home}${item.href}`}>
                {item.label}
              </Link>
            ))}
            <Link href={content.alternateHref}>{content.alternateLabel}</Link>
            <AnalyticsLink className="button" href={contact} event="cta_primary_click" eventProps={{ location: 'mobile_menu' }}>
              {locale === 'pl' ? 'Otrzymaj wycenę' : 'Get an estimate'}
            </AnalyticsLink>
          </nav>
        </details>
      </div>
    </header>
  );
}

