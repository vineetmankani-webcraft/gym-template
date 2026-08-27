import Image from "next/image"
import { SectionHeading } from "@/components/primitives/section-heading"
import { Reveal } from "@/components/primitives/reveal"
import { cn } from "@/lib/utils"
import type { GalleryContent } from "@/types/content"

// Varied spans create an editorial mosaic instead of a uniform grid.
const spans = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "",
  "",
  "sm:col-span-2",
  "",
]

export function Gallery({ content }: { content: GalleryContent }) {
  return (
    <section id="gallery" className="scroll-mt-20 border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} intro={content.intro} index="08" />

        <div className="mt-14 grid auto-rows-[200px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {content.images.map((img, i) => (
            <Reveal
              key={img.src}
              delay={(i % 4) * 0.06}
              className={cn("group relative overflow-hidden rounded-[var(--radius)] border border-border", spans[i % spans.length])}
            >
              <Image
                src={img.src || "/placeholder.svg"}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute bottom-3 left-3 translate-y-1 text-sm font-semibold text-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {img.caption}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
