import './globals.css';
import { fontSyne, fontDMSans } from '@/lib/fonts';
import { siteMetadata } from '@/lib/metadata';
import { jsonLdSchema } from '@/lib/schema';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/sections/FooterSection';
import AnimatedBackground from '@/components/ui/animated-background';
import { LanguageProvider } from '@/lib/LanguageContext';

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" suppressHydrationWarning className={`${fontSyne.variable} ${fontDMSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="antialiased font-sans min-h-screen bg-bg text-text selection:bg-accent1 selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LanguageProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent1 focus:text-white focus:rounded-lg focus:outline-none"
            >
              Przejdź do treści
            </a>
            <Navbar />
            <AnimatedBackground />
            {children}
            <FooterSection />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
