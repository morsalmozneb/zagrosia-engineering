import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected structural engineering projects and principal experience from Zagrosia Engineering Inc. — fire and storm damage assessments, temporary shoring, concrete repair, racking systems, residential and industrial design.",
  alternates: { canonical: "https://www.zagrosia.ca/projects" },
  openGraph: {
    title: "Engineering Projects | Zagrosia Engineering Inc.",
    description:
      "Selected structural engineering projects — damage assessments, temporary shoring, concrete repair, racking and residential design.",
    url: "https://www.zagrosia.ca/projects",
  },
}

import { AboutPageHeader } from "@/components/about-page-header"
import { ProjectsHeroSection } from "@/components/projects-hero-section"
import { Footer } from "@/components/footer"

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.zagrosia.ca" },
        { "@type": "ListItem", position: 2, name: "Projects", item: "https://www.zagrosia.ca/projects" },
      ],
    },
    {
      "@type": "CollectionPage",
      name: "Structural Engineering Projects",
      url: "https://www.zagrosia.ca/projects",
      description: "Selected structural engineering projects and principal experience from Zagrosia Engineering Inc.",
      provider: { "@type": "ProfessionalService", name: "Zagrosia Engineering Inc.", url: "https://www.zagrosia.ca" },
    },
  ],
}

export default function ProjectsPage() {
  return (
    <main className="w-full overflow-hidden bg-[#FCFCFC] lg:overflow-visible lg:shadow-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="relative">
        <AboutPageHeader />
        <ProjectsHeroSection />
      </div>
      <Footer />
    </main>
  )
}
