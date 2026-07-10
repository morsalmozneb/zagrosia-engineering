import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Zagrosia Engineering Inc. — a structural engineering firm with 35+ years of experience, licensed P.Eng in BC, Alberta, and Saskatchewan. Meet the team and our story.",
  alternates: { canonical: "https://www.zagrosia.ca/about" },
  openGraph: {
    title: "About Zagrosia Engineering Inc.",
    description:
      "35+ years of structural engineering expertise in BC, Alberta & Saskatchewan. Licensed P.Eng, seismic specialists, and builders of AI-powered engineering tools.",
    url: "https://www.zagrosia.ca/about",
  },
}

import { AboutDesktopPage } from "@/components/about-desktop-page"
import { AboutCompanyMilestonesSection } from "@/components/about-company-milestones-section"
import { AboutMeetTeamSection } from "@/components/about-meet-team-section"
import { AboutPageHeader } from "@/components/about-page-header"
import {
  AboutCoreValuesSection,
  AboutHeroSection,
  AboutMissionVisionSection,
  AboutProfileSection,
} from "@/components/about-page-sections"
import { AboutWhereWeWorkSection } from "@/components/about-where-we-work-section"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <main className="w-full overflow-hidden bg-[#fcfcfc] lg:overflow-visible lg:shadow-none">
      <div className="relative">
        <AboutPageHeader />
        <div className="lg:hidden">
          <AboutHeroSection />
        </div>
      </div>

      <div className="lg:hidden">
        <AboutProfileSection />
        <AboutMissionVisionSection />
        <AboutCoreValuesSection />
        <AboutCompanyMilestonesSection />
        <AboutMeetTeamSection />
        <AboutWhereWeWorkSection />
      </div>

      <AboutDesktopPage />
      <Footer />
    </main>
  )
}
