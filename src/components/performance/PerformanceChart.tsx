import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

export function PerformanceChart({
  data,
  color = '#211d1a',
}: {
  data: { label: string; percent: number }[]
  color?: string
}) {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
          <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#6b645d' }} axisLine={false} tickLine={false} />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: '#6b645d' }}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip formatter={(value) => [`${value}%`, 'Acertos']} />
          <Line type="monotone" dataKey="percent" stroke={color} strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
