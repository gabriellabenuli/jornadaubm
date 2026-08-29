import { useState } from 'react'
import type { Question } from '../../data/types'
import { Confetti } from '../shared/Confetti'

export function AnswerFeedback({
  question,
  selectedOptionId,
  onAddToErrorNotebook,
  onNext,
  isLast,
}: {
  question: Question
  selectedOptionId: string
  onAddToErrorNotebook: () => void
  onNext: () => void
  isLast: boolean
}) {
  const [added, setAdded] = useState(false)
  const correct = selectedOptionId === question.correctOptionId
  const correctLabel = question.options.find((o) => o.id === question.correctOptionId)?.label

  return (
    <div
      className={`animate-pop-in relative flex flex-col gap-4 overflow-hidden rounded-xl2 p-6 shadow-soft ${correct ? 'bg-essay/20' : 'bg-port/20'}`}
    >
      {correct && <Confetti />}
      {correct ? (
        <div className="flex items-center justify-between">
          <span className="text-lg font-extrabold text-essay-ink">✓ Muito bem</span>
          <span className="animate-xp-float font-semibold text-essay-ink">+5 XP</span>
        </div>
      ) : (
        <div>
          <span className="text-lg font-extrabold text-port-ink">Quase. Vamos entender.</span>
          <p className="mt-1 text-sm text-ink-soft">
            Resposta correta: <strong>{correctLabel}</strong>
          </p>
        </div>
      )}

      <p className="text-ink-soft">{question.explanation}</p>

      {!correct && (
        <div>
          <span className="text-sm font-semibold">Resolução passo a passo</span>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-ink-soft">
            {question.stepByStep.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        {!correct ? (
          <button
            onClick={() => {
              onAddToErrorNotebook()
              setAdded(true)
            }}
            disabled={added}
            className="rounded-xl2 border border-ink/15 bg-white px-4 py-2 text-sm font-semibold transition-opacity disabled:opacity-60"
          >
            {added ? 'Adicionado ✓' : 'Adicionar ao caderno de erros'}
          </button>
        ) : (
          <span />
        )}

        <button
          onClick={onNext}
          className="rounded-xl2 bg-ink px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          {isLast ? 'Ver resultado' : 'Próxima questão'}
        </button>
      </div>
    </div>
  )
}
