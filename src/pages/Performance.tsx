import { useParams } from 'react-router-dom'
import { Target, Calculator, BookOpen, ListChecks, Clock, PenLine } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import type { StudentId } from '../store/useAppStore'
import { StatCard } from '../components/shared/StatCard'
import { ProgressBar } from '../components/shared/ProgressBar'
import { PerformanceChart } from '../components/performance/PerformanceChart'

export default function Performance() {
  const { studentId } = useParams<{ studentId: StudentId }>()
  const data = useAppStore.getState().getStudentData(studentId as StudentId)
  const overview = data.performanceOverview
  const hours = Math.floor(overview.hoursStudied)
  const minutes = Math.round((overview.hoursStudied % 1) * 60)

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Desempenho</h1>
        <p className="mt-1 text-ink-soft">Sua evolução até aqui, em números.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        <StatCard value={`${overview.accuracyRate}%`} label="taxa geral de acertos" tone="review" icon={<Target size={18} />} />
        <StatCard value={`${overview.mathAccuracy}%`} label="Matemática" tone="math" icon={<Calculator size={18} />} />
        <StatCard value={`${overview.portAccuracy}%`} label="Português" tone="port" icon={<BookOpen size={18} />} />
        <StatCard
          value={String(overview.questionsAnswered)}
          label="questões realizadas"
          tone="sim"
          icon={<ListChecks size={18} />}
        />
        <StatCard
          value={`${hours}h${String(minutes).padStart(2, '0')}`}
          label="tempo estudado"
          tone="essay"
          icon={<Clock size={18} />}
        />
        <StatCard value={String(overview.essaysCount)} label="redações" tone="essay" icon={<PenLine size={18} />} />
      </div>

      <div className="rounded-xl2 bg-white p-6 shadow-soft">
        <h2 className="font-semibold">Evolução dos simulados</h2>
        <div className="mt-4">
          <PerformanceChart data={overview.simulationEvolution} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="rounded-xl2 bg-essay/20 p-5">
          <h3 className="font-semibold text-essay-ink">Pontos fortes</h3>
          <div className="mt-4 flex flex-col gap-3">
            {overview.strengths.map((s) => (
              <div key={s.topic} className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span>{s.topic}</span>
                  <span className="font-semibold">{s.percent}%</span>
                </div>
                <ProgressBar percent={s.percent} tone="essay" height="sm" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl2 bg-port/20 p-5">
          <h3 className="font-semibold text-port-ink">Precisa reforçar</h3>
          <div className="mt-4 flex flex-col gap-3">
            {overview.weaknesses.map((s) => (
              <div key={s.topic} className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span>{s.topic}</span>
                  <span className="font-semibold">{s.percent}%</span>
                </div>
                <ProgressBar percent={s.percent} tone="port" height="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
