import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Academy",
  description:
    "Prepare for your EGBC professional practice exam with Zagrosia Academy. Practice questions, study guides, and resources for engineers pursuing P.Eng licensure in British Columbia.",
  alternates: { canonical: "https://www.zagrosia.ca/academy" },
  openGraph: {
    title: "Zagrosia Academy | EGBC Exam Prep for Engineers",
    description:
      "EGBC professional practice exam prep — practice questions, study guides, and resources for engineers pursuing P.Eng licensure in BC.",
    url: "https://www.zagrosia.ca/academy",
  },
}

import { AboutPageHeader } from "@/components/about-page-header"
import { AcademySection } from "@/components/academy-section"
import { Footer } from "@/components/footer"

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.zagrosia.ca" },
        { "@type": "ListItem", position: 2, name: "Academy", item: "https://www.zagrosia.ca/academy" },
      ],
    },
    {
      "@type": "EducationalOrganization",
      name: "Zagrosia Academy",
      url: "https://www.zagrosia.ca/academy",
      description: "EGBC National Professional Practice Examination prep platform for engineers pursuing P.Eng licensure in British Columbia.",
      parentOrganization: { "@type": "ProfessionalService", name: "Zagrosia Engineering Inc.", url: "https://www.zagrosia.ca" },
      hasCredential: { "@type": "EducationalOccupationalCredential", credentialCategory: "P.Eng — British Columbia" },
    },
    {
      "@type": "Course",
      name: "EGBC National Professional Practice Examination Prep",
      description: "Comprehensive study program for the EGBC PPE exam including video lessons, practice questions, and downloadable resources.",
      provider: { "@type": "Organization", name: "Zagrosia Academy", url: "https://www.zagrosia.ca/academy" },
      educationalLevel: "Professional",
      url: "https://www.zagrosia.ca/academy",
    },
  ],
}

export default function AcademyPage() {
  return (
    <main className="w-full overflow-hidden bg-[#FCFCFC] lg:overflow-visible lg:shadow-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="relative">
        <AboutPageHeader />
        <AcademySection />
      </div>
      <Footer />
    </main>
  )
}
