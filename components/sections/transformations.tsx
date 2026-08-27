import { SectionHeading } from "@/components/primitives/section-heading"
import { Reveal } from "@/components/primitives/reveal"
import { BeforeAfterSlider } from "@/components/primitives/before-after-slider"
import type { TransformationsContent, Transformation } from "@/types/content"

export function Transformations({ content }: { content: TransformationsContent }) {
  return (
    <section id="transformations" className="scroll-mt-20 border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} intro={content.intro} index="04" />

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {content.items.map((item, i) => (
            <Reveal key={item.name} delay={(i % 2) * 0.1}>
              <TransformationCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function TransformationCard({ item }: { item: Transformation }) {
  return (
    <figure className="flex flex-col gap-4">
      <BeforeAfterSlider
        beforeImage={item.beforeImage}
        beforeAlt={item.beforeAlt}
        afterImage={item.afterImage}
        afterAlt={item.afterAlt}
      />
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div>
          <span className="font-display text-lg">{item.name}</span>
          <p className="text-sm leading-relaxed text-muted">{item.caption}</p>
        </div>
        <div className="text-right text-xs">
          <p className="font-semibold text-accent">{item.timeframe}</p>
          <p className="text-steel">{item.program}</p>
        </div>
      </figcaption>
    </figure>
  )
}
