import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Structural Engineers in BC, Alberta & Saskatchewan",
  description:
    "Zagrosia Engineering Inc. — licensed P.Eng structural engineers serving BC, Alberta, and Saskatchewan. Seismic assessments, structural design, building rehabilitation, racking systems, and AI-powered engineering tools.",
  alternates: { canonical: "https://www.zagrosia.ca" },
  openGraph: {
    title: "Zagrosia Engineering Inc. | Structural Engineers in Western Canada",
    description:
      "Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan. 35+ years of expertise in seismic assessment, structural design, and AI-powered engineering tools.",
    url: "https://www.zagrosia.ca",
  },
}
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
