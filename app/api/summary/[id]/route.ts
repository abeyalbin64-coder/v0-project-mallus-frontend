import { NextResponse } from "next/server"

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const backendBase = process.env.BACKEND_BASE_URL
  if (!backendBase) {
    return NextResponse.json({ error: "Summary unavailable" }, { status: 404 })
  }

  try {
    const url = new URL(`/api/summary/${encodeURIComponent(params.id)}`, backendBase).toString()
    const resp = await fetch(url, { headers: { accept: "application/json" } })
    if (!resp.ok) {
      return NextResponse.json({ error: "Upstream error" }, { status: 502 })
    }
    const json = await resp.json()
    // Normalize to { summary: string }
    const summary = json?.summary ?? json?.aiSummary ?? null
    return NextResponse.json({ summary })
  } catch (err) {
    return NextResponse.json({ error: "Failed to reach backend", message: (err as Error).message }, { status: 502 })
  }
}
