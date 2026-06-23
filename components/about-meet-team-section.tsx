import Image from "next/image"
import type { ReactNode } from "react"

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[11px] w-[11px] fill-current">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.48 1h.02C3.87 1 4.98 2.12 4.98 3.5ZM.5 8h4V24h-4V8Zm7 0h3.83v2.19h.05c.53-1.01 1.83-2.07 3.77-2.07 4.03 0 4.77 2.65 4.77 6.1V24h-4v-7.8c0-1.86-.03-4.25-2.59-4.25-2.59 0-2.99 2.02-2.99 4.11V24h-4V8Z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[11px] w-[11px] fill-none stroke-current stroke-[1.8]">
      <path d="M3 6.75h18v10.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.25V6.75Z" />
      <path d="m4.5 8.25 7.5 6 7.5-6" />
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
      className="flex h-[28px] w-full items-center gap-[7px] rounded-full bg-[#94B8DC] px-3 text-[9px] font-medium tracking-[0.08em] text-[#FCFCFC]"
    >
      <span className="flex h-[17px] w-[17px] flex-shrink-0 items-center justify-center rounded-full bg-[#5290BF] text-[#FCFCFC]">
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

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div
      className="rounded-[20px] p-px"
      style={{
        background:
          "linear-gradient(135deg, rgba(45,45,45,1) 0%, rgba(45,45,45,0.56) 26%, rgba(147,147,147,0.22) 100%)",
      }}
    >
      <article className="rounded-[19px] bg-[#FCFCFC] p-4">

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
              <p className="text-[22px] font-semibold leading-none tracking-[0.06em] text-[#2D2D2D]">
                {member.experience}
              </p>
              <p className="mt-[4px] text-[9px] font-normal tracking-[0.18em] text-[#2D2D2D]">
                Experience
              </p>
            </div>

            {/* Degrees */}
            <div className="mt-4 space-y-[4px]">
              {member.degrees.map((deg) => (
                <p
                  key={deg}
                  className="text-[17px] font-semibold leading-none tracking-[0.08em] text-[#2D2D2D]"
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
        <h3 className="mt-4 text-[13px] font-bold uppercase leading-none tracking-[0.16em] text-[#2D2D2D]">
          {member.name}
        </h3>

        {/* Scrollable description */}
        <div className="zag-team-scroll mt-3 h-[120px] overflow-y-scroll pr-3">
          <p className="text-[11px] leading-[1.7] tracking-[0.12em] text-[#2D2D2D]">
            {member.description}
          </p>
        </div>

      </article>
    </div>
  )
}

export function AboutMeetTeamSection() {
  return (
    <section className="bg-[#FCFCFC] px-5 pb-14 pt-10 text-[#2D2D2D]">
      {/* Heading */}
      <h2
        className="mb-7 text-[22px] font-light uppercase leading-none tracking-[0.18em] text-[#2D2D2D]"
        style={{ fontFamily: "'Momo Trust Sans', 'Inter', sans-serif" }}
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
