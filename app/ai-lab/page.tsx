import { AboutPageHeader } from "@/components/about-page-header"
import { AILabSection } from "@/components/ai-lab-section"
import { Footer } from "@/components/footer"

export default function AILabPage() {
  return (
    <main className="w-full overflow-hidden bg-[#FCFCFC] lg:overflow-visible lg:shadow-none">
      <div className="relative">
        <AboutPageHeader />
        <AILabSection />
      </div>
      <Footer />
    </main>
  )
}
