import { oldPlaceholderSlugs } from "./lib/projects-redirects.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Optimization enabled — @netlify/plugin-nextjs handles this in production
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
  },
  // Compress responses
  compress: true,
  // The 16 earlier placeholder project pages were replaced; send old URLs to the projects listing
  async redirects() {
    return oldPlaceholderSlugs.map((slug) => ({
      source: `/projects/${slug}`,
      destination: "/projects",
      permanent: true,
    }))
  },
}

export default nextConfig
