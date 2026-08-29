import type { StudentData } from '../../data/types'
import { AvatarUpload } from './AvatarUpload'

export function ProfileCard({
  data,
  onSelect,
  photoUrl,
  onPhotoChange,
}: {
  data: StudentData
  onSelect: () => void
  photoUrl: string | null
  onPhotoChange: (dataUrl: string) => void
}) {
  const { profile, xp, streak } = data
  const allDays = data.journey.flatMap((w) => w.days)
  const doneDays = allDays.filter((d) => d.status === 'done').length
  const journeyPercent = allDays.length > 0 ? Math.round((doneDays / allDays.length) * 100) : 0

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect()}
      className="card-interactive flex cursor-pointer flex-col items-start gap-5 rounded-xl2 bg-white p-8 text-left shadow-soft"
    >
      <AvatarUpload name={profile.name} color={profile.avatarColor} photoUrl={photoUrl} onChange={onPhotoChange} />

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
    </div>
  )
}
