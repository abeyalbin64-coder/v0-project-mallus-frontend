export type Experiment = {
  id: string
  title: string
  organism: string
  mission: string
  date?: string
  summary?: string
}

export type ExperimentDetails = Experiment & {
  description?: string
  aiSummary?: string
}
