"use client"

import { AlertTriangle } from "lucide-react"

export function DisclaimerSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="relative">
          {/* Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10 rounded-xl blur-lg" />

          {/* Card */}
          <div className="relative bg-card/50 border border-yellow-500/30 rounded-xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-500" />
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="font-mono text-lg font-semibold text-yellow-500">Security Disclaimer</h3>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">WHY2 is an experimental algorithm</strong> loosely inspired by
                  AES. It has <strong className="text-yellow-500/90">not undergone formal cryptographic audit</strong>.
                  Use for educational purposes and personal privacy experiments, not for high-assurance systems or
                  production environments where security is critical.
                </p>
                <div className="flex items-center gap-2 text-sm font-mono text-yellow-500/70">
                  <span className="w-2 h-2 rounded-full bg-yellow-500/50 animate-pulse" />
                  Experimental — Use with caution
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
