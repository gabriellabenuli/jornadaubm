# Plataforma de Estudos Gamificada — Prova de Bolsas UBM

Data: 2026-08-28

## Contexto

Plataforma web para dois estudantes (Nicolas, 7º ano → prova para 8º ano; João, 5º ano → prova para 6º ano) se prepararem para a prova de bolsas do Colégio UBM em 26/09/2026. Cada estudante tem um universo de dados totalmente independente (cronograma, progresso, XP, erros, redações, simulados, conquistas).

Esta primeira entrega é **somente frontend**, com dados mockados. Sem backend, sem geração real de conteúdo/exercícios, sem correção de redação real.

## Objetivo de experiência

Ao abrir a plataforma, o estudante deve sentir "eu sei exatamente o que preciso fazer hoje". Tom: educacional premium + dashboard moderno + gamificação leve + jornada rumo a uma meta (a prova). Não escolar/burocrático, não infantil.

## Stack técnica

- React 18 + Vite + TypeScript
- React Router (rotas aninhadas por `studentId`)
- Tailwind CSS
- Zustand + persistência em localStorage (perfil ativo, XP/progresso incremental de sessão)
- Fonte: Plus Jakarta Sans (Google Fonts)
- Sem backend; todos os dados vêm de `src/data/nicolasData.ts` e `src/data/joaoData.ts`

## Estilo visual

- Fundo off-white/branco quente, grafite muito escuro para texto
- Cantos arredondados, sombras quase inexistentes, muito espaço em branco
- Paleta por matéria: Matemática (azul/lilás), Português (pêssego), Redação (verde suave), Revisão (amarelo suave), Simulados (cor de destaque própria)
- Tipografia forte, poucos elementos por bloco, ícones simples (lucide-react)
- Desktop-first (1366–1920px), largura máx. de conteúdo ~1400px, adapta para tablet; mobile não é prioridade nesta fase

## Arquitetura de pastas

```
src/
  data/            nicolasData.ts, joaoData.ts, types.ts
  store/           useAppStore.ts
  components/
    layout/        AppSidebar, StudentHeader, PageShell
    dashboard/      ExamCountdown, JourneyTimeline, DailyMission, MissionStage,
                    CurrentFocus, StudyStreak, SubjectCard, ProgressCard, XPBar
    journey/        WeeklyJourney, JourneyDay
    lesson/         LessonPage, LessonSection, ExampleCard, AttentionCard
    exercise/       QuestionCard, QuestionProgress, AnswerFeedback
    errors/         ErrorNotebook, ErrorTopicBar
    simulation/      SimulationCard, SimulationResult
    essay/          EssayCard, EssayChecklist, EssayHistory
    achievements/   AchievementBadge
    performance/    PerformanceChart
    shared/         ProfileCard, StatCard, Badge, ProgressBar
  pages/           ProfileSelect, Dashboard, Journey, SubjectHome, Lesson,
                    Exercise, ErrorNotebook, Simulations, SimulationResult,
                    Essay, Achievements, Performance
```

## Rotas

- `/` — seleção de perfil (sem sidebar)
- `/:studentId` — Dashboard
- `/:studentId/jornada`
- `/:studentId/materia/:subjectSlug`
- `/:studentId/materia/:subjectSlug/aula/:lessonId`
- `/:studentId/materia/:subjectSlug/exercicios/:setId`
- `/:studentId/redacao`
- `/:studentId/simulados`
- `/:studentId/simulados/:simId/resultado`
- `/:studentId/caderno-de-erros`
- `/:studentId/conquistas`
- `/:studentId/desempenho`

`studentId` (`nicolas` | `joao`) na URL é a fonte de verdade. Trocar de perfil navega para `/:novoId` e recarrega os dados daquele estudante — sem estado vazando entre perfis.

## Modelo de dados (`StudentData`)

```ts
interface StudentData {
  profile: { id, name, avatarColor, currentGrade, targetGrade, examDate }
  xp: { total, level, xpForNextLevel }
  streak: { currentDays, bestDays, last7Days: ('done'|'missed')[] }
  exam: { date, daysRemaining, weeksTotal, currentWeek }
  dailyMission: { totalMinutes, stages: MissionStage[], completedToday: boolean }
  currentFocus: { topic, subject, reason, metric, ctaLabel }
  subjects: Record<'matematica'|'portugues'|'redacao', SubjectProgress>
  performanceOverview: { daysStudied, hoursStudied, questionsAnswered, accuracyRate }
  journey: WeekPlan[]
  lessons: Record<string, LessonContent>
  questionSets: Record<string, Question[]>
  errorNotebook: { bySubject, byTopic: TopicErrors[], entries: ErrorEntry[] }
  essays: { currentPrompt, checklist, history: EssayEntry[] }
  simulations: SimulationSummary[]
  achievements: Achievement[]
}
```

Nicolas e João compartilham essa forma mas com valores e trilhas de conteúdo distintos (ver seção 21 do briefing original): Nicolas estuda equações/predicação verbal/porcentagem/crônica, sequência de 7 dias, mais forte em Matemática; João estuda frações/interpretação de tirinhas/decimais/mitos, sequência de 4 dias, mais forte em Português.

## Comportamento de interação (exercícios)

- Resposta selecionada → feedback inline (sem modal): borda verde/vermelha sutil, explicação + resolução passo a passo. Se errou, botão "Adicionar ao caderno de erros".
- Ao concluir o set: XP creditado via store, progresso de missão diária atualizado, refletido ao voltar ao Dashboard.
- Progresso incremental de sessão (respostas dadas, XP ganho, etapas concluídas) fica no Zustand store, persistido em localStorage por `studentId`, e combinado com os dados mockados-base — dá sensação de continuidade sem backend.

## Telas da primeira entrega

1. Escolha de perfil
2. Dashboard (Nicolas e João, com dados distintos)
3. Jornada
4. Tela de conteúdo (Lesson)
5. Tela de exercício
6. Feedback de questão
7. Caderno de erros
8. Simulados
9. Resultado de simulado
10. Redação
11. Conquistas
12. Desempenho

## Fora de escopo nesta fase

Backend real, geração de conteúdo/exercícios, inteligência adaptativa real, banco definitivo de questões, correção de redação real, persistência além de localStorage, mobile-first.
