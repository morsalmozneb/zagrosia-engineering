"use client"

import { useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Reveal } from "./scroll-reveal"
import { CtaButton } from "@/components/cta-button"
import { BlueprintSeparator } from "./blueprint-separator"
import { coreValues, milestones, team } from "./about-desktop-page"

const EASE = [0.22, 1, 0.36, 1] as const

// Hero media. Swap HERO_VIDEO for the new clip when it is ready (e.g. "/videos/about-hero.mp4").
const HERO_VIDEO: string | null = null
const HERO_IMAGE = "/videos/hero-green-mountains-poster.jpg"

const ctaLight =
  "inline-flex items-center justify-center zag-cta rounded-[10px] border border-[#2D2D2D] text-[#2D2D2D] font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[44px] px-7 text-[14px]"
const ctaDark =
  "inline-flex items-center justify-center zag-cta rounded-[10px] border border-[#FCFCFC] text-[#FCFCFC] font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[44px] px-7 text-[14px]"
const ctaSmall =
  "inline-flex flex-1 items-center justify-center whitespace-nowrap zag-cta rounded-[10px] border border-[#2D2D2D] text-[#2D2D2D] font-medium tracking-[0.08em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[36px] px-4 text-[12px]"

const eyebrow = "text-[14px] font-bold uppercase tracking-[0.24em] text-[#0052A5]"
const sectionHeading = "zag-heading text-[28px] leading-none tracking-[0.04em]"

const memberRoles: Record<string, string> = {
  "SEYED HASSAN MOZNEB": "Principal & Senior Structural Engineer",
  "MEHDI MOZNEB": "Civil & Structural Consultant",
  "ATENA JAHANGARD": "Architectural Consultant",
  "MORSAL MOZNEB": "UX/UI Designer & Web Developer",
  "FARNAZ GHOLAMI": "Digital & Creative Director",
}

const heroStats = [
  { value: "35+", label: "Years" },
  { value: "M.Sc.", label: "Structural" },
  { value: "EGBC", label: "Compliant" },
]

const whoRows = ["Residential", "Commercial", "Industrial", "Institutional"]

const regions = [
  { code: "BC", name: "British Columbia", text: "Home province — design, assessment, and field reviews under BCBC & EGBC." },
  { code: "AB", name: "Alberta", text: "Licensed structural services for residential, commercial, and industrial projects." },
  { code: "SK", name: "Saskatchewan", text: "Licensed structural services across the prairies, from assessment to rehabilitation." },
]

export function AboutRedesignDesktop() {
  const reduced = useReducedMotion()
  const [valueIndex, setValueIndex] = useState(2)
  const [mileIndex, setMileIndex] = useState(0)
  const [teamIndex, setTeamIndex] = useState(1)

  const value = coreValues[valueIndex]
  const milestone = milestones[mileIndex]
  const member = team[teamIndex]
  const principal = team[0]
  const principalBio = principal.description.split(". ")[0] + "."

  return (
    <div className="hidden bg-[#FCFCFC] text-[#2D2D2D] lg:block">
      {/* ═══ 1. HERO ═══ */}
      <section className="relative h-[min(100svh,820px)] min-h-[560px] overflow-hidden text-[#FCFCFC]">
        <Image src={HERO_IMAGE} alt="" fill priority className="object-cover" aria-hidden="true" />
        {HERO_VIDEO && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={HERO_VIDEO}
            poster={HERO_IMAGE}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        )}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(8,14,26,0.55) 0%, rgba(8,14,26,0.25) 40%, rgba(8,14,26,0.85) 100%)" }}
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
                <p className="mt-4 text-[18px] uppercase tracking-[0.3em] text-[#FCFCFC]">The firm, drawn to scale</p>
              </Reveal>
              <Reveal delay={0.3} duration={0.65}>
                <p className="mt-7 max-w-[520px] border-l-2 border-[#FCFCFC] pl-5 text-[17px] leading-[1.65] tracking-[0.01em] text-[#FCFCFC]/95">
                  Named for the Zagros Mountains — a range built by pressure, held by structure.
                </p>
              </Reveal>
            </div>
            <div className="hidden min-w-[190px] flex-col gap-5 pb-1 xl:flex">
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

      {/* ═══ 2. WHO WE ARE ═══ */}
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
              <p className={`mb-4 ${eyebrow}`}>Who we are</p>
            </Reveal>
            <Reveal variant="fadeLeft" delay={0.1} duration={0.7}>
              <h2 className="zag-heading mb-7 text-[36px] font-bold uppercase leading-[1.08] tracking-[0.03em]">
                Structural <span className="text-[#0052A5]">engineering</span> excellence
              </h2>
            </Reveal>
            <div className="space-y-5">
              <Reveal delay={0.2} duration={0.65}>
                <p className="text-[17px] leading-[1.72] tracking-[0.01em]">
                  At Zagrosia Engineering, we believe structural engineering is more than calculations and drawings. It is about understanding how structures behave, how they perform throughout their service life, and how thoughtful engineering solutions can improve safety, functionality, resilience, and long-term value.
                </p>
              </Reveal>
              <Reveal delay={0.28} duration={0.65}>
                <p className="text-[17px] leading-[1.72] tracking-[0.01em]">
                  We provide structural engineering services for residential, commercial, industrial, and institutional projects, delivering practical, code-compliant, and constructible solutions tailored to each project&apos;s unique requirements.
                </p>
              </Reveal>
              <Reveal delay={0.34} duration={0.65}>
                <p className="text-[17px] leading-[1.72] tracking-[0.01em]">
                  From new construction to existing building rehabilitation, our work is guided by sound engineering judgment, technical excellence, and a commitment to public safety.
                </p>
              </Reveal>
            </div>
          </div>
          <div className="self-center border-t-2 border-[#2D2D2D]">
            {whoRows.map((row, i) => (
              <motion.a
                key={row}
                href="/services"
                initial={reduced ? false : { opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: EASE }}
                className="group flex items-center justify-between border-b border-[#2D2D2D]/20 py-[22px] transition-colors hover:text-[#0052A5]"
              >
                <span className="zag-heading text-[22px] font-bold uppercase tracking-[0.05em]">{row}</span>
                <ArrowRight size={20} strokeWidth={1.8} className="transition-transform group-hover:translate-x-1" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. DRAWING → BUILT SEPARATOR ═══ */}
      <BlueprintSeparator />

      {/* ═══ 4. PRINCIPAL ═══ */}
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
                <p className="mt-3 text-[13px] uppercase tracking-[0.24em] text-[#FCFCFC]/75">Principal · Senior Structural Engineer</p>
              </Reveal>
              <Reveal delay={0.22} duration={0.65}>
                <p className="mt-6 max-w-[560px] text-[17px] leading-[1.7] tracking-[0.01em] text-[#FCFCFC]/92">{principalBio}</p>
              </Reveal>
              <div className="mt-8 grid max-w-[560px] grid-cols-3 border-y border-[#FCFCFC]/25">
                {[
                  { value: "35+", label: "Experience" },
                  { value: "200+", label: "Projects" },
                  { value: "8+", label: "Canada" },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: EASE }}
                    className={`py-5 ${i > 0 ? "border-l border-[#FCFCFC]/25 pl-6" : ""}`}
                  >
                    <p className="text-[34px] font-semibold leading-none tracking-[0.06em]">{s.value}</p>
                    <p className="mt-3 text-[12px] uppercase tracking-[0.18em] text-[#FCFCFC]/80">{s.label}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 grid max-w-[560px] grid-cols-2 gap-10">
                <div>
                  <h3 className="mb-3 text-[13px] font-bold uppercase tracking-[0.24em] text-[#5b9bf0]">Education</h3>
                  <ul className="space-y-2 text-[15px] leading-[1.5] tracking-[0.04em]">
                    {["M.Sc. Structural Engineering", "B.Sc. Civil Engineering"].map((item) => (
                      <li key={item} className="border-b border-[#FCFCFC]/15 pb-2">{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3 text-[13px] font-bold uppercase tracking-[0.24em] text-[#5b9bf0]">Certifications</h3>
                  <ul className="space-y-2 text-[15px] leading-[1.5] tracking-[0.04em]">
                    {["Professional Engineer (P.Eng.)", "Structural Engineering Certificate (SEABC)", "Construction Operation Certificate"].map((item) => (
                      <li key={item} className="border-b border-[#FCFCFC]/15 pb-2">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-9 flex gap-4">
                <CtaButton href="/files/resume-homayoun.pdf" target="_blank" rel="noopener noreferrer" className={ctaDark}>View Resume</CtaButton>
                <CtaButton href="/contact" className={ctaDark}>Contact</CtaButton>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-[#FCFCFC]" />
      </section>

      {/* ═══ 5. MISSION & VISION ═══ */}
      <section className="sidebar-content zag-desktop-content-pad py-[88px]">
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
      </section>

      {/* ═══ 6. CORE VALUES ═══ */}
      <section className="bg-[#F3F5F8] py-[88px]">
        <div className="sidebar-content zag-desktop-content-pad">
          <div className="max-w-[1100px]">
            <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
              <h2 className={`${sectionHeading} mb-10 text-[#2D2D2D]`}>CORE VALUES</h2>
            </Reveal>
            <div className="grid grid-cols-[1fr_1.15fr] overflow-hidden rounded-[14px] border border-[#2D2D2D] bg-white" style={{ boxShadow: "0 4px 19.6px rgba(0,0,0,0.18)" }}>
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
        </div>
      </section>

      {/* ═══ 7. COMPANY MILESTONES ═══ */}
      <section className="sidebar-content zag-desktop-content-pad py-[88px]">
        <div className="max-w-[1100px]">
          <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
            <h2 className={`${sectionHeading} mb-12 text-[#2D2D2D]`}>COMPANY MILESTONES</h2>
          </Reveal>

          {/* timeline */}
          <div className="relative mb-10">
            <div className="absolute left-0 right-0 top-[9px] h-[2px] bg-[#2D2D2D]" />
            <div className="relative grid" style={{ gridTemplateColumns: `repeat(${milestones.length}, minmax(0, 1fr))` }}>
              {milestones.map((m, i) => {
                const active = i === mileIndex
                const label = i === milestones.length - 1 ? "NOW" : m.year.slice(0, 4)
                return (
                  <button
                    key={m.year}
                    onClick={() => setMileIndex(i)}
                    aria-label={`${m.year}: ${m.title}`}
                    aria-current={active}
                    className="group flex flex-col items-start gap-3 text-left"
                  >
                    <span
                      className={`h-5 w-5 rounded-full border-2 transition-colors ${
                        active ? "border-[#0052A5] bg-[#0052A5]" : "border-[#2D2D2D] bg-[#FCFCFC] group-hover:border-[#0052A5]"
                      }`}
                    />
                    <span className={`text-[13px] font-semibold tracking-[0.14em] ${active ? "text-[#0052A5]" : "text-[#6b7380]"}`}>{label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* selected milestone */}
          <div className="grid grid-cols-[0.8fr_1.7fr] overflow-hidden rounded-[14px] border border-[#2D2D2D] bg-white" style={{ boxShadow: "0 4px 19.6px rgba(0,0,0,0.18)" }}>
            <div className="flex items-start bg-[#EEF2F7] px-10 py-10">
              <AnimatePresence mode="wait">
                <motion.p
                  key={milestone.year}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="zag-heading text-[48px] font-bold leading-[1.05] tracking-[0.03em]"
                >
                  {milestone.year}
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="border-l border-[#2D2D2D] px-12 py-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={milestone.year}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <h3 className="zag-heading text-[26px] font-bold uppercase leading-[1.15] tracking-[0.03em]">{milestone.title}</h3>
                  <p className="mt-4 text-[17px] leading-[1.65] tracking-[0.01em] text-[#3a4252]">{milestone.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* project cards for that period */}
          <AnimatePresence mode="wait">
            <motion.div
              key={milestone.year}
              className="mt-6 grid grid-cols-4 gap-5"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {milestone.projects.map((p) => (
                <article key={p.name} className="overflow-hidden rounded-[14px] border border-[#2D2D2D]/25 bg-white" style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.12)" }}>
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image src={p.image} alt={p.name} fill sizes="260px" className="object-cover" />
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#0052A5]">{p.type}</p>
                    <h4 className="mt-2 text-[17px] font-semibold uppercase leading-[1.2] tracking-[0.05em]">{p.name}</h4>
                    <p className="mt-2 text-[13px] tracking-[0.08em] text-[#6b7380]">{p.period}</p>
                  </div>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══ 8. MEET OUR TEAM ═══ */}
      <section className="bg-[#F3F5F8] py-[88px]">
        <div className="sidebar-content zag-desktop-content-pad">
          <div className="max-w-[1100px]">
            <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
              <h2 className={`${sectionHeading} mb-10 text-[#2D2D2D]`}>MEET OUR TEAM</h2>
            </Reveal>

            <div className="grid grid-cols-[400px_1fr] overflow-hidden rounded-[14px] border border-[#2D2D2D] bg-white" style={{ boxShadow: "0 4px 19.6px rgba(0,0,0,0.18)" }}>
              <div className="relative min-h-[460px] bg-[#EEF2F7]">
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
                    <p className="mt-3 text-[13px] uppercase tracking-[0.22em] text-[#0052A5]">{memberRoles[member.name]}</p>
                    <p className="mt-6 text-[15.5px] leading-[1.65] tracking-[0.01em] text-[#3a4252]">{member.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {[`${member.experience} Years`, ...member.degrees].map((chip) => (
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
                    <span className="text-[11px] uppercase leading-[1.35] tracking-[0.1em] text-[#6b7380]">{memberRoles[m.name]}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 9. WHERE WE WORK ═══ */}
      <section className="sidebar-content zag-desktop-content-pad py-[88px]">
        <div className="max-w-[1100px]">
          <div className="flex items-end justify-between gap-8">
            <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
              <h2 className={`${sectionHeading} text-[#2D2D2D]`}>WHERE WE WORK</h2>
            </Reveal>
            <CtaButton href="/projects" className={ctaLight}>View Projects</CtaButton>
          </div>
          <Reveal delay={0.15} duration={0.65}>
            <p className="mt-6 max-w-[760px] text-[17px] leading-[1.75] tracking-[0.02em]">
              Zagrosia Engineering is licensed and insured to provide structural engineering services across{" "}
              <span className="font-semibold">British Columbia</span>, <span className="font-semibold">Alberta</span>, and{" "}
              <span className="font-semibold">Saskatchewan</span>. Our team is equipped to handle projects throughout these provinces.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-3 gap-6">
            {regions.map((r, i) => (
              <motion.div
                key={r.code}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: EASE }}
                className={`flex min-h-[300px] flex-col rounded-[14px] border p-8 ${
                  i === 0 ? "border-[#0052A5] bg-[#0B0E0A] text-[#FCFCFC]" : "border-[#2D2D2D] bg-white text-[#2D2D2D]"
                }`}
                style={{ boxShadow: "0 4px 19.6px rgba(0,0,0,0.18)" }}
              >
                <p className={`zag-heading text-[64px] font-bold leading-none tracking-[0.04em] ${i === 0 ? "text-[#5b9bf0]" : "text-[#0052A5]"}`}>{r.code}</p>
                <h3 className="mt-6 text-[21px] font-bold uppercase tracking-[0.08em]">{r.name}</h3>
                <p className={`mt-3 text-[15px] leading-[1.65] tracking-[0.01em] ${i === 0 ? "text-[#FCFCFC]/85" : "text-[#3a4252]"}`}>{r.text}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 flex gap-4">
            <CtaButton href="/contact" className={ctaLight}>Work with Us</CtaButton>
            <CtaButton href="/contact" className={ctaLight}>Get In Touch</CtaButton>
          </div>
        </div>
      </section>
    </div>
  )
}
