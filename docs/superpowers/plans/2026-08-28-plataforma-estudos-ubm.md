# Plataforma de Estudos Gamificada UBM — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully navigable, mocked-data frontend for the two-student (Nicolas/João) gamified UBM exam-prep platform described in `docs/superpowers/specs/2026-08-28-plataforma-estudos-ubm-design.md`.

**Architecture:** React 18 + Vite + TypeScript SPA. React Router nests all authenticated routes under `/:studentId`. Zustand store holds active profile + session-only progress deltas (answered questions, XP earned this session, completed mission stages), persisted to localStorage keyed by `studentId`. Two static, fully-typed mock datasets (`nicolasData.ts`, `joaoData.ts`) implement a shared `StudentData` interface and are the source of truth for everything that isn't session progress. Tailwind CSS for styling; Plus Jakarta Sans via Google Fonts.

**Tech Stack:** React 18, TypeScript, Vite, React Router v6, Zustand, Tailwind CSS, lucide-react (icons), Recharts (small charts for Performance page).

## Global Constraints

- Desktop-first: design for 1366/1440/1920px, max content width ~1400px; must remain usable at tablet width (768–1024px); mobile not required this phase.
- No backend calls of any kind — all data from `src/data/*.ts` and the Zustand store.
- Palette: Matemática = azul/lilás, Português = pêssego, Redação = verde suave, Revisão = amarelo suave, Simulados = own accent color. Background off-white/warm white, near-black graphite text, rounded corners, near-flat shadows.
- Font: Plus Jakarta Sans (Google Fonts import), sans-serif fallback stack.
- Nicolas and João must never share mutable state — switching profile via URL `studentId` must fully reload the other student's data.
- Every component listed in the spec's `components/` tree must exist as its own file (no god-components).
- Testing per task = `npm run typecheck` (tsc --noEmit) + `npm run lint` both clean, plus a visual check in the Browser tool confirming the described behavior. Unit tests (Vitest) are required only for pure logic: `store/useAppStore.ts` and any `src/data` derived-selector helpers.

---

### Task 1: Project scaffold

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `tailwind.config.ts`, `postcss.config.js`, `.gitignore`

**Interfaces:**
- Produces: a running Vite dev server rendering `<App />` at `/`, Tailwind functional, Google Font loaded.

- [ ] **Step 1: Scaffold Vite React-TS app**

```bash
cd "/Users/gabriellabenuli/Documents/Nicolas e João/Sistema"
npm create vite@latest . -- --template react-ts
```

- [ ] **Step 2: Install dependencies**

```bash
npm install react-router-dom zustand lucide-react recharts
npm install -D tailwindcss postcss autoprefixer vitest @testing-library/react jsdom
npx tailwindcss init -p
```

- [ ] **Step 3: Configure Tailwind**

`tailwind.config.ts`:
```ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1E1B1A',
        surface: '#FBF9F6',
        math: { DEFAULT: '#D7D6FB', dark: '#6C63E0' },
        port: { DEFAULT: '#FBDDCB', dark: '#E0793F' },
        essay: { DEFAULT: '#D8EFDD', dark: '#4C9A63' },
        review: { DEFAULT: '#FBF0C8', dark: '#C9A227' },
        sim: { DEFAULT: '#FDE1EC', dark: '#D6437E' },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(30,27,26,0.04), 0 4px 12px rgba(30,27,26,0.04)',
      },
    },
  },
  plugins: [],
} satisfies Config
```

- [ ] **Step 4: Global CSS + font import**

`src/index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body, #root { height: 100%; }
body { @apply bg-surface text-ink font-sans antialiased; }
```

- [ ] **Step 5: Add `typecheck` and `test` npm scripts**

In `package.json` `"scripts"`, add:
```json
"typecheck": "tsc --noEmit",
"test": "vitest run"
```

- [ ] **Step 6: Verify dev server runs**

```bash
npm run dev -- --port 5173 &
sleep 2 && curl -s http://localhost:5173 | head -5
```
Expected: HTML containing `<div id="root">`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite React-TS app with Tailwind"
```

---

### Task 2: Shared types and mock data — Nicolas

**Files:**
- Create: `src/data/types.ts`
- Create: `src/data/nicolasData.ts`
- Test: `src/data/__tests__/nicolasData.test.ts`

**Interfaces:**
- Produces (in `types.ts`, all exported):
```ts
export type SubjectKey = 'matematica' | 'portugues' | 'redacao'

export interface StudentProfile {
  id: 'nicolas' | 'joao'
  name: string
  avatarColor: string
  currentGrade: string
  targetGrade: string
  examDate: string // ISO date
}

export interface XPState { total: number; level: number; xpForNextLevel: number }

export interface StreakState {
  currentDays: number
  bestDays: number
  last7Days: ('done' | 'missed')[] // Mon..Sun
}

export interface ExamState {
  date: string
  daysRemaining: number
  weeksTotal: number
  currentWeek: number
}

export type MissionStageKind = 'aprender' | 'praticar' | 'escrever'

export interface MissionStage {
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
  stages: MissionStage[]
}

export interface CurrentFocus {
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
  averageGrade?: number // redacao only
  color: 'math' | 'port' | 'essay'
}

export interface PerformanceOverview {
  daysStudied: number
  hoursStudied: number
  questionsAnswered: number
  accuracyRate: number
  simulationEvolution: { label: string; percent: number }[]
  strengths: { topic: string; percent: number }[]
  weaknesses: { topic: string; percent: number }[]
}

export type DayStatus = 'done' | 'today' | 'next' | 'future'

export interface JourneyActivity { subject: SubjectKey; label: string; done: boolean }

export interface JourneyDay {
  date: string
  weekday: string
  status: DayStatus
  activities: JourneyActivity[]
}

export interface JourneyWeek {
  id: string
  title: string
  subtitle: string
  days: JourneyDay[]
}

export interface LessonSection {
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
  sections: LessonSection[]
  exerciseSetId: string
}

export interface QuestionOption { id: string; label: string }

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

export interface TopicErrors { topic: string; subject: SubjectKey; count: number }

export interface ErrorNotebook {
  bySubjectCount: Record<SubjectKey, number>
  topicBreakdown: TopicErrors[]
  entries: ErrorEntry[]
}

export interface EssayChecklistItem { id: string; label: string }

export interface EssayEntry { id: string; label: string; grade: number; date: string }

export interface EssayState {
  currentPrompt: { theme: string; genre: string; guidance: string; expectedStructure: string[] }
  checklist: EssayChecklistItem[]
  history: EssayEntry[]
}

export interface SimulationSubjectResult { subject: SubjectKey; correct: number; total: number }

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
  currentFocus: CurrentFocus
  subjects: Record<SubjectKey, SubjectProgress>
  performanceOverview: PerformanceOverview
  journey: JourneyWeek[]
  lessons: Record<string, LessonContent>
  questionSets: Record<string, Question[]>
  errorNotebook: ErrorNotebook
  essays: EssayState
  simulations: SimulationSummary[]
  achievements: Achievement[]
}
```

- [ ] **Step 1: Write `src/data/types.ts`** with the exact interfaces above.

- [ ] **Step 2: Write the failing test**

`src/data/__tests__/nicolasData.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { nicolasData } from '../nicolasData'

describe('nicolasData', () => {
  it('has a consistent profile id', () => {
    expect(nicolasData.profile.id).toBe('nicolas')
  })

  it('every dailyMission stage ctaRoute points to an existing lesson or questionSet', () => {
    for (const stage of nicolasData.dailyMission.stages) {
      if (stage.kind === 'aprender') {
        const lessonId = stage.ctaRoute.split('/').pop()!
        expect(nicolasData.lessons[lessonId]).toBeDefined()
      }
    }
  })

  it('every lesson exerciseSetId exists in questionSets', () => {
    for (const lesson of Object.values(nicolasData.lessons)) {
      expect(nicolasData.questionSets[lesson.exerciseSetId]).toBeDefined()
    }
  })

  it('accuracyRate values are between 0 and 100', () => {
    for (const subject of Object.values(nicolasData.subjects)) {
      expect(subject.accuracyRate).toBeGreaterThanOrEqual(0)
      expect(subject.accuracyRate).toBeLessThanOrEqual(100)
    }
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

```bash
npm run test -- nicolasData
```
Expected: FAIL — `Cannot find module '../nicolasData'`.

- [ ] **Step 4: Write `src/data/nicolasData.ts`**

Populate a full `StudentData` object matching the spec's Nicolas profile: 7º ano → 8º ano, exam `2026-09-26`, streak 7 days, stronger in Matemática, studying equações do 1º grau / predicação verbal / porcentagem / crônica. Include:
- `dailyMission` with 3 stages: `aprender` (Matemática, "Equações do 1º grau", 15 min, ctaRoute `/nicolas/materia/matematica/aula/equacoes-1grau`), `praticar` (20 Matemática + 15 Português questions, ctaRoute `/nicolas/materia/matematica/exercicios/pratica-equacoes` — this set mixes both subjects' question ids), `escrever` (Redação, "Crônica", ctaRoute `/nicolas/redacao`).
- `lessons['equacoes-1grau']`: full `LessonContent` with 8–9 `sections` covering the worked example from spec section 11 (o que são equações, isolando a incógnita, exemplo resolvido, atenção a erro comum, resumo visual), `exerciseSetId: 'pratica-equacoes'`.
- `questionSets['pratica-equacoes']`: at least 6 `Question` objects mixing `matematica` and `portugues`, at least one with `media: { kind: 'tirinha', ... }` per spec section 13.
- `errorNotebook`, `essays` (3 history entries: 7.5, 8.0, 8.7), `simulations` (4 entries, `SIMULADO 01..04`, cumulative scope, 3 completed with results showing 62% → 69% → 80% evolution, 1 upcoming `completed: false`), `achievements` (mix of unlocked/locked matching spec section 18), `journey` (5 `JourneyWeek`s: Semana 1–4 + Semana Final, each with 5–7 `JourneyDay`s, statuses `done`/`today`/`next`/`future` consistent with `streak.currentDays`).

- [ ] **Step 5: Run test to verify it passes**

```bash
npm run test -- nicolasData
```
Expected: PASS, 4/4 tests.

- [ ] **Step 6: Commit**

```bash
git add src/data/types.ts src/data/nicolasData.ts src/data/__tests__/nicolasData.test.ts
git commit -m "feat: add shared types and Nicolas mock dataset"
```

---

### Task 3: Mock data — João

**Files:**
- Create: `src/data/joaoData.ts`
- Test: `src/data/__tests__/joaoData.test.ts`

**Interfaces:**
- Consumes: `StudentData` from `src/data/types.ts` (Task 2).
- Produces: `export const joaoData: StudentData`.

- [ ] **Step 1: Write the failing test** (mirror Task 2's test file, importing `joaoData`, asserting `profile.id === 'joao'`).

- [ ] **Step 2: Run test to verify it fails** — `npm run test -- joaoData` → FAIL, module not found.

- [ ] **Step 3: Write `src/data/joaoData.ts`**

Full `StudentData` for João: 5º ano → 6º ano, exam `2026-09-26`, streak 4 days, stronger in Português, studying frações / interpretação de tirinhas / números decimais / mitos. Values must differ from Nicolas's (different XP total/level, different question counts, different accuracy numbers, different journey weeks/titles reflecting a 5º-ano-appropriate difficulty). Reuse the same structural shape as Task 2 (lesson `fracoes`, exerciseSetId `pratica-fracoes`, at least one tirinha question about mitos/interpretation, 4 simulations with a distinct evolution curve, achievements with different unlocked set, essay history with 3 different grades).

- [ ] **Step 4: Run test to verify it passes** — `npm run test -- joaoData` → PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/joaoData.ts src/data/__tests__/joaoData.test.ts
git commit -m "feat: add João mock dataset, independent from Nicolas"
```

---

### Task 4: Zustand store

**Files:**
- Create: `src/store/useAppStore.ts`
- Test: `src/store/__tests__/useAppStore.test.ts`

**Interfaces:**
- Consumes: `nicolasData`, `joaoData` (Tasks 2–3), `StudentData`, `Question` types.
- Produces:
```ts
export interface SessionAnswer { questionId: string; selectedOptionId: string; correct: boolean }

export interface AppStore {
  activeStudentId: 'nicolas' | 'joao' | null
  setActiveStudent: (id: 'nicolas' | 'joao') => void
  sessionXP: Record<'nicolas' | 'joao', number>
  addXP: (studentId: 'nicolas' | 'joao', amount: number) => void
  completedStages: Record<string, string[]> // studentId -> stageIds
  completeStage: (studentId: 'nicolas' | 'joao', stageId: string) => void
  answers: Record<string, SessionAnswer[]> // studentId -> answers this session
  recordAnswer: (studentId: 'nicolas' | 'joao', answer: SessionAnswer) => void
  errorNotebookAdditions: Record<string, string[]> // studentId -> extra questionIds flagged
  addToErrorNotebook: (studentId: 'nicolas' | 'joao', questionId: string) => void
  getStudentData: (studentId: 'nicolas' | 'joao') => StudentData
}
```
`getStudentData` returns the base mock (`nicolasData`/`joaoData`) with `xp.total` incremented by `sessionXP[studentId]` and `dailyMission.stages[].completed` OR'd with `completedStages[studentId]`.

- [ ] **Step 1: Write the failing test**

`src/store/__tests__/useAppStore.test.ts`:
```ts
import { describe, it, expect, beforeEach } from 'vitest'
import { useAppStore } from '../useAppStore'

beforeEach(() => {
  useAppStore.setState({
    activeStudentId: null,
    sessionXP: { nicolas: 0, joao: 0 },
    completedStages: { nicolas: [], joao: [] },
    answers: { nicolas: [], joao: [] },
    errorNotebookAdditions: { nicolas: [], joao: [] },
  })
})

describe('useAppStore', () => {
  it('setActiveStudent updates activeStudentId', () => {
    useAppStore.getState().setActiveStudent('nicolas')
    expect(useAppStore.getState().activeStudentId).toBe('nicolas')
  })

  it('addXP is additive and scoped per student', () => {
    useAppStore.getState().addXP('nicolas', 20)
    useAppStore.getState().addXP('nicolas', 5)
    useAppStore.getState().addXP('joao', 100)
    expect(useAppStore.getState().sessionXP.nicolas).toBe(25)
    expect(useAppStore.getState().sessionXP.joao).toBe(100)
  })

  it('getStudentData reflects session XP on top of base mock', () => {
    const base = useAppStore.getState().getStudentData('nicolas').xp.total
    useAppStore.getState().addXP('nicolas', 50)
    const after = useAppStore.getState().getStudentData('nicolas').xp.total
    expect(after).toBe(base + 50)
  })

  it('completeStage marks the matching dailyMission stage as completed', () => {
    const data = useAppStore.getState().getStudentData('nicolas')
    const stageId = data.dailyMission.stages[0].id
    useAppStore.getState().completeStage('nicolas', stageId)
    const updated = useAppStore.getState().getStudentData('nicolas')
    expect(updated.dailyMission.stages[0].completed).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to verify it fails** — `npm run test -- useAppStore` → FAIL, module not found.

- [ ] **Step 3: Implement `src/store/useAppStore.ts`**

```ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nicolasData } from '../data/nicolasData'
import { joaoData } from '../data/joaoData'
import type { StudentData } from '../data/types'

type StudentId = 'nicolas' | 'joao'

export interface SessionAnswer { questionId: string; selectedOptionId: string; correct: boolean }

interface AppStoreState {
  activeStudentId: StudentId | null
  sessionXP: Record<StudentId, number>
  completedStages: Record<StudentId, string[]>
  answers: Record<StudentId, SessionAnswer[]>
  errorNotebookAdditions: Record<StudentId, string[]>
}

interface AppStoreActions {
  setActiveStudent: (id: StudentId) => void
  addXP: (studentId: StudentId, amount: number) => void
  completeStage: (studentId: StudentId, stageId: string) => void
  recordAnswer: (studentId: StudentId, answer: SessionAnswer) => void
  addToErrorNotebook: (studentId: StudentId, questionId: string) => void
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

      setActiveStudent: (id) => set({ activeStudentId: id }),

      addXP: (studentId, amount) =>
        set((s) => ({ sessionXP: { ...s.sessionXP, [studentId]: s.sessionXP[studentId] + amount } })),

      completeStage: (studentId, stageId) =>
        set((s) => ({
          completedStages: {
            ...s.completedStages,
            [studentId]: [...new Set([...s.completedStages[studentId], stageId])],
          },
        })),

      recordAnswer: (studentId, answer) =>
        set((s) => ({ answers: { ...s.answers, [studentId]: [...s.answers[studentId], answer] } })),

      addToErrorNotebook: (studentId, questionId) =>
        set((s) => ({
          errorNotebookAdditions: {
            ...s.errorNotebookAdditions,
            [studentId]: [...new Set([...s.errorNotebookAdditions[studentId], questionId])],
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
```

- [ ] **Step 4: Run test to verify it passes** — `npm run test -- useAppStore` → PASS, 4/4.

- [ ] **Step 5: Commit**

```bash
git add src/store/useAppStore.ts src/store/__tests__/useAppStore.test.ts
git commit -m "feat: add Zustand store for active profile and session progress"
```

---

### Task 5: Shared primitives (Badge, ProgressBar, StatCard)

**Files:**
- Create: `src/components/shared/Badge.tsx`
- Create: `src/components/shared/ProgressBar.tsx`
- Create: `src/components/shared/StatCard.tsx`

**Interfaces:**
- Produces:
```ts
// Badge.tsx
export function Badge(props: { children: React.ReactNode; tone?: 'math' | 'port' | 'essay' | 'review' | 'sim' | 'neutral' }): JSX.Element
// ProgressBar.tsx
export function ProgressBar(props: { percent: number; tone?: 'math' | 'port' | 'essay' | 'review' | 'sim' | 'neutral'; height?: 'sm' | 'md' }): JSX.Element
// StatCard.tsx
export function StatCard(props: { value: string; label: string; icon?: React.ReactNode }): JSX.Element
```

- [ ] **Step 1: Implement `Badge.tsx`** — pill with tone-based background (`bg-math`, `bg-port`, etc.), `text-ink/70`, `rounded-full px-3 py-1 text-xs font-semibold`.

- [ ] **Step 2: Implement `ProgressBar.tsx`** — track `bg-ink/5 rounded-full overflow-hidden`, fill `bg-{tone}-dark` width `${percent}%`, `transition-all duration-500`.

- [ ] **Step 3: Implement `StatCard.tsx`** — `bg-white rounded-xl2 shadow-soft p-5 flex flex-col gap-1`, large `text-3xl font-extrabold` value, `text-sm text-ink/60` label.

- [ ] **Step 4: Verify with typecheck**

```bash
npm run typecheck
```
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/shared
git commit -m "feat: add shared Badge, ProgressBar, StatCard primitives"
```

---

### Task 6: App shell — AppSidebar, StudentHeader, PageShell

**Files:**
- Create: `src/components/layout/AppSidebar.tsx`
- Create: `src/components/layout/StudentHeader.tsx`
- Create: `src/components/layout/PageShell.tsx`

**Interfaces:**
- Consumes: `useAppStore.getStudentData`, `StudentData['profile']`, `XPState`.
- Produces:
```ts
export function AppSidebar(props: { studentId: 'nicolas' | 'joao' }): JSX.Element
export function StudentHeader(props: { profile: StudentProfile; xp: XPState; daysRemaining: number }): JSX.Element
export function PageShell(props: { children: React.ReactNode }): JSX.Element // reads :studentId via useParams, renders AppSidebar + <Outlet/> area
```

- [ ] **Step 1: Implement `AppSidebar.tsx`**

Fixed-width (`w-64`) left column, `bg-white border-r border-ink/5`, nav items (using `NavLink` from react-router-dom) for: Início (`/:studentId`), Jornada (`/:studentId/jornada`), Matemática (`/:studentId/materia/matematica`), Português (`/:studentId/materia/portugues`), Redação (`/:studentId/redacao`), Simulados (`/:studentId/simulados`), Caderno de erros (`/:studentId/caderno-de-erros`), Conquistas (`/:studentId/conquistas`), Desempenho (`/:studentId/desempenho`). Active link gets `bg-ink text-white rounded-xl2`. Footer: "Trocar perfil" link to `/`, using lucide-react `ArrowLeftRight` icon.

- [ ] **Step 2: Implement `StudentHeader.tsx`**

Greeting based on current hour (`Bom dia`/`Boa tarde`/`Boa noite`) + `{profile.name} 👋`, subtext "Vamos avançar mais um pouco hoje?", right-aligned block showing `Faltam {daysRemaining} dias para a prova`, `Nível {xp.level}` and `{xp.total} XP` in small text, with an `XPBar` (Task 7) beneath.

- [ ] **Step 3: Implement `PageShell.tsx`**

```tsx
import { Outlet, useParams, Navigate } from 'react-router-dom'
import { AppSidebar } from './AppSidebar'

export function PageShell() {
  const { studentId } = useParams<{ studentId: 'nicolas' | 'joao' }>()
  if (studentId !== 'nicolas' && studentId !== 'joao') return <Navigate to="/" replace />
  return (
    <div className="flex min-h-screen">
      <AppSidebar studentId={studentId} />
      <main className="flex-1 max-w-[1400px] mx-auto px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}
```

- [ ] **Step 4: Verify with typecheck** — `npm run typecheck` → no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout
git commit -m "feat: add AppSidebar, StudentHeader, PageShell layout components"
```

---

### Task 7: Dashboard gamification components — XPBar, ExamCountdown, JourneyTimeline, StudyStreak

**Files:**
- Create: `src/components/dashboard/XPBar.tsx`
- Create: `src/components/dashboard/ExamCountdown.tsx`
- Create: `src/components/dashboard/JourneyTimeline.tsx`
- Create: `src/components/dashboard/StudyStreak.tsx`

**Interfaces:**
- Consumes: `XPState`, `ExamState`, `StreakState` from `types.ts`.
- Produces:
```ts
export function XPBar(props: { xp: XPState }): JSX.Element
export function ExamCountdown(props: { exam: ExamState }): JSX.Element
export function JourneyTimeline(props: { exam: ExamState }): JSX.Element
export function StudyStreak(props: { streak: StreakState }): JSX.Element
```

- [ ] **Step 1: Implement `XPBar.tsx`** — thin `ProgressBar` (reuse Task 5 component) showing `xp.total % 1000`-derived percent (or use `xp.xpForNextLevel` directly: `percent = 100 - (xp.xpForNextLevel / levelSpan) * 100`, simplest: precompute percent from data since `xpForNextLevel` is already provided — `percent = ((totalForLevel - xp.xpForNextLevel) / totalForLevel) * 100` where `totalForLevel` is a constant 500; document via comment inline is unnecessary, just compute `Math.max(0, Math.min(100, 100 - (xp.xpForNextLevel / 500) * 100))`). Caption: `${xp.xpForNextLevel} XP para o próximo nível`.

- [ ] **Step 2: Implement `ExamCountdown.tsx`** — single line, bold `Faltam {exam.daysRemaining} dias para a prova`, small calendar icon (lucide `CalendarClock`).

- [ ] **Step 3: Implement `JourneyTimeline.tsx`** — horizontal row of week chips (`Semana 1..4`, `Revisão final`, `🏁 PROVA`), chip state derived from `exam.currentWeek` (`done` if index < currentWeek, `current` ring highlight if index === currentWeek, else muted). Use `bg-white rounded-xl2 shadow-soft p-4 flex items-center justify-between`.

- [ ] **Step 4: Implement `StudyStreak.tsx`** — `🔥 {streak.currentDays} dias seguidos` heading, 7-cell row (`S T Q Q S S D`) with `✓`/`○` per `last7Days`, message `"Mais um dia e você bate seu recorde."` shown only if `streak.currentDays < streak.bestDays`, else `"Novo recorde!"`.

- [ ] **Step 5: Verify with typecheck** — `npm run typecheck` → no errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/dashboard/XPBar.tsx src/components/dashboard/ExamCountdown.tsx src/components/dashboard/JourneyTimeline.tsx src/components/dashboard/StudyStreak.tsx
git commit -m "feat: add XPBar, ExamCountdown, JourneyTimeline, StudyStreak"
```

---

### Task 8: DailyMission + MissionStage + CurrentFocus

**Files:**
- Create: `src/components/dashboard/MissionStage.tsx`
- Create: `src/components/dashboard/DailyMission.tsx`
- Create: `src/components/dashboard/CurrentFocus.tsx`

**Interfaces:**
- Consumes: `DailyMission`, `MissionStage` (data type), `CurrentFocus` (data type) from `types.ts`; `useAppStore` (`completeStage`, `addXP`) and `useNavigate` from react-router-dom.
- Produces:
```ts
export function MissionStage(props: { stage: MissionStageData; index: number }): JSX.Element
export function DailyMission(props: { mission: DailyMission; studentId: 'nicolas' | 'joao' }): JSX.Element
export function CurrentFocus(props: { focus: CurrentFocusData; studentId: 'nicolas' | 'joao' }): JSX.Element
```
(Rename type import as `MissionStageData`/`CurrentFocusData` locally to avoid clashing with the component names.)

- [ ] **Step 1: Implement `MissionStage.tsx`**

Card labeled `ETAPA {index + 1}` + kind label (`APRENDER`/`PRATICAR`/`ESCREVER`), subject `Badge`, title, either `{minutes} min` or `{targetQuestions per subject}` + `0/{total}` counter, CTA button navigating to `stage.ctaRoute` via `useNavigate`. Completed state: check icon, muted background, CTA replaced with "Concluído".

- [ ] **Step 2: Implement `DailyMission.tsx`**

Largest dashboard card (`bg-white rounded-xl2 shadow-soft p-6`). Header "Sua missão de hoje", subtext `{mission.totalMinutes} minutos · {mission.stages.length} etapas`. Renders `MissionStage` per stage. Footer: overall `ProgressBar` for `completedCount/total`, and if all stages completed, replaces body with a "MISSÃO CUMPRIDA" summary block (total questions from `targetQuestions`, streak line, `+120 XP` — computed as sum of stage-completion XP constants: aprender +20, praticar +30 (+15 if accuracy≥80%, mocked as always applied), escrever +40, plus +50 for full mission = matches spec section 19 wiring for the mocked demo).

- [ ] **Step 3: Implement `CurrentFocus.tsx`**

Card "Seu foco agora", topic title, `focus.reason`, CTA button (`focus.ctaLabel`) navigating to `focus.ctaRoute`.

- [ ] **Step 4: Verify with typecheck** — `npm run typecheck` → no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/dashboard/MissionStage.tsx src/components/dashboard/DailyMission.tsx src/components/dashboard/CurrentFocus.tsx
git commit -m "feat: add DailyMission, MissionStage, CurrentFocus components"
```

---

### Task 9: SubjectCard, ProgressCard, PerformanceChart (dashboard summary widgets)

**Files:**
- Create: `src/components/dashboard/SubjectCard.tsx`
- Create: `src/components/dashboard/ProgressCard.tsx`
- Create: `src/components/performance/PerformanceChart.tsx`

**Interfaces:**
- Consumes: `SubjectProgress`, `PerformanceOverview` types; Recharts `LineChart`/`BarChart`.
- Produces:
```ts
export function SubjectCard(props: { subject: SubjectProgress; studentId: 'nicolas' | 'joao' }): JSX.Element
export function ProgressCard(props: { overview: PerformanceOverview }): JSX.Element // renders the 4 StatCards from spec section 7
export function PerformanceChart(props: { data: { label: string; percent: number }[]; tone?: string }): JSX.Element
```

- [ ] **Step 1: Implement `SubjectCard.tsx`** — colored card (tone from `subject.color`), subject label, `{percentComplete}% concluído`, `{questionsAnswered} questões respondidas`, `{accuracyRate}% de acertos` (or `Nota média: {averageGrade}` for redação), CTA "Continuar" → `/:studentId/materia/:key` (or `/:studentId/redacao` for redação).

- [ ] **Step 2: Implement `ProgressCard.tsx`** — 4-up `StatCard` grid: dias estudados, horas (format `{Math.floor(h)}h{String(Math.round((h%1)*60)).padStart(2,'0')}`), questões, `{accuracyRate}%` de acertos.

- [ ] **Step 3: Implement `PerformanceChart.tsx`** — Recharts `ResponsiveContainer` + `LineChart` (`dataKey="percent"`, `XAxis dataKey="label"`), stroke color from `tone`, minimal axis styling (no gridlines clutter, per "poucos elementos por bloco").

- [ ] **Step 4: Verify with typecheck** — `npm run typecheck` → no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/dashboard/SubjectCard.tsx src/components/dashboard/ProgressCard.tsx src/components/performance/PerformanceChart.tsx
git commit -m "feat: add SubjectCard, ProgressCard, PerformanceChart"
```

---

### Task 10: ProfileSelector + ProfileCard + ProfileSelect page (Screen 1)

**Files:**
- Create: `src/components/shared/ProfileCard.tsx`
- Create: `src/pages/ProfileSelect.tsx`

**Interfaces:**
- Consumes: `nicolasData`, `joaoData`, `useAppStore.setActiveStudent`, `useNavigate`.
- Produces:
```ts
export function ProfileCard(props: { data: StudentData; onSelect: () => void }): JSX.Element
export default function ProfileSelect(): JSX.Element
```

- [ ] **Step 1: Implement `ProfileCard.tsx`**

Large card (`bg-white rounded-xl2 shadow-soft p-8 hover:shadow-md transition-shadow cursor-pointer`), avatar circle (initials, `profile.avatarColor` background), name, `"Preparação para o {profile.targetGrade}"`, journey completion `%` (derive from `exam.currentWeek / exam.weeksTotal`), `🔥 {streak.currentDays} dias seguidos`, `Nível {xp.level}`, "Entrar no perfil" button.

- [ ] **Step 2: Implement `ProfileSelect.tsx`**

Centered layout, heading "Quem vai estudar hoje?", subtext making clear these are two independent profiles ("Cada estudante tem sua própria jornada, progresso e conquistas."), two `ProfileCard`s side by side (`grid grid-cols-2 gap-8 max-w-4xl mx-auto`) for `nicolasData` and `joaoData`. `onSelect` calls `setActiveStudent(id)` then `navigate(`/${id}`)`.

- [ ] **Step 3: Verify with typecheck** — `npm run typecheck` → no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/shared/ProfileCard.tsx src/pages/ProfileSelect.tsx
git commit -m "feat: add profile selection screen"
```

---

### Task 11: Router wiring + Dashboard page (Screen 2/3)

**Files:**
- Create: `src/pages/Dashboard.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: every dashboard component from Tasks 6–9, `useAppStore.getStudentData`, `useParams`.
- Produces: `export default function Dashboard(): JSX.Element`; `App.tsx` exports the full `<BrowserRouter>` route tree per the spec's route list (routes for Tasks 12–19 stubbed with placeholder `<div>Em construção</div>` pages initially, replaced task-by-task).

- [ ] **Step 1: Implement `Dashboard.tsx`**

Compose, top to bottom: `StudentHeader`, `ExamCountdown`, `JourneyTimeline`, two-column grid (`grid grid-cols-3 gap-6`) — left 2 cols: `DailyMission`, right col: `CurrentFocus` + `StudyStreak` stacked. Below: `ProgressCard`, then 3-up `SubjectCard` row (matemática/português/redação).

- [ ] **Step 2: Wire `App.tsx`**

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProfileSelect from './pages/ProfileSelect'
import { PageShell } from './components/layout/PageShell'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProfileSelect />} />
        <Route element={<PageShell />}>
          <Route path="/:studentId" element={<Dashboard />} />
          {/* remaining routes added in Tasks 12-19 */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
```

- [ ] **Step 3: Visual verification in Browser tool**

Start dev server via `preview_start`, navigate to `/`, click "Entrar no perfil" on Nicolas, confirm URL becomes `/nicolas` and dashboard renders with Nicolas's data (equações do 1º grau mission, streak 7). Go back to `/`, enter João, confirm dashboard shows João's distinct data (frações, streak 4). Confirm no console errors via `read_console_messages`.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Dashboard.tsx src/App.tsx
git commit -m "feat: wire router and implement Dashboard page"
```

---

### Task 12: WeeklyJourney + JourneyDay + Journey page (Screen 4)

**Files:**
- Create: `src/components/journey/JourneyDay.tsx`
- Create: `src/components/journey/WeeklyJourney.tsx`
- Create: `src/pages/Journey.tsx`
- Modify: `src/App.tsx` (add route `/:studentId/jornada`)

**Interfaces:**
- Consumes: `JourneyWeek`, `JourneyDay` (data type) from `types.ts`.
- Produces:
```ts
export function JourneyDay(props: { day: JourneyDayData }): JSX.Element
export function WeeklyJourney(props: { week: JourneyWeek }): JSX.Element
export default function Journey(): JSX.Element
```

- [ ] **Step 1: Implement `JourneyDay.tsx`** — card per day: weekday+date header, status-based left border color (`done`=essay tone check, `today`=ink ring, `next`=neutral, `future`=faded `opacity-60`), list of `activities` each with subject `Badge` + label + `✓` if `done`.

- [ ] **Step 2: Implement `WeeklyJourney.tsx`** — section header (week `title` + `subtitle`), grid of `JourneyDay` (`grid grid-cols-5 gap-4` or `flex flex-wrap gap-4`).

- [ ] **Step 3: Implement `Journey.tsx`** — page heading "Jornada", subtext reinforcing "seu caminho até a prova", maps `data.journey` to `WeeklyJourney` sections in order.

- [ ] **Step 4: Add route** in `App.tsx`: `<Route path="/:studentId/jornada" element={<Journey />} />`.

- [ ] **Step 5: Visual verification** — navigate to `/nicolas/jornada`, confirm 5 week sections render, statuses visually distinct, no console errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/journey src/pages/Journey.tsx src/App.tsx
git commit -m "feat: add Journey page with weekly breakdown"
```

---

### Task 13: SubjectHome page + LessonSection/ExampleCard/AttentionCard/LessonPage (Screen 5)

**Files:**
- Create: `src/pages/SubjectHome.tsx`
- Create: `src/components/lesson/LessonSection.tsx`
- Create: `src/components/lesson/ExampleCard.tsx`
- Create: `src/components/lesson/AttentionCard.tsx`
- Create: `src/components/lesson/LessonPage.tsx`
- Create: `src/pages/Lesson.tsx`
- Modify: `src/App.tsx` (add routes `/:studentId/materia/:subjectSlug` and `/:studentId/materia/:subjectSlug/aula/:lessonId`)

**Interfaces:**
- Consumes: `LessonContent`, `LessonSection` (data type) from `types.ts`; `useParams<{ studentId, subjectSlug, lessonId }>`.
- Produces:
```ts
export function LessonSection(props: { section: LessonSectionData; index: number }): JSX.Element // dispatches to ExampleCard/AttentionCard based on section.type
export function ExampleCard(props: { title: string; body: string }): JSX.Element
export function AttentionCard(props: { title: string; body: string }): JSX.Element
export function LessonPage(props: { lesson: LessonContent }): JSX.Element
export default function SubjectHome(): JSX.Element
export default function Lesson(): JSX.Element
```

- [ ] **Step 1: Implement `ExampleCard.tsx`** — `bg-math/40 rounded-xl2 p-5 border border-math-dark/20`, label "Exemplo resolvido", title, body (`whitespace-pre-line` to allow multi-line worked solutions).

- [ ] **Step 2: Implement `AttentionCard.tsx`** — `bg-review/40 rounded-xl2 p-5 border border-review-dark/30`, label "⚠ Atenção", title, body.

- [ ] **Step 3: Implement `LessonSection.tsx`** — plain `text`/`summary`/`image` sections render as `<section>` with numbered heading + `<p className="text-lg leading-relaxed">`; `example` type renders `ExampleCard`; `attention` renders `AttentionCard`.

- [ ] **Step 4: Implement `LessonPage.tsx`**

Header: subject `Badge`, `lesson.title`, `ProgressBar` for `lesson.progressPercent`. Body: `max-w-3xl` column (readable measure, per spec section 11 "textos maiores sem ficar cansativo"), maps `sections` to `LessonSection` with generous `space-y-8`. Footer CTA "Ir para exercícios" → `/:studentId/materia/:subjectSlug/exercicios/:lesson.exerciseSetId`.

- [ ] **Step 5: Implement `Lesson.tsx`** page — reads `studentId`, `lessonId` from `useParams`, looks up `data.lessons[lessonId]`, renders `LessonPage`. If not found, redirect to subject home via `<Navigate>`.

- [ ] **Step 6: Implement `SubjectHome.tsx`**

Reads `subjectSlug` from params, shows subject header + big `SubjectCard`-style stats, then a list of lessons belonging to that subject (`Object.values(data.lessons).filter(l => l.subject === subjectSlug)`), each linking to `/:studentId/materia/:subjectSlug/aula/:lessonId`.

- [ ] **Step 7: Add routes** in `App.tsx`.

- [ ] **Step 8: Visual verification** — navigate to `/nicolas/materia/matematica`, click into "Equações do 1º grau", confirm all lesson sections render (text, example, attention, summary), confirm "Ir para exercícios" link is present and correctly formed.

- [ ] **Step 9: Commit**

```bash
git add src/pages/SubjectHome.tsx src/pages/Lesson.tsx src/components/lesson src/App.tsx
git commit -m "feat: add SubjectHome and Lesson content pages"
```

---

### Task 14: QuestionCard + QuestionProgress + AnswerFeedback + Exercise page (Screens 6/7)

**Files:**
- Create: `src/components/exercise/QuestionProgress.tsx`
- Create: `src/components/exercise/QuestionCard.tsx`
- Create: `src/components/exercise/AnswerFeedback.tsx`
- Create: `src/pages/Exercise.tsx`
- Modify: `src/App.tsx` (add route `/:studentId/materia/:subjectSlug/exercicios/:setId`)

**Interfaces:**
- Consumes: `Question` type, `useAppStore` (`recordAnswer`, `addXP`, `addToErrorNotebook`, `completeStage`).
- Produces:
```ts
export function QuestionProgress(props: { current: number; total: number }): JSX.Element
export function QuestionCard(props: { question: Question; selectedOptionId: string | null; revealed: boolean; onSelect: (optionId: string) => void }): JSX.Element
export function AnswerFeedback(props: { question: Question; selectedOptionId: string; onAddToErrorNotebook: () => void; onNext: () => void; isLast: boolean }): JSX.Element
export default function Exercise(): JSX.Element
```

- [ ] **Step 1: Implement `QuestionProgress.tsx`** — `Questão {current} de {total}` + `ProgressBar` for `current/total`.

- [ ] **Step 2: Implement `QuestionCard.tsx`**

Subject+topic `Badge`s, optional media block (renders a labeled placeholder box: `[TIRINHA]`/`[GRÁFICO]`/`[TABELA]`/`[IMAGEM]` with `question.media.caption`, styled as a bordered rounded box — a real image asset is out of scope for this phase per spec), prompt text (`text-xl font-semibold`), option list as buttons (A–E prefix), disabled + border-highlighted (green if `option.id === correctOptionId`, red if `option.id === selectedOptionId` and wrong) once `revealed` is true. "Responder" button enabled only when an option is selected and not yet revealed.

- [ ] **Step 3: Implement `AnswerFeedback.tsx`**

If correct: `✓ Muito bem` + `+5 XP`, short `question.explanation`. If incorrect: `Quase. Vamos entender.`, shows correct answer label, `question.explanation`, numbered `question.stepByStep` list, "Adicionar ao caderno de erros" button (calls `onAddToErrorNotebook`, then disables itself/shows "Adicionado ✓"). Always shows "Próxima questão" (or "Ver resultado" if `isLast`) calling `onNext`.

- [ ] **Step 4: Implement `Exercise.tsx`**

Local state: `currentIndex`, `selectedOptionId`, `revealed`. On "Responder": set `revealed = true`, call `recordAnswer` and `addXP(studentId, correct ? 5 : 0)`. On "Adicionar ao caderno de erros": call `addToErrorNotebook`. On "Próxima"/"Ver resultado": advance index, reset local state; when the set is exhausted, call `completeStage` for the matching daily-mission stage (match by `stage.kind === 'praticar' && stage.subject === question.subject`, best-effort — if no match, skip) and navigate back to `/:studentId` with a brief inline "Exercícios concluídos" state before redirecting, OR simply navigate to `/:studentId` directly (simplest, avoids extra UI) — implement the direct navigate.

- [ ] **Step 5: Add route** in `App.tsx`.

- [ ] **Step 6: Visual verification** — navigate to `/nicolas/materia/matematica/exercicios/pratica-equacoes`, answer one question correctly (confirm green highlight + "+5 XP" + explanation), answer one incorrectly (confirm red/green highlight, step-by-step shown, "Adicionar ao caderno de erros" works), click through to the end, confirm redirect to dashboard.

- [ ] **Step 7: Commit**

```bash
git add src/components/exercise src/pages/Exercise.tsx src/App.tsx
git commit -m "feat: add exercise flow with inline answer feedback"
```

---

### Task 15: ErrorNotebook page + ErrorTopicBar (Screen 8)

**Files:**
- Create: `src/components/errors/ErrorTopicBar.tsx`
- Create: `src/pages/ErrorNotebook.tsx`
- Modify: `src/App.tsx` (add route `/:studentId/caderno-de-erros`)

**Interfaces:**
- Consumes: `ErrorNotebook`, `TopicErrors` data types; `useAppStore.errorNotebookAdditions`.
- Produces:
```ts
export function ErrorTopicBar(props: { topic: TopicErrors; maxCount: number }): JSX.Element
export default function ErrorNotebook(): JSX.Element
```

- [ ] **Step 1: Implement `ErrorTopicBar.tsx`** — topic label + `{count} erros`, horizontal bar width proportional to `count/maxCount`.

- [ ] **Step 2: Implement `ErrorNotebook.tsx`**

Header stat: total entries count ("`{total} erros para revisar`"). 3-up subject count cards (Matemática/Português/Redação). "ASSUNTOS QUE PRECISAM DE ATENÇÃO" section listing `ErrorTopicBar` per `topicBreakdown` entry, sorted descending by count. Below: tabbed or sectioned list (`Recentes` / `Precisa revisar` / `Dominados`) filtering `entries` by `status`, each entry showing subject `Badge`, topic, truncated prompt, and a "DOMINADO ✓" tag for `status === 'mastered'`. "Revisar meus erros" CTA at top links to the first `review`-status entry's originating exercise set if resolvable, otherwise scrolls to the list (implement as anchor `href="#review-list"`).

- [ ] **Step 3: Add route** in `App.tsx`.

- [ ] **Step 4: Visual verification** — navigate to `/nicolas/caderno-de-erros`, confirm topic bars render sorted, confirm three status sections populated, confirm subject counts match mock data.

- [ ] **Step 5: Commit**

```bash
git add src/components/errors src/pages/ErrorNotebook.tsx src/App.tsx
git commit -m "feat: add caderno de erros page"
```

---

### Task 16: SimulationCard + Simulations page + SimulationResult (Screens 9/10)

**Files:**
- Create: `src/components/simulation/SimulationCard.tsx`
- Create: `src/components/simulation/SimulationResult.tsx`
- Create: `src/pages/Simulations.tsx`
- Create: `src/pages/SimulationResult.tsx`
- Modify: `src/App.tsx` (add routes `/:studentId/simulados`, `/:studentId/simulados/:simId/resultado`)

**Interfaces:**
- Consumes: `SimulationSummary` data type.
- Produces:
```ts
export function SimulationCard(props: { sim: SimulationSummary; studentId: 'nicolas' | 'joao' }): JSX.Element
export function SimulationResult(props: { sim: SimulationSummary; allSims: SimulationSummary[] }): JSX.Element
export default function Simulations(): JSX.Element
export default function SimulationResultPage(): JSX.Element
```

- [ ] **Step 1: Implement `SimulationCard.tsx`** — `sim` tone accent (`bg-sim/30 border border-sim-dark/20 rounded-xl2 p-6`), title (`SIMULADO {n}`), `scopeLabel`, question breakdown (`{mathQuestions} Matemática`, `{portQuestions} Português`, `+ proposta de redação` if `hasEssay`), `suggestedMinutes`. If `completed`, shows result summary (`{correct}/{total}`, `{percent}%`) and CTA "Ver resultado" → `/:studentId/simulados/:id/resultado`; else CTA "Começar simulado" → (out of scope to actually run; button is present but can link back to `/:studentId/materia/matematica` as a stand-in start point, OR simply render as `disabled` with "Em breve" label — implement disabled+"Em breve" since running a full simulado flow is out of scope this phase).

- [ ] **Step 2: Implement `Simulations.tsx`** page — heading, brief framing text ("simulados são cumulativos..."), list of `SimulationCard` in chronological order. If the next incomplete simulation exists, feature it at top as "DESAFIO DA SEMANA" with a highlighted variant (reuse `SimulationCard` with an extra `featured` prop or a wrapping labeled banner).

- [ ] **Step 3: Implement `SimulationResult.tsx`** component

Big score header (`{correct} / {total}`, `{percent}%`), per-subject breakdown (`Matemática {x}/{y}`, `Português {x}/{y}`, `Redação {essayGrade}`), `PerformanceChart` (Task 9) plotting `allSims` completed results' percent evolution, delta line ("Você melhorou +{delta}%" comparing to previous completed sim), "FOI MUITO BEM"/"PRECISA REVISAR" two-column lists from `strengths`/`weaknesses`, CTA "Revisar erros" → `/:studentId/caderno-de-erros`.

- [ ] **Step 4: Implement `SimulationResult.tsx` page** — reads `simId` from params, finds sim in `data.simulations`, redirects to `/:studentId/simulados` if not found or not completed, else renders the component.

- [ ] **Step 5: Add routes** in `App.tsx`.

- [ ] **Step 6: Visual verification** — navigate to `/nicolas/simulados`, confirm 4 cards render with correct completed/upcoming states, click "Ver resultado" on a completed one, confirm score breakdown and evolution chart render.

- [ ] **Step 7: Commit**

```bash
git add src/components/simulation src/pages/Simulations.tsx src/pages/SimulationResult.tsx src/App.tsx
git commit -m "feat: add simulados list and result pages"
```

---

### Task 17: EssayCard + EssayChecklist + EssayHistory + Essay page (Screen 11)

**Files:**
- Create: `src/components/essay/EssayChecklist.tsx`
- Create: `src/components/essay/EssayHistory.tsx`
- Create: `src/components/essay/EssayCard.tsx`
- Create: `src/pages/Essay.tsx`
- Modify: `src/App.tsx` (add route `/:studentId/redacao`)

**Interfaces:**
- Consumes: `EssayState` data type.
- Produces:
```ts
export function EssayChecklist(props: { items: EssayChecklistItem[] }): JSX.Element // local checkbox state only, not persisted
export function EssayHistory(props: { entries: EssayEntry[] }): JSX.Element
export function EssayCard(props: { currentPrompt: EssayState['currentPrompt'] }): JSX.Element
export default function Essay(): JSX.Element
```

- [ ] **Step 1: Implement `EssayCard.tsx`** — `essay` tone card showing `theme`, `genre` `Badge`, `guidance` paragraph, `expectedStructure` as an ordered list.

- [ ] **Step 2: Implement `EssayChecklist.tsx`** — checkbox list ("Antes de entregar:"), `useState<Set<string>>` for checked ids, purely local (no store write, per spec this phase has no real correction).

- [ ] **Step 3: Implement `EssayHistory.tsx`** — "MINHAS REDAÇÕES" list, each entry `Redação #{n}` + `{grade}`, sorted by date, small trend indicator if grade improved vs previous.

- [ ] **Step 4: Implement `Essay.tsx`** page — composes `EssayCard`, a `<textarea>` writing area (local state, placeholder "Escreva sua redação aqui..."), `EssayChecklist`, disabled "Enviar redação" button with helper text "Em breve: correção automática" (honest about mocked scope), then `EssayHistory`.

- [ ] **Step 5: Add route** in `App.tsx`.

- [ ] **Step 6: Visual verification** — navigate to `/nicolas/redacao`, confirm theme/genre/guidance render, checklist items toggle, history shows 3 entries with correct grades from mock data.

- [ ] **Step 7: Commit**

```bash
git add src/components/essay src/pages/Essay.tsx src/App.tsx
git commit -m "feat: add redação page with checklist and history"
```

---

### Task 18: AchievementBadge + Achievements page (Screen 12)

**Files:**
- Create: `src/components/achievements/AchievementBadge.tsx`
- Create: `src/pages/Achievements.tsx`
- Modify: `src/App.tsx` (add route `/:studentId/conquistas`)

**Interfaces:**
- Consumes: `Achievement` data type.
- Produces:
```ts
export function AchievementBadge(props: { achievement: Achievement }): JSX.Element
export default function Achievements(): JSX.Element
```

- [ ] **Step 1: Implement `AchievementBadge.tsx`** — card with `achievement.icon` (emoji, large), title, description; `unlocked ? 'opacity-100' : 'opacity-40 grayscale'`, locked cards additionally show a small lock icon (lucide `Lock`) instead of full color.

- [ ] **Step 2: Implement `Achievements.tsx`** page — heading "Conquistas", grid (`grid grid-cols-3 gap-4`) of `AchievementBadge` for `data.achievements`, unlocked count summary at top (`{unlocked}/{total} desbloqueadas`).

- [ ] **Step 3: Add route** in `App.tsx`.

- [ ] **Step 4: Visual verification** — navigate to `/nicolas/conquistas`, confirm locked/unlocked visual distinction is clear but not garish.

- [ ] **Step 5: Commit**

```bash
git add src/components/achievements src/pages/Achievements.tsx src/App.tsx
git commit -m "feat: add conquistas page"
```

---

### Task 19: Performance page (Screen 13)

**Files:**
- Create: `src/pages/Performance.tsx`
- Modify: `src/App.tsx` (add route `/:studentId/desempenho`)

**Interfaces:**
- Consumes: `PerformanceOverview`, `PerformanceChart` (Task 9).
- Produces: `export default function Performance(): JSX.Element`.

- [ ] **Step 1: Implement `Performance.tsx`**

Heading "Desempenho". Top stat row (`ProgressCard`-style reuse or inline `StatCard`s): taxa geral de acertos, Matemática %, Português %, questões realizadas, tempo estudado, redações count. `PerformanceChart` for `simulationEvolution` under heading "EVOLUÇÃO DOS SIMULADOS". Two-column "PONTOS FORTES" / "PRECISA REFORÇAR" lists from `strengths`/`weaknesses`, each item as topic + percent `ProgressBar`.

- [ ] **Step 2: Add route** in `App.tsx`.

- [ ] **Step 3: Visual verification** — navigate to `/nicolas/desempenho`, confirm chart renders, strengths/weaknesses lists populated and distinct from João's when checked at `/joao/desempenho`.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Performance.tsx src/App.tsx
git commit -m "feat: add desempenho analytics page"
```

---

### Task 20: Full navigation pass + polish

**Files:**
- Modify: any component/page files as needed for fixes found during this pass.

- [ ] **Step 1: Run full typecheck and lint**

```bash
npm run typecheck && npm run lint
```
Expected: zero errors.

- [ ] **Step 2: Run full test suite**

```bash
npm run test
```
Expected: all tests pass.

- [ ] **Step 3: End-to-end browser walkthrough (both profiles)**

Using the Browser tool: start at `/`, enter Nicolas, click through every sidebar item (Início, Jornada, Matemática, Português, Redação, Simulados, Caderno de erros, Conquistas, Desempenho), complete one full exercise set, verify dashboard reflects updated mission-stage/XP state, verify "Trocar perfil" returns to `/`. Repeat fully for João. Confirm at every screen: no console errors (`read_console_messages`), no layout overflow at 1440px and 1024px (`resize_window`).

- [ ] **Step 4: Fix any issues found**, re-run Step 1–3 until clean.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: polish pass across all screens, verify full navigation for both profiles"
```

---

## Self-Review Notes

- **Spec coverage:** All 13 required screens (Tasks 10, 11, 12, 13, 14, 15, 16, 17, 18, 19) are covered; all components named in spec section 22 have a task; XP table (spec section 19) wired into `DailyMission`/`Exercise`; independent Nicolas/João data enforced by Tasks 2–3 tests and Task 20's dual walkthrough.
- **Out-of-scope items honestly stubbed, not faked:** essay submission and "Começar simulado" for incomplete simulations show disabled/"em breve" states rather than pretending to work, per spec's explicit phase-1 exclusions.
- **Type consistency:** All later tasks import types only from `src/data/types.ts` (Task 2) and store types from `src/store/useAppStore.ts` (Task 4); no task redefines a shared interface locally.
