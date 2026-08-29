import type { StudentData } from '../../data/types'

export function ProfileCard({ data, onSelect }: { data: StudentData; onSelect: () => void }) {
  const { profile, xp, streak, exam } = data
  const journeyPercent = Math.round((exam.currentWeek / exam.weeksTotal) * 100)
  const initials = profile.name.slice(0, 1)

  return (
    <button
      onClick={onSelect}
      className="flex flex-col items-start gap-5 rounded-xl2 bg-white p-8 text-left shadow-soft transition-shadow hover:shadow-md"
    >
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white"
        style={{ backgroundColor: profile.avatarColor }}
      >
        {initials}
      </div>

      <div>
        <h2 className="text-2xl font-extrabold">{profile.name}</h2>
        <p className="text-ink-soft">Preparação para o {profile.targetGrade}</p>
      </div>

      <div className="flex w-full flex-col gap-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-ink-soft">Jornada</span>
          <span className="font-semibold">{journeyPercent}% concluída</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-ink/5">
          <div className="h-full rounded-full bg-ink" style={{ width: `${journeyPercent}%` }} />
        </div>
      </div>

      <div className="flex w-full items-center justify-between text-sm font-semibold">
        <span>🔥 {streak.currentDays} dias seguidos</span>
        <span>Nível {xp.level}</span>
      </div>

      <span className="mt-2 w-full rounded-xl2 bg-ink py-3 text-center font-semibold text-white">
        Entrar no perfil
      </span>
    </button>
  )
}
