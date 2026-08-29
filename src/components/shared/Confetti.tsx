import { useMemo } from 'react'

const COLORS = ['#7c5cfc', '#ff8f2e', '#22c165', '#ecc400', '#ff3d94']

export function Confetti({ count = 16 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        dx: (Math.random() - 0.5) * 140,
        rot: (Math.random() - 0.5) * 360,
        delay: Math.random() * 0.15,
        color: COLORS[i % COLORS.length],
        left: 10 + Math.random() * 80,
        id: i,
      })),
    [count],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={
            {
              left: `${p.left}%`,
              backgroundColor: p.color,
              animationDelay: `${p.delay}s`,
              '--dx': `${p.dx}px`,
              '--rot': `${p.rot}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
