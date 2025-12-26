"use client"

import { useState, useCallback } from "react"
import { RotateCcw, ChevronRight, ChevronLeft, Cpu, ShieldCheck, Info } from "lucide-react"
import { cn } from "@/lib/utils"

type StepType = "IDLE" | "INIT" | "KEY_INJECTION" | "SUBCELL" | "SHIFT_ROWS" | "MIX_COLUMNS" | "MIX_DIAGONALS" | "MIX_MATRIX" | "DONE"

interface EncryptionStep {
  type: StepType
  label: string
  description: string
  isModified: (r: number, c: number) => boolean
}

const STEPS: EncryptionStep[] = [
  {
    type: "INIT",
    label: "INITIALIZATION",
    description: "Input buffer loaded with plaintext: DEADBEEF CAFEBABE",
    isModified: () => false
  },
  {
    type: "KEY_INJECTION",
    label: "KEY INJECTION",
    description: "XOR (Grid ^ RoundKey). The plaintext is whitened with key material.",
    isModified: () => true
  },
  {
    type: "SUBCELL",
    label: "SUBCELL (ARX)",
    description: "Nonlinear Layer. 32 rounds of Add-Rotate-XOR per cell.",
    isModified: () => true
  },
  {
    type: "SHIFT_ROWS",
    label: "SHIFT ROWS",
    description: "Permutation. All rows are rotated left by key-dependent offsets.",
    isModified: () => true
  },
  {
    type: "MIX_COLUMNS",
    label: "MIX COLUMNS",
    description: "Linear Diffusion. Vertical mixing across columns.",
    isModified: () => true
  },
  {
    type: "MIX_DIAGONALS",
    label: "MIX DIAGONALS",
    description: "Diagonal Propagation. Cells XORed with diagonal neighbors (Edges are read-only).",
    isModified: (r, c) => r < 3 && c < 3
  },
  {
    type: "MIX_MATRIX",
    label: "MIX MATRIX",
    description: "Affine Transform. Matrix multiplication with added noise.",
    isModified: () => true
  },
  {
    type: "DONE",
    label: "ROUND COMPLETE",
    description: "Encrypted state ready for the next round.",
    isModified: () => false
  }
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

const INITIAL_GRID = [
  ["D", "E", "A", "D"],
  ["B", "E", "E", "F"],
  ["C", "A", "F", "E"],
  ["B", "A", "B", "E"]
]

export function EncryptionDemo() {
  const [history, setHistory] = useState<string[][][]>([INITIAL_GRID])
  const [stepIndex, setStepIndex] = useState(0)

  const currentGrid = history[stepIndex]

  const calculateNextGrid = useCallback((currentStep: StepType, inputGrid: string[][], seed: number) => {
    const newGrid = inputGrid.map(row => [...row])

    switch (currentStep) {
      case "INIT": return INITIAL_GRID

      case "KEY_INJECTION":
      case "SUBCELL":
      case "MIX_MATRIX":
        for (let r = 0; r < 4; r++) {
          for (let c = 0; c < 4; c++) {
             newGrid[r][c] = transformValue(newGrid[r][c], r + c + seed + 10)
          }
        }
        break

      case "MIX_DIAGONALS":
         for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                newGrid[r][c] = transformValue(newGrid[r][c], 42)
            }
         }
         break;

      case "SHIFT_ROWS":
        newGrid[0] = [...inputGrid[0].slice(1), ...inputGrid[0].slice(0, 1)] // Rot 1
        newGrid[1] = [...inputGrid[1].slice(2), ...inputGrid[1].slice(0, 2)] // Rot 2
        newGrid[2] = [...inputGrid[2].slice(3), ...inputGrid[2].slice(0, 3)] // Rot 3
        newGrid[3] = [...inputGrid[3].slice(1), ...inputGrid[3].slice(0, 1)] // Rot 1
        break

      case "MIX_COLUMNS":
        for (let c = 0; c < 4; c++) {
          for (let r = 0; r < 4; r++) {
             newGrid[r][c] = transformValue(newGrid[r][c], 15)
          }
        }
        break
    }
    return newGrid
  }, [])

  const handleNext = () => {
    if (stepIndex >= STEPS.length - 1) return

    const nextIndex = stepIndex + 1
    const nextStepType = STEPS[nextIndex].type

    if (history.length > nextIndex) {
        setStepIndex(nextIndex)
    } else {
        const nextGrid = calculateNextGrid(nextStepType, currentGrid, nextIndex)
        setHistory(prev => [...prev, nextGrid])
        setStepIndex(nextIndex)
    }
  }

  const handlePrev = () => {
    if (stepIndex > 0) {
        setStepIndex(prev => prev - 1)
    }
  }

  const handleReset = () => {
    setStepIndex(0)
    setHistory([INITIAL_GRID])
  }

  const currentStepData = STEPS[stepIndex]

  return (
    <section className="py-24 px-4 bg-background/50 border-y border-border/50">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="font-mono text-3xl md:text-4xl font-bold mb-4">
            Inside the <span className="text-primary">REX Core</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-6">
            Interactive visualization of the WHY2 encryption pipeline.
          </p>

          {/* DISCLAIMER / NOTE */}
          <div className="inline-flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-lg p-4 text-left max-w-2xl mx-auto">
             <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />

              <p className="text-sm text-muted-foreground font-mono">
                <strong className="text-primary">Educational Visualization:</strong> This simplified demo uses a 4x4 byte matrix.
                The actual REX protocol is far more complex, employing <strong className="text-foreground">64-bit arithmetic, deterministic grid shuffling, secure key scheduling</strong>, and 14 cryptographic rounds.
                The visual effects shown here illustrate the flow of data but do not represent the full mathematical precision of the cipher.
              </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* --- GRID VISUALIZATION --- */}
          <div className="relative group">
            <div className="absolute -inset-4 rounded-3xl bg-primary/5 blur-2xl opacity-50 transition-opacity duration-500" />

            <div className="relative w-full max-w-sm mx-auto bg-card rounded-2xl border border-border shadow-2xl p-6 flex flex-col aspect-square">

              <div className="flex justify-between items-center mb-6 pb-4 border-b border-border/30">
                 <div className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-primary" />
                    <span>MEM_BLOCK_0x8F</span>
                 </div>
                 {stepIndex === STEPS.length - 1 ? (
                    <div className="flex items-center gap-1 text-xs font-mono text-green-500 font-bold">
                        <ShieldCheck className="w-4 h-4" /> SECURE
                    </div>
                 ) : (
                    <div className="text-[10px] font-mono text-muted-foreground tracking-widest">
                        PROCESSING...
                    </div>
                 )}
              </div>

              <div className="grid grid-cols-4 gap-3 flex-1 content-center">
                {currentGrid.map((row, rIndex) => (
                  row.map((cell, cIndex) => {
                    const isModified = currentStepData.isModified(rIndex, cIndex) && stepIndex > 0

                    return (
                      <div
                        key={`${rIndex}-${cIndex}`}
                        className={cn(
                          "aspect-square flex items-center justify-center rounded-lg border font-mono text-xl transition-all duration-300",
                          // Default
                          "bg-background/50 border-border/50 text-muted-foreground",

                          // Modified state
                          isModified && "bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(168,85,247,0.2)] scale-105 z-10",

                          // Final state
                          currentStepData.type === "DONE" && "border-green-500/30 text-green-500 bg-green-500/5",

                          // Input state (Characters)
                          stepIndex === 0 && "text-foreground font-bold"
                        )}
                      >
                         {cell}
                      </div>
                    )
                  })
                ))}
              </div>
            </div>
          </div>

          {/* --- CONTROL PANEL --- */}
          <div className="flex flex-col justify-center space-y-8 min-h-[400px]">

            <div className="space-y-4">
               <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-mono font-bold text-primary border border-primary/20">
                    {stepIndex}
                  </span>
                  <span className="font-mono text-sm text-muted-foreground tracking-wider uppercase">
                    Operation {stepIndex} of {STEPS.length - 1}
                  </span>
               </div>

               <h3 className="text-4xl font-bold font-mono text-foreground">
                 {currentStepData.label}
               </h3>

               <p className="text-xl text-muted-foreground leading-relaxed border-l-2 border-primary/20 pl-6 py-2">
                 {currentStepData.description}
               </p>
            </div>

            <div className="space-y-2 pt-4">
                <div className="flex justify-between px-1">
                    {STEPS.map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "w-2 h-2 rounded-full transition-all duration-300",
                                i <= stepIndex ? "bg-primary scale-110" : "bg-secondary"
                            )}
                        />
                    ))}
                </div>
               <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                  <div
                     className="h-full bg-primary transition-all duration-300 ease-out"
                     style={{ width: `${(stepIndex / (STEPS.length - 1)) * 100}%` }}
                  />
               </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={handlePrev}
                disabled={stepIndex === 0}
                className="flex-1 h-14 rounded-xl border border-border bg-card hover:bg-accent/5 disabled:opacity-50 disabled:cursor-not-allowed font-mono font-bold flex items-center justify-center gap-2 transition-all"
              >
                <ChevronLeft className="w-5 h-5" /> PREV
              </button>

              {stepIndex === STEPS.length - 1 ? (
                <button
                  onClick={handleReset}
                  className="flex-[2] h-14 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
                >
                  <RotateCcw className="w-5 h-5" /> RESTART DEMO
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex-[2] h-14 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
                >
                  NEXT STEP <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
