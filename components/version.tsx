"use client"

import { useEffect, useState } from "react"

const FALLBACK = "2.2.6"

//LATEST why2-chat VERSION FROM CRATES.IO
export function Version() {
  const [version, setVersion] = useState(FALLBACK)

  useEffect(() => {
    fetch("https://crates.io/api/v1/crates/why2-chat")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data?.crate?.default_version && setVersion(data.crate.default_version))
      .catch(() => {})
  }, [])

  return <>v{version}</>
}
