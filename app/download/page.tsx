import type { Metadata } from "next"
import { Header } from "@/components/header"
import { DownloadHub } from "@/components/download-hub"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Downloads · WHY2 Chat",
  description: "Builds of the WHY2 Chat desktop app and terminal client for Linux, macOS, Windows and Android, with checksums.",
}

export default function DownloadPage() {
  return (
    <>
      <Header />
      <main>
        <DownloadHub />
      </main>
      <Footer />
    </>
  )
}
