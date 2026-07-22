"use client"

import { useState, type ReactNode } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { Reveal } from "./scroll-reveal"
import { CtaButton } from "@/components/cta-button"

const EASE = [0.0, 0.0, 0.2, 1] as const

// ─── DATA ────────────────────────────────────────────────────────────────────

const team = [
  {
    name: "HOMAYOUN MOZNEB",
    image: "/images/Homayoun-pic-2.png",
    experience: "35+",
    degrees: ["M.Sc.", "B.Sc"],
    linkedIn: "https://www.linkedin.com/in/seyed-hassan-mozneb/",
    email: "mailto:Shmozneb@zagrosia.ca",
    resume: "/files/resume-homayoun.pdf",
    description:
      "Senior Structural Engineer with over 30 years of experience leading the design, analysis, and project management of marine, industrial, commercial, and residential structures across Canada and internationally. Currently a Professional Structural Designer at I3 Building and Science Consulting Inc., with a proven record of delivering complex projects, from underwater channels and reactor domes to high-rise repairs and racking systems, under stringent code and quality regimes. Expert in steel, concrete, wood, and masonry, including seismic and performance-based design. Former CEO of two structural design firms in Iran.",
  },
  {
    name: "MEHDI MOZNEB",
    image: "/images/Mehdi-pic.png",
    experience: "11+",
    degrees: ["B.Sc"],
    linkedIn: "https://www.linkedin.com/in/mehdimozneb/",
    email: "mailto:Mehdim@zagrosia.ca",
    resume: "/files/resume-mehdi.pdf",
    description:
      "Civil and Structural Technologist with experience in structural design, drafting, site reviews, and permit documentation for residential, commercial, and industrial projects. Skilled in preparing structural and civil drawings, including foundations, framing, grading, site servicing, and stormwater layouts, along with detailing concrete, steel, timber, and masonry systems. Proficient in AutoCAD, SAP2000, ETABS, SAFE, and Mathcad, with strong knowledge of Canadian building codes and standards. Experienced in coordinating with clients, contractors, engineers, and project teams. Graduated first in class with high honors in Civil Engineering.",
  },
  {
    name: "ATENA JAHANGARD",
    image: "/images/Atena-pic.png",
    experience: "9+",
    degrees: ["B.Sc"],
    linkedIn: "#",
    email: "mailto:Atenaj@zagrosia.ca",
    resume: "/files/resume-atena.pdf",
    description:
      "Architectural graduate with hands-on Canadian experience in drafting, building science, and construction documentation. Proficient in AutoCAD and Revit, with practical experience supporting field reviews, preparing construction drawing sets, and contributing to Depreciation Reports for residential and commercial projects. Strong understanding of building envelope systems, BC building practices, and construction documentation standards. Coordinates effectively with engineers, consultants, and project managers to maintain accuracy and meet deadlines.",
  },
  {
    name: "MORSAL MOZNEB",
    image: "/images/Morsal-pic.png",
    experience: "13+",
    degrees: ["B.IT"],
    linkedIn: "https://www.linkedin.com/in/morsal-mozneb",
    email: "mailto:Morsalm@zagrosia.ca",
    resume: "/files/resume-morsal.pdf",
    description:
      "UX/UI Designer and Web Developer combining a Bachelor of Information Technology with current studies in New Media Design & Web Development at BCIT. Skilled in user research, wireframing, interactive prototyping, and front-end development (HTML5, CSS, JavaScript). Designs responsive websites, Figma design systems, and brand identity systems from concept through deployment. Experienced collaborating across multidisciplinary teams on tight deadlines.",
  },
  {
    name: "FARNAZ GHOLAMI",
    image: "/images/Farnaz-pic.png",
    experience: "8+",
    degrees: ["B.Sc"],
    linkedIn: "https://www.linkedin.com/in/farnaz-gholami-4165b9345/",
    email: "mailto:Farnazgh@zagrosia.ca",
    resume: "/files/resume-farnaz.pdf",
    description:
      "Creative New Media Design & Web Development designer with hands-on experience in UI/UX, graphic design, video storytelling, and web development. Skilled in transforming ideas into engaging digital experiences, from Figma prototypes and brand assets to motion graphics and responsive websites built with HTML, CSS, and JavaScript. Bridges creativity and technical execution to deliver polished, deadline-driven work in collaborative teams. Currently completing BCIT's Diploma in New Media Design & Web Development, with a prior B.Sc. in Cellular & Molecular Biology providing an analytical foundation to her design practice.",
  },
]

const coreValues = [
  {
    title: "Integrity",
    description: "We maintain the highest standards of professional ethics and transparency in all our work. Every decision we make is guided by honesty, accountability, and a commitment to doing what is right — for our clients, our partners, and the communities we serve.",
    points: ["Full transparency in project communication and reporting", "Licensed P.Eng accountability on every structural deliverable", "Uncompromising code compliance and safety standards"],
  },
  {
    title: "Excellence",
    description: "We are committed to delivering exceptional quality in every project we undertake. With 35+ years of hands-on experience across residential, commercial, industrial, and marine structures, our team brings precision engineering and deep technical knowledge to every challenge.",
    points: ["Rigorous quality assurance on all structural analysis and drawings", "Continuous investment in advanced engineering tools and AI workflows", "Proven track record across BC, Alberta, and Saskatchewan"],
  },
  {
    title: "Collaboration",
    description: "We work closely with clients, architects, contractors, and project teams to achieve the best possible outcomes. We believe great engineering is built on strong relationships, clear communication, and a shared commitment to project success.",
    points: ["Early engagement with design teams to resolve issues proactively", "Responsive communication throughout every project phase", "Long-term partnerships built on trust and consistent results"],
  },
]

const milestones = [
  {
    year: "1989",
    title: "B.Sc. Civil Engineering",
    description: "Foundational expertise in concrete, steel & masonry systems",
    stackImages: ["/images/company-milestone-1.png", "/images/company-milestone-2.png", "/images/company-milestone-3.png"],
    projects: [
      { name: "Skytrain Bridge", type: "Commercial", period: "1989–1999", image: "/images/Project-Card-1.png" },
      { name: "Skytrain Bridge", type: "Commercial", period: "1989–1999", image: "/images/Project-Card-2.png" },
      { name: "Skytrain Bridge", type: "Commercial", period: "1989–1999", image: "/images/Project-Card-3.png" },
      { name: "Skytrain Bridge", type: "Commercial", period: "1989–1999", image: "/images/Project-Card-4.png" },
    ],
  },
  {
    year: "1993",
    title: "M.Sc. Structural Engineering",
    description: "Led complex rehabilitation and new construction projects across Canada",
    stackImages: ["/images/company-milestone-2.png", "/images/company-milestone-3.png", "/images/company-milestone-4.png"],
    projects: [
      { name: "Marine Structure", type: "Marine", period: "1993", image: "/images/Project-Card-5.png" },
      { name: "Concrete Rehab", type: "Rehabilitation", period: "1993", image: "/images/Project-Card-6.png" },
      { name: "Steel Design", type: "Industrial", period: "1993", image: "/images/Project-Card-7.png" },
      { name: "Civil Works", type: "Infrastructure", period: "1993", image: "/images/Project-Card-8.png" },
    ],
  },
  {
    year: "1993–1995",
    title: "Structural Designer",
    description: "Designed steel and concrete petrochemical structures, fabrication drawings, and technical reports",
    stackImages: ["/images/company-milestone-3.png", "/images/company-milestone-1.png", "/images/company-milestone-2.png"],
    projects: [
      { name: "Petrochemical Plant", type: "Industrial", period: "1993–1995", image: "/images/Project-Card-9.png" },
      { name: "Steel Structure", type: "Industrial", period: "1993–1995", image: "/images/Project-Card-10.png" },
      { name: "Fabrication Works", type: "Industrial", period: "1993–1995", image: "/images/Project-Card-11.png" },
      { name: "Technical Reports", type: "Engineering", period: "1993–1995", image: "/images/Project-Card-12.png" },
    ],
  },
  {
    year: "1995–2002",
    title: "Head of Civil & Structural Dept.",
    description: "Led design and restoration of critical concrete and marine structures",
    stackImages: ["/images/company-milestone-4.png", "/images/company-milestone-2.png", "/images/company-milestone-1.png"],
    projects: [
      { name: "Marine Structure", type: "Marine", period: "1995–2002", image: "/images/Project-Card-13.png" },
      { name: "Concrete Rehab", type: "Rehabilitation", period: "1995–2002", image: "/images/Project-Card-14.png" },
      { name: "Civil Works", type: "Infrastructure", period: "1995–2002", image: "/images/Project-Card-15.png" },
      { name: "Restoration", type: "Rehabilitation", period: "1995–2002", image: "/images/Project-Card-16.png" },
    ],
  },
  {
    year: "2002–2003",
    title: "Structural Designer",
    description: "Advanced structural design for industrial and commercial developments",
    stackImages: ["/images/company-milestone-1.png", "/images/company-milestone-3.png", "/images/company-milestone-4.png"],
    projects: [
      { name: "Industrial Facility", type: "Industrial", period: "2002–2003", image: "/images/Project-Card-1.png" },
      { name: "Commercial Dev", type: "Commercial", period: "2002–2003", image: "/images/Project-Card-2.png" },
      { name: "Steel Frame", type: "Industrial", period: "2002–2003", image: "/images/Project-Card-3.png" },
      { name: "Structural Design", type: "Engineering", period: "2002–2003", image: "/images/Project-Card-4.png" },
    ],
  },
  {
    year: "2003–2017",
    title: "CEO & Senior Structural Engineer",
    description: "Led structural design and project management for residential and commercial developments",
    stackImages: ["/images/company-milestone-2.png", "/images/company-milestone-4.png", "/images/company-milestone-3.png"],
    projects: [
      { name: "Residential Tower", type: "Residential", period: "2003–2017", image: "/images/Project-Card-5.png" },
      { name: "Commercial Dev", type: "Commercial", period: "2003–2017", image: "/images/Project-Card-6.png" },
      { name: "Industrial Rack", type: "Industrial", period: "2003–2017", image: "/images/Project-Card-7.png" },
      { name: "Seismic Retrofit", type: "Rehabilitation", period: "2003–2017", image: "/images/Project-Card-8.png" },
    ],
  },
  {
    year: "2018–2019",
    title: "Construction Operation Certificate, BCIT",
    description: "Led structural design and project delivery for residential, industrial, and institutional projects",
    stackImages: ["/images/company-milestone-3.png", "/images/company-milestone-2.png", "/images/company-milestone-1.png"],
    projects: [
      { name: "Residential Project", type: "Residential", period: "2018–2019", image: "/images/Project-Card-9.png" },
      { name: "Institutional", type: "Institutional", period: "2018–2019", image: "/images/Project-Card-10.png" },
      { name: "Industrial Works", type: "Industrial", period: "2018–2019", image: "/images/Project-Card-11.png" },
      { name: "Engineering Project", type: "Engineering", period: "2018–2019", image: "/images/Project-Card-12.png" },
    ],
  },
  {
    year: "2019–2022",
    title: "Structural Engineering Certificate (SEABC)",
    description: "Led design and restoration of critical concrete and marine structures",
    stackImages: ["/images/company-milestone-4.png", "/images/company-milestone-1.png", "/images/company-milestone-3.png"],
    projects: [
      { name: "Seismic Assessment", type: "Assessment", period: "2019–2022", image: "/images/Project-Card-13.png" },
      { name: "Structural Rehab", type: "Rehabilitation", period: "2019–2022", image: "/images/Project-Card-14.png" },
      { name: "Marine Works", type: "Marine", period: "2019–2022", image: "/images/Project-Card-15.png" },
      { name: "Concrete Design", type: "Engineering", period: "2019–2022", image: "/images/Project-Card-16.png" },
    ],
  },
  {
    year: "2019–Present",
    title: "Professional Structural Engineer",
    description: "Leading structural design and project delivery for residential, industrial, and institutional projects",
    stackImages: ["/images/company-milestone-1.png", "/images/company-milestone-4.png", "/images/company-milestone-2.png"],
    projects: [
      { name: "Seismic Assessment", type: "Assessment", period: "2019–Present", image: "/images/Project-Card-1.png" },
      { name: "AI Engineering", type: "Innovation", period: "2019–Present", image: "/images/Project-Card-2.png" },
      { name: "Structural Rehab", type: "Rehabilitation", period: "2019–Present", image: "/images/Project-Card-3.png" },
      { name: "EGBC Compliance", type: "Certification", period: "2019–Present", image: "/images/Project-Card-4.png" },
    ],
  },
]

const aboutCoreValueStroke = "linear-gradient(180deg, rgba(252,252,252,1) 0%, rgba(150,150,150,0) 100%)"
const aboutCoreValueShadow = "0 1px 15.1px rgba(255,255,255,0.38)"
const aboutTeamCardShadow = "0 4px 19.6px rgba(0,0,0,0.34)"

function AboutTeamLinkedInIcon() {
  return (
    <svg width="17" height="15" viewBox="0 0 17 15" fill="none" aria-hidden="true">
      <path d="M3.56768 1.66741C3.56745 2.10941 3.37928 2.53322 3.04458 2.84561C2.70987 3.158 2.25605 3.33337 1.78295 3.33315C1.30984 3.33293 0.856212 3.15713 0.521844 2.84443C0.187476 2.53173 -0.000236329 2.10774 2.23302e-07 1.66574C0.000236775 1.22374 0.188403 0.799926 0.523106 0.487539C0.857808 0.175152 1.31163 -0.000220793 1.78473 2.08623e-07C2.25784 0.00022121 2.71147 0.176018 3.04584 0.488718C3.3802 0.801417 3.56792 1.2254 3.56768 1.66741ZM3.6212 4.56725H0.0535154V15H3.6212V4.56725ZM9.25813 4.56725H5.70829V15H9.22246V9.5253C9.22246 6.47547 13.4769 6.19216 13.4769 9.5253V15H17V8.39203C17 3.25065 10.703 3.44231 9.22246 5.96717L9.25813 4.56725Z" fill="currentColor"/>
    </svg>
  )
}

function AboutTeamMailIcon() {
  return (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden="true">
      <path d="M2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196667 15.0217 0.000666667 14.5507 0 14V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196666 1.45067 0.000666667 2 0H18C18.55 0 19.021 0.196 19.413 0.588C19.805 0.98 20.0007 1.45067 20 2V14C20 14.55 19.8043 15.021 19.413 15.413C19.0217 15.805 18.5507 16.0007 18 16H2ZM10 9L18 4V2L10 7L2 2V4L10 9Z" fill="currentColor"/>
    </svg>
  )
}

function AboutTeamResumeIcon() {
  return (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" aria-hidden="true">
      <path d="M9 7H14.5L9 1.5V7ZM2 0H10L16 6V18C16 18.5304 15.7893 19.0391 15.4142 19.4142C15.0391 19.7893 14.5304 20 14 20H2C1.46957 20 0.960859 19.7893 0.585786 19.4142C0.210714 19.0391 0 18.5304 0 18V2C0 0.89 0.89 0 2 0ZM10 18V17C10 15.67 7.33 15 6 15C4.67 15 2 15.67 2 17V18H10ZM6 10C5.46957 10 4.96086 10.2107 4.58579 10.5858C4.21071 10.9609 4 11.4696 4 12C4 12.5304 4.21071 13.0391 4.58579 13.4142C4.96086 13.7893 5.46957 14 6 14C6.53043 14 7.03914 13.7893 7.41421 13.4142C7.78929 13.0391 8 12.5304 8 12C8 11.4696 7.78929 10.9609 7.41421 10.5858C7.03914 10.2107 6.53043 10 6 10Z" fill="currentColor"/>
    </svg>
  )
}

function AboutTeamCtaButton({
  href,
  label,
  icon,
}: {
  href: string
  label: string
  icon: ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-[36px] flex-1 items-center justify-center gap-[8px] rounded-[115px] bg-[#94B8DC] px-3 text-[16px] font-medium tracking-[0.12em] text-[#FCFCFC] transition-colors hover:bg-[#6fa3d0]"
    >
      <span className="flex flex-shrink-0 items-center justify-center text-[#0052A5]">
        {icon}
      </span>
      <span>{label}</span>
    </a>
  )
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export function AboutDesktopPage() {
  const reducedMotion = useReducedMotion()
  const [pageIndex, setPageIndex] = useState(0)
  const milestone = milestones[pageIndex]
  const prev = () => setPageIndex(i => i === 0 ? milestones.length - 1 : i - 1)
  const next = () => setPageIndex(i => i === milestones.length - 1 ? 0 : i + 1)

  return (
    <div className="hidden lg:block bg-[#FCFCFC] text-[#2D2D2D]">

      {/* ══════════════════════════════════════════
          1. HERO — WHO WE ARE
          Grid: 12 col, 0 margin, 20px gutter.
          Content starts at column 3 (≈244px).
          Bridge spans bottom-right, tower at far right.
          Large white space in upper-right intentional.
      ══════════════════════════════════════════ */}
      <div className="relative overflow-x-hidden">
      <section className="relative overflow-hidden min-h-[1340px]">
        <div className="sidebar-content zag-desktop-content-pad relative z-20 pt-[148px]">
          <div className="max-w-[820px]">
            <div className="relative pl-5">
              <motion.div
                className="absolute left-0 top-[4px] bottom-0 w-[4px]"
                initial={reducedMotion ? false : { scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: false, amount: 0.05 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                style={{
                  transformOrigin: "top",
                  background: "linear-gradient(180deg, #0B0E0A 0%, rgba(150,150,150,0) 100%)",
                }}
              />
              <Reveal variant="fadeUp" delay={0.05} duration={0.6}>
                <p className="mb-[20px] text-[20px] font-bold tracking-[0.24em] text-[#2D2D2D]">
                  WHO WE ARE
                </p>
              </Reveal>

              <Reveal variant="fadeLeft" delay={0.1} duration={0.7}>
                <h1
                  className="text-[52px] font-bold uppercase leading-[0.96] tracking-[0.06em]"
                  style={{ fontFamily: "'Momo Trust Sans', 'Inter', sans-serif" }}
                >
                  <span className="mb-[8px] block text-[#2D2D2D]">STRUCTURAL</span>
                  <span className="mb-[8px] block text-[#0052A5]">ENGINEERING</span>
                  <span className="block text-[#2D2D2D]">EXCELLENCE</span>
                </h1>
              </Reveal>

              <div className="mt-7 max-w-[760px] space-y-4 pb-[24px]">
                <Reveal delay={0.2} duration={0.65}>
                  <p className="leading-[1.72] tracking-[0.12em] text-[#2D2D2D]" style={{ fontSize: "18px" }}>
                    With over 35 years of structural engineering expertise, Zagrosia Engineering combines trusted engineering excellence with modern AI-driven workflows.
                  </p>
                </Reveal>
                <Reveal delay={0.28} duration={0.65}>
                  <p className="leading-[1.72] tracking-[0.12em] text-[#2D2D2D]" style={{ fontSize: "18px" }}>
                    Led by <span className="font-bold">Seyed Hassan Mozneb</span>, M.Sc., P.Eng., the company specializes in seismic assessments, structural rehabilitation, industrial racking systems, and specialty engineering solutions, all delivered with precision, innovation, and strict compliance with BCBC, NBCC, and EGBC standards.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute left-0 z-0 w-full" style={{ bottom: "48px" }}>
          <Image
            src="/images/about-bridge.png"
            alt="Bridge structure"
            width={1500}
            height={1067}
            className="h-auto w-[1500px] max-w-none"
            priority
          />
        </div>

        {/* Gradient over the bridge bottom edge — blends into dark section */}
        <div
          className="pointer-events-none absolute left-0 right-0 z-[1]"
          style={{ bottom: "48px", height: "280px", background: "linear-gradient(to bottom, transparent 0%, #0B0E0A 75%)" }}
        />

      </section>

      {/* ══════════════════════════════════════════
          2. PROFILE — MAN + STATS + EDUCATION
      ══════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-x-hidden text-[#FCFCFC]"
        style={{
          marginTop: "-64px",
          minHeight: "1033px",
          background: "linear-gradient(180deg, #0B0E0A 0%, #07080A 100%)",
        }}
      >

            <div
              className="sidebar-content relative h-full zag-desktop-content-pad"
              style={{ paddingTop: "0px", paddingBottom: "92px", marginTop: "-120px", position: "relative", zIndex: 2 }}
            >
              <div className="relative w-[870px]">
                <div className="flex items-end justify-between">
                  <motion.div
                    className="relative h-[650px] w-[430px]"
                    initial={reducedMotion ? false : { opacity: 0, x: -24, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
                  >
                    <Image
                      src="/images/homayoun-pic.png"
                      alt="Seyed Hassan Mozneb"
                      fill
                      className="object-contain object-bottom"
                    />
                  </motion.div>

                  <div className="flex h-[332px] w-[170px] flex-col justify-between pb-[8px]">
                    {[
                      { value: "35+", label: "Experience", delay: 0.15 },
                      { value: "200+", label: "Projects", delay: 0.25 },
                      { value: "8+", label: "Canada", delay: 0.35 },
                    ].map(({ value, label, delay }) => (
                      <motion.div
                        key={label}
                        initial={reducedMotion ? false : { opacity: 0, y: 12, filter: "blur(4px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: false, amount: 0.1 }}
                        transition={{ duration: 0.55, delay, ease: EASE }}
                      >
                        <p className="text-[32px] font-semibold leading-none tracking-[0.08em] text-[#FCFCFC]">{value}</p>
                        <p className="mt-3 text-[11px] tracking-[0.2em] text-[#FCFCFC]">{label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="h-[3px] w-[870px] bg-[#FCFCFC]" />
              </div>

          <div className="mt-10 max-w-[430px]">
            <div className="mb-10">
              <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
                <h2 className="zag-heading mb-4 text-[32px] leading-none tracking-[0.22em] text-[#FCFCFC]">EDUCATION</h2>
              </Reveal>
              <ul className="space-y-3 text-[16px] leading-[1.65] tracking-[0.16em] text-[#FCFCFC]">
                {["M.Sc. Structural Engineering", "B.Sc. Civil Engineering"].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={reducedMotion ? false : { opacity: 0, x: -16, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: EASE }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
                <h2 className="zag-heading mb-4 text-[32px] leading-none tracking-[0.22em] text-[#FCFCFC]">CERTIFICATIONS</h2>
              </Reveal>
              <ul className="space-y-3 text-[16px] leading-[1.6] tracking-[0.16em] text-[#FCFCFC]">
                {[
                  "Structural Engineering Certificate (SEABC)",
                  "Construction Operation Certificate",
                  "P.Eng. Candidacy - Ethical Law Exam Completed",
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={reducedMotion ? false : { opacity: 0, x: -16, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: EASE }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="mt-9 flex gap-4">
              <Reveal variant="scaleUp" delay={0.1} duration={0.55}>
                <CtaButton href="/files/resume-homayoun.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-[#FCFCFC] text-[#FCFCFC] font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[40px] px-5 text-[11px] lg:h-[44px] lg:px-7 lg:text-[14px]">
                  View Resume
                </CtaButton>
              </Reveal>
              <Reveal variant="scaleUp" delay={0.2} duration={0.55}>
                <CtaButton href="/contact" className="inline-flex items-center justify-center rounded-full border border-[#FCFCFC] text-[#FCFCFC] font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[40px] px-5 text-[11px] lg:h-[44px] lg:px-7 lg:text-[14px]">
                  Contact
                </CtaButton>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* ══════════════════════════════════════════
          3. MISSION & VISION
      ══════════════════════════════════════════ */}
      <section className="bg-[#FCFCFC] pb-[60px] pt-[48px]">
        <div className="sidebar-content zag-desktop-content-pad">

          {/* Heading */}
          <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
            <h2 className="zag-heading mb-10 text-[34px] leading-[1.18] tracking-[0.11em] text-[#2D2D2D]">
              OUR MISSION
              <br />
              &amp;
              <br />
              OUR VISION
            </h2>
          </Reveal>

          {/* Two cards below heading, aligned left */}
          <div className="flex gap-5">

            {/* Mission card */}
            <motion.div
              className="w-[465px] h-[220px] flex-shrink-0 rounded-[20px] p-px"
              initial={reducedMotion ? false : { opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
              style={{ background: "linear-gradient(135deg, rgba(45,45,45,1) 0%, rgba(45,45,45,0.56) 26%, rgba(147,147,147,0.22) 100%)" }}
            >
              <div
                className="w-full h-full rounded-[19px] bg-[#FCFCFC] p-[18px] overflow-hidden"
                style={{ boxShadow: "0 4px 19.6px 0px rgba(0,0,0,0.34)", backdropFilter: "blur(61.5px)", WebkitBackdropFilter: "blur(61.5px)" }}
              >
                <p className="mb-4 text-[20px] font-bold tracking-[0.26em] text-[#2D2D2D]">OUR MISSION</p>
                <p className="leading-[1.55] tracking-[0.08em] text-[#2D2D2D]" style={{ fontSize: "16px" }}>
                  For over 35 years, Zagrosia Engineering has delivered intelligent structural engineering solutions with precision, innovation, and deep industry expertise, combining trusted engineering practices with modern AI-driven workflows.
                </p>
              </div>
            </motion.div>

            {/* Vision card */}
            <motion.div
              className="w-[465px] h-[220px] flex-shrink-0 rounded-[20px] p-px"
              initial={reducedMotion ? false : { opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.65, delay: 0.25, ease: EASE }}
              style={{ background: "linear-gradient(135deg, rgba(45,45,45,1) 0%, rgba(45,45,45,0.56) 26%, rgba(147,147,147,0.22) 100%)" }}
            >
              <div
                className="w-full h-full rounded-[19px] bg-[#FCFCFC] p-[18px] overflow-hidden"
                style={{ boxShadow: "0 4px 19.6px 0px rgba(0,0,0,0.34)", backdropFilter: "blur(61.5px)", WebkitBackdropFilter: "blur(61.5px)" }}
              >
                <p className="mb-4 text-[20px] font-bold tracking-[0.26em] text-[#2D2D2D]">OUR VISION</p>
                <p className="leading-[1.55] tracking-[0.08em] text-[#2D2D2D]" style={{ fontSize: "16px" }}>
                  To become Western Canada&apos;s leading structural engineering firm through innovation, technical excellence, and the future of engineering technology.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. CORE VALUES
      ══════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #FCFCFC 0%, #FCFCFC 24%, rgba(246,247,249,1) 44%, rgba(218,222,226,1) 60%, rgba(134,138,144,1) 82%, #080102 100%)",
        }}
      >
        <div className="absolute inset-x-0 top-[-30px] pointer-events-none">
          <div className="w-full">
            <Image
              src="/images/about-core-values-building.png"
              alt="Architectural building"
              width={1440}
              height={1002}
              className="block h-auto w-full"
              sizes="100vw"
            />
          </div>
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 47%, rgba(0,0,0,1) 100%)",
          }}
        />

        <div className="sidebar-content relative w-full pb-[72px] pt-[500px] zag-desktop-content-pad">
          <div className="mx-auto max-w-[918px]">
            <div className="relative pl-[26px]">
              <motion.div
                className="absolute left-0 top-[2px] bottom-[22px] w-[4px]"
                initial={reducedMotion ? false : { scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: false, amount: 0.05 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                style={{
                  transformOrigin: "top",
                  background: aboutCoreValueStroke,
                }}
              />

              <div className="mb-6">
                <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
                  <h2 className="zag-heading text-[32px] leading-none tracking-[0.14em] text-[#FCFCFC]">
                    OUR CORE VALUES
                  </h2>
                </Reveal>
              </div>

              <div className="space-y-3">
                {coreValues.map((value, i) => (
                  <motion.div
                    key={value.title}
                    initial={reducedMotion ? false : { opacity: 0, y: 20, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 0.65, delay: 0.1 + i * 0.12, ease: EASE }}
                    className="rounded-[20px] p-px"
                    style={{
                      background: aboutCoreValueStroke,
                      boxShadow: aboutCoreValueShadow,
                    }}
                  >
                    <div className="rounded-[19px] bg-[#010101] px-10 py-[26px] backdrop-blur-[61.5px]">
                      <h3 className="text-[24px] font-semibold tracking-[0.14em] text-[#FCFCFC]">
                        {value.title}
                      </h3>
                      <ul className="mt-4 space-y-2">
                        {value.points.map((point, j) => (
                          <li key={j} className="flex items-start gap-3 leading-[1.5] tracking-[0.06em] text-[#FCFCFC]/70" style={{ fontSize: "16px" }}>
                            <span className="mt-[5px] h-[6px] w-[6px] flex-shrink-0 rounded-full bg-[#FCFCFC]/70" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. COMPANY MILESTONES
      ══════════════════════════════════════════ */}
      <section className="overflow-hidden bg-[#FCFCFC] pt-[74px] pb-0">
        <div className="sidebar-content w-full zag-desktop-content-pad">
          <div className="mx-auto max-w-[860px]">
            <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
              <h2 className="zag-heading text-[30px] leading-none tracking-[0.12em] text-[#2D2D2D]">
                COMPANY MILESTONES
              </h2>
            </Reveal>

            <div className="mt-8">
              {/* Arrows + card with stacked images */}
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={prev}
                  className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#2D2D2D] text-[#FCFCFC] transition-colors hover:bg-[#0052A5]"
                  aria-label="Previous milestone"
                >
                  <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
                    <path d="M10 2L2 10L10 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {/* Card with stacked photos overlapping from top */}
                <div className="relative flex-1 max-w-[620px]" style={{ paddingTop: "160px" }}>
                  {/* Stacked photos */}
                  <div className="absolute inset-x-0 top-0" style={{ height: "200px" }}>
                    {/* Left — behind card */}
                    <div className="absolute overflow-hidden" style={{ width: "220px", height: "185px", borderRadius: "16px", left: 0, top: "55px", zIndex: 0 }}>
                      <Image src={milestone.stackImages[0]} alt={`${milestone.title} project photo`} fill sizes="220px" className="object-cover" />
                    </div>
                    {/* Center — raised high, above sides */}
                    <div className="absolute overflow-hidden" style={{ width: "320px", height: "285px", borderRadius: "16px", left: "50%", top: 0, transform: "translateX(-50%)", zIndex: 5 }}>
                      <Image src={milestone.stackImages[1]} alt={`${milestone.title} project photo`} fill sizes="220px" className="object-cover" />
                    </div>
                    {/* Right — behind card */}
                    <div className="absolute overflow-hidden" style={{ width: "220px", height: "185px", borderRadius: "16px", right: 0, top: "55px", zIndex: 0 }}>
                      <Image src={milestone.stackImages[2]} alt={`${milestone.title} project photo`} fill sizes="220px" className="object-cover" />
                    </div>
                  </div>

                  {/* Info card */}
                  <motion.div
                    key={pageIndex}
                    className="relative px-6 pb-6 pt-6"
                    initial={reducedMotion ? false : { opacity: 0, y: 12, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.45, ease: EASE }}
                    style={{
                      borderRadius: "20px",
                      backgroundColor: "rgba(252,252,252,0.2)",
                      boxShadow: "0px 4px 19.6px 0px rgba(0,0,0,0.34)",
                      backdropFilter: "blur(61.5px)",
                      WebkitBackdropFilter: "blur(61.5px)",
                      minHeight: "160px",
                      zIndex: 10,
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="leading-[1.2] tracking-[0.08em] text-[#2D2D2D]" style={{ fontSize: "22px", fontWeight: 500 }}>
                        {milestone.title}
                      </h3>
                      <span
                        className="flex-shrink-0 rounded-md px-3 py-1 text-[#FCFCFC] tracking-[0.08em]"
                        style={{ fontSize: "13px", fontWeight: 500, backgroundColor: "#0052A5" }}
                      >
                        {milestone.year}
                      </span>
                    </div>
                    <p className="leading-[1.5] tracking-[0.08em] text-[#4f4f4f]" style={{ fontSize: "16px", marginTop: "24px" }}>
                      {milestone.description}
                    </p>
                  </motion.div>
                </div>

                <button
                  type="button"
                  onClick={next}
                  className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#2D2D2D] text-[#FCFCFC] transition-colors hover:bg-[#0052A5]"
                  aria-label="Next milestone"
                >
                  <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
                    <path d="M2 2L10 10L2 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Projects section */}
              <div className="mt-10">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-[#2D2D2D]/30" />
                  <p className="tracking-[0.12em] text-[#2D2D2D]" style={{ fontSize: "20px", fontWeight: 600 }}>
                    Projects
                  </p>
                  <div className="h-px flex-1 bg-[#2D2D2D]/30" />
                </div>

                <div className="mt-6 grid grid-cols-4 gap-4 justify-items-center">
                  {milestone.projects.map((project, i) => (
                    <motion.div
                      key={`${pageIndex}-${i}`}
                      initial={reducedMotion ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.5, delay: 0.05 + i * 0.08, ease: EASE }}
                      style={{
                        width: "190px",
                        height: "235px",
                        borderRadius: "20px",
                        backgroundColor: "#EFEFEF",
                        boxShadow: "0px 4px 19.6px 0px rgba(0,0,0,0.34)",
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        className="relative flex-shrink-0"
                        style={{ width: "190px", height: "148px", borderRadius: "20px 20px 0 0", overflow: "hidden" }}
                      >
                        <Image src={project.image} alt={project.name} fill className="object-cover" />
                      </div>
                      <div className="px-3 pt-2">
                        <p className="tracking-[0.06em] text-[#2D2D2D]" style={{ fontSize: "15px", fontWeight: 600 }}>
                          {project.name}
                        </p>
                        <p className="tracking-[0.06em] text-[#4f4f4f]" style={{ fontSize: "12px" }}>
                          {project.type}
                        </p>
                        <p className="tracking-[0.06em] text-[#4f4f4f]" style={{ fontSize: "12px" }}>
                          {project.period}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Navigation timeline */}
              <div className="mt-8 flex justify-center">
                <div style={{ width: "808px" }}>
                  {/* Dots + lines row */}
                  <div className="flex items-center w-full">
                    {milestones.map((m, i) => (
                      <div key={i} className="flex items-center" style={{ flex: i < milestones.length - 1 ? "1" : "0 0 auto" }}>
                        <button
                          type="button"
                          onClick={() => setPageIndex(i)}
                          className="rounded-full transition-all flex-shrink-0"
                          aria-label={`Go to ${m.year}`}
                          style={{
                            width: "16px",
                            height: "16px",
                            backgroundColor: i === pageIndex ? "#0052A5" : "#B2BBCB",
                            padding: 0,
                            border: i === pageIndex ? "3px solid #003d7a" : "none",
                            boxShadow: i === pageIndex ? "0 0 0 3px rgba(0,82,165,0.2)" : "none",
                          }}
                        />
                        {i < milestones.length - 1 && (
                          <div style={{ flex: 1, height: "2px", backgroundColor: i < pageIndex ? "#0052A5" : "#B2BBCB" }} />
                        )}
                      </div>
                    ))}
                  </div>
                  {/* Year labels row */}
                  <div className="flex items-start w-full" style={{ marginTop: "8px" }}>
                    {milestones.map((m, i) => (
                      <div key={i} className="flex items-start" style={{ flex: i < milestones.length - 1 ? "1" : "0 0 auto" }}>
                        <div style={{ width: "16px", display: "flex", justifyContent: "center", overflow: "visible" }}>
                          <span style={{ fontSize: "11px", color: i === pageIndex ? "#0052A5" : "#6B7280", whiteSpace: "nowrap", fontWeight: i === pageIndex ? 700 : 400, letterSpacing: "0.05em" }}>
                            {["1989","1993","1995","2002","2003","2017","2019","2022","Present"][i]}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar-content w-full zag-desktop-content-pad" style={{ marginTop: "50px", marginBottom: "50px" }}>
          <div className="mx-auto max-w-[860px]">
            <div style={{ position: "relative", borderRadius: "12px", overflow: "hidden" }}>
              <Image
                src="/images/about-milestones-building.png"
                alt="Company milestones building"
                width={860}
                height={463}
                className="block w-full h-auto"
                sizes="860px"
              />
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#000000]" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. MEET OUR TEAM
      ══════════════════════════════════════════ */}
      <section className="sidebar-content bg-[#FCFCFC] pb-[72px] pt-[26px] zag-desktop-content-pad">
        <div className="mx-auto max-w-[860px]">
          <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
            <h2 className="zag-heading mb-[24px] text-[30px] leading-none tracking-[0.12em] text-[#2D2D2D]">MEET OUR TEAM</h2>
          </Reveal>

          <div className="flex flex-col gap-5">
            {team.map((member, i) => (
              <motion.article
                key={member.name}
                initial={reducedMotion ? false : { opacity: 0, y: 24, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.05 }}
                transition={{ duration: 0.65, delay: 0.08 + i * 0.1, ease: EASE }}
                className="w-full rounded-[20px] bg-[rgba(252,252,252,0.4)] px-[16px] py-[10px] backdrop-blur-[61.5px]"
                style={{ boxShadow: aboutTeamCardShadow }}
              >
                {/* Photo + name/description row */}
                <div className="flex gap-[18px]">
                  {/* Left: photo + stats */}
                  <div className="flex w-[220px] shrink-0 flex-col gap-[12px]">
                    <div className="relative h-[200px] w-[180px] overflow-hidden rounded-[20px]">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="flex items-start gap-[16px]">
                      <div>
                        <p className="text-[24px] font-semibold leading-none tracking-[0.08em] text-[#2D2D2D]">
                          {member.experience}
                        </p>
                        <p className="mt-[4px] text-[13px] tracking-[0.18em] text-[#2D2D2D]">Experience</p>
                      </div>
                      <div className="space-y-[4px]">
                        {member.degrees.map((degree) => (
                          <p key={degree} className="text-[24px] font-semibold leading-none tracking-[0.1em] text-[#2D2D2D]">
                            {degree}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: name + description + buttons */}
                  <div className="flex min-w-0 flex-1 flex-col pt-[6px]">
                    <h3 className="text-[24px] font-semibold leading-none tracking-[0.16em] text-[#2D2D2D]">
                      {member.name}
                    </h3>
                    <p className="mt-[12px] leading-[1.55] tracking-[0.10em] text-[#2D2D2D]" style={{ fontSize: "16px" }}>
                      {member.description}
                    </p>
                    <div className="mt-[14px] flex gap-[8px]">
                      <AboutTeamCtaButton href={member.linkedIn} label="LinkedIn" icon={<AboutTeamLinkedInIcon />} />
                      <AboutTeamCtaButton href={member.email} label="Email" icon={<AboutTeamMailIcon />} />
                      <AboutTeamCtaButton href={member.resume} label="Resume" icon={<AboutTeamResumeIcon />} />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. WHERE WE WORK
      ══════════════════════════════════════════ */}
      <section className="sidebar-content bg-[#FCFCFC] py-20 zag-desktop-content-pad">
        <div className="mx-auto max-w-[860px]">
          <Reveal variant="fadeUp" delay={0.05} duration={0.6}>
            <p className="mb-4 text-[20px] font-bold uppercase tracking-[0.24em] text-[#2D2D2D]">WHERE WE WORK</p>
          </Reveal>
          <Reveal variant="fadeLeft" delay={0.1} duration={0.7}>
            <h2 className="font-sans text-[32px] font-light uppercase leading-[1.08] tracking-[0.12em] text-[#2D2D2D]">
              SERVING WESTERN CANADA
            </h2>
          </Reveal>
          <Reveal delay={0.2} duration={0.65}>
            <p className="mt-6 leading-[1.8] tracking-[0.10em] text-[#2D2D2D]" style={{ fontSize: "16px" }}>
              Zagrosia Engineering is licensed and insured to provide structural engineering services across<br />
              <span className="font-semibold">British Columbia</span>,{" "}
              <span className="font-semibold">Alberta</span>, and{" "}
              <span className="font-semibold">Saskatchewan</span>. Our team is equipped to handle projects<br />
              throughout these provinces.
            </p>
          </Reveal>
          <div className="mt-8 flex gap-4">
            <Reveal variant="scaleUp" delay={0.28} duration={0.55}>
              <CtaButton href="/contact" className="inline-flex items-center justify-center rounded-full border border-[#2D2D2D] text-[#2D2D2D] font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[40px] px-5 text-[11px] lg:h-[44px] lg:px-7 lg:text-[14px]">
                Work with Us
              </CtaButton>
            </Reveal>
            <Reveal variant="scaleUp" delay={0.38} duration={0.55}>
              <CtaButton href="/contact" className="inline-flex items-center justify-center rounded-full border border-[#2D2D2D] text-[#2D2D2D] font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[40px] px-5 text-[11px] lg:h-[44px] lg:px-7 lg:text-[14px]">
                Get In Touch
              </CtaButton>
            </Reveal>
          </div>
        </div>
      </section>

    </div>
  )
}
