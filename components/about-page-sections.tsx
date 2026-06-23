import Image from "next/image"

export function AboutHeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FCFCFC] px-6 pb-0 pt-24">
      <p className="mb-4 text-[10px] font-medium tracking-[0.14em] text-[#2D2D2D]">WHO WE ARE</p>

      <div className="relative pl-[12px]">
        <div
          className="absolute left-0 top-[8px] w-px"
          style={{
            height: "calc(100% - 8px)",
            background:
              "linear-gradient(180deg, rgba(45,45,45,1) 0%, rgba(45,45,45,0.82) 38%, rgba(45,45,45,0.42) 72%, rgba(45,45,45,0) 100%)",
          }}
        />

        <h1
          className="text-[24px] leading-[1.02] text-[#2D2D2D]"
          style={{
            fontFamily: 'var(--zag-heading)',
            fontWeight: 900,
            letterSpacing: '0.12em',
          }}
        >
          ENGINEERING
          <br />
          <span className="text-[#0052A5]">EXCELLENCE</span>
          <br />
          REDEFINED
        </h1>

        <div className="mt-6 max-w-[292px] space-y-4">
          <p className="text-[11px] leading-[1.48] tracking-[0.14em] text-[#2D2D2D]">
            With over 35 years of structural
            engineering expertise, Zagrosia
            Engineering combines trusted
            engineering excellence with modern AI-
            driven workflows.
          </p>

          <p className="max-w-[302px] text-[11px] leading-[1.44] tracking-[0.14em] text-[#2D2D2D]">
            Led by <span className="font-semibold">Seyed Hassan Mozneb</span>, M.Sc.,
            P.Eng., the company specializes in
            seismic assessments, structural
            rehabilitation, industrial racking
            systems, and specialty engineering
            solutions, all delivered with precision,
            innovation, and strict compliance with
            BCBC, NBCC, and EGBC standards.
          </p>
        </div>
      </div>

      <div className="relative -mx-6 mt-6 h-[208px] w-[calc(100%+3rem)] overflow-hidden">
        <Image
          src="/images/about-bridge.png"
          alt="Bridge structure"
          fill
          className="object-cover object-left-bottom"
          priority
        />
      </div>
    </section>
  )
}

const education = ["M.Sc. Structural Engineering", "B.Sc. Civil Engineering"]

const certifications = [
  "Structural Engineering Certificate (SEABC)",
  "Construction Operation Certificate",
  "P.Eng. Candidacy - Ethical Law Exam Completed",
]

export function AboutProfileSection() {
  return (
    <section id="profile" className="relative -mt-[42px] bg-[#071018] px-6 pb-10 pt-0 text-[#FCFCFC]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[72px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,16,24,0) 0%, rgba(7,16,24,0.68) 48%, rgba(7,16,24,0.96) 82%, #071018 100%)",
        }}
      />

      <div className="relative pt-10">
        {/* Photo + stats row — fixed height so line sits directly below */}
        <div className="relative h-[300px]">
          {/* Photo: upper-body crop, anchored top-left */}
          <div className="absolute top-0 left-0 h-[300px] w-[190px]">
            <Image
              src="/images/homayoun-pic.png"
              alt="Seyed Hassan Mozneb"
              fill
              className="object-cover object-top"
            />
          </div>

          {/* Stats: right side, vertically centered */}
          <div className="relative z-10 ml-auto flex h-[300px] w-[130px] flex-col justify-center gap-8 text-left">
            <div>
              <p className="text-[18px] font-semibold tracking-[0.08em] text-[#FCFCFC]">35+</p>
              <p className="mt-1 text-[11px] tracking-[0.15em] text-[#FCFCFC]">Experience</p>
            </div>
            <div>
              <p className="text-[18px] font-semibold tracking-[0.08em] text-[#FCFCFC]">200+</p>
              <p className="mt-1 text-[11px] tracking-[0.15em] text-[#FCFCFC]">Projects</p>
            </div>
            <div>
              <p className="text-[18px] font-semibold tracking-[0.08em] text-[#FCFCFC]">8+</p>
              <p className="mt-1 text-[11px] tracking-[0.15em] text-[#FCFCFC]">Canada</p>
            </div>
          </div>
        </div>

        {/* Divider line — sits directly below photo row */}
        <div className="border-t border-[#FCFCFC]/75" />

        {/* Education + certs — aligned under stats (right half), matching desktop layout */}
        <div className="pt-6 ml-[48%]">
          <div className="mb-7">
            <h2 className="zag-heading mb-4 text-[18px] leading-none text-[#FCFCFC]">EDUCATION</h2>
            <ul className="space-y-3 text-[11px] tracking-[0.14em] text-[#FCFCFC]">
              {education.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="zag-heading mb-4 text-[18px] leading-none text-[#FCFCFC]">CERTIFICATIONS</h2>
            <ul className="space-y-3 text-[11px] leading-[1.34] tracking-[0.14em] text-[#FCFCFC]">
              {certifications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex gap-3">
            <a
              href="/files/resume-homayoun.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="zag-outline-button min-h-[44px] flex-1 whitespace-nowrap border-[#FCFCFC] px-0 text-[9px] tracking-[0.16em] text-[#FCFCFC] transition-colors hover:bg-[#94B8DC] hover:border-[#94B8DC] hover:text-[#FCFCFC]"
            >
              View Resume
            </a>
            <a
              href="/contact"
              className="zag-outline-button min-h-[44px] flex-1 whitespace-nowrap border-[#FCFCFC] px-0 text-[9px] tracking-[0.16em] text-[#FCFCFC] transition-colors hover:bg-[#94B8DC] hover:border-[#94B8DC] hover:text-[#FCFCFC]"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function AboutMissionVisionSection() {
  return (
    <section className="bg-[#FCFCFC] px-6 pb-14 pt-10 text-[#2D2D2D]">
      <h2 className="zag-heading text-[22px] leading-[1.22] text-[#2D2D2D]">
        OUR MISSION
        <br />
        &
        <br />
        OUR VISION
      </h2>

      <div className="mt-7 flex items-stretch gap-8">
        <div
          className="w-[calc(50%-1rem)] flex-1 rounded-[20px] p-px"
          style={{
            background:
              "linear-gradient(135deg, rgba(45,45,45,1) 0%, rgba(45,45,45,0.58) 22%, rgba(147,147,147,0.22) 100%)",
          }}
        >
          <div className="h-full rounded-[19px] bg-[#FCFCFC] px-4 py-4">
            <p className="text-[11px] leading-[1.35] tracking-[0.15em] text-[#2D2D2D]">
              For over 35
              <br />
              years, We has
              <br />
              delivered
              <br />
              intelligent
              <br />
              structural
              <br />
              engineering
              <br />
              solutions with
              <br />
              precision,
              <br />
              innovation, and
              <br />
              deep industry
              <br />
              expertise,
              <br />
              combining
              <br />
              trusted
              <br />
              engineering
              <br />
              practices with
              <br />
              modern AI-
              <br />
              driven
              <br />
              workflows.
            </p>
          </div>
        </div>

        <div
          className="w-[calc(50%-1rem)] flex-1 rounded-[20px] p-px"
          style={{
            background:
              "linear-gradient(135deg, rgba(45,45,45,1) 0%, rgba(45,45,45,0.58) 22%, rgba(147,147,147,0.22) 100%)",
          }}
        >
          <div className="h-full rounded-[19px] bg-[#FCFCFC] px-4 py-4">
            <p className="text-[11px] leading-[1.35] tracking-[0.15em] text-[#2D2D2D]">
              To become
              <br />
              Western
              <br />
              Canada&apos;s
              <br />
              leading
              <br />
              structural
              <br />
              engineering
              <br />
              firm through
              <br />
              innovation,
              <br />
              technical
              <br />
              excellence, and
              <br />
              the future of
              <br />
              engineering
              <br />
              technology.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

const coreValues = [
  {
    title: "Integrity",
    description:
      "We maintain the highest standards of professional ethics and transparency in all our work.",
  },
  {
    title: "Excellence",
    description:
      "We are committed to delivering exceptional quality in every project we undertake.",
  },
  {
    title: "Collaboration",
    description:
      "We work closely with clients and project teams to achieve the best outcomes.",
  },
]

export function AboutCoreValuesSection() {
  return (
    <section className="relative overflow-hidden bg-[#000000] text-[#FCFCFC]">
      <div className="relative h-[320px] w-full overflow-hidden">
        <Image
          src="/images/about-core-values-building.png"
          alt="Core values architectural building"
          fill
          className="object-cover object-top"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.18) 32%, rgba(0,0,0,0.56) 62%, rgba(0,0,0,0.88) 82%, #000000 100%)",
          }}
        />
      </div>

      <div className="relative -mt-[96px] px-6 pb-14">
        <div className="relative pl-[14px]">
          <div
            className="absolute left-0 top-[6px] w-px"
            style={{
              height: "calc(100% - 6px)",
              background:
                "linear-gradient(180deg, rgba(252,252,252,1) 0%, rgba(155,155,155,0.58) 79%, rgba(150,150,150,0) 100%)",
            }}
          />

          <h2 className="zag-heading text-[22px] leading-[1.14] text-[#FCFCFC]">
            OUR CORE
            <br />
            VALUES
          </h2>

          <div className="mt-7 space-y-5">
            {coreValues.map((value) => (
              <div
                key={value.title}
                className="rounded-[20px] p-px"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.84) 28%, rgba(155,155,155,0.58) 79%, rgba(155,155,155,0.36) 100%)",
                }}
              >
                <div className="rounded-[19px] bg-black/70 px-4 py-4">
                  <h3 className="text-[12px] font-semibold tracking-[0.14em] text-[#FCFCFC]">
                    {value.title}
                  </h3>
                  <p className="mt-3 max-w-[290px] text-[11px] leading-[1.36] tracking-[0.14em] text-[#FCFCFC]">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
