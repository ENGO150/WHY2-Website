"use client"

import { Lock } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Lock className="w-4 h-4 text-primary" />
            </div>
            <div className="font-mono">
              <span className="text-foreground font-semibold">WHY2</span>
              <span className="text-muted-foreground text-sm ml-2">© {new Date().getFullYear()} Václav Šmejkal</span>
            </div>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            <a href="https://www.gnu.org/licenses/gpl-3.0.en.html" target="_blank" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1">
              <span>GNU GPLv3</span>
            </a>
          </nav>
        </div>

        {/* Bottom decoration */}
        <div className="mt-8 pt-8 border-t border-border/30 flex items-center justify-center">
          <p className="font-mono text-xs text-muted-foreground/50">
            <span className="text-primary">{"<"}</span>
            Built with Rust
            <span className="text-primary">{"/>"}</span>
          </p>
        </div>
        <div className="flex items-center justify-center">
            💜
        </div>
      </div>
    </footer>
  )
}
