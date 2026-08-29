import type { TopicErrors } from '../../data/types'

export function ErrorTopicBar({ topic, maxCount }: { topic: TopicErrors; maxCount: number }) {
  const percent = (topic.count / maxCount) * 100

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold">{topic.topic}</span>
        <span className="text-ink-soft">{topic.count} erros</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-ink/5">
        <div className="h-full rounded-full bg-port-dark" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
