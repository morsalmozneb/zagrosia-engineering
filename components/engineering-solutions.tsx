"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { PlusCircle, MinusCircle, Check } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Reveal, StaggerReveal } from "./scroll-reveal"
import { CtaButton } from "@/components/cta-button"
import { allServices, HOME_SERVICE_IDS } from "./services-data"

const BRAND_BLUE = "#0150a9"
const NAVY = "#161f43"
const EASE = [0.0, 0.0, 0.2, 1] as const

// The six homepage services (picked from the 17 on the Services page)
const services = HOME_SERVICE_IDS.map((id) => allServices.find((s) => s.id === id)!)

export function EngineeringSolutions() {
  const [openId, setOpenId] = useState<number>(0)
  const reducedMotion = useReducedMotion()
  const gridRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // The panel keeps showing the last opened service while it closes
  const shownRef = useRef(1)
  if (openId) shownRef.current = openId
  const activeId = shownRef.current
  const active = services.find((x) => x.id === activeId) ?? services[0]

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

  // After the panel opens, make sure the whole thing is on screen
  useEffect(() => {
    if (!openId) return
    const t = setTimeout(() => {
      const grid = gridRef.current
      const panel = panelRef.current
      if (!grid || !panel) return
      const g = grid.getBoundingClientRect()
      const pr = panel.getBoundingClientRect()
      if (pr.bottom > window.innerHeight - 20 || g.top < 80) {
        window.scrollTo({ top: window.scrollY + g.top - 96, behavior: "smooth" })
      }
    }, 550)
    return () => clearTimeout(t)
  }, [openId])


  return (
    <section id="services" className="bg-[#FCFCFC] text-[#2D2D2D]">

      {/* TOP: Service tabs + detail panel */}
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

          {/* Service tabs */}
          <div ref={gridRef} role="tablist" className="grid grid-cols-2 gap-[8px] lg:grid-cols-3 lg:gap-[10px]">
            {services.map((service, i) => {
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
                  <span className="text-[13px] font-semibold leading-[1.1] tracking-[0.01em] lg:text-[16px]">{service.short}</span>
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
                  {services.map((service) => {
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
                            preload="auto"
                            className="h-full w-full object-cover"
                          />
                        ) : service.image ? (
                          <Image src={service.image} alt={service.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                        ) : (
                          <div className="h-full w-full" style={{ background: "linear-gradient(160deg, #0150a9 0%, #161f43 100%)" }} />
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
                        {active.title}
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
                      <div className="mt-6">
                        <CtaButton
                          href={`/services#service-${activeId}`}
                          className="inline-flex items-center justify-center zag-cta rounded-[10px] border border-[#2D2D2D] text-[#2D2D2D] font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[40px] px-5 text-[11px] lg:h-[44px] lg:px-7 lg:text-[14px]"
                        >
                          Learn More
                        </CtaButton>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* What we offer */}
              <div className="mt-5 border-t pt-5 lg:mt-6 lg:pt-6" style={{ borderColor: "rgba(1,80,169,0.12)", color: NAVY }}>
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] lg:text-[12px]" style={{ color: BRAND_BLUE }}>
                  What We Offer
                </p>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.ul
                    key={activeId}
                    className="grid gap-x-8 gap-y-[10px] lg:grid-cols-2"
                    initial={reducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    {active.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-[13px] leading-[1.5] lg:text-[15px]">
                        <span className="mt-[2px] flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(1,80,169,0.12)" }}>
                          <Check size={11} strokeWidth={3} style={{ color: BRAND_BLUE }} />
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          <div className="mt-6 lg:mt-8">
            <CtaButton
              href="/services"
              className="inline-flex items-center justify-center zag-cta rounded-[10px] border border-[#2D2D2D] text-[#2D2D2D] font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[40px] px-5 text-[11px] lg:h-[44px] lg:px-7 lg:text-[14px]"
            >
              View All Services
            </CtaButton>
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
