import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-semibold">About Project Mallus</h1>
        <p className="mt-3 text-pretty text-muted-foreground">
          Project Mallus in Orbit is a Space Biology Knowledge Engine built for the NASA Space Apps Challenge 2025. Our
          goal is to make open datasets from NASA GeneLab and OSDR accessible and insightful through search,
          visualization, and optional AI summaries.
        </p>
        <div className="mt-8 space-y-4">
          <div className="rounded-lg border border-border/60 p-5">
            <h2 className="text-lg font-medium">Team</h2>
            <p className="mt-2 text-muted-foreground">
              We are Project Mallus—builders passionate about open science and space biology.
            </p>
          </div>
          <div className="rounded-lg border border-border/60 p-5">
            <h2 className="text-lg font-medium">Open Science Goals</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
              <li>Enable discoverability across organisms and missions.</li>
              <li>Provide accessible summaries for quick understanding.</li>
              <li>Foster transparent, reusable insights and tools.</li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
