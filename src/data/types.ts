export type SubjectKey = 'matematica' | 'portugues' | 'redacao'

export interface StudentProfile {
  id: 'nicolas' | 'joao'
  name: string
  avatarColor: string
  currentGrade: string
  targetGrade: string
  examDate: string
}

export interface XPState {
  total: number
  level: number
  xpForNextLevel: number
  xpSpanForLevel: number
}

export interface StreakState {
  currentDays: number
  bestDays: number
  last7Days: ('done' | 'missed')[]
}

export interface ExamState {
  date: string
  daysRemaining: number
  weeksTotal: number
  currentWeek: number
}

export type MissionStageKind = 'aprender' | 'praticar' | 'escrever'

export interface MissionStageData {
  id: string
  kind: MissionStageKind
  title: string
  subject: SubjectKey
  minutes?: number
  targetQuestions?: { subject: SubjectKey; count: number }[]
  completed: boolean
  ctaLabel: string
  ctaRoute: string
}

export interface DailyMission {
  totalMinutes: number
  stages: MissionStageData[]
}

export interface CurrentFocusData {
  topic: string
  subject: SubjectKey
  reason: string
  metricLabel: string
  ctaLabel: string
  ctaRoute: string
}

export interface SubjectProgress {
  key: SubjectKey
  label: string
  percentComplete: number
  questionsAnswered: number
  accuracyRate: number
  averageGrade?: number
  color: 'math' | 'port' | 'essay'
}

export interface PerformanceOverview {
  daysStudied: number
  hoursStudied: number
  questionsAnswered: number
  accuracyRate: number
  mathAccuracy: number
  portAccuracy: number
  essaysCount: number
  simulationEvolution: { label: string; percent: number }[]
  strengths: { topic: string; percent: number }[]
  weaknesses: { topic: string; percent: number }[]
}

export type DayStatus = 'done' | 'today' | 'next' | 'future'

export interface JourneyActivity {
  subject: SubjectKey
  label: string
  done: boolean
}

export interface JourneyDayData {
  date: string
  weekday: string
  status: DayStatus
  activities: JourneyActivity[]
}

export interface JourneyWeek {
  id: string
  title: string
  subtitle: string
  days: JourneyDayData[]
}

export interface LessonSectionData {
  id: string
  type: 'text' | 'example' | 'attention' | 'summary' | 'image'
  title: string
  body: string
  imageCaption?: string
}

export interface LessonContent {
  id: string
  subject: SubjectKey
  title: string
  progressPercent: number
  sections: LessonSectionData[]
  exerciseSetId: string
}

export interface QuestionOption {
  id: string
  label: string
}

export interface Question {
  id: string
  subject: SubjectKey
  topic: string
  prompt: string
  media?: { kind: 'tirinha' | 'grafico' | 'tabela' | 'imagem'; caption: string }
  options: QuestionOption[]
  correctOptionId: string
  explanation: string
  stepByStep: string[]
}

export type ErrorStatus = 'recent' | 'review' | 'mastered'

export interface ErrorEntry {
  id: string
  subject: SubjectKey
  topic: string
  prompt: string
  status: ErrorStatus
  missedOn: string
}

export interface TopicErrors {
  topic: string
  subject: SubjectKey
  count: number
}

export interface ErrorNotebookData {
  bySubjectCount: Record<SubjectKey, number>
  topicBreakdown: TopicErrors[]
  entries: ErrorEntry[]
}

export interface EssayChecklistItem {
  id: string
  label: string
}

export interface EssayEntry {
  id: string
  label: string
  grade: number
  date: string
}

export interface EssayState {
  currentPrompt: {
    theme: string
    genre: string
    guidance: string
    expectedStructure: string[]
  }
  checklist: EssayChecklistItem[]
  history: EssayEntry[]
}

export interface SimulationSubjectResult {
  subject: SubjectKey
  correct: number
  total: number
}

export interface SimulationSummary {
  id: string
  label: string
  scopeLabel: string
  totalQuestions: number
  mathQuestions: number
  portQuestions: number
  hasEssay: boolean
  suggestedMinutes: number
  completed: boolean
  result?: {
    correct: number
    total: number
    bySubject: SimulationSubjectResult[]
    essayGrade?: number
    strengths: { topic: string; percent: number }[]
    weaknesses: { topic: string; percent: number }[]
  }
}

export interface Achievement {
  id: string
  icon: string
  title: string
  description: string
  unlocked: boolean
}

export interface StudentData {
  profile: StudentProfile
  xp: XPState
  streak: StreakState
  exam: ExamState
  dailyMission: DailyMission
  currentFocus: CurrentFocusData
  subjects: Record<SubjectKey, SubjectProgress>
  performanceOverview: PerformanceOverview
  journey: JourneyWeek[]
  lessons: Record<string, LessonContent>
  questionSets: Record<string, Question[]>
  errorNotebook: ErrorNotebookData
  essays: EssayState
  simulations: SimulationSummary[]
  achievements: Achievement[]
}
