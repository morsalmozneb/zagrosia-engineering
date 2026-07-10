import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Engineering Blog & Insights",
  description:
    "Structural engineering articles, seismic assessment insights, and AI-in-engineering updates from the team at Zagrosia Engineering Inc.",
  alternates: { canonical: "https://www.zagrosia.ca/blog" },
  openGraph: {
    title: "Engineering Blog | Zagrosia Engineering Inc.",
    description:
      "Structural engineering articles, seismic insights, and AI engineering updates from Zagrosia Engineering Inc.",
    url: "https://www.zagrosia.ca/blog",
  },
}

import { AboutPageHeader } from "@/components/about-page-header"
import { BlogSection } from "@/components/blog-section"
import { Footer } from "@/components/footer"

export default function BlogPage() {
  return (
    <main className="w-full overflow-hidden bg-[#FCFCFC] lg:overflow-visible lg:shadow-none">
      <div className="relative">
        <AboutPageHeader />
        <BlogSection />
      </div>
      <Footer />
    </main>
  )
}
