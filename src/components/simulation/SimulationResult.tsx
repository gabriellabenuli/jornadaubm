import { useNavigate, useParams } from 'react-router-dom'
import type { SimulationSummary } from '../../data/types'
import type { StudentId } from '../../store/useAppStore'
import { PerformanceChart } from '../performance/PerformanceChart'

const SUBJECT_LABEL: Record<string, string> = {
  matematica: 'Matemática',
  portugues: 'Português',
}

export function SimulationResult({ sim, allSims }: { sim: SimulationSummary; allSims: SimulationSummary[] }) {
  const navigate = useNavigate()
  const { studentId } = useParams<{ studentId: StudentId }>()
  const result = sim.result!
  const percent = Math.round((result.correct / result.total) * 100)

  const completedSims = allSims.filter((s) => s.completed && s.result)
  const evolution = completedSims.map((s) => ({
    label: s.label.replace('SIMULADO ', 'Simulado '),
    percent: Math.round((s.result!.correct / s.result!.total) * 100),
  }))
  const currentIdx = completedSims.findIndex((s) => s.id === sim.id)
  const prev = currentIdx > 0 ? completedSims[currentIdx - 1] : null
  const delta = prev ? percent - Math.round((prev.result!.correct / prev.result!.total) * 100) : null

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">{sim.label}</h1>

        <div className="mt-4 flex items-end gap-4">
          <span className="text-5xl font-extrabold">
            {result.correct} / {result.total}
          </span>
          <span className="pb-1 text-2xl font-bold text-ink-soft">{percent}%</span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          {result.bySubject.map((s) => (
            <div key={s.subject} className="rounded-xl2 bg-white p-4 shadow-soft">
              <span className="text-sm text-ink-soft">{SUBJECT_LABEL[s.subject]}</span>
              <p className="text-xl font-extrabold">
                {s.correct} / {s.total}
              </p>
            </div>
          ))}
          {result.essayGrade !== undefined && (
            <div className="rounded-xl2 bg-white p-4 shadow-soft">
              <span className="text-sm text-ink-soft">Redação</span>
              <p className="text-xl font-extrabold">{result.essayGrade.toFixed(1)}</p>
            </div>
          )}
        </div>
      </div>

      {evolution.length > 1 && (
        <div className="rounded-xl2 bg-white p-6 shadow-soft">
          <h2 className="font-semibold">Evolução</h2>
          {delta !== null && (
            <p className={`mt-1 text-sm font-semibold ${delta >= 0 ? 'text-essay-ink' : 'text-port-ink'}`}>
              Você {delta >= 0 ? 'melhorou' : 'variou'} {delta >= 0 ? '+' : ''}
              {delta}%
            </p>
          )}
          <div className="mt-4">
            <PerformanceChart data={evolution} color="#d6437e" />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-xl2 bg-essay/20 p-5">
          <h3 className="font-semibold text-essay-ink">Foi muito bem</h3>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {result.strengths.map((s) => (
              <li key={s.topic} className="flex justify-between">
                <span>{s.topic}</span>
                <span className="font-semibold">{s.percent}%</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl2 bg-port/20 p-5">
          <h3 className="font-semibold text-port-ink">Precisa revisar</h3>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {result.weaknesses.map((s) => (
              <li key={s.topic} className="flex justify-between">
                <span>{s.topic}</span>
                <span className="font-semibold">{s.percent}%</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => navigate(`/${studentId}/caderno-de-erros`)}
            className="mt-4 rounded-xl2 bg-ink px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Revisar erros
          </button>
        </div>
      </div>
    </div>
  )
}
