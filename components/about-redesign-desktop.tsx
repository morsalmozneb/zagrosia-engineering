"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from "framer-motion"
import { ArrowRight, ArrowUpRight, ChevronsLeftRight } from "lucide-react"
import { Reveal } from "./scroll-reveal"
import { CtaButton } from "@/components/cta-button"
import { coreValues, team } from "./about-desktop-page"

const EASE = [0.22, 1, 0.36, 1] as const

// Hero video. Drop the new clip into /public/videos and put its path here (e.g. "/videos/about-hero.mp4").
const HERO_VIDEO: string | null = "/videos/about-hero.mp4"
const HERO_POSTER = "/videos/about-hero-poster.jpg"

const STORY_VIDEO = "/videos/about-story"
const STORY_POSTER = "/videos/about-story-poster.png"

const ctaLight =
  "inline-flex items-center justify-center zag-cta rounded-[10px] border border-[#2D2D2D] text-[#2D2D2D] font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[44px] px-7 text-[14px]"
const ctaDark =
  "inline-flex items-center justify-center zag-cta rounded-[10px] border border-[#FCFCFC] text-[#FCFCFC] font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[44px] px-7 text-[14px]"
const ctaSmall =
  "inline-flex flex-1 items-center justify-center whitespace-nowrap zag-cta rounded-[10px] border border-[#2D2D2D] text-[#2D2D2D] font-medium tracking-[0.08em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[36px] px-4 text-[12px]"

const eyebrow = "text-[12px] font-bold uppercase tracking-[0.24em] text-[#0052A5]"
const sectionHeading = "zag-heading text-[28px] uppercase leading-[1.1]"
const sec = "relative flex flex-col justify-center py-[clamp(48px,9vh,110px)]"
const bodyText = "text-[16px] leading-[1.7] tracking-[0.02em]"
const panelShadow = "0 4px 19.6px rgba(0,0,0,0.18)"

// ─── DATA (from Seyed Hassan Mozneb's portfolio / resume and the team resumes) ───────────

type Site = { name: string; place: string; note: string; image?: string }
type Station = {
  label: string
  period: string
  title: string
  place: string
  bullets: string[]
  image?: string
  sites?: Site[]
}

const stations: Station[] = [
  {
    label: "1985",
    period: "1985 – 1989",
    title: "B.Sc. Civil Engineering",
    place: "Mashhad University, Iran",
    bullets: [
      "Four years of civil engineering study, built on concrete, steel and masonry.",
      "The base for a career spent on structures that carry real loads.",
    ],
  },
  {
    label: "1990",
    period: "1990 – 1993",
    title: "M.Sc. Structural Engineering",
    place: "Isfahan University of Technology, Iran",
    bullets: [
      "Three years of graduate study focused on structural engineering.",
      "Finished in 1993, the year his professional design career began.",
    ],
  },
  {
    label: "1993",
    period: "1993 – 1995 · 2002 – 2003",
    title: "Structural Designer",
    place: "Petrochemical Industries Design & Engineering Co., Iran",
    bullets: [
      "Designed steel and concrete structures for petrochemical plants, including foundations for rotary equipment and pipe racks.",
      "Prepared shop fabrication drawings, carried out field reviews and wrote technical reports.",
    ],
    sites: [
      { name: "Abadan Refinery", place: "Abadan", note: "Pipe-rack routing and elevated access platforms for maintenance and inspection." },
      { name: "Bandar-Emam", place: "Bandar-Emam", note: "Foundations for vessels and tanks, and an earthquake-resistant control room." },
      { name: "Bojnourd Plant", place: "Bojnourd", note: "Foundations for rotary equipment and reactors, controlling vibration and dynamic loads." },
      { name: "Arak Petrochemical", place: "Arak", note: "A firefighting building and a pipe-rack expansion, designed while the plant stayed in operation." },
      { name: "Tabriz Project", place: "Tabriz", note: "Bridges and trestles over difficult terrain, and foundations for a storage tank farm." },
    ],
  },
  {
    label: "1995",
    period: "1995 – 2002",
    title: "Head of Civil & Structural Department",
    place: "Bushehr Nuclear Power Plant, Iran",
    bullets: [
      "Oversaw the reactor's concrete dome and the plant's concrete chimneys.",
      "Supervised the outlet channel for the third water circuit.",
      "Led the repair and restoration of war-damaged land-based and marine structures.",
    ],
  },
  {
    label: "2003",
    period: "2003 – 2017",
    title: "CEO & Senior Structural Engineer",
    place: "Shahab Tandisan Co. & Herammehr Co., Shiraz, Iran",
    bullets: [
      "Led the firm and structurally designed six apartment developments in Shiraz, 799 units in total.",
      "Designed for sustainability and seismic resistance, and ran bids, contracts and approvals.",
    ],
    sites: [
      { name: "High-rise", place: "Iran", note: "Residential tower under construction.", image: "/images/projects/residential-high-rise-construction-iran/01-hero.jpg" },
      { name: "Concrete frame", place: "Iran", note: "Residential concrete-frame blocks under construction.", image: "/images/projects/residential-concrete-frame-construction-iran/01-hero.jpg" },
      { name: "Residential complex", place: "Iran", note: "A residential complex of steel-framed blocks.", image: "/images/projects/residential-complex-construction-iran/01-hero.jpg" },
      { name: "Vertical extension", place: "Iran", note: "A two-storey steel-frame extension.", image: "/images/projects/two-storey-vertical-extension-iran/01-hero.jpg" },
    ],
  },
  {
    label: "2018",
    period: "2018 – 2019",
    title: "Construction Operation Certificate",
    place: "BCIT, British Columbia",
    bullets: [
      "Studied Canadian construction practice at BCIT.",
      "The first step in rebuilding his practice in British Columbia.",
    ],
  },
  {
    label: "2019",
    period: "2019 – 2022",
    title: "Structural Engineering Certificate",
    place: "Structural Engineers Association of BC",
    bullets: [
      "Completed the SEABC certificate in structural engineering.",
      "Studied while already practising in Vancouver.",
    ],
  },
  {
    label: "2019+",
    period: "2019 – Present",
    title: "Professional Structural Engineer",
    place: "i3 Building Science & Consulting, BC",
    bullets: [
      "Leads structural design for residential, industrial and institutional work.",
      "Produces 3D models, drawings and FEM calculations in Revit, AutoCAD, SAP2000 and ETABS.",
      "Manages projects from concept to completion, within code, schedule and budget.",
    ],
    sites: [
      { name: "Parkade review", place: "Langley, BC", note: "Structural review of a parkade: slabs, columns and soffits assessed on site and reported on.", image: "/images/projects/parkade-structural-review-langley/01-hero.jpg" },
      { name: "Rooftop equipment", place: "Surrey, BC", note: "Review of rooftop equipment supports, anchors and vibration isolators.", image: "/images/projects/rooftop-equipment-foundations-review-surrey/01-hero.jpg" },
      { name: "Retaining wall", place: "Maple Ridge, BC", note: "Structural assessment of a retaining wall and the slope behind it.", image: "/images/projects/retaining-wall-structural-assessment-maple-ridge/01-hero.jpg" },
      { name: "Scaffold review", place: "Vancouver, BC", note: "Field review of an access scaffold and its platform levels.", image: "/images/projects/scaffold-field-review-vancouver/01-hero.jpg" },
    ],
  },
  {
    label: "Today",
    period: "Zagrosia Engineering Inc.",
    title: "Founder & Principal Engineer",
    place: "Coquitlam, British Columbia",
    bullets: [
      "Founded Zagrosia to bring his practice together under one name.",
      "Works alongside engineers, drafters and designers across structural, civil, architectural and digital work.",
      "Serves clients in British Columbia, Alberta and Saskatchewan.",
    ],
    sites: [
      { name: "Townhouse complex", place: "Surrey, BC", note: "Condition assessment of a townhouse complex: elevations, porches and grounds.", image: "/images/projects/townhouse-complex-condition-assessment-surrey/01-hero.jpg" },
      { name: "Recreation roof", place: "Langley, BC", note: "Review of a recreation facility's roof structure, trusses and connections.", image: "/images/projects/recreation-facility-roof-structure-review-langley/01-hero.jpg" },
      { name: "Warehouse", place: "Vancouver, BC", note: "Structural review of a warehouse, its racking aisles and roof framing.", image: "/images/projects/warehouse-structural-review-vancouver/01-hero.jpg" },
      { name: "Building envelope", place: "Vancouver, BC", note: "Field review of a building envelope rehabilitation and decayed framing.", image: "/images/projects/building-envelope-rehabilitation-field-review-vancouver/01-hero.jpg" },
    ],
  },
]

const memberInfo: Record<
  string,
  { role: string; studied: string; bio: string; chips: string[] }
> = {
  "SEYED HASSAN MOZNEB": {
    role: "Principal & Senior Structural Engineer",
    studied: "M.Sc. Isfahan University of Technology · B.Sc. Mashhad University",
    bio: "Founder of Zagrosia and a Professional Engineer. He led structural design on refineries, petrochemical plants, industrial facilities and apartment developments in Iran, and ran two structural design firms of his own, before bringing his practice to British Columbia. He now designs and reviews structures in steel, concrete, wood and masonry, and guides every Zagrosia project from first concept to final review.",
    chips: ["SAP2000", "ETABS", "SAFE", "STAAD Pro", "RISA-3D", "Revit Structure", "Tekla Structures", "AutoCAD 2D/3D", "Mathcad"],
  },
  "MEHDI MOZNEB": {
    role: "Civil & Structural Consultant",
    studied: "B.Sc. Civil Engineering, Eastern Mediterranean University · First in class",
    bio: "Prepares structural and civil drawings, from foundations and framing to grading and stormwater. Reviews shop drawings, supports permit applications and carries out site reviews at different stages of construction. He works closely with Seyed and the wider team to keep drawings, calculations and site conditions in step, from first sketch to final submission.",
    chips: ["AutoCAD", "SAP2000", "ETABS", "SAFE", "Mathcad"],
  },
  "ATENA JAHANGARD": {
    role: "Architectural Consultant",
    studied: "B.Sc. Architecture · BCIT Architectural & Drafting",
    bio: "Brings an architectural eye to construction drawings, building envelope documentation and condition assessments. Supports field reviews, prepares drawing sets and contributes to depreciation reports. She links the architectural and structural sides of each project so that drawings are clear, coordinated and ready for permit.",
    chips: ["AutoCAD", "Revit", "Building envelope", "Depreciation reports"],
  },
  "MORSAL MOZNEB": {
    role: "Director of Operations & Business Development",
    studied: "B.IT Shiraz University · BCIT New Media Design & Web Development",
    bio: "Designs and builds Zagrosia's website and brand identity system, and runs the firm's operations and business development. She builds the digital tools the team works in, keeps projects, clients and communication organized, and develops new client relationships for the firm.",
    chips: ["Web Development", "AI Systems", "Design Systems", "Digital Marketing"],
  },
  "FARNAZ GHOLAMI": {
    role: "Digital & Creative Director",
    studied: "B.Sc. University of Guilan · BCIT New Media Design & Web Development",
    bio: "Creates Zagrosia's visual and video content: brand collateral, motion graphics and short films, with a background in UI/UX and graphic design. She shapes how the firm looks and sounds across its website, social channels and presentations, so the engineering work is easy to understand.",
    chips: ["Design Systems", "Motion Graphics & Video", "AI Content Creation", "Digital Marketing"],
  },
}


const storyParas = [
  "Seyed Hassan Mozneb began his career designing structures in Iran, working on refineries, industrial facilities and hundreds of homes, and ran two structural design firms of his own.",
  "He then rebuilt his practice in British Columbia, studying Canadian construction at BCIT and structural engineering through SEABC, and now designs and reviews structures here.",
  "Zagrosia Engineering Inc. is the firm he founded to bring that experience, together with a small team of engineers, drafters and designers, to clients across British Columbia, Alberta and Saskatchewan.",
]

const storyFacts = [
  { label: "Founded by", value: "Seyed Hassan Mozneb, M.Sc., P.Eng." },
  { label: "Based in", value: "Coquitlam, BC" },
  { label: "Serving", value: "BC · AB · SK" },
]

const regions = [
  { code: "BC", name: "British Columbia", text: "Our home province. The team is based in Coquitlam, with projects from Metro Vancouver to the Interior." },
  { code: "AB", name: "Alberta", text: "Licensed to provide structural engineering services for residential, commercial and industrial clients." },
  { code: "SK", name: "Saskatchewan", text: "Licensed to provide structural engineering services across the province." },
]

const earlierSites = ["Shiraz", "Bushehr", "Abadan", "Bandar-Emam", "Arak", "Bojnourd", "Tabriz"]

// ─── ART ─────────────────────────────────────────────────────────────────────

function RidgeArt({ className = "", drift = true }: { className?: string; drift?: boolean }) {
  const reduced = useReducedMotion()
  const move = (px: number, dur: number) =>
    drift && !reduced ? { animate: { x: [0, px, 0] }, transition: { duration: dur, repeat: Infinity, ease: "easeInOut" as const } } : {}
  return (
    <svg className={className} viewBox="0 0 1440 600" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <motion.path
        {...move(-26, 22)}
        d="M-60 380 L120 300 L220 340 L360 220 L470 300 L600 180 L720 280 L860 200 L980 290 L1120 210 L1260 300 L1360 250 L1500 300 L1500 600 L-60 600 Z"
        fill="rgba(91,155,240,0.2)"
      />
      <motion.path
        {...move(20, 28)}
        d="M-60 450 L140 360 L260 420 L400 310 L540 400 L690 290 L820 390 L960 330 L1100 410 L1240 340 L1500 420 L1500 600 L-60 600 Z"
        fill="rgba(1,80,169,0.5)"
      />
      <motion.path
        {...move(-14, 34)}
        d="M-60 520 L180 450 L320 500 L480 420 L640 500 L800 440 L960 510 L1120 450 L1280 505 L1500 460 L1500 600 L-60 600 Z"
        fill="rgba(8,12,24,0.78)"
      />
    </svg>
  )
}

// Plays once each time it scrolls into view, then holds the last frame.
function StoryVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const inView = useInView(ref, { amount: 0.5 })
  const reduced = useReducedMotion()
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (reduced) {
      const seek = () => {
        v.currentTime = v.duration || 0
      }
      if (v.readyState >= 1) seek()
      v.addEventListener("loadedmetadata", seek)
      return () => v.removeEventListener("loadedmetadata", seek)
    }
    if (inView) {
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [inView, reduced])
  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      poster={poster}
      muted
      loop
      playsInline
      preload="auto"
      aria-label="Zagrosia Engineering logo animation"
    >
      <source src={`${src}.webm`} type="video/webm" />
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  )
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

/* Separator under the principal's photo: one clean line that draws itself once,
   bright at the photo and fading out to the right, like the home page line. */
function PrincipalRule() {
  const reduced = useReducedMotion()
  const line = "linear-gradient(90deg, rgba(252,252,252,0.9) 0%, rgba(252,252,252,0.45) 55%, rgba(252,252,252,0.12) 100%)"
  if (reduced) return <div className="h-px w-full" style={{ background: line }} />
  return (
    <motion.div
      className="h-px w-full origin-left"
      style={{ background: line }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
    />
  )
}

/* Core values card: a photo covers the values; dragging the blue line to the right reveals them. */
function ValuesReveal() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [pos, setPos] = useState(reduced ? 55 : 14)
  const touched = useRef(false)
  const dragging = useRef(false)

  useEffect(() => {
    if (!inView || reduced) return
    const up = animate(14, 30, { duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => { if (!touched.current) setPos(v) } })
    return () => up.stop()
  }, [inView, reduced])

  const setFromEvent = (clientX: number) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }

  return (
    <div
      ref={ref}
      className="relative select-none touch-pan-y rounded-[14px]"
      style={{ boxShadow: "0 4px 19.6px rgba(0,0,0,0.12)" }}
      onPointerDown={(e) => {
        dragging.current = true
        touched.current = true
        e.currentTarget.setPointerCapture(e.pointerId)
        setFromEvent(e.clientX)
      }}
      onPointerMove={(e) => { if (dragging.current) setFromEvent(e.clientX) }}
      onPointerUp={() => { dragging.current = false }}
      onPointerCancel={() => { dragging.current = false }}
    >
      {/* values underneath */}
      <div className="grid grid-cols-3 overflow-hidden rounded-[14px] bg-[#EEF2F7] gap-x-[clamp(20px,3vw,40px)] gap-y-[clamp(14px,3.2vh,34px)] px-[clamp(20px,3vw,44px)] py-[clamp(16px,3.6vh,40px)]">
        {coreValues.map((v) => (
          <div key={v.title}>
            <span className="mb-[clamp(6px,1.4vh,12px)] block h-[3px] w-10 rounded-full bg-[#0052A5]" />
            <h4 className="text-[16px] font-bold leading-[1.7] tracking-[0.02em] text-[#2d2d2d]">{v.title}</h4>
            <p className="text-[16px] leading-[1.7] tracking-[0.02em] text-[#3a3a3a]">{v.description}</p>
          </div>
        ))}
      </div>

      {/* photo that covers the values until the line is dragged */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[14px]" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <Image src="/images/about-core-values-building.jpg" alt="" fill sizes="1100px" className="object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(11,14,10,0.35) 0%, rgba(11,14,10,0) 40%)" }} />
      </div>

      {/* draggable line */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="Reveal core values"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { touched.current = true; setPos((p) => Math.min(100, p + 5)) }
          if (e.key === "ArrowLeft") { touched.current = true; setPos((p) => Math.max(0, p - 5)) }
        }}
        className="absolute inset-y-0 z-10 w-[3px] -translate-x-1/2 cursor-ew-resize bg-[#0052A5] outline-none"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex h-[44px] w-[44px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0052A5]" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.25)" }}>
          <ChevronsLeftRight size={22} />
        </span>
      </div>
    </div>
  )
}

const stationKinds = ["Education", "Education", "Experience", "Experience", "Experience", "Certificate", "Certificate", "Experience", "Zagrosia"]
const stationPhotos = [
  "/images/projects/residential-complex-construction-iran/01-hero.jpg",
  "/images/projects/two-storey-vertical-extension-iran/01-hero.jpg",
  "/images/projects/two-storey-vertical-extension-iran/02-frame-end-elevation.jpg",
  "/images/projects/residential-high-rise-construction-iran/01-hero.jpg",
  "/images/projects/residential-concrete-frame-construction-iran/01-hero.jpg",
  "/images/projects/scaffold-field-review-vancouver/01-hero.jpg",
  "/images/projects/recreation-facility-roof-structure-review-langley/01-hero.jpg",
  "/images/projects/parkade-structural-review-langley/01-hero.jpg",
  "/images/projects/townhouse-complex-condition-assessment-surrey/01-hero.jpg",
]
const stationCaptions = [
  "Residential complex, Iran",
  "Two-storey steel-frame extension, Iran",
  "Steel-frame extension, Iran",
  "Residential high-rise, Iran",
  "Concrete-frame towers, Iran",
  "Scaffold field review, Vancouver",
  "Recreation facility roof, Langley",
  "Parkade review, Langley",
  "Townhouse complex, Surrey",
]
const stationMore = [
  "Mashhad gave him the fundamentals: how loads travel through concrete, steel and masonry down to the ground. That grounding still shapes the way he reads a drawing or a site today. The photo shows one of the residential complexes he later engineered.",
  "Graduate work in Isfahan went deeper into structural analysis and design, and prepared him for professional practice. Structural frames like the one pictured became the everyday subject of his work.",
  "In his first design role he worked inside a large engineering company on heavy industrial plants. The work combined design office and field: calculations and drawings on one side, site visits and technical reports on the other.",
  "This was a long, hands-on leadership role on one of the country's most demanding sites. It meant coordinating crews, consultants and inspections while keeping every structure to strict safety standards.",
  "Running his own firm meant carrying a project from first sketch to handover: design, bids, contracts, approvals and the site itself. The towers pictured are from this period. Choose a project below to see it.",
  "On arriving in British Columbia he went back to school to learn local construction practice, codes and site safety first-hand. Every Canadian project since has built on this foundation.",
  "The SEABC certificate tied his experience to Canadian structural practice and codes. He completed it while already working on live projects, applying each lesson straight away.",
  "At i3 he leads structural design and field review for a wide range of buildings across the Lower Mainland. Choose a project below to see the kind of work it involves.",
  "Zagrosia brings structural, civil, architectural and digital work together under one roof. Every project is led by Seyed and delivered with a small team who know the work well. Choose a project below to see recent work.",
]
const YEAR_PAD = 7
const yearTop = (i: number, n: number) => `${YEAR_PAD + ((i + 0.5) * (100 - YEAR_PAD * 2)) / n}%`
const BANDS = 6

/* Year digits roll like an odometer; direction follows the way you travel through the career. */
function YearRoll({ text, dir, reduced }: { text: string; dir: number; reduced: boolean }) {
  return (
    <span className="inline-flex h-[1.4em] overflow-hidden leading-[1.4em]">
      <AnimatePresence initial={false} mode="popLayout" custom={dir}>
        {text.split("").map((c, i) => (
          <motion.span
            key={`${i}-${c}`}
            custom={dir}
            className="inline-block"
            variants={{
              enter: (d: number) => ({ y: d > 0 ? "110%" : "-110%", opacity: 0 }),
              center: { y: "0%", opacity: 1 },
              leave: (d: number) => ({ y: d > 0 ? "-110%" : "110%", opacity: 0 }),
            }}
            initial={reduced ? false : "enter"}
            animate="center"
            exit="leave"
            transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : i * 0.05, ease: EASE }}
          >
            {c}
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  )
}

/* New photo is laid down as six "floor slabs" that slide in from alternating sides, bottom floor first,
   each led by a blue edge, while a blueprint grid flashes over the top and the photo settles. */
function CareerPhoto({ src, alt, reduced }: { src: string; alt: string; reduced: boolean }) {
  const [state, setState] = useState({ cur: src, prev: src, n: 0 })
  useEffect(() => {
    setState((s) => (s.cur === src ? s : { cur: src, prev: s.cur, n: s.n + 1 }))
  }, [src])
  const { cur, prev, n } = state
  const animated = n > 0 && !reduced
  return (
    <div className="absolute inset-0 overflow-hidden">
      {n > 0 && <Image src={prev} alt="" fill sizes="900px" className="object-cover" />}
      <motion.div
        key={n}
        className="absolute inset-0"
        initial={animated ? { scale: 1.12 } : false}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        {Array.from({ length: BANDS }).map((_, b) => {
          const fromLeft = b % 2 === 0
          const delay = (BANDS - 1 - b) * 0.09
          return (
            <motion.div
              key={b}
              className="absolute inset-x-0 overflow-hidden"
              style={{ top: `${(b * 100) / BANDS}%`, height: `${100 / BANDS + 0.2}%` }}
              initial={animated ? { clipPath: fromLeft ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" } : false}
              animate={{ clipPath: "inset(0 0% 0 0%)" }}
              transition={{ duration: 0.75, delay, ease: EASE }}
            >
              <div className="absolute inset-x-0" style={{ top: `-${b * 100}%`, height: `${BANDS * 100}%` }}>
                <Image src={cur} alt={alt} fill sizes="900px" className="object-cover" priority={n === 0} />
              </div>
              {animated && (
                <motion.span
                  className="absolute top-0 h-full w-[3px] bg-[#5b9bf0] shadow-[0_0_14px_#5b9bf0]"
                  initial={{ left: fromLeft ? "0%" : "100%", opacity: 1 }}
                  animate={{ left: fromLeft ? "100%" : "0%", opacity: [1, 1, 0] }}
                  transition={{ duration: 0.75, delay, ease: EASE }}
                />
              )}
            </motion.div>
          )
        })}
      </motion.div>
      {animated && (
        <motion.div
          key={`g${n}`}
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(91,155,240,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(91,155,240,0.55) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.45, 0] }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />
      )}
    </div>
  )
}

/* Section separator: a faceted blue ridge that folds flat and unfolds again, on a fading hairline. */
const foldPts = [
  { x: 130, y: 70 }, { x: 260, y: 46 }, { x: 440, y: 0 }, { x: 600, y: 40 }, { x: 740, y: 70 },
]
function foldD(k: number, a: number, b: number) {
  const P = foldPts.map((p) => ({ x: p.x, y: +(70 - k * (70 - p.y)).toFixed(2) }))
  const pts = [...P.slice(a, b + 1)]
  const base = pts.map((p) => ({ x: p.x, y: 70 })).reverse()
  const all = [...pts, ...base]
  return "M" + all.map((p) => `${p.x} ${p.y}`).join(" L") + " Z"
}
function FoldSeparator() {
  const reduced = useReducedMotion()
  const facets = [
    { a: 0, b: 1, fill: "#d3e5f8", delay: 0 },
    { a: 1, b: 2, fill: "#a6cbf2", delay: 0.06 },
    { a: 2, b: 3, fill: "#78aaf0", delay: 0.12 },
    { a: 3, b: 4, fill: "#bcd7f5", delay: 0.18 },
  ]
  return (
    <div className="sidebar-content zag-desktop-content-pad" aria-hidden="true">
      <div className="max-w-[1320px] py-[clamp(8px,2vh,24px)]">
        <svg viewBox="0 0 880 76" className="block h-[clamp(44px,8vh,84px)] w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="foldLine" x1="0" x2="1">
              <stop offset="0" stopColor="#0052A5" stopOpacity="0" />
              <stop offset="0.5" stopColor="#0052A5" stopOpacity="0.55" />
              <stop offset="1" stopColor="#0052A5" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="foldBase" x1="0" x2="1">
              <stop offset="0" stopColor="#0a4a96" stopOpacity="0" />
              <stop offset="0.3" stopColor="#0a4a96" />
              <stop offset="0.7" stopColor="#0a4a96" />
              <stop offset="1" stopColor="#0a4a96" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="69" width="880" height="1.5" fill="url(#foldLine)" />
          {facets.map((f, i) => (
            <motion.path
              key={i}
              fill={f.fill}
              initial={{ d: foldD(reduced ? 1 : 0.04, f.a, f.b) }}
              animate={{ d: reduced ? foldD(1, f.a, f.b) : [foldD(1, f.a, f.b), foldD(0.05, f.a, f.b), foldD(1, f.a, f.b)] }}
              transition={{ duration: 4.4, delay: f.delay, ease: "easeInOut", repeat: reduced ? 0 : Infinity, repeatDelay: 0.3 }}
            />
          ))}
          <rect x="260" y="67" width="480" height="5" fill="url(#foldBase)" />
        </svg>
      </div>
    </div>
  )
}

export function AboutRedesignDesktop() {
  const reduced = useReducedMotion()
  const [stationIndex, setStationIndex] = useState(0)
  const [siteIndex, setSiteIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [teamIndex, setTeamIndex] = useState(0)

  const station = stations[stationIndex]
  const site = station.sites ? station.sites[siteIndex] ?? station.sites[0] : null
  const stationImage = site?.image ?? station.image ?? stationPhotos[stationIndex]
  const member = team[teamIndex]
  const info = memberInfo[member.name]
  const principal = team[0]

  const pickStation = (i: number) => {
    if (i === stationIndex) return
    setDir(i > stationIndex ? 1 : -1)
    setStationIndex(i)
    setSiteIndex(0)
  }

  return (
    <div className="hidden bg-[#FCFCFC] text-[#2D2D2D] lg:block">
      {/* ═══ 1. HERO ═══ */}
      <section
        className="relative min-h-screen overflow-hidden text-[#FCFCFC]"
        style={{ background: "linear-gradient(180deg, #0B1226 0%, #161f43 55%, #0a3f86 100%)" }}
      >
        <RidgeArt className="absolute inset-x-0 bottom-0 h-[78%] w-full" />
        {HERO_VIDEO && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={HERO_VIDEO}
            poster={HERO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        )}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(8,14,26,0.35) 0%, rgba(8,14,26,0.1) 45%, rgba(8,14,26,0.75) 100%)" }}
        />
        <div className="sidebar-content zag-desktop-content-pad relative z-10 pb-20 pt-[154px]">
          <div className="flex items-end justify-between gap-10">
            <div className="max-w-[700px]">
              <h1 className="font-sans font-bold tracking-tight">
                <motion.span
                  className="block text-[#FCFCFC]"
                  style={{ fontSize: "52px", lineHeight: 1.02 }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >ABOUT</motion.span>
                <span style={{ display: "block", overflow: "hidden", marginTop: "2px" }}>
                  <motion.span
                    className="block text-[#0150a9]"
                    style={{ fontSize: "52px", lineHeight: 1.01 }}
                    initial={{ y: "105%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  >ZAGROSIA</motion.span>
                </span>
              </h1>
              <motion.p
                className="mt-6 font-light text-[#FCFCFC]"
                style={{ fontSize: "28px", letterSpacing: "0.2em" }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >BUILT LIKE A MOUNTAIN RANGE</motion.p>
              <div className="relative mt-10 pl-8">
                <motion.div
                  className="pointer-events-none absolute left-0 top-0 w-[6px] rounded-full"
                  style={{
                    height: "calc(100% - 48px)",
                    background: "linear-gradient(180deg, rgba(252,252,252,1) 0%, rgba(252,252,252,0.6) 55%, rgba(252,252,252,0) 100%)",
                    transformOrigin: "top",
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 1.1, delay: 0.5, ease: "easeInOut" }}
                />
                <motion.p
                  className="text-[#FCFCFC]"
                  style={{ fontSize: "20px", letterSpacing: "0.14em" }}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >M.Sc. STRUCTURAL · P.ENG</motion.p>
                <motion.p
                  className="text-[#FCFCFC]"
                  style={{ fontSize: "16px", letterSpacing: "0.14em", marginTop: "clamp(18px,4.5vh,38px)" }}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
                >BC · AB · SK</motion.p>
                <motion.div
                  style={{ marginTop: "clamp(22px,6vh,76px)" }}
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-mono text-[#FCFCFC]" style={{ fontSize: "17px", lineHeight: 1.65, letterSpacing: "0.02em" }}>
                    Structural Design · Seismic Expertise · Steel · Concrete · Wood
                  </p>
                  <p className="font-sans text-[#FCFCFC]/80" style={{ fontSize: "17px", lineHeight: 1.6, letterSpacing: "0.03em", marginTop: "10px" }}>
                    Named for the Zagros Mountains: a range built by pressure, held by structure.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 2. OUR STORY ═══ */}
      <section className={`sidebar-content zag-desktop-content-pad ${sec}`}>
        <div className="grid max-w-[1320px] grid-cols-[1.9fr_0.8fr] items-center gap-[clamp(32px,4vw,64px)]">
          {/* LEFT: heading + description, same type sizes as the home page */}
          <div className="relative pl-5">
            <motion.div
              className="absolute left-0 top-0 w-[3px] rounded-full"
              style={{
                height: "100%",
                background: "linear-gradient(to bottom, rgba(1,80,169,1) 0%, rgba(1,80,169,0.8) 30%, rgba(1,80,169,0.4) 65%, rgba(1,80,169,0) 100%)",
                transformOrigin: "top",
              }}
              initial={reduced ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.9, delay: 0.1, ease: "easeInOut" }}
            />
            <Reveal variant="fadeUp" delay={0.05} duration={0.6}>
              <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.24em] text-[#0052A5]">Our story</p>
            </Reveal>
            <Reveal variant="fadeLeft" delay={0.1} duration={0.7}>
              <h2 className="zag-heading mb-5 text-[28px] uppercase leading-[1.1] text-[#2d2d2d]">
                From the <span className="text-[#0052A5]">Zagros</span>
                <br />
                to the Pacific
              </h2>
            </Reveal>
            <div className="space-y-4">
              {storyParas.map((t, i) => (
                <Reveal key={i} delay={0.2 + i * 0.08} duration={0.65}>
                  <p className="text-[16px] leading-[1.7] tracking-[0.02em] text-[#3a3a3a]">
                    {t.split(/(Seyed Hassan Mozneb|Zagrosia Engineering Inc\.)/).map((part, k) =>
                      part === "Seyed Hassan Mozneb" || part === "Zagrosia Engineering Inc." ? (
                        <strong key={k} className="font-bold text-[#2D2D2D]">{part}</strong>
                      ) : (
                        part
                      ),
                    )}
                  </p>
                </Reveal>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-3 border-t border-[#2D2D2D]/70">
              {storyFacts.map((f, i) => (
                <motion.div
                  key={f.label}
                  className={`pt-3 ${i > 0 ? "border-l border-[#2D2D2D]/25 pl-4" : ""}`}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.1, ease: EASE }}
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#0052A5]">{f.label}</p>
                  <p className="mt-1 text-[14px] leading-[1.35] tracking-[0.02em] text-[#3a3a3a]">{f.value}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: video placeholder + P.Eng. seal */}
          <motion.div
            className="relative"
            initial={reduced ? false : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          >
            <div
              className="relative mx-auto aspect-square w-full"
              style={{ maxWidth: "min(100%, 66svh)" }}
            >
              <StoryVideo src={STORY_VIDEO} poster={STORY_POSTER} />
            </div>
            {/* P.Eng. seal, same mark as the home page */}
            <motion.svg
              viewBox="0 0 120 120"
              role="img"
              aria-label="Professional Engineer, signed and sealed"
              className="absolute -right-[6px] -top-[18px] h-[96px] w-[96px] rounded-full bg-[#FCFCFC]"
              style={{ boxShadow: "0 4px 18px rgba(0,0,0,0.22)" }}
              initial={reduced ? false : { opacity: 0, scale: 0.5, rotate: -40 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 140, damping: 14, delay: 0.9 }}
            >
              <defs>
                <path id="about-peng-top" d="M 23.6,81 A 42,42 0 1 1 96.4,81" />
                <path id="about-peng-bottom" d="M 18.4,84 A 48,48 0 0 0 101.6,84" />
              </defs>
              <g fill="none" stroke="#0150a9">
                <circle cx="60" cy="60" r="56" strokeWidth="2.6" />
                <circle cx="60" cy="60" r="52" strokeWidth="1" />
                <circle cx="60" cy="60" r="33" strokeWidth="1" />
              </g>
              <g fill="#0150a9" fontFamily="Inter, Arial, sans-serif" fontWeight="700">
                <text fontSize="8" letterSpacing="0.9"><textPath href="#about-peng-top" startOffset="50%" textAnchor="middle">PROFESSIONAL ENGINEER</textPath></text>
                <text fontSize="8" letterSpacing="1.2"><textPath href="#about-peng-bottom" startOffset="50%" textAnchor="middle">SIGNED &amp; SEALED</textPath></text>
                <text x="60" y="68" fontSize="20" textAnchor="middle" letterSpacing="0.4">P.ENG</text>
              </g>
            </motion.svg>
          </motion.div>
        </div>
      </section>

      {/* ═══ 3. THE PRINCIPAL ═══ */}
      <section className="relative flex flex-col justify-center overflow-hidden py-[clamp(28px,6vh,80px)] text-[#FCFCFC]" style={{ background: "linear-gradient(180deg, #0B0E0A 0%, #07080A 100%)" }}>
        <div className="sidebar-content zag-desktop-content-pad">
          <div className="max-w-[1180px]">
            {/* Row 1: photo cut at the waist, sitting on the divider, with the introduction beside it */}
            <div className="grid grid-cols-[40%_1fr] items-end">
              <motion.div
                className="ml-[5%] h-[clamp(300px,60vh,640px)] w-fit"
                initial={reduced ? false : { opacity: 0, x: -24, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
              >
                <Image src="/images/seyed-hassan-principal.webp" alt="Seyed Hassan Mozneb, P.Eng." width={735} height={998} className="h-full w-auto" priority={false} />
              </motion.div>
              <div className="self-center pb-[clamp(16px,3vh,32px)]">
                <Reveal variant="fadeUp" delay={0.05} duration={0.6}>
                  <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.24em] text-[#5b9bf0]">Our Principal &amp; Founder</p>
                </Reveal>
                <Reveal variant="fadeLeft" delay={0.1} duration={0.7}>
                  <h2 className="zag-heading whitespace-nowrap text-[28px] uppercase leading-[1.1] text-[#FCFCFC]">
                    Seyed Hassan <span className="text-[#5b9bf0]">Mozneb</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.16} duration={0.6}>
                  <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.24em] text-[#FCFCFC]/65">P.Eng., M.Sc. &nbsp;·&nbsp; Founder of Zagrosia</p>
                </Reveal>
                <Reveal delay={0.22} duration={0.65}>
                  <p className="mt-5 max-w-[680px] text-[16px] leading-[1.7] tracking-[0.02em] text-[#FCFCFC]/85">
                    Seyed Hassan Mozneb is a structural engineer who designs structures and supervises their construction, bringing first-hand site experience to every Zagrosia Engineering project. A registered Professional Engineer with an M.Sc. in Structural Engineering, he has worked on refineries, industrial facilities and hundreds of homes, and now leads our practice across British Columbia, Alberta and Saskatchewan in steel, concrete, wood and masonry.
                  </p>
                </Reveal>
              </div>
            </div>

            <PrincipalRule />

            {/* Row 2: education and certifications */}
            <Reveal delay={0.25} duration={0.7}>
              <div className="grid grid-cols-[40%_1fr] pt-[clamp(14px,3.4vh,36px)]">
                <div>
                  <h3 className="mb-[clamp(8px,1.8vh,16px)] text-[12px] font-bold uppercase tracking-[0.24em] text-[#5b9bf0]">Education</h3>
                  <div className="space-y-[clamp(10px,2.2vh,22px)]">
                    {[
                      ["M.Sc. Structural Engineering", "Isfahan University of Technology"],
                      ["B.Sc. Civil Engineering", "Mashhad University"],
                    ].map(([t, u]) => (
                      <div key={t}>
                        <p className="text-[18px] leading-tight text-[#FCFCFC]">{t}</p>
                        <p className="mt-1 text-[16px] leading-[1.7] tracking-[0.02em] text-[#FCFCFC]/80">{u}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-[clamp(8px,1.8vh,16px)] text-[12px] font-bold uppercase tracking-[0.24em] text-[#5b9bf0]">Certifications</h3>
                  <ul className="space-y-[clamp(10px,2.2vh,22px)] text-[16px] leading-[1.7] tracking-[0.02em] text-[#FCFCFC]/85">
                    {["Professional Engineer (P.Eng.)", "Structural Engineering Certificate (SEABC)"].map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-[#FCFCFC]" />
      </section>

      {/* ═══ 7. MEET OUR TEAM ═══ */}
      <section className="relative flex flex-col justify-center bg-[#F3F5F8] py-[clamp(24px,5vh,64px)]">
        <div className="sidebar-content zag-desktop-content-pad">
          <div className="relative max-w-[1100px] pl-5">
            <motion.span
              className="absolute left-0 top-0 h-full w-[3px] rounded-full"
              style={{ background: "linear-gradient(to bottom, rgba(1,80,169,1) 0%, rgba(1,80,169,0.8) 30%, rgba(1,80,169,0.4) 65%, rgba(1,80,169,0) 100%)", transformOrigin: "top" }}
              initial={reduced ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.9, delay: 0.1, ease: "easeInOut" }}
            />
            <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
              <p className={`mb-3 ${eyebrow}`}>The people behind Zagrosia</p>
            </Reveal>
            <Reveal variant="fadeLeft" delay={0.1} duration={0.7}>
              <h2 className={`${sectionHeading} text-[#2D2D2D]`}>MEET OUR TEAM</h2>
            </Reveal>

            <div className="grid grid-cols-5 items-start gap-[clamp(8px,1vw,16px)] pt-[clamp(38px,7vh,60px)]">
              {team.map((m, i) => {
                const active = i === teamIndex
                const mi = memberInfo[m.name]
                return (
                  <motion.button
                    key={m.name}
                    onClick={() => setTeamIndex(i)}
                    aria-pressed={active}
                    className="relative min-w-0 text-left"
                    initial={false}
                    animate={{ y: active ? -22 : 0 }}
                    whileHover={active ? undefined : { y: -6 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <motion.div
                      className="relative aspect-square w-full overflow-hidden rounded-[22px] bg-[#EEF2F7]"
                      initial={false}
                      animate={{ maxWidth: active ? "clamp(140px,31vh,300px)" : "clamp(110px,24vh,234px)" }}
                      transition={{ type: "spring", stiffness: 200, damping: 22 }}
                      style={{ boxShadow: active ? "0 18px 36px rgba(0,82,165,0.25)" : "0 4px 14px rgba(0,0,0,0.12)" }}
                    >
                      <Image src={m.image} alt={m.name} fill sizes="320px" className="object-cover" />
                    </motion.div>
                    <p className={`mt-[clamp(6px,1vh,10px)] text-[16px] font-semibold leading-[1.25] tracking-[0.02em] transition-colors ${active ? "text-[#0052A5]" : "text-[#2D2D2D]"}`}>
                      {m.name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
                    </p>
                    <p className="mt-[2px] text-[13px] leading-[1.35] tracking-[0.02em] text-[#6b7380]">{mi.role}</p>
                  </motion.button>
                )
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={member.name}
                className="relative mt-[clamp(6px,1.6vh,18px)] grid grid-cols-[1.6fr_1fr] gap-[clamp(32px,5vw,80px)]"
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <div>
                  <h3 className="zag-heading text-[18px] uppercase leading-[1.2] text-[#2D2D2D]">{info.studied.split(" · ")[0]}</h3>
                  {info.studied.split(" · ").slice(1).filter((p) => !/BCIT|First in class/.test(p)).length > 0 && (
                    <p className="mt-1 text-[16px] tracking-[0.02em] text-[#6b7380]">{info.studied.split(" · ").slice(1).filter((p) => !/BCIT|First in class/.test(p)).join(" · ")}</p>
                  )}
                  <p className={`mt-2 max-w-[760px] ${bodyText} text-[#3a3a3a]`}>{info.bio}</p>
                </div>
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <p className={eyebrow}>Tools &amp; Expertise</p>
                      {member.name === "SEYED HASSAN MOZNEB" && (
                        <svg viewBox="0 0 120 120" role="img" aria-label="Professional Engineer, signed and sealed" className="h-[clamp(44px,6vh,56px)] w-[clamp(44px,6vh,56px)] flex-shrink-0 rounded-full bg-[#FCFCFC]" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.25)" }}>
                          <defs>
                            <path id="team-peng-top" d="M 23.6,81 A 42,42 0 1 1 96.4,81" />
                            <path id="team-peng-bottom" d="M 18.4,84 A 48,48 0 0 0 101.6,84" />
                          </defs>
                          <g fill="none" stroke="#0150a9">
                            <circle cx="60" cy="60" r="56" strokeWidth="2.6" />
                            <circle cx="60" cy="60" r="52" strokeWidth="1" />
                            <circle cx="60" cy="60" r="33" strokeWidth="1" />
                          </g>
                          <g fill="#0150a9" fontFamily="Inter, Arial, sans-serif" fontWeight="700">
                            <text fontSize="8" letterSpacing="0.9"><textPath href="#team-peng-top" startOffset="50%" textAnchor="middle">PROFESSIONAL ENGINEER</textPath></text>
                            <text fontSize="8" letterSpacing="1.2"><textPath href="#team-peng-bottom" startOffset="50%" textAnchor="middle">SIGNED &amp; SEALED</textPath></text>
                            <text x="60" y="68" fontSize="20" textAnchor="middle" letterSpacing="0.4">P.ENG</text>
                          </g>
                        </svg>
                      )}
                  </div>
                  <p className={`mt-[clamp(6px,1.2vh,12px)] ${bodyText} text-[#3a3a3a]`}>{info.chips.join("  ·  ")}</p>
                  <div className="mt-[clamp(10px,2vh,22px)] flex flex-wrap gap-2">
                    <CtaButton href={member.email} className={ctaSmall}>Email</CtaButton>
                    {member.linkedIn !== "#" && (
                      <CtaButton href={member.linkedIn} target="_blank" rel="noopener noreferrer" className={ctaSmall}>LinkedIn</CtaButton>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══ 5. MISSION, VISION & VALUES ═══ */}
      <section className={`sidebar-content zag-desktop-content-pad ${sec}`}>
        <div className="max-w-[1100px]">
          <div className="relative pl-5">
            <motion.div
              className="absolute left-0 top-0 w-[3px] rounded-full"
              style={{
                height: "100%",
                background: "linear-gradient(to bottom, rgba(1,80,169,1) 0%, rgba(1,80,169,0.8) 30%, rgba(1,80,169,0.4) 65%, rgba(1,80,169,0) 100%)",
                transformOrigin: "top",
              }}
              initial={reduced ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.9, delay: 0.1, ease: "easeInOut" }}
            />
            <Reveal variant="fadeUp" delay={0.05} duration={0.6}>
              <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.24em] text-[#0052A5]">Our purpose</p>
            </Reveal>
            <Reveal variant="fadeLeft" delay={0.1} duration={0.7}>
              <h2 className="zag-heading mb-5 text-[28px] uppercase leading-[1.1] text-[#2d2d2d]">
                Mission, vision <span className="text-[#0052A5]">&amp; values</span>
              </h2>
            </Reveal>

            <div className="grid grid-cols-2">
              {[
                {
                  label: "Our mission",
                  text: "To deliver innovative, practical, and code-compliant structural engineering solutions that protect public safety, support our clients' goals, and contribute to the resilience and sustainability of the built environment.",
                },
                {
                  label: "Our vision",
                  text: "To become a recognized leader in structural engineering by combining technical excellence, specialty engineering expertise, and emerging artificial intelligence technologies to transform how engineering knowledge is created, shared, and applied.",
                },
              ].map((card, i) => (
                <Reveal key={card.label} delay={0.15 + i * 0.1} duration={0.65}>
                  <div className={i === 0 ? "pr-[clamp(20px,3vw,44px)]" : "border-l border-[#2D2D2D]/20 pl-[clamp(20px,3vw,44px)]"}>
                    <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.24em] text-[#0052A5]">{card.label}</p>
                    <p className="text-[16px] leading-[1.7] tracking-[0.02em] text-[#3a3a3a]">{card.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mb-3 mt-8 flex items-end justify-between">
              <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#0052A5]">Core values</p>
              <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.24em] text-[#3a3a3a]/60">
                <ChevronsLeftRight size={16} className="text-[#0052A5]" /> Drag the line to reveal
              </p>
            </div>

          <ValuesReveal />
          </div>
        </div>
      </section>

      <FoldSeparator />

      {/* ═══ 5. CAREER PATH ═══ */}
      <section className={`sidebar-content zag-desktop-content-pad ${sec}`}>
        <div className="max-w-[1320px]">
          <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
            <p className={`mb-[clamp(4px,1.2vh,12px)] ${eyebrow}`}>Experience before Zagrosia</p>
          </Reveal>
          <Reveal variant="fadeLeft" delay={0.1} duration={0.7}>
            <h2 className={`${sectionHeading} mb-[clamp(14px,3vh,32px)] text-[#2D2D2D]`}>A CAREER IN STRUCTURES</h2>
          </Reveal>

          <div className="grid h-[clamp(380px,62vh,600px)] grid-cols-[0.85fr_1.15fr] gap-[clamp(40px,4.4vw,64px)]">
            {/* left: text */}
            <div className="relative flex items-center">
              <motion.span
                className="absolute left-0 top-[6%] h-[88%] w-[3px] origin-top rounded-full"
                style={{ background: "linear-gradient(180deg, #0052A5 0%, rgba(0,82,165,0) 100%)" }}
                initial={reduced ? false : { scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: EASE }}
              />
              <motion.div
                key={stationIndex}
                className="pl-[clamp(18px,2vw,28px)]"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: reduced ? 0 : 0.09 } } }}
              >
                {[
                  <p key="k" className={eyebrow}>{stationKinds[stationIndex]}</p>,
                  <h3 key="t" className={`${sectionHeading} mt-[clamp(8px,1.6vh,16px)] !leading-[1.15] text-[#2D2D2D]`}>{station.title.toUpperCase()}</h3>,
                  <p key="p" className="mt-[clamp(8px,1.6vh,14px)] text-[clamp(13px,2.1vh,17px)] font-semibold leading-[1.4] tracking-[0.02em] text-[#0052A5]">{station.place}</p>,
                  <p key="b" className={`mt-[clamp(10px,2vh,20px)] max-w-[520px] ${bodyText} text-[#3a3a3a]`}>{station.bullets.join(" ")}</p>,
                  <p key="m" className={`mt-[clamp(8px,1.6vh,14px)] max-w-[520px] ${bodyText} text-[#3a3a3a]`}>{stationMore[stationIndex]}</p>,
                ].map((el, i) => (
                  <div key={i} className="overflow-hidden">
                    <motion.div
                      variants={{ hidden: { y: "105%", opacity: 0 }, show: { y: "0%", opacity: 1 } }}
                      transition={{ duration: reduced ? 0 : 0.7, ease: EASE }}
                    >
                      {el}
                    </motion.div>
                  </div>
                ))}
              </motion.div>
              {/* connector to the active year */}
              <motion.span
                className="pointer-events-none absolute -right-[clamp(40px,4.4vw,64px)] z-10 h-[3px] w-[clamp(40px,4.4vw,64px)] -translate-y-1/2 rounded-full bg-[#0052A5]"
                animate={{ top: yearTop(stationIndex, stations.length) }}
                transition={{ type: "spring", stiffness: 140, damping: 20 }}
              />
            </div>

            {/* right: photo card with years */}
            <div className="relative overflow-hidden rounded-[22px] bg-[#0B1226]" style={{ boxShadow: panelShadow }}>
              <CareerPhoto src={stationImage} alt={site ? site.name : station.place} reduced={!!reduced} />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-[46%] bg-gradient-to-r from-[#0B1226]/90 via-[#0B1226]/55 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-t from-[#0B1226]/85 to-transparent" />

              {/* years */}
              <div className="absolute inset-y-0 left-0 w-[clamp(120px,14vw,190px)]">
                <motion.span
                  className="absolute left-0 h-[3px] w-[clamp(14px,1.4vw,22px)] -translate-y-1/2 bg-[#0052A5]"
                  animate={{ top: yearTop(stationIndex, stations.length) }}
                  transition={{ type: "spring", stiffness: 140, damping: 20 }}
                />
                {stations.map((s, i) => {
                  const active = i === stationIndex
                  return (
                    <button
                      key={s.period + s.title}
                      onClick={() => pickStation(i)}
                      aria-label={`${s.label}: ${s.title}`}
                      aria-current={active}
                      className="group absolute left-[clamp(18px,1.8vw,28px)] flex -translate-y-1/2 items-center gap-3"
                      style={{ top: yearTop(i, stations.length) }}
                    >
                      <span className={`h-px transition-all duration-500 ${active ? "w-0" : "w-[10px] bg-[#FCFCFC]/45 group-hover:w-[18px] group-hover:bg-[#7fb0f5]"}`} />
                      <span className={`text-[clamp(13px,2vh,17px)] font-semibold tracking-[0.06em] transition-colors duration-300 ${active ? "text-transparent" : "text-[#FCFCFC]/60 group-hover:text-[#FCFCFC]"}`}>{s.label}</span>
                    </button>
                  )
                })}
                {/* the active chip glides between years */}
                <motion.div
                  className="pointer-events-none absolute left-[clamp(14px,1.4vw,22px)] flex -translate-y-1/2 items-center gap-2 rounded-[10px] bg-[#0052A5] px-[clamp(10px,1vw,14px)] py-[clamp(5px,0.9vh,9px)] text-[clamp(14px,2.2vh,19px)] font-bold tracking-[0.06em] text-white shadow-[0_6px_22px_rgba(0,82,165,0.55)]"
                  animate={{ top: yearTop(stationIndex, stations.length) }}
                  transition={{ type: "spring", stiffness: 140, damping: 20 }}
                >
                  <span className="opacity-70">–</span>
                  <YearRoll text={station.label} dir={dir} reduced={!!reduced} />
                  <ArrowRight className="h-[1em] w-[1em] opacity-80" />
                </motion.div>
              </div>

              {!station.sites && (
                <p className="absolute bottom-[clamp(14px,2.4vh,24px)] right-[clamp(16px,2vw,28px)] rounded-[8px] bg-[#0B1226]/70 px-[10px] py-[6px] text-[clamp(10px,1.5vh,12px)] font-semibold uppercase tracking-[0.12em] text-[#FCFCFC]">{stationCaptions[stationIndex]}</p>
              )}
              {/* sites strip */}
              {station.sites && (
                <div className="absolute bottom-0 left-[clamp(120px,14vw,190px)] right-0 px-[clamp(16px,2vw,28px)] pb-[clamp(14px,2.4vh,24px)]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${stationIndex}-${siteIndex}`}
                      initial={reduced ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="mb-[10px] text-[#FCFCFC]"
                    >
                      <p className="text-[clamp(11px,1.6vh,13px)] font-semibold uppercase tracking-[0.2em] text-[#7fb0f5]">{site!.place}</p>
                      <p className="mt-1 max-w-[520px] text-[clamp(13px,1.9vh,15px)] leading-[1.5] tracking-[0.01em] text-[#FCFCFC]/90">{site!.note}</p>
                    </motion.div>
                  </AnimatePresence>
                  <div className="flex flex-wrap gap-[6px]">
                    {station.sites.map((s, i) => (
                      <button
                        key={s.name}
                        onClick={() => setSiteIndex(i)}
                        aria-pressed={i === siteIndex}
                        className={`rounded-[8px] border px-[10px] py-[5px] text-[clamp(10px,1.5vh,12px)] font-semibold uppercase tracking-[0.1em] transition-colors ${
                          i === siteIndex
                            ? "border-[#0052A5] bg-[#0052A5] text-white"
                            : "border-[#FCFCFC]/40 text-[#FCFCFC] hover:border-[#7fb0f5] hover:text-[#7fb0f5]"
                        }`}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
