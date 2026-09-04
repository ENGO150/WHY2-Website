"use client"

import Link from "next/link"
import { MessageSquare, Lock, Radio, ArrowRight, Book } from "lucide-react"
import { Button } from "@/components/ui/button"

const FLOW = [
  {
    icon: MessageSquare,
    title: "Message",
    caption: "Text, voice, frames, files",
    accent: false,
  },
  {
    icon: Lock,
    title: "REX",
    caption: "ARX rounds · MDS mixing · CTR",
    accent: true,
  },
  {
    icon: Radio,
    title: "Wire",
    caption: "Sealed with HMAC-SHA256",
    accent: false,
  },
]

function Arrow() {
  return (
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
  )
}

export function CipherSection() {
  return (
    <section className="py-24 px-4 border-t border-border/50">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 max-w-lg">
          <p className="font-mono text-xs tracking-widest uppercase text-primary mb-3">Underneath</p>
          <h2 className="font-mono text-3xl md:text-4xl font-bold leading-tight mb-4">
            Built on <span className="text-primary">its own cipher</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            The chat client does not wrap someone else&apos;s library. It runs on{" "}
            <span className="text-foreground font-mono">REX</span>, the WHY2 encryption system:
            an SPN construction with no S-boxes, using Add-Rotate-XOR for nonlinearity and an MDS
            matrix for diffusion. It ships as a standalone Rust crate you can use on its own.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
            <div className="font-mono text-sm bg-[#060608] border border-border rounded-lg px-5 py-3 flex items-center gap-3">
              <span className="text-primary">$</span>
              <span className="text-muted-foreground">cargo add why2</span>
            </div>
            <Button
              variant="outline"
              className="font-mono h-[46px] px-5 border-border hover:border-primary/50 hover:bg-secondary hover:text-secondary-foreground transition-colors duration-200 bg-transparent"
              asChild
            >
              <Link href="https://docs.rs/why2/latest/why2" target="_blank" rel="noopener noreferrer">
                <Book className="w-4 h-4 mr-2" />
                Read the Docs
              </Link>
            </Button>
          </div>
        </div>

        {/* Horizontal data flow */}
        <div className="flex flex-col md:flex-row items-stretch gap-0 mb-16 overflow-x-auto">
          {FLOW.map((node, i) => (
            <div key={node.title} className="contents">
              {i > 0 && <Arrow />}
              <div
                className={
                  node.accent
                    ? "flex-1 min-w-[200px] bg-primary/[0.04] border border-primary/25 rounded-lg p-5 flex items-center gap-4"
                    : "flex-1 min-w-[180px] bg-card border border-border rounded-lg p-5 flex items-center gap-4"
                }
              >
                <div
                  className={
                    node.accent
                      ? "w-12 h-12 rounded-lg bg-card border border-primary/30 flex items-center justify-center shrink-0"
                      : "w-12 h-12 rounded-lg bg-secondary border border-border flex items-center justify-center shrink-0"
                  }
                >
                  <node.icon className={node.accent ? "w-5 h-5 text-primary" : "w-5 h-5 text-muted-foreground"} />
                </div>
                <div>
                  <p className={node.accent ? "font-mono text-sm font-semibold text-primary" : "font-mono text-sm font-semibold text-foreground"}>
                    {node.title}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground">{node.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row: Quote + tags */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <blockquote className="pl-6 border-l-2 border-primary/30 py-2">
            <p className="text-lg italic text-foreground/80">
              &ldquo;If privacy is outlawed, only outlaws will have privacy.&rdquo;
            </p>
            <p className="text-muted-foreground mt-1">Phil Zimmermann</p>
          </blockquote>

          <div className="grid grid-cols-3 gap-2 pt-1">
            {["No S-boxes", "ARX", "MDS Diffusion", "CTR Mode", "Zeroized Keys", "Written in Rust"].map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-3 py-1.5 rounded bg-card border border-border text-muted-foreground text-center"
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
