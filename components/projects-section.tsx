"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { MapPin } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"

const projects = [
  {
    id: 1,
    title: "INDUSTRIAL RACKING — METRO VANCOUVER",
    description:
      "Heavy-duty pallet racking engineering review for large distribution center. Full seismic compliance.",
    tags: ["Steel", "BCBC 2024", "Seismic Z4"],
    location: "Burnaby, BC",
    image: "/images/industrial-racking.jpg",
  },
  {
    id: 2,
    title: "INDUSTRIAL RACKING — NORTH VANCOUVER",
    description:
      "Heavy-duty racking engineering review for warehouse distribution and seismic safety systems.",
    tags: ["Steel", "Warehouse", "BCBC 2024"],
    location: "Vancouver, BC",
    image: "/images/modern-building.jpg",
  },
  {
    id: 3,
    title: "INDUSTRIAL RACKING — BURNABY",
    description:
      "Structural review and seismic detailing for high-bay storage systems and industrial rack aisles.",
    tags: ["Steel", "Seismic", "Review"],
    location: "Burnaby, BC",
    image: "/images/industrial-racking.jpg",
  },
  {
    id: 4,
    title: "INDUSTRIAL RACKING — RICHMOND",
    description:
      "Code-compliant engineering assessment for warehouse racking frames, anchors, and aisle loading.",
    tags: ["Industrial", "BCBC", "Steel"],
    location: "Richmond, BC",
    image: "/images/glass-building.jpg",
  },
  {
    id: 5,
    title: "INDUSTRIAL RACKING — DELTA",
    description:
      "Engineering review for pallet storage layout, seismic bracing strategy, and operational demands.",
    tags: ["Distribution", "Steel", "Seismic"],
    location: "Delta, BC",
    image: "/images/industrial-racking.jpg",
  },
  {
    id: 6,
    title: "INDUSTRIAL RACKING — COQUITLAM",
    description:
      "Technical structural review package for large industrial storage systems and code-driven loads.",
    tags: ["Warehouse", "Review", "BCBC"],
    location: "Coquitlam, BC",
    image: "/images/modern-building.jpg",
  },
]

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
  const prevIndex = (desktopIndex - 1 + projects.length) % projects.length
  const nextIndex = (desktopIndex + 1) % projects.length

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
      <Image
        src="/images/projects-rectangle-55.png"
        alt=""
        fill
        className="object-cover"
        aria-hidden="true"
      />

      {/* ── MOBILE: building header + carousel ── */}
      <div className="lg:hidden">
        <div className="relative h-[255px] w-full overflow-hidden">
          <Image
            src="/images/projects-building-top.png"
            alt="Projects architectural background"
            fill
            className="object-cover object-top"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(13,44,96,0.18) 0%, rgba(19,38,71,0.52) 34%, rgba(19,38,71,0.84) 68%, rgba(19,38,71,0.98) 100%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[88px]"
            style={{
              background:
                "linear-gradient(180deg, rgba(19,38,71,0) 0%, rgba(19,38,71,0.34) 34%, rgba(19,38,71,0.74) 68%, rgba(19,38,71,0.96) 100%)",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-[22px] bg-white" />
          <div className="relative z-10 px-8 pb-6 pt-12">
            <h2 className="zag-heading text-[23px] leading-none text-white">PROJECTS</h2>
            <div className="relative mt-7 max-w-[292px]">
              <p className="text-[11px] leading-[1.46] tracking-[0.18em] text-white/90">
                Hover over any project for detailed
                <br />
                technical data, HUD overlay with
                <br />
                structural system, codes, loads and
                <br />
                materials.
              </p>
              <div className="absolute right-0 top-[28px] h-[14px] w-[165px] bg-black/35" />
            </div>
          </div>
        </div>

        <div className="relative -mt-[2px] pb-0 pt-1">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[56px]"
            style={{
              background:
                "linear-gradient(180deg, rgba(19,38,71,0.92) 0%, rgba(19,38,71,0.62) 52%, rgba(19,38,71,0) 100%)",
            }}
          />
          <div className="overflow-hidden px-[2px]" ref={emblaRef}>
            <div className="flex items-start">
              {projects.map((project, index) => {
                const isActive = index === selectedIndex
                return (
                  <div
                    key={project.id}
                    className={`relative min-w-0 flex-[0_0_74%] pl-[14px] transition-all duration-300 ease-out ${
                      isActive ? "z-20 pt-0" : "z-10 pt-4"
                    }`}
                  >
                    <article
                      className={`overflow-hidden rounded-[6px] bg-[#fcfcfc] text-[#2d2d2d] transition-all duration-300 ease-out ${
                        isActive
                          ? "scale-100 shadow-[0_24px_44px_rgba(0,0,0,0.24)] opacity-100"
                          : "scale-[0.925] shadow-[0_12px_24px_rgba(0,0,0,0.12)] opacity-90"
                      }`}
                    >
                      <div className="relative h-[254px] w-full">
                        <Image src={project.image} alt={project.title.replace(/\n/g, " ")} fill className="object-cover" />
                      </div>
                      <div className="px-4 pb-4 pt-3">
                        <h3 className="whitespace-pre-line text-[12px] leading-[1.25] tracking-[0.16em] text-[#3a3a3a]">{project.title}</h3>
                        <p className="mt-3 max-w-[244px] text-[11px] leading-[1.42] tracking-[0.11em] text-[#5a5a5a]">{project.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span key={tag} className="rounded-full border border-[#aab4c2] px-[9px] py-[3px] text-[9px] leading-none tracking-[0.12em] text-[#6b7380]">{tag}</span>
                          ))}
                        </div>
                        <div className="mt-4 flex items-center gap-1.5 text-[10px] tracking-[0.12em] text-[#6e7684]">
                          <MapPin size={12} strokeWidth={1.8} />
                          <span>{project.location}</span>
                        </div>
                        <div className="mt-5">
                          <a href="/projects" className="zag-outline-button min-h-[46px] w-[138px] whitespace-nowrap border-[#4e5665] px-0 text-[10px] tracking-[0.16em] text-[#384150] transition-colors hover:bg-[#384150] hover:text-white">
                            View Project
                          </a>
                        </div>
                      </div>
                    </article>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-11 flex justify-center gap-[8px]">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-[12px] w-[12px] rounded-full transition-colors ${index === selectedIndex ? "bg-[#1f69d7]" : "bg-white"}`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>

          <div className="relative mt-8 h-[148px] w-full overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-[-26px] z-10 h-[52px]" style={{ background: "linear-gradient(180deg, rgba(19,38,71,0) 0%, rgba(19,38,71,0.45) 36%, rgba(19,38,71,0.9) 68%, rgba(19,38,71,1) 100%)" }} />
            <Image src="/images/projects-rectangle-54.png" alt="" fill className="object-cover" aria-hidden="true" />
            <div className="absolute inset-x-0 top-0 h-[52px]" style={{ background: "linear-gradient(180deg, rgba(19,38,71,0.88) 0%, rgba(19,38,71,0.42) 52%, rgba(19,38,71,0) 100%)" }} />
            <div className="absolute inset-x-0 top-9 flex justify-center">
              <a href="/projects" className="zag-outline-button min-h-[50px] w-[170px] whitespace-nowrap border-white px-0 text-[10px] tracking-[0.2em] text-white transition-colors hover:bg-[#94B8DC] hover:border-[#94B8DC] hover:text-white">
                View All Projects
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── DESKTOP: header + 3-card slider ── */}
      <div className="hidden lg:block">
        {/* Desktop building background image */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <Image src="/images/projects-building-top.png" alt="" fill className="object-cover object-top" aria-hidden="true" priority />
        </div>
        {/* Full-section gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1, background: "linear-gradient(180deg, rgba(16,34,56,0.49) 0%, rgba(16,34,56,1) 96%)" }}
        />
        {/* Top header area */}
        <div className="relative" style={{ zIndex: 2 }}>
          <div className="sidebar-content pb-8 pt-14 zag-desktop-content-pad">
            <h2 className="zag-heading text-[32px] leading-none text-white">PROJECTS</h2>
            <p className="mt-4 leading-[1.6] tracking-[0.16em] text-white/85 whitespace-nowrap" style={{ fontSize: "16px" }}>
              Structural engineering projects across Western Canada — seismic compliant, code-driven, precision-engineered.
            </p>
          </div>
        </div>

        {/* 3-card slider */}
        <div className="sidebar-content relative py-12 overflow-hidden zag-desktop-content-pad" style={{ zIndex: 2 }}>

          {/* Left arrow — positioned just outside the left side card */}
          <button
            onClick={() => setDesktopIndex(prevIndex)}
            className="absolute z-40 flex h-[48px] w-[48px] -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
            style={{ left: "150px", top: "336px" }}
            aria-label="Previous project"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Right arrow — positioned just outside the right side card */}
          <button
            onClick={() => setDesktopIndex(nextIndex)}
            className="absolute z-40 flex h-[48px] w-[48px] -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
            style={{ right: "150px", top: "336px" }}
            aria-label="Next project"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Cards: left (behind) | center (front) | right (behind) */}
          <div className="flex items-start justify-start">

            {/* LEFT card — peeking from left, behind center */}
            <div className="relative flex-shrink-0 transition-all duration-300" style={{ width: "28%", zIndex: 10, marginRight: "-152px", paddingTop: "52px" }}>
              <article
                className="overflow-hidden rounded-[20px] bg-[#fcfcfc] text-[#2d2d2d] opacity-60 scale-[0.88] shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-all duration-300"
                style={{ transformOrigin: "left center", cursor: "pointer" }}
                onClick={() => setDesktopIndex(prevIndex)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setDesktopIndex(prevIndex); } }}
                tabIndex={0}
                role="button"
                aria-label="View previous project"
              >
                <div className="relative h-[220px] w-full">
                  <Image src={projects[prevIndex].image} alt={projects[prevIndex].title} fill className="object-cover" />
                </div>
                <div className="px-5 pb-5 pt-4">
                  <h3 className="text-[13px] font-semibold leading-[1.3] tracking-[0.08em] text-[#2d2d2d]">{projects[prevIndex].title}</h3>
                  <p className="mt-2 text-[10px] leading-[1.5] tracking-[0.06em] text-[#5a5a5a]">{projects[prevIndex].description}</p>
                  <div className="mt-3 flex flex-wrap gap-[5px]">
                    {projects[prevIndex].tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-[#aab4c2] px-[8px] py-[3px] leading-none tracking-[0.1em] text-[#6b7380]" style={{ fontSize: "15px" }}>{tag}</span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-[10px] tracking-[0.1em] text-[#6e7684]">
                    <MapPin size={11} strokeWidth={1.8} /><span>{projects[prevIndex].location}</span>
                  </div>
                  <div className="mt-4">
                    <a href="/projects" className="zag-outline-button min-h-[38px] w-[120px] whitespace-nowrap border-[#4e5665] px-0 text-[9px] tracking-[0.12em] text-[#384150]">Learn More</a>
                  </div>
                </div>
              </article>
            </div>

            {/* CENTER card — front, fully visible */}
            <div className="relative flex-shrink-0 transition-all duration-300" style={{ width: "80%", zIndex: 30 }}>
              <article className="overflow-hidden rounded-[20px] bg-[#fcfcfc] text-[#2d2d2d] transition-all duration-300" style={{ height: "576px", boxShadow: "-2px 4px 31px 0px rgba(0,0,0,0.68)" }}>
                <div className="relative w-full" style={{ height: "304px" }}>
                  <Image src={projects[desktopIndex].image} alt={projects[desktopIndex].title} fill className="object-cover" />
                </div>
                <div className="px-6 pb-6 pt-5">
                  <h3 style={{ fontSize: "22px" }} className="font-semibold leading-[1.3] tracking-[0.08em] text-[#2d2d2d]">{projects[desktopIndex].title}</h3>
                  <p className="mt-3 leading-[1.55] tracking-[0.07em] text-[#5a5a5a]" style={{ fontSize: "16px" }}>{projects[desktopIndex].description}</p>
                  <div className="mt-4 flex flex-wrap gap-[6px]">
                    {projects[desktopIndex].tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-[#aab4c2] px-[10px] py-[4px] text-[9px] leading-none tracking-[0.1em] text-[#6b7380]">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 tracking-[0.1em] text-[#6e7684]" style={{ fontSize: "16px" }}>
                    <MapPin size={12} strokeWidth={1.8} /><span>{projects[desktopIndex].location}</span>
                  </div>
                  <div className="mt-5">
                    <a href="/projects" className="zag-outline-button min-h-[42px] w-[140px] whitespace-nowrap border-[#4e5665] px-0 text-[10px] tracking-[0.14em] text-[#384150] transition-colors hover:bg-[#384150] hover:text-white">Learn More</a>
                  </div>
                </div>
              </article>
            </div>

            {/* RIGHT card — peeking from right, behind center */}
            <div className="relative flex-shrink-0 transition-all duration-300" style={{ width: "28%", zIndex: 10, marginLeft: "-152px", paddingTop: "52px" }}>
              <article
                className="overflow-hidden rounded-[20px] bg-[#fcfcfc] text-[#2d2d2d] opacity-60 scale-[0.88] shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-all duration-300"
                style={{ transformOrigin: "right center", cursor: "pointer" }}
                onClick={() => setDesktopIndex(nextIndex)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setDesktopIndex(nextIndex); } }}
                tabIndex={0}
                role="button"
                aria-label="View next project"
              >
                <div className="relative h-[220px] w-full">
                  <Image src={projects[nextIndex].image} alt={projects[nextIndex].title} fill className="object-cover" />
                </div>
                <div className="px-5 pb-5 pt-4">
                  <h3 className="text-[13px] font-semibold leading-[1.3] tracking-[0.08em] text-[#2d2d2d]">{projects[nextIndex].title}</h3>
                  <p className="mt-2 text-[10px] leading-[1.5] tracking-[0.06em] text-[#5a5a5a]">{projects[nextIndex].description}</p>
                  <div className="mt-3 flex flex-wrap gap-[5px]">
                    {projects[nextIndex].tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-[#aab4c2] px-[8px] py-[3px] text-[9px] leading-none tracking-[0.1em] text-[#6b7380]">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-[10px] tracking-[0.1em] text-[#6e7684]">
                    <MapPin size={11} strokeWidth={1.8} /><span>{projects[nextIndex].location}</span>
                  </div>
                  <div className="mt-4">
                    <a href="/projects" className="zag-outline-button min-h-[38px] w-[120px] whitespace-nowrap border-[#4e5665] px-0 text-[9px] tracking-[0.12em] text-[#384150]">Learn More</a>
                  </div>
                </div>
              </article>
            </div>

          </div>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-[8px]">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setDesktopIndex(index)}
                className={`h-[10px] w-[10px] rounded-full transition-colors ${index === desktopIndex ? "bg-[#1f69d7]" : "bg-white/40"}`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>

          {/* All Projects button */}
          <div className="mt-8 flex justify-center pb-4">
            <a href="/projects" className="zag-outline-button min-h-[48px] w-[200px] whitespace-nowrap border-white px-0 text-[10px] tracking-[0.2em] text-white transition-colors hover:bg-[#94B8DC] hover:border-[#94B8DC] hover:text-white">
              All Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
