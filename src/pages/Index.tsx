import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedTemplates } from '@/components/home/FeaturedTemplates';
import { mockTemplates } from '@/data/mockData';

const Index = () => {
  // In production, use React Query to fetch from API
  const templates = mockTemplates.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturedTemplates templates={templates} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
