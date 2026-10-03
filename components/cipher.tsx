import { SecHead } from "@/components/kit"

export function Cipher() {
  return (
    <section id="rex" className="sec">
      <div className="wrap">
        <SecHead
          n="04"
          label="under the hood"
          title="Built on REX."
          lede="The chat runs on REX, the WHY2 encryption system. It is a standalone Rust crate you can use in your own projects."
        />

        <div className="cipher-actions">
          <span className="inline-cmd"><span className="p">$</span> cargo add why2</span>
          <a className="btn" href="https://docs.rs/why2/latest/why2" target="_blank" rel="noopener noreferrer">Documentation ↗</a>
        </div>

        <div className="quote">
          <blockquote>&ldquo;If privacy is outlawed, only outlaws will have privacy.&rdquo;</blockquote>
          <cite>Phil Zimmermann</cite>
        </div>
      </div>
    </section>
  )
}
