import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.zagrosia.ca" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.zagrosia.ca/blog" },
      ],
    },
    {
      "@type": "Blog",
      name: "Zagrosia Engineering Blog",
      url: "https://www.zagrosia.ca/blog",
      description: "Structural engineering articles, seismic assessment insights, and AI-in-engineering updates.",
      publisher: { "@type": "Organization", name: "Zagrosia Engineering Inc.", url: "https://www.zagrosia.ca" },
      inLanguage: "en-CA",
    },
  ],
}

export default function BlogPage() {
  return (
    <main className="w-full overflow-hidden bg-[#FCFCFC] lg:overflow-visible lg:shadow-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="relative">
        <AboutPageHeader />
        <BlogSection />
      </div>
      <Footer />
    </main>
  )
}
