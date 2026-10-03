import Link from "next/link"
import { Version } from "@/components/version"

const FACTS = [
  ["Talk", "text, voice, screen, files"],
  ["Hosting", "your own server"],
  ["Key exchange", "post-quantum"],
  ["Tracking", "none"],
  ["Platforms", "Linux, macOS, Windows, Android"],
  ["Price", "free, GPLv3"],
]

export function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <span className="hero-tag"><span className="dot" /><Version /> &ldquo;aqua regia&rdquo;</span>
            <h1>WHY2<span className="cur">_</span></h1>
            <p className="sub">Encrypted chat on a server <em>you</em> control.</p>
            <p className="lead">
              Text, voice, screen sharing and file transfer for small groups. You run the server,
              everything on the wire is encrypted, and nothing is collected about you.
            </p>
            <div className="hero-actions">
              <Link href="/download" className="btn btn-red">Download</Link>
              <a href="#security" className="btn">How safe is it?</a>
              <a href="https://git.satan.red/ENGO150/WHY2" target="_blank" rel="noopener noreferrer" className="btn">Source ↗</a>
            </div>
          </div>

          <div className="hero-mark" aria-hidden="true">
            <span className="logo-mark" />
          </div>
        </div>

        <dl className="specs">
          {FACTS.map(([k, v]) => (
            <div key={k}>
              <dt className="label">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
