import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { EncryptionDemo } from "@/components/encryption-demo"
import { FeaturesGrid } from "@/components/features-grid"
import { CodeShowcase } from "@/components/code-showcase"
import { ProofOfConcept } from "@/components/proof-of-concept"
import { DisclaimerSection } from "@/components/disclaimer-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Navbar />

      <HeroSection />

      <div id="demo" className="scroll-mt-20">
        <EncryptionDemo />
      </div>

      <div id="features" className="scroll-mt-20">
        <FeaturesGrid />
      </div>

      <div id="code" className="scroll-mt-20">
        <CodeShowcase />
      </div>

      <div id="poc" className="scroll-mt-20">
        <ProofOfConcept />
      </div>

      <DisclaimerSection />
      <Footer />
    </main>
  )
}
