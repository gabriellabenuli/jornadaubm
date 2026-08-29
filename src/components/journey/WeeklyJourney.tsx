import type { JourneyWeek } from '../../data/types'
import { JourneyDay } from './JourneyDay'

export function WeeklyJourney({ week }: { week: JourneyWeek }) {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-extrabold">{week.title}</h2>
        <p className="text-sm text-ink-soft">{week.subtitle}</p>
      </div>
      <div className="flex flex-wrap gap-4">
        {week.days.map((day) => (
          <JourneyDay key={day.date} day={day} />
        ))}
      </div>
    </section>
  )
}
