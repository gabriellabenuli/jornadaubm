import { useParams } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import type { StudentId } from '../store/useAppStore'
import { SimulationCard } from '../components/simulation/SimulationCard'

export default function Simulations() {
  const { studentId } = useParams<{ studentId: StudentId }>()
  const data = useAppStore.getState().getStudentData(studentId as StudentId)
  const nextIncomplete = data.simulations.find((s) => !s.completed)

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Simulados</h1>
        <p className="mt-1 text-ink-soft">
          Os simulados são cumulativos — cada um cobre mais conteúdo que o anterior, até chegar na prova.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {data.simulations.map((sim) => (
          <SimulationCard
            key={sim.id}
            sim={sim}
            studentId={studentId as StudentId}
            featured={sim.id === nextIncomplete?.id}
          />
        ))}
      </div>
    </div>
  )
}
