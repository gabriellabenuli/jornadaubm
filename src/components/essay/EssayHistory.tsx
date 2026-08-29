import type { EssayEntry } from '../../data/types'

export function EssayHistory({ entries }: { entries: EssayEntry[] }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl2 bg-white p-5 shadow-soft">
      <span className="font-semibold">Minhas redações</span>
      {entries.map((entry, i) => {
        const prev = entries[i - 1]
        const improved = prev ? entry.grade > prev.grade : false
        return (
          <div key={entry.id} className="flex items-center justify-between text-sm">
            <span>{entry.label}</span>
            <span className="flex items-center gap-1 font-semibold">
              {entry.grade.toFixed(1)}
              {improved && <span className="text-essay-ink">↑</span>}
            </span>
          </div>
        )
      })}
    </div>
  )
}
