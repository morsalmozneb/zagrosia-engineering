"use client"

import { useState } from "react"
import Image from "next/image"

/* ── Icons ── */
function FilterIcon() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
      <line x1="0" y1="3" x2="22" y2="3" stroke="#2D2D2D" strokeWidth="2.5" />
      <circle cx="6" cy="3" r="2.5" fill="#FCFCFC" stroke="#2D2D2D" strokeWidth="2.5" />
      <line x1="0" y1="13" x2="22" y2="13" stroke="#2D2D2D" strokeWidth="2.5" />
      <circle cx="16" cy="13" r="2.5" fill="#FCFCFC" stroke="#2D2D2D" strokeWidth="2.5" />
    </svg>
  )
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="12" height="7" viewBox="0 0 12 7" fill="none"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M1 1l5 5 5-5" stroke="#2D2D2D" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

/* ── Filter data ── */
const expertiseItems = ["Residential", "Commercial", "Industrial", "Community"]
const servicesItems = [
  "Structural Engineering",
  "Seismic Assessment",
  "Building Rehabilitation",
  "Heavy Racking",
  "Building Envelope",
  "Specialty Reviews",
]

/* ── Project data ── */
const projects = [
  {
    id: 1,
    image: "/images/Project-Card-1.png",
    location: "Burnaby, BC",
    title: "OFFICE TOWER RENOVATION",
    description:
      "Structural retrofit and seismic strengthening for a multi-story commercial office tower to improve performance, safety, and compliance with current building standards.",
  },
  {
    id: 2,
    image: "/images/Project-Card-2.png",
    location: "Calgary, AB",
    title: "CONTEMPORARY CUSTOM RESIDENCE",
    description:
      "Full structural engineering for a luxury contemporary residence featuring open-concept layouts, cantilevered elements, and large-span architectural glazing systems.",
  },
  {
    id: 3,
    image: "/images/Project-Card-3.png",
    location: "Burnaby, BC",
    title: "FIRE & FREEZE FORT MCMURRAY",
    description:
      "Advanced structural engineering for a large-scale industrial facility with crane supports, equipment foundations, and reinforced steel systems.",
  },
  {
    id: 4,
    image: "/images/Project-Card-4.png",
    location: "Burnaby, BC",
    title: "144-UNIT TOWNHOUSE",
    description:
      "Comprehensive structural design for a large-scale townhouse complex, including foundation systems, shear walls, and gravity load analysis.",
  },
  {
    id: 5,
    image: "/images/Project-Card-5.png",
    location: "Calgary, AB",
    title: "STRATA — STONE VENEER REMEDIATION",
    description:
      "Structural assessment and remediation design for deteriorating stone veneer cladding on a multi-unit strata building.",
  },
  {
    id: 6,
    image: "/images/Project-Card-6.png",
    location: "Saskatoon, SK",
    title: "CLOVERDALE REC CENTRE",
    description:
      "Structural engineering for a community recreation centre, including long-span roof systems, gymnasium framing, and seismic design.",
  },
]

type DesktopProjectCard = {
  id: number
  image: string
  location: string
  title: string
  description?: string
  spanClassName: string
  heightClassName: string
  objectPositionClassName?: string
  titleClassName?: string
  descriptionWidthClassName?: string
}

const desktopProjectRows: DesktopProjectCard[][] = [
  [
    {
      id: 1,
      image: "/images/Project-Card-1.png",
      location: "Burnaby, BC",
      title: "OFFICE TOWER RENOVATION",
      description:
        "Structural retrofit and seismic strengthening for a multi-story commercial office tower to improve performance, safety, and compliance with current building standards.",
      spanClassName: "col-span-7",
      heightClassName: "h-[360px]",
      objectPositionClassName: "object-center",
      titleClassName: "text-[18px] leading-[1.14] tracking-[0.12em]",
      descriptionWidthClassName: "max-w-[338px]",
    },
    {
      id: 2,
      image: "/images/Project-Card-2.png",
      location: "Calgary, AB",
      title: "CONTEMPORARY CUSTOM RESIDENCE",
      description:
        "Full structural engineering for a luxury contemporary residence featuring open-concept layouts, cantilevered elements, and large-span architectural glazing systems.",
      spanClassName: "col-span-5",
      heightClassName: "h-[360px]",
      objectPositionClassName: "object-center",
      titleClassName: "text-[17px] leading-[1.16] tracking-[0.12em]",
      descriptionWidthClassName: "max-w-[236px]",
    },
  ],
  [
    {
      id: 3,
      image: "/images/Project-Card-3.png",
      location: "Burnaby, BC",
      title: "FIRE & FREEZE FORT MCMURRAY",
      spanClassName: "col-span-4",
      heightClassName: "h-[222px]",
      objectPositionClassName: "object-center",
    },
    {
      id: 4,
      image: "/images/Project-Card-4.png",
      location: "Burnaby, BC",
      title: "144-UNIT TOWNHOUSE",
      spanClassName: "col-span-4",
      heightClassName: "h-[222px]",
      objectPositionClassName: "object-center",
    },
    {
      id: 5,
      image: "/images/Project-Card-5.png",
      location: "Calgary, AB",
      title: "STRATA — STONE VENEER REMEDIATION",
      spanClassName: "col-span-4",
      heightClassName: "h-[222px]",
      objectPositionClassName: "object-center",
    },
  ],
  [
    {
      id: 6,
      image: "/images/Project-Card-6.png",
      location: "Saskatoon, SK",
      title: "CLOVERDALE REC CENTRE",
      spanClassName: "col-span-6",
      heightClassName: "h-[222px]",
      objectPositionClassName: "object-center",
    },
    {
      id: 7,
      image: "/images/Project-Card-7.png",
      location: "Saskatoon, SK",
      title: "INDUSTRIAL RACKING",
      spanClassName: "col-span-6",
      heightClassName: "h-[222px]",
      objectPositionClassName: "object-center",
    },
  ],
  [
    {
      id: 8,
      image: "/images/Project-Card-8.png",
      location: "Saskatoon, SK",
      title: "UNION PARK EPS 5773",
      spanClassName: "col-span-4",
      heightClassName: "h-[222px]",
      objectPositionClassName: "object-center",
    },
    {
      id: 9,
      image: "/images/Project-Card-9.png",
      location: "Vancouver, BC",
      title: "HIGH-RISE REHABILITATION",
      spanClassName: "col-span-4",
      heightClassName: "h-[222px]",
      objectPositionClassName: "object-center",
    },
    {
      id: 10,
      image: "/images/Project-Card-10.png",
      location: "Coquitlam, BC",
      title: "MULTI-FAMILY RESIDENTIAL COMPLEX",
      spanClassName: "col-span-4",
      heightClassName: "h-[222px]",
      objectPositionClassName: "object-center",
    },
  ],
  [
    {
      id: 11,
      image: "/images/Project-Card-11.png",
      location: "Saskatoon, SK",
      title: "BRIDGE REHABILITATION PROJECT",
      spanClassName: "col-span-4",
      heightClassName: "h-[222px]",
      objectPositionClassName: "object-center",
    },
    {
      id: 12,
      image: "/images/Project-Card-12.png",
      location: "Vancouver, BC",
      title: "CONCRETE PARKADE RESTORATION",
      spanClassName: "col-span-4",
      heightClassName: "h-[222px]",
      objectPositionClassName: "object-center",
    },
    {
      id: 13,
      image: "/images/Project-Card-13.png",
      location: "Coquitlam, BC",
      title: "FOUNDATION AND SHORING DESIGN",
      spanClassName: "col-span-4",
      heightClassName: "h-[222px]",
      objectPositionClassName: "object-center",
    },
  ],
  [
    {
      id: 14,
      image: "/images/Project-Card-14.png",
      location: "Burnaby, BC",
      title: "MIXED-USE TOWER DEVELOPMENT",
      spanClassName: "col-span-4",
      heightClassName: "h-[222px]",
      objectPositionClassName: "object-center",
    },
    {
      id: 15,
      image: "/images/Project-Card-15.png",
      location: "Burnaby, BC",
      title: "COMMUNITY CENTRE EXPANSION",
      spanClassName: "col-span-4",
      heightClassName: "h-[222px]",
      objectPositionClassName: "object-center",
    },
    {
      id: 16,
      image: "/images/Project-Card-16.png",
      location: "Vancouver, BC",
      title: "SEISMIC UPGRADE PROGRAM",
      spanClassName: "col-span-4",
      heightClassName: "h-[222px]",
      objectPositionClassName: "object-center",
    },
  ],
]

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

function FilterChevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={`transition-transform duration-200 ${open ? "rotate-0" : "-rotate-90"}`}
    >
      <path d="M2 4l4 4 4-4" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 2l10 10M12 2L2 12" stroke="#2D2D2D" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function DesktopProjectCardItem({
  image,
  location,
  title,
  description,
  spanClassName,
  heightClassName,
  objectPositionClassName = "object-center",
  titleClassName = "text-[13px] leading-[1.22] tracking-[0.10em]",
  descriptionWidthClassName = "max-w-[340px]",
}: DesktopProjectCard) {
  return (
    <article
      className={`${spanClassName} group cursor-pointer overflow-hidden rounded-[18px] shadow-[0_12px_28px_rgba(22,22,22,0.14)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(22,22,22,0.28)]`}
    >
      <div className={`relative ${heightClassName} overflow-hidden rounded-[18px] bg-[#303030]`}>
        <Image src={image} alt={title.replace(/\n/g, " ")} fill className={`object-cover ${objectPositionClassName} transition-transform duration-500 group-hover:scale-[1.03]`} />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(48,48,48,0) 0%, rgba(48,48,48,0) 25%, rgba(48,48,48,0.3) 45%, rgba(48,48,48,0.75) 65%, rgba(48,48,48,0.95) 85%, rgba(48,48,48,1) 100%)",
          }}
        />
        {/* Darker overlay on hover so description is readable */}
        <div className="absolute inset-0 bg-[#1a1a1a]/0 transition-all duration-300 group-hover:bg-[#1a1a1a]/50" />

        <div className="absolute inset-x-0 bottom-0 px-[18px] pb-[14px] pt-2 text-white">
          {description ? (
            <p
              className={`mb-[8px] leading-[1.38] tracking-[0.12em] text-white/88 ${descriptionWidthClassName} max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-[120px] group-hover:opacity-100`}
              style={{ fontSize: "14px" }}
            >
              {description}
            </p>
          ) : null}
          <div className="flex items-end justify-between gap-[12px]">
            <div>
              <div className="mb-[9px] inline-flex items-center gap-[4px] rounded-full bg-[#0052A5] px-[7px] py-[2px] text-[8px] tracking-[0.10em] text-white backdrop-blur-[6px]">
                <LocationPin />
                <span>{location}</span>
              </div>
              <h3 className={`line-clamp-2 font-semibold text-white group-hover:line-clamp-none group-hover:whitespace-pre-line ${titleClassName}`}>
                {title}
              </h3>
            </div>
            <a
              href="/projects"
              className="inline-flex h-[30px] flex-shrink-0 translate-y-2 items-center rounded-full border border-white/90 px-[14px] tracking-[0.14em] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#94B8DC] hover:border-[#94B8DC]"
              style={{ fontSize: "10px" }}
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}

export function ProjectsHeroSection() {
  const [filterPanelOpen, setFilterPanelOpen] = useState(false)
  const [expertiseOpen, setExpertiseOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [selectedExpertise, setSelectedExpertise] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  function closeAll() {
    setFilterPanelOpen(false)
    setExpertiseOpen(false)
    setServicesOpen(false)
    setSelectedExpertise(null)
    setSelectedService(null)
  }

  return (
    <section className="bg-[#FCFCFC] text-[#2D2D2D]">
      <div className="lg:hidden px-5 pb-14 pt-24">
        {/* Label */}
        <p className="mb-4 text-[10px] font-medium tracking-[0.14em] text-[#2D2D2D]">
          PORTFOLIO
        </p>

        {/* Heading + body + stats with vertical line */}
        <div className="relative pl-[12px]">
          <div
            className="absolute left-0 top-[8px] w-px"
            style={{
              height: "calc(100% - 8px)",
              background: "linear-gradient(180deg, rgba(45,45,45,1) 0%, rgba(45,45,45,0.82) 38%, rgba(45,45,45,0.42) 72%, rgba(45,45,45,0) 100%)",
            }}
          />

        <h1
          className="mb-5 text-[24px] font-black uppercase leading-[1.25] tracking-[0.12em]"
          style={{ fontFamily: "'Momo Trust Sans', 'Inter', sans-serif" }}
        >
          <span className="text-[#2D2D2D]">CANADIAN</span>
          <br />
          <span className="text-[#0052A5]">PROJECTS</span>
        </h1>

        {/* Body */}
        <p className="mb-7 text-[12px] leading-[1.75] tracking-[0.08em] text-[#2D2D2D]">
          Explore our portfolio of structural engineering projects across Western Canada — from high-rise retrofits to custom residences and industrial facilities.
        </p>

        {/* Stats */}
        <div className="mb-8 flex items-start">
          <div className="flex-1">
            <p className="text-[26px] font-black leading-none tracking-[0.02em] text-[#2D2D2D]">200+</p>
            <p className="mt-1 text-[10px] tracking-[0.14em] text-[#2D2D2D]">Projects</p>
          </div>
          <div className="flex-1">
            <p className="text-[26px] font-black leading-none tracking-[0.02em] text-[#2D2D2D]">35+</p>
            <p className="mt-1 text-[10px] tracking-[0.14em] text-[#2D2D2D]">Experience</p>
          </div>
          <div className="flex-1">
            <p className="text-[26px] font-black leading-none tracking-[0.02em] text-[#2D2D2D]">3</p>
            <p className="mt-1 text-[10px] tracking-[0.14em] text-[#2D2D2D]">Provinces</p>
          </div>
        </div>
        </div>{/* end vertical line wrapper */}

        {/* Filter toggle */}
        <button
          className="mb-5 flex items-center gap-[8px]"
          onClick={() => setFilterPanelOpen(!filterPanelOpen)}
          aria-label="Toggle filters"
        >
          <FilterIcon />
          <span className="text-[10px] font-medium tracking-[0.14em] text-[#2D2D2D]">FILTER</span>
        </button>

        {filterPanelOpen && (
          <div className="mb-8 overflow-hidden rounded-[10px] border border-[#DEDEDE]">
            <div>
              <button
                className="flex w-full items-center justify-between px-4 py-3 text-left"
                onClick={() => { setExpertiseOpen(!expertiseOpen); setServicesOpen(false) }}
              >
                <span className="text-[11px] font-semibold tracking-[0.10em] text-[#2D2D2D]">Expertise</span>
                <ChevronDown open={expertiseOpen} />
              </button>
              {expertiseOpen && (
                <div className="border-t border-[#DEDEDE] bg-[#FAFAFA]">
                  {expertiseItems.map((item) => (
                    <div key={item} className="border-b border-[#EFEFEF] px-4 py-[10px] last:border-b-0">
                      <span className="text-[11px] tracking-[0.08em] text-[#2D2D2D]">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-[#DEDEDE]">
              <button
                className="flex w-full items-center justify-between px-4 py-3 text-left"
                onClick={() => { setServicesOpen(!servicesOpen); setExpertiseOpen(false) }}
              >
                <span className="text-[11px] font-semibold tracking-[0.10em] text-[#2D2D2D]">Services</span>
                <ChevronDown open={servicesOpen} />
              </button>
              {servicesOpen && (
                <div className="border-t border-[#DEDEDE] bg-[#FAFAFA]">
                  {servicesItems.map((item) => (
                    <div key={item} className="border-b border-[#EFEFEF] px-4 py-[10px] last:border-b-0">
                      <span className="text-[11px] tracking-[0.08em] text-[#2D2D2D]">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-[#DEDEDE]">
              <button
                className="flex w-full items-center justify-between px-4 py-3 text-left"
                onClick={closeAll}
              >
                <span className="text-[11px] tracking-[0.10em] text-[#2D2D2D]">Clear Filters</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 1l8 8M9 1l-8 8" stroke="#2D2D2D" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        )}

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
                className="absolute overflow-hidden rounded-[20px] transition-all duration-500"
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
                <div className="absolute bottom-0 left-0 right-0 px-4 pb-5">
                  <div className="mb-[9px] inline-flex items-center gap-[4px] rounded-full bg-[#0052A5] px-[7px] py-[2px] text-[8px] tracking-[0.10em] text-white backdrop-blur-[6px]">
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
                      <a
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-full border border-white bg-transparent tracking-[0.06em] text-white transition-colors hover:bg-[#0052A5] hover:border-[#0052A5]"
                        style={{ fontSize: "9.5px", width: "120px", height: "30px" }}
                      >
                        Learn More
                      </a>
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
          <p className="mt-2 text-center text-[11px] font-semibold tracking-[0.18em] text-[#0052A5] uppercase">
            {projects[activeIndex].title}
          </p>
        </div>

        {/* Mobile bottom CTA */}
        <div className="mt-[76px]">
          <p className="mb-3 text-[10px] font-medium tracking-[0.14em] text-[#2D2D2D]">START YOUR PROJECT</p>
          <h2
            className="mb-6 uppercase leading-[1.15] tracking-[0.12em] text-[#2D2D2D]"
            style={{ fontSize: "20px", fontWeight: 600, fontFamily: "'Momo Trust Sans', 'Inter', sans-serif" }}
          >
            DO YOU WANT TO START YOUR PROJECT?
          </h2>
          <p className="mb-8 leading-[1.85] tracking-[0.06em] text-[#2D2D2D]" style={{ fontSize: "12px" }}>
            Every project is unique. Contact us to discuss your specific requirements, and discover how we can help.
          </p>
          <div className="flex justify-start gap-[15px]">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[#2D2D2D] bg-transparent tracking-[0.06em] text-[#2D2D2D] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white"
              style={{ fontSize: "9.5px", width: "142px", height: "40px" }}
            >
              Request a Service
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[#2D2D2D] bg-transparent tracking-[0.06em] text-[#2D2D2D] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white"
              style={{ fontSize: "9.5px", width: "142px", height: "40px" }}
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      <div className="sidebar-content hidden lg:block">
        <div className="pb-[98px] pt-[148px] zag-desktop-content-pad">
          <div className="grid grid-cols-12 gap-x-[12px]">
            <div className="col-span-12">
              <div className="relative pl-5">
                <div
                  className="absolute left-0 top-[4px] bottom-0 w-[4px]"
                  style={{
                    background: "linear-gradient(180deg, #0B0E0A 0%, rgba(150,150,150,0) 100%)",
                  }}
                />

                <p className="mb-[20px] text-[20px] font-bold uppercase tracking-[0.26em] text-[#2D2D2D]">
                  PORTFOLIO
                </p>

                <h1
                  className="text-[52px] font-bold uppercase leading-[0.96] tracking-[0.06em]"
                  style={{ fontFamily: "'Momo Trust Sans', 'Inter', sans-serif" }}
                >
                  <span className="mb-[8px] block text-[#2D2D2D]">CANADIAN</span>
                  <span className="block text-[#0052A5]">PROJECTS</span>
                </h1>

                <p className="mt-[22px] leading-[1.5] tracking-[0.17em] text-[#2D2D2D]" style={{ fontSize: "18px" }}>
                  Hover over any project for detailed technical data, HUD overlay with<br />
                  structural system, codes, loads and materials.
                </p>

                <div className="mt-[42px] flex items-start gap-[170px]">
                  <div>
                    <p className="text-[32px] font-semibold leading-none tracking-[0.05em] text-[#2D2D2D]">200+</p>
                    <p className="mt-[14px] text-[24px] tracking-[0.18em] text-[#2D2D2D]">Projects</p>
                  </div>
                  <div>
                    <p className="text-[32px] font-semibold leading-none tracking-[0.05em] text-[#2D2D2D]">35+</p>
                    <p className="mt-[14px] text-[24px] tracking-[0.18em] text-[#2D2D2D]">Experience</p>
                  </div>
                  <div>
                    <p className="text-[32px] font-semibold leading-none tracking-[0.05em] text-[#2D2D2D]">3</p>
                    <p className="mt-[14px] text-[24px] tracking-[0.18em] text-[#2D2D2D]">Province</p>
                  </div>
                </div>

              </div>
            </div>

            <div className="col-span-12 mt-[60px]">
              <button
                className="inline-flex items-center gap-[10px] cursor-pointer"
                aria-label="Filters"
                onClick={() => {
                  const nextOpen = !filterPanelOpen
                  setFilterPanelOpen(nextOpen)
                  if (!nextOpen) {
                    setExpertiseOpen(false)
                    setServicesOpen(false)
                  }
                }}
              >
                <FilterIcon />
                <span className="text-[14px] font-semibold tracking-[0.18em] text-[#2D2D2D]">FILTER</span>
              </button>
            </div>

            {filterPanelOpen ? (
              <div className="col-span-12 mt-[10px]">
                <div className="w-full overflow-hidden rounded-[18px] border border-[#2D2D2D]/10 bg-[#FCFCFC]/95 shadow-[0_12px_30px_rgba(45,45,45,0.18)] backdrop-blur-[10px]">
                  <div className="px-[16px] py-[12px]">
                    <button
                      className="flex w-full cursor-pointer items-center justify-between text-left text-[16px] font-semibold tracking-[0.14em] text-[#2D2D2D]"
                      onClick={() => {
                        setExpertiseOpen(!expertiseOpen)
                        setServicesOpen(false)
                      }}
                    >
                      <span>
                        Expertise
                        {selectedExpertise ? <span className="ml-3 text-[#2D2D2D]/55">{selectedExpertise}</span> : null}
                      </span>
                      <FilterChevron open={expertiseOpen} />
                    </button>
                    <div className="mt-[10px] h-px bg-[#2D2D2D]/32" />
                    {expertiseOpen ? (
                      <div className="space-y-[8px] pt-[10px] text-[11px] tracking-[0.14em] text-[#2D2D2D]/86">
                        {expertiseItems.map((item) => (
                          <button
                            key={item}
                            className={`block text-left ${selectedExpertise === item ? "font-semibold text-[#0052A5]" : ""}`}
                            onClick={() => setSelectedExpertise(selectedExpertise === item ? null : item)}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <div className="px-[16px] py-[12px]">
                    <button
                      className="flex w-full cursor-pointer items-center justify-between text-left text-[16px] font-semibold tracking-[0.14em] text-[#2D2D2D]"
                      onClick={() => {
                        setServicesOpen(!servicesOpen)
                        setExpertiseOpen(false)
                      }}
                    >
                      <span>
                        Services
                        {selectedService ? <span className="ml-3 text-[#2D2D2D]/55">{selectedService}</span> : null}
                      </span>
                      <FilterChevron open={servicesOpen} />
                    </button>
                    <div className="mt-[10px] h-px bg-[#2D2D2D]/32" />
                    {servicesOpen ? (
                      <div className="space-y-[8px] pt-[10px] text-[11px] tracking-[0.14em] text-[#2D2D2D]/86">
                        {servicesItems.map((item) => (
                          <button
                            key={item}
                            className={`block text-left ${selectedService === item ? "font-semibold text-[#0052A5]" : ""}`}
                            onClick={() => setSelectedService(selectedService === item ? null : item)}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <div className="px-[16px] py-[12px]">
                    <button
                      className="flex w-full cursor-pointer items-center justify-between text-left text-[16px] tracking-[0.14em] text-[#2D2D2D]"
                      onClick={closeAll}
                    >
                      <span>Clear The Filter</span>
                      <CloseIcon />
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="col-span-12 mt-[14px] space-y-[12px]">
              {desktopProjectRows.map((row, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-12 gap-[12px]">
                  {row.map((project) => (
                    <DesktopProjectCardItem key={project.id} {...project} />
                  ))}
                </div>
              ))}
            </div>

            <div className="col-span-12 mt-[78px]">
              <h2 className="text-[32px] uppercase leading-[1.1] tracking-[0.18em] text-[#2D2D2D]">
                DO YOU WANT TO START YOU PROJECT?
              </h2>
              <p className="mt-[18px] text-[16px] leading-[1.45] tracking-[0.14em] text-[#2D2D2D]">
                Every project is unique. Contact us to discuss your specific requirements, and Discover how we can help.
              </p>
              <a
                href="/contact"
                className="mt-[26px] inline-flex h-[40px] items-center rounded-full border border-[#2D2D2D]/50 px-[18px] text-[16px] tracking-[0.16em] text-[#2D2D2D] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white"
              >
                Request a Service
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
