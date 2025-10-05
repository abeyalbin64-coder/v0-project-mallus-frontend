"use client"

import useSWR from "swr"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SearchBar, type SearchState } from "@/components/search-bar"
import { DataTable } from "@/components/data-table"
import { ExperimentsPerOrganism } from "@/components/charts/experiments-per-organism"
import { ExperimentsPerMission } from "@/components/charts/experiments-per-mission"
import { fetcher } from "@/lib/fetcher"
import type { Experiment } from "@/lib/types"

export default function ExplorePage() {
  const { data, error, isLoading, mutate } = useSWR<{ items: Experiment[] }>("/api/experiments", fetcher)

  function handleSearch(s: SearchState) {
    const params = new URLSearchParams()
    if (s.q) params.set("q", s.q)
    if (s.organism) params.set("organism", s.organism)
    if (s.mission) params.set("mission", s.mission)
    const key = params.toString() ? `/api/experiments?${params.toString()}` : "/api/experiments"
    mutate(fetcher(key), { revalidate: false })
  }

  const rows =
    data?.items?.map((d) => ({
      id: d.id,
      title: d.title,
      organism: d.organism,
      mission: d.mission,
    })) ?? []

  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-semibold">Data Explorer</h1>
        <p className="mt-1 text-muted-foreground">
          Search experiments by organism, mission, or keyword. Data shown is sample until your backend is connected.
        </p>

        <div className="mt-6">
          <SearchBar onChange={handleSearch} />
        </div>

        <div className="mt-6">
          {isLoading ? (
            <div className="rounded-md border border-border/60 p-6 text-muted-foreground">Loading experiments…</div>
          ) : error ? (
            <div className="rounded-md border border-border/60 p-6 text-destructive">Failed to load experiments.</div>
          ) : (
            <DataTable rows={rows} />
          )}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <ExperimentsPerOrganism data={data?.items ?? []} />
          <ExperimentsPerMission data={data?.items ?? []} />
        </div>
      </section>
      <Footer />
    </main>
  )
}
