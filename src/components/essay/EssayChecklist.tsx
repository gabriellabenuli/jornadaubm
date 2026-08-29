import { useState } from 'react'
import type { EssayChecklistItem } from '../../data/types'

export function EssayChecklist({ items }: { items: EssayChecklistItem[] }) {
  const [checked, setChecked] = useState<Set<string>>(new Set())

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl2 bg-white p-5 shadow-soft">
      <span className="font-semibold">Antes de entregar:</span>
      {items.map((item) => (
        <label key={item.id} className="flex cursor-pointer items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={checked.has(item.id)}
            onChange={() => toggle(item.id)}
            className="h-4 w-4 rounded border-ink/30 accent-ink"
          />
          <span className={checked.has(item.id) ? 'text-ink-soft line-through' : ''}>{item.label}</span>
        </label>
      ))}
    </div>
  )
}
