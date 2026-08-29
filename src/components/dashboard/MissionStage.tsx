import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import type { MissionStageData } from '../../data/types'
import { Badge } from '../shared/Badge'

const KIND_LABEL: Record<MissionStageData['kind'], string> = {
  aprender: 'Aprender',
  praticar: 'Praticar',
  escrever: 'Escrever',
}

const SUBJECT_LABEL: Record<MissionStageData['subject'], string> = {
  matematica: 'Matemática',
  portugues: 'Português',
  redacao: 'Redação',
}

const SUBJECT_TONE: Record<MissionStageData['subject'], 'math' | 'port' | 'essay'> = {
  matematica: 'math',
  portugues: 'port',
  redacao: 'essay',
}

export function MissionStage({ stage, index }: { stage: MissionStageData; index: number }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => !stage.completed && navigate(stage.ctaRoute)}
      className={`card-interactive flex flex-col gap-3 rounded-xl2 border p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${
        stage.completed ? 'border-essay/60 bg-essay/20' : 'cursor-pointer border-ink/5 bg-surface'
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
            stage.completed ? 'bg-essay-dark text-white' : 'bg-ink/5 text-ink-soft'
          }`}
        >
          {stage.completed ? <Check size={18} /> : index + 1}
        </div>

        <div>
          <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-soft">
            <span>Etapa {index + 1}</span>
            <span>·</span>
            <span>{KIND_LABEL[stage.kind]}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge tone={SUBJECT_TONE[stage.subject]}>{SUBJECT_LABEL[stage.subject]}</Badge>
            <span className="font-semibold">{stage.title}</span>
          </div>
          {stage.minutes && <p className="mt-1 text-sm text-ink-soft">{stage.minutes} min</p>}
          {stage.targetQuestions && (
            <p className="mt-1 text-sm text-ink-soft">
              {stage.targetQuestions.map((t) => `${t.count} ${SUBJECT_LABEL[t.subject]}`).join(' · ')}
            </p>
          )}
        </div>
      </div>

      {stage.completed ? (
        <span className="shrink-0 text-sm font-semibold text-essay-ink">Concluído</span>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation()
            navigate(stage.ctaRoute)
          }}
          className="w-full shrink-0 rounded-xl2 bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto sm:py-2"
        >
          {stage.ctaLabel}
        </button>
      )}
    </div>
  )
}
