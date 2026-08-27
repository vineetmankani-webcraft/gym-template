import { Quote } from "lucide-react"
import { SectionHeading } from "@/components/primitives/section-heading"
import { Reveal } from "@/components/primitives/reveal"
import type { TestimonialsContent, Testimonial } from "@/types/content"

export function Testimonials({ content }: { content: TestimonialsContent }) {
  return (
    <section id="testimonials" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} index="07" />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {content.items.map((item, i) => (
            <Reveal key={item.name} delay={(i % 2) * 0.1} className="h-full">
              <TestimonialCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-[var(--radius)] border border-border bg-surface/40 p-7">
      <Quote className="h-8 w-8 text-accent" aria-hidden />
      <blockquote className="mt-4 flex-1 text-pretty text-lg leading-relaxed">
        {item.quote}
      </blockquote>
      <figcaption className="mt-6 border-t border-border pt-4">
        <span className="font-display text-lg">{item.name}</span>
        <p className="text-sm text-muted">{item.detail}</p>
      </figcaption>
    </figure>
  )
}
