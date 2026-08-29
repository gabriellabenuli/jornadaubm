import { useParams } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import type { StudentId } from '../store/useAppStore'
import { AchievementBadge } from '../components/achievements/AchievementBadge'

export default function Achievements() {
  const { studentId } = useParams<{ studentId: StudentId }>()
  const data = useAppStore.getState().getStudentData(studentId as StudentId)
  const unlockedCount = data.achievements.filter((a) => a.unlocked).length

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Conquistas</h1>
        <p className="mt-1 text-ink-soft">
          {unlockedCount}/{data.achievements.length} desbloqueadas
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {data.achievements.map((achievement) => (
          <AchievementBadge key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  )
}
