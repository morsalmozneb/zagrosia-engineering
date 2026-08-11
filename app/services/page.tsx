import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services",
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
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Structural Design for Concrete, Steel, Wood, and Masonry Buildings", description: "Practical structural design for new buildings, additions, renovations, and modifications." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Foundation and Retaining Wall Design", description: "Foundation and retaining wall design for buildings, site structures, and equipment supports." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Masonry, CMU Wall, Brick Veneer, and Attachment Design", description: "Engineering support for masonry walls, CMU construction, brick veneer attachments, and lateral supports." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Steel Connection Design and Special Steel Structures", description: "Steel connection design and engineering support for custom steel components and structures." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Existing Building Structural Assessments", description: "Structural assessment services for existing buildings requiring professional engineering opinions." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Seismic Assessment and Retrofit Support", description: "Seismic assessment and retrofit support for existing buildings across BC, Alberta, and Saskatchewan." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Structural Repair Design and Upgrade Support", description: "Structural repair and upgrade design for damaged, deteriorated, or overloaded building components." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Insurance and Property Damage Structural Reviews", description: "Structural reviews for property damage from fire, flood, impact, settlement, and other loss events." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Rooftop Mechanical and Electrical Equipment Supports", description: "Structural support design for rooftop mechanical and electrical equipment installations." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Structural Openings and Building Alteration Support", description: "Engineering support for structural openings and alterations in existing buildings." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Racking System Safety and Capacity Reviews", description: "Field review, capacity analysis, and safety documentation for warehouse and industrial racking systems." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Guardrails, Stairs, Balconies, and Awnings", description: "Structural design and review for guardrails, stairs, balconies, and exterior architectural components." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Shop Drawings and Fabrication Support", description: "Shop drawings and fabrication support for guardrails, awnings, steel structures, and custom components." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Helical Pile Foundations, Small Bridges, and Walkways", description: "Structural design for helical pile foundations and small site structures including walkways and bridges." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Scaffolding and Temporary Works Design", description: "Engineering support for scaffolding, temporary access systems, and construction-stage support." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Field Review and Construction Support", description: "Field review and construction support bridging structural drawings and actual site conditions." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Practical Engineering Support for Owners, Contractors, and Consultants", description: "Practical structural engineering consultation for owners, contractors, and consultants on real building conditions." } },
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
