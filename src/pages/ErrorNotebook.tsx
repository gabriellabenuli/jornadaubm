import { useParams } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import type { StudentId } from '../store/useAppStore'
import type { ErrorStatus } from '../data/types'
import { ErrorTopicBar } from '../components/errors/ErrorTopicBar'
import { Badge } from '../components/shared/Badge'
import { StatCard } from '../components/shared/StatCard'

const SUBJECT_TONE: Record<string, 'math' | 'port' | 'essay'> = {
  matematica: 'math',
  portugues: 'port',
  redacao: 'essay',
}

const STATUS_SECTIONS: { status: ErrorStatus; title: string }[] = [
  { status: 'recent', title: 'Recentes' },
  { status: 'review', title: 'Precisa revisar' },
  { status: 'mastered', title: 'Dominados' },
]

export default function ErrorNotebook() {
  const { studentId } = useParams<{ studentId: StudentId }>()
  const data = useAppStore.getState().getStudentData(studentId as StudentId)
  const { errorNotebook } = data
  const total = errorNotebook.entries.length
  const maxCount = Math.max(...errorNotebook.topicBreakdown.map((t) => t.count))

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Caderno de erros</h1>
        <p className="mt-1 text-ink-soft">{total} erros para revisar</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard value={String(errorNotebook.bySubjectCount.matematica)} label="Matemática" />
        <StatCard value={String(errorNotebook.bySubjectCount.portugues)} label="Português" />
        <StatCard value={String(errorNotebook.bySubjectCount.redacao)} label="Redação — pontos de atenção" />
      </div>

      <div className="flex flex-col gap-4 rounded-xl2 bg-white p-6 shadow-soft">
        <h2 className="font-semibold">Assuntos que precisam de atenção</h2>
        {errorNotebook.topicBreakdown.map((topic) => (
          <ErrorTopicBar key={topic.topic} topic={topic} maxCount={maxCount} />
        ))}
      </div>

      <div id="review-list" className="flex flex-col gap-8">
        {STATUS_SECTIONS.map(({ status, title }) => {
          const entries = errorNotebook.entries.filter((e) => e.status === status)
          if (entries.length === 0) return null
          return (
            <div key={status} className="flex flex-col gap-3">
              <h2 className="font-semibold">{title}</h2>
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="card-interactive flex items-center justify-between rounded-xl2 bg-white p-4 shadow-soft"
                >
                  <div className="flex items-center gap-3">
                    <Badge tone={SUBJECT_TONE[entry.subject]}>{entry.topic}</Badge>
                    <span className="text-sm text-ink-soft">{entry.prompt}</span>
                  </div>
                  {entry.status === 'mastered' && (
                    <span className="text-sm font-semibold text-essay-ink">DOMINADO ✓</span>
                  )}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
