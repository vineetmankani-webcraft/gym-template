import { Users, Clock, Flame } from "lucide-react"
import { SectionHeading } from "@/components/primitives/section-heading"
import { Reveal } from "@/components/primitives/reveal"
import type { ProgramsContent, Program } from "@/types/content"

export function Programs({ content }: { content: ProgramsContent }) {
  return (
    <section id="programs" className="scroll-mt-20 border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          intro={content.intro}
          index="01"
        />

        <ul className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((program, i) => (
            <Reveal as="li" key={program.id} delay={(i % 3) * 0.08} className="h-full">
              <ProgramCard program={program} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ProgramCard({ program }: { program: Program }) {
  return (
    <article className="group relative flex h-full flex-col bg-background p-7 transition-colors duration-300 hover:bg-surface-raised">
      {/* accent wipe on hover */}
      <span className="absolute left-0 top-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />

      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-2xl">{program.name}</h3>
        <IntensityMeter level={program.intensity} />
      </div>

      <p className="mt-1 text-sm font-medium text-accent">{program.tagline}</p>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{program.description}</p>

      <dl className="mt-6 space-y-2 border-t border-border pt-5 text-sm">
        <div className="flex items-center gap-2 text-muted">
          <Users className="h-4 w-4 shrink-0 text-steel" />
          <dt className="sr-only">Who it&apos;s for</dt>
          <dd>{program.forWho}</dd>
        </div>
        <div className="flex items-center gap-2 text-muted">
          <Clock className="h-4 w-4 shrink-0 text-steel" />
          <dt className="sr-only">Format</dt>
          <dd>{program.format}</dd>
        </div>
      </dl>
    </article>
  )
}

function IntensityMeter({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Intensity ${level} of 5`}>
      <Flame className="mr-0.5 h-3.5 w-3.5 text-accent" />
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-4 w-1 rounded-full ${i < level ? "bg-accent" : "bg-border"}`}
        />
      ))}
    </div>
  )
}
