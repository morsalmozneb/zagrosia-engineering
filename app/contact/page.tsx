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

export default function ContactPage() {
  return (
    <main className="w-full overflow-hidden bg-[#FCFCFC] lg:overflow-visible lg:shadow-none">
      <div className="relative">
        <AboutPageHeader />
        <ContactSection />
      </div>
      <Footer />
    </main>
  )
}
