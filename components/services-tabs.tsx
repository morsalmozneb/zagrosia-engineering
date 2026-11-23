"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ArrowRight, Check, Pause, Play } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { CtaButton } from "@/components/cta-button"
import { allServices } from "./services-data"

const BRAND_BLUE = "#0150a9"
const NAVY = "#161f43"
const EASE = [0.0, 0.0, 0.2, 1] as const

const services = allServices

// The 17 services in four categories
const CATEGORIES = [
  { name: "Design & Foundations", ids: [1, 2, 3, 4, 14] },
  { name: "Assessment & Retrofit", ids: [5, 6, 7, 8] },
  { name: "Alterations & Equipment", ids: [9, 10, 11, 12] },
  { name: "Construction Support", ids: [13, 15, 16, 17] },
]

const CAT_OF: Record<number, number> = {}
CATEGORIES.forEach((c, ci) => c.ids.forEach((id) => { CAT_OF[id] = ci }))

// The engineer's seal
function Seal({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} role="img" aria-label="Professional Engineer, signed and sealed">
      <defs>
        <path id="svc-seal-top" d="M 23.6,81 A 42,42 0 1 1 96.4,81" />
        <path id="svc-seal-bottom" d="M 18.4,84 A 48,48 0 0 0 101.6,84" />
      </defs>
      <circle cx="60" cy="60" r="58" fill="#fff" fillOpacity="0.85" />
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
  const [playing, setPlaying] = useState<boolean>(true)

  const active = services.find((x) => x.id === activeId) ?? services[0]
  const catIndex = CAT_OF[activeId]
  const category = CATEGORIES[catIndex]

  // Which service's video sits underneath while the next one fades in
  const lastRef = useRef(activeId)
  const underRef = useRef(activeId)
  if (lastRef.current !== activeId) {
    underRef.current = lastRef.current
    lastRef.current = activeId
  }
  const underId = underRef.current
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({})
  const catRowRef = useRef<HTMLDivElement>(null)
  const svcRowRef = useRef<HTMLDivElement>(null)

  // On small screens the tab rows scroll sideways: keep the chosen tab in view
  useEffect(() => {
    ;[catRowRef.current, svcRowRef.current].forEach((row) => {
      const el = row?.querySelector<HTMLElement>('[aria-selected="true"]')
      if (!row || !el) return
      row.scrollTo({ left: el.offsetLeft - (row.clientWidth - el.clientWidth) / 2, behavior: "smooth" })
    })
  }, [activeId])

  // People who prefer reduced motion get the videos paused until they press play
  useEffect(() => {
    if (reducedMotion) setPlaying(false)
  }, [reducedMotion])

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
      if (playing) v.play().catch(() => {})
      else v.pause()
    }
    return () => clearTimeout(t)
  }, [activeId, playing])

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

  const cta = (
    <CtaButton
      href="/contact"
      className="inline-flex h-[52px] items-center justify-center gap-3 rounded-[12px] px-8 text-[16px] font-semibold tracking-[0.02em] text-white lg:h-[56px] lg:text-[18px]"
      style={{ background: BRAND_BLUE }}
    >
      Discuss your project <ArrowRight size={20} strokeWidth={2.4} />
    </CtaButton>
  )

  return (
    <div className="@container" style={{ color: NAVY }}>
      {/* Categories + P.Eng seal */}
      <div className="flex items-end justify-between gap-4 border-b" style={{ borderColor: "rgba(1,80,169,0.22)" }}>
        <div ref={catRowRef} role="tablist" aria-label="Service categories" className="relative -mb-px flex min-w-0 flex-wrap gap-x-5 @[640px]:flex-nowrap @[640px]:gap-x-[clamp(8px,2.2cqw,40px)]">
          {CATEGORIES.map((c, ci) => {
            const on = ci === catIndex
            return (
              <button
                key={c.name}
                role="tab"
                aria-selected={on}
                onClick={() => choose(c.ids[0])}
                className="relative whitespace-nowrap px-1 pb-3 pt-3 text-[15px] tracking-[0.01em] transition-colors @[640px]:px-0 @[640px]:pb-4 @[640px]:text-[clamp(11px,1.7cqw,19px)]"
                style={{ color: on ? BRAND_BLUE : NAVY, fontWeight: on ? 600 : 400 }}
              >
                {c.name}
                {on && (
                  <motion.span
                    layoutId={reducedMotion ? undefined : "category-underline"}
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    className="absolute inset-x-0 bottom-0 h-[3px] rounded-full"
                    style={{ background: BRAND_BLUE }}
                  />
                )}
              </button>
            )
          })}
        </div>

        <motion.div
          key={`seal-${activeId}`}
          className="mb-3 flex-shrink-0"
          initial={reducedMotion ? false : { scale: 1.45, opacity: 0, rotate: -22 }}
          animate={{ scale: 1, opacity: 1, rotate: -8 }}
          transition={{ type: "spring", stiffness: 340, damping: 17, delay: 0.1 }}
        >
          <span className="block lg:hidden"><Seal size={64} /></span>
          <span className="hidden lg:block"><Seal size={80} /></span>
        </motion.div>
      </div>

      {/* Services in this category */}
      <div ref={svcRowRef} role="tablist" aria-label={category.name} className="relative mt-5 flex flex-wrap gap-2 @[640px]:mt-6 @[640px]:flex-nowrap @[640px]:gap-[clamp(6px,1cqw,16px)]">
        {category.ids.map((id) => {
          const s = services.find((x) => x.id === id)!
          const on = id === activeId
          return (
            <button
              key={id}
              role="tab"
              aria-selected={on}
              aria-controls="service-panel"
              onClick={() => choose(id)}
              className="whitespace-nowrap rounded-[14px] border-2 px-4 text-[14px] transition-all duration-300 @[640px]:h-[clamp(40px,5.4cqw,50px)] @[640px]:min-w-0 @[640px]:flex-1 @[640px]:px-[0.6cqw] @[640px]:text-[clamp(11px,1.55cqw,17px)]"
              style={{
                height: 44,
                background: on ? "rgba(1,80,169,0.10)" : "rgba(1,80,169,0.06)",
                borderColor: on ? BRAND_BLUE : "transparent",
                color: on ? NAVY : "rgba(22,31,67,0.82)",
                fontWeight: on ? 700 : 400,
              }}
            >
              {s.short}
            </button>
          )
        })}
      </div>

      {/* Panel */}
      <div id="service-panel" role="tabpanel" className="mt-7 grid gap-6 lg:mt-9 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-12">
        {/* Video + CTA */}
        <div className="min-w-0">
          <div
            className="group relative aspect-square w-full overflow-hidden rounded-[20px] bg-[#0a1633]"
            style={{ boxShadow: "0 22px 50px rgba(22,31,67,0.22), 0 0 0 1px rgba(1,80,169,0.14)" }}
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
                    <Image src={service.image} alt={service.title} fill sizes="(max-width: 1024px) 100vw, 480px" className="object-cover" />
                  ) : (
                    <div className="h-full w-full" style={{ background: "linear-gradient(160deg, #0150a9 0%, #161f43 100%)" }} />
                  )}
                </div>
              )
            })}

            {/* Play / pause */}
            <button
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause video" : "Play video"}
              className={`absolute left-1/2 top-1/2 z-10 flex h-[68px] w-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-[0_8px_28px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-105 ${
                playing ? "opacity-0 group-hover:opacity-100 focus-visible:opacity-100" : "opacity-100"
              }`}
            >
              {playing ? (
                <Pause size={26} fill={BRAND_BLUE} color={BRAND_BLUE} />
              ) : (
                <Play size={28} fill={BRAND_BLUE} color={BRAND_BLUE} className="ml-[3px]" />
              )}
            </button>
          </div>

          <div className="mt-6 hidden lg:block">{cta}</div>
        </div>

        {/* Text */}
        <div className="min-w-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeId}
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <h3 className="text-[26px] font-bold leading-[1.15] tracking-[0.005em] lg:text-[36px]">{active.title}</h3>
              <p className="mt-4 text-[15px] leading-[1.7] lg:text-[17px]">{active.intro}</p>
              <p className="mt-4 text-[15px] leading-[1.7] lg:text-[17px]">{active.more}</p>

              <div className="mt-7 border-t pt-5 lg:mt-8 lg:pt-6" style={{ borderColor: "rgba(1,80,169,0.22)" }}>
                <p className="mb-4 text-[20px] font-semibold lg:text-[24px]" style={{ color: BRAND_BLUE }}>What we offer</p>
                <ul className="grid gap-x-8 gap-y-[14px] lg:grid-cols-2">
                  {active.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[15px] leading-[1.45] lg:text-[17px]">
                      <span className="mt-[1px] flex h-[24px] w-[24px] flex-shrink-0 items-center justify-center rounded-full" style={{ background: BRAND_BLUE }}>
                        <Check size={14} strokeWidth={3.2} color="#fff" />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-7 lg:hidden">{cta}</div>
        </div>
      </div>
    </div>
  )
}
