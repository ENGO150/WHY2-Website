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
                  {/* USE statement */}
                  <span className="text-indigo-400">use</span>{" "}
                  <span className="text-muted-foreground">why2::</span>
                  <span className="text-violet-300">encrypter</span>;
                  {"\n\n"}

                  {/* FN MAIN */}
                  <span className="text-indigo-400">fn</span> <span className="text-purple-300">main</span>
                  <span className="text-muted-foreground">{"()"}</span> <span className="text-muted-foreground">{"\n{"}</span>
                  {"\n"}
                  {"    "}

                  {/* LET MESSAGE */}
                  <span className="text-indigo-400">let</span> <span className="text-foreground">message</span>{" "}
                  <span className="text-indigo-400">=</span> <span className="text-violet-300">String</span>
                  <span className="text-muted-foreground">::</span>
                  <span className="text-purple-300">from</span>(
                  <span className="text-fuchsia-500">"Privacy is a right."</span>
                  <span className="text-muted-foreground">);</span>
                  {"\n\n"}
                  {"    "}

                  {/* LET ENCRYPTED */}
                  <span className="text-indigo-400">let</span> <span className="text-foreground">encrypted</span>{" "}
                  <span className="text-indigo-400">=</span> <span className="text-violet-300">encrypter</span>
                  <span className="text-muted-foreground">::</span>
                  <span className="text-purple-300">encrypt_string</span>
                  <span className="text-muted-foreground">::{"<"}</span>
                  <span className="text-pink-400">8</span>,<span className="text-pink-400">8</span>
                  <span className="text-muted-foreground">{">"}(</span>
                  <span className="text-indigo-400">&</span>
                  <span className="text-foreground">message, </span>
                  <span className="text-violet-300">None</span>
                  <span className="text-muted-foreground">)</span>
                  {"\n"}
                  {"                        "}
                  <span className="text-muted-foreground">.</span>
                  <span className="text-purple-300">expect</span>
                  <span className="text-muted-foreground">(</span>
                  <span className="text-fuchsia-500">"Encryption failed."</span>
                  <span className="text-muted-foreground">);</span>
                  {"\n\n"}
                  {"    "}

                  {/* FOR LOOP */}
                  <span className="text-indigo-400">for</span> grid <span className="text-indigo-400">in</span>{" "}
                  <span className="text-indigo-400">&</span>
                  <span className="text-foreground">encrypted.output</span>
                  {"\n"}
                  {"    "}
                  <span className="text-muted-foreground">{"{"}</span>
                  {"\n"}
                  {"        "}
                  <span className="text-purple-300">println!</span>
                  <span className="text-muted-foreground">(</span>
                  <span className="text-fuchsia-500">{'"Encrypted Grid: {}"'}</span>
                  <span className="text-muted-foreground">, grid);</span>
                  {"\n"}
                  {"    "}
                  <span className="text-muted-foreground">{"}"}</span>
                  {"\n"}
                  <span className="text-muted-foreground">{"}"}</span>
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
