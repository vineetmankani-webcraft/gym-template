/**
 * TypeScript interfaces describing the shape of `data/content.json`.
 * Every section component imports the matching interface from here, so a
 * client editing content.json gets type-safety without touching components.
 */

export interface NavLink {
  label: string
  href: string
}

export interface SocialLink {
  label: string
  handle: string
  href: string
}

export interface SiteMeta {
  name: string
  shortName: string
  tagline: string
  locality: string
  nav: NavLink[]
  social: SocialLink[]
}

export interface Stat {
  value: number
  /** rendered after the animated number, e.g. "+", "K", "/wk" */
  suffix?: string
  /** rendered before the number, e.g. "₹" */
  prefix?: string
  label: string
}

export interface HeroContent {
  eyebrow: string
  titleLines: string[]
  subtitle: string
  cta: NavLink
  secondaryCta?: NavLink
  marquee: string[]
  backgroundImage: string
  backgroundAlt: string
  stats: Stat[]
}

export interface AboutContent {
  eyebrow: string
  title: string
  lead: string
  paragraphs: string[]
  pullQuote: string
  image: string
  imageAlt: string
  secondaryImage?: string
  secondaryImageAlt?: string
  stats: Stat[]
}

export interface Program {
  id: string
  name: string
  tagline: string
  forWho: string
  format: string
  intensity: number // 1-5
  description: string
}

export interface ProgramsContent {
  eyebrow: string
  title: string
  intro: string
  items: Program[]
}

export interface Trainer {
  name: string
  specialty: string
  image: string
  imageAlt: string
  certifications: string[]
  quote: string
  bio: string
  social: string
}

export interface TrainersContent {
  eyebrow: string
  title: string
  intro: string
  items: Trainer[]
}

export interface Transformation {
  beforeImage: string
  beforeAlt: string
  afterImage: string
  afterAlt: string
  name: string
  caption: string
  timeframe: string
  program: string
}

export interface TransformationsContent {
  eyebrow: string
  title: string
  intro: string
  items: Transformation[]
}

export interface ScheduleSession {
  time: string
  name: string
  type: string
  coach: string
  duration: string
}

export interface ScheduleDay {
  day: string
  short: string
  sessions: ScheduleSession[]
}

export interface ScheduleContent {
  eyebrow: string
  title: string
  intro: string
  classTypes: string[]
  days: ScheduleDay[]
}

export interface MembershipTier {
  name: string
  popular?: boolean
  monthly: number
  annual: number
  blurb: string
  cta: string
  /**
   * Values aligned by index with MembershipContent.features.
   * boolean -> included / excluded; string -> a specific detail.
   */
  values: Array<boolean | string>
}

export interface MembershipContent {
  eyebrow: string
  title: string
  intro: string
  note: string
  currency: string
  features: string[]
  tiers: MembershipTier[]
}

export interface Testimonial {
  quote: string
  name: string
  detail: string
}

export interface TestimonialsContent {
  eyebrow: string
  title: string
  items: Testimonial[]
}

export interface GalleryImage {
  src: string
  alt: string
  caption: string
}

export interface GalleryContent {
  eyebrow: string
  title: string
  intro: string
  images: GalleryImage[]
}

export interface FaqItem {
  q: string
  a: string
}

export interface FaqContent {
  eyebrow: string
  title: string
  items: FaqItem[]
}

export interface ContactHours {
  days: string
  time: string
}

export interface ContactContent {
  eyebrow: string
  title: string
  intro: string
  addressLines: string[]
  hours: ContactHours[]
  phone: string
  email: string
  mapLabel: string
  mapCaption: string
  formHeading: string
  goals: string[]
  successMessage: string
}

export interface FooterContent {
  headline: string
  cta: NavLink
  columns: Array<{ title: string; links: NavLink[] }>
  legal: string
}

export interface SiteContent {
  enabledSections: string[]
  siteMeta: SiteMeta
  hero: HeroContent
  about: AboutContent
  programs: ProgramsContent
  trainers: TrainersContent
  transformations: TransformationsContent
  schedule: ScheduleContent
  membership: MembershipContent
  testimonials: TestimonialsContent
  gallery: GalleryContent
  faq: FaqContent
  contact: ContactContent
  footer: FooterContent
}

export type SectionKey = keyof Omit<SiteContent, 'enabledSections' | 'siteMeta' | 'footer'>
