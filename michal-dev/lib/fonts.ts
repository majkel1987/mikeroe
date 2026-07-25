import localFont from 'next/font/local';

export const fontSyne = localFont({
  src: [
    {
      path: '../node_modules/@fontsource-variable/syne/files/syne-latin-wght-normal.woff2',
      weight: '400 800',
      style: 'normal',
    },
    {
      path: '../node_modules/@fontsource-variable/syne/files/syne-latin-ext-wght-normal.woff2',
      weight: '400 800',
      style: 'normal',
    },
  ],
  variable: '--font-syne',
  display: 'optional',
  preload: false,
});

export const fontDMSans = localFont({
  src: [
    {
      path: '../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2',
      weight: '100 1000',
      style: 'normal',
    },
    {
      path: '../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-ext-wght-normal.woff2',
      weight: '100 1000',
      style: 'normal',
    },
  ],
  variable: '--font-dm-sans',
  display: 'swap',
  preload: true,
});
