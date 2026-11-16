"use client"

import { useState } from "react"
import Image from "next/image"
import { PlusCircle, MinusCircle } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { Reveal } from "./scroll-reveal"

const EASE = [0.0, 0.0, 0.2, 1] as const

const GRADIENT_BORDER = "linear-gradient(135deg, rgba(45,45,45,1) 0%, rgba(45,45,45,0.56) 26%, rgba(147,147,147,0.22) 100%)"
const CLOSED_FILL = "linear-gradient(to right, rgba(45,45,45,1) 0%, rgba(115,115,115,0.22) 100%)"

const services = [
  {
    id: 1,
    title: "Structural Design for Concrete, Steel, Wood, and Masonry Buildings",
    image: "/images/services-building.png",
    intro: "Zagrosia provides practical structural design services for new buildings, additions, renovations, and building modifications using concrete, steel, wood, and masonry systems.",
    bullets: [
      "Structural design for concrete, steel, wood, and masonry systems",
      "Framing layouts and load path review",
      "Structural calculations and design notes",
      "Construction-oriented structural details",
      "Coordination with architects, contractors, and other consultants",
      "Support for additions, renovations, and building modifications",
    ],
    tags: ["Concrete", "Steel", "Wood", "Masonry", "BCBC 2024", "NBCC"],
  },
  {
    id: 2,
    title: "Foundation and Retaining Wall Design",
    image: "/images/about-milestones-building.png",
    intro: "Zagrosia provides foundation and retaining wall design services for buildings, site structures, equipment supports, additions, and repair projects.",
    bullets: [
      "Shallow foundation design",
      "Local equipment and structural support pads",
      "Retaining wall design and review",
      "Foundation upgrade or repair concepts",
      "Coordination with geotechnical information where available",
      "Practical construction details for contractors",
    ],
    tags: ["Foundations", "Concrete", "Geotechnical", "Retaining Walls"],
  },
  {
    id: 3,
    title: "Masonry, CMU Wall, Brick Veneer, and Attachment Design",
    image: "/images/about-core-values-building.png",
    intro: "Zagrosia provides engineering support for masonry walls, CMU construction, brick veneer attachments, lateral supports, and masonry-related building components.",
    bullets: [
      "CMU wall design and detailing",
      "Masonry attachment design",
      "Brick veneer support and anchorage review",
      "Lateral support and connection details",
      "Wall opening and lintel support coordination",
      "Repair and strengthening concepts for masonry elements",
    ],
    tags: ["Masonry", "CMU", "Brick Veneer", "Anchorage"],
  },
  {
    id: 4,
    title: "Steel Connection Design and Special Steel Structures",
    image: "/images/industrial-racking.jpg",
    intro: "Zagrosia provides steel connection design and practical engineering support for steel framing, platforms, brackets, supports, test structures, and custom steel components.",
    bullets: [
      "Steel connection design",
      "Base plate and anchor review",
      "Bracket and support frame design",
      "Special steel structures for testing or equipment support",
      "Fabrication-oriented details",
      "Coordination with shop drawings and installation requirements",
    ],
    tags: ["Steel", "Connections", "Fabrication", "Custom Structures"],
  },
  {
    id: 5,
    title: "Existing Building Structural Assessments",
    image: "/images/glass-building.jpg",
    intro: "Zagrosia provides structural assessment services for existing buildings where owners, strata corporations, property managers, contractors, or consultants need a professional engineering opinion.",
    bullets: [
      "Structural assessment of existing buildings",
      "Review of visible structural elements and distress conditions",
      "Assessment of wood, steel, concrete, and masonry systems",
      "Practical repair or upgrade recommendations",
      "Engineering reports for owners, strata, consultants, or contractors",
      "Support for renovation and alteration planning",
    ],
    tags: ["Assessment", "Existing Buildings", "Strata", "Reports"],
  },
  {
    id: 6,
    title: "Seismic Assessment and Retrofit Support for Existing Buildings",
    image: "/images/seismic-crane.jpg",
    intro: "Zagrosia provides seismic assessment and retrofit support for existing buildings, including wood, steel, concrete, masonry, warehouse, commercial, and multi-family structures.",
    bullets: [
      "Seismic assessment reports for existing buildings",
      "Review of seismic load path and structural vulnerabilities",
      "Retrofit concept development",
      "Coordination of strengthening options",
      "Support for phased upgrades or renovation planning",
      "Practical recommendations for owners and project teams",
    ],
    tags: ["Seismic", "Retrofit", "NBCC", "BCBC 2024", "Existing Buildings"],
  },
  {
    id: 7,
    title: "Structural Repair Design and Upgrade Support",
    image: "/images/about-milestones-building.png",
    intro: "Zagrosia provides structural repair and upgrade design for existing buildings and building components where structural elements are damaged, deteriorated, modified, or overloaded.",
    bullets: [
      "Structural repair design",
      "Local strengthening and reinforcement details",
      "Repair recommendations for damaged building components",
      "Balcony, stair, guardrail, and awning upgrades",
      "Support for strata and existing building repair projects",
      "Coordination with contractors during repair work",
    ],
    tags: ["Repair", "Rehabilitation", "Strata", "Strengthening"],
  },
  {
    id: 8,
    title: "Insurance and Property Damage Structural Reviews",
    image: "/images/glass-building.jpg",
    intro: "Zagrosia provides structural engineering reviews for property damage related to fire, flood, water leakage, vehicle impact, settlement, framing damage, or other loss events.",
    bullets: [
      "Structural review of fire, flood, water, impact, and settlement damage",
      "Damage-related structural assessment reports",
      "Minimum structural repair recommendations",
      "Repair scope support for insurance-related files",
      "Review of visible distress, framing damage, and affected load paths",
      "Practical engineering input for adjusters, consultants, and contractors",
    ],
    tags: ["Insurance", "Property Damage", "Assessment", "Reports"],
  },
  {
    id: 9,
    title: "Rooftop Mechanical and Electrical Equipment Supports",
    image: "/images/services-building.png",
    intro: "Zagrosia provides structural engineering support for rooftop mechanical and electrical equipment installations, including rooftop units, exhaust fans, duct supports, pipe supports, equipment curbs, and support frames.",
    bullets: [
      "Rooftop equipment load review",
      "Support design for mechanical and electrical equipment",
      "Curb, sleeper, and support coordination",
      "Review of roof openings and local framing impacts",
      "Seismic restraint support where required",
      "Practical details for contractors and mechanical teams",
    ],
    tags: ["Mechanical", "Rooftop", "Equipment Support", "Seismic Restraint"],
  },
  {
    id: 10,
    title: "Structural Openings and Building Alteration Support",
    image: "/images/about-core-values-building.png",
    intro: "Zagrosia provides engineering support for structural openings and building alterations in existing buildings, including walls, floors, roofs, and structural framing.",
    bullets: [
      "Review of proposed openings in existing structures",
      "Header, lintel, and support design",
      "Local reinforcement details",
      "Coordination with mechanical and architectural changes",
      "Temporary support concepts where required",
      "Construction-phase engineering support",
    ],
    tags: ["Renovations", "Openings", "Tenant Improvements", "Existing Buildings"],
  },
  {
    id: 11,
    title: "Racking System Safety and Capacity Reviews",
    image: "/images/industrial-racking.jpg",
    intro: "Zagrosia provides structural engineering services for warehouse and industrial racking systems, including field review, damage assessment, capacity analysis, anchorage review, and maximum load confirmation.",
    bullets: [
      "Field review of existing racking systems",
      "Review of damaged uprights, beams, braces, base plates, and anchors",
      "Capacity analysis and maximum load confirmation",
      "Repair or replacement recommendations",
      "Racking layout and configuration review",
      "Safety letters or engineering documentation for operational or WorkSafeBC-related requirements",
    ],
    tags: ["Racking", "Warehouse", "Industrial", "WorkSafeBC", "Capacity Review"],
  },
  {
    id: 12,
    title: "Guardrails, Stairs, Balconies, and Awnings",
    image: "/images/about-core-values-building.png",
    intro: "Zagrosia provides structural design and review services for guardrails, stairs, balconies, awnings, and exterior architectural components.",
    bullets: [
      "Guardrail design and anchorage review",
      "Stair and balcony structural support design",
      "Awning frame and connection design",
      "Upgrade and replacement support",
      "Coordination with fabricators and installers",
      "Review of shop drawings and installation details",
    ],
    tags: ["Guardrails", "Stairs", "Balconies", "Awnings", "Fabrication"],
  },
  {
    id: 13,
    title: "Shop Drawings and Fabrication Support",
    image: "/images/industrial-racking.jpg",
    intro: "Zagrosia provides shop drawing and fabrication support for guardrails, awnings, steel structures, support frames, brackets, and other structural components.",
    bullets: [
      "Shop drawings for guardrails",
      "Shop drawings for awnings",
      "Shop drawings for steel structures and support frames",
      "Connection and anchorage details",
      "Fabrication-oriented structural drawings",
      "Coordination with manufacturing and installation teams",
    ],
    tags: ["Shop Drawings", "Fabrication", "Steel", "Guardrails", "Awnings"],
  },
  {
    id: 14,
    title: "Helical Pile Foundations, Small Bridges, and Walkways",
    image: "/images/about-milestones-building.png",
    intro: "Zagrosia provides structural design support for helical pile foundations and small site structures, including walkways, small bridges, platforms, and light support structures.",
    bullets: [
      "Helical pile foundation design",
      "Foundation support for small structures",
      "Small bridge and walkway support design",
      "Pile cap, bracket, and connection details",
      "Coordination with contractors and pile installers",
      "Practical design support for constrained sites",
    ],
    tags: ["Helical Piles", "Foundations", "Small Bridges", "Walkways"],
  },
  {
    id: 15,
    title: "Scaffolding and Temporary Works Design",
    image: "/images/seismic-crane.jpg",
    intro: "Zagrosia provides engineering support for scaffolding, temporary access systems, temporary bracing, and construction-stage support requirements.",
    bullets: [
      "Scaffolding design drawings",
      "Temporary access support review",
      "Temporary bracing concepts",
      "Construction loading review",
      "Field coordination support",
      "Practical drawings for contractors and scaffold teams",
    ],
    tags: ["Scaffolding", "Temporary Works", "Construction Support"],
  },
  {
    id: 16,
    title: "Field Review and Construction Support",
    image: "/images/glass-building.jpg",
    intro: "Zagrosia provides field review and construction support to help bridge the gap between structural drawings and actual site conditions.",
    bullets: [
      "Field review of structural work",
      "Review of installed framing, connections, supports, and repairs",
      "Contractor coordination and practical engineering input",
      "Site notes, letters, or review reports where required",
      "Clarification of structural details during construction",
      "Support for repair and upgrade implementation",
    ],
    tags: ["Field Review", "Construction", "Site Inspection", "Contractor Support"],
  },
  {
    id: 17,
    title: "Practical Engineering Support for Owners, Contractors, and Consultants",
    image: "/images/services-building.png",
    intro: "Zagrosia's work is focused on practical structural engineering for real building conditions — whether an owner needs to understand a crack, a contractor needs a support detail, or a consultant needs structural input for a larger assessment.",
    bullets: [
      "Practical structural engineering consultation",
      "Existing building review and repair planning",
      "Design support for small and medium projects",
      "Coordination with contractors and consultants",
      "Clear written recommendations",
      "Buildable structural details and documentation",
    ],
    tags: ["Consultation", "Owners", "Contractors", "Consultants", "Small Projects"],
  },
]

export function ServicesHeroSection() {
  const reducedMotion = useReducedMotion()
  const [openId, setOpenId] = useState<number>(1)

  return (
    <section className="bg-[#FCFCFC] text-[#2D2D2D]">
      <div className="lg:hidden px-6 pb-10 pt-24">
        <Reveal variant="fadeUp" delay={0.05} duration={0.6}>
          <p className="mb-4 text-[10px] font-medium tracking-[0.14em] text-[#2D2D2D]">
            CORE SERVICES
          </p>
        </Reveal>

        <div className="relative pl-5">
          <motion.div
            className="absolute left-0 top-[8px] w-[1.5px]"
            initial={reducedMotion ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.85, ease: "easeInOut" }}
            style={{
              height: "calc(100% - 8px)",
              transformOrigin: "top",
              background:
                "linear-gradient(to bottom, rgba(45,45,45,1) 0%, rgba(45,45,45,0.8) 30%, rgba(45,45,45,0.4) 65%, rgba(45,45,45,0) 100%)",
            }}
          />

          <Reveal variant="fadeLeft" delay={0.1} duration={0.7}>
            <h2
              className="mb-5 text-[24px] font-black uppercase leading-[1.1] tracking-[0.04em]"
              style={{ fontFamily: "'Momo Trust Sans', 'Inter', sans-serif" }}
              aria-hidden="true"
            >
              <span className="text-[#2D2D2D]">ENGINEERING</span>
              <br />
              <span className="text-[#0052A5]">SOLUTIONS</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2} duration={0.65}>
            <p className="mb-7 text-[12px] leading-[1.75] tracking-[0.08em] text-[#2D2D2D]">
              From new structural design to complex rehabilitation, every engagement backed by 35+ years of expertise.
            </p>
          </Reveal>

          <div className="space-y-[6px]">
            {services.map((service, idx) => {
              const isOpen = service.id === openId
              return (
                <motion.div
                  key={service.id}
                  initial={reducedMotion ? false : { opacity: 0, y: 12, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: false, amount: 0.05 }}
                  transition={{ duration: 0.5, delay: 0.08 + idx * 0.07, ease: EASE }}
                >
                  {isOpen ? (
                    <div className="rounded-[20px]">
                      <div
                        className="rounded-[20px] lg:rounded-[19px] bg-[#FCFCFC] px-4 pb-4 pt-3"
                        style={{
                          boxShadow: "0px 4px 19.6px 0px rgba(0,0,0,0.34)",
                          backdropFilter: "blur(61.5px)",
                          WebkitBackdropFilter: "blur(61.5px)",
                          backgroundColor: "#FCFCFC",
                        }}
                      >
                        <button className="flex w-full items-start justify-between" onClick={() => setOpenId(0)}>
                          <span className="flex-1 pr-2 text-left text-[14px] font-semibold tracking-[0.1em] text-[#2D2D2D]">
                            {service.id}. {service.title}
                          </span>
                          <MinusCircle size={22} strokeWidth={2} className="mt-[2px] flex-shrink-0 text-[#2D2D2D]" />
                        </button>

                        {service.image && (
                          <div className="relative mt-3 h-[140px] w-full overflow-hidden rounded-[10px] lg:hidden">
                            <Image src={service.image} alt={service.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                          </div>
                        )}

                        <p className="mt-3 text-[12px] leading-[1.7] tracking-[0.06em] text-[#2D2D2D]">
                          {service.intro}
                        </p>

                        {service.bullets.length > 0 && (
                          <>
                            <p className="mt-4 font-semibold tracking-[0.1em] text-[#2D2D2D]" style={{ fontSize: "16px" }}>
                              What We Offer
                            </p>
                            <ul className="mt-2 space-y-[5px]">
                              {service.bullets.map((b) => (
                                <li key={b} className="flex items-start gap-2 leading-[1.65] tracking-[0.06em] text-[#2D2D2D]" style={{ fontSize: "14px" }}>
                                  <span className="mt-[3px] text-[8px]">•</span>
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}

                        {service.tags.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-[6px]">
                            {service.tags.map((tag) => (
                              <span key={tag} className="rounded-full bg-[#0052A5] px-3 py-[4px] text-[9px] font-medium tracking-[0.06em] text-white">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <button
                      className="flex h-[28px] w-full items-center justify-between rounded-[20px] px-3 transition-opacity hover:opacity-90 lg:h-[53px]"
                      style={{ background: CLOSED_FILL }}
                      onClick={() => setOpenId(service.id)}
                    >
                      <span className="text-[14px] font-medium tracking-[0.1em] text-white lg:text-[24px]">
                        {service.id}. {service.title}
                      </span>
                      <PlusCircle size={20} strokeWidth={2} className="text-white flex-shrink-0" />
                    </button>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        <Reveal variant="fadeBlur" delay={0.1} duration={0.85} className="-mx-6 overflow-visible" style={{ marginTop: "-4px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/services-building-mobile.png"
            alt="Teal glass building"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          <div style={{ width: "360px", height: "2px", backgroundColor: "#000000" }} />
        </Reveal>
      </div>

      {/* ── DESKTOP ── */}
      <div className="sidebar-content hidden lg:block">
        <div className="pt-[148px] pb-14 zag-desktop-content-pad">

          {/* Same structure as home page Engineering Solutions */}
          <div className="relative pl-5 lg:max-w-[940px]">

            {/* Vertical fading line — runs through heading + accordion */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-[4px]"
              initial={reducedMotion ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: false, amount: 0.05 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              style={{
                transformOrigin: "top",
                background: "linear-gradient(180deg, #0B0E0A 0%, rgba(150,150,150,0) 100%)",
              }}
            />

            {/* Label */}
            <Reveal variant="fadeUp" delay={0.05} duration={0.6}>
              <p className="mb-[20px] text-[20px] font-bold uppercase tracking-[0.24em] text-[#2D2D2D]">
                SERVICES WE OFFER
              </p>
            </Reveal>

            {/* Heading */}
            <Reveal variant="fadeLeft" delay={0.1} duration={0.7}>
              <h1 className="mb-5 text-[52px] font-bold uppercase leading-[0.96] tracking-[0.06em]" style={{ fontFamily: "'Momo Trust Sans', 'Inter', sans-serif" }}>
                <span className="mb-[8px] block text-[#2D2D2D]">ENGINEERING</span>
                <span className="block text-[#0052A5]">SOLUTIONS</span>
              </h1>
            </Reveal>

            {/* Description */}
            <Reveal delay={0.2} duration={0.65}>
              <p className="mb-7 leading-[1.75] tracking-[0.04em] text-[#2D2D2D]" style={{ fontSize: "18px", lineHeight: 1.65 }}>
                From new structural design to complex rehabilitation, every engagement backed by 35+ years of expertise.
              </p>
            </Reveal>

            {/* Accordion */}
            <div className="w-full space-y-[6px] lg:max-w-[916px]">
              {services.map((service, deskIdx) => {
                const isOpen = service.id === openId
                return (
                  <motion.div
                    key={service.id}
                    initial={reducedMotion ? false : { opacity: 0, y: 12, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: false, amount: 0.05 }}
                    transition={{ duration: 0.5, delay: 0.08 + deskIdx * 0.07, ease: EASE }}
                  >
                    {isOpen ? (
                      <div
                          className="rounded-[20px] bg-[#FCFCFC] px-4 pb-4 pt-3"
                          style={{
                            boxShadow: "0px 4px 19.6px 0px rgba(0,0,0,0.34)",
                            backdropFilter: "blur(61.5px)",
                            WebkitBackdropFilter: "blur(61.5px)",
                          }}
                        >
                          <button className="flex w-full items-center justify-between" onClick={() => setOpenId(0)}>
                            <span className="flex-1 pr-4 text-left font-semibold tracking-[0.1em] text-[#2D2D2D]" style={{ fontSize: "24px" }}>
                              {service.id}. {service.title}
                            </span>
                            <MinusCircle size={22} strokeWidth={2} className="text-[#2D2D2D] flex-shrink-0" />
                          </button>
                          {service.image && (
                            <div className="relative mt-3 h-[220px] w-full overflow-hidden rounded-[10px]">
                              <Image src={service.image} alt={service.title} fill sizes="50vw" className="object-cover" />
                            </div>
                          )}
                          <p className="mt-3 leading-[1.7] tracking-[0.06em] text-[#2D2D2D]" style={{ fontSize: "16px" }}>
                            {service.intro}
                          </p>
                          {service.bullets.length > 0 && (
                            <>
                              <p className="mt-4 font-semibold tracking-[0.1em] text-[#2D2D2D]" style={{ fontSize: "16px" }}>
                                What We Offer
                              </p>
                              <ul className="mt-2 space-y-[5px]">
                                {service.bullets.map((b) => (
                                  <li key={b} className="flex items-start gap-2 leading-[1.65] tracking-[0.06em] text-[#2D2D2D]" style={{ fontSize: "14px" }}>
                                    <span className="mt-[3px] text-[8px]">•</span>
                                    <span>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}
                          {service.tags.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-[6px]">
                              {service.tags.map((tag) => (
                                <span key={tag} className="rounded-full bg-[#0052A5] px-3 py-[4px] font-medium tracking-[0.06em] text-white" style={{ fontSize: "14px" }}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                    ) : (
                      <button
                        className="flex h-[28px] w-full items-center justify-between rounded-[20px] px-3 transition-all hover:opacity-80 hover:scale-[1.005] lg:h-[53px]"
                        style={{ background: CLOSED_FILL }}
                        onClick={() => setOpenId(service.id)}
                      >
                        <span className="font-medium tracking-[0.1em] text-white" style={{ fontSize: "24px" }}>
                          {service.id}. {service.title}
                        </span>
                        <PlusCircle size={20} strokeWidth={2} className="text-white flex-shrink-0" />
                      </button>
                    )}
                  </motion.div>
                )
              })}
            </div>

          </div>
        </div>

        {/* Building image */}
        <Reveal variant="fadeBlur" delay={0.1} duration={0.9} className="pb-[60px] mt-[-180px]">
          <Image
            src="/images/services-building.png"
            alt="Teal glass building"
            width={1200}
            height={800}
            className="block h-auto w-full"
            style={{ objectFit: "contain", objectPosition: "left bottom" }}
          />
          <div className="h-[3px] w-[1100px] bg-[#000000]" />
        </Reveal>
      </div>
    </section>
  )
}
