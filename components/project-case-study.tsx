"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowLeft, ShieldCheck } from "lucide-react"
import { AboutPageHeader } from "@/components/about-page-header"
import { Footer } from "@/components/footer"
import { Reveal } from "@/components/scroll-reveal"
import { CtaButton } from "@/components/cta-button"
import { splitTitle, type Project } from "@/lib/projects-data"
import { ProjectGallery } from "@/components/project-gallery"
import { Band, Block, DARK_BG, EASE, FadeLine, bodyCls, eyebrowCls } from "@/components/case-study-parts"

const ctaLight =
  "inline-flex items-center justify-center zag-cta rounded-[10px] border border-[#2D2D2D] text-[#2D2D2D] font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[44px] px-7 text-[14px]"
const ctaDark =
  "inline-flex items-center justify-center zag-cta rounded-[10px] border border-[#FCFCFC] text-[#FCFCFC] font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[44px] px-7 text-[14px]"

const PIN = (
  <path d="M5.5 12C5.5 12 9.5 8.3 9.5 4.9C9.5 2.75 7.71 1 5.5 1C3.29 1 1.5 2.75 1.5 4.9C1.5 8.3 5.5 12 5.5 12Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
)

export function ProjectCaseStudy({ project }: { project: Project }) {
  const reduced = useReducedMotion()
  const [line1, line2] = splitTitle(project.title)

  // Bands alternate dark / light down the page, starting with the dark hero.
  const bands: ((dark: boolean) => React.ReactNode)[] = []

  // ── OVERVIEW + DETAILS
  bands.push((dark) => (
    <Band dark={dark}>
      <Block dark={dark} eyebrow="The project" title="Project overview">
        <div className="grid gap-[clamp(24px,4vw,56px)] lg:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-4">
            {project.overview.map((para, i) => (
              <Reveal key={i} variant="fadeUp" delay={0.15 + i * 0.07} duration={0.65}>
                <p className={bodyCls(dark)}>{para}</p>
              </Reveal>
            ))}
          </div>
          <motion.aside
            className={`relative overflow-hidden rounded-[22px] p-[clamp(18px,2.6vh,28px)] ${dark ? "border border-white/15 bg-white/[0.06]" : "bg-white"}`}
            style={{ boxShadow: dark ? "0 24px 50px -18px rgba(0,0,0,0.75)" : "0 2px 4px rgba(11,18,38,0.06), 0 26px 50px -18px rgba(11,18,38,0.3)" }}
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          >
            <motion.span
              aria-hidden
              className="absolute inset-x-0 top-0 h-[4px] origin-left bg-gradient-to-r from-[#0052A5] to-[#5b9bf0]"
              initial={reduced ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5, ease: EASE }}
            />
            <p className={`mb-2 ${eyebrowCls(dark)}`}>Project details</p>
            <ul>
              {project.facts.map((fact, i) => (
                <motion.li
                  key={fact.label}
                  className={`py-[clamp(8px,1.5vh,14px)] ${i > 0 ? (dark ? "border-t border-white/12" : "border-t border-[#2D2D2D]/10") : ""}`}
                  initial={reduced ? false : { opacity: 0, x: 14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.4 + i * 0.1, ease: EASE }}
                >
                  <span className={`block text-[11px] font-bold uppercase tracking-[0.22em] ${dark ? "text-[#5b9bf0]" : "text-[#0052A5]"}`}>{fact.label}</span>
                  <span className={`mt-1 block text-[16px] leading-[1.4] tracking-[0.02em] ${dark ? "text-[#FCFCFC]" : "text-[#2D2D2D]"}`}>{fact.value}</span>
                </motion.li>
              ))}
            </ul>
          </motion.aside>
        </div>
      </Block>
    </Band>
  ))

  // ── SITE PHOTOS
  if (project.gallery && project.gallery.length > 0) {
    bands.push((dark) => <ProjectGallery photos={project.gallery!} title={project.title} dark={dark} />)
  }

  // ── ENGINEERING FOCUS
  if (project.focus && project.focus.length > 0) {
    bands.push((dark) => (
      <Band dark={dark}>
        <Block dark={dark} eyebrow="What we looked at" title="Engineering focus">
          <div className="grid gap-[clamp(14px,2vw,24px)] lg:grid-cols-2">
            {project.focus!.map((item, i) => (
              <motion.div
                key={item.title}
                className={`group relative overflow-hidden rounded-[22px] p-[clamp(20px,3.2vh,34px)] ${dark ? "border border-white/15 bg-white/[0.06]" : "bg-white"}`}
                style={{ boxShadow: dark ? "0 24px 50px -18px rgba(0,0,0,0.75)" : "0 2px 4px rgba(11,18,38,0.06), 0 26px 50px -18px rgba(11,18,38,0.3)" }}
                initial={reduced ? false : { opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.75, delay: 0.15 + i * 0.14, ease: EASE }}
                whileHover={reduced ? undefined : { y: -6 }}
              >
                <motion.span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[4px] origin-left bg-gradient-to-r from-[#0052A5] to-[#5b9bf0]"
                  initial={reduced ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.45 + i * 0.14, ease: EASE }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 -top-3 select-none text-[clamp(72px,10vh,104px)] font-bold leading-none"
                  style={{ color: "transparent", WebkitTextStroke: dark ? "1px rgba(91,155,240,0.35)" : "1px rgba(0,82,165,0.22)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className={`relative mb-3 ${eyebrowCls(dark)}`}>{i === 0 ? "Focus" : "Consideration"}</p>
                <h3 className={`relative mb-3 text-[18px] font-bold uppercase leading-[1.2] tracking-[0.04em] ${dark ? "text-[#FCFCFC]" : "text-[#2D2D2D]"}`}>{item.title}</h3>
                <p className={`relative ${bodyCls(dark)}`}>{item.body}</p>
              </motion.div>
            ))}
          </div>
        </Block>
      </Band>
    ))
  }

  // ── SCOPE OF WORK
  if (project.scope && project.scope.length > 0) {
    bands.push((dark) => (
      <Band dark={dark}>
        <Block dark={dark} eyebrow="What was delivered" title={project.scopeHeading ?? "Scope of work"}>
          <div className="grid gap-x-[clamp(24px,4vw,56px)] gap-y-[clamp(14px,2.4vh,26px)] lg:grid-cols-2">
            {project.scope!.map((item, i) => (
              <motion.div
                key={item.label}
                className="flex items-start gap-4"
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1 + (i % 6) * 0.08, ease: EASE }}
              >
                <span className="mt-[3px] flex h-[28px] w-[28px] flex-shrink-0 items-center justify-center rounded-[10px] bg-[#0052A5] shadow-[0_8px_18px_-6px_rgba(0,82,165,0.7)]">
                  <svg width="12" height="10" viewBox="0 0 10 8" fill="none">
                    <motion.path
                      d="M1 4l2.5 2.5L9 1"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={reduced ? false : { pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.35 + (i % 6) * 0.08 }}
                    />
                  </svg>
                </span>
                <div>
                  <h3 className={`text-[16px] font-bold leading-[1.5] tracking-[0.02em] ${dark ? "text-[#FCFCFC]" : "text-[#2D2D2D]"}`}>{item.label}</h3>
                  <p className={bodyCls(dark)}>{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Block>
      </Band>
    ))
  }

  // ── ABOUT THIS PROJECT (attribution) + way back
  bands.push((dark) => (
    <Band dark={dark}>
      <Block dark={dark} eyebrow="Good to know" title="About this project">
        <motion.div
          className={`flex items-start gap-5 rounded-[22px] p-[clamp(20px,3.2vh,34px)] ${dark ? "border border-white/15 bg-white/[0.06]" : "bg-white"}`}
          style={{ boxShadow: dark ? "0 24px 50px -18px rgba(0,0,0,0.75)" : "0 2px 4px rgba(11,18,38,0.06), 0 26px 50px -18px rgba(11,18,38,0.3)" }}
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
        >
          <span className={`flex h-[44px] w-[44px] flex-shrink-0 items-center justify-center rounded-[12px] ${dark ? "bg-[#0052A5]/40 text-[#9cc4f7]" : "bg-[#0052A5]/10 text-[#0052A5]"}`}>
            <ShieldCheck className="h-[22px] w-[22px]" strokeWidth={1.6} />
          </span>
          <div>
            <p className={`mb-2 ${eyebrowCls(dark)}`}>{project.badge}</p>
            <p className={bodyCls(dark)}>{project.note}</p>
          </div>
        </motion.div>
        <Reveal variant="scaleUp" delay={0.3} duration={0.55} className="mt-7">
          <CtaButton href="/projects" className={dark ? ctaDark : ctaLight}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to projects
          </CtaButton>
        </Reveal>
      </Block>
    </Band>
  ))

  return (
    <main className="w-full overflow-hidden bg-[#07080A] lg:overflow-visible">
      <div className="relative">
        <AboutPageHeader />

        {/* ── HERO (dark) ── */}
        <section className="relative overflow-hidden text-[#FCFCFC]" style={{ background: DARK_BG }}>
          <div aria-hidden className="pointer-events-none absolute -right-40 -top-24 h-[520px] w-[520px] rounded-full bg-[#0052A5]/30 blur-[130px]" />
          <div className="sidebar-content zag-desktop-content-pad relative px-5 pb-[clamp(36px,7vh,80px)] pt-[104px] lg:px-0 lg:pt-[clamp(112px,17vh,160px)]">
            <div className="grid max-w-[1180px] items-center gap-[clamp(28px,4vw,64px)] lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative pl-5">
                <FadeLine dark />
                <Reveal variant="fadeUp" delay={0.02} duration={0.5}>
                  <Link href="/projects" className="mb-5 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.24em] text-[#FCFCFC]/55 transition-colors hover:text-[#5b9bf0]">
                    <ArrowLeft className="h-[14px] w-[14px]" /> Back to projects
                  </Link>
                </Reveal>
                <Reveal variant="fadeUp" delay={0.05} duration={0.6}>
                  <p className={`mb-3 ${eyebrowCls(true)}`}>{project.badge}</p>
                </Reveal>
                <Reveal variant="fadeLeft" delay={0.1} duration={0.7}>
                  <h1 className="zag-heading text-[clamp(26px,3.1vw,40px)] uppercase leading-[1.1] text-[#FCFCFC]">
                    {line1}
                    {line2 ? (<><br /><span className="text-[#5b9bf0]">{line2}</span></>) : null}
                  </h1>
                </Reveal>
                <Reveal delay={0.2} duration={0.65}>
                  <div className="mt-5 inline-flex items-center gap-[6px] rounded-[8px] bg-[#0052A5] px-[10px] py-[4px] text-[12px] tracking-[0.10em] text-white">
                    <svg width="10" height="12" viewBox="0 0 11 13" fill="none">{PIN}<circle cx="5.5" cy="4.9" r="1.35" fill="white" /></svg>
                    {project.location}
                  </div>
                </Reveal>
                <Reveal delay={0.25} duration={0.65}>
                  <p className={`mt-4 max-w-[560px] ${bodyCls(true)}`}>{project.summary}</p>
                </Reveal>
                {project.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((t, i) => (
                      <motion.span
                        key={t}
                        className="rounded-[8px] border border-[#FCFCFC]/35 px-3 py-[5px] text-[12px] font-bold uppercase tracking-[0.18em] text-[#FCFCFC]/85"
                        initial={reduced ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.45 + i * 0.08, ease: EASE }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                )}
              </div>

              {/* photo card with offset plate, same finish as the About career card */}
              <motion.div
                className="relative"
                initial={reduced ? false : { opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
              >
                <div aria-hidden className="pointer-events-none absolute -bottom-[14px] left-[18px] right-[-14px] top-[18px] rounded-[26px] bg-gradient-to-br from-[#0052A5]/35 to-[#0052A5]/5" />
                <div
                  className="relative aspect-[4/3] max-h-[clamp(240px,50vh,460px)] w-full overflow-hidden rounded-[22px] bg-[#0B1226] ring-1 ring-white/20"
                  style={{ boxShadow: "0 2px 4px rgba(11,18,38,0.18), 0 14px 30px -6px rgba(11,18,38,0.5), 0 36px 70px -14px rgba(0,82,165,0.45)" }}
                >
                  <motion.div
                    className="absolute inset-0"
                    initial={reduced ? false : { clipPath: "inset(0 0 0 100%)", scale: 1.18 }}
                    animate={{ clipPath: "inset(0 0 0 0%)", scale: 1 }}
                    transition={{ duration: 1.3, delay: 0.3, ease: EASE }}
                  >
                    <Image src={project.image} alt={project.title} fill sizes="(max-width: 1024px) 100vw, 560px" className="object-cover object-center" priority />
                  </motion.div>
                  <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#0B1226]/60 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {bands.map((render, i) => (
          <div key={i}>{render(i % 2 === 1)}</div>
        ))}
      </div>
      <Footer />
    </main>
  )
}
