"use client"

import { MessageSquare, Lock, Server, ArrowRight } from "lucide-react"

export function ProofOfConcept() {
  return (
    <section className="py-24 px-4 border-t border-border/50">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 max-w-lg">
          <p className="font-mono text-xs tracking-widest uppercase text-primary mb-3">Proof of Concept</p>
          <h2 className="font-mono text-3xl md:text-4xl font-bold leading-tight mb-4">
            Powers a <span className="text-primary">minimalist chat application</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            WHY2 isn&apos;t just a library — it&apos;s the backbone of a secure{" "}
            <span className="text-foreground font-mono">text</span>,{" "}
            <span className="text-foreground font-mono">voice</span>, and{" "}
            <span className="text-foreground font-mono">screenshare</span>{" "}
            messaging platform designed for individuals and small groups who value their privacy above all else.
          </p>
          <div className="mt-8 flex items-center">
            <div className="font-mono text-sm bg-[#060608] border border-border rounded-lg px-5 py-3 flex items-center gap-3">
              <span className="text-primary">$</span>
              <span className="text-muted-foreground">cargo install why2-chat</span>
            </div>
          </div>
        </div>

        {/* Horizontal data flow */}
        <div className="flex flex-col md:flex-row items-stretch gap-0 mb-16 overflow-x-auto">
          {/* Client */}
          <div className="flex-1 min-w-[180px] bg-card border border-border rounded-lg p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-secondary border border-border flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-mono text-sm font-semibold text-foreground">Client</p>
              <p className="font-mono text-xs text-muted-foreground">Plaintext input</p>
            </div>
          </div>

          {/* Arrow 1 */}
          <div className="flex items-center justify-center px-2 py-4 md:py-0">
            <div className="hidden md:flex items-center">
              <div className="w-8 h-px bg-border" />
              <ArrowRight className="w-4 h-4 text-primary -mx-1" />
              <div className="w-8 h-px bg-border" />
            </div>
            <div className="md:hidden flex flex-col items-center">
              <div className="h-4 w-px bg-border" />
              <ArrowRight className="w-4 h-4 text-primary rotate-90 -my-0.5" />
              <div className="h-4 w-px bg-border" />
            </div>
          </div>

          {/* WHY2 Encryption */}
          <div className="flex-1 min-w-[200px] bg-primary/[0.04] border border-primary/25 rounded-lg p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-card border border-primary/30 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-mono text-sm font-semibold text-primary">WHY2 / REX</p>
              <p className="font-mono text-xs text-muted-foreground">Encrypted transport</p>
            </div>
          </div>

          {/* Arrow 2 */}
          <div className="flex items-center justify-center px-2 py-4 md:py-0">
            <div className="hidden md:flex items-center">
              <div className="w-8 h-px bg-border" />
              <ArrowRight className="w-4 h-4 text-primary -mx-1" />
              <div className="w-8 h-px bg-border" />
            </div>
            <div className="md:hidden flex flex-col items-center">
              <div className="h-4 w-px bg-border" />
              <ArrowRight className="w-4 h-4 text-primary rotate-90 -my-0.5" />
              <div className="h-4 w-px bg-border" />
            </div>
          </div>

          {/* Server */}
          <div className="flex-1 min-w-[180px] bg-card border border-border rounded-lg p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-secondary border border-border flex items-center justify-center shrink-0">
              <Server className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-mono text-sm font-semibold text-foreground">Server</p>
              <p className="font-mono text-xs text-muted-foreground">Handles message routing</p>
            </div>
          </div>
        </div>

        {/* Bottom row: Quote + tags */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <blockquote className="pl-6 border-l-2 border-primary/30 py-2">
            <p className="text-lg italic text-foreground/80">
              &ldquo;If privacy is outlawed, only outlaws will have privacy.&rdquo;
            </p>
            <p className="text-muted-foreground mt-1">— Phil Zimmermann</p>
          </blockquote>

          <div className="flex flex-wrap gap-2 md:justify-end items-start pt-1">
            {["Self-Hosted", "Minimalist", "Voice Chat", "Screenshare", "Terminal-Based", "No Telemetry", "Open Source"].map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-3 py-1.5 rounded bg-card border border-border text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
