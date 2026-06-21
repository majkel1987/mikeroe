import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/HeroSection';
import SectionEntrance from '@/components/SectionEntrance';

// Lazy load below-fold sections for better initial load performance
const ServicesSection = dynamic(() => import('@/components/sections/ServicesSection'), {
  loading: () => <div className="min-h-screen" />,
});
const PortfolioSection = dynamic(() => import('@/components/sections/PortfolioSection'), {
  loading: () => <div className="min-h-screen" />,
});
const TechStackSection = dynamic(() => import('@/components/sections/TechStackSection'), {
  loading: () => <div className="min-h-screen" />,
});
const PricingSection = dynamic(() => import('@/components/sections/PricingSection'), {
  loading: () => <div className="min-h-screen" />,
});
const ContactSection = dynamic(() => import('@/components/sections/ContactSection'), {
  loading: () => <div className="min-h-screen" />,
});

export default function Home() {
  return (
    <main id="main" className="flex min-h-screen w-full max-w-full flex-col items-center justify-between overflow-x-hidden">
      <HeroSection />
      <SectionEntrance>
        <ServicesSection />
      </SectionEntrance>
      <SectionEntrance>
        <PortfolioSection />
      </SectionEntrance>
      <SectionEntrance>
        <TechStackSection />
      </SectionEntrance>
      <SectionEntrance>
        <PricingSection />
      </SectionEntrance>
      <SectionEntrance>
        <ContactSection />
      </SectionEntrance>
    </main>
  );
}
