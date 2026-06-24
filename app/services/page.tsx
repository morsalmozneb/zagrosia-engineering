import { AboutPageHeader } from "@/components/about-page-header"
import { ServicesHeroSection } from "@/components/services-hero-section"
import { ServicesCTASection } from "@/components/services-cta-section"
import { Footer } from "@/components/footer"

export default function ServicesPage() {
  return (
    <main className="w-full overflow-hidden bg-[#FCFCFC] lg:overflow-visible lg:shadow-none">
      <div className="relative">
        <AboutPageHeader />
        <ServicesHeroSection />
      </div>
      <ServicesCTASection />
      <Footer />
    </main>
  )
}
