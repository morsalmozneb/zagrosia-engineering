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
          className="text-[24px] leading-[1.25] text-[#2D2D2D]"
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
          <p className="leading-[1.48] tracking-[0.14em] text-[#2D2D2D]" style={{ fontSize: "12px" }}>
            With over 35 years of structural
            engineering expertise, Zagrosia
            Engineering combines trusted
            engineering excellence with modern AI-
            driven workflows.
          </p>

          <p className="max-w-[302px] leading-[1.44] tracking-[0.14em] text-[#2D2D2D]" style={{ fontSize: "12px" }}>
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

      <div className="relative -mx-6 -mt-[19px] h-[208px] w-[calc(100%+3rem)] overflow-hidden">
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

      <div className="relative pt-2">
        {/* Photo + stats row */}
        <div className="flex items-center gap-4">
          {/* Photo + line: left side, shifted up */}
          <div className="flex-shrink-0 -mt-[45px]">
            <div className="relative overflow-hidden -ml-[40px]" style={{ width: "220px", height: "320px" }}>
              <Image
                src="/images/homayoun-pic-mobile.png"
                alt="Seyed Hassan Mozneb"
                fill
                className="object-contain object-bottom"
              />
            </div>
            <div className="h-[2px] bg-[#FCFCFC] -ml-[40px]" style={{ width: "300px" }} />
          </div>

          {/* Stats: right side, stacked vertically */}
          <div className="flex flex-col justify-center gap-[15px] pb-4 -ml-[70px]">
            <div>
              <p className="font-semibold tracking-[0.08em] text-[#FCFCFC]" style={{ fontSize: "24px" }}>35+</p>
              <p className="mt-1 tracking-[0.15em] text-[#FCFCFC]" style={{ fontSize: "14px" }}>Experience</p>
            </div>
            <div>
              <p className="font-semibold tracking-[0.08em] text-[#FCFCFC]" style={{ fontSize: "24px" }}>200+</p>
              <p className="mt-1 tracking-[0.15em] text-[#FCFCFC]" style={{ fontSize: "14px" }}>Projects</p>
            </div>
            <div>
              <p className="font-semibold tracking-[0.08em] text-[#FCFCFC]" style={{ fontSize: "24px" }}>8+</p>
              <p className="mt-1 tracking-[0.15em] text-[#FCFCFC]" style={{ fontSize: "14px" }}>Canada</p>
            </div>
          </div>
        </div>


        {/* Education + Certifications */}
        <div className="pt-4">
          <div className="mb-7">
            <h2 className="zag-heading mb-4 leading-none text-[#FCFCFC]" style={{ fontSize: "18px", fontWeight: 600 }}>EDUCATION</h2>
            <ul className="space-y-3 tracking-[0.14em] text-[#FCFCFC]" style={{ fontSize: "12px" }}>
              {education.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="zag-heading mb-4 leading-none text-[#FCFCFC]" style={{ fontSize: "18px", fontWeight: 600 }}>CERTIFICATIONS</h2>
            <ul className="space-y-3 leading-[1.34] tracking-[0.14em] text-[#FCFCFC]" style={{ fontSize: "12px" }}>
              {certifications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex justify-start gap-[15px]">
            <a
              href="/files/resume-homayoun.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#FCFCFC] text-[#FCFCFC] tracking-[0.06em] transition-colors hover:bg-[#94B8DC] hover:border-[#94B8DC]"
              style={{ fontSize: "9.5px", width: "142px", height: "40px" }}
            >
              View Resume
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[#FCFCFC] text-[#FCFCFC] tracking-[0.06em] transition-colors hover:bg-[#94B8DC] hover:border-[#94B8DC]"
              style={{ fontSize: "9.5px", width: "142px", height: "40px" }}
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
      <h2 className="zag-heading leading-[1.22] text-[#2D2D2D]" style={{ fontSize: "20px", fontWeight: 600 }}>
        OUR MISSION
        <br />
        &
        <br />
        OUR VISION
      </h2>

      <div className="mt-7 flex items-stretch gap-8">
        <div
          className="w-[calc(50%-1rem)] flex-1 px-4 py-4"
          style={{
            borderRadius: "20px",
            backgroundColor: "rgba(252,252,252,0.4)",
            boxShadow: "0px 4px 19.6px 0px rgba(0,0,0,0.34)",
            backdropFilter: "blur(61.5px)",
            WebkitBackdropFilter: "blur(61.5px)",
          }}
        >
          <p className="leading-[1.35] tracking-[0.15em] text-[#2D2D2D]" style={{ fontSize: "12px" }}>
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

        <div
          className="w-[calc(50%-1rem)] flex-1 px-4 py-4"
          style={{
            borderRadius: "20px",
            backgroundColor: "rgba(252,252,252,0.4)",
            boxShadow: "0px 4px 19.6px 0px rgba(0,0,0,0.34)",
            backdropFilter: "blur(61.5px)",
            WebkitBackdropFilter: "blur(61.5px)",
          }}
        >
          <p className="leading-[1.35] tracking-[0.15em] text-[#2D2D2D]" style={{ fontSize: "12px" }}>
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
      <div className="relative h-[400px] w-full overflow-hidden bg-[#FCFCFC] lg:bg-transparent">
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

          <h2 className="zag-heading leading-[1.14] text-[#FCFCFC]" style={{ fontSize: "20px", fontWeight: 600 }}>
            OUR CORE
            <br />
            VALUES
          </h2>

          <div className="mt-7 space-y-5">
            {coreValues.map((value) => (
              <div
                key={value.title}
                className="px-4 py-4"
                style={{
                  borderRadius: "20px",
                  backgroundColor: "#010101",
                  boxShadow: "0px 1px 15.1px 0px rgba(255,255,255,0.68)",
                  backdropFilter: "blur(61.5px)",
                  WebkitBackdropFilter: "blur(61.5px)",
                }}
              >
                <h3 className="tracking-[0.14em] text-[#FCFCFC]" style={{ fontSize: "16px", fontWeight: 450 }}>
                  {value.title}
                </h3>
                <p className="mt-3 max-w-[290px] leading-[1.36] tracking-[0.14em] text-[#FCFCFC]" style={{ fontSize: "12px" }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
