# 🔧 ANTIGRAVITY PROMPT — Tech Stack Section Redesign

> **Tryb pracy: UI/UX PRO MAX**
> Zanim napiszesz JEDNĄ linijkę kodu, musisz przejść pełny proces projektowy opisany poniżej. Nie generuj kodu "na ślepo". Twój output ma wyglądać jak zaprojektowany przez Senior UI/UX Designera z 10-letnim doświadczeniem w portfolio sites, NIE jak wygenerowany przez AI.

---

## 🎯 KONTEKST PROJEKTU

Budujesz sekcję **Tech Stack** dla landing page'a fullstack developera z Polski. Strona to dark-mode premium portfolio w stylu "Productized Service" — sprzedaje usługi, nie tylko pokazuje kod.

**Obecny problem:** Sekcja wygląda jak flat lista z kolorowymi kropkami i badge'ami — bardziej jak panel administracyjny niż sekcja premium portfolio. Brakuje głębi wizualnej, hierarchii, i "wow factor".

---

## 📐 FAZA 1: DESIGN THINKING (wykonaj ZANIM zaczniesz kodować)

Odpowiedz sobie na te pytania i zapisz odpowiedzi jako komentarz na górze pliku:

1. **Cel sekcji**: Pokazać, że developer nie jest "kolejnym juniorem z listą ikon" — jest pewnym siebie profesjonalistą, który zna swoje narzędzia na wylot.
2. **Ton wizualny**: Premium dark, editorial quality. Pomyśl: Stripe docs meets Linear.app meets Raycast — czyste, ale z charakterem.
3. **Co sprawia, że zapamiętam tę sekcję?** — Musi być jeden element "hero" wizualny, który wyróżnia tę sekcję od standardowej listy technologii.
4. **Anty-wzorce (CZEGO NIE ROBIĆ)**:
   - ❌ Flat lista z kropkami i badge'ami (to mamy teraz — jest słabe)
   - ❌ Grid ikon technologii (każdy junior to ma)
   - ❌ Proste tabelki / rows bez depth
   - ❌ Kolorowe neonowe badge'e wyglądające jak z gry
   - ❌ Identyczne karty w rzędzie — nudne i przewidywalne

---

## 🧩 FAZA 2: LAYOUT I KONCEPT

### Struktura sekcji:

```
[ SECTION LABEL ] ─────────────────── [ linia ]
[ Headline — Syne, italic, 28-32px ]
[ Subline — DM Sans, muted, 1 linia ]

[ 3 CATEGORY BLOCKS: Frontend / Backend / Tooling ]

[ CTA glassmorphism bar ]
```

### Koncept wizualny — "Confident Stack Cards"

Zamiast flat listy, każda kategoria (Frontend, Backend, Tooling) to **wizualnie odrębny blok** z:

- **Category header** z monospace labelem i subtle accent line
- **Tech items** jako karty lub segmenty z wyraźną hierarchią:
  - **Nazwa technologii** — bold, duża, czytelna
  - **Tagline** — personality-driven opis (dane poniżej)
  - **Proficiency indicator** — NIE kolorowy badge, ale elegancki wskaźnik (np. subtle bar, dot scale, lub typograficzny label jak "daily driver" w stylu monospace subdued)
- **Depth i layering** — użyj `bg-[#111118]` kart z subtle border, hover glow, i glassmorphism elementów

### Pomysły na "wow factor" (wybierz JEDEN i zrób go dobrze):

**Opcja A — "Stacked Cards"**: Każda technologia to mini-karta z subtle hover lift (`translateY(-2px)`) i glow border na hover. Karty ułożone w masonry-like grid (2 kolumny desktop, 1 mobile).

**Opcja B — "Editorial Rows with Accent"**: Rows jak w obecnym designie, ALE z wyraźnym lewym accent barem per kategoria, większą typografią nazw, i tagline jako second line (nie inline). Badge zamieniony na subtle monospace label po prawej. Na hover — subtle background reveal.

**Opcja C — "Interactive Orbit / Cluster"**: Wizualna mapa technologii pogrupowana w klastry. Frontend na lewo, Backend na prawo, Tooling na dole. Linie łączące related tech. (Uwaga: to najbardziej zaawansowane wizualnie).

**Opcja D — "Magazine Spread"**: Każda kategoria to full-width blok z innym subtle tłem. W środku tech items ułożone w 2-kolumnowy layout z dużymi nazwami i tagline'ami. Proficiency jako typograficzny element (np. "03+ yrs" w dużym monospace obok nazwy).

> **WAŻNE**: Wybierz opcję, która najlepiej balansuje profesjonalizm z charakterem. Nie rób "bezpiecznego" designu — rób DOBRY design.

---

## 📝 FAZA 3: DANE (content — użyj dokładnie tych danych)

### Headline

```
Narzędzia, które znam na wylot
```

### Subline (opcjonalny)

```
Fullstack to nie buzzword — to stack, który dowozi.
```

### FRONTEND

| Technologia  | Tagline                                                          | Proficiency  |
| ------------ | ---------------------------------------------------------------- | ------------ |
| JavaScript   | Znam każdy quirk, łącznie z tymi, o których MDN nie pisze        | daily driver |
| TypeScript   | Typy to nie ograniczenie — to supermoc. Zero `any` w moim kodzie | 3+ yrs       |
| React.js     | Hooks, Server Components, Suspense — wszystko w jednym palcu     | core skill   |
| Next.js 14   | App Router, RSC, Server Actions — nie czekam aż inni się nauczą  | core skill   |
| Tailwind CSS | Pixel-perfect bez ani jednej linijki custom CSS. Serio.          | daily driver |

### BACKEND

| Technologia           | Tagline                                                             | Proficiency |
| --------------------- | ------------------------------------------------------------------- | ----------- |
| C# / .NET             | Enterprise-grade backend, który nie pada o 3 w nocy                 | 3+ yrs      |
| ASP.NET Core          | REST API, auth, middleware — production-ready od pierwszego commita | core skill  |
| Entity Framework Core | ORM, który robi co mu każę, a nie odwrotnie                         | 3+ yrs      |
| GraphQL               | Kiedy REST to za mało, a klient chce dokładnie to, czego potrzebuje | learning    |

### TOOLING

| Technologia          | Tagline                                                      | Proficiency  |
| -------------------- | ------------------------------------------------------------ | ------------ |
| Git & GitHub Actions | CI/CD, które pisze się raz i zapomina na 6 miesięcy          | 2+ yrs       |
| Docker               | Działa u mnie = działa wszędzie. Koniec dyskusji.            | 2+ yrs       |
| Vercel               | Push to main = produkcja. Zero konfiguracji, zero stresu     | daily driver |
| Cursor + Claude      | AI-assisted development — piszę 3x szybciej, myślę 2x dalej  | daily driver |
| Prisma               | Schema-first. Migracje bez stresu. Baza danych pod kontrolą. | 2+ yrs       |
| Framer Motion        | Animacje, które robią wrażenie — nie tylko na Dribbble       | daily driver |

### CTA Block (na dole sekcji)

```
Nie widzisz technologii, której szukasz? Prawdopodobnie ją znam — albo nauczę się w weekend.
→ Więcej projektów na GitHub
```

---

## 🎨 FAZA 4: DESIGN TOKENS (obowiązkowe — nie zmieniaj)

```
Background:        #0a0a0f
Card/Surface:      #111118
Card hover:        #16161f
Border default:    rgba(255, 255, 255, 0.06)
Border hover:      rgba(124, 107, 255, 0.3)

Accent purple:     #7c6bff
Accent teal:       #00d4aa
Accent red:        #ff6b6b
Accent yellow:     #ffd666

Text primary:      #ffffff
Text secondary:    #8a8ab0
Text muted:        #5a5a7a

Font heading:      'Syne', sans-serif
Font body:         'DM Sans', sans-serif
Font mono:         'DM Mono', monospace

Border radius:     12px (cards), 8px (badges), 9999px (pills)
```

---

## ⚙️ FAZA 5: WYMAGANIA TECHNICZNE

### Stack:

- **React** (functional component, TypeScript)
- **Tailwind CSS** — utility-first, zero custom CSS files
- **GSAP + ScrollTrigger** — animacje wejścia per kategoria i per item (staggered)
- **Framer Motion** — hover interactions na kartach/rows

### Animacje (GSAP ScrollTrigger):

- Section header: fade + slide from left (label), scale line, fade up (headline)
- Category labels: fade in z lewej, staggered per kategoria
- Tech items: staggered fade-up z `y: 20` → `y: 0`, `opacity: 0` → `1`, delay `0.06s` between items
- CTA block: fade up jako ostatni element

### Hover interactions:

- Tech item hover: subtle `translateY(-2px)` + border glow (`border-color` transition to `rgba(124,107,255,0.3)`) + background lighten to `#16161f`
- Proficiency label hover: brak (statyczny)

### Responsive:

- **Desktop (1024px+)**: Multi-column layout jeśli wybrany grid/cards, max-width `960px`
- **Tablet (768px)**: 2 kolumny → 1 kolumna, zachowane odstępy
- **Mobile (< 640px)**: Single column, tagline pod nazwą technologii, mniejszy font

### Accessibility:

- Semantyczny HTML: `<section>`, `<h2>`, `<h3>`, `<ul>`/`<li>` dla listy technologii
- Kontrasty: WCAG AA minimum na tekście
- `aria-label` na sekcji: "Tech Stack — narzędzia i technologie"

---

## 🚫 ZASADY ABSOLUTNE (NIE ŁAMAĆ)

1. **NIE generuj kodu bez fazy myślenia** — Twój pierwszy output to komentarz z decyzjami designowymi
2. **NIE używaj neon-bright badge'ów** — proficiency ma być subdued, elegancki, monospace
3. **NIE rób flat listy bez depth** — każdy element musi mieć visual weight
4. **NIE kopiuj obecnego designu** — to jest REDESIGN, nie refactor
5. **NIE używaj ikon technologii / logo** — ta sekcja jest o personality-driven copy, nie o ikonach
6. **NIE używaj Material UI, Chakra, ani żadnych gotowych komponentów** — czyste Tailwind + headless
7. **Zachowaj spójność z resztą strony** — ten sam dark theme, te same fonty, te same tokeny

---

## ✅ CHECKLIST PRZED ODDANIEM

- [ ] Czy sekcja wygląda jak zaprojektowana przez designera, nie wygenerowana przez AI?
- [ ] Czy jest wyraźna hierarchia wizualna? (headline > category > tech name > tagline > proficiency)
- [ ] Czy hover states są zaimplementowane i wyglądają premium?
- [ ] Czy animacje GSAP działają z ScrollTrigger?
- [ ] Czy responsive działa na 375px, 768px, 1440px?
- [ ] Czy użyte dokładnie te design tokens co w specyfikacji?
- [ ] Czy tagline'y i dane są identyczne z tabelkami powyżej?
- [ ] Czy CTA block jest na dole sekcji?
- [ ] Czy ŻADEN element nie wygląda jak z szablonu?

---

## 💡 INSPIRACJE WIZUALNE (do researchu, NIE do kopiowania)

- **Linear.app** — Features page, jak prezentują stack
- **Raycast.com** — Extensions page, layout i typografia
- **Stripe.com/docs** — Sidebar + content hierarchy
- **Vercel.com** — Tech stack w feature blocks
- **Resend.com** — Minimalizm z charakterem

---

_Ten prompt jest częścią staged workflow — sekcje budowane są jedna po drugiej. Po Tech Stack następny w kolejce jest Pricing (3.5)._
