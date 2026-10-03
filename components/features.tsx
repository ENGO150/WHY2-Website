import { SecHead } from "@/components/kit"

const FEATURES = [
  ["Text chat", "Channels, private messages, replies, reactions, and an optional history that waits for you when you log back in."],
  ["Voice", "Voice channels with noise suppression and echo cancellation, done on your own machine."],
  ["Screen sharing", "Share a monitor with the channel; anyone can watch while the conversation carries on."],
  ["File transfer", "Upload a file once and anyone on the server can grab it."],
  ["Your server", "Runs on anything from a Raspberry Pi to a VPS. You decide who gets in, the roles and the rules."],
  ["Two clients", "A desktop app if you want a window, a terminal client if you live in the keyboard."],
  ["Tor friendly", "Route the whole session through a SOCKS5 proxy or Tor."],
  ["Nothing collected", "No telemetry, no analytics, no accounts anywhere else."],
]

export function Features() {
  return (
    <section id="features" className="sec">
      <div className="wrap">
        <SecHead
          n="01"
          label="features"
          title="What you get."
          lede="Everything a small group needs to talk, and nothing that reports back to anyone outside your server."
        />

        <ul className="feats">
          {FEATURES.map(([title, body]) => (
            <li key={title} className="feat">
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
