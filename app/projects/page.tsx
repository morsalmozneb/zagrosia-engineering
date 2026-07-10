import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Zagrosia Engineering Inc.'s completed structural engineering projects across BC, Alberta & Saskatchewan — seismic retrofits, new builds, racking systems, and building rehabilitations.",
  alternates: { canonical: "https://www.zagrosia.ca/projects" },
  openGraph: {
    title: "Engineering Projects | Zagrosia Engineering Inc.",
    description:
      "Structural engineering projects in Western Canada — seismic retrofits, new construction, racking systems, and building rehabilitation.",
    url: "https://www.zagrosia.ca/projects",
  },
}

import { AboutPageHeader } from "@/components/about-page-header"
import { ProjectsHeroSection } from "@/components/projects-hero-section"
import { Footer } from "@/components/footer"

export default function ProjectsPage() {
  return (
    <main className="w-full overflow-hidden bg-[#FCFCFC] lg:overflow-visible lg:shadow-none">
      <div className="relative">
        <AboutPageHeader />
        <ProjectsHeroSection />
      </div>
      <Footer />
    </main>
  )
}
