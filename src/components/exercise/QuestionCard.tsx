import type { ReactElement } from 'react'
import type { Question } from '../../data/types'
import { Badge } from '../shared/Badge'
import { MathText } from '../shared/MathText'
import { ComicIllustration, ChartIllustration, TableIllustration, PictureIllustration } from '../illustrations/Illustrations'

const SUBJECT_TONE: Record<Question['subject'], 'math' | 'port' | 'essay'> = {
  matematica: 'math',
  portugues: 'port',
  redacao: 'essay',
}

const MEDIA_LABEL: Record<NonNullable<Question['media']>['kind'], string> = {
  tirinha: 'Tirinha',
  grafico: 'Gráfico',
  tabela: 'Tabela',
  imagem: 'Imagem',
}

const MEDIA_ILLUSTRATION: Record<NonNullable<Question['media']>['kind'], () => ReactElement> = {
  tirinha: ComicIllustration,
  grafico: ChartIllustration,
  tabela: TableIllustration,
  imagem: PictureIllustration,
}

export function QuestionCard({
  question,
  selectedOptionId,
  revealed,
  onSelect,
}: {
  question: Question
  selectedOptionId: string | null
  revealed: boolean
  onSelect: (optionId: string) => void
}) {
  const MediaIllustration = question.media ? MEDIA_ILLUSTRATION[question.media.kind] : null

  return (
    <div key={question.id} className="animate-fade-in-up flex flex-col gap-5 rounded-xl2 bg-white p-6 shadow-soft">
      <div className="flex items-center gap-2">
        <Badge tone={SUBJECT_TONE[question.subject]}>{question.topic}</Badge>
      </div>

      {question.media && MediaIllustration && (
        <div className="flex flex-col gap-2 overflow-hidden rounded-xl2">
          <div className="h-40 w-full">
            <MediaIllustration />
          </div>
          <div className="flex items-center gap-2 px-1">
            <Badge tone="neutral">{MEDIA_LABEL[question.media.kind]}</Badge>
            <span className="text-sm text-ink-soft">{question.media.caption}</span>
          </div>
        </div>
      )}

      <p className="text-xl font-semibold">
        <MathText text={question.prompt} />
      </p>

      <div className="flex flex-col gap-2">
        {question.options.map((option) => {
          const isCorrect = option.id === question.correctOptionId
          const isSelected = option.id === selectedOptionId
          let stateClass = 'border-ink/10 hover:border-ink/30'
          if (revealed && isCorrect) stateClass = 'border-essay-dark bg-essay/25'
          else if (revealed && isSelected && !isCorrect) stateClass = 'border-port-dark bg-port/25'

          return (
            <button
              key={option.id}
              disabled={revealed}
              onClick={() => onSelect(option.id)}
              className={`flex items-center gap-3 rounded-xl2 border p-4 text-left transition-colors ${stateClass} ${
                isSelected && !revealed ? 'border-ink bg-ink/5' : ''
              }`}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink/5 text-sm font-bold uppercase">
                {option.id}
              </span>
              <span>
                <MathText text={option.label} />
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
