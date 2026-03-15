import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Polityka Prywatności | MikeRoe - Fullstack Developer',
  description: 'Polityka prywatności strony mikeroe.pl. Informacje o przetwarzaniu danych osobowych.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main id="main" className="min-h-screen py-24 px-4 sm:px-8 xl:px-16 2xl:px-24">
      <article className="w-full max-w-[800px] mx-auto">
        <header className="mb-12">
          <h1 className="text-white font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Polityka Prywatności
          </h1>
          <p className="text-muted text-sm">
            Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}
          </p>
        </header>

        <div className="prose prose-invert prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-white font-display text-xl font-bold mb-4">
              1. Administrator danych
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Administratorem danych osobowych jest MikeRoe, prowadzący działalność pod adresem
              mikeroe.pl. Kontakt z administratorem możliwy jest poprzez formularz kontaktowy
              dostępny na stronie głównej.
            </p>
          </section>

          <section>
            <h2 className="text-white font-display text-xl font-bold mb-4">
              2. Zakres zbieranych danych
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Zbieramy następujące dane osobowe:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>Imię i nazwisko (formularz kontaktowy)</li>
              <li>Adres email (formularz kontaktowy)</li>
              <li>Nazwa firmy (opcjonalnie)</li>
              <li>Treść wiadomości</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-display text-xl font-bold mb-4">
              3. Cel przetwarzania danych
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Dane osobowe przetwarzane są w celu odpowiedzi na zapytania przesłane przez
              formularz kontaktowy oraz w celu nawiązania współpracy biznesowej.
            </p>
          </section>

          <section>
            <h2 className="text-white font-display text-xl font-bold mb-4">
              4. Podstawa prawna
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Podstawą prawną przetwarzania danych jest zgoda osoby, której dane dotyczą
              (art. 6 ust. 1 lit. a RODO) oraz prawnie uzasadniony interes administratora
              (art. 6 ust. 1 lit. f RODO).
            </p>
          </section>

          <section>
            <h2 className="text-white font-display text-xl font-bold mb-4">
              5. Okres przechowywania danych
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Dane osobowe przechowywane są przez okres niezbędny do realizacji celów,
              dla których zostały zebrane, nie dłużej niż 3 lata od ostatniego kontaktu.
            </p>
          </section>

          <section>
            <h2 className="text-white font-display text-xl font-bold mb-4">
              6. Prawa użytkownika
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Użytkownik ma prawo do:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>Dostępu do swoich danych osobowych</li>
              <li>Sprostowania danych</li>
              <li>Usunięcia danych (&quot;prawo do bycia zapomnianym&quot;)</li>
              <li>Ograniczenia przetwarzania</li>
              <li>Przenoszenia danych</li>
              <li>Wniesienia sprzeciwu wobec przetwarzania</li>
              <li>Cofnięcia zgody w dowolnym momencie</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-display text-xl font-bold mb-4">
              7. Pliki cookies
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Strona może wykorzystywać pliki cookies w celu zapewnienia prawidłowego
              działania oraz analizy ruchu. Użytkownik może zarządzać ustawieniami
              cookies w swojej przeglądarce.
            </p>
          </section>

          <section>
            <h2 className="text-white font-display text-xl font-bold mb-4">
              8. Kontakt
            </h2>
            <p className="text-gray-400 leading-relaxed">
              W sprawach związanych z ochroną danych osobowych prosimy o kontakt
              poprzez formularz na stronie głównej.
            </p>
          </section>
        </div>

        <footer className="mt-16 pt-8 border-t border-border">
          <a
            href="/"
            className="text-[#FF6B35] hover:underline text-sm font-medium"
          >
            ← Powrót do strony głównej
          </a>
        </footer>
      </article>
    </main>
  );
}
