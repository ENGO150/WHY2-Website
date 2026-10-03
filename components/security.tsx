import { SecHead } from "@/components/kit"

const SAFE = [
  "Anyone listening on the network: messages, voice, screens and files are all encrypted and checked for tampering.",
  "Someone recording today to decrypt later: the key exchange is post-quantum, and REX is a symmetric cipher, quantum-resistant by nature.",
  "A fake server posing as yours: its identity is remembered after the first connection, and a change is flagged.",
  "A new key every ten minutes, so one leaked key exposes very little.",
]

const LIMITS = [
  "The server can read messages. That is by design, see below.",
  "Check the server's fingerprint on your first connection; your client shows it and asks before trusting it.",
  "REX, the cipher, is experimental and has not been audited. Do not bet your life on it.",
]

export function Security() {
  return (
    <section id="security" className="sec">
      <div className="wrap">
        <SecHead
          n="02"
          label="security"
          title="How safe is it?"
          lede="Safe against the people between you and your server. Honest about the rest."
        />

        <div className="safety">
          <div>
            <h3 className="label">Protected from</h3>
            <ul className="checks">
              {SAFE.map((s) => <li key={s}><span>[+]</span>{s}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="label">Keep in mind</h3>
            <ul className="checks">
              {LIMITS.map((s) => <li key={s}><span className="red">[!]</span>{s}</li>)}
            </ul>
          </div>
        </div>

        <div className="why">
          <h3>Why the server can read your messages</h3>
          <p>
            It is intentional. End-to-end encryption is only as good as whoever hands you the other
            person&apos;s keys, and in most apps that is a key or certificate server run by a third
            party you cannot inspect. If that server is malicious, or simply told to be, it can slip
            itself into the conversation and the padlock is eye candy.
          </p>
          <p>
            WHY2 does not pretend. Your traffic is encrypted between you and one server, and you
            choose that server: run it yourself, or use one run by someone you trust. There is no
            hidden third party in the middle.
          </p>
        </div>

        <p className="report">
          Found a vulnerability? Email <a href="mailto:engo@satan.red">engo@satan.red</a> rather than
          opening a public issue. <a href="https://git.satan.red/ENGO150/WHY2/-/blob/stable/SECURITY" target="_blank" rel="noopener noreferrer">Security policy ↗</a>
        </p>
      </div>
    </section>
  )
}
