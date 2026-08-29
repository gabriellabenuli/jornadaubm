import type { ExamState } from '../../data/types'

const STEPS = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Revisão final', '🏁 PROVA']

export function JourneyTimeline({ exam }: { exam: ExamState }) {
  return (
    <div className="mb-6 flex items-center justify-between rounded-xl2 bg-white p-4 shadow-soft">
      {STEPS.map((step, index) => {
        const isDone = index < exam.currentWeek - 1
        const isCurrent = index === exam.currentWeek - 1
        return (
          <div key={step} className="flex flex-1 items-center">
            <div
              className={`flex-1 rounded-xl2 px-3 py-2 text-center text-xs font-semibold ${
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
  )
}
