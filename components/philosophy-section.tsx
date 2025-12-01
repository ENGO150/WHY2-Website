"use client"

import { MessageSquare, Lock, Server } from "lucide-react"

export function PhilosophySection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute top-1/2 right-0 w-1/2 h-px bg-gradient-to-l from-transparent via-accent/30 to-transparent" />
      </div>

      <div className="container mx-auto max-w-5xl relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Icon showcase */}
          <div className="relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Central element */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center shadow-[0_0_60px_rgba(168,85,247,0.2)]">
                  <Lock className="w-12 h-12 text-primary" />
                </div>
              </div>

              {/* Orbiting elements */}
              <div className="absolute top-8 left-8 w-16 h-16 rounded-xl bg-card border border-border/50 flex items-center justify-center animate-float">
                <MessageSquare className="w-8 h-8 text-accent" />
              </div>

              <div className="absolute bottom-8 right-8 w-16 h-16 rounded-xl bg-card border border-border/50 flex items-center justify-center animate-float-delayed">
                <Server className="w-8 h-8 text-primary" />
              </div>

              {/* Decorative lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                <circle
                  cx="200"
                  cy="200"
                  r="140"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="1"
                  strokeDasharray="8 8"
                  className="animate-spin-slow"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgb(168 85 247 / 0.3)" />
                    <stop offset="100%" stopColor="rgb(236 72 153 / 0.3)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Right: Text content */}
          <div className="space-y-6">
            <div className="inline-block font-mono text-sm text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              // Philosophy
            </div>

            <h2 className="font-mono text-3xl md:text-4xl font-bold leading-tight">
              Powers a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                minimalist chat application
              </span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              WHY2 isn't just a library — it's the backbone of a secure messaging platform designed for individuals and
              small groups who value their privacy above all else.
            </p>

            <blockquote className="relative pl-6 border-l-2 border-primary/50 py-2">
              <p className="text-lg italic text-foreground/90">
                "Designed for those who demand absolute control over their data. No backdoors. No subscriptions."
              </p>
            </blockquote>

            <div className="flex flex-wrap gap-3 pt-4">
              {["Self-Hosted", "End-to-End", "Zero Knowledge"].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-3 py-1.5 rounded-full bg-card border border-border/50 text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
