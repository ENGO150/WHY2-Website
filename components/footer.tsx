import Link from "next/link"
import { SECTIONS } from "@/lib/sections"

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <span className="logo-mark footer-logo" aria-hidden="true" />

          <div className="footer-cols">
            <div>
              <h4 className="label">Site</h4>
              <ul>
                {SECTIONS.map((s) => (
                  <li key={s.href}><a href={s.href}>{s.label.toLowerCase()}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="label">Get it</h4>
              <ul>
                <li><Link href="/download">downloads</Link></li>
                <li><a href="https://crates.io/crates/why2-chat" target="_blank" rel="noopener noreferrer">crates.io</a></li>
                <li><a href="https://aur.archlinux.org/packages/why2" target="_blank" rel="noopener noreferrer">aur</a></li>
                <li><a href="https://docs.rs/why2/latest/why2" target="_blank" rel="noopener noreferrer">docs.rs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="label">Source</h4>
              <ul>
                <li><a href="https://git.satan.red/ENGO150/WHY2" target="_blank" rel="noopener noreferrer">git.satan.red</a></li>
                <li><a href="https://github.com/ENGO150/WHY2" target="_blank" rel="noopener noreferrer">github mirror</a></li>
                <li><a href="https://git.satan.red/ENGO150/WHY2/-/blob/stable/SECURITY" target="_blank" rel="noopener noreferrer">security policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="label">Contact</h4>
              <ul>
                <li><a href="mailto:engo@satan.red">engo@satan.red</a></li>
                <li><a href="https://satan.red" target="_blank" rel="noopener noreferrer">satan.red</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-base">
          <span>© 2022-{new Date().getFullYear()} <a href="https://satan.red" target="_blank" rel="noopener noreferrer">Václav Šmejkal</a></span>
          <span><a href="https://www.gnu.org/licenses/gpl-3.0.en.html" target="_blank" rel="noopener noreferrer">GNU GPLv3</a> · no telemetry · no cookies</span>
        </div>
      </div>
    </footer>
  )
}
