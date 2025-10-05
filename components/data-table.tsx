"use client"

import Link from "next/link"

export interface ExperimentRow {
  id: string
  title: string
  organism: string
  mission: string
}

export function DataTable({ rows }: { rows: ExperimentRow[] }) {
  return (
    <div className="overflow-x-auto rounded-md border border-border/60">
      <table className="min-w-full text-sm">
        <thead className="bg-secondary text-secondary-foreground">
          <tr>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Organism</th>
            <th className="px-4 py-2 text-left">Mission</th>
            <th className="px-4 py-2 text-left">Details</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-border/60">
              <td className="px-4 py-2">{r.title}</td>
              <td className="px-4 py-2 text-muted-foreground">{r.organism}</td>
              <td className="px-4 py-2 text-muted-foreground">{r.mission}</td>
              <td className="px-4 py-2">
                <Link
                  className="text-chart-2 underline underline-offset-4 hover:opacity-90"
                  href={`/experiments/${r.id}`}
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td className="px-4 py-6 text-muted-foreground" colSpan={4}>
                No experiments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
