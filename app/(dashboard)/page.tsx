import HeroSection from '@/components/HeroSection';
import PortalCards from '@/components/PortalCards';
import StatsSection from '@/components/StatsSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />

      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <PortalCards />

          <div className="mt-10 text-center text-sm text-gray-400 max-w-2xl mx-auto space-y-1">
            <p>
              This is a <strong className="text-gray-500">potential platform showcase</strong> — featuring recommended portal features if you were to build a custom system.
            </p>
            <p>All data is mock/sample for demonstration purposes.</p>
          </div>
        </div>
      </section>

      <StatsSection />
      <Footer />
    </main>
  );
}
