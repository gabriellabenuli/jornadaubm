import { useNavigate } from 'react-router-dom'
import type { StudentId } from '../../store/useAppStore'
import type { SubjectProgress } from '../../data/types'
import { ProgressBar } from '../shared/ProgressBar'

const BG_CLASS: Record<SubjectProgress['color'], string> = {
  math: 'bg-math/40',
  port: 'bg-port/40',
  essay: 'bg-essay/40',
}

export function SubjectCard({ subject, studentId }: { subject: SubjectProgress; studentId: StudentId }) {
  const navigate = useNavigate()
  const route = subject.key === 'redacao' ? `/${studentId}/redacao` : `/${studentId}/materia/${subject.key}`

  return (
    <div className={`flex flex-col gap-3 rounded-xl2 p-5 shadow-soft ${BG_CLASS[subject.color]}`}>
      <span className="font-extrabold">{subject.label}</span>
      <ProgressBar percent={subject.percentComplete} tone={subject.color} height="sm" />
      <span className="text-sm text-ink-soft">{subject.percentComplete}% concluído</span>

      {subject.key === 'redacao' ? (
        <span className="text-sm text-ink-soft">Nota média: {subject.averageGrade?.toFixed(1)}</span>
      ) : (
        <>
          <span className="text-sm text-ink-soft">{subject.questionsAnswered} questões respondidas</span>
          <span className="text-sm text-ink-soft">{subject.accuracyRate}% de acertos</span>
        </>
      )}

      <button
        onClick={() => navigate(route)}
        className="mt-2 self-start rounded-xl2 bg-white px-4 py-2 text-sm font-semibold shadow-soft transition-opacity hover:opacity-80"
      >
        {subject.key === 'redacao' ? 'Ver redações' : 'Continuar'}
      </button>
    </div>
  )
}
