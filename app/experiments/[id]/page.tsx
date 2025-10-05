"use client"

import useSWR from "swr"
import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { fetcher } from "@/lib/fetcher"
import type { ExperimentDetails } from "@/lib/types"

export default function ExperimentDetailsPage() {
  const params = useParams<{ id: string }>()
  const id = params.id
  const { data, error, isLoading } = useSWR<ExperimentDetails>(id ? `/api/details/${id}` : null, fetcher)

  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-3xl px-4 py-8">
        {isLoading ? (
          <div className="rounded-md border border-border/60 p-6 text-muted-foreground">Loading details…</div>
        ) : error ? (
          <div className="rounded-md border border-border/60 p-6 text-destructive">Failed to load details.</div>
        ) : data ? (
          <article className="space-y-4">
            <header className="space-y-1">
              <h1 className="text-3xl font-semibold">{data.title}</h1>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">{data.organism}</span> • {data.mission} •{" "}
                {data.date ?? "—"}
              </p>
            </header>
            <section className="rounded-lg border border-border/60 p-5">
              <h2 className="mb-2 text-lg font-medium">Summary</h2>
              <p className="text-pretty text-muted-foreground">{data.summary ?? "No summary available."}</p>
            </section>
            {data.aiSummary && (
              <section className="rounded-lg border border-border/60 p-5">
                <h2 className="mb-2 text-lg font-medium">AI Summary</h2>
                <p className="text-pretty text-muted-foreground">{data.aiSummary}</p>
              </section>
            )}
          </article>
        ) : null}
      </section>
      <Footer />
    </main>
  )
}
