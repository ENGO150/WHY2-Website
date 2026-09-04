"use client"

import { useState, useCallback } from "react"
import { RotateCcw, ChevronRight, ChevronLeft, Cpu, ShieldCheck, Info, ArrowDownUp } from "lucide-react"
import { cn } from "@/lib/utils"

type StepType = "HANDSHAKE" | "DERIVE" | "AUTH" | "COUNTER" | "ROUNDS" | "KEYSTREAM" | "XOR" | "SEAL" | "REKEY"

interface SessionStep {
  type: StepType
  label: string
  panel: string
  description: string
  isModified: (r: number, c: number) => boolean
}

const STEPS: SessionStep[] = [
  {
    type: "HANDSHAKE",
    label: "HANDSHAKE",
    panel: "PEER_PUBLIC_KEYS",
    description: "Client and server trade ephemeral P-521 and ML-KEM-768 public keys. The server signs the whole transcript with its long-term identity key, and you confirm its fingerprint once: trust on first use.",
    isModified: () => false,
  },
  {
    type: "DERIVE",
    label: "SESSION KEYS",
    panel: "DERIVED_KEY_MATERIAL",
    description: "The classical shared secret and the post-quantum encapsulated secret go into HKDF-SHA256 together. Breaking the session means breaking both, since one alone is not enough.",
    isModified: () => true,
  },
  {
    type: "AUTH",
    label: "AUTHENTICATION",
    panel: "DERIVED_KEY_MATERIAL",
    description: "The server issues a challenge; your password is hashed with Argon2 and never leaves the machine in any recoverable form. Bans and roles are resolved here, before a single message flows.",
    isModified: (r) => r === 0,
  },
  {
    type: "COUNTER",
    label: "BLOCK COUNTER",
    panel: "COUNTER_BLOCK_IN",
    description: "You press Enter. The message is split into blocks and each one is handed a unique counter value. WHY2 runs in CTR mode, so blocks encrypt independently and in parallel.",
    isModified: () => false,
  },
  {
    type: "ROUNDS",
    label: "REX ROUNDS",
    panel: "KEYSTREAM_STATE",
    description: "The counter block runs through the cipher: round-key addition, an ARX nonlinear layer, key-dependent row shifts, and MDS column mixing, repeated until every input bit has touched every output bit.",
    isModified: () => true,
  },
  {
    type: "KEYSTREAM",
    label: "KEYSTREAM READY",
    panel: "KEYSTREAM_OUT",
    description: "What comes out is a pseudorandom block bound to this session's key and this block's counter. It is never reused: no two blocks in a session share a keystream.",
    isModified: () => false,
  },
  {
    type: "XOR",
    label: "XOR WITH MESSAGE",
    panel: "CIPHERTEXT",
    description: "The keystream is XORed with your text. The same operation covers voice packets, screen frames and file chunks: one session key protects every side channel the client opens.",
    isModified: () => true,
  },
  {
    type: "SEAL",
    label: "AUTHENTICATE & SEND",
    panel: "SEALED_PACKET",
    description: "An HMAC-SHA256 tag and a sequence number are attached before the packet leaves. Tampering, replays and reordering are all rejected on arrival. The server holds the other end of this session, decrypts the packet, and re-encrypts it for whoever it is routed to.",
    isModified: () => false,
  },
  {
    type: "REKEY",
    label: "REKEY",
    panel: "NEW_KEY_MATERIAL",
    description: "Every ten minutes the whole handshake runs again and the old session keys are thrown away. A rekey that fails to verify does not fall back; the session simply ends.",
    isModified: () => true,
  },
]

const getValue = (val: string): number => {
  if (val.length === 1) return val.charCodeAt(0);
  const num = parseInt(val, 16);
  return isNaN(num) ? 0 : num;
}

const transformValue = (val: string, diff: number): string => {
  const current = getValue(val);
  const res = (current + diff) % 256;
  return res.toString(16).toUpperCase().padStart(2, '0');
}

const PUBLIC_KEY_GRID = [
  ["04", "1B", "9C", "5E"],
  ["A1", "B2", "C3", "D4"],
  ["7F", "20", "30", "40"],
  ["99", "88", "77", "66"]
]

const COUNTER_GRID = [
  ["00", "00", "00", "01"],
  ["00", "00", "00", "00"],
  ["A1", "B2", "C3", "D4"],
  ["00", "00", "00", "07"]
]

const USER_PLAINTEXT = [
  ["P", "r", "i", "v"],
  ["a", "c", "y", " "],
  ["i", "s", " ", "a"],
  [" ", "r", "i", "t"]
]

export function EncryptionDemo() {
  const [history, setHistory] = useState<string[][][]>([PUBLIC_KEY_GRID])
  const [stepIndex, setStepIndex] = useState(0)
  const currentGrid = history[stepIndex]

  const calculateNextGrid = useCallback((currentStep: StepType, inputGrid: string[][], seed: number) => {
    const newGrid = inputGrid.map(row => [...row])
    switch (currentStep) {
      case "HANDSHAKE": return PUBLIC_KEY_GRID
      case "COUNTER": return COUNTER_GRID
      case "DERIVE":
        for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) newGrid[r][c] = transformValue(newGrid[r][c], (seed * 31) + 0xAA + (r * c))
        break;
      case "AUTH":
        for (let c = 0; c < 4; c++) newGrid[0][c] = transformValue(newGrid[0][c], 0x5C + c)
        break;
      case "ROUNDS":
        // Round key, ARX, shift rows and column mixing, collapsed into one visible transition
        for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) newGrid[r][c] = transformValue(newGrid[r][c], (seed * 11) + r + c)
        for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) newGrid[r][c] = transformValue(newGrid[r][c], getValue(newGrid[r][c]) + 7 + r)
        for (let r = 1; r < 4; r++) newGrid[r] = [...newGrid[r].slice(r), ...newGrid[r].slice(0, r)]
        for (let c = 0; c < 4; c++) { const nc = (c + 1) % 4; for (let r = 0; r < 4; r++) newGrid[r][c] = transformValue(newGrid[r][c], getValue(newGrid[r][nc])) }
        break;
      case "XOR":
        for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) newGrid[r][c] = transformValue(newGrid[r][c], getValue(USER_PLAINTEXT[r][c]));
        break;
      case "REKEY":
        for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) newGrid[r][c] = transformValue(newGrid[r][c], (seed * 47) + 0x3D + r)
        break;
    }
    return newGrid
  }, [])

  const handleNext = () => {
    if (stepIndex >= STEPS.length - 1) return
    const nextIndex = stepIndex + 1
    if (history.length > nextIndex) { setStepIndex(nextIndex) }
    else {
      const nextGrid = calculateNextGrid(STEPS[nextIndex].type, currentGrid, nextIndex)
      setHistory(prev => [...prev, nextGrid])
      setStepIndex(nextIndex)
    }
  }
  const handlePrev = () => { if (stepIndex > 0) setStepIndex(prev => prev - 1) }
  const handleReset = () => { setStepIndex(0); setHistory([PUBLIC_KEY_GRID]) }

  const currentStepData = STEPS[stepIndex]
  const isSealed = currentStepData.type === "SEAL" || currentStepData.type === "REKEY"
  const isFinal = stepIndex === STEPS.length - 1

  return (
    <section className="py-10 lg:py-24 px-4 bg-card/50 border-y border-border">
      <div className="container mx-auto max-w-6xl">
        {/* Header row: title left, info right */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6 lg:gap-6 lg:mb-12">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-primary mb-3">Security</p>
            <h2 className="font-mono text-3xl md:text-4xl font-bold">What happens when you press Enter</h2>
          </div>
          <div className="flex items-start gap-2 bg-background border border-border rounded-lg p-3 max-w-md">
            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground font-mono">
              <strong className="text-primary">Simplified demo</strong>, 4×4 byte matrix.
              The real cipher uses 64-bit arithmetic over configurable grids.
            </p>
          </div>
        </div>

        {/* Main content: 3-column layout */}
        <div className="grid lg:grid-cols-[280px_1fr_1fr] gap-8 items-start">

          {/* Column 1: Step list / timeline */}
          <div className="hidden lg:flex flex-col gap-1">
            {STEPS.map((step, i) => (
              <button
                key={i}
                onClick={() => {
                  if (i <= stepIndex) setStepIndex(i)
                }}
                className={cn(
                  "text-left px-3 py-2 rounded-md font-mono text-xs transition-colors duration-150",
                  i === stepIndex && "bg-primary/10 text-primary border border-primary/20",
                  i < stepIndex && "text-muted-foreground hover:text-foreground cursor-pointer",
                  i > stepIndex && "text-muted-foreground/30 cursor-default",
                )}
                disabled={i > stepIndex}
              >
                <span className="inline-block w-5 text-right mr-2 opacity-50">{i}</span>
                {step.label}
              </button>
            ))}
          </div>

          {/* Column 2: Grid visualization */}
          <div className="bg-background rounded-lg border border-border p-5">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-border/50">
              <div className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary" />
                {currentStepData.panel}
              </div>
              {isSealed ? (
                <div className="flex items-center gap-1 text-xs font-mono text-foreground font-bold">
                  <ShieldCheck className="w-4 h-4" /> SECURE
                </div>
              ) : (
                <div className="text-[10px] font-mono text-muted-foreground tracking-widest">PROCESSING</div>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {currentGrid.map((row, rIndex) =>
                row.map((cell, cIndex) => {
                  const isModified = currentStepData.isModified(rIndex, cIndex) && stepIndex > 0
                  return (
                    <div
                      key={`${rIndex}-${cIndex}`}
                      className={cn(
                        "aspect-square flex items-center justify-center rounded border font-mono text-lg transition-all duration-200",
                        "bg-card border-border/50 text-muted-foreground",
                        isModified && !isSealed && "border-primary/50 text-primary bg-primary/5",
                        isSealed && "border-foreground/40 text-foreground bg-foreground/[0.06] font-bold",
                        stepIndex === 0 && "text-foreground font-medium"
                      )}
                    >
                      {cell}
                    </div>
                  )
                })
              )}
            </div>

            {/* Progress bar */}
            <div className="mt-5 pt-3 border-t border-border/50">
              <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-200" style={{ width: `${(stepIndex / (STEPS.length - 1)) * 100}%` }} />
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-mono text-[10px] text-muted-foreground/50">STEP {stepIndex}</span>
                <span className="font-mono text-[10px] text-muted-foreground/50">{STEPS.length - 1}</span>
              </div>
            </div>
          </div>

          {/* Column 3: Step details + controls */}
          <div className="flex flex-col justify-between min-h-0 lg:min-h-[380px]">
            <div className="space-y-4 order-last lg:order-first">
              <div className="flex items-center gap-3">
                <span className={cn(
                  "flex h-7 px-2.5 items-center justify-center rounded text-xs font-mono font-bold border",
                  isSealed ? "bg-foreground/10 text-foreground border-foreground/25" : "bg-primary/10 text-primary border-primary/20"
                )}>
                  {stepIndex === 0 ? "START" : isFinal ? "DONE" : `${stepIndex}/${STEPS.length - 1}`}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold font-mono text-foreground leading-tight">
                {currentStepData.label}
              </h3>

              <p className="text-muted-foreground leading-relaxed border-l-2 border-primary/20 pl-5 py-1">
                {currentStepData.description}
              </p>

              {currentStepData.type === "XOR" && (
                <div className="p-3 bg-background rounded border border-border text-sm font-mono text-muted-foreground flex items-center gap-2">
                  <ArrowDownUp className="w-4 h-4 text-primary shrink-0" />
                  Keystream ⊕ &quot;Privacy is a right&quot;
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex gap-3 mb-8 lg:mb-0 lg:mt-8 order-first lg:order-last">
              <button
                onClick={handlePrev}
                disabled={stepIndex === 0}
                className="flex-1 h-11 rounded-lg border border-border bg-background hover:border-primary/40 hover:text-primary disabled:opacity-25 disabled:cursor-not-allowed font-mono text-sm font-bold flex items-center justify-center gap-1.5 transition-colors duration-200"
              >
                <ChevronLeft className="w-4 h-4" /> PREV
              </button>
              {isFinal ? (
                <button onClick={handleReset} className="flex-[2] h-11 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-sm font-bold flex items-center justify-center gap-1.5 transition-colors duration-200">
                  <RotateCcw className="w-4 h-4" /> RESTART
                </button>
              ) : (
                <button onClick={handleNext} className="flex-[2] h-11 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-sm font-bold flex items-center justify-center gap-1.5 transition-colors duration-200">
                  NEXT <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
