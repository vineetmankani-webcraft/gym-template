import { Reveal } from "./reveal"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  eyebrow: string
  title: string
  intro?: string
  align?: "left" | "center"
  className?: string
  /** Optional index label shown as a large ghost number. */
  index?: string
}

/**
 * Shared heading block: kicker eyebrow, condensed display title, optional intro.
 * Used by nearly every section for consistent rhythm.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  index,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal>
        <span className="kicker inline-flex items-center gap-2 text-xs text-accent">
          {index && <span className="text-muted">{index}</span>}
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display text-4xl leading-[0.92] text-balance sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "max-w-2xl text-pretty leading-relaxed text-muted",
              align === "center" && "mx-auto",
            )}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  )
}
