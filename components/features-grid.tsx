"use client"

import { Lock, KeyRound, Mic, MonitorUp, Server, EyeOff, TerminalSquare, FolderDown } from "lucide-react"

const features = [
  {
    icon: Lock,
    title: "Encrypted Everything",
    description: "Messages, voice packets, screen frames and file chunks all travel under the same WHY2 session keys, authenticated with HMAC-SHA256 and sequence-numbered against replay.",
    span: "md:col-span-2",
  },
  {
    icon: KeyRound,
    title: "Post-Quantum Handshake",
    description: "P-521 ECDH combined with ML-KEM-768, signed by the server's long-term identity and pinned on first use.",
    span: "md:col-span-1",
  },
  {
    icon: Mic,
    title: "Voice Channels",
    description: "Opus over UDP with noise suppression, voice activity detection and echo cancellation.",
    span: "md:col-span-1",
  },
  {
    icon: MonitorUp,
    title: "Screen Sharing",
    description: "Pick a monitor, share it to the channel, and let anyone attach to the stream: encoded, encrypted and carried on its own authorized side channel alongside the conversation.",
    span: "md:col-span-2",
  },
  {
    icon: Server,
    title: "Your Server, Your Rules",
    description: "Run the server yourself on anything from a Pi to a VPS. Channels, roles, bans, rate limits and registration are all yours to configure, and nothing is brokered by anyone else.",
    span: "md:col-span-2",
  },
  {
    icon: EyeOff,
    title: "Nothing Collected",
    description: "No telemetry, no accounts elsewhere, no analytics. Message history lives encrypted on your own server.",
    span: "md:col-span-1",
  },
  {
    icon: FolderDown,
    title: "File Transfer",
    description: "Upload once, share by ID. Chunked, authenticated, and out of the way of the chat.",
    span: "md:col-span-1",
  },
  {
    icon: TerminalSquare,
    title: "Keyboard Driven",
    description: "A single binary with a full TUI on Linux, macOS and Windows, plus SOCKS5 support for routing an entire session through a proxy or Tor.",
    span: "md:col-span-2",
  },
]

export function FeaturesGrid() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 max-w-lg">
          <p className="font-mono text-xs tracking-widest uppercase text-primary mb-3">Capabilities</p>
          <h2 className="font-mono text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
          <p className="text-muted-foreground">Everything a small, private group needs, and nothing that phones home.</p>
        </div>

        {/* Bento grid: 2 wide + 2 narrow alternating */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`group relative bg-card border border-border rounded-lg p-6 hover:border-primary/30 transition-colors duration-200 ${feature.span}`}
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded bg-secondary border border-border flex items-center justify-center mb-5 group-hover:border-primary/30 transition-colors duration-200">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>

              <h3 className="font-mono text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed text-sm">
                {feature.description}
              </p>

              {/* Subtle corner mark */}
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary/10 group-hover:bg-primary/30 transition-colors duration-200" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
