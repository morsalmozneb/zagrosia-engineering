"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Linkedin, Mail, Phone } from "lucide-react"
import { Reveal } from "./scroll-reveal"
import { CtaButton } from "@/components/cta-button"

const EASE = [0.22, 1, 0.36, 1] as const
const sectionHeading = "zag-heading text-[28px] uppercase leading-[1.1]"
const bodyText = "text-[16px] leading-[1.7] tracking-[0.02em]"
const ctaLight =
  "inline-flex items-center justify-center zag-cta rounded-[10px] border border-[#2D2D2D] text-[#2D2D2D] font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[44px] px-7 text-[14px]"

// Shared "Start with a conversation" contact section (About + Services, desktop).
export function ContactStrip() {
  const reduced = useReducedMotion()
  return (
    <section className="relative flex flex-col justify-center overflow-hidden py-[clamp(28px,7vh,90px)] text-[#2D2D2D]" style={{ background: "#F3F5F8" }}>
      <div className="sidebar-content zag-desktop-content-pad relative">
        <div className="grid max-w-[1100px] grid-cols-[0.9fr_1.1fr] items-center gap-[clamp(32px,5vw,80px)]">
          <div className="relative pl-5">
            <motion.div
              className="absolute left-0 top-0 w-[3px] rounded-full"
              style={{ height: "100%", background: "linear-gradient(to bottom, rgba(1,80,169,1) 0%, rgba(1,80,169,0.8) 30%, rgba(1,80,169,0.4) 65%, rgba(1,80,169,0) 100%)", transformOrigin: "top" }}
              initial={reduced ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.9, delay: 0.1, ease: "easeInOut" }}
            />
            <Reveal variant="fadeUp" delay={0.05} duration={0.6}>
              <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.24em] text-[#0052A5]">Get in touch</p>
            </Reveal>
            <Reveal variant="fadeLeft" delay={0.1} duration={0.7}>
              <h2 className={`${sectionHeading} text-[#2D2D2D]`}>
                Start with a<br />
                <span className="text-[#0052A5]">conversation</span>
              </h2>
            </Reveal>
            <Reveal delay={0.18} duration={0.6}>
              <p className={`mt-4 max-w-[430px] ${bodyText} text-[#3a3a3a]`}>
                Tell us about your project. We can help with structural design, assessments, rehabilitation and specialty reviews.
              </p>
            </Reveal>
            <Reveal delay={0.24} duration={0.6}>
              <div className="mt-6 flex items-center gap-5">
                <CtaButton href="/contact" className={ctaLight}>
                  Start your project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </CtaButton>
              </div>
            </Reveal>
          </div>

          <div className="relative flex items-start justify-center gap-[clamp(36px,5.5vw,80px)]">
            {/* line that draws through the three tiles */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute left-[12%] right-[12%] top-[clamp(30px,4.2vh,40px)] h-px origin-left"
              style={{ background: "linear-gradient(90deg, rgba(0,82,165,0) 0%, rgba(0,82,165,0.45) 50%, rgba(0,82,165,0) 100%)" }}
              initial={reduced ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
            />
            {[
              { icon: Mail, label: "Email", href: "mailto:info@zagrosia.ca", ext: false, hover: { y: [0, -6, 0], transition: { duration: 0.5 } } },
              { icon: Phone, label: "Call", href: "tel:+17783171043", ext: false, hover: { rotate: [0, -16, 14, -9, 6, 0], transition: { duration: 0.6 } } },
              { icon: Linkedin, label: "LinkedIn", href: "", ext: false, hover: { scale: [1, 1.25, 1], transition: { duration: 0.45 } } },
            ].map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                aria-label={c.label}
                {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group relative flex flex-col items-center gap-3"
                initial={reduced ? false : { opacity: 0, y: 24, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.65, delay: 0.25 + i * 0.14, ease: EASE }}
              >
                <motion.span
                  className="relative flex h-[clamp(52px,7.4vh,68px)] w-[clamp(52px,7.4vh,68px)] items-center justify-center rounded-[14px] bg-[#E3ECF6] text-[#0052A5] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:bg-[#0052A5] group-hover:text-white group-hover:shadow-[0_14px_30px_rgba(0,82,165,0.35)]"
                  animate={reduced ? undefined : { y: [0, -5, 0] }}
                  transition={{ duration: 3.2, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  {!reduced && (
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-[14px] border border-[#0052A5]"
                      animate={{ scale: [1, 1.55], opacity: [0.5, 0] }}
                      transition={{ duration: 2.4, delay: i * 0.6, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                  <motion.span className="flex" whileHover={reduced ? undefined : c.hover}>
                    <c.icon className="h-[clamp(20px,2.8vh,26px)] w-[clamp(20px,2.8vh,26px)]" strokeWidth={1.8} />
                  </motion.span>
                </motion.span>
                <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#0052A5]">{c.label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
