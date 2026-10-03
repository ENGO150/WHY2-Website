"use client"

import Link from "next/link"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { SECTIONS } from "@/lib/sections"

const BENCHES = "https://why2.satan.red/benches/report/index.html"

function BenchDialog({ onClose }: { onClose: () => void }) {
  return (
    <div className="dialog-backdrop" onClick={onClose} role="presentation">
      <div className="dialog" role="dialog" aria-modal="true" aria-labelledby="bench-title" onClick={(e) => e.stopPropagation()}>
        <p className="label red">Note</p>
        <h3 id="bench-title">Benchmarks run on a Raspberry Pi 5</h3>
        <p>
          The reports come from a containerized runner (Docker, GitLab Runner) on a Pi 5. They exist
          for regression testing, and the numbers sit orders of magnitude below desktop hardware.
        </p>
        <div className="actions">
          <a className="btn btn-red btn-sm" href={BENCHES} rel="noopener noreferrer">View reports</a>
          <button className="btn btn-sm" onClick={onClose}>Back</button>
        </div>
      </div>
    </div>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [bench, setBench] = useState(false)

  const openBench = () => {
    setOpen(false)
    setBench(true)
  }

  return (
    <>
      <header className="bar">
        <div className="wrap">
          <Link href="/" className="brand" aria-label="WHY2 home">
            <span className="logo-mark" />
            WHY2<span>/chat</span>
          </Link>

          <nav className="nav" aria-label="Main">
            {SECTIONS.map((s) => (
              <a key={s.href} href={s.href}><span className="n">{s.n}</span>{s.label.toLowerCase()}</a>
            ))}
            <button onClick={openBench}>benchmarks</button>
          </nav>

          <div className="bar-right">
            <ThemeToggle />
            <Link href="/download" className="btn btn-red btn-sm bar-cta">Download</Link>
            <button className="menu-btn" aria-expanded={open} onClick={() => setOpen(!open)}>
              {open ? "close" : "menu"}
            </button>
          </div>
        </div>

        {open && (
          <div className="drawer">
            <nav className="wrap" aria-label="Mobile">
              {SECTIONS.map((s) => (
                <a key={s.href} href={s.href} onClick={() => setOpen(false)}>
                  <span className="n">{s.n}</span>
                  {s.label}
                </a>
              ))}
              <button onClick={openBench}><span className="n">--</span>Benchmarks</button>
              <Link href="/download" onClick={() => setOpen(false)}><span className="n">↓</span>Download</Link>
            </nav>
          </div>
        )}
      </header>

      {bench && <BenchDialog onClose={() => setBench(false)} />}
    </>
  )
}
