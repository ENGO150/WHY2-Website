"use client"

import * as React from "react"
import Link from "next/link"
import { Github, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const NAV_LINKS = [
  { label: "The Client", href: "#client" },
  { label: "Features", href: "#features" },
  { label: "Security", href: "#security" },
  { label: "Quick Start", href: "#start" },
  { label: "The Cipher", href: "#cipher" },
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

    // The section lives on the home page, so from any other route go there first
    if (!element) {
      window.location.href = `/${href}`
      return
    }

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
        "font-mono gap-2 transition-colors duration-200",
        "bg-transparent border-border text-muted-foreground",
        "hover:border-primary/50 hover:bg-secondary hover:text-secondary-foreground",
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

  const BenchmarkLink = ({ mobile }: { mobile?: boolean }) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className={cn(
            "cursor-pointer",
            mobile
              ? "group flex w-full items-center justify-between text-lg font-medium text-muted-foreground hover:text-primary transition-colors duration-200 py-3"
              : "text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 font-mono flex items-center gap-2"
          )}
        >
          Benchmarks
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>⚠️ Benchmark Environment</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to view automated benchmark reports.
          </AlertDialogDescription>

          {/* Moved the div OUTSIDE of AlertDialogDescription to prevent hydration error (<p> inside <p>) */}
          <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground mt-3 text-left">
            <p className="font-semibold text-foreground mb-1">Performance Note:</p>
            These tests run on a <strong>Raspberry Pi 5</strong> in a containerized environment (Docker/GitLab Runner).
            The results are primarily for <strong>regression testing</strong> and are <strong>orders of magnitude</strong> lower than performance on standard desktop hardware.
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Back</AlertDialogCancel>
          <AlertDialogAction asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a
              href="https://why2.satan.red/benches/report/index.html"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
            >
              I understand, view data
            </a>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        isScrolled
          ? "bg-background/90 backdrop-blur-sm border-b border-border/50 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">

        <Link
            href="/"
            className="flex items-center gap-2 font-mono font-bold text-xl tracking-tighter hover:opacity-80 transition-opacity"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          WHY2
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 font-mono"
            >
              {link.label}
            </a>
          ))}
          <BenchmarkLink />
          <Link
            href="/download"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 font-mono"
          >
            Download
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <GithubButton />
        </div>

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-card hover:text-primary">
                <Menu className="w-6 h-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-full sm:w-[360px] flex flex-col p-0 border-l border-border bg-background">
              <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
              <SheetDescription className="sr-only">Main site navigation</SheetDescription>

              <div className="flex flex-col h-full p-8">
                <nav className="flex flex-col gap-2 pt-8">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors duration-200 py-3"
                    >
                      {link.label}
                    </a>
                  ))}
                  <BenchmarkLink mobile />
                  <Link
                    href="/download"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors duration-200 py-3"
                  >
                    Download
                  </Link>
                </nav>

                <div className="mt-auto pt-8 space-y-4">
                    <GithubButton fullWidth className="h-12" />
                </div>
              </div>

            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
