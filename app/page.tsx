import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ChatShowcase } from "@/components/chat-showcase"
import { FeaturesGrid } from "@/components/features-grid"
import { EncryptionDemo } from "@/components/encryption-demo"
import { CodeShowcase } from "@/components/code-showcase"
import { CipherSection } from "@/components/cipher-section"
import { DisclaimerSection } from "@/components/disclaimer-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Navbar />

      <HeroSection />

      <div id="client" className="scroll-mt-20">
        <ChatShowcase />
      </div>

      <div id="features" className="scroll-mt-20">
        <FeaturesGrid />
      </div>

      <div id="security" className="scroll-mt-20">
        <EncryptionDemo />
      </div>

      <div id="start" className="scroll-mt-20">
        <CodeShowcase />
      </div>

      <div id="cipher" className="scroll-mt-20">
        <CipherSection />
      </div>

      <DisclaimerSection />
      <Footer />
    </main>
  )
}
