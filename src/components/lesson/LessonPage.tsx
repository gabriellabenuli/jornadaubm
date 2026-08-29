import { useNavigate, useParams } from 'react-router-dom'
import type { LessonContent } from '../../data/types'
import type { StudentId } from '../../store/useAppStore'
import { Badge } from '../shared/Badge'
import { ProgressBar } from '../shared/ProgressBar'
import { LessonSection } from './LessonSection'

const SUBJECT_LABEL: Record<LessonContent['subject'], string> = {
  matematica: 'Matemática',
  portugues: 'Português',
  redacao: 'Redação',
}

const SUBJECT_TONE: Record<LessonContent['subject'], 'math' | 'port' | 'essay'> = {
  matematica: 'math',
  portugues: 'port',
  redacao: 'essay',
}

export function LessonPage({ lesson }: { lesson: LessonContent }) {
  const navigate = useNavigate()
  const { studentId } = useParams<{ studentId: StudentId }>()

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <div>
        <Badge tone={SUBJECT_TONE[lesson.subject]}>{SUBJECT_LABEL[lesson.subject]}</Badge>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight">{lesson.title}</h1>
        <div className="mt-4">
          <ProgressBar percent={lesson.progressPercent} tone={SUBJECT_TONE[lesson.subject]} />
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {lesson.sections.map((section, index) => (
          <LessonSection key={section.id} section={section} index={index} />
        ))}
      </div>

      <div>
        <h3 className="mb-3 font-semibold">Vamos testar?</h3>
        <button
          onClick={() => navigate(`/${studentId}/materia/${lesson.subject}/exercicios/${lesson.exerciseSetId}`)}
          className="rounded-xl2 bg-ink px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
        >
          Ir para exercícios
        </button>
      </div>
    </div>
  )
}
