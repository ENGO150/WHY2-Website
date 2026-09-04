import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { SmoothScroller } from "@/components/smooth-scroller"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" })

export const metadata: Metadata = {
  title: "WHY2 Chat",
  description:
    "Encrypted text, voice, screenshare and file transfer in your terminal. Self-hosted, no telemetry, powered by the WHY2 encryption system.",
  keywords: ["chat", "encrypted messaging", "voice chat", "self-hosted", "rust", "cryptography", "privacy", "post-quantum", "security"],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport = {
  themeColor: "#d946a8",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={`font-sans antialiased noise-overlay`}>
        <SmoothScroller />
        {children}
      </body>
    </html>
  )
}
