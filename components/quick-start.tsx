import Link from "next/link"
import { SecHead } from "@/components/kit"

const STEPS = [
  {
    who: "one of you",
    title: "Start a server",
    body: "Run the server on a Pi, a VPS or the machine under your desk and open port 1204. Register first and you become its owner.",
  },
  {
    who: "everyone",
    title: "Get a client",
    body: "Pick the desktop app or the terminal client. They speak the same protocol, so mix and match.",
  },
  {
    who: "everyone",
    title: "Connect and talk",
    body: "Enter the address, choose a name and password, and compare the server's fingerprint with the owner's once. Then just talk.",
  },
]

export function QuickStart() {
  return (
    <section id="start" className="sec">
      <div className="wrap">
        <SecHead
          n="03"
          label="get started"
          title="From zero to talking."
          lede="Three steps, and only one person has to do the first."
        />

        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.title} className="step">
              <span className="step-n">{i + 1}</span>
              <span className="label">{s.who}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="steps-cta">
          <Link href="/download" className="btn btn-red">Downloads</Link>
          <p>Clients, server binaries and the Docker image, with checksums.</p>
        </div>
      </div>
    </section>
  )
}
