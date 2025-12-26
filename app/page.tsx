import { HeroSection } from "@/components/hero-section"
import { EncryptionDemo } from "@/components/encryption-demo"
import { FeaturesGrid } from "@/components/features-grid"
import { CodeShowcase } from "@/components/code-showcase"
import { ProofOfConcept } from "@/components/proof-of-concept"
import { DisclaimerSection } from "@/components/disclaimer-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <EncryptionDemo />
      <FeaturesGrid />
      <CodeShowcase />
      <ProofOfConcept />
      <DisclaimerSection />
      <Footer />
    </main>
  )
}
