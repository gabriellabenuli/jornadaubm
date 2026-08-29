import type { XPState } from '../../data/types'
import { ProgressBar } from '../shared/ProgressBar'

export function XPBar({ xp }: { xp: XPState }) {
  const percent = Math.max(0, Math.min(100, 100 - (xp.xpForNextLevel / xp.xpSpanForLevel) * 100))
  return (
    <div className="flex w-full flex-col gap-1 sm:w-56">
      <ProgressBar percent={percent} tone="review" height="sm" />
      <span className="text-xs text-ink-soft">{xp.xpForNextLevel} XP para o próximo nível</span>
    </div>
  )
}
