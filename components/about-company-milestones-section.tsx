"use client"

import { useState } from "react"
import Image from "next/image"

const milestonePages = [
  {
    top: {
      year: "1989",
      title: "B.Sc. Civil Engineering",
      description: "Foundational expertise in concrete, steel & masonry systems",
    },
    bottom: {
      year: "1993",
      title: "M.Sc. Structural Engineering",
      description: "Led complex rehabilitation and new construction projects",
    },
  },
  {
    top: {
      year: "1993–1995 & 2002–2003",
      title: "Structural Designer",
      description:
        "Designed steel and concrete petrochemical structures, fabrication drawings, and technical reports.",
    },
    bottom: {
      year: "1995–2002",
      title: "Head of Civil & Structural Department",
      description: "Led design and restoration of critical concrete and marine structures.",
    },
  },
  {
    top: {
      year: "2003–2017",
      title: "CEO & Senior Structural Engineer",
      description:
        "Led structural design and project management for residential and commercial developments.",
    },
    bottom: {
      year: "2018–2019",
      title: "Construction Operation Certificate, BCIT",
      description:
        "Led structural design and project delivery for residential, industrial, and institutional projects using advanced engineering software.",
    },
  },
  {
    top: {
      year: "2019–Present",
      title: "Professional Structural Engineer",
      description:
        "Led structural design and project delivery for residential, industrial, and institutional projects using advanced engineering software.",
    },
    bottom: {
      year: "2019–2022",
      title: "Structural Engineering Certificate (SEABC)",
      description: "Led design and restoration of critical concrete and marine structures.",
    },
  },
]

function MilestoneCard({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div
      className="h-[118px] w-[293px] shrink-0 rounded-[20px] p-px"
      style={{
        background: "linear-gradient(135deg, rgba(45,45,45,1) 0%, rgba(147,147,147,0.22) 100%)",
      }}
    >
      <div className="flex h-full flex-col rounded-[19px] bg-[#FCFCFC] px-4 py-4">
        <h3 className="max-w-[232px] text-[12px] font-semibold leading-[1.14] tracking-[0.12em] text-[#2D2D2D]">
          {title}
        </h3>
        <p className="mt-5 max-w-[248px] text-[11px] leading-[1.36] tracking-[0.115em] text-[#3A3A3A]">
          {description}
        </p>
      </div>
    </div>
  )
}

export function AboutCompanyMilestonesSection() {
  const [pageIndex, setPageIndex] = useState(0)
  const currentPage = milestonePages[pageIndex]

  const prevPage = () => {
    setPageIndex((current) => (current === 0 ? milestonePages.length - 1 : current - 1))
  }

  const nextPage = () => {
    setPageIndex((current) => (current === milestonePages.length - 1 ? 0 : current + 1))
  }

  return (
    <section className="overflow-hidden bg-[#FCFCFC] px-6 pb-0 pt-11 text-[#2D2D2D]">
      <h2 className="zag-heading text-[22px] leading-[1.14] tracking-[0.14em] text-[#2D2D2D]">
        COMPANY
        <br />
        MILESTONES
      </h2>

      <div className="mt-6">
        <div className="relative w-[342px] max-w-full">
          <MilestoneCard title={currentPage.top.title} description={currentPage.top.description} />
          <span className="absolute right-0 top-[2px] w-[104px] text-right text-[10px] font-medium leading-[1.12] tracking-[0.12em] text-[#2D2D2D]">
            {currentPage.top.year}
          </span>
        </div>

        <div className="mt-3 flex w-[342px] max-w-full items-center">
          <button
            type="button"
            onClick={prevPage}
            className="flex h-[29px] w-[29px] flex-shrink-0 items-center justify-center rounded-full bg-[#2D2D2D] text-[16px] leading-none text-[#FCFCFC]"
            aria-label="Previous milestones"
          >
            &#8249;
          </button>
          <div className="h-px flex-1 bg-[#2D2D2D]/48" />
          <button
            type="button"
            onClick={nextPage}
            className="flex h-[29px] w-[29px] flex-shrink-0 items-center justify-center rounded-full bg-[#2D2D2D] text-[16px] leading-none text-[#FCFCFC]"
            aria-label="Next milestones"
          >
            &#8250;
          </button>
        </div>

        <div className="mt-[13px] w-[293px]">
          <MilestoneCard title={currentPage.bottom.title} description={currentPage.bottom.description} />
        </div>
        <span className="mt-[2px] block text-[12px] font-medium tracking-[0.13em] text-[#2D2D2D]">
          {currentPage.bottom.year}
        </span>
      </div>

      <div className="relative -mx-6 mt-3 h-[300px] w-[calc(100%+3rem)] overflow-hidden">
        <Image
          src="/images/about-milestones-building.png"
          alt="Company milestones architectural building"
          fill
          className="object-cover object-left-top"
        />
      </div>

      <div className="-mx-6 border-b border-[#2D2D2D]/22" />
    </section>
  )
}
