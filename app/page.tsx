import type React from "react"
import content from "@/data/content.json"
import type { SiteContent } from "@/types/content"

import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Programs } from "@/components/sections/programs"
import { Trainers } from "@/components/sections/trainers"
import { Transformations } from "@/components/sections/transformations"
import { Schedule } from "@/components/sections/schedule"
import { Membership } from "@/components/sections/membership"
import { Testimonials } from "@/components/sections/testimonials"
import { Gallery } from "@/components/sections/gallery"
import { Faq } from "@/components/sections/faq"
import { Contact } from "@/components/sections/contact"

const site = content as SiteContent

// Map each section key to its renderer. Sections render in the order and
// presence defined by `enabledSections` in data/content.json — reorder or
// remove entries there to change the page without touching component code.
const sectionRenderers: Record<string, () => React.ReactNode> = {
  hero: () => <Hero content={site.hero} />,
  about: () => <About content={site.about} />,
  programs: () => <Programs content={site.programs} />,
  trainers: () => <Trainers content={site.trainers} />,
  transformations: () => <Transformations content={site.transformations} />,
  schedule: () => <Schedule content={site.schedule} />,
  membership: () => <Membership content={site.membership} />,
  testimonials: () => <Testimonials content={site.testimonials} />,
  gallery: () => <Gallery content={site.gallery} />,
  faq: () => <Faq content={site.faq} />,
  contact: () => <Contact content={site.contact} />,
}

export default function Page() {
  return (
    <>
      <SiteNav siteMeta={site.siteMeta} trialHref={site.hero.cta.href} />
      <main>
        {site.enabledSections.map((key) => {
          const render = sectionRenderers[key]
          return render ? <div key={key}>{render()}</div> : null
        })}
      </main>
      <SiteFooter footer={site.footer} meta={site.siteMeta} />
    </>
  )
}
