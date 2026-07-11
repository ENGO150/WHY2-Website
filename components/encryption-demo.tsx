"use client"

import { useState, useCallback } from "react"
import { RotateCcw, ChevronRight, ChevronLeft, Cpu, ShieldCheck, Info, ArrowDownUp } from "lucide-react"
import { cn } from "@/lib/utils"

type StepType = "IDLE" | "INIT" | "WHITENING" | "ROUND_KEY" | "SUBCELL" | "SHIFT_ROWS" | "MIX_COLUMNS" | "KEYSTREAM_READY" | "FINAL_XOR"

interface EncryptionStep {
  type: StepType
  label: string
  description: string
  isModified: (r: number, c: number) => boolean
}

const STEPS: EncryptionStep[] = [
  { type: "INIT", label: "INITIALIZATION", description: "Loading the unique Block Counter (Nonce). Each block gets a unique counter value.", isModified: () => false },
  { type: "WHITENING", label: "INITIAL WHITENING", description: "XOR (State ^ RoundKey[0]). The state is whitened before entering the main loop.", isModified: () => true },
  { type: "ROUND_KEY", label: "ROUND KEY ADDITION", description: "XOR (State ^ RoundKey[r]). Injecting fresh key material at the start of the round.", isModified: () => true },
  { type: "SUBCELL", label: "SUBCELL (ARX)", description: "Nonlinear Layer. 4 rounds of Add-Rotate-XOR per cell using Golden Ratio constants to destroy linearity.", isModified: () => true },
  { type: "SHIFT_ROWS", label: "SHIFT ROWS", description: "Permutation. Rows are rotated left by variable offsets derived from the Round Key (key-dependent).", isModified: () => true },
  { type: "MIX_COLUMNS", label: "MIX COLUMNS", description: "MDS Diffusion. Columns are multiplied by a strictly invertible Cauchy matrix, guaranteeing an optimal branch number and perfect avalanche characteristics.", isModified: () => true },
  { type: "KEYSTREAM_READY", label: "KEYSTREAM GENERATED", description: "The 16 rounds are complete. This pseudorandom block is the 'Keystream'.", isModified: () => false },
  { type: "FINAL_XOR", label: "XOR WITH PLAINTEXT", description: "The Keystream is XORed with your data (DEADBEEF...) to produce the final Ciphertext (CTR Mode).", isModified: () => true }
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

const COUNTER_GRID = [
  ["00", "00", "00", "01"],
  ["A1", "B2", "C3", "D4"],
  ["10", "20", "30", "40"],
  ["99", "88", "77", "66"]
]

const USER_PLAINTEXT = [
  ["D", "E", "A", "D"],
  ["B", "E", "E", "F"],
  ["C", "A", "F", "E"],
  ["B", "A", "B", "E"]
]

export function EncryptionDemo() {
  const [history, setHistory] = useState<string[][][]>([COUNTER_GRID])
  const [stepIndex, setStepIndex] = useState(0)
  const currentGrid = history[stepIndex]

  const calculateNextGrid = useCallback((currentStep: StepType, inputGrid: string[][], seed: number) => {
    const newGrid = inputGrid.map(row => [...row])
    switch (currentStep) {
      case "INIT": return COUNTER_GRID
      case "WHITENING":
        for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) newGrid[r][c] = transformValue(newGrid[r][c], (seed * 5) + 0xAA)
        break;
      case "ROUND_KEY":
        for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) newGrid[r][c] = transformValue(newGrid[r][c], (seed * 11) + r + c)
        break;
      case "SUBCELL":
        for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) newGrid[r][c] = transformValue(newGrid[r][c], getValue(newGrid[r][c]) + 7 + r)
        break
      case "SHIFT_ROWS":
        newGrid[0] = [...inputGrid[0]]
        newGrid[1] = [...inputGrid[1].slice(1), ...inputGrid[1].slice(0, 1)]
        newGrid[2] = [...inputGrid[2].slice(2), ...inputGrid[2].slice(0, 2)]
        newGrid[3] = [...inputGrid[3].slice(3), ...inputGrid[3].slice(0, 3)]
        break
      case "MIX_COLUMNS":
        for (let c = 0; c < 4; c++) { const nc = (c + 1) % 4; for (let r = 0; r < 4; r++) newGrid[r][c] = transformValue(newGrid[r][c], getValue(inputGrid[r][nc])) }
        break
      case "FINAL_XOR":
        for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) newGrid[r][c] = transformValue(newGrid[r][c], getValue(USER_PLAINTEXT[r][c]));
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
  const handleReset = () => { setStepIndex(0); setHistory([COUNTER_GRID]) }

  const currentStepData = STEPS[stepIndex]
  const isFinal = stepIndex === STEPS.length - 1

  return (
    <section className="py-10 lg:py-24 px-4 bg-card/50 border-y border-border">
      <div className="container mx-auto max-w-6xl">
        {/* Header row — title left, info right */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6 lg:gap-6 lg:mb-12">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-primary mb-3">Pipeline</p>
            <h2 className="font-mono text-3xl md:text-4xl font-bold">Inside the REX Core</h2>
          </div>
          <div className="flex items-start gap-2 bg-background border border-border rounded-lg p-3 max-w-md">
            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground font-mono">
              <strong className="text-primary">Simplified demo</strong> — 4×4 byte matrix.
              Actual REX uses 64-bit arithmetic, 8×8 state, 16 rounds.
            </p>
          </div>
        </div>

        {/* Main content — 3-column layout */}
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
                {isFinal ? "CIPHERTEXT_OUT" : stepIndex === 0 ? "COUNTER_BLOCK_IN" : "KEYSTREAM_STATE"}
              </div>
              {isFinal ? (
                <div className="flex items-center gap-1 text-xs font-mono text-green-500 font-bold">
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
                        isModified && !isFinal && "border-primary/50 text-primary bg-primary/5",
                        isFinal && "border-green-500/30 text-green-500 bg-green-500/5 font-bold",
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
                  isFinal ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-primary/10 text-primary border-primary/20"
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

              {currentStepData.type === "FINAL_XOR" && (
                <div className="p-3 bg-background rounded border border-border text-sm font-mono text-muted-foreground flex items-center gap-2">
                  <ArrowDownUp className="w-4 h-4 text-primary shrink-0" />
                  Keystream ⊕ &quot;DEADBEEF CAFEBABE&quot;
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
