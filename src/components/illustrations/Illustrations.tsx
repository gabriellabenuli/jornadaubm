import type { ReactNode } from 'react'

const INK = '#181614'

function Sparkle({ x, y, r = 4, color }: { x: number; y: number; r?: number; color: string }) {
  return (
    <path
      d={`M${x} ${y - r} Q${x + r * 0.3} ${y - r * 0.3} ${x + r} ${y} Q${x + r * 0.3} ${y + r * 0.3} ${x} ${y + r} Q${x - r * 0.3} ${y + r * 0.3} ${x - r} ${y} Q${x - r * 0.3} ${y - r * 0.3} ${x} ${y - r} Z`}
      fill={color}
    />
  )
}

function Gear({ x, y, r, color }: { x: number; y: number; r: number; color: string }) {
  const teeth = 8
  const points: string[] = []
  for (let i = 0; i < teeth * 2; i++) {
    const angle = (Math.PI * i) / teeth
    const rad = i % 2 === 0 ? r : r * 0.7
    points.push(`${x + Math.cos(angle) * rad},${y + Math.sin(angle) * rad}`)
  }
  return (
    <g>
      <polygon points={points.join(' ')} fill={color} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <circle cx={x} cy={y} r={r * 0.38} fill="white" stroke={INK} strokeWidth="2" />
    </g>
  )
}

/** A seated flat-illustration character: legs folded, torso, one resting arm, one
 * raised arm (for holding a prop passed as `heldProp`, positioned near hand2). */
function Person({
  x,
  y,
  scale = 1,
  flip = false,
  shirt,
  shirtDark,
  pants,
  hair,
  hairStyle = 'bob',
  heldProp,
}: {
  x: number
  y: number
  scale?: number
  flip?: boolean
  shirt: string
  shirtDark: string
  pants: string
  hair: string
  hairStyle?: 'bob' | 'bun' | 'short'
  heldProp?: ReactNode
}) {
  const skin = '#ffd8b8'
  return (
    <g transform={`translate(${x},${y}) scale(${(flip ? -1 : 1) * scale},${scale})`} stroke={INK} strokeLinejoin="round" strokeLinecap="round">
      {/* folded legs / seat blob */}
      <path
        d="M-34 14 Q-38 -6 -14 -8 Q0 -12 14 -8 Q38 -6 34 14 Q34 24 20 24 L-20 24 Q-34 24 -34 14 Z"
        fill={pants}
        strokeWidth="2.5"
      />
      <ellipse cx="-27" cy="21" rx="9" ry="6" fill="white" strokeWidth="2.5" />
      <ellipse cx="27" cy="21" rx="9" ry="6" fill="white" strokeWidth="2.5" />

      {/* torso */}
      <path d="M-22 -10 Q-24 -46 0 -48 Q24 -46 22 -10 Q22 2 0 2 Q-22 2 -22 -10 Z" fill={shirt} strokeWidth="2.5" />
      <path d="M-20 -14 Q0 -6 20 -14 L20 -6 Q0 2 -20 -6 Z" fill={shirtDark} stroke="none" />

      {/* resting arm */}
      <path d="M-20 -34 Q-34 -26 -30 -6 Q-29 0 -22 -2" fill="none" strokeWidth="7" strokeLinecap="round" stroke={shirt} />
      <path d="M-20 -34 Q-34 -26 -30 -6 Q-29 0 -22 -2" fill="none" strokeWidth="2.5" stroke={INK} />

      {/* raised arm holding prop */}
      <path d="M20 -34 Q36 -34 34 -54" fill="none" strokeWidth="7" strokeLinecap="round" stroke={shirt} />
      <path d="M20 -34 Q36 -34 34 -54" fill="none" strokeWidth="2.5" stroke={INK} />
      <circle cx="34" cy="-56" r="5" fill={skin} strokeWidth="2.2" />

      {heldProp}

      {/* neck + head */}
      <rect x="-5" y="-52" width="10" height="8" rx="2" fill={skin} strokeWidth="2" />
      <circle cx="0" cy="-64" r="15" fill={skin} strokeWidth="2.5" />
      <circle cx="-5" cy="-64" r="1.5" fill={INK} stroke="none" />
      <circle cx="5" cy="-64" r="1.5" fill={INK} stroke="none" />
      <path d="M-5 -58 Q0 -55 5 -58" fill="none" strokeWidth="2" />

      {hairStyle === 'bob' && <path d="M-15 -66 Q-17 -82 0 -82 Q17 -82 15 -66 Q15 -74 0 -76 Q-15 -74 -15 -66 Z" fill={hair} strokeWidth="2.2" />}
      {hairStyle === 'bun' && (
        <>
          <path d="M-15 -66 Q-17 -80 0 -80 Q17 -80 15 -66 Q15 -73 0 -75 Q-15 -73 -15 -66 Z" fill={hair} strokeWidth="2.2" />
          <circle cx="0" cy="-86" r="7" fill={hair} strokeWidth="2.2" />
        </>
      )}
      {hairStyle === 'short' && <path d="M-16 -64 Q-18 -79 0 -79 Q18 -79 16 -64 Q10 -70 0 -70 Q-10 -70 -16 -64 Z" fill={hair} strokeWidth="2.2" />}
    </g>
  )
}

function Panel({ color, children }: { color: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 220 160" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <rect width="220" height="160" rx="20" fill={color} />
      {children}
    </svg>
  )
}

export function MathHero() {
  return (
    <Panel color="var(--color-math)">
      <Sparkle x={26} y={26} r={5} color="white" />
      <Sparkle x={196} y={34} r={4} color="var(--color-sim-dark)" />
      <circle cx="192" cy="120" r={4} fill="white" opacity="0.7" />
      <Gear x={172} y={116} r={14} color="var(--color-review)" />

      <g transform="translate(30,60)" stroke={INK} strokeWidth="2.5" strokeLinejoin="round">
        <rect width="46" height="58" rx="6" fill="white" />
        <rect x="6" y="8" width="34" height="14" rx="2" fill="var(--color-math-dark)" />
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <rect key={`${row}-${col}`} x={6 + col * 12} y={28 + row * 11} width="9" height="8" rx="1.5" fill="var(--color-math)" />
          )),
        )}
      </g>

      <Person
        x={130}
        y={128}
        scale={1.05}
        shirt="var(--color-math-dark)"
        shirtDark="var(--color-math-ink)"
        pants="#123a66"
        hair="#2b2320"
        hairStyle="short"
        heldProp={
          <g transform="translate(34,-70) rotate(18)">
            <path d="M-5 -14 L5 -14 L3 10 L-3 10 Z" fill="var(--color-review-dark)" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
            <path d="M-5 -14 L0 -22 L5 -14 Z" fill="#ffd8b8" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
          </g>
        }
      />
    </Panel>
  )
}

export function PortHero() {
  return (
    <Panel color="var(--color-port)">
      <Sparkle x={30} y={30} r={5} color="white" />
      <circle cx="24" cy="120" r={5} fill="white" opacity="0.7" />
      <Gear x={196} y={124} r={12} color="var(--color-essay)" />

      <path
        d="M150 26 q26 -8 36 12 q7 15 -9 22 l4 13 l-17 -8 q-20 3 -22 -15 q-3 -16 8 -24 Z"
        fill="white"
        stroke={INK}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <text x="167" y="46" textAnchor="middle" fontSize="15" fontWeight="800" fill={INK}>
        “ ”
      </text>

      <Person
        x={90}
        y={128}
        scale={1.05}
        flip
        shirt="var(--color-port-dark)"
        shirtDark="var(--color-port-ink)"
        pants="#3f4109"
        hair="#3a2415"
        hairStyle="bun"
        heldProp={
          <g transform="translate(30,-70) rotate(-8)">
            <rect x="-14" y="-10" width="28" height="20" rx="2" fill="white" stroke={INK} strokeWidth="2" />
            <line x1="0" y1="-10" x2="0" y2="10" stroke={INK} strokeWidth="1.4" />
            <line x1="-9" y1="-3" x2="-3" y2="-3" stroke={INK} strokeWidth="1.2" />
            <line x1="-9" y1="2" x2="-3" y2="2" stroke={INK} strokeWidth="1.2" />
            <line x1="3" y1="-3" x2="9" y2="-3" stroke={INK} strokeWidth="1.2" />
            <line x1="3" y1="2" x2="9" y2="2" stroke={INK} strokeWidth="1.2" />
          </g>
        }
      />

      <rect x="18" y="86" width="30" height="22" rx="3" fill="white" stroke={INK} strokeWidth="2.2" transform="rotate(-8 33 97)" />
    </Panel>
  )
}

export function EssayHero() {
  return (
    <Panel color="var(--color-essay)">
      <Sparkle x={192} y={28} r={5} color="white" />
      <circle cx="26" cy="30" r={4} fill="white" opacity="0.7" />
      <Gear x={26} y={122} r={12} color="var(--color-port)" />

      <g transform="translate(140,70)" stroke={INK} strokeWidth="2.2" strokeLinejoin="round">
        <rect width="50" height="62" rx="4" fill="white" />
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1="8" y1={12 + i * 10} x2={i % 2 === 0 ? 42 : 34} y2={12 + i * 10} stroke="var(--color-essay-dark)" strokeWidth="2" />
        ))}
      </g>

      <Person
        x={90}
        y={130}
        scale={1.05}
        shirt="var(--color-essay-dark)"
        shirtDark="var(--color-essay-ink)"
        pants="#063f38"
        hair="#2b2320"
        hairStyle="bob"
        heldProp={
          <g transform="translate(34,-72) rotate(35)">
            <rect x="-4" y="-16" width="8" height="30" rx="2" fill="var(--color-review-dark)" stroke={INK} strokeWidth="2" />
            <path d="M-4 -16 L0 -26 L4 -16 Z" fill="#3a2415" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
          </g>
        }
      />
    </Panel>
  )
}

/** Original round "blob bird" character — thick outline, two-tone body split
 * down the middle, a small triangular head-tuft, a dot eye, a thin curvy arm
 * that curls into a spiral, and simple stick legs. Not based on any existing
 * comic character. */
function BlobBird({
  x,
  y,
  scale = 1,
  flip = false,
  bodyColor,
  accentColor,
  armUp = false,
  holdingPhone = false,
}: {
  x: number
  y: number
  scale?: number
  flip?: boolean
  bodyColor: string
  accentColor: string
  armUp?: boolean
  holdingPhone?: boolean
}) {
  return (
    <g
      transform={`translate(${x},${y}) scale(${(flip ? -1 : 1) * scale},${scale})`}
      stroke={INK}
      strokeWidth="3"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <line x1="-9" y1="32" x2="-11" y2="46" />
      <line x1="9" y1="32" x2="11" y2="46" />
      <ellipse cx="-12" cy="47" rx="5" ry="2.5" fill={INK} stroke="none" />
      <ellipse cx="12" cy="47" rx="5" ry="2.5" fill={INK} stroke="none" />

      <path d="M-30 8 Q-33 -28 0 -30 Q33 -28 30 8 Q28 34 0 34 Q-28 34 -30 8 Z" fill={accentColor} />
      <path d="M-30 8 Q-33 -28 0 -30 L0 34 Q-28 34 -30 8 Z" fill={bodyColor} />

      <path d="M-7 -30 L-1 -42 L6 -28 Z" fill={bodyColor} />

      <circle cx="7" cy="-4" r="2.6" fill={INK} stroke="none" />

      {armUp ? (
        <path d="M26 2 Q42 -2 40 -16 Q39 -24 47 -23" fill="none" />
      ) : (
        <path d="M26 10 Q40 14 38 26" fill="none" />
      )}

      {holdingPhone && (
        <g transform="translate(24,16) rotate(8)">
          <rect x="0" y="0" width="13" height="20" rx="2.5" fill="white" />
          <line x1="3" y1="4" x2="10" y2="4" strokeWidth="1.5" />
        </g>
      )}
    </g>
  )
}

function SpeechBubble({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <path
      d={`M${x} ${y} h${w} v${h} h-${w * 0.55} l-6 8 l2 -8 h-${w * 0.45 - 6} Z`}
      fill="white"
      stroke={INK}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  )
}

export function ComicIllustration() {
  const bird1 = { bodyColor: '#ffd23f', accentColor: 'var(--color-sim-dark)' }
  const bird2 = { bodyColor: 'var(--color-math)', accentColor: 'var(--color-math-dark)' }
  const panelW = 110

  return (
    <svg viewBox="0 0 440 120" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <rect width="440" height="120" fill="white" />
      {[1, 2, 3].map((i) => (
        <line key={i} x1={i * panelW} y1="3" x2={i * panelW} y2="117" stroke={INK} strokeWidth="3" />
      ))}
      <rect x="2" y="2" width="436" height="116" rx="4" fill="none" stroke={INK} strokeWidth="4" />

      {/* panel 1 */}
      <g>
        <SpeechBubble x={12} y={8} w={82} h={26} />
        <text x="53" y="21" textAnchor="middle" fontSize="7.5" fontWeight="800" fill={INK}>
          E AGORA? COMO
        </text>
        <text x="53" y="30" textAnchor="middle" fontSize="7.5" fontWeight="800" fill={INK}>
          RESOLVO ISSO?
        </text>
        <BlobBird x={55} y={84} scale={0.72} bodyColor={bird1.bodyColor} accentColor={bird1.accentColor} armUp />
      </g>

      {/* panel 2 */}
      <g transform={`translate(${panelW},0)`}>
        <SpeechBubble x={14} y={8} w={84} h={26} />
        <text x="56" y="21" textAnchor="middle" fontSize="7.5" fontWeight="800" fill={INK}>
          PASSO A PASSO,
        </text>
        <text x="56" y="30" textAnchor="middle" fontSize="7.5" fontWeight="800" fill={INK}>
          SEM PRESSA!
        </text>
        <BlobBird x={55} y={84} scale={0.72} flip bodyColor={bird2.bodyColor} accentColor={bird2.accentColor} />
      </g>

      {/* panel 3 */}
      <g transform={`translate(${panelW * 2},0)`}>
        <SpeechBubble x={20} y={8} w={70} h={24} />
        <text x="55" y="24" textAnchor="middle" fontSize="8" fontWeight="800" fill={INK}>
          CONSEGUI!
        </text>
        <BlobBird x={55} y={84} scale={0.72} bodyColor={bird1.bodyColor} accentColor={bird1.accentColor} armUp />
      </g>

      {/* panel 4 */}
      <g transform={`translate(${panelW * 3},0)`}>
        <SpeechBubble x={14} y={8} w={82} h={24} />
        <text x="55" y="24" textAnchor="middle" fontSize="8" fontWeight="800" fill={INK}>
          ERA SÓ ISSO?
        </text>
        <BlobBird x={55} y={84} scale={0.72} flip bodyColor={bird2.bodyColor} accentColor={bird2.accentColor} holdingPhone />
      </g>
    </svg>
  )
}

export function ChartIllustration() {
  return (
    <Panel color="var(--color-math)">
      <Sparkle x={24} y={26} r={4} color="white" />
      <circle cx="200" cy="30" r={4} fill="white" opacity="0.7" />

      <g transform="translate(18,24)" stroke={INK} strokeWidth="2.4" strokeLinejoin="round">
        <rect width="110" height="82" rx="6" fill="white" />
        <line x1="16" y1="14" x2="16" y2="70" strokeWidth="1.5" />
        <line x1="16" y1="70" x2="98" y2="70" strokeWidth="1.5" />
        <rect x="26" y="44" width="13" height="26" fill="var(--color-math-dark)" strokeWidth="1.5" />
        <rect x="45" y="30" width="13" height="40" fill="var(--color-sim-dark)" strokeWidth="1.5" />
        <rect x="64" y="50" width="13" height="20" fill="var(--color-essay-dark)" strokeWidth="1.5" />
        <rect x="83" y="20" width="13" height="50" fill="var(--color-review-dark)" strokeWidth="1.5" />
      </g>

      <Person
        x={172}
        y={132}
        scale={1}
        flip
        shirt="var(--color-math-dark)"
        shirtDark="var(--color-math-ink)"
        pants="#123a66"
        hair="#3a2415"
        hairStyle="bun"
        heldProp={
          <g transform="translate(34,-78)">
            <line x1="0" y1="0" x2="-30" y2="-30" stroke={INK} strokeWidth="2.2" />
          </g>
        }
      />
    </Panel>
  )
}

export function TableIllustration() {
  return (
    <Panel color="var(--color-review)">
      <Sparkle x={198} y={26} r={4} color="white" />
      <circle cx="20" cy="130" r={4} fill="white" opacity="0.7" />

      <g transform="translate(20,26)" stroke={INK} strokeWidth="2.4" strokeLinejoin="round">
        <rect width="104" height="84" rx="6" fill="white" />
        <rect width="104" height="22" fill="var(--color-review-dark)" opacity="0.55" />
        <line x1="0" y1="22" x2="104" y2="22" strokeWidth="1.4" />
        <line x1="0" y1="48" x2="104" y2="48" strokeWidth="1.4" />
        <line x1="0" y1="74" x2="104" y2="74" strokeWidth="1.4" />
        <line x1="36" y1="0" x2="36" y2="84" strokeWidth="1.4" />
        <line x1="70" y1="0" x2="70" y2="84" strokeWidth="1.4" />
      </g>

      <Person
        x={172}
        y={132}
        scale={1}
        flip
        shirt="var(--color-review-dark)"
        shirtDark="var(--color-review-ink)"
        pants="#3a1a66"
        hair="#2b2320"
        hairStyle="short"
      />
    </Panel>
  )
}

export function PictureIllustration() {
  return (
    <Panel color="var(--color-port)">
      <Sparkle x={26} y={28} r={5} color="white" />
      <Gear x={198} y={126} r={12} color="var(--color-math)" />

      <g transform="translate(58,28)">
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

      <Person x={40} y={140} scale={0.9} shirt="var(--color-port-dark)" shirtDark="var(--color-port-ink)" pants="#3f4109" hair="#2b2320" hairStyle="short" />
    </Panel>
  )
}
