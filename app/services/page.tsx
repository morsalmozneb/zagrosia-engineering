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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.zagrosia.ca" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://www.zagrosia.ca/services" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Structural Engineering",
      provider: { "@type": "ProfessionalService", name: "Zagrosia Engineering Inc.", url: "https://www.zagrosia.ca" },
      areaServed: ["British Columbia", "Alberta", "Saskatchewan"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Structural Engineering Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Structural Design", description: "Residential, commercial, and industrial structural design using steel, concrete, wood, and masonry." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Seismic Assessment", description: "Comprehensive seismic evaluations following BCBC, NBCC, and EGBC standards." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Building Rehabilitation", description: "Structural upgrades and rehabilitation for aging and distressed buildings." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Heavy Racking Systems", description: "Industrial racking systems design and seismic compliance for warehouses." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Building Envelope Assessment", description: "Building envelope assessments for moisture control, performance, and longevity." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Specialty Engineering Reviews", description: "Peer reviews and engineering consultations for complex projects." } },
        ],
      },
    },
  ],
}

export default function ServicesPage() {
  return (
    <main className="w-full overflow-hidden bg-[#FCFCFC] lg:overflow-visible lg:shadow-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="relative">
        <AboutPageHeader />
        <ServicesHeroSection />
      </div>
      <ServicesCTASection />
      <Footer />
    </main>
  )
}
