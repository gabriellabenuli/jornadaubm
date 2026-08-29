import type { EssayState } from '../../data/types'
import { Badge } from '../shared/Badge'

export function EssayCard({ currentPrompt }: { currentPrompt: EssayState['currentPrompt'] }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl2 bg-essay/25 p-6 shadow-soft">
      <div>
        <Badge tone="essay">{currentPrompt.genre}</Badge>
        <h2 className="mt-3 text-2xl font-extrabold">{currentPrompt.theme}</h2>
      </div>
      <p className="text-ink-soft">{currentPrompt.guidance}</p>
      <div>
        <span className="text-sm font-semibold">Estrutura esperada</span>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-ink-soft">
          {currentPrompt.expectedStructure.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}
