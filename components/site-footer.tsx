import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/primitives/reveal"
import type { FooterContent, SiteMeta } from "@/types/content"

export function SiteFooter({ footer, meta }: { footer: FooterContent; meta: SiteMeta }) {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* CTA band */}
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 border-b border-border py-16 sm:flex-row sm:items-center">
            <h2 className="font-display text-4xl leading-[0.95] text-balance sm:text-5xl md:text-6xl">
              {footer.headline}
            </h2>
            <a
              href={footer.cta.href}
              className="group inline-flex shrink-0 items-center gap-2 rounded-[var(--radius)] bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              {footer.cta.label}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>

        {/* Link columns */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <span className="font-display text-2xl tracking-tight">{meta.name}</span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{meta.tagline}</p>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
              {meta.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {s.label} <span className="text-steel">{s.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footer.columns.map((col) => (
            <div key={col.title}>
              <h3 className="kicker text-xs text-steel">{col.title}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-muted transition-colors hover:text-foreground">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-2 border-t border-border py-6 text-xs text-steel sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.legal}</p>
          <p>
            &copy; {new Date().getFullYear()} {meta.name}. {meta.locality}.
          </p>
        </div>
      </div>
    </footer>
  )
}
