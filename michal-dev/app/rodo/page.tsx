import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RODO | MikeRoe - Fullstack Developer',
  description: 'Informacje o przetwarzaniu danych osobowych zgodnie z RODO na stronie mikeroe.pl.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function RodoPage() {
  return (
    <main id="main" className="min-h-screen py-24 px-4 sm:px-8 xl:px-16 2xl:px-24">
      <article className="w-full max-w-[800px] mx-auto">
        <header className="mb-12">
          <h1 className="text-white font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Informacja RODO
          </h1>
          <p className="text-muted text-sm">
            Klauzula informacyjna dotycząca przetwarzania danych osobowych
          </p>
        </header>

        <div className="prose prose-invert prose-gray max-w-none space-y-8">
          <section className="bg-surface border border-border rounded-xl p-6">
            <p className="text-gray-300 leading-relaxed">
              Zgodnie z art. 13 ust. 1 i 2 Rozporządzenia Parlamentu Europejskiego i Rady (UE)
              2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku
              z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych
              (RODO), informuję, że:
            </p>
          </section>

          <section>
            <h2 className="text-white font-display text-xl font-bold mb-4">
              Administrator danych osobowych
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Administratorem Pani/Pana danych osobowych jest MikeRoe, prowadzący działalność
              w zakresie usług web development pod adresem mikeroe.pl.
            </p>
          </section>

          <section>
            <h2 className="text-white font-display text-xl font-bold mb-4">
              Cel i podstawa przetwarzania
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Pani/Pana dane osobowe przetwarzane będą w celu:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>
                Odpowiedzi na zapytanie przesłane przez formularz kontaktowy
                (podstawa: art. 6 ust. 1 lit. a RODO - zgoda)
              </li>
              <li>
                Nawiązania i realizacji współpracy biznesowej
                (podstawa: art. 6 ust. 1 lit. b RODO - wykonanie umowy)
              </li>
              <li>
                Realizacji prawnie uzasadnionych interesów administratora
                (podstawa: art. 6 ust. 1 lit. f RODO)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-display text-xl font-bold mb-4">
              Odbiorcy danych
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Odbiorcami Pani/Pana danych osobowych mogą być podmioty świadczące usługi
              hostingowe, dostawcy usług email oraz inne podmioty, którym administrator
              powierza przetwarzanie danych osobowych na podstawie umów powierzenia.
            </p>
          </section>

          <section>
            <h2 className="text-white font-display text-xl font-bold mb-4">
              Okres przechowywania
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Pani/Pana dane osobowe będą przechowywane przez okres niezbędny do realizacji
              celów przetwarzania, a po tym czasie przez okres wymagany przepisami prawa
              lub do momentu przedawnienia roszczeń.
            </p>
          </section>

          <section>
            <h2 className="text-white font-display text-xl font-bold mb-4">
              Prawa osoby, której dane dotyczą
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Przysługuje Pani/Panu prawo do:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>Dostępu do treści swoich danych (art. 15 RODO)</li>
              <li>Sprostowania danych (art. 16 RODO)</li>
              <li>Usunięcia danych (art. 17 RODO)</li>
              <li>Ograniczenia przetwarzania (art. 18 RODO)</li>
              <li>Przenoszenia danych (art. 20 RODO)</li>
              <li>Wniesienia sprzeciwu (art. 21 RODO)</li>
              <li>Cofnięcia zgody w dowolnym momencie bez wpływu na zgodność z prawem
                  przetwarzania dokonanego przed jej cofnięciem</li>
              <li>Wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-display text-xl font-bold mb-4">
              Informacja o wymogu podania danych
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Podanie danych osobowych jest dobrowolne, jednak niezbędne do udzielenia
              odpowiedzi na zapytanie lub nawiązania współpracy.
            </p>
          </section>

          <section>
            <h2 className="text-white font-display text-xl font-bold mb-4">
              Zautomatyzowane podejmowanie decyzji
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Pani/Pana dane osobowe nie będą przetwarzane w sposób zautomatyzowany,
              w tym również w formie profilowania.
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
