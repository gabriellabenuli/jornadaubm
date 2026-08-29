import { CalendarClock } from 'lucide-react'
import type { StudentProfile, XPState } from '../../data/types'
import { XPBar } from '../dashboard/XPBar'

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
  return (
    <header className="flex items-start justify-between gap-6 pb-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          {greeting()}, {profile.name} 👋
        </h1>
        <p className="mt-1 text-ink-soft">Vamos avançar mais um pouco hoje?</p>
        <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-ink-soft">
          <CalendarClock size={16} />
          Faltam {daysRemaining} dias para a prova
        </p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <span className="text-sm font-semibold text-ink-soft">
          Nível {xp.level} · {xp.total.toLocaleString('pt-BR')} XP
        </span>
        <XPBar xp={xp} />
      </div>
    </header>
  )
}
