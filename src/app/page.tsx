// app/page.tsx
import { MLHeroSection } from "@/components/ml-hero-section";
import { FeaturedCoursesSection } from "@/components/featured-courses-section";
import { OfferingsSection } from "@/components/offerings-section";
import { StatsSection } from "@/components/stats-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CTASection } from "@/components/cta-section";
import TeamSection from "@/components/team";

export default function HomePage() {
  return (
    <div>
      <MLHeroSection />
      <FeaturedCoursesSection />
      <OfferingsSection />
      <StatsSection />
      <TestimonialsSection />
      {/* <CTASection /> */}
      <TeamSection/>
    </div>
  );
}
