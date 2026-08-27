"use client"

import { motion, useReducedMotion } from "framer-motion"

interface MarqueeProps {
  items: string[]
  /** seconds per full loop */
  speed?: number
  reverse?: boolean
  className?: string
}

/**
 * Infinite horizontal ticker. Duplicates the item list so the loop is seamless.
 * Freezes to a static wrap when the user prefers reduced motion.
 */
export function Marquee({ items, speed = 26, reverse = false, className }: MarqueeProps) {
  const reduceMotion = useReducedMotion()
  const loop = [...items, ...items]

  if (reduceMotion) {
    return (
      <div className={className}>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          {items.map((item, i) => (
            <MarqueeItem key={i} label={item} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={className} aria-hidden="true">
      <div className="flex overflow-hidden">
        <motion.div
          className="flex shrink-0 items-center gap-8 pr-8"
          animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
          transition={{ duration: speed, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
        >
          {loop.map((item, i) => (
            <MarqueeItem key={i} label={item} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

function MarqueeItem({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-8 whitespace-nowrap">
      <span className="font-display text-2xl md:text-4xl text-foreground/80">{label}</span>
      <span className="inline-block h-2 w-2 rotate-45 bg-accent" />
    </span>
  )
}
