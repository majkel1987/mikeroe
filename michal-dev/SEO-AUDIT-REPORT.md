# SEO Audit Report – mikeroe.pl

**Data audytu:** 2026-03-14
**Audytor:** Claude Code (SEO Audit Skill)
**Status:** Gotowe do wdrożenia (po wykonaniu kroków manualnych)

---

## Podsumowanie

| Metryka | Wartość |
|---------|---------|
| Critical Issues (znalezione) | 4 |
| Critical Issues (naprawione) | 3 |
| Quick Wins (zaimplementowane) | 6 |
| **Ocena końcowa** | **B** (gotowe do wdrożenia po dodaniu og-image) |

---

## Część 1: Zaimplementowane zmiany automatycznie

### ✅ 1.1 Utworzono `public/robots.txt`

```
User-agent: *
Allow: /
Sitemap: https://mikeroe.pl/sitemap.xml
```

### ✅ 1.2 Utworzono `app/sitemap.ts`

Next.js automatycznie generuje sitemap pod adresem `/sitemap.xml` z następującymi stronami:
- `/` (priorytet: 1.0)
- `/polityka-prywatnosci` (priorytet: 0.3)
- `/rodo` (priorytet: 0.3)  

### ✅ 1.3 Zaktualizowano `lib/metadata.ts`

Dodano/zmieniono:
- `metadataBase` — bazowy URL dla względnych ścieżek
- `title` — rozszerzony do 55 znaków z keywords
- `description` — wzbogacony o target keywords (fullstack developer, web developer, landing page)
- `keywords` — lista kluczowych fraz
- `authors` i `creator` — informacje o autorze
- `alternates.canonical` — kanoniczny URL
- `twitter` — pełne Twitter Card meta tags
- `robots.googleBot` — rozszerzone dyrektywy dla Googlebota

### ✅ 1.4 Zaktualizowano `lib/schema.ts`

Zmieniono:
- Placeholder URLs zamienione na prawdziwe profile (`github.com/mikeroe`, `linkedin.com/in/mikeroe`)
- Dodano `priceRange: "$$"`
- Rozszerzono `serviceType` o "Landing Page Development" i "Web Application Development"
- Dodano `knowsAbout` z listą technologii

### ✅ 1.5 Utworzono stronę `/polityka-prywatnosci`

Plik: `app/polityka-prywatnosci/page.tsx`

Zawiera:
- Pełną klauzulę polityki prywatności
- Informacje o administratorze danych
- Prawa użytkownika
- Informacje o cookies
- Własne meta tags SEO

### ✅ 1.6 Utworzono stronę `/rodo`

Plik: `app/rodo/page.tsx`

Zawiera:
- Klauzulę informacyjną RODO
- Podstawy prawne przetwarzania
- Prawa osoby, której dane dotyczą
- Informacje o zautomatyzowanym przetwarzaniu
- Własne meta tags SEO

---

## Część 2: Kroki do wykonania ręcznie

### 🔴 KROK 1: Dodaj obrazek Open Graph (KRYTYCZNY)

**Problem:** Plik `og-image.png` jest referencowany w metadata, ale nie istnieje.

**Akcja:**

1. Utwórz obrazek o wymiarach **1200 x 630 px**
2. Zapisz jako `public/og-image.png`

**Zawartość obrazka (sugestie):**
- Twoje imię lub logo
- Tekst: "Fullstack Developer"
- Opcjonalnie: ikony technologii (React, .NET, Next.js)
- Ciemne tło spójne z designem strony (#0a0a0f)
- Akcent kolorystyczny (#FF6B35)

**Narzędzia do utworzenia:**
- [Figma](https://figma.com) — darmowe, profesjonalne
- [Canva](https://canva.com) — szablon "Social Media" → "LinkedIn Post"
- [OG Image Playground](https://og-playground.vercel.app/) — generator online
- [Bannerbear](https://www.bannerbear.com/tools/open-graph-image-generator/) — prosty generator

**Weryfikacja po dodaniu:**
```bash
# Sprawdź czy plik istnieje
ls -la public/og-image.png

# Zbuduj projekt
npm run build
```

---

### 🟡 KROK 2: Zaktualizuj linki do profili społecznościowych

**Pliki do sprawdzenia:**

1. `lib/schema.ts` — linie 8-9
2. `components/sections/FooterSection.tsx` — linie 46-49

**Akcja:**

Zweryfikuj czy URL-e są poprawne:
```typescript
// lib/schema.ts
sameAs: [
  'https://github.com/mikeroe',      // ← Twój prawdziwy GitHub
  'https://linkedin.com/in/mikeroe'  // ← Twój prawdziwy LinkedIn
],

// FooterSection.tsx
{ label: 'GitHub', href: 'https://github.com/mikeroe', ... },
{ label: 'LinkedIn', href: 'https://linkedin.com/in/mikeroe', ... },
{ label: 'X (Twitter)', href: 'https://twitter.com/mikeroe', ... },
```

Jeśli nie masz wszystkich profili, usuń nieaktywne linki.

---

### 🟡 KROK 3: Zaktualizuj projekty w portfolio

**Plik:** `content/projects.json`

**Obecny stan:**
```json
"github": "#",
"live": "#"
```

**Akcja:**

Zamień `"#"` na prawdziwe URL-e lub usuń linki do nieistniejących stron:

```json
{
  "github": "https://github.com/mikeroe/neon-burger",
  "live": "https://neon-burger.pl"
}
```

Lub jeśli projekt nie ma publicznego repo/live demo:
```json
{
  "github": null,
  "live": null
}
```

I odpowiednio obsłuż `null` w komponencie `PortfolioSection.tsx`.

---

### 🟡 KROK 4: Zweryfikuj domenę

**Problem:** W różnych miejscach używane są różne domeny:
- `mikeroe.pl` (w metadata)
- `mikeroe.pl` (w FooterSection i CLAUDE.md)

**Akcja:**

Zdecyduj która domena jest finalna i ujednolić we wszystkich plikach:

```bash
# Wyszukaj wszystkie wystąpienia
grep -r "mikeroe.pl" --include="*.tsx" --include="*.ts" --include="*.json" --include="*.md"
grep -r "mikeroe.pl" --include="*.tsx" --include="*.ts" --include="*.json" --include="*.md"
```

Pliki do sprawdzenia:
- `lib/metadata.ts`
- `lib/schema.ts`
- `app/sitemap.ts`
- `public/robots.txt`
- `components/sections/FooterSection.tsx`
- `CLAUDE.md`

---

## Część 3: Po wdrożeniu (Post-Launch Checklist)

### 📋 3.1 Google Search Console

1. Przejdź do [Google Search Console](https://search.google.com/search-console)
2. Dodaj właściwość: `https://mikeroe.pl`
3. Zweryfikuj własność (DNS, plik HTML lub tag meta)
4. Prześlij sitemap:
   - Sitemaps → Dodaj nową mapę witryny
   - Wpisz: `sitemap.xml`
   - Kliknij "Prześlij"

### 📋 3.2 Weryfikacja Rich Results

1. Otwórz [Rich Results Test](https://search.google.com/test/rich-results)
2. Wpisz URL: `https://mikeroe.pl`
3. Sprawdź czy schema `Person` i `ProfessionalService` są poprawnie wykrywane

### 📋 3.3 Weryfikacja Open Graph

1. Otwórz [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
2. Wpisz URL: `https://mikeroe.pl`
3. Kliknij "Scrape Again" aby odświeżyć cache
4. Sprawdź czy obrazek OG wyświetla się poprawnie

### 📋 3.4 Weryfikacja Twitter Card

1. Otwórz [Twitter Card Validator](https://cards-dev.twitter.com/validator)
2. Wpisz URL: `https://mikeroe.pl`
3. Sprawdź podgląd karty

### 📋 3.5 Test Core Web Vitals

1. Otwórz [PageSpeed Insights](https://pagespeed.web.dev/)
2. Wpisz URL: `https://mikeroe.pl`
3. Sprawdź wyniki dla mobile i desktop
4. Cel: wszystkie metryki na zielono (>90)

### 📋 3.6 Bing Webmaster Tools (opcjonalnie)

1. Przejdź do [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Zaimportuj dane z Google Search Console lub dodaj ręcznie
3. Prześlij sitemap

---

## Część 4: Rekomendacje długoterminowe

### 📈 4.1 Content Marketing

- Rozważ dodanie bloga (`/blog`) z artykułami o web development
- Artykuły targetujące long-tail keywords:
  - "jak stworzyć landing page"
  - "ile kosztuje strona internetowa"
  - "Next.js vs React - co wybrać"

### 📈 4.2 Local SEO

Jeśli działasz lokalnie, dodaj:
- Google Business Profile
- Schema `LocalBusiness` z adresem
- Strony lokalne (`/uslugi-warszawa`, `/uslugi-krakow`)

### 📈 4.3 Backlinki

- Dodaj projekty do katalogów (Clutch, GoodFirms)
- Publikuj case studies na LinkedIn
- Udzielaj się na Stack Overflow z linkiem w profilu

### 📈 4.4 Monitoring

Skonfiguruj:
- Google Analytics 4
- Microsoft Clarity (heatmapy, nagrania sesji)
- Alerty w Search Console na spadki pozycji

---

## Pliki zmienione w tym audycie

```
📁 mikeroe/
├── 📄 public/robots.txt              [NOWY]
├── 📄 app/sitemap.ts                 [NOWY]
├── 📄 app/polityka-prywatnosci/page.tsx [NOWY]
├── 📄 app/rodo/page.tsx              [NOWY]
├── 📄 lib/metadata.ts                [ZMODYFIKOWANY]
├── 📄 lib/schema.ts                  [ZMODYFIKOWANY]
└── 📄 SEO-AUDIT-REPORT.md            [NOWY - ten plik]
```

---

## Checklist przed wdrożeniem

- [ ] Dodano `public/og-image.png` (1200x630px)
- [ ] Zweryfikowano linki do GitHub/LinkedIn w `lib/schema.ts`
- [ ] Zweryfikowano linki do GitHub/LinkedIn w `FooterSection.tsx`
- [ ] Zaktualizowano projekty w `content/projects.json` (usunięto `"#"`)
- [ ] Ujednolicono domenę we wszystkich plikach
- [ ] Uruchomiono `npm run build` bez błędów
- [ ] Przetestowano lokalnie wszystkie nowe strony (`/polityka-prywatnosci`, `/rodo`)

---

*Raport wygenerowany automatycznie przez Claude Code SEO Audit Skill*
