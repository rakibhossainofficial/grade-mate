import FaqSection from "@/components/FaqSection/FaqSection";
import FeaturedAssignments from "@/components/FeaturedAssignments/FeaturedAssignments";
import HeroSection from "@/components/HeroSection/HeroSection";
import HighlightsSection from "@/components/HighlightsSection/HighlightsSection";
import FeaturesSection from "@/components/FeaturesSection/FeaturesSection";
import TimelineSection from "@/components/TimelineSection/TimelineSection";

export default function Home() {
  return (
    <section>
      <HeroSection />
      <div className="container mx-auto px-6\">
        <FeaturedAssignments />
        <FaqSection />
        <HighlightsSection />
        <FeaturesSection />
        <TimelineSection />
      </div>
    </section>
  );
}
