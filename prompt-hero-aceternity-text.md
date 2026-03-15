# Prompt: Hero Section — Text Refactor z Aceternity UI

## Kontekst

Modyfikujemy **prawą kolumnę** (tekst + CTA) istniejącej sekcji Hero. Lewa kolumna (zdjęcie, floating elements) oraz dolny ticker — **bez zmian**. Cały layout dwukolumnowy, badge, CTA i ticker zostają dokładnie jak są.

Zmieniamy **wyłącznie** sposób renderowania i animacji tekstów w headline i bio.

---

## KROK 0 — Instalacja Aceternity UI

**PRZED rozpoczęciem pracy z kodem**, zainstaluj następujące komponenty z Aceternity UI za pomocą CLI:

```bash
npx shadcn@latest add @aceternity/typewriter-effect
npx shadcn@latest add @aceternity/text-generate-effect
npx shadcn@latest add @aceternity/colourful-text
npx shadcn@latest add @aceternity/encrypted-text
```

Upewnij się, że wszystkie 4 pakiety są zainstalowane i importowalne. Jeśli CLI nie działa — zainstaluj ręcznie kopiując source code komponentów z:
- https://ui.aceternity.com/components/typewriter-effect
- https://ui.aceternity.com/components/text-generate-effect
- https://ui.aceternity.com/components/colourful-text
- https://ui.aceternity.com/components/encrypted-text

Komponenty powinny trafić do `components/ui/` (lub tam gdzie shadcn je domyślnie umieszcza).

---

## KROK 1 — Nowy układ tekstu w headline

Obecny headline to jeden ciągły `<h1>`:

```
Cześć! Jestem Mike Fullstack Developer
```

**Nowy układ — trzy oddzielne linie wizualne:**

```
Cześć!
Jestem MIKE
Fullstack Developer
```

Każda linia musi być osobnym elementem (nie polegaj na łamaniu tekstu przez przeglądarkę). Zachowaj semantykę — całość nadal jest `<h1>` albo `<h1>` + `<span>`.

---

## KROK 2 — Przypisanie komponentów Aceternity do poszczególnych elementów

### 2a) „Cześć!" → `<TypewriterEffect>`

Użyj komponentu **Typewriter Effect** z Aceternity UI.

```tsx
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
```

Props:
```tsx
<TypewriterEffect
  words={[
    { text: "Cześć!", className: "text-white" },
  ]}
  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-jakarta font-semibold tracking-tight"
  cursorClassName="bg-accent1"
/>
```

- Typewriter animuje pojawienie się „Cześć!" litera po literze
- Kursor migający w kolorze `accent1` (#7c6bff)
- Po zakończeniu animacji typewritera → uruchom kolejne animacje (TextGenerateEffect itd.)

### 2b) „Jestem MIKE / Fullstack Developer" → `<TextGenerateEffect>`

Użyj komponentu **Text Generate Effect** z Aceternity UI.

```tsx
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
```

Renderuj jako **dwa oddzielne** TextGenerateEffect (jeden na linię), żeby zachować układ:

```tsx
<TextGenerateEffect
  words="Jestem MIKE"
  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-jakarta font-semibold tracking-tight text-white"
  duration={0.5}
  filter={true}
/>

<TextGenerateEffect
  words="Fullstack Developer"
  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-jakarta font-semibold tracking-tight text-white"
  duration={0.5}
  filter={true}
/>
```

- Tekst pojawia się słowo po słowie z efektem fade-in + blur
- „MIKE" — wielkimi literami, pogrubione, kolor biały
- Animacja startuje **po zakończeniu** typewritera „Cześć!"

### 2c) Słowo „Developer" wewnątrz TextGenerateEffect → owinięte w `<ColourfulText>`

Użyj komponentu **Colourful Text** z Aceternity UI.

```tsx
import { ColourfulText } from "@/components/ui/colourful-text";
```

W drugiej linii TextGenerateEffect, słowo „Developer" musi być owrapowane w `<ColourfulText>`:

```tsx
// Może wymagać customizacji TextGenerateEffect aby akceptował JSX children
// Alternatywnie: zbuduj tę linię ręcznie, z TextGenerateEffect tylko dla "Fullstack " 
// i ColourfulText osobno dla "Developer"
```

**Preferowane podejście** (jeśli TextGenerateEffect nie wspiera JSX w `words`):

Zbuduj trzecią linię headline jako:
```tsx
<div className="flex items-baseline gap-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-jakarta font-semibold tracking-tight">
  <TextGenerateEffect words="Fullstack" className="text-white" duration={0.5} filter={true} />
  <ColourfulText text="Developer" />
</div>
```

`ColourfulText` renderuje animowany gradient kolorów przechodzący przez litery słowa „Developer" — dynamicznie zmieniające się kolory. Zachowaj domyślną paletę komponentu (rainbow/gradient) lub dostosuj do palety projektu, np.:

```tsx
// Jeśli ColourfulText wspiera custom colors:
<ColourfulText text="Developer" colors={["#7c6bff", "#00d4aa", "#ff6b6b", "#ffd666", "#0099ff"]} />
```

### 2d) Bio paragraph → `<EncryptedText>`

Użyj komponentu **Encrypted Text** z Aceternity UI.

```tsx
import { EncryptedText } from "@/components/ui/encrypted-text";
```

Zamień obecny `<p>` z bio na:

```tsx
<div className="text-gray-300 font-sans font-light text-base sm:text-lg lg:text-[22px] leading-relaxed max-w-3xl">
  <EncryptedText
    text="Buduję produkty cyfrowe, które działają bez zarzutu — od architektury backendu po pixel-perfect frontend. Łączę kod z estetyką, żebyś mógł skupić się na swoim biznesie."
    revealDelayMs={30}
    flipDelayMs={40}
    revealedClassName="text-gray-300"
    encryptedClassName="text-accent1/50"
  />
</div>
```

- Tekst startuje jako losowe znaki (gibberish) i stopniowo odsłania się litera po literze
- Odsłonięte znaki: `text-gray-300`
- Zaszyfrowane/gibberish znaki: `text-accent1/50` (przygaszony fiolet)
- Animacja startuje **po zakończeniu** TextGenerateEffect headline

---

## KROK 3 — Sekwencja animacji (timeline)

Kluczowe: animacje muszą odpalać się **sekwencyjnie**, nie wszystkie naraz:

1. **T+0s** — `TypewriterEffect` → „Cześć!" (typewriter, ~1s)
2. **T+1s** — `TextGenerateEffect` → „Jestem MIKE" (fade-in word by word, ~0.8s)
3. **T+1.5s** — `TextGenerateEffect` + `ColourfulText` → „Fullstack Developer" (~0.8s)
4. **T+2s** — `EncryptedText` → bio paragraph (decrypt reveal, ~2s)
5. **T+3s** — CTA buttons fade in (istniejąca animacja GSAP)
6. **Równolegle z 2-3** — Lewa kolumna (image frame) reveal (istniejąca animacja GSAP)

Jeśli komponenty Aceternity nie mają wbudowanego `delay` prop — użyj stanu React (`useState`) + `useEffect` z `setTimeout` aby sterować kiedy każdy komponent się mountuje / staje się widoczny. Przykład:

```tsx
const [showLine1, setShowLine1] = useState(false);
const [showLine2, setShowLine2] = useState(false);
const [showBio, setShowBio] = useState(false);

useEffect(() => {
  // TypewriterEffect renders immediately
  const t1 = setTimeout(() => setShowLine1(true), 1000);  // "Jestem MIKE"
  const t2 = setTimeout(() => setShowLine2(true), 1500);  // "Fullstack Developer"
  const t3 = setTimeout(() => setShowBio(true), 2000);     // EncryptedText bio
  return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
}, []);
```

---

## KROK 4 — Co zostawiamy BEZ ZMIAN

- Cały layout sekcji (grid 2-kolumnowy, spacing, padding)
- Lewa kolumna z obrazem, floating elements, gradient blur
- Badge „FULLSTACK DEVELOPER • POLSKA" (istniejący kod + GSAP)
- Oba przyciski CTA (istniejący kod + GSAP)
- Tech ticker na dole (istniejący kod + GSAP)
- `HERO_CONTENT` obiekt (zaktualizuj tylko podział headingu na 3 osobne pola)
- Plik `HeroSection.tsx` — modyfikuj in-place, nie twórz nowego pliku

---

## KROK 5 — Aktualizacja HERO_CONTENT

```tsx
const HERO_CONTENT = {
  badge: "FULLSTACK DEVELOPER • POLSKA",
  greeting: "Cześć!",
  nameLine: "Jestem MIKE",
  roleLine1: "Fullstack",
  roleLine2: "Developer",
  bio: "Buduję produkty cyfrowe, które działają bez zarzutu — od architektury backendu po pixel-perfect frontend. Łączę kod z estetyką, żebyś mógł skupić się na swoim biznesie.",
  primaryCta: "Zbudujmy razem coś fajnego",
  secondaryCta: "Zobacz portfolio ↓"
};
```

---

## Design tokens (referencja)

| Token | Value | Tailwind |
|---|---|---|
| Background | `#0a0a0f` | `bg-bg` |
| Surface | `#111118` | `bg-surface` |
| Accent purple | `#7c6bff` | `text-accent1` / `bg-accent1` |
| Accent teal | `#00d4aa` | `text-accent2` |
| Accent red | `#ff6b6b` | `text-accent3` |
| Text primary | `#e8e8f0` | `text-text` |
| Text muted | `#7070a0` | `text-muted` |
| Heading font | Plus Jakarta Sans | `font-jakarta` |
| Body font | DM Sans | `font-sans` |
| Mono font | DM Mono | `font-mono` |

---

## Podsumowanie wymagań

- [ ] Zainstaluj 4 komponenty Aceternity UI (typewriter-effect, text-generate-effect, colourful-text, encrypted-text)
- [ ] Rozbij headline na 3 linie: „Cześć!" / „Jestem MIKE" / „Fullstack Developer"
- [ ] „Cześć!" → TypewriterEffect z migającym kursorem w kolorze accent1
- [ ] „Jestem MIKE" → TextGenerateEffect (word-by-word fade)
- [ ] „Fullstack Developer" → TextGenerateEffect + ColourfulText na słowie „Developer"
- [ ] Bio → EncryptedText (gibberish → reveal)
- [ ] Sekwencyjna timeline: typewriter → text-generate → encrypted-text → CTA fade
- [ ] Istniejący GSAP dla lewej kolumny, badge, CTA, ticker — zachowaj
- [ ] TypeScript strict, brak błędów kompilacji
- [ ] Responsywność: te same breakpointy co obecny kod (sm/md/lg/xl)
