import { Link, useParams } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import type { StudentId } from '../store/useAppStore'
import type { SubjectKey } from '../data/types'
import { Badge } from '../components/shared/Badge'
import { ProgressBar } from '../components/shared/ProgressBar'

const SUBJECT_LABEL: Record<SubjectKey, string> = {
  matematica: 'Matemática',
  portugues: 'Português',
  redacao: 'Redação',
}

const SUBJECT_TONE: Record<SubjectKey, 'math' | 'port' | 'essay'> = {
  matematica: 'math',
  portugues: 'port',
  redacao: 'essay',
}

export default function SubjectHome() {
  const { studentId, subjectSlug } = useParams<{ studentId: StudentId; subjectSlug: SubjectKey }>()
  const data = useAppStore.getState().getStudentData(studentId as StudentId)
  const subject = data.subjects[subjectSlug as SubjectKey]
  const lessons = Object.values(data.lessons).filter((l) => l.subject === subjectSlug)

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Badge tone={SUBJECT_TONE[subjectSlug as SubjectKey]}>{SUBJECT_LABEL[subjectSlug as SubjectKey]}</Badge>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight">{subject.label}</h1>
        <div className="mt-4 max-w-sm">
          <ProgressBar percent={subject.percentComplete} tone={subject.color} />
        </div>
        <p className="mt-2 text-sm text-ink-soft">
          {subject.questionsAnswered} questões respondidas · {subject.accuracyRate}% de acertos
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="font-semibold">Aulas</h2>
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            to={`/${studentId}/materia/${subjectSlug}/aula/${lesson.id}`}
            className="flex items-center justify-between rounded-xl2 bg-white p-5 shadow-soft transition-shadow hover:shadow-md"
          >
            <span className="font-semibold">{lesson.title}</span>
            <span className="text-sm text-ink-soft">{lesson.progressPercent}%</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
