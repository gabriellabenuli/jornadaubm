import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nicolasData } from '../data/nicolasData'
import { joaoData } from '../data/joaoData'
import type { StudentData } from '../data/types'

export type StudentId = 'nicolas' | 'joao'

export interface SessionAnswer {
  questionId: string
  selectedOptionId: string
  correct: boolean
}

interface AppStoreState {
  activeStudentId: StudentId | null
  sessionXP: Record<StudentId, number>
  completedStages: Record<StudentId, string[]>
  answers: Record<StudentId, SessionAnswer[]>
  errorNotebookAdditions: Record<StudentId, string[]>
  avatarPhoto: Record<StudentId, string | null>
}

interface AppStoreActions {
  setActiveStudent: (id: StudentId) => void
  addXP: (studentId: StudentId, amount: number) => void
  completeStage: (studentId: StudentId, stageId: string) => void
  recordAnswer: (studentId: StudentId, answer: SessionAnswer) => void
  addToErrorNotebook: (studentId: StudentId, questionId: string) => void
  setAvatarPhoto: (studentId: StudentId, dataUrl: string | null) => void
  getStudentData: (studentId: StudentId) => StudentData
}

const baseData: Record<StudentId, StudentData> = { nicolas: nicolasData, joao: joaoData }

export const useAppStore = create<AppStoreState & AppStoreActions>()(
  persist(
    (set, get) => ({
      activeStudentId: null,
      sessionXP: { nicolas: 0, joao: 0 },
      completedStages: { nicolas: [], joao: [] },
      answers: { nicolas: [], joao: [] },
      errorNotebookAdditions: { nicolas: [], joao: [] },
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
        set((s) => ({ answers: { ...s.answers, [studentId]: [...s.answers[studentId], answer] } })),

      addToErrorNotebook: (studentId, questionId) =>
        set((s) => ({
          errorNotebookAdditions: {
            ...s.errorNotebookAdditions,
            [studentId]: Array.from(new Set([...s.errorNotebookAdditions[studentId], questionId])),
          },
        })),

      getStudentData: (studentId) => {
        const s = get()
        const base = baseData[studentId]
        return {
          ...base,
          xp: { ...base.xp, total: base.xp.total + s.sessionXP[studentId] },
          dailyMission: {
            ...base.dailyMission,
            stages: base.dailyMission.stages.map((stage) => ({
              ...stage,
              completed: stage.completed || s.completedStages[studentId].includes(stage.id),
            })),
          },
        }
      },
    }),
    { name: 'ubm-study-app' },
  ),
)
