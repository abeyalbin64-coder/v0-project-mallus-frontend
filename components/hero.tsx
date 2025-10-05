"use client"

import { Rocket, Telescope } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Starfield } from "./starfield"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Starfield />
      <div className="relative mx-auto max-w-6xl px-4 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <Telescope className="h-3.5 w-3.5 text-chart-2" aria-hidden="true" />
            NASA Space Apps 2025
          </div>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Project Mallus in Orbit
          </h1>
          <p className="mt-3 text-pretty text-muted-foreground sm:text-lg">
            A Space Biology Knowledge Engine exploring NASA GeneLab and OSDR datasets. Search, visualize, and summarize
            experiments across organisms and missions.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link href="/explore">
              <Button className="bg-chart-2 text-background hover:bg-chart-2/90">
                <span className="inline-flex items-center gap-2">
                  <Rocket className="h-4 w-4" aria-hidden="true" />
                  Explore Data
                </span>
              </Button>
            </Link>
            <Link
              href="/about"
              className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
