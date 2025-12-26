"use client"

import * as React from "react"
import Link from "next/link"
import { Github, Menu, Lock, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"

const NAV_LINKS = [
  { label: "How It Works", href: "#demo" },
  { label: "Features", href: "#features" },
  { label: "Quick Start", href: "#code" },
  { label: "Chat", href: "#poc" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsOpen(false)

    const element = document.querySelector(href)
    if (element) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  const GithubButton = ({ className, fullWidth }: { className?: string, fullWidth?: boolean }) => (
    <Button
      variant="outline"
      className={cn(
        "font-mono gap-2 transition-all duration-300",
        "bg-transparent border-primary/20 text-foreground",
        "hover:bg-primary/10 hover:border-primary/50 hover:text-primary",
        "shadow-sm hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]",
        fullWidth && "w-full",
        className
      )}
      asChild
    >
      <Link href="https://github.com/ENGO150/WHY2" target="_blank">
        <Github className="w-4 h-4" />
        Star on GitHub
      </Link>
    </Button>
  )

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">

        <Link
            href="/"
            className="flex items-center gap-2 font-mono font-bold text-xl tracking-tighter hover:opacity-80 transition-opacity"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 text-primary">
            <Lock className="w-4 h-4" />
          </div>
          WHY2
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors font-mono"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <GithubButton />
        </div>

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                <Menu className="w-6 h-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-full sm:w-[400px] flex flex-col p-0 border-l border-primary/20 bg-background/95 backdrop-blur-xl">
              <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
              <SheetDescription className="sr-only">Main site navigation</SheetDescription>

              <div className="flex flex-col h-full p-8">

                <div className="mb-12 pt-4 border-b border-border/50 pb-4">
                    <span className="font-mono text-xs text-primary font-bold tracking-widest uppercase">
                        // System Navigation
                    </span>
                </div>

                <nav className="flex flex-col gap-6">
                  {NAV_LINKS.map((link, index) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className="group flex items-center justify-between text-2xl font-bold text-muted-foreground hover:text-foreground transition-all duration-300 py-2 border-b border-transparent hover:border-primary/20"
                    >
                      <span className="flex items-center gap-4">
                          <span className="font-mono text-sm text-primary/50 group-hover:text-primary transition-colors">
                              0{index + 1}
                          </span>
                          {link.label}
                      </span>
                      <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                    </a>
                  ))}
                </nav>

                <div className="mt-auto pt-8 space-y-4">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="h-px bg-border flex-1" />
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Connect</span>
                        <div className="h-px bg-border flex-1" />
                    </div>
                    <GithubButton fullWidth className="h-14 text-lg" />
                </div>
              </div>

            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
