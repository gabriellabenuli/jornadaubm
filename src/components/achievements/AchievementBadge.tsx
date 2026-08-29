import { Lock } from 'lucide-react'
import type { Achievement } from '../../data/types'

export function AchievementBadge({ achievement }: { achievement: Achievement }) {
  return (
    <div
      className={`flex flex-col items-center gap-2 rounded-xl2 bg-white p-6 text-center shadow-soft ${
        achievement.unlocked ? '' : 'opacity-40 grayscale'
      }`}
    >
      <span className="text-4xl">{achievement.icon}</span>
      <span className="font-semibold">{achievement.title}</span>
      <span className="text-sm text-ink-soft">{achievement.description}</span>
      {!achievement.unlocked && <Lock size={14} className="mt-1 text-ink-soft" />}
    </div>
  )
}
