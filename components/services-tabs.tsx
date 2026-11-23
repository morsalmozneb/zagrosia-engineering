"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
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
  { code: "A", name: "Design & Foundations", ids: [1, 2, 3, 4, 14] },
  { code: "B", name: "Assessment & Retrofit", ids: [5, 6, 7, 8] },
  { code: "C", name: "Alterations & Equipment", ids: [9, 10, 11, 12] },
  { code: "D", name: "Construction Support", ids: [13, 15, 16, 17] },
]

// service id -> its category and sheet code (A-01, A-02 ...)
const META: Record<number, { cat: number; sheet: string }> = {}
CATEGORIES.forEach((c, ci) =>
  c.ids.forEach((id, i) => {
    META[id] = { cat: ci, sheet: `${c.code}-${String(i + 1).padStart(2, "0")}` }
  })
)

const ORDER = CATEGORIES.flatMap((c) => c.ids)

// Corner crosshair, like the registration marks on a printed drawing sheet
function Cross({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 14 14" className={`pointer-events-none absolute h-[14px] w-[14px] ${className}`} aria-hidden="true">
      <path d="M7 0V14M0 7H14" stroke={BRAND_BLUE} strokeWidth="1" opacity="0.5" fill="none" />
    </svg>
  )
}

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
  const meta = META[activeId]
  const category = CATEGORIES[meta.cat]
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
    <div className="grid gap-5 lg:grid-cols-[264px_minmax(0,1fr)] lg:gap-10" style={{ color: NAVY }}>
      {/* ───────── Drawing index ───────── */}
      <div className="lg:sticky lg:top-[104px] lg:self-start">
        <div className="mb-4 hidden items-baseline justify-between lg:flex">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.26em]" style={{ color: BRAND_BLUE }}>
            Drawing index
          </p>
          <p className="font-mono text-[11px] tracking-[0.1em] opacity-50">17 sheets</p>
        </div>

        {/* Mobile: choose a discipline first */}
        <div className="mb-3 grid grid-cols-2 gap-2 lg:hidden">
          {CATEGORIES.map((c, ci) => {
            const on = meta.cat === ci
            return (
              <button
                key={c.code}
                onClick={() => choose(c.ids[0])}
                className="flex items-center gap-2 rounded-[8px] border px-3 py-[9px] text-left transition-colors"
                style={{
                  background: on ? BRAND_BLUE : "#fff",
                  borderColor: on ? BRAND_BLUE : "rgba(1,80,169,0.22)",
                  color: on ? "#fff" : NAVY,
                }}
              >
                <span className="font-mono text-[11px] font-bold opacity-80">{c.code}</span>
                <span className="text-[12px] font-semibold leading-[1.15]">{c.name}</span>
              </button>
            )
          })}
        </div>

        <div role="tablist" aria-orientation="vertical" className="lg:space-y-7">
          {CATEGORIES.map((c, ci) => {
            const showOnMobile = meta.cat === ci
            return (
              <div key={c.code} className={`${showOnMobile ? "block" : "hidden"} lg:block`}>
                <div className="mb-2 hidden items-center gap-3 lg:flex">
                  <span
                    className="flex h-[22px] w-[22px] items-center justify-center rounded-[4px] border font-mono text-[11px] font-bold"
                    style={{ borderColor: BRAND_BLUE, color: BRAND_BLUE }}
                  >
                    {c.code}
                  </span>
                  <span className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: BRAND_BLUE }}>
                    {c.name}
                  </span>
                </div>
                <div className="mb-2 hidden h-px w-full lg:block" style={{ background: "linear-gradient(90deg, rgba(1,80,169,0.55), rgba(1,80,169,0.08))" }} />

                <div className="flex flex-wrap gap-2 lg:block lg:space-y-[2px]">
                  {c.ids.map((id) => {
                    const s = services.find((x) => x.id === id)!
                    const on = id === activeId
                    return (
                      <button
                        key={id}
                        role="tab"
                        aria-selected={on}
                        aria-controls="service-sheet"
                        onClick={() => choose(id)}
                        className="group relative flex items-center gap-3 rounded-full border bg-white px-3 py-[7px] text-left transition-colors lg:w-full lg:rounded-[6px] lg:border-0 lg:bg-transparent lg:px-3 lg:py-[8px]"
                        style={{ borderColor: on ? BRAND_BLUE : "rgba(1,80,169,0.22)" }}
                      >
                        {on && (
                          <motion.span
                            layoutId={reducedMotion ? undefined : "index-active"}
                            transition={{ type: "spring", stiffness: 420, damping: 36 }}
                            className="absolute inset-0 rounded-full lg:rounded-[6px]"
                            style={{ background: "rgba(1,80,169,0.10)" }}
                          />
                        )}
                        {on && <span className="absolute bottom-[6px] left-0 top-[6px] hidden w-[3px] rounded-full lg:block" style={{ background: BRAND_BLUE }} />}
                        <span className="relative hidden w-[34px] flex-shrink-0 font-mono text-[11px] tracking-[0.04em] lg:block" style={{ color: on ? BRAND_BLUE : "rgba(22,31,67,0.45)" }}>
                          {META[id].sheet}
                        </span>
                        <span
                          className="relative text-[13px] leading-[1.2] transition-transform duration-300 group-hover:translate-x-[2px] lg:text-[15px]"
                          style={{ fontWeight: on ? 700 : 500, color: on ? BRAND_BLUE : NAVY }}
                        >
                          {s.short}
                        </span>
                        <ArrowRight
                          size={14}
                          strokeWidth={2.2}
                          className="relative ml-auto hidden flex-shrink-0 transition-opacity lg:block"
                          style={{ color: BRAND_BLUE, opacity: on ? 1 : 0 }}
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

      {/* ───────── The sheet ───────── */}
      <div id="service-sheet" role="tabpanel" className="relative min-w-0">
        <Cross className="-left-[7px] -top-[7px]" />
        <Cross className="-right-[7px] -top-[7px]" />
        <Cross className="-bottom-[7px] -left-[7px]" />
        <Cross className="-bottom-[7px] -right-[7px]" />

        <div
          className="relative rounded-[4px] border p-4 lg:p-6"
          style={{
            background: "#FDFEFF",
            backgroundImage:
              "linear-gradient(rgba(1,80,169,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(1,80,169,0.045) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            borderColor: "rgba(1,80,169,0.38)",
            boxShadow: "0 22px 50px rgba(22,31,67,0.10)",
          }}
        >
          <div className="pointer-events-none absolute inset-[5px] rounded-[2px] border" style={{ borderColor: "rgba(1,80,169,0.14)" }} />

          {/* Sheet header */}
          <div className="relative mb-4 flex items-center justify-between gap-3">
            <p className="min-w-0 truncate font-mono text-[10px] font-semibold uppercase tracking-[0.2em] lg:text-[11px]" style={{ color: BRAND_BLUE }}>
              Sheet {meta.sheet}
              <span className="mx-2 opacity-40">/</span>
              <span className="opacity-70">{category.name}</span>
            </p>
            <div className="flex flex-shrink-0 items-center gap-2">
              <span className="font-mono text-[11px] tracking-[0.1em] opacity-50">
                {String(position + 1).padStart(2, "0")}/17
              </span>
              <button
                onClick={() => step(-1)}
                aria-label="Previous service"
                className="flex h-[28px] w-[28px] items-center justify-center rounded-full border transition-colors hover:bg-[#0150a9] hover:text-white"
                style={{ borderColor: "rgba(1,80,169,0.35)", color: BRAND_BLUE }}
              >
                <ChevronLeft size={16} strokeWidth={2.2} />
              </button>
              <button
                onClick={() => step(1)}
                aria-label="Next service"
                className="flex h-[28px] w-[28px] items-center justify-center rounded-full border transition-colors hover:bg-[#0150a9] hover:text-white"
                style={{ borderColor: "rgba(1,80,169,0.35)", color: BRAND_BLUE }}
              >
                <ChevronRight size={16} strokeWidth={2.2} />
              </button>
            </div>
          </div>

          {/* Title + stamp */}
          <div className="relative mb-4 min-h-[64px] pr-[84px] lg:mb-5 lg:min-h-[92px] lg:pr-[120px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeId}
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: EASE }}
              >
                <h3 className="text-[21px] font-semibold leading-[1.15] tracking-[0.005em] lg:text-[30px]">{active.title}</h3>
                <div className="mt-3 flex items-center gap-[6px]">
                  <span className="h-[3px] w-12 rounded-full" style={{ background: BRAND_BLUE }} />
                  <span className="h-[3px] w-[6px] rounded-full" style={{ background: LIGHT_BLUE }} />
                </div>
              </motion.div>
            </AnimatePresence>

            <motion.div
              key={`seal-${activeId}`}
              className="absolute -top-1 right-0 lg:-top-2"
              initial={reducedMotion ? false : { scale: 1.45, opacity: 0, rotate: -22 }}
              animate={{ scale: 1, opacity: 1, rotate: -8 }}
              transition={{ type: "spring", stiffness: 340, damping: 17, delay: 0.12 }}
              style={{ mixBlendMode: "multiply" }}
            >
              <span className="block lg:hidden"><Seal size={72} /></span>
              <span className="hidden lg:block"><Seal size={104} /></span>
            </motion.div>
          </div>

          {/* Video, framed like a figure on the sheet */}
          <div className="relative grid grid-cols-[6px_minmax(0,1fr)] grid-rows-[6px_auto] gap-[6px]">
            <div className="col-start-2 row-start-1" style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(1,80,169,0.5) 0 1px, transparent 1px 12px)" }} />
            <div className="col-start-1 row-start-2" style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(1,80,169,0.5) 0 1px, transparent 1px 12px)" }} />

            <div
              className="relative col-start-2 row-start-2 aspect-square w-full overflow-hidden rounded-[3px] bg-[#071a33]"
              style={{ boxShadow: "0 14px 34px rgba(7,26,51,0.35), inset 0 0 0 1px rgba(255,255,255,0.06)" }}
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

              {/* Viewfinder corners */}
              {["left-3 top-3 border-l-2 border-t-2", "right-3 top-3 border-r-2 border-t-2", "bottom-3 left-3 border-b-2 border-l-2", "bottom-3 right-3 border-b-2 border-r-2"].map((c) => (
                <span key={c} className={`pointer-events-none absolute z-10 h-[18px] w-[18px] ${c}`} style={{ borderColor: "rgba(120,190,255,0.75)" }} />
              ))}
            </div>
          </div>

          {/* Title block */}
          <div className="relative mt-4 grid grid-cols-2 border lg:grid-cols-[110px_1fr_1.5fr]" style={{ borderColor: "rgba(1,80,169,0.3)", background: "rgba(255,255,255,0.7)" }}>
            {[
              { label: "Sheet", value: meta.sheet, mono: true },
              { label: "Discipline", value: category.name },
              { label: "Basis", value: active.tags.join("  ·  "), wide: true },
            ].map((cell, i) => (
              <div
                key={cell.label}
                className={`px-3 py-[9px] ${cell.wide ? "col-span-2 border-t lg:col-span-1 lg:border-t-0" : ""} ${i > 0 && !cell.wide ? "border-l" : ""} ${cell.wide ? "lg:border-l" : ""}`}
                style={{ borderColor: "rgba(1,80,169,0.3)" }}
              >
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em]" style={{ color: BRAND_BLUE }}>{cell.label}</p>
                <p className={`mt-[3px] text-[12px] font-semibold leading-[1.35] lg:text-[13px] ${cell.mono ? "font-mono tracking-[0.06em]" : ""}`}>{cell.value}</p>
              </div>
            ))}
          </div>

          {/* Description underneath */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeId}
              className="relative mt-5 lg:mt-6"
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <p className="text-[14px] leading-[1.75] tracking-[0.005em] lg:text-[16.5px]">{active.intro}</p>
              <p className="mt-3 text-[13px] leading-[1.75] tracking-[0.005em] opacity-75 lg:text-[15px]">{active.more}</p>

              <div className="mt-6 flex items-center gap-3">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.26em] lg:text-[11px]" style={{ color: BRAND_BLUE }}>Scope of work</p>
                <span className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(1,80,169,0.45), rgba(1,80,169,0.05))" }} />
              </div>
              <ol className="mt-3 grid gap-x-8 lg:grid-cols-2">
                {active.bullets.map((b, i) => (
                  <li key={b} className="flex items-start gap-3 border-b py-[10px] text-[13px] leading-[1.5] lg:text-[14.5px]" style={{ borderColor: "rgba(1,80,169,0.12)" }}>
                    <span className="mt-[2px] font-mono text-[11px] font-semibold tracking-[0.04em]" style={{ color: BRAND_BLUE }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <CtaButton
                  href="/contact"
                  className="inline-flex h-[44px] items-center justify-center gap-2 rounded-[10px] px-6 text-[13px] font-medium tracking-[0.08em] text-white transition-colors hover:bg-[#161f43] lg:h-[46px] lg:px-7 lg:text-[14px]"
                  style={{ background: BRAND_BLUE }}
                >
                  Discuss your project <ArrowRight size={16} strokeWidth={2.2} />
                </CtaButton>
                <button
                  onClick={() => step(1)}
                  className="group inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors hover:text-[#0150a9]"
                >
                  Next sheet
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
