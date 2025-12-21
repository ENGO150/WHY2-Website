"use client"

import Link from "next/link"
import { Book, GitFork } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-pulse delay-1000" />

      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-primary/30 bg-primary/5 text-primary font-mono text-sm animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          v1.3.1 — Rustputin
        </div>

        {/* Main headline */}
        <h1 className="font-mono text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight animate-fade-in-up">
          <span className="text-foreground">WHY2:</span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
            Experimental Encryption
          </span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed animate-fade-in-up delay-200">
          A modern, fast, and secure Rust crate designed for privacy-first applications. No S-boxes, just pure{" "}
          <span className="text-primary font-mono">ARX-based</span> diffusion.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
          <Button
            size="lg"
            className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground font-mono px-8 py-6 text-base shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all duration-300"
            asChild
          >
            <Link href="https://docs.rs/why2/latest/why2" target="_blank" rel="noopener noreferrer">
            <Book className="w-5 h-5 mr-2" />
              Read the Docs
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="group font-mono px-8 py-6 text-base border-primary/50 hover:border-primary hover:bg-primary/10 transition-all duration-300 bg-transparent"
            asChild
          >
            <Link href="https://git.satan.red/ENGO150/WHY2" target="_blank" rel="noopener noreferrer">
              <GitFork className="w-5 h-5 mr-2" />
              View on GitLab
            </Link>
          </Button>
        </div>

        {/* Terminal-style decoration */}
        <div className="mt-16 font-mono text-sm text-muted-foreground/50 animate-fade-in delay-500">
          <span className="text-primary">$</span> cargo install why2
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
