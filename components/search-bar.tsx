"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export type SearchState = {
  q: string
  organism: string
  mission: string
}

export function SearchBar({
  initial,
  onChange,
}: {
  initial?: Partial<SearchState>
  onChange: (s: SearchState) => void
}) {
  const [state, setState] = useState<SearchState>({
    q: initial?.q ?? "",
    organism: initial?.organism ?? "",
    mission: initial?.mission ?? "",
  })

  function update<K extends keyof SearchState>(key: K, value: SearchState[K]) {
    const next = { ...state, [key]: value }
    setState(next)
    onChange(next)
  }

  return (
    <div className="grid gap-3 md:grid-cols-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={state.q}
          onChange={(e) => update("q", e.target.value)}
          placeholder="Search by keyword..."
          className="pl-8"
          aria-label="Search by keyword"
        />
      </div>
      <Input
        value={state.organism}
        onChange={(e) => update("organism", e.target.value)}
        placeholder="Organism (e.g., Mus musculus)"
        aria-label="Filter by organism"
      />
      <div className="flex items-center gap-2">
        <Input
          value={state.mission}
          onChange={(e) => update("mission", e.target.value)}
          placeholder="Mission (e.g., ISS)"
          aria-label="Filter by mission"
        />
        <Button variant="outline" onClick={() => onChange(state)}>
          Apply
        </Button>
      </div>
    </div>
  )
}
