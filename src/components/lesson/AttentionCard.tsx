export function AttentionCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl2 border border-review-dark/30 bg-review/30 p-5">
      <span className="text-xs font-bold uppercase tracking-wide text-review-ink">⚠ Atenção</span>
      <h3 className="mt-1 font-semibold">{title}</h3>
      <p className="mt-2 whitespace-pre-line text-ink-soft">{body}</p>
    </div>
  )
}
