"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, ArrowDown } from "lucide-react"
import { Marquee } from "@/components/primitives/marquee"
import { StatCounter } from "@/components/primitives/stat-counter"
import type { HeroContent } from "@/types/content"

export function Hero({ content }: { content: HeroContent }) {
  const reduceMotion = useReducedMotion()

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.12, delayChildren: 0.1 },
    },
  }
  const line = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : "40%" },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
  }

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden pt-16">
      {/* Background image + wash */}
      <div className="absolute inset-0">
        <Image
          src={content.backgroundImage || "/placeholder.svg"}
          alt={content.backgroundAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-between px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-1 flex-col justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="kicker text-xs text-accent"
          >
            {content.eyebrow}
          </motion.span>

          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-4 font-display text-[clamp(3.5rem,14vw,11rem)] leading-[0.82]"
          >
            {content.titleLines.map((text, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  variants={line}
                  className={i === content.titleLines.length - 1 ? "inline-block text-accent" : "inline-block"}
                >
                  {text}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-foreground/80"
          >
            {content.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href={content.cta.href}
              className="group inline-flex items-center gap-2 rounded-[var(--radius)] bg-accent px-6 py-3.5 font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              {content.cta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            {content.secondaryCta && (
              <a
                href={content.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-border px-6 py-3.5 font-semibold text-foreground transition-colors hover:border-foreground/40 hover:bg-surface"
              >
                {content.secondaryCta.label}
              </a>
            )}
          </motion.div>
        </div>

        {/* Stat strip */}
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border sm:grid-cols-4"
        >
          {content.stats.map((stat) => (
            <div key={stat.label} className="bg-background/70 px-5 py-5 backdrop-blur-sm">
              <dd className="font-display text-3xl text-foreground sm:text-4xl">
                <StatCounter stat={stat} />
              </dd>
              <dt className="mt-1 text-xs uppercase tracking-wider text-muted">{stat.label}</dt>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 lg:block">
        <ArrowDown className="h-5 w-5 animate-bounce text-muted" />
      </div>

      {/* Marquee band */}
      <div className="relative border-y border-border bg-surface py-4">
        <Marquee items={content.marquee} />
      </div>
    </section>
  )
}
