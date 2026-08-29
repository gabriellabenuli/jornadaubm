import { Trophy } from 'lucide-react'
import type { StudentData } from '../../data/types'
import { AvatarUpload } from '../shared/AvatarUpload'
import { useAppStore } from '../../store/useAppStore'

function Row({
  label,
  a,
  b,
  format = (v: number) => String(v),
}: {
  label: string
  a: number
  b: number
  format?: (v: number) => string
}) {
  const max = Math.max(a, b, 1)
  const aLeads = a > b
  const bLeads = b > a

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-ink-soft">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`w-14 shrink-0 text-right text-sm font-bold ${aLeads ? 'text-math-ink' : 'text-ink-soft'}`}>
          {format(a)}
        </span>
        <div className="flex h-2.5 flex-1 overflow-hidden rounded-full bg-ink/5">
          <div className="h-full bg-math-dark transition-all duration-500" style={{ width: `${(a / (max * 2)) * 100}%` }} />
          <div className="h-full bg-port-dark transition-all duration-500" style={{ width: `${(b / (max * 2)) * 100}%` }} />
        </div>
        <span className={`w-14 shrink-0 text-sm font-bold ${bLeads ? 'text-port-ink' : 'text-ink-soft'}`}>
          {format(b)}
        </span>
      </div>
    </div>
  )
}

export function SiblingRace({ nicolas, joao }: { nicolas: StudentData; joao: StudentData }) {
  const nicolasPhoto = useAppStore((s) => s.avatarPhoto.nicolas)
  const joaoPhoto = useAppStore((s) => s.avatarPhoto.joao)
  const setAvatarPhoto = useAppStore((s) => s.setAvatarPhoto)

  const nicolasScore =
    nicolas.xp.total + nicolas.streak.currentDays * 20 + nicolas.performanceOverview.daysStudied * 10
  const joaoScore = joao.xp.total + joao.streak.currentDays * 20 + joao.performanceOverview.daysStudied * 10
  const leaderName = nicolasScore === joaoScore ? null : nicolasScore > joaoScore ? nicolas.profile.name : joao.profile.name

  return (
    <div className="flex flex-col gap-5 rounded-xl2 bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold">Nicolas vs João</h2>
          <p className="text-sm text-ink-soft">Quem está mais perto da prova?</p>
        </div>
        <div className="flex -space-x-3">
          <AvatarUpload
            name={nicolas.profile.name}
            color={nicolas.profile.avatarColor}
            photoUrl={nicolasPhoto}
            onChange={(url) => setAvatarPhoto('nicolas', url)}
            size="sm"
          />
          <AvatarUpload
            name={joao.profile.name}
            color={joao.profile.avatarColor}
            photoUrl={joaoPhoto}
            onChange={(url) => setAvatarPhoto('joao', url)}
            size="sm"
          />
        </div>
      </div>

      {leaderName && (
        <div className="flex items-center gap-2 rounded-xl2 bg-review/25 px-4 py-2.5 text-sm font-semibold text-review-ink">
          <Trophy size={16} />
          {leaderName} está na frente essa semana
        </div>
      )}

      <div className="flex flex-col gap-4">
        <Row label="XP total" a={nicolas.xp.total} b={joao.xp.total} />
        <Row label="Sequência de estudos" a={nicolas.streak.currentDays} b={joao.streak.currentDays} format={(v) => `${v}d`} />
        <Row label="Dias estudados" a={nicolas.performanceOverview.daysStudied} b={joao.performanceOverview.daysStudied} />
        <Row
          label="Questões respondidas"
          a={nicolas.performanceOverview.questionsAnswered}
          b={joao.performanceOverview.questionsAnswered}
        />
      </div>
    </div>
  )
}
