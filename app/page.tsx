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
    <main className="mx-auto max-w-[390px] overflow-hidden bg-[#fcfcfc] shadow-[0_0_0_1px_rgba(13,44,96,0.05)] lg:max-w-none lg:overflow-visible lg:shadow-none">
      <HeroSection />
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
