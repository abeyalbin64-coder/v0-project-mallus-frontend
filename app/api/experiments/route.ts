import { NextResponse } from "next/server"
import type { Experiment } from "@/lib/types"

// Example static data (replace with backend fetch to NASA GeneLab/OSDR)
const SAMPLE: Experiment[] = [
  {
    id: "GL-001",
    title: "Microgravity effects on Mus musculus",
    organism: "Mus musculus",
    mission: "ISS",
    date: "2022-04-11",
    summary: "Study on bone density in microgravity.",
  },
  {
    id: "GL-002",
    title: "Arabidopsis thaliana gene expression in space",
    organism: "Arabidopsis thaliana",
    mission: "Space Shuttle",
    date: "2011-03-02",
    summary: "Gene expression changes in plants.",
  },
  {
    id: "GL-003",
    title: "Drosophila melanogaster circadian rhythms",
    organism: "Drosophila melanogaster",
    mission: "ISS",
    date: "2021-10-19",
    summary: "Circadian changes under spaceflight.",
  },
  {
    id: "GL-004",
    title: "Human cell culture radiation response",
    organism: "Homo sapiens (cells)",
    mission: "Lunar Gateway",
    date: "2025-01-10",
    summary: "Radiation-induced pathways in human cells.",
  },
  {
    id: "GL-005",
    title: "Zebrafish development in microgravity",
    organism: "Danio rerio",
    mission: "ISS",
    date: "2020-06-05",
    summary: "Developmental changes in microgravity.",
  },
]

export async function GET(request: Request) {
  const backendBase = process.env.BACKEND_BASE_URL

  if (backendBase) {
    try {
      const { searchParams } = new URL(request.url)

      // If any filters are present, prefer backend search; else list experiments
      const hasFilters = !!searchParams.get("q") || !!searchParams.get("organism") || !!searchParams.get("mission")

      let targetUrl: URL
      if (hasFilters) {
        const parts: string[] = []
        if (searchParams.get("q")) parts.push(String(searchParams.get("q")))
        if (searchParams.get("organism")) parts.push(`organism:${searchParams.get("organism")}`)
        if (searchParams.get("mission")) parts.push(`mission:${searchParams.get("mission")}`)
        targetUrl = new URL("/api/search", backendBase)
        targetUrl.searchParams.set("query", parts.join(" ").trim())
      } else {
        targetUrl = new URL("/api/experiments", backendBase)
      }

      const resp = await fetch(targetUrl.toString(), {
        headers: { accept: "application/json" },
        // Keep it simple; GETs shouldn't require credentials for public backend
      })

      if (!resp.ok) {
        return NextResponse.json({ error: "Upstream error", statusText: resp.statusText }, { status: 502 })
      }

      const json = await resp.json()
      // Normalize to { items: Experiment[] }
      const items = Array.isArray(json) ? json : (json.items ?? json.results ?? [])
      return NextResponse.json({ items })
    } catch (err) {
      return NextResponse.json({ error: "Failed to reach backend", message: (err as Error).message }, { status: 502 })
    }
  }

  // Fallback to local sample and in-route filtering when no backend configured
  const { searchParams } = new URL(request.url)
  const q = (searchParams.get("q") || "").toLowerCase()
  const organism = (searchParams.get("organism") || "").toLowerCase()
  const mission = (searchParams.get("mission") || "").toLowerCase()

  const filtered = SAMPLE.filter((e) => {
    const matchesQ =
      !q || e.title.toLowerCase().includes(q) || e.summary?.toLowerCase().includes(q) || e.id.toLowerCase().includes(q)
    const matchesOrg = !organism || e.organism.toLowerCase().includes(organism)
    const matchesMission = !mission || e.mission.toLowerCase().includes(mission)
    return matchesQ && matchesOrg && matchesMission
  })

  return NextResponse.json({ items: filtered })
}
