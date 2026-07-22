"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Reveal } from "./scroll-reveal"
import { motion } from "framer-motion"
import { Phone, Mail, Linkedin, Facebook, Instagram } from "lucide-react"

const EASE = [0.0, 0.0, 0.2, 1] as const

export function Footer() {
  const pathname = usePathname()

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <footer id="contact" className="bg-[#000000] py-8 text-[#FCFCFC] lg:py-10">
      <div className="sidebar-content px-8 zag-desktop-content-pad">

      {/* ── DESKTOP: Row 1 — logo + tagline + P.ENG ── */}
      <div className="hidden lg:block mb-8">
        <Reveal variant="fadeUp" delay={0.05} duration={0.65}>
          <div className="mb-4">
            <Link href="/" aria-label="Go to homepage" onClick={handleLogoClick}>
              <Image
                src="/images/zagrosia-logo.svg"
                alt="Zagrosia Engineering Inc."
                width={148}
                height={34}
                className="h-auto w-[148px]"
              />
            </Link>
          </div>

          <h3 className="mb-3 text-[16px] font-medium tracking-[0.12em] text-[#FCFCFC]">Engineered to Solve</h3>
          <p className="mb-6 text-[13px] leading-[1.55] tracking-[0.1em] text-[#FCFCFC]/78">
            A next-generation structural engineering ecosystem, combining 35+ years of expertise with AI automation, education, and industry partnerships across Western Canada.
          </p>
        </Reveal>

        <div className="flex text-[13px] leading-[1.4] tracking-[0.1em] text-[#FCFCFC]/80">
          <div className="pr-6">
            <span className="font-medium text-[#FCFCFC]">P.ENG</span>
            <br />British Columbia
          </div>
          <div className="border-l border-[#FCFCFC]/22 px-6">
            <span className="font-medium text-[#FCFCFC]">P.ENG</span>
            <br />Alberta
          </div>
          <div className="border-l border-[#FCFCFC]/22 pl-6">
            <span className="font-medium text-[#FCFCFC]">P.ENG</span>
            <br />Saskatchewan
          </div>
        </div>
      </div>

      {/* ── DESKTOP: Row 2 — Services / Platform / Contact ── */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-12 lg:mb-8">

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
        >
          <h4 className="mb-3 font-medium tracking-[0.12em] text-[#FCFCFC]" style={{ fontSize: "14px" }}>Services</h4>
          <ul className="space-y-[6px] tracking-[0.1em] text-[#FCFCFC]/78" style={{ fontSize: "13px" }}>
            <li><Link href="/services" className="hover:text-[#0052A5] transition-colors">Structural Design</Link></li>
            <li><Link href="/services" className="hover:text-[#0052A5] transition-colors">Seismic Assessment</Link></li>
            <li><Link href="/services" className="hover:text-[#0052A5] transition-colors">Rehabilitation</Link></li>
            <li><Link href="/services" className="hover:text-[#0052A5] transition-colors">Racking Systems</Link></li>
            <li><Link href="/services" className="hover:text-[#0052A5] transition-colors">Building Envelope</Link></li>
            <li><Link href="/services" className="hover:text-[#0052A5] transition-colors">Specialty Reviews</Link></li>
          </ul>
        </motion.div>

        {/* Platform */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
        >
          <h4 className="mb-3 font-medium tracking-[0.12em] text-[#FCFCFC]" style={{ fontSize: "14px" }}>Platform</h4>
          <ul className="space-y-[6px] tracking-[0.1em] text-[#FCFCFC]/78" style={{ fontSize: "13px" }}>
            <li><Link href="/ai-lab" className="hover:text-[#0052A5] transition-colors">AI Automation Lab</Link></li>
            <li><Link href="/academy" className="hover:text-[#0052A5] transition-colors">EGBC Exam Prep</Link></li>
            <li><Link href="/projects" className="hover:text-[#0052A5] transition-colors">Project Portfolio</Link></li>
            <li><Link href="/blog" className="hover:text-[#0052A5] transition-colors">Blog</Link></li>
            <li><Link href="/about" className="hover:text-[#0052A5] transition-colors">About</Link></li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.3, ease: EASE }}
        >
          <h4 className="mb-5 font-medium tracking-[0.12em] text-[#FCFCFC]" style={{ fontSize: "14px" }}>Contact</h4>
          <div className="flex items-center gap-3">
            <a href="https://www.linkedin.com/in/zagrosia" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-[#FCFCFC]/30 text-[#FCFCFC]/70 transition-all hover:border-[#0052A5] hover:text-[#0052A5]"><Linkedin size={16} /></a>
            <a href="https://www.facebook.com/people/Zagrosia-Structural-Engineering/61590665126080/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-[#FCFCFC]/30 text-[#FCFCFC]/70 transition-all hover:border-[#0052A5] hover:text-[#0052A5]"><Facebook size={16} /></a>
            <a href="https://www.instagram.com/zagrosia_structural/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-[#FCFCFC]/30 text-[#FCFCFC]/70 transition-all hover:border-[#0052A5] hover:text-[#0052A5]"><Instagram size={16} /></a>
            <a href="tel:+17783171043" aria-label="Phone: +1 (778) 317-1043" className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-[#FCFCFC]/30 text-[#FCFCFC]/70 transition-all hover:border-[#0052A5] hover:text-[#0052A5]"><Phone size={16} /></a>
            <a href="mailto:info@zagrosia.ca" aria-label="Email: info@zagrosia.ca" className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-[#FCFCFC]/30 text-[#FCFCFC]/70 transition-all hover:border-[#0052A5] hover:text-[#0052A5]"><Mail size={16} /></a>
          </div>
        </motion.div>
      </div>

      {/* ── MOBILE: logo + tagline ── */}
      <Reveal variant="fadeUp" delay={0.05} duration={0.65} className="lg:hidden mb-8 -mt-[35px]">
        <div className="mb-8">
          <Link href="/" aria-label="Go to homepage" onClick={handleLogoClick}>
            <Image src="/images/zagrosia-logo.svg" alt="Zagrosia Engineering Inc." width={172} height={40} className="h-auto w-[172px]" />
          </Link>
        </div>
        <h3 className="mb-5 text-[12px] font-medium tracking-[0.14em] text-[#FCFCFC] -mt-[50px]">Engineered to Solve</h3>
        <p className="mb-[20px] max-w-[305px] text-[11px] leading-[1.46] tracking-[0.14em] text-[#FCFCFC]/78">
          A next-generation structural engineering ecosystem, combining 35+ years of expertise with AI automation, education, and industry partnerships across Western Canada.
        </p>
        <div className="mb-12 flex text-[11px] leading-[1.25] tracking-[0.13em] text-[#FCFCFC]/80">
          <div className="pr-4"><span className="font-medium text-[#FCFCFC]">P.ENG</span><br />British Columbia</div>
          <div className="border-l border-[#FCFCFC]/22 px-4"><span className="font-medium text-[#FCFCFC]">P.ENG</span><br />Alberta</div>
          <div className="border-l border-[#FCFCFC]/22 pl-4"><span className="font-medium text-[#FCFCFC]">P.ENG</span><br />Saskatchewan</div>
        </div>
      </Reveal>

      {/* ── MOBILE-only sections ── */}
      <div className="lg:hidden">
        <div className="mb-11 flex gap-12">
          <div>
            <h4 className="mb-4 text-[13px] font-medium tracking-[0.14em] text-[#FCFCFC]">Services</h4>
            <ul className="space-y-[10px] text-[11px] tracking-[0.15em] text-[#FCFCFC]/78">
              <li><Link href="/services" className="hover:text-[#0052A5] transition-colors">Structural Design</Link></li>
              <li><Link href="/services" className="hover:text-[#0052A5] transition-colors">Seismic Assessment</Link></li>
              <li><Link href="/services" className="hover:text-[#0052A5] transition-colors">Rehabilitation</Link></li>
              <li><Link href="/services" className="hover:text-[#0052A5] transition-colors">Racking Systems</Link></li>
              <li><Link href="/services" className="hover:text-[#0052A5] transition-colors">Building Envelope</Link></li>
              <li><Link href="/services" className="hover:text-[#0052A5] transition-colors">Specialty Reviews</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-[13px] font-medium tracking-[0.14em] text-[#FCFCFC]">Platform</h4>
            <ul className="space-y-[10px] text-[11px] tracking-[0.15em] text-[#FCFCFC]/78">
              <li><Link href="/ai-lab" className="hover:text-[#0052A5] transition-colors">AI Automation Lab</Link></li>
              <li><Link href="/academy" className="hover:text-[#0052A5] transition-colors">EGBC Exam Prep</Link></li>
              <li><Link href="/projects" className="hover:text-[#0052A5] transition-colors">Project Portfolio</Link></li>
              <li><Link href="/blog" className="hover:text-[#0052A5] transition-colors">Blog</Link></li>
              <li><Link href="/about" className="hover:text-[#0052A5] transition-colors">About</Link></li>
            </ul>
          </div>
        </div>

        <div className="mb-11">
          <h4 className="mb-5 text-[13px] font-medium tracking-[0.14em] text-[#FCFCFC]">Contact</h4>
          <div className="flex items-center gap-6">
            <a href="https://www.linkedin.com/in/zagrosia" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#FCFCFC]/70 hover:text-[#0052A5] transition-colors"><Linkedin size={22} /></a>
            <a href="https://www.facebook.com/people/Zagrosia-Structural-Engineering/61590665126080/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[#FCFCFC]/70 hover:text-[#0052A5] transition-colors"><Facebook size={22} /></a>
            <a href="https://www.instagram.com/zagrosia_structural/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#FCFCFC]/70 hover:text-[#0052A5] transition-colors"><Instagram size={22} /></a>
            <a href="tel:+17783171043" aria-label="Phone: +1 (778) 317-1043" className="text-[#FCFCFC]/70 hover:text-[#0052A5] transition-colors"><Phone size={22} /></a>
            <a href="mailto:info@zagrosia.ca" aria-label="Email: info@zagrosia.ca" className="text-[#FCFCFC]/70 hover:text-[#0052A5] transition-colors"><Mail size={22} /></a>
          </div>
        </div>
      </div>

      {/* Copyright — both layouts */}
      <div className="border-t border-[#FCFCFC]/12 pt-5">
        <p className="max-w-[310px] leading-[1.42] tracking-[0.11em] text-[#FCFCFC]/46 lg:max-w-none" style={{ fontSize: "6px" }}>
          2025 Zagrosia Engineering Inc. — All rights reserved. Founded by Seyed Hassan Mozneb, M.Sc., P.Eng.
        </p>
      </div>

      </div>
    </footer>
  )
}
