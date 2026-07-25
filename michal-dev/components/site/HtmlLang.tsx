'use client';

import { useEffect } from 'react';
import type { Locale } from '@/lib/site-content';

export default function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    return () => {
      document.documentElement.lang = 'pl';
    };
  }, [locale]);

  return null;
}
