"use client"

import { useState } from "react"
import { Copy, Check, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"

const codeExample = `use why2::prelude::*;

fn main() {
    let key = Key::generate();
    let message = "Privacy is a right.";
    
    let encrypted = why2::encrypt(message, &key);
    println!("Encrypted: {:?}", encrypted);
    
    let decrypted = why2::decrypt(&encrypted, &key);
    assert_eq!(message, decrypted.unwrap());
}`

export function CodeShowcase() {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(codeExample)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-24 px-4 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto max-w-4xl relative">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-mono text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">fn</span> quick_start<span className="text-primary">()</span>
          </h2>
          <p className="text-muted-foreground">Get started with WHY2 in seconds</p>
        </div>

        {/* Code window */}
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

          {/* Window */}
          <div className="relative bg-[#0d0d0d] rounded-xl border border-border/50 overflow-hidden shadow-2xl">
            {/* Window header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#161616] border-b border-border/50">
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="ml-4 flex items-center gap-2 text-muted-foreground text-sm font-mono">
                  <Terminal className="w-4 h-4" />
                  main.rs
                </div>
              </div>

              <Button
                size="sm"
                variant="ghost"
                onClick={copyCode}
                className="text-muted-foreground hover:text-foreground hover:bg-primary/10"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>

            {/* Code content */}
            <div className="p-6 overflow-x-auto">
              <pre className="font-mono text-sm leading-relaxed">
                <code>
                  <span className="text-primary">use</span> <span className="text-cyan-400">why2::prelude::*</span>;
                  {"\n\n"}
                  <span className="text-primary">fn</span> <span className="text-yellow-400">main</span>
                  <span className="text-foreground">{"()"}</span> <span className="text-foreground">{"{"}</span>
                  {"\n"}
                  {"    "}
                  <span className="text-primary">let</span> <span className="text-foreground">key</span>{" "}
                  <span className="text-primary">=</span> <span className="text-cyan-400">Key</span>
                  <span className="text-foreground">::</span>
                  <span className="text-yellow-400">generate</span>
                  <span className="text-foreground">();</span>
                  {"\n"}
                  {"    "}
                  <span className="text-primary">let</span> <span className="text-foreground">message</span>{" "}
                  <span className="text-primary">=</span> <span className="text-green-400">"Privacy is a right."</span>
                  <span className="text-foreground">;</span>
                  {"\n\n"}
                  {"    "}
                  <span className="text-primary">let</span> <span className="text-foreground">encrypted</span>{" "}
                  <span className="text-primary">=</span> <span className="text-cyan-400">why2</span>
                  <span className="text-foreground">::</span>
                  <span className="text-yellow-400">encrypt</span>
                  <span className="text-foreground">(message, </span>
                  <span className="text-primary">&</span>
                  <span className="text-foreground">key);</span>
                  {"\n"}
                  {"    "}
                  <span className="text-yellow-400">println!</span>
                  <span className="text-foreground">(</span>
                  <span className="text-green-400">{'"Encrypted: {:?}"'}</span>
                  <span className="text-foreground">, encrypted);</span>
                  {"\n\n"}
                  {"    "}
                  <span className="text-primary">let</span> <span className="text-foreground">decrypted</span>{" "}
                  <span className="text-primary">=</span> <span className="text-cyan-400">why2</span>
                  <span className="text-foreground">::</span>
                  <span className="text-yellow-400">decrypt</span>
                  <span className="text-foreground">(</span>
                  <span className="text-primary">&</span>
                  <span className="text-foreground">encrypted, </span>
                  <span className="text-primary">&</span>
                  <span className="text-foreground">key);</span>
                  {"\n"}
                  {"    "}
                  <span className="text-yellow-400">assert_eq!</span>
                  <span className="text-foreground">(message, decrypted.</span>
                  <span className="text-yellow-400">unwrap</span>
                  <span className="text-foreground">());</span>
                  {"\n"}
                  <span className="text-foreground">{"}"}</span>
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Install command */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="font-mono text-sm bg-[#0d0d0d] border border-border/50 rounded-lg px-6 py-3 flex items-center gap-3">
            <span className="text-primary">$</span>
            <span className="text-muted-foreground">cargo add why2</span>
          </div>
        </div>
      </div>
    </section>
  )
}
