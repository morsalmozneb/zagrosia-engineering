"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { PlusCircle, MinusCircle, Check } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

const BRAND_BLUE = "#0150a9"
const NAVY = "#161f43"
const EASE = [0.0, 0.0, 0.2, 1] as const

export type Detail = { id: number; title: string; intro: string; bullets: string[]; tags: string[] }

// Each service can get its own video: set `video: "/videos/services/xxx.mp4"` and it replaces the picture.
const categories: {
  id: number
  key: string
  detailIds: number[]
  title: string
  image: string
  video?: string
  intro: string
  bullets: string[]
  tags: string[]
}[] = [
  {
    id: 1,
    key: "structural-design",
    detailIds: [1, 2, 4, 9, 12, 13, 14, 15],
    title: "Structural Design",
    image: "/videos/services/structural-design-v2-poster.jpg",
    video: "/videos/services/structural-design-v2.mp4",
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
    key: "seismic-assessment",
    detailIds: [6],
    title: "Seismic Assessment",
    image: "/videos/services/seismic-assessment-v2-poster.jpg",
    video: "/videos/services/seismic-assessment-v2.mp4",
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
    key: "building-rehabilitation",
    detailIds: [7, 10],
    title: "Building Rehabilitation",
    image: "/videos/services/building-rehabilitation-v2-poster.jpg",
    video: "/videos/services/building-rehabilitation-v2.mp4",
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
    key: "heavy-racking",
    detailIds: [11],
    title: "Heavy Racking",
    image: "/videos/services/heavy-racking-v2-poster.jpg",
    video: "/videos/services/heavy-racking-v2.mp4",
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
    key: "building-envelope",
    detailIds: [3],
    title: "Building Envelope",
    image: "/videos/services/building-envelope-v2-poster.jpg",
    video: "/videos/services/building-envelope-v2.mp4",
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
    key: "specialty-reviews",
    detailIds: [5, 8, 16, 17],
    title: "Specialty Reviews",
    image: "/videos/services/specialty-reviews-v2-poster.jpg",
    video: "/videos/services/specialty-reviews-v2.mp4",
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

export function ServicesTabs({ details }: { details: Detail[] }) {
  const [openId, setOpenId] = useState<number>(0)
  const [openSub, setOpenSub] = useState<number>(0)
  const reducedMotion = useReducedMotion()
  const gridRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // The panel keeps showing the last opened service while it closes
  const shownRef = useRef(1)
  if (openId) shownRef.current = openId
  const activeId = shownRef.current
  const active = categories.find((x) => x.id === activeId) ?? categories[0]

  // Which service's video sits underneath while the next one fades in
  const lastRef = useRef(activeId)
  const underRef = useRef(activeId)
  if (lastRef.current !== activeId) {
    underRef.current = lastRef.current
    lastRef.current = activeId
  }
  const underId = underRef.current
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({})

  // Only the visible video plays, and a newly chosen one always starts from the beginning
  useEffect(() => {
    const t = setTimeout(() => {
      Object.entries(videoRefs.current).forEach(([id, v]) => {
        if (v && (Number(id) !== activeId || !openId)) v.pause()
      })
    }, 700)
    const v = videoRefs.current[activeId]
    if (v && openId) {
      try { v.currentTime = 0 } catch {}
      v.play().catch(() => {})
    }
    return () => clearTimeout(t)
  }, [activeId, openId])

  // Open the group named in the URL (e.g. /services#cat-heavy-racking)
  useEffect(() => {
    const m = window.location.hash.match(/^#cat-([a-z-]+)$/)
    if (!m) return
    const c = categories.find((x) => x.key === m[1])
    if (c) setOpenId(c.id)
  }, [])

  // Switching group closes any expanded service
  useEffect(() => { setOpenSub(0) }, [activeId])

  // After the panel opens, make sure the whole thing is on screen
  useEffect(() => {
    if (!openId) return
    const t = setTimeout(() => {
      const grid = gridRef.current
      const panel = panelRef.current
      if (!grid || !panel || grid.offsetParent === null) return
      const g = grid.getBoundingClientRect()
      const pr = panel.getBoundingClientRect()
      if (pr.bottom > window.innerHeight - 20 || g.top < 80) {
        window.scrollTo({ top: window.scrollY + g.top - 96, behavior: "smooth" })
      }
    }, 550)
    return () => clearTimeout(t)
  }, [openId])

  const [eyebrow, ...restWords] = active.title.split(" ")
  const activeDetails = active.detailIds.map((id) => details.find((d) => d.id === id)!).filter(Boolean)

  return (
    <div>
          {/* Service tabs */}
          <div ref={gridRef} role="tablist" className="grid grid-cols-2 gap-[8px] lg:grid-cols-3 lg:gap-[10px]">
            {categories.map((service, i) => {
              const isOpen = service.id === openId
              return (
                <motion.button
                  key={service.id}
                  role="tab"
                  aria-selected={isOpen}
                  aria-controls="service-panel"
                  onClick={() => setOpenId(isOpen ? 0 : service.id)}
                  initial={reducedMotion ? false : { opacity: 0, y: 16, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: false, amount: 0.05 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: EASE }}
                  className="group relative flex min-h-[40px] items-center justify-between overflow-hidden rounded-[10px] border px-3 py-[6px] text-left transition-[background,border-color,box-shadow,color] duration-300 lg:h-[40px] lg:px-4 lg:py-0"
                  style={{
                    background: isOpen ? BRAND_BLUE : "linear-gradient(135deg, rgba(232,240,252,0.95) 0%, rgba(218,230,246,0.95) 100%)",
                    borderColor: isOpen ? BRAND_BLUE : "rgba(1,80,169,0.14)",
                    boxShadow: isOpen ? "0 10px 24px rgba(1,80,169,0.28)" : "none",
                    color: isOpen ? "#fff" : NAVY,
                  }}
                >
                  <span className="text-[13px] font-semibold leading-[1.1] tracking-[0.01em] lg:text-[16px]">{service.title}</span>
                  {isOpen ? (
                    <MinusCircle size={18} strokeWidth={1.8} className="ml-2 flex-shrink-0" style={{ color: "#fff" }} />
                  ) : (
                    <PlusCircle size={18} strokeWidth={1.8} className="ml-2 flex-shrink-0 transition-transform duration-300 group-hover:rotate-90" style={{ color: BRAND_BLUE }} />
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Detail panel — opens underneath the tabs */}
          <motion.div
            id="service-panel"
            role="tabpanel"
            initial={false}
            animate={{ height: openId ? "auto" : 0, opacity: openId ? 1 : 0, marginTop: openId ? 16 : 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.55, ease: EASE }}
            className="-mx-3 -mb-10 overflow-hidden px-3 pb-10"
            aria-hidden={!openId}
          >
            <div
              ref={panelRef}
              className="rounded-[22px] border p-4 lg:p-6"
              style={{
                background: "linear-gradient(160deg, #FFFFFF 0%, #F3F7FD 100%)",
                borderColor: "rgba(1,80,169,0.14)",
                boxShadow: "0 18px 44px rgba(22,31,67,0.10)",
              }}
            >
              <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-7">
                {/* Video */}
                <div
                  className="relative aspect-square w-full overflow-hidden rounded-[18px] bg-[#071a33]"
                  style={{ boxShadow: "0 12px 30px rgba(7,26,51,0.35), inset 0 0 0 1px rgba(255,255,255,0.06)" }}
                >
                  {categories.map((service) => {
                    const isActive = service.id === activeId
                    const isUnder = service.id === underId && !isActive
                    return (
                      <div
                        key={service.id}
                        className="absolute inset-0"
                        style={{
                          opacity: isActive || isUnder ? 1 : 0,
                          zIndex: isActive ? 2 : isUnder ? 1 : 0,
                          transition: isActive && !reducedMotion ? "opacity 0.7s ease" : "none",
                        }}
                      >
                        {service.video ? (
                          <video
                            ref={(el) => { videoRefs.current[service.id] = el }}
                            src={service.video}
                            poster={service.image}
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Image src={service.image} alt={service.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Text */}
                <div className="flex min-w-0 flex-col justify-center" style={{ color: NAVY }}>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeId}
                      initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <h3 className="text-[22px] font-semibold leading-[1.15] tracking-[0.01em] lg:text-[30px]">
                        {eyebrow} {restWords.join(" ")}
                      </h3>
                      <div className="mt-3 h-[3px] w-12 rounded-full" style={{ background: BRAND_BLUE }} />
                      <p className="mt-4 text-[13px] leading-[1.7] tracking-[0.01em] opacity-90 lg:text-[15px]">{active.intro}</p>
                      <div className="mt-5 flex flex-wrap gap-[6px]">
                        {active.tags.map((tag) => (
                          <span key={tag} className="rounded-[8px] px-3 py-[4px] text-[10px] font-medium tracking-[0.06em] text-white lg:text-[12px]" style={{ background: BRAND_BLUE }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Services included in this group */}
              <div className="mt-5 border-t pt-5 lg:mt-6 lg:pt-6" style={{ borderColor: "rgba(1,80,169,0.12)", color: NAVY }}>
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] lg:text-[12px]" style={{ color: BRAND_BLUE }}>
                  What We Offer
                </p>
                <div className="space-y-[8px]">
                  {activeDetails.map((d) => {
                    const subOpen = openSub === d.id
                    return (
                      <div
                        key={d.id}
                        className="rounded-[12px] border"
                        style={{
                          borderColor: subOpen ? "rgba(1,80,169,0.35)" : "rgba(1,80,169,0.14)",
                          background: subOpen ? "#FFFFFF" : "rgba(232,240,252,0.55)",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => setOpenSub(subOpen ? 0 : d.id)}
                          aria-expanded={subOpen}
                          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                        >
                          <span className="text-[14px] font-semibold leading-[1.3] lg:text-[16px]">{d.title}</span>
                          {subOpen ? (
                            <MinusCircle size={18} strokeWidth={1.8} className="flex-shrink-0" style={{ color: BRAND_BLUE }} />
                          ) : (
                            <PlusCircle size={18} strokeWidth={1.8} className="flex-shrink-0" style={{ color: BRAND_BLUE }} />
                          )}
                        </button>
                        <AnimatePresence initial={false}>
                          {subOpen && (
                            <motion.div
                              initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: EASE }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4">
                                <p className="text-[13px] leading-[1.7] opacity-90 lg:text-[15px]">{d.intro}</p>
                                <ul className="mt-3 grid gap-x-8 gap-y-[8px] lg:grid-cols-2">
                                  {d.bullets.map((b) => (
                                    <li key={b} className="flex items-start gap-3 text-[13px] leading-[1.5] lg:text-[15px]">
                                      <span className="mt-[2px] flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(1,80,169,0.12)" }}>
                                        <Check size={11} strokeWidth={3} style={{ color: BRAND_BLUE }} />
                                      </span>
                                      <span>{b}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>

    </div>
  )
}
