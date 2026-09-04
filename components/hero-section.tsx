"use client"

import type React from "react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Download, Terminal, GitFork } from "lucide-react"
import { Button } from "@/components/ui/button"

// Line shapes and wording follow what the client actually prints (chat/src/bin/client/tui/event.rs)
type PreviewLine =
  | { kind: "ok" | "dim"; text: string }
  | { kind: "srv"; text: string }
  | { kind: "msg"; user: string; text: string; own?: boolean }

const PREVIEW_LINES: PreviewLine[] = [
  { kind: "ok", text: "Successfully connected to satan.red." },
  { kind: "ok", text: "Login successful. Press Ctrl+H for help." },
  { kind: "srv", text: "kate connected." },
  { kind: "msg", user: "kate", text: "sending the build over" },
  { kind: "ok", text: "Voice enabled." },
  { kind: "srv", text: 'kate uploaded file "why2-2.0.1.tar.zst".' },
  { kind: "msg", user: "engo", text: "got it, grabbing now", own: true },
]

function ChatPreview() {
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    // Linger on the finished transcript before starting over
    const delay = visible >= PREVIEW_LINES.length ? 5000 : 1100
    const timer = setTimeout(() => {
      setVisible((prev) => (prev >= PREVIEW_LINES.length ? 0 : prev + 1))
    }, delay)
    return () => clearTimeout(timer)
  }, [visible])

  return (
    <div className="w-[460px] xl:w-[520px] bg-[#060608] border border-border rounded-lg overflow-hidden font-mono text-[12px] leading-relaxed">
      {/* Title bar, mirrors the TUI's bordered block title */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border text-[10px] tracking-widest">
        <span className="text-muted-foreground">WHY2 ── satan.red ── #lobby</span>
        <span className="text-primary/60">SOCKS5</span>
      </div>

      <div className="flex">
        {/* Messages */}
        <div className="flex-1 p-4 h-[232px] flex flex-col justify-end gap-1 overflow-hidden">
          {PREVIEW_LINES.slice(0, visible).map((line, i) => (
            <div key={i} className="animate-fade-in">
              {line.kind === "srv" && (
                <>
                  <span className="text-muted-foreground/40">[server] </span>
                  <span className="text-muted-foreground">{line.text}</span>
                </>
              )}
              {line.kind === "ok" && <span className="text-foreground/70">{line.text}</span>}
              {line.kind === "dim" && <span className="text-muted-foreground/40">{line.text}</span>}
              {line.kind === "msg" && (
                <>
                  <span className={line.own ? "text-primary/80" : "text-foreground/60"}>{line.user}</span>
                  <span className="text-muted-foreground">: {line.text}</span>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Sidebar: Online / Channels rosters */}
        <div className="w-[132px] border-l border-border p-3 text-[10px] space-y-4">
          <div>
            <p className="text-muted-foreground/50 tracking-widest mb-1.5">ONLINE (3)</p>
            <p className="text-foreground/70">engo</p>
            <p className="text-foreground/70">kate</p>
            <p className="text-foreground/70">nel</p>
          </div>
          <div>
            <p className="text-muted-foreground/50 tracking-widest mb-1.5">CHANNELS</p>
            <p className="text-primary/70">#lobby</p>
            <p className="text-foreground/40">#dev</p>
          </div>
          <div>
            <p className="text-muted-foreground/50 tracking-widest mb-1.5">VOICE</p>
            <p className="text-foreground/70">kate</p>
          </div>
        </div>
      </div>

      {/* Input line */}
      <div className="border-t border-border px-4 py-2 flex items-center gap-2">
        <span className="text-muted-foreground/70">/download 2 3</span>
        <span className="w-[7px] h-[14px] bg-primary/60 animate-pulse" />
      </div>
    </div>
  )
}

function HexTicker() {
  const [hexChars, setHexChars] = useState<string[]>([])

  useEffect(() => {
    const chars: string[] = []
    for (let i = 0; i < 80; i++) {
      chars.push(Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0'))
    }
    setHexChars(chars)
  }, [])

  if (hexChars.length === 0) return null

  return (
    <div className="absolute bottom-16 left-0 right-0 overflow-hidden opacity-[0.035] pointer-events-none select-none">
      <div className="flex whitespace-nowrap animate-ticker font-mono text-[11px] tracking-[0.5em]">
        {hexChars.map((h, i) => <span key={i}>{h} </span>)}
        {hexChars.map((h, i) => <span key={`d-${i}`}>{h} </span>)}
      </div>
    </div>
  )
}

export function HeroSection() {
  const [latestVersion, setLatestVersion] = useState<string>("2.0.1")

  // Same offset-aware scroll the navbar performs, so the anchor clears the fixed header
  const scrollToStart = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.querySelector("#start")
    if (!element) return
    const top = element.getBoundingClientRect().top - document.body.getBoundingClientRect().top - 80
    window.scrollTo({ top, behavior: "smooth" })
  }

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const res = await fetch("https://crates.io/api/v1/crates/why2-chat");
        if (res.ok) {
          const data = await res.json();
          setLatestVersion(data.crate.default_version);
        }
      } catch (error) {
        console.error("Failed to fetch latest version:", error);
      }
    };
    fetchVersion();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <HexTicker />

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-[1fr_auto] gap-16 lg:gap-24 items-center">
          {/* Left: text content */}
          <div className="max-w-2xl">
            {/* Version + codename */}
            <div className="flex items-center gap-3 mb-10 animate-fade-in">
              <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground border border-border rounded px-2.5 py-1">
                v{latestVersion}
              </span>
              <span className="text-muted-foreground/30 font-mono text-xs">·</span>
              <span className="font-mono text-xs tracking-widest uppercase text-primary/70">
                Aqua Regia
              </span>
            </div>

            <h1 className="font-mono text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-8 animate-fade-in-up">
              <span className="text-primary">WHY2</span>
              <br />
              <span className="text-foreground">Encrypted</span>
              <br />
              <span className="text-foreground/50">Chat</span>
            </h1>

            <p className="max-w-lg text-lg text-muted-foreground mb-10 leading-relaxed animate-fade-in-up delay-100">
              Text, voice, screenshare and files, encrypted in transit with a
              post-quantum handshake and served from{" "}
              <span className="text-primary font-mono">your own machine</span>.
              No accounts anywhere else, no telemetry, nothing collected.
            </p>

            <div className="flex flex-col items-start gap-4 animate-fade-in-up delay-200">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono px-8 py-6 text-base transition-colors duration-200"
                asChild
              >
                <Link href="/download">
                  <Download className="w-5 h-5 mr-2" />
                  Download
                </Link>
              </Button>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="font-mono px-8 py-6 text-base border-border hover:border-primary/50 hover:bg-secondary hover:text-secondary-foreground transition-colors duration-200 bg-transparent"
                  asChild
                >
                  <Link href="#start" onClick={scrollToStart}>
                    <Terminal className="w-5 h-5 mr-2" />
                    Get Started
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="font-mono px-8 py-6 text-base border-border hover:border-primary/50 hover:bg-secondary hover:text-secondary-foreground transition-colors duration-200 bg-transparent"
                  asChild
                >
                  <Link href="https://git.satan.red/ENGO150/WHY2" target="_blank" rel="noopener noreferrer">
                    <GitFork className="w-5 h-5 mr-2" />
                    View on GitLab
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Right: live client preview */}
          <div className="hidden lg:block animate-fade-in delay-200">
            <ChatPreview />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
    </section>
  )
}
