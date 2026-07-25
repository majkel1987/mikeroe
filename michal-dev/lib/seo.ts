import type { Metadata } from 'next';
import type { Locale } from './site-content';

export const siteUrl = 'https://mikeroe.pl';

type MetadataInput = {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  alternatePath: string;
  noIndex?: boolean;
};

export function createMetadata({
  locale,
  title,
  description,
  path,
  alternatePath,
  noIndex = false,
}: MetadataInput): Metadata {
  const canonical = `${siteUrl}${path}`;
  const alternate = `${siteUrl}${alternatePath}`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical,
      languages: {
        pl: locale === 'pl' ? canonical : alternate,
        en: locale === 'en' ? canonical : alternate,
        'x-default': locale === 'pl' ? canonical : alternate,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'pl' ? 'pl_PL' : 'en_US',
      url: canonical,
      siteName: 'MikeRoe',
      title,
      description,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
  };
}

