"use client"

import { useState } from "react"
import Image from "next/image"
import { PlusCircle, MinusCircle } from "lucide-react"

const GRADIENT_BORDER = "linear-gradient(135deg, rgba(45,45,45,1) 0%, rgba(45,45,45,0.56) 26%, rgba(147,147,147,0.22) 100%)"
const CLOSED_FILL = "linear-gradient(to right, rgba(45,45,45,1) 0%, rgba(115,115,115,0.22) 100%)"

const tags = ["Steel", "Concrete", "Wood", "Masonry", "BCBC 2024", "NBCC"]

const services = [
  {
    id: 1,
    title: "Structural Design",
    image: "/images/services-building.png",
    intro: "Bridging structural engineering with advanced automation and modern digital workflows.",
    bullets: [
      "Residential structures (single-family, multi-family, townhomes)",
      "Commercial buildings (offices, retail, mixed-use)",
      "Industrial facilities and warehouses",
      "Foundation design and analysis",
      "Steel, concrete, wood, and masonry structures",
      "Structural drawings and specifications",
    ],
    tags,
  },
  { id: 2, title: "Seismic Assessment", image: "/images/seismic-crane.jpg", intro: "Comprehensive seismic evaluations following BCBC, NBCC, and EGBC standards to assess and mitigate structural risk.", bullets: [], tags: [] },
  { id: 3, title: "Building Rehabilitation", image: "/images/about-milestones-building.png", intro: "Expert structural upgrades and rehabilitation for aging and distressed buildings.", bullets: [], tags: [] },
  { id: 4, title: "Heavy Racking", image: "/images/industrial-racking.jpg", intro: "Industrial racking systems design, engineering review, and seismic compliance for warehouses and distribution centres.", bullets: [], tags: [] },
  { id: 5, title: "Building Envelope", image: "/images/glass-building.jpg", intro: "Building envelope assessments and structural integration for moisture, performance, and longevity.", bullets: [], tags: [] },
  { id: 6, title: "Specialty Reviews", image: "/images/about-core-values-building.png", intro: "Specialized structural reviews, peer reviews, and engineering consultations for unique and complex projects.", bullets: [], tags: [] },
]

export function EngineeringSolutions() {
  const [openId, setOpenId] = useState<number>(1)

  return (
    <section id="services" className="bg-[#FCFCFC] text-[#2D2D2D]">

      {/* TOP: Accordion */}
      <div className="sidebar-content px-6 pb-10 pt-12 lg:pt-20 lg:pb-14 zag-desktop-content-pad">
        <div className="relative pl-5 lg:max-w-[940px]">
          {/* Vertical fading line */}
          <div
            className="absolute left-0 top-0 w-[1.5px]"
            style={{
              height: "100%",
              background:
                "linear-gradient(to bottom, rgba(45,45,45,1) 0%, rgba(45,45,45,0.8) 30%, rgba(45,45,45,0.4) 65%, rgba(45,45,45,0) 100%)",
            }}
          />

          {/* Heading */}
          <h2 className="zag-heading mb-5 font-medium uppercase leading-[1.1] lg:font-normal lg:text-[32px] lg:leading-[1.1]" style={{ fontSize: "20px" }}>
            <span className="text-[#2D2D2D]">ENGINEERING</span>
            <br />
            <span className="text-[#2D2D2D]">SOLUTIONS</span>
          </h2>

          {/* Description */}
          <p className="mb-7 text-[12px] leading-[1.75] tracking-[0.04em] text-[#2D2D2D] lg:text-[18px]" style={{ lineHeight: 1.65 }}>
            From new structural design to complex rehabilitation, every engagement backed by 35+ years of expertise.
          </p>

          {/* Accordion */}
          <div className="w-full space-y-[6px] lg:max-w-[916px]">
            {services.map((service) => {
              const isOpen = service.id === openId
              return (
                <div key={service.id}>
                  {isOpen ? (
                    <div
                        className="rounded-[20px] bg-[#FCFCFC] px-4 pb-4 pt-3"
                        style={{
                          boxShadow: "0px 4px 19.6px 0px rgba(0,0,0,0.34)",
                          backdropFilter: "blur(61.5px)",
                          WebkitBackdropFilter: "blur(61.5px)",
                        }}
                      >
                        <button
                          className="flex w-full items-start justify-between"
                          onClick={() => setOpenId(0)}
                        >
                          <span className="flex-1 pr-2 text-left text-[14px] font-semibold tracking-[0.1em] text-[#2D2D2D] lg:text-[24px]">
                            {service.id}. {service.title}
                          </span>
                          <MinusCircle size={22} strokeWidth={2} className="mt-[2px] flex-shrink-0 text-[#2D2D2D]" />
                        </button>

                        {service.image && (
                          <div className="relative mt-3 h-[140px] w-full overflow-hidden rounded-[10px] lg:hidden">
                            <Image src={service.image} alt={service.title} fill className="object-cover" />
                          </div>
                        )}

                        <p className="mt-3 leading-[1.7] tracking-[0.06em] text-[#2D2D2D] lg:text-[16px]" style={{ fontSize: "12px" }}>
                          {service.intro}
                        </p>

                        {service.bullets.length > 0 && (
                          <>
                            <p className="mt-4 font-semibold tracking-[0.1em] text-[#2D2D2D]" style={{ fontSize: "16px" }}>
                              What We Offer
                            </p>
                            <ul className="mt-2 space-y-[5px]">
                              {service.bullets.map((b) => (
                                <li key={b} className="flex items-start gap-2 leading-[1.65] tracking-[0.06em] text-[#2D2D2D]" style={{ fontSize: "14px" }}>
                                  <span className="mt-[3px] text-[8px]">•</span>
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}

                        {service.tags.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-[6px]">
                            {service.tags.map((tag) => (
                              <span key={tag} className="rounded-full bg-[#0052A5] px-3 py-[4px] font-medium tracking-[0.06em] text-white lg:text-[14px]" style={{ fontSize: "9px" }}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                    </div>
                  ) : (
                    <button
                      className="flex h-[28px] w-full items-center justify-between rounded-[20px] px-3 transition-opacity hover:opacity-90 lg:h-[53px]"
                      style={{ background: CLOSED_FILL }}
                      onClick={() => setOpenId(service.id)}
                    >
                      <span className="text-[14px] font-medium tracking-[0.1em] text-white lg:text-[24px]">
                        {service.id}. {service.title}
                      </span>
                      <PlusCircle size={20} strokeWidth={2} className="text-white flex-shrink-0" />
                    </button>
                  )}
                </div>
              )
            })}
          </div>

          {/* Learn More */}
          <div className="mt-7">
            <a
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-[#2D2D2D] bg-transparent tracking-[0.14em] text-[#2D2D2D] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white lg:h-[44px] lg:px-8 lg:text-[14px]"
              style={{ fontSize: "9.5px", width: "119px", height: "40px" }}
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM: Building image — floats right, no box */}
      <div className="flex justify-end overflow-hidden lg:pr-[0px] -mt-10">
        <Image
          src="/images/curved-building.png"
          alt="Modern curved architectural building"
          width={1200}
          height={600}
          className="w-full object-contain lg:w-auto"
          priority
        />
      </div>
    </section>
  )
}
