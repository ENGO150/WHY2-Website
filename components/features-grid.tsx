"use client"

import { Cpu, Grid3X3, Cog, Shield } from "lucide-react"

const features = [
  {
    icon: Cpu,
    title: "ARX Architecture",
    description: "Uses nonlinear Addition, Rotation, and XOR transformations instead of traditional S-boxes for cryptographic diffusion.",
    span: "md:col-span-2",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Zero telemetry, no metadata leakage, designed for self-hosting and complete data sovereignty.",
    span: "md:col-span-1",
  },
  {
    icon: Cog,
    title: "Rust Native",
    description: "Built for speed and safety, fully written in Rust with zero unsafe code and maximum performance.",
    span: "md:col-span-1",
  },
  {
    icon: Grid3X3,
    title: "Grid-Based",
    description: "Unique input and key data formatting into grids with customizable dimensions for flexible encryption schemes.",
    span: "md:col-span-2",
  },
]

export function FeaturesGrid() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 max-w-lg">
          <p className="font-mono text-xs tracking-widest uppercase text-primary mb-3">Capabilities</p>
          <h2 className="font-mono text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
          <p className="text-muted-foreground">Built from the ground up with security and performance in mind.</p>
        </div>

        {/* Bento grid — 2 wide + 2 narrow alternating */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`group relative bg-card border border-border rounded-lg p-6 hover:border-primary/30 transition-colors duration-200 ${feature.span}`}
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded bg-secondary border border-border flex items-center justify-center mb-5 group-hover:border-primary/30 transition-colors duration-200">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>

              <h3 className="font-mono text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed text-sm">
                {feature.description}
              </p>

              {/* Subtle corner mark */}
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary/10 group-hover:bg-primary/30 transition-colors duration-200" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
