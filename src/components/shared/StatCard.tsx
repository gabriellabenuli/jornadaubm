import type { ReactNode } from 'react'

export function StatCard({ value, label, icon }: { value: string; label: string; icon?: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl2 bg-white p-5 shadow-soft">
      {icon && <div className="text-ink-soft">{icon}</div>}
      <span className="text-3xl font-extrabold tracking-tight">{value}</span>
      <span className="text-sm text-ink-soft">{label}</span>
    </div>
  )
}
