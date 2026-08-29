import { ProgressBar } from '../shared/ProgressBar'

export function QuestionProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-ink-soft">
        Questão {current} de {total}
      </span>
      <ProgressBar percent={(current / total) * 100} />
    </div>
  )
}
