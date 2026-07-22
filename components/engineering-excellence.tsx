"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Reveal } from "./scroll-reveal"
import { CountUp } from "./scroll-reveal"
import { CtaButton } from "@/components/cta-button"

const EASE = [0.0, 0.0, 0.2, 1] as const

export function EngineeringExcellence() {
  return (
    <section className="bg-[#fcfcfc] px-6 pt-10 pb-0 lg:px-0 lg:pt-0 lg:pb-0 lg:mb-0 mb-8">

      {/* ── MOBILE layout ── */}
      <div className="relative h-[427px] overflow-hidden lg:hidden">

        {/* Text content */}
        <div className="max-w-[175px]">
          <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
            <h2 className="zag-heading mb-5 font-medium leading-[1.22] text-[#2d2d2d] lg:font-normal" style={{ fontSize: "20px" }}>
              ENGINEERING
              <br />
              EXCELLENCE
              <br />
              REDEFINED
            </h2>
          </Reveal>
          <Reveal delay={0.2} duration={0.65}>
            <p className="leading-[1.56] tracking-[0.12em] text-[#3a3a3a]" style={{ fontSize: "12px" }}>
              Seyed Hassan Mozneb brings 35+ years of structural engineering expertise, combining traditional engineering excellence with modern AI-driven workflows. Specializing in seismic assessments, building rehabilitation, industrial racking systems, and specialty structural reviews, his work is guided by BCBC, NBCC, and EGBC standards.
            </p>
          </Reveal>
        </div>

        {/* Photo + line — slides in from right */}
        <motion.div
          className="absolute right-[-10px] top-[-20px] w-[165px]"
          initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        >
          <div className="relative h-[400px] w-full">
            <Image
              src="/images/homayoun-pic-mobile.png"
              alt="Seyed Hassan Mozneb"
              fill
              className="object-contain object-bottom object-center"
            />
          </div>
          {/* Line */}
          <div className="h-[2px] bg-black -mt-[5px] ml-[3px]" style={{ width: "200px" }} />
          {/* Stats */}
          <div className="flex justify-between mt-3 ml-[3px] pr-[40px] text-[#2d2d2d]" style={{ width: "200px" }}>
            <div>
              <p className="font-semibold tracking-[0.08em]" style={{ fontSize: "14px" }}>
                <CountUp end={35} suffix="+" duration={1.4} />
              </p>
              <p className="mt-1 tracking-[0.18em] text-[#4a4a4a]" style={{ fontSize: "10px" }}>Experience</p>
            </div>
            <div>
              <p className="font-semibold tracking-[0.08em]" style={{ fontSize: "14px" }}>
                <CountUp end={200} suffix="+" duration={1.6} />
              </p>
              <p className="mt-1 tracking-[0.18em] text-[#4a4a4a]" style={{ fontSize: "10px" }}>Projects</p>
            </div>
          </div>
        </motion.div>

        {/* CTA button */}
        <Reveal variant="scaleUp" delay={0.35} duration={0.5} className="absolute left-0 top-[387px]">
          <CtaButton
            href="/about"
            className="inline-flex items-center justify-center rounded-full border border-[#2D2D2D] text-[#2D2D2D] font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[40px] px-5 text-[11px] lg:h-[44px] lg:px-7 lg:text-[14px]"
            style={{ fontSize: "9.5px", width: "142px", height: "40px" }}
          >
            Learn More
          </CtaButton>
        </Reveal>
      </div>

      {/* ── DESKTOP layout ── */}
      <div className="hidden lg:grid lg:grid-cols-2">

        {/* Left: text */}
        <div
          className="sidebar-content flex flex-col justify-center py-12"
          style={{ paddingLeft: "var(--desktop-grid-content-start)", paddingRight: "60px" }}
        >
          <Reveal variant="fadeLeft" delay={0.05} duration={0.75}>
            <h2 className="zag-heading mb-8 text-[32px] leading-[1.1] text-[#2d2d2d]">
              ENGINEERING
              <br />
              EXCELLENCE
              <br />
              REDEFINED
            </h2>
          </Reveal>

          <Reveal delay={0.2} duration={0.65}>
            <p className="mb-6 leading-[1.75] tracking-[0.12em] text-[#3a3a3a]" style={{ fontSize: "16px" }}>
              Seyed Hassan Mozneb brings 35+ years of structural engineering expertise, combining traditional engineering excellence with modern AI-driven workflows.
            </p>
          </Reveal>

          <Reveal delay={0.3} duration={0.65}>
            <p className="mb-10 leading-[1.75] tracking-[0.12em] text-[#3a3a3a]" style={{ fontSize: "16px" }}>
              Specializing in seismic assessments, building rehabilitation, industrial racking systems, and specialty structural reviews, his work is guided by BCBC, NBCC, and EGBC standards.
            </p>
          </Reveal>

          <Reveal variant="scaleUp" delay={0.42} duration={0.5}>
            <CtaButton
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[#2D2D2D] text-[#2D2D2D] font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[40px] px-5 text-[11px] lg:h-[44px] lg:px-7 lg:text-[14px]"
            >
              Contact Us
            </CtaButton>
          </Reveal>
        </div>

        {/* Right: founder photo + line + stats — slides in from right */}
        <motion.div
          className="flex flex-col justify-center bg-[#fcfcfc] px-12"
          initial={{ opacity: 0, x: 48, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
        >
          {/* Photo */}
          <div className="flex justify-center">
            <div className="relative" style={{ width: "320px", height: "400px" }}>
              <Image
                src="/images/homayoun-pic.png"
                alt="Seyed Hassan Mozneb"
                fill
                className="object-contain object-bottom"
              />
            </div>
          </div>
          {/* Black line immediately under the photo — extends to right page edge */}
          <div className="-mr-12 flex justify-end">
            <motion.div
              className="h-[3px] bg-[#2d2d2d]"
              style={{ width: "599px", transformOrigin: "right", scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            />
          </div>
          {/* Stats below the line */}
          <div className="flex justify-center gap-[90px] pt-6">
            {[{ end: 35, suffix: "+", label: "Experience" }, { end: 200, suffix: "+", label: "Projects" }].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.45 + i * 0.12, ease: EASE }}
              >
                <p className="text-[28px] font-semibold tracking-[0.06em] text-[#2d2d2d]">
                  <CountUp end={stat.end} suffix={stat.suffix} duration={1.5} />
                </p>
                <p className="mt-1 text-[11px] tracking-[0.18em] text-[#4a4a4a]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
