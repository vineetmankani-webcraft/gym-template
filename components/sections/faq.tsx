"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { SectionHeading } from "@/components/primitives/section-heading"
import { Reveal } from "@/components/primitives/reveal"
import { cn } from "@/lib/utils"
import type { FaqContent } from "@/types/content"

export function Faq({ content }: { content: FaqContent }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} align="center" index="09" />

        <ul className="mt-14 flex flex-col gap-3">
          {content.items.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal as="li" key={item.q} delay={(i % 4) * 0.05}>
                <div className="overflow-hidden rounded-[var(--radius)] border border-border bg-surface/40">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-medium">{item.q}</span>
                    <Plus
                      className={cn(
                        "h-5 w-5 shrink-0 text-accent transition-transform duration-300",
                        isOpen && "rotate-45",
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
