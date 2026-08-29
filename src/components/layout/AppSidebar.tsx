import { NavLink, useNavigate } from 'react-router-dom'
import {
  Home,
  Compass,
  Calculator,
  BookOpen,
  PenLine,
  Trophy,
  NotebookPen,
  Award,
  BarChart3,
  ArrowLeftRight,
} from 'lucide-react'
import type { StudentId } from '../../store/useAppStore'
import { useAppStore } from '../../store/useAppStore'
import { AvatarUpload } from '../shared/AvatarUpload'

const navItems = (studentId: StudentId, errorCount: number) => [
  { label: 'Início', to: `/${studentId}`, icon: Home, end: true },
  { label: 'Jornada', to: `/${studentId}/jornada`, icon: Compass },
  { label: 'Matemática', to: `/${studentId}/materia/matematica`, icon: Calculator },
  { label: 'Português', to: `/${studentId}/materia/portugues`, icon: BookOpen },
  { label: 'Redação', to: `/${studentId}/redacao`, icon: PenLine },
  { label: 'Simulados', to: `/${studentId}/simulados`, icon: Trophy },
  { label: 'Caderno de erros', to: `/${studentId}/caderno-de-erros`, icon: NotebookPen, count: errorCount },
  { label: 'Conquistas', to: `/${studentId}/conquistas`, icon: Award },
  { label: 'Desempenho', to: `/${studentId}/desempenho`, icon: BarChart3 },
]

export function AppSidebar({ studentId }: { studentId: StudentId }) {
  const navigate = useNavigate()
  const siblingId: StudentId = studentId === 'nicolas' ? 'joao' : 'nicolas'
  const data = useAppStore.getState().getStudentData(studentId)
  const sibling = useAppStore.getState().getStudentData(siblingId)
  const siblingPhoto = useAppStore((s) => s.avatarPhoto[siblingId])
  const setAvatarPhoto = useAppStore((s) => s.setAvatarPhoto)
  const errorCount = data.errorNotebook.entries.length

  return (
    <aside className="flex w-64 shrink-0 flex-col justify-between border-r border-ink/5 bg-white px-4 py-8">
      <div>
        <div className="mb-8 px-3 text-lg font-extrabold tracking-tight">UBM Jornada</div>
        <nav className="flex flex-col gap-1">
          {navItems(studentId, errorCount).map(({ label, to, icon: Icon, end, count }) => (
            <NavLink
              key={label}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl2 px-3 py-2.5 text-sm font-semibold transition-colors ${
                  isActive ? 'bg-ink text-white' : 'text-ink-soft hover:bg-ink/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} />
                  <span className="flex-1">{label}</span>
                  {!!count && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-ink/5 text-ink-soft'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => navigate(`/${siblingId}`)}
          className="card-interactive flex items-center gap-3 rounded-xl2 border border-ink/5 p-3 text-left"
        >
          <AvatarUpload
            name={sibling.profile.name}
            color={sibling.profile.avatarColor}
            photoUrl={siblingPhoto}
            onChange={(url) => setAvatarPhoto(siblingId, url)}
            size="sm"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{sibling.profile.name}</p>
            <p className="truncate text-xs text-ink-soft">🔥 {sibling.streak.currentDays}d · Nível {sibling.xp.level}</p>
          </div>
        </button>

        <NavLink
          to="/"
          className="flex items-center gap-3 rounded-xl2 px-3 py-2.5 text-sm font-semibold text-ink-soft hover:bg-ink/5"
        >
          <ArrowLeftRight size={18} />
          Trocar perfil
        </NavLink>
      </div>
    </aside>
  )
}
