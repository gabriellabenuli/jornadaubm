import { Flag } from 'lucide-react'
import type { JourneyWeek } from '../../data/types'

const MONTH_ABBR: Record<string, number> = { JAN: 0, FEV: 1, MAR: 2, ABR: 3, MAI: 4, JUN: 5, JUL: 6, AGO: 7, SET: 8, OUT: 9, NOV: 10, DEZ: 11 }
const WEEKDAY_LETTERS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const MONTH_NAMES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

function parseDayLabel(label: string): { day: number; month: number } | null {
  const [dayStr, abbr] = label.split(' ')
  const day = Number(dayStr)
  const month = MONTH_ABBR[abbr]
  if (Number.isNaN(day) || month === undefined) return null
  return { day, month }
}

export function MonthCalendar({ journey, examDate }: { journey: JourneyWeek[]; examDate: string }) {
  const exam = new Date(`${examDate}T00:00:00`)
  const year = exam.getFullYear()
  const month = exam.getMonth()

  const statusByDay = new Map<number, 'done' | 'today' | 'next' | 'future'>()
  for (const week of journey) {
    for (const day of week.days) {
      const parsed = parseDayLabel(day.date)
      if (parsed && parsed.month === month) statusByDay.set(parsed.day, day.status)
    }
  }

  const firstWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = [...Array(firstWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]
  while (cells.length % 7 !== 0) cells.push(null)

  const DOT_COLOR: Record<'done' | 'today' | 'next' | 'future', string> = {
    done: 'bg-essay-dark',
    today: 'bg-ink',
    next: 'bg-review-dark',
    future: 'bg-ink/15',
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl2 bg-white p-5 shadow-soft">
      <h2 className="font-extrabold">
        {MONTH_NAMES[month]} {year}
      </h2>

      <div className="grid grid-cols-7 gap-y-2 text-center">
        {WEEKDAY_LETTERS.map((l, i) => (
          <span key={i} className="text-xs font-semibold text-ink-soft">
            {l}
          </span>
        ))}

        {cells.map((day, i) => {
          if (day === null) return <span key={i} />
          const status = statusByDay.get(day)
          const isExamDay = day === exam.getDate()
          return (
            <div key={i} className="flex flex-col items-center gap-1 py-0.5">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                  isExamDay ? 'bg-sim-dark text-white' : status === 'today' ? 'bg-ink text-white' : 'text-ink'
                }`}
              >
                {isExamDay ? <Flag size={12} /> : day}
              </span>
              {status && !isExamDay && <span className={`h-1.5 w-1.5 rounded-full ${DOT_COLOR[status]}`} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
