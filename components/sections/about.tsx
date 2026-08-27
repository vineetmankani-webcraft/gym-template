import Image from "next/image"
import { Reveal } from "@/components/primitives/reveal"
import { StatCounter } from "@/components/primitives/stat-counter"
import type { AboutContent } from "@/types/content"

export function About({ content }: { content: AboutContent }) {
  return (
    <section id="about" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Images */}
        <div className="relative">
          <Reveal direction="right">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius)] border border-border">
              <Image
                src={content.image || "/placeholder.svg"}
                alt={content.imageAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          {content.secondaryImage && (
            <Reveal direction="up" delay={0.15}>
              <div className="absolute -bottom-8 -right-4 hidden aspect-square w-40 overflow-hidden rounded-[var(--radius)] border-4 border-background sm:block lg:w-48">
                <Image
                  src={content.secondaryImage || "/placeholder.svg"}
                  alt={content.secondaryImageAlt ?? ""}
                  fill
                  sizes="12rem"
                  className="object-cover"
                />
              </div>
            </Reveal>
          )}
        </div>

        {/* Copy */}
        <div className="flex flex-col justify-center">
          <Reveal>
            <span className="kicker text-xs text-accent">{content.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-4xl leading-[0.95] text-balance sm:text-5xl">
              {content.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-foreground/90">{content.lead}</p>
          </Reveal>
          {content.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.15 + i * 0.05}>
              <p className="mt-4 leading-relaxed text-muted">{p}</p>
            </Reveal>
          ))}

          <Reveal delay={0.25}>
            <blockquote className="mt-8 border-l-2 border-accent pl-5 font-display text-xl leading-tight text-foreground">
              {content.pullQuote}
            </blockquote>
          </Reveal>

          <Reveal delay={0.3}>
            <dl className="mt-10 grid grid-cols-3 gap-6">
              {content.stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="font-display text-3xl text-accent">
                    <StatCounter stat={stat} />
                  </dd>
                  <dt className="mt-1 text-xs uppercase tracking-wider text-muted">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
