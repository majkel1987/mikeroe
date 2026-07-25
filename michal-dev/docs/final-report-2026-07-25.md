# Raport przebudowy mikeroe.pl — 25.07.2026

## Rezultat

Strona została przebudowana z portfolio „Fullstack Developer / SaaS Builder” w ofertę nastawioną na pozyskiwanie zapytań o strony dla firm usługowych i specjalistów w Polsce. Landing page jest ofertą wejściową, strona firmowa — główną, a aplikacje i MVP mają osobną, drugorzędną ścieżkę.

Produkcja pozostaje zablokowana. Polityka prywatności zawiera jawny placeholder danych administratora i wymaga uzupełnienia oraz przeglądu prawnego. Plausible ładuje się dopiero po podaniu zmiennych środowiskowych.

## Wybrany komunikat i warianty hero

Wybrano:

> Strony internetowe, które pomagają firmom usługowym zdobywać zapytania.

To wariant najbardziej jednoznaczny: nazywa produkt, odbiorcę i oczekiwany rezultat, bez gwarantowania wyników sprzedażowych. Pozostałe warianty:

1. „Twoja oferta zasługuje na stronę, która ułatwia klientom decyzję.” — mocny język korzyści, ale słabiej określa odbiorcę.
2. „Projektuję strony dla specjalistów, którzy chcą wyglądać wiarygodnie i pozyskiwać kontakty.” — dobry dla marek eksperckich, węższy niż cała grupa firm usługowych.
3. „Od niejasnej oferty do strony gotowej na pierwsze zapytania.” — pokazuje transformację, lecz brzmi mniej konkretnie w wyszukiwarce.
4. „Strona firmowa zaprojektowana wokół pytań Twoich klientów.” — dobrze komunikuje metodę UX, słabiej rezultat.

Wersja EN posiada równoważne pięć wariantów w `lib/site-content.ts`.

## Oferta i treść

- „Landing na start”: od 3 500 zł, 2–3 tygodnie, do 7 sekcji, jedna tura poprawek i 14 dni wsparcia.
- „Strona, która pracuje na zapytania”: od 6 500 zł, 3–5 tygodni, do 5 podstron, dwie tury poprawek i 30 dni wsparcia.
- „Aplikacja webowa / MVP”: od 15 000 zł, zakres po analizie funkcji.
- Płatność: 50% przy rezerwacji terminu i 50% po akceptacji, przed publikacją.
- Pełny zestaw dodatków, ograniczeń pakietów, procesu i 10 odpowiedzi FAQ jest dostępny w obu językach.

## Architektura i SEO

Indeksowalne trasy:

- PL: `/`, `/strony-internetowe-dla-firm`, `/landing-page`, `/mvp-aplikacje-webowe`, `/projekty/physioflow`.
- EN: `/en`, `/en/websites-for-service-businesses`, `/en/landing-pages`, `/en/web-app-mvp`, `/en/work/physioflow`.

Każda strona ma własny title, description, canonical, hreflang, OG i hierarchię nagłówków. Sitemap obejmuje wyłącznie strony przeznaczone do indeksowania. Demonstracyjne `/demo/physioflow` i `/en/demo/physioflow` mają `noindex`, są wykluczone w robots i zawierają widoczną etykietę „Projekt koncepcyjny”.

JSON-LD nie zawiera fikcyjnych klientów, osiągnięć, danych podatkowych ani niepotwierdzonych danych osoby. Portfolio używa modelu statusów `concept | commercial | in_progress`; wszystkie aktualne projekty są oznaczone jako koncepcje.

## Formularz, prywatność i analityka

Formularz wymaga imienia, e-maila, rodzaju projektu i opisu. Budżet i termin są opcjonalne. Dodano komunikaty pól, potwierdzenie następnego kroku, honeypot, time-trap, kontrolę origin i rate limit. Logowanie adresu odbiorcy oraz stanu sekretów zostało usunięte.

Plausible jest sterowany przez `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` i `NEXT_PUBLIC_PLAUSIBLE_SRC`. Typowane zdarzenia: `cta_primary_click`, `pricing_view`, `package_select`, `form_start`, `form_submit_success`, `form_submit_error`, `email_click`, `linkedin_click`, `portfolio_open`.

Wersje PL/EN polityki opisują formularz, Gmail, Vercel i Plausible. Nie wolno publikować produkcyjnie przed zastąpieniem placeholdera prawdziwymi danymi administratora i przeglądem prawnym.

## Portfolio i assety

- Physioflow ma indeksowalne case study, mobilne demo z noindex i uczciwy opis rezultatu projektowego.
- Ecoclean nie prowadzi już do ekranu logowania Vercel.
- Neon Burger i LexPro są opisane jako koncepcje; nie użyto ich fikcyjnych statystyk.
- Usunięto osiem starych PNG o wadze 1–8 MB oraz kod typewritera, orbit, GSAP, Lenis i ciężkich sekcji klienckich.
- Nowe assety: monogram SVG, favicon SVG, OG PNG 1200×630, `mikeroe-hero.webp`, `physioflow-concept.webp` i trzy zoptymalizowane miniatury portfolio WebP.
- Syne i DM Sans są dostarczane lokalnie.

## Testy i pomiary

Zaliczone:

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- 30/30 testów Playwright w Chrome, Firefox i Edge
- szerokości 360, 390, 768, 1024 i 1440 px
- routing, CTA, pakiety, formularz, błędy/sukces, zdarzenia, noindex, focus i reduced motion

Lighthouse, ten sam profil mobile:

| Stan | Performance | Accessibility | Best Practices | SEO | FCP | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Przed | 64 | 96 | 100 | 100 | 1,8 s | 44,3 s | 0 | 0 ms |
| Po, lokalny build produkcyjny | 96 | 100 | 100 | 100 | 1,8 s | 2,6 s | 0 | 0 ms |

Cele kategorii, CLS i TBT zostały osiągnięte. Laboratoryjny LCP 2,6 s jest o 0,1 s powyżej celu; należy powtórzyć pomiar na Vercel Preview i traktować INP dopiero jako metrykę terenową.

## Plan pierwszych klientów

- 0–30 dni: 20–30 dobrze dobranych firm usługowych tygodniowo, krótki personalizowany audyt ich obecnej strony, publikacja case study Physioflow i follow-up bez automatycznego spamu.
- 31–60 dni: analiza przejść `cta_primary_click → form_start → form_submit_success`, identyfikacja największego odpływu i jedna kontrolowana korekta treści lub formularza.
- 61–90 dni: ocena kwalifikowanych zapytań, współczynnika konwersji i źródeł leadów. Sam ruch nie jest KPI sukcesu.

## Pozostałe decyzje przed produkcją

1. Prawdziwe dane administratora i akceptacja dokumentów prawnych.
2. Konfiguracja Plausible i weryfikacja zdarzeń na preview.
3. Kontrolowana wiadomość z formularza preview do właściwej skrzynki.
4. Akceptacja publicznych linków do LexPro i Neon Burger albo ich wyłączenie.
5. Powtórny Lighthouse na Vercel Preview i decyzja, czy optymalizować ostatnie 0,1 s LCP.
