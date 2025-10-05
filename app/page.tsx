import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-border/60 p-6">
            <h3 className="text-lg font-medium">Open Science</h3>
            <p className="mt-1 text-muted-foreground">
              Built to accelerate discovery using open datasets from NASA GeneLab and OSDR.
            </p>
          </div>
          <div className="rounded-lg border border-border/60 p-6">
            <h3 className="text-lg font-medium">Visual Analytics</h3>
            <p className="mt-1 text-muted-foreground">
              Quickly understand cross-organism and cross-mission trends with charts.
            </p>
          </div>
          <div className="rounded-lg border border-border/60 p-6">
            <h3 className="text-lg font-medium">AI Summaries</h3>
            <p className="mt-1 text-muted-foreground">Optional generated summaries to make findings more accessible.</p>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center">
          <Link href="/explore">
            <Button className="bg-chart-2 text-background hover:bg-chart-2/90">Explore Data</Button>
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  )
}
