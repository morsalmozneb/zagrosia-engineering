import { AboutPageHeader } from "@/components/about-page-header"
import { AcademySection } from "@/components/academy-section"
import { Footer } from "@/components/footer"

export default function AcademyPage() {
  return (
    <main className="w-full overflow-hidden bg-[#FCFCFC] lg:overflow-visible lg:shadow-none">
      <div className="relative">
        <AboutPageHeader />
        <AcademySection />
      </div>
      <Footer />
    </main>
  )
}
