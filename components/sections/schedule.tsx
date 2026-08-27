"use client"

import { useState } from "react"
import { SectionHeading } from "@/components/primitives/section-heading"
import { Reveal } from "@/components/primitives/reveal"
import { cn } from "@/lib/utils"
import type { ScheduleContent } from "@/types/content"

export function Schedule({ content }: { content: ScheduleContent }) {
  const [active, setActive] = useState<string>("All")
  const filters = ["All", ...content.classTypes]

  return (
    <section id="schedule" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} intro={content.intro} index="05" />

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter classes by type">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={active === f}
                onClick={() => setActive(f)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                  active === f
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-surface/40 text-muted hover:text-foreground",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.days.map((day, i) => {
            const sessions =
              active === "All" ? day.sessions : day.sessions.filter((s) => s.type === active)
            return (
              <Reveal key={day.day} delay={(i % 3) * 0.06}>
                <div className="flex h-full flex-col rounded-[var(--radius)] border border-border bg-surface/40 p-5">
                  <div className="flex items-baseline justify-between border-b border-border pb-3">
                    <h3 className="font-display text-xl">{day.day}</h3>
                    <span className="kicker text-xs text-steel">{day.short}</span>
                  </div>
                  <ul className="mt-3 flex flex-1 flex-col divide-y divide-border">
                    {sessions.length === 0 && (
                      <li className="py-6 text-sm text-steel">No {active} sessions.</li>
                    )}
                    {sessions.map((s, idx) => (
                      <li key={`${s.time}-${idx}`} className="flex items-center gap-3 py-3">
                        <span className="w-14 shrink-0 font-mono text-sm text-accent">{s.time}</span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{s.name}</p>
                          <p className="text-xs text-muted">
                            {s.coach} · {s.duration}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
