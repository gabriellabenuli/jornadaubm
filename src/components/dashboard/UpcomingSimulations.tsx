import { useNavigate } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'
import type { SimulationSummary } from '../../data/types'
import type { StudentId } from '../../store/useAppStore'

export function UpcomingSimulations({ simulations, studentId }: { simulations: SimulationSummary[]; studentId: StudentId }) {
  const navigate = useNavigate()
  const upcoming = simulations.filter((s) => !s.completed)

  if (upcoming.length === 0) return null

  return (
    <div className="flex flex-col gap-4 rounded-xl2 bg-white p-5 shadow-soft">
      <h2 className="font-extrabold">Simulados</h2>
      <div className="flex flex-col gap-3">
        {upcoming.map((sim) => (
          <div
            key={sim.id}
            onClick={() => navigate(`/${studentId}/simulados`)}
            className="card-interactive flex cursor-pointer items-center gap-3 rounded-xl2 border border-ink/5 p-3"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sim/50 text-sim-ink">
              <GraduationCap size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{sim.label}</p>
              <p className="truncate text-xs text-ink-soft">{sim.scopeLabel}</p>
            </div>
            {sim.daysUntil !== undefined && (
              <span className="shrink-0 rounded-full bg-sim/40 px-2.5 py-1 text-xs font-bold text-sim-ink">em {sim.daysUntil}d</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
