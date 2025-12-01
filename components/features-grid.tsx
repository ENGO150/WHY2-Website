"use client"

import { Cpu, Grid3X3, Cog, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Cpu,
    title: "ARX Architecture",
    description:
      "Uses nonlinear Addition, Rotation, and XOR transformations instead of traditional S-boxes for cryptographic diffusion.",
  },
  {
    icon: Grid3X3,
    title: "Grid-Based",
    description:
      "Unique input and key data formatting into grids with customizable dimensions for flexible encryption schemes.",
  },
  {
    icon: Cog,
    title: "Rust Native",
    description: "Built for speed and safety, fully written in Rust with zero unsafe code and maximum performance.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Zero telemetry, no metadata leakage, designed for self-hosting and complete data sovereignty.",
  },
]

export function FeaturesGrid() {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-mono text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">&lt;</span>
            Key Features
            <span className="text-primary">/&gt;</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Built from the ground up with security and performance in mind
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="group relative bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-500 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <CardHeader className="relative">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-shadow duration-500">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-mono text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="relative">
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-l from-primary/50 to-transparent transform rotate-45 translate-x-8 -translate-y-4" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
