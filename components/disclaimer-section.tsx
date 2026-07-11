"use client"

import { AlertTriangle } from "lucide-react"

export function DisclaimerSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-card border border-foreground/15 rounded-lg p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-foreground/5 border border-foreground/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-foreground/70" />
            </div>
            <div className="space-y-3">
              <h3 className="font-mono text-lg font-semibold text-foreground/80">Security Disclaimer</h3>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">WHY2 is an experimental algorithm</strong> loosely inspired by
                AES. It has <strong className="text-foreground/80">not undergone formal cryptographic audit</strong>.
                Use for educational purposes and personal privacy experiments, not for high-assurance systems or
                production environments where security is critical.
              </p>
              <p className="text-sm font-mono text-foreground/40">
                Experimental — Use with caution
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
