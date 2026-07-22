"use client"

import { Reveal } from "./scroll-reveal"
import { CountUp } from "./scroll-reveal"
import { motion } from "framer-motion"
import { CtaButton } from "@/components/cta-button"

const EASE = [0.0, 0.0, 0.2, 1] as const

const stats = [
  { end: 500, suffix: "+", label: "Videos" },
  { end: 150, suffix: "+", label: "Subjects" },
  { end: 200, suffix: "+", label: "Views" },
]

export function AIAutomationLab() {
  return (
    <section id="ai-lab" className="bg-black px-8 py-14 text-white lg:py-20 zag-desktop-content-pad">
      <div className="sidebar-content">

        {/* Heading */}
        <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
          <div className="mb-8">
            <h2 className="zag-heading font-medium leading-[1.18] text-[20px] lg:font-normal lg:text-[32px] lg:leading-[1.1]">
              AI
              <br />
              &
              <br />
              AUTOMATION LAB
            </h2>
          </div>
        </Reveal>

        {/* Description */}
        <Reveal delay={0.18} duration={0.65}>
          <p className="mb-10 leading-[1.65] tracking-[0.1em] text-white/78 lg:text-[16px]" style={{ fontSize: "12px" }}>
            Where structural engineering meets artificial intelligence. Custom Python scripts, VBA automation, and AI-powered platforms that transform how engineering firms operate.
          </p>
        </Reveal>

        {/* Stats — staggered count-up */}
        <div className="mb-10 flex items-start justify-between">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: EASE }}
            >
              <p className="font-semibold tracking-[0.08em] text-white lg:text-[32px]" style={{ fontSize: "20px" }}>
                <CountUp end={stat.end} suffix={stat.suffix} duration={1.6} />
              </p>
              <p className="mt-1 tracking-[0.18em] text-white/78 lg:text-[24px]" style={{ fontSize: "14px" }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <Reveal variant="scaleUp" delay={0.25} duration={0.5}>
            <CtaButton
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[#FCFCFC] text-[#FCFCFC] font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[40px] px-5 text-[11px] lg:h-[44px] lg:px-7 lg:text-[14px]"
            >
              Request a Service
            </CtaButton>
          </Reveal>
          <Reveal variant="scaleUp" delay={0.35} duration={0.5}>
            <CtaButton
              href="/ai-lab"
              className="inline-flex items-center justify-center rounded-full border border-[#FCFCFC] text-[#FCFCFC] font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[40px] px-5 text-[11px] lg:h-[44px] lg:px-7 lg:text-[14px]"
            >
              Learn More
            </CtaButton>
          </Reveal>
        </div>

      </div>
    </section>
  )
}
