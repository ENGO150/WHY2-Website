"use client"

import Link from "next/link"
import { useState, useEffect, useMemo } from "react"
import { Book, GitFork } from "lucide-react"
import { Button } from "@/components/ui/button"

function CipherBlock() {
  const [cells, setCells] = useState<string[]>([])

  useEffect(() => {
    const initial = Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0')
    )
    setCells(initial)

    const interval = setInterval(() => {
      setCells(prev => {
        const next = [...prev]
        // Scramble 6-10 random cells per tick
        const count = 6 + Math.floor(Math.random() * 5)
        for (let i = 0; i < count; i++) {
          const idx = Math.floor(Math.random() * 64)
          next[idx] = Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0')
        }
        return next
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  if (cells.length === 0) return null

  return (
    <div className="grid grid-cols-8 gap-[3px] font-mono text-[11px] leading-none select-none">
      {cells.map((cell, i) => (
        <div
          key={i}
          className="w-7 h-7 flex items-center justify-center rounded-sm bg-card/80 text-muted-foreground/50 border border-border/30 transition-colors duration-150"
        >
          {cell}
        </div>
      ))}
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
  const [latestVersion, setLatestVersion] = useState<string>("1.8.9")

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const res = await fetch("https://crates.io/api/v1/crates/why2");
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
          {/* Left — text content */}
          <div className="max-w-2xl">
            {/* Version + codename */}
            <div className="flex items-center gap-3 mb-10 animate-fade-in">
              <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground border border-border rounded px-2.5 py-1">
                v{latestVersion}
              </span>
              <span className="text-muted-foreground/30 font-mono text-xs">—</span>
              <span className="font-mono text-xs tracking-widest uppercase text-primary/70">
                Aqua Regia
              </span>
            </div>

            <h1 className="font-mono text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-8 animate-fade-in-up">
              <span className="text-primary">WHY2</span>
              <br />
              <span className="text-foreground">Experimental</span>
              <br />
              <span className="text-foreground/50">Encryption</span>
            </h1>

            <p className="max-w-lg text-lg text-muted-foreground mb-10 leading-relaxed animate-fade-in-up delay-100">
              A modern Rust crate for privacy-first applications.
              No S-boxes — pure <span className="text-primary font-mono">ARX-based</span> diffusion.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 animate-fade-in-up delay-200">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono px-8 py-6 text-base transition-colors duration-200"
                asChild
              >
                <Link href="https://docs.rs/why2/latest/why2" target="_blank" rel="noopener noreferrer">
                  <Book className="w-5 h-5 mr-2" />
                  Read the Docs
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

          {/* Right — live cipher block (8×8 grid) */}
          <div className="hidden lg:block animate-fade-in delay-200">
            <div className="relative">
              <div className="bg-card/50 border border-border rounded-lg p-5">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/50">
                  <span className="font-mono text-[10px] text-muted-foreground tracking-widest">KEYSTREAM STATE</span>
                  <span className="font-mono text-[10px] text-primary/50">8×8 GRID</span>
                </div>
                <CipherBlock />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
    </section>
  )
}
