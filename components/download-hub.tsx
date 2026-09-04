"use client"

import type React from "react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AppWindow, ArrowDown, Check, Command, Container, Copy, Download, Package, Smartphone, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"

const BASE = "https://dl.satan.red"

const COMPOSE = `services:
  why2-server:
    container_name: why2-server
    image: ghcr.io/engo150/why2:latest
    ports:
      - "1204:1204/tcp"
      - "1204:1204/udp"
    volumes:
      - ./data:/data
    restart: unless-stopped
`

type Os = "linux" | "macos" | "windows" | "android"
type Target = Os | "docker"
type Channel = "stable" | "release" | "development"

type Artifact = {
  file: string
  format: string
  note: string
}

const TARGETS: { id: Target; label: string; icon: typeof Terminal }[] = [
  { id: "linux", label: "Linux", icon: Terminal },
  { id: "macos", label: "macOS", icon: Command },
  { id: "windows", label: "Windows", icon: AppWindow },
  { id: "android", label: "Android", icon: Smartphone },
  { id: "docker", label: "Docker", icon: Container },
]

const CHANNELS: { id: Channel; label: string; note: string }[] = [
  { id: "release", label: "Release", note: "The published version, the same code that reaches crates.io and the AUR. Pick this one if you are not sure." },
  { id: "stable", label: "Stable", note: "The stable branch." },
  { id: "development", label: "Development", note: "The development branch. Newest work, and the roughest edges." },
]

function desktopArtifacts(channel: Channel, os: Os): Artifact[] {
  const name = `why2_desktop-${channel}`

  switch (os) {
    case "linux":
      return [
        { file: `${name}-linux.AppImage`, format: "AppImage", note: "Portable, runs on any distribution" },
        { file: `${name}-linux.deb`, format: "deb", note: "Debian, Ubuntu and derivatives" },
        { file: `${name}-linux.rpm`, format: "rpm", note: "Fedora, RHEL and openSUSE" },
      ]
    case "macos":
      return [{ file: `${name}-macos.dmg`, format: "dmg", note: "Disk image, drag it into Applications" }]
    case "windows":
      return [
        { file: `${name}-windows-setup.exe`, format: "exe", note: "Installer, the usual way in" },
        { file: `${name}-windows.msi`, format: "msi", note: "For deployment through Group Policy or Intune" },
      ]
    case "android":
      return [{ file: `${name}-android.apk`, format: "apk", note: "Sideload it, there is no store listing" }]
  }
}

function terminalArtifacts(channel: Channel, os: Os): Artifact[] {
  const suffix = os === "windows" ? "-windows.exe" : os === "macos" ? "-macos" : "-linux"

  if (os === "android") return []

  return [
    { file: `why2-${channel}-client${suffix}`, format: "client", note: "The chat client itself" },
    { file: `why2-${channel}-server${suffix}`, format: "server", note: "Host a server of your own" },
  ]
}

function detectOs(): Os {
  if (typeof navigator === "undefined") return "linux"

  const hint = `${navigator.userAgent} ${navigator.platform ?? ""}`.toLowerCase()

  if (hint.includes("android")) return "android"
  if (hint.includes("win")) return "windows"
  if (hint.includes("mac") || hint.includes("iphone") || hint.includes("ipad")) return "macos"

  return "linux"
}

function ArtifactRow({ artifact }: { artifact: Artifact }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 py-4 border-b border-border/50 last:border-b-0">
      <div className="min-w-0 flex-1">
        <p className="font-mono text-sm text-foreground mb-1">{artifact.format}</p>
        <p className="text-xs text-muted-foreground mb-1">{artifact.note}</p>
        <p className="font-mono text-[10px] text-muted-foreground/40 break-all">{artifact.file}</p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <a
          href={`${BASE}/${artifact.file}`}
          className="font-mono text-xs px-4 py-2 rounded border border-border bg-secondary text-foreground hover:border-primary/40 transition-colors duration-200 flex items-center gap-2"
        >
          <Download className="w-3.5 h-3.5" />
          Download
        </a>
        <a
          href={`${BASE}/${artifact.file}.sha256`}
          className="font-mono text-[11px] text-muted-foreground/50 hover:text-primary transition-colors duration-200"
        >
          sha256
        </a>
      </div>
    </div>
  )
}

export function DownloadHub() {
  // Detection happens after mount so the prerendered HTML and the first client render agree
  const [target, setTarget] = useState<Target>("linux")
  const [detectedOs, setDetectedOs] = useState<Os | null>(null)
  const [channel, setChannel] = useState<Channel>("release")
  const [copied, setCopied] = useState(false)

  // The navbar performs the same offset-aware scroll, so the heading clears the fixed header
  const scrollToPackages = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.querySelector("#packages")
    if (!element) return
    const top = element.getBoundingClientRect().top - document.body.getBoundingClientRect().top - 80
    window.scrollTo({ top, behavior: "smooth" })
  }

  const copyCompose = async () => {
    try {
      await navigator.clipboard.writeText(COMPOSE)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  useEffect(() => {
    const found = detectOs()
    setTarget(found)
    setDetectedOs(found)
  }, [])

  // Docker ships one image instead of per-OS builds, so those tabs' lists sit this one out
  const isDocker = target === "docker"
  const os: Os = isDocker ? "linux" : target
  const desktop = isDocker ? [] : desktopArtifacts(channel, os)
  const terminal = isDocker ? [] : terminalArtifacts(channel, os)
  // Reports what was detected, not what is selected, so switching tabs does not rewrite it
  const detectedLabel = TARGETS.find((entry) => entry.id === detectedOs)?.label

  return (
    <div className="pt-32 pb-24 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="font-mono text-xs tracking-widest uppercase text-primary mb-3">Downloads</p>
          <h1 className="font-mono text-4xl md:text-5xl font-bold mb-4">Get WHY2 Chat</h1>
          <p className="text-muted-foreground leading-relaxed">
            Two clients speak the same protocol: a window and a terminal. Take whichever suits you,
            or both. Every build has a checksum beside it.
          </p>

          <a
            href="#packages"
            onClick={scrollToPackages}
            className="inline-flex items-center gap-2 mt-6 font-mono text-xs px-4 py-2 rounded border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors duration-200"
          >
            <Package className="w-3.5 h-3.5" />
            Or install it from a package manager
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* OS selector */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {TARGETS.map((entry) => (
            <button
              key={entry.id}
              onClick={() => setTarget(entry.id)}
              className={cn(
                "font-mono text-xs px-4 py-2 rounded border transition-colors duration-200 flex items-center gap-2 cursor-pointer",
                entry.id === target
                  ? "bg-secondary border-primary/40 text-foreground"
                  : "bg-card border-border text-muted-foreground hover:border-primary/25 hover:text-foreground"
              )}
            >
              <entry.icon className="w-3.5 h-3.5" />
              {entry.label}
            </button>
          ))}
          <span className="font-mono text-[11px] text-muted-foreground/40 ml-1">
            {detectedLabel ? `${detectedLabel} detected` : "detecting…"}
          </span>
        </div>

        {/* Channel selector, which the Docker image tag stands in for */}
        {!isDocker && (
        <>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {CHANNELS.map((entry) => (
            <button
              key={entry.id}
              onClick={() => setChannel(entry.id)}
              className={cn(
                "font-mono text-xs px-4 py-2 rounded border transition-colors duration-200 cursor-pointer",
                entry.id === channel
                  ? "bg-secondary border-primary/40 text-foreground"
                  : "bg-card border-border text-muted-foreground hover:border-primary/25 hover:text-foreground"
              )}
            >
              {entry.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mb-10">
          {CHANNELS.find((entry) => entry.id === channel)?.note}
        </p>
        </>
        )}

        {/* Docker: one image, nothing to download */}
        {isDocker && (
          <div className="bg-card border border-border rounded-lg p-6 mb-16">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-secondary border border-border flex items-center justify-center">
                  <Container className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-mono text-lg font-semibold">Server image</h2>
              </div>

              <button
                onClick={copyCompose}
                className="font-mono text-xs px-4 py-2 rounded border border-border bg-secondary text-foreground hover:border-primary/40 transition-colors duration-200 flex items-center gap-2 cursor-pointer shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              The server, published to the GitHub container registry. Put this in a{" "}
              <span className="font-mono text-foreground">docker-compose.yml</span> and bring it up with{" "}
              <span className="font-mono text-foreground">docker compose up -d</span>.
            </p>

            <div className="bg-[#060608] border border-border rounded-lg px-5 py-4 overflow-x-auto">
              <pre className="font-mono text-sm leading-relaxed whitespace-pre text-foreground/85">{COMPOSE.trimEnd()}</pre>
            </div>

            <p className="font-mono text-[11px] text-muted-foreground/50 mt-4">
              Port 1204 carries both TCP and UDP: text over one, voice over the other. Configuration and
              the server keys live in the mounted ./data volume, so keep it around.
            </p>
          </div>
        )}

        {/* The two clients */}
        {!isDocker && (
        <div className={cn("grid gap-6 mb-16", terminal.length > 0 && "lg:grid-cols-2")}>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded bg-secondary border border-border flex items-center justify-center">
                <AppWindow className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-mono text-lg font-semibold">Desktop app</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              The graphical client, with voice, screen sharing and file transfer in the window.
            </p>
            <div>
              {desktop.map((artifact) => (
                <ArtifactRow key={artifact.file} artifact={artifact} />
              ))}
            </div>
          </div>

          {terminal.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded bg-secondary border border-border flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-mono text-lg font-semibold">Terminal client</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                The keyboard-driven TUI, plus the server binary if you want to host. Two single files
                with nothing to install.
              </p>

              <div>
                {terminal.map((artifact) => (
                  <ArtifactRow key={artifact.file} artifact={artifact} />
                ))}
              </div>

              {os !== "windows" && (
                <p className="font-mono text-[11px] text-muted-foreground/50 mt-4">
                  chmod +x the file before running it.
                </p>
              )}
            </div>
          )}
        </div>
        )}

        {/* Checksums */}
        {!isDocker && (
        <div className="bg-card border border-border rounded-lg p-6 mb-16">
          <h2 className="font-mono text-lg font-semibold mb-3">Check what you downloaded</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-2xl">
            Every file has a <span className="font-mono text-foreground">.sha256</span> next to it, linked
            from each row above. Hash your copy and compare the two before you run anything.
          </p>
          <div className="bg-[#060608] border border-border rounded-lg px-5 py-4 overflow-x-auto">
            <pre className="font-mono text-sm leading-relaxed whitespace-pre">
              <div>
                <span className="text-primary select-none">$ </span>
                <span className="text-foreground/85">sha256sum why2-{channel}-client-linux</span>
              </div>
              <div>
                <span className="text-primary select-none">$ </span>
                <span className="text-foreground/85">
                  curl -s {BASE}/why2-{channel}-client-linux.sha256
                </span>
              </div>
            </pre>
          </div>
        </div>
        )}

        {/* Package managers */}
        <div id="packages" className="scroll-mt-24">
          <h2 className="font-mono text-2xl font-bold mb-3">Or use a package manager</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            The terminal client is packaged in a few places, and it updates with the rest of your system
            instead of sitting in your downloads folder.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                name: "crates.io",
                command: "cargo install why2-chat",
                note: "Builds from source with cargo. Needs the audio and codec libraries for voice.",
                href: "https://crates.io/crates/why2-chat",
              },
              {
                name: "AUR",
                command: "paru -S why2",
                note: "Arch Linux and derivatives, kept in step by the release pipeline.",
                href: "https://aur.archlinux.org/packages/why2",
              },
              {
                name: "GURU",
                command: "emerge net-im/why2",
                note: "Gentoo, through the GURU overlay.",
                href: "https://cgit.gentoo.org/repo/proj/guru.git/tree/net-im/why2",
              },
            ].map((entry) => (
              <Link
                key={entry.name}
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-card border border-border rounded-lg p-5 hover:border-primary/30 transition-colors duration-200 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-4 h-4 text-primary" />
                  <span className="font-mono text-sm font-semibold text-foreground">{entry.name}</span>
                </div>
                <div className="font-mono text-xs bg-[#060608] border border-border rounded px-3 py-2 mb-3 text-muted-foreground overflow-x-auto whitespace-nowrap">
                  {entry.command}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{entry.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
