import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Zagrosia Academy — EGBC Exam Prep",
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
