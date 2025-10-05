import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Project Mallus. Built for NASA Space Apps Challenge 2025.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link
              href="https://www.nasa.gov/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground underline-offset-4 hover:underline"
            >
              NASA
            </Link>
            <Link
              href="https://www.spaceappschallenge.org/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground underline-offset-4 hover:underline"
            >
              Space Apps
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
