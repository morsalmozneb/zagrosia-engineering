import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Structural Engineering Services",
  description:
    "Zagrosia Engineering Inc. offers seismic assessments, structural design, building rehabilitation, racking system engineering, building envelope assessments, and more — serving BC, Alberta & Saskatchewan.",
  alternates: { canonical: "https://www.zagrosia.ca/services" },
  openGraph: {
    title: "Structural Engineering Services | Zagrosia Engineering",
    description:
      "Seismic assessments, structural design, building rehabilitation, racking systems, and building envelope assessments in BC, Alberta & Saskatchewan.",
    url: "https://www.zagrosia.ca/services",
  },
}

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
