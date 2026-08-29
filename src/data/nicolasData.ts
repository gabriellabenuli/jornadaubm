import type { StudentData } from './types'

export const nicolasData: StudentData = {
  profile: {
    id: 'nicolas',
    name: 'Nicolas',
    avatarColor: '#6C63E0',
    currentGrade: '7º ano',
    targetGrade: '8º ano',
    examDate: '2026-09-26',
  },

  xp: { total: 1240, level: 7, xpForNextLevel: 260, xpSpanForLevel: 500 },

  streak: {
    currentDays: 7,
    bestDays: 7,
    last7Days: ['done', 'done', 'done', 'done', 'done', 'done', 'done'],
  },

  exam: { date: '2026-09-26', daysRemaining: 29, weeksTotal: 5, currentWeek: 3 },

  dailyMission: {
    totalMinutes: 90,
    stages: [
      {
        id: 'nic-stage-aprender',
        kind: 'aprender',
        title: 'Equações do 1º grau',
        subject: 'matematica',
        minutes: 15,
        completed: false,
        ctaLabel: 'Começar',
        ctaRoute: '/nicolas/materia/matematica/aula/equacoes-1grau',
      },
      {
        id: 'nic-stage-praticar',
        kind: 'praticar',
        title: 'Praticar',
        subject: 'matematica',
        targetQuestions: [
          { subject: 'matematica', count: 20 },
          { subject: 'portugues', count: 15 },
        ],
        completed: false,
        ctaLabel: 'Praticar',
        ctaRoute: '/nicolas/materia/matematica/exercicios/pratica-equacoes',
      },
      {
        id: 'nic-stage-escrever',
        kind: 'escrever',
        title: 'Crônica',
        subject: 'redacao',
        completed: false,
        ctaLabel: 'Começar',
        ctaRoute: '/nicolas/redacao',
      },
    ],
  },

  currentFocus: {
    topic: 'Predicação verbal',
    subject: 'portugues',
    reason: 'Você errou 3 questões recentes sobre esse assunto. Vamos reforçar antes de avançar.',
    metricLabel: '3 erros recentes',
    ctaLabel: 'Revisar por 10 min',
    ctaRoute: '/nicolas/materia/portugues',
  },

  subjects: {
    matematica: {
      key: 'matematica',
      label: 'Matemática',
      percentComplete: 72,
      questionsAnswered: 340,
      accuracyRate: 78,
      color: 'math',
    },
    portugues: {
      key: 'portugues',
      label: 'Português',
      percentComplete: 58,
      questionsAnswered: 210,
      accuracyRate: 69,
      color: 'port',
    },
    redacao: {
      key: 'redacao',
      label: 'Redação',
      percentComplete: 65,
      questionsAnswered: 0,
      accuracyRate: 0,
      averageGrade: 8.0,
      color: 'essay',
    },
  },

  performanceOverview: {
    daysStudied: 18,
    hoursStudied: 12.67,
    questionsAnswered: 438,
    accuracyRate: 78,
    mathAccuracy: 78,
    portAccuracy: 69,
    essaysCount: 3,
    simulationEvolution: [
      { label: 'Simulado 01', percent: 62 },
      { label: 'Simulado 02', percent: 69 },
      { label: 'Simulado 03', percent: 80 },
    ],
    strengths: [
      { topic: 'Porcentagem', percent: 88 },
      { topic: 'Números inteiros', percent: 85 },
      { topic: 'Equações do 1º grau', percent: 82 },
    ],
    weaknesses: [
      { topic: 'Predicação verbal', percent: 58 },
      { topic: 'Interpretação de texto', percent: 63 },
      { topic: 'Concordância verbal', percent: 66 },
    ],
  },

  journey: [
    {
      id: 'semana-1',
      title: 'Semana 1',
      subtitle: 'Fundamentos',
      days: [
        {
          date: '31 AGO',
          weekday: 'SEG',
          status: 'done',
          activities: [
            { subject: 'matematica', label: 'Números inteiros', done: true },
            { subject: 'portugues', label: 'Interpretação de texto', done: true },
            { subject: 'redacao', label: 'Estrutura da crônica', done: true },
          ],
        },
        {
          date: '01 SET',
          weekday: 'TER',
          status: 'done',
          activities: [
            { subject: 'matematica', label: 'Múltiplos e divisores', done: true },
            { subject: 'portugues', label: 'Classes gramaticais', done: true },
          ],
        },
        {
          date: '02 SET',
          weekday: 'QUA',
          status: 'done',
          activities: [
            { subject: 'matematica', label: 'Frações equivalentes', done: true },
            { subject: 'portugues', label: 'Acentuação', done: true },
          ],
        },
        {
          date: '03 SET',
          weekday: 'QUI',
          status: 'done',
          activities: [
            { subject: 'matematica', label: 'Operações com frações', done: true },
            { subject: 'redacao', label: 'Leitura de crônicas', done: true },
          ],
        },
        {
          date: '04 SET',
          weekday: 'SEX',
          status: 'done',
          activities: [{ subject: 'matematica', label: 'Revisão da semana', done: true }],
        },
      ],
    },
    {
      id: 'semana-2',
      title: 'Semana 2',
      subtitle: 'Construção',
      days: [
        {
          date: '07 SET',
          weekday: 'SEG',
          status: 'done',
          activities: [
            { subject: 'matematica', label: 'Razão e proporção', done: true },
            { subject: 'portugues', label: 'Sujeito e predicado', done: true },
          ],
        },
        {
          date: '08 SET',
          weekday: 'TER',
          status: 'done',
          activities: [
            { subject: 'matematica', label: 'Porcentagem', done: true },
            { subject: 'portugues', label: 'Predicação verbal', done: true },
          ],
        },
        {
          date: '09 SET',
          weekday: 'QUA',
          status: 'done',
          activities: [
            { subject: 'matematica', label: 'Porcentagem — prática', done: true },
            { subject: 'redacao', label: 'Planejamento de crônica', done: true },
          ],
        },
        {
          date: '10 SET',
          weekday: 'QUI',
          status: 'done',
          activities: [{ subject: 'portugues', label: 'Concordância verbal', done: true }],
        },
        {
          date: '11 SET',
          weekday: 'SEX',
          status: 'done',
          activities: [{ subject: 'matematica', label: 'Revisão da semana', done: true }],
        },
      ],
    },
    {
      id: 'semana-3',
      title: 'Semana 3',
      subtitle: 'Aprofundamento',
      days: [
        {
          date: '14 SET',
          weekday: 'SEG',
          status: 'done',
          activities: [
            { subject: 'matematica', label: 'Equações do 1º grau', done: true },
            { subject: 'portugues', label: 'Predicação verbal — prática', done: true },
          ],
        },
        {
          date: '15 SET',
          weekday: 'TER',
          status: 'today',
          activities: [
            { subject: 'matematica', label: 'Equações do 1º grau', done: false },
            { subject: 'portugues', label: 'Interpretação de texto', done: false },
            { subject: 'redacao', label: 'Crônica — produção', done: false },
          ],
        },
        {
          date: '16 SET',
          weekday: 'QUA',
          status: 'next',
          activities: [
            { subject: 'matematica', label: 'Sistemas de equações', done: false },
            { subject: 'portugues', label: 'Coesão textual', done: false },
          ],
        },
        {
          date: '17 SET',
          weekday: 'QUI',
          status: 'future',
          activities: [{ subject: 'matematica', label: 'Geometria — ângulos', done: false }],
        },
        {
          date: '18 SET',
          weekday: 'SEX',
          status: 'future',
          activities: [{ subject: 'matematica', label: 'Revisão da semana', done: false }],
        },
      ],
    },
    {
      id: 'semana-4',
      title: 'Semana 4',
      subtitle: 'Consolidação',
      days: [
        {
          date: '21 SET',
          weekday: 'SEG',
          status: 'future',
          activities: [{ subject: 'matematica', label: 'Geometria — áreas', done: false }],
        },
        {
          date: '22 SET',
          weekday: 'TER',
          status: 'future',
          activities: [{ subject: 'portugues', label: 'Figuras de linguagem', done: false }],
        },
        {
          date: '23 SET',
          weekday: 'QUA',
          status: 'future',
          activities: [{ subject: 'redacao', label: 'Crônica — revisão final', done: false }],
        },
        {
          date: '24 SET',
          weekday: 'QUI',
          status: 'future',
          activities: [{ subject: 'matematica', label: 'Simulado geral', done: false }],
        },
        {
          date: '25 SET',
          weekday: 'SEX',
          status: 'future',
          activities: [{ subject: 'matematica', label: 'Revisão da semana', done: false }],
        },
      ],
    },
    {
      id: 'semana-final',
      title: 'Semana Final',
      subtitle: 'Revisão',
      days: [
        {
          date: '28 SET',
          weekday: 'SEG',
          status: 'future',
          activities: [{ subject: 'matematica', label: 'Revisão geral', done: false }],
        },
        {
          date: '26 SET',
          weekday: 'SÁB',
          status: 'future',
          activities: [{ subject: 'matematica', label: '🏁 Prova UBM', done: false }],
        },
      ],
    },
  ],

  lessons: {
    'equacoes-1grau': {
      id: 'equacoes-1grau',
      subject: 'matematica',
      title: 'Equações do 1º grau',
      progressPercent: 40,
      exerciseSetId: 'pratica-equacoes',
      sections: [
        {
          id: 'sec-1',
          type: 'text',
          title: 'O que são equações do 1º grau?',
          body: 'Uma equação do 1º grau é uma sentença matemática com uma incógnita (geralmente representada por x) elevada ao expoente 1, que expressa uma igualdade. Por exemplo: 2x + 3 = 11. Resolver a equação significa descobrir qual valor de x torna essa igualdade verdadeira.',
        },
        {
          id: 'sec-2',
          type: 'text',
          title: 'O princípio da balança',
          body: 'Pense em uma equação como uma balança em equilíbrio: tudo que você fizer de um lado, precisa fazer do outro, para manter o equilíbrio. Se somar um número de um lado, precisa somar o mesmo número do outro lado. Se dividir um lado por um número, precisa dividir o outro lado pelo mesmo número.',
        },
        {
          id: 'sec-3',
          type: 'text',
          title: 'Isolando a incógnita',
          body: 'Para resolver 2x + 3 = 11, o objetivo é deixar o x sozinho de um lado. Primeiro, subtraímos 3 dos dois lados: 2x + 3 − 3 = 11 − 3, ou seja, 2x = 8. Depois, dividimos os dois lados por 2: 2x/2 = 8/2, ou seja, x = 4.',
        },
        {
          id: 'sec-4',
          type: 'example',
          title: 'Exemplo resolvido',
          body: 'Resolva: 3x − 5 = 16\n\nPasso 1 — somar 5 dos dois lados: 3x − 5 + 5 = 16 + 5 → 3x = 21\nPasso 2 — dividir os dois lados por 3: 3x/3 = 21/3 → x = 7\n\nVerificação: 3 × 7 − 5 = 21 − 5 = 16 ✓',
        },
        {
          id: 'sec-5',
          type: 'example',
          title: 'Outro exemplo resolvido',
          body: 'Resolva: 5x + 2 = 3x + 10\n\nPasso 1 — deixar os termos com x de um lado: 5x − 3x + 2 = 10 → 2x + 2 = 10\nPasso 2 — subtrair 2 dos dois lados: 2x = 8\nPasso 3 — dividir por 2: x = 4',
        },
        {
          id: 'sec-6',
          type: 'attention',
          title: 'Atenção',
          body: 'Um erro muito comum é trocar o sinal ao "passar" um número para o outro lado da equação. Lembre-se: você não está "passando" nada — está aplicando a mesma operação nos dois lados. Isso evita esquecer de trocar o sinal quando necessário.',
        },
        {
          id: 'sec-7',
          type: 'summary',
          title: 'Resumo visual',
          body: '1. Some ou subtraia o mesmo valor dos dois lados para isolar os termos com x.\n2. Divida os dois lados pelo coeficiente de x para descobrir seu valor.\n3. Sempre verifique substituindo o valor encontrado na equação original.',
        },
      ],
    },
  },

  questionSets: {
    'pratica-equacoes': [
      {
        id: 'q1',
        subject: 'matematica',
        topic: 'Equações do 1º grau',
        prompt: 'Qual é o valor de x na equação 4x − 7 = 13?',
        options: [
          { id: 'a', label: '3' },
          { id: 'b', label: '4' },
          { id: 'c', label: '5' },
          { id: 'd', label: '6' },
          { id: 'e', label: '7' },
        ],
        correctOptionId: 'c',
        explanation: 'Somando 7 aos dois lados e dividindo por 4, chegamos a x = 5.',
        stepByStep: ['4x − 7 = 13', '4x = 13 + 7 = 20', 'x = 20 ÷ 4', 'x = 5'],
      },
      {
        id: 'q2',
        subject: 'matematica',
        topic: 'Equações do 1º grau',
        prompt: 'A soma de um número com o triplo dele é 28. Qual é esse número?',
        options: [
          { id: 'a', label: '5' },
          { id: 'b', label: '6' },
          { id: 'c', label: '7' },
          { id: 'd', label: '8' },
          { id: 'e', label: '9' },
        ],
        correctOptionId: 'c',
        explanation: 'Chamando o número de x: x + 3x = 28 → 4x = 28 → x = 7.',
        stepByStep: ['x + 3x = 28', '4x = 28', 'x = 28 ÷ 4', 'x = 7'],
      },
      {
        id: 'q3',
        subject: 'matematica',
        topic: 'Porcentagem',
        prompt: 'Em uma turma de 32 alunos, 25% praticam natação. Quantos alunos praticam natação?',
        options: [
          { id: 'a', label: '6' },
          { id: 'b', label: '7' },
          { id: 'c', label: '8' },
          { id: 'd', label: '9' },
          { id: 'e', label: '10' },
        ],
        correctOptionId: 'c',
        explanation: '25% de 32 equivale a um quarto de 32, ou seja, 8 alunos.',
        stepByStep: ['25% = 1/4', '32 ÷ 4 = 8', 'Resposta: 8 alunos'],
      },
      {
        id: 'q4',
        subject: 'portugues',
        topic: 'Predicação verbal',
        prompt: 'Em "O menino ficou triste com a notícia", o verbo "ficou" classifica-se como:',
        options: [
          { id: 'a', label: 'Verbo transitivo direto' },
          { id: 'b', label: 'Verbo transitivo indireto' },
          { id: 'c', label: 'Verbo de ligação' },
          { id: 'd', label: 'Verbo intransitivo' },
          { id: 'e', label: 'Verbo transitivo direto e indireto' },
        ],
        correctOptionId: 'c',
        explanation: '"Ficou" liga o sujeito a uma característica (triste), por isso é verbo de ligação.',
        stepByStep: [
          'Identifique o sujeito: "O menino"',
          'Verifique se o verbo indica estado ou característica: "ficou triste"',
          'Verbos que atribuem estado ao sujeito são verbos de ligação',
        ],
      },
      {
        id: 'q5',
        subject: 'portugues',
        topic: 'Interpretação de texto',
        prompt: 'Observe a tirinha a seguir e responda: por que o humor da tirinha acontece?',
        media: { kind: 'tirinha', caption: 'Tirinha: personagem espera resposta de um robô que trava ao "pensar demais".' },
        options: [
          { id: 'a', label: 'Porque o robô fala uma língua diferente' },
          { id: 'b', label: 'Porque há uma quebra de expectativa entre o que se espera de uma máquina e sua reação' },
          { id: 'c', label: 'Porque a cena se passa em um lugar inusitado' },
          { id: 'd', label: 'Porque o personagem humano erra o nome do robô' },
          { id: 'e', label: 'Porque a tirinha usa cores exageradas' },
        ],
        correctOptionId: 'b',
        explanation: 'O humor de tirinhas costuma vir de uma quebra de expectativa — aqui, a máquina "trava" como um humano indeciso.',
        stepByStep: [
          'Identifique o que o leitor espera de um robô: respostas rápidas e precisas',
          'Compare com o que realmente acontece na tirinha: o robô "pensa demais" e trava',
          'A comicidade nasce dessa contradição',
        ],
      },
      {
        id: 'q6',
        subject: 'matematica',
        topic: 'Equações do 1º grau',
        prompt: 'Se 2(x + 3) = 16, qual é o valor de x?',
        options: [
          { id: 'a', label: '3' },
          { id: 'b', label: '4' },
          { id: 'c', label: '5' },
          { id: 'd', label: '6' },
          { id: 'e', label: '7' },
        ],
        correctOptionId: 'c',
        explanation: 'Distribuindo o 2: 2x + 6 = 16 → 2x = 10 → x = 5.',
        stepByStep: ['2(x + 3) = 16', '2x + 6 = 16', '2x = 10', 'x = 5'],
      },
    ],
  },

  errorNotebook: {
    bySubjectCount: { matematica: 12, portugues: 8, redacao: 4 },
    topicBreakdown: [
      { topic: 'Predicação verbal', subject: 'portugues', count: 8 },
      { topic: 'Interpretação de texto', subject: 'portugues', count: 5 },
      { topic: 'Sistemas de equações', subject: 'matematica', count: 4 },
      { topic: 'Geometria', subject: 'matematica', count: 3 },
    ],
    entries: [
      {
        id: 'err-1',
        subject: 'portugues',
        topic: 'Predicação verbal',
        prompt: 'Em "O jogo parecia difícil", o verbo "parecia" é classificado como...',
        status: 'recent',
        missedOn: '2026-08-26',
      },
      {
        id: 'err-2',
        subject: 'matematica',
        topic: 'Sistemas de equações',
        prompt: 'Resolva o sistema: x + y = 10 e x − y = 2.',
        status: 'review',
        missedOn: '2026-08-20',
      },
      {
        id: 'err-3',
        subject: 'portugues',
        topic: 'Interpretação de texto',
        prompt: 'Qual a ideia central do segundo parágrafo do texto?',
        status: 'mastered',
        missedOn: '2026-08-10',
      },
      {
        id: 'err-4',
        subject: 'matematica',
        topic: 'Geometria',
        prompt: 'Calcule o ângulo interno de um triângulo equilátero.',
        status: 'review',
        missedOn: '2026-08-22',
      },
    ],
  },

  essays: {
    currentPrompt: {
      theme: 'Um encontro inesperado',
      genre: 'Crônica',
      guidance:
        'Escreva uma crônica narrando um encontro inesperado do cotidiano, com um olhar sensível e, se possível, bem-humorado sobre a situação. Explore os detalhes do momento e o que ele revela sobre as pessoas envolvidas.',
      expectedStructure: [
        'Situação inicial — apresente o cenário e os personagens',
        'Desenvolvimento — descreva o encontro e a reação dos envolvidos',
        'Fecho — uma reflexão ou virada final, característica da crônica',
      ],
    },
    checklist: [
      { id: 'c1', label: 'Atendi ao tema' },
      { id: 'c2', label: 'Organizei as ideias' },
      { id: 'c3', label: 'Revisei ortografia' },
      { id: 'c4', label: 'Revisei pontuação' },
      { id: 'c5', label: 'Conferi o número de linhas' },
    ],
    history: [
      { id: 'e1', label: 'Redação #01', grade: 7.5, date: '2026-08-05' },
      { id: 'e2', label: 'Redação #02', grade: 8.0, date: '2026-08-14' },
      { id: 'e3', label: 'Redação #03', grade: 8.7, date: '2026-08-23' },
    ],
  },

  simulations: [
    {
      id: 'sim-01',
      label: 'SIMULADO 01',
      scopeLabel: 'Semana 1',
      totalQuestions: 15,
      mathQuestions: 9,
      portQuestions: 6,
      hasEssay: false,
      suggestedMinutes: 40,
      completed: true,
      result: {
        correct: 9,
        total: 15,
        bySubject: [
          { subject: 'matematica', correct: 6, total: 9 },
          { subject: 'portugues', correct: 3, total: 6 },
        ],
        strengths: [{ topic: 'Números inteiros', percent: 85 }],
        weaknesses: [{ topic: 'Interpretação de texto', percent: 55 }],
      },
    },
    {
      id: 'sim-02',
      label: 'SIMULADO 02',
      scopeLabel: 'Semanas 1 + 2',
      totalQuestions: 25,
      mathQuestions: 15,
      portQuestions: 10,
      hasEssay: false,
      suggestedMinutes: 60,
      completed: true,
      result: {
        correct: 17,
        total: 25,
        bySubject: [
          { subject: 'matematica', correct: 11, total: 15 },
          { subject: 'portugues', correct: 6, total: 10 },
        ],
        strengths: [{ topic: 'Porcentagem', percent: 88 }],
        weaknesses: [{ topic: 'Predicação verbal', percent: 60 }],
      },
    },
    {
      id: 'sim-03',
      label: 'SIMULADO 03',
      scopeLabel: 'Semanas 1 + 2 + 3',
      totalQuestions: 35,
      mathQuestions: 20,
      portQuestions: 15,
      hasEssay: true,
      suggestedMinutes: 90,
      completed: true,
      result: {
        correct: 28,
        total: 35,
        bySubject: [
          { subject: 'matematica', correct: 16, total: 20 },
          { subject: 'portugues', correct: 12, total: 15 },
        ],
        essayGrade: 8.0,
        strengths: [
          { topic: 'Interpretação de texto', percent: 90 },
          { topic: 'Porcentagem', percent: 88 },
        ],
        weaknesses: [
          { topic: 'Frações', percent: 58 },
          { topic: 'Equações', percent: 63 },
        ],
      },
    },
    {
      id: 'sim-04',
      label: 'SIMULADO 04',
      scopeLabel: 'Todo conteúdo estudado',
      totalQuestions: 35,
      mathQuestions: 20,
      portQuestions: 15,
      hasEssay: true,
      suggestedMinutes: 90,
      completed: false,
      daysUntil: 12,
    },
  ],

  achievements: [
    { id: 'ach-1', icon: '🔥', title: 'Embalado', description: '7 dias estudando', unlocked: true },
    { id: 'ach-2', icon: '🎯', title: 'Na mosca', description: '10 questões corretas seguidas', unlocked: true },
    { id: 'ach-3', icon: '📚', title: 'Leitor atento', description: '50 questões de interpretação', unlocked: true },
    { id: 'ach-4', icon: '🧠', title: 'Mestre dos números', description: '100 questões de Matemática', unlocked: true },
    { id: 'ach-5', icon: '✍️', title: 'Escritor', description: '5 redações concluídas', unlocked: false },
    { id: 'ach-6', icon: '🏆', title: 'Semana perfeita', description: 'Concluiu todas as atividades da semana', unlocked: true },
  ],
}
