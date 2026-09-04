"use client"

import { useState } from "react"
import { MessageSquare, Mic, MonitorUp, FolderDown } from "lucide-react"
import { cn } from "@/lib/utils"

// Every line below is shaped like the client's own output (chat/src/bin/client/tui/event.rs):
// server notices carry the server's username in brackets, results of your own commands do not.
type Line =
  | { kind: "msg"; user: string; text: string; own?: boolean }
  | { kind: "pm"; dir: "TO" | "FROM"; user: string; id: number; text: string }
  | { kind: "srv"; text: string }
  | { kind: "ok"; text: string }
  | { kind: "notice"; text: string }
  | { kind: "dim"; text: string }
  | { kind: "title"; text: string }
  | { kind: "tree"; text: string }

type Scene = {
  id: string
  label: string
  icon: typeof MessageSquare
  blurb: string
  channel: string
  voice: string[]
  input: string
  lines: Line[]
}

const SCENES: Scene[] = [
  {
    id: "text",
    label: "Text",
    icon: MessageSquare,
    blurb:
      "Channels and private messages, encrypted with WHY2 before they reach the socket. The lobby keeps a history, stored encrypted on the server and replayed to you on login.",
    channel: "#lobby",
    voice: [],
    input: "/pm 2 moving this out of the channel",
    lines: [
      { kind: "ok", text: "Successfully connected to satan.red." },
      { kind: "ok", text: "Login successful. Press Ctrl+H for help." },
      { kind: "title", text: "Message history (12):" },
      { kind: "msg", user: "kate", text: "did the rekey land on your side?" },
      { kind: "msg", user: "engo", text: "yep, fresh session keys every ten minutes", own: true },
      { kind: "pm", dir: "TO", user: "kate", id: 2, text: "moving this out of the channel" },
      { kind: "pm", dir: "FROM", user: "kate", id: 2, text: "go ahead" },
    ],
  },
  {
    id: "voice",
    label: "Voice",
    icon: Mic,
    blurb:
      "Opus over UDP, carried under the same session keys as the text. Noise suppression, voice activity detection, echo cancellation and gain control all run on your machine before anything is sent.",
    channel: "#lobby",
    voice: ["engo", "kate"],
    input: "/voice",
    lines: [
      { kind: "ok", text: "Voice enabled." },
      { kind: "srv", text: "nel connected." },
      { kind: "msg", user: "kate", text: "can you hear me?" },
      { kind: "msg", user: "engo", text: "loud and clear, no fan noise at all", own: true },
      { kind: "msg", user: "nel", text: "what is doing the cleanup?" },
      { kind: "msg", user: "engo", text: "nnnoiseless, before the packet is ever encoded", own: true },
      { kind: "dim", text: "Voice disabled." },
    ],
  },
  {
    id: "screen",
    label: "Screenshare",
    icon: MonitorUp,
    blurb:
      "Share a monitor to the channel and let anyone attach to the stream. Frames are encoded, encrypted and carried on their own authorized side channel, so the conversation keeps running underneath.",
    channel: "#dev",
    voice: ["engo"],
    input: "/screen",
    lines: [
      { kind: "ok", text: "Started screen sharing." },
      { kind: "msg", user: "kate", text: "attaching" },
      { kind: "dim", text: "kate attached your screen sharing." },
      { kind: "msg", user: "kate", text: "text is perfectly readable" },
      { kind: "srv", text: "nel started screen sharing." },
      { kind: "dim", text: "Attached nel's screen sharing." },
      { kind: "ok", text: "Stopped screen sharing." },
    ],
  },
  {
    id: "files",
    label: "Files",
    icon: FolderDown,
    blurb:
      "Upload a file once and anyone on the server can pull it by ID. Transfers move in authenticated chunks on a side channel of their own, and the two IDs in the listing are the two arguments to /download.",
    channel: "#dev",
    voice: [],
    input: "/files",
    lines: [
      { kind: "dim", text: 'Uploading file "why2-2.0.1.tar.zst"...' },
      { kind: "srv", text: 'engo uploaded file "why2-2.0.1.tar.zst".' },
      { kind: "title", text: "Available files (2):" },
      { kind: "tree", text: "├─ 1  kate" },
      { kind: "tree", text: "│  ╰─ 4  notes.txt" },
      { kind: "tree", text: "╰─ 2  engo" },
      { kind: "tree", text: "   ╰─ 3  why2-2.0.1.tar.zst" },
      { kind: "ok", text: 'File "notes.txt" downloaded.' },
    ],
  },
]

const ONLINE = ["engo", "kate", "nel"]

function LineRow({ line }: { line: Line }) {
  switch (line.kind) {
    case "srv":
      return (
        <p>
          <span className="text-muted-foreground/40">[server] </span>
          <span className="text-muted-foreground">{line.text}</span>
        </p>
      )
    case "ok":
      return <p className="text-foreground/70">{line.text}</p>
    case "notice":
      return <p className="text-foreground/80">{line.text}</p>
    case "dim":
      return <p className="text-muted-foreground/40">{line.text}</p>
    case "title":
      return <p className="text-foreground/70">{line.text}</p>
    case "tree":
      return <p className="text-muted-foreground whitespace-pre">{line.text}</p>
    case "pm":
      return (
        <p>
          <span className="text-primary/70">[PM {line.dir}] </span>
          <span className="text-muted-foreground">
            {line.user} ({line.id}): {line.text}
          </span>
        </p>
      )
    default:
      return (
        <p>
          <span className={line.own ? "text-primary/80" : "text-foreground/60"}>{line.user}</span>
          <span className="text-muted-foreground">: {line.text}</span>
        </p>
      )
  }
}

export function ChatShowcase() {
  const [active, setActive] = useState(0)
  const scene = SCENES[active]

  return (
    <section className="py-24 px-4 border-t border-border/50">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 max-w-lg">
          <p className="font-mono text-xs tracking-widest uppercase text-primary mb-3">The Client</p>
          <h2 className="font-mono text-3xl md:text-4xl font-bold mb-4">One window, everything in it</h2>
          <p className="text-muted-foreground leading-relaxed">
            One client for text, voice, screenshare and file transfer, driven by slash commands
            and a keyboard. Below is what it actually prints back at you.
          </p>
        </div>

        {/* Scene switcher */}
        <div className="flex flex-wrap gap-2 mb-6">
          {SCENES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className={cn(
                "font-mono text-xs px-4 py-2 rounded border transition-colors duration-200 flex items-center gap-2 cursor-pointer",
                i === active
                  ? "bg-secondary border-primary/40 text-foreground"
                  : "bg-card border-border text-muted-foreground hover:border-primary/25 hover:text-foreground"
              )}
            >
              <s.icon className="w-3.5 h-3.5" />
              {s.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-6 items-start">
          {/* Terminal window */}
          <div className="bg-[#060608] border border-border rounded-lg overflow-hidden font-mono text-[13px]">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border text-[10px] tracking-widest text-muted-foreground">
              <span>WHY2 ── satan.red ── {scene.channel}</span>
              <span className="text-primary/50">{scene.voice.length > 0 ? "MIC ON" : "CTRL+, SETTINGS"}</span>
            </div>

            <div className="flex min-h-[300px]">
              <div className="flex-1 min-w-0 p-5 space-y-1.5 leading-relaxed break-words">
                {scene.lines.map((line, i) => (
                  <div key={`${scene.id}-${i}`} className="animate-fade-in">
                    <LineRow line={line} />
                  </div>
                ))}
              </div>

              <div className="hidden sm:block w-[150px] border-l border-border p-4 text-[11px] space-y-5 shrink-0">
                <div>
                  <p className="text-muted-foreground/50 tracking-widest mb-2">ONLINE ({ONLINE.length})</p>
                  {ONLINE.map((u) => (
                    <p key={u} className="text-foreground/70">{u}</p>
                  ))}
                </div>
                <div>
                  <p className="text-muted-foreground/50 tracking-widest mb-2">CHANNELS (2)</p>
                  <p className={scene.channel === "#lobby" ? "text-primary/70" : "text-foreground/40"}>#lobby</p>
                  <p className={scene.channel === "#dev" ? "text-primary/70" : "text-foreground/40"}>#dev</p>
                </div>
                {scene.voice.length > 0 && (
                  <div>
                    <p className="text-muted-foreground/50 tracking-widest mb-2">VOICE</p>
                    {scene.voice.map((u) => (
                      <p key={u} className="text-foreground/70">{u}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-border px-5 py-2.5 flex items-center gap-2">
              <span className="text-foreground/70">{scene.input}</span>
              <span className="w-[7px] h-[15px] bg-primary/60 animate-pulse" />
            </div>
          </div>

          {/* Scene description + command reference */}
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed text-sm">{scene.blurb}</p>

            <div className="bg-card border border-border rounded-lg p-5">
              <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/50 mb-4">
                Commands
              </p>
              <dl className="space-y-2.5 font-mono text-xs">
                {[
                  ["/help", "list every command"],
                  ["/list", "users and their IDs"],
                  ["/pm", "private message"],
                  ["/channel", "switch channel"],
                  ["/voice", "toggle voice chat"],
                  ["/screen", "share a monitor"],
                  ["/upload", "send a file"],
                  ["/settings", "audio and interface"],
                ].map(([cmd, desc]) => (
                  <div key={cmd} className="flex items-baseline gap-3">
                    <dt className="text-primary/70 w-[76px] shrink-0">{cmd}</dt>
                    <dd className="text-muted-foreground">{desc}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
