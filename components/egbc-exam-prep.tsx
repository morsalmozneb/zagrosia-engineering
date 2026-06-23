"use client"

import { useState } from "react"
import Image from "next/image"
import { PlusCircle, MinusCircle } from "lucide-react"

const GRADIENT_BORDER = "linear-gradient(135deg, rgba(45,45,45,1) 0%, rgba(45,45,45,0.56) 26%, rgba(147,147,147,0.22) 100%)"
const CLOSED_FILL = "linear-gradient(to right, rgba(45,45,45,1) 0%, rgba(115,115,115,0.22) 100%)"

const features = [
  {
    id: 1,
    title: "Full Curriculum",
    description:
      "Ethics, law, professional practice — every EGBC exam topic with Canadian context",
  },
  {
    id: 2,
    title: "AI-Powered Quizzes",
    description: "Adaptive learning powered by AI to identify and strengthen weak areas.",
  },
  {
    id: 3,
    title: "Expert Mentorship",
    description: "Direct access to practicing P.Eng. professionals for guidance.",
  },
  {
    id: 4,
    title: "English & Persian Support",
    description: "Bilingual support for internationally trained engineers.",
  },
]

export function EGBCExamPrep() {
  const [openId, setOpenId] = useState<number>(1)

  const accordion = (
    <div className="space-y-[6px]">
      {features.map((feature) => {
        const isOpen = openId === feature.id
        return (
          <div key={feature.id}>
            {isOpen ? (
              <div className="rounded-[20px] p-px" style={{ background: GRADIENT_BORDER }}>
                <div
                  className="rounded-[19px] bg-[#FCFCFC] px-4 pb-4 pt-3"
                  style={{
                    boxShadow: "0 4px 19.6px rgba(0, 0, 0, 0.34)",
                    backdropFilter: "blur(61.5px)",
                    WebkitBackdropFilter: "blur(61.5px)",
                    backgroundColor: "rgba(252, 252, 252, 0.9)",
                  }}
                >
                  <button
                    className="flex w-full items-center justify-between"
                    onClick={() => setOpenId(0)}
                  >
                    <span className="font-semibold tracking-[0.1em] text-[#2d2d2d]" style={{ fontSize: "24px" }}>
                      {feature.title}
                    </span>
                    <MinusCircle size={22} strokeWidth={2} className="flex-shrink-0 text-[#2d2d2d]" />
                  </button>
                  <p className="mt-3 leading-[1.7] tracking-[0.06em] text-[#4f4f4f]" style={{ fontSize: "16px" }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ) : (
              <button
                className="flex h-[28px] w-full items-center justify-between rounded-[20px] px-3 transition-all hover:opacity-80 hover:scale-[1.005] lg:h-[53px]"
                style={{ background: CLOSED_FILL }}
                onClick={() => setOpenId(feature.id)}
              >
                <span className="font-medium tracking-[0.1em] text-white" style={{ fontSize: "24px" }}>
                  {feature.title}
                </span>
                <PlusCircle size={20} strokeWidth={2} className="flex-shrink-0 text-white" />
              </button>
            )}
          </div>
        )
      })}
    </div>
  )

  return (
    <section id="egbc-prep" className="border-t-[14px] border-[#132647] bg-[#fcfcfc]">

      {/* ── MOBILE ── */}
      <div className="lg:hidden px-8 pt-10 pb-0">
        <h2 className="zag-heading mb-8 text-[22px] leading-[1.24] text-[#2d2d2d]">
          PASS THE EGBC EXAM.
          <br />
          THE SMART WAY.
        </h2>

        {accordion}

        <p className="mt-9 max-w-[304px] text-[11px] leading-[1.48] tracking-[0.17em] text-[#3f3f3f]">
          {"Canada's most comprehensive EGBC National Professional Practice Examination prep platform. Built by a practicing P.Eng. with 35 years of real-world experience — designed for internationally trained engineers building their Canadian career"}
        </p>

        <div className="mb-6 mt-8 flex gap-3">
          <a
            href="/academy"
            className="zag-outline-button min-h-[48px] flex-1 whitespace-nowrap border-[#2d2d2d] px-0 text-[10px] tracking-[0.18em] text-[#2d2d2d] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white"
          >
            Join Wait list
          </a>
          <a
            href="/academy"
            className="zag-outline-button min-h-[48px] flex-1 whitespace-nowrap border-[#2d2d2d] px-0 text-[10px] tracking-[0.18em] text-[#2d2d2d] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white"
          >
            Learn More
          </a>
        </div>

        <div className="relative -mx-8 h-[245px] w-[calc(100%+4rem)] overflow-hidden">
          <Image
            src="/images/pic-10.png"
            alt="Architectural building for EGBC section"
            fill
            className="object-cover object-bottom"
          />
        </div>
      </div>

      {/* ── DESKTOP: left-aligned content with image below ── */}
      <div className="sidebar-content hidden lg:block lg:pt-20 lg:pb-0 zag-desktop-content-pad">
        <div className="w-full">
          <h2 className="zag-heading mb-8 text-[32px] leading-[1.18] text-[#2d2d2d]">
            PASS THE EGBC EXAM.
            <br />
            THE SMART WAY.
          </h2>

          <div className="w-full text-left">
            {accordion}
          </div>

          <p
            className="mt-9 text-left leading-[1.48] tracking-[0.17em] text-[#3f3f3f]"
            style={{ fontSize: "16px" }}
          >
            {"Canada's most comprehensive EGBC National Professional Practice Examination prep platform. Built by a practicing P.Eng. with 35 years of real-world experience — designed for internationally trained engineers building their Canadian career"}
          </p>

          <div className="mt-8 flex justify-start gap-3">
            <a
              href="/academy"
              className="zag-outline-button min-h-[48px] flex-none whitespace-nowrap border-[#2d2d2d] px-8 text-[10px] tracking-[0.18em] text-[#2d2d2d] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white"
            >
              Join Wait list
            </a>
            <a
              href="/academy"
              className="zag-outline-button min-h-[48px] flex-none whitespace-nowrap border-[#2d2d2d] px-8 text-[10px] tracking-[0.18em] text-[#2d2d2d] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="relative left-[calc(50%-50vw)] -mt-16 w-screen">
          <div className="relative h-[560px] overflow-hidden">
            <div className="absolute bottom-0 left-0 h-[560px] w-[1400px]">
              <Image
                src="/images/pic-10.png"
                alt="Architectural building for EGBC section"
                fill
                className="object-contain object-left-bottom"
              />
            </div>
          </div>
          <div className="h-[3px] w-[1034px] bg-[#2d2d2d]" />
        </div>
      </div>
    </section>
  )
}
