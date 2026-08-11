import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Lab",
  description:
    "Zagrosia Engineering's AI Lab — AI-powered structural engineering tools, automated seismic analysis, and intelligent building assessment software built for licensed P.Eng engineers.",
  alternates: { canonical: "https://www.zagrosia.ca/ai-lab" },
  openGraph: {
    title: "AI Engineering Lab | Zagrosia Engineering Inc.",
    description:
      "AI-powered tools for structural engineers — automated seismic analysis, intelligent building assessments, and more from Zagrosia Engineering.",
    url: "https://www.zagrosia.ca/ai-lab",
  },
}

import { AboutPageHeader } from "@/components/about-page-header"
import { AILabSection } from "@/components/ai-lab-section"
import { Footer } from "@/components/footer"

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.zagrosia.ca" },
        { "@type": "ListItem", position: 2, name: "AI Lab", item: "https://www.zagrosia.ca/ai-lab" },
      ],
    },
    {
      "@type": "SoftwareApplication",
      name: "Zagrosia AI Engineering Lab",
      applicationCategory: "EngineeringApplication",
      url: "https://www.zagrosia.ca/ai-lab",
      description: "AI-powered structural engineering tools including Python automation scripts, VBA macros, and a 500+ video educational platform for professional engineers.",
      provider: { "@type": "ProfessionalService", name: "Zagrosia Engineering Inc.", url: "https://www.zagrosia.ca" },
      offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
    },
  ],
}

export default function AILabPage() {
  return (
    <main className="w-full overflow-hidden bg-[#FCFCFC] lg:overflow-visible lg:shadow-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="relative">
        <AboutPageHeader />
        <AILabSection />
      </div>
      <Footer />
    </main>
  )
}
