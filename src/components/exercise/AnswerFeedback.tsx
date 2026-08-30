import type { Question } from '../../data/types'
import { Confetti } from '../shared/Confetti'
import { MathText } from '../shared/MathText'

export function AnswerFeedback({
  question,
  selectedOptionId,
  onNext,
  isLast,
}: {
  question: Question
  selectedOptionId: string
  onNext: () => void
  isLast: boolean
}) {
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
            Resposta correta: <strong><MathText text={correctLabel ?? ''} /></strong>
          </p>
        </div>
      )}

      <p className="text-ink-soft">
        <MathText text={question.explanation} />
      </p>

      {!correct && (
        <div>
          <span className="text-sm font-semibold">Resolução passo a passo</span>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm text-ink-soft">
            {question.stepByStep.map((step, i) => (
              <li key={i}>
                <MathText text={step} />
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        {!correct ? (
          <span className="order-2 text-sm font-semibold text-port-ink sm:order-1">
            Adicionada ao caderno de erros ✓
          </span>
        ) : (
          <span className="hidden sm:block" />
        )}

        <button
          onClick={onNext}
          className="order-1 rounded-xl2 bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:order-2 sm:py-2"
        >
          {isLast ? 'Ver resultado' : 'Próxima questão'}
        </button>
      </div>
    </div>
  )
}
