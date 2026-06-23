"use client"

import { useState } from "react"

const CLOSED_FILL = "linear-gradient(to right, rgba(45,45,45,1) 0%, rgba(115,115,115,0.22) 100%)"
const OPEN_CARD_SHADOW = "0 4px 19.6px rgba(0,0,0,0.18)"
const CLOSED_CARD_SHADOW = "0 4px 19.6px rgba(0,0,0,0.24)"

type AcademyItem = {
  id: number
  title: string
  description: string
  actions?: string[]
}

const academyItems: AcademyItem[] = [
  {
    id: 1,
    title: "Full Curriculum",
    description:
      "Ethics, law, professional practice, every EGBC exam topic with Canadian context",
    actions: ["Download Files", "View Files"],
  },
  {
    id: 2,
    title: "AI-Powered Quizzes",
    description:
      "Adaptive learning powered by AI to identify weak areas and strengthen exam confidence.",
  },
  {
    id: 3,
    title: "Expert Mentorship",
    description:
      "Guidance from a practicing P.Eng. with real-world insight and focused exam support.",
  },
  {
    id: 4,
    title: "English & Persian Support",
    description:
      "Bilingual support for internationally trained engineers building their Canadian career.",
  },
]

function AcademyToggleIcon({
  isOpen,
  light = false,
}: {
  isOpen: boolean
  light?: boolean
}) {
  const stroke = light ? "bg-white" : "bg-[#2D2D2D]"
  const border = light ? "border-white/90" : "border-[#2D2D2D]/90"

  return (
    <span
      aria-hidden="true"
      className={`relative flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full border ${border}`}
    >
      <span className={`h-px w-[12px] ${stroke}`} />
      {!isOpen ? (
        <span className={`absolute h-[12px] w-px ${stroke}`} />
      ) : null}
    </span>
  )
}

export function AcademySection() {
  const [openDesktopItemId, setOpenDesktopItemId] = useState(1)

  return (
    <section className="bg-[#FCFCFC] text-[#2D2D2D]">
      <div className="px-6 pb-14 pt-[88px] lg:hidden">
        <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.22em] text-[#2D2D2D]">
          KNOWLEDGE PLATFORM
        </p>

        <h1
          className="mb-6 text-[28px] font-black uppercase leading-[1.08] tracking-[0.03em]"
          style={{ fontFamily: "'Momo Trust Sans', 'Inter', sans-serif" }}
        >
          <span className="text-[#2D2D2D]">PASS THE EGBC EXAM</span>
          <br />
          <span className="text-[#0052A5]">THE SMART WAY.</span>
        </h1>

        <p className="mb-4 text-[11px] leading-[1.75] tracking-[0.07em] text-[#2D2D2D]">
          Canada&apos;s most comprehensive EGBC National Professional Practice Examination prep
          platform.
        </p>
        <p className="mb-8 text-[11px] leading-[1.75] tracking-[0.07em] text-[#2D2D2D]">
          Built by a practicing P.Eng. with 35 years of real-world experience, designed for
          internationally trained engineers building their Canadian career.
        </p>

        <div className="mb-[6px] rounded-[20px] border border-[#D8D8D8] bg-[#FCFCFC] px-4 pb-4 pt-4 shadow-[0_4px_19.6px_rgba(0,0,0,0.12)]">
          <h3 className="mb-2 text-[13px] font-semibold tracking-[0.1em] text-[#2D2D2D]">
            Full Curriculum
          </h3>

          <p className="mb-5 text-[11px] leading-[1.65] tracking-[0.07em] text-[#2D2D2D]">
            Ethics, law, professional practice, every EGBC exam topic with Canadian context
          </p>

          <div className="flex gap-3">
            <a
              href="#"
              className="flex h-[42px] flex-1 items-center justify-center rounded-full border border-[#2D2D2D] bg-transparent tracking-[0.1em] text-[#2D2D2D]" style={{ fontSize: "14px" }}
            >
              Download Files
            </a>
            <a
              href="#"
              className="flex h-[42px] flex-1 items-center justify-center rounded-full border border-[#2D2D2D] bg-transparent tracking-[0.1em] text-[#2D2D2D]" style={{ fontSize: "14px" }}
            >
              View Files
            </a>
          </div>
        </div>

        <div className="space-y-[6px]">
          {academyItems.slice(1).map((item) => (
            <div
              key={item.id}
              className="flex h-[34px] items-center justify-between rounded-[20px] px-4"
              style={{ background: CLOSED_FILL }}
            >
              <span className="text-[11px] font-medium tracking-[0.1em] text-white">
                {item.title}
              </span>
              <AcademyToggleIcon isOpen={false} light />
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#"
            className="inline-flex h-[48px] items-center rounded-full border border-[#2D2D2D] bg-transparent px-10 tracking-[0.12em] text-[#2D2D2D]" style={{ fontSize: "14px" }}
          >
            Join Waitlist
          </a>
          <a
            href="#"
            className="inline-flex h-[48px] items-center rounded-full border border-[#2D2D2D] bg-transparent px-10 tracking-[0.12em] text-[#2D2D2D]" style={{ fontSize: "14px" }}
          >
            Learn More
          </a>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="sidebar-content zag-desktop-content-start max-w-[951px] px-0 pb-[132px] pt-[148px]">
          <div className="relative pl-5">
            {/* Vertical fading line */}
            <div
              className="absolute left-0 top-[4px] bottom-0 w-[4px]"
              style={{ background: "linear-gradient(180deg, #0B0E0A 0%, rgba(150,150,150,0) 100%)" }}
            />

            <p className="mb-[20px] text-[20px] font-bold uppercase tracking-[0.24em] text-[#2D2D2D]">
              KNOWLEDGE PLATFORM
            </p>

            <h1
              className="text-[52px] font-bold uppercase leading-[0.96] tracking-[0.06em]"
              style={{ fontFamily: "'Momo Trust Sans', 'Inter', sans-serif" }}
            >
              <span className="mb-[8px] block text-[#2D2D2D]">PASS THE EGBC EXAM</span>
              <span className="block text-[#0052A5]">THE SMART WAY</span>
            </h1>

            <div className="mt-[28px] max-w-[904px] space-y-[14px] leading-[1.35] tracking-[0.18em] text-[#2D2D2D]" style={{ fontSize: "18px" }}>
              <p>
                Canada&apos;s most comprehensive EGBC National Professional Practice
                Examination prep platform.
              </p>
              <p>
                Built by a practicing P.Eng. with 35 years of real-world experience,
                designed for internationally trained engineers building their Canadian
                career.
              </p>
            </div>
          </div>

          <div className="mt-[32px] space-y-[20px]">
            {academyItems.map((item) => {
              const isOpen = openDesktopItemId === item.id

              return (
                <div key={item.id}>
                  {isOpen ? (
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setOpenDesktopItemId(0)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault()
                          setOpenDesktopItemId(0)
                        }
                      }}
                      className="w-full rounded-[20px] bg-[#FCFCFC] px-[32px] pb-[20px] pt-[18px] text-left"
                      style={{ boxShadow: OPEN_CARD_SHADOW }}
                    >
                      <div className="flex items-start justify-between gap-8">
                        <div className="min-w-0">
                          <h3 className="text-[20px] font-semibold tracking-[0.14em] text-[#2D2D2D]">
                            {item.title}
                          </h3>
                          <p className="mt-[14px] max-w-[746px] leading-[1.38] tracking-[0.16em] text-[#2D2D2D]" style={{ fontSize: "16px" }}>
                            {item.description}
                          </p>

                          {item.actions ? (
                            <div className="mt-[22px] flex gap-[18px]">
                              {item.actions.map((action) => (
                                <a
                                  key={action}
                                  href="#"
                                  className="inline-flex h-[40px] items-center rounded-full border border-[#2D2D2D] px-[20px] tracking-[0.16em] text-[#2D2D2D] hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white"
                                  style={{ fontSize: "16px" }}
                                  onClick={(event) => event.stopPropagation()}
                                >
                                  {action}
                                </a>
                              ))}
                            </div>
                          ) : null}
                        </div>

                        <span className="mt-[22px]">
                          <AcademyToggleIcon isOpen light={false} />
                        </span>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setOpenDesktopItemId(item.id)}
                      className="flex h-[28px] w-full items-center justify-between rounded-[20px] px-[20px] text-left lg:h-[53px]"
                      style={{ background: CLOSED_FILL, boxShadow: CLOSED_CARD_SHADOW }}
                    >
                      <span className="font-medium tracking-[0.14em] text-white" style={{ fontSize: "16px" }}>
                        {item.title}
                      </span>
                      <AcademyToggleIcon isOpen={false} light />
                    </button>
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-[32px] flex gap-[12px]">
            <a
              href="#"
              className="inline-flex h-[40px] items-center rounded-full border border-[#2D2D2D] px-[24px] tracking-[0.18em] text-[#2D2D2D] hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white"
              style={{ fontSize: "16px" }}
            >
              Join Waitlist
            </a>
            <a
              href="#"
              className="inline-flex h-[40px] items-center rounded-full border border-[#2D2D2D] px-[24px] tracking-[0.18em] text-[#2D2D2D] hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white"
              style={{ fontSize: "16px" }}
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* ── Desktop CTA ── */}
      <div className="hidden bg-[#FCFCFC] text-[#2D2D2D] lg:block">
        <div className="zag-desktop-content-pad pt-[30px] pb-[80px]">
          <h2 className="text-[32px] uppercase leading-[1.1] tracking-[0.18em] text-[#2D2D2D]">
            HAVE QUESTIONS ABOUT THE ACADEMY?
          </h2>
          <p className="mt-[18px] text-[16px] leading-[1.45] tracking-[0.14em] text-[#2D2D2D]">
            Whether you're preparing for your EGBC exam or want to learn more about the program, we're here to help.
          </p>
          <a
            href="/contact"
            className="mt-[26px] inline-flex h-[40px] items-center rounded-full border border-[#2D2D2D]/50 px-[18px] tracking-[0.16em] text-[#2D2D2D] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white"
            style={{ fontSize: "16px" }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  )
}
