import { HeroSection } from "@/components/hero-section"
import { FeaturesGrid } from "@/components/features-grid"
import { CodeShowcase } from "@/components/code-showcase"
import { PhilosophySection } from "@/components/philosophy-section"
import { DisclaimerSection } from "@/components/disclaimer-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <FeaturesGrid />
      <CodeShowcase />
      <PhilosophySection />
      <DisclaimerSection />
      <Footer />
    </main>
  )
}
