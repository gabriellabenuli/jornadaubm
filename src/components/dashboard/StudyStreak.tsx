import type { StreakState } from '../../data/types'

const WEEKDAY_LETTERS = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D']

export function StudyStreak({ streak }: { streak: StreakState }) {
  const message =
    streak.currentDays < streak.bestDays
      ? 'Mais um dia e você bate seu recorde.'
      : 'Novo recorde! Continue assim.'

  return (
    <div className="flex flex-col gap-3 rounded-xl2 bg-white p-5 shadow-soft">
      <span className="font-semibold">🔥 {streak.currentDays} dias seguidos</span>

      <div className="flex justify-between">
        {streak.last7Days.map((day, index) => (
          <div key={index} className="flex flex-col items-center gap-1 text-xs text-ink-soft">
            <span>{WEEKDAY_LETTERS[index]}</span>
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                day === 'done' ? 'bg-review text-review-ink' : 'bg-ink/5 text-ink-soft'
              }`}
            >
              {day === 'done' ? '✓' : '○'}
            </span>
          </div>
        ))}
      </div>

      <p className="text-sm text-ink-soft">{message}</p>
    </div>
  )
}
