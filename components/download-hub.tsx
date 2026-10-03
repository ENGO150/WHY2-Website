"use client"

import { useEffect, useState } from "react"
import { CopyButton } from "@/components/kit"

const BASE = "https://dl.satan.red"

const COMPOSE = `services:
  why2-server:
    container_name: why2-server
    image: ghcr.io/engo150/why2:release
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
type Artifact = { file: string; format: string; note: string }

const TARGETS: { id: Target; label: string }[] = [
  { id: "linux", label: "Linux" },
  { id: "macos", label: "macOS" },
  { id: "windows", label: "Windows" },
  { id: "android", label: "Android" },
  { id: "docker", label: "Docker" },
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
  if (os === "android") return []
  const suffix = os === "windows" ? "-windows.exe" : os === "macos" ? "-macos" : "-linux"
  return [
    { file: `why2-${channel}-client${suffix}`, format: "client", note: "The chat client itself" },
    { file: `why2-${channel}-server${suffix}`, format: "server", note: "Host a server of your own" },
  ]
}

function detectOs(): Os {
  const hint = `${navigator.userAgent} ${navigator.platform ?? ""}`.toLowerCase()
  if (hint.includes("android")) return "android"
  if (hint.includes("win")) return "windows"
  if (hint.includes("mac") || hint.includes("iphone") || hint.includes("ipad")) return "macos"
  return "linux"
}

function Row({ a }: { a: Artifact }) {
  return (
    <div className="artifact">
      <div>
        <p className="fmt">{a.format}</p>
        <p className="note">{a.note}</p>
        <p className="file">{a.file}</p>
      </div>
      <div className="act">
        <a className="btn btn-sm" href={`${BASE}/${a.file}`}>Download</a>
        <a className="sha" href={`${BASE}/${a.file}.sha256`}>sha256</a>
      </div>
    </div>
  )
}

function Stance({ label, hot, text }: { label: string; hot?: boolean; text: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button className={`stance ${hot ? "hot" : ""}`} aria-expanded={open} onClick={() => setOpen(!open)}>
        {label} {open ? "[-]" : "[+]"}
      </button>
      {open && <p className={`stance-text ${hot ? "hot" : ""}`}>{text}</p>}
    </>
  )
}

const PACKAGES = [
  { name: "crates.io", cmd: "cargo install why2-chat", note: "Builds from source with cargo. Needs the audio and codec libraries for voice.", href: "https://crates.io/crates/why2-chat" },
  { name: "AUR", cmd: "paru -S why2", note: "Arch Linux and derivatives, kept in step by the release pipeline.", href: "https://aur.archlinux.org/packages/why2" },
  { name: "GURU", cmd: "emerge net-im/why2", note: "Gentoo, through the GURU overlay.", href: "https://cgit.gentoo.org/repo/proj/guru.git/tree/net-im/why2" },
]

export function DownloadHub() {
  const [target, setTarget] = useState<Target>("linux")
  const [detected, setDetected] = useState<Os | null>(null)
  const [channel, setChannel] = useState<Channel>("release")

  //DETECT OS AFTER MOUNT
  useEffect(() => {
    const os = detectOs()
    setTarget(os)
    setDetected(os)
  }, [])

  const docker = target === "docker"
  const os: Os = docker ? "linux" : target
  const desktop = docker ? [] : desktopArtifacts(channel, os)
  const terminal = docker ? [] : terminalArtifacts(channel, os)
  const detectedLabel = TARGETS.find((t) => t.id === detected)?.label

  return (
    <>
      <section className="dl-hero">
        <div className="wrap">
          <p className="label red">Downloads</p>
          <h1>Get WHY2<span className="red">_</span></h1>
          <p>
            Two clients speak the same protocol: a window and a terminal. Take whichever suits you,
            or both. Every build has a SHA-256 checksum beside it.
          </p>
        </div>
      </section>

      <div className="wrap">
        <div className="picker">
          <div className="picker-row">
            <span className="label">Platform</span>
            <div>
              <div className="seg">
                {TARGETS.map((t) => (
                  <button key={t.id} aria-pressed={t.id === target} onClick={() => setTarget(t.id)}>{t.label}</button>
                ))}
              </div>
              <p className="picker-note">
                <span className="detected">{detectedLabel ? `${detectedLabel} detected` : "detecting..."}</span>
              </p>
            </div>
          </div>

          {!docker && (
            <div className="picker-row">
              <span className="label">Channel</span>
              <div>
                <div className="seg">
                  {CHANNELS.map((c) => (
                    <button key={c.id} aria-pressed={c.id === channel} onClick={() => setChannel(c.id)}>{c.label}</button>
                  ))}
                </div>
                <p className="picker-note">{CHANNELS.find((c) => c.id === channel)?.note}</p>
              </div>
            </div>
          )}
        </div>

        {docker ? (
          <div className="clients">
            <div className="card">
              <div className="card-head">
                <h2>Server image</h2>
                <p>
                  The server, published to the GitHub container registry. Save this as{" "}
                  <code>docker-compose.yml</code> and run <code>docker compose up -d</code>.
                </p>
              </div>
              <div className="term" style={{ border: 0 }}>
                <div className="term-head"><span>docker-compose.yml</span><CopyButton text={COMPOSE} /></div>
                <pre>{COMPOSE.trimEnd()}</pre>
              </div>
              <p className="card-foot">
                Port 1204 carries both TCP and UDP: text over one, voice over the other. Configuration
                and the server keys live in the mounted ./data volume, so keep it around.
              </p>
            </div>
          </div>
        ) : (
          <div className={`clients ${terminal.length ? "two" : ""}`}>
            <div className="card">
              <div className="card-head">
                <div className="top">
                  <h2>Desktop app</h2>
                  <Stance
                    label="comfort first"
                    text="Same protocol and same encryption on the wire, with the edges softened. Your server list lives in a file only your account can read, and it holds the passwords you asked it to remember in the clear. Leave a password empty and it asks you at every connect instead."
                  />
                </div>
                <p>The graphical client, with voice, screen sharing and file transfer in the window.</p>
              </div>
              {desktop.map((a) => <Row key={a.file} a={a} />)}
            </div>

            {terminal.length > 0 && (
              <div className="card">
                <div className="card-head">
                  <div className="top">
                    <h2>Terminal client</h2>
                    <Stance
                      label="privacy first"
                      hot
                      text="It never stores your password: it asks for it at every connect. What it does keep is its settings, the server keys it has pinned and a picture cache, encrypted at rest. This is the one to run when you want no credentials on the disk."
                    />
                  </div>
                  <p>The keyboard-driven TUI, plus the server binary if you want to host. Two single files with nothing to install.</p>
                </div>
                {terminal.map((a) => <Row key={a.file} a={a} />)}
                {os !== "windows" && <p className="card-foot">chmod +x the file before running it.</p>}
              </div>
            )}
          </div>
        )}
      </div>

      {!docker && (
        <section className="dl-block">
          <div className="wrap">
            <h2>Verify the download</h2>
            <p>
              Every file has a <code>.sha256</code> next to it, linked from each row above. Hash your
              copy and compare the two before you run anything.
            </p>
            <div className="term">
              <div className="term-head"><span>sh</span></div>
              <pre>
                <div><span className="p">$ </span>sha256sum why2-{channel}-client-linux</div>
                <div><span className="p">$ </span>curl -s {BASE}/why2-{channel}-client-linux.sha256</div>
              </pre>
            </div>
          </div>
        </section>
      )}

      <section className="dl-block" id="packages">
        <div className="wrap">
          <h2>Package managers</h2>
          <p>
            The terminal client is packaged in a few places, and it updates with the rest of your
            system instead of sitting in your downloads folder.
          </p>
          <div className="ref-scroll">
            <table className="table pkgs">
              <thead>
                <tr>
                  <th>Source</th>
                  <th>Command</th>
                  <th className="col-wide">Notes</th>
                </tr>
              </thead>
              <tbody>
                {PACKAGES.map((p) => (
                  <tr key={p.name}>
                    <td><a href={p.href} target="_blank" rel="noopener noreferrer">{p.name} ↗</a></td>
                    <td className="c">{p.cmd}</td>
                    <td className="col-wide dim">{p.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
