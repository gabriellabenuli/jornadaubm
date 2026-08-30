import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nicolasData } from '../data/nicolasData'
import { joaoData } from '../data/joaoData'
import type {
  StudentData,
  SubjectKey,
  SubjectProgress,
  LessonContent,
  ErrorEntry,
  Achievement,
  EssayEntry,
  Question,
} from '../data/types'

export type StudentId = 'nicolas' | 'joao'

export interface SessionAnswer {
  questionId: string
  selectedOptionId: string
  correct: boolean
  subject: SubjectKey
  topic: string
  date: string
}

interface ErrorAddition {
  questionId: string
  date: string
}

interface LessonCompletion {
  lessonId: string
  date: string
}

interface AppStoreState {
  activeStudentId: StudentId | null
  sessionXP: Record<StudentId, number>
  completedStages: Record<StudentId, string[]>
  answers: Record<StudentId, SessionAnswer[]>
  errorNotebookAdditions: Record<StudentId, ErrorAddition[]>
  completedLessons: Record<StudentId, LessonCompletion[]>
  essayEntries: Record<StudentId, EssayEntry[]>
  avatarPhoto: Record<StudentId, string | null>
}

interface AppStoreActions {
  setActiveStudent: (id: StudentId) => void
  addXP: (studentId: StudentId, amount: number) => void
  completeStage: (studentId: StudentId, stageId: string) => void
  recordAnswer: (studentId: StudentId, answer: Omit<SessionAnswer, 'date'>) => void
  addToErrorNotebook: (studentId: StudentId, questionId: string) => void
  completeLesson: (studentId: StudentId, lessonId: string) => void
  addEssayEntry: (studentId: StudentId, entry: Omit<EssayEntry, 'date'> & { date?: string }) => void
  setAvatarPhoto: (studentId: StudentId, dataUrl: string | null) => void
  getStudentData: (studentId: StudentId) => StudentData
}

const baseData: Record<StudentId, StudentData> = { nicolas: nicolasData, joao: joaoData }

function localISODate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function findQuestion(base: StudentData, questionId: string): Question | undefined {
  for (const set of Object.values(base.questionSets)) {
    const found = set.find((q) => q.id === questionId)
    if (found) return found
  }
  return undefined
}

function computeStreak(dateSet: Set<string>) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let currentDays = 0
  const cursor = new Date(today)
  while (dateSet.has(localISODate(cursor))) {
    currentDays++
    cursor.setDate(cursor.getDate() - 1)
  }

  const sortedDates = Array.from(dateSet).sort()
  let bestDays = 0
  let run = 0
  let prevTime: number | null = null
  for (const iso of sortedDates) {
    const t = new Date(`${iso}T00:00:00`).getTime()
    run = prevTime !== null && t - prevTime === 86400000 ? run + 1 : 1
    bestDays = Math.max(bestDays, run)
    prevTime = t
  }
  bestDays = Math.max(bestDays, currentDays)

  const dow = today.getDay() // 0 = Sunday
  const monday = new Date(today)
  monday.setDate(today.getDate() + (dow === 0 ? -6 : 1 - dow))
  const last7Days: ('done' | 'missed')[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    last7Days.push(dateSet.has(localISODate(d)) ? 'done' : 'missed')
  }

  return { currentDays, bestDays, last7Days }
}

export const useAppStore = create<AppStoreState & AppStoreActions>()(
  persist(
    (set, get) => ({
      activeStudentId: null,
      sessionXP: { nicolas: 0, joao: 0 },
      completedStages: { nicolas: [], joao: [] },
      answers: { nicolas: [], joao: [] },
      errorNotebookAdditions: { nicolas: [], joao: [] },
      completedLessons: { nicolas: [], joao: [] },
      essayEntries: { nicolas: [], joao: [] },
      avatarPhoto: { nicolas: null, joao: null },

      setActiveStudent: (id) => set({ activeStudentId: id }),

      setAvatarPhoto: (studentId, dataUrl) =>
        set((s) => ({ avatarPhoto: { ...s.avatarPhoto, [studentId]: dataUrl } })),

      addXP: (studentId, amount) =>
        set((s) => ({ sessionXP: { ...s.sessionXP, [studentId]: s.sessionXP[studentId] + amount } })),

      completeStage: (studentId, stageId) =>
        set((s) => ({
          completedStages: {
            ...s.completedStages,
            [studentId]: Array.from(new Set([...s.completedStages[studentId], stageId])),
          },
        })),

      recordAnswer: (studentId, answer) =>
        set((s) => ({
          answers: {
            ...s.answers,
            [studentId]: [...s.answers[studentId], { ...answer, date: localISODate(new Date()) }],
          },
        })),

      addToErrorNotebook: (studentId, questionId) =>
        set((s) => {
          if (s.errorNotebookAdditions[studentId].some((a) => a.questionId === questionId)) return s
          return {
            errorNotebookAdditions: {
              ...s.errorNotebookAdditions,
              [studentId]: [...s.errorNotebookAdditions[studentId], { questionId, date: localISODate(new Date()) }],
            },
          }
        }),

      completeLesson: (studentId, lessonId) =>
        set((s) => {
          if (s.completedLessons[studentId].some((l) => l.lessonId === lessonId)) return s
          return {
            completedLessons: {
              ...s.completedLessons,
              [studentId]: [...s.completedLessons[studentId], { lessonId, date: localISODate(new Date()) }],
            },
          }
        }),

      addEssayEntry: (studentId, entry) =>
        set((s) => ({
          essayEntries: {
            ...s.essayEntries,
            [studentId]: [...s.essayEntries[studentId], { ...entry, date: entry.date ?? localISODate(new Date()) }],
          },
        })),

      getStudentData: (studentId) => {
        const s = get()
        const base = baseData[studentId]
        const sessionAnswers = s.answers[studentId]
        const completedLessonEntries = s.completedLessons[studentId]
        const sessionEssays = s.essayEntries[studentId]
        const completedLessonIds = new Set(completedLessonEntries.map((l) => l.lessonId))

        // --- subjects ---
        const subjectStats: Record<SubjectKey, { answered: number; correct: number }> = {
          matematica: { answered: 0, correct: 0 },
          portugues: { answered: 0, correct: 0 },
          redacao: { answered: 0, correct: 0 },
        }
        for (const a of sessionAnswers) {
          subjectStats[a.subject].answered++
          if (a.correct) subjectStats[a.subject].correct++
        }
        const totalQuestionsBySubject: Record<SubjectKey, number> = { matematica: 0, portugues: 0, redacao: 0 }
        for (const set of Object.values(base.questionSets)) {
          for (const q of set) totalQuestionsBySubject[q.subject]++
        }

        const allEssayGrades = [...base.essays.history, ...sessionEssays].map((e) => e.grade)
        const essaysCount = allEssayGrades.length
        const averageGrade =
          essaysCount > 0 ? Math.round((allEssayGrades.reduce((sum, g) => sum + g, 0) / essaysCount) * 10) / 10 : undefined

        const subjects: Record<SubjectKey, SubjectProgress> = {
          matematica: {
            ...base.subjects.matematica,
            questionsAnswered: subjectStats.matematica.answered,
            accuracyRate:
              subjectStats.matematica.answered > 0
                ? Math.round((subjectStats.matematica.correct / subjectStats.matematica.answered) * 100)
                : 0,
            percentComplete:
              totalQuestionsBySubject.matematica > 0
                ? Math.min(100, Math.round((subjectStats.matematica.answered / totalQuestionsBySubject.matematica) * 100))
                : 0,
          },
          portugues: {
            ...base.subjects.portugues,
            questionsAnswered: subjectStats.portugues.answered,
            accuracyRate:
              subjectStats.portugues.answered > 0
                ? Math.round((subjectStats.portugues.correct / subjectStats.portugues.answered) * 100)
                : 0,
            percentComplete:
              totalQuestionsBySubject.portugues > 0
                ? Math.min(100, Math.round((subjectStats.portugues.answered / totalQuestionsBySubject.portugues) * 100))
                : 0,
          },
          redacao: {
            ...base.subjects.redacao,
            percentComplete: Math.min(100, Math.round((essaysCount / 5) * 100)),
            averageGrade,
          },
        }

        // --- error notebook ---
        const errorEntries: ErrorEntry[] = []
        const seenQuestionIds = new Set<string>()
        for (const addition of s.errorNotebookAdditions[studentId]) {
          if (seenQuestionIds.has(addition.questionId)) continue
          const question = findQuestion(base, addition.questionId)
          if (!question) continue
          seenQuestionIds.add(addition.questionId)
          errorEntries.push({
            id: addition.questionId,
            subject: question.subject,
            topic: question.topic,
            prompt: question.prompt,
            status: 'recent',
            missedOn: addition.date,
          })
        }
        const bySubjectCount: Record<SubjectKey, number> = { matematica: 0, portugues: 0, redacao: 0 }
        for (const e of errorEntries) bySubjectCount[e.subject]++
        const topicMap = new Map<string, { topic: string; subject: SubjectKey; count: number }>()
        for (const e of errorEntries) {
          const key = `${e.subject}|${e.topic}`
          const existing = topicMap.get(key)
          if (existing) existing.count++
          else topicMap.set(key, { topic: e.topic, subject: e.subject, count: 1 })
        }
        const topicBreakdown = Array.from(topicMap.values()).sort((a, b) => b.count - a.count)

        // --- lessons ---
        const lessons: Record<string, LessonContent> = {}
        for (const [id, lesson] of Object.entries(base.lessons)) {
          lessons[id] = { ...lesson, progressPercent: completedLessonIds.has(id) ? 100 : lesson.progressPercent }
        }

        // --- daily mission ---
        const essaySubmitted = essaysCount > 0
        const dailyMission = {
          ...base.dailyMission,
          stages: base.dailyMission.stages.map((stage) => {
            let completed = stage.completed || s.completedStages[studentId].includes(stage.id)
            if (!completed && stage.kind === 'aprender') {
              const targetLessonId = stage.ctaRoute.split('/').pop()
              completed = !!targetLessonId && completedLessonIds.has(targetLessonId)
            }
            if (!completed && stage.kind === 'escrever') {
              completed = essaySubmitted
            }
            return { ...stage, completed }
          }),
        }

        // --- streak / days studied ---
        const activityDates = new Set<string>([
          ...sessionAnswers.map((a) => a.date),
          ...completedLessonEntries.map((l) => l.date),
          ...sessionEssays.map((e) => e.date),
        ])
        const streak = computeStreak(activityDates)

        // --- performance overview ---
        const totalAnswered = sessionAnswers.length
        const totalCorrect = sessionAnswers.filter((a) => a.correct).length
        const accuracyRate = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0
        const hoursStudied =
          Math.round(((totalAnswered * 1.5 + completedLessonEntries.length * 15 + essaysCount * 30) / 60) * 10) / 10

        const topicStats = new Map<string, { subject: SubjectKey; correct: number; total: number }>()
        for (const a of sessionAnswers) {
          const t = topicStats.get(a.topic) ?? { subject: a.subject, correct: 0, total: 0 }
          t.total++
          if (a.correct) t.correct++
          topicStats.set(a.topic, t)
        }
        const topicPercents = Array.from(topicStats.entries())
          .filter(([, t]) => t.total >= 2)
          .map(([topic, t]) => ({ topic, percent: Math.round((t.correct / t.total) * 100) }))
        const strengths = topicPercents
          .filter((t) => t.percent >= 70)
          .sort((a, b) => b.percent - a.percent)
          .slice(0, 3)
        const weaknesses = topicPercents
          .filter((t) => t.percent < 70)
          .sort((a, b) => a.percent - b.percent)
          .slice(0, 3)

        const performanceOverview = {
          ...base.performanceOverview,
          daysStudied: activityDates.size,
          hoursStudied,
          questionsAnswered: totalAnswered,
          accuracyRate,
          mathAccuracy: subjects.matematica.accuracyRate,
          portAccuracy: subjects.portugues.accuracyRate,
          essaysCount,
          strengths,
          weaknesses,
        }

        // --- achievements ---
        let bestCorrectStreak = 0
        let run = 0
        for (const a of sessionAnswers) {
          run = a.correct ? run + 1 : 0
          bestCorrectStreak = Math.max(bestCorrectStreak, run)
        }
        const interpretacaoCount = sessionAnswers.filter((a) => a.topic.toLowerCase().includes('interpreta')).length
        const achievements: Achievement[] = base.achievements.map((ach) => {
          let unlocked = ach.unlocked
          if (ach.id === 'ach-1') unlocked = streak.bestDays >= 7
          if (ach.id === 'ach-2') unlocked = bestCorrectStreak >= 10
          if (ach.id === 'ach-3') unlocked = interpretacaoCount >= 50
          if (ach.id === 'ach-4') unlocked = subjectStats.matematica.answered >= 100
          if (ach.id === 'ach-5') unlocked = essaysCount >= 5
          return { ...ach, unlocked }
        })

        // --- exam countdown (recomputed from real date, not the static seed value) ---
        const examDate = new Date(`${base.exam.date}T00:00:00`)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const daysRemaining = Math.max(0, Math.ceil((examDate.getTime() - today.getTime()) / 86400000))

        return {
          ...base,
          xp: { ...base.xp, total: base.xp.total + s.sessionXP[studentId] },
          exam: { ...base.exam, daysRemaining },
          streak,
          dailyMission,
          subjects,
          performanceOverview,
          lessons,
          errorNotebook: { bySubjectCount, topicBreakdown, entries: errorEntries },
          essays: { ...base.essays, history: [...base.essays.history, ...sessionEssays] },
          achievements,
        }
      },
    }),
    { name: 'ubm-study-app' },
  ),
)
