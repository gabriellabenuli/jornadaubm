import { Navigate, useParams } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import type { StudentId } from '../store/useAppStore'
import { SimulationResult } from '../components/simulation/SimulationResult'

export default function SimulationResultPage() {
  const { studentId, simId } = useParams<{ studentId: StudentId; simId: string }>()
  const data = useAppStore.getState().getStudentData(studentId as StudentId)
  const sim = data.simulations.find((s) => s.id === simId)

  if (!sim || !sim.completed || !sim.result) return <Navigate to={`/${studentId}/simulados`} replace />

  return <SimulationResult sim={sim} allSims={data.simulations} />
}
