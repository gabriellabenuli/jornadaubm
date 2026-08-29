import { NavLink } from 'react-router-dom'
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

const navItems = (studentId: StudentId) => [
  { label: 'Início', to: `/${studentId}`, icon: Home, end: true },
  { label: 'Jornada', to: `/${studentId}/jornada`, icon: Compass },
  { label: 'Matemática', to: `/${studentId}/materia/matematica`, icon: Calculator },
  { label: 'Português', to: `/${studentId}/materia/portugues`, icon: BookOpen },
  { label: 'Redação', to: `/${studentId}/redacao`, icon: PenLine },
  { label: 'Simulados', to: `/${studentId}/simulados`, icon: Trophy },
  { label: 'Caderno de erros', to: `/${studentId}/caderno-de-erros`, icon: NotebookPen },
  { label: 'Conquistas', to: `/${studentId}/conquistas`, icon: Award },
  { label: 'Desempenho', to: `/${studentId}/desempenho`, icon: BarChart3 },
]

export function AppSidebar({ studentId }: { studentId: StudentId }) {
  return (
    <aside className="flex w-64 shrink-0 flex-col justify-between border-r border-ink/5 bg-white px-4 py-8">
      <div>
        <div className="mb-8 px-3 text-lg font-extrabold tracking-tight">UBM Jornada</div>
        <nav className="flex flex-col gap-1">
          {navItems(studentId).map(({ label, to, icon: Icon, end }) => (
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
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <NavLink
        to="/"
        className="flex items-center gap-3 rounded-xl2 px-3 py-2.5 text-sm font-semibold text-ink-soft hover:bg-ink/5"
      >
        <ArrowLeftRight size={18} />
        Trocar perfil
      </NavLink>
    </aside>
  )
}
