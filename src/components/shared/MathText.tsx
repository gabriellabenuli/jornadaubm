import type { ReactNode } from 'react'

export function Fraction({ n, d }: { n: string; d: string }) {
  return (
    <span className="mx-1 inline-flex flex-col items-center align-middle text-[0.85em] font-semibold leading-none">
      <span className="border-b-2 border-current px-1 pb-0.5">{n}</span>
      <span className="px-1 pt-0.5">{d}</span>
    </span>
  )
}

function parseFractions(line: string, keyPrefix: string): ReactNode[] {
  const parts: ReactNode[] = []
  const regex = /(\d+)\/(\d+)/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let i = 0

  while ((match = regex.exec(line))) {
    if (match.index > lastIndex) parts.push(line.slice(lastIndex, match.index))
    parts.push(<Fraction key={`${keyPrefix}-${i++}`} n={match[1]} d={match[2]} />)
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < line.length) parts.push(line.slice(lastIndex))
  return parts
}

/** Renders text with a/b patterns as stacked fractions and \n as line breaks. */
export function MathText({ text, className }: { text: string; className?: string }) {
  const lines = text.split('\n')
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i}>
          {parseFractions(line, String(i))}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </span>
  )
}
