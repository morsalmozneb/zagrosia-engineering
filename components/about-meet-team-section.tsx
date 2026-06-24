"use client"

import Image from "next/image"
import { useRef, useState, useEffect, useCallback } from "react"
import type { ReactNode } from "react"

function LinkedInIcon() {
  return (
    <svg width="11" height="10" viewBox="0 0 17 15" fill="none" aria-hidden="true">
      <path d="M3.56768 1.66741C3.56745 2.10941 3.37928 2.53322 3.04458 2.84561C2.70987 3.158 2.25605 3.33337 1.78295 3.33315C1.30984 3.33293 0.856212 3.15713 0.521844 2.84443C0.187476 2.53173 -0.000236329 2.10774 2.23302e-07 1.66574C0.000236775 1.22374 0.188403 0.799926 0.523106 0.487539C0.857808 0.175152 1.31163 -0.000220793 1.78473 2.08623e-07C2.25784 0.00022121 2.71147 0.176018 3.04584 0.488718C3.3802 0.801417 3.56792 1.2254 3.56768 1.66741ZM3.6212 4.56725H0.0535154V15H3.6212V4.56725ZM9.25813 4.56725H5.70829V15H9.22246V9.5253C9.22246 6.47547 13.4769 6.19216 13.4769 9.5253V15H17V8.39203C17 3.25065 10.703 3.44231 9.22246 5.96717L9.25813 4.56725Z" fill="currentColor"/>
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="11" height="9" viewBox="0 0 20 16" fill="none" aria-hidden="true">
      <path d="M2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196667 15.0217 0.000666667 14.5507 0 14V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196666 1.45067 0.000666667 2 0H18C18.55 0 19.021 0.196 19.413 0.588C19.805 0.98 20.0007 1.45067 20 2V14C20 14.55 19.8043 15.021 19.413 15.413C19.0217 15.805 18.5507 16.0007 18 16H2ZM10 9L18 4V2L10 7L2 2V4L10 9Z" fill="currentColor"/>
    </svg>
  )
}

function ContactPill({
  href,
  label,
  icon,
}: {
  href: string
  label: string
  icon: ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-[5px] rounded-full bg-[#94B8DC] px-2 text-[8px] font-medium tracking-[0.08em] text-[#FCFCFC]"
      style={{ width: "75px", height: "20px" }}
    >
      <span className="flex flex-shrink-0 items-center justify-center text-[#0052A5]">
        {icon}
      </span>
      <span>{label}</span>
    </a>
  )
}

interface TeamMember {
  name: string
  image: string
  experience: string
  degrees: string[]
  linkedIn: string
  email: string
  description: string
}

const team: TeamMember[] = [
  {
    name: "HOMAYOUN MOZNEB",
    image: "/images/Homayoun-pic-2.png",
    experience: "35+",
    degrees: ["M.Sc.", "B.Sc"],
    linkedIn: "https://www.linkedin.com/in/seyed-hassan-mozneb/",
    email: "mailto:Shmozneb@zagrosia.ca",
    description:
      "Senior Structural Engineer with over 30 years of experience leading the design, analysis, and project management of marine, industrial, commercial, and residential structures across Canada and internationally. Specializing in seismic assessments, structural rehabilitation, industrial racking systems, and specialty engineering solutions, all delivered with precision and strict compliance with BCBC, NBCC, and EGBC standards. Experienced in leading multidisciplinary teams across complex residential, institutional, and industrial projects throughout Western Canada.",
  },
  {
    name: "MEHDI MOZNEB",
    image: "/images/Mehdi-pic.png",
    experience: "11+",
    degrees: ["B.Sc"],
    linkedIn: "https://www.linkedin.com/in/mehdimozneb/",
    email: "mailto:Mehdim@zagrosia.ca",
    description:
      "Civil and Structural Technologist with experience in structural design, drafting, site reviews, and permit-support documentation for residential, commercial, and industrial projects. Skilled in preparing structural and architectural drawings, coordinating with engineers and contractors, and supporting project delivery across multiple disciplines. Proficient in AutoCAD, Revit, and industry-standard engineering software.",
  },
  {
    name: "ATENA JAHANGARD",
    image: "/images/Atena-pic.png",
    experience: "9+",
    degrees: ["B.Sc"],
    linkedIn: "#",
    email: "mailto:Atenaj@zagrosia.ca",
    description:
      "Architectural graduate with hands-on Canadian experience in drafting, building science, and construction documentation. Proficient in AutoCAD and Revit, with practical experience supporting field reviews, preparing permit packages, and coordinating across architectural and engineering teams on residential and commercial projects.",
  },
  {
    name: "MORSAL MOZNEB",
    image: "/images/Morsal-pic.png",
    experience: "13+",
    degrees: ["B.IT"],
    linkedIn: "https://www.linkedin.com/in/morsal-mozneb",
    email: "mailto:Morsalm@zagrosia.ca",
    description:
      "UX/UI Designer and Web Developer combining a Bachelor of Information Technology with current studies in New Media Design & Web Development at BCIT. Skilled in user research, wireframing, interactive prototyping, and front-end development. Experienced in designing and building digital products that are accessible, visually refined, and technically sound.",
  },
  {
    name: "FARNAZ GHOLAMI",
    image: "/images/Farnaz-pic.png",
    experience: "8+",
    degrees: ["B.Sc"],
    linkedIn: "https://www.linkedin.com/in/farnaz-gholami-4165b9345/",
    email: "mailto:Farnazgh@zagrosia.ca",
    description:
      "Creative New Media Design & Web Development designer with hands-on experience in UI/UX, graphic design, video storytelling, and web development. Skilled in transforming ideas into engaging digital experiences across brand identity, motion graphics, and interactive media. Committed to delivering purposeful design solutions that connect with audiences.",
  },
]

const SCROLL_H = 120

function ScrollableText({ text }: { text: string }) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [thumbHeight, setThumbHeight] = useState(0)
  const [thumbTop, setThumbTop] = useState(0)

  const update = useCallback(() => {
    const el = contentRef.current
    if (!el) return
    const ratio = el.clientHeight / el.scrollHeight
    const th = Math.max(20, SCROLL_H * ratio)
    setThumbHeight(th)
    setThumbTop((el.scrollTop / (el.scrollHeight - el.clientHeight)) * (SCROLL_H - th) || 0)
  }, [])

  useEffect(() => { update() }, [update])

  return (
    <div className="mt-3 flex gap-2" style={{ height: `${SCROLL_H}px` }}>
      {/* Content — native scrollbar hidden */}
      <div
        ref={contentRef}
        className="flex-1 overflow-y-scroll"
        style={{ scrollbarWidth: "none" } as React.CSSProperties}
        onScroll={update}
      >
        <p className="leading-[1.7] tracking-[0.12em] text-[#2D2D2D]" style={{ fontSize: "12px" }}>
          {text}
        </p>
      </div>
      {/* Always-visible custom scrollbar */}
      <div className="relative flex-shrink-0" style={{ width: "4px", height: `${SCROLL_H}px`, backgroundColor: "#e8edf4", borderRadius: "9999px" }}>
        <div
          style={{
            position: "absolute",
            top: `${thumbTop}px`,
            width: "4px",
            height: `${thumbHeight}px`,
            backgroundColor: "#0052A5",
            borderRadius: "9999px",
          }}
        />
      </div>
    </div>
  )
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article
      className="rounded-[20px] p-4"
      style={{
        backgroundColor: "#FCFCFC",
        boxShadow: "0px 4px 19.6px 0px rgba(0,0,0,0.34)",
        backdropFilter: "blur(61.5px)",
        WebkitBackdropFilter: "blur(61.5px)",
      }}
    >
      {/* TOP ROW: image left, stats right */}
      <div className="flex items-start gap-4">

        {/* Portrait */}
        <div
          className="relative flex-shrink-0 overflow-hidden rounded-[5px]"
          style={{ width: 170, height: 200 }}
        >
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-top"
          />
        </div>

        {/* Right column */}
        <div className="flex flex-1 flex-col gap-0 pt-3">
          {/* Experience */}
          <div>
            <p className="font-semibold leading-none tracking-[0.06em] text-[#2D2D2D]" style={{ fontSize: "14px" }}>
              {member.experience}
            </p>
            <p className="mt-[4px] font-normal tracking-[0.18em] text-[#2D2D2D]" style={{ fontSize: "10px" }}>
              Experience
            </p>
          </div>

          {/* Degrees */}
          <div className="mt-4 space-y-[4px]">
            {member.degrees.map((deg) => (
              <p
                key={deg}
                className="font-semibold leading-none tracking-[0.08em] text-[#2D2D2D]"
                style={{ fontSize: "14px" }}
              >
                {deg}
              </p>
            ))}
          </div>

          {/* Pills */}
          <div className="mt-4 space-y-[7px]">
            <ContactPill href={member.linkedIn} label="LinkedIn" icon={<LinkedInIcon />} />
            <ContactPill href={member.email} label="Email" icon={<MailIcon />} />
          </div>
        </div>
      </div>

      {/* Name */}
      <h3 className="mt-4 font-semibold uppercase leading-none tracking-[0.16em] text-[#2D2D2D]" style={{ fontSize: "16px" }}>
        {member.name}
      </h3>

      {/* Scrollable description */}
      <ScrollableText text={member.description} />

    </article>
  )
}

export function AboutMeetTeamSection() {
  return (
    <section className="bg-[#FCFCFC] px-5 pb-14 pt-10 text-[#2D2D2D]">
      {/* Heading */}
      <h2
        className="mb-7 uppercase leading-none tracking-[0.18em] text-[#2D2D2D]"
        style={{ fontSize: "20px", fontWeight: 600 }}
      >
        MEET OUR TEAM
      </h2>

      {/* Cards */}
      <div className="space-y-6">
        {team.map((member) => (
          <TeamCard key={member.name} member={member} />
        ))}
      </div>
    </section>
  )
}
