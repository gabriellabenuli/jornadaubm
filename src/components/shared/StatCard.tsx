import type { ReactNode } from 'react'
import type { Tone } from './Badge'

const BG_CLASS: Record<Tone, string> = {
  math: 'bg-math/45',
  port: 'bg-port/45',
  essay: 'bg-essay/45',
  review: 'bg-review/45',
  sim: 'bg-sim/45',
  neutral: 'bg-white',
}

const ICON_BG_CLASS: Record<Tone, string> = {
  math: 'bg-math-dark text-white',
  port: 'bg-port-dark text-white',
  essay: 'bg-essay-dark text-white',
  review: 'bg-review-dark text-white',
  sim: 'bg-sim-dark text-white',
  neutral: 'bg-ink/10 text-ink',
}

export function StatCard({
  value,
  label,
  icon,
  tone = 'neutral',
  size = 'md',
}: {
  value: string
  label: string
  icon?: ReactNode
  tone?: Tone
  size?: 'md' | 'sm'
}) {
  if (size === 'sm') {
    return (
      <div className={`card-interactive flex items-center gap-3 rounded-xl2 p-3 shadow-soft ${BG_CLASS[tone]}`}>
        {icon && (
          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${ICON_BG_CLASS[tone]}`}>
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <span className="text-lg font-extrabold leading-tight tracking-tight">{value}</span>
          <p className="truncate text-xs text-ink-soft">{label}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`card-interactive flex flex-col gap-3 rounded-xl2 p-5 shadow-soft ${BG_CLASS[tone]}`}>
      {icon && <div className={`flex h-9 w-9 items-center justify-center rounded-full ${ICON_BG_CLASS[tone]}`}>{icon}</div>}
      <div>
        <span className="text-3xl font-extrabold tracking-tight">{value}</span>
        <p className="text-sm text-ink-soft">{label}</p>
      </div>
    </div>
  )
}
