import type { ExamState } from '../../data/types'

const STEPS = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Revisão final', '🏁 PROVA']

export function JourneyTimeline({ exam }: { exam: ExamState }) {
  return (
    <div className="mb-6 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0">
      <div className="flex w-max items-center gap-0 rounded-xl2 bg-white p-4 shadow-soft sm:w-full sm:justify-between">
        {STEPS.map((step, index) => {
          const isDone = index < exam.currentWeek - 1
          const isCurrent = index === exam.currentWeek - 1
          return (
            <div key={step} className="flex shrink-0 items-center sm:flex-1">
              <div
                className={`shrink-0 whitespace-nowrap rounded-xl2 px-3 py-2 text-center text-xs font-semibold sm:flex-1 ${
                  isCurrent
                    ? 'bg-ink text-white'
                    : isDone
                      ? 'bg-essay text-essay-ink'
                      : 'bg-ink/5 text-ink-soft'
                }`}
              >
                {step}
              </div>
              {index < STEPS.length - 1 && <div className="h-px w-4 shrink-0 bg-ink/10" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
