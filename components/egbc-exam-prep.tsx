"use client"

import { useState } from "react"
import Image from "next/image"
import { PlusCircle, MinusCircle } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { Reveal } from "./scroll-reveal"
import { CtaButton } from "@/components/cta-button"

const EASE = [0.0, 0.0, 0.2, 1] as const

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
  const reducedMotion = useReducedMotion()

  const accordion = (
    <div className="space-y-[6px]">
      {features.map((feature, i) => {
        const isOpen = openId === feature.id
        return (
          <motion.div
            key={feature.id}
            initial={reducedMotion ? false : { opacity: 0, y: 14, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.05 }}
            transition={{ duration: 0.5, delay: 0.08 + i * 0.09, ease: EASE }}
          >
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
                    className="flex w-full items-center justify-between"
                    onClick={() => setOpenId(0)}
                  >
                    <span className="text-[14px] font-semibold tracking-[0.1em] text-[#2d2d2d] lg:text-[24px]">
                      {feature.title}
                    </span>
                    <MinusCircle size={22} strokeWidth={2} className="flex-shrink-0 text-[#2d2d2d]" />
                  </button>
                  <p className="mt-3 leading-[1.7] tracking-[0.06em] text-[#4f4f4f] lg:text-[16px]" style={{ fontSize: "12px" }}>
                    {feature.description}
                  </p>
                </div>
            ) : (
              <button
                className="flex h-[28px] w-full items-center justify-between rounded-[20px] px-3 transition-all hover:opacity-80 hover:scale-[1.005] lg:h-[53px]"
                style={{ background: CLOSED_FILL }}
                onClick={() => setOpenId(feature.id)}
              >
                <span className="text-[14px] font-medium tracking-[0.1em] text-white lg:text-[24px]">
                  {feature.title}
                </span>
                <PlusCircle size={20} strokeWidth={2} className="flex-shrink-0 text-white" />
              </button>
            )}
          </motion.div>
        )
      })}
    </div>
  )

  return (
    <section id="egbc-prep" className="border-t-[14px] border-[#132647] bg-[#fcfcfc]">

      {/* ── MOBILE ── */}
      <div className="lg:hidden px-8 pt-10 pb-0">
        <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
          <h2 className="zag-heading mb-8 font-medium leading-[1.24] text-[#2d2d2d] lg:font-normal" style={{ fontSize: "20px" }}>
            PASS THE EGBC EXAM.
            <br />
            THE SMART WAY.
          </h2>
        </Reveal>

        {accordion}

        <Reveal delay={0.15} duration={0.65}>
          <p className="mt-9 max-w-[304px] leading-[1.48] tracking-[0.17em] text-[#3f3f3f]" style={{ fontSize: "12px" }}>
            {"Canada's most comprehensive EGBC National Professional Practice Examination prep platform. Built by a practicing P.Eng. with 35 years of real-world experience — designed for internationally trained engineers building their Canadian career"}
          </p>
        </Reveal>

        <div className="mb-6 mt-8 flex justify-center gap-[15px]">
          <Reveal variant="scaleUp" delay={0.25} duration={0.5}>
            <CtaButton
              href="/academy"
              className="inline-flex items-center justify-center rounded-full border border-[#2D2D2D]/40 text-[#2D2D2D]/60 font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[40px] px-5 text-[11px] lg:h-[44px] lg:px-7 lg:text-[14px]"
              style={{ fontSize: "9.5px", width: "142px", height: "40px" }}
            >
              Join Wait list
            </CtaButton>
          </Reveal>
          <Reveal variant="scaleUp" delay={0.35} duration={0.5}>
            <CtaButton
              href="/academy"
              className="inline-flex items-center justify-center rounded-full border border-[#2D2D2D]/40 text-[#2D2D2D]/60 font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[40px] px-5 text-[11px] lg:h-[44px] lg:px-7 lg:text-[14px]"
              style={{ fontSize: "9.5px", width: "142px", height: "40px" }}
            >
              Learn More
            </CtaButton>
          </Reveal>
        </div>

        <Reveal variant="fadeBlur" delay={0.1} duration={0.8} className="relative -mx-8 h-[245px] w-[calc(100%+4rem)] overflow-hidden -mt-[30px]">
          <Image
            src="/images/pic-10.png"
            alt="Architectural building for EGBC section"
            fill
            className="object-cover object-bottom"
          />
        </Reveal>
        <div className="flex justify-center">
          <div className="h-[2px] bg-black -ml-[50px]" style={{ width: "400px" }} />
        </div>
      </div>

      {/* ── DESKTOP: left-aligned content with image below ── */}
      <div className="sidebar-content hidden lg:block lg:pt-20 lg:pb-0 zag-desktop-content-pad">
        <div className="w-full">
          <Reveal variant="fadeLeft" delay={0.05} duration={0.75}>
            <h2 className="zag-heading mb-8 text-[32px] leading-[1.18] text-[#2d2d2d]">
              PASS THE EGBC EXAM.
              <br />
              THE SMART WAY.
            </h2>
          </Reveal>

          <div className="w-full text-left">
            {accordion}
          </div>

          <Reveal delay={0.15} duration={0.65}>
            <p
              className="mt-9 text-left leading-[1.48] tracking-[0.17em] text-[#3f3f3f]"
              style={{ fontSize: "16px" }}
            >
              {"Canada's most comprehensive EGBC National Professional Practice Examination prep platform. Built by a practicing P.Eng. with 35 years of real-world experience — designed for internationally trained engineers building their Canadian career"}
            </p>
          </Reveal>

          <div className="mt-8 flex justify-start gap-3">
            <Reveal variant="scaleUp" delay={0.25} duration={0.5}>
              <CtaButton
                href="/academy"
                className="inline-flex items-center justify-center rounded-full border border-[#2D2D2D]/40 text-[#2D2D2D]/60 font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[40px] px-5 text-[11px] lg:h-[44px] lg:px-7 lg:text-[14px]"
              >
                Join Wait list
              </CtaButton>
            </Reveal>
            <Reveal variant="scaleUp" delay={0.35} duration={0.5}>
              <CtaButton
                href="/academy"
                className="inline-flex items-center justify-center rounded-full border border-[#2D2D2D]/40 text-[#2D2D2D]/60 font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[40px] px-5 text-[11px] lg:h-[44px] lg:px-7 lg:text-[14px]"
              >
                Learn More
              </CtaButton>
            </Reveal>
          </div>
        </div>

        <Reveal variant="fadeBlur" delay={0.1} duration={0.9} className="relative left-[calc(50%-50vw)] -mt-16 w-screen">
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
        </Reveal>
      </div>
    </section>
  )
}
