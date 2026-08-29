import { useParams } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import type { StudentId } from '../store/useAppStore'
import { StudentHeader } from '../components/layout/StudentHeader'
import { JourneyTimeline } from '../components/dashboard/JourneyTimeline'
import { DailyMission } from '../components/dashboard/DailyMission'
import { CurrentFocus } from '../components/dashboard/CurrentFocus'
import { StudyStreak } from '../components/dashboard/StudyStreak'
import { ProgressCard } from '../components/dashboard/ProgressCard'
import { SubjectCard } from '../components/dashboard/SubjectCard'
import { SiblingRace } from '../components/dashboard/SiblingRace'

export default function Dashboard() {
  const { studentId } = useParams<{ studentId: StudentId }>()
  const data = useAppStore.getState().getStudentData(studentId as StudentId)
  const nicolasData = useAppStore.getState().getStudentData('nicolas')
  const joaoData = useAppStore.getState().getStudentData('joao')

  return (
    <div className="flex flex-col">
      <StudentHeader profile={data.profile} xp={data.xp} daysRemaining={data.exam.daysRemaining} />
      <JourneyTimeline exam={data.exam} />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <DailyMission mission={data.dailyMission} />
        </div>
        <div className="flex flex-col gap-6">
          <CurrentFocus focus={data.currentFocus} />
          <StudyStreak streak={data.streak} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <ProgressCard overview={data.performanceOverview} />
        </div>
        <SiblingRace nicolas={nicolasData} joao={joaoData} />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-6">
        <SubjectCard subject={data.subjects.matematica} studentId={studentId as StudentId} />
        <SubjectCard subject={data.subjects.portugues} studentId={studentId as StudentId} />
        <SubjectCard subject={data.subjects.redacao} studentId={studentId as StudentId} />
      </div>
    </div>
  )
}
