import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { AboutPageHeader } from "@/components/about-page-header"
import { Footer } from "@/components/footer"
import { Reveal } from "@/components/scroll-reveal"

export const metadata: Metadata = {
  title: "Office Tower Renovation — Case Study",
  description:
    "Structural retrofit and seismic strengthening for a multi-story commercial office tower in Burnaby, BC. A Zagrosia Engineering case study.",
  alternates: { canonical: "https://www.zagrosia.ca/projects/office-tower-renovation" },
  openGraph: {
    title: "Office Tower Renovation | Zagrosia Engineering Inc.",
    description:
      "Seismic retrofit and structural upgrade of a multi-story commercial office tower in Burnaby, BC to meet current building code requirements.",
    url: "https://www.zagrosia.ca/projects/office-tower-renovation",
    images: [{ url: "/images/Project-Card-1.png", width: 1200, height: 630, alt: "Office Tower Renovation — Burnaby, BC" }],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.zagrosia.ca" },
        { "@type": "ListItem", position: 2, name: "Projects", item: "https://www.zagrosia.ca/projects" },
        { "@type": "ListItem", position: 3, name: "Office Tower Renovation", item: "https://www.zagrosia.ca/projects/office-tower-renovation" },
      ],
    },
  ],
}

const scopeItems = [
  { label: "Seismic Assessment", detail: "Comprehensive evaluation of existing lateral force-resisting system against NBCC 2020 requirements" },
  { label: "Structural Retrofit Design", detail: "Design of new steel moment frames and shear walls integrated into the existing building structure" },
  { label: "Foundation Review", detail: "Geotechnical review and analysis of existing foundation system for increased seismic demands" },
  { label: "Drawing Package", detail: "Full structural drawing set for permit submission and construction, coordinated with architectural and mechanical" },
  { label: "Site Review", detail: "Construction-phase observations and RFI responses to ensure design intent was met on site" },
]

const keyFacts = [
  { label: "Location", value: "Burnaby, BC" },
  { label: "Building Type", value: "Commercial Office Tower" },
  { label: "Services", value: "Seismic Retrofit & Structural Design" },
  { label: "Jurisdiction", value: "City of Burnaby" },
  { label: "Code", value: "NBCC 2020 / BCBC 2018" },
  { label: "Expertise", value: "P.Eng — British Columbia" },
]

export default function OfficeTowerRenovationPage() {
  return (
    <main className="w-full overflow-hidden bg-[#FCFCFC] lg:overflow-visible">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative">
        <AboutPageHeader />

        {/* ── HERO IMAGE ── */}
        <div className="relative w-full overflow-hidden bg-[#1a1a1a]" style={{ height: "520px" }}>
          <Image
            src="/images/Project-Card-1.png"
            alt="Office Tower Renovation — Burnaby, BC"
            fill
            className="object-cover object-center opacity-80"
            priority
            sizes="100vw"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(7,19,31,0.35) 0%, rgba(7,19,31,0.15) 40%, rgba(7,19,31,0.6) 70%, rgba(7,19,31,0.92) 100%)",
            }}
          />

          {/* Hero text */}
          <div className="absolute inset-x-0 bottom-0 sidebar-content px-6 pb-10 zag-desktop-content-pad">
            <div className="mx-auto max-w-[860px]">
              {/* Breadcrumb */}
              <Reveal variant="fadeUp" delay={0.05} duration={0.6}>
                <div className="mb-4 flex items-center gap-2 text-white/60" style={{ fontSize: "11px" }}>
                  <Link href="/projects" className="hover:text-white transition-colors tracking-[0.12em]">
                    PROJECTS
                  </Link>
                  <span>/</span>
                  <span className="text-white/90 tracking-[0.12em]">CASE STUDY</span>
                </div>
              </Reveal>

              <Reveal variant="fadeUp" delay={0.1} duration={0.65}>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#0052A5] px-3 py-1 text-white" style={{ fontSize: "10px", letterSpacing: "0.10em" }}>
                  <svg width="10" height="12" viewBox="0 0 11 13" fill="none" aria-hidden="true">
                    <path d="M5.5 12C5.5 12 9.5 8.3 9.5 4.9C9.5 2.75 7.71 1 5.5 1C3.29 1 1.5 2.75 1.5 4.9C1.5 8.3 5.5 12 5.5 12Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="5.5" cy="4.9" r="1.35" fill="white" />
                  </svg>
                  Burnaby, BC
                </div>
              </Reveal>

              <Reveal variant="fadeUp" delay={0.16} duration={0.65}>
                <h1
                  className="text-white font-black uppercase leading-[1.1] tracking-[0.1em]"
                  style={{ fontSize: "clamp(26px, 4vw, 44px)", fontFamily: "'Inter', sans-serif" }}
                >
                  OFFICE TOWER<br />RENOVATION
                </h1>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="sidebar-content px-6 py-14 zag-desktop-content-pad">
          <div className="mx-auto max-w-[860px]">

            {/* ── PROJECT OVERVIEW ── */}
            <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12 mb-16">

              {/* Left: overview text */}
              <div>
                <Reveal variant="fadeUp" delay={0.05}>
                  <p className="mb-2 text-[10px] font-semibold tracking-[0.18em] text-[#0052A5] uppercase">Project Overview</p>
                </Reveal>
                <Reveal variant="fadeUp" delay={0.1}>
                  <h2
                    className="mb-5 font-black uppercase leading-[1.18] tracking-[0.08em] text-[#2D2D2D]"
                    style={{ fontSize: "22px" }}
                  >
                    Structural Retrofit &amp;<br />Seismic Strengthening
                  </h2>
                </Reveal>
                <Reveal variant="fadeUp" delay={0.15}>
                  <p className="mb-4 leading-[1.75] tracking-[0.06em] text-[#2D2D2D]/80" style={{ fontSize: "15px" }}>
                    This project involved a comprehensive seismic assessment and structural retrofit of an existing multi-story commercial office tower in Burnaby, BC. The building's original lateral force-resisting system no longer met current code requirements, requiring a full engineering solution to bring it into compliance with NBCC 2020.
                  </p>
                </Reveal>
                <Reveal variant="fadeUp" delay={0.2}>
                  <p className="leading-[1.75] tracking-[0.06em] text-[#2D2D2D]/80" style={{ fontSize: "15px" }}>
                    Zagrosia Engineering provided complete structural engineering services from initial assessment through construction administration, coordinating closely with the project architect, mechanical engineer, and general contractor to minimize disruption to occupied floors during construction.
                  </p>
                </Reveal>
              </div>

              {/* Right: key facts card */}
              <Reveal variant="fadeBlur" delay={0.2}>
                <div
                  className="mt-10 lg:mt-0 rounded-[16px] border border-[#2D2D2D]/10 bg-[#F4F6F9] p-6"
                >
                  <p className="mb-4 text-[10px] font-semibold tracking-[0.18em] text-[#0052A5] uppercase">Project Details</p>
                  <ul className="space-y-3">
                    {keyFacts.map((fact) => (
                      <li key={fact.label} className="flex flex-col gap-[2px]">
                        <span className="text-[10px] font-semibold tracking-[0.14em] text-[#2D2D2D]/50 uppercase">{fact.label}</span>
                        <span className="text-[13px] tracking-[0.08em] text-[#2D2D2D] font-medium">{fact.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* ── DIVIDER ── */}
            <Reveal variant="lineGrowX" duration={0.8}>
              <div className="mb-16 h-px w-full bg-[#2D2D2D]/10" />
            </Reveal>

            {/* ── THE CHALLENGE ── */}
            <div className="mb-16">
              <Reveal variant="fadeUp" delay={0.05}>
                <p className="mb-2 text-[10px] font-semibold tracking-[0.18em] text-[#0052A5] uppercase">The Challenge</p>
              </Reveal>
              <Reveal variant="fadeUp" delay={0.1}>
                <h2
                  className="mb-6 font-black uppercase leading-[1.18] tracking-[0.08em] text-[#2D2D2D]"
                  style={{ fontSize: "22px" }}
                >
                  Engineering Around an<br />Occupied Building
                </h2>
              </Reveal>

              <div className="lg:grid lg:grid-cols-2 lg:gap-10">
                <Reveal variant="fadeUp" delay={0.15}>
                  <p className="mb-6 lg:mb-0 leading-[1.75] tracking-[0.06em] text-[#2D2D2D]/80" style={{ fontSize: "15px" }}>
                    The building remained partially occupied throughout the construction phase, requiring a phased retrofit strategy that maintained structural integrity and life-safety at all times. Existing drawings were incomplete, demanding thorough field investigation and destructive testing to verify as-built conditions before any analysis could begin.
                  </p>
                </Reveal>
                <Reveal variant="fadeUp" delay={0.2}>
                  <p className="leading-[1.75] tracking-[0.06em] text-[#2D2D2D]/80" style={{ fontSize: "15px" }}>
                    The existing concrete shear wall system had significant deficiencies in shear capacity and connection detailing. The solution required adding new lateral elements while carefully managing load path continuity through each construction stage — a challenge that demanded close coordination between structural design and construction sequencing.
                  </p>
                </Reveal>
              </div>
            </div>

            {/* ── ENGINEERING APPROACH ── */}
            <div className="mb-16">
              <Reveal variant="fadeUp" delay={0.05}>
                <p className="mb-2 text-[10px] font-semibold tracking-[0.18em] text-[#0052A5] uppercase">Engineering Approach</p>
              </Reveal>
              <Reveal variant="fadeUp" delay={0.1}>
                <h2
                  className="mb-8 font-black uppercase leading-[1.18] tracking-[0.08em] text-[#2D2D2D]"
                  style={{ fontSize: "22px" }}
                >
                  Precision-Designed Retrofit<br />With Minimal Disruption
                </h2>
              </Reveal>

              <div className="lg:grid lg:grid-cols-3 lg:gap-6">
                {[
                  {
                    step: "01",
                    title: "Assessment & Modelling",
                    body: "A full 3D finite element model was built from field investigation data. Nonlinear time-history analysis was used to evaluate the building's seismic performance and identify critical deficiencies.",
                  },
                  {
                    step: "02",
                    title: "Retrofit Strategy",
                    body: "New steel moment frames were introduced at key bays to supplement the existing concrete walls. Frame connections were designed to minimize penetrations into occupied tenant areas and limit construction noise.",
                  },
                  {
                    step: "03",
                    title: "Phased Construction",
                    body: "The retrofit was sequenced across four construction phases, each independently verified for structural adequacy. Stage-by-stage analysis ensured the building remained stable and compliant at every intermediate state.",
                  },
                ].map((item) => (
                  <Reveal key={item.step} variant="fadeBlur" delay={0.1}>
                    <div className="mb-6 lg:mb-0 rounded-[14px] border border-[#2D2D2D]/10 bg-[#F4F6F9] p-6">
                      <span
                        className="mb-3 block font-black text-[#0052A5]/30 leading-none"
                        style={{ fontSize: "32px", letterSpacing: "0.02em" }}
                      >
                        {item.step}
                      </span>
                      <h3
                        className="mb-3 font-bold tracking-[0.08em] text-[#2D2D2D] uppercase"
                        style={{ fontSize: "13px" }}
                      >
                        {item.title}
                      </h3>
                      <p className="leading-[1.7] tracking-[0.06em] text-[#2D2D2D]/70" style={{ fontSize: "13px" }}>
                        {item.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* ── DIVIDER ── */}
            <Reveal variant="lineGrowX" duration={0.8}>
              <div className="mb-16 h-px w-full bg-[#2D2D2D]/10" />
            </Reveal>

            {/* ── SCOPE OF WORK ── */}
            <div className="mb-16">
              <Reveal variant="fadeUp" delay={0.05}>
                <p className="mb-2 text-[10px] font-semibold tracking-[0.18em] text-[#0052A5] uppercase">Scope of Work</p>
              </Reveal>
              <Reveal variant="fadeUp" delay={0.1}>
                <h2
                  className="mb-8 font-black uppercase leading-[1.18] tracking-[0.08em] text-[#2D2D2D]"
                  style={{ fontSize: "22px" }}
                >
                  Full Structural Engineering<br />Services
                </h2>
              </Reveal>

              <ul className="space-y-4">
                {scopeItems.map((item, i) => (
                  <Reveal key={item.label} variant="fadeUp" delay={0.05 + i * 0.06}>
                    <li className="flex items-start gap-4 rounded-[12px] border border-[#2D2D2D]/8 bg-[#F9FAFB] px-5 py-4">
                      <span className="mt-[3px] flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full bg-[#0052A5]">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                          <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <div>
                        <p className="mb-[3px] text-[13px] font-semibold tracking-[0.08em] text-[#2D2D2D]">{item.label}</p>
                        <p className="leading-[1.65] tracking-[0.06em] text-[#2D2D2D]/65" style={{ fontSize: "13px" }}>{item.detail}</p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>

            {/* ── OUTCOME ── */}
            <Reveal variant="fadeBlur" delay={0.1}>
              <div
                className="mb-16 rounded-[18px] px-8 py-10"
                style={{ background: "linear-gradient(135deg, #0052A5 0%, #003d7a 100%)" }}
              >
                <p className="mb-2 text-[10px] font-semibold tracking-[0.18em] text-white/60 uppercase">Outcome</p>
                <h2
                  className="mb-4 font-black uppercase leading-[1.18] tracking-[0.08em] text-white"
                  style={{ fontSize: "20px" }}
                >
                  Code-Compliant &amp; Delivered On Schedule
                </h2>
                <p className="leading-[1.75] tracking-[0.06em] text-white/80" style={{ fontSize: "15px" }}>
                  The completed retrofit brought the building into full compliance with NBCC 2020 seismic requirements, significantly improving life-safety performance and extending the building's functional lifespan. The phased construction approach enabled tenants to remain in place throughout, and the project achieved permit approval and final inspection on schedule.
                </p>
              </div>
            </Reveal>

            {/* ── BACK TO PROJECTS ── */}
            <Reveal variant="fadeUp" delay={0.1}>
              <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-full border border-[#2D2D2D]/25 px-6 py-3 text-[11px] font-semibold tracking-[0.14em] text-[#2D2D2D] transition-all hover:border-[#0052A5] hover:text-[#0052A5]"
                >
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                    <path d="M13 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Back to All Projects
                </Link>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] tracking-[0.12em] text-[#2D2D2D]/50">Start a similar project?</span>
                  <Link
                    href="/contact"
                    className="inline-flex items-center rounded-full bg-[#0052A5] px-6 py-3 text-[11px] font-semibold tracking-[0.14em] text-white transition-all hover:bg-[#003d7a]"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
