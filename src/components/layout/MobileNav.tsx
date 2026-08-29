import { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Home, Compass, Trophy, NotebookPen, Menu, X, ArrowLeftRight, Award, BarChart3, Calculator, BookOpen, PenLine } from 'lucide-react'
import type { StudentId } from '../../store/useAppStore'
import { useAppStore } from '../../store/useAppStore'
import { AvatarUpload } from '../shared/AvatarUpload'

const TAB_ITEMS = (studentId: StudentId) => [
  { label: 'Início', to: `/${studentId}`, icon: Home, end: true },
  { label: 'Jornada', to: `/${studentId}/jornada`, icon: Compass },
  { label: 'Simulados', to: `/${studentId}/simulados`, icon: Trophy },
]

const MORE_ITEMS = (studentId: StudentId, errorCount: number) => [
  { label: 'Matemática', to: `/${studentId}/materia/matematica`, icon: Calculator },
  { label: 'Português', to: `/${studentId}/materia/portugues`, icon: BookOpen },
  { label: 'Redação', to: `/${studentId}/redacao`, icon: PenLine },
  { label: 'Caderno de erros', to: `/${studentId}/caderno-de-erros`, icon: NotebookPen, count: errorCount },
  { label: 'Conquistas', to: `/${studentId}/conquistas`, icon: Award },
  { label: 'Desempenho', to: `/${studentId}/desempenho`, icon: BarChart3 },
]

export function MobileNav({ studentId }: { studentId: StudentId }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const siblingId: StudentId = studentId === 'nicolas' ? 'joao' : 'nicolas'
  const data = useAppStore.getState().getStudentData(studentId)
  const sibling = useAppStore.getState().getStudentData(siblingId)
  const siblingPhoto = useAppStore((s) => s.avatarPhoto[siblingId])
  const setAvatarPhoto = useAppStore((s) => s.setAvatarPhoto)
  const errorCount = data.errorNotebook.entries.length

  const isMoreActive = MORE_ITEMS(studentId, errorCount).some((item) => location.pathname.startsWith(item.to))

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-40 flex items-stretch justify-around border-t border-ink/5 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_12px_rgba(28,26,24,0.06)] md:hidden">
        {TAB_ITEMS(studentId).map(({ label, to, icon: Icon, end }) => (
          <NavLink
            key={label}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-semibold ${isActive ? 'text-ink' : 'text-ink-soft/70'}`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
        <button
          onClick={() => setOpen(true)}
          className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-semibold ${isMoreActive ? 'text-ink' : 'text-ink-soft/70'}`}
        >
          <Menu size={20} />
          Mais
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button aria-label="Fechar menu" onClick={() => setOpen(false)} className="absolute inset-0 bg-ink/40" />
          <div className="absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col gap-5 rounded-t-xl2 bg-white p-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)]">
            <div className="flex items-center justify-between">
              <span className="text-lg font-extrabold">Menu</span>
              <button onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-ink/5">
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col gap-1 overflow-y-auto">
              {MORE_ITEMS(studentId, errorCount).map(({ label, to, icon: Icon, count }) => (
                <NavLink
                  key={label}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl2 px-3 py-3 text-sm font-semibold ${
                      isActive ? 'bg-ink text-white' : 'text-ink-soft hover:bg-ink/5'
                    }`
                  }
                >
                  <Icon size={18} />
                  <span className="flex-1">{label}</span>
                  {!!count && <span className="rounded-full bg-ink/5 px-2 py-0.5 text-xs font-bold text-ink-soft">{count}</span>}
                </NavLink>
              ))}
            </nav>

            <button
              onClick={() => {
                setOpen(false)
                navigate(`/${siblingId}`)
              }}
              className="flex items-center gap-3 rounded-xl2 border border-ink/5 p-3 text-left"
            >
              <AvatarUpload
                name={sibling.profile.name}
                color={sibling.profile.avatarColor}
                photoUrl={siblingPhoto}
                onChange={(url) => setAvatarPhoto(siblingId, url)}
                size="sm"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">Trocar para {sibling.profile.name}</p>
                <p className="truncate text-xs text-ink-soft">
                  🔥 {sibling.streak.currentDays}d · Nível {sibling.xp.level}
                </p>
              </div>
            </button>

            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl2 px-3 py-2.5 text-sm font-semibold text-ink-soft hover:bg-ink/5"
            >
              <ArrowLeftRight size={18} />
              Voltar para seleção de perfil
            </NavLink>
          </div>
        </div>
      )}
    </>
  )
}
