import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import type { StudentId } from '../store/useAppStore'
import { EssayCard } from '../components/essay/EssayCard'
import { EssayChecklist } from '../components/essay/EssayChecklist'
import { EssayHistory } from '../components/essay/EssayHistory'

export default function Essay() {
  const { studentId } = useParams<{ studentId: StudentId }>()
  const data = useAppStore.getState().getStudentData(studentId as StudentId)
  const [text, setText] = useState('')

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Redação</h1>
        <p className="mt-1 text-ink-soft">Tema da semana</p>
      </div>

      <EssayCard currentPrompt={data.essays.currentPrompt} />

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escreva sua redação aqui..."
        rows={12}
        className="rounded-xl2 border border-ink/10 bg-white p-5 leading-relaxed shadow-soft outline-none focus:border-ink/30"
      />

      <EssayChecklist items={data.essays.checklist} />

      <div className="flex items-center gap-4">
        <button
          disabled
          className="rounded-xl2 bg-ink/10 px-6 py-3 font-semibold text-ink-soft"
        >
          Enviar redação
        </button>
        <span className="text-sm text-ink-soft">Em breve: correção automática</span>
      </div>

      <EssayHistory entries={data.essays.history} />
    </div>
  )
}
