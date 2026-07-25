import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import SkipLink from '@/components/SkipLink';
import { fontDMSans, fontSyne } from '@/lib/fonts';

export const metadata: Metadata = {
  metadataBase: new URL('https://mikeroe.pl'),
  title: {
    default: 'Strony internetowe dla firm usługowych | MikeRoe',
    template: '%s | MikeRoe',
  },
  description:
    'Projektowanie i wdrażanie stron internetowych dla firm usługowych i specjalistów. Jasna oferta, indywidualny UX/UI, SEO, analityka i publikacja.',
  applicationName: 'MikeRoe',
  category: 'business',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const plausibleSource = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC;

  return (
    <html lang="pl" className={`${fontSyne.variable} ${fontDMSans.variable}`}>
      <body>
        <SkipLink />
        {children}
        <Script id="plausible-init" strategy="beforeInteractive">
          {`window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}`}
        </Script>
        {plausibleDomain && plausibleSource ? (
          <Script defer data-domain={plausibleDomain} src={plausibleSource} strategy="afterInteractive" />
        ) : null}
      </body>
    </html>
  );
}
