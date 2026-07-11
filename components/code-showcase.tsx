"use client"

import { useState } from "react"
import { Copy, Check, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"

const codeExample = `use why2::encrypter;

fn main()
{
    let message = String::from("Privacy is a right.");

    let encrypted = encrypter::encrypt_string::<8,8>(&message, None)
                        .expect("Encryption failed.");

    for grid in &encrypted.output
    {
        println!("Encrypted Grid: {}", grid);
    }
}`

type Token = { text: string; cls?: string }

function tokenizeLine(line: string): Token[] {
  if (line.trim() === "") return [{ text: " " }]

  const result: Token[] = []
  let remaining = line

  const rules: [RegExp, string][] = [
    [/^\/\/.*$/, "text-muted-foreground/50"],
    [/^"[^"]*"/, "text-pink-400"],
    [/^(use|fn|let|for|in|pub|mod|struct|impl|return|if|else|match|mut|ref)\b/, "text-fuchsia-400"],
    [/^(String|Option|Result|Vec|Box|None|Some|Ok|Err|true|false)\b/, "text-rose-300"],
    [/^(println!|print!|format!|vec!|panic!|assert!)/, "text-pink-300"],
    [/^\.(expect|unwrap)/, "text-pink-300"],
    [/^\b\d+\b/, "text-rose-400"],
    [/^[{}()\[\];,]/, "text-muted-foreground"],
    [/^::/, "text-muted-foreground"],
    [/^[&]/, "text-fuchsia-400"],
    [/^[<>]/, "text-muted-foreground"],
    [/^\s+/, ""],
    [/^[a-zA-Z_]\w*/, ""],
  ]

  while (remaining.length > 0) {
    let matched = false
    for (const [pattern, cls] of rules) {
      const m = remaining.match(pattern)
      if (m) {
        result.push({ text: m[0], cls })
        remaining = remaining.slice(m[0].length)
        matched = true
        break
      }
    }
    if (!matched) {
      // Consume one char as plain text
      const nextSpecial = remaining.slice(1).search(/["()\[\]{};,.:&<>\d\/]|\b(use|fn|let|for|in|pub|mod|struct|impl|return|if|else|match|mut|ref|String|Option|Result|Vec|Box|None|Some|Ok|Err|true|false|println!|print!|format!)\b/)
      const end = nextSpecial === -1 ? remaining.length : nextSpecial + 1
      result.push({ text: remaining.slice(0, end) })
      remaining = remaining.slice(end)
    }
  }

  return result
}

export function CodeShowcase() {
  const [copied, setCopied] = useState(false)
  const lines = codeExample.split("\n")

  const copyCode = () => {
    navigator.clipboard.writeText(codeExample)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12 max-w-lg">
          <p className="font-mono text-xs tracking-widest uppercase text-primary mb-3">Usage</p>
          <h2 className="font-mono text-3xl md:text-4xl font-bold mb-4">Quick Start</h2>
          <p className="text-muted-foreground">Get started with WHY2 in seconds.</p>
        </div>

        <div className="bg-[#060608] rounded-lg border border-border overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="ml-4 flex items-center gap-2 text-muted-foreground text-sm font-mono">
                <Terminal className="w-4 h-4" />
                main.rs
              </div>
            </div>
            <Button size="sm" variant="ghost" onClick={copyCode} className="text-muted-foreground hover:text-foreground">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                {lines.map((line, i) => (
                  <tr key={i} className="hover:bg-white/[0.015]">
                    <td className="py-0 pl-4 pr-3 text-right font-mono text-xs text-muted-foreground/20 select-none border-r border-border/20 w-[1%] whitespace-nowrap leading-relaxed align-top">
                      {i + 1}
                    </td>
                    <td className="py-0 pl-5 pr-6 font-mono text-sm whitespace-pre leading-relaxed">
                      {tokenizeLine(line).map((tok, j) =>
                        <span key={j} className={tok.cls || "text-foreground/70"}>{tok.text}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="h-4" />
        </div>

        <div className="mt-8 flex items-center">
          <div className="font-mono text-sm bg-[#060608] border border-border rounded-lg px-5 py-3 flex items-center gap-3">
            <span className="text-primary">$</span>
            <span className="text-muted-foreground">cargo add why2</span>
          </div>
        </div>
      </div>
    </section>
  )
}
