"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type Row = { mission: string; count: number }

export function ExperimentsPerMission({ data }: { data: { mission: string }[] }) {
  const grouped = data.reduce<Record<string, number>>((acc, d) => {
    acc[d.mission] = (acc[d.mission] || 0) + 1
    return acc
  }, {})
  const rows: Row[] = Object.entries(grouped).map(([mission, count]) => ({ mission, count }))

  return (
    <div className="h-64 w-full rounded-md border border-border/60 p-3">
      <h3 className="mb-2 text-sm font-medium text-muted-foreground">Experiments per Mission</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows}>
          <CartesianGrid stroke="hsl(var(--color-border))" vertical={false} />
          <XAxis dataKey="mission" tick={{ fill: "hsl(var(--color-muted-foreground))" }} />
          <YAxis tick={{ fill: "hsl(var(--color-muted-foreground))" }} />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--color-popover))",
              color: "hsl(var(--color-popover-foreground))",
              border: "1px solid hsl(var(--color-border))",
              borderRadius: "8px",
            }}
          />
          <Bar dataKey="count" fill="hsl(var(--color-chart-5))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
