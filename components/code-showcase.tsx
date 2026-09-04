"use client"

import Link from "next/link"
import { useState } from "react"
import { Copy, Check, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Line = { kind: "cmd" | "note"; text: string }

type Tab = {
  id: string
  label: string
  file: string
  intro: string
  lines: Line[]
  copy: string
}

const TABS: Tab[] = [
  {
    id: "client",
    label: "Join a server",
    file: "client",
    intro: "One binary, and no configuration to write by hand. The client asks for the address, your credentials and the server's key fingerprint on first run.",
    copy: "cargo install why2-chat\nwhy2",
    lines: [
      { kind: "note", text: "# install and launch the client" },
      { kind: "cmd", text: "cargo install why2-chat" },
      { kind: "cmd", text: "why2" },
    ],
  },
  {
    id: "server",
    label: "Run your own",
    file: "server",
    intro: "The server writes its own config and identity keypair on first start. Point it at a port, open it up, and it is yours. Users, roles and bans live next to the config in ~/.config/WHY2.",
    copy: "cargo install why2-chat --no-default-features --features server\nwhy2-server",
    lines: [
      { kind: "note", text: "# build the server binary only" },
      { kind: "cmd", text: "cargo install why2-chat --no-default-features --features server" },
      { kind: "cmd", text: "why2-server" },
    ],
  },
  {
    id: "source",
    label: "From source",
    file: "source",
    intro: "Voice and screenshare need audio and codec libraries present at build time. Windows needs nothing extra. The build leaves both binaries in ./target/release.",
    copy: "sudo apt-get install -y pkg-config libasound2-dev libopus-dev\ngit clone https://git.satan.red/ENGO150/WHY2\ncd WHY2\ncargo build --release",
    lines: [
      { kind: "note", text: "# debian / ubuntu. macos: brew install opus pkg-config" },
      { kind: "cmd", text: "sudo apt-get install -y pkg-config libasound2-dev libopus-dev" },
      { kind: "note", text: "# client (why2) and server (why2-server)" },
      { kind: "cmd", text: "git clone https://git.satan.red/ENGO150/WHY2" },
      { kind: "cmd", text: "cd WHY2" },
      { kind: "cmd", text: "cargo build --release" },
    ],
  },
]

export function CodeShowcase() {
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)
  const tab = TABS[active]

  const copyCode = () => {
    navigator.clipboard.writeText(tab.copy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12 max-w-lg">
          <p className="font-mono text-xs tracking-widest uppercase text-primary mb-3">Usage</p>
          <h2 className="font-mono text-3xl md:text-4xl font-bold mb-4">Quick Start</h2>
          <p className="text-muted-foreground">
            Talking to someone takes two commands. Hosting the room it happens in takes two more.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => { setActive(i); setCopied(false) }}
              className={cn(
                "font-mono text-xs px-4 py-2 rounded border transition-colors duration-200 cursor-pointer",
                i === active
                  ? "bg-secondary border-primary/40 text-foreground"
                  : "bg-card border-border text-muted-foreground hover:border-primary/25 hover:text-foreground"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-6">{tab.intro}</p>

        <div className="bg-[#060608] rounded-lg border border-border overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="ml-4 flex items-center gap-2 text-muted-foreground text-sm font-mono">
                <Terminal className="w-4 h-4" />
                {tab.file}
              </div>
            </div>
            <Button size="sm" variant="ghost" onClick={copyCode} className="text-muted-foreground hover:text-foreground">
              {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>

          <div className="overflow-x-auto px-6 py-5">
            <pre className="font-mono text-sm leading-relaxed">
              {tab.lines.map((line, i) => (
                <div key={`${tab.id}-${i}`} className="whitespace-pre">
                  {line.kind === "cmd" && (
                    <>
                      <span className="text-primary select-none">$ </span>
                      <span className="text-foreground/85">{line.text}</span>
                    </>
                  )}
                  {line.kind === "note" && <span className="text-muted-foreground/40">{line.text}</span>}
                </div>
              ))}
            </pre>
          </div>
        </div>

        <p className="mt-6 font-mono text-xs text-muted-foreground/50">
          Prefer a prebuilt binary, or the desktop app?{" "}
          <Link href="/download" className="text-muted-foreground hover:text-primary transition-colors duration-200 underline underline-offset-4">
            Downloads
          </Link>
        </p>
      </div>
    </section>
  )
}
