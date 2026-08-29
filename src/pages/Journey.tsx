import { useParams } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import type { StudentId } from '../store/useAppStore'
import { WeeklyJourney } from '../components/journey/WeeklyJourney'

export default function Journey() {
  const { studentId } = useParams<{ studentId: StudentId }>()
  const data = useAppStore.getState().getStudentData(studentId as StudentId)

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Jornada</h1>
        <p className="mt-1 text-ink-soft">Seu caminho até a prova, semana a semana.</p>
      </div>

      {data.journey.map((week) => (
        <WeeklyJourney key={week.id} week={week} />
      ))}
    </div>
  )
}
