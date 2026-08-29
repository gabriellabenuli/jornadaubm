import type { ReactNode } from 'react'

export type Tone = 'math' | 'port' | 'essay' | 'review' | 'sim' | 'neutral'

const toneClasses: Record<Tone, string> = {
  math: 'bg-math text-math-ink',
  port: 'bg-port text-port-ink',
  essay: 'bg-essay text-essay-ink',
  review: 'bg-review text-review-ink',
  sim: 'bg-sim text-sim-ink',
  neutral: 'bg-ink/5 text-ink-soft',
}

export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: Tone }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${toneClasses[tone]}`}>
      {children}
    </span>
  )
}
