"use client"

import { useState } from "react"
import { Check, Minus } from "lucide-react"
import { SectionHeading } from "@/components/primitives/section-heading"
import { Reveal } from "@/components/primitives/reveal"
import { cn } from "@/lib/utils"
import type { MembershipContent, MembershipTier } from "@/types/content"

export function Membership({ content }: { content: MembershipContent }) {
  const [annual, setAnnual] = useState(true)

  return (
    <section id="membership" className="scroll-mt-20 border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} intro={content.intro} index="06" />

        <Reveal delay={0.1}>
          <div className="mt-8 flex items-center gap-4">
            <span className={cn("text-sm font-medium", !annual ? "text-foreground" : "text-muted")}>
              Monthly
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={annual}
              onClick={() => setAnnual((v) => !v)}
              className={cn(
                "relative h-7 w-12 rounded-full border border-border transition-colors",
                annual ? "bg-accent" : "bg-background",
              )}
            >
              <span className="sr-only">Toggle annual pricing</span>
              <span
                className={cn(
                  "absolute top-0.5 h-5 w-5 rounded-full bg-foreground transition-transform",
                  annual ? "translate-x-6 bg-accent-foreground" : "translate-x-0.5",
                )}
              />
            </button>
            <span className={cn("text-sm font-medium", annual ? "text-foreground" : "text-muted")}>
              Annual{" "}
              <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent">
                Save ~17%
              </span>
            </span>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {content.tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={(i % 3) * 0.08} className="h-full">
              <TierCard tier={tier} annual={annual} currency={content.currency} features={content.features} />
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-steel">{content.note}</p>
      </div>
    </section>
  )
}

function TierCard({
  tier,
  annual,
  currency,
  features,
}: {
  tier: MembershipTier
  annual: boolean
  currency: string
  features: string[]
}) {
  const price = annual ? tier.annual : tier.monthly

  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-[var(--radius)] border bg-background p-7",
        tier.popular ? "border-accent shadow-[0_0_0_1px_var(--color-accent)]" : "border-border",
      )}
    >
      {tier.popular && (
        <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent-foreground">
          Most popular
        </span>
      )}

      <h3 className="font-display text-2xl">{tier.name}</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted">{tier.blurb}</p>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-display text-5xl">
          {currency}
          {price}
        </span>
        <span className="text-sm text-muted">/mo</span>
      </div>

      <a
        href="#contact"
        className={cn(
          "mt-6 inline-flex items-center justify-center rounded-[var(--radius)] px-5 py-3 text-sm font-semibold transition-colors",
          tier.popular
            ? "bg-accent text-accent-foreground hover:bg-accent/90"
            : "border border-border bg-surface/40 text-foreground hover:bg-surface-raised",
        )}
      >
        {tier.cta}
      </a>

      <ul className="mt-7 flex flex-1 flex-col gap-3 border-t border-border pt-6 text-sm">
        {features.map((feature, idx) => {
          const value = tier.values[idx]
          const included = value !== false
          return (
            <li key={feature} className="flex items-start gap-3">
              {included ? (
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              ) : (
                <Minus className="mt-0.5 h-4 w-4 shrink-0 text-steel/50" />
              )}
              <span className={cn(included ? "text-foreground" : "text-steel/60")}>
                {feature}
                {typeof value === "string" && (
                  <span className="ml-1 text-muted">— {value}</span>
                )}
                {typeof value === "number" && <span className="ml-1 text-muted">— {value}</span>}
              </span>
            </li>
          )
        })}
      </ul>
    </article>
  )
}
