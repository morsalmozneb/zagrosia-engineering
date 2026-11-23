"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { CtaButton } from "@/components/cta-button"
import { allServices } from "./services-data"

const BRAND_BLUE = "#0150a9"
const LIGHT_BLUE = "#3a9be8"
const NAVY = "#161f43"
const EASE = [0.0, 0.0, 0.2, 1] as const

const services = allServices

// The 17 services, grouped like a drawing register: one letter per discipline
const CATEGORIES = [
  { name: "Design & Foundations", ids: [1, 2, 3, 4, 14] },
  { name: "Assessment & Retrofit", ids: [5, 6, 7, 8] },
  { name: "Alterations & Equipment", ids: [9, 10, 11, 12] },
  { name: "Construction Support", ids: [13, 15, 16, 17] },
]

// service id -> its category
const META: Record<number, { cat: number }> = {}
CATEGORIES.forEach((c, ci) => c.ids.forEach((id) => { META[id] = { cat: ci } }))

const ORDER = CATEGORIES.flatMap((c) => c.ids)

// The engineer's seal, stamped onto each sheet
function Seal({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} role="img" aria-label="Professional Engineer, signed and sealed">
      <defs>
        <path id="svc-seal-top" d="M 23.6,81 A 42,42 0 1 1 96.4,81" />
        <path id="svc-seal-bottom" d="M 18.4,84 A 48,48 0 0 0 101.6,84" />
      </defs>
      <circle cx="60" cy="60" r="58" fill="#fff" fillOpacity="0.82" />
      <g fill="none" stroke={BRAND_BLUE}>
        <circle cx="60" cy="60" r="56" strokeWidth="2.6" />
        <circle cx="60" cy="60" r="52" strokeWidth="1" />
        <circle cx="60" cy="60" r="33" strokeWidth="1" />
      </g>
      <g fill={BRAND_BLUE} fontFamily="Inter, Arial, sans-serif" fontWeight="700">
        <text fontSize="8" letterSpacing="0.9"><textPath href="#svc-seal-top" startOffset="50%" textAnchor="middle">PROFESSIONAL ENGINEER</textPath></text>
        <text fontSize="8" letterSpacing="1.2"><textPath href="#svc-seal-bottom" startOffset="50%" textAnchor="middle">SIGNED &amp; SEALED</textPath></text>
        <text x="60" y="68" fontSize="20" textAnchor="middle" letterSpacing="0.4">P.ENG</text>
      </g>
    </svg>
  )
}

export function ServicesTabs() {
  const [activeId, setActiveId] = useState<number>(1)
  const reducedMotion = useReducedMotion()

  const active = services.find((x) => x.id === activeId) ?? services[0]
  const category = CATEGORIES[META[activeId].cat]
  const position = ORDER.indexOf(activeId)

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
        if (v && Number(id) !== activeId) v.pause()
      })
    }, 700)
    const v = videoRefs.current[activeId]
    if (v) {
      try { v.currentTime = 0 } catch {}
      v.play().catch(() => {})
    }
    return () => clearTimeout(t)
  }, [activeId])

  // Open the service named in the URL (e.g. /services#service-6)
  useEffect(() => {
    const m = window.location.hash.match(/^#service-(\d+)$/)
    if (!m) return
    const id = Number(m[1])
    if (services.some((x) => x.id === id)) setActiveId(id)
  }, [])

  const choose = (id: number) => {
    setActiveId(id)
    try { window.history.replaceState(null, "", `#service-${id}`) } catch {}
  }
  const step = (dir: 1 | -1) => choose(ORDER[(position + dir + ORDER.length) % ORDER.length])

  return (
    <div className="grid gap-5 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10" style={{ color: NAVY }}>
      {/* ───────── All services ───────── */}
      <div className="lg:sticky lg:top-[104px] lg:self-start">
        <p className="mb-5 hidden text-[13px] font-bold uppercase tracking-[0.26em] lg:block" style={{ color: BRAND_BLUE }}>
          All services
        </p>

        {/* Mobile: choose a category first */}
        <div className="mb-3 grid grid-cols-2 gap-2 lg:hidden">
          {CATEGORIES.map((c, ci) => {
            const on = META[activeId].cat === ci
            return (
              <button
                key={c.name}
                onClick={() => choose(c.ids[0])}
                className="rounded-[10px] border px-3 py-[10px] text-left text-[12px] font-semibold leading-[1.2] transition-colors"
                style={{
                  background: on ? BRAND_BLUE : "#fff",
                  borderColor: on ? BRAND_BLUE : "rgba(1,80,169,0.22)",
                  color: on ? "#fff" : NAVY,
                }}
              >
                {c.name}
              </button>
            )
          })}
        </div>

        <div role="tablist" aria-orientation="vertical" className="lg:space-y-8">
          {CATEGORIES.map((c, ci) => {
            const showOnMobile = META[activeId].cat === ci
            return (
              <div key={c.name} className={`${showOnMobile ? "block" : "hidden"} lg:block`}>
                <div className="mb-3 hidden items-center gap-3 lg:flex">
                  <span className="h-[7px] w-[7px] rounded-full" style={{ background: LIGHT_BLUE }} />
                  <span className="text-[12px] font-bold uppercase tracking-[0.18em]" style={{ color: "rgba(22,31,67,0.62)" }}>
                    {c.name}
                  </span>
                  <span className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(1,80,169,0.3), rgba(1,80,169,0))" }} />
                </div>

                <div className="flex flex-wrap gap-2 lg:block lg:space-y-1">
                  {c.ids.map((id) => {
                    const s = services.find((x) => x.id === id)!
                    const on = id === activeId
                    return (
                      <button
                        key={id}
                        role="tab"
                        aria-selected={on}
                        aria-controls="service-card"
                        onClick={() => choose(id)}
                        className="group relative flex items-center rounded-full border px-4 py-[8px] text-left transition-colors lg:w-full lg:rounded-[10px] lg:border-0 lg:px-4 lg:py-[10px]"
                        style={{
                          background: on ? BRAND_BLUE : undefined,
                          borderColor: on ? BRAND_BLUE : "rgba(1,80,169,0.22)",
                        }}
                      >
                        {!on && <span className="absolute inset-0 rounded-full bg-white transition-colors lg:rounded-[10px] lg:bg-transparent lg:group-hover:bg-[rgba(1,80,169,0.07)]" />}
                        <span
                          className="relative text-[13px] leading-[1.2] transition-transform duration-300 lg:text-[16px] lg:group-hover:translate-x-[3px]"
                          style={{ fontWeight: on ? 700 : 500, color: on ? "#fff" : NAVY, transform: on ? "none" : undefined }}
                        >
                          {s.short}
                        </span>
                        <ArrowRight
                          size={16}
                          strokeWidth={2.2}
                          className="relative ml-auto hidden flex-shrink-0 lg:block"
                          style={{ color: "#fff", opacity: on ? 1 : 0 }}
                        />
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ───────── Service card ───────── */}
      <div id="service-card" role="tabpanel" className="min-w-0">
        <div
          className="overflow-hidden rounded-[22px] border bg-white"
          style={{ borderColor: "rgba(1,80,169,0.14)", boxShadow: "0 28px 60px rgba(22,31,67,0.13)" }}
        >
          {/* Header: category, title, P.Eng stamp */}
          <div className="relative px-5 pb-5 pt-5 lg:px-8 lg:pb-6 lg:pt-7">
            <div className="mb-3 flex items-center justify-between gap-3 pr-[88px] lg:pr-[132px]">
              <p className="flex min-w-0 items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] lg:text-[12px]" style={{ color: BRAND_BLUE }}>
                <span className="h-[7px] w-[7px] flex-shrink-0 rounded-full" style={{ background: LIGHT_BLUE }} />
                <span className="leading-[1.3]">{category.name}</span>
              </p>
              <div className="hidden flex-shrink-0 items-center gap-2 lg:flex">
                <button
                  onClick={() => step(-1)}
                  aria-label="Previous service"
                  className="flex h-[30px] w-[30px] items-center justify-center rounded-full border transition-colors hover:bg-[#0150a9] hover:text-white"
                  style={{ borderColor: "rgba(1,80,169,0.3)", color: BRAND_BLUE }}
                >
                  <ChevronLeft size={16} strokeWidth={2.2} />
                </button>
                <button
                  onClick={() => step(1)}
                  aria-label="Next service"
                  className="flex h-[30px] w-[30px] items-center justify-center rounded-full border transition-colors hover:bg-[#0150a9] hover:text-white"
                  style={{ borderColor: "rgba(1,80,169,0.3)", color: BRAND_BLUE }}
                >
                  <ChevronRight size={16} strokeWidth={2.2} />
                </button>
              </div>
            </div>

            <div className="min-h-[72px] pr-[88px] lg:min-h-[96px] lg:pr-[132px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.h3
                  key={activeId}
                  className="text-[22px] font-semibold leading-[1.15] tracking-[0.005em] lg:text-[32px]"
                  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: EASE }}
                >
                  {active.title}
                </motion.h3>
              </AnimatePresence>
            </div>

            <motion.div
              key={`seal-${activeId}`}
              className="absolute right-4 top-4 lg:right-7 lg:top-6"
              initial={reducedMotion ? false : { scale: 1.45, opacity: 0, rotate: -22 }}
              animate={{ scale: 1, opacity: 1, rotate: -8 }}
              transition={{ type: "spring", stiffness: 340, damping: 17, delay: 0.12 }}
            >
              <span className="block lg:hidden"><Seal size={74} /></span>
              <span className="hidden lg:block"><Seal size={112} /></span>
            </motion.div>
          </div>

          {/* Video stage */}
          <div
            className="relative p-4 lg:p-7"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(58,155,232,0.34) 0%, rgba(58,155,232,0) 70%), radial-gradient(ellipse 70% 50% at 50% 110%, rgba(1,80,169,0.45) 0%, rgba(1,80,169,0) 70%), linear-gradient(165deg, #0c1c44 0%, #161f43 55%, #0a1330 100%)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
                maskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, #000 30%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, #000 30%, transparent 100%)",
              }}
            />
            <div
              className="relative aspect-square w-full overflow-hidden rounded-[16px] bg-[#071a33]"
              style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(120,190,255,0.28), 0 0 70px rgba(58,155,232,0.22)" }}
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
                        preload="metadata"
                        className="h-full w-full object-cover"
                      />
                    ) : service.image ? (
                      <Image src={service.image} alt={service.title} fill sizes="(max-width: 1024px) 100vw, 640px" className="object-cover" />
                    ) : (
                      <div className="h-full w-full" style={{ background: "linear-gradient(160deg, #0150a9 0%, #161f43 100%)" }} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Description underneath */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeId}
              className="px-5 pb-6 pt-6 lg:px-8 lg:pb-8 lg:pt-8"
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <div className="flex flex-wrap gap-[6px]">
                {active.tags.map((tag) => (
                  <span key={tag} className="rounded-full px-3 py-[5px] text-[11px] font-semibold tracking-[0.05em] lg:text-[12px]" style={{ background: "rgba(1,80,169,0.09)", color: BRAND_BLUE }}>
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-[14px] leading-[1.75] tracking-[0.005em] lg:text-[16.5px]">{active.intro}</p>
              <p className="mt-3 text-[13px] leading-[1.75] tracking-[0.005em] opacity-70 lg:text-[15px]">{active.more}</p>

              <p className="mb-3 mt-7 text-[12px] font-bold uppercase tracking-[0.22em]" style={{ color: BRAND_BLUE }}>What we offer</p>
              <ul className="grid gap-x-8 gap-y-[11px] lg:grid-cols-2">
                {active.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[13px] leading-[1.5] lg:text-[14.5px]">
                    <span className="mt-[2px] flex h-[19px] w-[19px] flex-shrink-0 items-center justify-center rounded-full" style={{ background: BRAND_BLUE }}>
                      <Check size={11} strokeWidth={3.2} color="#fff" />
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <CtaButton
                  href="/contact"
                  className="inline-flex h-[46px] items-center justify-center gap-2 rounded-[10px] px-7 text-[13px] font-medium tracking-[0.08em] text-white lg:text-[14px]"
                  style={{ background: BRAND_BLUE }}
                >
                  Discuss your project <ArrowRight size={16} strokeWidth={2.2} />
                </CtaButton>
                <button
                  onClick={() => step(1)}
                  className="group inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.04em] transition-colors hover:text-[#0150a9]"
                >
                  Next service
                  <ArrowRight size={14} strokeWidth={2.2} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
