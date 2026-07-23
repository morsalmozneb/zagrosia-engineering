"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Phone, Mail, Linkedin } from "lucide-react"
import { Reveal } from "./scroll-reveal"
import { CtaButton } from "@/components/cta-button"

const EASE = [0.0, 0.0, 0.2, 1] as const

const services = [
  "Structural Design",
  "Seismic Assessment",
  "Rehabilitation",
  "Racking Systems",
  "Building Envelope",
  "Specialty Reviews",
  "AI Automation",
  "EGBC Exam Prep",
]

const contactItems = [
  {
    icon: <Phone size={16} />,
    label: "Phone",
    value: "+1 (778) 317-1043",
    href: "tel:+17783171043",
  },
  {
    icon: <Mail size={16} />,
    label: "Email",
    value: "info@zagrosia.ca",
    href: "mailto:info@zagrosia.ca",
  },
  {
    icon: <Linkedin size={16} />,
    label: "LinkedIn",
    value: "linkedin.com/in/zagrosia",
    href: "https://www.linkedin.com/in/zagrosia",
  },
]

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")

export function ContactSection() {
  const reducedMotion = useReducedMotion()
  const [selectedService, setSelectedService] = useState("Structural Design")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(false)
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "contact",
          name,
          email,
          service: selectedService,
          message,
        }),
      })
      setSubmitted(true)
    } catch {
      setError(true)
    } finally {
      setSubmitting(false)
    }
  }

  const formFields = (mobile: boolean) => {
    const inputClass = mobile
      ? "w-full rounded-[5px] border border-[#D8D8D8] bg-white px-3 py-2.5 text-[11px] tracking-[0.05em] text-[#2D2D2D] placeholder-[#BBBBBB] outline-none focus:border-[#0052A5] focus:ring-1 focus:ring-[#0052A5]"
      : "w-full rounded-[8px] border border-[#D8D8D8] bg-white px-4 py-3 text-[14px] tracking-[0.05em] text-[#2D2D2D] placeholder-[#BBBBBB] outline-none focus:border-[#0052A5] focus:ring-1 focus:ring-[#0052A5]"
    const labelClass = mobile
      ? "mb-1 block text-[11px] font-semibold tracking-[0.08em] text-[#2D2D2D]"
      : "mb-2 block text-[14px] font-semibold tracking-[0.08em] text-[#2D2D2D]"
    const dropdownItemClass = mobile
      ? "block w-full px-3 py-2.5 text-left text-[11px] tracking-[0.05em] hover:bg-[#F5F7FA]"
      : "block w-full px-4 py-3 text-left text-[14px] tracking-[0.05em] hover:bg-[#F5F7FA]"
    const dropdownBtnClass = mobile
      ? "flex w-full items-center justify-between rounded-[5px] border border-[#D8D8D8] bg-white px-3 py-2.5 text-left text-[11px] tracking-[0.05em] text-[#2D2D2D] outline-none focus:border-[#0052A5]"
      : "flex w-full items-center justify-between rounded-[8px] border border-[#D8D8D8] bg-white px-4 py-3 text-left text-[14px] tracking-[0.05em] text-[#2D2D2D] outline-none focus:border-[#0052A5]"
    const dropdownMenuClass = mobile
      ? "absolute left-0 right-0 top-full z-10 mt-1 rounded-[5px] border border-[#D8D8D8] bg-white shadow-md"
      : "absolute left-0 right-0 top-full z-10 mt-1 rounded-[8px] border border-[#D8D8D8] bg-white shadow-md"

    if (submitted) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#0052A5]/10">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 13l4 4L19 7" stroke="#0052A5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-[16px] font-semibold tracking-[0.08em] text-[#2D2D2D]">Message Sent!</p>
          <p className="mt-2 text-[13px] tracking-[0.06em] text-[#6B6B6B]">
            We&apos;ll get back to you at {email} shortly.
          </p>
        </div>
      )
    }

    return (
      <>
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" name="bot-field" />

        {/* Name + Email row (desktop only) */}
        {!mobile ? (
          <div className="grid grid-cols-2 gap-5 mb-5">
            <div>
              <label className={labelClass}>Your Name <span className="text-[#0052A5]">*</span></label>
              <input required type="text" name="name" placeholder="John Smith" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email Address <span className="text-[#0052A5]">*</span></label>
              <input required type="email" name="email" placeholder="john@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label className={labelClass}>Your Name <span className="text-[#0052A5]">*</span></label>
              <input required type="text" name="name" placeholder="John Smith" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
            </div>
            <div className="mb-4">
              <label className={labelClass}>Email Address <span className="text-[#0052A5]">*</span></label>
              <input required type="email" name="email" placeholder="John@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
            </div>
          </>
        )}

        {/* Service dropdown */}
        <div className="mb-4">
          <label className={labelClass}>Service Needed</label>
          <input type="hidden" name="service" value={selectedService} />
          <div className="relative">
            <button type="button" onClick={() => setDropdownOpen(!dropdownOpen)} className={dropdownBtnClass}>
              <span>{selectedService}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}>
                <path d="M4 6L8 10L12 6" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className={dropdownMenuClass}>
                {services.map((service) => (
                  <button key={service} type="button" onClick={() => { setSelectedService(service); setDropdownOpen(false) }}
                    className={`${dropdownItemClass} ${service === selectedService ? "font-semibold text-[#0052A5]" : "text-[#2D2D2D]"}`}>
                    {service}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Message */}
        <div className={mobile ? "" : "mb-5"}>
          <label className={labelClass}>Project Details</label>
          <textarea required name="message" placeholder="Briefly describe your project or journey..." rows={5} value={message} onChange={(e) => setMessage(e.target.value)}
            className={`${mobile ? "w-full resize-none rounded-[5px] border border-[#D8D8D8] bg-white px-3 py-2.5 text-[11px] tracking-[0.05em] text-[#2D2D2D] placeholder-[#BBBBBB] outline-none focus:border-[#0052A5] focus:ring-1 focus:ring-[#0052A5]" : "w-full resize-none rounded-[8px] border border-[#D8D8D8] bg-white px-4 py-3 text-[14px] tracking-[0.05em] text-[#2D2D2D] placeholder-[#BBBBBB] outline-none focus:border-[#0052A5] focus:ring-1 focus:ring-[#0052A5]"}`}
          />
        </div>

        {error && (
          <p className="mb-3 text-[12px] text-red-500 tracking-[0.05em]">Something went wrong. Please try again or email us directly.</p>
        )}

        <CtaButton as="button" type="submit" disabled={submitting}
          className={`${mobile ? "mt-5 inline-flex w-full" : "inline-flex"} items-center justify-center rounded-full border border-[#2D2D2D] text-[#2D2D2D] font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[40px] px-5 text-[11px] lg:h-[44px] lg:px-7 lg:text-[14px] disabled:opacity-60`}
          style={{ fontSize: mobile ? "14px" : "16px" }}
        >
          {submitting ? "Sending..." : "Send Message"}
        </CtaButton>
      </>
    )
  }

  return (
    <section className="bg-[#FCFCFC] text-[#2D2D2D]">
      <div className="lg:hidden px-5 pb-14 pt-24">

        {/* Label */}
        <Reveal variant="fadeUp" delay={0.05} duration={0.6}>
          <p className="mb-4 text-[10px] font-medium tracking-[0.14em] text-[#2D2D2D]">GET IN TOUCH</p>
        </Reveal>

        {/* Vertical line + heading + body */}
        <div className="relative pl-[12px] mb-8">
          <motion.div
            className="absolute left-0 top-[8px] w-px"
            initial={reducedMotion ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.85, ease: "easeInOut" }}
            style={{
              height: "calc(100% - 8px)",
              transformOrigin: "top",
              background: "linear-gradient(180deg, rgba(45,45,45,1) 0%, rgba(45,45,45,0.82) 38%, rgba(45,45,45,0.42) 72%, rgba(45,45,45,0) 100%)",
            }}
          />
          <Reveal variant="fadeLeft" delay={0.1} duration={0.7}>
            <h2
              className="mb-5 text-[24px] font-black uppercase leading-[1.25] tracking-[0.12em]"
              style={{ fontFamily: "'Momo Trust Sans', 'Inter', sans-serif" }}
              aria-hidden="true"
            >
              <span className="text-[#2D2D2D]">START YOUR</span>
              <br />
              <span className="text-[#0052A5]">PROJECT TODAY</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2} duration={0.65}>
            <p className="text-[12px] leading-[1.75] tracking-[0.08em] text-[#2D2D2D]">
              Whether you need structural design, building assessment, custom automation tools, or EGBC exam prep, we&apos;re ready. Let&apos;s build something exceptional.
            </p>
          </Reveal>
        </div>

        <Reveal variant="fadeBlur" delay={0.15} duration={0.7} className="mb-10 rounded-[20px] bg-[#FCFCFC] px-5 py-5"
          style={{ boxShadow: "0px 4px 19.6px 0px rgba(0,0,0,0.34)", backdropFilter: "blur(61.5px)", WebkitBackdropFilter: "blur(61.5px)" }}
        >
          <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit}>
            {formFields(true)}
          </form>
        </Reveal>

        <Reveal variant="fadeUp" delay={0.08} duration={0.6}>
          <p className="mb-3 text-[10px] font-medium tracking-[0.14em] text-[#2D2D2D]">CONTACT INFO</p>
        </Reveal>

        <div className="space-y-[8px]">
          {contactItems.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="group flex items-center gap-4 rounded-r-[14px] border-l-[3px] border-[#0052A5] bg-white px-4 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(0,82,165,0.14)]"
              initial={reducedMotion ? false : { opacity: 0, y: 14, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: EASE }}
            >
              <div className="flex h-[36px] w-[36px] flex-shrink-0 items-center justify-center rounded-[10px] bg-[#0052A5]/10 text-[#0052A5] transition-colors duration-300 group-hover:bg-[#0052A5] group-hover:text-white">
                {item.icon}
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0052A5]">{item.label}</p>
                <p className="mt-[2px] text-[11px] font-medium tracking-[0.04em] text-[#2D2D2D]">{item.value}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <div className="sidebar-content hidden lg:block">
        <div className="w-full pt-[148px] pb-20 zag-desktop-content-pad">
          {/* Header */}
          <div className="mb-10">
            <div className="relative pl-5">
              <motion.div
                className="absolute left-0 top-[4px] bottom-0 w-[4px]"
                initial={reducedMotion ? false : { scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: false, amount: 0.05 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                style={{ transformOrigin: "top", background: "linear-gradient(180deg, #0B0E0A 0%, rgba(150,150,150,0) 100%)" }}
              />
              <Reveal variant="fadeUp" delay={0.05} duration={0.6}>
                <p className="mb-[20px] text-[20px] font-bold uppercase tracking-[0.24em] text-[#2D2D2D]">
                  GET IN TOUCH
                </p>
              </Reveal>
              <Reveal variant="fadeLeft" delay={0.1} duration={0.7}>
                <h1
                  className="text-[52px] font-bold uppercase leading-[0.96] tracking-[0.06em]"
                  style={{ fontFamily: "'Momo Trust Sans', 'Inter', sans-serif" }}
                >
                  <span className="mb-[8px] block text-[#2D2D2D]">START YOUR PROJECT</span>
                  <span className="block text-[#0052A5]">TODAY</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2} duration={0.65}>
                <p className="mt-5 max-w-[700px] leading-[1.6] tracking-[0.08em] text-[#2D2D2D]" style={{ fontSize: "18px" }}>
                  Whether you need structural design, building assessment, custom automation tools, or EGBC exam prep, we&apos;re ready. Let&apos;s build something exceptional.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Contact Form */}
          <Reveal variant="fadeBlur" delay={0.15} duration={0.7} className="rounded-[20px] bg-[#FCFCFC] px-8 py-8 mb-8"
            style={{ boxShadow: "0px 4px 19.6px 0px rgba(0,0,0,0.34)", backdropFilter: "blur(61.5px)", WebkitBackdropFilter: "blur(61.5px)" }}
          >
            <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit}>
              {formFields(false)}
            </form>
          </Reveal>

          {/* Contact Info */}
          <div>
            <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
              <h2
                className="mb-5 text-[20px] font-bold uppercase leading-[1.25] tracking-[0.14em] text-[#2D2D2D]"
                style={{ fontFamily: "'Momo Trust Sans', 'Inter', sans-serif" }}
              >
                CONTACT INFO
              </h2>
            </Reveal>
            <div className="grid grid-cols-3 gap-4">
              {contactItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-4 rounded-r-[16px] border-l-[3px] border-[#0052A5] bg-white px-5 py-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_8px_28px_rgba(0,82,165,0.15)]"
                  initial={reducedMotion ? false : { opacity: 0, y: 16, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.12, ease: EASE }}
                >
                  <div className="flex h-[44px] w-[44px] flex-shrink-0 items-center justify-center rounded-[10px] bg-[#0052A5]/10 text-[#0052A5] transition-colors duration-300 group-hover:bg-[#0052A5] group-hover:text-white">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0052A5]">{item.label}</p>
                    <p className="mt-[4px] text-[14px] font-medium tracking-[0.04em] text-[#2D2D2D]">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
