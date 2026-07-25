# Stan początkowy mikeroe.pl — 25.07.2026

## Kontekst

Cel biznesowy strony to pozyskiwanie wartościowych zapytań o landing page, strony dla firm usługowych oraz — jako oferta drugorzędna — aplikacje webowe i MVP.

Audyt wykonano na działającej stronie `https://www.mikeroe.pl/`, w kodzie źródłowym oraz przy szerokościach 1440 × 900 i 390 × 844 px. Narzędzie Squirrel nie było dostępne w środowisku, a publiczne API PageSpeed zwróciło limit 429, dlatego wynik liczbowy Lighthouse należy zapisać lokalnym CLI przed publikacją i porównać z tym samym profilem na preview.

## Najważniejsze problemy

### Pozycjonowanie i CRO

- Hero mówi „Buduję aplikacje webowe”, chociaż większość oferty i portfolio dotyczy stron firmowych.
- Komunikaty „Web Developer”, „SaaS Builder”, C#, .NET i React wymagają wiedzy technicznej i nie wyjaśniają rezultatu dla klienta.
- CTA „Zbudujmy coś świetnego” jest ogólne; nie mówi, co użytkownik otrzyma po kliknięciu.
- Strona wygląda bardziej jak portfolio developera niż oferta dla firmy gotowej zapłacić za komercyjny projekt.
- Osobna, rozbudowana sekcja technologii zajmuje miejsce potrzebne na zakres, obawy, proces, FAQ i dowody.
- Deklaracje o „dochodowych rozwiązaniach” i klientach nie mają potwierdzenia.

### Mobile i dostępność

- Przy 390 px nagłówek hero jest przycięty po prawej stronie.
- Dokument ma około 12 465 px wysokości na telefonie, a część treści jest rozwlekła i powtarzalna.
- Nadmiar animacji, Lenis, GSAP i efektów zależnych od prędkości scrolla zwiększa ryzyko problemów z ruchem ograniczonym, fokusem i wydajnością.
- Część tekstów pomocniczych i etykiet używa bardzo małych rozmiarów oraz niskiego kontrastu.

### Portfolio i zaufanie

- Wszystkie cztery projekty są projektami koncepcyjnymi, lecz trzy są oznaczone jako „Live Project”.
- Neon Burger ma techniczny tytuł dokumentu `temp-vite`.
- Ecoclean przekierowuje anonimowego odbiorcę do logowania Vercel.
- LexPro zawiera fikcyjne statystyki i deklaracje skuteczności, których nie wolno używać jako dowodu.
- Brakuje struktury case study: problem, zakres, decyzje, rozwiązanie i uczciwie opisany rezultat projektowy.

### SEO

- Tytuł i opis koncentrują się na roli „Fullstack Developer” i technologiach zamiast na intencji „strony internetowe dla firm”.
- Dwie niezależne porcje JSON-LD opisują tę samą markę w różny sposób.
- Wersja EN działa po stronie klienta na tym samym adresie, więc nie ma własnych canonicali, `hreflang` ani indeksowalnych treści.
- Wyszukiwanie brandowe i operator `site:mikeroe.pl` nie pokazały domeny w wynikach użytego indeksu wyszukiwarki.
- Brakuje odrębnych, wartościowych podstron ofertowych odpowiadających różnym intencjom.

### Formularz i pomiar

- Formularz nie zbiera opcjonalnego budżetu ani terminu, mimo że pomagają przygotować sensowną odpowiedź.
- Rate limit jest przechowywany wyłącznie w pamięci procesu, więc nie jest trwały w środowisku serverless.
- Kod loguje adres odbiorcy i stan zmiennych środowiskowych.
- Nie ma wdrożonej analityki ani zdarzeń konwersji; informacja o analityce występuje tylko w opisie pakietu.
- Obietnice odpowiedzi „< 4h”, „w 24h” i informacja o pracy po godzinach są niespójne.

### Wydajność i kod

- Strona główna wysyła około 258 kB First Load JS.
- Obrazy źródłowe ważą od około 1,1 MB do 8,3 MB; samo tło hero ma ponad 8 MB.
- Poniższe sekcje są lazy-loadowane, ale pozostają ciężkimi komponentami klienckimi z GSAP i Framer Motion.
- Build i lint przed zmianami przechodzą poprawnie.

## Stan bazowy techniczny

- Next.js 14.2.33, React 18, TypeScript, Tailwind CSS 3.4.
- `npm run build`: zaliczony.
- `npm run lint`: zaliczony.
- Strona główna: 77,7 kB route bundle, 258 kB First Load JS.
- Brak automatycznych testów E2E.
- Vercel jest połączony z repozytorium; commit `f3460a8` ma udany status deploymentu.

## Rekomendowana zmiana

Dominująca oferta: strony nastawione na zapytania dla firm usługowych i specjalistów w całej Polsce. Landing page jest produktem wejściowym, strona firmowa produktem głównym, a MVP i aplikacje webowe otrzymują odrębną ścieżkę.

Wybrany nagłówek:

> Strony internetowe, które pomagają firmom usługowym zdobywać zapytania.

Główne CTA:

> Otrzymaj wstępną wycenę

## Lighthouse przed zmianami

Pomiar `https://mikeroe.pl` wykonano lokalnym Lighthouse CLI 13.0.1 w Chrome, z domyślnym profilem mobile, i zapisano w `docs/lighthouse-before.json`.

| Performance | Accessibility | Best Practices | SEO | FCP | LCP | CLS | TBT |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 64 | 96 | 100 | 100 | 1,8 s | 44,3 s | 0 | 0 ms |

Nietypowo wysoki LCP wynikał z ciężkiego tła hero i sposobu ładowania pierwszego widoku. Zrzuty stanu przed zmianami znajdują się w `docs/screenshots/before-desktop.png` i `before-mobile.png`.
