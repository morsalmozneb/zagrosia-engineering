"use client"

import { useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Reveal } from "./scroll-reveal"
import { CtaButton } from "@/components/cta-button"
import { coreValues, team } from "./about-desktop-page"

const EASE = [0.22, 1, 0.36, 1] as const

// Hero video. Drop the new clip into /public/videos and put its path here (e.g. "/videos/about-hero.mp4").
const HERO_VIDEO: string | null = null

const ctaLight =
  "inline-flex items-center justify-center zag-cta rounded-[10px] border border-[#2D2D2D] text-[#2D2D2D] font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[44px] px-7 text-[14px]"
const ctaDark =
  "inline-flex items-center justify-center zag-cta rounded-[10px] border border-[#FCFCFC] text-[#FCFCFC] font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[44px] px-7 text-[14px]"
const ctaSmall =
  "inline-flex flex-1 items-center justify-center whitespace-nowrap zag-cta rounded-[10px] border border-[#2D2D2D] text-[#2D2D2D] font-medium tracking-[0.08em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[36px] px-4 text-[12px]"

const eyebrow = "text-[14px] font-bold uppercase tracking-[0.24em] text-[#0052A5]"
const sectionHeading = "zag-heading text-[28px] leading-none tracking-[0.04em]"
const panelShadow = "0 4px 19.6px rgba(0,0,0,0.18)"

// ─── DATA (from Seyed Hassan Mozneb's portfolio / resume and the team resumes) ───────────

type Site = { name: string; place: string; note: string; image: string }
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
      { name: "Abadan Refinery", place: "Abadan", note: "Pipe-rack routing and elevated access platforms for maintenance and inspection.", image: "/images/projects/abadan-refinery.png" },
      { name: "Bandar-Emam", place: "Bandar-Emam", note: "Foundations for vessels and tanks, and an earthquake-resistant control room.", image: "/images/projects/bandar-emam-petrochemical.png" },
      { name: "Bojnourd Plant", place: "Bojnourd", note: "Foundations for rotary equipment and reactors, controlling vibration and dynamic loads.", image: "/images/projects/bojnourd-plant.png" },
      { name: "Arak Petrochemical", place: "Arak", note: "A firefighting building and a pipe-rack expansion, designed while the plant stayed in operation.", image: "/images/projects/arak-petrochemical.png" },
      { name: "Tabriz Project", place: "Tabriz", note: "Bridges and trestles over difficult terrain, and foundations for a storage tank farm.", image: "/images/projects/tabriz-project.png" },
    ],
  },
  {
    label: "1995",
    period: "1995 – 2002",
    title: "Head of Civil & Structural Department",
    place: "Bushehr Nuclear Power Plant, Iran",
    image: "/images/projects/bushehr-nuclear-power-plant.png",
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
      "Led the firm and structurally designed six apartment developments, 799 units in total.",
      "Designed for sustainability and seismic resistance, and ran bids, contracts and approvals.",
    ],
    sites: [
      { name: "Apartment developments", place: "Shiraz", note: "Six developments, 799 units, from foundations to quality control.", image: "/images/projects/apartment-developments-shiraz.png" },
      { name: "High-rise", place: "Iran", note: "Residential tower under construction.", image: "/images/projects/residential-high-rise-construction-iran/01-hero.jpg" },
      { name: "Concrete frame", place: "Iran", note: "Residential concrete-frame blocks under construction.", image: "/images/projects/residential-concrete-frame-construction-iran/01-hero.jpg" },
      { name: "Residential complex", place: "Iran", note: "A residential complex of steel-framed blocks.", image: "/images/projects/residential-complex-construction-iran/01-hero.jpg" },
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
      { name: "Car elevator", place: "British Columbia", note: "A car elevator and its steel enclosure.", image: "/images/projects/car-elevator-steel-enclosure.png" },
      { name: "Steel access bridge", place: "British Columbia", note: "A steel access bridge, designed and detailed.", image: "/images/projects/steel-access-bridge.png" },
      { name: "Beam & slab", place: "British Columbia", note: "Concrete beam and slab replacement.", image: "/images/projects/concrete-beam-and-slab-replacement.png" },
      { name: "Helical piles", place: "British Columbia", note: "Helical piles and suspended slabs.", image: "/images/projects/helical-piles-and-suspended-slabs.png" },
    ],
  },
  {
    label: "Today",
    period: "Zagrosia Engineering Inc.",
    title: "Founder & Principal Engineer",
    place: "Coquitlam, British Columbia",
    bullets: [
      "Founded Zagrosia to bring his practice together under one name.",
      "Works with a team of five across structural, civil, architectural and digital design.",
      "Serves clients in British Columbia, Alberta and Saskatchewan.",
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
    bio: "Founder of Zagrosia. He led structural design on refineries, a nuclear power plant and apartment developments in Iran before bringing his practice to British Columbia. He works in steel, concrete, wood and masonry.",
    chips: ["P.Eng.", "Steel", "Concrete", "Wood", "Masonry"],
  },
  "MEHDI MOZNEB": {
    role: "Civil & Structural Consultant",
    studied: "B.Sc. Civil Engineering, Eastern Mediterranean University · First in class",
    bio: "Prepares structural and civil drawings, from foundations and framing to grading and stormwater. Reviews shop drawings, supports permit applications and carries out site reviews at different stages of construction.",
    chips: ["AutoCAD", "SAP2000", "ETABS", "SAFE", "Mathcad"],
  },
  "ATENA JAHANGARD": {
    role: "Architectural Consultant",
    studied: "B.Sc. Architecture · BCIT Architectural & Drafting",
    bio: "Brings an architectural eye to construction drawings, building envelope documentation and condition assessments. Supports field reviews, prepares drawing sets and contributes to depreciation reports.",
    chips: ["AutoCAD", "Revit", "Building envelope", "Depreciation reports"],
  },
  "MORSAL MOZNEB": {
    role: "Director of Operations & Business Development",
    studied: "B.IT Shiraz University · BCIT New Media Design & Web Development",
    bio: "Designs and builds Zagrosia's website and brand identity system, and runs the firm's operations and business development.",
    chips: ["Figma", "Web development", "Brand systems", "Operations"],
  },
  "FARNAZ GHOLAMI": {
    role: "Digital & Creative Director",
    studied: "B.Sc. University of Guilan · BCIT New Media Design & Web Development",
    bio: "Creates Zagrosia's visual and video content: brand collateral, motion graphics and short films, with a background in UI/UX and graphic design.",
    chips: ["Figma", "Illustrator", "Premiere Pro", "After Effects"],
  },
}

const heroStats = [
  { value: "1993", label: "Practising since" },
  { value: "799", label: "Homes designed in Shiraz" },
  { value: "3", label: "Provinces served" },
]

const glance = [
  { label: "Founded by", value: "Seyed Hassan Mozneb, M.Sc., P.Eng." },
  { label: "Based in", value: "Coquitlam, BC" },
  { label: "Serving", value: "British Columbia · Alberta · Saskatchewan" },
  { label: "Team", value: "Five people, four disciplines" },
  { label: "Experience", value: "Iran and Canada" },
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

// ─── PAGE ────────────────────────────────────────────────────────────────────

export function AboutRedesignDesktop() {
  const reduced = useReducedMotion()
  const [valueIndex, setValueIndex] = useState(2)
  const [stationIndex, setStationIndex] = useState(3)
  const [siteIndex, setSiteIndex] = useState(0)
  const [teamIndex, setTeamIndex] = useState(1)

  const value = coreValues[valueIndex]
  const station = stations[stationIndex]
  const site = station.sites ? station.sites[siteIndex] ?? station.sites[0] : null
  const stationImage = site ? site.image : station.image
  const member = team[teamIndex]
  const info = memberInfo[member.name]
  const principal = team[0]

  const pickStation = (i: number) => {
    setStationIndex(i)
    setSiteIndex(0)
  }

  return (
    <div className="hidden bg-[#FCFCFC] text-[#2D2D2D] lg:block">
      {/* ═══ 1. HERO ═══ */}
      <section
        className="relative h-[min(100svh,820px)] min-h-[560px] overflow-hidden text-[#FCFCFC]"
        style={{ background: "linear-gradient(180deg, #0B1226 0%, #161f43 55%, #0a3f86 100%)" }}
      >
        <RidgeArt className="absolute inset-x-0 bottom-0 h-[78%] w-full" />
        {HERO_VIDEO && (
          <video className="absolute inset-0 h-full w-full object-cover" src={HERO_VIDEO} autoPlay muted loop playsInline aria-hidden="true" />
        )}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(8,14,26,0.35) 0%, rgba(8,14,26,0.1) 45%, rgba(8,14,26,0.75) 100%)" }}
        />
        <div className="sidebar-content zag-desktop-content-pad relative z-10 flex h-full flex-col justify-end pb-[64px]">
          <div className="flex items-end justify-between gap-10">
            <div className="max-w-[720px]">
              <Reveal variant="fadeUp" delay={0.05} duration={0.6}>
                <p className="mb-5 text-[14px] font-bold uppercase tracking-[0.28em] text-[#FCFCFC]/85">Zagrosia Engineering Inc.</p>
              </Reveal>
              <Reveal variant="fadeLeft" delay={0.1} duration={0.7}>
                <h1 className="zag-heading text-[56px] font-bold uppercase leading-[1.02] tracking-[0.03em]">
                  About <span className="text-[#5b9bf0]">Zagrosia</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2} duration={0.65}>
                <p className="mt-4 text-[18px] uppercase tracking-[0.3em] text-[#FCFCFC]">Built like a mountain range</p>
              </Reveal>
              <Reveal delay={0.3} duration={0.65}>
                <p className="mt-7 max-w-[520px] border-l-2 border-[#FCFCFC] pl-5 text-[17px] leading-[1.65] tracking-[0.01em] text-[#FCFCFC]/95">
                  Named for the Zagros Mountains: a range built by pressure, held by structure.
                </p>
              </Reveal>
            </div>
            <div className="hidden min-w-[210px] flex-col gap-5 pb-1 xl:flex">
              {heroStats.map((s, i) => (
                <Reveal key={s.label} delay={0.35 + i * 0.1} duration={0.6}>
                  <div className="border-t border-[#FCFCFC]/50 pt-3">
                    <p className="text-[26px] font-semibold leading-none tracking-[0.08em]">{s.value}</p>
                    <p className="mt-2 text-[12px] uppercase tracking-[0.2em] text-[#FCFCFC]/85">{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 2. OUR STORY ═══ */}
      <section className="sidebar-content zag-desktop-content-pad py-[88px]">
        <div className="grid max-w-[1100px] grid-cols-[1.25fr_1fr] gap-[72px]">
          <div className="relative pl-5">
            <motion.div
              className="absolute bottom-0 left-0 top-[4px] w-[4px] rounded-full"
              initial={reduced ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              style={{ transformOrigin: "top", background: "linear-gradient(180deg, #0150a9 0%, rgba(1,80,169,0) 100%)" }}
            />
            <Reveal variant="fadeUp" delay={0.05} duration={0.6}>
              <p className={`mb-4 ${eyebrow}`}>Our story</p>
            </Reveal>
            <Reveal variant="fadeLeft" delay={0.1} duration={0.7}>
              <h2 className="zag-heading mb-7 text-[36px] font-bold uppercase leading-[1.08] tracking-[0.03em]">
                From the <span className="text-[#0052A5]">Zagros</span> to the Pacific
              </h2>
            </Reveal>
            <div className="space-y-5">
              <Reveal delay={0.2} duration={0.65}>
                <p className="text-[17px] leading-[1.72] tracking-[0.01em]">
                  Seyed Hassan Mozneb began designing structures in 1993. Over the next two decades he worked on refineries, a nuclear power plant and hundreds of homes in Iran, and ran two structural design firms of his own.
                </p>
              </Reveal>
              <Reveal delay={0.28} duration={0.65}>
                <p className="text-[17px] leading-[1.72] tracking-[0.01em]">
                  He then rebuilt his practice in British Columbia, studying Canadian construction at BCIT and structural engineering through SEABC, and has been designing and reviewing structures here since 2019.
                </p>
              </Reveal>
              <Reveal delay={0.34} duration={0.65}>
                <p className="text-[17px] leading-[1.72] tracking-[0.01em]">
                  Zagrosia Engineering Inc. is the firm he founded to bring that experience, together with a small team of engineers, drafters and designers, to clients across British Columbia, Alberta and Saskatchewan.
                </p>
              </Reveal>
            </div>
          </div>
          <div className="self-center border-t-2 border-[#2D2D2D]">
            {glance.map((row, i) => (
              <motion.div
                key={row.label}
                initial={reduced ? false : { opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.09, ease: EASE }}
                className="border-b border-[#2D2D2D]/20 py-[18px]"
              >
                <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#0052A5]">{row.label}</p>
                <p className="mt-2 text-[18px] leading-[1.35] tracking-[0.02em]">{row.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. THE PRINCIPAL ═══ */}
      <section className="relative overflow-hidden text-[#FCFCFC]" style={{ background: "linear-gradient(180deg, #0B0E0A 0%, #07080A 100%)" }}>
        <div className="sidebar-content zag-desktop-content-pad">
          <div className="grid max-w-[1100px] grid-cols-[430px_1fr] gap-[64px] pt-[88px]">
            <motion.div
              className="relative h-[600px] self-end"
              initial={reduced ? false : { opacity: 0, x: -24, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
            >
              <Image src="/images/homayoun-pic.png" alt="Seyed Hassan Mozneb" fill className="object-contain object-bottom" />
            </motion.div>
            <div className="pb-[72px]">
              <Reveal variant="fadeUp" delay={0.05} duration={0.6}>
                <p className="mb-4 text-[14px] font-bold uppercase tracking-[0.24em] text-[#5b9bf0]">The principal</p>
              </Reveal>
              <Reveal variant="fadeLeft" delay={0.1} duration={0.7}>
                <h2 className="zag-heading text-[40px] font-bold uppercase leading-[1.05] tracking-[0.03em]">Seyed Hassan Mozneb</h2>
              </Reveal>
              <Reveal delay={0.16} duration={0.6}>
                <p className="mt-3 text-[13px] uppercase tracking-[0.24em] text-[#FCFCFC]/75">P.Eng. · M.Sc. · Founder of Zagrosia</p>
              </Reveal>
              <Reveal delay={0.22} duration={0.65}>
                <p className="mt-6 max-w-[560px] text-[17px] leading-[1.7] tracking-[0.01em] text-[#FCFCFC]/92">
                  He has worked on both sides of the structure: designing it, and supervising it as it was built. From the reactor dome at Bushehr to six apartment developments in Shiraz, his career has moved between design office and construction site.
                </p>
              </Reveal>
              <div className="mt-8 grid max-w-[600px] grid-cols-2 gap-10">
                <div>
                  <h3 className="mb-3 text-[13px] font-bold uppercase tracking-[0.24em] text-[#5b9bf0]">Education</h3>
                  <ul className="space-y-2 text-[15px] leading-[1.5] tracking-[0.04em]">
                    {["M.Sc. Structural Engineering, Isfahan University of Technology", "B.Sc. Civil Engineering, Mashhad University"].map((item) => (
                      <li key={item} className="border-b border-[#FCFCFC]/15 pb-2">{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3 text-[13px] font-bold uppercase tracking-[0.24em] text-[#5b9bf0]">Certifications</h3>
                  <ul className="space-y-2 text-[15px] leading-[1.5] tracking-[0.04em]">
                    {["Professional Engineer (P.Eng.)", "Structural Engineering Certificate (SEABC)", "Construction Operation Certificate (BCIT)"].map((item) => (
                      <li key={item} className="border-b border-[#FCFCFC]/15 pb-2">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-8 grid max-w-[600px] grid-cols-2 gap-10">
                <div>
                  <h3 className="mb-3 text-[13px] font-bold uppercase tracking-[0.24em] text-[#5b9bf0]">Codes</h3>
                  <p className="text-[15px] leading-[1.7] tracking-[0.06em] text-[#FCFCFC]/90">NBCC · CSA · ACI · AISC · ASCE</p>
                </div>
                <div>
                  <h3 className="mb-3 text-[13px] font-bold uppercase tracking-[0.24em] text-[#5b9bf0]">Software</h3>
                  <p className="text-[15px] leading-[1.7] tracking-[0.06em] text-[#FCFCFC]/90">SAP2000 · ETABS · SAFE · STAAD Pro · RISA-3D · Revit · Tekla</p>
                </div>
              </div>
              <div className="mt-9 flex gap-4">
                <CtaButton href={principal.resume} target="_blank" rel="noopener noreferrer" className={ctaDark}>View Resume</CtaButton>
                <CtaButton href="/contact" className={ctaDark}>Contact</CtaButton>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-[#FCFCFC]" />
      </section>

      {/* ═══ 4. CAREER PATH ═══ */}
      <section className="sidebar-content zag-desktop-content-pad py-[88px]">
        <div className="max-w-[1100px]">
          <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
            <p className={`mb-4 ${eyebrow}`}>Experience before Zagrosia</p>
          </Reveal>
          <Reveal variant="fadeLeft" delay={0.1} duration={0.7}>
            <h2 className={`${sectionHeading} mb-12 text-[#2D2D2D]`}>A CAREER IN STRUCTURES</h2>
          </Reveal>

          <div className="relative mb-10">
            <div className="absolute left-0 right-0 top-[9px] h-[2px] bg-[#2D2D2D]" />
            <div className="relative grid" style={{ gridTemplateColumns: `repeat(${stations.length}, minmax(0, 1fr))` }}>
              {stations.map((s, i) => {
                const active = i === stationIndex
                return (
                  <button
                    key={s.period + s.title}
                    onClick={() => pickStation(i)}
                    aria-label={`${s.period}: ${s.title}`}
                    aria-current={active}
                    className="group flex flex-col items-start gap-3 text-left"
                  >
                    <span
                      className={`h-5 w-5 rounded-full border-2 transition-colors ${
                        active ? "border-[#0052A5] bg-[#0052A5]" : "border-[#2D2D2D] bg-[#FCFCFC] group-hover:border-[#0052A5]"
                      }`}
                    />
                    <span className={`text-[13px] font-semibold uppercase tracking-[0.14em] ${active ? "text-[#0052A5]" : "text-[#6b7380]"}`}>{s.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-[1.05fr_1fr] overflow-hidden rounded-[14px] border border-[#2D2D2D] bg-white" style={{ boxShadow: panelShadow }}>
            <div className="relative min-h-[460px] overflow-hidden bg-[#0B1226]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${stationIndex}-${stationImage ?? "art"}`}
                  className="absolute inset-0"
                  initial={reduced ? false : { opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  {stationImage ? (
                    <Image src={stationImage} alt={site ? site.name : station.place} fill sizes="560px" className="object-cover" />
                  ) : (
                    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #0B1226 0%, #161f43 60%, #0a3f86 100%)" }}>
                      <RidgeArt className="absolute inset-x-0 bottom-0 h-[70%] w-full" drift={false} />
                      <p className="zag-heading absolute left-8 top-8 text-[44px] font-bold leading-none tracking-[0.03em] text-[#FCFCFC]">{station.label}</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
              {site && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B1226]/95 to-transparent px-8 pb-6 pt-16 text-[#FCFCFC]">
                  <p className="text-[12px] uppercase tracking-[0.2em] text-[#5b9bf0]">{site.place}</p>
                  <p className="mt-1 text-[20px] font-semibold uppercase tracking-[0.05em]">{site.name}</p>
                  <p className="mt-2 max-w-[460px] text-[14px] leading-[1.55] tracking-[0.01em] text-[#FCFCFC]/85">{site.note}</p>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center border-l border-[#2D2D2D] px-10 py-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stationIndex}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#0052A5]">{station.period}</p>
                  <h3 className="zag-heading mt-3 text-[26px] font-bold uppercase leading-[1.15] tracking-[0.03em]">{station.title}</h3>
                  <p className="mt-2 text-[15px] tracking-[0.04em] text-[#6b7380]">{station.place}</p>
                  <ul className="mt-5 space-y-3">
                    {station.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-[15.5px] leading-[1.55] tracking-[0.01em] text-[#3a4252]">
                        <span className="mt-[9px] h-[6px] w-[6px] flex-shrink-0 rounded-full bg-[#0052A5]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  {station.sites && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {station.sites.map((s, i) => (
                        <button
                          key={s.name}
                          onClick={() => setSiteIndex(i)}
                          aria-pressed={i === siteIndex}
                          className={`rounded-[8px] border px-3 py-[7px] text-[12px] uppercase tracking-[0.12em] transition-colors ${
                            i === siteIndex
                              ? "border-[#0052A5] bg-[#0052A5] text-white"
                              : "border-[#2D2D2D]/30 text-[#2D2D2D] hover:border-[#0052A5] hover:text-[#0052A5]"
                          }`}
                        >
                          {s.name}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 5. MISSION & VISION ═══ */}
      <section className="bg-[#F3F5F8] py-[88px]">
        <div className="sidebar-content zag-desktop-content-pad">
          <div className="max-w-[1100px]">
            <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
              <h2 className={`${sectionHeading} mb-10 text-[#2D2D2D]`}>MISSION &amp; VISION</h2>
            </Reveal>
            <div className="grid grid-cols-2 gap-6">
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
                <motion.div
                  key={card.label}
                  initial={reduced ? false : { opacity: 0, y: 20, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.65, delay: 0.15 + i * 0.12, ease: EASE }}
                  className="rounded-[14px] p-px"
                  style={{ background: "linear-gradient(135deg, rgba(45,45,45,1) 0%, rgba(45,45,45,0.56) 26%, rgba(147,147,147,0.22) 100%)" }}
                >
                  <div className="h-full min-h-[240px] rounded-[14px] bg-[#FCFCFC] p-8" style={{ boxShadow: "0 4px 19.6px rgba(0,0,0,0.34)" }}>
                    <span className="mb-5 block h-[3px] w-10 rounded-full bg-[#0052A5]" />
                    <p className="mb-4 text-[18px] font-bold uppercase tracking-[0.26em]">{card.label}</p>
                    <p className="text-[17px] leading-[1.65] tracking-[0.02em]">{card.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 6. CORE VALUES ═══ */}
      <section className="sidebar-content zag-desktop-content-pad py-[88px]">
        <div className="max-w-[1100px]">
          <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
            <h2 className={`${sectionHeading} mb-10 text-[#2D2D2D]`}>CORE VALUES</h2>
          </Reveal>
          <div className="grid grid-cols-[1fr_1.15fr] overflow-hidden rounded-[14px] border border-[#2D2D2D] bg-white" style={{ boxShadow: panelShadow }}>
            <div role="tablist" aria-label="Core values" className="flex flex-col">
              {coreValues.map((v, i) => {
                const active = i === valueIndex
                return (
                  <button
                    key={v.title}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setValueIndex(i)}
                    className={`flex h-[84px] items-center gap-5 border-b border-[#2D2D2D]/15 px-7 text-left transition-colors last:border-b-0 ${
                      active ? "bg-[#0B0E0A] text-[#FCFCFC]" : "text-[#2D2D2D] hover:bg-[#EEF2F7]"
                    }`}
                  >
                    <span className={`text-[13px] tracking-[0.12em] ${active ? "text-[#5b9bf0]" : "text-[#6b7380]"}`}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="zag-heading flex-1 text-[19px] font-bold uppercase tracking-[0.04em]">{v.title}</span>
                    <ArrowRight size={20} strokeWidth={1.8} className={`transition-opacity ${active ? "opacity-100" : "opacity-0"}`} />
                  </button>
                )
              })}
            </div>
            <div className="relative flex items-center border-l border-[#2D2D2D] px-14 py-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={value.title}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <span className="mb-6 block h-[3px] w-12 rounded-full bg-[#0052A5]" />
                  <h3 className="zag-heading text-[34px] font-bold uppercase leading-[1.05] tracking-[0.03em]">{value.title}</h3>
                  <p className="mt-6 text-[19px] leading-[1.65] tracking-[0.01em] text-[#3a4252]">{value.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 7. MEET OUR TEAM ═══ */}
      <section className="bg-[#F3F5F8] py-[88px]">
        <div className="sidebar-content zag-desktop-content-pad">
          <div className="max-w-[1100px]">
            <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
              <h2 className={`${sectionHeading} mb-10 text-[#2D2D2D]`}>MEET OUR TEAM</h2>
            </Reveal>

            <div className="grid grid-cols-[400px_1fr] overflow-hidden rounded-[14px] border border-[#2D2D2D] bg-white" style={{ boxShadow: panelShadow }}>
              <div className="relative min-h-[480px] bg-[#EEF2F7]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={member.name}
                    className="absolute inset-0"
                    initial={reduced ? false : { opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <Image src={member.image} alt={member.name} fill sizes="400px" className="object-cover object-top" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="flex items-center border-l border-[#2D2D2D] px-12 py-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={member.name}
                    initial={reduced ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <h3 className="zag-heading text-[32px] font-bold uppercase leading-[1.05] tracking-[0.03em]">{member.name}</h3>
                    <p className="mt-3 text-[13px] uppercase tracking-[0.22em] text-[#0052A5]">{info.role}</p>
                    <p className="mt-4 text-[13px] tracking-[0.06em] text-[#6b7380]">{info.studied}</p>
                    <p className="mt-5 text-[16px] leading-[1.65] tracking-[0.01em] text-[#3a4252]">{info.bio}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {info.chips.map((chip) => (
                        <span key={chip} className="rounded-[8px] border border-[#2D2D2D]/30 px-3 py-[7px] text-[12px] uppercase tracking-[0.14em] text-[#2D2D2D]">{chip}</span>
                      ))}
                    </div>
                    <div className="mt-6 flex gap-2">
                      {member.linkedIn !== "#" && (
                        <CtaButton href={member.linkedIn} target="_blank" rel="noopener noreferrer" className={ctaSmall}>LinkedIn</CtaButton>
                      )}
                      <CtaButton href={member.email} className={ctaSmall}>Email</CtaButton>
                      <CtaButton href={member.resume} target="_blank" rel="noopener noreferrer" className={ctaSmall}>Resume</CtaButton>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-5 gap-3">
              {team.map((m, i) => {
                const active = i === teamIndex
                return (
                  <button
                    key={m.name}
                    onClick={() => setTeamIndex(i)}
                    aria-pressed={active}
                    className={`flex flex-col gap-2 rounded-[10px] px-4 py-4 text-left transition-colors ${
                      active ? "border-2 border-[#0052A5] bg-white" : "border border-[#2D2D2D]/25 bg-white/70 hover:bg-white"
                    }`}
                  >
                    <span className="text-[13px] font-semibold uppercase leading-[1.2] tracking-[0.06em]">{m.name}</span>
                    <span className="text-[11px] uppercase leading-[1.35] tracking-[0.1em] text-[#6b7380]">{memberInfo[m.name].role}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 8. WHERE WE WORK ═══ */}
      <section className="sidebar-content zag-desktop-content-pad py-[88px]">
        <div className="max-w-[1100px]">
          <div className="flex items-end justify-between gap-8">
            <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
              <h2 className={`${sectionHeading} text-[#2D2D2D]`}>WHERE WE WORK</h2>
            </Reveal>
            <CtaButton href="/projects" className={ctaLight}>View Projects</CtaButton>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6">
            {regions.map((r, i) => (
              <motion.div
                key={r.code}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: EASE }}
                className={`flex min-h-[280px] flex-col rounded-[14px] border p-8 ${
                  i === 0 ? "border-[#0052A5] bg-[#0B0E0A] text-[#FCFCFC]" : "border-[#2D2D2D] bg-white text-[#2D2D2D]"
                }`}
                style={{ boxShadow: panelShadow }}
              >
                <p className={`zag-heading text-[64px] font-bold leading-none tracking-[0.04em] ${i === 0 ? "text-[#5b9bf0]" : "text-[#0052A5]"}`}>{r.code}</p>
                <h3 className="mt-6 text-[21px] font-bold uppercase tracking-[0.08em]">{r.name}</h3>
                <p className={`mt-3 text-[15px] leading-[1.65] tracking-[0.01em] ${i === 0 ? "text-[#FCFCFC]/85" : "text-[#3a4252]"}`}>{r.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-6 flex items-center justify-between gap-8 rounded-[14px] border border-[#2D2D2D]/25 bg-[#F3F5F8] px-8 py-6"
          >
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#0052A5]">Earlier experience, abroad</p>
              <p className="mt-2 text-[15px] leading-[1.6] tracking-[0.01em] text-[#3a4252]">
                Before Zagrosia, the principal designed and supervised structures across Iran.
              </p>
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              {earlierSites.map((s) => (
                <span key={s} className="rounded-[8px] border border-[#2D2D2D]/30 bg-white px-3 py-[7px] text-[12px] uppercase tracking-[0.14em]">{s}</span>
              ))}
            </div>
          </motion.div>

          <div className="mt-10 flex gap-4">
            <CtaButton href="/contact" className={ctaLight}>Work with Us</CtaButton>
            <CtaButton href="/contact" className={ctaLight}>Get In Touch</CtaButton>
          </div>
        </div>
      </section>
    </div>
  )
}
