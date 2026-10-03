import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Security } from "@/components/security"
import { QuickStart } from "@/components/quick-start"
import { Cipher } from "@/components/cipher"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Security />
        <QuickStart />
        <Cipher />
      </main>
      <Footer />
    </>
  )
}
