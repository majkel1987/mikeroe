export type Locale = 'pl' | 'en';
export type ProjectStatus = 'concept' | 'commercial' | 'in_progress';
export type ServiceKey = 'websites' | 'landing' | 'mvp';

export type Package = {
  id: 'landing' | 'website' | 'mvp';
  name: string;
  forWhom: string;
  result: string;
  price: string;
  timeframe: string;
  revisions: string;
  support: string;
  features: string[];
  exclusions: string[];
  featured?: boolean;
};

export type Project = {
  slug: string;
  name: string;
  status: ProjectStatus;
  label: string;
  businessType: string;
  problem: string;
  scope: string[];
  solution: string;
  outcome: string;
  technologies: string[];
  image: string;
  externalUrl?: string;
};

const sharedProjects: Record<Locale, Project[]> = {
  pl: [
    {
      slug: 'physioflow',
      name: 'Physioflow',
      status: 'concept',
      label: 'Flagowy projekt koncepcyjny',
      businessType: 'Gabinet fizjoterapii',
      problem:
        'Osoba odczuwająca ból potrzebuje szybko zrozumieć zakres pomocy, poznać proces pierwszej wizyty i znaleźć prostą drogę do kontaktu.',
      scope: ['Strategia treści', 'UX/UI', 'wersja mobilna', 'formularz kontaktowy'],
      solution:
        'Spokojna, dostępna strona z jasnym podziałem usług, instrukcją pierwszej wizyty i jednym dominującym wezwaniem do kontaktu.',
      outcome:
        'Kompletna koncepcja pokazująca, jak uporządkować ofertę specjalisty bez fikcyjnych opinii, statystyk i obietnic medycznych.',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      image: '/images/physioflow-concept.webp',
    },
    {
      slug: 'lexpro',
      name: 'LexPro',
      status: 'concept',
      label: 'Projekt koncepcyjny',
      businessType: 'Kancelaria prawna',
      problem: 'Szeroki zakres usług prawnych wymaga czytelnej architektury i spokojnego języka budującego zaufanie.',
      scope: ['Architektura informacji', 'UX/UI', 'frontend'],
      solution: 'Hierarchia specjalizacji i kontaktu zaprojektowana z myślą o osobie szukającej konkretnego rodzaju pomocy.',
      outcome: 'Kierunek wizualny i informacyjny dla marki eksperckiej. Projekt nie jest realizacją komercyjną.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      image: '/images/lexpro-concept.webp',
      externalUrl: 'https://lexpro-one.vercel.app/',
    },
    {
      slug: 'neon-burger',
      name: 'Neon Burger',
      status: 'concept',
      label: 'Projekt koncepcyjny',
      businessType: 'Lokal gastronomiczny',
      problem: 'Rozbudowane menu i mocny charakter marki muszą pozostać wygodne w obsłudze na telefonie.',
      scope: ['Kierunek wizualny', 'responsive UI', 'frontend'],
      solution: 'Wyrazista, mobilna prezentacja menu z krótką ścieżką do najważniejszych informacji.',
      outcome: 'Demonstracja pracy z marką konsumencką. Projekt nie był wykonany dla rzeczywistego lokalu.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      image: '/images/neon-burger-concept.webp',
      externalUrl: 'https://neon-burger.vercel.app/',
    },
    {
      slug: 'ecoclean',
      name: 'Ecoclean',
      status: 'concept',
      label: 'Projekt koncepcyjny — demo niedostępne',
      businessType: 'Firma sprzątająca',
      problem: 'Klient lokalnej usługi chce szybko poznać zakres, obszar działania i sposób zamówienia wyceny.',
      scope: ['Landing page', 'UX/UI', 'frontend'],
      solution: 'Prosta struktura oferty prowadząca od potrzeby do formularza kontaktowego.',
      outcome: 'Ćwiczenie projektowe dla lokalnej firmy usługowej. Publiczne demo zostało wyłączone, bo wymaga logowania.',
      technologies: ['Next.js', 'Tailwind CSS'],
      image: '/images/ecoclean-concept.webp',
    },
  ],
  en: [
    {
      slug: 'physioflow',
      name: 'Physioflow',
      status: 'concept',
      label: 'Featured concept project',
      businessType: 'Physiotherapy practice',
      problem:
        'A person in pain needs to understand the available help, know what to expect from a first visit and find an easy way to get in touch.',
      scope: ['Content strategy', 'UX/UI', 'mobile experience', 'contact form'],
      solution:
        'A calm, accessible website with clear services, first-visit guidance and one primary contact action.',
      outcome:
        'A complete concept showing how to structure a specialist service without invented testimonials, metrics or medical claims.',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      image: '/images/physioflow-concept.webp',
    },
    {
      slug: 'lexpro',
      name: 'LexPro',
      status: 'concept',
      label: 'Concept project',
      businessType: 'Law practice',
      problem: 'A broad legal offer needs clear information architecture and calm, credible language.',
      scope: ['Information architecture', 'UX/UI', 'frontend'],
      solution: 'A hierarchy of practice areas and contact paths designed around a person seeking specific help.',
      outcome: 'A visual and content direction for an expert brand. This is not commercial client work.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      image: '/images/lexpro-concept.webp',
      externalUrl: 'https://lexpro-one.vercel.app/',
    },
    {
      slug: 'neon-burger',
      name: 'Neon Burger',
      status: 'concept',
      label: 'Concept project',
      businessType: 'Local restaurant',
      problem: 'A large menu and expressive brand still need to be easy to use on a phone.',
      scope: ['Visual direction', 'responsive UI', 'frontend'],
      solution: 'A bold, mobile-first menu experience with a short route to essential information.',
      outcome: 'A consumer-brand exploration. The project was not made for a real restaurant.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      image: '/images/neon-burger-concept.webp',
      externalUrl: 'https://neon-burger.vercel.app/',
    },
    {
      slug: 'ecoclean',
      name: 'Ecoclean',
      status: 'concept',
      label: 'Concept project — demo unavailable',
      businessType: 'Cleaning company',
      problem: 'A local-service customer wants to see the scope, service area and quote path quickly.',
      scope: ['Landing page', 'UX/UI', 'frontend'],
      solution: 'A simple offer structure leading from the need to the contact form.',
      outcome: 'A design exercise for a local service business. The public demo was removed because it requires a login.',
      technologies: ['Next.js', 'Tailwind CSS'],
      image: '/images/ecoclean-concept.webp',
    },
  ],
};

const packages: Record<Locale, Package[]> = {
  pl: [
    {
      id: 'landing',
      name: 'Landing na start',
      forWhom: 'Dla jednej usługi, kampanii lub nowej oferty, którą trzeba jasno przedstawić.',
      result: 'Jedna skupiona strona prowadząca odbiorcę do konkretnego działania.',
      price: 'od 3 500 zł',
      timeframe: '2–3 tygodnie',
      revisions: '1 tura poprawek',
      support: '14 dni wsparcia',
      features: [
        'do 7 przemyślanych sekcji',
        'struktura i redakcja materiałów klienta',
        'indywidualny UX/UI i wersja mobilna',
        'formularz, podstawowe SEO i analityka',
        'wdrożenie oraz pomoc z domeną',
      ],
      exclusions: ['pełny copywriting', 'CMS', 'rozbudowane integracje'],
    },
    {
      id: 'website',
      name: 'Strona, która pracuje na zapytania',
      forWhom: 'Dla firmy usługowej, która potrzebuje wiarygodnie pokazać ofertę i ułatwić klientowi wybór.',
      result: 'Kompletna strona gotowa do poleceń, kampanii i mierzenia zapytań.',
      price: 'od 6 500 zł',
      timeframe: '3–5 tygodni',
      revisions: '2 tury poprawek',
      support: '30 dni wsparcia',
      features: [
        'do 5 podstron',
        'warsztat struktury i redakcja treści',
        'indywidualny UX/UI i dostępność WCAG',
        'formularze, SEO on-page i Schema.org',
        'analityka, publikacja i konfiguracja domeny',
      ],
      exclusions: ['pełny copywriting', 'CMS', 'sklep i płatności'],
      featured: true,
    },
    {
      id: 'mvp',
      name: 'Aplikacja webowa / MVP',
      forWhom: 'Dla firmy, która chce sprawdzić proces lub produkt na działającej, ograniczonej wersji.',
      result: 'Zakres pierwszej wersji, który da się wdrożyć, przetestować i dalej rozwijać.',
      price: 'od 15 000 zł',
      timeframe: 'po analizie zakresu',
      revisions: 'ustalane w planie etapów',
      support: 'ustalane indywidualnie',
      features: ['analiza funkcji i priorytetów', 'UX/UI kluczowych widoków', 'frontend i backend', 'integracje i wdrożenie'],
      exclusions: ['nieograniczony zakres', 'funkcje spoza zaakceptowanego backlogu'],
    },
  ],
  en: [
    {
      id: 'landing',
      name: 'Focused landing page',
      forWhom: 'For one service, campaign or new offer that needs a clear online explanation.',
      result: 'One focused page that leads visitors towards a specific action.',
      price: 'from PLN 3,500',
      timeframe: '2–3 weeks',
      revisions: '1 revision round',
      support: '14 days of support',
      features: [
        'up to 7 purposeful sections',
        'structure and editing of client materials',
        'custom UX/UI and mobile layout',
        'form, essential SEO and analytics',
        'deployment and domain assistance',
      ],
      exclusions: ['full copywriting', 'CMS', 'complex integrations'],
    },
    {
      id: 'website',
      name: 'A website built for enquiries',
      forWhom: 'For a service business that needs to explain its offer credibly and make choosing easier.',
      result: 'A complete website ready for referrals, campaigns and enquiry measurement.',
      price: 'from PLN 6,500',
      timeframe: '3–5 weeks',
      revisions: '2 revision rounds',
      support: '30 days of support',
      features: [
        'up to 5 pages',
        'structure workshop and content editing',
        'custom UX/UI and WCAG accessibility',
        'forms, on-page SEO and Schema.org',
        'analytics, launch and domain setup',
      ],
      exclusions: ['full copywriting', 'CMS', 'e-commerce and payments'],
      featured: true,
    },
    {
      id: 'mvp',
      name: 'Web application / MVP',
      forWhom: 'For a business that needs to validate a process or product with a focused working release.',
      result: 'A first version that can be launched, tested and developed further.',
      price: 'from PLN 15,000',
      timeframe: 'after scope review',
      revisions: 'defined in the delivery plan',
      support: 'defined individually',
      features: ['feature and priority review', 'UX/UI for core views', 'frontend and backend', 'integrations and deployment'],
      exclusions: ['unlimited scope', 'features outside the accepted backlog'],
    },
  ],
};

export const siteContent = {
  pl: {
    langName: 'PL',
    alternateHref: '/en',
    alternateLabel: 'English',
    navigation: [
      { label: 'Oferta', href: '#oferta' },
      { label: 'Projekty', href: '#projekty' },
      { label: 'Proces', href: '#proces' },
      { label: 'FAQ', href: '#faq' },
    ],
    hero: {
      eyebrow: 'Projekt · treść · wdrożenie',
      title: 'Strony internetowe, które pomagają firmom usługowym zdobywać zapytania.',
      description:
        'Porządkuję ofertę, projektuję czytelny interfejs i wdrażam szybką stronę gotową do promocji. Bez technicznego żargonu i bez zostawiania Cię z pustym szablonem.',
      primary: 'Otrzymaj wstępną wycenę',
      secondary: 'Zobacz projekty',
      note: 'Odpowiadam w ciągu jednego dnia roboczego.',
    },
    heroVariants: [
      'Strony internetowe, które pomagają firmom usługowym zdobywać zapytania.',
      'Twoja oferta zasługuje na stronę, która ułatwia klientom decyzję.',
      'Projektuję strony dla specjalistów, którzy chcą wyglądać wiarygodnie i pozyskiwać kontakty.',
      'Od niejasnej oferty do strony gotowej na pierwsze zapytania.',
      'Strona firmowa zaprojektowana wokół pytań Twoich klientów.',
    ],
    problems: {
      eyebrow: 'Po co nowa strona',
      title: 'Dobra strona nie zastąpi sprzedaży. Może jednak przestać ją utrudniać.',
      intro: 'Najczęściej nie brakuje efektów czy animacji. Brakuje jasnej odpowiedzi na trzy proste pytania.',
      items: [
        ['Co właściwie oferujesz?', 'Porządkuję usługi i nazywam je językiem zrozumiałym bez znajomości technologii.'],
        ['Dlaczego warto Ci zaufać?', 'Pokazuję proces, zakres i prawdziwe dowody bez sztucznych opinii i liczb.'],
        ['Co zrobić dalej?', 'Projektuję jeden czytelny krok: formularz, e-mail albo rozmowę — zależnie od usługi.'],
      ],
    },
    offer: { eyebrow: 'Pakiety', title: 'Punkt startowy zamiast wyceny z sufitu', intro: 'Zakres i cenę końcową potwierdzam po krótkiej rozmowie. Wiesz jednak od początku, jaki poziom budżetu ma sens.' },
    projects: { eyebrow: 'Projekty', title: 'Koncepcje pokazane uczciwie', intro: 'Nie przypisuję im fikcyjnych klientów ani wyników. Każda pokazuje konkretny problem, decyzje projektowe i zakres pracy.' },
    process: {
      eyebrow: 'Proces',
      title: 'Wiesz, co dzieje się z projektem',
      steps: [
        ['01', 'Rozmowa i zakres', 'Ustalamy cel, odbiorców, materiały, funkcje i ryzyka. Otrzymujesz zakres oraz harmonogram.'],
        ['02', 'Struktura i treść', 'Układam ścieżkę strony i redaguję dostarczone materiały. Akceptujesz kierunek przed projektowaniem.'],
        ['03', 'Projekt i wdrożenie', 'Projektuję najważniejsze widoki, a po akceptacji wdrażam je responsywnie i dostępnie.'],
        ['04', 'Testy i publikacja', 'Sprawdzam formularze, SEO, analitykę, urządzenia i przeglądarki. Po akceptacji uruchamiamy stronę.'],
      ],
    },
    trust: {
      eyebrow: 'MikeRoe',
      title: 'Jedna osoba odpowiedzialna za całą stronę',
      body:
        'Rozmawiasz bezpośrednio z osobą, która układa strukturę, projektuje interfejs i wdraża kod. Dzięki temu decyzje nie giną między sprzedawcą, projektantem i programistą.',
      points: ['Prosty język i jawny zakres', 'Projekt mobile-first i WCAG', 'Next.js, React i .NET jako zaplecze — nie argument sprzedażowy'],
    },
    faqTitle: 'Pytania przed rozpoczęciem',
    faqs: [
      ['Ile kosztuje strona internetowa?', 'Landing page zaczyna się od 3 500 zł, a strona firmowa od 6 500 zł. Końcowa cena zależy od liczby podstron, materiałów, integracji i sposobu edycji treści.'],
      ['Ile trwa realizacja?', 'Landing zwykle zajmuje 2–3 tygodnie, a strona firmowa 3–5 tygodni od zebrania materiałów i rezerwacji terminu.'],
      ['Co muszę przygotować?', 'Na początku potrzebuję informacji o usłudze, klientach, zakresie i materiałach, które już masz. Pomagam je uporządkować i redaguję, ale pełny copywriting jest dodatkiem.'],
      ['Czy pomagasz z domeną i hostingiem?', 'Tak. Pomagam wybrać i skonfigurować domenę, hosting oraz publikację. Koszty usług zewnętrznych są rozliczane osobno.'],
      ['Czy przygotowujesz teksty?', 'W pakiecie układam strukturę i redaguję materiały klienta. Pełne napisanie tekstów od zera można dodać do projektu od 1 500 zł.'],
      ['Czy strona będzie działała na telefonie?', 'Tak. Projektuję mobile-first i sprawdzam kluczowe szerokości przed przekazaniem strony.'],
      ['Czy strona będzie widoczna w Google?', 'Wdrażam techniczne SEO, prawidłowe nagłówki, metadane, sitemapę i dane strukturalne. Pozycje zależą również od konkurencji, treści, historii domeny i dalszych działań — nie obiecuję konkretnego miejsca.'],
      ['Czy będę mógł sam zmieniać treść?', 'Jeżeli treści będą zmieniane często, mogę dodać CMS od 1 500 zł. W prostszych stronach zmiany można zlecać pojedynczo lub w ramach opieki.'],
      ['Jak wygląda płatność?', '50% przy rezerwacji terminu i 50% po akceptacji, przed publikacją. Inny harmonogram dla większego MVP ustalamy w zakresie prac.'],
      ['Co dzieje się po uruchomieniu?', 'Pakiet landing obejmuje 14 dni, a strona firmowa 30 dni wsparcia po publikacji. Dalsza opieka zaczyna się od 300 zł miesięcznie.'],
    ],
    contact: {
      eyebrow: 'Kontakt',
      title: 'Opowiedz krótko, czego potrzebujesz',
      description: 'Nie musisz mieć gotowego briefu. Wystarczy problem, rodzaj projektu i podstawowy kontekst. Odpowiem z kolejnym krokiem w ciągu jednego dnia roboczego.',
    },
    finalCta: { title: 'Sprawdźmy, czy mogę pomóc w Twoim projekcie.', button: 'Otrzymaj wstępną wycenę' },
    packages: packages.pl,
    projectsData: sharedProjects.pl,
  },
  en: {
    langName: 'EN',
    alternateHref: '/',
    alternateLabel: 'Polski',
    navigation: [
      { label: 'Services', href: '#services' },
      { label: 'Work', href: '#work' },
      { label: 'Process', href: '#process' },
      { label: 'FAQ', href: '#faq' },
    ],
    hero: {
      eyebrow: 'Strategy · design · development',
      title: 'Websites that help service businesses generate enquiries.',
      description:
        'I organise your offer, design a clear interface and build a fast website ready for promotion. No technical jargon and no empty template left for you to finish.',
      primary: 'Get an initial estimate',
      secondary: 'See the work',
      note: 'I reply within one business day.',
    },
    heroVariants: [
      'Websites that help service businesses generate enquiries.',
      'Your offer deserves a website that makes choosing easier.',
      'Websites for specialists who need credibility and a clear contact path.',
      'From a confusing offer to a website ready for real enquiries.',
      'A service-business website built around your customers’ questions.',
    ],
    problems: {
      eyebrow: 'Why rebuild',
      title: 'A good website will not replace sales. It can stop getting in the way.',
      intro: 'Most websites do not need more effects. They need clear answers to three simple questions.',
      items: [
        ['What do you actually offer?', 'I structure services and describe them in language that does not require technical knowledge.'],
        ['Why should someone trust you?', 'I show process, scope and real evidence without invented reviews or numbers.'],
        ['What should the visitor do next?', 'I design one clear step: a form, email or call depending on the service.'],
      ],
    },
    offer: { eyebrow: 'Packages', title: 'A useful starting point, not a mystery quote', intro: 'I confirm the final scope and price after a short conversation. You still know the realistic budget level from the start.' },
    projects: { eyebrow: 'Work', title: 'Concept work, labelled honestly', intro: 'These projects do not pretend to have clients or measured outcomes. Each explains the problem, design decisions and delivered scope.' },
    process: {
      eyebrow: 'Process',
      title: 'You always know what happens next',
      steps: [
        ['01', 'Conversation and scope', 'We define the goal, audience, materials, features and risks. You receive a scope and schedule.'],
        ['02', 'Structure and content', 'I build the page journey and edit your source materials. You approve the direction before visual design.'],
        ['03', 'Design and development', 'I design the key views, then implement them responsively and accessibly after approval.'],
        ['04', 'Testing and launch', 'I check forms, SEO, analytics, devices and browsers. We launch after your approval.'],
      ],
    },
    trust: {
      eyebrow: 'MikeRoe',
      title: 'One person accountable for the whole website',
      body:
        'You work directly with the person who structures the offer, designs the interface and writes the code. Decisions do not get lost between sales, design and development.',
      points: ['Plain language and explicit scope', 'Mobile-first and WCAG-aware delivery', 'Next.js, React and .NET as technical support — not the sales pitch'],
    },
    faqTitle: 'Questions before you start',
    faqs: [
      ['How much does a website cost?', 'A landing page starts at PLN 3,500 and a company website at PLN 6,500. The final price depends on pages, source material, integrations and editing needs.'],
      ['How long does it take?', 'A landing page usually takes 2–3 weeks and a company website 3–5 weeks after materials are collected and the slot is booked.'],
      ['What do I need to prepare?', 'I need information about the service, customers, scope and any materials you already have. I help organise and edit them; full copywriting is an add-on.'],
      ['Do you help with domains and hosting?', 'Yes. I help select and configure the domain, hosting and launch. Third-party service costs are billed separately.'],
      ['Do you write the content?', 'Structure and editing of your materials are included. Full copywriting from scratch can be added from PLN 1,500.'],
      ['Will it work on mobile?', 'Yes. I design mobile-first and test the key viewport widths before handover.'],
      ['Will it appear in Google?', 'I implement technical SEO, headings, metadata, sitemap and structured data. Rankings also depend on competition, content, domain history and continued work, so I do not promise a position.'],
      ['Can I edit the content?', 'If content changes frequently, I can add a CMS from PLN 1,500. Simpler websites can be updated as one-off work or through a care plan.'],
      ['How does payment work?', '50% books the project and 50% is due after approval, before launch. Larger MVP projects can use a separate milestone schedule.'],
      ['What happens after launch?', 'A landing includes 14 days and a company website 30 days of post-launch support. Ongoing care starts at PLN 300 per month.'],
    ],
    contact: {
      eyebrow: 'Contact',
      title: 'Tell me briefly what you need',
      description: 'You do not need a finished brief. A problem, project type and basic context are enough. I will reply with the next step within one business day.',
    },
    finalCta: { title: 'Let’s see whether I can help with your project.', button: 'Get an initial estimate' },
    packages: packages.en,
    projectsData: sharedProjects.en,
  },
} as const;

export const servicePages: Record<Locale, Record<ServiceKey, {
  eyebrow: string;
  title: string;
  description: string;
  outcome: string;
  sections: { title: string; body: string }[];
  cta: string;
}>> = {
  pl: {
    websites: {
      eyebrow: 'Strony dla firm usługowych',
      title: 'Strona firmowa, która porządkuje ofertę i prowadzi do kontaktu',
      description: 'Dla specjalistów i małych firm, których klient przed rozmową chce sprawdzić zakres, wiarygodność i sposób współpracy.',
      outcome: 'Otrzymujesz do 5 podstron, jasną strukturę, redakcję materiałów, indywidualny projekt, formularz, SEO, analitykę i publikację.',
      sections: [
        { title: 'Najpierw decyzja klienta', body: 'Układ strony wynika z pytań odbiorcy: czego potrzebuje, czy oferta pasuje, dlaczego warto zaufać i jak zacząć.' },
        { title: 'Treść bez branżowego muru', body: 'Redaguję dostarczone materiały tak, aby korzyści i zakres były zrozumiałe bez specjalistycznej wiedzy.' },
        { title: 'Gotowa do promocji', body: 'Strona otrzymuje techniczne SEO, pomiar kluczowych zdarzeń, poprawne udostępnianie i wygodny formularz.' },
      ],
      cta: 'Zapytaj o stronę firmową',
    },
    landing: {
      eyebrow: 'Landing page',
      title: 'Jedna oferta. Jedna strona. Jeden czytelny następny krok.',
      description: 'Landing page dla kampanii, nowej usługi albo firmy, która nie potrzebuje jeszcze rozbudowanego serwisu.',
      outcome: 'Do 7 sekcji, struktura i redakcja materiałów, indywidualny projekt, formularz, SEO, analityka i wdrożenie.',
      sections: [
        { title: 'Skupienie na jednym celu', body: 'Każda sekcja wspiera tę samą decyzję zamiast rozpraszać odbiorcę wieloma równorzędnymi ścieżkami.' },
        { title: 'Zakres znany wcześniej', body: 'Przed projektem akceptujesz strukturę, treść, liczbę sekcji i sposób kontaktu.' },
        { title: 'Mobilny od pierwszego szkicu', body: 'Najważniejsza wersja powstaje z myślą o telefonie, gdzie często trafia ruch z kampanii i social media.' },
      ],
      cta: 'Zapytaj o landing page',
    },
    mvp: {
      eyebrow: 'Aplikacje webowe i MVP',
      title: 'Pierwsza wersja produktu bez udawania, że wszystko jest priorytetem',
      description: 'Dla firmy, która chce usprawnić proces, uruchomić panel lub sprawdzić pomysł przed większą inwestycją.',
      outcome: 'Zakres kluczowych funkcji, projekt najważniejszych widoków, działająca aplikacja, integracje i plan dalszego rozwoju.',
      sections: [
        { title: 'Zakres przed kodem', body: 'Dzielimy funkcje na niezbędne, późniejsze i zbędne dla pierwszego testu. Dzięki temu wycena ma konkretne granice.' },
        { title: 'Działający przepływ', body: 'MVP obejmuje kompletną ścieżkę użytkownika, a nie zbiór efektownych, lecz niepołączonych ekranów.' },
        { title: 'Technologia dobrana do ryzyka', body: 'Next.js, React, C#/.NET lub usługi zarządzane dobieram do funkcji, bezpieczeństwa i dalszego utrzymania.' },
      ],
      cta: 'Omów zakres MVP',
    },
  },
  en: {
    websites: {
      eyebrow: 'Websites for service businesses',
      title: 'A company website that organises the offer and leads to contact',
      description: 'For specialists and small companies whose customers want to check scope, credibility and process before they get in touch.',
      outcome: 'Up to 5 pages, clear structure, content editing, custom design, forms, SEO, analytics and launch.',
      sections: [
        { title: 'Start with the customer decision', body: 'The structure follows the visitor’s questions: what they need, whether the offer fits, why to trust it and how to start.' },
        { title: 'Content without an industry wall', body: 'I edit your source materials so benefits and scope make sense without specialist knowledge.' },
        { title: 'Ready for promotion', body: 'The website includes technical SEO, key-event measurement, social sharing and a practical enquiry form.' },
      ],
      cta: 'Ask about a company website',
    },
    landing: {
      eyebrow: 'Landing pages',
      title: 'One offer. One page. One clear next step.',
      description: 'A landing page for a campaign, a new service or a business that does not yet need a large website.',
      outcome: 'Up to 7 sections, structure and content editing, custom design, form, SEO, analytics and deployment.',
      sections: [
        { title: 'One primary goal', body: 'Every section supports the same decision instead of splitting attention across equal paths.' },
        { title: 'Scope agreed first', body: 'You approve the structure, content, number of sections and contact path before visual design.' },
        { title: 'Mobile from the first sketch', body: 'The primary version is designed for phones, where campaign and social traffic often arrives.' },
      ],
      cta: 'Ask about a landing page',
    },
    mvp: {
      eyebrow: 'Web applications and MVPs',
      title: 'A first product release without pretending everything is a priority',
      description: 'For a business that wants to improve a process, launch a portal or validate an idea before a larger investment.',
      outcome: 'A focused feature scope, key-view design, a working application, integrations and a path for further development.',
      sections: [
        { title: 'Scope before code', body: 'We separate essential, later and unnecessary features for the first test, giving the estimate clear boundaries.' },
        { title: 'A working flow', body: 'The MVP covers a complete user journey, not a set of impressive but disconnected screens.' },
        { title: 'Technology matched to risk', body: 'Next.js, React, C#/.NET or managed services are chosen around features, security and maintenance.' },
      ],
      cta: 'Discuss an MVP scope',
    },
  },
};

export const localePath = (locale: Locale, plPath: string, enPath: string) =>
  locale === 'pl' ? plPath : `/en${enPath}`;
