"use client"

import { useEffect, useState } from "react"
import { Menu, X, Dumbbell } from "lucide-react"
import type { SiteMeta } from "@/types/content"
import { cn } from "@/lib/utils"

interface SiteNavProps {
  siteMeta: SiteMeta
  trialHref: string
}

export function SiteNav({ siteMeta, trialHref }: SiteNavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2" aria-label={`${siteMeta.name} home`}>
          <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius)] bg-accent text-accent-foreground">
            <Dumbbell className="h-5 w-5" />
          </span>
          <span className="font-display text-xl leading-none">{siteMeta.shortName}</span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {siteMeta.nav.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="kicker text-[11px] text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={trialHref}
            className="hidden rounded-[var(--radius)] bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Free trial
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius)] border border-border text-foreground lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-40 origin-top bg-background/98 backdrop-blur-md transition-all duration-300 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <ul className="flex flex-col gap-1 px-4 py-6">
          {siteMeta.nav.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-border py-4 font-display text-3xl transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-6">
            <a
              href={trialHref}
              onClick={() => setOpen(false)}
              className="block rounded-[var(--radius)] bg-accent px-5 py-4 text-center font-semibold text-accent-foreground"
            >
              Claim your free trial week
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
