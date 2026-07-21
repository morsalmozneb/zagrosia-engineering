"use client"

import Image from "next/image"
import Link from "next/link"
import { Reveal } from "./scroll-reveal"
import { motion } from "framer-motion"
import { Phone, Mail } from "lucide-react"

const EASE = [0.0, 0.0, 0.2, 1] as const

export function Footer() {
  return (
    <footer id="contact" className="bg-[#000000] py-8 text-[#FCFCFC] lg:py-10">
      <div className="sidebar-content px-8 zag-desktop-content-pad">

      {/* ── DESKTOP: Row 1 — logo + tagline + P.ENG ── */}
      <div className="hidden lg:block mb-8">
        <Reveal variant="fadeUp" delay={0.05} duration={0.65}>
          <div className="mb-4">
            <Link href="/" aria-label="Go to homepage">
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
            <li><Link href="/services" className="hover:text-[#FCFCFC] transition-colors">Structural Design</Link></li>
            <li><Link href="/services" className="hover:text-[#FCFCFC] transition-colors">Seismic Assessment</Link></li>
            <li><Link href="/services" className="hover:text-[#FCFCFC] transition-colors">Rehabilitation</Link></li>
            <li><Link href="/services" className="hover:text-[#FCFCFC] transition-colors">Racking Systems</Link></li>
            <li><Link href="/services" className="hover:text-[#FCFCFC] transition-colors">Building Envelope</Link></li>
            <li><Link href="/services" className="hover:text-[#FCFCFC] transition-colors">Specialty Reviews</Link></li>
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
            <li><Link href="/ai-lab" className="hover:text-[#FCFCFC] transition-colors">AI Automation Lab</Link></li>
            <li><Link href="/academy" className="hover:text-[#FCFCFC] transition-colors">EGBC Exam Prep</Link></li>
            <li><Link href="/projects" className="hover:text-[#FCFCFC] transition-colors">Project Portfolio</Link></li>
            <li><Link href="/blog" className="hover:text-[#FCFCFC] transition-colors">Blog</Link></li>
            <li><Link href="/about" className="hover:text-[#FCFCFC] transition-colors">About</Link></li>
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
          <div className="flex items-center gap-5">
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/zagrosia" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#FCFCFC]/70 hover:text-[#0052A5] transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            {/* Facebook */}
            <a href="https://www.facebook.com/people/Zagrosia-Structural-Engineering/61590665126080/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[#FCFCFC]/70 hover:text-[#0052A5] transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/zagrosia_structural/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#FCFCFC]/70 hover:text-[#0052A5] transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
            {/* Phone */}
            <a href="tel:+17783171043" aria-label="Phone: +1 (778) 317-1043" className="text-[#FCFCFC]/70 hover:text-[#0052A5] transition-colors">
              <Phone size={22} />
            </a>
            {/* Email */}
            <a href="mailto:shmozneb@zagrosia.ca" aria-label="Email: shmozneb@zagrosia.ca" className="text-[#FCFCFC]/70 hover:text-[#0052A5] transition-colors">
              <Mail size={22} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── MOBILE: logo + tagline ── */}
      <Reveal variant="fadeUp" delay={0.05} duration={0.65} className="lg:hidden mb-8 -mt-[35px]">
        <div className="mb-8">
          <Link href="/" aria-label="Go to homepage">
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
              <li><Link href="/services" className="hover:text-[#FCFCFC] transition-colors">Structural Design</Link></li>
              <li><Link href="/services" className="hover:text-[#FCFCFC] transition-colors">Seismic Assessment</Link></li>
              <li><Link href="/services" className="hover:text-[#FCFCFC] transition-colors">Rehabilitation</Link></li>
              <li><Link href="/services" className="hover:text-[#FCFCFC] transition-colors">Racking Systems</Link></li>
              <li><Link href="/services" className="hover:text-[#FCFCFC] transition-colors">Building Envelope</Link></li>
              <li><Link href="/services" className="hover:text-[#FCFCFC] transition-colors">Specialty Reviews</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-[13px] font-medium tracking-[0.14em] text-[#FCFCFC]">Platform</h4>
            <ul className="space-y-[10px] text-[11px] tracking-[0.15em] text-[#FCFCFC]/78">
              <li><Link href="/ai-lab" className="hover:text-[#FCFCFC] transition-colors">AI Automation Lab</Link></li>
              <li><Link href="/academy" className="hover:text-[#FCFCFC] transition-colors">EGBC Exam Prep</Link></li>
              <li><Link href="/projects" className="hover:text-[#FCFCFC] transition-colors">Project Portfolio</Link></li>
              <li><Link href="/blog" className="hover:text-[#FCFCFC] transition-colors">Blog</Link></li>
              <li><Link href="/about" className="hover:text-[#FCFCFC] transition-colors">About</Link></li>
            </ul>
          </div>
        </div>

        <div className="mb-11">
          <h4 className="mb-5 text-[13px] font-medium tracking-[0.14em] text-[#FCFCFC]">Contact</h4>
          <div className="flex items-center gap-6">
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/zagrosia" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#FCFCFC]/70 hover:text-[#0052A5] transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            {/* Facebook */}
            <a href="https://www.facebook.com/people/Zagrosia-Structural-Engineering/61590665126080/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[#FCFCFC]/70 hover:text-[#0052A5] transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/zagrosia_structural/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#FCFCFC]/70 hover:text-[#0052A5] transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
            {/* Phone */}
            <a href="tel:+17783171043" aria-label="Phone: +1 (778) 317-1043" className="text-[#FCFCFC]/70 hover:text-[#0052A5] transition-colors">
              <Phone size={22} />
            </a>
            {/* Email */}
            <a href="mailto:shmozneb@zagrosia.ca" aria-label="Email: shmozneb@zagrosia.ca" className="text-[#FCFCFC]/70 hover:text-[#0052A5] transition-colors">
              <Mail size={22} />
            </a>
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
