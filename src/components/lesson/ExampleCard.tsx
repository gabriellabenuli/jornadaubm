import { MathText } from '../shared/MathText'

export function ExampleCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl2 border border-math-dark/20 bg-math/30 p-5">
      <span className="text-xs font-bold uppercase tracking-wide text-math-ink">Exemplo resolvido</span>
      <h3 className="mt-1 font-semibold">{title}</h3>
      <p className="mt-2 leading-relaxed text-ink-soft">
        <MathText text={body} />
      </p>
    </div>
  )
}
