'use client';

import { useLanguage } from '@/lib/LanguageContext';

export default function SkipLink() {
  const { lang } = useLanguage();
  const text = lang === 'en' ? 'Skip to content' : 'Przejdź do treści';

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent1 focus:text-white focus:rounded-lg focus:outline-none"
    >
      {text}
    </a>
  );
}
