import type { DailyMission as DailyMissionData } from '../../data/types'
import { MissionStage } from './MissionStage'
import { ProgressBar } from '../shared/ProgressBar'
import { Confetti } from '../shared/Confetti'

export function DailyMission({ mission }: { mission: DailyMissionData }) {
  const completedCount = mission.stages.filter((s) => s.completed).length
  const allDone = completedCount === mission.stages.length

  return (
    <div className="flex flex-col gap-5 rounded-xl2 bg-white p-6 shadow-soft">
      <div>
        <h2 className="text-xl font-extrabold">Sua missão de hoje</h2>
        <p className="text-sm text-ink-soft">
          {mission.totalMinutes} minutos · {mission.stages.length} etapas
        </p>
      </div>

      {allDone ? (
        <div className="animate-pop-in relative flex flex-col items-center gap-2 overflow-hidden rounded-xl2 bg-essay/30 py-8 text-center">
          <Confetti count={24} />
          <span className="text-lg font-extrabold text-essay-ink">MISSÃO CUMPRIDA</span>
          <p className="text-sm text-ink-soft">Todas as etapas de hoje foram concluídas.</p>
          <span className="mt-2 text-2xl font-extrabold text-essay-ink">+120 XP</span>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {mission.stages.map((stage, index) => (
            <MissionStage key={stage.id} stage={stage} index={index} />
          ))}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-ink-soft">
          {completedCount} de {mission.stages.length} etapas
        </span>
        <ProgressBar percent={(completedCount / mission.stages.length) * 100} tone="essay" />
      </div>
    </div>
  )
}
