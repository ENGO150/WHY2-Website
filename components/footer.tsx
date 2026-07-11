"use client"

import { Lock } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-3">

            <div className="font-mono text-sm">
              <span className="text-foreground font-semibold">WHY2</span>
              <span className="text-muted-foreground ml-2">© {new Date().getFullYear()}{" "}
                <a href="https://satan.red" target="_blank" className="hover:text-primary transition-colors duration-200">
                  Václav Šmejkal
                </a>
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 font-mono text-sm text-muted-foreground">
            <a href="https://www.gnu.org/licenses/gpl-3.0.en.html" target="_blank" className="hover:text-primary transition-colors duration-200">
              GNU GPLv3
            </a>
            <span className="text-border">·</span>
            <span className="text-muted-foreground/40">Built with Rust</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
