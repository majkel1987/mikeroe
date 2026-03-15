Oto zaawansowana Specyfikacja Wymagań Produktowych (PRD) dla landing page'a Fullstack Developera z Polski, uwzględniająca Twoje preferencje z poprzednich ustaleń (klasyczny Hero zamiast Bento Grid, ciemny motyw) oraz najnowsze standardy technologiczne.

1. Wizja i Cel Projektu
   Strona ma pełnić funkcję "Productized Service" – nie tylko prezentować kod, ale sprzedawać kompletne rozwiązania biznesowe dla klientów i rekruterów. Landing page ma pozycjonować twórcę jako profesjonalnego partnera technologicznego, generować wysokiej jakości leady i maksymalizować konwersję poprzez transparentność oferty oraz świetne SEO.
2. Wytyczne Wizualne (UI/UX)
   Motyw i Styl: Nowoczesny, elegancki ciemny motyw (Dark Mode), kojarzący się z estetyką premium i środowiskiem programistycznym. Interfejs ma być "pixel-perfect", wykorzystujący wyraźną typografię i półprzezroczystości (Glassmorphism).
   Brak Bento Grid: Zgodnie z założeniem rezygnujemy z siatki Bento. Konstrukcja strony będzie oparta o płynny, jednowarstwowy układ pionowy (klasyczny One-Pager) z wykorzystaniem narracji typu "scroll-telling" (np. elementy wsuwające się w miarę przewijania ekranu).
   Animacje: Płynne mikro-interakcje i efekty wejścia obsługiwane przez bibliotekę Framer Motion, która idealnie współpracuje z Reactem.
3. Architektura Informacji (Sekcje)
   3.1. Hero (Zamiast Bento Grid)
   Struktura: Duża, wyrazista typografia powitalna (np. "Cześć 👋. Nazywam się Mike, jestem Fullstack Developerem z Polski").
   Bio: Krótki, uderzający opis skupiający się na dostarczaniu płynnych cyfrowych doświadczeń wolnych od błędów ("bug-free smooth user experiences") oraz łączeniu kodu z estetyką.
   Call to Action (CTA): Główny przycisk nastawiony na współpracę, np. "Ship stuff with me" lub "Rozpocznijmy projekt", prowadzący bezpośrednio do sekcji Kontakt.
   3.2. Usługi (Services & Process)
   Prezentacja oferty w oparciu o etapy dowożenia projektów: od warsztatów (Discovery), przez makiety i kodowanie, aż po optymalizację SEO i ostateczne wdrożenie na produkcję.
   Nacisk na to, że strona lub aplikacja to "potężne narzędzie napędzające rozwój biznesu", a nie tylko wizytówka.
   3.3. Portfolio (My Work / Projects)
   Galeria projektów wyświetlana w estetycznych kartach. Każda karta zawiera:
   Nazwę projektu i pełnioną rolę (np. Fullstack Developer).
   Krótki opis problemu, który rozwiązano.
   Użyty stack technologiczny.
   Linki do kodu źródłowego na GitHubie oraz wersji Live.
   3.4. Technologie (Tech Stack)
   Zamiast standardowej listy ikon, zastosowanie angażującego copywritingu dla poszczególnych technologii, pokazującego pewność siebie. Przykłady: "Nailing Javascript", "Crushing React.js", "Mastering Tailwind", "Killing GraphQL".
   3.5. Pricing (Cennik i Utrzymanie)
   Transparentność: Interaktywne karty wycen dla standardowych wdrożeń, informujące klienta o widełkach budżetowych (np. aplikacja webowa MVP od określonej kwoty, z uwzględnieniem elastyczności dla projektów dedykowanych).
   Pakiety wsparcia: Wyraźnie wyodrębniona opcja długoterminowej opieki po wdrożeniu (tzw. pakiet "Sleep tight" na subskrypcji lub w systemie godzinowym SLA), zapewniająca bezpieczeństwo i aktualizacje.
   3.6. Kontakt
   Formularz: Zabezpieczony przed botami i spamem (np. "Honey Pot" lub reCAPTCHA) formularz kontaktowy z polami: Imię, Email, Opis projektu.
   Social Links: Bezpośrednie kanały szybkiego kontaktu: adres e-mail, GitHub, LinkedIn oraz dedykowany przycisk "Hit me up on Discord".
4. Stack Technologiczny i Architektura
   Projekt zostanie wykonany z nastawieniem na zerowe opóźnienia i maksymalizację wskaźników Core Web Vitals (>95 pkt).
   Framework: Next.js 14 (App Router). Użycie komponentów serwerowych (RSC) w celu błyskawicznego serwowania gotowego kodu HTML do przeglądarki klienta, co jest absolutnie krytyczne dla SEO.
   Stylizacja: Tailwind CSS v3.4+. Zbudowanie interfejsu od podstaw (Headless UI) bez korzystania z gotowych, obciążających bibliotek (tzw. "bloatware" w stylu Material UI), co gwarantuje pełną kontrolę i minimalny rozmiar paczki JS.
   Baza danych/Treści: Zamiast ciężkiego systemu CMS, zastosowanie lekkich plików płaskich (JSON) w katalogu content/ do zarządzania projektami (projects.json) oraz cennikiem (services.json). Pozwala to na szybką edycję i "zero latency".
   Backend / Formularze: Bezserwerowy (Serverless) backend wykorzystujący Next.js Server Actions. Po stronie klienta i serwera walidacja przez Zod oraz React Hook Form, aby uniknąć błędów i ataków. Obsługa e-maili przez API narzędzia Resend, co upraszcza architekturę i gwarantuje najwyższą dostarczalność wiadomości.
5. SEO i Optymalizacja
   Architektura Treści: Rygorystyczna hierarchia nagłówków (H1 na stronie głównej, H2 dla sekcji, H3 dla projektów) oraz semantyczny HTML.
   JSON-LD (Knowledge Graph): Wdrożenie dynamicznych danych strukturalnych łączących schematy Person (Osoba) oraz ProfessionalService (Usługa Profesjonalna). Pomaga to robotom Google precyzyjnie identyfikować Twoje usługi deweloperskie i wyświetlać wyniki z tzw. "Rich Snippets".
   Optymalizacja Mediów: Użycie natywnego komponentu next/image do konwersji i asynchronicznego ładowania grafik (WebP/AVIF), co pozwala wyeliminować błędy Layout Shift (CLS). Dodatkowo implementacja API Metadata do automatycznego generowania tagów i obrazów Open Graph dla lepszej widoczności linków na LinkedIn i Twitterze
