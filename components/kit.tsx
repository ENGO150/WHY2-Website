"use client"

import type React from "react"
import { useState } from "react"

export function SecHead({ n, label, title, lede }: { n: string; label: string; title: React.ReactNode; lede: React.ReactNode }) {
  return (
    <div className="sec-head">
      <p className="tag"><b>0x{n}</b>{label}</p>
      <h2>{title}</h2>
      <p className="lede">{lede}</p>
    </div>
  )
}

export function CopyButton({ text }: { text: string }) {
  const [ok, setOk] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setOk(true)
      setTimeout(() => setOk(false), 1800)
    } catch {}
  }

  return <button className={`copy ${ok ? "ok" : ""}`} onClick={copy}>{ok ? "copied" : "copy"}</button>
}
