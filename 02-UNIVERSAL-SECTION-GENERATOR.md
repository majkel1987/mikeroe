# Prompt 2: Uniwersalny generator sekcji z Pencil.dev

> Użyj tego prompta ZA KAŻDYM RAZEM gdy chcesz zamienić zaprojektowaną sekcję z Pencil na kod React.  
> Zamień `[PLACEHOLDERY]` na właściwe wartości przed wklejeniem do Antigravity.

---

```
Wygeneruj komponent React dla sekcji [NAZWA_SEKCJI] na podstawie designu z Pencil.

## ŹRÓDŁO DESIGNU
Odczytaj plik `design/landing.pen` przez MCP.
Znajdź frame o nazwie "[NAZWA_FRAME_W_PENCIL]" i wyciągnij z niego:
- Dokładne wartości padding, margin, gap (w px)
- Font family, font-size, font-weight, line-height, letter-spacing
- Kolory (hex) — zmapuj na najbliższą CSS variable z projektu: --bg, --surface, --surface2, --border, --accent1, --accent2, --accent3, --text, --muted
- Border-radius, opacity, backdrop-filter (glassmorphism jeśli obecny)
- Layout: flex/grid, direction, alignment, justify
- Breakpointy responsywne jeśli zdefiniowane w Pencil

## PLIK DOCELOWY
`components/sections/[NAZWA_PLIKU].tsx`
Zastąp istniejący placeholder KOMPLETNĄ implementacją.

## ZASADY GENEROWANIA KODU

### Struktura komponentu:
1. Dyrektywa `'use client'` na górze (wymagana przez Framer Motion)
2. Importy: React, framer-motion (motion, useInView jeśli potrzebny), ScrollReveal, dane z content/*.json
3. Interfejsy TypeScript dla danych (jeśli komponent korzysta z JSON)
4. Eksport domyślny: `export default function [NazwaSekcji]() { ... }`

### Stylizacja — ŚCISŁE REGUŁY:
- TYLKO Tailwind CSS utility classes — ZERO inline styles, ZERO CSS modules
- Mapuj kolory z Pencil na zmienne projektu: `text-text`, `bg-surface`, `border-border`, `text-accent1` itd.
- Mapuj fonty: nagłówki → `font-display`, body → `font-sans`, code/etykiety → `font-mono`
- Jeśli Pencil pokazuje glassmorphism → użyj: `bg-surface/60 backdrop-blur-xl border border-border/50`
- Jeśli Pencil pokazuje gradient → użyj Tailwind gradient utilities (`bg-gradient-to-br from-accent1/10 to-accent2/5`)
- Responsywność: mobile-first, breakpointy `sm:`, `md:`, `lg:`, `xl:`
- Zachowaj DOKŁADNE wartości spacing z Pencil — jeśli Pencil mówi 24px gap, użyj `gap-6` (najbliższy)

### Animacje Framer Motion:
- Każdy blok treści owrapuj w `<ScrollReveal>` lub użyj bezpośrednio `<motion.div>`
- Domyślna animacja wejścia: fade-up (opacity 0→1, y 40→0)
- Elementy listy (karty, ikony): staggered animation z delay 0.1s między elementami
- Hover na kartach: `whileHover={{ y: -4, transition: { duration: 0.2 } }}`
- NIGDY nie używaj animacji które blokują interakcję (np. długie opacity 0 bez pointer-events)

### Dane z JSON:
- Importuj dane: `import projects from '@/content/projects.json'`
- Typuj importowane dane odpowiednim interfejsem
- Renderuj dynamicznie przez `.map()` — NIE hardcoduj treści w JSX

### Semantyczny HTML:
- `<section id="[nazwa]">` jako root element
- Prawidłowa hierarchia nagłówków: H2 dla tytułu sekcji, H3 dla pod-elementów
- Aria labels na interaktywnych elementach
- `<address>` dla danych kontaktowych, `<ul>` dla list

### Obsługa specyficzna per sekcja:

**Jeśli sekcja = Hero:**
- H1 (jedyny na stronie) z dużą typografią display
- CTA button z smooth scroll: `onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}`
- Opcjonalnie: animowany gradient blob w tle (position absolute, z-index -1, blur)

**Jeśli sekcja = Portfolio:**
- Karty z next/image dla screenshotów (placeholder jeśli brak obrazu)
- Badge'e ze stackiem technologicznym
- Linki zewnętrzne (GitHub, Live) z `target="_blank" rel="noopener noreferrer"`

**Jeśli sekcja = Contact:**
- React Hook Form + Zod resolver
- Honeypot field: `<input type="text" name="website" className="hidden" tabIndex={-1} />`
- Submit wywołuje Server Action z `app/actions/contact.ts`
- Stany: idle, loading (spinner), success (zielony komunikat), error (czerwony komunikat)

**Jeśli sekcja = Pricing:**
- Karta "highlighted" ma border-accent1 i subtelne glow (`shadow-accent1/20`)
- Ceny z pricing.json, waluta "zł"
- CTA na każdej karcie → scroll do kontaktu

**Jeśli sekcja = Tech Stack:**
- Angażujący copywriting z pewnym tonem: "Nailing X", "Crushing Y", "Mastering Z"
- Dane ze stanu komponentu lub osobnego JSON — nie z services.json
- Animowane badge'e / pill components

**Jeśli sekcja = Services:**
- Timeline/process layout (numerowane fazy)
- Ikony lub emoji dla każdej fazy
- Dane z services.json

## PO WYGENEROWANIU KODU:
1. Zapisz plik w `components/sections/[NAZWA_PLIKU].tsx`
2. Uruchom `npx tsc --noEmit` — napraw wszystkie błędy TypeScript
3. Uruchom `npm run dev` i otwórz w przeglądarce
4. Porównaj wizualnie z designem w Pencil:
   - Sprawdź spacing (czy gap/padding zgadzają się z Pencil ±4px)
   - Sprawdź kolory (czy mapowanie na CSS variables jest prawidłowe)
   - Sprawdź typografię (font-size, weight, family)
   - Sprawdź responsywność: 375px, 768px, 1440px
5. Jeśli rozbieżność > 4px w jakimkolwiek elemencie — popraw i przetestuj ponownie
6. Git commit: "feat: [nazwa-sekcji] from Pencil design"

## CZEGO NIE ROBIĆ:
- NIE dodawaj nowych zależności npm (wszystko jest już zainstalowane)
- NIE modyfikuj globals.css, tailwind.config.ts ani layout.tsx
- NIE hardcoduj tekstów — bierz z JSON lub definiuj jako const na górze pliku
- NIE używaj Material UI, Chakra, Bootstrap ani żadnych zewnętrznych UI libraries
- NIE twórz oddzielnych plików CSS
- NIE ignoruj wartości z Pencil — jeśli design mówi 16px, nie dawaj 24px "bo ładniej"
```

---

## Jak używać — przykłady:

### Generowanie Hero:
Zamień:
- `[NAZWA_SEKCJI]` → `Hero`
- `[NAZWA_FRAME_W_PENCIL]` → `hero`
- `[NAZWA_PLIKU]` → `HeroSection`

### Generowanie Portfolio:
Zamień:
- `[NAZWA_SEKCJI]` → `Portfolio`
- `[NAZWA_FRAME_W_PENCIL]` → `portfolio`
- `[NAZWA_PLIKU]` → `PortfolioSection`

### Generowanie Contact:
Zamień:
- `[NAZWA_SEKCJI]` → `Contact`
- `[NAZWA_FRAME_W_PENCIL]` → `contact`
- `[NAZWA_PLIKU]` → `ContactSection`

> **Tip:** Możesz generować wiele sekcji naraz wklejając prompt kilka razy z różnymi wartościami, ale lepsze wyniki uzyskasz generując po jednej sekcji i weryfikując ją wizualnie przed przejściem do następnej.
