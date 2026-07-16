import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Zagrosia Engineering Inc. — licensed P.Eng structural engineers in BC, Alberta & Saskatchewan. Contact us for seismic assessments, structural design, and engineering consultations.",
  alternates: { canonical: "https://www.zagrosia.ca/contact" },
  openGraph: {
    title: "Contact Zagrosia Engineering Inc.",
    description:
      "Reach out to Zagrosia Engineering for structural engineering consultations, seismic assessments, and project inquiries across BC, Alberta & Saskatchewan.",
    url: "https://www.zagrosia.ca/contact",
  },
}

import { AboutPageHeader } from "@/components/about-page-header"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.zagrosia.ca" },
        { "@type": "ListItem", position: 2, name: "Contact", item: "https://www.zagrosia.ca/contact" },
      ],
    },
    {
      "@type": "ContactPage",
      name: "Contact Zagrosia Engineering Inc.",
      url: "https://www.zagrosia.ca/contact",
      description: "Contact Zagrosia Engineering for structural engineering consultations, seismic assessments, and project inquiries across BC, Alberta & Saskatchewan.",
      mainEntity: {
        "@type": "ProfessionalService",
        name: "Zagrosia Engineering Inc.",
        telephone: "+1-778-317-1043",
        email: "shmozneb@zagrosia.ca",
        address: { "@type": "PostalAddress", addressRegion: "BC", addressCountry: "CA" },
        openingHours: "Mo-Fr 09:00-17:00",
      },
    },
  ],
}

export default function ContactPage() {
  return (
    <main className="w-full overflow-hidden bg-[#FCFCFC] lg:overflow-visible lg:shadow-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="relative">
        <AboutPageHeader />
        <ContactSection />
      </div>
      <Footer />
    </main>
  )
}
