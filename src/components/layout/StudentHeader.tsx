import { CalendarClock } from 'lucide-react'
import type { StudentProfile, XPState } from '../../data/types'
import { XPBar } from '../dashboard/XPBar'
import { AvatarUpload } from '../shared/AvatarUpload'
import { useAppStore } from '../../store/useAppStore'

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Bom dia'
  if (hour < 18) return 'Boa tarde'
  return 'Boa noite'
}

export function StudentHeader({
  profile,
  xp,
  daysRemaining,
}: {
  profile: StudentProfile
  xp: XPState
  daysRemaining: number
}) {
  const photoUrl = useAppStore((s) => s.avatarPhoto[profile.id])
  const setAvatarPhoto = useAppStore((s) => s.setAvatarPhoto)

  return (
    <header className="flex flex-col gap-4 pb-6 sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:pb-8">
      <div className="flex items-start gap-3 sm:gap-4">
        <AvatarUpload
          name={profile.name}
          color={profile.avatarColor}
          photoUrl={photoUrl}
          onChange={(url) => setAvatarPhoto(profile.id, url)}
        />
        <div>
          <h1 className="text-xl font-extrabold tracking-tight sm:text-3xl">
            {greeting()}, {profile.name} 👋
          </h1>
          <p className="mt-1 text-sm text-ink-soft sm:text-base">Vamos avançar mais um pouco hoje?</p>
          <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-ink-soft sm:mt-3 sm:text-sm">
            <CalendarClock size={16} />
            Faltam {daysRemaining} dias para a prova
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:items-end">
        <span className="text-xs font-semibold text-ink-soft sm:text-sm">
          Nível {xp.level} · {xp.total.toLocaleString('pt-BR')} XP
        </span>
        <XPBar xp={xp} />
      </div>
    </header>
  )
}
