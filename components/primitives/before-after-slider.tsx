"use client"

import type React from "react"
import { useCallback, useRef, useState } from "react"
import Image from "next/image"
import { MoveHorizontal } from "lucide-react"

interface BeforeAfterSliderProps {
  beforeImage: string
  beforeAlt: string
  afterImage: string
  afterAlt: string
}

/**
 * Draggable before/after comparison. Works with pointer drag anywhere on the
 * image and with an overlaid range input for keyboard / touch accessibility.
 */
export function BeforeAfterSlider({
  beforeImage,
  beforeAlt,
  afterImage,
  afterAlt,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const draggingRef = useRef(false)

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, pct)))
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    setFromClientX(e.clientX)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return
    setFromClientX(e.clientX)
  }

  const onPointerUp = () => {
    draggingRef.current = false
  }

  return (
    <div className="group relative">
      <div
        ref={containerRef}
        className="relative aspect-[4/5] w-full touch-none overflow-hidden rounded-[var(--radius)] border border-border bg-surface select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* After image (base layer) */}
        <Image
          src={afterImage || "/placeholder.svg"}
          alt={afterAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          draggable={false}
        />
        <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-accent-foreground">
          After
        </span>

        {/* Before image (clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={beforeImage || "/placeholder.svg"}
            alt={beforeAlt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover grayscale"
            draggable={false}
          />
          <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full border border-border bg-background/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-muted">
            Before
          </span>
        </div>

        {/* Handle */}
        <div
          className="pointer-events-none absolute inset-y-0 z-20 w-0.5 bg-accent"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform group-hover:scale-110">
            <MoveHorizontal className="h-5 w-5" />
          </div>
        </div>

        {/* Accessible control overlaid across the image */}
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(position)}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label="Reveal before and after comparison"
          className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </div>
  )
}
