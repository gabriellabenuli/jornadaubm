import { CalendarCheck, Clock, ListChecks, Target } from 'lucide-react'
import type { PerformanceOverview } from '../../data/types'
import { StatCard } from '../shared/StatCard'

export function ProgressCard({ overview, size = 'md' }: { overview: PerformanceOverview; size?: 'md' | 'sm' }) {
  const hours = Math.floor(overview.hoursStudied)
  const minutes = Math.round((overview.hoursStudied % 1) * 60)

  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard
        value={String(overview.daysStudied)}
        label="dias estudados"
        tone="math"
        icon={<CalendarCheck size={size === 'sm' ? 15 : 18} />}
        size={size}
      />
      <StatCard
        value={`${hours}h${String(minutes).padStart(2, '0')}`}
        label="de estudo"
        tone="essay"
        icon={<Clock size={size === 'sm' ? 15 : 18} />}
        size={size}
      />
      <StatCard
        value={String(overview.questionsAnswered)}
        label="questões"
        tone="port"
        icon={<ListChecks size={size === 'sm' ? 15 : 18} />}
        size={size}
      />
      <StatCard
        value={`${overview.accuracyRate}%`}
        label="de acertos"
        tone="review"
        icon={<Target size={size === 'sm' ? 15 : 18} />}
        size={size}
      />
    </div>
  )
}
