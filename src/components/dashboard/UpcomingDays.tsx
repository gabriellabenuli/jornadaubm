import { useNavigate } from 'react-router-dom'
import type { JourneyWeek } from '../../data/types'
import type { StudentId } from '../../store/useAppStore'
import { Badge } from '../shared/Badge'

const SUBJECT_TONE: Record<string, 'math' | 'port' | 'essay'> = {
  matematica: 'math',
  portugues: 'port',
  redacao: 'essay',
}

export function UpcomingDays({ journey, studentId }: { journey: JourneyWeek[]; studentId: StudentId }) {
  const navigate = useNavigate()
  const allDays = journey.flatMap((w) => w.days)
  const todayIndex = allDays.findIndex((d) => d.status === 'today')
  const upcoming = todayIndex === -1 ? [] : allDays.slice(todayIndex + 1, todayIndex + 4)

  if (upcoming.length === 0) return null

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="font-extrabold">Próximos dias</h2>
        <button onClick={() => navigate(`/${studentId}/jornada`)} className="text-sm font-semibold text-ink-soft hover:text-ink">
          ver tudo →
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {upcoming.map((day, i) => (
          <div
            key={day.date}
            onClick={() => navigate(`/${studentId}/jornada`)}
            className="card-interactive flex cursor-pointer flex-col gap-2 rounded-xl2 bg-white p-4 shadow-soft"
          >
            <span className="w-fit rounded-full bg-ink/5 px-2 py-0.5 text-xs font-bold uppercase text-ink-soft">
              Dia {i + 1} · {day.weekday} {day.date}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {day.activities.map((a, j) => (
                <Badge key={j} tone={SUBJECT_TONE[a.subject]}>
                  {a.label}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
