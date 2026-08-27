"use client"

import type React from "react"
import { useState } from "react"
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from "lucide-react"
import { SectionHeading } from "@/components/primitives/section-heading"
import { Reveal } from "@/components/primitives/reveal"
import { cn } from "@/lib/utils"
import type { ContactContent } from "@/types/content"

export function Contact({ content }: { content: ContactContent }) {
  const [selectedGoal, setSelectedGoal] = useState<string>(content.goals[0])
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Demo template: no backend. Swap this for your form handler / API route.
    setSubmitted(true)
  }

  return (
    <section id="contact" className="scroll-mt-20 border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} intro={content.intro} index="10" />

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {/* Details */}
          <Reveal>
            <div className="flex flex-col gap-8">
              <ul className="flex flex-col gap-5">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    {content.addressLines.map((line) => (
                      <p key={line} className="leading-snug">
                        {line}
                      </p>
                    ))}
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-accent" />
                  <a href={`tel:${content.phone.replace(/[^\d+]/g, "")}`} className="hover:text-accent">
                    {content.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-accent" />
                  <a href={`mailto:${content.email}`} className="hover:text-accent">
                    {content.email}
                  </a>
                </li>
              </ul>

              <div className="rounded-[var(--radius)] border border-border bg-background p-5">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Clock className="h-4 w-4 text-accent" />
                  Hours
                </div>
                <dl className="mt-3 flex flex-col divide-y divide-border text-sm">
                  {content.hours.map((h) => (
                    <div key={h.days} className="flex items-center justify-between py-2">
                      <dt className="text-muted">{h.days}</dt>
                      <dd className="font-medium">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="overflow-hidden rounded-[var(--radius)] border border-border">
                <div className="flex aspect-[16/9] items-center justify-center bg-[repeating-linear-gradient(45deg,var(--color-surface),var(--color-surface)_12px,var(--color-surface-raised)_12px,var(--color-surface-raised)_24px)]">
                  <div className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium">
                    <MapPin className="h-4 w-4 text-accent" />
                    {content.mapLabel}
                  </div>
                </div>
                <p className="bg-background px-4 py-3 text-xs text-steel">{content.mapCaption}</p>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <div className="rounded-[var(--radius)] border border-border bg-background p-6 sm:p-8">
              {submitted ? (
                <div className="flex h-full min-h-64 flex-col items-center justify-center gap-4 text-center">
                  <CheckCircle2 className="h-14 w-14 text-accent" />
                  <p className="text-pretty text-lg leading-relaxed">{content.successMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <h3 className="font-display text-2xl">{content.formHeading}</h3>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="First name" name="firstName" autoComplete="given-name" required />
                    <Field label="Last name" name="lastName" autoComplete="family-name" required />
                  </div>
                  <Field label="Email" name="email" type="email" autoComplete="email" required />
                  <Field label="Phone" name="phone" type="tel" autoComplete="tel" />

                  <fieldset>
                    <legend className="mb-2 text-sm font-medium">Primary goal</legend>
                    <div className="flex flex-wrap gap-2">
                      {content.goals.map((goal) => (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => setSelectedGoal(goal)}
                          aria-pressed={selectedGoal === goal}
                          className={cn(
                            "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                            selectedGoal === goal
                              ? "border-accent bg-accent text-accent-foreground"
                              : "border-border bg-surface/40 text-muted hover:text-foreground",
                          )}
                        >
                          {goal}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <button
                    type="submit"
                    className="mt-1 inline-flex items-center justify-center rounded-[var(--radius)] bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
                  >
                    Claim my free week
                  </button>
                  <p className="text-center text-xs text-steel">
                    No card required. We&apos;ll never share your details.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  autoComplete?: string
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium">
        {label}
        {required && <span className="ml-0.5 text-accent">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="rounded-[var(--radius)] border border-border bg-surface/40 px-3.5 py-2.5 text-foreground outline-none transition-colors placeholder:text-steel focus:border-accent"
      />
    </label>
  )
}
