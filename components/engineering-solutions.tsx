"use client"

import { useState } from "react"
import Image from "next/image"
import { PlusCircle, MinusCircle, ArrowRight } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Reveal, StaggerReveal } from "./scroll-reveal"
import { CtaButton } from "@/components/cta-button"

const ROW_FILL = "linear-gradient(to right, rgba(225,236,250,0.95) 0%, rgba(214,226,242,0.95) 100%)"
const ROW_FILL_ACTIVE = "linear-gradient(to right, rgba(199,222,252,1) 0%, rgba(222,234,250,1) 100%)"
const BRAND_BLUE = "#0150a9"
const NAVY = "#161f43"
const EASE = [0.0, 0.0, 0.2, 1] as const

// Each service can get its own video: set `video: "/videos/services/xxx.mp4"` and it replaces the picture.
const services: {
  id: number
  title: string
  image: string
  video?: string
  intro: string
  bullets: string[]
  tags: string[]
}[] = [
  {
    id: 1,
    title: "Structural Design",
    image: "/images/services-building.png",
    intro: "Full-scope structural design for residential, commercial, and industrial projects — engineered to code and built to last.",
    bullets: [
      "Residential structures (single-family, multi-family, townhomes)",
      "Commercial buildings (offices, retail, mixed-use)",
      "Industrial facilities and warehouses",
      "Foundation design and analysis",
      "Steel, concrete, wood, and masonry structures",
      "Structural drawings and specifications",
    ],
    tags: ["Steel", "Concrete", "Wood", "Masonry", "BCBC 2024", "NBCC"],
  },
  {
    id: 2,
    title: "Seismic Assessment",
    image: "/images/seismic-crane.jpg",
    intro: "Comprehensive seismic evaluations following BCBC, NBCC, and EGBC standards to assess and mitigate structural risk.",
    bullets: [
      "Seismic hazard and site classification analysis",
      "Existing building vulnerability assessments",
      "Retrofit design and structural strengthening",
      "Post-earthquake damage evaluation",
      "Compliance with BCBC 2024 and NBCC seismic provisions",
      "Detailed reporting and engineering recommendations",
    ],
    tags: ["BCBC 2024", "NBCC", "Seismic", "Retrofit", "Risk Assessment"],
  },
  {
    id: 3,
    title: "Building Rehabilitation",
    image: "/images/about-milestones-building.png",
    intro: "Expert structural upgrades and rehabilitation for aging, distressed, or non-compliant buildings.",
    bullets: [
      "Condition assessment and structural investigation",
      "Repair design for concrete, steel, and masonry",
      "Seismic and code-compliance upgrades",
      "Structural reinforcement and strengthening",
      "Heritage and existing building retrofits",
      "Long-term rehabilitation planning and reporting",
    ],
    tags: ["Rehabilitation", "Retrofit", "Concrete", "Masonry", "EGBC"],
  },
  {
    id: 4,
    title: "Heavy Racking",
    image: "/images/industrial-racking.jpg",
    intro: "Industrial racking systems engineering — design, seismic review, and code compliance for warehouses and distribution centres.",
    bullets: [
      "Selective and drive-in pallet racking design",
      "Seismic bracing and anchor design",
      "Load capacity and operational safety review",
      "Site-specific seismic compliance (BCBC / NBCC)",
      "Racking system inspection and certification",
      "Full engineering drawing packages",
    ],
    tags: ["Industrial", "Steel", "Seismic", "BCBC 2024", "Warehousing"],
  },
  {
    id: 5,
    title: "Building Envelope",
    image: "/images/glass-building.jpg",
    intro: "Structural integration and performance assessments for building envelopes — moisture control, cladding systems, and longevity.",
    bullets: [
      "Exterior cladding and curtain wall structural review",
      "Moisture and air barrier assessment",
      "Window and glazing system structural analysis",
      "Roof structure and waterproofing coordination",
      "Facade inspection and failure investigation",
      "Performance improvement recommendations",
    ],
    tags: ["Envelope", "Cladding", "Glazing", "Waterproofing", "Building Science"],
  },
  {
    id: 6,
    title: "Specialty Reviews",
    image: "/images/about-core-values-building.png",
    intro: "Specialized structural peer reviews, independent engineering consultations, and technical opinions for complex or unique projects.",
    bullets: [
      "Independent structural peer review",
      "Third-party engineering assessments",
      "Expert technical opinions and reports",
      "Construction progress and compliance review",
      "Dispute resolution and forensic engineering support",
      "Custom consulting for unique structural challenges",
    ],
    tags: ["Peer Review", "Forensic", "Consulting", "Inspection", "EGBC"],
  },
]

export function EngineeringSolutions() {
  const [openId, setOpenId] = useState<number>(1)
  const reducedMotion = useReducedMotion()

  return (
    <section id="services" className="bg-[#FCFCFC] text-[#2D2D2D]">

      {/* TOP: Accordion */}
      <div className="sidebar-content px-6 pb-10 pt-12 lg:pt-24 lg:pb-20 zag-desktop-content-pad">
        <div className="relative pl-5">

          {/* Vertical fading line — draws in from top */}
          <motion.div
            className="absolute left-0 top-0 w-[1.5px]"
            style={{
              height: "100%",
              background: "linear-gradient(to bottom, rgba(1,80,169,1) 0%, rgba(1,80,169,0.8) 30%, rgba(1,80,169,0.4) 65%, rgba(1,80,169,0) 100%)",
              transformOrigin: "top",
            }}
            initial={reducedMotion ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeInOut" }}
          />

          {/* Heading */}
          <Reveal variant="fadeLeft" delay={0.1} duration={0.7}>
            <h2 className="zag-heading mb-5 font-medium uppercase leading-[1.1] text-[20px] lg:font-normal lg:text-[32px] lg:leading-[1.1]">
              <span className="text-[#2D2D2D]">ENGINEERING</span>
              <br />
              <span className="text-[#2D2D2D]">SOLUTIONS</span>
            </h2>
          </Reveal>

          {/* Description */}
          <Reveal delay={0.22} duration={0.65}>
            <p className="mb-7 text-[12px] leading-[1.75] tracking-[0.04em] text-[#2D2D2D] lg:text-[18px]" style={{ lineHeight: 1.65 }}>
              From new structural design to complex rehabilitation, every engagement backed by 35+ years of expertise.
            </p>
          </Reveal>

          <div className="lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:gap-9">
            {/* Media panel — shows the picture (later: video) of the selected service */}
            <div className="relative mb-4 h-[230px] w-full overflow-hidden rounded-[18px] bg-[#071a33] lg:sticky lg:top-24 lg:mb-0 lg:h-auto lg:self-start lg:aspect-[4/4.4]">
              <AnimatePresence mode="sync" initial={false}>
                {services.filter((x) => x.id === (openId || 1)).map((service) => (
                  <motion.div
                    key={service.id}
                    className="absolute inset-0"
                    initial={reducedMotion ? false : { opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease: EASE }}
                  >
                    {service.video ? (
                      <video
                        key={service.video}
                        src={service.video}
                        poster={service.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Image src={service.image} alt={service.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              <span
                className="absolute left-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 text-[13px] font-semibold text-white backdrop-blur-sm lg:h-10 lg:w-10 lg:text-[14px]"
                style={{ borderColor: BRAND_BLUE, background: "rgba(1,80,169,0.55)" }}
              >
                {String(openId || 1).padStart(2, "0")}
              </span>
            </div>

            {/* Accordion — each row staggers in */}
            <div>
              <div className="w-full space-y-[8px] lg:space-y-3">
                {services.map((service, i) => {
                  const isOpen = service.id === openId
                  const num = String(service.id).padStart(2, "0")
                  return (
                    <motion.div
                      key={service.id}
                      initial={reducedMotion ? false : { opacity: 0, y: 16, filter: "blur(4px)" }}
                      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      viewport={{ once: false, amount: 0.05 }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: EASE }}
                    >
                      <div
                        className="overflow-hidden rounded-[14px] border transition-colors"
                        style={{
                          background: isOpen ? ROW_FILL_ACTIVE : ROW_FILL,
                          borderColor: isOpen ? "rgba(1,80,169,0.25)" : "rgba(1,80,169,0.10)",
                          boxShadow: isOpen ? "0 6px 18px rgba(1,80,169,0.14)" : "none",
                        }}
                      >
                        <button
                          className="flex min-h-[46px] w-full items-center justify-between px-4 text-left lg:min-h-[60px] lg:px-5"
                          onClick={() => setOpenId(isOpen ? 0 : service.id)}
                          aria-expanded={isOpen}
                        >
                          <span className="flex items-baseline gap-4 lg:gap-6" style={{ color: NAVY }}>
                            <span className="text-[14px] font-bold tracking-[0.04em] lg:text-[20px]">{num}</span>
                            <span className="text-[14px] font-semibold tracking-[0.02em] lg:text-[20px]">{service.title}</span>
                          </span>
                          {isOpen ? (
                            <MinusCircle size={26} strokeWidth={1.8} className="flex-shrink-0" style={{ color: BRAND_BLUE }} />
                          ) : (
                            <PlusCircle size={26} strokeWidth={1.8} className="flex-shrink-0" style={{ color: BRAND_BLUE }} />
                          )}
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: EASE }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 lg:px-5 lg:pb-5" style={{ color: NAVY }}>
                                <p className="leading-[1.65] tracking-[0.02em] lg:text-[15px]" style={{ fontSize: "12px" }}>
                                  {service.intro}
                                </p>
                                <ul className="mt-3 space-y-[4px]">
                                  {service.bullets.map((b) => (
                                    <li key={b} className="flex items-start gap-2 leading-[1.55] tracking-[0.02em] lg:text-[14px]" style={{ fontSize: "12px" }}>
                                      <span className="mt-[7px] h-[5px] w-[5px] flex-shrink-0 rounded-full" style={{ background: BRAND_BLUE }} />
                                      <span>{b}</span>
                                    </li>
                                  ))}
                                </ul>
                                <div className="mt-3 flex flex-wrap gap-[6px]">
                                  {service.tags.map((tag) => (
                                    <span key={tag} className="rounded-[8px] px-3 py-[4px] font-medium tracking-[0.06em] text-white lg:text-[12px]" style={{ fontSize: "9px", background: BRAND_BLUE }}>
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Learn More CTA */}
              <Reveal variant="scaleUp" delay={0.3} duration={0.55}>
                <div className="mt-7">
                  <CtaButton
                    href="/services"
                    className="inline-flex items-center justify-center gap-3 zag-cta rounded-[10px] text-white font-semibold tracking-[0.04em] transition-colors hover:brightness-110 h-[40px] px-5 text-[12px] lg:h-[52px] lg:px-7 lg:text-[18px]"
                    style={{ background: BRAND_BLUE }}
                  >
                    Learn More
                    <ArrowRight size={20} strokeWidth={2} />
                  </CtaButton>
                </div>
              </Reveal>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM: Building image — slides in from right with blur */}
      <Reveal variant="fadeRight" delay={0.1} duration={0.9} className="overflow-hidden -mt-10 lg:mt-0 lg:pl-[var(--desktop-grid-content-start)] lg:pb-24">
        <div className="lg:relative lg:aspect-[2.32/1] lg:overflow-hidden lg:rounded-l-[14px]">
          <Image
            src="/images/curved-building.png"
            alt="Modern curved architectural building"
            width={1200}
            height={600}
            className="w-full object-cover lg:absolute lg:inset-0 lg:h-full"
            priority
          />
        </div>
      </Reveal>
    </section>
  )
}
