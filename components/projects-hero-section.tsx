"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { animate, motion, useInView, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Award, Building2, MapPin } from "lucide-react"
import { Reveal } from "./scroll-reveal"
import { CtaButton } from "@/components/cta-button"
import { projects as realProjects } from "@/lib/projects-data"

const EASE = [0.0, 0.0, 0.2, 1] as const

/* Same finish as the photo cards on the About and case-study pages */
const PHOTO_SHADOW =
  "0 2px 4px rgba(11,18,38,0.18), 0 14px 30px -6px rgba(11,18,38,0.5), 0 36px 70px -14px rgba(0,82,165,0.45)"

/* ── Project data (edit projects in /lib/projects-data.ts) ── */
const projects = realProjects.map((p) => ({
  id: p.id,
  image: p.image,
  location: p.location,
  title: p.title,
  description: p.summary,
  slug: p.slug,
  badge: p.badge,
  attribution: p.attribution,
}))

/* ── Desktop mosaic ──
   Every row has its own rhythm so the grid never reads as "three per row":
   A feature pair, B trio, C offset pair, E even pair. Order: A, B, C, B, E, B, C, B … */
type Size = "lg" | "md"
type Slot = { span: string; h: string; size: Size }
const ROWS: Record<string, Slot[]> = {
  A: [
    { span: "col-span-7", h: "h-[380px]", size: "lg" },
    { span: "col-span-5", h: "h-[380px]", size: "lg" },
  ],
  B: [
    { span: "col-span-4", h: "h-[300px]", size: "md" },
    { span: "col-span-4", h: "h-[300px]", size: "md" },
    { span: "col-span-4", h: "h-[300px]", size: "md" },
  ],
  C: [
    { span: "col-span-5", h: "h-[330px]", size: "md" },
    { span: "col-span-7", h: "h-[330px]", size: "lg" },
  ],
  E: [
    { span: "col-span-6", h: "h-[340px]", size: "lg" },
    { span: "col-span-6", h: "h-[340px]", size: "lg" },
  ],
}
const ORDER = ["B", "C", "B", "E"]

type Item = (typeof projects)[number]
type Placed = Item & Slot & { index: number }

function buildRows(): Placed[][] {
  const rows: Placed[][] = []
  let i = 0
  let r = 0
  while (i < projects.length) {
    const key = r === 0 ? "A" : ORDER[(r - 1) % ORDER.length]
    let slots = ROWS[key]
    const chunk = projects.slice(i, i + slots.length)
    if (chunk.length < slots.length) {
      // last row with fewer cards: share the width evenly
      const n = chunk.length
      slots = Array.from({ length: n }, () => ({
        span: n === 1 ? "col-span-12" : n === 2 ? "col-span-6" : "col-span-4",
        h: "h-[330px]",
        size: "lg" as Size,
      }))
    }
    rows.push(chunk.map((p, k) => ({ ...p, ...slots[k], index: i + k })))
    i += chunk.length
    r++
  }
  return rows
}

const desktopRows = buildRows()

function LocationPin() {
  return (
    <svg width="11" height="13" viewBox="0 0 11 13" fill="none" aria-hidden="true">
      <path
        d="M5.5 12C5.5 12 9.5 8.3 9.5 4.9C9.5 2.75 7.71 1 5.5 1C3.29 1 1.5 2.75 1.5 4.9C1.5 8.3 5.5 12 5.5 12Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="5.5" cy="4.9" r="1.35" fill="currentColor" />
    </svg>
  )
}

function BadgePill({ badge, attribution, className = "" }: { badge: string; attribution?: string; className?: string }) {
  const style =
    attribution === "zagrosia"
      ? "bg-[#0052A5] text-white"
      : "border border-white/60 bg-white/15 text-white backdrop-blur-[6px]"
  return (
    <span className={`inline-flex items-center rounded-[8px] px-[9px] py-[3px] text-[12px] font-semibold tracking-[0.1em] ${style} ${className}`}>
      {badge}
    </span>
  )
}

/* ── Stat cards ── */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduced = useReducedMotion()
  useEffect(() => {
    if (!inView || !ref.current) return
    if (reduced) {
      ref.current.textContent = `${to}${suffix}`
      return
    }
    const c = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`
      },
    })
    return () => c.stop()
  }, [inView, reduced, to, suffix])
  return <span ref={ref}>0{suffix}</span>
}

function BarsVisual() {
  const hs = [28, 44, 36, 60, 78, 100]
  return (
    <div className="flex h-[58px] items-end gap-[5px]" aria-hidden>
      {hs.map((h, i) => (
        <motion.span
          key={i}
          className="w-[7px] rounded-t-[3px] bg-gradient-to-t from-[#0052A5]/35 to-[#0052A5]"
          style={{ height: `${h}%`, transformOrigin: "bottom" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.7, delay: 0.3 + i * 0.09, ease: EASE }}
        />
      ))}
    </div>
  )
}

function RingVisual() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden>
      <circle cx="32" cy="32" r="24" stroke="#0052A5" strokeOpacity="0.14" strokeWidth="6" />
      <motion.circle
        cx="32"
        cy="32"
        r="24"
        stroke="#0052A5"
        strokeWidth="6"
        strokeLinecap="round"
        transform="rotate(-90 32 32)"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 0.82 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.5, delay: 0.3, ease: EASE }}
      />
      <circle cx="32" cy="32" r="4" fill="#0052A5" />
    </svg>
  )
}

function DotsVisual({ reduced }: { reduced: boolean | null }) {
  return (
    <div className="relative flex h-[58px] w-[78px] items-center justify-between" aria-hidden>
      <span className="absolute left-[8px] right-[8px] top-1/2 h-px bg-[#0052A5]/25" />
      {[0, 1, 2].map((i) => (
        <span key={i} className="relative flex h-[16px] w-[16px] items-center justify-center">
          {!reduced && (
            <motion.span
              className="absolute inset-0 rounded-full bg-[#0052A5]/40"
              animate={{ scale: [1, 2.2], opacity: [0.55, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
            />
          )}
          <span className="relative h-[10px] w-[10px] rounded-full bg-[#0052A5] ring-[3px] ring-white" />
        </span>
      ))}
    </div>
  )
}

function StatCard({
  icon,
  to,
  suffix,
  label,
  note,
  visual,
  delay,
}: {
  icon: React.ReactNode
  to: number
  suffix: string
  label: string
  note: string
  visual: React.ReactNode
  delay: number
}) {
  return (
    <Reveal variant="fadeUp" delay={delay} duration={0.7}>
      <div className="group relative h-full overflow-hidden rounded-[18px] bg-white p-[clamp(16px,1.6vw,24px)] ring-1 ring-[#0B1226]/[0.06] shadow-[0_2px_4px_rgba(11,18,38,0.06),0_14px_30px_-10px_rgba(11,18,38,0.22),0_30px_60px_-24px_rgba(0,82,165,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(11,18,38,0.08),0_20px_40px_-10px_rgba(11,18,38,0.28),0_40px_70px_-22px_rgba(0,82,165,0.5)]">
        <motion.span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[4px] origin-left bg-gradient-to-r from-[#0052A5] to-[#5b9bf0]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.9, delay: delay + 0.2, ease: "easeInOut" }}
        />
        <div className="flex items-start justify-between gap-4">
          <span className="flex h-[44px] w-[44px] items-center justify-center rounded-[10px] bg-[#0052A5]/10 text-[#0052A5] transition-colors duration-300 group-hover:bg-[#0052A5] group-hover:text-white">
            {icon}
          </span>
          <span className="flex h-[64px] items-center">{visual}</span>
        </div>
        <p className="zag-heading mt-[clamp(10px,1.4vh,18px)] text-[clamp(34px,3.4vw,48px)] font-bold leading-none tracking-[0.01em] text-[#0B1226]">
          <CountUp to={to} suffix={suffix} />
        </p>
        <p className="mt-[10px] text-[12px] font-bold uppercase tracking-[0.24em] text-[#0052A5]">{label}</p>
        <p className="mt-[6px] text-[14px] leading-[1.5] tracking-[0.02em] text-[#2D2D2D]/70">{note}</p>
      </div>
    </Reveal>
  )
}

/* ── Mosaic card ── */
function ProjectTile({ image, location, title, description, span, h, size, index, slug, badge, attribution }: Placed) {
  const href = slug ? `/projects/${slug}` : "/projects"
  const titleSize =
    size === "lg" ? "text-[20px] leading-[1.15] tracking-[0.06em]" : "text-[16px] leading-[1.2] tracking-[0.06em]"
  return (
    <article className={`${span} group`}>
      <Link href={href} className="block cursor-pointer">
        <div
          className={`relative ${h} overflow-hidden rounded-[22px] bg-[#0B1226] ring-1 ring-white/20 transition-transform duration-500 group-hover:-translate-y-[6px]`}
          style={{ boxShadow: PHOTO_SHADOW }}
        >
          <Image
            src={image}
            alt={title.replace(/\n/g, " ")}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.06]"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,18,38,0.45) 0%, rgba(11,18,38,0) 28%, rgba(11,18,38,0.55) 58%, rgba(11,18,38,0.96) 100%)",
            }}
          />
          <div aria-hidden className="absolute inset-0 bg-[#0B1226]/0 transition-colors duration-300 group-hover:bg-[#0B1226]/45" />

          {badge ? <BadgePill badge={badge} attribution={attribution} className="absolute left-[16px] top-[16px] z-10" /> : null}

          <span
            aria-hidden
            className="zag-heading absolute right-[18px] top-[10px] z-10 select-none text-[34px] font-bold leading-none tracking-[0.02em] text-transparent transition-all duration-300 group-hover:text-white/90"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.75)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="absolute inset-x-0 bottom-0 z-10 px-[20px] pb-[18px] text-white">
            <div className="mb-[10px] inline-flex items-center gap-[5px] rounded-[8px] bg-[#0052A5] px-[8px] py-[3px] text-[12px] tracking-[0.08em] text-white shadow-[0_6px_16px_rgba(0,82,165,0.45)]">
              <LocationPin />
              <span>{location}</span>
            </div>
            <h3 className={`zag-heading line-clamp-2 font-semibold uppercase text-white group-hover:line-clamp-none ${titleSize}`}>{title}</h3>
            {description ? (
              <p className="line-clamp-3 max-h-0 overflow-hidden text-[14px] leading-[1.5] tracking-[0.02em] text-white/85 opacity-0 transition-all duration-300 group-hover:mt-[10px] group-hover:max-h-[90px] group-hover:opacity-100">
                {description}
              </p>
            ) : null}
            <div className="mt-[12px] flex items-center gap-[10px]">
              <span className="h-px flex-1 origin-left bg-white/35" />
              <span className="inline-flex items-center gap-[6px] text-[12px] font-bold uppercase tracking-[0.2em] text-white/80 transition-colors duration-300 group-hover:text-white">
                View project
                <span className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-white/15 transition-all duration-300 group-hover:bg-[#0052A5] group-hover:shadow-[0_6px_16px_rgba(0,82,165,0.6)]">
                  <ArrowUpRight size={14} strokeWidth={2.2} />
                </span>
              </span>
            </div>
          </div>

          <span
            aria-hidden
            className="absolute bottom-0 left-0 z-20 h-[4px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#0052A5] to-[#5b9bf0] transition-transform duration-500 group-hover:scale-x-100"
          />
        </div>
      </Link>
    </article>
  )
}

export function ProjectsHeroSection() {
  const reducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="bg-[#FCFCFC] text-[#2D2D2D]">
      <div className="lg:hidden px-5 pb-14 pt-24">        {/* Label */}
        <Reveal variant="fadeUp" delay={0.05} duration={0.6}>
          <p className="mb-4 text-[12px] font-medium tracking-[0.1em] text-[#2D2D2D]">
            OUR PORTFOLIO
          </p>
        </Reveal>

        {/* Heading + body + stats with vertical line */}
        <div className="relative pl-[12px]">
          <motion.div
            className="absolute left-0 top-[8px] w-px"
            initial={reducedMotion ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.85, ease: "easeInOut" }}
            style={{
              height: "calc(100% - 8px)",
              transformOrigin: "top",
              background: "linear-gradient(180deg, rgba(45,45,45,1) 0%, rgba(45,45,45,0.82) 38%, rgba(45,45,45,0.42) 72%, rgba(45,45,45,0) 100%)",
            }}
          />

          <Reveal variant="fadeLeft" delay={0.1} duration={0.7}>
            <h1
              className="mb-5 text-[24px] font-black uppercase leading-[1.25] tracking-[0.12em]"
              style={{ fontFamily: "'Momo Trust Sans', 'Inter', sans-serif" }}
            >
              <span className="text-[#2D2D2D]">ENGINEERING</span>
              <br />
              <span className="text-[#0052A5]">BUILT TO LAST</span>
            </h1>
          </Reveal>

          {/* Body */}
          <Reveal delay={0.2} duration={0.65}>
            <p className="mb-7 text-[12px] leading-[1.75] tracking-[0.08em] text-[#2D2D2D]">
              Zagrosia assignments and the principal’s earlier career: scaffold and building-envelope field reviews, parkade and rooftop assessments, retaining walls, townhouse and single-family structures, and warehouse reviews. Open any project for its scope, engineering focus and site photos.
            </p>
          </Reveal>

          {/* Stats */}
          <Reveal delay={0.28} duration={0.65}>
            <div className="mb-8 flex items-start">
              <div className="flex-1">
                <p className="text-[26px] font-black leading-none tracking-[0.02em] text-[#2D2D2D]">200+</p>
                <p className="mt-1 text-[12px] tracking-[0.1em] text-[#2D2D2D]">Projects Delivered</p>
              </div>
              <div className="flex-1">
                <p className="text-[26px] font-black leading-none tracking-[0.02em] text-[#2D2D2D]">35+</p>
                <p className="mt-1 text-[12px] tracking-[0.1em] text-[#2D2D2D]">Years of Experience</p>
              </div>
              <div className="flex-1">
                <p className="text-[26px] font-black leading-none tracking-[0.02em] text-[#2D2D2D]">3</p>
                <p className="mt-1 text-[12px] tracking-[0.1em] text-[#2D2D2D]">Provinces Served</p>
              </div>
            </div>
          </Reveal>
        </div>{/* end vertical line wrapper */}

        {/*
          4-card converging stack with prev + active + next×2:

          prev  (pos=-1): top=0,   z=20 → shows top 70px (image) before active covers it
          active (pos=0): top=70,  z=30 → full 380px card
          next  (pos=+1): top=140, z=20 → bottom 70px peeks below active (active bottom=450, next bottom=520)
          next+1(pos=+2): top=180, z=10 → bottom 40px peeks below next (next bottom=520, next+1 bottom=560)

          Container height: 560px
        */}
        <div className="relative mt-[16px]" style={{ height: "600px" }}>
          {projects.map((project, index) => {
            const pos = index - activeIndex
            if (pos < -1 || pos > 1) return null
            const isActive = pos === 0

            //          pos: -1     0      +1     +2
            const tops     = [0,    80,    200,   180]
            const widths   = ["92%","100%","88%", "84%"]
            const lefts    = ["4%", "0%",  "6%",  "8%"]
            const zIndexes = [20,   30,    20,    10]
            const opacities= [0.60, 1,     0.75,  0.45]

            // shift index by 1 to account for pos=-1
            const i = pos + 1

            return (
              <div
                key={project.id}
                onClick={() => !isActive && setActiveIndex(index)}
                className="absolute overflow-hidden rounded-[14px] transition-all duration-500"
                style={{
                  top:      `${tops[i]}px`,
                  left:     lefts[i],
                  width:    widths[i],
                  height:   "380px",
                  zIndex:   zIndexes[i],
                  opacity:  opacities[i],
                  boxShadow: isActive
                    ? "0px 20px 52px rgba(0,0,0,0.44), 0px 4px 14px rgba(0,0,0,0.18)"
                    : "none",
                  cursor: isActive ? "default" : "pointer",
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-center"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(20,20,20,0) 0%, rgba(20,20,20,0) 22%, rgba(20,20,20,0.70) 60%, rgba(20,20,20,1) 100%)",
                  }}
                />
                {project.badge ? <BadgePill badge={project.badge} attribution={project.attribution} className="absolute left-4 top-4 z-10" /> : null}
                <div className="absolute bottom-0 left-0 right-0 px-4 pb-5">
                  <div className="mb-[9px] inline-flex items-center gap-[4px] rounded-[8px] bg-[#0052A5] px-[7px] py-[2px] text-[12px] tracking-[0.10em] text-white backdrop-blur-[6px]">
                    <LocationPin />
                    <span>{project.location}</span>
                  </div>
                  <h3
                    className="uppercase leading-[1.15] tracking-[0.08em] text-white"
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      fontFamily: "'Momo Trust Sans', 'Inter', sans-serif",
                      marginBottom: isActive ? "10px" : "0",
                    }}
                  >
                    {project.title}
                  </h3>
                  {isActive && (
                    <>
                      <p className="mb-4 leading-[1.65] tracking-[0.06em] text-white/85" style={{ fontSize: "12px" }}>
                        {project.description}
                      </p>
                      <CtaButton
                        href={project.slug ? `/projects/${project.slug}` : "/contact"}
                        className="inline-flex items-center justify-center zag-cta rounded-[10px] border border-white bg-transparent tracking-[0.06em] text-white transition-colors hover:bg-[#0052A5] hover:border-[#0052A5]"
                        style={{ fontSize: "12px", width: "150px", height: "36px" }}
                      >
                        Learn More
                      </CtaButton>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Project counter — number strip */}
        <div className="mt-6">
          {/* Scrolling number strip */}
          <div className="flex items-end justify-center overflow-hidden">
            {[-2, -1, 0, 1, 2].map((offset) => {
              const idx = activeIndex + offset
              const abs = Math.abs(offset)
              if (idx < 0 || idx >= projects.length) {
                return <div key={offset} style={{ width: abs === 1 ? "44px" : "32px" }} />
              }
              return (
                <button
                  key={offset}
                  onClick={() => setActiveIndex(idx)}
                  className="flex-shrink-0 text-center transition-all duration-500 leading-none"
                  style={{
                    width: offset === 0 ? "52px" : abs === 1 ? "44px" : "32px",
                    fontSize: offset === 0 ? "32px" : abs === 1 ? "17px" : "12px",
                    fontWeight: offset === 0 ? 900 : 500,
                    color: offset === 0 ? "#0052A5" : "#2D2D2D",
                    opacity: offset === 0 ? 1 : abs === 1 ? 0.25 : 0.10,
                    fontFamily: "'Momo Trust Sans', 'Inter', sans-serif",
                    letterSpacing: "-0.02em",
                    paddingBottom: offset === 0 ? "0px" : abs === 1 ? "3px" : "6px",
                  }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </button>
              )
            })}
          </div>
          {/* Thin rule */}
          <div className="mx-auto mt-3 h-px w-[40px] bg-[#0052A5]/30" />
          {/* Project name */}
          <p className="mt-2 text-center text-[12px] font-semibold tracking-[0.1em] text-[#0052A5] uppercase">
            {projects[activeIndex].title}
          </p>
        </div>

        {/* Attribution note */}
        <p className="mt-10 text-[12px] leading-[1.7] tracking-[0.08em] text-[#2D2D2D]/60">
          Projects marked Principal Experience illustrate the professional experience of Seyed Hassan Mozneb, P.Eng., undertaken through other firms or before founding Zagrosia. They are not presented as projects commissioned directly to Zagrosia Engineering Inc.
        </p>

        {/* Mobile bottom CTA */}
        <div className="mt-[76px]">
          <Reveal variant="fadeUp" delay={0.05} duration={0.6}>
            <p className="mb-3 text-[12px] font-medium tracking-[0.1em] text-[#2D2D2D]">START YOUR PROJECT</p>
          </Reveal>
          <Reveal variant="fadeLeft" delay={0.1} duration={0.7}>
            <h2
              className="mb-6 uppercase leading-[1.15] tracking-[0.12em] text-[#2D2D2D]"
              style={{ fontSize: "20px", fontWeight: 600, fontFamily: "'Momo Trust Sans', 'Inter', sans-serif" }}
            >
              DO YOU WANT TO START YOUR PROJECT?
            </h2>
          </Reveal>
          <Reveal delay={0.2} duration={0.65}>
            <p className="mb-8 leading-[1.85] tracking-[0.06em] text-[#2D2D2D]" style={{ fontSize: "12px" }}>
              Every project is unique. Contact us to discuss your specific requirements, and discover how we can help.
            </p>
          </Reveal>
          <div className="mt-7 flex justify-start gap-[15px]">
            <Reveal variant="scaleUp" delay={0.28} duration={0.55}>
              <CtaButton
                href="/contact"
                className="inline-flex items-center justify-center zag-cta rounded-[10px] border border-[#2D2D2D] text-[#2D2D2D] font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[40px] px-5 text-[12px] lg:h-[44px] lg:px-7 lg:text-[14px]"
              >
                Request a Service
              </CtaButton>
            </Reveal>
            <Reveal variant="scaleUp" delay={0.38} duration={0.55}>
              <CtaButton
                href="/contact"
                className="inline-flex items-center justify-center zag-cta rounded-[10px] border border-[#2D2D2D] text-[#2D2D2D] font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[40px] px-5 text-[12px] lg:h-[44px] lg:px-7 lg:text-[14px]"
              >
                Get In Touch
              </CtaButton>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="sidebar-content hidden lg:block">
        <div className="pb-[98px] pt-[clamp(110px,16vh,148px)] zag-desktop-content-pad">
          <div className="grid grid-cols-12 gap-x-[12px]">
            <div className="col-span-12">
              <div className="relative pl-5">
                <motion.div
                  className="absolute left-0 top-[4px] bottom-0 w-[3px]"
                  initial={reducedMotion ? false : { scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: false, amount: 0.05 }}
                  transition={{ duration: 0.9, ease: "easeInOut" }}
                  style={{
                    transformOrigin: "top",
                    background: "linear-gradient(180deg, rgba(1,80,169,1) 0%, rgba(1,80,169,0.55) 55%, rgba(1,80,169,0) 100%)",
                  }}
                />

                <Reveal variant="fadeUp" delay={0.05} duration={0.6}>
                  <p className="mb-[14px] text-[12px] font-bold uppercase tracking-[0.24em] text-[#0052A5]">Our portfolio</p>
                </Reveal>

                <Reveal variant="fadeLeft" delay={0.1} duration={0.7}>
                  <h1 className="zag-heading whitespace-nowrap text-[clamp(26px,2.9vw,40px)] font-bold uppercase leading-[1.1]">
                    <span className="text-[#2D2D2D]">Engineering </span>
                    <span className="text-[#0052A5]">built to last</span>
                  </h1>
                </Reveal>

                <Reveal delay={0.2} duration={0.65}>
                  <p className="mt-[18px] max-w-[820px] text-[16px] leading-[1.7] tracking-[0.02em] text-[#2D2D2D]">
                    Zagrosia assignments and the principal&apos;s earlier career, from scaffold and building-envelope field reviews to parkade and rooftop assessments, retaining walls, townhouses, single-family homes and warehouses. Open any project to see its scope, the engineering focus behind it and the photos from site.
                  </p>
                </Reveal>

                <div className="mt-[clamp(22px,3.4vh,38px)] grid grid-cols-3 gap-[clamp(14px,1.6vw,24px)] pr-[4px]">
                  <StatCard
                    delay={0.3}
                    icon={<Building2 size={22} strokeWidth={1.8} />}
                    to={200}
                    suffix="+"
                    label="Projects delivered"
                    note="Field reviews and assessments."
                    visual={<BarsVisual />}
                  />
                  <StatCard
                    delay={0.4}
                    icon={<Award size={22} strokeWidth={1.8} />}
                    to={35}
                    suffix="+"
                    label="Years of experience"
                    note="Of structural engineering practice."
                    visual={<RingVisual />}
                  />
                  <StatCard
                    delay={0.5}
                    icon={<MapPin size={22} strokeWidth={1.8} />}
                    to={3}
                    suffix=""
                    label="Provinces served"
                    note="Engineering practice across Canada."
                    visual={<DotsVisual reduced={reducedMotion} />}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-12 mt-[clamp(40px,7vh,72px)]">
              <Reveal variant="fadeUp" delay={0.05} duration={0.6}>
                <div className="flex items-center gap-4">
                  <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#0052A5]">Project index</p>
                  <span className="h-px flex-1 bg-gradient-to-r from-[#0052A5]/40 to-transparent" />
                  <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#2D2D2D]/55">{projects.length} projects</p>
                </div>
              </Reveal>
            </div>

            <div className="col-span-12 mt-[28px] space-y-[28px]">
              {desktopRows.map((row, rowIndex) => (
                <motion.div
                  key={rowIndex}
                  initial={reducedMotion ? false : { opacity: 0, y: 28, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.08 }}
                  transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
                  className="grid grid-cols-12 gap-[28px]"
                >
                  {row.map((project) => (
                    <ProjectTile key={project.id} {...project} />
                  ))}
                </motion.div>
              ))}
            </div>

            <div className="col-span-12 mt-[28px]">
              <p className="max-w-[900px] text-[12px] leading-[1.7] tracking-[0.1em] text-[#2D2D2D]/60">
                Projects marked Principal Experience illustrate the professional experience of Seyed Hassan Mozneb, P.Eng., undertaken through other firms or before founding Zagrosia. They are not presented as projects commissioned directly to Zagrosia Engineering Inc.
              </p>
            </div>

            <div className="col-span-12 mt-[78px]">
              <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
                <h2 className="text-[28px] uppercase leading-[1.1] tracking-[0.04em] text-[#2D2D2D]">
                  DO YOU WANT TO START YOUR PROJECT?
                </h2>
              </Reveal>
              <Reveal delay={0.18} duration={0.65}>
                <p className="mt-[18px] text-[16px] leading-[1.45] tracking-[0.14em] text-[#2D2D2D]">
                  Every project is unique. Contact us to discuss your specific requirements, and discover how we can help.
                </p>
              </Reveal>
              <Reveal variant="scaleUp" delay={0.28} duration={0.55} className="mt-7">
                <CtaButton
                  href="/contact"
                  className="inline-flex items-center justify-center zag-cta rounded-[10px] border border-[#2D2D2D] text-[#2D2D2D] font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[40px] px-5 text-[12px] lg:h-[44px] lg:px-7 lg:text-[14px]"
                >
                  Request a Service
                </CtaButton>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
