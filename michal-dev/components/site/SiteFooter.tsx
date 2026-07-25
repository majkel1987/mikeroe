import Link from 'next/link';
import BrandMark from './BrandMark';
import AnalyticsLink from './AnalyticsLink';
import type { Locale } from '@/lib/site-content';

export default function SiteFooter({ locale }: { locale: Locale }) {
  const isPl = locale === 'pl';
  const privacy = isPl ? '/polityka-prywatnosci' : '/en/privacy';

  return (
    <footer className="site-footer">
      <div className="shell site-footer__grid">
        <div>
          <BrandMark light />
          <p>
            {isPl
              ? 'Strony internetowe dla firm usługowych i specjalistów.'
              : 'Websites for service businesses and specialists.'}
          </p>
        </div>
        <nav aria-label={isPl ? 'Usługi w stopce' : 'Footer services'}>
          <Link href={isPl ? '/strony-internetowe-dla-firm' : '/en/websites-for-service-businesses'}>
            {isPl ? 'Strony firmowe' : 'Company websites'}
          </Link>
          <Link href={isPl ? '/landing-page' : '/en/landing-pages'}>Landing page</Link>
          <Link href={isPl ? '/mvp-aplikacje-webowe' : '/en/web-app-mvp'}>
            {isPl ? 'Aplikacje i MVP' : 'Web apps and MVPs'}
          </Link>
          <Link href={isPl ? '/projekty/physioflow' : '/en/work/physioflow'}>Physioflow</Link>
        </nav>
        <div className="site-footer__contact">
          <AnalyticsLink href="mailto:theorbitospace@gmail.com" event="email_click">
            theorbitospace@gmail.com
          </AnalyticsLink>
          <AnalyticsLink
            href="https://www.linkedin.com/in/mike-roe-8598313b7/"
            event="linkedin_click"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </AnalyticsLink>
          <Link href={privacy}>{isPl ? 'Polityka prywatności' : 'Privacy policy'}</Link>
        </div>
      </div>
      <div className="shell site-footer__bottom">
        <span>© 2026 MikeRoe</span>
        <span>{isPl ? 'Projekt · treść · wdrożenie' : 'Strategy · design · development'}</span>
      </div>
    </footer>
  );
}
