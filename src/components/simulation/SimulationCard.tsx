import { useNavigate } from 'react-router-dom'
import type { SimulationSummary } from '../../data/types'
import type { StudentId } from '../../store/useAppStore'

export function SimulationCard({
  sim,
  studentId,
  featured = false,
}: {
  sim: SimulationSummary
  studentId: StudentId
  featured?: boolean
}) {
  const navigate = useNavigate()

  return (
    <div
      className={`flex flex-col gap-4 rounded-xl2 border p-6 shadow-soft ${
        featured ? 'border-sim-dark/40 bg-sim/25' : 'border-ink/5 bg-white'
      }`}
    >
      {featured && (
        <span className="text-xs font-bold uppercase tracking-wide text-sim-ink">Desafio da semana</span>
      )}

      <div>
        <h3 className="text-lg font-extrabold">{sim.label}</h3>
        <p className="text-sm text-ink-soft">{sim.scopeLabel}</p>
      </div>

      <div className="text-sm text-ink-soft">
        <p>
          {sim.mathQuestions} Matemática · {sim.portQuestions} Português
          {sim.hasEssay && ' · + proposta de redação'}
        </p>
        <p className="mt-1">Tempo sugerido: {sim.suggestedMinutes} min</p>
      </div>

      {sim.completed && sim.result ? (
        <div className="text-sm font-semibold">
          {sim.result.correct}/{sim.result.total} · {Math.round((sim.result.correct / sim.result.total) * 100)}%
        </div>
      ) : null}

      {sim.completed ? (
        <button
          onClick={() => navigate(`/${studentId}/simulados/${sim.id}/resultado`)}
          className="self-start rounded-xl2 bg-ink px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Ver resultado
        </button>
      ) : (
        <button
          disabled
          className="self-start rounded-xl2 bg-ink/10 px-5 py-2 text-sm font-semibold text-ink-soft"
        >
          Em breve
        </button>
      )}
    </div>
  )
}
