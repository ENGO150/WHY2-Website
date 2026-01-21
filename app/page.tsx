import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { EncryptionDemo } from "@/components/encryption-demo"
import { FeaturesGrid } from "@/components/features-grid"
import { CodeShowcase } from "@/components/code-showcase"
import { ProofOfConcept } from "@/components/proof-of-concept"
import { DisclaimerSection } from "@/components/disclaimer-section"
import { Footer } from "@/components/footer"

async function getWhy2Version() {
  try {
    const res = await fetch("https://crates.io/api/v1/crates/why2", {
      headers: {
        "User-Agent": "WHY2-Website",
      },
      next: { revalidate: 600 }
    });

    if (!res.ok) throw new Error("Failed to fetch version");

    const data = await res.json();
    return data.crate.default_version;
  } catch (error) {
    console.error("Error fetching version:", error);
    return null;
  }
}

export default async function Home() {
  const version = await getWhy2Version();

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Navbar />

      <HeroSection latestVersion={version || undefined} />

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
