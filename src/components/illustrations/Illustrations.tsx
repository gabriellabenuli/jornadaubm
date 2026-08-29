const INK = '#1c1a18'

function Doodles({ color }: { color: string }) {
  return (
    <g stroke={INK} strokeWidth="2" fill="none" opacity="0.6">
      <circle cx="18" cy="24" r="3" fill={color} stroke="none" />
      <circle cx="182" cy="20" r="2" fill={color} stroke="none" />
      <path d="M170 100 q8 -6 16 0" strokeLinecap="round" />
      <path d="M12 110 q6 8 0 16" strokeLinecap="round" />
    </g>
  )
}

function Gear({ x, y, r, color }: { x: number; y: number; r: number; color: string }) {
  const teeth = 8
  const points: string[] = []
  for (let i = 0; i < teeth * 2; i++) {
    const angle = (Math.PI * i) / teeth
    const rad = i % 2 === 0 ? r : r * 0.72
    points.push(`${x + Math.cos(angle) * rad},${y + Math.sin(angle) * rad}`)
  }
  return (
    <g>
      <polygon points={points.join(' ')} fill={color} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <circle cx={x} cy={y} r={r * 0.4} fill="white" stroke={INK} strokeWidth="2" />
    </g>
  )
}

function Head({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g stroke={INK} strokeWidth="2.5" strokeLinecap="round">
      <circle cx={cx} cy={cy} r="14" fill="#ffd7b8" />
      <circle cx={cx - 5} cy={cy - 1} r="1.4" fill={INK} stroke="none" />
      <circle cx={cx + 5} cy={cy - 1} r="1.4" fill={INK} stroke="none" />
      <path d={`M${cx - 5} ${cy + 6} q5 4 10 0`} fill="none" />
      <path d={`M${cx - 13} ${cy - 6} q13 -12 26 0`} fill="#2b2320" stroke="none" />
    </g>
  )
}

export function MathHero() {
  return (
    <svg viewBox="0 0 200 140" className="h-full w-full">
      <rect width="200" height="140" rx="20" fill="var(--color-math)" />
      <Doodles color="var(--color-math-dark)" />
      <Gear x={168} y={38} r={12} color="white" />
      <rect x="24" y="86" width="34" height="26" rx="4" fill="white" stroke={INK} strokeWidth="2" />
      <g stroke={INK} strokeWidth="1.5">
        <line x1="30" y1="94" x2="52" y2="94" />
        <line x1="30" y1="100" x2="52" y2="100" />
        <line x1="30" y1="106" x2="44" y2="106" />
      </g>
      <text x="41" y="126" textAnchor="middle" fontSize="11" fontWeight="700" fill={INK}>
        x²
      </text>

      <Head cx={110} cy={58} />
      <rect x="94" y="70" width="32" height="34" rx="10" fill="var(--color-math-dark)" stroke={INK} strokeWidth="2.5" />
      <path d="M96 82 q-16 6 -14 24" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M124 82 q16 -2 20 14" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />

      <g transform="translate(140,88) rotate(-18)">
        <rect width="10" height="34" rx="3" fill="#ffb84d" stroke={INK} strokeWidth="2" />
        <polygon points="0,0 10,0 5,-8" fill="#ffd7b8" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      </g>

      <path d="M60 50 h14 M67 43 v14" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <circle cx="150" cy="112" r="9" fill="white" stroke={INK} strokeWidth="2" />
      <path d="M146 112 h8 M150 108 v8" stroke={INK} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function PortHero() {
  return (
    <svg viewBox="0 0 200 140" className="h-full w-full">
      <rect width="200" height="140" rx="20" fill="var(--color-port)" />
      <Doodles color="var(--color-port-dark)" />
      <path
        d="M136 30 q18 -6 26 8 q6 12 -6 18 l4 10 l-14 -6 q-16 2 -18 -12 q-2 -12 8 -18 Z"
        fill="white"
        stroke={INK}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <text x="150" y="46" textAnchor="middle" fontSize="14" fontWeight="800" fill={INK}>
        ?
      </text>

      <Head cx={92} cy={56} />
      <rect x="76" y="68" width="32" height="34" rx="10" fill="var(--color-port-dark)" stroke={INK} strokeWidth="2.5" />
      <path d="M78 80 q-14 10 -8 26" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M106 80 q14 4 12 20" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />

      <g transform="translate(30,92)">
        <rect width="46" height="34" rx="3" fill="white" stroke={INK} strokeWidth="2.5" />
        <line x1="23" y1="4" x2="23" y2="30" stroke={INK} strokeWidth="2" />
        <line x1="6" y1="12" x2="19" y2="12" stroke={INK} strokeWidth="1.5" />
        <line x1="6" y1="18" x2="19" y2="18" stroke={INK} strokeWidth="1.5" />
        <line x1="27" y1="12" x2="40" y2="12" stroke={INK} strokeWidth="1.5" />
        <line x1="27" y1="18" x2="40" y2="18" stroke={INK} strokeWidth="1.5" />
      </g>

      <circle cx="168" cy="110" r="8" fill="white" stroke={INK} strokeWidth="2" />
      <path d="M164 110 h8 M168 106 v8" stroke={INK} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function EssayHero() {
  return (
    <svg viewBox="0 0 200 140" className="h-full w-full">
      <rect width="200" height="140" rx="20" fill="var(--color-essay)" />
      <Doodles color="var(--color-essay-dark)" />

      <Head cx={104} cy={54} />
      <rect x="88" y="66" width="32" height="34" rx="10" fill="var(--color-essay-dark)" stroke={INK} strokeWidth="2.5" />
      <path d="M90 78 q-14 8 -10 24" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
      <g transform="translate(120,78) rotate(28)">
        <rect width="7" height="32" rx="2" fill="#ffb84d" stroke={INK} strokeWidth="2" />
        <polygon points="0,0 7,0 3.5,-7" fill="#5a3d21" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      </g>

      <g transform="translate(56,96)">
        <rect width="44" height="32" rx="3" fill="white" stroke={INK} strokeWidth="2.5" />
        <line x1="8" y1="9" x2="36" y2="9" stroke={INK} strokeWidth="1.5" />
        <line x1="8" y1="15" x2="36" y2="15" stroke={INK} strokeWidth="1.5" />
        <line x1="8" y1="21" x2="28" y2="21" stroke={INK} strokeWidth="1.5" />
      </g>

      <path d="M150 34 q6 -8 14 -4 q6 4 0 10 q6 4 -2 10" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="30" cy="40" r="8" fill="white" stroke={INK} strokeWidth="2" />
      <path d="M26 40 h8 M30 36 v8" stroke={INK} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function ComicIllustration() {
  return (
    <svg viewBox="0 0 220 130" className="h-full w-full">
      <rect width="220" height="130" rx="18" fill="var(--color-sim)" />
      <line x1="110" y1="10" x2="110" y2="120" stroke={INK} strokeWidth="2" strokeDasharray="4 5" opacity="0.5" />

      <Head cx={55} cy={58} />
      <rect x="39" y="70" width="32" height="30" rx="10" fill="white" stroke={INK} strokeWidth="2.5" />
      <path
        d="M70 30 q22 -8 30 8 q4 10 -8 14 l2 8 l-12 -5 q-14 2 -16 -10 q-2 -9 4 -15 Z"
        fill="white"
        stroke={INK}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <text x="88" y="44" textAnchor="middle" fontSize="10" fontWeight="700" fill={INK}>
        Ha!
      </text>

      <g transform="translate(150,44)">
        <circle r="14" fill="#ffd7b8" stroke={INK} strokeWidth="2.5" />
        <circle cx="-5" cy="-1" r="1.4" fill={INK} />
        <circle cx="5" cy="-1" r="1.4" fill={INK} />
        <path d="M-4 5 q4 -3 8 0" />
        <path d="M-12 -6 q12 -11 24 0" fill="#2b2320" stroke="none" />
      </g>
      <rect x="134" y="56" width="32" height="30" rx="10" fill="var(--color-sim-dark)" stroke={INK} strokeWidth="2.5" />
      <path
        d="M186 26 q-4 12 6 16 l-2 8 l10 -6 q12 0 12 -12 q0 -10 -12 -12 q-10 -1 -14 6 Z"
        fill="white"
        stroke={INK}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <text x="196" y="36" textAnchor="middle" fontSize="9" fontWeight="700" fill={INK}>
        ?!
      </text>
    </svg>
  )
}

export function ChartIllustration() {
  return (
    <svg viewBox="0 0 220 130" className="h-full w-full">
      <rect width="220" height="130" rx="18" fill="var(--color-math)" />
      <Doodles color="var(--color-math-dark)" />

      <g transform="translate(24,26)">
        <rect width="100" height="76" rx="6" fill="white" stroke={INK} strokeWidth="2.5" />
        <line x1="14" y1="14" x2="14" y2="64" stroke={INK} strokeWidth="1.5" />
        <line x1="14" y1="64" x2="90" y2="64" stroke={INK} strokeWidth="1.5" />
        <rect x="24" y="40" width="12" height="24" fill="var(--color-math-dark)" stroke={INK} strokeWidth="1.5" />
        <rect x="42" y="28" width="12" height="36" fill="var(--color-sim-dark)" stroke={INK} strokeWidth="1.5" />
        <rect x="60" y="46" width="12" height="18" fill="var(--color-essay-dark)" stroke={INK} strokeWidth="1.5" />
        <rect x="78" y="20" width="12" height="44" fill="var(--color-review-dark)" stroke={INK} strokeWidth="1.5" />
      </g>

      <Head cx={166} cy={46} />
      <rect x="150" y="58" width="32" height="34" rx="10" fill="var(--color-math-dark)" stroke={INK} strokeWidth="2.5" />
      <path d="M152 70 q-14 6 -10 24" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M150 78 l-22 -6" stroke={INK} strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function TableIllustration() {
  return (
    <svg viewBox="0 0 220 130" className="h-full w-full">
      <rect width="220" height="130" rx="18" fill="var(--color-review)" />
      <Doodles color="var(--color-review-dark)" />

      <g transform="translate(28,24)">
        <rect width="100" height="78" rx="6" fill="white" stroke={INK} strokeWidth="2.5" />
        <line x1="0" y1="20" x2="100" y2="20" stroke={INK} strokeWidth="1.5" />
        <line x1="0" y1="46" x2="100" y2="46" stroke={INK} strokeWidth="1.5" />
        <line x1="0" y1="72" x2="100" y2="72" stroke={INK} strokeWidth="1.5" />
        <line x1="34" y1="0" x2="34" y2="78" stroke={INK} strokeWidth="1.5" />
        <line x1="67" y1="0" x2="67" y2="78" stroke={INK} strokeWidth="1.5" />
        <rect x="0" y="0" width="100" height="20" fill="var(--color-review-dark)" opacity="0.5" />
      </g>

      <Head cx={168} cy={50} />
      <rect x="152" y="62" width="32" height="34" rx="10" fill="var(--color-review-dark)" stroke={INK} strokeWidth="2.5" />
      <path d="M154 74 q-14 8 -10 24" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M182 74 q14 0 14 16" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function PictureIllustration() {
  return (
    <svg viewBox="0 0 220 130" className="h-full w-full">
      <rect width="220" height="130" rx="18" fill="var(--color-port)" />
      <Doodles color="var(--color-port-dark)" />

      <g transform="translate(30,20)">
        <rect width="120" height="86" rx="6" fill="white" stroke={INK} strokeWidth="2.5" />
        <circle cx="26" cy="26" r="10" fill="var(--color-review-dark)" stroke={INK} strokeWidth="2" />
        <path
          d="M8 78 L44 46 L66 64 L92 34 L112 78 Z"
          fill="var(--color-essay)"
          stroke={INK}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
