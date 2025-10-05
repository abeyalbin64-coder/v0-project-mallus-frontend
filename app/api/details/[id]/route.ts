import { NextResponse } from "next/server"
import type { ExperimentDetails } from "@/lib/types"

// Mirror SAMPLE ids in experiments route
const DETAILS: Record<string, ExperimentDetails> = {
  "GL-001": {
    id: "GL-001",
    title: "Microgravity effects on Mus musculus",
    organism: "Mus musculus",
    mission: "ISS",
    date: "2022-04-11",
    summary: "Study on bone density in microgravity.",
    description:
      "This experiment examined changes in bone density and muscular atrophy in mice aboard the International Space Station, analyzing gene expression changes in pathways related to osteogenesis.",
    aiSummary:
      "Mice aboard the ISS exhibited measurable bone density changes linked to microgravity. Gene expression suggested downregulation of osteogenesis pathways—implying potential targets for countermeasures.",
  },
  "GL-002": {
    id: "GL-002",
    title: "Arabidopsis thaliana gene expression in space",
    organism: "Arabidopsis thaliana",
    mission: "Space Shuttle",
    date: "2011-03-02",
    summary: "Gene expression changes in plants.",
    description:
      "Arabidopsis samples experienced altered expression in stress response and gravitropism-related genes under spaceflight conditions.",
  },
  "GL-003": {
    id: "GL-003",
    title: "Drosophila melanogaster circadian rhythms",
    organism: "Drosophila melanogaster",
    mission: "ISS",
    date: "2021-10-19",
    summary: "Circadian changes under spaceflight.",
    description: "Investigated circadian rhythm alterations and neural signaling under microgravity conditions.",
  },
  "GL-004": {
    id: "GL-004",
    title: "Human cell culture radiation response",
    organism: "Homo sapiens (cells)",
    mission: "Lunar Gateway",
    date: "2025-01-10",
    summary: "Radiation-induced pathways in human cells.",
    description:
      "Analyzed DNA damage response and repair mechanisms in human cell cultures exposed to simulated deep space radiation.",
  },
  "GL-005": {
    id: "GL-005",
    title: "Zebrafish development in microgravity",
    organism: "Danio rerio",
    mission: "ISS",
    date: "2020-06-05",
    summary: "Developmental changes in microgravity.",
    description:
      "Focused on developmental gene networks and morphological changes in zebrafish embryos under microgravity.",
  },
}

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const backendBase = process.env.BACKEND_BASE_URL
  const id = params.id

  if (backendBase) {
    try {
      const detailUrl = new URL(`/api/experiments/${encodeURIComponent(id)}`, backendBase).toString()
      const summaryUrl = new URL(`/api/summary/${encodeURIComponent(id)}`, backendBase).toString()

      const [detailRes, summaryRes] = await Promise.allSettled([
        fetch(detailUrl, { headers: { accept: "application/json" } }),
        fetch(summaryUrl, { headers: { accept: "application/json" } }),
      ])

      if (detailRes.status === "fulfilled" && detailRes.value.ok) {
        const detailJson = await detailRes.value.json()
        let aiSummary: string | undefined

        if (summaryRes.status === "fulfilled" && summaryRes.value.ok) {
          try {
            const s = await summaryRes.value.json()
            aiSummary = s?.summary || s?.aiSummary
          } catch {
            // ignore parse errors on optional summary
          }
        } else if (detailJson?.aiSummary) {
          aiSummary = detailJson.aiSummary
        }

        const merged = aiSummary ? { ...detailJson, aiSummary } : detailJson
        return NextResponse.json(merged)
      }

      return NextResponse.json({ error: "Not found" }, { status: 404 })
    } catch (err) {
      return NextResponse.json({ error: "Failed to reach backend", message: (err as Error).message }, { status: 502 })
    }
  }

  // Fallback to local details when no backend configured
  const detail = DETAILS[id]
  if (!detail) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  return NextResponse.json(detail)
}
