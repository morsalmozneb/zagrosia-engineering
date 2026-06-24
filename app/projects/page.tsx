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
