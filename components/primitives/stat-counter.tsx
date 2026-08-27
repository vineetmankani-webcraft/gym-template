"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"
import type { Stat } from "@/types/content"

interface StatCounterProps {
  stat: Stat
  className?: string
}

/**
 * Counts up to the target value once it scrolls into view.
 * Renders the final value immediately for reduced-motion users.
 */
export function StatCounter({ stat, className }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const reduceMotion = useReducedMotion()
  const [value, setValue] = useState(reduceMotion ? stat.value : 0)

  useEffect(() => {
    if (!inView || reduceMotion) return
    let raf = 0
    const duration = 1400
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // easeOutExpo for a punchy finish
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setValue(Math.round(eased * stat.value))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduceMotion, stat.value])

  return (
    <span ref={ref} className={className}>
      {stat.prefix}
      {value.toLocaleString()}
      {stat.suffix}
    </span>
  )
}
