import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { DownloadHub } from "@/components/download-hub"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Builds of the WHY2 Chat desktop app and terminal client for Linux, macOS, Windows and Android, with checksums.",
}

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Navbar />
      <DownloadHub />
      <Footer />
    </main>
  )
}
