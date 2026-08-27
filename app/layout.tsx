import type React from "react"
import type { Metadata, Viewport } from "next"
import { Anton, Space_Grotesk } from "next/font/google"
import content from "@/data/content.json"
import "./globals.css"

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
})

const { siteMeta } = content

export const metadata: Metadata = {
  title: {
    default: `${siteMeta.name} — ${siteMeta.tagline}`,
    template: `%s — ${siteMeta.name}`,
  },
  description:
    "A no-nonsense strength and conditioning gym. Expert coaching, real barbells, and month-to-month memberships. Claim your free trial week.",
  keywords: [
    "gym",
    "strength training",
    "powerlifting",
    "personal training",
    "conditioning",
    "Austin gym",
    siteMeta.name,
  ],
  authors: [{ name: siteMeta.name }],
  openGraph: {
    title: `${siteMeta.name} — ${siteMeta.tagline}`,
    description: "Expert coaching, real barbells, month-to-month memberships. Claim your free trial week.",
    type: "website",
    locale: "en_US",
    siteName: siteMeta.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteMeta.name} — ${siteMeta.tagline}`,
    description: "Expert coaching, real barbells, month-to-month memberships.",
  },
  robots: { index: true, follow: true },
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#100f0d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${anton.variable} ${spaceGrotesk.variable} bg-background`}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        {children}
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  )
}
