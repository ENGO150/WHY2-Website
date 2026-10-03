import type React from "react"
import type { Metadata, Viewport } from "next"
import { Martian_Mono, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const display = Martian_Mono({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "700", "800"], variable: "--font-display" })
const mono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "700"], style: ["normal", "italic"], variable: "--font-mono" })

//APPLY SAVED THEME BEFORE PAINT
const themeScript = `try{var t=localStorage.getItem("why2-theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t;else if(matchMedia("(prefers-color-scheme: dark)").matches)document.documentElement.dataset.theme="dark"}catch(e){}`

export const metadata: Metadata = {
  title: "WHY2 Chat",
  description:
    "Encrypted text, voice, screenshare and file transfer on a server you run yourself. Post-quantum handshake, no telemetry, powered by the WHY2 encryption system.",
  keywords: ["chat", "encrypted messaging", "voice chat", "self-hosted", "rust", "cryptography", "privacy", "post-quantum"],
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#c8231a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
