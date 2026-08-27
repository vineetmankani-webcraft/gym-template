/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export so the site can be hosted on Cloudflare Pages,
  // GitHub Pages, S3, or any static host with `next build`.
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Required for `output: "export"` — no server image optimizer at runtime.
    unoptimized: true,
  },
}

export default nextConfig
