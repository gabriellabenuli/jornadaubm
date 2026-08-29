import type { JourneyDayData } from '../../data/types'
import { Badge } from '../shared/Badge'

const SUBJECT_TONE: Record<string, 'math' | 'port' | 'essay'> = {
  matematica: 'math',
  portugues: 'port',
  redacao: 'essay',
}

const STATUS_CLASS: Record<JourneyDayData['status'], string> = {
  done: 'border-essay-dark/40 bg-essay/15',
  today: 'border-ink bg-white ring-2 ring-ink',
  next: 'border-ink/10 bg-white',
  future: 'border-ink/5 bg-white opacity-60',
}

export function JourneyDay({ day }: { day: JourneyDayData }) {
  return (
    <div className={`flex min-w-[180px] flex-1 flex-col gap-3 rounded-xl2 border p-4 ${STATUS_CLASS[day.status]}`}>
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-bold uppercase text-ink-soft">{day.weekday}</span>
        <span className="text-xs text-ink-soft">{day.date}</span>
      </div>

      <div className="flex flex-col gap-2">
        {day.activities.map((activity, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            {activity.done && <span className="text-essay-ink">✓</span>}
            <Badge tone={SUBJECT_TONE[activity.subject]}>{activity.label}</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}
