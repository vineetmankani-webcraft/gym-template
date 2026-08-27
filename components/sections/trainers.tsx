import Image from "next/image"
import { SectionHeading } from "@/components/primitives/section-heading"
import { Reveal } from "@/components/primitives/reveal"
import type { TrainersContent, Trainer } from "@/types/content"

export function Trainers({ content }: { content: TrainersContent }) {
  return (
    <section id="trainers" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} intro={content.intro} index="03" />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((trainer, i) => (
            <Reveal as="li" key={trainer.name} delay={(i % 4) * 0.08} className="h-full">
              <TrainerCard trainer={trainer} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function TrainerCard({ trainer }: { trainer: Trainer }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius)] border border-border bg-surface/40">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={trainer.image || "/placeholder.svg"}
          alt={trainer.imageAlt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-pretty text-sm italic leading-snug text-foreground">
            &ldquo;{trainer.quote}&rdquo;
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl">{trainer.name}</h3>
        <p className="mt-0.5 text-sm font-medium text-accent">{trainer.specialty}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{trainer.bio}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {trainer.certifications.map((cert) => (
            <li
              key={cert}
              className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-steel"
            >
              {cert}
            </li>
          ))}
        </ul>

        <p className="mt-4 border-t border-border pt-3 text-xs font-medium text-muted">{trainer.social}</p>
      </div>
    </article>
  )
}
