import { Syne, DM_Sans } from 'next/font/google';

// Only load 2 fonts for better performance (saves ~150-200KB)
export const fontSyne = Syne({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-syne',
  display: 'swap',
  preload: true,
});

export const fontDMSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-dm-sans',
  display: 'swap',
  preload: true,
});
