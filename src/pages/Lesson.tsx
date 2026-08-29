import { Navigate, useParams } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import type { StudentId } from '../store/useAppStore'
import { LessonPage } from '../components/lesson/LessonPage'

export default function Lesson() {
  const { studentId, subjectSlug, lessonId } = useParams<{
    studentId: StudentId
    subjectSlug: string
    lessonId: string
  }>()
  const data = useAppStore.getState().getStudentData(studentId as StudentId)
  const lesson = lessonId ? data.lessons[lessonId] : undefined

  if (!lesson) return <Navigate to={`/${studentId}/materia/${subjectSlug}`} replace />

  return <LessonPage lesson={lesson} />
}
