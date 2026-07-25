import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mikeroe.pl';

  const updated = new Date('2026-07-25');
  const routes = [
    ['', 1],
    ['/strony-internetowe-dla-firm', 0.9],
    ['/landing-page', 0.85],
    ['/mvp-aplikacje-webowe', 0.7],
    ['/projekty/physioflow', 0.8],
    ['/en', 0.7],
    ['/en/websites-for-service-businesses', 0.65],
    ['/en/landing-pages', 0.65],
    ['/en/web-app-mvp', 0.55],
    ['/en/work/physioflow', 0.6],
  ] as const;

  return routes.map(([route, priority]) => ({
    url: `${baseUrl}${route}`,
    lastModified: updated,
    changeFrequency: 'monthly',
    priority,
  }));
}
