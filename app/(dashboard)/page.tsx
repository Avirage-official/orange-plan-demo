import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import PortalShowcaseCards from '@/components/PortalShowcaseCards';
import BenefitsSection from '@/components/BenefitsSection';
import FeatureComparisonTable from '@/components/FeatureComparisonTable';
import TechStackSection from '@/components/TechStackSection';
import RoadmapSection from '@/components/RoadmapSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="flex-1">
      <Navigation />
      <HeroSection />
      <PortalShowcaseCards />
      <BenefitsSection />
      <FeatureComparisonTable />

      <TechStackSection />
      <RoadmapSection />
      <CTASection />
      <Footer />
    </main>
  );
}
