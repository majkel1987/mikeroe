# Prompt 1: Inicjalizacja projektu

> Wklej ten prompt do Antigravity Agent Manager na samym początku pracy.

---

```
Stwórz kompletny projekt Next.js 14 (App Router) dla portfolio/landing page fullstack developera z Polski. Projekt musi być gotowy do natychmiastowej pracy z Pencil.dev przez MCP.

## STACK TECHNOLOGICZNY
- Next.js 14 z App Router i TypeScript (strict mode)
- Tailwind CSS v3.4+ (konfiguracja dark mode: "class")
- Framer Motion (animacje wejścia sekcji, mikro-interakcje)
- React Hook Form + Zod (walidacja formularza kontaktowego)
- shadcn/ui (tylko Button, Card, Input, Textarea, Badge — nic więcej)
- next-themes (przełącznik dark/light, domyślnie dark)
- @vercel/analytics (opcjonalnie)

## STRUKTURA PLIKÓW — stwórz WSZYSTKIE wymienione pliki:

```
michal-dev/
├── app/
│   ├── layout.tsx          ← RootLayout: fonty (Syne + DM Sans + DM Mono z Google Fonts), ThemeProvider, metadata, JSON-LD schema
│   ├── page.tsx            ← Główna strona — importuje i renderuje WSZYSTKIE sekcje w kolejności
│   ├── globals.css         ← Tailwind directives + custom CSS variables (--bg, --surface, --accent1, --accent2, --accent3, --text, --muted)
│   └── actions/
│       └── contact.ts      ← Server Action: walidacja Zod + wysyłka email (placeholder na Resend API)
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx       ← PLACEHOLDER — pusta sekcja z komentarzem "// Pencil MCP: design/hero"
│   │   ├── ServicesSection.tsx   ← PLACEHOLDER
│   │   ├── PortfolioSection.tsx  ← PLACEHOLDER
│   │   ├── TechStackSection.tsx  ← PLACEHOLDER
│   │   ├── PricingSection.tsx    ← PLACEHOLDER
│   │   └── ContactSection.tsx    ← PLACEHOLDER
│   ├── ui/                       ← shadcn/ui komponenty (zainstaluj przez CLI)
│   ├── ScrollReveal.tsx          ← Wrapper Framer Motion: animacja fade-up przy scroll (IntersectionObserver)
│   └── Navbar.tsx                ← Sticky navbar z glassmorphism (backdrop-blur), smooth scroll do sekcji
├── content/
│   ├── projects.json       ← Tablica projektów: { id, name, role, description, stack[], github, live, image }
│   ├── services.json       ← Tablica usług: { id, phase, title, description, icon }
│   └── pricing.json        ← Tablica pakietów: { id, tier, price, currency, features[], highlighted }
├── design/                 ← Pusty folder na pliki .pen z Pencil.dev
│   └── .gitkeep
├── lib/
│   ├── fonts.ts            ← Konfiguracja next/font/google (Syne, DM Sans, DM Mono)
│   ├── metadata.ts         ← Centralna konfiguracja SEO metadata + Open Graph
│   └── schema.ts           ← JSON-LD: schema Person + ProfessionalService
├── public/
│   ├── og-image.png        ← Placeholder 1200x630 (czarny z tekstem "OG Image")
│   └── favicon.ico
├── tailwind.config.ts      ← Rozszerzenie kolorów o CSS variables, custom fontFamily, custom animation (fade-up, slide-in)
├── next.config.mjs
├── tsconfig.json
├── package.json
└── .env.local.example      ← RESEND_API_KEY=, CONTACT_EMAIL=
```

## CSS VARIABLES (globals.css) — DOKŁADNE WARTOŚCI:
```css
:root {
  --bg: #0a0a0f;
  --surface: #111118;
  --surface2: #18181f;
  --border: #2a2a38;
  --accent1: #7c6bff;
  --accent2: #00d4aa;
  --accent3: #ff6b6b;
  --text: #e8e8f0;
  --muted: #7070a0;
}
```

## TAILWIND CONFIG — mapuj CSS variables:
```ts
colors: {
  bg: 'var(--bg)',
  surface: 'var(--surface)',
  surface2: 'var(--surface2)',
  border: 'var(--border)',
  accent1: 'var(--accent1)',
  accent2: 'var(--accent2)',
  accent3: 'var(--accent3)',
  text: 'var(--text)',
  muted: 'var(--muted)',
},
fontFamily: {
  display: ['var(--font-syne)', 'sans-serif'],
  sans: ['var(--font-dm-sans)', 'sans-serif'],
  mono: ['var(--font-dm-mono)', 'monospace'],
},
```

## SEKCJE PLACEHOLDER — każdy plik w components/sections/ ma wyglądać TAK:
```tsx
// components/sections/HeroSection.tsx
'use client';
import { motion } from 'framer-motion';

// 🎨 PENCIL MCP: Ta sekcja zostanie wygenerowana z design/landing.pen → frame "hero"
// Uruchom prompt generowania sekcji po zaprojektowaniu w Pencil.

export default function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-bg">
      <div className="text-center">
        <p className="text-muted font-mono text-sm">[ Sekcja Hero — oczekuje na design z Pencil ]</p>
      </div>
    </section>
  );
}
```

## SCROLL REVEAL WRAPPER:
```tsx
// components/ScrollReveal.tsx
'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({ children, delay = 0, className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

## CONTENT JSON — wypełnij przykładowymi danymi:

### projects.json (3 projekty):
1. Orbito — SaaS scheduling platform, stack: [Next.js, TypeScript, Tailwind, Supabase], status: "in-progress"
2. PhysioFlow — strona kliniki fizjoterapii, stack: [Next.js, Tailwind, Framer Motion], status: "live"
3. DevBoard — dashboard dla developerów, stack: [React, TypeScript, Chart.js, Node.js], status: "live"

### services.json (5 faz):
1. Discovery — warsztaty i analiza wymagań
2. Design — makiety UI/UX
3. Development — kodowanie frontend + backend
4. SEO & Performance — optymalizacja Core Web Vitals
5. Launch — deploy na produkcję + monitoring

### pricing.json (3 pakiety):
1. Landing Page — od 2000 zł, 1-3 sekcji
2. Strona Firmowa — od 4000 zł, 5-8 sekcji (highlighted: true)
3. MVP / Aplikacja — od 8000 zł, pełny stack

## SERVER ACTION (contact.ts):
- Schema Zod: name (min 2), email (email), message (min 10)
- Honeypot field: ukryte pole "website" — jeśli wypełnione, zwróć sukces bez wysyłki
- Placeholder na Resend: zakomentowany fetch do api.resend.com z TODO
- Zwracaj { success: boolean, errors?: Record<string, string> }

## JSON-LD SCHEMA (schema.ts):
- Typ: Person + ProfessionalService
- name: "Michał" (placeholder)
- jobTitle: "Fullstack Developer"
- url, sameAs (GitHub, LinkedIn placeholders)
- areaServed: "PL"
- serviceType: ["Web Development", "Frontend Development", "Fullstack Development"]

## PO UTWORZENIU:
1. Uruchom `npm install`
2. Uruchom `npm run dev`
3. Otwórz w przeglądarce i sprawdź czy strona się renderuje z placeholder sekcjami
4. Uruchom `npx tsc --noEmit` — zero błędów TypeScript
5. Stwórz git commit: "init: project scaffold with Pencil-ready sections"

WAŻNE:
- NIE generuj gotowych sekcji — tylko placeholdery. Sekcje będą generowane z Pencil.
- Upewnij się, że KAŻDY import działa i nie ma błędów.
- Użyj 'use client' TYLKO tam gdzie jest Framer Motion lub interaktywność.
- Layout.tsx ma być Server Component (bez 'use client').
```
