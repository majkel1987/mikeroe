import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/site-content';
import HtmlLang from './HtmlLang';

export default function PhysioflowDemo({ locale }: { locale: Locale }) {
  const isPl = locale === 'pl';
  const home = isPl ? '/' : '/en';

  return (
    <div className="physio-demo">
      <HtmlLang locale={locale} />
      <aside className="concept-banner">
        <strong>{isPl ? 'Projekt koncepcyjny' : 'Concept project'}</strong>
        <span>{isPl ? 'To nie jest strona rzeczywistego gabinetu.' : 'This is not a real practice website.'}</span>
        <Link href={isPl ? '/projekty/physioflow' : '/en/work/physioflow'}>
          {isPl ? 'Zobacz case study' : 'View case study'} →
        </Link>
      </aside>
      <header className="physio-header">
        <Link href={`${home}/demo/physioflow`.replace('//', '/')}>physioflow<span>.</span></Link>
        <nav aria-label={isPl ? 'Nawigacja demonstracyjna' : 'Demo navigation'}>
          <a href="#services">{isPl ? 'Pomoc' : 'Services'}</a>
          <a href="#first-visit">{isPl ? 'Pierwsza wizyta' : 'First visit'}</a>
          <a href="#contact">{isPl ? 'Kontakt' : 'Contact'}</a>
        </nav>
      </header>
      <main>
        <section className="physio-hero">
          <div>
            <p>{isPl ? 'Fizjoterapia bez zgadywania' : 'Physiotherapy without guesswork'}</p>
            <h1>{isPl ? 'Zrozum swój problem. Poznaj plan. Wróć do ruchu krok po kroku.' : 'Understand the problem. Know the plan. Return to movement step by step.'}</h1>
            <p>
              {isPl
                ? 'Spokojna pierwsza konsultacja, jasne wyjaśnienie i terapia dopasowana do tego, czego potrzebujesz na co dzień.'
                : 'A calm first consultation, plain explanation and therapy shaped around what you need in daily life.'}
            </p>
            <a className="physio-button" href="#contact">{isPl ? 'Zapytaj o termin' : 'Ask about availability'}</a>
          </div>
          <Image src="/images/physioflow-concept.webp" alt="" width={1600} height={1067} priority sizes="(max-width: 900px) 100vw, 50vw" />
        </section>
        <section className="physio-services" id="services">
          <p>{isPl ? 'W czym pomagam' : 'How I help'}</p>
          <h2>{isPl ? 'Zacznij od potrzeby, nie od nazwy zabiegu' : 'Start with the need, not a treatment name'}</h2>
          <div>
            {[
              isPl ? ['Ból i przeciążenia', 'Ocena problemu i plan powrotu do codziennych aktywności.'] : ['Pain and overload', 'Assessment and a plan for returning to everyday activity.'],
              isPl ? ['Powrót po urazie', 'Stopniowe odzyskiwanie ruchu i pewności po zakończeniu leczenia.'] : ['Recovery after injury', 'A gradual return to movement and confidence after treatment.'],
              isPl ? ['Profilaktyka ruchowa', 'Praca nad nawykami i ruchem dopasowana do pracy oraz sportu.'] : ['Movement prevention', 'Habits and movement work shaped around work and sport.'],
            ].map(([title, body], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="physio-first" id="first-visit">
          <div>
            <p>{isPl ? 'Pierwsza wizyta' : 'First visit'}</p>
            <h2>{isPl ? 'Najpierw rozmowa i badanie. Dopiero później plan.' : 'Conversation and assessment first. The plan follows.'}</h2>
          </div>
          <ol>
            <li><span>1</span>{isPl ? 'Rozmawiamy o problemie i celu' : 'We discuss the problem and goal'}</li>
            <li><span>2</span>{isPl ? 'Sprawdzamy ruch i obciążenia' : 'We assess movement and load'}</li>
            <li><span>3</span>{isPl ? 'Ustalamy zrozumiały plan dalszej pracy' : 'We agree on a clear plan'}</li>
          </ol>
        </section>
        <section className="physio-contact" id="contact">
          <p>{isPl ? 'Kontakt demonstracyjny' : 'Demo contact'}</p>
          <h2>{isPl ? 'Opisz krótko, z czym przychodzisz' : 'Briefly describe what brings you here'}</h2>
          <p>{isPl ? 'W prawdziwym wdrożeniu w tym miejscu działałby formularz gabinetu i zweryfikowane dane kontaktowe.' : 'In a real implementation, this area would contain the practice form and verified contact details.'}</p>
          <Link className="physio-button" href={isPl ? '/projekty/physioflow' : '/en/work/physioflow'}>
            {isPl ? 'Wróć do case study' : 'Back to case study'}
          </Link>
        </section>
      </main>
      <footer className="physio-footer">Physioflow — {isPl ? 'projekt koncepcyjny MikeRoe' : 'a MikeRoe concept project'}</footer>
    </div>
  );
}
