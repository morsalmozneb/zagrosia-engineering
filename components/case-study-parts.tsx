"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Reveal } from "@/components/scroll-reveal"

// Shared building blocks for the project case-study pages.
// Same look as the About page: dark / light bands, blue fading line, 12px eyebrow + 28px heading.

export const EASE = [0.22, 1, 0.36, 1] as const
export const DARK_BG = "linear-gradient(180deg, #0B0E0A 0%, #07080A 100%)"
export const LIGHT_BG = "#F3F5F8"

export const eyebrowCls = (dark: boolean) =>
  `text-[12px] font-bold uppercase tracking-[0.24em] ${dark ? "text-[#5b9bf0]" : "text-[#0052A5]"}`
export const headingCls = (dark: boolean) =>
  `zag-heading text-[28px] uppercase leading-[1.1] ${dark ? "text-[#FCFCFC]" : "text-[#2D2D2D]"}`
export const bodyCls = (dark: boolean) =>
  `text-[16px] leading-[1.7] tracking-[0.02em] ${dark ? "text-[#FCFCFC]/85" : "text-[#3a3a3a]"}`

export function FadeLine({ dark }: { dark: boolean }) {
  const reduced = useReducedMotion()
  const c = dark ? "91,155,240" : "1,80,169"
  return (
    <motion.div
      aria-hidden
      className="absolute left-0 top-0 w-[3px] rounded-full"
      style={{
        height: "100%",
        background: `linear-gradient(to bottom, rgba(${c},1) 0%, rgba(${c},0.8) 30%, rgba(${c},0.4) 65%, rgba(${c},0) 100%)`,
        transformOrigin: "top",
      }}
      initial={reduced ? false : { scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.9, delay: 0.1, ease: "easeInOut" }}
    />
  )
}

// A full-width coloured band holding one section.
export function Band({ dark, children }: { dark: boolean; children: React.ReactNode }) {
  return (
    <section
      className="relative flex flex-col justify-center py-[clamp(40px,8vh,96px)]"
      style={{ background: dark ? DARK_BG : LIGHT_BG }}
    >
      <div className="sidebar-content zag-desktop-content-pad px-5 lg:px-0">
        <div className="max-w-[1100px]">{children}</div>
      </div>
    </section>
  )
}

// Eyebrow + heading with the fading blue line running down the whole block.
export function Block({
  dark,
  eyebrow,
  title,
  children,
}: {
  dark: boolean
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="relative pl-5">
      <FadeLine dark={dark} />
      <Reveal variant="fadeUp" delay={0.05} duration={0.6}>
        <p className={`mb-3 ${eyebrowCls(dark)}`}>{eyebrow}</p>
      </Reveal>
      <Reveal variant="fadeLeft" delay={0.1} duration={0.7}>
        <h2 className={`mb-6 ${headingCls(dark)}`}>{title}</h2>
      </Reveal>
      {children}
    </div>
  )
}
