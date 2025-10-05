"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Rocket, Database, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const linkClasses = (href: string) =>
    cn(
      "px-3 py-2 rounded-md text-sm font-medium transition-colors",
      pathname === href
        ? "bg-secondary text-secondary-foreground"
        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
    )

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-chart-2" aria-hidden="true" />
            <span className="font-semibold">Mallus in Orbit</span>
          </Link>
          <nav className="flex items-center gap-1">
            <Link className={linkClasses("/")} href="/">
              Home
            </Link>
            <Link className={linkClasses("/explore")} href="/explore">
              <span className="inline-flex items-center gap-1">
                <Database className="h-4 w-4" aria-hidden="true" /> Explore
              </span>
            </Link>
            <Link className={linkClasses("/about")} href="/about">
              <span className="inline-flex items-center gap-1">
                <Info className="h-4 w-4" aria-hidden="true" /> About
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
