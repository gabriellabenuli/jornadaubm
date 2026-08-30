import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import type { StudentId } from '../store/useAppStore'
import { EssayCard } from '../components/essay/EssayCard'
import { EssayChecklist } from '../components/essay/EssayChecklist'
import { EssayHistory } from '../components/essay/EssayHistory'

const MIN_WORDS = 60

function gradeEssay(text: string, checkedCount: number, totalChecklist: number) {
  const words = text.trim().split(/\s+/).filter(Boolean)
  const wordCount = words.length
  const paragraphCount = text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean).length

  const lengthScore = wordCount >= 180 ? 4 : wordCount >= 100 ? 2.5 : wordCount >= MIN_WORDS ? 1 : 0
  const paragraphScore = paragraphCount >= 4 ? 2 : paragraphCount >= 2 ? 1 : 0
  const checklistScore = totalChecklist > 0 ? (checkedCount / totalChecklist) * 4 : 2

  const grade = Math.max(0, Math.min(10, Math.round((lengthScore + paragraphScore + checklistScore) * 10) / 10))

  return { grade, wordCount, paragraphCount }
}

export default function Essay() {
  const { studentId } = useParams<{ studentId: StudentId }>()
  const data = useAppStore.getState().getStudentData(studentId as StudentId)
  const addEssayEntry = useAppStore((s) => s.addEssayEntry)
  const addXP = useAppStore((s) => s.addXP)

  const [text, setText] = useState('')
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [feedback, setFeedback] = useState<{
    grade: number
    wordCount: number
    paragraphCount: number
    uncheckedLabels: string[]
  } | null>(null)

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length
  const canSubmit = wordCount >= MIN_WORDS

  function toggleChecklist(id: string) {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleSubmit() {
    if (!studentId || !canSubmit) return
    const result = gradeEssay(text, checked.size, data.essays.checklist.length)
    const uncheckedLabels = data.essays.checklist.filter((item) => !checked.has(item.id)).map((item) => item.label.toLowerCase())
    addEssayEntry(studentId, {
      id: `essay-${Date.now()}`,
      label: data.essays.currentPrompt.theme,
      grade: result.grade,
    })
    addXP(studentId, 20)
    setFeedback({ ...result, uncheckedLabels })
    setText('')
    setChecked(new Set())
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Redação</h1>
        <p className="mt-1 text-ink-soft">Tema da semana</p>
      </div>

      <EssayCard currentPrompt={data.essays.currentPrompt} />

      {feedback && (
        <div className="animate-pop-in flex flex-col gap-2 rounded-xl2 bg-essay/20 p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-essay-ink">Redação enviada ✓</span>
            <span className="text-xl font-extrabold text-essay-ink">{feedback.grade.toFixed(1)}</span>
          </div>
          <p className="text-sm text-ink-soft">
            {feedback.wordCount} palavras em {feedback.paragraphCount} parágrafo(s). Esta é uma correção automática de
            estrutura (tamanho, parágrafos e itens do checklist) — não substitui a leitura de um professor.
          </p>
          {feedback.uncheckedLabels.length > 0 && (
            <p className="text-sm text-ink-soft">
              Pontos para melhorar na próxima: {feedback.uncheckedLabels.join(', ')}.
            </p>
          )}
        </div>
      )}

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escreva sua redação aqui..."
        rows={12}
        className="rounded-xl2 border border-ink/10 bg-white p-5 leading-relaxed shadow-soft outline-none focus:border-ink/30"
      />

      <EssayChecklist items={data.essays.checklist} checked={checked} onToggle={toggleChecklist} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full rounded-xl2 bg-ink px-6 py-3 font-semibold text-white transition-opacity disabled:opacity-40 sm:w-auto"
        >
          Enviar redação
        </button>
        <span className="text-sm text-ink-soft">
          {canSubmit ? 'Correção automática de estrutura ao enviar' : `Escreva pelo menos ${MIN_WORDS} palavras para enviar (${wordCount}/${MIN_WORDS})`}
        </span>
      </div>

      <EssayHistory entries={data.essays.history} />
    </div>
  )
}
