import LiveScoreTicker from "@/components/LiveScoreTicker";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ContentSection from "@/components/ContentSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <LiveScoreTicker />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ContentSection />
      <StatsSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
