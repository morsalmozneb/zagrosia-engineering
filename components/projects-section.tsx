"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
import { Reveal } from "./scroll-reveal"
import { CtaButton } from "@/components/cta-button"
import { projects as allProjects } from "@/lib/projects-data"

const EASE = [0.0, 0.0, 0.2, 1] as const

const featuredProjects = allProjects.filter((p) => p.featured)

const projects = featuredProjects.map((p) => ({
  id: p.id,
  title: p.title,
  description: p.summary,
  tags: p.tags,
  location: p.location,
  image: p.image,
}))

export function ProjectsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: false,
    dragFree: false,
    loop: true,
    startIndex: 1,
  })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const [desktopIndex, setDesktopIndex] = useState(0)
  const [direction, setDirection] = useState(1) // 1 = next, -1 = prev
  const prevIndex = (desktopIndex - 1 + projects.length) % projects.length
  const nextIndex = (desktopIndex + 1) % projects.length

  const goTo = (idx: number, dir: number) => {
    setDirection(dir)
    setDesktopIndex(idx)
  }

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on("select", onSelect)
    onSelect()
  }, [emblaApi, onSelect])

  return (
    <section id="projects" className="relative overflow-hidden bg-[#132647] text-white lg:overflow-visible">
      <div className="lg:block hidden">
        <Image
          src="/images/projects-rectangle-55.png"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
      </div>

      {/* ── MOBILE: building header + carousel ── */}
      <div className="lg:hidden">
        <div className="relative w-full overflow-hidden" style={{ height: "200px" }}>
          {/* Building photo */}
          <Image
            src="/images/projects-building-top.jpg"
            alt="Projects architectural background"
            fill
            className="object-cover object-top"
            priority
          />
          {/* Full gradient overlay — fades into section bg */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(19,38,71,0.49) 0%, rgba(19,38,71,1) 100%)",
            }}
          />
          {/* Text content */}
          <div className="relative z-10 px-8 pt-12">
            <Reveal variant="fadeUp" delay={0.05} duration={0.65}>
              <h2 className="zag-heading font-medium leading-none text-white lg:font-normal" style={{ fontSize: "20px" }}>PROJECTS</h2>
            </Reveal>
            <Reveal delay={0.18} duration={0.65}>
              <p className="mt-5 leading-[1.56] tracking-[0.18em] text-white/90" style={{ fontSize: "12px" }}>
                Hover over any project for detailed technical data, HUD overlay with structural system, codes, loads and materials.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="-mt-[2px] pb-0 pt-1">
          {/* Top gradient */}
          <div className="relative">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[56px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(19,38,71,0.92) 0%, rgba(19,38,71,0.62) 52%, rgba(19,38,71,0) 100%)",
              }}
            />
          {/* Bottom gradient — covers the clip line at the bottom of the embla container */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[80px]"
            style={{
              background: "linear-gradient(180deg, rgba(19,38,71,0) 0%, rgba(19,38,71,1) 100%)",
            }}
          />
          <div className="overflow-hidden px-[2px]" ref={emblaRef}>
            <div className="flex items-start">
              {projects.map((project, index) => {
                const isActive = index === selectedIndex
                return (
                  <motion.div
                    key={project.id}
                    className={`relative min-w-0 flex-[0_0_269px] pl-[14px] transition-all duration-300 ease-out ${
                      isActive ? "z-20 pt-0" : "z-10 pt-4"
                    }`}
                    initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: false, amount: 0.05 }}
                    transition={{ duration: 0.55, delay: 0.1 + index * 0.06, ease: EASE }}
                  >
                    <article
                      className={`overflow-hidden rounded-[14px] bg-[#fcfcfc] text-[#2d2d2d] transition-all duration-300 ease-out ${
                        isActive
                          ? "scale-100 shadow-[0_24px_44px_rgba(0,0,0,0.24)] opacity-100"
                          : "scale-[0.925] shadow-[0_12px_24px_rgba(0,0,0,0.12)] opacity-90"
                      }`}
                      style={{ height: "457px" }}
                    >
                      <div className="relative w-full" style={{ height: "205px" }}>
                        <Image src={project.image} alt={project.title.replace(/\n/g, " ")} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                      </div>
                      <div className="px-4 pb-4 pt-3">
                        <h3 className="whitespace-pre-line leading-[1.25] tracking-[0.05em] text-[#3a3a3a]" style={{ fontSize: "14px" }}>{project.title}</h3>
                        <p className="mt-3 leading-[1.42] tracking-[0.11em] text-[#5a5a5a]" style={{ fontSize: "12px" }}>{project.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span key={tag} className="rounded-[8px] border border-[#aab4c2] px-[9px] py-[3px] leading-none tracking-[0.12em] text-[#6b7380]" style={{ fontSize: "12px" }}>{tag}</span>
                          ))}
                        </div>
                        <div className="mt-4 flex items-center gap-1.5 tracking-[0.12em] text-[#6e7684]" style={{ fontSize: "12px" }}>
                          <MapPin size={12} strokeWidth={1.8} />
                          <span>{project.location}</span>
                        </div>
                        <div className="mt-4">
                          <CtaButton
                            href="/projects"
                            className="inline-flex items-center justify-center zag-cta rounded-[10px] border border-[#FCFCFC] text-[#FCFCFC] font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[40px] px-5 text-[12px] lg:h-[44px] lg:px-7 lg:text-[14px]"
                            style={{ fontSize: "12px", width: "130px", height: "36px" }}
                          >
                            View Project
                          </CtaButton>
                        </div>
                      </div>
                    </article>
                  </motion.div>
                )
              })}
            </div>
          </div>
          </div>{/* end relative wrapper */}

          <div className="mt-11 flex justify-center gap-[8px]">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-[12px] w-[12px] rounded-[10px] transition-colors ${index === selectedIndex ? "bg-[#1f69d7]" : "bg-white"}`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-center pb-10">
            <CtaButton href="/projects" className="inline-flex items-center justify-center zag-cta rounded-[10px] border border-[#FCFCFC] text-[#FCFCFC] font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[40px] px-5 text-[12px] lg:h-[44px] lg:px-7 lg:text-[14px]">
              View All Projects
            </CtaButton>
          </div>

        </div>
      </div>

      {/* ── DESKTOP: header + 3-card slider ── */}
      <div className="hidden lg:flex lg:min-h-[100svh] lg:flex-col">
        {/* Desktop building background image */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <Image src="/images/projects-building-top.jpg" alt="" fill className="object-cover object-top" aria-hidden="true" priority />
        </div>
        {/* Full-section gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1, background: "linear-gradient(180deg, rgba(16,34,56,0.49) 0%, rgba(16,34,56,1) 96%)" }}
        />
        {/* Header: title + subtitle left, All Projects link right */}
        <div className="relative" style={{ zIndex: 2 }}>
          <div className="sidebar-content flex items-end justify-between gap-6 pb-0 pt-[clamp(20px,5vh,48px)] zag-desktop-content-pad">
            <div>
              <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
                <h2 className="zag-heading text-[28px] leading-none text-white">PROJECTS</h2>
              </Reveal>
              <Reveal delay={0.2} duration={0.65}>
                <p className="mt-[clamp(6px,1.4vh,14px)] leading-[1.6] tracking-[0.04em] text-white/90" style={{ fontSize: "16px" }}>
                  Structural engineering projects across Western Canada.
                </p>
              </Reveal>
            </div>
            <Link
              href="/projects"
              className="mb-1 inline-flex items-center gap-2 border-b border-white pb-[3px] text-[16px] tracking-[0.04em] text-white transition-opacity hover:opacity-80"
            >
              All Projects <ArrowRight size={17} strokeWidth={1.8} />
            </Link>
          </div>
        </div>

        {/* Stage: selected project big in front, neighbours smaller and tucked behind */}
        <div className="sidebar-content relative flex flex-1 flex-col justify-center pb-[clamp(10px,2.5vh,28px)] pt-[clamp(10px,2.5vh,28px)] zag-desktop-content-pad" style={{ zIndex: 2 }}>
          <div className="relative mx-auto h-[clamp(290px,54vh,500px)] w-full max-w-[1060px]">
            {[
              { role: "prev", idx: prevIndex },
              { role: "next", idx: nextIndex },
              { role: "active", idx: desktopIndex },
            ].map(({ role, idx }) => {
              const p = projects[idx]
              const active = role === "active"
              const short = p.title.split(",")[0].toLowerCase()
              const go = () => goTo(idx, role === "prev" ? -1 : 1)
              const pos =
                role === "active"
                  ? { left: "23.5%", top: 0, height: "100%", width: "53%", zIndex: 20 }
                  : role === "prev"
                    ? { left: 0, top: "13%", height: "74%", width: "46%", zIndex: 10 }
                    : { right: 0, top: "13%", height: "74%", width: "46%", zIndex: 10 }
              return (
                <motion.article
                  key={`${role}-${idx}`}
                  className={`absolute flex flex-col overflow-hidden rounded-[20px] [isolation:isolate] ${active ? "bg-white text-[#132647]" : "bg-[#a9b6cb] text-[#132647]"}`}
                  style={{
                    ...pos,
                    borderRadius: 20,
                    cursor: active ? "default" : "pointer",
                    boxShadow: active ? "0 22px 50px rgba(0,0,0,0.45)" : "0 12px 28px rgba(0,0,0,0.3)",
                  }}
                  initial={{ opacity: 0, x: direction * 24 }}
                  animate={{ opacity: active ? 1 : 0.55, x: 0 }}
                  whileHover={active ? undefined : { opacity: 0.8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  onClick={active ? undefined : go}
                  onKeyDown={active ? undefined : (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go() } }}
                  tabIndex={active ? undefined : 0}
                  role={active ? undefined : "button"}
                  aria-label={active ? undefined : `View ${p.title}`}
                >
                  <div className={`relative w-full flex-shrink-0 overflow-hidden ${active ? "h-[52%]" : "h-[66%]"}`}>
                    <Image src={p.image} alt={p.title} fill sizes="(max-width: 1280px) 40vw, 560px" className="object-cover" />
                  </div>
                  {active ? (
                    <div className="flex flex-1 flex-col px-[clamp(16px,2.4vh,26px)] pb-[clamp(10px,2.2vh,22px)] pt-[clamp(8px,1.8vh,18px)]">
                      <h3 className="line-clamp-2 text-[clamp(18px,3.2vh,28px)] font-bold capitalize leading-[1.15] tracking-[0.01em]">{short}</h3>
                      <p className="mt-[clamp(4px,1vh,10px)] line-clamp-3 text-[clamp(12px,1.9vh,16px)] leading-[1.45] text-[#1d2a44]">{p.description}</p>
                      <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                        <div className="flex min-w-0 items-center gap-2 text-[clamp(12px,1.9vh,16px)] text-[#3a64b8]">
                          <MapPin size={16} strokeWidth={1.8} className="flex-shrink-0" /><span className="truncate">{p.location}</span>
                        </div>
                        <Link href="/projects" className="inline-flex flex-shrink-0 items-center gap-1.5 border-b border-[#1f69d7] pb-[2px] text-[clamp(12px,1.9vh,16px)] text-[#1f69d7]">
                          View project <ArrowRight size={15} strokeWidth={2} />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-1 flex-col px-[clamp(14px,2vh,22px)] pt-[clamp(6px,1.4vh,14px)]">
                      <h3 className="line-clamp-2 text-[clamp(13px,2.1vh,18px)] font-bold capitalize leading-[1.2]">{short}</h3>
                      <div className="mt-auto flex items-center gap-2 pb-[clamp(8px,1.8vh,18px)] text-[clamp(11px,1.8vh,15px)] text-[#3a5a96]">
                        <MapPin size={15} strokeWidth={1.8} className="flex-shrink-0" /><span className="truncate">{p.location}</span>
                      </div>
                    </div>
                  )}
                </motion.article>
              )
            })}
          </div>

          {/* Arrows + dots */}
          <div className="mt-[clamp(10px,2.6vh,28px)] flex items-center justify-center gap-6">
            <motion.button
              onClick={() => goTo(prevIndex, -1)}
              className="flex h-[48px] w-[48px] items-center justify-center rounded-full border border-white text-white"
              aria-label="Previous project"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
              whileTap={{ scale: 0.93 }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </motion.button>
            <div className="flex gap-[14px]">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index, index > desktopIndex ? 1 : -1)}
                  className={`h-[10px] w-[10px] rounded-full transition-colors ${index === desktopIndex ? "bg-[#1f69d7]" : "bg-white/50"}`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
            <motion.button
              onClick={() => goTo(nextIndex, 1)}
              className="flex h-[48px] w-[48px] items-center justify-center rounded-full border border-white text-white"
              aria-label="Next project"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
              whileTap={{ scale: 0.93 }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
