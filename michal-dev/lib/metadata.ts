import type { Metadata } from 'next';

const siteUrl = 'https://mikeroe.pl';

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'MikeRoe | Fullstack Developer – Landing Pages & Aplikacje Webowe',
  description: 'Fullstack Developer & Web Developer specjalizujący się w tworzeniu landing pages, aplikacji webowych i stron firmowych. Next.js, React, C#, .NET. Zamień swój pomysł w działający produkt.',
  keywords: ['fullstack developer', 'web developer', 'landing page', 'aplikacje webowe', 'Next.js', 'React', '.NET', 'strony internetowe'],
  authors: [{ name: 'MikeRoe', url: siteUrl }],
  creator: 'MikeRoe',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MikeRoe | Fullstack Developer – Landing Pages & Aplikacje Webowe',
    description: 'Fullstack Developer specjalizujący się w tworzeniu nowoczesnych i skalowalnych aplikacji webowych, landing pages i stron firmowych.',
    url: siteUrl,
    siteName: 'MikeRoe Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MikeRoe | Fullstack Developer – Portfolio',
      },
    ],
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MikeRoe | Fullstack Developer',
    description: 'Fullstack Developer specjalizujący się w tworzeniu landing pages, aplikacji webowych i stron firmowych.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
