"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { Reveal } from "./scroll-reveal"

const EASE = [0.0, 0.0, 0.2, 1] as const

const milestones = [
  {
    year: "1989",
    title: "B.Sc. Civil Engineering",
    description: "Foundational expertise in concrete, steel & masonry systems",
    stackImages: ["/images/company-milestone-1.png", "/images/company-milestone-2.png", "/images/company-milestone-3.png"],
    projects: [
      { name: "Office Retrofit", type: "Commercial", period: "1989–1999", image: "/images/Project-Card-1.png" },
      { name: "Bridge Design", type: "Infrastructure", period: "1989–1999", image: "/images/Project-Card-2.png" },
      { name: "Residential Complex", type: "Residential", period: "1989–1999", image: "/images/Project-Card-3.png" },
      { name: "Industrial Facility", type: "Industrial", period: "1989–1999", image: "/images/Project-Card-4.png" },
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
      { name: "Industrial Facility", type: "Industrial", period: "2002–2003", image: "/images/Project-Card-4.png" },
      { name: "Commercial Dev", type: "Commercial", period: "2002–2003", image: "/images/Project-Card-1.png" },
      { name: "Steel Frame", type: "Industrial", period: "2002–2003", image: "/images/Project-Card-7.png" },
      { name: "Structural Design", type: "Engineering", period: "2002–2003", image: "/images/Project-Card-10.png" },
    ],
  },
  {
    year: "2003–2017",
    title: "CEO & Senior Structural Engineer",
    description: "Led structural design and project management for residential and commercial developments",
    stackImages: ["/images/company-milestone-2.png", "/images/company-milestone-4.png", "/images/company-milestone-3.png"],
    projects: [
      { name: "High-Rise", type: "Residential · Iran", period: "2004–2008", image: "/images/projects/residential-high-rise-construction-iran/01-hero.jpg" },
      { name: "Concrete Frame", type: "Residential · Iran", period: "2007–2011", image: "/images/projects/residential-concrete-frame-construction-iran/01-hero.jpg" },
      { name: "Extension", type: "Residential · Iran", period: "2007–2011", image: "/images/projects/two-storey-vertical-extension-iran/01-hero.jpg" },
      { name: "Complex", type: "Residential · Iran", period: "2003–2017", image: "/images/projects/residential-complex-construction-iran/01-hero.jpg" },
    ],
  },
  {
    year: "2018–2019",
    title: "Construction Operation Certificate, BCIT",
    description: "Led structural design and project delivery for residential, industrial, and institutional projects",
    stackImages: ["/images/company-milestone-3.png", "/images/company-milestone-2.png", "/images/company-milestone-1.png"],
    projects: [
      { name: "Residential Project", type: "Residential", period: "2018–2019", image: "/images/Project-Card-3.png" },
      { name: "Institutional", type: "Institutional", period: "2018–2019", image: "/images/Project-Card-16.png" },
      { name: "Industrial Works", type: "Industrial", period: "2018–2019", image: "/images/Project-Card-9.png" },
      { name: "Engineering Project", type: "Engineering", period: "2018–2019", image: "/images/Project-Card-12.png" },
    ],
  },
  {
    year: "2019–2022",
    title: "Structural Engineering Certificate (SEABC)",
    description: "Led design and restoration of critical concrete and marine structures",
    stackImages: ["/images/company-milestone-4.png", "/images/company-milestone-1.png", "/images/company-milestone-3.png"],
    projects: [
      { name: "Seismic Assessment", type: "Assessment", period: "2019–2022", image: "/images/Project-Card-1.png" },
      { name: "Structural Rehab", type: "Rehabilitation", period: "2019–2022", image: "/images/Project-Card-14.png" },
      { name: "Marine Works", type: "Marine", period: "2019–2022", image: "/images/Project-Card-13.png" },
      { name: "Concrete Design", type: "Engineering", period: "2019–2022", image: "/images/Project-Card-6.png" },
    ],
  },
  {
    year: "2019–Present",
    title: "Professional Structural Engineer",
    description: "Leading structural design and project delivery for residential, industrial, and institutional projects",
    stackImages: ["/images/company-milestone-1.png", "/images/company-milestone-4.png", "/images/company-milestone-2.png"],
    projects: [
      { name: "Envelope Review", type: "Building Envelope", period: "2026", image: "/images/projects/building-envelope-rehabilitation-field-review-vancouver/01-hero.jpg" },
      { name: "Parkade Review", type: "Parkade · Langley", period: "2025", image: "/images/projects/parkade-structural-review-langley/01-hero.jpg" },
      { name: "Townhouse Study", type: "Residential · Surrey", period: "2025", image: "/images/projects/townhouse-complex-condition-assessment-surrey/01-hero.jpg" },
      { name: "Warranty Review", type: "Residential · Coquitlam", period: "2026", image: "/images/projects/ten-year-warranty-review-coquitlam/01-hero.jpg" },
    ],
  },
]

export function AboutCompanyMilestonesSection() {
  const reducedMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const milestone = milestones[index]

  const prev = () => setIndex((i) => (i === 0 ? milestones.length - 1 : i - 1))
  const next = () => setIndex((i) => (i === milestones.length - 1 ? 0 : i + 1))

  return (
    <section className="bg-[#FCFCFC] px-6 pb-10 pt-11 text-[#2D2D2D]">
      <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
        <h2
          className="leading-[1.14] tracking-[0.14em] text-[#2D2D2D]"
          style={{ fontSize: "20px", fontWeight: 600 }}
        >
          COMPANY
          <br />
          MILESTONES
        </h2>
      </Reveal>

      <div className="mt-6">
        {/* Combined photos + card unit with arrows on sides */}
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={prev}
            className="flex h-[29px] w-[29px] flex-shrink-0 items-center justify-center rounded-[10px] bg-[#2D2D2D] text-[#FCFCFC]"
            aria-label="Previous milestone"
            style={{ fontSize: "17px", lineHeight: 1, paddingBottom: "1px" }}
          >
            &#8249;
          </button>

          {/* Card with photos overlapping from top */}
          <div className="relative flex-1" style={{ paddingTop: "80px" }}>
            {/* Stacked photos — no gaps, center raised and in front */}
            <div className="absolute inset-x-0 top-0" style={{ height: "110px" }}>
              {/* Left */}
              <div className="absolute overflow-hidden" style={{ width: "111px", height: "97px", borderRadius: "10px", left: 0, top: "14px", zIndex: 0 }}>
                <Image src={milestone.stackImages[0]} alt={`${milestone.title} project photo`} fill sizes="111px" className="object-cover" />
              </div>
              {/* Center — raised, on top */}
              <div className="absolute overflow-hidden" style={{ width: "111px", height: "97px", borderRadius: "10px", left: "50%", top: 0, transform: "translateX(-50%)", zIndex: 5 }}>
                <Image src={milestone.stackImages[1]} alt={`${milestone.title} project photo`} fill sizes="111px" className="object-cover" />
              </div>
              {/* Right */}
              <div className="absolute overflow-hidden" style={{ width: "111px", height: "97px", borderRadius: "10px", right: 0, top: "14px", zIndex: 0 }}>
                <Image src={milestone.stackImages[2]} alt={`${milestone.title} project photo`} fill sizes="111px" className="object-cover" />
              </div>
            </div>

            {/* Info card */}
            <motion.div
              key={index}
              className="relative px-4 pb-4 pt-4"
              initial={reducedMotion ? false : { opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.45, ease: EASE }}
              style={{
                borderRadius: "14px",
                backgroundColor: "rgba(252,252,252,0.2)",
                boxShadow: "0px 4px 19.6px 0px rgba(0,0,0,0.34)",
                backdropFilter: "blur(61.5px)",
                WebkitBackdropFilter: "blur(61.5px)",
                minHeight: "117px",
                zIndex: 10,
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <h3
                  className="leading-[1.2] tracking-[0.08em] text-[#2D2D2D]"
                  style={{ fontSize: "14px", fontWeight: 500 }}
                >
                  {milestone.title}
                </h3>
                <span
                  className="flex-shrink-0 rounded-md px-2 py-[2px] text-[#FCFCFC] tracking-[0.08em]"
                  style={{ fontSize: "12px", fontWeight: 500, backgroundColor: "#0052A5" }}
                >
                  {milestone.year}
                </span>
              </div>
              <p
                className="leading-[1.4] tracking-[0.08em] text-[#4f4f4f]"
                style={{ fontSize: "12px", marginTop: "20px" }}
              >
                {milestone.description}
              </p>
            </motion.div>
          </div>

          <button
            type="button"
            onClick={next}
            className="flex h-[29px] w-[29px] flex-shrink-0 items-center justify-center rounded-[10px] bg-[#2D2D2D] text-[#FCFCFC]"
            aria-label="Next milestone"
            style={{ fontSize: "17px", lineHeight: 1, paddingBottom: "1px" }}
          >
            &#8250;
          </button>
        </div>

        {/* Projects section */}
        <div className="mt-6">
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-[#2D2D2D]/30" />
            <p className="tracking-[0.02em] text-[#2D2D2D]" style={{ fontSize: "16px", fontWeight: 600 }}>
              Projects
            </p>
            <div className="h-px flex-1 bg-[#2D2D2D]/30" />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 justify-items-center mx-auto" style={{ width: "fit-content" }}>
            {milestone.projects.map((project, i) => (
              <motion.div
                key={`${index}-${i}`}
                initial={reducedMotion ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.05 + i * 0.08, ease: EASE }}
                style={{
                  width: "141.79px",
                  height: "175.27px",
                  borderRadius: "14px",
                  backgroundColor: "#EFEFEF",
                  boxShadow: "0px 4px 19.6px 0px rgba(0,0,0,0.34)",
                  backdropFilter: "blur(61.5px)",
                  WebkitBackdropFilter: "blur(61.5px)",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                {/* Photo — top portion, rounded top corners only */}
                <div
                  className="relative flex-shrink-0"
                  style={{
                    width: "141.79px",
                    height: "110.95px",
                    borderRadius: "14px 14px 0 0",
                    overflow: "hidden",
                  }}
                >
                  <Image src={project.image} alt={project.name} fill className="object-cover" />
                </div>
                {/* Text below photo */}
                <div className="px-3 pt-2">
                  <p className="tracking-[0.06em] text-[#2D2D2D]" style={{ fontSize: "13px", fontWeight: 600 }}>
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
        <div className="no-scrollbar mt-6 overflow-x-auto flex justify-center" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <div style={{ minWidth: "max-content", paddingLeft: "4px", paddingRight: "4px" }}>
            {/* Dots and lines — perfectly centered row */}
            <div className="flex items-center">
              {milestones.map((m, i) => (
                <div key={i} className="flex items-center flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    className="rounded-[8px] transition-all flex-shrink-0"
                    aria-label={`Go to ${m.year}`}
                    style={{
                      width: "10px",
                      height: "10px",
                      backgroundColor: i === index ? "#0052A5" : "#B2BBCB",
                      padding: 0,
                      border: "none",
                    }}
                  />
                  {i < milestones.length - 1 && (
                    <div className="flex-shrink-0" style={{ width: "24px", height: "1px", backgroundColor: "#B2BBCB" }} />
                  )}
                </div>
              ))}
            </div>
            {/* Labels row — aligned under each dot */}
            <div className="flex items-start" style={{ marginTop: "3px" }}>
              {milestones.map((m, i) => (
                <div key={i} className="flex items-start flex-shrink-0">
                  <div style={{ width: "10px", display: "flex", justifyContent: "center", overflow: "visible" }}>
                    <span style={{ fontSize: "7px", color: i === index ? "#0052A5" : "#B2BBCB", whiteSpace: "nowrap", fontWeight: i === index ? 700 : 400 }}>
                      {["1989","1993","1995","2002","2003","2017","2019","2022","Present"][i]}
                    </span>
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="flex-shrink-0" style={{ width: "24px" }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Building photo below timeline */}
        <div className="-ml-6 mt-[40px]" style={{ width: "calc(100% + 1.5rem)" }}>
          <Image
            src="/images/about-milestones-building.jpg"
            alt="Milestones building"
            width={390}
            height={300}
            className="w-full h-auto block"
          />
          <div style={{ width: "324px", height: "2px", backgroundColor: "#000000" }} />
        </div>
      </div>
    </section>
  )
}
