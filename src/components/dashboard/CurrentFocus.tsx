import { useNavigate } from 'react-router-dom'
import type { CurrentFocusData } from '../../data/types'
import { Badge } from '../shared/Badge'

const SUBJECT_LABEL: Record<CurrentFocusData['subject'], string> = {
  matematica: 'Matemática',
  portugues: 'Português',
  redacao: 'Redação',
}

const SUBJECT_TONE: Record<CurrentFocusData['subject'], 'math' | 'port' | 'essay'> = {
  matematica: 'math',
  portugues: 'port',
  redacao: 'essay',
}

export function CurrentFocus({ focus }: { focus: CurrentFocusData }) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-3 rounded-xl2 bg-review/25 p-5 shadow-soft">
      <span className="text-xs font-bold uppercase tracking-wide text-review-ink">Seu foco agora</span>
      <div className="flex items-center gap-2">
        <Badge tone={SUBJECT_TONE[focus.subject]}>{SUBJECT_LABEL[focus.subject]}</Badge>
        <span className="font-semibold">{focus.topic}</span>
      </div>
      <p className="text-sm text-ink-soft">{focus.reason}</p>
      <button
        onClick={() => navigate(focus.ctaRoute)}
        className="mt-1 self-start rounded-xl2 bg-ink px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        {focus.ctaLabel}
      </button>
    </div>
  )
}
