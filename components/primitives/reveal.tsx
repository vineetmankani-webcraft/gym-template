"use client"

import type React from "react"
import { motion, useReducedMotion } from "framer-motion"

type Direction = "up" | "down" | "left" | "right" | "none"

interface RevealProps {
  children: React.ReactNode
  className?: string
  /** Stagger delay in seconds. */
  delay?: number
  direction?: Direction
  /** Render as a specific element for semantics. */
  as?: "div" | "section" | "li" | "article" | "span"
  once?: boolean
}

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
}

/**
 * Scroll-triggered entrance animation. Honors prefers-reduced-motion by
 * rendering content statically with no transform.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  as = "div",
  once = true,
}: RevealProps) {
  const reduceMotion = useReducedMotion()
  const MotionTag = motion[as]

  if (reduceMotion) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}
