import Image from "next/image"
import { HeroSection } from "@/components/hero-section"
import { EngineeringSolutions } from "@/components/engineering-solutions"
import { AIAutomationLab } from "@/components/ai-automation-lab"
import { EngineeringExcellence } from "@/components/engineering-excellence"
import { ProjectsSection } from "@/components/projects-section"
import { EGBCExamPrep } from "@/components/egbc-exam-prep"
import { EngineeringBlog } from "@/components/engineering-blog"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="w-full overflow-hidden bg-[#fcfcfc] lg:overflow-visible lg:shadow-none">
      <HeroSection />

      {/* Mobile-only building photo section */}
      <div className="lg:hidden relative w-full bg-black" style={{ height: "466px" }}>
        <Image
          src="/images/architectural-building.png"
          alt="Architectural building"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="below-hero-content">
        <EngineeringSolutions />
        <AIAutomationLab />
        <EngineeringExcellence />
        <ProjectsSection />
        <EGBCExamPrep />
        <EngineeringBlog />
        <Footer />
      </div>
    </main>
  )
}
