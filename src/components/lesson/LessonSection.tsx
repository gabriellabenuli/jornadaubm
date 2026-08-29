import type { LessonSectionData } from '../../data/types'
import { ExampleCard } from './ExampleCard'
import { AttentionCard } from './AttentionCard'

export function LessonSection({ section, index }: { section: LessonSectionData; index: number }) {
  if (section.type === 'example') return <ExampleCard title={section.title} body={section.body} />
  if (section.type === 'attention') return <AttentionCard title={section.title} body={section.body} />

  return (
    <section>
      <h3 className="mb-2 font-semibold">
        {index + 1}. {section.title}
      </h3>
      <p className="whitespace-pre-line text-lg leading-relaxed text-ink-soft">{section.body}</p>
    </section>
  )
}
