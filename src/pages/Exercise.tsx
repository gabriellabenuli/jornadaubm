import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import type { StudentId } from '../store/useAppStore'
import { QuestionProgress } from '../components/exercise/QuestionProgress'
import { QuestionCard } from '../components/exercise/QuestionCard'
import { AnswerFeedback } from '../components/exercise/AnswerFeedback'

export default function Exercise() {
  const { studentId, subjectSlug, setId } = useParams<{
    studentId: StudentId
    subjectSlug: string
    setId: string
  }>()
  const navigate = useNavigate()
  const data = useAppStore.getState().getStudentData(studentId as StudentId)
  const addXP = useAppStore((s) => s.addXP)
  const recordAnswer = useAppStore((s) => s.recordAnswer)
  const addToErrorNotebook = useAppStore((s) => s.addToErrorNotebook)
  const completeStage = useAppStore((s) => s.completeStage)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)

  const questions = setId ? data.questionSets[setId] : undefined
  if (!questions) return <Navigate to={`/${studentId}/materia/${subjectSlug}`} replace />

  const question = questions[currentIndex]
  const isLast = currentIndex === questions.length - 1

  function handleAnswer() {
    if (!selectedOptionId) return
    const correct = selectedOptionId === question.correctOptionId
    recordAnswer(studentId as StudentId, { questionId: question.id, selectedOptionId, correct })
    addXP(studentId as StudentId, correct ? 5 : 0)
    setRevealed(true)
  }

  function handleNext() {
    if (isLast) {
      const stage = data.dailyMission.stages.find(
        (s) => s.kind === 'praticar' && s.targetQuestions?.some((t) => t.subject === question.subject),
      )
      if (stage) completeStage(studentId as StudentId, stage.id)
      navigate(`/${studentId}`)
      return
    }
    setCurrentIndex((i) => i + 1)
    setSelectedOptionId(null)
    setRevealed(false)
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <QuestionProgress current={currentIndex + 1} total={questions.length} />

      <QuestionCard
        question={question}
        selectedOptionId={selectedOptionId}
        revealed={revealed}
        onSelect={(id) => !revealed && setSelectedOptionId(id)}
      />

      {!revealed ? (
        <button
          onClick={handleAnswer}
          disabled={!selectedOptionId}
          className="self-start rounded-xl2 bg-ink px-6 py-3 font-semibold text-white transition-opacity disabled:opacity-40"
        >
          Responder
        </button>
      ) : (
        <AnswerFeedback
          question={question}
          selectedOptionId={selectedOptionId as string}
          onAddToErrorNotebook={() => addToErrorNotebook(studentId as StudentId, question.id)}
          onNext={handleNext}
          isLast={isLast}
        />
      )}
    </div>
  )
}
