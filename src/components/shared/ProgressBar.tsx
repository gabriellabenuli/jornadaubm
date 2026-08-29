import type { Tone } from './Badge'

const fillClasses: Record<Tone, string> = {
  math: 'bg-math-dark',
  port: 'bg-port-dark',
  essay: 'bg-essay-dark',
  review: 'bg-review-dark',
  sim: 'bg-sim-dark',
  neutral: 'bg-ink',
}

export function ProgressBar({
  percent,
  tone = 'neutral',
  height = 'md',
}: {
  percent: number
  tone?: Tone
  height?: 'sm' | 'md'
}) {
  const clamped = Math.max(0, Math.min(100, percent))
  return (
    <div className={`w-full overflow-hidden rounded-full bg-ink/5 ${height === 'sm' ? 'h-1.5' : 'h-2.5'}`}>
      <div
        className={`h-full rounded-full transition-all duration-500 ${fillClasses[tone]}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}
